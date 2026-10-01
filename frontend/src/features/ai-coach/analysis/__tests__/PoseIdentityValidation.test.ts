import { describe, it } from "node:test";
import assert from "node:assert/strict";

import type { Landmark, PoseLandmarks } from "../../types/landmarks";
import { PoseLandmarkIndex as P } from "../../types/pose-landmarks";
import { validatePoseIdentity, formatPoseIdentityDiagnostics } from "../PoseIdentityValidator";
import { resolveCanonicalAsanaId } from "../AsanaCanonicalIdResolver";

function createLandmarks(overrides: Partial<Record<number, Partial<Landmark>>> = {}): PoseLandmarks {
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

/**
 * Creates mock landmarks representing standing posture (e.g. Mountain / Warrior II).
 */
function createStandingLandmarks(): PoseLandmarks {
  return createLandmarks({
    [P.LEFT_SHOULDER]: { x: 0.45, y: 0.25, visibility: 0.95 },
    [P.RIGHT_SHOULDER]: { x: 0.55, y: 0.25, visibility: 0.95 },
    [P.LEFT_HIP]: { x: 0.46, y: 0.55, visibility: 0.95 },
    [P.RIGHT_HIP]: { x: 0.54, y: 0.55, visibility: 0.95 },
    [P.LEFT_KNEE]: { x: 0.46, y: 0.75, visibility: 0.95 },
    [P.RIGHT_KNEE]: { x: 0.54, y: 0.75, visibility: 0.95 },
    [P.LEFT_ANKLE]: { x: 0.46, y: 0.95, visibility: 0.95 },
    [P.RIGHT_ANKLE]: { x: 0.54, y: 0.95, visibility: 0.95 },
  });
}

/**
 * Creates mock landmarks representing seated posture (e.g. Lotus / Easy Pose).
 */
function createSeatedLandmarks(): PoseLandmarks {
  return createLandmarks({
    [P.LEFT_SHOULDER]: { x: 0.45, y: 0.35, visibility: 0.95 },
    [P.RIGHT_SHOULDER]: { x: 0.55, y: 0.35, visibility: 0.95 },
    [P.LEFT_HIP]: { x: 0.46, y: 0.65, visibility: 0.95 },
    [P.RIGHT_HIP]: { x: 0.54, y: 0.65, visibility: 0.95 },
    [P.LEFT_KNEE]: { x: 0.40, y: 0.70, visibility: 0.95 },
    [P.RIGHT_KNEE]: { x: 0.60, y: 0.70, visibility: 0.95 },
    [P.LEFT_ANKLE]: { x: 0.48, y: 0.72, visibility: 0.95 },
    [P.RIGHT_ANKLE]: { x: 0.52, y: 0.72, visibility: 0.95 },
  });
}

/**
 * Creates mock landmarks representing valid Cobra posture:
 * - Prone body on mat
 * - Elevated chest (shoulder y < hip y)
 * - Bent elbows hugging torso
 * - Grounded pelvis
 */
function createValidCobraLandmarks(): PoseLandmarks {
  return createLandmarks({
    // Head & shoulders lifted
    [P.NOSE]: { x: 0.20, y: 0.45, visibility: 0.95 },
    [P.LEFT_SHOULDER]: { x: 0.28, y: 0.52, visibility: 0.95 },
    [P.RIGHT_SHOULDER]: { x: 0.28, y: 0.54, visibility: 0.95 },
    // Elbows bent back alongside ribs
    [P.LEFT_ELBOW]: { x: 0.38, y: 0.68, visibility: 0.95 },
    [P.RIGHT_ELBOW]: { x: 0.38, y: 0.70, visibility: 0.95 },
    // Wrists under shoulders on floor
    [P.LEFT_WRIST]: { x: 0.30, y: 0.75, visibility: 0.95 },
    [P.RIGHT_WRIST]: { x: 0.30, y: 0.77, visibility: 0.95 },
    // Hips grounded on mat
    [P.LEFT_HIP]: { x: 0.55, y: 0.75, visibility: 0.95 },
    [P.RIGHT_HIP]: { x: 0.55, y: 0.77, visibility: 0.95 },
    // Legs extending flat along mat
    [P.LEFT_KNEE]: { x: 0.70, y: 0.78, visibility: 0.95 },
    [P.RIGHT_KNEE]: { x: 0.70, y: 0.80, visibility: 0.95 },
    [P.LEFT_ANKLE]: { x: 0.85, y: 0.80, visibility: 0.95 },
    [P.RIGHT_ANKLE]: { x: 0.85, y: 0.82, visibility: 0.95 },
  });
}

/**
 * Creates mock landmarks representing prone posture that is NOT Cobra
 * (e.g. flat prone rest without chest lift and straight unbent arms).
 */
function createFlatProneLandmarks(): PoseLandmarks {
  return createLandmarks({
    [P.LEFT_SHOULDER]: { x: 0.30, y: 0.75, visibility: 0.95 }, // Flat on mat (no chest lift)
    [P.RIGHT_SHOULDER]: { x: 0.30, y: 0.77, visibility: 0.95 },
    [P.LEFT_ELBOW]: { x: 0.20, y: 0.75, visibility: 0.95 },
    [P.RIGHT_ELBOW]: { x: 0.20, y: 0.77, visibility: 0.95 },
    [P.LEFT_HIP]: { x: 0.55, y: 0.75, visibility: 0.95 },
    [P.RIGHT_HIP]: { x: 0.55, y: 0.77, visibility: 0.95 },
    [P.LEFT_KNEE]: { x: 0.70, y: 0.78, visibility: 0.95 },
    [P.RIGHT_KNEE]: { x: 0.70, y: 0.80, visibility: 0.95 },
    [P.LEFT_ANKLE]: { x: 0.85, y: 0.80, visibility: 0.95 },
    [P.RIGHT_ANKLE]: { x: 0.85, y: 0.82, visibility: 0.95 },
  });
}

describe("Phase 1 — Pose Identity Validation Specification Tests", () => {
  it("TEST 1 & 8: Selected = Cobra, User posture = valid Cobra -> isMatch = true", () => {
    const landmarks = createValidCobraLandmarks();
    const result = validatePoseIdentity("cobra-bhujangasana", { landmarks });

    assert.equal(result.canonicalAsanaId, "bhujangasana");
    assert.equal(result.isMatch, true, "Valid Cobra must match pose identity");
    assert.equal(result.criticalFailures.length, 0, "No critical failures expected for valid Cobra");
  });

  it("TEST 2: Selected = Cobra, User posture = standing -> isMatch = false", () => {
    const landmarks = createStandingLandmarks();
    const result = validatePoseIdentity("cobra-bhujangasana", { landmarks });

    assert.equal(result.isMatch, false, "Standing user must NOT match Cobra pose identity");
    assert.ok(
      result.criticalFailures.some((f) => f.includes("stance_mismatch")),
      "Must fail stance requirement for Cobra"
    );
  });

  it("TEST 3: Selected = Cobra, User posture = seated -> isMatch = false", () => {
    const landmarks = createSeatedLandmarks();
    const result = validatePoseIdentity("cobra-bhujangasana", { landmarks });

    assert.equal(result.isMatch, false, "Seated user must NOT match Cobra pose identity");
    assert.ok(
      result.criticalFailures.some((f) => f.includes("stance_mismatch")),
      "Must fail stance requirement for Cobra"
    );
  });

  it("TEST 4: Selected = Cobra, User posture = prone but not Cobra (flat on floor) -> isMatch = false", () => {
    const landmarks = createFlatProneLandmarks();
    const result = validatePoseIdentity("cobra-bhujangasana", { landmarks });

    assert.equal(result.isMatch, false, "Flat prone without chest lift must NOT match Cobra");
    assert.ok(
      result.criticalFailures.length > 0 || result.failedRequirements.length > 0,
      "Chest lift / elbow tuck critical rule must fail"
    );
  });

  it("TEST 5: Selected = Cobra, Only shoulder alignment passes -> isMatch = false", () => {
    // User is standing with level shoulders
    const landmarks = createStandingLandmarks();
    const result = validatePoseIdentity("cobra-bhujangasana", { landmarks });

    assert.equal(result.isMatch, false, "Shoulder level alone must NOT validate Cobra identity");
  });

  it("TEST 6: Selected = Cobra, Critical hip/chest identity requirement fails -> isMatch = false", () => {
    // Cobra with hips lifted high in the air (broken pelvis grounding)
    const landmarks = createValidCobraLandmarks();
    landmarks[P.LEFT_HIP] = { x: 0.55, y: 0.35, z: 0, visibility: 0.95, presence: 0.95 };
    landmarks[P.RIGHT_HIP] = { x: 0.55, y: 0.35, z: 0, visibility: 0.95, presence: 0.95 };

    const result = validatePoseIdentity("cobra-bhujangasana", { landmarks });
    assert.equal(result.isMatch, false, "Cobra with ungrounded hips must fail identity match");
  });

  it("TEST 7: Selected = Cobra, Required landmarks have insufficient confidence -> isMatch = false", () => {
    // Cobra with invisible/occluded landmarks
    const landmarks = createValidCobraLandmarks();
    for (let i = 0; i < 33; i++) {
      landmarks[i].visibility = 0.1;
    }

    const result = validatePoseIdentity("cobra-bhujangasana", { landmarks });
    assert.equal(result.isMatch, false, "Low landmark visibility must fail identity match");
    assert.ok(result.failedRequirements.includes("required_landmarks_visibility"));
  });

  it("TEST 9: Canonical ID Resolution for compound IDs", () => {
    assert.equal(resolveCanonicalAsanaId("cobra-bhujangasana"), "bhujangasana");
    assert.equal(resolveCanonicalAsanaId("tree-vrksasana"), "vrksasana");
    assert.equal(resolveCanonicalAsanaId("mountain-tadasana"), "tadasana");
    assert.equal(resolveCanonicalAsanaId("warrior-ii-virabhadrasana-ii"), "warrior-ii");
    assert.equal(resolveCanonicalAsanaId("bridge-setu-bandha-sarvangasana"), "setu-bandhasana");
    assert.equal(resolveCanonicalAsanaId("lotus-padmasana"), "padmasana");
  });

  it("TEST 10: Diagnostic formatter generates clear debug string", () => {
    const landmarks = createValidCobraLandmarks();
    const result = validatePoseIdentity("cobra-bhujangasana", { landmarks });
    const formatted = formatPoseIdentityDiagnostics(result);

    assert.ok(formatted.includes("POSE IDENTITY DIAGNOSTICS"));
    assert.ok(formatted.includes("Canonical Asana: bhujangasana"));
    assert.ok(formatted.includes("Match Status:"));
  });

  it("TEST 11: Fail-safe behavior for unconfigured / empty asana ID -> isMatch = false", () => {
    const landmarks = createValidCobraLandmarks();
    const result = validatePoseIdentity("", { landmarks });

    assert.equal(result.isMatch, false);
    assert.ok(result.reason?.includes("No asana selected"));
  });
});
