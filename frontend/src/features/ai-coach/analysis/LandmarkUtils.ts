import type {
  Landmark,
  PoseLandmarks,
  LandmarkStatus,
  PoseValidity,
} from "../types/landmarks";

export interface NormalizedLandmark extends Landmark {
  x: number;
  y: number;
  z: number;
  visibility: number;
  presence: number;
}

export interface LandmarkConfidenceConfig {
  minVisibility: number;
  minPresence: number;
  minCombinedConfidence: number;
  lowConfidenceThreshold: number;
}

export const LANDMARK_CONFIDENCE_CONFIG: LandmarkConfidenceConfig = {
  minVisibility: 0.5,
  minPresence: 0.5,
  minCombinedConfidence: 0.5,
  lowConfidenceThreshold: 0.25,
};

const DEFAULT_VISIBILITY = 1;
const DEFAULT_PRESENCE = 1;

/**
 * Reusable body landmark index groups (MediaPipe 33 landmark topology)
 */
export const BODY_LANDMARK_GROUPS = {
  face: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  head: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  shoulders: [11, 12],
  elbows: [13, 14],
  wrists: [15, 16],
  torso: [11, 12, 23, 24],
  hips: [23, 24],
  knees: [25, 26],
  ankles: [27, 28],
  feet: [27, 28, 29, 30, 31, 32],
} as const;

/**
 * Clamp a numeric value to a defined range.
 */
function clamp(
  value: number,
  min: number,
  max: number,
): number {
  return Math.min(
    max,
    Math.max(min, value),
  );
}

/**
 * Normalize a MediaPipe landmark.
 *
 * Coordinates are kept as supplied by MediaPipe.
 * Confidence values are normalized to [0, 1].
 */
export function normalizeLandmark(
  landmark: Landmark,
): NormalizedLandmark {
  const visibility = Number.isFinite(landmark.visibility)
    ? clamp(landmark.visibility!, 0, 1)
    : DEFAULT_VISIBILITY;

  const presence = Number.isFinite(landmark.presence)
    ? clamp(landmark.presence!, 0, 1)
    : DEFAULT_PRESENCE;

  return {
    x: landmark.x,
    y: landmark.y,
    z: landmark.z,
    visibility,
    presence,
  };
}

/**
 * Classify a landmark status into VALID, LOW_CONFIDENCE, or MISSING.
 * Safe against undefined/null/incomplete inputs.
 */
export function getLandmarkStatus(
  landmark: Landmark | undefined | null,
  config: Partial<LandmarkConfidenceConfig> = {},
): LandmarkStatus {
  if (!landmark) {
    return "MISSING";
  }

  if (
    !Number.isFinite(landmark.x) ||
    !Number.isFinite(landmark.y) ||
    !Number.isFinite(landmark.z)
  ) {
    return "MISSING";
  }

  const minVisibility = config.minVisibility ?? LANDMARK_CONFIDENCE_CONFIG.minVisibility;
  const minPresence = config.minPresence ?? LANDMARK_CONFIDENCE_CONFIG.minPresence;
  const minCombinedConfidence = config.minCombinedConfidence ?? LANDMARK_CONFIDENCE_CONFIG.minCombinedConfidence;
  const lowThreshold = config.lowConfidenceThreshold ?? LANDMARK_CONFIDENCE_CONFIG.lowConfidenceThreshold;

  const rawVis = landmark.visibility;
  const rawPres = landmark.presence;

  const visibility = rawVis !== undefined && Number.isFinite(rawVis)
    ? clamp(rawVis, 0, 1)
    : DEFAULT_VISIBILITY;

  const presence = rawPres !== undefined && Number.isFinite(rawPres)
    ? clamp(rawPres, 0, 1)
    : DEFAULT_PRESENCE;

  const combinedConfidence = Math.min(visibility, presence);

  if (
    visibility >= minVisibility &&
    presence >= minPresence &&
    combinedConfidence >= minCombinedConfidence
  ) {
    return "VALID";
  }

  if (
    visibility >= lowThreshold &&
    presence >= lowThreshold &&
    combinedConfidence >= lowThreshold
  ) {
    return "LOW_CONFIDENCE";
  }

  return "MISSING";
}

/**
 * Check whether a landmark contains valid coordinates and sufficient confidence.
 */
export function isLandmarkValid(
  landmark: Landmark | undefined | null,
  minVisibility = LANDMARK_CONFIDENCE_CONFIG.minVisibility,
  minPresence = LANDMARK_CONFIDENCE_CONFIG.minPresence,
): boolean {
  return (
    getLandmarkStatus(landmark, {
      minVisibility,
      minPresence,
      minCombinedConfidence: Math.min(minVisibility, minPresence),
    }) === "VALID"
  );
}

/**
 * Check whether a landmark is usable (either VALID or LOW_CONFIDENCE).
 */
export function isLandmarkUsable(
  landmark: Landmark | undefined | null,
  minThreshold = LANDMARK_CONFIDENCE_CONFIG.lowConfidenceThreshold,
): boolean {
  if (!landmark) return false;
  const status = getLandmarkStatus(landmark, {
    lowConfidenceThreshold: minThreshold,
  });
  return status === "VALID" || status === "LOW_CONFIDENCE";
}

/**
 * Get the effective confidence of a landmark (0 to 1).
 */
export function getLandmarkConfidence(
  landmark: Landmark | undefined | null,
): number {
  if (!landmark) {
    return 0;
  }

  if (
    !Number.isFinite(landmark.x) ||
    !Number.isFinite(landmark.y) ||
    !Number.isFinite(landmark.z)
  ) {
    return 0;
  }

  const visibility = Number.isFinite(landmark.visibility)
    ? clamp(landmark.visibility!, 0, 1)
    : DEFAULT_VISIBILITY;

  const presence = Number.isFinite(landmark.presence)
    ? clamp(landmark.presence!, 0, 1)
    : DEFAULT_PRESENCE;

  return Math.min(visibility, presence);
}

/**
 * Evaluate structured pose validity: "no_pose" | "partial_pose" | "valid_pose".
 * Generic across all yoga poses and views.
 */
export function evaluatePoseValidity(
  landmarks: PoseLandmarks | null | undefined,
  config: LandmarkConfidenceConfig = LANDMARK_CONFIDENCE_CONFIG,
): PoseValidity {
  if (!landmarks || landmarks.length < 33) {
    return "no_pose";
  }

  // Core torso anchors
  const leftShoulderValid = isLandmarkValid(landmarks[11], config.minVisibility, config.minPresence);
  const rightShoulderValid = isLandmarkValid(landmarks[12], config.minVisibility, config.minPresence);
  const leftHipValid = isLandmarkValid(landmarks[23], config.minVisibility, config.minPresence);
  const rightHipValid = isLandmarkValid(landmarks[24], config.minVisibility, config.minPresence);

  const leftShoulderUsable = isLandmarkUsable(landmarks[11], config.lowConfidenceThreshold);
  const rightShoulderUsable = isLandmarkUsable(landmarks[12], config.lowConfidenceThreshold);
  const leftHipUsable = isLandmarkUsable(landmarks[23], config.lowConfidenceThreshold);
  const rightHipUsable = isLandmarkUsable(landmarks[24], config.lowConfidenceThreshold);

  const validTorsoCount = (leftShoulderValid ? 1 : 0) +
    (rightShoulderValid ? 1 : 0) +
    (leftHipValid ? 1 : 0) +
    (rightHipValid ? 1 : 0);

  const usableTorsoCount = (leftShoulderUsable ? 1 : 0) +
    (rightShoulderUsable ? 1 : 0) +
    (leftHipUsable ? 1 : 0) +
    (rightHipUsable ? 1 : 0);

  // If no shoulders or no hips are detected/usable at all -> no pose
  const hasShoulders = leftShoulderUsable || rightShoulderUsable;
  const hasHips = leftHipUsable || rightHipUsable;

  if (!hasShoulders && !hasHips) {
    return "no_pose";
  }

  // Count valid extremity joints (knees, ankles, elbows, wrists)
  const extremityIndices = [13, 14, 15, 16, 25, 26, 27, 28];
  let validExtremityCount = 0;
  for (const idx of extremityIndices) {
    if (isLandmarkValid(landmarks[idx], config.minVisibility, config.minPresence)) {
      validExtremityCount++;
    }
  }

  // Valid pose: all 4 torso points valid + at least 2 limb points valid (e.g. at least one arm or leg pair)
  if (validTorsoCount === 4 && validExtremityCount >= 2) {
    return "valid_pose";
  }

  // If core anchors are mostly present (e.g. at least 2 torso points usable or valid) -> partial pose
  if (usableTorsoCount >= 2 || (hasShoulders && validExtremityCount >= 1)) {
    return "partial_pose";
  }

  return "no_pose";
}

/**
 * Validate a set of landmarks required by a rule.
 */
export function areLandmarksValid(
  landmarks: PoseLandmarks,
  indices: number[],
  minVisibility = LANDMARK_CONFIDENCE_CONFIG.minVisibility,
  minPresence = LANDMARK_CONFIDENCE_CONFIG.minPresence,
): boolean {
  if (!landmarks || indices.length === 0) {
    return false;
  }

  return indices.every((index) => {
    if (
      !Number.isInteger(index) ||
      index < 0 ||
      index >= landmarks.length
    ) {
      return false;
    }

    return isLandmarkValid(
      landmarks[index],
      minVisibility,
      minPresence,
    );
  });
}

/**
 * Safely retrieve a validated landmark.
 */
export function getLandmark(
  landmarks: PoseLandmarks,
  index: number,
  minVisibility = LANDMARK_CONFIDENCE_CONFIG.minVisibility,
  minPresence = LANDMARK_CONFIDENCE_CONFIG.minPresence,
): NormalizedLandmark | null {
  if (
    !landmarks ||
    !Number.isInteger(index) ||
    index < 0 ||
    index >= landmarks.length
  ) {
    return null;
  }

  const landmark = landmarks[index];

  if (
    !isLandmarkValid(
      landmark,
      minVisibility,
      minPresence,
    )
  ) {
    return null;
  }

  return normalizeLandmark(landmark);
}