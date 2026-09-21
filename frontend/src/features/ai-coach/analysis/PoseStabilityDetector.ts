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
  private unstableFramesCount = 0;
  private isCurrentlyStable = false;
  private readonly requiredStableFrames: number;
  private readonly requiredUnstableFrames: number;
  private readonly motionThreshold: number;

  constructor(requiredStableFrames: number = 20, motionThreshold: number = 0.02) {
    this.requiredStableFrames = requiredStableFrames;
    this.requiredUnstableFrames = Math.max(10, Math.floor(requiredStableFrames * 0.5));
    this.motionThreshold = motionThreshold;
  }

  reset(): void {
    this.lastLandmarks = null;
    this.stableFramesCount = 0;
    this.unstableFramesCount = 0;
    this.isCurrentlyStable = false;
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

    // Hysteresis debouncing
    if (avgDisplacement < this.motionThreshold) {
      this.stableFramesCount = Math.min(this.requiredStableFrames, this.stableFramesCount + 1);
      this.unstableFramesCount = Math.max(0, this.unstableFramesCount - 2);
    } else {
      this.unstableFramesCount = Math.min(this.requiredUnstableFrames, this.unstableFramesCount + 1);
      this.stableFramesCount = Math.max(0, this.stableFramesCount - 2);
    }

    if (this.isCurrentlyStable) {
      // It takes multiple unstable frames to break stability
      if (this.unstableFramesCount >= this.requiredUnstableFrames) {
        this.isCurrentlyStable = false;
      }
    } else {
      // It takes multiple stable frames to gain stability
      if (this.stableFramesCount >= this.requiredStableFrames) {
        this.isCurrentlyStable = true;
      }
    }

    const progress = Math.min(100, Math.round((this.stableFramesCount / this.requiredStableFrames) * 100));

    return {
      isStable: this.isCurrentlyStable,
      stabilityProgress: progress,
      isFullBodyVisible: true,
      visibilityWarning: null,
    };
  }
}
