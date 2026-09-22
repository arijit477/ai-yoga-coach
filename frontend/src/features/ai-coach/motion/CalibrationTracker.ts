import type { PoseLandmarks } from "../types/landmarks";
import { getLandmarkConfidence } from "../analysis/LandmarkUtils";

export type CalibrationState =
  | "CALIBRATION_STARTED"
  | "CALIBRATION_STABLE"
  | "CALIBRATION_FAILED"
  | "CALIBRATION_COMPLETE";

export type CalibrationFailureReason =
  | "move_back"
  | "move_forward"
  | "center_body"
  | "show_feet"
  | "improve_visibility"
  | "hold_still"
  | null;

export interface CalibrationResult {
  state: CalibrationState;
  reason: CalibrationFailureReason;
  boundingBox: {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
    width: number;
    height: number;
    centerX: number;
    centerY: number;
  } | null;
  isMirrored: boolean;
  isFacingRight: boolean;
}

export class CalibrationTracker {
  private readonly stabilityThreshold = 0.02; // max average change in normalized coords
  private readonly stabilityDurationMs = 2000; // 2 seconds of stability required
  private readonly confidenceThreshold = 0.5;

  private state: CalibrationState = "CALIBRATION_STARTED";
  private reason: CalibrationFailureReason = null;
  private lastLandmarks: PoseLandmarks | null = null;
  private stableStartTime: number = 0;
  
  private boundingBox: CalibrationResult["boundingBox"] = null;
  private isMirrored: boolean = false;
  private isFacingRight: boolean = false;

  private readonly onCalibrationChange: (result: CalibrationResult) => void;

  constructor(
    onCalibrationChange: (result: CalibrationResult) => void
  ) {
    this.onCalibrationChange = onCalibrationChange;
  }

  public reset() {
    this.state = "CALIBRATION_STARTED";
    this.reason = null;
    this.lastLandmarks = null;
    this.stableStartTime = 0;
    this.boundingBox = null;
    this.isMirrored = false;
    this.isFacingRight = false;
  }

  public updatePoseDetection(landmarks: PoseLandmarks | null): void {
    if (this.state === "CALIBRATION_COMPLETE") return; // Already done

    if (!landmarks || landmarks.length === 0) {
      this.fail("improve_visibility");
      return;
    }

    const now = Date.now();

    // 1. Calculate Bounding Box
    this.calculateBoundingBox(landmarks);
    if (!this.boundingBox) {
      this.fail("improve_visibility");
      return;
    }

    // 2. Determine Orientation and Mirroring
    this.calculateOrientationAndMirroring(landmarks);

    // 3. Evaluate Visibility and Position Rules
    const visibilityCheck = this.checkVisibilityAndPosition(landmarks);
    if (visibilityCheck) {
      this.fail(visibilityCheck);
      return;
    }

    // 4. Evaluate Stability
    if (this.lastLandmarks) {
      const movement = this.calculateMovement(this.lastLandmarks, landmarks);
      if (movement > this.stabilityThreshold) {
        this.stableStartTime = now;
        this.fail("hold_still");
      } else {
        if (this.stableStartTime === 0) {
          this.stableStartTime = now;
        }

        const stableDuration = now - this.stableStartTime;
        if (stableDuration >= this.stabilityDurationMs) {
          this.complete();
        } else if (this.state !== "CALIBRATION_STABLE") {
          this.updateState("CALIBRATION_STABLE", null);
        }
      }
    } else {
      this.stableStartTime = now;
      this.updateState("CALIBRATION_STARTED", null);
    }

    this.lastLandmarks = landmarks;
  }

  private calculateBoundingBox(landmarks: PoseLandmarks) {
    let minX = 1, minY = 1, maxX = 0, maxY = 0;
    let validPoints = 0;

    landmarks.forEach(lm => {
      if (getLandmarkConfidence(lm) > this.confidenceThreshold) {
        minX = Math.min(minX, lm.x);
        minY = Math.min(minY, lm.y);
        maxX = Math.max(maxX, lm.x);
        maxY = Math.max(maxY, lm.y);
        validPoints++;
      }
    });

    if (validPoints > 5) {
      this.boundingBox = {
        minX, minY, maxX, maxY,
        width: maxX - minX,
        height: maxY - minY,
        centerX: (minX + maxX) / 2,
        centerY: (minY + maxY) / 2
      };
    } else {
      this.boundingBox = null;
    }
  }

  private calculateOrientationAndMirroring(landmarks: PoseLandmarks) {
    const leftShoulder = landmarks[11];
    const rightShoulder = landmarks[12];
    
    if (leftShoulder && rightShoulder && getLandmarkConfidence(leftShoulder) > this.confidenceThreshold && getLandmarkConfidence(rightShoulder) > this.confidenceThreshold) {
      // Depth comparison for orientation (smaller Z means closer to camera)
      this.isFacingRight = leftShoulder.z < rightShoulder.z;
      
      // X coordinate comparison for mirroring (in MediaPipe, 0 is left, 1 is right)
      // If left shoulder X > right shoulder X, it's not mirrored.
      this.isMirrored = leftShoulder.x < rightShoulder.x;
    }
  }

  private checkVisibilityAndPosition(landmarks: PoseLandmarks): CalibrationFailureReason {
    if (!this.boundingBox) return "improve_visibility";

    // Center body check
    if (this.boundingBox.centerX < 0.3 || this.boundingBox.centerX > 0.7) {
      return "center_body";
    }

    // Move back check
    if (this.boundingBox.height > 0.9) {
      return "move_back";
    }

    // Move forward check
    if (this.boundingBox.height < 0.4) {
      return "move_forward";
    }

    // Show feet check
    const leftAnkle = landmarks[27];
    const rightAnkle = landmarks[28];
    const leftFoot = landmarks[31];
    const rightFoot = landmarks[32];
    const hasFeet = (leftAnkle && getLandmarkConfidence(leftAnkle) > this.confidenceThreshold) ||
                    (rightAnkle && getLandmarkConfidence(rightAnkle) > this.confidenceThreshold) ||
                    (leftFoot && getLandmarkConfidence(leftFoot) > this.confidenceThreshold) ||
                    (rightFoot && getLandmarkConfidence(rightFoot) > this.confidenceThreshold);
                    
    if (!hasFeet && this.boundingBox.maxY > 0.9) {
      return "move_back"; // Likely cut off at bottom
    } else if (!hasFeet) {
       return "show_feet";
    }

    return null;
  }

  private calculateMovement(prev: PoseLandmarks, curr: PoseLandmarks): number {
    let totalMovement = 0;
    let count = 0;

    for (let i = 0; i < curr.length; i++) {
      const p = prev[i];
      const c = curr[i];
      if (p && c && getLandmarkConfidence(p) > this.confidenceThreshold && getLandmarkConfidence(c) > this.confidenceThreshold) {
        const dx = c.x - p.x;
        const dy = c.y - p.y;
        totalMovement += Math.sqrt(dx * dx + dy * dy);
        count++;
      }
    }

    return count > 0 ? totalMovement / count : 1; // 1 means full movement if we can't calculate
  }

  private fail(reason: CalibrationFailureReason) {
    this.stableStartTime = 0;
    this.updateState("CALIBRATION_FAILED", reason);
  }

  private complete() {
    this.updateState("CALIBRATION_COMPLETE", null);
  }

  private updateState(newState: CalibrationState, reason: CalibrationFailureReason) {
    if (this.state !== newState || this.reason !== reason) {
      this.state = newState;
      this.reason = reason;
      this.onCalibrationChange({
        state: this.state,
        reason: this.reason,
        boundingBox: this.boundingBox,
        isMirrored: this.isMirrored,
        isFacingRight: this.isFacingRight
      });
    }
  }
}
