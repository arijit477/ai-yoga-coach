import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { SessionStateMachine } from "../../session/SessionStateMachine";
import { evaluateCameraReadiness } from "../../motion/CameraReadinessEvaluator";
import { CoachingEventEngine } from "../CoachingEventEngine";
import type { PoseEvaluationResult, PoseIssue } from "../../types/pose-rules";
import type { PoseLandmarks } from "../../types/landmarks";

describe("Phase 4C.8 — Live Coaching Session Lifecycle Regression Tests", () => {
  let stateMachine: SessionStateMachine;
  let engine: CoachingEventEngine;

  beforeEach(() => {
    stateMachine = new SessionStateMachine("idle");
    engine = new CoachingEventEngine();
    engine.reset();
  });

  const create33Landmarks = (visibility: number = 0.9): PoseLandmarks => {
    return Array.from({ length: 33 }, (_, i) => ({
      x: 0.5,
      y: 0.5,
      z: 0.0,
      visibility,
    }));
  };

  const createMockEvaluation = (
    primaryIssue: Partial<PoseIssue> | null,
    options: { score?: number; isValid?: boolean } = {}
  ): PoseEvaluationResult => {
    const formattedPrimary: PoseIssue | null = primaryIssue
      ? {
          ruleId: primaryIssue.ruleId ?? "left_knee_angle",
          ruleName: primaryIssue.ruleName ?? "Left Knee Angle",
          severity: primaryIssue.severity ?? "medium",
          metric: primaryIssue.metric ?? "angle",
          currentValue: primaryIssue.currentValue ?? 45,
          targetValue: primaryIssue.targetValue ?? 90,
          min: primaryIssue.min ?? 85,
          max: primaryIssue.max ?? 95,
          feedback: primaryIssue.feedback ?? "Bend your left knee deeper.",
          joint: primaryIssue.joint ?? "leftKnee",
          isSafety: primaryIssue.isSafety ?? false,
        }
      : null;

    return {
      asanaId: "step-01-prayer-pranamasana",
      score: options.score ?? (primaryIssue ? 60 : 90),
      isValid: options.isValid ?? true,
      primaryIssue: formattedPrimary,
      secondaryIssues: [],
      resolvedIssues: [],
      scoreTrend: "stable",
      stability: 85,
      holdProgress: 0,
      completionEligible: !primaryIssue,
      activeRules: 5,
      evaluatedAt: Date.now(),
    };
  };

  // TEST 1: Camera active + valid full body + session started → session enters coaching
  it("TEST 1: Camera active + valid full body + session started -> session enters coaching", () => {
    const landmarks = create33Landmarks(0.9);
    const readiness = evaluateCameraReadiness(landmarks, { hardwareStatus: "ready" });
    assert.equal(readiness.ready, true);
    assert.equal(readiness.state, "camera_ready");

    // Progression: idle -> camera_check -> hold_still -> calibrating -> coaching
    assert.ok(stateMachine.transition("camera_check", "camera_activated"));
    assert.equal(stateMachine.getState(), "camera_check");

    assert.ok(stateMachine.transition("hold_still", "camera_ready"));
    assert.equal(stateMachine.getState(), "hold_still");

    assert.ok(stateMachine.transition("calibrating", "hold_still_completed"));
    assert.equal(stateMachine.getState(), "calibrating");

    assert.ok(stateMachine.transition("coaching", "calibration_complete"));
    assert.equal(stateMachine.getState(), "coaching");
  });

  // TEST 2: Camera active but no valid pose → session does not enter coaching
  it("TEST 2: Camera active but no valid pose -> session does not enter coaching", () => {
    const readiness = evaluateCameraReadiness(null, { hardwareStatus: "ready" });
    assert.equal(readiness.ready, false);
    assert.equal(readiness.state, "camera_no_pose");

    // Gated coaching processing when no valid pose
    const events = engine.process(
      "step-01-prayer-pranamasana",
      "Pranamasana",
      "camera_check",
      "NO_PERSON",
      null
    );
    const correctionEvents = events.filter((e) => e.type === "pose_correction");
    assert.equal(correctionEvents.length, 0, "Should not produce pose_correction when no pose exists");
  });

  // TEST 3: Partial body → session does not enter coaching
  it("TEST 3: Partial body -> session does not enter coaching", () => {
    // Only head landmarks visible (0-10), torso/legs missing
    const landmarks = create33Landmarks(0.1);
    for (let i = 0; i <= 10; i++) {
      landmarks[i].visibility = 0.9;
    }
    const readiness = evaluateCameraReadiness(landmarks, { hardwareStatus: "ready" });
    assert.equal(readiness.ready, false);
    assert.equal(readiness.state, "camera_partial");

    const evaluation = createMockEvaluation({ ruleId: "arms_alignment", currentValue: 30, targetValue: 90 });
    const events = engine.process(
      "step-01-prayer-pranamasana",
      "Pranamasana",
      "camera_check",
      "PARTIAL_BODY",
      evaluation
    );
    const correctionEvents = events.filter((e) => e.type === "pose_correction");
    assert.equal(correctionEvents.length, 0, "Should not produce pose_correction when body is partial");
  });

  // TEST 4: Coaching state + bad posture → pose_correction is generated
  it("TEST 4: Coaching state + bad posture -> pose_correction is generated", () => {
    stateMachine.reset("coaching");
    const evaluation = createMockEvaluation({
      ruleId: "hands_in_prayer_position",
      severity: "medium",
      currentValue: 35,
      targetValue: 90,
      feedback: "Bring palms together in front of your chest.",
    });

    const events = engine.process(
      "step-01-prayer-pranamasana",
      "Pranamasana",
      "coaching",
      "FULL_BODY_DETECTED",
      evaluation
    );

    const correctionEvent = events.find((e) => e.type === "pose_correction");
    assert.ok(correctionEvent, "Expected pose_correction event");
    assert.equal(correctionEvent.ruleId, "hands_in_prayer_position");
    assert.equal(correctionEvent.feedback, "Bring palms together in front of your chest.");
  });

  // TEST 5: Coaching state + corrected posture → issue_resolved is generated
  it("TEST 5: Coaching state + corrected posture -> issue_resolved is generated", () => {
    stateMachine.reset("coaching");
    // Initial bad posture
    const badEvaluation = createMockEvaluation({
      ruleId: "hands_in_prayer_position",
      currentValue: 35,
      targetValue: 90,
    });
    engine.process(
      "step-01-prayer-pranamasana",
      "Pranamasana",
      "coaching",
      "FULL_BODY_DETECTED",
      badEvaluation
    );

    // Corrected posture (no primary issue)
    const goodEvaluation = createMockEvaluation(null, { score: 92 });
    const resolvedEvents = engine.process(
      "step-01-prayer-pranamasana",
      "Pranamasana",
      "coaching",
      "FULL_BODY_DETECTED",
      goodEvaluation
    );

    const resolvedEvent = resolvedEvents.find((e) => e.type === "issue_resolved");
    assert.ok(resolvedEvent, "Expected issue_resolved event when posture recovers");
    assert.equal(resolvedEvent.ruleId, "hands_in_prayer_position");
  });

  // TEST 6: Correct posture + hold → pose_held is generated
  it("TEST 6: Correct posture + hold -> pose_held is generated", () => {
    stateMachine.reset("coaching");
    assert.ok(stateMachine.transition("holding", "pose_valid_for_completion"));
    assert.equal(stateMachine.getState(), "holding");

    const goodEvaluation = createMockEvaluation(null, { score: 95 });
    const events = engine.process(
      "step-01-prayer-pranamasana",
      "Pranamasana",
      "holding",
      "FULL_BODY_DETECTED",
      goodEvaluation
    );

    const heldEvent = events.find((e) => e.type === "pose_held");
    assert.ok(heldEvent, "Expected pose_held event when entering holding state");
    assert.equal(heldEvent.score, 95);
  });

  // TEST 7: Repeated bad posture → no frame-by-frame correction spam
  it("TEST 7: Repeated bad posture -> no frame-by-frame correction spam", () => {
    stateMachine.reset("coaching");
    const badEvaluation = createMockEvaluation({
      ruleId: "hands_in_prayer_position",
      currentValue: 35,
      targetValue: 90,
    });

    // Frame 1: Generates pose_correction
    const events1 = engine.process(
      "step-01-prayer-pranamasana",
      "Pranamasana",
      "coaching",
      "FULL_BODY_DETECTED",
      badEvaluation
    );
    assert.equal(events1.filter((e) => e.type === "pose_correction").length, 1);

    // Frame 2-5: Same bad posture -> no duplicate pose_correction spam
    for (let frame = 2; frame <= 5; frame++) {
      const duplicateEvents = engine.process(
        "step-01-prayer-pranamasana",
        "Pranamasana",
        "coaching",
        "FULL_BODY_DETECTED",
        badEvaluation
      );
      assert.equal(
        duplicateEvents.filter((e) => e.type === "pose_correction").length,
        0,
        `Frame ${frame} should not emit duplicate pose_correction`
      );
    }
  });
});
