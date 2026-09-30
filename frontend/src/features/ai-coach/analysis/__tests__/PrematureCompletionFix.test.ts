import { describe, it } from "node:test";
import assert from "node:assert/strict";

import type { Landmark, PoseLandmarks } from "../../types/landmarks";
import { PoseLandmarkIndex as P } from "../../types/pose-landmarks";
import type { PoseEvaluationResult, RuleEvaluation, PoseIssue } from "../../types/pose-rules";
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

function createSupineLandmarks(): PoseLandmarks {
  return createLandmarks({
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

function createCobraEvaluation(overrides: Partial<PoseEvaluationResult> = {}): PoseEvaluationResult {
  const defaultRules: RuleEvaluation[] = [
    {
      ruleId: "bhujangasana.chest.lift",
      ruleName: "Chest Elevation",
      status: "pass",
      score: 88,
      weight: 3,
      isSafety: true,
      feedback: "Good chest lift",
      currentValue: 35,
      targetMin: 20,
      targetMax: 50,
    },
    {
      ruleId: "bhujangasana.elbows.tuck",
      ruleName: "Elbow Tuck",
      status: "pass",
      score: 85,
      weight: 2,
      isSafety: false,
      feedback: "Elbows properly tucked",
      currentValue: 15,
      targetMin: 0,
      targetMax: 25,
    },
  ];

  return {
    asanaId: "bhujangasana",
    score: 86,
    confidence: 0.90,
    isValid: true,
    primaryIssue: null,
    secondaryIssues: [],
    rules: defaultRules,
    summary: {
      totalRules: 2,
      evaluatedRules: 2,
      passedRules: 2,
      warningRules: 0,
      failedRules: 0,
      unknownRules: 0,
    },
    ...overrides,
  };
}

function createBridgeEvaluation(overrides: Partial<PoseEvaluationResult> = {}): PoseEvaluationResult {
  const defaultRules: RuleEvaluation[] = [
    {
      ruleId: "bridge.hips.lift",
      ruleName: "Hip Elevation",
      status: "pass",
      score: 85,
      weight: 3,
      isSafety: true,
      feedback: "Hips well lifted",
      currentValue: 40,
      targetMin: 30,
      targetMax: 60,
    },
    {
      ruleId: "bridge.left_knee.angle",
      ruleName: "Knee Angle",
      status: "pass",
      score: 88,
      weight: 2,
      isSafety: false,
      feedback: "Knees bent correctly",
      currentValue: 90,
      targetMin: 80,
      targetMax: 100,
    },
  ];

  return {
    asanaId: "setu-bandhasana",
    score: 86,
    confidence: 0.92,
    isValid: true,
    primaryIssue: null,
    secondaryIssues: [],
    rules: defaultRules,
    summary: {
      totalRules: 2,
      evaluatedRules: 2,
      passedRules: 2,
      warningRules: 0,
      failedRules: 0,
      unknownRules: 0,
    },
    ...overrides,
  };
}

/**
 * Authoritative Coach Session Simulator executing the exact continuous hold logic from useCoachSession.ts.
 */
class CoachSessionCompletionSimulator {
  public activeAsanaId: string;
  public state: "idle" | "coaching" | "correcting" | "holding" | "pose_review" | "user_choice" | "completed" = "coaching";
  public completionCandidateSince: number | null = null;
  public holdTime: number = 0;
  public targetHoldSeconds: number = DEFAULT_REQUIRED_HOLD_SECONDS;
  public completionHoldMs: number = COMPLETION_HOLD_MS;
  public hasCompleted: boolean = false;
  public completionCount: number = 0;
  public voiceAnnouncements: string[] = [];
  public popupShown: boolean = false;
  public eventOrder: string[] = [];

  constructor(asanaId: string = "bhujangasana", holdMs: number = COMPLETION_HOLD_MS) {
    this.activeAsanaId = asanaId;
    this.completionHoldMs = holdMs;
  }

  public switchAsana(newAsanaId: string): void {
    this.activeAsanaId = newAsanaId;
    this.resetCurrentAsana();
  }

  public resetCurrentAsana(): void {
    this.hasCompleted = false;
    this.completionCandidateSince = null;
    this.holdTime = 0;
    this.state = "coaching";
  }

  public processFrame(
    evaluation: PoseEvaluationResult | null,
    landmarks: PoseLandmarks | null,
    hasPose: boolean = true,
    cameraReady: boolean = true,
    timestamp: number = Date.now()
  ): { isEligible: boolean; isCompleted: boolean; holdTime: number; state: string } {
    if (this.hasCompleted || this.state === "pose_review" || this.state === "user_choice" || this.state === "completed") {
      this.completionCandidateSince = null;
      return { isEligible: false, isCompleted: true, holdTime: this.holdTime, state: this.state };
    }

    if (!hasPose || !evaluation || !landmarks) {
      this.completionCandidateSince = null;
      this.holdTime = 0;
      return { isEligible: false, isCompleted: false, holdTime: 0, state: this.state };
    }

    const gateResult = evaluateCompletionGate({
      asanaId: this.activeAsanaId,
      evaluation,
      landmarks,
      cameraReady,
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
          this.completionCandidateSince = null;
          this.completionCount++;

          // Authoritative order: Voice First (pose_review), Popup Second (user_choice)
          this.state = "pose_review";
          this.eventOrder.push("voice_completed");
          this.voiceAnnouncements.push("You have completed the asana.");

          this.state = "user_choice";
          this.eventOrder.push("popup_shown");
          this.popupShown = true;

          return { isEligible: true, isCompleted: true, holdTime: this.holdTime, state: this.state };
        }
      } else {
        if (this.state !== "holding") {
          this.state = "holding";
        }
      }
    } else {
      // Instantaneous hold reset on any signal invalidation
      this.completionCandidateSince = null;
      this.holdTime = 0;

      if (evaluation.primaryIssue && this.state !== "correcting") {
        this.state = "correcting";
      } else if (!evaluation.primaryIssue && this.state !== "coaching") {
        this.state = "coaching";
      }
    }

    return { isEligible: isPoseValidForCompletion, isCompleted: false, holdTime: this.holdTime, state: this.state };
  }
}

describe("Section 12: Premature Asana Completion Fix Regression Test Suite", () => {
  // =========================================================================
  // TEST 1 — Early movement
  // =========================================================================
  it("Test 1 — Early movement: moving into asana with temp score >= 75% but invalid stance produces NO hold, NO completion, NO popup", () => {
    const sim = new CoachSessionCompletionSimulator("bhujangasana");
    // User is standing (moving into Cobra), temporarily at 78% accuracy
    const standingLandmarks = createStandingLandmarks();
    const earlyEvaluation = createCobraEvaluation({ score: 78 });

    for (let t = 1000; t <= 3000; t += 100) {
      const res = sim.processFrame(earlyEvaluation, standingLandmarks, true, true, t);
      assert.equal(res.isEligible, false, "Early movement with incorrect stance must not be eligible");
      assert.equal(res.isCompleted, false, "Must not complete");
      assert.equal(res.holdTime, 0, "Hold must not start");
    }

    assert.equal(sim.completionCandidateSince, null);
    assert.equal(sim.hasCompleted, false);
    assert.equal(sim.popupShown, false);
    assert.equal(sim.voiceAnnouncements.length, 0);
  });

  // =========================================================================
  // TEST 2 — 1 second
  // =========================================================================
  it("Test 2 — 1 second: valid pose held for 1000 ms produces NO completion", () => {
    const sim = new CoachSessionCompletionSimulator("bhujangasana");
    const proneLandmarks = createProneLandmarks();
    const validCobra = createCobraEvaluation({ score: 85 });

    for (let t = 1000; t <= 2000; t += 100) {
      const res = sim.processFrame(validCobra, proneLandmarks, true, true, t);
      assert.equal(res.isEligible, true);
      assert.equal(res.isCompleted, false, "Must NOT complete at 1s");
    }

    assert.equal(sim.holdTime, 1.0);
    assert.equal(sim.hasCompleted, false);
    assert.equal(sim.popupShown, false);
    assert.equal(sim.voiceAnnouncements.length, 0);
  });

  // =========================================================================
  // TEST 3 — 3 seconds
  // =========================================================================
  it("Test 3 — 3 seconds: valid pose held for 3000 ms produces NO completion", () => {
    const sim = new CoachSessionCompletionSimulator("bhujangasana");
    const proneLandmarks = createProneLandmarks();
    const validCobra = createCobraEvaluation({ score: 85 });

    for (let t = 1000; t <= 4000; t += 100) {
      const res = sim.processFrame(validCobra, proneLandmarks, true, true, t);
      assert.equal(res.isEligible, true);
      assert.equal(res.isCompleted, false, "Must NOT complete at 3s");
    }

    assert.equal(sim.holdTime, 3.0);
    assert.equal(sim.hasCompleted, false);
    assert.equal(sim.popupShown, false);
    assert.equal(sim.voiceAnnouncements.length, 0);
  });

  // =========================================================================
  // TEST 4 — 4.9 seconds
  // =========================================================================
  it("Test 4 — 4.9 seconds: valid pose held for 4900 ms produces NO completion", () => {
    const sim = new CoachSessionCompletionSimulator("bhujangasana");
    const proneLandmarks = createProneLandmarks();
    const validCobra = createCobraEvaluation({ score: 85 });

    for (let t = 1000; t <= 5900; t += 100) {
      const res = sim.processFrame(validCobra, proneLandmarks, true, true, t);
      assert.equal(res.isEligible, true);
      assert.equal(res.isCompleted, false, "Must NOT complete at 4.9s");
    }

    assert.equal(sim.holdTime, 4.9);
    assert.equal(sim.hasCompleted, false);
    assert.equal(sim.popupShown, false);
    assert.equal(sim.voiceAnnouncements.length, 0);
  });

  // =========================================================================
  // TEST 5 — Exactly 5 seconds
  // =========================================================================
  it("Test 5 — Exactly 5 seconds: continuous valid hold of 5000 ms triggers authoritative completion, voice, and popup", () => {
    const sim = new CoachSessionCompletionSimulator("bhujangasana");
    const proneLandmarks = createProneLandmarks();
    const validCobra = createCobraEvaluation({ score: 85 });

    // Hold from 1000 to 5900 (4900 ms) -> not completed
    for (let t = 1000; t <= 5900; t += 100) {
      sim.processFrame(validCobra, proneLandmarks, true, true, t);
    }
    assert.equal(sim.hasCompleted, false);
    assert.equal(sim.popupShown, false);

    // Frame at exactly 6000 ms (5000 ms continuous hold)
    const finalFrame = sim.processFrame(validCobra, proneLandmarks, true, true, 6000);
    assert.equal(finalFrame.isCompleted, true, "Must complete at 5000 ms");
    assert.equal(sim.hasCompleted, true);
    assert.equal(sim.completionCount, 1);

    // Voice announcement fired first, then popup opened
    assert.deepEqual(sim.eventOrder, ["voice_completed", "popup_shown"]);
    assert.equal(sim.voiceAnnouncements[0], "You have completed the asana.");
    assert.equal(sim.popupShown, true);
  });

  // =========================================================================
  // TEST 6 — Break at 4 seconds
  // =========================================================================
  it("Test 6 — Break at 4 seconds: pose invalidation at 4000 ms resets hold to 0 with NO completion", () => {
    const sim = new CoachSessionCompletionSimulator("bhujangasana");
    const proneLandmarks = createProneLandmarks();
    const validCobra = createCobraEvaluation({ score: 85 });

    // Hold 4000 ms (t = 1000 to t = 5000)
    for (let t = 1000; t <= 5000; t += 100) {
      sim.processFrame(validCobra, proneLandmarks, true, true, t);
    }
    assert.equal(sim.holdTime, 4.0);
    assert.equal(sim.hasCompleted, false);

    // Pose breaks at t = 5100: primary alignment issue introduced
    const brokenIssue: PoseIssue = {
      ruleId: "bhujangasana.chest.lift",
      ruleName: "Chest Elevation",
      severity: "high",
      metric: "angle",
      currentValue: 10,
      targetValue: 30,
      feedback: "Lift your chest higher off the mat",
    };
    const brokenCobra = createCobraEvaluation({
      score: 68,
      primaryIssue: brokenIssue,
    });

    const breakRes = sim.processFrame(brokenCobra, proneLandmarks, true, true, 5100);
    assert.equal(breakRes.isEligible, false);
    assert.equal(breakRes.isCompleted, false);
    assert.equal(sim.completionCandidateSince, null, "Candidate timer must be reset to null");
    assert.equal(sim.holdTime, 0, "Hold time must be reset to 0");
    assert.equal(sim.hasCompleted, false);
    assert.equal(sim.popupShown, false);
  });

  // =========================================================================
  // TEST 7 — Break and recover
  // =========================================================================
  it("Test 7 — Break and recover: valid 3000 ms + break + valid 2000 ms does NOT complete (3000 + 2000 != 5000)", () => {
    const sim = new CoachSessionCompletionSimulator("bhujangasana");
    const proneLandmarks = createProneLandmarks();
    const validCobra = createCobraEvaluation({ score: 85 });

    // 1. Hold for 3000 ms (t = 1000 to t = 4000)
    for (let t = 1000; t <= 4000; t += 100) {
      sim.processFrame(validCobra, proneLandmarks, true, true, t);
    }
    assert.equal(sim.holdTime, 3.0);
    assert.equal(sim.hasCompleted, false);

    // 2. Break at t = 4100
    const brokenCobra = createCobraEvaluation({ score: 65, primaryIssue: { ruleId: "fail", ruleName: "Fail", severity: "high", metric: "angle", currentValue: 0, targetValue: 10, feedback: "Fix" } });
    sim.processFrame(brokenCobra, proneLandmarks, true, true, 4100);
    assert.equal(sim.completionCandidateSince, null);
    assert.equal(sim.holdTime, 0);

    // 3. Recover and hold for 2000 ms (t = 4200 to t = 6200)
    for (let t = 4200; t <= 6200; t += 100) {
      const res = sim.processFrame(validCobra, proneLandmarks, true, true, t);
      assert.equal(res.isCompleted, false, "Must NOT complete by summing discontinuous durations");
    }

    assert.equal(sim.holdTime, 2.0, "Hold time must reflect fresh continuous 2.0s hold, not 5.0s");
    assert.equal(sim.hasCompleted, false);
    assert.equal(sim.popupShown, false);
  });

  // =========================================================================
  // TEST 8 — Wrong asana
  // =========================================================================
  it("Test 8 — Wrong asana: Cobra selected while user performs standing pose produces NO completion", () => {
    const sim = new CoachSessionCompletionSimulator("bhujangasana");
    const standingLandmarks = createStandingLandmarks();
    // High score evaluation but on standing body
    const standingEval = createCobraEvaluation({ score: 88 });

    for (let t = 1000; t <= 7000; t += 100) {
      const res = sim.processFrame(standingEval, standingLandmarks, true, true, t);
      assert.equal(res.isEligible, false);
      assert.equal(res.isCompleted, false);
    }

    assert.equal(sim.hasCompleted, false);
    assert.equal(sim.popupShown, false);
  });

  // =========================================================================
  // TEST 9 — Asana switch
  // =========================================================================
  it("Test 9 — Asana switch: switching from Cobra (4s held) to Bridge resets hold to 0 and Cobra timer cannot complete Bridge", () => {
    const sim = new CoachSessionCompletionSimulator("bhujangasana");
    const proneLandmarks = createProneLandmarks();
    const validCobra = createCobraEvaluation({ score: 85 });

    // Hold Cobra for 4000 ms (t = 1000 to t = 5000)
    for (let t = 1000; t <= 5000; t += 100) {
      sim.processFrame(validCobra, proneLandmarks, true, true, t);
    }
    assert.equal(sim.holdTime, 4.0);

    // Switch to Bridge at t = 5100
    sim.switchAsana("setu-bandhasana");
    assert.equal(sim.completionCandidateSince, null, "Switching asana must wipe candidate start time");
    assert.equal(sim.holdTime, 0, "Bridge hold must start at 0 ms");
    assert.equal(sim.hasCompleted, false);

    // Perform valid Bridge for only 2000 ms (t = 5100 to t = 7100)
    const supineLandmarks = createSupineLandmarks();
    const validBridge = createBridgeEvaluation({ score: 86 });

    for (let t = 5100; t <= 7100; t += 100) {
      const res = sim.processFrame(validBridge, supineLandmarks, true, true, t);
      assert.equal(res.isCompleted, false, "Bridge cannot complete using Cobra's previous hold");
    }

    assert.equal(sim.holdTime, 2.0, "Bridge hold should be exactly 2.0s");
    assert.equal(sim.hasCompleted, false);
    assert.equal(sim.popupShown, false);
  });

  // =========================================================================
  // TEST 10 — Missing landmarks
  // =========================================================================
  it("Test 10 — Missing landmarks: required landmarks become unavailable during hold, resetting hold with NO completion", () => {
    const sim = new CoachSessionCompletionSimulator("bhujangasana");
    const proneLandmarks = createProneLandmarks();
    const validCobra = createCobraEvaluation({ score: 85 });

    // Valid for 3000 ms (t = 1000 to t = 4000)
    for (let t = 1000; t <= 4000; t += 100) {
      sim.processFrame(validCobra, proneLandmarks, true, true, t);
    }
    assert.equal(sim.holdTime, 3.0);

    // User steps out / landmarks drop out at t = 4100 (hasPose = false)
    sim.processFrame(null, null, false, true, 4100);
    assert.equal(sim.completionCandidateSince, null);
    assert.equal(sim.holdTime, 0);
    assert.equal(sim.hasCompleted, false);

    // Later frame returns valid at t = 4200
    sim.processFrame(validCobra, proneLandmarks, true, true, 4200);
    assert.equal(sim.completionCandidateSince, 4200);
    assert.equal(sim.holdTime, 0);
    assert.equal(sim.hasCompleted, false);
  });

  // =========================================================================
  // TEST 11 — Low confidence
  // =========================================================================
  it("Test 11 — Low confidence: landmarks become low-confidence (< 0.50) after 3s, resetting hold with NO completion", () => {
    const sim = new CoachSessionCompletionSimulator("bhujangasana");
    const proneLandmarks = createProneLandmarks();
    const validCobra = createCobraEvaluation({ score: 85 });

    // Valid for 3000 ms (t = 1000 to t = 4000)
    for (let t = 1000; t <= 4000; t += 100) {
      sim.processFrame(validCobra, proneLandmarks, true, true, t);
    }
    assert.equal(sim.holdTime, 3.0);

    // Confidence drops to 0.35 at t = 4100
    const lowConfidenceCobra = createCobraEvaluation({ score: 85, confidence: 0.35 });
    const lowRes = sim.processFrame(lowConfidenceCobra, proneLandmarks, true, true, 4100);

    assert.equal(lowRes.isEligible, false);
    assert.equal(sim.completionCandidateSince, null, "Low confidence must reset hold timer");
    assert.equal(sim.holdTime, 0);
    assert.equal(sim.hasCompleted, false);
    assert.equal(sim.popupShown, false);
  });

  // =========================================================================
  // TEST 12 — Popup source
  // =========================================================================
  it("Test 12 — Popup source: popup can only open from the authoritative completion event", () => {
    const sim = new CoachSessionCompletionSimulator("bhujangasana");
    const proneLandmarks = createProneLandmarks();
    const validCobra = createCobraEvaluation({ score: 85 });

    // Verify popup is false initially and during entire hold before 5000 ms
    for (let t = 1000; t < 6000; t += 200) {
      sim.processFrame(validCobra, proneLandmarks, true, true, t);
      assert.equal(sim.popupShown, false, `Popup must not show at t=${t}`);
    }

    // Only when authoritative 5000 ms continuous threshold is reached
    sim.processFrame(validCobra, proneLandmarks, true, true, 6000);
    assert.equal(sim.popupShown, true, "Popup must show only after authoritative completion");
    assert.equal(sim.eventOrder.indexOf("popup_shown") > sim.eventOrder.indexOf("voice_completed"), true, "Popup must show after voice completed event");
  });
});
