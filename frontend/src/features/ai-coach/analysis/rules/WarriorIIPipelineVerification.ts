import { warriorIIRules } from "./WarriorIIRules";
import { evaluatePose } from "../PoseEvaluator";
import { prioritizePoseIssues } from "../FeedbackPrioritizer";
import { FeedbackStabilizer } from "../FeedbackStabilizer";
import { CoachingEventBuilder } from "../../voice/CoachingEventBuilder";
import { CoachingEventDispatcher } from "../../voice/CoachingEventDispatcher";
import type { CoachingEvent } from "../../voice/voice.types";

export function runWarriorIIVoicePipelineVerification() {
  console.log("--- Starting Warrior II Voice Pipeline Verification ---");

  // Mock landmarks generator
  const createMockLandmarks = (rightKneeAngleDeg: number) => {
    const lms: Array<{ x: number; y: number; z: number; visibility: number }> = [];
    for (let i = 0; i < 33; i++) {
      lms.push({ x: 0.5, y: 0.5, z: 0, visibility: 0.9 });
    }
    // Landmark 24: right hip
    lms[24] = { x: 0.5, y: 0.2, z: 0, visibility: 0.9 };
    // Landmark 26: right knee (vertex)
    lms[26] = { x: 0.5, y: 0.5, z: 0, visibility: 0.9 };
    // Landmark 28: right ankle
    // Vector BA (knee to hip) is (0, -0.3, 0)
    // For angle theta between BA and BC:
    // angle = 180 means straight down (0, +0.3, 0)
    // angle = 90 means orthogonal (0.3, 0, 0)
    const angleRad = (rightKneeAngleDeg * Math.PI) / 180;
    lms[28] = {
      x: 0.5 + 0.3 * Math.sin(angleRad),
      y: 0.5 - 0.3 * Math.cos(angleRad),
      z: 0,
      visibility: 0.9,
    };

    // Left leg at 90 deg (good within 80-100)
    lms[23] = { x: 0.2, y: 0.2, z: 0, visibility: 0.9 }; // left hip
    lms[25] = { x: 0.2, y: 0.5, z: 0, visibility: 0.9 }; // left knee
    lms[27] = { x: 0.5, y: 0.5, z: 0, visibility: 0.9 }; // left ankle -> exactly 90 deg!

    // Shoulders level (11 and 12 at same y)
    lms[11] = { x: 0.3, y: 0.1, z: 0, visibility: 0.9 };
    lms[12] = { x: 0.5, y: 0.1, z: 0, visibility: 0.9 };

    // Hips level (23 and 24 at same y)
    lms[23].y = 0.2;
    lms[24].y = 0.2;

    return {
      landmarks: lms,
      worldLandmarks: lms,
    };
  };

  const dispatchedEvents: CoachingEvent[] = [];
  const mockVoiceAgent: any = {
    sendCoachingEvent: (e: CoachingEvent) => {
      dispatchedEvents.push(e);
    },
  };

  const dispatcher = new CoachingEventDispatcher({
    cooldownMs: 4000,
    repeatSameRuleCooldownMs: 10000,
  });
  dispatcher.setAgent(mockVoiceAgent);

  const stabilizer = new FeedbackStabilizer({
    requiredFrames: 3,
    releaseFrames: 2,
  });

  // 1. Enter Pose
  const startEvent = CoachingEventBuilder.buildPoseStartedEvent("warrior-ii", "Warrior II");
  const startDispatched = dispatcher.dispatch(startEvent);
  console.assert(startDispatched, "Start event should dispatch");
  console.assert(dispatchedEvents.length === 1, "Dispatched count should be 1");

  // 2. Simulate frames where right knee is incorrect (164 deg instead of 80-100)
  for (let f = 1; f <= 5; f++) {
    const ctx = createMockLandmarks(164);
    const evalResult = evaluatePose("warrior-ii", warriorIIRules, ctx);
    const stable = stabilizer.stabilize(evalResult);

    if (stable.issues.length > 0) {
      const primary = prioritizePoseIssues(stable.issues)[0];
      const corrEvent = CoachingEventBuilder.buildPoseCorrectionEvent(
        "warrior-ii",
        "Warrior II",
        primary,
        stable.score
      );
      dispatcher.dispatch(corrEvent);
    }
  }

  // At frame 3+, stabilizer triggers pose_correction
  console.assert(dispatchedEvents.length === 2, `Should have 2 events total (start + 1 correction), got: ${dispatchedEvents.length}`);
  const corrEvent = dispatchedEvents[1];
  console.assert(corrEvent.type === "pose_correction", "Event type should be pose_correction");
  console.assert(corrEvent.ruleId === "warrior-ii-right-knee-angle", `Rule should be right knee, got: ${corrEvent.ruleId}`);
  console.assert(corrEvent.joint === "rightKnee", `Joint should be rightKnee, got: ${corrEvent.joint}`);

  // 3. Keep knee incorrect and verify cooldown suppression (no spamming)
  for (let f = 1; f <= 10; f++) {
    const ctx = createMockLandmarks(164);
    const evalResult = evaluatePose("warrior-ii", warriorIIRules, ctx);
    const stable = stabilizer.stabilize(evalResult);
    if (stable.issues.length > 0) {
      const primary = prioritizePoseIssues(stable.issues)[0];
      const corrEvent = CoachingEventBuilder.buildPoseCorrectionEvent(
        "warrior-ii",
        "Warrior II",
        primary,
        stable.score
      );
      dispatcher.dispatch(corrEvent);
    }
  }
  console.assert(dispatchedEvents.length === 2, `Cooldown should prevent repeat spamming, got: ${dispatchedEvents.length}`);

  // 4. User corrects knee to 90 deg -> good_form transition
  for (let f = 1; f <= 4; f++) {
    const ctx = createMockLandmarks(90);
    const evalResult = evaluatePose("warrior-ii", warriorIIRules, ctx);
    const stable = stabilizer.stabilize(evalResult);
    if (stable.issues.length === 0) {
      const goodEvent = CoachingEventBuilder.buildGoodFormEvent("warrior-ii", "Warrior II", stable.score);
      dispatcher.dispatch(goodEvent);
    }
  }

  console.assert(dispatchedEvents.length === 3, `Should dispatch good_form event, got: ${dispatchedEvents.length}`);
  const goodEvent = dispatchedEvents[2];
  console.assert(goodEvent.type === "good_form", "Event type should be good_form");

  // 5. Pose held
  const heldEvent = CoachingEventBuilder.buildPoseHeldEvent("warrior-ii", "Warrior II", 95);
  dispatcher.dispatch(heldEvent);
  console.assert(dispatchedEvents.length === 4, `Should dispatch pose_held, got: ${dispatchedEvents.length}`);

  // 6. Pose completed
  const compEvent = CoachingEventBuilder.buildPoseCompletedEvent("warrior-ii", "Warrior II", 98);
  dispatcher.dispatch(compEvent);
  console.assert(dispatchedEvents.length === 5, `Should dispatch pose_completed, got: ${dispatchedEvents.length}`);

  console.log("--- Warrior II Voice Pipeline Verification PASSED successfully! ---");
  return true;
}

runWarriorIIVoicePipelineVerification();
