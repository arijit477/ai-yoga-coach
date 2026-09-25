import type { Landmark } from "../types/landmarks";
import { isLandmarkUsable } from "./LandmarkUtils";

export interface Point2D {
  x: number;
  y: number;
}

export interface Point3D {
  x: number;
  y: number;
  z?: number;
}

const EPSILON = 1e-8;

/**
 * Check whether a 2D point contains valid numeric coordinates.
 */
function isFinitePoint2D(point: Point2D | null | undefined): boolean {
  if (!point) return false;
  return Number.isFinite(point.x) && Number.isFinite(point.y);
}

/**
 * Check whether a 3D point contains valid numeric coordinates.
 */
function isFinitePoint3D(point: Point3D | null | undefined): boolean {
  if (!point) return false;
  return (
    Number.isFinite(point.x) &&
    Number.isFinite(point.y) &&
    Number.isFinite(point.z ?? 0)
  );
}

/**
 * Calculate Euclidean distance between two 2D points.
 *
 * Useful for image-space landmark relationships.
 */
export function calculateDistance2D(
  a: Point2D | null | undefined,
  b: Point2D | null | undefined,
): number | null {
  if (!isFinitePoint2D(a) || !isFinitePoint2D(b)) {
    return null;
  }

  const dx = a!.x - b!.x;
  const dy = a!.y - b!.y;

  const distance = Math.sqrt(dx ** 2 + dy ** 2);

  return Number.isFinite(distance) ? distance : null;
}

/**
 * Calculate Euclidean distance between two 3D points.
 *
 * This should generally be used with MediaPipe
 * world landmarks when analyzing actual body geometry.
 */
export function calculateDistance3D(
  a: Point3D | null | undefined,
  b: Point3D | null | undefined,
): number | null {
  if (!isFinitePoint3D(a) || !isFinitePoint3D(b)) {
    return null;
  }

  const dx = a!.x - b!.x;
  const dy = a!.y - b!.y;
  const dz = (a!.z ?? 0) - (b!.z ?? 0);

  const distance = Math.sqrt(dx ** 2 + dy ** 2 + dz ** 2);

  return Number.isFinite(distance) ? distance : null;
}

/**
 * Calculate distance between two MediaPipe landmarks
 * using their 3D coordinates.
 */
export function calculateLandmarkDistance(
  a: Landmark | null | undefined,
  b: Landmark | null | undefined,
): number | null {
  if (!a || !b) {
    return null;
  }
  if (!isLandmarkUsable(a) || !isLandmarkUsable(b)) {
    return null;
  }
  return calculateDistance3D(a, b);
}

/**
 * Calculate distance between two MediaPipe landmarks
 * using only their image-space coordinates.
 */
export function calculateLandmarkDistance2D(
  a: Landmark | null | undefined,
  b: Landmark | null | undefined,
): number | null {
  if (!a || !b) {
    return null;
  }
  if (!isLandmarkUsable(a) || !isLandmarkUsable(b)) {
    return null;
  }
  return calculateDistance2D(a, b);
}


/**
 * Calculate a distance relative to a reference distance.
 *
 * Example:
 *
 * wrist-to-hip distance / shoulder-width
 *
 * This makes measurements more independent of how
 * close the user is to the camera.
 */
export function calculateRelativeDistance(
  distance: number,
  referenceDistance: number,
): number | null {
  if (
    !Number.isFinite(distance) ||
    !Number.isFinite(referenceDistance) ||
    referenceDistance <= EPSILON
  ) {
    return null;
  }

  const relativeDistance =
    distance / referenceDistance;

  return Number.isFinite(relativeDistance)
    ? relativeDistance
    : null;
}

/**
 * Calculate the relative distance between two landmarks
 * using another pair of landmarks as the body-size reference.
 *
 * Example:
 *
 * distance(A, B) / distance(C, D)
 */
export function calculateRelativeLandmarkDistance(
  a: Landmark,
  b: Landmark,
  referenceA: Landmark,
  referenceB: Landmark,
): number | null {
  const distance =
    calculateLandmarkDistance(a, b);

  const referenceDistance =
    calculateLandmarkDistance(
      referenceA,
      referenceB,
    );

  if (
    distance === null ||
    referenceDistance === null
  ) {
    return null;
  }

  return calculateRelativeDistance(
    distance,
    referenceDistance,
  );
}