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
): number | null {
  if (!a || !b || !c) {
    return null;
  }

  if (!isLandmarkUsable(a) || !isLandmarkUsable(b) || !isLandmarkUsable(c)) {
    return null;
  }

  return calculateAngle(
    { x: a.x, y: a.y, z: a.z ?? 0 },
    { x: b.x, y: b.y, z: b.z ?? 0 },
    { x: c.x, y: c.y, z: c.z ?? 0 },
  );
}