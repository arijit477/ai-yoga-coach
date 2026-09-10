import type { Landmark } from "../types/landmarks";

export interface Point3D {
  x: number;
  y: number;
  z: number;
}

const EPSILON = 1e-8;

function isFinitePoint(point: Point3D): boolean {
  return (
    Number.isFinite(point.x) &&
    Number.isFinite(point.y) &&
    Number.isFinite(point.z)
  );
}

function subtract(a: Point3D, b: Point3D): Point3D {
  return {
    x: a.x - b.x,
    y: a.y - b.y,
    z: a.z - b.z,
  };
}

function dot(a: Point3D, b: Point3D): number {
  return (
    a.x * b.x +
    a.y * b.y +
    a.z * b.z
  );
}

function magnitude(point: Point3D): number {
  return Math.sqrt(
    point.x ** 2 +
      point.y ** 2 +
      point.z ** 2,
  );
}

/**
 * Calculate angle ABC in degrees.
 *
 * A and C are the outer points.
 * B is the vertex.
 *
 * Returns null when the angle cannot be calculated
 * because the input geometry is invalid.
 */
export function calculateAngle(
  a: Point3D,
  b: Point3D,
  c: Point3D,
): number | null {
  if (
    !isFinitePoint(a) ||
    !isFinitePoint(b) ||
    !isFinitePoint(c)
  ) {
    return null;
  }

  const ba = subtract(a, b);
  const bc = subtract(c, b);

  const magnitudeBA = magnitude(ba);
  const magnitudeBC = magnitude(bc);

  if (
    magnitudeBA < EPSILON ||
    magnitudeBC < EPSILON
  ) {
    return null;
  }

  const denominator =
    magnitudeBA * magnitudeBC;

  if (denominator < EPSILON) {
    return null;
  }

  const cosine =
    dot(ba, bc) / denominator;

  // Protect against floating-point values
  // slightly outside [-1, 1].
  const clampedCosine = Math.max(
    -1,
    Math.min(1, cosine),
  );

  const angle =
    Math.acos(clampedCosine) *
    (180 / Math.PI);

  return Number.isFinite(angle)
    ? angle
    : null;
}

/**
 * Calculate an angle directly from MediaPipe landmarks.
 */
export function calculateLandmarkAngle(
  a: Landmark,
  b: Landmark,
  c: Landmark,
): number | null {
  return calculateAngle(a, b, c);
}