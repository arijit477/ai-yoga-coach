import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { getAsana, initAsanaRegistry } from "../../data/AsanaRegistry";
import { getAsanaDefinition } from "../rules/asanas";
import { ensureAsanaRules } from "../rules/poseRulesRegistry";
import { evaluatePose } from "../PoseEvaluator";
import type { Landmark } from "../../types/landmarks";

function createMockLandmarks(): Landmark[] {
  const landmarks: Landmark[] = [];
  for (let i = 0; i < 33; i++) {
    landmarks.push({
      x: 0.5,
      y: 0.5,
      z: 0.0,
      visibility: 0.95,
    });
  }

  // Setup biomechanically realistic Chair Pose (Utkatasana) landmarks
  // Left shoulder (11), Left elbow (13), Left wrist (15) - arms raised straight overhead along diagonal
  landmarks[11] = { x: 0.45, y: 0.35, z: 0.0, visibility: 0.95 }; // shoulder
  landmarks[13] = { x: 0.42, y: 0.20, z: 0.0, visibility: 0.95 }; // elbow
  landmarks[15] = { x: 0.39, y: 0.05, z: 0.0, visibility: 0.95 }; // wrist (straight line from 11 through 13 to 15 -> ~180° / 165° target)

  // Right shoulder (12), Right elbow (14), Right wrist (16)
  landmarks[12] = { x: 0.55, y: 0.35, z: 0.0, visibility: 0.95 };
  landmarks[14] = { x: 0.58, y: 0.20, z: 0.0, visibility: 0.95 };
  landmarks[16] = { x: 0.61, y: 0.05, z: 0.0, visibility: 0.95 };

  // Left hip (23), Right hip (24)
  landmarks[23] = { x: 0.45, y: 0.60, z: 0.0, visibility: 0.95 };
  landmarks[24] = { x: 0.55, y: 0.60, z: 0.0, visibility: 0.95 };

  // Left knee (25), Right knee (26) - bent forward & level
  landmarks[25] = { x: 0.42, y: 0.75, z: 0.15, visibility: 0.95 };
  landmarks[26] = { x: 0.52, y: 0.75, z: 0.15, visibility: 0.95 };

  // Left ankle (27), Right ankle (28) - grounded under hips/knees
  landmarks[27] = { x: 0.45, y: 0.90, z: 0.0, visibility: 0.95 };
  landmarks[28] = { x: 0.55, y: 0.90, z: 0.0, visibility: 0.95 };

  return landmarks;
}

describe("Chair Pose (Utkatasana) Rule Geometry Verification", () => {
  it("loads Chair Pose rules successfully from registry and catalog", () => {
    const asana = getAsana("chair-utkatasana");
    assert.ok(asana, "Chair Pose must exist in AsanaRegistry");
    assert.equal(asana.id, "chair-utkatasana");
    assert.equal(asana.rules.length, 4, "Must have exactly 4 rules");

    const rules = ensureAsanaRules("chair-utkatasana");
    assert.equal(rules.length, 4);

    const asanaDef = getAsanaDefinition("chair-utkatasana");
    assert.ok(asanaDef, "getAsanaDefinition must resolve chair-utkatasana");
  });

  it("has correct biomechanical rule definitions and geometry for Chair Pose", () => {
    const asana = getAsana("chair-utkatasana")!;
    const ruleIds = asana.rules.map((r) => r.id);

    assert.deepEqual(ruleIds, [
      "chair-utkatasana.knees.bend",
      "chair-utkatasana.torso.incline",
      "chair-utkatasana.arms.reach",
      "chair-utkatasana.knees.level",
    ]);

    const kneesBend = asana.rules.find((r) => r.id === "chair-utkatasana.knees.bend")!;
    assert.deepEqual(kneesBend.points, [23, 25, 27], "Knees bend must measure hip -> knee -> ankle");
    assert.equal(kneesBend.metric, "angle");

    const torsoIncline = asana.rules.find((r) => r.id === "chair-utkatasana.torso.incline")!;
    assert.deepEqual(torsoIncline.points, [11, 23, 25], "Torso incline must measure shoulder -> hip -> knee");
    assert.equal(torsoIncline.metric, "angle");

    const armsReach = asana.rules.find((r) => r.id === "chair-utkatasana.arms.reach")!;
    assert.deepEqual(armsReach.points, [11, 13, 15], "Arms reach must measure shoulder -> elbow -> wrist");
    assert.equal(armsReach.metric, "angle");

    const kneesLevel = asana.rules.find((r) => r.id === "chair-utkatasana.knees.level")!;
    assert.deepEqual(kneesLevel.points, [25, 26], "Knees level must measure left knee -> right knee horizontal alignment");
    assert.equal(kneesLevel.metric, "horizontal_alignment");

    assert.ok(asana.requiredLandmarks.includes(15), "Required landmarks must include wrist (15)");
  });

  it("evaluates all Chair Pose rules with finite angle values and non-zero raw score", () => {
    const landmarks = createMockLandmarks();
    const rules = ensureAsanaRules("chair-utkatasana");
    const evaluation = evaluatePose("chair-utkatasana", rules, {
      landmarks,
      worldLandmarks: landmarks,
      timestamp: Date.now(),
    });

    assert.equal(evaluation.summary.evaluatedRules, 4, "All 4 rules must be evaluated");
    assert.equal(evaluation.summary.unknownRules, 0, "No rule should be unknown or not evaluable");
    assert.ok(evaluation.score > 0, `Raw score must be > 0 (got ${evaluation.score})`);

    for (const rule of evaluation.rules) {
      assert.notEqual(rule.status, "unknown", `Rule ${rule.ruleId} should not be unknown`);
      assert.notEqual(rule.status, "not_evaluable", `Rule ${rule.ruleId} should not be not_evaluable`);
      assert.ok(
        rule.measuredValue !== null && Number.isFinite(rule.measuredValue),
        `Rule ${rule.ruleId} measuredValue must be finite number (got ${rule.measuredValue})`
      );
    }
  });
});
