/**
 * Explicit Camera State and Validation Types
 */

export type CameraState =
  | "camera_disabled"
  | "camera_starting"
  | "camera_ready"
  | "camera_checking"
  | "camera_partial"
  | "camera_no_pose"
  | "camera_error";

export type CameraGuidanceKey =
  | "no_body"
  | "partial_body"
  | "feet_missing"
  | "head_missing"
  | "poor_confidence"
  | "camera_ready"
  | "camera_disabled"
  | "camera_error";

export type BodyRegion =
  | "head"
  | "neck"
  | "shoulders"
  | "elbows"
  | "wrists"
  | "spine"
  | "torso"
  | "hips"
  | "knees"
  | "ankles"
  | "feet";

export interface CameraReadinessResult {
  ready: boolean;
  state: CameraState;
  requiredLandmarks?: number[];
  missingLandmarks?: number[];
  requiredRegions?: BodyRegion[];
  missing: BodyRegion[];
  confidence: number;
  guidance: CameraGuidanceKey;
}

export const CAMERA_GUIDANCE_MESSAGES: Record<CameraGuidanceKey, string> = {
  no_body: "Please move into the camera frame.",
  partial_body: "Move back slightly so I can see your full body.",
  feet_missing: "Make sure your feet are visible.",
  head_missing: "Make sure your head is visible.",
  poor_confidence: "Adjust your position or lighting.",
  camera_ready: "Ready for Yoga.",
  camera_disabled: "Camera is off.",
  camera_error: "Camera error. Please check permissions.",
};
