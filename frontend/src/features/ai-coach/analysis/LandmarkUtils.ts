import type {
  Landmark,
  PoseLandmarks,
} from "../types/landmarks";

export interface NormalizedLandmark
  extends Landmark {
  x: number;
  y: number;
  z: number;
  visibility: number;
  presence: number;
}

const DEFAULT_VISIBILITY = 1;
const DEFAULT_PRESENCE = 1;



const DEFAULT_MIN_VISIBILITY = 0.5;
const DEFAULT_MIN_PRESENCE = 0.5;

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
  const visibility = Number.isFinite(
    landmark.visibility,
  )
    ? clamp(landmark.visibility!, 0, 1)
    : DEFAULT_VISIBILITY;

  const presence = Number.isFinite(
    landmark.presence,
  )
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
 * Check whether a landmark contains valid
 * MediaPipe coordinates and confidence values.
 */
export function isLandmarkValid(
  landmark: Landmark | undefined | null,
  minVisibility = DEFAULT_MIN_VISIBILITY,
  minPresence = DEFAULT_MIN_PRESENCE,
): boolean {
  if (!landmark) {
    return false;
  }

  // Coordinates must be real finite numbers.
  if (
    !Number.isFinite(landmark.x) ||
    !Number.isFinite(landmark.y) ||
    !Number.isFinite(landmark.z)
  ) {
    return false;
  }

  // MediaPipe image coordinates are normally
  // normalized around [0, 1].
  //
  // We allow a small amount outside that range
  // because pose models can produce coordinates
  // slightly outside the visible image.


  const visibility =
    landmark.visibility ??
    DEFAULT_VISIBILITY;

  const presence =
    landmark.presence ??
    DEFAULT_PRESENCE;

  // Confidence values must themselves be valid.
  if (
    !Number.isFinite(visibility) ||
    !Number.isFinite(presence)
  ) {
    return false;
  }

  if (
    visibility < 0 ||
    visibility > 1 ||
    presence < 0 ||
    presence > 1
  ) {
    return false;
  }

  return (
    visibility >= minVisibility &&
    presence >= minPresence
  );
}

/**
 * Validate a set of landmarks required by a rule.
 */
export function areLandmarksValid(
  landmarks: PoseLandmarks,
  indices: number[],
  minVisibility = DEFAULT_MIN_VISIBILITY,
  minPresence = DEFAULT_MIN_PRESENCE,
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
  minVisibility = DEFAULT_MIN_VISIBILITY,
  minPresence = DEFAULT_MIN_PRESENCE,
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

/**
 * Get the effective confidence of a landmark.
 *
 * We use the lower of visibility and presence because
 * both need to be reliable for pose analysis.
 */
export function getLandmarkConfidence(
  landmark: Landmark | undefined | null,
): number {
  if (!landmark) {
    return 0;
  }

  const visibility =
    Number.isFinite(landmark.visibility)
      ? clamp(landmark.visibility!, 0, 1)
      : DEFAULT_VISIBILITY;

  const presence =
    Number.isFinite(landmark.presence)
      ? clamp(landmark.presence!, 0, 1)
      : DEFAULT_PRESENCE;

  return Math.min(
    visibility,
    presence,
  );
}