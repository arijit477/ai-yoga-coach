import type { PoseLandmarks } from "../types/landmarks";
import { getLandmarkConfidence } from "../analysis/LandmarkUtils";
import type {
  BodyRegion,
  CameraReadinessResult,
  CameraState,
} from "../types/camera";
import {
  BODY_REGION_LANDMARKS,
  getRequiredBodyRegions,
} from "../analysis/AsanaLandmarkRequirements";

export interface CameraEvaluatorOptions {
  requiredLandmarks?: number[];
  requiredRegions?: BodyRegion[];
  confidenceThreshold?: number;
  hardwareStatus?: "disabled" | "starting" | "ready" | "error";
}

const DEFAULT_REQUIRED_REGIONS: BodyRegion[] = [
  "head",
  "shoulders",
  "torso",
  "hips",
  "knees",
  "feet",
];

export function evaluateCameraReadiness(
  landmarks: PoseLandmarks | null | undefined,
  options?: CameraEvaluatorOptions,
): CameraReadinessResult {
  const hardwareStatus = options?.hardwareStatus ?? "ready";
  const threshold = options?.confidenceThreshold ?? 0.45;

  let required: BodyRegion[];
  if (options?.requiredRegions && options.requiredRegions.length > 0) {
    required = options.requiredRegions;
  } else if (options?.requiredLandmarks && options.requiredLandmarks.length > 0) {
    required = getRequiredBodyRegions(options.requiredLandmarks);
  } else {
    required = DEFAULT_REQUIRED_REGIONS;
  }

  const requiredLandmarks = options?.requiredLandmarks ?? [];

  if (hardwareStatus === "disabled") {
    return {
      ready: false,
      state: "camera_disabled",
      requiredLandmarks,
      missingLandmarks: requiredLandmarks,
      requiredRegions: required,
      missing: [...required],
      confidence: 0,
      guidance: "camera_disabled",
    };
  }

  if (hardwareStatus === "starting") {
    return {
      ready: false,
      state: "camera_starting",
      requiredLandmarks,
      missingLandmarks: requiredLandmarks,
      requiredRegions: required,
      missing: [...required],
      confidence: 0,
      guidance: "no_body",
    };
  }

  if (hardwareStatus === "error") {
    return {
      ready: false,
      state: "camera_error",
      requiredLandmarks,
      missingLandmarks: requiredLandmarks,
      requiredRegions: required,
      missing: [...required],
      confidence: 0,
      guidance: "camera_error",
    };
  }

  // Hardware is ready, inspect landmarks
  if (!landmarks || landmarks.length === 0) {
    return {
      ready: false,
      state: "camera_no_pose",
      requiredLandmarks,
      missingLandmarks: requiredLandmarks,
      requiredRegions: required,
      missing: [...required],
      confidence: 0,
      guidance: "no_body",
    };
  }

  const isIndexVisible = (idx: number): boolean => {
    const lm = landmarks[idx];
    return Boolean(lm && getLandmarkConfidence(lm) >= threshold);
  };

  const isAnyVisible = (indices: readonly number[]): boolean => {
    return indices.some((i) => isIndexVisible(i));
  };

  // Evaluate visibility for every BodyRegion
  const regionVisibility: Record<BodyRegion, boolean> = {
    head: isAnyVisible(BODY_REGION_LANDMARKS.head),
    neck: isAnyVisible(BODY_REGION_LANDMARKS.neck),
    shoulders: isAnyVisible(BODY_REGION_LANDMARKS.shoulders),
    elbows: isAnyVisible(BODY_REGION_LANDMARKS.elbows),
    wrists: isAnyVisible(BODY_REGION_LANDMARKS.wrists),
    spine: isAnyVisible(BODY_REGION_LANDMARKS.spine),
    torso: isAnyVisible(BODY_REGION_LANDMARKS.torso),
    hips: isAnyVisible(BODY_REGION_LANDMARKS.hips),
    knees: isAnyVisible(BODY_REGION_LANDMARKS.knees),
    ankles: isAnyVisible(BODY_REGION_LANDMARKS.ankles),
    feet: isAnyVisible(BODY_REGION_LANDMARKS.feet),
  };

  const missing: BodyRegion[] = [];
  for (const region of required) {
    if (!regionVisibility[region]) {
      missing.push(region);
    }
  }

  // Find specifically missing required landmarks if requiredLandmarks provided
  const missingLandmarks: number[] = [];
  for (const idx of requiredLandmarks) {
    if (!isIndexVisible(idx)) {
      missingLandmarks.push(idx);
    }
  }

  // Calculate average confidence of required or present landmarks
  let totalConf = 0;
  let pointCount = 0;
  const targetIndices = requiredLandmarks.length > 0 ? requiredLandmarks : Array.from({ length: 33 }, (_, i) => i);
  for (const idx of targetIndices) {
    const lm = landmarks[idx];
    if (lm) {
      totalConf += getLandmarkConfidence(lm);
      pointCount++;
    }
  }
  const avgConfidence = pointCount > 0 ? totalConf / pointCount : 0;

  // If all required regions/landmarks are visible
  if (missing.length === 0) {
    if (avgConfidence < 0.3) {
      return {
        ready: false,
        state: "camera_partial",
        requiredLandmarks,
        missingLandmarks,
        requiredRegions: required,
        missing,
        confidence: avgConfidence,
        guidance: "poor_confidence",
      };
    }

    return {
      ready: true,
      state: "camera_ready",
      requiredLandmarks,
      missingLandmarks: [],
      requiredRegions: required,
      missing: [],
      confidence: avgConfidence,
      guidance: "camera_ready",
    };
  }

  // If no landmarks in the body are visible at all
  const hasAnyBodyVisible = Object.values(regionVisibility).some(Boolean);

  if (!hasAnyBodyVisible) {
    if (avgConfidence > 0 && avgConfidence < threshold) {
      return {
        ready: false,
        state: "camera_partial",
        requiredLandmarks,
        missingLandmarks,
        requiredRegions: required,
        missing,
        confidence: avgConfidence,
        guidance: "poor_confidence",
      };
    }

    return {
      ready: false,
      state: "camera_no_pose",
      requiredLandmarks,
      missingLandmarks,
      requiredRegions: required,
      missing,
      confidence: avgConfidence,
      guidance: "no_body",
    };
  }

  let state: CameraState = "camera_partial";
  let guidanceKey: CameraReadinessResult["guidance"] = "partial_body";

  if (missing.includes("feet") && !missing.includes("head")) {
    guidanceKey = "feet_missing";
  } else if (missing.includes("head") && !missing.includes("feet")) {
    guidanceKey = "head_missing";
  } else if (avgConfidence < 0.3) {
    guidanceKey = "poor_confidence";
  } else {
    guidanceKey = "partial_body";
  }

  return {
    ready: false,
    state,
    requiredLandmarks,
    missingLandmarks,
    requiredRegions: required,
    missing,
    confidence: avgConfidence,
    guidance: guidanceKey,
  };
}
