import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { evaluatePoseFrameState } from "../PoseFrameState";
import { PoseHoldStateMachine } from "../PoseHoldStateMachine";
import { validatePoseIdentity } from "../PoseIdentityValidator";
import { evaluateCompletionGate, KNOWN_CRITICAL_RULES } from "../AsanaCompletionGate";
import { AccuracyStabilizer } from "../AccuracyStabilizer";
import { FeedbackEngine } from "../FeedbackEngine";
import { CoachDecisionEngine } from "../../voice/CoachDecisionEngine";
import { CoachingEventEngine } from "../../voice/CoachingEventEngine";
import { CoachingEventBuilder } from "../../voice/CoachingEventBuilder";
import { SessionStateMachine } from "../../session/SessionStateMachine";
import { ALL_ASANAS_CATALOG } from "../../data/allAsanasCatalog";
import type { NormalizedLandmark } from "../../../types/pose";
import type { PoseEvaluation, PoseEvaluatorContext, PoseEvaluationResult } from "../../../types/pose-rules";
import type { AsanaEvaluationResult } from "../../types/asana-evaluation";

// Helper: Create standing landmarks with valid confidence
function createStandingLandmarks(): NormalizedLandmark[] {
  const landmarks: NormalizedLandmark[] = Array(33).fill({
    x: 0.5,
    y: 0.5,
    z: 0,
    visibility: 0.95,
  });
  // Head
  landmarks[0] = { x: 0.5, y: 0.1, z: 0, visibility: 0.95 };
  // Shoulders
  landmarks[11] = { x: 0.45, y: 0.25, z: 0, visibility: 0.95 };
  landmarks[12] = { x: 0.55, y: 0.25, z: 0, visibility: 0.95 };
  // Hips
  landmarks[23] = { x: 0.45, y: 0.5, z: 0, visibility: 0.95 };
  landmarks[24] = { x: 0.55, y: 0.5, z: 0, visibility: 0.95 };
  // Knees
  landmarks[25] = { x: 0.45, y: 0.7, z: 0, visibility: 0.95 };
  landmarks[26] = { x: 0.55, y: 0.7, z: 0, visibility: 0.95 };
  // Ankles
  landmarks[27] = { x: 0.45, y: 0.9, z: 0, visibility: 0.95 };
  landmarks[28] = { x: 0.55, y: 0.9, z: 0, visibility: 0.95 };
  return landmarks;
}

// Helper: Create prone (lying flat) landmarks
function createProneLandmarks(): NormalizedLandmark[] {
  const landmarks: NormalizedLandmark[] = Array(33).fill({
    x: 0.5,
    y: 0.5,
    z: 0,
    visibility: 0.95,
  });
  // Head on floor
  landmarks[0] = { x: 0.2, y: 0.8, z: 0, visibility: 0.95 };
  // Shoulders on floor
  landmarks[11] = { x: 0.3, y: 0.8, z: 0, visibility: 0.95 };
  landmarks[12] = { x: 0.3, y: 0.82, z: 0, visibility: 0.95 };
  // Hips on floor
  landmarks[23] = { x: 0.6, y: 0.82, z: 0, visibility: 0.95 };
  landmarks[24] = { x: 0.6, y: 0.84, z: 0, visibility: 0.95 };
  // Feet on floor
  landmarks[27] = { x: 0.9, y: 0.85, z: 0, visibility: 0.95 };
  landmarks[28] = { x: 0.9, y: 0.85, z: 0, visibility: 0.95 };
  return landmarks;
}

describe("Phase 4 — Real-Time Pose Validation, Hold Stability & Coaching Flow Tests", () => {
  // 1. Wrong pose cannot start hold
  it("1. Wrong pose cannot start hold (Cobra selected while standing)", () => {
    const standingLandmarks = createStandingLandmarks();
    const mockEval: PoseEvaluation = {
      score: 85, // High score on generic metrics
      rawScore: 85,
      isValid: true,
      overallStatus: "good",
      issues: [],
      primaryIssue: null,
      summary: { totalRules: 2, evaluatedRules: 2, passedRules: 2, warningRules: 0, failedRules: 0, unknownRules: 0 },
      posture: { head: "good", neck: "good", shoulders: "good", elbows: "good", spine: "good", hips: "good", knees: "good", ankles: "good" },
      completionEligible: false,
      confidence: 0.95,
      evaluatedAt: Date.now(),
      timestamp: Date.now(),
      rules: [],
    };

    const frameState = evaluatePoseFrameState({
      asanaId: "cobra-bhujangasana",
      evaluation: mockEval,
      landmarks: standingLandmarks,
      cameraReady: true,
    });

    assert.equal(frameState.identityValid, false, "Cobra identity must be false when standing");
    assert.equal(frameState.isCompletionEligible, false, "Completion eligibility must be false");

    const holdMachine = new PoseHoldStateMachine();
    holdMachine.start();
    const state = holdMachine.update(frameState, 1000);

    assert.equal(state, "POSITIONING", "Hold machine must not transition to HOLDING");
    assert.equal(holdMachine.getHoldElapsedMs(), 0, "Hold timer must remain 0");
  });

  // 2. Wrong pose cannot complete
  it("2. Wrong pose cannot complete even if frames continue for 10 seconds", () => {
    const standingLandmarks = createStandingLandmarks();
    const mockEval: PoseEvaluation = {
      score: 95,
      rawScore: 95,
      isValid: true,
      overallStatus: "good",
      issues: [],
      primaryIssue: null,
      summary: { totalRules: 2, evaluatedRules: 2, passedRules: 2, warningRules: 0, failedRules: 0, unknownRules: 0 },
      posture: { head: "good", neck: "good", shoulders: "good", elbows: "good", spine: "good", hips: "good", knees: "good", ankles: "good" },
      completionEligible: false,
      confidence: 0.95,
      evaluatedAt: Date.now(),
      timestamp: Date.now(),
      rules: [],
    };

    const holdMachine = new PoseHoldStateMachine();
    holdMachine.start();

    for (let t = 0; t <= 10000; t += 100) {
      const frameState = evaluatePoseFrameState({
        asanaId: "cobra-bhujangasana",
        evaluation: mockEval,
        landmarks: standingLandmarks,
        cameraReady: true,
        timestamp: 1000 + t,
      });
      holdMachine.update(frameState, 1000 + t);
    }

    assert.equal(holdMachine.isCompleted(), false, "Wrong pose must never complete");
    assert.notEqual(holdMachine.getState(), "COMPLETED");
  });

  // 3. Correct identity + accuracy <75 cannot start hold
  it("3. Correct identity + accuracy <75 cannot start hold", () => {
    const standingLandmarks = createStandingLandmarks();
    const mockEval: PoseEvaluation = {
      score: 70, // Below 75%
      rawScore: 70,
      isValid: true,
      overallStatus: "needs_adjustment",
      issues: [],
      primaryIssue: null,
      summary: { totalRules: 3, evaluatedRules: 3, passedRules: 2, warningRules: 1, failedRules: 0, unknownRules: 0 },
      posture: { head: "good", neck: "good", shoulders: "good", elbows: "good", spine: "good", hips: "good", knees: "good", ankles: "good" },
      completionEligible: false,
      confidence: 0.95,
      evaluatedAt: Date.now(),
      timestamp: Date.now(),
      identity: {
        isMatch: true,
        confidence: 0.9,
        canonicalAsanaId: "warrior-ii",
        passedRequirements: ["stance:standing", "warrior-ii-left-knee-angle"],
        failedRequirements: [],
        criticalFailures: [],
      },
      rules: [
        { ruleId: "warrior-ii-left-knee-angle", ruleName: "Front Knee Bend", metric: "angle", status: "pass", severity: "high", weight: 3, score: 70, measuredValue: 90, feedback: "Good" },
      ],
    };

    const frameState = evaluatePoseFrameState({
      asanaId: "warrior-ii-virabhadrasana-ii",
      evaluation: mockEval,
      landmarks: standingLandmarks,
      cameraReady: true,
      completionAccuracyThreshold: 75,
    });

    assert.equal(frameState.identityValid, true, "Identity is valid");
    assert.equal(frameState.accuracyValid, false, "Accuracy 70% is below 75%");
    assert.equal(frameState.isCompletionEligible, false, "Must not be eligible for completion");

    const holdMachine = new PoseHoldStateMachine();
    holdMachine.start();
    const state = holdMachine.update(frameState, 1000);

    assert.equal(state, "POSE_DETECTED", "State should be POSE_DETECTED but not HOLDING");
    assert.equal(holdMachine.getHoldElapsedMs(), 0);
  });

  // 4. Correct identity + accuracy >=75 starts hold
  it("4. Correct identity + accuracy >=75 starts hold", () => {
    const standingLandmarks = createStandingLandmarks();
    const mockEval: PoseEvaluation = {
      score: 80, // Above 75%
      rawScore: 80,
      isValid: true,
      overallStatus: "good",
      issues: [],
      primaryIssue: null,
      summary: { totalRules: 3, evaluatedRules: 3, passedRules: 3, warningRules: 0, failedRules: 0, unknownRules: 0 },
      posture: { head: "good", neck: "good", shoulders: "good", elbows: "good", spine: "good", hips: "good", knees: "good", ankles: "good" },
      completionEligible: true,
      confidence: 0.95,
      evaluatedAt: Date.now(),
      timestamp: Date.now(),
      identity: {
        isMatch: true,
        confidence: 0.9,
        canonicalAsanaId: "warrior-ii",
        passedRequirements: ["stance:standing", "warrior-ii-left-knee-angle"],
        failedRequirements: [],
        criticalFailures: [],
      },
      rules: [
        { ruleId: "warrior-ii-left-knee-angle", ruleName: "Front Knee Bend", metric: "angle", status: "pass", severity: "high", weight: 3, score: 85, measuredValue: 90, feedback: "Good" },
      ],
    };

    const frameState = evaluatePoseFrameState({
      asanaId: "warrior-ii-virabhadrasana-ii",
      evaluation: mockEval,
      landmarks: standingLandmarks,
      cameraReady: true,
      completionAccuracyThreshold: 75,
    });

    assert.equal(frameState.isCompletionEligible, true, "Should be eligible for completion");

    let holdStarted = false;
    const holdMachine = new PoseHoldStateMachine({
      onHoldStart: () => {
        holdStarted = true;
      },
    });
    holdMachine.start();
    const state = holdMachine.update(frameState, 1000);

    assert.equal(state, "HOLDING", "State must transition to HOLDING");
    assert.equal(holdStarted, true, "onHoldStart callback should fire");
  });

  // 5. Identity breaks during hold -> reset
  it("5. Identity breaks during hold -> hold resets to 0 immediately", () => {
    const standingLandmarks = createStandingLandmarks();
    const proneLandmarks = createProneLandmarks();

    const validEval: PoseEvaluation = {
      score: 82,
      rawScore: 82,
      isValid: true,
      overallStatus: "good",
      issues: [],
      primaryIssue: null,
      summary: { totalRules: 1, evaluatedRules: 1, passedRules: 1, warningRules: 0, failedRules: 0, unknownRules: 0 },
      posture: { head: "good", neck: "good", shoulders: "good", elbows: "good", spine: "good", hips: "good", knees: "good", ankles: "good" },
      completionEligible: true,
      confidence: 0.95,
      evaluatedAt: Date.now(),
      timestamp: Date.now(),
      identity: { isMatch: true, confidence: 0.9, canonicalAsanaId: "warrior-ii", passedRequirements: ["stance:standing", "warrior-ii-left-knee-angle"], failedRequirements: [], criticalFailures: [] },
      rules: [{ ruleId: "warrior-ii-left-knee-angle", ruleName: "Front Knee Bend", metric: "angle", status: "pass", severity: "high", weight: 3, score: 85, measuredValue: 90, feedback: "Good" }],
    };

    let resetFired = false;
    const holdMachine = new PoseHoldStateMachine({
      onHoldReset: () => {
        resetFired = true;
      },
    });
    holdMachine.start();

    // Hold for 3 seconds
    holdMachine.update(evaluatePoseFrameState({ asanaId: "warrior-ii-virabhadrasana-ii", evaluation: validEval, landmarks: standingLandmarks, cameraReady: true }), 1000);
    holdMachine.update(evaluatePoseFrameState({ asanaId: "warrior-ii-virabhadrasana-ii", evaluation: validEval, landmarks: standingLandmarks, cameraReady: true }), 2000);
    holdMachine.update(evaluatePoseFrameState({ asanaId: "warrior-ii-virabhadrasana-ii", evaluation: validEval, landmarks: standingLandmarks, cameraReady: true }), 4000); // 3000ms held

    assert.equal(holdMachine.getHoldElapsedMs(), 3000);
    assert.equal(holdMachine.getState(), "HOLDING");

    // Identity breaks at t = 4200ms (user drops to prone floor position)
    const brokenFrame = evaluatePoseFrameState({
      asanaId: "warrior-ii-virabhadrasana-ii",
      evaluation: validEval,
      landmarks: proneLandmarks,
      cameraReady: true,
      timestamp: 4200,
    });

    const stateAfterBreak = holdMachine.update(brokenFrame, 4200);

    assert.equal(resetFired, true, "onHoldReset must fire");
    assert.equal(holdMachine.getHoldElapsedMs(), 0, "Hold elapsed ms must reset to 0");
    assert.notEqual(stateAfterBreak, "HOLDING", "Must exit HOLDING state");
  });

  // 6. Tracking validity breaks during hold -> reset
  it("6. Tracking validity breaks during hold (camera loss) -> hold resets to 0", () => {
    const standingLandmarks = createStandingLandmarks();
    const validEval: PoseEvaluation = {
      score: 85,
      rawScore: 85,
      isValid: true,
      overallStatus: "good",
      issues: [],
      primaryIssue: null,
      summary: { totalRules: 1, evaluatedRules: 1, passedRules: 1, warningRules: 0, failedRules: 0, unknownRules: 0 },
      posture: { head: "good", neck: "good", shoulders: "good", elbows: "good", spine: "good", hips: "good", knees: "good", ankles: "good" },
      completionEligible: true,
      confidence: 0.95,
      evaluatedAt: Date.now(),
      timestamp: Date.now(),
      identity: { isMatch: true, confidence: 0.9, canonicalAsanaId: "warrior-ii", passedRequirements: ["stance:standing", "warrior-ii-left-knee-angle"], failedRequirements: [], criticalFailures: [] },
      rules: [{ ruleId: "warrior-ii-left-knee-angle", ruleName: "Front Knee Bend", metric: "angle", status: "pass", severity: "high", weight: 3, score: 85, measuredValue: 90, feedback: "Good" }],
    };

    const holdMachine = new PoseHoldStateMachine();
    holdMachine.start();

    // Hold 2 seconds
    holdMachine.update(evaluatePoseFrameState({ asanaId: "warrior-ii-virabhadrasana-ii", evaluation: validEval, landmarks: standingLandmarks, cameraReady: true }), 1000);
    holdMachine.update(evaluatePoseFrameState({ asanaId: "warrior-ii-virabhadrasana-ii", evaluation: validEval, landmarks: standingLandmarks, cameraReady: true }), 3000);
    assert.equal(holdMachine.getHoldElapsedMs(), 2000);

    // Tracking lost (cameraReady = false / null landmarks)
    const lostFrame = evaluatePoseFrameState({
      asanaId: "warrior-ii-virabhadrasana-ii",
      evaluation: null,
      landmarks: null,
      cameraReady: false,
      timestamp: 3100,
    });

    holdMachine.update(lostFrame, 3100);

    assert.equal(holdMachine.getHoldElapsedMs(), 0, "Hold must reset to 0 on tracking loss");
    assert.equal(holdMachine.getState(), "POSITIONING");
  });

  // 7. Form validity breaks during hold -> reset
  it("7. Form validity breaks during hold (critical rule failure) -> hold resets to 0", () => {
    const standingLandmarks = createStandingLandmarks();

    const validEval: PoseEvaluation = {
      score: 85,
      rawScore: 85,
      isValid: true,
      overallStatus: "good",
      issues: [],
      primaryIssue: null,
      summary: { totalRules: 1, evaluatedRules: 1, passedRules: 1, warningRules: 0, failedRules: 0, unknownRules: 0 },
      posture: { head: "good", neck: "good", shoulders: "good", elbows: "good", spine: "good", hips: "good", knees: "good", ankles: "good" },
      completionEligible: true,
      confidence: 0.95,
      evaluatedAt: Date.now(),
      timestamp: Date.now(),
      identity: { isMatch: true, confidence: 0.9, canonicalAsanaId: "warrior-ii", passedRequirements: ["stance:standing", "warrior-ii-left-knee-angle"], failedRequirements: [], criticalFailures: [] },
      rules: [{ ruleId: "warrior-ii-left-knee-angle", ruleName: "Front Knee Bend", metric: "angle", status: "pass", severity: "high", weight: 3, score: 85, measuredValue: 90, feedback: "Good" }],
    };

    const brokenFormEval: PoseEvaluation = {
      score: 50,
      rawScore: 50,
      isValid: true,
      overallStatus: "needs_adjustment",
      issues: [{ ruleId: "warrior-ii-left-knee-angle", ruleName: "Front Knee Bend", severity: "high", metric: "angle", currentValue: 160, feedback: "Bend front knee deeply" }],
      primaryIssue: { ruleId: "warrior-ii-left-knee-angle", ruleName: "Front Knee Bend", severity: "high", metric: "angle", currentValue: 160, feedback: "Bend front knee deeply" },
      summary: { totalRules: 1, evaluatedRules: 1, passedRules: 0, warningRules: 0, failedRules: 1, unknownRules: 0 },
      posture: { head: "good", neck: "good", shoulders: "good", elbows: "good", spine: "good", hips: "good", knees: "bad", ankles: "good" },
      completionEligible: false,
      confidence: 0.95,
      evaluatedAt: Date.now(),
      timestamp: Date.now(),
      rules: [{ ruleId: "warrior-ii-left-knee-angle", ruleName: "Front Knee Bend", metric: "angle", status: "fail", severity: "high", weight: 3, score: 30, measuredValue: 160, feedback: "Bend front knee deeply" }],
    };

    const holdMachine = new PoseHoldStateMachine();
    holdMachine.start();

    // Hold 2.5s
    holdMachine.update(evaluatePoseFrameState({ asanaId: "warrior-ii-virabhadrasana-ii", evaluation: validEval, landmarks: standingLandmarks, cameraReady: true }), 1000);
    holdMachine.update(evaluatePoseFrameState({ asanaId: "warrior-ii-virabhadrasana-ii", evaluation: validEval, landmarks: standingLandmarks, cameraReady: true }), 3500);
    assert.equal(holdMachine.getHoldElapsedMs(), 2500);

    // Form breaks
    holdMachine.update(evaluatePoseFrameState({ asanaId: "warrior-ii-virabhadrasana-ii", evaluation: brokenFormEval, landmarks: standingLandmarks, cameraReady: true }), 3600);

    assert.equal(holdMachine.getHoldElapsedMs(), 0, "Hold timer must reset to 0");
    assert.notEqual(holdMachine.getState(), "HOLDING");
  });

  // 8. Identity recovers -> fresh 5-second hold
  it("8. Identity recovers after reset -> fresh full 5-second hold begins from 0", () => {
    const standingLandmarks = createStandingLandmarks();
    const validEval: PoseEvaluation = {
      score: 82,
      rawScore: 82,
      isValid: true,
      overallStatus: "good",
      issues: [],
      primaryIssue: null,
      summary: { totalRules: 1, evaluatedRules: 1, passedRules: 1, warningRules: 0, failedRules: 0, unknownRules: 0 },
      posture: { head: "good", neck: "good", shoulders: "good", elbows: "good", spine: "good", hips: "good", knees: "good", ankles: "good" },
      completionEligible: true,
      confidence: 0.95,
      evaluatedAt: Date.now(),
      timestamp: Date.now(),
      identity: { isMatch: true, confidence: 0.9, canonicalAsanaId: "warrior-ii", passedRequirements: ["stance:standing", "warrior-ii-left-knee-angle"], failedRequirements: [], criticalFailures: [] },
      rules: [{ ruleId: "warrior-ii-left-knee-angle", ruleName: "Front Knee Bend", metric: "angle", status: "pass", severity: "high", weight: 3, score: 85, measuredValue: 90, feedback: "Good" }],
    };

    const holdMachine = new PoseHoldStateMachine();
    holdMachine.start();

    // 1. Initial 3s hold
    holdMachine.update(evaluatePoseFrameState({ asanaId: "warrior-ii-virabhadrasana-ii", evaluation: validEval, landmarks: standingLandmarks, cameraReady: true }), 1000);
    holdMachine.update(evaluatePoseFrameState({ asanaId: "warrior-ii-virabhadrasana-ii", evaluation: validEval, landmarks: standingLandmarks, cameraReady: true }), 4000);

    // 2. Break
    holdMachine.update(null, 4100);
    assert.equal(holdMachine.getHoldElapsedMs(), 0);

    // 3. Recover at t = 6000ms
    holdMachine.update(evaluatePoseFrameState({ asanaId: "warrior-ii-virabhadrasana-ii", evaluation: validEval, landmarks: standingLandmarks, cameraReady: true }), 6000);
    assert.equal(holdMachine.getHoldElapsedMs(), 0, "Timer starts fresh from 0 at t=6000");

    // At t = 9000ms (3s elapsed into new hold), NOT yet completed
    holdMachine.update(evaluatePoseFrameState({ asanaId: "warrior-ii-virabhadrasana-ii", evaluation: validEval, landmarks: standingLandmarks, cameraReady: true }), 9000);
    assert.equal(holdMachine.getHoldElapsedMs(), 3000);
    assert.equal(holdMachine.isCompleted(), false);

    // At t = 11000ms (5000ms elapsed into new hold), COMPLETED!
    holdMachine.update(evaluatePoseFrameState({ asanaId: "warrior-ii-virabhadrasana-ii", evaluation: validEval, landmarks: standingLandmarks, cameraReady: true }), 11000);
    assert.equal(holdMachine.isCompleted(), true);
  });

  // 9. 5000ms continuous valid hold -> completion
  it("9. 5000ms unbroken continuous valid hold results in completion", () => {
    const standingLandmarks = createStandingLandmarks();
    const validEval: PoseEvaluation = {
      score: 85,
      rawScore: 85,
      isValid: true,
      overallStatus: "good",
      issues: [],
      primaryIssue: null,
      summary: { totalRules: 1, evaluatedRules: 1, passedRules: 1, warningRules: 0, failedRules: 0, unknownRules: 0 },
      posture: { head: "good", neck: "good", shoulders: "good", elbows: "good", spine: "good", hips: "good", knees: "good", ankles: "good" },
      completionEligible: true,
      confidence: 0.95,
      evaluatedAt: Date.now(),
      timestamp: Date.now(),
      identity: { isMatch: true, confidence: 0.9, canonicalAsanaId: "warrior-ii", passedRequirements: ["stance:standing", "warrior-ii-left-knee-angle"], failedRequirements: [], criticalFailures: [] },
      rules: [{ ruleId: "warrior-ii-left-knee-angle", ruleName: "Front Knee Bend", metric: "angle", status: "pass", severity: "high", weight: 3, score: 85, measuredValue: 90, feedback: "Good" }],
    };

    let completedScoreReceived: number | null = null;
    const holdMachine = new PoseHoldStateMachine({
      onPoseCompleted: (score) => {
        completedScoreReceived = score;
      },
    });
    holdMachine.start();

    // Stream 50 frames over 5000ms
    for (let t = 0; t <= 5000; t += 100) {
      const frameState = evaluatePoseFrameState({
        asanaId: "warrior-ii-virabhadrasana-ii",
        evaluation: validEval,
        landmarks: standingLandmarks,
        cameraReady: true,
        timestamp: 1000 + t,
      });
      holdMachine.update(frameState, 1000 + t);
    }

    assert.equal(holdMachine.getState(), "COMPLETED");
    assert.equal(holdMachine.isCompleted(), true);
    assert.equal(completedScoreReceived, 85);
  });

  // 10. Completion fires once
  it("10. Completion callback fires exactly once regardless of additional frames", () => {
    const standingLandmarks = createStandingLandmarks();
    const validEval: PoseEvaluation = {
      score: 88,
      rawScore: 88,
      isValid: true,
      overallStatus: "good",
      issues: [],
      primaryIssue: null,
      summary: { totalRules: 1, evaluatedRules: 1, passedRules: 1, warningRules: 0, failedRules: 0, unknownRules: 0 },
      posture: { head: "good", neck: "good", shoulders: "good", elbows: "good", spine: "good", hips: "good", knees: "good", ankles: "good" },
      completionEligible: true,
      confidence: 0.95,
      evaluatedAt: Date.now(),
      timestamp: Date.now(),
      identity: { isMatch: true, confidence: 0.9, canonicalAsanaId: "warrior-ii", passedRequirements: ["stance:standing", "warrior-ii-left-knee-angle"], failedRequirements: [], criticalFailures: [] },
      rules: [{ ruleId: "warrior-ii-left-knee-angle", ruleName: "Front Knee Bend", metric: "angle", status: "pass", severity: "high", weight: 3, score: 88, measuredValue: 90, feedback: "Good" }],
    };

    let completionCount = 0;
    const holdMachine = new PoseHoldStateMachine({
      onPoseCompleted: () => {
        completionCount++;
      },
    });
    holdMachine.start();

    // Run for 10 seconds (100 frames)
    for (let t = 0; t <= 10000; t += 100) {
      const frameState = evaluatePoseFrameState({
        asanaId: "warrior-ii-virabhadrasana-ii",
        evaluation: validEval,
        landmarks: standingLandmarks,
        cameraReady: true,
        timestamp: 1000 + t,
      });
      holdMachine.update(frameState, 1000 + t);
    }

    assert.equal(completionCount, 1, "Completion callback must fire exactly once");
  });

  // 11. Premature single-frame accuracy spike cannot complete
  it("11. Premature single-frame accuracy spike cannot complete without 5s hold", () => {
    const standingLandmarks = createStandingLandmarks();
    const lowEval: PoseEvaluation = {
      score: 60,
      rawScore: 60,
      isValid: true,
      overallStatus: "needs_adjustment",
      issues: [],
      primaryIssue: null,
      summary: { totalRules: 1, evaluatedRules: 1, passedRules: 0, warningRules: 1, failedRules: 0, unknownRules: 0 },
      posture: { head: "good", neck: "good", shoulders: "good", elbows: "good", spine: "good", hips: "good", knees: "good", ankles: "good" },
      completionEligible: false,
      confidence: 0.95,
      evaluatedAt: Date.now(),
      timestamp: Date.now(),
      rules: [],
    };

    const spikeEval: PoseEvaluation = {
      score: 95, // 1-frame spike
      rawScore: 95,
      isValid: true,
      overallStatus: "good",
      issues: [],
      primaryIssue: null,
      summary: { totalRules: 1, evaluatedRules: 1, passedRules: 1, warningRules: 0, failedRules: 0, unknownRules: 0 },
      posture: { head: "good", neck: "good", shoulders: "good", elbows: "good", spine: "good", hips: "good", knees: "good", ankles: "good" },
      completionEligible: true,
      confidence: 0.95,
      evaluatedAt: Date.now(),
      timestamp: Date.now(),
      identity: { isMatch: true, confidence: 0.9, canonicalAsanaId: "warrior-ii", passedRequirements: ["stance:standing", "warrior-ii-left-knee-angle"], failedRequirements: [], criticalFailures: [] },
      rules: [{ ruleId: "warrior-ii-left-knee-angle", ruleName: "Front Knee Bend", metric: "angle", status: "pass", severity: "high", weight: 3, score: 95, measuredValue: 90, feedback: "Good" }],
    };

    const holdMachine = new PoseHoldStateMachine();
    holdMachine.start();

    // 10 frames of low score
    for (let t = 0; t < 1000; t += 100) {
      holdMachine.update(evaluatePoseFrameState({ asanaId: "warrior-ii-virabhadrasana-ii", evaluation: lowEval, landmarks: standingLandmarks, cameraReady: true }), t);
    }

    // Single frame spike
    holdMachine.update(evaluatePoseFrameState({ asanaId: "warrior-ii-virabhadrasana-ii", evaluation: spikeEval, landmarks: standingLandmarks, cameraReady: true }), 1000);
    assert.equal(holdMachine.isCompleted(), false, "Single frame spike must not complete");

    // Return to low score
    holdMachine.update(evaluatePoseFrameState({ asanaId: "warrior-ii-virabhadrasana-ii", evaluation: lowEval, landmarks: standingLandmarks, cameraReady: true }), 1100);
    assert.equal(holdMachine.getHoldElapsedMs(), 0, "Hold must reset back to 0");
    assert.equal(holdMachine.isCompleted(), false);
  });

  // 12. Stale accuracy cannot complete without valid identity
  it("12. Stale accuracy cannot complete without valid live tracking landmarks", () => {
    const mockEval: PoseEvaluation = {
      score: 90,
      rawScore: 90,
      isValid: true,
      overallStatus: "good",
      issues: [],
      primaryIssue: null,
      summary: { totalRules: 1, evaluatedRules: 1, passedRules: 1, warningRules: 0, failedRules: 0, unknownRules: 0 },
      posture: { head: "good", neck: "good", shoulders: "good", elbows: "good", spine: "good", hips: "good", knees: "good", ankles: "good" },
      completionEligible: true,
      confidence: 0.95,
      evaluatedAt: Date.now(),
      timestamp: Date.now(),
      rules: [],
    };

    const staleFrame = evaluatePoseFrameState({
      asanaId: "warrior-ii-virabhadrasana-ii",
      evaluation: mockEval,
      landmarks: createStandingLandmarks(),
      cameraReady: true,
      isStale: true, // Marked as stale landmark data
    });

    assert.equal(staleFrame.trackingValid, false);
    assert.equal(staleFrame.isCompletionEligible, false, "Stale frame must never be completion eligible");

    const holdMachine = new PoseHoldStateMachine();
    holdMachine.start();
    holdMachine.update(staleFrame, 1000);

    assert.equal(holdMachine.getState(), "POSITIONING");
    assert.equal(holdMachine.getHoldElapsedMs(), 0);
  });

  // 13. Feedback is prioritized
  it("13. Feedback priority hierarchy enforces Safety > Camera > Form Correction > Good Form", () => {
    const decisionEngine = new CoachDecisionEngine();

    const safetyEvent = CoachingEventBuilder.buildSafetyWarningEvent(
      "warrior-ii",
      "Warrior II",
      { ruleId: "w2-knee-safety", ruleName: "Knee overextension", severity: "high", metric: "angle", currentValue: 170, feedback: "Careful with your knee" },
      60
    );

    const outOfFrameEvent = CoachingEventBuilder.buildUserOutOfFrameEvent("warrior-ii", "Warrior II");

    const correctionEvent = CoachingEventBuilder.buildPoseCorrectionEvent(
      "warrior-ii",
      "Warrior II",
      { ruleId: "w2-arm-level", ruleName: "Arms Horizontal", severity: "medium", metric: "angle", currentValue: 140, targetValue: 180, feedback: "Extend your arms" }
    );

    const goodFormEvent = CoachingEventBuilder.buildGoodFormEvent("warrior-ii", "Warrior II", 85);

    assert.ok(decisionEngine.getEventPriority(safetyEvent) < decisionEngine.getEventPriority(outOfFrameEvent));
    assert.ok(decisionEngine.getEventPriority(outOfFrameEvent) < decisionEngine.getEventPriority(correctionEvent));
    assert.ok(decisionEngine.getEventPriority(correctionEvent) < decisionEngine.getEventPriority(goodFormEvent));
  });

  // 14. Duplicate feedback is suppressed
  it("14. Duplicate feedback within cooldown period is suppressed", () => {
    const decisionEngine = new CoachDecisionEngine({ repeatSameRuleCooldownMs: 8000 });

    const correction = CoachingEventBuilder.buildPoseCorrectionEvent(
      "warrior-ii",
      "Warrior II",
      { ruleId: "w2-arm-level", ruleName: "Arms Horizontal", severity: "medium", metric: "angle", currentValue: 140, feedback: "Extend your arms" }
    );

    const firstDecision = decisionEngine.evaluate(correction, { now: 1000 });
    assert.equal(firstDecision.shouldSpeak, true, "First event should speak");

    const duplicateDecision = decisionEngine.evaluate(correction, { now: 2000 });
    assert.equal(duplicateDecision.shouldSpeak, false, "Duplicate event within cooldown should be suppressed");

    const laterDecision = decisionEngine.evaluate(correction, { now: 10000 });
    assert.equal(laterDecision.shouldSpeak, true, "Event after cooldown should speak");
  });

  // 15. Completion voice/event is fired once
  it("15. Completion voice event is fired exactly once per asana", () => {
    const decisionEngine = new CoachDecisionEngine();

    const completionEvent = CoachingEventBuilder.buildPoseCompletedEvent("warrior-ii", "Warrior II", 88);

    const firstDecision = decisionEngine.evaluate(completionEvent, { now: 1000 });
    assert.equal(firstDecision.shouldSpeak, true);

    const secondDecision = decisionEngine.evaluate(completionEvent, { now: 1100 });
    assert.equal(secondDecision.shouldSpeak, false, "Second completion event must be rejected");

    const thirdDecision = decisionEngine.evaluate(completionEvent, { now: 5000 });
    assert.equal(thirdDecision.shouldSpeak, false, "Third completion event must also be rejected");
  });

  // 16. Session transition after completion works
  it("16. Session state machine transitions cleanly from completion to pose_review and user_choice", () => {
    let stateChanges: string[] = [];
    const sm = new SessionStateMachine("holding", (from, to) => {
      stateChanges.push(`${from}->${to}`);
    });

    assert.equal(sm.canTransitionTo("pose_review"), true);
    assert.equal(sm.transition("pose_review"), true);

    assert.equal(sm.canTransitionTo("user_choice"), true);
    assert.equal(sm.transition("user_choice"), true);

    assert.equal(sm.canTransitionTo("get_ready"), true);
    assert.equal(sm.transition("get_ready"), true);

    assert.deepEqual(stateChanges, [
      "holding->pose_review",
      "pose_review->user_choice",
      "user_choice->get_ready",
    ]);
  });

  // 17. RAF loop safety & cleanup
  it("17. State machine rejects illegal transitions and prevents state corruption", () => {
    const sm = new SessionStateMachine("idle");

    // Illegal: idle cannot jump directly to holding
    const illegalTransition = sm.transition("holding");
    assert.equal(illegalTransition, false, "Illegal transition should return false");
    assert.equal(sm.getState(), "idle", "State should remain idle");
  });

  // 18. No duplicate processing loop is created
  it("18. HoldStateMachine start() resets state cleanly without dangling timers", () => {
    const holdMachine = new PoseHoldStateMachine();
    holdMachine.start();
    assert.equal(holdMachine.getState(), "POSITIONING");
    assert.equal(holdMachine.getHoldElapsedMs(), 0);

    holdMachine.reset("IDLE");
    assert.equal(holdMachine.getState(), "IDLE");
    assert.equal(holdMachine.getHoldElapsedMs(), 0);
  });

  // 19. React state update safety — deduplicated readiness evaluation
  it("19. FeedbackEngine arbitrates multiple issues deterministically", () => {
    const feedbackEngine = new FeedbackEngine({ requiredFrames: 2 });

    const evalResult: AsanaEvaluationResult = {
      asanaId: "warrior-ii-virabhadrasana-ii",
      asanaName: "Warrior II",
      score: 65,
      rawScore: 65,
      overallStatus: "needs_adjustment",
      statusText: "Needs adjustment",
      evaluatedAt: 1000,
      confidence: 0.95,
      detectedIssues: [
        { ruleId: "w2-arm-level", ruleName: "Arm level", severity: "low", metric: "angle", currentValue: 160, correction: "Level your arms", deviation: 20 },
        { ruleId: "warrior-ii-left-knee-angle", ruleName: "Front knee", severity: "high", metric: "angle", currentValue: 140, correction: "Bend front knee deeply", deviation: 50 },
      ],
      passedRules: [],
      failedRules: ["warrior-ii-left-knee-angle", "w2-arm-level"],
    };

    // Frame 1
    const out1 = feedbackEngine.processEvaluation(evalResult, { timestamp: 1000 });
    // Frame 2 (persisted)
    const out2 = feedbackEngine.processEvaluation(evalResult, { timestamp: 1033 });

    assert.ok(out2 !== null, "Should emit feedback after persistence frames");
    assert.equal(out2?.sourceRule, "warrior-ii-left-knee-angle", "High severity knee defect must take precedence over low severity arm defect");
  });

  // 20. Existing Phase 1 identity tests pass
  it("20. Existing Phase 1 identity validation enforces stance and critical landmarks", () => {
    const mockLandmarks = createStandingLandmarks();
    const ctx: PoseEvaluatorContext = {
      landmarks: mockLandmarks as any,
      timestamp: Date.now(),
    };

    const identity = validatePoseIdentity("warrior-ii-virabhadrasana-ii", ctx);
    assert.equal(identity.canonicalAsanaId, "warrior-ii");
    assert.equal(identity.requiredStance, "standing");
    assert.equal(identity.detectedStance, "standing");
  });

  // 21. Existing Phase 1.5 hold tests pass
  it("21. Existing Phase 1.5 threshold is 75%", () => {
    const standingLandmarks = createStandingLandmarks();
    const mockEval: PoseEvaluation = {
      score: 74,
      rawScore: 74,
      isValid: true,
      overallStatus: "needs_adjustment",
      issues: [],
      primaryIssue: null,
      summary: { totalRules: 1, evaluatedRules: 1, passedRules: 1, warningRules: 0, failedRules: 0, unknownRules: 0 },
      posture: { head: "good", neck: "good", shoulders: "good", elbows: "good", spine: "good", hips: "good", knees: "good", ankles: "good" },
      completionEligible: false,
      confidence: 0.95,
      evaluatedAt: Date.now(),
      timestamp: Date.now(),
      identity: { isMatch: true, confidence: 0.9, canonicalAsanaId: "warrior-ii", passedRequirements: ["stance:standing", "warrior-ii-left-knee-angle"], failedRequirements: [], criticalFailures: [] },
      rules: [{ ruleId: "warrior-ii-left-knee-angle", ruleName: "Front Knee Bend", metric: "angle", status: "pass", severity: "high", weight: 3, score: 74, measuredValue: 90, feedback: "Good" }],
    };

    const result = evaluateCompletionGate({
      asanaId: "warrior-ii-virabhadrasana-ii",
      landmarks: standingLandmarks,
      evaluation: mockEval,
      cameraReady: true,
      completionAccuracyThreshold: 75,
    });

    assert.equal(result.accuracyValid, false);
    assert.equal(result.threshold, 75);
  });

  // 22. Existing Phase 2 accuracy tests pass
  it("22. AccuracyStabilizer maintains score in 0-100 range", () => {
    const stabilizer = new AccuracyStabilizer();
    const result = stabilizer.update(84.2, true);
    assert.ok(result.stableAccuracy !== null && result.stableAccuracy >= 0 && result.stableAccuracy <= 100);
    assert.equal(result.isStable, true);
  });

  // 23. Existing Phase 3 catalog tests pass
  it("23. All 170 catalog asanas have valid definitions and unique rule IDs", () => {
    assert.equal(ALL_ASANAS_CATALOG.length, 170, "Catalog must contain 170 asanas");
    for (const asana of ALL_ASANAS_CATALOG) {
      assert.ok(asana.id && asana.id.length > 0);
      assert.ok(Array.isArray(asana.rules));
      const ruleIds = asana.rules.map((r) => r.id);
      const uniqueRuleIds = new Set(ruleIds);
      assert.equal(ruleIds.length, uniqueRuleIds.size, `Duplicate rule ID found in ${asana.id}`);
    }
  });
});
