import type { PoseFeatures } from "./pose-features";

export type LandmarkStatus = "VALID" | "LOW_CONFIDENCE" | "MISSING";

export type PoseValidity = "no_pose" | "partial_pose" | "valid_pose";

export interface Landmark {
  x: number;
  y: number;
  z: number;
  visibility?: number;
  presence?: number;
}

export type PoseLandmarks = Landmark[];

export interface PoseTrackingResult {
  landmarks: PoseLandmarks;
  worldLandmarks: PoseLandmarks;
  timestamp: number;
  confidence: number;
  validity?: PoseValidity;
  landmarkStatuses?: LandmarkStatus[];
  features?: PoseFeatures;
}

/**
 * Quality information for a single landmark.
 */
export interface LandmarkQuality {
  valid: boolean;
  visibility: number;
  presence: number;
}

/**
 * Overall quality of the detected pose.
 */
export interface PoseQuality {
  valid: boolean;
  confidence: number;
  validLandmarks: number;
  totalLandmarks: number;
}