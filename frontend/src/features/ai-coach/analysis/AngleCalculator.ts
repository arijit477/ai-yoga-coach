import type { Landmark } from "../types/landmarks";

export interface Point3D {
  x: number;
  y: number;
  z: number;
}

/**
 * Calculate the angle ABC.
 *
 * A = first point
 * B = vertex
 * C = third point
 *
 * Example:
 *
 * calculateAngle(hip, knee, ankle)
 *
 * gives the knee angle.
 */
export function calculateAngle(
  a: Point3D,
  b: Point3D,
  c: Point3D
): number {
  const ba = {
    x: a.x - b.x,
    y: a.y - b.y,
    z: a.z - b.z,
  };

  const bc = {
    x: c.x - b.x,
    y: c.y - b.y,
    z: c.z - b.z,
  };

  const dotProduct =
    ba.x * bc.x +
    ba.y * bc.y +
    ba.z * bc.z;

  const magnitudeBA = Math.sqrt(
    ba.x ** 2 +
      ba.y ** 2 +
      ba.z ** 2
  );

  const magnitudeBC = Math.sqrt(
    bc.x ** 2 +
      bc.y ** 2 +
      bc.z ** 2
  );

  if (
    magnitudeBA === 0 ||
    magnitudeBC === 0
  ) {
    return 0;
  }

  const cosine =
    dotProduct /
    (magnitudeBA * magnitudeBC);

  // Protect against floating-point errors.
  const clampedCosine = Math.max(
    -1,
    Math.min(1, cosine)
  );

  const radians = Math.acos(
    clampedCosine
  );

  return radians * (180 / Math.PI);
}

/**
 * Convenience wrapper for MediaPipe landmarks.
 */
export function calculateLandmarkAngle(
  a: Landmark,
  b: Landmark,
  c: Landmark
): number {
  return calculateAngle(a, b, c);
}