import type { Landmark, PoseLandmarks } from "../types/landmarks";

const DEFAULT_ALPHA = 0.35;

export class LandmarkSmoother {
  private previous: PoseLandmarks | null = null;
  private readonly alpha: number;

  constructor(alpha = DEFAULT_ALPHA) {
    this.alpha = alpha;

    if (this.alpha <= 0 || this.alpha > 1) {
      throw new Error(
        "Smoothing alpha must be greater than 0 and less than or equal to 1.",
      );
    }
  }

  smooth(landmarks: PoseLandmarks): PoseLandmarks {
    if (!landmarks || landmarks.length === 0) {
      return landmarks;
    }

    if (!this.previous || this.previous.length !== landmarks.length) {
      this.previous = landmarks.map((landmark) => ({ ...landmark }));

      return this.previous;
    }

    const smoothed: PoseLandmarks = landmarks.map(
      (current, index): Landmark => {
        const previous = this.previous![index];

        return {
          x: previous.x + (current.x - previous.x) * this.alpha,

          y: previous.y + (current.y - previous.y) * this.alpha,

          z: previous.z + (current.z - previous.z) * this.alpha,

          visibility: current.visibility,

          presence: current.presence,
        };
      },
    );

    this.previous = smoothed;

    return smoothed;
  }

  reset(): void {
    this.previous = null;
  }
}
