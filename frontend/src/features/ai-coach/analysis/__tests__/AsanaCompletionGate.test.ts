import { describe, it } from "node:test";
import assert from "node:assert/strict";

import type { Landmark, PoseLandmarks } from "../../types/landmarks";
import { PoseLandmarkIndex as P } from "../../types/pose-landmarks";
import type { PoseEvaluationResult, RuleEvaluation } from "../../types/pose-rules";
import {
  getAsanaCompletionRequirements,
  evaluateCompletionGate,
  getCompletionCoverageAudit,
} from "../AsanaCompletionGate";
import { ALL_ASANAS_CATALOG } from "../../data/allAsanasCatalog";

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
 * Creates mock landmarks representing standing posture.
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
 * Creates mock landmarks representing seated posture.
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
 * Creates mock landmarks representing prone belly-down posture on mat (e.g. Cobra).
 */
function createProneLandmarks(): PoseLandmarks {
  return createLandmarks({
    [P.LEFT_SHOULDER]: { x: 0.30, y: 0.60, visibility: 0.95 },
    [P.RIGHT_SHOULDER]: { x: 0.30, y: 0.62, visibility: 0.95 },
    [P.LEFT_HIP]: { x: 0.55, y: 0.75, visibility: 0.95 },
    [P.RIGHT_HIP]: { x: 0.55, y: 0.77, visibility: 0.95 },
    [P.LEFT_KNEE]: { x: 0.70, y: 0.78, visibility: 0.95 },
    [P.RIGHT_KNEE]: { x: 0.70, y: 0.80, visibility: 0.95 },
    [P.LEFT_ANKLE]: { x: 0.85, y: 0.80, visibility: 0.95 },
    [P.RIGHT_ANKLE]: { x: 0.85, y: 0.82, visibility: 0.95 },
  });
}

/**
 * Creates mock landmarks representing supine back-lying posture (e.g. Bridge).
 */
function createSupineLandmarks(): PoseLandmarks {
  return createLandmarks({
    [P.LEFT_SHOULDER]: { x: 0.25, y: 0.75, visibility: 0.95 },
    [P.RIGHT_SHOULDER]: { x: 0.25, y: 0.77, visibility: 0.95 },
    [P.LEFT_HIP]: { x: 0.50, y: 0.65, visibility: 0.95 }, // Elevated in bridge
    [P.RIGHT_HIP]: { x: 0.50, y: 0.67, visibility: 0.95 },
    [P.LEFT_KNEE]: { x: 0.60, y: 0.55, visibility: 0.95 },
    [P.RIGHT_KNEE]: { x: 0.60, y: 0.57, visibility: 0.95 },
    [P.LEFT_ANKLE]: { x: 0.70, y: 0.75, visibility: 0.95 },
    [P.RIGHT_ANKLE]: { x: 0.70, y: 0.77, visibility: 0.95 },
  });
}

function createMockEvaluation(overrides: Partial<PoseEvaluationResult> = {}): PoseEvaluationResult {
  return {
    asanaId: "bhujangasana",
    score: 85,
    rawScore: 85,
    isValid: true,
    primaryIssue: null,
    secondaryIssues: [],
    resolvedIssues: [],
    scoreTrend: "stable",
    stability: 100,
    holdProgress: 50,
    completionEligible: false,
    activeRules: 4,
    evaluatedAt: Date.now(),
    rules: [
      {
        ruleId: "bhujangasana.chest.lift",
        ruleName: "Chest Lift Extension",
        metric: "angle",
        status: "pass",
        severity: "high",
        weight: 3,
        score: 90,
        measuredValue: 150,
      },
      {
        ruleId: "bhujangasana.elbows.tuck",
        ruleName: "Elbow Bend & Tuck",
        metric: "angle",
        status: "pass",
        severity: "high",
        weight: 2,
        score: 88,
        measuredValue: 110,
      },
    ] as RuleEvaluation[],
    summary: {
      totalRules: 4,
      evaluatedRules: 4,
      passedRules: 4,
      warningRules: 0,
      failedRules: 0,
      unknownRules: 0,
    },
    confidence: 0.92,
    posture: {
      head: "good",
      neck: "good",
      shoulders: "good",
      elbows: "good",
      spine: "good",
      hips: "good",
      knees: "good",
      ankles: "good",
    },
    ...overrides,
  };
}

describe("Generic Asana Completion Gate Suite", () => {
  // 1. Cobra False-Positive Regression Tests
  describe("Section 7: Cobra False-Positive Regression", () => {
    it("Cobra selected + user sitting -> NO completion", () => {
      const sittingLms = createSeatedLandmarks();
      const evalResult = createMockEvaluation({
        asanaId: "bhujangasana",
        score: 92, // High score from sitting
      });

      const gateResult = evaluateCompletionGate({
        asanaId: "bhujangasana",
        evaluation: evalResult,
        landmarks: sittingLms,
      });

      assert.strictEqual(gateResult.isEligible, false, "Sitting user must NOT complete Cobra");
      assert.strictEqual(gateResult.stanceValid, false, "Sitting stance must fail Cobra prone stance requirement");
      assert.ok(gateResult.reason?.includes("prone"), "Reason must mention prone requirement");
    });

    it("Cobra selected + user standing -> NO completion", () => {
      const standingLms = createStandingLandmarks();
      const evalResult = createMockEvaluation({
        asanaId: "bhujangasana",
        score: 95, // High score from standing with bent elbows
      });

      const gateResult = evaluateCompletionGate({
        asanaId: "bhujangasana",
        evaluation: evalResult,
        landmarks: standingLms,
      });

      assert.strictEqual(gateResult.isEligible, false, "Standing user must NOT complete Cobra");
      assert.strictEqual(gateResult.stanceValid, false, "Standing stance must fail Cobra prone stance requirement");
    });

    it("Cobra selected + random movement -> NO completion", () => {
      const randomLms = createLandmarks({
        [P.LEFT_SHOULDER]: { x: 0.1, y: 0.2 },
        [P.RIGHT_SHOULDER]: { x: 0.9, y: 0.8 },
      });
      const evalResult = createMockEvaluation({
        asanaId: "bhujangasana",
        score: 50,
        isValid: false,
      });

      const gateResult = evaluateCompletionGate({
        asanaId: "bhujangasana",
        evaluation: evalResult,
        landmarks: randomLms,
      });

      assert.strictEqual(gateResult.isEligible, false, "Random movement must NOT complete Cobra");
    });

    it("Cobra selected + partial Cobra (prone, but chest lift fails) -> NO completion", () => {
      const proneLms = createProneLandmarks();
      const evalResult = createMockEvaluation({
        asanaId: "bhujangasana",
        score: 68,
        rules: [
          {
            ruleId: "bhujangasana.chest.lift",
            ruleName: "Chest Lift Extension",
            metric: "angle",
            status: "fail", // Chest not lifted
            severity: "high",
            weight: 3,
            score: 40,
            measuredValue: 110,
          },
          {
            ruleId: "bhujangasana.elbows.tuck",
            ruleName: "Elbow Bend & Tuck",
            metric: "angle",
            status: "pass",
            severity: "high",
            weight: 2,
            score: 90,
            measuredValue: 110,
          },
        ] as RuleEvaluation[],
      });

      const gateResult = evaluateCompletionGate({
        asanaId: "bhujangasana",
        evaluation: evalResult,
        landmarks: proneLms,
      });

      assert.strictEqual(gateResult.isEligible, false, "Partial Cobra with failed chest lift must NOT complete");
      assert.strictEqual(gateResult.criticalRulesValid, false, "Critical rule failure must invalidate completion");
    });

    it("Cobra selected + valid prone + all critical Cobra requirements pass -> COMPLETION", () => {
      const proneLms = createProneLandmarks();
      const evalResult = createMockEvaluation({
        asanaId: "bhujangasana",
        score: 88,
      });

      const gateResult = evaluateCompletionGate({
        asanaId: "bhujangasana",
        evaluation: evalResult,
        landmarks: proneLms,
      });

      assert.strictEqual(gateResult.isEligible, true, "Proper prone Cobra with critical rules passed MUST complete");
      assert.strictEqual(gateResult.stanceValid, true);
      assert.strictEqual(gateResult.criticalRulesValid, true);
      assert.strictEqual(gateResult.accuracyValid, true);
    });
  });

  // 2. Representative Poses
  describe("Section 8: Representative Poses Testing", () => {
    it("Bridge Pose: Standing fails supine stance, prone fails, supine passes", () => {
      const standing = createStandingLandmarks();
      const supine = createSupineLandmarks();

      const bridgeStanding = evaluateCompletionGate({
        asanaId: "setu-bandhasana",
        evaluation: createMockEvaluation({ asanaId: "setu-bandhasana", score: 90 }),
        landmarks: standing,
      });
      assert.strictEqual(bridgeStanding.isEligible, false, "Standing cannot complete Bridge");

      const bridgeSupine = evaluateCompletionGate({
        asanaId: "setu-bandhasana",
        evaluation: createMockEvaluation({
          asanaId: "setu-bandhasana",
          score: 85,
          rules: [
            {
              ruleId: "bridge.hips.lift",
              status: "pass",
              severity: "high",
              weight: 3,
              score: 88,
            },
            {
              ruleId: "bridge.left_knee.angle",
              status: "pass",
              severity: "high",
              weight: 2,
              score: 90,
            },
          ] as RuleEvaluation[],
        }),
        landmarks: supine,
      });
      assert.strictEqual(bridgeSupine.isEligible, true, "Valid supine Bridge must complete");
    });

    it("Lotus Pose: Standing fails seated stance, seated passes", () => {
      const standing = createStandingLandmarks();
      const seated = createSeatedLandmarks();

      const lotusStanding = evaluateCompletionGate({
        asanaId: "padmasana",
        evaluation: createMockEvaluation({ asanaId: "padmasana", score: 90 }),
        landmarks: standing,
      });
      assert.strictEqual(lotusStanding.isEligible, false, "Standing cannot complete Lotus");

      const lotusSeated = evaluateCompletionGate({
        asanaId: "padmasana",
        evaluation: createMockEvaluation({
          asanaId: "padmasana",
          score: 88,
          rules: [
            {
              ruleId: "padmasana.spine.vertical",
              status: "pass",
              severity: "high",
              weight: 3,
              score: 92,
            },
            {
              ruleId: "padmasana.hips.level",
              status: "pass",
              severity: "medium",
              weight: 2,
              score: 85,
            },
          ] as RuleEvaluation[],
        }),
        landmarks: seated,
      });
      assert.strictEqual(lotusSeated.isEligible, true, "Valid seated Lotus must complete");
    });

    it("Warrior II: Seated fails standing stance, standing passes", () => {
      const seated = createSeatedLandmarks();
      const standing = createStandingLandmarks();

      const warriorSeated = evaluateCompletionGate({
        asanaId: "warrior-ii",
        evaluation: createMockEvaluation({ asanaId: "warrior-ii", score: 90 }),
        landmarks: seated,
      });
      assert.strictEqual(warriorSeated.isEligible, false, "Seated cannot complete Warrior II");

      const warriorStanding = evaluateCompletionGate({
        asanaId: "warrior-ii",
        evaluation: createMockEvaluation({
          asanaId: "warrior-ii",
          score: 86,
          rules: [
            {
              ruleId: "warrior-ii-left-knee-angle",
              status: "pass",
              severity: "high",
              weight: 3,
              score: 88,
            },
            {
              ruleId: "warrior-ii-shoulder-alignment",
              status: "pass",
              severity: "high",
              weight: 2,
              score: 85,
            },
          ] as RuleEvaluation[],
        }),
        landmarks: standing,
      });
      assert.strictEqual(warriorStanding.isEligible, true, "Valid standing Warrior II must complete");
    });
  });

  // 3. Completeness across all 170 active asanas
  describe("Section 9: Full 170 Asanas Completeness & Audit", () => {
    it("Verifies every active asana in ALL_ASANAS_CATALOG has a valid completion requirement", () => {
      assert.strictEqual(ALL_ASANAS_CATALOG.length, 170, "Total active asanas must be 170");

      for (const asana of ALL_ASANAS_CATALOG) {
        const reqs = getAsanaCompletionRequirements(asana.id);
        assert.ok(reqs, `Requirements must exist for ${asana.id}`);
        assert.ok(reqs.asanaId, `asanaId must be populated for ${asana.id}`);
        assert.ok(reqs.requiredStance, `requiredStance must be defined for ${asana.id}`);
        assert.ok(Array.isArray(reqs.criticalRuleIds), `criticalRuleIds must be an array for ${asana.id}`);
        assert.ok(reqs.requiredRegions.length > 0, `requiredRegions must be defined for ${asana.id}`);
      }
    });

    it("Generates comprehensive completion coverage audit", () => {
      const audit = getCompletionCoverageAudit();
      assert.strictEqual(audit.totalAsanas, 170);
      assert.strictEqual(audit.completionProfiles, 170);
      assert.ok(audit.fullyValidated > 0, "Must have fully validated asanas");
      assert.strictEqual(audit.missingRequirements, 0, "No asana should have missing requirements");
      console.log("COMPLETION_GATE_AUDIT:", JSON.stringify({
        total: audit.totalAsanas,
        fullyValidated: audit.fullyValidated,
        requiresDetectionRefinement: audit.requiresDetectionRefinement,
      }));
    });
  });

  // 4. Multi-asana switching isolation
  describe("Section 16: Multi-Asana Switching Isolation", () => {
    it("Cobra -> Bridge -> Lotus -> Cobra maintains clean isolation without leaking critical rules", () => {
      const cobraReqs = getAsanaCompletionRequirements("bhujangasana");
      const bridgeReqs = getAsanaCompletionRequirements("setu-bandhasana");
      const lotusReqs = getAsanaCompletionRequirements("padmasana");
      const cobraReqs2 = getAsanaCompletionRequirements("bhujangasana");

      assert.strictEqual(cobraReqs.requiredStance, "prone");
      assert.strictEqual(bridgeReqs.requiredStance, "supine");
      assert.strictEqual(lotusReqs.requiredStance, "seated");
      assert.strictEqual(cobraReqs2.requiredStance, "prone");

      // Verify rule IDs do not overlap
      assert.notDeepStrictEqual(cobraReqs.criticalRuleIds, bridgeReqs.criticalRuleIds);
      assert.notDeepStrictEqual(bridgeReqs.criticalRuleIds, lotusReqs.criticalRuleIds);
      assert.deepStrictEqual(cobraReqs.criticalRuleIds, cobraReqs2.criticalRuleIds);
    });
  });
});
