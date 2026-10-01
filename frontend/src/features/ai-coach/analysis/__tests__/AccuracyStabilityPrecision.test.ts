import { describe, it } from "node:test";
import assert from "node:assert/strict";

import type { Landmark, PoseLandmarks } from "../../types/landmarks";
import { PoseLandmarkIndex as P } from "../../types/pose-landmarks";
import type { PoseRule, PoseEvaluatorContext, RuleEvaluation } from "../../types/pose-rules";
import {
  calculatePoseAccuracy,
  calculateAccuracyFromRuleResults,
  formatAccuracyDiagnostics,
} from "../AccuracyCalculator";
import { AccuracyStabilizer } from "../AccuracyStabilizer";
import { evaluatePose } from "../PoseEvaluator";
import { TemporalPoseEvaluator } from "../TemporalPoseEvaluator";
import { calculateAngle, calculateLandmarkAngle } from "../AngleCalculator";
import { evaluateCompletionGate } from "../AsanaCompletionGate";

function createMockLandmarks(overrides: Partial<Record<number, Partial<Landmark>>> = {}): PoseLandmarks {
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

function createStandingContext(overrides: Partial<Record<number, Partial<Landmark>>> = {}): PoseEvaluatorContext {
  const landmarks = createMockLandmarks({
    [P.LEFT_SHOULDER]: { x: 0.45, y: 0.25, z: 0.0, visibility: 0.95 },
    [P.RIGHT_SHOULDER]: { x: 0.55, y: 0.25, z: 0.0, visibility: 0.95 },
    [P.LEFT_ELBOW]: { x: 0.40, y: 0.40, z: 0.0, visibility: 0.95 },
    [P.RIGHT_ELBOW]: { x: 0.60, y: 0.40, z: 0.0, visibility: 0.95 },
    [P.LEFT_WRIST]: { x: 0.38, y: 0.55, z: 0.0, visibility: 0.95 },
    [P.RIGHT_WRIST]: { x: 0.62, y: 0.55, z: 0.0, visibility: 0.95 },
    [P.LEFT_HIP]: { x: 0.46, y: 0.55, z: 0.0, visibility: 0.95 },
    [P.RIGHT_HIP]: { x: 0.54, y: 0.55, z: 0.0, visibility: 0.95 },
    [P.LEFT_KNEE]: { x: 0.46, y: 0.75, z: 0.0, visibility: 0.95 },
    [P.RIGHT_KNEE]: { x: 0.54, y: 0.75, z: 0.0, visibility: 0.95 },
    [P.LEFT_ANKLE]: { x: 0.46, y: 0.95, z: 0.0, visibility: 0.95 },
    [P.RIGHT_ANKLE]: { x: 0.54, y: 0.95, z: 0.0, visibility: 0.95 },
    ...overrides,
  });

  return {
    landmarks,
    worldLandmarks: landmarks,
    timestamp: Date.now(),
    features: {
      jointAngles: {
        left_knee: 180,
        right_knee: 180,
        left_elbow: 180,
        right_elbow: 180,
        left_hip: 180,
        right_hip: 180,
        left_shoulder: 90,
        right_shoulder: 90,
      },
      trunkAngle: 90,
      spineAlignment: 0.02,
      bodyLean: 0.01,
      symmetryScore: 0.98,
      visibilityScores: {
        upperBody: 0.95,
        lowerBody: 0.95,
        fullBody: 0.95,
      },
    },
  };
}

const SAMPLE_RULES: PoseRule[] = [
  {
    id: "rule_left_knee",
    name: "Left Knee Straight",
    metric: "angle",
    points: [P.LEFT_HIP, P.LEFT_KNEE, P.LEFT_ANKLE],
    comparison: "between",
    min: 165,
    max: 180,
    target: 180,
    tolerance: 15,
    severity: "high",
    weight: 3,
    feedback: "Straighten your left knee",
  },
  {
    id: "rule_right_knee",
    name: "Right Knee Straight",
    metric: "angle",
    points: [P.RIGHT_HIP, P.RIGHT_KNEE, P.RIGHT_ANKLE],
    comparison: "between",
    min: 165,
    max: 180,
    target: 180,
    tolerance: 15,
    severity: "high",
    weight: 3,
    feedback: "Straighten your right knee",
  },
  {
    id: "rule_trunk",
    name: "Upright Trunk",
    metric: "angle",
    points: [P.LEFT_SHOULDER, P.LEFT_HIP, P.LEFT_KNEE],
    comparison: "between",
    min: 165,
    max: 180,
    target: 180,
    tolerance: 15,
    severity: "medium",
    weight: 2,
    feedback: "Keep your spine vertical",
  },
];

describe("Phase 2: Form Accuracy, Score Stability & Precision Specification Tests", () => {
  // Test 1: Stable correct pose produces stable high score
  it("Requirement 1: Stable correct pose produces a stable high score", () => {
    const stabilizer = new AccuracyStabilizer();
    const context = createStandingContext();
    
    // Simulate 10 frames of perfect form
    let lastState = null;
    for (let f = 0; f < 10; f++) {
      const evalResult = calculatePoseAccuracy("tadasana", SAMPLE_RULES, context);
      assert.ok(evalResult.accuracy >= 95, `Raw accuracy should be >= 95%, got ${evalResult.accuracy}%`);
      lastState = stabilizer.update(evalResult.rawAccuracy, true, 1000 + f * 33);
    }

    assert.ok(lastState !== null);
    assert.ok(lastState.stableAccuracy !== null && lastState.stableAccuracy >= 95, `Stable accuracy should be >= 95%, got ${lastState.stableAccuracy}`);
    assert.ok(lastState.displayedAccuracy !== null && lastState.displayedAccuracy >= 95);
    assert.strictEqual(lastState.isStable, true);
  });

  // Test 2: Stable incorrect pose produces stable low score
  it("Requirement 2: Stable incorrect pose produces a stable low score", () => {
    const stabilizer = new AccuracyStabilizer();
    // Incur large angle bends (e.g. 90 degree bent knees)
    const badLandmarks = createMockLandmarks({
      [P.LEFT_HIP]: { x: 0.46, y: 0.55, z: 0.0, visibility: 0.95 },
      [P.LEFT_KNEE]: { x: 0.46, y: 0.75, z: 0.0, visibility: 0.95 },
      [P.LEFT_ANKLE]: { x: 0.65, y: 0.75, z: 0.0, visibility: 0.95 }, // 90 degree knee
      [P.RIGHT_HIP]: { x: 0.54, y: 0.55, z: 0.0, visibility: 0.95 },
      [P.RIGHT_KNEE]: { x: 0.54, y: 0.75, z: 0.0, visibility: 0.95 },
      [P.RIGHT_ANKLE]: { x: 0.75, y: 0.75, z: 0.0, visibility: 0.95 }, // 90 degree knee
      [P.LEFT_SHOULDER]: { x: 0.45, y: 0.55, z: 0.0, visibility: 0.95 },
    });

    const badContext: PoseEvaluatorContext = {
      landmarks: badLandmarks,
      worldLandmarks: badLandmarks,
      timestamp: Date.now(),
    };

    let lastState = null;
    for (let f = 0; f < 10; f++) {
      const evalResult = calculatePoseAccuracy("tadasana", SAMPLE_RULES, badContext);
      assert.ok(evalResult.accuracy <= 40, `Incorrect pose raw accuracy should be low, got ${evalResult.accuracy}%`);
      lastState = stabilizer.update(evalResult.rawAccuracy, true, 1000 + f * 33);
    }

    assert.ok(lastState !== null);
    assert.ok(lastState.stableAccuracy !== null && lastState.stableAccuracy <= 40, `Stable score should remain low, got ${lastState.stableAccuracy}`);
    assert.ok(lastState.displayedAccuracy !== null && lastState.displayedAccuracy <= 40);
  });

  // Test 3: Single bad frame does not cause catastrophic 100 -> 0 score drop
  it("Requirement 3: Single bad frame does not cause a catastrophic 100 -> 0 jump", () => {
    const stabilizer = new AccuracyStabilizer();
    
    // Seed 10 good frames (100%)
    for (let f = 0; f < 10; f++) {
      stabilizer.update(100, true, 1000 + f * 33);
    }

    // 1 transient corrupted frame (0%)
    const outlierState = stabilizer.update(0, true, 1330);
    assert.ok(outlierState.stableAccuracy !== null);
    // Because of EMA smoothing and outlier damping, a single frame should NOT drop to 0
    assert.ok(outlierState.stableAccuracy >= 65, `Single bad frame should be dampened, got stableAccuracy: ${outlierState.stableAccuracy}`);
    assert.ok(outlierState.displayedAccuracy !== null && outlierState.displayedAccuracy >= 65);

    // Following frames return to 100%
    stabilizer.update(100, true, 1363);
    stabilizer.update(100, true, 1396);
    const recoveredState = stabilizer.update(100, true, 1429);
    assert.ok(recoveredState.stableAccuracy !== null && recoveredState.stableAccuracy >= 80);
  });

  // Test 4: Temporary landmark loss preserves score within grace period (does not drop to 0)
  it("Requirement 4: Temporary landmark loss holds score within grace window without dropping to 0", () => {
    const stabilizer = new AccuracyStabilizer();
    
    // Establish stable 90% score
    stabilizer.update(90, true, 1000);
    stabilizer.update(90, true, 1033);

    // Temporary landmark loss for 200ms (< 600ms grace window)
    const graceState = stabilizer.update(null, false, 1200);
    assert.strictEqual(graceState.stableAccuracy, 90, "Score should be preserved during grace period");
    assert.strictEqual(graceState.displayedAccuracy, 90, "Displayed score should hold during grace period");
    assert.ok(graceState.confidence > 0, "Confidence should degrade smoothly during grace period");
  });

  // Test 5: Persistent landmark loss marks score as unavailable after grace period
  it("Requirement 5: Persistent landmark loss causes score to become unavailable after grace period", () => {
    const stabilizer = new AccuracyStabilizer();
    
    // Establish stable 90% score
    stabilizer.update(90, true, 1000);

    // Loss beyond 600ms grace period (800ms later)
    const expiredState = stabilizer.update(null, false, 1800);
    assert.strictEqual(expiredState.stableAccuracy, null, "Score should become null after grace period expires");
    assert.strictEqual(expiredState.displayedAccuracy, null, "Displayed score should become null");
    assert.strictEqual(expiredState.confidence, 0);
  });

  // Test 6: NaN angles or coordinates do not produce NaN accuracy
  it("Requirement 6: NaN angles and coordinates do not corrupt score into NaN", () => {
    const nanLandmarks = createMockLandmarks({
      [P.LEFT_KNEE]: { x: NaN, y: NaN, z: NaN, visibility: 0.95 },
    });
    const nanContext: PoseEvaluatorContext = {
      landmarks: nanLandmarks,
      worldLandmarks: nanLandmarks,
      timestamp: Date.now(),
    };

    const evalResult = calculatePoseAccuracy("tadasana", SAMPLE_RULES, nanContext);
    assert.ok(!isNaN(evalResult.accuracy), `Accuracy must not be NaN, got ${evalResult.accuracy}`);
    assert.ok(!isNaN(evalResult.rawAccuracy), `rawAccuracy must not be NaN, got ${evalResult.rawAccuracy}`);
    assert.ok(Number.isFinite(evalResult.accuracy));

    const poseEval = evaluatePose("tadasana", SAMPLE_RULES, nanContext);
    assert.ok(!isNaN(poseEval.score), `PoseEvaluator score must not be NaN, got ${poseEval.score}`);
    assert.ok(Number.isFinite(poseEval.score));
  });

  // Test 7: Infinity angles or coordinates do not produce Infinity accuracy
  it("Requirement 7: Infinity angles and coordinates do not produce Infinity score", () => {
    const infLandmarks = createMockLandmarks({
      [P.LEFT_KNEE]: { x: Infinity, y: -Infinity, z: Infinity, visibility: 0.95 },
    });
    const infContext: PoseEvaluatorContext = {
      landmarks: infLandmarks,
      worldLandmarks: infLandmarks,
      timestamp: Date.now(),
    };

    const evalResult = calculatePoseAccuracy("tadasana", SAMPLE_RULES, infContext);
    assert.ok(Number.isFinite(evalResult.accuracy), `Accuracy must be finite, got ${evalResult.accuracy}`);
    assert.ok(Number.isFinite(evalResult.rawAccuracy));
    assert.ok(evalResult.accuracy >= 0 && evalResult.accuracy <= 100);

    const angle = calculateAngle(
      { x: 0, y: 0, z: 0 },
      { x: Infinity, y: 0, z: 0 },
      { x: 0, y: 1, z: 0 }
    );
    assert.strictEqual(angle, null);
  });

  // Test 8: Missing rule metric does not produce false 100%
  it("Requirement 8: Missing / unavailable rule does not produce false 100%", () => {
    // Missing required landmarks (all visibility 0)
    const invisibleLandmarks = createMockLandmarks();
    for (const lm of invisibleLandmarks) {
      lm.visibility = 0.1;
      lm.presence = 0.1;
    }

    const missingContext: PoseEvaluatorContext = {
      landmarks: invisibleLandmarks,
      worldLandmarks: invisibleLandmarks,
      timestamp: Date.now(),
    };

    const evalResult = calculatePoseAccuracy("tadasana", SAMPLE_RULES, missingContext);
    assert.strictEqual(evalResult.isEvaluable, false);
    assert.strictEqual(evalResult.accuracy, 0);
    assert.strictEqual(evalResult.validRuleCount, 0);
    assert.strictEqual(evalResult.unavailableRuleCount, 3);
  });

  // Test 9: One passing rule out of many cannot produce 100% (coverage scaling)
  it("Requirement 9: One passing rule out of many cannot produce 100% due to coverage scaling", () => {
    // Make only left knee landmarks visible (right knee and spine invisible)
    const partialLandmarks = createMockLandmarks();
    for (let i = 0; i < 33; i++) {
      partialLandmarks[i].visibility = 0.1;
    }
    partialLandmarks[P.LEFT_HIP] = { x: 0.46, y: 0.55, z: 0, visibility: 0.95 };
    partialLandmarks[P.LEFT_KNEE] = { x: 0.46, y: 0.75, z: 0, visibility: 0.95 };
    partialLandmarks[P.LEFT_ANKLE] = { x: 0.46, y: 0.95, z: 0, visibility: 0.95 };

    const singleRuleContext: PoseEvaluatorContext = {
      landmarks: partialLandmarks,
      worldLandmarks: partialLandmarks,
      timestamp: Date.now(),
    };

    const evalResult = calculatePoseAccuracy("tadasana", SAMPLE_RULES, singleRuleContext);
    assert.ok(evalResult.coverage < 0.40, `Coverage should be < 40%, got ${evalResult.coverage}`);
    assert.ok(evalResult.accuracy < 100, `Single passing rule should not produce 100%, got ${evalResult.accuracy}%`);
    assert.ok(evalResult.accuracy <= 95);
  });

  // Test 10: Multiple high-quality rules produce high score
  it("Requirement 10: Multiple high-quality passing rules produce a high score", () => {
    const fullContext = createStandingContext();
    const evalResult = calculatePoseAccuracy("tadasana", SAMPLE_RULES, fullContext);
    
    assert.strictEqual(evalResult.validRuleCount, 3);
    assert.strictEqual(evalResult.failedRuleCount, 0);
    assert.strictEqual(evalResult.coverage, 1.0);
    assert.strictEqual(evalResult.accuracy, 100);
    assert.strictEqual(evalResult.isEvaluable, true);

    const diagnostics = formatAccuracyDiagnostics(evalResult);
    assert.ok(diagnostics.includes("Score: 100%"));
    assert.ok(diagnostics.includes("3 passed"));
  });

  // Test 11: Gradual posture improvement causes score to increase responsively
  it("Requirement 11: Gradual posture improvement increases score smoothly and responsively", () => {
    const stabilizer = new AccuracyStabilizer();
    
    // Start at poor form 40%
    let state = stabilizer.update(40, true, 1000);
    assert.strictEqual(state.displayedAccuracy, 40);

    // Improve gradually across repeated frames
    const scores = [50, 50, 60, 60, 70, 70, 80, 80, 90, 90, 100, 100];
    let prevStable = state.stableAccuracy!;
    
    for (let i = 0; i < scores.length; i++) {
      state = stabilizer.update(scores[i], true, 1033 + i * 33);
      assert.ok(state.stableAccuracy! >= prevStable, `Score should increase monotonically on improvement, prev: ${prevStable}, curr: ${state.stableAccuracy}`);
      prevStable = state.stableAccuracy!;
    }

    assert.ok(state.stableAccuracy! >= 80, `Score should have climbed to >= 80, got ${state.stableAccuracy}`);
  });

  // Test 12: Gradual posture degradation causes score to decrease responsively
  it("Requirement 12: Gradual posture degradation decreases score smoothly and responsively", () => {
    const stabilizer = new AccuracyStabilizer();
    
    // Start at perfect form 100%
    let state = stabilizer.update(100, true, 1000);
    assert.strictEqual(state.displayedAccuracy, 100);

    // Degrade gradually: 90 -> 80 -> 70 -> 60 -> 50 -> 40
    const scores = [90, 80, 70, 60, 50, 40];
    let prevStable = state.stableAccuracy!;
    
    for (let i = 0; i < scores.length; i++) {
      state = stabilizer.update(scores[i], true, 1033 + i * 33);
      assert.ok(state.stableAccuracy! < prevStable, `Score should decrease monotonically on degradation, prev: ${prevStable}, curr: ${state.stableAccuracy}`);
      prevStable = state.stableAccuracy!;
    }

    assert.ok(state.stableAccuracy! <= 65, `Score should have decreased quickly, got ${state.stableAccuracy}`);
  });

  // Test 13: Score near 75% has stable eligibility behavior (dead-band hysteresis prevents rapid toggling)
  it("Requirement 13: Score near 75% boundary is protected by dead-band hysteresis", () => {
    const stabilizer = new AccuracyStabilizer({ deadBand: 1.0 });
    
    // Stabilize right at 75%
    let state = stabilizer.update(75, true, 1000);
    assert.strictEqual(state.displayedAccuracy, 75);

    // Micro-jitter of 0.2 points (74.8 -> 75.2) should NOT toggle the integer display
    state = stabilizer.update(74.8, true, 1033);
    assert.strictEqual(state.displayedAccuracy, 75, "Micro-jitter below threshold should not change displayed value");

    state = stabilizer.update(75.2, true, 1066);
    assert.strictEqual(state.displayedAccuracy, 75, "Micro-jitter above threshold should not change displayed value");
  });

  // Test 14: Identity false -> accuracy cannot trigger completion
  it("Requirement 14: When pose identity is invalid/mismatched, high accuracy cannot trigger completion", () => {
    const standingLandmarks = createMockLandmarks({
      [P.LEFT_SHOULDER]: { x: 0.45, y: 0.25, visibility: 0.95 },
      [P.RIGHT_SHOULDER]: { x: 0.55, y: 0.25, visibility: 0.95 },
      [P.LEFT_HIP]: { x: 0.46, y: 0.55, visibility: 0.95 },
      [P.RIGHT_HIP]: { x: 0.54, y: 0.55, visibility: 0.95 },
      [P.LEFT_KNEE]: { x: 0.46, y: 0.75, visibility: 0.95 },
      [P.RIGHT_KNEE]: { x: 0.54, y: 0.75, visibility: 0.95 },
      [P.LEFT_ANKLE]: { x: 0.46, y: 0.95, visibility: 0.95 },
      [P.RIGHT_ANKLE]: { x: 0.54, y: 0.95, visibility: 0.95 },
    });

    const mockEvaluation: any = {
      asanaId: "cobra-bhujangasana",
      score: 95,
      displayedScore: 95,
      isValid: true,
      identity: {
        isMatch: false, // Standing when Cobra (prone) is requested
        confidence: 0.1,
        canonicalId: "bhujangasana",
        detectedFamily: "standing",
        expectedFamily: "prone",
        reasons: ["Detected standing pose when prone expected"],
      },
      summary: { evaluatedRules: 5, passedRules: 5, failedRules: 0, warningRules: 0, unknownRules: 0 },
      rules: [],
      issues: [],
      primaryIssue: null,
      confidence: 0.95,
    };

    const gateResult = evaluateCompletionGate({
      asanaId: "cobra-bhujangasana",
      evaluation: mockEvaluation,
      landmarks: standingLandmarks,
      cameraReady: true,
      completionAccuracyThreshold: 75,
    });

    assert.strictEqual(gateResult.identityValid, false);
    assert.strictEqual(gateResult.isEligible, false, "Gate MUST NOT be eligible when identity is false");
  });

  // Test 15: Identity true + accuracy >= 75% -> hold pipeline works as expected
  it("Requirement 15: When identity is valid and accuracy >= 75%, gate is eligible for hold progression", () => {
    const cobraLandmarks = createMockLandmarks({
      [P.NOSE]: { x: 0.20, y: 0.45, visibility: 0.95 },
      [P.LEFT_SHOULDER]: { x: 0.28, y: 0.52, visibility: 0.95 },
      [P.RIGHT_SHOULDER]: { x: 0.28, y: 0.54, visibility: 0.95 },
      [P.LEFT_HIP]: { x: 0.55, y: 0.75, visibility: 0.95 },
      [P.RIGHT_HIP]: { x: 0.55, y: 0.77, visibility: 0.95 },
      [P.LEFT_KNEE]: { x: 0.70, y: 0.78, visibility: 0.95 },
      [P.RIGHT_KNEE]: { x: 0.70, y: 0.80, visibility: 0.95 },
      [P.LEFT_ANKLE]: { x: 0.85, y: 0.80, visibility: 0.95 },
      [P.RIGHT_ANKLE]: { x: 0.85, y: 0.82, visibility: 0.95 },
    });

    const mockEvaluation: any = {
      asanaId: "cobra-bhujangasana",
      score: 85,
      displayedScore: 85,
      isValid: true,
      identity: {
        isMatch: true,
        confidence: 0.95,
        canonicalId: "bhujangasana",
        detectedFamily: "prone",
        expectedFamily: "prone",
        reasons: [],
      },
      summary: { evaluatedRules: 2, passedRules: 2, failedRules: 0, warningRules: 0, unknownRules: 0 },
      rules: [
        {
          ruleId: "bhujangasana.chest.lift",
          ruleName: "Chest Elevation",
          status: "pass",
          score: 85,
          weight: 3,
        },
        {
          ruleId: "bhujangasana.elbows.tuck",
          ruleName: "Elbow Tuck",
          status: "pass",
          score: 85,
          weight: 2,
        },
      ],
      issues: [],
      primaryIssue: null,
      confidence: 0.95,
    };

    const gateResult = evaluateCompletionGate({
      asanaId: "cobra-bhujangasana",
      evaluation: mockEvaluation,
      landmarks: cobraLandmarks,
      cameraReady: true,
      completionAccuracyThreshold: 75,
    });

    assert.strictEqual(gateResult.identityValid, true);
    assert.strictEqual(gateResult.accuracyValid, true);
    assert.strictEqual(gateResult.isEligible, true, "Gate MUST be eligible when identity is valid and accuracy >= 75%");
  });

  // Test 16: Accuracy from pre-evaluated rule results works identically
  it("Requirement 16: calculateAccuracyFromRuleResults computes consistent weighted score and coverage", () => {
    const ruleResults: RuleEvaluation[] = [
      {
        ruleId: "r1",
        ruleName: "Rule 1",
        metric: "angle",
        status: "pass",
        severity: "high",
        weight: 3,
        score: 100,
        measuredValue: 180,
      },
      {
        ruleId: "r2",
        ruleName: "Rule 2",
        metric: "angle",
        status: "pass",
        severity: "high",
        weight: 3,
        score: 80,
        measuredValue: 170,
      },
      {
        ruleId: "r3",
        ruleName: "Rule 3",
        metric: "angle",
        status: "warning",
        severity: "medium",
        weight: 2,
        score: 60,
        measuredValue: 150,
      },
    ];

    const result = calculateAccuracyFromRuleResults("virabhadrasana_ii", ruleResults);
    // Expected: (100*3 + 80*3 + 60*2) / (3 + 3 + 2) = (300 + 240 + 120) / 8 = 660 / 8 = 82.5 -> 83%
    assert.strictEqual(result.accuracy, 83);
    assert.strictEqual(result.coverage, 1.0);
    assert.strictEqual(result.validRuleCount, 2);
    assert.strictEqual(result.warningRuleCount, 1);
    assert.strictEqual(result.failedRuleCount, 0);
  });

  // Test 17: AngleCalculator protects against degenerate and non-finite values
  it("Requirement 17: AngleCalculator protects against zero vectors and collinear edge cases", () => {
    // Zero length vector returns null safely
    const zeroAngle = calculateAngle({ x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }, { x: 1, y: 0, z: 0 });
    assert.strictEqual(zeroAngle, null);

    // 3D zero vector returns null safely
    const zero3DAngle = calculateAngle({ x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }, { x: 1, y: 0, z: 0 });
    assert.strictEqual(zero3DAngle, null);

    // Normal 90-degree 2D/3D angle
    const angle90 = calculateAngle({ x: 0, y: 1, z: 0 }, { x: 0, y: 0, z: 0 }, { x: 1, y: 0, z: 0 });
    assert.ok(angle90 !== null);
    assert.strictEqual(Math.round(angle90), 90);

    // Normal 180-degree 2D/3D angle
    const angle180 = calculateAngle({ x: -1, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }, { x: 1, y: 0, z: 0 });
    assert.ok(angle180 !== null);
    assert.strictEqual(Math.round(angle180), 180);

    // calculateLandmarkAngle with valid landmarks
    const lmA: Landmark = { x: 0, y: 1, z: 0, visibility: 0.9, presence: 0.9 };
    const lmB: Landmark = { x: 0, y: 0, z: 0, visibility: 0.9, presence: 0.9 };
    const lmC: Landmark = { x: 1, y: 0, z: 0, visibility: 0.9, presence: 0.9 };
    const landmarkAngle = calculateLandmarkAngle(lmA, lmB, lmC);
    assert.ok(landmarkAngle !== null);
    assert.strictEqual(Math.round(landmarkAngle), 90);
  });
});
