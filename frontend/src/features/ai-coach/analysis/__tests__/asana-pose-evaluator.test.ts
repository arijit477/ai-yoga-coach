import { describe, it } from "node:test";
import assert from "node:assert";

import type { PoseLandmarks, Landmark } from "../../types/landmarks";
import { evaluateAsanaPose } from "../AsanaPoseEvaluator";
import { getAsanaCoachingProfile } from "../../services/AsanaCoachingProfileService";

function createBaseLandmarks(): PoseLandmarks {
  const landmarks: Landmark[] = [];
  for (let i = 0; i < 33; i++) {
    landmarks.push({
      x: 0.5,
      y: 0.5,
      z: 0.0,
      visibility: 0.99,
      presence: 0.99,
    });
  }
  return landmarks;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. STANDING POSTURE BUILDERS
// ─────────────────────────────────────────────────────────────────────────────

function createPerfectWarriorIILandmarks(): PoseLandmarks {
  const lm = createBaseLandmarks();
  lm[11] = { x: 0.45, y: 0.35, z: 0, visibility: 0.98 }; // Left Shoulder
  lm[12] = { x: 0.55, y: 0.35, z: 0, visibility: 0.98 }; // Right Shoulder

  // Left arm extended out to side (180deg)
  lm[13] = { x: 0.25, y: 0.35, z: 0, visibility: 0.98 }; // Left Elbow
  lm[15] = { x: 0.10, y: 0.35, z: 0, visibility: 0.98 }; // Left Wrist

  // Right arm extended out to side (180deg)
  lm[14] = { x: 0.75, y: 0.35, z: 0, visibility: 0.98 }; // Right Elbow
  lm[16] = { x: 0.90, y: 0.35, z: 0, visibility: 0.98 }; // Right Wrist

  // Hips level
  lm[23] = { x: 0.45, y: 0.65, z: 0, visibility: 0.98 }; // Left Hip
  lm[24] = { x: 0.55, y: 0.65, z: 0, visibility: 0.98 }; // Right Hip

  // Front leg (Left) 90 deg: hip(0.45, 0.65) -> knee(0.25, 0.65) -> ankle(0.25, 0.85)
  lm[25] = { x: 0.25, y: 0.65, z: 0, visibility: 0.98 }; // Left Knee
  lm[27] = { x: 0.25, y: 0.85, z: 0, visibility: 0.98 }; // Left Ankle

  // Back leg (Right) straight 180 deg: hip(0.55, 0.65) -> knee(0.70, 0.75) -> ankle(0.85, 0.85)
  lm[26] = { x: 0.70, y: 0.75, z: 0, visibility: 0.98 }; // Right Knee
  lm[28] = { x: 0.85, y: 0.85, z: 0, visibility: 0.98 }; // Right Ankle

  return lm;
}

function createFaultyWarriorIIFrontKneeLandmarks(): PoseLandmarks {
  const lm = createPerfectWarriorIILandmarks();
  // Front knee barely bent (angle ~165 deg instead of 90 deg)
  lm[25] = { x: 0.35, y: 0.75, z: 0, visibility: 0.98 };
  lm[27] = { x: 0.25, y: 0.85, z: 0, visibility: 0.98 };
  return lm;
}

function createPerfectTadasanaLandmarks(): PoseLandmarks {
  const lm = createBaseLandmarks();
  lm[11] = { x: 0.45, y: 0.30, z: 0, visibility: 0.98 };
  lm[12] = { x: 0.55, y: 0.30, z: 0, visibility: 0.98 };

  lm[13] = { x: 0.43, y: 0.45, z: 0, visibility: 0.98 };
  lm[14] = { x: 0.57, y: 0.45, z: 0, visibility: 0.98 };
  lm[15] = { x: 0.43, y: 0.60, z: 0, visibility: 0.98 };
  lm[16] = { x: 0.57, y: 0.60, z: 0, visibility: 0.98 };

  lm[23] = { x: 0.45, y: 0.55, z: 0, visibility: 0.98 };
  lm[24] = { x: 0.55, y: 0.55, z: 0, visibility: 0.98 };

  lm[25] = { x: 0.45, y: 0.75, z: 0, visibility: 0.98 };
  lm[26] = { x: 0.55, y: 0.75, z: 0, visibility: 0.98 };
  lm[27] = { x: 0.45, y: 0.95, z: 0, visibility: 0.98 };
  lm[28] = { x: 0.55, y: 0.95, z: 0, visibility: 0.98 };
  return lm;
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. SEATED & BENDING POSTURE BUILDERS
// ─────────────────────────────────────────────────────────────────────────────

function createPerfectPadmasanaLandmarks(): PoseLandmarks {
  const lm = createBaseLandmarks();
  lm[11] = { x: 0.45, y: 0.30, z: 0, visibility: 0.98 };
  lm[12] = { x: 0.55, y: 0.30, z: 0, visibility: 0.98 };

  lm[13] = { x: 0.38, y: 0.45, z: 0, visibility: 0.98 };
  lm[14] = { x: 0.62, y: 0.45, z: 0, visibility: 0.98 };
  lm[15] = { x: 0.35, y: 0.60, z: 0, visibility: 0.98 };
  lm[16] = { x: 0.65, y: 0.60, z: 0, visibility: 0.98 };

  lm[23] = { x: 0.45, y: 0.60, z: 0, visibility: 0.98 };
  lm[24] = { x: 0.55, y: 0.60, z: 0, visibility: 0.98 };
  return lm;
}

function createSlouchedPadmasanaLandmarks(): PoseLandmarks {
  const lm = createPerfectPadmasanaLandmarks();
  // Shoulders tilted and off vertical axis
  lm[11] = { x: 0.30, y: 0.30, z: 0, visibility: 0.98 };
  lm[12] = { x: 0.40, y: 0.32, z: 0, visibility: 0.98 };
  return lm;
}

function createPerfectBalasanaLandmarks(): PoseLandmarks {
  const lm = createBaseLandmarks();
  lm[11] = { x: 0.30, y: 0.70, z: 0, visibility: 0.98 };
  lm[12] = { x: 0.30, y: 0.70, z: 0.1, visibility: 0.98 };

  lm[13] = { x: 0.20, y: 0.70, z: 0, visibility: 0.98 };
  lm[15] = { x: 0.10, y: 0.70, z: 0, visibility: 0.98 };

  lm[23] = { x: 0.60, y: 0.75, z: 0, visibility: 0.98 };
  lm[24] = { x: 0.60, y: 0.75, z: 0.1, visibility: 0.98 };

  lm[25] = { x: 0.45, y: 0.85, z: 0, visibility: 0.98 };
  lm[27] = { x: 0.60, y: 0.85, z: 0, visibility: 0.98 };
  return lm;
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. LYING & PLANK POSTURE BUILDERS
// ─────────────────────────────────────────────────────────────────────────────

function createPerfectBhujangasanaLandmarks(): PoseLandmarks {
  const lm = createBaseLandmarks();
  lm[11] = { x: 0.35, y: 0.60, z: 0, visibility: 0.98 };
  lm[12] = { x: 0.35, y: 0.60, z: 0.1, visibility: 0.98 };

  // Elbows 90-120 deg: shoulder(0.35, 0.60) -> elbow(0.35, 0.72) -> wrist(0.25, 0.72)
  lm[13] = { x: 0.35, y: 0.72, z: 0, visibility: 0.98 };
  lm[15] = { x: 0.25, y: 0.72, z: 0, visibility: 0.98 };

  lm[23] = { x: 0.55, y: 0.75, z: 0, visibility: 0.98 };
  lm[24] = { x: 0.55, y: 0.75, z: 0.1, visibility: 0.98 };

  lm[25] = { x: 0.75, y: 0.78, z: 0, visibility: 0.98 };
  lm[27] = { x: 0.90, y: 0.80, z: 0, visibility: 0.98 };
  return lm;
}

function createPerfectSetuBandhasanaLandmarks(): PoseLandmarks {
  const lm = createBaseLandmarks();
  lm[11] = { x: 0.20, y: 0.75, z: 0, visibility: 0.98 };
  lm[12] = { x: 0.20, y: 0.75, z: 0.1, visibility: 0.98 };

  lm[23] = { x: 0.50, y: 0.55, z: 0, visibility: 0.98 };
  lm[24] = { x: 0.50, y: 0.55, z: 0.1, visibility: 0.98 };

  lm[25] = { x: 0.75, y: 0.55, z: 0, visibility: 0.98 };
  lm[26] = { x: 0.75, y: 0.55, z: 0.1, visibility: 0.98 };
  lm[27] = { x: 0.75, y: 0.75, z: 0, visibility: 0.98 };
  lm[28] = { x: 0.75, y: 0.75, z: 0.1, visibility: 0.98 };
  return lm;
}

function createPerfectChaturangaLandmarks(): PoseLandmarks {
  const lm = createBaseLandmarks();
  lm[11] = { x: 0.30, y: 0.60, z: 0, visibility: 0.98 };
  lm[12] = { x: 0.30, y: 0.60, z: 0.1, visibility: 0.98 };

  // 90 deg elbow bend
  lm[13] = { x: 0.25, y: 0.60, z: 0, visibility: 0.98 };
  lm[15] = { x: 0.25, y: 0.70, z: 0, visibility: 0.98 };
  lm[14] = { x: 0.25, y: 0.60, z: 0.1, visibility: 0.98 };
  lm[16] = { x: 0.25, y: 0.70, z: 0.1, visibility: 0.98 };

  lm[23] = { x: 0.55, y: 0.60, z: 0, visibility: 0.98 };
  lm[24] = { x: 0.55, y: 0.60, z: 0.1, visibility: 0.98 };
  lm[27] = { x: 0.85, y: 0.60, z: 0, visibility: 0.98 };
  lm[28] = { x: 0.85, y: 0.60, z: 0.1, visibility: 0.98 };
  return lm;
}

function createSaggingChaturangaLandmarks(): PoseLandmarks {
  const lm = createPerfectChaturangaLandmarks();
  // Hips sagging down toward mat
  lm[23] = { x: 0.55, y: 0.80, z: 0, visibility: 0.98 };
  lm[24] = { x: 0.55, y: 0.80, z: 0.1, visibility: 0.98 };
  return lm;
}

// ─────────────────────────────────────────────────────────────────────────────
// TEST SUITE
// ─────────────────────────────────────────────────────────────────────────────

describe("Phase 3: Asana-Aware Pose Evaluation Layer", () => {
  describe("Category 1: Standing Postures (Warrior II & Tadasana)", () => {
    it("evaluates Warrior II with excellent alignment and passes all rules", () => {
      const landmarks = createPerfectWarriorIILandmarks();
      const result = evaluateAsanaPose("warrior-ii", { landmarks });

      assert.strictEqual(result.asanaId, "warrior-ii");
      assert.strictEqual(result.asanaName, "Warrior II");
      assert.strictEqual(result.startingPosition, "standing");
      assert.ok(result.score >= 80, `Expected score >= 80, got ${result.score}`);
      assert.strictEqual(result.primaryCorrection, null);
      assert.strictEqual(result.primaryIssue, null);
      assert.strictEqual(result.completionEligible, true);
      assert.ok(result.successfulRules.length > 0, "Expected successful rules to be populated");
    });

    it("evaluates Warrior II with an incorrect front knee and returns specific front knee correction", () => {
      const landmarks = createFaultyWarriorIIFrontKneeLandmarks();
      const result = evaluateAsanaPose("warrior-ii", { landmarks });

      assert.strictEqual(result.asanaId, "warrior-ii");
      assert.ok(result.detectedIssues.length > 0, "Expected at least one detected issue");

      const kneeIssue = result.detectedIssues.find((i) => i.ruleId === "warrior-ii-left-knee-angle");
      assert.ok(kneeIssue, "Expected warrior-ii-left-knee-angle issue to be detected");
      assert.strictEqual(kneeIssue?.status, "incorrect");
      assert.strictEqual(kneeIssue?.severity, "high");

      assert.ok(
        kneeIssue?.correction.includes("knee") || kneeIssue?.correction.includes("ankle"),
        `Expected specific knee correction, got: ${kneeIssue?.correction}`
      );
      assert.strictEqual(result.primaryIssue?.ruleId, "warrior-ii-left-knee-angle");
    });

    it("evaluates Tadasana (Mountain Pose) standing posture accurately", () => {
      const landmarks = createPerfectTadasanaLandmarks();
      const result = evaluateAsanaPose("tadasana", { landmarks });

      assert.strictEqual(result.asanaId, "tadasana");
      assert.strictEqual(result.startingPosition, "standing");
      assert.ok(result.score >= 85, `Expected Tadasana score >= 85, got ${result.score}`);
      assert.strictEqual(result.detectedIssues.length, 0);
    });
  });

  describe("Category 2: Seated / Bending Postures (Lotus & Child's Pose)", () => {
    it("evaluates Padmasana (Lotus Pose) with upright posture and identifies seated starting position", () => {
      const landmarks = createPerfectPadmasanaLandmarks();
      const result = evaluateAsanaPose("padmasana", { landmarks });

      assert.strictEqual(result.asanaId, "padmasana");
      assert.strictEqual(result.startingPosition, "seated");
      assert.strictEqual(result.category, "seated");
      assert.ok(result.score >= 85, `Expected Lotus score >= 85, got ${result.score}`);
      assert.strictEqual(result.detectedIssues.length, 0);
      assert.ok(result.successfulRules.some((r) => r.ruleId === "padmasana.spine.vertical"));
    });

    it("evaluates Padmasana with slouched posture and returns specific spine correction", () => {
      const landmarks = createSlouchedPadmasanaLandmarks();
      const result = evaluateAsanaPose("padmasana", { landmarks });

      assert.strictEqual(result.asanaId, "padmasana");
      assert.ok(result.detectedIssues.length > 0, "Expected spine alignment issue");

      const spineIssue = result.detectedIssues.find((i) => i.ruleId === "padmasana.spine.vertical");
      assert.ok(spineIssue, "Expected padmasana.spine.vertical issue");
      assert.ok(
        spineIssue?.correction.includes("spine") || spineIssue?.correction.includes("sitting bones"),
        `Expected specific seated spine correction, got: ${spineIssue?.correction}`
      );
    });

    it("evaluates Balasana (Child's Pose) kneeling restorative posture", () => {
      const landmarks = createPerfectBalasanaLandmarks();
      const result = evaluateAsanaPose("balasana", { landmarks });

      assert.strictEqual(result.asanaId, "balasana");
      assert.strictEqual(result.startingPosition, "kneeling");
      assert.ok(result.score >= 80, `Expected Balasana score >= 80, got ${result.score}`);
      assert.ok(result.successfulRules.length > 0);
    });
  });

  describe("Category 3: Lying / Plank Postures (Cobra, Bridge, Chaturanga)", () => {
    it("evaluates Bhujangasana (Cobra Pose) prone backbend without false standing errors", () => {
      const landmarks = createPerfectBhujangasanaLandmarks();
      const result = evaluateAsanaPose("bhujangasana", { landmarks });

      assert.strictEqual(result.asanaId, "bhujangasana");
      assert.strictEqual(result.startingPosition, "prone");
      assert.ok(result.score >= 80, `Expected Cobra score >= 80, got ${result.score}`);
      assert.strictEqual(result.primaryCorrection, null);
      assert.ok(result.successfulRules.some((r) => r.ruleId === "bhujangasana.chest.lift"));
    });

    it("evaluates Setu Bandhasana (Bridge Pose) supine backbend correctly", () => {
      const landmarks = createPerfectSetuBandhasanaLandmarks();
      const result = evaluateAsanaPose("setu-bandhasana", { landmarks });

      assert.strictEqual(result.asanaId, "setu-bandhasana");
      assert.strictEqual(result.startingPosition, "supine");
      assert.ok(result.score >= 80, `Expected Bridge score >= 80, got ${result.score}`);
      assert.ok(result.successfulRules.some((r) => r.ruleId === "bridge.hips.lift"));
    });

    it("evaluates Chaturanga Dandasana (Plank) with solid core alignment", () => {
      const landmarks = createPerfectChaturangaLandmarks();
      const result = evaluateAsanaPose("chaturanga-dandasana", { landmarks });

      assert.strictEqual(result.asanaId, "chaturanga-dandasana");
      assert.strictEqual(result.startingPosition, "plank");
      assert.ok(result.score >= 80, `Expected Chaturanga score >= 80, got ${result.score}`);
      assert.strictEqual(result.detectedIssues.length, 0);
    });

    it("evaluates Chaturanga with sagging core and returns specific core line correction", () => {
      const landmarks = createSaggingChaturangaLandmarks();
      const result = evaluateAsanaPose("chaturanga-dandasana", { landmarks });

      assert.strictEqual(result.asanaId, "chaturanga-dandasana");
      const coreIssue = result.detectedIssues.find((i) => i.ruleId === "chaturanga.body.line");
      assert.ok(coreIssue, "Expected chaturanga.body.line issue to be detected");
      assert.ok(
        coreIssue?.correction.includes("core") || coreIssue?.correction.includes("plank"),
        `Expected core correction, got: ${coreIssue?.correction}`
      );
    });
  });

  describe("Architectural Invariants & Robustness", () => {
    it("handles missing/empty landmarks gracefully returning not_ready status", () => {
      const result = evaluateAsanaPose("warrior-ii", { landmarks: [] });
      assert.strictEqual(result.overallStatus, "not_ready");
      assert.strictEqual(result.score, 0);
      assert.strictEqual(result.primaryCorrection, null);
      assert.strictEqual(result.detectedIssues.length, 0);
      assert.strictEqual(result.successfulRules.length, 0);
    });

    it("is completely data-driven and executes custom or fallback profile rules without code changes", () => {
      const profile = getAsanaCoachingProfile("adho-mukha-svanasana");
      assert.strictEqual(profile.asanaId, "adho-mukha-svanasana");
      assert.ok(profile.poseRules.length > 0, "Profile should have attached pose rules");

      const result = evaluateAsanaPose(profile, { landmarks: createBaseLandmarks() });
      assert.strictEqual(result.asanaId, "adho-mukha-svanasana");
      assert.strictEqual(result.asanaName, "Downward-Facing Dog");
      assert.ok(result.totalRules > 0);
    });
  });
});
