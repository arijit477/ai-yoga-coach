import { describe, it } from "node:test";
import assert from "node:assert/strict";

import type {
  PoseEvaluation,
  PoseEvaluationResult,
  PoseIssue,
} from "../../types/pose-rules";
import type { CameraReadinessResult } from "../../types/camera";
import { ScoreBuffer } from "../ScoreAggregator";
import { COMPLETION_ACCURACY_THRESHOLD, COMPLETION_HOLD_MS } from "../../../../hooks/useCoachSession";

function createMockPoseEvaluation(overrides?: Partial<PoseEvaluation>): PoseEvaluation {
  return {
    asanaId: "warrior-ii",
    timestamp: Date.now(),
    score: 80,
    rawScore: 80,
    overallStatus: "good",
    status: "good",
    rules: [],
    issues: [],
    primaryIssue: null,
    summary: {
      totalRules: 4,
      evaluatedRules: 4,
      passedRules: 4,
      warningRules: 0,
      failedRules: 0,
      unknownRules: 0,
    },
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
    completionEligible: true,
    confidence: 0.9,
    evaluatedAt: Date.now(),
    ...overrides,
  };
}

/**
 * Pure simulation of the useCoachSession completion validation predicate, candidate state machine,
 * voice-before-popup order, and post-completion tracking shutoff.
 */
class CompletionEngineSimulator {
  public state: "coaching" | "correcting" | "holding" | "pose_review" | "user_choice" | "completed" = "coaching";
  public completionCandidateSince: number | null = null;
  public hasCompleted: boolean = false;
  public completionCount: number = 0;
  public completedScores: number[] = [];
  public voiceAnnouncements: string[] = [];
  public popupShown: boolean = false;
  public eventOrder: string[] = [];
  public scoreBuffer: ScoreBuffer = new ScoreBuffer();
  public completionHoldMs: number;
  public completionAccuracyThreshold: number;

  constructor(holdMs: number = COMPLETION_HOLD_MS, threshold: number = COMPLETION_ACCURACY_THRESHOLD) {
    this.completionHoldMs = holdMs;
    this.completionAccuracyThreshold = threshold;
  }

  public reset(): void {
    this.state = "coaching";
    this.completionCandidateSince = null;
    this.hasCompleted = false;
    this.completionCount = 0;
    this.completedScores = [];
    this.voiceAnnouncements = [];
    this.popupShown = false;
    this.eventOrder = [];
    this.scoreBuffer.reset();
  }

  public processFrame(
    evaluation: PoseEvaluation | PoseEvaluationResult | null,
    hasPose: boolean,
    cameraReadiness: CameraReadinessResult = { ready: true, state: "CAMERA_READY", guidance: "none", message: "Ready" },
    mockTimestamp: number = Date.now()
  ): { isCandidate: boolean; isCompleted: boolean; isEvaluationActive: boolean } {
    // STEP 10: Stop evaluating completed asana for further completion events
    if (this.hasCompleted || this.state === "pose_review" || this.state === "user_choice" || this.state === "completed") {
      this.completionCandidateSince = null;
      return { isCandidate: false, isCompleted: true, isEvaluationActive: false };
    }

    if (!hasPose || !evaluation) {
      this.completionCandidateSince = null;
      return { isCandidate: false, isCompleted: false, isEvaluationActive: true };
    }

    const isValidFrame = hasPose && evaluation.score >= 0;
    this.scoreBuffer.push(evaluation.score, isValidFrame);

    let isPoseValidForCompletion = false;

    if (
      hasPose &&
      cameraReadiness.ready &&
      evaluation.isValid !== false &&
      evaluation.score >= this.completionAccuracyThreshold &&
      evaluation.primaryIssue === null
    ) {
      let hasSufficientRules = true;
      if (evaluation.summary) {
        const { totalRules, evaluatedRules, failedRules, passedRules } = evaluation.summary;
        if (failedRules > 0 || passedRules === 0) {
          hasSufficientRules = false;
        } else if (totalRules > 1) {
          const minRequired = Math.min(2, Math.ceil(totalRules * 0.5));
          if (evaluatedRules < minRequired) {
            hasSufficientRules = false;
          }
        }
      }

      let hasSufficientConfidence = true;
      if (evaluation.confidence !== undefined && evaluation.confidence !== null) {
        if (evaluation.confidence < 0.5) {
          hasSufficientConfidence = false;
        }
      }

      isPoseValidForCompletion = hasSufficientRules && hasSufficientConfidence;
    }

    if (isPoseValidForCompletion) {
      if (this.completionCandidateSince === null) {
        this.completionCandidateSince = mockTimestamp;
      }

      const elapsedHold = mockTimestamp - this.completionCandidateSince;

      if (elapsedHold >= this.completionHoldMs) {
        if (!this.hasCompleted) {
          this.hasCompleted = true;
          this.completionCandidateSince = null;
          this.scoreBuffer.setCompleted(true);
          const finalScore = this.scoreBuffer.getFinalScore() ?? Math.round(evaluation.score);
          this.completionCount++;
          this.completedScores.push(finalScore);

          // STEP 12: Voice First
          this.state = "pose_review";
          this.eventOrder.push("voice_completed");
          this.voiceAnnouncements.push("Asana completed.");

          // Then transition to user_choice for completion popup
          this.state = "user_choice";
          this.eventOrder.push("popup_shown");
          this.popupShown = true;

          return { isCandidate: true, isCompleted: true, isEvaluationActive: false };
        }
      } else {
        this.state = "holding";
        return { isCandidate: true, isCompleted: false, isEvaluationActive: true };
      }
    } else {
      this.completionCandidateSince = null;
      if (evaluation.primaryIssue) {
        this.state = "correcting";
      } else {
        this.state = "coaching";
      }
      return { isCandidate: false, isCompleted: false, isEvaluationActive: true };
    }

    return { isCandidate: false, isCompleted: false, isEvaluationActive: true };
  }
}

describe("Strict False Asana Completion Prevention (12-Point Test Matrix)", () => {
  // ==========================================
  // TEST 1 — Random movement
  // ==========================================
  it("TEST 1 — Random movement: random motion with low accuracy produces no completion, popup, or voice", () => {
    const sim = new CompletionEngineSimulator();
    const randomMovement = createMockPoseEvaluation({
      score: 42,
      primaryIssue: null,
      summary: { totalRules: 4, evaluatedRules: 2, passedRules: 1, warningRules: 0, failedRules: 1, unknownRules: 1 },
      confidence: 0.7,
    });

    for (let i = 0; i < 30; i++) {
      const res = sim.processFrame(randomMovement, true, undefined, 1000 + i * 100);
      assert.equal(res.isCandidate, false);
      assert.equal(res.isCompleted, false);
    }
    assert.equal(sim.hasCompleted, false);
    assert.equal(sim.popupShown, false);
    assert.equal(sim.voiceAnnouncements.length, 0);
  });

  // ==========================================
  // TEST 2 — Random movement with 75%+ accuracy
  // ==========================================
  it("TEST 2 — Random movement with 75%+ accuracy: brief spike with low rule coverage rejected", () => {
    const sim = new CompletionEngineSimulator();
    // 82% score but only 1 rule evaluated out of 4 (fails 50% rule coverage requirement)
    const randomSpike = createMockPoseEvaluation({
      score: 82,
      primaryIssue: null,
      summary: { totalRules: 4, evaluatedRules: 1, passedRules: 1, warningRules: 0, failedRules: 0, unknownRules: 3 },
      confidence: 0.85,
    });

    for (let i = 0; i < 30; i++) {
      const res = sim.processFrame(randomSpike, true, undefined, 1000 + i * 100);
      assert.equal(res.isCandidate, false);
      assert.equal(res.isCompleted, false);
    }
    assert.equal(sim.hasCompleted, false);
    assert.equal(sim.popupShown, false);
    assert.equal(sim.voiceAnnouncements.length, 0);
  });

  // ==========================================
  // TEST 3 — Partial pose
  // ==========================================
  it("TEST 3 — Partial pose: correct torso/legs but incorrect arms produces no completion", () => {
    const sim = new CompletionEngineSimulator();
    const armDefect: PoseIssue = {
      ruleId: "warrior2-arms-horizontal",
      ruleName: "Horizontal Arms",
      severity: "medium",
      metric: "angle",
      currentValue: 45,
      targetValue: 180,
      feedback: "Extend both arms parallel to the floor",
    };

    const partialPose = createMockPoseEvaluation({
      score: 79,
      primaryIssue: armDefect,
      summary: { totalRules: 4, evaluatedRules: 4, passedRules: 3, warningRules: 0, failedRules: 1, unknownRules: 0 },
    });

    for (let i = 0; i < 30; i++) {
      const res = sim.processFrame(partialPose, true, undefined, 1000 + i * 100);
      assert.equal(res.isCandidate, false);
      assert.equal(res.isCompleted, false);
    }
    assert.equal(sim.hasCompleted, false);
  });

  // ==========================================
  // TEST 4 — Critical hand rule fails
  // ==========================================
  it("TEST 4 — Critical hand rule fails: wrist/hand alignment violation prevents completion even at 86% accuracy", () => {
    const sim = new CompletionEngineSimulator();
    const handDefect: PoseIssue = {
      ruleId: "hand-alignment-rule",
      ruleName: "Wrist Alignment",
      severity: "high",
      metric: "alignment",
      currentValue: 35,
      targetValue: 0,
      feedback: "Keep your wrists straight in line with forearms",
      isSafety: false,
    };

    const highAccuracyHandFail = createMockPoseEvaluation({
      score: 86,
      primaryIssue: handDefect,
      summary: { totalRules: 4, evaluatedRules: 4, passedRules: 3, warningRules: 0, failedRules: 1, unknownRules: 0 },
    });

    for (let i = 0; i < 30; i++) {
      const res = sim.processFrame(highAccuracyHandFail, true, undefined, 1000 + i * 100);
      assert.equal(res.isCandidate, false);
      assert.equal(res.isCompleted, false);
    }
    assert.equal(sim.hasCompleted, false);
  });

  // ==========================================
  // TEST 5 — Critical leg rule fails
  // ==========================================
  it("TEST 5 — Critical leg rule fails: knee angle violation prevents completion", () => {
    const sim = new CompletionEngineSimulator();
    const kneeDefect: PoseIssue = {
      ruleId: "warrior2-front-knee-90",
      ruleName: "Front Knee Angle",
      severity: "high",
      metric: "angle",
      currentValue: 140,
      targetValue: 90,
      feedback: "Bend your front knee deeper to 90 degrees",
      isSafety: true,
    };

    const kneeFailEval = createMockPoseEvaluation({
      score: 78,
      primaryIssue: kneeDefect,
      summary: { totalRules: 4, evaluatedRules: 4, passedRules: 3, warningRules: 0, failedRules: 1, unknownRules: 0 },
    });

    for (let i = 0; i < 30; i++) {
      const res = sim.processFrame(kneeFailEval, true, undefined, 1000 + i * 100);
      assert.equal(res.isCandidate, false);
      assert.equal(res.isCompleted, false);
    }
    assert.equal(sim.hasCompleted, false);
  });

  // ==========================================
  // TEST 6 — Wrong asana
  // ==========================================
  it("TEST 6 — Wrong asana: performing Tree Pose while Warrior II is active produces no completion", () => {
    const sim = new CompletionEngineSimulator();
    const wrongAsanaIssues: PoseIssue[] = [
      {
        ruleId: "warrior2-arms-horizontal",
        ruleName: "Horizontal Arms",
        severity: "medium",
        metric: "angle",
        currentValue: 20,
        targetValue: 180,
        feedback: "Extend arms outward",
      },
    ];

    const treePoseDuringWarrior2 = createMockPoseEvaluation({
      score: 76,
      primaryIssue: wrongAsanaIssues[0],
      summary: { totalRules: 4, evaluatedRules: 4, passedRules: 2, warningRules: 0, failedRules: 2, unknownRules: 0 },
    });

    for (let i = 0; i < 30; i++) {
      const res = sim.processFrame(treePoseDuringWarrior2, true, undefined, 1000 + i * 100);
      assert.equal(res.isCandidate, false);
      assert.equal(res.isCompleted, false);
    }
    assert.equal(sim.hasCompleted, false);
  });

  // ==========================================
  // TEST 7 — Correct pose briefly
  // ==========================================
  it("TEST 7 — Correct pose briefly: valid pose held for < 1500ms duration does not complete", () => {
    const sim = new CompletionEngineSimulator(1500, 75);
    const validPose = createMockPoseEvaluation({ score: 85, confidence: 0.95 });

    // Held for 800ms (t = 1000 to t = 1800)
    for (let t = 1000; t <= 1800; t += 100) {
      const res = sim.processFrame(validPose, true, undefined, t);
      assert.equal(res.isCandidate, true);
      assert.equal(res.isCompleted, false);
    }
    assert.equal(sim.hasCompleted, false);
    assert.equal(sim.completionCount, 0);
  });

  // ==========================================
  // TEST 8 — Correct pose held continuously
  // ==========================================
  it("TEST 8 — Correct pose held continuously: confirms completion with Voice FIRST and Popup SECOND", () => {
    const sim = new CompletionEngineSimulator(1500, 75);
    const validPose = createMockPoseEvaluation({ score: 88, confidence: 0.95 });

    // Hold from t=1000 to t=2400 (1400ms): candidate holding
    for (let t = 1000; t <= 2400; t += 100) {
      sim.processFrame(validPose, true, undefined, t);
    }
    assert.equal(sim.hasCompleted, false);

    // T = 2500ms (1500ms elapsed): Confirmation!
    const res = sim.processFrame(validPose, true, undefined, 2500);
    assert.equal(res.isCompleted, true);
    assert.equal(sim.hasCompleted, true);
    assert.equal(sim.completionCount, 1);

    // Verify ordering: Voice first, then Popup second
    assert.deepEqual(sim.eventOrder, ["voice_completed", "popup_shown"]);
    assert.equal(sim.voiceAnnouncements[0], "Asana completed.");
    assert.equal(sim.popupShown, true);
  });

  // ==========================================
  // TEST 9 — Pose becomes incorrect during hold
  // ==========================================
  it("TEST 9 — Pose becomes incorrect during hold: 75% -> 78% -> 82% -> 72% resets candidate timer", () => {
    const sim = new CompletionEngineSimulator(1500, 75);

    // Step 1: 75% -> Candidate starts at t=1000
    sim.processFrame(createMockPoseEvaluation({ score: 75 }), true, undefined, 1000);
    assert.equal(sim.completionCandidateSince, 1000);

    // Step 2: 78% -> Continues at t=1500
    sim.processFrame(createMockPoseEvaluation({ score: 78 }), true, undefined, 1500);
    assert.equal(sim.completionCandidateSince, 1000);

    // Step 3: 82% -> Continues at t=2000 (1000ms elapsed)
    sim.processFrame(createMockPoseEvaluation({ score: 82 }), true, undefined, 2000);
    assert.equal(sim.completionCandidateSince, 1000);

    // Step 4: 72% (below 75% threshold) at t=2200 -> Candidate RESETS!
    const dipRes = sim.processFrame(createMockPoseEvaluation({ score: 72 }), true, undefined, 2200);
    assert.equal(dipRes.isCandidate, false);
    assert.equal(sim.completionCandidateSince, null);
    assert.equal(sim.hasCompleted, false);

    // Step 5: Score recovers to 80% at t=2400 -> New candidate starts fresh from t=2400
    sim.processFrame(createMockPoseEvaluation({ score: 80 }), true, undefined, 2400);
    assert.equal(sim.completionCandidateSince, 2400);

    // At t=3500 (1100ms since reset): not yet completed
    const interimRes = sim.processFrame(createMockPoseEvaluation({ score: 80 }), true, undefined, 3500);
    assert.equal(interimRes.isCompleted, false);
    assert.equal(sim.hasCompleted, false);
  });

  // ==========================================
  // TEST 10 — After completion
  // ==========================================
  it("TEST 10 — After completion: tracking/evaluation stops, no repeated popup or completion voice", () => {
    const sim = new CompletionEngineSimulator(1500, 75);
    const validPose = createMockPoseEvaluation({ score: 85, confidence: 0.95 });

    sim.processFrame(validPose, true, undefined, 1000);
    sim.processFrame(validPose, true, undefined, 2500);
    assert.equal(sim.hasCompleted, true);
    assert.equal(sim.completionCount, 1);
    assert.equal(sim.voiceAnnouncements.length, 1);

    // Simulate 60 frames after completion (2 seconds)
    for (let i = 0; i < 60; i++) {
      const res = sim.processFrame(validPose, true, undefined, 2600 + i * 33);
      assert.equal(res.isCompleted, true);
      assert.equal(res.isEvaluationActive, false); // Evaluation stopped for completed asana
    }

    // Still exactly 1 completion event and 1 voice announcement
    assert.equal(sim.completionCount, 1);
    assert.equal(sim.voiceAnnouncements.length, 1);
  });

  // ==========================================
  // TEST 11 — Start another asana
  // ==========================================
  it("TEST 11 — Start another asana: completion state resets and new asana tracking starts normally", () => {
    const sim = new CompletionEngineSimulator(1500, 75);
    const validPose1 = createMockPoseEvaluation({ asanaId: "warrior-ii", score: 85, confidence: 0.95 });

    // Complete Asana 1
    sim.processFrame(validPose1, true, undefined, 1000);
    sim.processFrame(validPose1, true, undefined, 2500);
    assert.equal(sim.hasCompleted, true);

    // Move to next asana -> Reset called
    sim.reset();
    assert.equal(sim.hasCompleted, false);
    assert.equal(sim.completionCandidateSince, null);
    assert.equal(sim.state, "coaching");

    // Track Asana 2 normally
    const validPose2 = createMockPoseEvaluation({ asanaId: "tree-pose", score: 88, confidence: 0.95 });
    const res = sim.processFrame(validPose2, true, undefined, 3000);
    assert.equal(res.isCandidate, true);
    assert.equal(res.isEvaluationActive, true);
    assert.equal(sim.completionCandidateSince, 3000);
  });

  // ==========================================
  // TEST 12 — Low landmark confidence
  // ==========================================
  it("TEST 12 — Low landmark confidence: high score with confidence < 0.50 produces no completion", () => {
    const sim = new CompletionEngineSimulator();
    const lowConfidencePose = createMockPoseEvaluation({
      score: 92,
      confidence: 0.38, // Unreliable landmarks
    });

    for (let i = 0; i < 30; i++) {
      const res = sim.processFrame(lowConfidencePose, true, undefined, 1000 + i * 100);
      assert.equal(res.isCandidate, false);
      assert.equal(res.isCompleted, false);
    }
    assert.equal(sim.hasCompleted, false);
  });
});
