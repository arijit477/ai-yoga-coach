import type { PoseLandmarks } from "../types/landmarks";
import { getLandmarkConfidence } from "../analysis/LandmarkUtils";

export type CameraReadinessState =
  | "CAMERA_DISABLED"
  | "CAMERA_REQUESTING"
  | "CAMERA_ENABLED"
  | "CAMERA_ERROR"
  | "NO_PERSON"
  | "PARTIAL_BODY"
  | "FULL_BODY_DETECTED"
  | "CAMERA_READY";

export type CameraState = CameraReadinessState;

export class CameraReadinessTracker {
  private readonly outOfFrameDelay = 2000;
  private readonly inFrameDelay = 500;
  private readonly confidenceThreshold = 0.5;

  private currentState: CameraReadinessState = "CAMERA_DISABLED";
  private hardwareState: "disabled" | "requesting" | "enabled" | "error" = "disabled";
  
  private lastLandmarks: PoseLandmarks | null = null;
  private lastGoodFrameTime: number = 0;
  private lastBadFrameTime: number = 0;
  private requiredLandmarks: number[] | null = null;

  private readonly onStateChange: (newState: CameraReadinessState) => void;

  constructor(
    onStateChange: (newState: CameraReadinessState) => void
  ) {
    this.onStateChange = onStateChange;
    this.lastGoodFrameTime = Date.now();
    this.lastBadFrameTime = Date.now();
  }

  public setRequiredLandmarks(landmarks: number[] | null): void {
    this.requiredLandmarks = landmarks;
    this.evaluateState(this.lastLandmarks);
  }

  public updateCameraStatus(status: "disabled" | "requesting" | "enabled" | "error"): void {
    if (this.hardwareState === status) return;
    this.hardwareState = status;
    this.evaluateState(this.lastLandmarks);
  }

  public updatePoseDetection(landmarks: PoseLandmarks | null): void {
    this.lastLandmarks = landmarks;
    this.evaluateState(landmarks);
  }

  public getCurrentState(): CameraReadinessState {
    return this.currentState;
  }

  public reset(): void {
    this.currentState = "CAMERA_DISABLED";
    this.hardwareState = "disabled";
    this.lastLandmarks = null;
    this.lastGoodFrameTime = Date.now();
    this.lastBadFrameTime = Date.now();
    this.requiredLandmarks = null;
  }

  private evaluateState(landmarks: PoseLandmarks | null) {
    const now = Date.now();
    let proposedState = this.determineInstantState(landmarks);

    // If hardware is not in enabled/active pose-tracking state, update immediately without debounce
    if (
      proposedState === "CAMERA_DISABLED" ||
      proposedState === "CAMERA_REQUESTING" ||
      proposedState === "CAMERA_ERROR"
    ) {
      if (this.currentState !== proposedState) {
        this.currentState = proposedState;
        this.onStateChange(this.currentState);
      }
      return;
    }

    // If initial transition from disabled/requesting/enabled to tracking state, transition immediately
    if (
      this.currentState === "CAMERA_DISABLED" ||
      this.currentState === "CAMERA_REQUESTING" ||
      this.currentState === "CAMERA_ENABLED" ||
      this.currentState === "CAMERA_ERROR"
    ) {
      this.currentState = proposedState === "FULL_BODY_DETECTED" ? "CAMERA_READY" : proposedState;
      this.onStateChange(this.currentState);
      return;
    }

    // Apply debounce logic for pose detection transitions
    if (proposedState === "NO_PERSON" || proposedState === "PARTIAL_BODY") {
      this.lastBadFrameTime = now;
      if (now - this.lastGoodFrameTime < this.outOfFrameDelay) {
        // Debounce: hold onto the previous good state (e.g. CAMERA_READY)
        proposedState =
          this.currentState === "NO_PERSON" ||
          this.currentState === "PARTIAL_BODY"
            ? proposedState
            : this.currentState;
      }
    } else if (proposedState === "FULL_BODY_DETECTED" || proposedState === "CAMERA_READY") {
      this.lastGoodFrameTime = now;
      if (now - this.lastBadFrameTime < this.inFrameDelay) {
        // Debounce: wait to confirm they are really in frame
        proposedState = this.currentState;
      } else {
        proposedState = "CAMERA_READY"; // Map full body directly to ready
      }
    }

    if (this.currentState !== proposedState) {
      this.currentState = proposedState;
      this.onStateChange(this.currentState);
    }
  }

  private determineInstantState(landmarks: PoseLandmarks | null): CameraReadinessState {
    if (this.hardwareState === "disabled") return "CAMERA_DISABLED";
    if (this.hardwareState === "requesting") return "CAMERA_REQUESTING";
    if (this.hardwareState === "error") return "CAMERA_ERROR";
    
    // We are hardware enabled. Now check landmarks.
    if (landmarks === null) return "CAMERA_ENABLED";
    if (landmarks.length === 0) return "NO_PERSON";

    // If asana-specific required landmarks are defined, validate against them
    if (this.requiredLandmarks && this.requiredLandmarks.length > 0) {
      let visibleRequiredCount = 0;
      for (const idx of this.requiredLandmarks) {
        const lm = landmarks[idx];
        if (lm && getLandmarkConfidence(lm) >= this.confidenceThreshold) {
          visibleRequiredCount++;
        }
      }

      // Check if user is in frame at all
      const hasAnyVisible = landmarks.some((lm) => lm && getLandmarkConfidence(lm) >= this.confidenceThreshold);
      if (!hasAnyVisible) return "NO_PERSON";

      if (visibleRequiredCount < this.requiredLandmarks.length) {
        return "PARTIAL_BODY";
      }

      return "FULL_BODY_DETECTED";
    }

    // Default fallback: validate standard full body visibility
    const isHeadVisible = this.checkIndicesVisible(landmarks, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const areShouldersVisible = this.checkIndicesVisible(landmarks, [11, 12]);
    const areHipsVisible = this.checkIndicesVisible(landmarks, [23, 24]);
    const areKneesVisible = this.checkIndicesVisible(landmarks, [25, 26]);
    const areFeetVisible = this.checkIndicesVisible(landmarks, [31, 32]) || this.checkIndicesVisible(landmarks, [27, 28]);

    let visiblePoints = 0;
    if (isHeadVisible) visiblePoints++;
    if (areShouldersVisible) visiblePoints++;
    if (areHipsVisible) visiblePoints++;
    if (areKneesVisible) visiblePoints++;
    if (areFeetVisible) visiblePoints++;

    if (visiblePoints === 0) return "NO_PERSON";
    if (visiblePoints < 5) return "PARTIAL_BODY";
    
    return "FULL_BODY_DETECTED";
  }

  private checkIndicesVisible(landmarks: PoseLandmarks, indices: number[]): boolean {
    return indices.some(index => {
      const lm = landmarks[index];
      return lm && getLandmarkConfidence(lm) >= this.confidenceThreshold;
    });
  }
}
