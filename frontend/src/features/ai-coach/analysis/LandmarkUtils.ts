import type { Landmark, PoseLandmarks } from "../types/landmarks";

export interface NormalizedLandmark extends Landmark {
  x: number;
  y: number;
  z: number;
  visibility: number;
  presence: number;
}

const DEFAULT_VISIBILITY = 1;
const DEFAULT_PRESENCE = 1;

export function normalizeLandmark(
  landmark: Landmark,
): NormalizedLandmark {
  return {
    x: landmark.x,
    y: landmark.y,
    z: landmark.z,
    visibility: landmark.visibility ?? DEFAULT_VISIBILITY,
    presence: landmark.presence ?? DEFAULT_PRESENCE,
  };
}

export function isLandmarkValid(
  landmark: Landmark | undefined | null,
  minVisibility = 0.5,
  minPresence = 0.5,
): boolean {
  if (!landmark) {
    return false;
  }

  if (
    !Number.isFinite(landmark.x) ||
    !Number.isFinite(landmark.y) ||
    !Number.isFinite(landmark.z)
  ) {
    return false;
  }

  const visibility = landmark.visibility ?? DEFAULT_VISIBILITY;
  const presence = landmark.presence ?? DEFAULT_PRESENCE;

  return visibility >= minVisibility && presence >= minPresence;
}

export function areLandmarksValid(
  landmarks: PoseLandmarks,
  indices: number[],
  minVisibility = 0.5,
  minPresence = 0.5,
): boolean {
  return indices.every((index) =>
    isLandmarkValid(
      landmarks[index],
      minVisibility,
      minPresence,
    ),
  );
}

export function getLandmark(
  landmarks: PoseLandmarks,
  index: number,
): NormalizedLandmark | null {
  const landmark = landmarks[index];

  if (!isLandmarkValid(landmark)) {
    return null;
  }

  return normalizeLandmark(landmark);
}