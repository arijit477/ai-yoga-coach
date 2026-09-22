import { CoachDecisionEngine } from "../CoachDecisionEngine";
import { CoachingEventBuilder } from "../CoachingEventBuilder";
import type { CoachingEvent } from "../voice.types";
import type { PoseIssue } from "../../types/pose-rules";

// Simple test harness
function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`[TEST FAILED] ${message}`);
  }
  console.log(`[PASS] ${message}`);
}

async function runTests() {
  console.log("=== RUNNING VOICE AGENT & DISPATCHER UNIT TESTS ===");

  const dispatchedEvents: CoachingEvent[] = [];
  const mockAgent = {
    sendCoachingEvent: (event: CoachingEvent) => {
      dispatchedEvents.push(event);
    },
  } as any;

  const dispatcher = new CoachDecisionEngine({
    cooldownMs: 1000,
    repeatSameRuleCooldownMs: 2500,
  });

  // 1. POSE STARTED EVENT
  const startEvent = CoachingEventBuilder.buildPoseStartedEvent("warrior-ii", "Warrior II");
  const d1 = dispatcher.evaluate(startEvent);
  const d1Pass = d1?.shouldSpeak;
  assert(d1Pass === true, "First pose_started event is dispatched");
  if (d1Pass) mockAgent.sendCoachingEvent(startEvent);
  assert(dispatchedEvents.length === 1, "Agent received pose_started");

  // Duplicate pose_started suppression
  const d1Repeat = dispatcher.evaluate(startEvent);
  assert(d1Repeat?.shouldSpeak === false, "Consecutive pose_started is suppressed");
  assert(dispatchedEvents.length === 1, "No duplicate pose_started dispatched");

  // 2. POSE CORRECTION WITH COOLDOWN AND DUPLICATE SUPPRESSION
  const kneeIssue: PoseIssue = {
    ruleId: "warrior_ii_front_knee_angle",
    ruleName: "Front Knee Angle",
    severity: "medium",
    metric: "angle",
    currentValue: 72,
    targetValue: 90,
    min: 80,
    max: 105,
    feedback: "Bend your front knee toward a comfortable 90-degree position.",
  };

  const corrEvent1 = CoachingEventBuilder.buildPoseCorrectionEvent("warrior-ii", "Warrior II", kneeIssue, 68);
  const d2 = dispatcher.evaluate(corrEvent1);
  const d2Pass = d2?.shouldSpeak;
  assert(d2Pass === true, "First knee correction is dispatched");
  if (d2Pass) mockAgent.sendCoachingEvent(corrEvent1);
  assert(dispatchedEvents.length === 2, "Agent received knee correction");

  // Immediate repeat within baseline cooldown (<1000ms)
  const d2RepeatImmediate = dispatcher.evaluate(corrEvent1);
  assert(d2RepeatImmediate?.shouldSpeak === false, "Immediate duplicate knee correction is suppressed by baseline cooldown");

  // 3. SEVERITY PREEMPTION (High severity preempts medium baseline cooldown)
  const severeBackIssue: PoseIssue = {
    ruleId: "warrior_ii_torso_angle",
    ruleName: "Torso Vertical Angle",
    severity: "high",
    metric: "angle",
    currentValue: 65,
    targetValue: 90,
    min: 80,
    max: 100,
    feedback: "Keep your torso vertical rather than leaning forward.",
  };

  const highSeverityEvent = CoachingEventBuilder.buildPoseCorrectionEvent("warrior-ii", "Warrior II", severeBackIssue, 60);
  const d3 = dispatcher.evaluate(highSeverityEvent);
  const d3Pass = d3?.shouldSpeak;
  assert(d3Pass === true, "High severity correction preempts active cooldown of medium severity");
  if (d3Pass) mockAgent.sendCoachingEvent(highSeverityEvent);
  assert(dispatchedEvents.length === 3, "Agent received high severity correction");

  // 4. SAFETY WARNING ALWAYS PASSES THROUGH IMMEDIATELY
  const safetyIssue: PoseIssue = {
    ruleId: "warrior_ii_knee_safety",
    ruleName: "Knee Hyperextension Safety",
    severity: "high",
    metric: "angle",
    currentValue: 185,
    targetValue: 90,
    feedback: "Ease out of the pose immediately to protect your knee.",
  };
  const safetyEvent = CoachingEventBuilder.buildSafetyWarningEvent("warrior-ii", "Warrior II", safetyIssue, 40);
  const d4 = dispatcher.evaluate(safetyEvent);
  const d4Pass = d4?.shouldSpeak;
  assert(d4Pass === true, "Safety warning passes through immediately");
  if (d4Pass) mockAgent.sendCoachingEvent(safetyEvent);
  assert(dispatchedEvents.length === 4, "Agent received safety warning");

  // 5. GOOD FORM EVENT ON STATE TRANSITION
  const goodFormEvent = CoachingEventBuilder.buildGoodFormEvent("warrior-ii", "Warrior II", 92);
  const d5 = dispatcher.evaluate(goodFormEvent);
  const d5Pass = d5?.shouldSpeak;
  assert(d5Pass === true, "Good form event is dispatched on transition");
  if (d5Pass) mockAgent.sendCoachingEvent(goodFormEvent);
  assert(dispatchedEvents.length === 5, "Agent received good form event");

  // Good form repeat suppression
  const d5Repeat = dispatcher.evaluate(goodFormEvent);
  assert(d5Repeat?.shouldSpeak === false, "Duplicate good form event is suppressed");

  // 6. POSE HELD AND COMPLETED
  const heldEvent = CoachingEventBuilder.buildPoseHeldEvent("warrior-ii", "Warrior II", 94);
  const d6 = dispatcher.evaluate(heldEvent);
  assert(d6?.shouldSpeak === true, "Pose held event is dispatched");

  const completedEvent = CoachingEventBuilder.buildPoseCompletedEvent("warrior-ii", "Warrior II", 96);
  const d7 = dispatcher.evaluate(completedEvent);
  assert(d7?.shouldSpeak === true, "Pose completed event is dispatched");

  const d7Repeat = dispatcher.evaluate(completedEvent);
  assert(d7Repeat?.shouldSpeak === false, "Pose completed duplicate is suppressed");

  console.log("=== ALL UNIT TESTS PASSED SUCCESSFULLY ===");
}

runTests().catch((err) => {
  console.error("Test execution error:", err);
});

