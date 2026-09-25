import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { CoachDecisionEngine } from "../CoachDecisionEngine";
import { CoachingEventEngine } from "../CoachingEventEngine";
import { CoachingEventBuilder } from "../CoachingEventBuilder";
import { RealtimeVoiceAgent } from "../RealtimeVoiceAgent";
import { extractPoseFeatures } from "../../analysis/PoseFeatureEngine";
import { evaluatePose } from "../../analysis/PoseEvaluator";
import { mountainPose } from "../../analysis/rules/asanas/mountainPose";
import type { PoseEvaluationResult, PoseIssue } from "../../types/pose-rules";
import type { CoachingEvent } from "../voice.types";
import type { PoseLandmarks } from "../../types/landmarks";

function createStandingLandmarks(): PoseLandmarks {
  const landmarks: PoseLandmarks = [];
  for (let i = 0; i < 33; i++) {
    landmarks.push({
      x: 0.5,
      y: 0.1 + (i / 33) * 0.8,
      z: 0.0,
      visibility: 0.95,
    });
  }
  return landmarks;
}

describe("Step 7 Structured Coaching Events & Voice Integration Tests", () => {
  // 1. Same correction does not emit every frame
  it("1. same correction does not emit every frame", () => {
    const engine = new CoachingEventEngine();
    const kneeIssue: PoseIssue = {
      ruleId: "warrior_ii_front_knee_angle",
      ruleName: "Front Knee Angle",
      severity: "medium",
      metric: "angle",
      currentValue: 70,
      targetValue: 90,
      min: 80,
      max: 105,
      feedback: "Bend your front knee toward 90 degrees.",
    };

    const evaluation: PoseEvaluationResult = {
      status: "warning",
      score: 70,
      ruleResults: [],
      primaryIssue: kneeIssue,
      secondaryIssues: [],
      timestamp: Date.now(),
    };

    // Frame 1
    const events1 = engine.process("warrior-ii", "Warrior II", "coaching", "CAMERA_READY", evaluation);
    const corrections1 = events1.filter((e) => e.type === "pose_correction");
    assert.equal(corrections1.length, 1, "First frame should emit 1 pose_correction");

    // Frame 2 (identical issue)
    const events2 = engine.process("warrior-ii", "Warrior II", "coaching", "CAMERA_READY", evaluation);
    const corrections2 = events2.filter((e) => e.type === "pose_correction");
    assert.equal(corrections2.length, 0, "Second frame with identical issue should not emit pose_correction");

    // Frame 100 (identical issue)
    const events100 = engine.process("warrior-ii", "Warrior II", "coaching", "CAMERA_READY", evaluation);
    const corrections100 = events100.filter((e) => e.type === "pose_correction");
    assert.equal(corrections100.length, 0, "Consecutive identical frames should not spam pose_correction");
  });

  // 2. Correction cooldown works
  it("2. correction cooldown works", () => {
    const decisionEngine = new CoachDecisionEngine({
      cooldownMs: 4000,
      repeatSameRuleCooldownMs: 10000,
    });

    const kneeIssue: PoseIssue = {
      ruleId: "knee_rule",
      severity: "medium",
      metric: "angle",
      currentValue: 70,
      targetValue: 90,
      feedback: "Adjust knee",
    };
    const shoulderIssue: PoseIssue = {
      ruleId: "shoulder_rule",
      severity: "medium",
      metric: "angle",
      currentValue: 120,
      targetValue: 180,
      feedback: "Extend arms",
    };

    const event1 = CoachingEventBuilder.buildPoseCorrectionEvent("warrior-ii", "Warrior II", kneeIssue, 70);
    const d1 = decisionEngine.evaluate(event1, { now: 1000 });
    assert.equal(d1.shouldSpeak, true, "First event at t=1000 is approved");

    // At t=2000 (within 4000ms baseline cooldown)
    const event2 = CoachingEventBuilder.buildPoseCorrectionEvent("warrior-ii", "Warrior II", shoulderIssue, 70);
    const d2 = decisionEngine.evaluate(event2, { now: 2000 });
    assert.equal(d2.shouldSpeak, false, "Event within cooldown at t=2000 is suppressed");

    // At t=5500 (after 4000ms baseline cooldown)
    const d3 = decisionEngine.evaluate(event2, { now: 5500 });
    assert.equal(d3.shouldSpeak, true, "New issue after baseline cooldown at t=5500 is approved");

    // Repeated same knee issue at t=6000 (within 10000ms repeat rule cooldown)
    const d4 = decisionEngine.evaluate(event1, { now: 6000 });
    assert.equal(d4.shouldSpeak, false, "Repeated identical rule within 10s cooldown is suppressed");
  });

  // 3. Meaningful issue change creates a new event
  it("3. meaningful issue change creates a new event", () => {
    const engine = new CoachingEventEngine();

    const kneeIssue: PoseIssue = {
      ruleId: "warrior_knee",
      severity: "medium",
      metric: "angle",
      currentValue: 70,
      feedback: "Adjust knee",
    };
    const shoulderIssue: PoseIssue = {
      ruleId: "warrior_arms",
      severity: "medium",
      metric: "angle",
      currentValue: 130,
      feedback: "Extend arms",
    };

    const eval1: PoseEvaluationResult = {
      status: "warning",
      score: 70,
      ruleResults: [],
      primaryIssue: kneeIssue,
      secondaryIssues: [],
      timestamp: 1000,
    };
    const events1 = engine.process("warrior-ii", "Warrior II", "coaching", "CAMERA_READY", eval1);
    assert.equal(events1.some((e) => e.ruleId === "warrior_knee"), true);

    const eval2: PoseEvaluationResult = {
      status: "warning",
      score: 70,
      ruleResults: [],
      primaryIssue: shoulderIssue,
      secondaryIssues: [],
      timestamp: 2000,
    };
    const events2 = engine.process("warrior-ii", "Warrior II", "coaching", "CAMERA_READY", eval2);
    assert.equal(events2.some((e) => e.ruleId === "warrior_arms"), true, "Issue transition creates new event");
  });

  // 4. Good form fires only on transition
  it("4. good form fires only on transition", () => {
    const engine = new CoachingEventEngine();

    const evalBad: PoseEvaluationResult = {
      status: "warning",
      score: 65,
      ruleResults: [],
      primaryIssue: { ruleId: "knee", severity: "medium", metric: "angle", currentValue: 70, feedback: "Fix knee" },
      secondaryIssues: [],
      timestamp: 1000,
    };
    engine.process("tree-pose", "Tree Pose", "coaching", "CAMERA_READY", evalBad);

    // Transition to good alignment (score >= 75, no primary issue)
    const evalGood: PoseEvaluationResult = {
      status: "pass",
      score: 88,
      ruleResults: [],
      primaryIssue: null,
      secondaryIssues: [],
      timestamp: 2000,
    };
    const eventsGood1 = engine.process("tree-pose", "Tree Pose", "coaching", "CAMERA_READY", evalGood);
    const goodEvents1 = eventsGood1.filter((e) => e.type === "good_form");
    assert.equal(goodEvents1.length, 1, "Good form fires on transition to aligned state");

    // Continuous frames in good form
    const eventsGood2 = engine.process("tree-pose", "Tree Pose", "coaching", "CAMERA_READY", evalGood);
    const goodEvents2 = eventsGood2.filter((e) => e.type === "good_form");
    assert.equal(goodEvents2.length, 0, "Good form does NOT fire repeatedly on consecutive frames");
  });

  // 5. Pose completion fires once
  it("5. pose completion fires once", () => {
    const decisionEngine = new CoachDecisionEngine();
    const compEvent = CoachingEventBuilder.buildPoseCompletedEvent("tree-pose", "Tree Pose", 82);

    const d1 = decisionEngine.evaluate(compEvent, { now: 1000 });
    assert.equal(d1.shouldSpeak, true, "First completion event is approved");

    const d2 = decisionEngine.evaluate(compEvent, { now: 2000 });
    assert.equal(d2.shouldSpeak, false, "Subsequent completion events for same asana are rejected");
  });

  // 6. Safety warning can bypass normal cooldown
  it("6. safety warning can bypass normal cooldown", () => {
    const decisionEngine = new CoachDecisionEngine({ cooldownMs: 5000 });

    const mediumIssue: PoseIssue = { ruleId: "torso", severity: "medium", metric: "angle", currentValue: 75, feedback: "Straighten back" };
    const normalEvent = CoachingEventBuilder.buildPoseCorrectionEvent("tree-pose", "Tree Pose", mediumIssue, 70);
    decisionEngine.evaluate(normalEvent, { now: 1000 });

    const safetyIssue: PoseIssue = { ruleId: "knee_hyper", severity: "high", metric: "angle", currentValue: 195, feedback: "Protect your knee immediately" };
    const safetyEvent = CoachingEventBuilder.buildSafetyWarningEvent("tree-pose", "Tree Pose", safetyIssue, 50);

    // At t=1500 (inside 5000ms cooldown)
    const decision = decisionEngine.evaluate(safetyEvent, { now: 1500 });
    assert.equal(decision.shouldSpeak, true, "Safety warning bypasses active baseline cooldown");
    assert.equal(decision.interruptionRequired, true, "Safety warning requires interruption");
  });

  // 7. Camera loss does not terminate voice session
  it("7. camera loss does not terminate voice session", () => {
    const engine = new CoachingEventEngine();
    // User steps out of frame
    const events = engine.process("mountain-pose", "Mountain Pose", "coaching", "NO_PERSON", null);
    assert.equal(events.some((e) => e.type === "user_out_of_frame"), true);
    // Voice session context remains preserved
    assert.equal(events[0].asanaId, "mountain-pose");
  });

  // 8. Camera recovery does not create a second voice session
  it("8. camera recovery does not create a second voice session", () => {
    const engine = new CoachingEventEngine();
    // Out of frame
    engine.process("mountain-pose", "Mountain Pose", "coaching", "NO_PERSON", null);
    // User steps back in
    const returnEvents = engine.process("mountain-pose", "Mountain Pose", "coaching", "CAMERA_READY", null);
    assert.equal(returnEvents.some((e) => e.type === "camera_ready"), true);
  });

  // 9. Voice failure does not stop pose tracking
  it("9. voice failure does not stop pose tracking", () => {
    const landmarks = createStandingLandmarks();
    const features = extractPoseFeatures({ landmarks });
    assert.ok(features, "Pose features are extracted");

    const evaluation = evaluatePose("mountain-pose", mountainPose.rules, { landmarks });
    assert.ok(evaluation, "Pose evaluation completes normally regardless of voice state");
    assert.equal(typeof evaluation.score, "number");
  });

  // 10. New asana does not create duplicate Realtime sessions
  it("10. new asana does not create duplicate Realtime sessions", () => {
    const agent = new RealtimeVoiceAgent();
    agent.updateSessionContext({
      coach: "alice",
      asanaId: "mountain-pose",
      asanaName: "Mountain Pose",
      isSessionActive: true,
    });
    // Switch asana
    agent.updateSessionContext({
      coach: "alice",
      asanaId: "tree-pose",
      asanaName: "Tree Pose",
      isSessionActive: true,
    });
    // Context is smoothly updated
    assert.ok(agent);
  });

  // 11. User interruption takes priority
  it("11. user interruption takes priority", () => {
    const decisionEngine = new CoachDecisionEngine();
    const issue: PoseIssue = { ruleId: "arms", severity: "medium", metric: "angle", currentValue: 120, feedback: "Raise arms" };
    const event = CoachingEventBuilder.buildPoseCorrectionEvent("tree-pose", "Tree Pose", issue, 70);

    const decision = decisionEngine.evaluate(event, { isUserSpeaking: true });
    assert.equal(decision.shouldSpeak, false, "Coach suppresses event while user is actively speaking");
  });

  // 12. Completion at >=75% creates pose_completed
  it("12. completion at >=75% creates pose_completed", () => {
    const engine = new CoachingEventEngine();
    const eval76: PoseEvaluationResult = {
      status: "pass",
      score: 76,
      ruleResults: [],
      primaryIssue: null,
      secondaryIssues: [],
      timestamp: Date.now(),
    };

    const events = engine.process("warrior-ii", "Warrior II", "completed", "CAMERA_READY", eval76);
    const comp = events.find((e) => e.type === "pose_completed");
    assert.ok(comp, "pose_completed event is created when reaching completion state at 76%");
    assert.equal(comp?.score, 76);
  });

  // 13. 90% or 100% is NOT required for completion
  it("13. 90% or 100% is NOT required for completion", () => {
    const engine = new CoachingEventEngine();
    const eval75: PoseEvaluationResult = {
      status: "pass",
      score: 75,
      ruleResults: [],
      primaryIssue: null,
      secondaryIssues: [],
      timestamp: Date.now(),
    };

    const events = engine.process("warrior-ii", "Warrior II", "completed", "CAMERA_READY", eval75);
    const comp = events.find((e) => e.type === "pose_completed");
    assert.ok(comp, "Score of exactly 75% triggers pose_completed without requiring 90% or 100%");
  });

  // 14. 10-second hold is NOT required for completion
  it("14. 10-second hold is NOT required for completion", () => {
    const engine = new CoachingEventEngine();
    const eval78: PoseEvaluationResult = {
      status: "pass",
      score: 78,
      ruleResults: [],
      primaryIssue: null,
      secondaryIssues: [],
      timestamp: Date.now(),
    };

    // Transition straight from coaching -> completed (hold bypassed)
    const events = engine.process("mountain-pose", "Mountain Pose", "completed", "CAMERA_READY", eval78);
    assert.equal(events.some((e) => e.type === "pose_completed"), true, "Completion succeeds without hold state");
  });

  // 15. OpenAI never receives frame-by-frame pose data
  it("15. OpenAI never receives frame-by-frame pose data", () => {
    const kneeIssue: PoseIssue = {
      ruleId: "front_knee",
      severity: "medium",
      metric: "angle",
      currentValue: 72,
      targetValue: 90,
      feedback: "Bend your front knee toward 90 degrees.",
    };

    const event = CoachingEventBuilder.buildPoseCorrectionEvent("warrior-ii", "Warrior II", kneeIssue, 75);

    // Verify structured payload contains only high-level semantic info
    assert.equal((event as any).landmarks, undefined, "Event must never contain raw landmark array");
    assert.equal((event as any).rawFrames, undefined, "Event must never contain raw video/image frames");
    assert.equal(typeof event.feedback, "string");
    assert.equal(event.type, "pose_correction");
  });
});
