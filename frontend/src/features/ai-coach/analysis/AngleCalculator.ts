import type { Landmark } from "../types/landmarks";
import { isLandmarkUsable } from "./LandmarkUtils";

export interface Point3D {
  x: number;
  y: number;
  z?: number;
}

const EPSILON = 1e-8;

function isFinitePoint(point: Point3D | Landmark | null | undefined): boolean {
  if (!point) return false;
  return (
    Number.isFinite(point.x) &&
    Number.isFinite(point.y) &&
    Number.isFinite(point.z ?? 0)
  );
}

function subtract(a: Point3D, b: Point3D): { x: number; y: number; z: number } {
  return {
    x: a.x - b.x,
    y: a.y - b.y,
    z: (a.z ?? 0) - (b.z ?? 0),
  };
}

function dot(
  a: { x: number; y: number; z: number },
  b: { x: number; y: number; z: number },
): number {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

function magnitude(point: { x: number; y: number; z: number }): number {
  return Math.sqrt(point.x ** 2 + point.y ** 2 + point.z ** 2);
}

/**
 * Calculate angle ABC in degrees [0, 180].
 *
 * A and C are the outer points.
 * B is the vertex.
 *
 * Returns null when the angle cannot be calculated
 * because the input geometry is invalid or degenerate.
 */
export function calculateAngle(
  a: Point3D | null | undefined,
  b: Point3D | null | undefined,
  c: Point3D | null | undefined,
): number | null {
  if (!isFinitePoint(a) || !isFinitePoint(b) || !isFinitePoint(c)) {
    return null;
  }

  const ba = subtract(a!, b!);
  const bc = subtract(c!, b!);

  const magnitudeBA = magnitude(ba);
  const magnitudeBC = magnitude(bc);

  if (magnitudeBA < EPSILON || magnitudeBC < EPSILON) {
    return null;
  }

  const denominator = magnitudeBA * magnitudeBC;

  if (denominator < EPSILON) {
    return null;
  }

  const cosine = dot(ba, bc) / denominator;

  // Protect against floating-point values slightly outside [-1, 1]
  const clampedCosine = Math.max(-1, Math.min(1, cosine));

  const angle = Math.acos(clampedCosine) * (180 / Math.PI);

  return Number.isFinite(angle) ? angle : null;
}

/**
 * Calculate an angle directly from MediaPipe landmarks in degrees [0, 180].
 */
export function calculateLandmarkAngle(
  a: Landmark | null | undefined,
  b: Landmark | null | undefined,
  c: Landmark | null | undefined,
  useWorldCoordinates = false,
): number | null {
  if (!a || !b || !c) {
    return null;
  }

  if (!isLandmarkUsable(a) || !isLandmarkUsable(b) || !isLandmarkUsable(c)) {
    return null;
  }

  const ab = {
    x: a.x - b.x,
    y: a.y - b.y,
    z: useWorldCoordinates ? (a.z ?? 0) - (b.z ?? 0) : 0,
  };

  const cb = {
    x: c.x - b.x,
    y: c.y - b.y,
    z: useWorldCoordinates ? (c.z ?? 0) - (b.z ?? 0) : 0,
  };

  const magnitudeAB = Math.sqrt(
    ab.x * ab.x +
    ab.y * ab.y +
    ab.z * ab.z,
  );

  const magnitudeCB = Math.sqrt(
    cb.x * cb.x +
    cb.y * cb.y +
    cb.z * cb.z,
  );

  if (
    magnitudeAB === 0 ||
    magnitudeCB === 0 ||
    !Number.isFinite(magnitudeAB) ||
    !Number.isFinite(magnitudeCB)
  ) {
    return null;
  }

  const dot =
    ab.x * cb.x +
    ab.y * cb.y +
    ab.z * cb.z;

  const cosine = Math.max(
    -1,
    Math.min(1, dot / (magnitudeAB * magnitudeCB)),
  );

  const angleRadians = Math.acos(cosine);

  const angleDegrees = angleRadians * (180 / Math.PI);

  return Number.isFinite(angleDegrees)
    ? angleDegrees
    : null;
}