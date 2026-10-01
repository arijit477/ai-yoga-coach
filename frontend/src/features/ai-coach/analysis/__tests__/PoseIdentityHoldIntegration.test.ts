import { describe, it } from "node:test";
import assert from "node:assert/strict";

import type { Landmark, PoseLandmarks } from "../../types/landmarks";
import { PoseLandmarkIndex as P } from "../../types/pose-landmarks";
import type { PoseEvaluationResult, RuleEvaluation } from "../../types/pose-rules";
import { evaluateCompletionGate } from "../AsanaCompletionGate";
import {
  COMPLETION_HOLD_MS,
  COMPLETION_ACCURACY_THRESHOLD,
  DEFAULT_REQUIRED_HOLD_SECONDS,
} from "../../../../hooks/useCoachSession";

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

function createProneCobraLandmarks(): PoseLandmarks {
  return createLandmarks({
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

function createEvaluation(
  score: number,
  isMatch: boolean,
  asanaId: string = "cobra-bhujangasana"
): PoseEvaluationResult {
  const rules: RuleEvaluation[] = [
    {
      ruleId: "bhujangasana.chest.lift",
      ruleName: "Chest Elevation",
      status: score >= 60 ? "pass" : "fail",
      score,
      weight: 3,
      isSafety: true,
      feedback: "Good lift",
      currentValue: 35,
      targetMin: 20,
      targetMax: 50,
    },
    {
      ruleId: "bhujangasana.elbows.tuck",
      ruleName: "Elbow Tuck",
      status: score >= 60 ? "pass" : "fail",
      score,
      weight: 2,
      isSafety: false,
      feedback: "Good tuck",
      currentValue: 15,
      targetMin: 0,
      targetMax: 25,
    },
  ];

  return {
    asanaId,
    score,
    confidence: 0.92,
    isValid: true,
    identity: {
      isMatch,
      confidence: 0.92,
      canonicalAsanaId: "bhujangasana",
      requiredStance: "prone",
      detectedStance: isMatch ? "prone" : "standing",
      passedRequirements: isMatch ? ["stance:prone", "bhujangasana.chest.lift", "bhujangasana.elbows.tuck"] : [],
      failedRequirements: isMatch ? [] : ["stance_mismatch:prone_vs_standing"],
      criticalFailures: isMatch ? [] : ["stance_mismatch:prone_vs_standing"],
      reason: isMatch ? "Pose identity confirmed" : "Physical stance mismatch",
    },
    primaryIssue: score >= 75 ? null : {
      ruleId: "bhujangasana.chest.lift",
      ruleName: "Chest Elevation",
      severity: "high",
      type: "alignment",
      feedback: "Lift your chest higher",
    },
    secondaryIssues: [],
    rules,
    summary: {
      totalRules: 2,
      evaluatedRules: 2,
      passedRules: score >= 60 ? 2 : 0,
      warningRules: 0,
      failedRules: score >= 60 ? 0 : 2,
      unknownRules: 0,
    },
  };
}

/**
 * Simulator emulating the exact useCoachSession hold timer & completion state machine.
 */
class HoldEligibilitySessionSimulator {
  public activeAsanaId: string = "cobra-bhujangasana";
  public state: "idle" | "coaching" | "correcting" | "holding" | "pose_review" | "user_choice" | "completed" = "coaching";
  public completionCandidateSince: number | null = null;
  public holdTime: number = 0;
  public targetHoldSeconds: number = DEFAULT_REQUIRED_HOLD_SECONDS;
  public completionHoldMs: number = COMPLETION_HOLD_MS;
  public hasCompleted: boolean = false;
  public completionCount: number = 0;

  constructor(asanaId: string = "cobra-bhujangasana", holdMs: number = COMPLETION_HOLD_MS) {
    this.activeAsanaId = asanaId;
    this.completionHoldMs = holdMs;
  }

  public processFrame(
    evaluation: PoseEvaluationResult | null,
    landmarks: PoseLandmarks | null,
    timestamp: number
  ): { isEligible: boolean; isCompleted: boolean; holdTime: number; state: string } {
    if (this.hasCompleted || this.state === "pose_review" || this.state === "user_choice" || this.state === "completed") {
      this.completionCandidateSince = null;
      return { isEligible: false, isCompleted: true, holdTime: this.holdTime, state: this.state };
    }

    if (!evaluation || !landmarks) {
      this.completionCandidateSince = null;
      this.holdTime = 0;
      return { isEligible: false, isCompleted: false, holdTime: 0, state: this.state };
    }

    const gateResult = evaluateCompletionGate({
      asanaId: this.activeAsanaId,
      evaluation,
      landmarks,
      cameraReady: true,
      completionAccuracyThreshold: COMPLETION_ACCURACY_THRESHOLD,
    });

    const isPoseValidForCompletion = gateResult.isEligible;

    if (isPoseValidForCompletion) {
      if (this.completionCandidateSince === null) {
        this.completionCandidateSince = timestamp;
      }

      const elapsedHold = timestamp - this.completionCandidateSince;
      this.holdTime = Math.min(
        this.targetHoldSeconds,
        Math.round((elapsedHold / 1000) * 10) / 10
      );

      if (elapsedHold >= this.completionHoldMs) {
        if (!this.hasCompleted) {
          this.hasCompleted = true;
          this.completionCount++;
          this.completionCandidateSince = null;
          this.state = "pose_review";
        }
      } else {
        if (this.state !== "holding") {
          this.state = "holding";
        }
      }
    } else {
      // RESET candidate hold immediately on ANY signal invalidation
      this.completionCandidateSince = null;
      this.holdTime = 0;

      if (evaluation.primaryIssue && this.state !== "correcting") {
        this.state = "correcting";
      } else if (!evaluation.primaryIssue && this.state !== "coaching") {
        this.state = "coaching";
      }
    }

    return {
      isEligible: isPoseValidForCompletion,
      isCompleted: this.hasCompleted,
      holdTime: this.holdTime,
      state: this.state,
    };
  }
}

describe("Phase 1.5 — Connect Pose Identity to Hold Eligibility Specification Tests", () => {
  it("1. Identity false + accuracy 100% -> hold does NOT start", () => {
    const sim = new HoldEligibilitySessionSimulator();
    const standing = createStandingLandmarks();
    const eval100 = createEvaluation(100, false); // 100% accuracy, but identity false (standing for Cobra)

    const result = sim.processFrame(eval100, standing, 1000);

    assert.equal(result.isEligible, false, "Gate must NOT be eligible when identity is false");
    assert.equal(result.holdTime, 0, "Hold timer must remain 0");
    assert.notEqual(result.state, "holding", "State must NOT transition to holding");
    assert.equal(sim.completionCandidateSince, null, "Candidate start time must be null");
  });

  it("2. Identity false + accuracy 100% -> completion does NOT happen even after 6 seconds", () => {
    const sim = new HoldEligibilitySessionSimulator();
    const standing = createStandingLandmarks();
    const eval100 = createEvaluation(100, false);

    // Simulate 60 frames spanning 6000ms
    for (let t = 0; t <= 6000; t += 100) {
      sim.processFrame(eval100, standing, 1000 + t);
    }

    assert.equal(sim.hasCompleted, false, "Completion must NEVER happen when identity is false");
    assert.equal(sim.completionCount, 0, "Completion count must be 0");
    assert.equal(sim.holdTime, 0, "Hold time must remain 0");
  });

  it("3. Identity true + accuracy below existing threshold (65% < 75%) -> hold does NOT start", () => {
    const sim = new HoldEligibilitySessionSimulator();
    const prone = createProneCobraLandmarks();
    const evalLow = createEvaluation(65, true); // Identity is true, but accuracy is 65% (< 75%)

    const result = sim.processFrame(evalLow, prone, 1000);

    assert.equal(result.isEligible, false, "Gate must NOT be eligible when accuracy is below 75%");
    assert.equal(result.holdTime, 0, "Hold time must be 0");
    assert.notEqual(result.state, "holding", "State must NOT transition to holding");
  });

  it("4. Identity true + accuracy >= existing threshold (85% >= 75%) -> hold starts", () => {
    const sim = new HoldEligibilitySessionSimulator();
    const prone = createProneCobraLandmarks();
    const evalValid = createEvaluation(85, true); // Identity is true AND accuracy >= 75%

    const res1 = sim.processFrame(evalValid, prone, 1000);
    assert.equal(res1.isEligible, true, "Gate must be eligible");
    assert.equal(res1.state, "holding", "State must transition to holding");
    assert.equal(sim.completionCandidateSince, 1000, "Hold timer starts at timestamp 1000");

    const res2 = sim.processFrame(evalValid, prone, 2000); // 1.0s elapsed
    assert.equal(res2.holdTime, 1.0, "Hold time must reflect 1.0s");
  });

  it("5. Identity becomes false during hold (at 3.4s) -> hold resets to 0 immediately", () => {
    const sim = new HoldEligibilitySessionSimulator();
    const prone = createProneCobraLandmarks();
    const standing = createStandingLandmarks();
    const evalValid = createEvaluation(85, true);
    const evalInvalid = createEvaluation(85, false);

    // Hold validly for 3400ms
    sim.processFrame(evalValid, prone, 1000);
    sim.processFrame(evalValid, prone, 2000);
    sim.processFrame(evalValid, prone, 3000);
    const midHold = sim.processFrame(evalValid, prone, 4400); // 3.4s held
    assert.equal(midHold.holdTime, 3.4, "Hold time must reach 3.4s");
    assert.equal(midHold.state, "holding");

    // At 4500ms, user breaks identity (e.g. stands up)
    const breakResult = sim.processFrame(evalInvalid, standing, 4500);

    assert.equal(breakResult.isEligible, false, "Gate becomes ineligible");
    assert.equal(breakResult.holdTime, 0, "Hold timer must immediately reset to 0");
    assert.equal(sim.completionCandidateSince, null, "Candidate start timestamp must be cleared");
    assert.notEqual(breakResult.state, "holding", "Must exit holding state");
    assert.equal(sim.hasCompleted, false, "No completion on broken hold");
  });

  it("6. Identity becomes true again -> new 5-second hold begins from 0 (does NOT resume from 3.4s)", () => {
    const sim = new HoldEligibilitySessionSimulator();
    const prone = createProneCobraLandmarks();
    const standing = createStandingLandmarks();
    const evalValid = createEvaluation(85, true);
    const evalInvalid = createEvaluation(85, false);

    // 1. Hold for 3.4s
    sim.processFrame(evalValid, prone, 1000);
    sim.processFrame(evalValid, prone, 4400); // 3.4s
    assert.equal(sim.holdTime, 3.4);

    // 2. Break identity at 4500ms
    sim.processFrame(evalInvalid, standing, 4500);
    assert.equal(sim.holdTime, 0);

    // 3. Resume valid pose at 5000ms
    sim.processFrame(evalValid, prone, 5000); // Candidate start = 5000
    assert.equal(sim.completionCandidateSince, 5000);

    // 4. After 2.0s of resumed hold (timestamp 7000ms):
    const resResume = sim.processFrame(evalValid, prone, 7000);
    assert.equal(resResume.holdTime, 2.0, "Hold time must be 2.0s (NOT 3.4 + 2.0 = 5.4s)");
    assert.equal(resResume.isCompleted, false, "Must NOT complete early");

    // 5. Must hold until 10000ms (5.0s fresh continuous hold) to complete
    const resComplete = sim.processFrame(evalValid, prone, 10000);
    assert.equal(resComplete.isCompleted, true, "Must complete after full 5.0s clean hold");
    assert.equal(resComplete.holdTime, 5.0);
  });

  it("7. Identity true + valid continuous hold duration (5000ms) -> existing completion flow fires", () => {
    const sim = new HoldEligibilitySessionSimulator();
    const prone = createProneCobraLandmarks();
    const evalValid = createEvaluation(85, true);

    sim.processFrame(evalValid, prone, 1000);
    sim.processFrame(evalValid, prone, 2000);
    sim.processFrame(evalValid, prone, 3000);
    sim.processFrame(evalValid, prone, 4000);
    sim.processFrame(evalValid, prone, 5000);
    const completeRes = sim.processFrame(evalValid, prone, 6000); // 5000ms elapsed

    assert.equal(completeRes.isCompleted, true, "Completion must fire at 5000ms hold");
    assert.equal(completeRes.state, "pose_review", "Must transition to pose_review");
    assert.equal(sim.completionCount, 1, "Completion count must be 1");
  });

  it("8. Completion cannot fire twice", () => {
    const sim = new HoldEligibilitySessionSimulator();
    const prone = createProneCobraLandmarks();
    const evalValid = createEvaluation(85, true);

    // Reach completion at 6000ms
    sim.processFrame(evalValid, prone, 1000);
    sim.processFrame(evalValid, prone, 6000);
    assert.equal(sim.hasCompleted, true);
    assert.equal(sim.completionCount, 1);

    // Simulate 10 more subsequent frames with valid pose
    for (let t = 7000; t <= 8000; t += 100) {
      const res = sim.processFrame(evalValid, prone, t);
      assert.equal(res.isCompleted, true);
      assert.equal(sim.completionCount, 1, "Completion count must remain exactly 1");
    }
  });
});
