import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { CoachingEventEngine } from "../CoachingEventEngine";
import type { PoseEvaluationResult, PoseIssue } from "../../types/pose-rules";

describe("Phase 4C.5 — Correction Event Gating Regression Tests", () => {
  let engine: CoachingEventEngine;

  beforeEach(() => {
    engine = new CoachingEventEngine();
    engine.reset();
  });

  const createMockEvaluation = (
    primaryIssue: Partial<PoseIssue> | null,
    options: { score?: number; isValid?: boolean; secondaryIssues?: PoseIssue[] } = {}
  ): PoseEvaluationResult => {
    const formattedPrimary: PoseIssue | null = primaryIssue
      ? {
          ruleId: primaryIssue.ruleId ?? "left_knee_alignment",
          ruleName: primaryIssue.ruleName ?? "Left Knee Alignment",
          severity: primaryIssue.severity ?? "medium",
          metric: primaryIssue.metric ?? "angle",
          currentValue: primaryIssue.currentValue ?? 45,
          targetValue: primaryIssue.targetValue ?? 90,
          min: primaryIssue.min ?? 85,
          max: primaryIssue.max ?? 95,
          feedback: primaryIssue.feedback ?? "Bend your left knee more deeply.",
          joint: primaryIssue.joint ?? "leftKnee",
          isSafety: primaryIssue.isSafety ?? false,
        }
      : null;

    return {
      asanaId: "warrior-ii",
      score: options.score ?? 60,
      isValid: options.isValid ?? true,
      primaryIssue: formattedPrimary,
      secondaryIssues: options.secondaryIssues ?? [],
      resolvedIssues: [],
      scoreTrend: "stable",
      stability: 85,
      holdProgress: 0,
      completionEligible: false,
      activeRules: 5,
      evaluatedAt: Date.now(),
    };
  };

  // TEST 1: Valid pose + coaching state + FULL_BODY_DETECTED -> pose_correction generated
  it("TEST 1: Generates pose_correction during active coaching when cameraState is FULL_BODY_DETECTED", () => {
    const evaluation = createMockEvaluation({
      ruleId: "left_knee_alignment",
      severity: "medium",
      currentValue: 45,
      targetValue: 90,
    });

    const events = engine.process(
      "warrior-ii",
      "Warrior II",
      "coaching",
      "FULL_BODY_DETECTED",
      evaluation
    );

    const correctionEvent = events.find((e) => e.type === "pose_correction");
    assert.ok(correctionEvent, "Expected pose_correction event to be generated under FULL_BODY_DETECTED");
    assert.equal(correctionEvent.ruleId, "left_knee_alignment");
    assert.equal(correctionEvent.severity, "medium");
  });

  // TEST 2: Valid pose + coaching state + CAMERA_READY -> pose_correction generated
  it("TEST 2: Generates pose_correction during active coaching when cameraState is CAMERA_READY", () => {
    const evaluation = createMockEvaluation({
      ruleId: "left_knee_alignment",
      severity: "medium",
      currentValue: 45,
      targetValue: 90,
    });

    const events = engine.process(
      "warrior-ii",
      "Warrior II",
      "coaching",
      "CAMERA_READY",
      evaluation
    );

    const correctionEvent = events.find((e) => e.type === "pose_correction");
    assert.ok(correctionEvent, "Expected pose_correction event to be generated under CAMERA_READY");
    assert.equal(correctionEvent.ruleId, "left_knee_alignment");
  });

  // TEST 3: Invalid/no pose -> no pose_correction
  it("TEST 3: Does NOT generate pose_correction when pose is invalid or tracking is lost", () => {
    // 3a. Null evaluation
    const eventsNull = engine.process("warrior-ii", "Warrior II", "coaching", "CAMERA_READY", null);
    assert.equal(eventsNull.filter((e) => e.type === "pose_correction").length, 0);

    // 3b. isValid === false
    const invalidEval = createMockEvaluation(
      { ruleId: "left_knee_alignment" },
      { isValid: false }
    );
    const eventsInvalid = engine.process("warrior-ii", "Warrior II", "coaching", "CAMERA_READY", invalidEval);
    assert.equal(eventsInvalid.filter((e) => e.type === "pose_correction").length, 0);

    // 3c. camera state is PARTIAL_BODY
    const validEval = createMockEvaluation({ ruleId: "left_knee_alignment" });
    const eventsPartial = engine.process("warrior-ii", "Warrior II", "coaching", "PARTIAL_BODY", validEval);
    assert.equal(eventsPartial.filter((e) => e.type === "pose_correction").length, 0);
  });

  // TEST 4: Inactive session -> no correction
  it("TEST 4: Does NOT generate pose_correction when session is in inactive lifecycle states", () => {
    const evaluation = createMockEvaluation({ ruleId: "left_knee_alignment" });

    const inactiveStates: ("idle" | "get_ready" | "countdown" | "camera_check" | "hold_still" | "calibrating")[] = [
      "idle",
      "get_ready",
      "countdown",
      "camera_check",
      "hold_still",
      "calibrating",
    ];

    for (const sessionState of inactiveStates) {
      engine.reset();
      const events = engine.process("warrior-ii", "Warrior II", sessionState, "CAMERA_READY", evaluation);
      const corrections = events.filter((e) => e.type === "pose_correction");
      assert.equal(corrections.length, 0, `Expected no correction in sessionState: ${sessionState}`);
    }
  });

  // TEST 5: Repeated same issue -> no correction every frame
  it("TEST 5: Suppresses repeated pose_correction events across subsequent frames with the same uncorrected issue", () => {
    const evaluation = createMockEvaluation({
      ruleId: "left_knee_alignment",
      currentValue: 45,
      targetValue: 90,
    });

    // Frame 1: Initial detection -> should emit pose_correction
    const frame1 = engine.process("warrior-ii", "Warrior II", "coaching", "CAMERA_READY", evaluation);
    assert.equal(frame1.filter((e) => e.type === "pose_correction").length, 1);

    // Frame 2: Same deviation (45) -> should NOT emit pose_correction
    const frame2 = engine.process("warrior-ii", "Warrior II", "coaching", "CAMERA_READY", evaluation);
    assert.equal(frame2.filter((e) => e.type === "pose_correction").length, 0);

    // Frame 3: Slight minor fluctuation (46) -> should NOT emit pose_correction
    const evalFluct = createMockEvaluation({
      ruleId: "left_knee_alignment",
      currentValue: 46,
      targetValue: 90,
    });
    const frame3 = engine.process("warrior-ii", "Warrior II", "coaching", "CAMERA_READY", evalFluct);
    assert.equal(frame3.filter((e) => e.type === "pose_correction").length, 0);
  });

  // TEST 6: Issue improves sufficiently -> emits issue_improving or allows new issue
  it("TEST 6: Emits issue_improving when deviation reduces by >=30% and switches issue upon new failure", () => {
    // Initial: deviation = |40 - 90| = 50
    const eval1 = createMockEvaluation({
      ruleId: "left_knee_alignment",
      currentValue: 40,
      targetValue: 90,
    });
    engine.process("warrior-ii", "Warrior II", "coaching", "CAMERA_READY", eval1);

    // Improvement: currentValue = 76 -> deviation = |76 - 90| = 14 (< 50 * 0.7 = 35) -> 72% reduction!
    const eval2 = createMockEvaluation({
      ruleId: "left_knee_alignment",
      currentValue: 76,
      targetValue: 90,
    });
    const frame2 = engine.process("warrior-ii", "Warrior II", "coaching", "CAMERA_READY", eval2);
    const improving = frame2.find((e) => e.type === "issue_improving");
    assert.ok(improving, "Expected issue_improving event after >=30% posture improvement");
    assert.equal(improving.ruleId, "left_knee_alignment");

    // New issue: arm alignment fails -> should emit new pose_correction
    const evalNewIssue = createMockEvaluation({
      ruleId: "arms_horizontal",
      currentValue: 30,
      targetValue: 0,
    });
    const frame3 = engine.process("warrior-ii", "Warrior II", "coaching", "CAMERA_READY", evalNewIssue);
    const newCorrection = frame3.find((e) => e.type === "pose_correction");
    assert.ok(newCorrection, "Expected new pose_correction when active rule changes");
    assert.equal(newCorrection.ruleId, "arms_horizontal");
  });

  // TEST 7: Actual safety issue -> safety_warning
  it("TEST 7: Generates safety_warning event when an explicit safety issue (isSafety === true) occurs", () => {
    const safetyEvaluation = createMockEvaluation({
      ruleId: "spine_hyperextension",
      severity: "high",
      isSafety: true,
      feedback: "Ease off your lower back immediately.",
    });

    const events = engine.process("warrior-ii", "Warrior II", "coaching", "CAMERA_READY", safetyEvaluation);
    const safetyEvent = events.find((e) => e.type === "safety_warning");
    assert.ok(safetyEvent, "Expected safety_warning event for isSafety === true");
    assert.equal(safetyEvent.ruleId, "spine_hyperextension");
  });

  // TEST 8: Normal high-severity form issue -> pose_correction
  it("TEST 8: Generates standard pose_correction for high-severity form errors that are not safety hazards (isSafety === false)", () => {
    const highSeverityFormEval = createMockEvaluation({
      ruleId: "front_knee_past_ankle",
      severity: "high",
      isSafety: false,
      feedback: "Stack your front knee directly over your ankle.",
    });

    const events = engine.process("warrior-ii", "Warrior II", "coaching", "FULL_BODY_DETECTED", highSeverityFormEval);
    const correctionEvent = events.find((e) => e.type === "pose_correction");
    const safetyEvent = events.find((e) => e.type === "safety_warning");

    assert.ok(correctionEvent, "Expected pose_correction for high-severity non-safety form issue");
    assert.equal(safetyEvent, undefined, "Expected NO safety_warning for non-safety form issue");
    assert.equal(correctionEvent.ruleId, "front_knee_past_ankle");
    assert.equal(correctionEvent.severity, "high");
  });
});
