import type { PoseLandmarks } from "../types/landmarks";
import { VISIBLE_BODY_LANDMARKS } from "../types/pose-landmarks";

export interface StabilityResult {
  isStable: boolean;
  stabilityProgress: number; // 0 to 100
  isFullBodyVisible: boolean;
  visibilityWarning: string | null;
}

export class PoseStabilityDetector {
  private lastLandmarks: PoseLandmarks | null = null;
  private stableFramesCount = 0;
  private readonly requiredStableFrames: number;
  private readonly motionThreshold: number;

  constructor(requiredStableFrames: number = 30, motionThreshold: number = 0.035) {
    this.requiredStableFrames = requiredStableFrames;
    this.motionThreshold = motionThreshold;
  }

  reset(): void {
    this.lastLandmarks = null;
    this.stableFramesCount = 0;
  }

  evaluate(landmarks: PoseLandmarks | null): StabilityResult {
    if (!landmarks || landmarks.length < 33) {
      this.reset();
      return {
        isStable: false,
        stabilityProgress: 0,
        isFullBodyVisible: false,
        visibilityWarning: "Step into view so I can see your full body.",
      };
    }

    // 1. Check critical full-body landmarks (shoulders, hips, ankles)
    const criticalIndices = [11, 12, 23, 24, 27, 28];
    const visibleCritical = criticalIndices.filter((idx) => {
      const lm = landmarks[idx];
      return lm && (lm.visibility === undefined || lm.visibility >= 0.4);
    });

    if (visibleCritical.length < 4) {
      this.reset();
      return {
        isStable: false,
        stabilityProgress: 0,
        isFullBodyVisible: false,
        visibilityWarning: "Move back so I can see your full body.",
      };
    }

    // 2. Measure average landmark velocity across visible body landmarks
    if (!this.lastLandmarks) {
      this.lastLandmarks = landmarks;
      return {
        isStable: false,
        stabilityProgress: 5,
        isFullBodyVisible: true,
        visibilityWarning: null,
      };
    }

    let totalDisplacement = 0;
    let countedJoints = 0;

    for (const idx of VISIBLE_BODY_LANDMARKS) {
      const curr = landmarks[idx];
      const prev = this.lastLandmarks[idx];
      if (curr && prev && (curr.visibility ?? 1) >= 0.4 && (prev.visibility ?? 1) >= 0.4) {
        const dx = curr.x - prev.x;
        const dy = curr.y - prev.y;
        totalDisplacement += Math.sqrt(dx * dx + dy * dy);
        countedJoints++;
      }
    }

    this.lastLandmarks = landmarks;

    const avgDisplacement = countedJoints > 0 ? totalDisplacement / countedJoints : 1.0;

    // Check if movement is under the still threshold
    if (avgDisplacement < this.motionThreshold) {
      this.stableFramesCount++;
    } else {
      // Gentle penalty for jitter rather than hard reset to 0
      this.stableFramesCount = Math.max(0, this.stableFramesCount - 3);
    }

    const progress = Math.min(100, Math.round((this.stableFramesCount / this.requiredStableFrames) * 100));
    const isStable = this.stableFramesCount >= this.requiredStableFrames;

    return {
      isStable,
      stabilityProgress: progress,
      isFullBodyVisible: true,
      visibilityWarning: null,
    };
  }
}
