import type { Landmark } from "../types/landmarks";

export interface AlignmentResult {
  aligned: boolean;
  deviation: number;
}

const EPSILON = 1e-8;

/**
 * Calculate the absolute difference between the Y coordinates
 * of two landmarks.
 *
 * A small value means the landmarks are horizontally aligned.
 *
 * Example:
 * left shoulder Y ≈ right shoulder Y
 */
export function calculateHorizontalDeviation(
  a: Landmark,
  b: Landmark,
): number | null {
  if (!areValidLandmarks(a, b)) {
    return null;
  }

  return Math.abs(a.y - b.y);
}

/**
 * Calculate the absolute difference between the X coordinates
 * of two landmarks.
 *
 * A small value means the landmarks are vertically aligned.
 *
 * Example:
 * knee X ≈ ankle X
 */
export function calculateVerticalDeviation(
  a: Landmark,
  b: Landmark,
): number | null {
  if (!areValidLandmarks(a, b)) {
    return null;
  }

  return Math.abs(a.x - b.x);
}

/**
 * Check whether two landmarks are horizontally aligned.
 *
 * `tolerance` is expressed in normalized image coordinates.
 */
export function isHorizontallyAligned(
  a: Landmark,
  b: Landmark,
  tolerance = 0.05,
): boolean {
  const deviation =
    calculateHorizontalDeviation(a, b);

  if (deviation === null) {
    return false;
  }

  return deviation <= tolerance;
}

/**
 * Check whether two landmarks are vertically aligned.
 *
 * `tolerance` is expressed in normalized image coordinates.
 */
export function isVerticallyAligned(
  a: Landmark,
  b: Landmark,
  tolerance = 0.05,
): boolean {
  const deviation =
    calculateVerticalDeviation(a, b);

  if (deviation === null) {
    return false;
  }

  return deviation <= tolerance;
}

/**
 * Calculate horizontal alignment between two landmarks.
 *
 * Returns both the alignment state and deviation.
 */
export function calculateHorizontalAlignment(
  a: Landmark,
  b: Landmark,
  tolerance = 0.05,
): AlignmentResult | null {
  const deviation =
    calculateHorizontalDeviation(a, b);

  if (deviation === null) {
    return null;
  }

  return {
    aligned: deviation <= tolerance,
    deviation,
  };
}

/**
 * Calculate vertical alignment between two landmarks.
 *
 * Returns both the alignment state and deviation.
 */
export function calculateVerticalAlignment(
  a: Landmark,
  b: Landmark,
  tolerance = 0.05,
): AlignmentResult | null {
  const deviation =
    calculateVerticalDeviation(a, b);

  if (deviation === null) {
    return null;
  }

  return {
    aligned: deviation <= tolerance,
    deviation,
  };
}

/**
 * Calculate the slope between two landmarks.
 *
 * A value close to zero means the line between the
 * landmarks is approximately horizontal.
 */
export function calculateHorizontalSlope(
  a: Landmark,
  b: Landmark,
): number | null {
  if (!areValidLandmarks(a, b)) {
    return null;
  }

  const dx = b.x - a.x;
  const dy = b.y - a.y;

  if (Math.abs(dx) < EPSILON) {
    return null;
  }

  return dy / dx;
}

/**
 * Calculate the slope between two landmarks
 * for vertical-orientation analysis.
 *
 * Returns dx / dy.
 *
 * A value close to zero means the line between the
 * landmarks is approximately vertical.
 */
export function calculateVerticalSlope(
  a: Landmark,
  b: Landmark,
): number | null {
  if (!areValidLandmarks(a, b)) {
    return null;
  }

  const dx = b.x - a.x;
  const dy = b.y - a.y;

  if (Math.abs(dy) < EPSILON) {
    return null;
  }

  return dx / dy;
}

/**
 * Validate landmark coordinates.
 *
 * This intentionally does not impose a coordinate range because
 * image landmarks and world landmarks use different coordinate
 * systems.
 */
function areValidLandmarks(
  a: Landmark | undefined | null,
  b: Landmark | undefined | null,
): boolean {
  if (!a || !b) {
    return false;
  }

  return (
    Number.isFinite(a.x) &&
    Number.isFinite(a.y) &&
    Number.isFinite(a.z) &&
    Number.isFinite(b.x) &&
    Number.isFinite(b.y) &&
    Number.isFinite(b.z)
  );
}