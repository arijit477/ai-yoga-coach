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

export class CameraReadinessTracker {
  private readonly outOfFrameDelay = 2000;
  private readonly inFrameDelay = 500;
  private readonly confidenceThreshold = 0.5;

  private currentState: CameraReadinessState = "CAMERA_DISABLED";
  private hardwareState: "disabled" | "requesting" | "enabled" | "error" = "disabled";
  
  private lastGoodFrameTime: number = 0;
  private lastBadFrameTime: number = 0;

  private readonly onStateChange: (newState: CameraReadinessState) => void;

  constructor(
    onStateChange: (newState: CameraReadinessState) => void
  ) {
    this.onStateChange = onStateChange;
    this.lastGoodFrameTime = Date.now();
    this.lastBadFrameTime = Date.now();
  }

  public updateCameraStatus(status: "disabled" | "requesting" | "enabled" | "error"): void {
    this.hardwareState = status;
    this.evaluateState(null);
  }

  public updatePoseDetection(landmarks: PoseLandmarks | null): void {
    this.evaluateState(landmarks);
  }

  public getCurrentState(): CameraReadinessState {
    return this.currentState;
  }

  private evaluateState(landmarks: PoseLandmarks | null) {
    const now = Date.now();
    let proposedState = this.determineInstantState(landmarks);

    // Apply debounce logic
    if (proposedState === "NO_PERSON" || proposedState === "PARTIAL_BODY") {
      this.lastBadFrameTime = now;
      if (now - this.lastGoodFrameTime < this.outOfFrameDelay) {
        // Debounce: hold onto the previous good state (e.g. CAMERA_READY)
        proposedState = this.currentState === "NO_PERSON" || this.currentState === "PARTIAL_BODY" || this.currentState === "CAMERA_ENABLED" ? proposedState : this.currentState;
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
    if (!landmarks || landmarks.length === 0) return "NO_PERSON";

    const isHeadVisible = this.checkIndicesVisible(landmarks, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const areShouldersVisible = this.checkIndicesVisible(landmarks, [11, 12]);
    const areHipsVisible = this.checkIndicesVisible(landmarks, [23, 24]);
    const areKneesVisible = this.checkIndicesVisible(landmarks, [25, 26]);
    const areFeetVisible = this.checkIndicesVisible(landmarks, [31, 32]) || this.checkIndicesVisible(landmarks, [27, 28]);

    // Calculate an overall confidence loosely based on visible required joints
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
