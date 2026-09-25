import { describe, it } from "node:test";
import assert from "node:assert/strict";

import type { Landmark, PoseLandmarks } from "../../types/landmarks.ts";
import { PoseLandmarkIndex as P } from "../../types/pose-landmarks.ts";
import { calculateAngle, calculateLandmarkAngle } from "../AngleCalculator.ts";
import {
  calculateDistance2D,
  calculateDistance3D,
  calculateLandmarkDistance,
  calculateRelativeDistance,
} from "../DistanceCalculator.ts";
import {
  calculateHorizontalDeviation,
  calculateVerticalDeviation,
} from "../AlignmentCalculator.ts";
import {
  extractPoseFeatures,
  extractJointAngles,
  extractBodyGeometry,
  extractAlignments,
} from "../PoseFeatureEngine.ts";

function createSyntheticLandmarks(overrides: Partial<Record<number, Partial<Landmark>>> = {}): PoseLandmarks {
  const landmarks: PoseLandmarks = [];
  for (let i = 0; i < 33; i++) {
    const base: Landmark = {
      x: 0.5,
      y: 0.5,
      z: 0.0,
      visibility: 0.95,
      presence: 0.95,
    };
    if (overrides[i]) {
      landmarks.push({ ...base, ...overrides[i] });
    } else {
      landmarks.push(base);
    }
  }
  return landmarks;
}

describe("Pose Feature Engine Unit Tests", () => {
  // Test 1: 90-degree joint angle
  it("1. 90-degree joint angle: correctly calculates perpendicular vectors", () => {
    const a = { x: 0, y: 1, z: 0 };
    const b = { x: 0, y: 0, z: 0 }; // vertex
    const c = { x: 1, y: 0, z: 0 };
    const angle = calculateAngle(a, b, c);
    assert.ok(angle !== null);
    assert.ok(Math.abs(angle - 90) < 1e-4, `Expected 90 deg, got ${angle}`);
  });

  // Test 2: 180-degree joint angle
  it("2. 180-degree joint angle: correctly calculates straight line vectors", () => {
    const a = { x: -1, y: 0, z: 0 };
    const b = { x: 0, y: 0, z: 0 }; // vertex
    const c = { x: 1, y: 0, z: 0 };
    const angle = calculateAngle(a, b, c);
    assert.ok(angle !== null);
    assert.ok(Math.abs(angle - 180) < 1e-4, `Expected 180 deg, got ${angle}`);
  });

  // Test 3: 0-degree / near-zero edge case
  it("3. 0-degree/near-zero edge case: handles folded limb collinear vectors without NaN", () => {
    const a = { x: 1, y: 0, z: 0 };
    const b = { x: 0, y: 0, z: 0 }; // vertex
    const c = { x: 1, y: 0, z: 0 };
    const angle = calculateAngle(a, b, c);
    assert.ok(angle !== null);
    assert.ok(Math.abs(angle - 0) < 1e-4, `Expected 0 deg, got ${angle}`);
    assert.ok(!Number.isNaN(angle));
  });

  // Test 4: Missing landmark
  it("4. Missing landmark: returns null safely without throwing", () => {
    const a: Landmark = { x: 0, y: 1, z: 0, visibility: 0.9 };
    const angle = calculateLandmarkAngle(a, null, undefined);
    assert.equal(angle, null);

    const dist = calculateLandmarkDistance(null, a);
    assert.equal(dist, null);

    const hDev = calculateHorizontalDeviation(null, a);
    assert.equal(hDev, null);
  });

  // Test 5: Low-confidence landmark
  it("5. Low-confidence landmark: returns null when landmark is below threshold", () => {
    const a: Landmark = { x: 0, y: 1, z: 0, visibility: 0.1, presence: 0.1 };
    const b: Landmark = { x: 0, y: 0, z: 0, visibility: 0.9, presence: 0.9 };
    const c: Landmark = { x: 1, y: 0, z: 0, visibility: 0.9, presence: 0.9 };
    const angle = calculateLandmarkAngle(a, b, c);
    assert.equal(angle, null);
  });

  // Test 6: Clamped acos input
  it("6. Clamped acos input: protects against float precision overflow", () => {
    // Vectors that theoretically give cosine = 1.0000000000000002
    const a = { x: 1.000000000001, y: 0, z: 0 };
    const b = { x: 0, y: 0, z: 0 };
    const c = { x: 2.000000000002, y: 0, z: 0 };
    const angle = calculateAngle(a, b, c);
    assert.ok(angle !== null);
    assert.ok(!Number.isNaN(angle));
    assert.ok(Math.abs(angle - 0) < 1e-4);
  });

  // Test 7: Distance calculation
  it("7. Distance calculation: accurately computes 2D and 3D Euclidean distances", () => {
    const p1 = { x: 0, y: 0, z: 0 };
    const p2 = { x: 3, y: 4, z: 0 };
    const dist2D = calculateDistance2D(p1, p2);
    assert.equal(dist2D, 5);

    const p3D = { x: 1, y: 2, z: 2 };
    const dist3D = calculateDistance3D(p1, p3D);
    assert.equal(dist3D, 3);
  });

  // Test 8: Normalized distance
  it("8. Normalized distance: computes dimensionless scale-invariant ratios", () => {
    const rel = calculateRelativeDistance(1.5, 3.0);
    assert.equal(rel, 0.5);

    // Invalid zero reference
    const zeroRef = calculateRelativeDistance(1.5, 0);
    assert.equal(zeroRef, null);
  });

  // Test 9: Horizontal alignment
  it("9. Horizontal alignment: measures Y-coordinate differences", () => {
    const lm1: Landmark = { x: 0.3, y: 0.45, z: 0, visibility: 0.9 };
    const lm2: Landmark = { x: 0.7, y: 0.45, z: 0, visibility: 0.9 };
    const dev = calculateHorizontalDeviation(lm1, lm2);
    assert.equal(dev, 0);

    const lm3: Landmark = { x: 0.7, y: 0.50, z: 0, visibility: 0.9 };
    const dev2 = calculateHorizontalDeviation(lm1, lm3);
    assert.ok(Math.abs(dev2! - 0.05) < 1e-5);
  });

  // Test 10: Vertical alignment
  it("10. Vertical alignment: measures X-coordinate differences", () => {
    const lm1: Landmark = { x: 0.5, y: 0.2, z: 0, visibility: 0.9 };
    const lm2: Landmark = { x: 0.5, y: 0.8, z: 0, visibility: 0.9 };
    const dev = calculateVerticalDeviation(lm1, lm2);
    assert.equal(dev, 0);

    const lm3: Landmark = { x: 0.55, y: 0.8, z: 0, visibility: 0.9 };
    const dev2 = calculateVerticalDeviation(lm1, lm3);
    assert.ok(Math.abs(dev2! - 0.05) < 1e-5);
  });

  // Test 11: Shoulder center
  it("11. Shoulder center: calculates exact midpoint between shoulders", () => {
    const landmarks = createSyntheticLandmarks({
      [P.LEFT_SHOULDER]: { x: 0.3, y: 0.4, z: 0.1, visibility: 0.9, presence: 0.9 },
      [P.RIGHT_SHOULDER]: { x: 0.7, y: 0.4, z: 0.1, visibility: 0.9, presence: 0.9 },
      [P.LEFT_HIP]: { x: 0.35, y: 0.8, z: 0.0, visibility: 0.9, presence: 0.9 },
      [P.RIGHT_HIP]: { x: 0.65, y: 0.8, z: 0.0, visibility: 0.9, presence: 0.9 },
    });
    const { body } = extractBodyGeometry(landmarks, null);
    assert.ok(body.shoulderCenter !== null);
    assert.ok(Math.abs(body.shoulderCenter.x - 0.5) < 1e-5);
    assert.ok(Math.abs(body.shoulderCenter.y - 0.4) < 1e-5);
    assert.ok(Math.abs(body.shoulderCenter.z - 0.1) < 1e-5);
  });

  // Test 12: Hip center
  it("12. Hip center: calculates exact midpoint between hips", () => {
    const landmarks = createSyntheticLandmarks({
      [P.LEFT_SHOULDER]: { x: 0.3, y: 0.4, z: 0.0, visibility: 0.9, presence: 0.9 },
      [P.RIGHT_SHOULDER]: { x: 0.7, y: 0.4, z: 0.0, visibility: 0.9, presence: 0.9 },
      [P.LEFT_HIP]: { x: 0.4, y: 0.8, z: 0.2, visibility: 0.9, presence: 0.9 },
      [P.RIGHT_HIP]: { x: 0.6, y: 0.8, z: 0.2, visibility: 0.9, presence: 0.9 },
    });
    const { body } = extractBodyGeometry(landmarks, null);
    assert.ok(body.hipCenter !== null);
    assert.ok(Math.abs(body.hipCenter.x - 0.5) < 1e-5);
    assert.ok(Math.abs(body.hipCenter.y - 0.8) < 1e-5);
    assert.ok(Math.abs(body.hipCenter.z - 0.2) < 1e-5);
  });

  // Test 13: Body scale
  it("13. Body scale: measures torso scale independent of absolute position", () => {
    const landmarks = createSyntheticLandmarks({
      [P.LEFT_SHOULDER]: { x: 0.3, y: 0.3, z: 0.0, visibility: 0.9, presence: 0.9 },
      [P.RIGHT_SHOULDER]: { x: 0.7, y: 0.3, z: 0.0, visibility: 0.9, presence: 0.9 },
      [P.LEFT_HIP]: { x: 0.3, y: 0.7, z: 0.0, visibility: 0.9, presence: 0.9 },
      [P.RIGHT_HIP]: { x: 0.7, y: 0.7, z: 0.0, visibility: 0.9, presence: 0.9 },
    });
    const { body, distances } = extractBodyGeometry(landmarks, null);
    assert.ok(body.bodyScale !== null);
    assert.ok(Math.abs(body.bodyScale - 0.4) < 1e-5);
    assert.ok(distances.torsoLength !== null);
    assert.ok(Math.abs(distances.torsoLength - 0.4) < 1e-5);
    assert.ok(distances.shoulderWidth !== null);
    assert.ok(Math.abs(distances.shoulderWidth - 0.4) < 1e-5);
  });

  // Test 14: Mirrored coordinate consistency
  it("14. Mirrored coordinate consistency: preserves invariant angles and deviations", () => {
    const original = createSyntheticLandmarks({
      [P.LEFT_SHOULDER]: { x: 0.4, y: 0.4, z: 0.0, visibility: 0.9, presence: 0.9 },
      [P.LEFT_ELBOW]: { x: 0.2, y: 0.4, z: 0.0, visibility: 0.9, presence: 0.9 },
      [P.LEFT_WRIST]: { x: 0.2, y: 0.6, z: 0.0, visibility: 0.9, presence: 0.9 },
    });
    const origAngles = extractJointAngles(original);
    assert.ok(origAngles.leftElbow !== null);
    assert.ok(Math.abs(origAngles.leftElbow - 90) < 1e-3);

    // Mirrored horizontally: x' = 1 - x
    const mirrored: PoseLandmarks = original.map((lm) => ({
      ...lm,
      x: 1 - lm.x,
    }));
    const mirroredAngles = extractJointAngles(mirrored);
    assert.ok(mirroredAngles.leftElbow !== null);
    assert.ok(Math.abs(mirroredAngles.leftElbow - 90) < 1e-3);
  });

  // Test 15: Feature calculation with partial landmarks
  it("15. Feature calculation with partial landmarks: degrades gracefully without crashing", () => {
    // Upper body valid, lower body completely missing
    const partial = createSyntheticLandmarks({
      [P.LEFT_SHOULDER]: { x: 0.3, y: 0.4, z: 0.0, visibility: 0.9, presence: 0.9 },
      [P.RIGHT_SHOULDER]: { x: 0.7, y: 0.4, z: 0.0, visibility: 0.9, presence: 0.9 },
      [P.LEFT_ELBOW]: { x: 0.2, y: 0.4, z: 0.0, visibility: 0.9, presence: 0.9 },
      [P.LEFT_WRIST]: { x: 0.2, y: 0.6, z: 0.0, visibility: 0.9, presence: 0.9 },
      [P.LEFT_KNEE]: { x: 0.0, y: 0.0, z: 0.0, visibility: 0.0, presence: 0.0 },
      [P.RIGHT_KNEE]: { x: 0.0, y: 0.0, z: 0.0, visibility: 0.0, presence: 0.0 },
      [P.LEFT_ANKLE]: { x: 0.0, y: 0.0, z: 0.0, visibility: 0.0, presence: 0.0 },
      [P.RIGHT_ANKLE]: { x: 0.0, y: 0.0, z: 0.0, visibility: 0.0, presence: 0.0 },
    });

    const features = extractPoseFeatures({ landmarks: partial });
    assert.ok(features.angles.leftElbow !== null);
    assert.equal(features.angles.leftKnee, null);
    assert.equal(features.angles.rightKnee, null);
    assert.equal(features.angles.leftAnkle, null);
    assert.ok(features.distances.shoulderWidth !== null);
    assert.equal(features.distances.ankleDistance, null);
  });

  // Test 16: No NaN/Infinity results
  it("16. No NaN/Infinity results: ensures all feature properties are finite or null", () => {
    const synthetic = createSyntheticLandmarks();
    const features = extractPoseFeatures({ landmarks: synthetic });

    // Check all angle values
    for (const [key, val] of Object.entries(features.angles)) {
      if (val !== null) {
        assert.ok(Number.isFinite(val), `Angle ${key} was not finite: ${val}`);
        assert.ok(!Number.isNaN(val), `Angle ${key} was NaN`);
      }
    }

    // Check all distance values
    for (const [key, val] of Object.entries(features.distances)) {
      if (val !== null) {
        assert.ok(Number.isFinite(val), `Distance ${key} was not finite: ${val}`);
        assert.ok(!Number.isNaN(val), `Distance ${key} was NaN`);
      }
    }

    // Check all alignment values
    for (const [key, val] of Object.entries(features.alignments)) {
      if (val !== null) {
        assert.ok(Number.isFinite(val), `Alignment ${key} was not finite: ${val}`);
        assert.ok(!Number.isNaN(val), `Alignment ${key} was NaN`);
      }
    }
  });
});
