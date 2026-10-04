import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { mapCoachingEventToIntent } from "../CoachingIntentMapper";
import { getCoachingIntentInstruction } from "../CoachingIntentInstructions";
import { VoiceCoachingOrchestrator } from "../VoiceCoachingOrchestrator";
import { RealtimeVoiceAgent } from "../RealtimeVoiceAgent";
import type { CoachingEvent } from "../voice.types";

describe("Phase 4A Coaching Intent & Human-Like Behavioral Mapping", () => {
  const createMockEvent = (type: CoachingEvent["type"], extra: Partial<CoachingEvent> = {}): CoachingEvent => ({
    id: `evt_${Date.now()}`,
    type,
    timestamp: Date.now(),
    asanaId: "warrior-ii",
    asanaName: "Warrior II",
    ...extra,
  });

  // 1. Event to Intent Mapping Matrix
  it("1. Maps all core coaching event types to semantic coaching intents", () => {
    assert.equal(mapCoachingEventToIntent(createMockEvent("pose_started")).intent, "GUIDE_ENTRY");
    assert.equal(mapCoachingEventToIntent(createMockEvent("step_guidance")).intent, "GUIDE_ENTRY");
    assert.equal(mapCoachingEventToIntent(createMockEvent("calibration_complete")).intent, "GUIDE_ENTRY");
    assert.equal(mapCoachingEventToIntent(createMockEvent("pose_correction")).intent, "CORRECT");
    assert.equal(mapCoachingEventToIntent(createMockEvent("issue_improving")).intent, "ACKNOWLEDGE_IMPROVEMENT");
    assert.equal(mapCoachingEventToIntent(createMockEvent("issue_resolved")).intent, "CONFIRM_RESOLUTION");
    assert.equal(mapCoachingEventToIntent(createMockEvent("good_form")).intent, "CONFIRM_GOOD_FORM");
    assert.equal(mapCoachingEventToIntent(createMockEvent("pose_held")).intent, "ENCOURAGE_HOLD");
    assert.equal(mapCoachingEventToIntent(createMockEvent("hold_countdown")).intent, "ENCOURAGE_HOLD");
    assert.equal(mapCoachingEventToIntent(createMockEvent("pose_completed")).intent, "CELEBRATE_COMPLETION");
    assert.equal(mapCoachingEventToIntent(createMockEvent("safety_warning")).intent, "SAFETY_WARNING");
  });

  // 2. Intent-specific instructions builder
  it("2. Returns targeted prompt instructions for each intent type", () => {
    const guideInst = getCoachingIntentInstruction("GUIDE_ENTRY");
    assert.ok(guideInst.includes("Guide the user physically"));

    const correctInst = getCoachingIntentInstruction("CORRECT");
    assert.ok(correctInst.includes("Give one concise, actionable correction"));
    assert.ok(correctInst.includes("Prioritize the detected issue"));

    const improveInst = getCoachingIntentInstruction("ACKNOWLEDGE_IMPROVEMENT");
    assert.ok(improveInst.includes("Acknowledge the user's improvement"));

    const resolveInst = getCoachingIntentInstruction("CONFIRM_RESOLUTION");
    assert.ok(resolveInst.includes("Confirm briefly that the detected issue has been resolved"));

    const goodFormInst = getCoachingIntentInstruction("CONFIRM_GOOD_FORM");
    assert.ok(goodFormInst.includes("Give brief positive confirmation"));

    const holdInst = getCoachingIntentInstruction("ENCOURAGE_HOLD");
    assert.ok(holdInst.includes("Encourage the user briefly while they hold"));

    const completeInst = getCoachingIntentInstruction("CELEBRATE_COMPLETION");
    assert.ok(completeInst.includes("Explicitly acknowledge that the asana has been completed"));

    const safetyInst = getCoachingIntentInstruction("SAFETY_WARNING");
    assert.ok(safetyInst.includes("Prioritize the safety instruction immediately"));
  });

  // 3. VoiceCoachingOrchestrator includes intent in decision
  it("3. VoiceCoachingOrchestrator attaches mapped intent to VoiceCoachingDecision", () => {
    const orchestrator = new VoiceCoachingOrchestrator();

    const corrEvt = createMockEvent("pose_correction", {
      feedback: "Lower your hips and bend your front knee to 90 degrees.",
      joint: "left_knee",
      severity: "high",
    });
    const decision = orchestrator.evaluate(corrEvt);

    assert.equal(decision.intent, "CORRECT");
    assert.equal(decision.shouldSpeak, true);
    assert.equal(decision.cueType, "correction");

    const compEvt = createMockEvent("pose_completed");
    const compDecision = orchestrator.evaluate(compEvt, Date.now() + 10000);

    assert.equal(compDecision.intent, "CELEBRATE_COMPLETION");
    assert.equal(compDecision.shouldSpeak, true);
    assert.equal(compDecision.cueType, "completion");
  });

  // 4. RealtimeVoiceAgent prompt includes COACHING INTENT and vision data
  it("4. RealtimeVoiceAgent includes COACHING INTENT and vision context in response.create instructions", () => {
    const sentEvents: any[] = [];
    const mockDc = {
      readyState: "open",
      send: (data: string) => {
        sentEvents.push(JSON.parse(data));
      },
    };

    const agent = new RealtimeVoiceAgent();
    (agent as any).dc = mockDc;
    (agent as any).hasActiveServerResponse = false;
    (agent as any).currentCoachId = "alice";

    agent.updateSessionContext({
      coach: "alice",
      asanaId: "warrior-ii",
      asanaName: "Warrior II",
      isSessionActive: true,
      primaryIssue: {
        ruleId: "warrior-ii.front_knee.angle",
        joint: "front_knee",
        severity: "high",
        currentValue: 120,
        targetMin: 90,
        targetMax: 100,
        feedback: "Bend your front knee to 90 degrees.",
      },
    });

    const event = createMockEvent("pose_correction", {
      feedback: "Bend your front knee to 90 degrees.",
      ruleId: "warrior-ii.front_knee.angle",
      joint: "front_knee",
      severity: "high",
      currentValue: 120,
      targetMin: 90,
      targetMax: 100,
    });

    agent.sendCoachingEvent(event);

    assert.equal(sentEvents.length, 1);
    const payload = sentEvents[0];
    assert.equal(payload.type, "response.create");
    const instructions = payload.response.instructions;

    assert.ok(instructions.includes("COACHING INTENT:\nCORRECT") || instructions.includes("COACHING INTENT:"));
    assert.ok(instructions.includes("Give one concise, actionable correction"));
    assert.ok(instructions.includes("Coach Alice"));
    assert.ok(instructions.includes("Warrior II"));
    assert.ok(instructions.includes("Bend your front knee to 90 degrees."));
  });
});
