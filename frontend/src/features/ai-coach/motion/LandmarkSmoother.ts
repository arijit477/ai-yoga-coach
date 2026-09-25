import type { Landmark, PoseLandmarks } from "../types/landmarks";
import { getLandmarkStatus, getLandmarkConfidence } from "../analysis/LandmarkUtils";

export const DEFAULT_SMOOTHING_ALPHA = 0.35;
export const DEFAULT_MAX_GRACE_FRAMES = 4;

interface SmoothedLandmarkState {
  smoothed: Landmark;
  graceFrames: number;
}

export class LandmarkSmoother {
  private state: (SmoothedLandmarkState | null)[] | null = null;
  private readonly alpha: number;
  private readonly maxGraceFrames: number;

  constructor(
    alpha = DEFAULT_SMOOTHING_ALPHA,
    maxGraceFrames = DEFAULT_MAX_GRACE_FRAMES,
  ) {
    if (alpha <= 0 || alpha > 1) {
      throw new Error(
        "Smoothing alpha must be greater than 0 and less than or equal to 1.",
      );
    }
    if (maxGraceFrames < 0) {
      throw new Error("maxGraceFrames must be non-negative.");
    }

    this.alpha = alpha;
    this.maxGraceFrames = maxGraceFrames;
  }

  smooth(landmarks: PoseLandmarks): PoseLandmarks {
    if (!landmarks || landmarks.length === 0) {
      return landmarks;
    }

    if (!this.state || this.state.length !== landmarks.length) {
      this.state = new Array(landmarks.length).fill(null);
    }

    const smoothed: PoseLandmarks = landmarks.map(
      (current, index): Landmark => {
        const prevState = this.state![index];
        const status = getLandmarkStatus(current);

        if (status === "VALID") {
          const confidence = getLandmarkConfidence(current);
          // Higher-confidence landmarks influence position more strongly
          const effectiveAlpha = Math.min(
            1,
            Math.max(0.1, this.alpha * (0.5 + 0.5 * confidence)),
          );

          if (prevState) {
            const sx =
              prevState.smoothed.x +
              (current.x - prevState.smoothed.x) * effectiveAlpha;
            const sy =
              prevState.smoothed.y +
              (current.y - prevState.smoothed.y) * effectiveAlpha;
            const prevZ = prevState.smoothed.z ?? 0;
            const currZ = current.z ?? 0;
            const sz = prevZ + (currZ - prevZ) * effectiveAlpha;

            const smoothedLm: Landmark = {
              x: sx,
              y: sy,
              z: sz,
              visibility: current.visibility,
              presence: current.presence,
            };

            this.state![index] = {
              smoothed: smoothedLm,
              graceFrames: 0,
            };

            return smoothedLm;
          } else {
            const smoothedLm: Landmark = { ...current };
            this.state![index] = {
              smoothed: smoothedLm,
              graceFrames: 0,
            };
            return smoothedLm;
          }
        }

        if (status === "LOW_CONFIDENCE") {
          const confidence = getLandmarkConfidence(current);

          if (prevState && prevState.graceFrames < this.maxGraceFrames) {
            // Low-confidence: apply heavily damped EMA to prevent sudden jumps
            const dampedAlpha = this.alpha * confidence * 0.4;
            const sx =
              prevState.smoothed.x +
              (current.x - prevState.smoothed.x) * dampedAlpha;
            const sy =
              prevState.smoothed.y +
              (current.y - prevState.smoothed.y) * dampedAlpha;
            const prevZ = prevState.smoothed.z ?? 0;
            const currZ = current.z ?? 0;
            const sz = prevZ + (currZ - prevZ) * dampedAlpha;

            const smoothedLm: Landmark = {
              x: sx,
              y: sy,
              z: sz,
              visibility: current.visibility,
              presence: current.presence,
            };

            this.state![index] = {
              smoothed: smoothedLm,
              graceFrames: prevState.graceFrames + 1,
            };

            return smoothedLm;
          } else {
            // No previous valid state or grace expired
            this.state![index] = null;
            return { ...current };
          }
        }

        // status === "MISSING"
        if (prevState && prevState.graceFrames < this.maxGraceFrames) {
          // Temporary dropout: hold last smoothed coordinates during grace period
          const heldLm: Landmark = {
            x: prevState.smoothed.x,
            y: prevState.smoothed.y,
            z: prevState.smoothed.z,
            visibility: current?.visibility ?? 0,
            presence: current?.presence ?? 0,
          };

          this.state![index] = {
            smoothed: prevState.smoothed,
            graceFrames: prevState.graceFrames + 1,
          };

          return heldLm;
        }

        // Grace period expired or never valid: clear state
        this.state![index] = null;
        return current ?? { x: 0, y: 0, z: 0, visibility: 0, presence: 0 };
      },
    );

    return smoothed;
  }

  reset(): void {
    this.state = null;
  }
}

