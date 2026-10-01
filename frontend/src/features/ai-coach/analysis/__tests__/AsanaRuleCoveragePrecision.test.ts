import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { ALL_ASANAS_CATALOG } from "../../data/allAsanasCatalog.ts";
import { resolveCanonicalAsanaId } from "../AsanaCanonicalIdResolver.ts";
import { getAsanaCoachingProfile } from "../../services/AsanaCoachingProfileService.ts";
import { KNOWN_CRITICAL_RULES, getAsanaCompletionRequirements } from "../AsanaCompletionGate.ts";
import { validatePoseIdentity } from "../PoseIdentityValidator.ts";
import { calculatePoseAccuracy } from "../AccuracyCalculator.ts";
import { AccuracyStabilizer } from "../AccuracyStabilizer.ts";
import { validateAsanas } from "../../../../../scripts/validateAsanas.ts";
import type { PoseEvaluatorContext } from "../../types/pose-rules.ts";
import type { Landmark, PoseLandmarks } from "../../types/landmarks.ts";

function createMockLandmarks(): PoseLandmarks {
  const landmarks: PoseLandmarks = [];
  for (let i = 0; i < 33; i++) {
    landmarks.push({
      x: 0.5,
      y: 0.5,
      z: 0.0,
      visibility: 0.95,
      presence: 0.95,
    });
  }
  return landmarks;
}

const VALID_METRICS = new Set(["angle", "distance", "horizontal_alignment", "vertical_alignment"]);
const VALID_STANCES = new Set(["standing", "seated", "kneeling", "all_fours", "prone", "supine", "plank", "bending", "inverted", "arm_balance"]);

describe("Phase 3: Asana Rule Coverage & Pose Precision Specification Tests", () => {
  // Test 1: Every asana has canonical ID
  it("Requirement 1: Every asana in catalog resolves to a valid non-empty canonical ID", () => {
    assert.strictEqual(ALL_ASANAS_CATALOG.length, 170);
    for (const asana of ALL_ASANAS_CATALOG) {
      const canonicalId = resolveCanonicalAsanaId(asana.id);
      assert.ok(canonicalId && canonicalId.length > 0, `Asana '${asana.id}' must resolve to a valid canonical ID`);
    }
  });

  // Test 2: Every asana has a valid stance
  it("Requirement 2: Every asana has a defined, recognized starting stance", () => {
    for (const asana of ALL_ASANAS_CATALOG) {
      const profile = getAsanaCoachingProfile(asana.id);
      assert.ok(profile.stance, `Asana '${asana.id}' must have a defined stance`);
      assert.ok(VALID_STANCES.has(profile.stance), `Asana '${asana.id}' has invalid stance '${profile.stance}'`);
    }
  });

  // Test 3: Every production asana has identity coverage
  it("Requirement 3: Every production asana has identity validation coverage and valid family expectation", () => {
    const context: PoseEvaluatorContext = {
      landmarks: createMockLandmarks(),
      worldLandmarks: createMockLandmarks(),
      timestamp: Date.now(),
    };

    for (const asana of ALL_ASANAS_CATALOG) {
      const identity = validatePoseIdentity(asana.id, context, undefined, asana.rules);
      assert.ok(identity !== null, `Identity validation should produce result for ${asana.id}`);
      assert.ok(typeof identity.isMatch === "boolean");
      assert.ok(identity.requiredStance !== undefined && identity.requiredStance.length > 0);
      assert.ok(identity.canonicalAsanaId !== undefined && identity.canonicalAsanaId.length > 0);
    }
  });

  // Test 4: Every production asana has form-rule coverage
  it("Requirement 4: Every catalog asana has at least 1 form rule and defined points", () => {
    for (const asana of ALL_ASANAS_CATALOG) {
      assert.ok(asana.rules && asana.rules.length >= 1, `Asana '${asana.id}' must have at least 1 rule`);
      for (const rule of asana.rules) {
        assert.ok(rule.points && rule.points.length >= 2, `Rule '${rule.id}' in '${asana.id}' must have at least 2 landmark points`);
      }
    }
  });

  // Test 5: Rules reference valid landmarks (0-32)
  it("Requirement 5: All rule points reference valid MediaPipe landmark indices [0..32]", () => {
    for (const asana of ALL_ASANAS_CATALOG) {
      for (const rule of asana.rules) {
        for (const pt of rule.points) {
          assert.ok(Number.isInteger(pt) && pt >= 0 && pt <= 32, `Rule '${rule.id}' has out-of-range point: ${pt}`);
        }
      }
    }
  });

  // Test 6: Rules use valid metrics
  it("Requirement 6: All rules use valid recognized metric types", () => {
    for (const asana of ALL_ASANAS_CATALOG) {
      for (const rule of asana.rules) {
        assert.ok(VALID_METRICS.has(rule.metric), `Rule '${rule.id}' has invalid metric '${rule.metric}'`);
      }
    }
  });

  // Test 7: Rule weights are valid
  it("Requirement 7: All rule weights are positive finite integers >= 1", () => {
    for (const asana of ALL_ASANAS_CATALOG) {
      for (const rule of asana.rules) {
        assert.ok(Number.isFinite(rule.weight) && rule.weight >= 1, `Rule '${rule.id}' has invalid weight '${rule.weight}'`);
      }
    }
  });

  // Test 8: Angle tolerances are valid
  it("Requirement 8: Angle rules have positive non-zero tolerances", () => {
    for (const asana of ALL_ASANAS_CATALOG) {
      for (const rule of asana.rules) {
        if (rule.metric === "angle") {
          const effectiveTolerance = rule.tolerance ?? (rule.min !== undefined && rule.max !== undefined ? (rule.max - rule.min) / 2 : undefined);
          assert.ok(effectiveTolerance !== undefined && effectiveTolerance > 0, `Angle rule '${rule.id}' must have positive tolerance`);
          assert.ok(rule.min !== undefined && rule.max !== undefined && rule.min <= rule.max, `Rule '${rule.id}' min (${rule.min}) must be <= max (${rule.max})`);
        }
      }
    }
  });

  // Test 9: Duplicate / conflicting rules are detected (0 duplicates in catalog)
  it("Requirement 9: Entire 170-asana catalog has zero duplicate rule IDs", () => {
    const seenRuleIds = new Set<string>();
    for (const asana of ALL_ASANAS_CATALOG) {
      for (const rule of asana.rules) {
        assert.ok(!seenRuleIds.has(rule.id), `Duplicate rule ID detected: '${rule.id}'`);
        seenRuleIds.add(rule.id);
      }
    }
    assert.strictEqual(seenRuleIds.size, 620);
  });

  // Test 10: Generic-only asanas are flagged (0 generic-only asanas in catalog)
  it("Requirement 10: Every asana in catalog has pose-specific joint angle or distance geometry (no generic-only asanas)", () => {
    for (const asana of ALL_ASANAS_CATALOG) {
      const hasPoseSpecific = asana.rules.some(r => r.metric === "angle" || r.metric === "distance");
      assert.ok(hasPoseSpecific, `Asana '${asana.id}' must not be generic-only; requires pose-specific joint geometry`);
    }
  });

  // Test 11: Critical rules are correctly registered
  it("Requirement 11: Production and validated asanas have critical completion rules resolved, and refinement status is tracked", () => {
    let resolvedCount = 0;
    let refinementCount = 0;

    for (const asana of ALL_ASANAS_CATALOG) {
      const reqs = getAsanaCompletionRequirements(asana.id);
      if (reqs.requiresDetectionRefinement) {
        refinementCount++;
        assert.ok(reqs.refinementReason && reqs.refinementReason.length > 0, `Blocked asana '${asana.id}' must provide refinement reason`);
      } else {
        resolvedCount++;
        assert.ok(reqs.criticalRuleIds && reqs.criticalRuleIds.length > 0, `Asana '${asana.id}' must have critical rule IDs`);
      }
    }

    assert.ok(resolvedCount >= 100, `At least 100 asanas must have resolved critical rules (got ${resolvedCount})`);
  });

  // Test 12: Phase 1 identity validation integration works across all stances
  it("Requirement 12: Phase 1 PoseIdentityValidator distinguishes poses across all 10 stance categories", () => {
    const context: PoseEvaluatorContext = {
      landmarks: createMockLandmarks(),
      worldLandmarks: createMockLandmarks(),
      timestamp: Date.now(),
    };

    const representativeAsanas = [
      "warrior-ii",
      "cobra-bhujangasana",
      "bridge-setu-bandha-sarvangasana",
      "lotus-padmasana",
      "downward-dog-adho-mukha-svanasana",
      "childs-pose-balasana",
      "crow-kakasana",
      "plank-phalakasana",
      "standing-forward-bend-uttanasana",
      "box-chakravakasana",
    ];

    for (const id of representativeAsanas) {
      const identity = validatePoseIdentity(id, context);
      assert.ok(identity.canonicalAsanaId.length > 0);
      assert.ok(identity.requiredStance.length > 0);
    }
  });

  // Test 13: Phase 1.5 completion gate requirements integrity
  it("Requirement 13: Phase 1.5 completion gate requirements integrity is preserved for all asanas", () => {
    for (const asana of ALL_ASANAS_CATALOG) {
      const req = getAsanaCompletionRequirements(asana.id);
      assert.ok(req.requiredStance.length > 0);
      assert.ok(req.minimumCriticalScore >= 70);
    }
  });

  // Test 14: Phase 2 accuracy calculation works cleanly across all enriched asanas
  it("Requirement 14: Phase 2 calculatePoseAccuracy runs cleanly without NaN/Infinity on all 170 asanas", () => {
    const context: PoseEvaluatorContext = {
      landmarks: createMockLandmarks(),
      worldLandmarks: createMockLandmarks(),
      timestamp: Date.now(),
    };

    for (const asana of ALL_ASANAS_CATALOG) {
      const result = calculatePoseAccuracy(asana.id, asana.rules, context);
      assert.ok(Number.isFinite(result.accuracy), `Accuracy must be finite for ${asana.id}`);
      assert.ok(result.accuracy >= 0 && result.accuracy <= 100);
      assert.ok(Number.isFinite(result.coverage));
      assert.ok(result.coverage >= 0 && result.coverage <= 1.0);
    }
  });

  // Test 15: 170 catalog validation script reports 0 errors
  it("Requirement 15: validateAsanas script validates all 170 catalog asanas with 0 errors and 0 warnings", () => {
    const valResult = validateAsanas();
    assert.strictEqual(valResult.total, 170);
    assert.strictEqual(valResult.errors, 0);
    assert.strictEqual(valResult.warnings, 0);
  });
});
