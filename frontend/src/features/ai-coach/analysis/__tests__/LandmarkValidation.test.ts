import { describe, it } from "node:test";
import assert from "node:assert/strict";

import type { Landmark, PoseLandmarks } from "../../types/landmarks.ts";
import {
  getLandmarkStatus,
  isLandmarkValid,
  isLandmarkUsable,
  getLandmarkConfidence,
  evaluatePoseValidity,
  LANDMARK_CONFIDENCE_CONFIG,
} from "../LandmarkUtils.ts";
import {
  LandmarkSmoother,
} from "../../motion/LandmarkSmoother.ts";

function createMockLandmarks(overrides: Partial<Record<number, Partial<Landmark>>> = {}): PoseLandmarks {
  const landmarks: PoseLandmarks = [];
  for (let i = 0; i < 33; i++) {
    const base: Landmark = {
      x: 0.5,
      y: 0.5,
      z: 0.0,
      visibility: 0.9,
      presence: 0.9,
    };
    if (overrides[i]) {
      landmarks.push({ ...base, ...overrides[i] });
    } else {
      landmarks.push(base);
    }
  }
  return landmarks;
}

describe("Landmark Validation and Confidence Handling", () => {
  // Test 1: Valid landmark
  it("1. Valid landmark: returns VALID status and true for isLandmarkValid", () => {
    const validLm: Landmark = { x: 0.5, y: 0.5, z: 0.1, visibility: 0.85, presence: 0.9 };
    assert.equal(getLandmarkStatus(validLm), "VALID");
    assert.equal(isLandmarkValid(validLm), true);
    assert.equal(isLandmarkUsable(validLm), true);
    assert.ok(getLandmarkConfidence(validLm) >= LANDMARK_CONFIDENCE_CONFIG.minCombinedConfidence);
  });

  // Test 2: Missing landmark
  it("2. Missing landmark: returns MISSING status for null, undefined, or NaN coordinates", () => {
    assert.equal(getLandmarkStatus(null), "MISSING");
    assert.equal(getLandmarkStatus(undefined), "MISSING");
    assert.equal(isLandmarkValid(null), false);
    assert.equal(isLandmarkUsable(null), false);
    assert.equal(getLandmarkConfidence(null), 0);

    const nanLm: Landmark = { x: NaN, y: 0.5, z: 0.0, visibility: 0.9, presence: 0.9 };
    assert.equal(getLandmarkStatus(nanLm), "MISSING");
    assert.equal(isLandmarkValid(nanLm), false);
    assert.equal(isLandmarkUsable(nanLm), false);
    assert.equal(getLandmarkConfidence(nanLm), 0);
  });

  // Test 3: Undefined visibility
  it("3. Undefined visibility: safely defaults to standard visibility without throwing", () => {
    const noVisLm: Landmark = { x: 0.4, y: 0.6, z: 0.0 };
    assert.doesNotThrow(() => {
      const status = getLandmarkStatus(noVisLm);
      assert.equal(status, "VALID");
      assert.equal(isLandmarkValid(noVisLm), true);
      assert.equal(getLandmarkConfidence(noVisLm), 1);
    });
  });

  // Test 4: Low visibility
  it("4. Low visibility: classified as LOW_CONFIDENCE or MISSING depending on threshold", () => {
    const lowVisLm: Landmark = { x: 0.5, y: 0.5, z: 0.0, visibility: 0.35, presence: 0.8 };
    assert.equal(getLandmarkStatus(lowVisLm), "LOW_CONFIDENCE");
    assert.equal(isLandmarkValid(lowVisLm), false);
    assert.equal(isLandmarkUsable(lowVisLm), true);

    const veryLowVisLm: Landmark = { x: 0.5, y: 0.5, z: 0.0, visibility: 0.1, presence: 0.8 };
    assert.equal(getLandmarkStatus(veryLowVisLm), "MISSING");
    assert.equal(isLandmarkValid(veryLowVisLm), false);
    assert.equal(isLandmarkUsable(veryLowVisLm), false);
  });

  // Test 5: Low presence
  it("5. Low presence: classified as LOW_CONFIDENCE or MISSING", () => {
    const lowPresLm: Landmark = { x: 0.5, y: 0.5, z: 0.0, visibility: 0.8, presence: 0.3 };
    assert.equal(getLandmarkStatus(lowPresLm), "LOW_CONFIDENCE");
    assert.equal(isLandmarkValid(lowPresLm), false);
    assert.equal(isLandmarkUsable(lowPresLm), true);

    const veryLowPresLm: Landmark = { x: 0.5, y: 0.5, z: 0.0, visibility: 0.8, presence: 0.05 };
    assert.equal(getLandmarkStatus(veryLowPresLm), "MISSING");
    assert.equal(isLandmarkValid(veryLowPresLm), false);
    assert.equal(isLandmarkUsable(veryLowPresLm), false);
  });

  // Test 6: Valid pose
  it("6. Valid pose: returns 'valid_pose' when core torso and limb joints are confident", () => {
    const fullBody = createMockLandmarks();
    const validity = evaluatePoseValidity(fullBody);
    assert.equal(validity, "valid_pose");
  });

  // Test 7: Partial pose
  it("7. Partial pose: returns 'partial_pose' when only upper body or some torso anchors are present", () => {
    // Only upper body visible (shoulders visible, but lower hips/knees missing)
    const upperOnly = createMockLandmarks({
      23: { visibility: 0.1, presence: 0.1 }, // Left hip missing
      24: { visibility: 0.1, presence: 0.1 }, // Right hip missing
      25: { visibility: 0.1, presence: 0.1 }, // Knees missing
      26: { visibility: 0.1, presence: 0.1 },
      27: { visibility: 0.1, presence: 0.1 }, // Ankles missing
      28: { visibility: 0.1, presence: 0.1 },
    });
    const validity = evaluatePoseValidity(upperOnly);
    assert.equal(validity, "partial_pose");
  });

  // Test 8: No pose
  it("8. No pose: returns 'no_pose' when landmarks are empty or core anchors are missing", () => {
    assert.equal(evaluatePoseValidity(null), "no_pose");
    assert.equal(evaluatePoseValidity([]), "no_pose");
    assert.equal(evaluatePoseValidity(new Array(20).fill({ x: 0, y: 0, z: 0 })), "no_pose");

    // All shoulders and hips missing
    const noBody = createMockLandmarks({
      11: { visibility: 0.0, presence: 0.0 },
      12: { visibility: 0.0, presence: 0.0 },
      23: { visibility: 0.0, presence: 0.0 },
      24: { visibility: 0.0, presence: 0.0 },
    });
    assert.equal(evaluatePoseValidity(noBody), "no_pose");
  });
});

describe("Landmark Smoothing and Temporal Grace Period", () => {
  // Test 9: EMA smoothing
  it("9. EMA smoothing: smoothly interpolates x/y/z coordinates without abrupt jumps", () => {
    const smoother = new LandmarkSmoother(0.5, 3);
    const frame1 = createMockLandmarks({
      11: { x: 0.0, y: 0.0, z: 0.0, visibility: 0.9, presence: 0.9 },
    });
    const res1 = smoother.smooth(frame1);
    assert.equal(res1[11].x, 0.0);

    const frame2 = createMockLandmarks({
      11: { x: 1.0, y: 1.0, z: 1.0, visibility: 0.9, presence: 0.9 },
    });
    const res2 = smoother.smooth(frame2);
    // With alpha=0.5 and high confidence, position is interpolated halfway
    assert.ok(res2[11].x > 0.3 && res2[11].x < 0.7);
    assert.ok(res2[11].y > 0.3 && res2[11].y < 0.7);
    assert.ok(res2[11].z > 0.3 && res2[11].z < 0.7);
  });

  // Test 10: Temporary landmark loss
  it("10. Temporary landmark loss: holds smoothed coordinates within grace period", () => {
    const smoother = new LandmarkSmoother(0.5, 3);
    const frame1 = createMockLandmarks({
      15: { x: 0.42, y: 0.75, z: 0.1, visibility: 0.9, presence: 0.9 },
    });
    smoother.smooth(frame1);

    // Frame 2: Left wrist temporarily missing (visibility = 0)
    const frame2 = createMockLandmarks({
      15: { x: 0.0, y: 0.0, z: 0.0, visibility: 0.0, presence: 0.0 },
    });
    const res2 = smoother.smooth(frame2);

    // Wrist coordinates held from previous valid state during grace frame 1
    assert.equal(res2[15].x, 0.42);
    assert.equal(res2[15].y, 0.75);
  });

  // Test 11: Grace-period expiration
  it("11. Grace-period expiration: releases held coordinates after grace frames exceeded", () => {
    const maxGrace = 2;
    const smoother = new LandmarkSmoother(0.5, maxGrace);
    const frameValid = createMockLandmarks({
      15: { x: 0.42, y: 0.75, z: 0.1, visibility: 0.9, presence: 0.9 },
    });
    smoother.smooth(frameValid);

    const frameMissing = createMockLandmarks({
      15: { x: 0.0, y: 0.0, z: 0.0, visibility: 0.0, presence: 0.0 },
    });

    // Grace frame 1: held
    const res1 = smoother.smooth(frameMissing);
    assert.equal(res1[15].x, 0.42);

    // Grace frame 2: held
    const res2 = smoother.smooth(frameMissing);
    assert.equal(res2[15].x, 0.42);

    // Grace frame 3 (> maxGrace): expired, should not hold stale coordinates
    const res3 = smoother.smooth(frameMissing);
    assert.equal(res3[15].x, 0.0);
    assert.equal(res3[15].y, 0.0);
  });

  // Test 12: Smoothing reset
  it("12. Smoothing reset: resets state completely and starts clean on next frame", () => {
    const smoother = new LandmarkSmoother(0.5, 3);
    const frame1 = createMockLandmarks({
      11: { x: 0.8, y: 0.8, z: 0.8, visibility: 0.9, presence: 0.9 },
    });
    smoother.smooth(frame1);

    smoother.reset();

    const frame2 = createMockLandmarks({
      11: { x: 0.2, y: 0.2, z: 0.2, visibility: 0.9, presence: 0.9 },
    });
    const res2 = smoother.smooth(frame2);
    // After reset, first frame is taken directly without averaging with pre-reset frame
    assert.equal(res2[11].x, 0.2);
    assert.equal(res2[11].y, 0.2);
  });

  // Test 13: Camera/session reset
  it("13. Camera/session reset: handles session transitions without cross-session landmark leaking", () => {
    const smoother = new LandmarkSmoother(0.3, 4);
    // Session 1
    smoother.smooth(createMockLandmarks({ 11: { x: 0.9, y: 0.9, z: 0.0 } }));
    smoother.reset();

    // Session 2 starts with person in different place
    const session2Frame = createMockLandmarks({ 11: { x: 0.1, y: 0.1, z: 0.0 } });
    const res = smoother.smooth(session2Frame);
    assert.equal(res[11].x, 0.1);
  });

  // Test 14: Low-confidence landmark does not create a large position jump
  it("14. Low-confidence landmark does not create a large position jump", () => {
    const smoother = new LandmarkSmoother(0.5, 3);
    const frame1 = createMockLandmarks({
      15: { x: 0.5, y: 0.5, z: 0.0, visibility: 0.9, presence: 0.9 },
    });
    smoother.smooth(frame1);

    // Frame 2 has a noisy / outlier coordinate with LOW_CONFIDENCE (vis=0.3)
    const frame2 = createMockLandmarks({
      15: { x: 0.95, y: 0.95, z: 0.0, visibility: 0.3, presence: 0.3 },
    });
    const res2 = smoother.smooth(frame2);

    // Because visibility is low, damped smoothing prevents a violent jump toward 0.95
    assert.ok(res2[15].x < 0.65, `Expected x to stay near 0.5 with low confidence, got ${res2[15].x}`);
    assert.ok(res2[15].y < 0.65, `Expected y to stay near 0.5 with low confidence, got ${res2[15].y}`);
  });
});
