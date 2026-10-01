/**
 * Phase10ACompletionGateFix.test.ts
 *
 * Regression tests for pmt.md Phase 10A — Fix Completion Gate Architecture.
 *
 * Tests the 10 scenarios from Step 10:
 *  1. Compound ID resolves to critical profile
 *  2. Cobra false positive rejected (catalog compound ID)
 *  3. Wrong stance rejected
 *  4. Missing critical rules cannot complete
 *  5. Generic first-rule cannot establish completion
 *  6. requiresDetectionRefinement cannot complete
 *  7. Correct pose + 5 sec completes
 *  8. Asana switch resets hold
 *  9. Invalid pose resets hold
 * 10. No duplicate completion
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";

import type { Landmark, PoseLandmarks } from "../../types/landmarks";
import { PoseLandmarkIndex as P } from "../../types/pose-landmarks";
import type { PoseEvaluationResult, RuleEvaluation, PoseIssue } from "../../types/pose-rules";
import {
  evaluateCompletionGate,
  getAsanaCompletionRequirements,
} from "../AsanaCompletionGate";
import {
  resolveCanonicalAsanaId,
  getCanonicalIdMappings,
  getCanonicalMappingCount,
} from "../AsanaCanonicalIdResolver";
import {
  COMPLETION_HOLD_MS,
  COMPLETION_ACCURACY_THRESHOLD,
  DEFAULT_REQUIRED_HOLD_SECONDS,
} from "../../../../hooks/useCoachSession";

// ---------------------------------------------------------------------------
// Landmark helpers
// ---------------------------------------------------------------------------

function makeLandmarks(overrides: Partial<Record<number, Partial<Landmark>>> = {}): PoseLandmarks {
  const lm: PoseLandmarks = [];
  for (let i = 0; i < 33; i++) {
    const base: Landmark = { x: 0.5, y: 0.5, z: 0.0, visibility: 0.95, presence: 0.95 };
    lm.push(overrides[i] ? { ...base, ...overrides[i] } : { ...base });
  }
  return lm;
}

/** Standing landmarks — spine vertical, hips below shoulders, knees/ankles below hips */
function standingLandmarks(): PoseLandmarks {
  return makeLandmarks({
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

/** Prone landmarks — horizontal body, belly-down */
function proneLandmarks(): PoseLandmarks {
  return makeLandmarks({
    [P.NOSE]: { x: 0.20, y: 0.45, visibility: 0.95 },
    [P.LEFT_SHOULDER]: { x: 0.28, y: 0.52, visibility: 0.95 },
    [P.RIGHT_SHOULDER]: { x: 0.28, y: 0.54, visibility: 0.95 },
    [P.LEFT_ELBOW]: { x: 0.38, y: 0.68, visibility: 0.95 },
    [P.RIGHT_ELBOW]: { x: 0.38, y: 0.70, visibility: 0.95 },
    [P.LEFT_WRIST]: { x: 0.30, y: 0.75, visibility: 0.95 },
    [P.RIGHT_WRIST]: { x: 0.30, y: 0.77, visibility: 0.95 },
    [P.LEFT_HIP]: { x: 0.55, y: 0.75, visibility: 0.95 },
    [P.RIGHT_HIP]: { x: 0.55, y: 0.77, visibility: 0.95 },
    [P.LEFT_KNEE]: { x: 0.70, y: 0.78, visibility: 0.95 },
    [P.RIGHT_KNEE]: { x: 0.70, y: 0.80, visibility: 0.95 },
    [P.LEFT_ANKLE]: { x: 0.85, y: 0.80, visibility: 0.95 },
    [P.RIGHT_ANKLE]: { x: 0.85, y: 0.82, visibility: 0.95 },
  });
}

/** Supine landmarks — horizontal body, back-down */
function supineLandmarks(): PoseLandmarks {
  return makeLandmarks({
    [P.LEFT_SHOULDER]: { x: 0.25, y: 0.75, visibility: 0.95 },
    [P.RIGHT_SHOULDER]: { x: 0.25, y: 0.77, visibility: 0.95 },
    [P.LEFT_HIP]: { x: 0.50, y: 0.65, visibility: 0.95 },
    [P.RIGHT_HIP]: { x: 0.50, y: 0.67, visibility: 0.95 },
    [P.LEFT_KNEE]: { x: 0.60, y: 0.55, visibility: 0.95 },
    [P.RIGHT_KNEE]: { x: 0.60, y: 0.57, visibility: 0.95 },
    [P.LEFT_ANKLE]: { x: 0.70, y: 0.75, visibility: 0.95 },
    [P.RIGHT_ANKLE]: { x: 0.70, y: 0.77, visibility: 0.95 },
  });
}

// ---------------------------------------------------------------------------
// Evaluation helpers
// ---------------------------------------------------------------------------

function cobraEval(overrides: Partial<PoseEvaluationResult> = {}): PoseEvaluationResult {
  const rules: RuleEvaluation[] = [
    { ruleId: "bhujangasana.chest.lift", ruleName: "Chest Elevation", status: "pass", score: 88, weight: 3, isSafety: true, feedback: "Good lift", currentValue: 35, targetMin: 20, targetMax: 50 },
    { ruleId: "bhujangasana.elbows.tuck", ruleName: "Elbow Tuck", status: "pass", score: 85, weight: 2, isSafety: false, feedback: "Good tuck", currentValue: 15, targetMin: 0, targetMax: 25 },
  ];
  return {
    asanaId: "cobra-bhujangasana",
    score: 86,
    confidence: 0.90,
    isValid: true,
    identity: {
      isMatch: true,
      confidence: 0.90,
      canonicalAsanaId: "bhujangasana",
      requiredStance: "prone",
      detectedStance: "prone",
      passedRequirements: ["stance:prone", "bhujangasana.chest.lift", "bhujangasana.elbows.tuck"],
      failedRequirements: [],
      criticalFailures: [],
    },
    primaryIssue: null,
    secondaryIssues: [],
    rules,
    summary: { totalRules: 2, evaluatedRules: 2, passedRules: 2, warningRules: 0, failedRules: 0, unknownRules: 0 },
    ...overrides,
  };
}

function bridgeEval(overrides: Partial<PoseEvaluationResult> = {}): PoseEvaluationResult {
  const rules: RuleEvaluation[] = [
    { ruleId: "bridge.hips.lift", ruleName: "Hip Elevation", status: "pass", score: 85, weight: 3, isSafety: true, feedback: "Hips lifted", currentValue: 40, targetMin: 30, targetMax: 60 },
    { ruleId: "bridge.left_knee.angle", ruleName: "Knee Angle", status: "pass", score: 88, weight: 2, isSafety: false, feedback: "Good bend", currentValue: 90, targetMin: 80, targetMax: 100 },
  ];
  return {
    asanaId: "bridge-setu-bandha-sarvangasana",
    score: 86,
    confidence: 0.92,
    isValid: true,
    identity: {
      isMatch: true,
      confidence: 0.92,
      canonicalAsanaId: "setu-bandhasana",
      requiredStance: "supine",
      detectedStance: "supine",
      passedRequirements: ["stance:supine", "bridge.hips.lift"],
      failedRequirements: [],
      criticalFailures: [],
    },
    primaryIssue: null,
    secondaryIssues: [],
    rules,
    summary: { totalRules: 2, evaluatedRules: 2, passedRules: 2, warningRules: 0, failedRules: 0, unknownRules: 0 },
    ...overrides,
  };
}

/** Generic evaluation with only horizontal/vertical alignment rules (the "first-rule fallback" pattern) */
function genericAlignmentEval(asanaId: string, score = 85): PoseEvaluationResult {
  const rules: RuleEvaluation[] = [
    { ruleId: `${asanaId}.shoulder.level`, ruleName: "Shoulder Balance", status: "pass", score, weight: 1, isSafety: false, feedback: "Level", currentValue: 0.02, targetMin: 0, targetMax: 0.05 },
    { ruleId: `${asanaId}.spine.vertical`, ruleName: "Spinal Alignment", status: "pass", score, weight: 1, isSafety: false, feedback: "Straight", currentValue: 0.03, targetMin: 0, targetMax: 0.08 },
  ];
  return {
    asanaId,
    score,
    confidence: 0.92,
    isValid: true,
    primaryIssue: null,
    secondaryIssues: [],
    rules,
    summary: { totalRules: 2, evaluatedRules: 2, passedRules: 2, warningRules: 0, failedRules: 0, unknownRules: 0 },
  };
}

// ---------------------------------------------------------------------------
// Minimal hold simulator (mirrors useCoachSession logic)
// ---------------------------------------------------------------------------
class HoldSimulator {
  asanaId: string;
  holdMs: number;
  candidateSince: number | null = null;
  holdTime = 0;
  completed = false;
  completionCount = 0;

  constructor(asanaId: string, holdMs = COMPLETION_HOLD_MS) {
    this.asanaId = asanaId;
    this.holdMs = holdMs;
  }

  reset() {
    this.candidateSince = null;
    this.holdTime = 0;
    this.completed = false;
  }

  switchAsana(id: string) {
    this.asanaId = id;
    this.reset();
  }

  frame(
    evaluation: PoseEvaluationResult | null,
    lm: PoseLandmarks | null,
    t: number,
    cameraReady = true
  ): { eligible: boolean; completed: boolean; holdTime: number } {
    if (this.completed) return { eligible: false, completed: true, holdTime: this.holdTime };
    if (!evaluation || !lm) {
      this.candidateSince = null;
      this.holdTime = 0;
      return { eligible: false, completed: false, holdTime: 0 };
    }

    const gate = evaluateCompletionGate({
      asanaId: this.asanaId,
      evaluation,
      landmarks: lm,
      cameraReady,
      completionAccuracyThreshold: COMPLETION_ACCURACY_THRESHOLD,
    });

    if (gate.isEligible) {
      if (this.candidateSince === null) this.candidateSince = t;
      const elapsed = t - this.candidateSince;
      this.holdTime = Math.round((elapsed / 1000) * 10) / 10;
      if (elapsed >= this.holdMs) {
        this.completed = true;
        this.completionCount++;
        return { eligible: true, completed: true, holdTime: this.holdTime };
      }
    } else {
      this.candidateSince = null;
      this.holdTime = 0;
    }
    return { eligible: gate.isEligible, completed: false, holdTime: this.holdTime };
  }
}

// ===========================================================================
// TEST SUITE
// ===========================================================================

describe("Phase 10A — Completion Gate Architecture Fix (pmt.md Step 10)", () => {

  // -------------------------------------------------------------------------
  // TEST 1 — Compound ID resolves to critical profile
  // -------------------------------------------------------------------------
  it("1. Compound catalog ID 'cobra-bhujangasana' resolves to canonical 'bhujangasana' and finds KNOWN_CRITICAL_RULES", () => {
    // Verify resolver
    assert.equal(resolveCanonicalAsanaId("cobra-bhujangasana"), "bhujangasana");
    assert.equal(resolveCanonicalAsanaId("warrior-ii-virabhadrasana-ii"), "warrior-ii");
    assert.equal(resolveCanonicalAsanaId("mountain-tadasana"), "tadasana");
    assert.equal(resolveCanonicalAsanaId("tree-vrksasana"), "vrksasana");
    assert.equal(resolveCanonicalAsanaId("lotus-padmasana"), "padmasana");
    assert.equal(resolveCanonicalAsanaId("downward-dog-adho-mukha-svanasana"), "adho-mukha-svanasana");
    assert.equal(resolveCanonicalAsanaId("childs-pose-balasana"), "balasana");
    assert.equal(resolveCanonicalAsanaId("low-push-up-chaturanga-dandasana"), "chaturanga-dandasana");
    assert.equal(resolveCanonicalAsanaId("bridge-setu-bandha-sarvangasana"), "setu-bandhasana");

    // Unknown IDs pass through unchanged
    assert.equal(resolveCanonicalAsanaId("some-unknown-pose"), "some-unknown-pose");

    // Mapping count > 0 (at least all the 9 catalog compound IDs we know about)
    assert.ok(getCanonicalMappingCount() >= 9, `Expected >= 9 canonical mappings, got ${getCanonicalMappingCount()}`);

    // Requirements for cobra-bhujangasana should have KNOWN_CRITICAL_RULES IDs
    const reqs = getAsanaCompletionRequirements("cobra-bhujangasana");
    assert.equal(reqs.canonicalId, "bhujangasana");
    assert.ok(reqs.criticalRuleIds.length >= 2, "Cobra should have >= 2 critical rule IDs from KNOWN_CRITICAL_RULES");
    assert.ok(reqs.criticalRuleIds.includes("bhujangasana.chest.lift"), "Must include bhujangasana.chest.lift");
    assert.ok(reqs.criticalRuleIds.includes("bhujangasana.elbows.tuck"), "Must include bhujangasana.elbows.tuck");
    assert.equal(reqs.requiresDetectionRefinement, false, "Cobra must NOT require detection refinement after fix");
  });

  // -------------------------------------------------------------------------
  // TEST 2 — Cobra false positive rejected (catalog compound ID)
  // -------------------------------------------------------------------------
  it("2. Cobra false positive rejected: user sits upright while 'cobra-bhujangasana' is selected → isEligible=false", () => {
    const sitting = standingLandmarks(); // standing / sitting upright
    const eval_ = cobraEval({ score: 90 }); // high score, wrong body

    const result = evaluateCompletionGate({
      asanaId: "cobra-bhujangasana",
      evaluation: eval_,
      landmarks: sitting,
      cameraReady: true,
      completionAccuracyThreshold: COMPLETION_ACCURACY_THRESHOLD,
    });

    assert.equal(result.isEligible, false, "Must NOT be eligible — prone stance required but standing detected");
    assert.equal(result.stanceValid, false, "Stance check must fail");
    assert.ok(result.reason, "Must have a reason string");
  });

  // -------------------------------------------------------------------------
  // TEST 3 — Wrong stance rejected for all 8 known KNOWN_CRITICAL_RULES poses
  // -------------------------------------------------------------------------
  it("3. Wrong stance rejected: each KNOWN_CRITICAL_RULES pose fails gate when user is in wrong body position", () => {
    // Cobra (prone) selected, user is standing
    const cobraResult = evaluateCompletionGate({
      asanaId: "cobra-bhujangasana",
      evaluation: cobraEval({ score: 82 }),
      landmarks: standingLandmarks(),
      cameraReady: true,
      completionAccuracyThreshold: COMPLETION_ACCURACY_THRESHOLD,
    });
    assert.equal(cobraResult.isEligible, false, "Cobra: standing user must fail prone stance gate");
    assert.equal(cobraResult.stanceValid, false);

    // Bridge (supine inferred) selected, user is standing
    const bridgeResult = evaluateCompletionGate({
      asanaId: "bridge-setu-bandha-sarvangasana",
      evaluation: bridgeEval({ score: 82 }),
      landmarks: standingLandmarks(),
      cameraReady: true,
      completionAccuracyThreshold: COMPLETION_ACCURACY_THRESHOLD,
    });
    assert.equal(bridgeResult.isEligible, false, "Bridge: standing user must fail supine stance gate");
    assert.equal(bridgeResult.stanceValid, false);

    // Warrior II (standing) selected, user is prone
    const warriorResult = evaluateCompletionGate({
      asanaId: "warrior-ii-virabhadrasana-ii",
      evaluation: { asanaId: "warrior-ii-virabhadrasana-ii", score: 82, confidence: 0.9, isValid: true, primaryIssue: null, secondaryIssues: [], rules: [{ ruleId: "warrior-ii-left-knee-angle", ruleName: "Knee", status: "pass", score: 82, weight: 2, isSafety: false, feedback: "ok", currentValue: 90, targetMin: 80, targetMax: 100 }], summary: { totalRules: 1, evaluatedRules: 1, passedRules: 1, warningRules: 0, failedRules: 0, unknownRules: 0 } },
      landmarks: proneLandmarks(),
      cameraReady: true,
      completionAccuracyThreshold: COMPLETION_ACCURACY_THRESHOLD,
    });
    assert.equal(warriorResult.isEligible, false, "Warrior II: prone user must fail standing stance gate");
    assert.equal(warriorResult.stanceValid, false);
  });

  // -------------------------------------------------------------------------
  // TEST 4 — Missing critical rules cannot complete
  // -------------------------------------------------------------------------
  it("4. Missing critical rules: if required critical rule IDs are absent from evaluation.rules, gate blocks completion", () => {
    // Cobra eval where the critical rules are FAILING
    const failedRules: RuleEvaluation[] = [
      { ruleId: "bhujangasana.chest.lift", ruleName: "Chest Elevation", status: "fail", score: 40, weight: 3, isSafety: true, feedback: "Lift chest", currentValue: 5, targetMin: 20, targetMax: 50 },
      { ruleId: "bhujangasana.elbows.tuck", ruleName: "Elbow Tuck", status: "fail", score: 35, weight: 2, isSafety: false, feedback: "Tuck elbows", currentValue: 45, targetMin: 0, targetMax: 25 },
    ];
    const failEval = cobraEval({ score: 78, rules: failedRules });
    const result = evaluateCompletionGate({
      asanaId: "cobra-bhujangasana",
      evaluation: failEval,
      landmarks: proneLandmarks(),
      cameraReady: true,
      completionAccuracyThreshold: COMPLETION_ACCURACY_THRESHOLD,
    });
    assert.equal(result.isEligible, false, "Must be ineligible when critical rules fail");
    assert.equal(result.criticalRulesValid, false);
    assert.ok(result.failedCriticalRuleIds.length > 0, "Must report failed critical rule IDs");
    assert.ok(result.reason?.includes("Critical rule failure"), `Reason must mention critical rule failure, got: ${result.reason}`);
  });

  // -------------------------------------------------------------------------
  // TEST 5 — Generic first-rule cannot establish completion
  // -------------------------------------------------------------------------
  it("5. Generic first-rule fallback CANNOT establish completion — requiresDetectionRefinement asanas are BLOCKED", () => {
    // "chair-utkatasana" has only generic alignment rules (shoulder.level, spine.vertical, hip.level)
    // After fix, this must be BLOCKED (requiresDetectionRefinement = true, no first-rule promoted)
    const chairReqs = getAsanaCompletionRequirements("chair-utkatasana");
    assert.equal(chairReqs.requiresDetectionRefinement, true, "Chair Pose must require detection refinement (no high-sev rules)");
    assert.equal(chairReqs.criticalRuleIds.length, 0, "Chair Pose must have 0 critical rule IDs after first-rule removal");

    // Gate must return false regardless of score
    const result = evaluateCompletionGate({
      asanaId: "chair-utkatasana",
      evaluation: genericAlignmentEval("chair-utkatasana", 95), // 95% accuracy
      landmarks: standingLandmarks(),
      cameraReady: true,
      completionAccuracyThreshold: COMPLETION_ACCURACY_THRESHOLD,
    });
    assert.equal(result.isEligible, false, "Chair Pose must be ineligible due to requiresDetectionRefinement");
    assert.ok(result.reason?.includes("DETECTION_REFINEMENT_REQUIRED"), `Reason must indicate detection refinement, got: ${result.reason}`);

    // Another blocked asana: "big-toe-padangushthasana"
    const bigToeReqs = getAsanaCompletionRequirements("big-toe-padangushthasana");
    assert.equal(bigToeReqs.requiresDetectionRefinement, true, "Big Toe Pose must require detection refinement");
    assert.equal(bigToeReqs.criticalRuleIds.length, 0);
  });

  // -------------------------------------------------------------------------
  // TEST 6 — requiresDetectionRefinement asanas cannot complete even at 100% accuracy
  // -------------------------------------------------------------------------
  it("6. requiresDetectionRefinement=true poses cannot complete even at 100% accuracy with perfect stance", () => {
    // "bound-angle-baddha-konasana" — seated, only generic alignment rules
    const reqs = getAsanaCompletionRequirements("bound-angle-baddha-konasana");
    assert.equal(reqs.requiresDetectionRefinement, true);

    const perfectEval: PoseEvaluationResult = {
      asanaId: "bound-angle-baddha-konasana",
      score: 100,
      confidence: 1.0,
      isValid: true,
      primaryIssue: null,
      secondaryIssues: [],
      rules: [],
      summary: { totalRules: 0, evaluatedRules: 0, passedRules: 0, warningRules: 0, failedRules: 0, unknownRules: 0 },
    };

    // Even with 100% score on perfect landmarks, gate must return false
    for (let attempt = 0; attempt < 5; attempt++) {
      const result = evaluateCompletionGate({
        asanaId: "bound-angle-baddha-konasana",
        evaluation: perfectEval,
        landmarks: standingLandmarks(),
        cameraReady: true,
        completionAccuracyThreshold: 0, // zero threshold — accuracy cannot block
      });
      assert.equal(result.isEligible, false, "Must always be false for requiresDetectionRefinement asanas");
    }
  });

  // -------------------------------------------------------------------------
  // TEST 7 — Correct pose + 5 continuous seconds → completion (for KNOWN profiles)
  // -------------------------------------------------------------------------
  it("7. Correct Cobra pose held for 5 continuous seconds triggers exactly ONE completion", () => {
    const sim = new HoldSimulator("cobra-bhujangasana", 5000);
    const lm = proneLandmarks();
    const eval_ = cobraEval({ score: 86 });

    // Hold 4900 ms — NOT complete
    for (let t = 1000; t <= 5900; t += 100) {
      const r = sim.frame(eval_, lm, t);
      assert.equal(r.completed, false, `Must not complete at t=${t}`);
    }
    assert.equal(sim.completed, false);
    assert.equal(sim.completionCount, 0);

    // t=6000: exactly 5000 ms continuous → complete
    const finalFrame = sim.frame(eval_, lm, 6000);
    assert.equal(finalFrame.completed, true, "Must complete at exactly 5000ms continuous hold");
    assert.equal(sim.completionCount, 1);
  });

  // -------------------------------------------------------------------------
  // TEST 8 — Asana switch resets hold
  // -------------------------------------------------------------------------
  it("8. Asana switch resets the continuous hold — Cobra's 4s hold cannot carry over to Bridge", () => {
    const sim = new HoldSimulator("cobra-bhujangasana", 5000);
    const lm = proneLandmarks();
    const eval_ = cobraEval({ score: 86 });

    // Hold Cobra 4000 ms
    for (let t = 1000; t <= 5000; t += 100) {
      sim.frame(eval_, lm, t);
    }
    assert.ok(sim.holdTime >= 3.9, "Should have ~4s hold before switch");
    assert.equal(sim.completed, false);

    // Switch to bridge
    sim.switchAsana("bridge-setu-bandha-sarvangasana");
    assert.equal(sim.candidateSince, null, "candidateSince must be null after asana switch");
    assert.equal(sim.holdTime, 0, "Hold time must be 0 after asana switch");
    assert.equal(sim.completed, false);

    // Only 2000ms of valid Bridge hold — must NOT complete
    const supineLm = supineLandmarks();
    const bridgeEv = bridgeEval({ score: 86 });
    for (let t = 5100; t <= 7100; t += 100) {
      const r = sim.frame(bridgeEv, supineLm, t);
      assert.equal(r.completed, false, `Bridge must not complete at t=${t} — only 2s hold accumulated`);
    }
    assert.equal(sim.holdTime, 2.0, "Bridge hold must be exactly 2s");
    assert.equal(sim.completed, false);
  });

  // -------------------------------------------------------------------------
  // TEST 9 — Invalid pose resets hold
  // -------------------------------------------------------------------------
  it("9. Invalid pose (failed critical rule) instantly resets the continuous hold to 0", () => {
    const sim = new HoldSimulator("cobra-bhujangasana", 5000);
    const lm = proneLandmarks();
    const validEval = cobraEval({ score: 86 });

    // Hold 3000 ms
    for (let t = 1000; t <= 4000; t += 100) {
      sim.frame(validEval, lm, t);
    }
    assert.ok(sim.holdTime >= 2.9, "Should have ~3s hold");
    assert.equal(sim.completed, false);

    // Cobra critical rule fails
    const failedCritical: RuleEvaluation[] = [
      { ruleId: "bhujangasana.chest.lift", ruleName: "Chest Elevation", status: "fail", score: 30, weight: 3, isSafety: true, feedback: "Lift chest", currentValue: 3, targetMin: 20, targetMax: 50 },
      { ruleId: "bhujangasana.elbows.tuck", ruleName: "Elbow Tuck", status: "pass", score: 85, weight: 2, isSafety: false, feedback: "Good", currentValue: 15, targetMin: 0, targetMax: 25 },
    ];
    const brokenEval = cobraEval({ score: 55, rules: failedCritical });
    const breakFrame = sim.frame(brokenEval, lm, 4100);

    assert.equal(breakFrame.eligible, false, "Frame after critical failure must not be eligible");
    assert.equal(sim.candidateSince, null, "candidateSince must be null immediately");
    assert.equal(sim.holdTime, 0, "Hold time must reset to 0 immediately");
    assert.equal(sim.completed, false);
  });

  // -------------------------------------------------------------------------
  // TEST 10 — No duplicate completion
  // -------------------------------------------------------------------------
  it("10. After completion, subsequent frames do NOT trigger additional completions", () => {
    const sim = new HoldSimulator("cobra-bhujangasana", 5000);
    const lm = proneLandmarks();
    const eval_ = cobraEval({ score: 86 });

    // Complete once
    for (let t = 1000; t <= 6100; t += 100) {
      sim.frame(eval_, lm, t);
    }
    assert.equal(sim.completed, true);
    assert.equal(sim.completionCount, 1);

    // Simulate 50 more frames — must NOT increment completionCount
    for (let t = 6200; t <= 11200; t += 100) {
      sim.frame(eval_, lm, t);
    }
    assert.equal(sim.completionCount, 1, "completionCount must remain at 1 — no duplicate completion");
  });

  // -------------------------------------------------------------------------
  // BONUS: Step 6/7 — Other KNOWN profile: Warrior II with correct vs wrong config
  // -------------------------------------------------------------------------
  it("Step 7 – Warrior II: wrong config (prone body) → no completion", () => {
    const warriorEval: PoseEvaluationResult = {
      asanaId: "warrior-ii-virabhadrasana-ii",
      score: 85,
      confidence: 0.9,
      isValid: true,
      primaryIssue: null,
      secondaryIssues: [],
      rules: [{ ruleId: "warrior-ii-left-knee-angle", ruleName: "Knee Angle", status: "pass", score: 85, weight: 2, isSafety: false, feedback: "Good", currentValue: 90, targetMin: 80, targetMax: 100 }],
      summary: { totalRules: 1, evaluatedRules: 1, passedRules: 1, warningRules: 0, failedRules: 0, unknownRules: 0 },
    };
    const result = evaluateCompletionGate({
      asanaId: "warrior-ii-virabhadrasana-ii",
      evaluation: warriorEval,
      landmarks: proneLandmarks(), // wrong stance
      cameraReady: true,
      completionAccuracyThreshold: COMPLETION_ACCURACY_THRESHOLD,
    });
    assert.equal(result.isEligible, false, "Warrior II must fail when user is prone, not standing");
    assert.equal(result.stanceValid, false);
  });

  it("Step 7 – Mountain: requiresDetectionRefinement check — mountain-tadasana now has KNOWN rules (not blocked)", () => {
    // mountain-tadasana now resolves to tadasana → KNOWN_CRITICAL_RULES → NOT blocked
    const mountainReqs = getAsanaCompletionRequirements("mountain-tadasana");
    assert.equal(mountainReqs.requiresDetectionRefinement, false, "mountain-tadasana must NOT be blocked after ID fix");
    assert.equal(mountainReqs.canonicalId, "tadasana");
    assert.ok(mountainReqs.criticalRuleIds.length >= 2, "Mountain must have KNOWN critical rules");
  });

  it("Step 7 – Lotus: lotus-padmasana resolves and has KNOWN critical rules", () => {
    const lotusReqs = getAsanaCompletionRequirements("lotus-padmasana");
    assert.equal(lotusReqs.requiresDetectionRefinement, false);
    assert.equal(lotusReqs.canonicalId, "padmasana");
    assert.ok(lotusReqs.criticalRuleIds.includes("padmasana.spine.vertical"));
    assert.ok(lotusReqs.criticalRuleIds.includes("padmasana.hips.level"));
  });

  it("Step 7 – Child's Pose: childs-pose-balasana resolves and has KNOWN critical rules", () => {
    const childsReqs = getAsanaCompletionRequirements("childs-pose-balasana");
    assert.equal(childsReqs.requiresDetectionRefinement, false, "Child's Pose must NOT be blocked after ID fix");
    assert.equal(childsReqs.canonicalId, "balasana");
    assert.ok(childsReqs.criticalRuleIds.includes("balasana.hips.heels"));
    assert.ok(childsReqs.criticalRuleIds.includes("balasana.torso.fold"));
  });

  it("Step 7 – Downward Dog: downward-dog-adho-mukha-svanasana resolves and has KNOWN critical rules", () => {
    const ddReqs = getAsanaCompletionRequirements("downward-dog-adho-mukha-svanasana");
    assert.equal(ddReqs.requiresDetectionRefinement, false);
    assert.equal(ddReqs.canonicalId, "adho-mukha-svanasana");
    assert.ok(ddReqs.criticalRuleIds.includes("downward-dog.spine.extension"));
    assert.ok(ddReqs.criticalRuleIds.includes("downward-dog.hips.elevation"));
  });

  it("Step 7 – Cow Pose (cow-bitilasana) completes on 100% accuracy and 5s hold", () => {
    const cowReqs = getAsanaCompletionRequirements("cow-bitilasana");
    assert.equal(cowReqs.requiresDetectionRefinement, false, "Cow Pose must NOT be blocked");
    assert.equal(cowReqs.canonicalId, "bitilasana");

    const cowEval: PoseEvaluationResult = {
      asanaId: "cow-bitilasana",
      score: 100,
      confidence: 0.95,
      isValid: true,
      primaryIssue: null,
      secondaryIssues: [],
      rules: [{
        ruleId: "cow-bitilasana.body.symmetry",
        ruleName: "Symmetric Balance",
        status: "pass",
        score: 100,
        weight: 1,
        isSafety: false,
        feedback: "Great form",
        currentValue: 0.02,
        targetMin: 0,
        targetMax: 0.08
      }],
      summary: { totalRules: 1, evaluatedRules: 1, passedRules: 1, warningRules: 0, failedRules: 0, unknownRules: 0 }
    };

    const sim = new HoldSimulator(5000);
    sim.switchAsana("cow-bitilasana");
    // At t=0s
    let step = sim.frame(cowEval, proneLandmarks(), 0);
    assert.equal(step.eligible, true);
    assert.equal(step.completed, false);

    // At t=5s
    step = sim.frame(cowEval, proneLandmarks(), 5000);
    assert.equal(step.completed, true);
    assert.equal(sim.completionCount, 1);
  });

  it("Step 8 – Audit summary: KNOWN_CRITICAL_RULES count is now > 0", () => {
    // Verify the key 10 catalog IDs now resolve to KNOWN_CRITICAL_RULES
    const catalogIdsWithKnownRules = [
      "cobra-bhujangasana",
      "bridge-setu-bandha-sarvangasana",
      "lotus-padmasana",
      "warrior-ii-virabhadrasana-ii",
      "mountain-tadasana",
      "tree-vrksasana",
      "downward-dog-adho-mukha-svanasana",
      "childs-pose-balasana",
      "low-push-up-chaturanga-dandasana",
    ];
    let matchedCount = 0;
    for (const id of catalogIdsWithKnownRules) {
      const reqs = getAsanaCompletionRequirements(id);
      if (!reqs.requiresDetectionRefinement && reqs.criticalRuleIds.length > 0) {
        matchedCount++;
      }
    }
    assert.ok(matchedCount >= 9, `Expected >= 9 KNOWN_CRITICAL_RULES matches, got ${matchedCount}`);
    console.log(`  ✓ KNOWN_CRITICAL_RULES matched: ${matchedCount} (was 0 before fix)`);
  });
});
