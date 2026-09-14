import { CoachingEventDispatcher } from "../CoachingEventDispatcher";
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

  const dispatcher = new CoachingEventDispatcher({
    cooldownMs: 1000,
    repeatSameRuleCooldownMs: 2500,
  });
  dispatcher.setAgent(mockAgent);

  // 1. POSE STARTED EVENT
  const startEvent = CoachingEventBuilder.buildPoseStartedEvent("warrior-ii", "Warrior II");
  const d1 = dispatcher.dispatch(startEvent);
  assert(d1 === true, "First pose_started event is dispatched");
  assert(dispatchedEvents.length === 1, "Agent received pose_started");

  // Duplicate pose_started suppression
  const d1Repeat = dispatcher.dispatch(startEvent);
  assert(d1Repeat === false, "Consecutive pose_started is suppressed");
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
  const d2 = dispatcher.dispatch(corrEvent1);
  assert(d2 === true, "First knee correction is dispatched");
  assert(dispatchedEvents.length === 2, "Agent received knee correction");

  // Immediate repeat within baseline cooldown (<1000ms)
  const d2RepeatImmediate = dispatcher.dispatch(corrEvent1);
  assert(d2RepeatImmediate === false, "Immediate duplicate knee correction is suppressed by baseline cooldown");

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
  const d3 = dispatcher.dispatch(highSeverityEvent);
  assert(d3 === true, "High severity correction preempts active cooldown of medium severity");
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
  const d4 = dispatcher.dispatch(safetyEvent);
  assert(d4 === true, "Safety warning passes through immediately");
  assert(dispatchedEvents.length === 4, "Agent received safety warning");

  // 5. GOOD FORM EVENT ON STATE TRANSITION
  const goodFormEvent = CoachingEventBuilder.buildGoodFormEvent("warrior-ii", "Warrior II", 92);
  const d5 = dispatcher.dispatch(goodFormEvent);
  assert(d5 === true, "Good form event is dispatched on transition");
  assert(dispatchedEvents.length === 5, "Agent received good form event");

  // Good form repeat suppression
  const d5Repeat = dispatcher.dispatch(goodFormEvent);
  assert(d5Repeat === false, "Duplicate good form event is suppressed");

  // 6. POSE HELD AND COMPLETED
  const heldEvent = CoachingEventBuilder.buildPoseHeldEvent("warrior-ii", "Warrior II", 94);
  const d6 = dispatcher.dispatch(heldEvent);
  assert(d6 === true, "Pose held event is dispatched");

  const completedEvent = CoachingEventBuilder.buildPoseCompletedEvent("warrior-ii", "Warrior II", 96);
  const d7 = dispatcher.dispatch(completedEvent);
  assert(d7 === true, "Pose completed event is dispatched");

  const d7Repeat = dispatcher.dispatch(completedEvent);
  assert(d7Repeat === false, "Pose completed duplicate is suppressed");

  console.log("=== ALL UNIT TESTS PASSED SUCCESSFULLY ===");
}

runTests().catch((err) => {
  console.error("Test execution error:", err);
});

