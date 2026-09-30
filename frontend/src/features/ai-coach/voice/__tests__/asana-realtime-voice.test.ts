import { describe, it, beforeEach } from "node:test";
import assert from "node:assert";

import { FeedbackEngine, type FeedbackOutput } from "../../analysis/FeedbackEngine";
import { RealtimeVoiceAgent } from "../RealtimeVoiceAgent";
import { evaluateAsanaPose } from "../../analysis/AsanaPoseEvaluator";
import { getAsanaStartingInstruction } from "../../services/AsanaStartingInstructionService";
import type { PoseLandmarks, Landmark } from "../../types/landmarks";

function createBaseLandmarks(): PoseLandmarks {
  const landmarks: Landmark[] = [];
  for (let i = 0; i < 33; i++) {
    landmarks.push({
      x: 0.5,
      y: 0.5,
      z: 0.0,
      visibility: 0.99,
      presence: 0.99,
    });
  }
  return landmarks;
}

function createFaultyWarriorIILandmarks(): PoseLandmarks {
  const lm = createBaseLandmarks();
  lm[11] = { x: 0.45, y: 0.35, z: 0, visibility: 0.98 };
  lm[12] = { x: 0.55, y: 0.35, z: 0, visibility: 0.98 };
  lm[13] = { x: 0.25, y: 0.35, z: 0, visibility: 0.98 };
  lm[15] = { x: 0.10, y: 0.35, z: 0, visibility: 0.98 };
  lm[14] = { x: 0.75, y: 0.35, z: 0, visibility: 0.98 };
  lm[16] = { x: 0.90, y: 0.35, z: 0, visibility: 0.98 };
  lm[23] = { x: 0.45, y: 0.65, z: 0, visibility: 0.98 };
  lm[24] = { x: 0.55, y: 0.65, z: 0, visibility: 0.98 };
  // Faulty straight front knee (165° instead of 90°)
  lm[25] = { x: 0.35, y: 0.75, z: 0, visibility: 0.98 };
  lm[27] = { x: 0.25, y: 0.85, z: 0, visibility: 0.98 };
  lm[26] = { x: 0.70, y: 0.75, z: 0, visibility: 0.98 };
  lm[28] = { x: 0.85, y: 0.85, z: 0, visibility: 0.98 };
  return lm;
}

function createPerfectWarriorIILandmarks(): PoseLandmarks {
  const lm = createBaseLandmarks();
  lm[11] = { x: 0.45, y: 0.35, z: 0, visibility: 0.98 };
  lm[12] = { x: 0.55, y: 0.35, z: 0, visibility: 0.98 };
  lm[13] = { x: 0.25, y: 0.35, z: 0, visibility: 0.98 };
  lm[15] = { x: 0.10, y: 0.35, z: 0, visibility: 0.98 };
  lm[14] = { x: 0.75, y: 0.35, z: 0, visibility: 0.98 };
  lm[16] = { x: 0.90, y: 0.35, z: 0, visibility: 0.98 };
  lm[23] = { x: 0.45, y: 0.65, z: 0, visibility: 0.98 };
  lm[24] = { x: 0.55, y: 0.65, z: 0, visibility: 0.98 };
  // Perfect 90° front knee
  lm[25] = { x: 0.25, y: 0.65, z: 0, visibility: 0.98 };
  lm[27] = { x: 0.25, y: 0.85, z: 0, visibility: 0.98 };
  lm[26] = { x: 0.70, y: 0.75, z: 0, visibility: 0.98 };
  lm[28] = { x: 0.85, y: 0.85, z: 0, visibility: 0.98 };
  return lm;
}

// Mock DataChannel for verifying WebRTC voice payloads
class MockDataChannel {
  public readyState: string = "open";
  public sentMessages: string[] = [];

  public send(data: string): void {
    this.sentMessages.push(data);
  }
}

describe("Phase 6: Asana-Specific OpenAI Realtime Voice Integration", () => {
  let feedbackEngine: FeedbackEngine;
  let voiceAgent: RealtimeVoiceAgent;
  let mockDc: MockDataChannel;
  let transcripts: string[];

  beforeEach(() => {
    feedbackEngine = new FeedbackEngine({
      requiredFrames: 2,
      releaseFrames: 2,
      generalCooldownMs: 4000,
      repeatRuleCooldownMs: 8000,
      positiveCooldownMs: 6000,
      safetyCooldownMs: 2000,
    });

    transcripts = [];
    voiceAgent = new RealtimeVoiceAgent(
      () => {},
      (item) => transcripts.push(item.text)
    );

    mockDc = new MockDataChannel();
    (voiceAgent as any).dc = mockDc;
  });

  // ── 1. STARTUP INSTRUCTION ──────────────────────────────────────────────────
  it("1. Startup instruction reflects selected asana profile without universal 'stand tall'", () => {
    // Standing: Warrior II
    const warriorInstruction = getAsanaStartingInstruction("warrior-ii");
    voiceAgent.triggerPoseStart("warrior-ii", "Warrior II");

    assert.ok(mockDc.sentMessages.length > 0, "Expected startup speech message");
    const lastPayload = JSON.parse(mockDc.sentMessages[mockDc.sentMessages.length - 1]);
    assert.strictEqual(lastPayload.type, "response.create");
    assert.ok(
      lastPayload.response.instructions.includes("Warrior II") &&
      (lastPayload.response.instructions.includes("wide") || lastPayload.response.instructions.includes("feet")),
      `Expected specific startup instruction in Realtime payload, got: ${lastPayload.response.instructions}`
    );

    // Prone: Cobra Pose
    const cobraInstruction = getAsanaStartingInstruction("bhujangasana");
    assert.ok(
      cobraInstruction.toLowerCase().includes("stomach") || cobraInstruction.toLowerCase().includes("prone"),
      `Expected prone entry for Cobra, got: ${cobraInstruction}`
    );
    assert.strictEqual(cobraInstruction.toLowerCase().includes("stand tall"), false);
  });

  // ── 2. INCORRECT POSTURE DETECTION ─────────────────────────────────────────
  it("2. Detects incorrect posture through MediaPipe evaluation and FeedbackEngine", () => {
    const faultyLandmarks = createFaultyWarriorIILandmarks();
    const evalResult = evaluateAsanaPose("warrior-ii", { landmarks: faultyLandmarks });

    assert.ok(evalResult.detectedIssues.length > 0, "Expected issues to be detected");
    const kneeIssue = evalResult.detectedIssues.find((i) => i.ruleId === "warrior-ii-left-knee-angle");
    assert.ok(kneeIssue !== undefined);
    assert.strictEqual(kneeIssue?.status, "incorrect");
    assert.ok(kneeIssue?.correction.includes("knee") || kneeIssue?.correction.includes("ankle"));
  });

  // ── 3. CORRECTION DISPATCH TO REALTIME ─────────────────────────────────────
  it("3. Dispatches concise physical correction to OpenAI Realtime voice model", () => {
    const faultyLandmarks = createFaultyWarriorIILandmarks();
    const evalResult = evaluateAsanaPose("warrior-ii", { landmarks: faultyLandmarks });

    // Frame 1: debounce
    assert.strictEqual(feedbackEngine.processEvaluation(evalResult, { timestamp: 1000 }), null);
    // Frame 2: threshold reached
    const feedback = feedbackEngine.processEvaluation(evalResult, { timestamp: 1033 });
    assert.ok(feedback !== null);

    // Dispatch to voice agent
    voiceAgent.sendFeedback(feedback as FeedbackOutput);

    assert.ok(mockDc.sentMessages.length > 0);
    const lastPayload = JSON.parse(mockDc.sentMessages[mockDc.sentMessages.length - 1]);
    assert.strictEqual(lastPayload.type, "response.create");
    assert.ok(
      lastPayload.response.instructions.includes("Coach Alice") || lastPayload.response.instructions.includes("Coach Kevin"),
      "Payload should enforce coach persona instructions"
    );
    assert.ok(
      lastPayload.response.instructions.includes("Bend your front knee directly over your ankle"),
      `Expected exact coaching cue, got: ${lastPayload.response.instructions}`
    );
    assert.ok(
      lastPayload.response.instructions.includes("Do not add conversational filler"),
      "Payload must strictly prohibit conversational chatting"
    );
  });

  // ── 4. CORRECTED POSTURE & POSITIVE FEEDBACK ──────────────────────────────
  it("4. Emits positive resolution feedback when the user corrects their posture", () => {
    const faultyLandmarks = createFaultyWarriorIILandmarks();
    const perfectLandmarks = createPerfectWarriorIILandmarks();

    const evalFaulty = evaluateAsanaPose("warrior-ii", { landmarks: faultyLandmarks });
    const evalPerfect = evaluateAsanaPose("warrior-ii", { landmarks: perfectLandmarks });

    // 1. Initial fault announced
    feedbackEngine.processEvaluation(evalFaulty, { timestamp: 1000 });
    const fbFault = feedbackEngine.processEvaluation(evalFaulty, { timestamp: 1033 });
    assert.ok(fbFault !== null);
    voiceAgent.sendFeedback(fbFault as FeedbackOutput);

    // Simulate server response completion
    (voiceAgent as any).hasActiveServerResponse = false;

    // 2. User corrects posture
    const fbResolved = feedbackEngine.processEvaluation(evalPerfect, { timestamp: 5500 });
    assert.ok(fbResolved !== null);
    assert.strictEqual(fbResolved?.type, "positive_reinforcement");
    assert.ok(
      fbResolved?.message.includes("great") || fbResolved?.message.includes("Good") || fbResolved?.message.includes("Solid"),
      `Expected praise on fix, got: ${fbResolved?.message}`
    );

    voiceAgent.sendFeedback(fbResolved as FeedbackOutput);
    const lastPayload = JSON.parse(mockDc.sentMessages[mockDc.sentMessages.length - 1]);
    assert.strictEqual(lastPayload.type, "response.create");
    assert.ok(lastPayload.response.instructions.includes(fbResolved!.message));
  });

  // ── 5. REPEATED INCORRECT POSTURE COOLDOWN ─────────────────────────────────
  it("5. Suppresses repeated identical corrections during cooldown period", () => {
    const faultyLandmarks = createFaultyWarriorIILandmarks();
    const evalFaulty = evaluateAsanaPose("warrior-ii", { landmarks: faultyLandmarks });

    // First emission at 1033ms
    feedbackEngine.processEvaluation(evalFaulty, { timestamp: 1000 });
    const fb1 = feedbackEngine.processEvaluation(evalFaulty, { timestamp: 1033 });
    assert.ok(fb1 !== null);

    // Immediate next frame at 1066ms -> suppressed
    const fb2 = feedbackEngine.processEvaluation(evalFaulty, { timestamp: 1066 });
    assert.strictEqual(fb2, null);

    // Frame at 3000ms (within 4000ms general cooldown) -> suppressed
    const fb3 = feedbackEngine.processEvaluation(evalFaulty, { timestamp: 3000 });
    assert.strictEqual(fb3, null);

    // Frame at 6000ms (within 8000ms repeat rule cooldown) -> suppressed
    const fb4 = feedbackEngine.processEvaluation(evalFaulty, { timestamp: 6000 });
    assert.strictEqual(fb4, null);

    // Frame at 10000ms (>8000ms repeat cooldown) -> allowed
    const fb5 = feedbackEngine.processEvaluation(evalFaulty, { timestamp: 10000 });
    assert.ok(fb5 !== null);
    assert.strictEqual(fb5?.sourceRule, "warrior-ii-left-knee-angle");
  });

  // ── 6. SWITCHING BETWEEN ASANAS ───────────────────────────────────────────
  it("6. Switching between asanas updates context, resets feedback state, and starts fresh", () => {
    // 1. Start in Warrior II with fault
    voiceAgent.updateSessionContext({
      coach: "alice",
      asanaId: "warrior-ii",
      asanaName: "Warrior II",
      isSessionActive: true,
    });

    const warriorFault = evaluateAsanaPose("warrior-ii", { landmarks: createFaultyWarriorIILandmarks() });
    feedbackEngine.processEvaluation(warriorFault, { timestamp: 1000 });
    const fbWarrior = feedbackEngine.processEvaluation(warriorFault, { timestamp: 1033 });
    assert.ok(fbWarrior !== null);
    voiceAgent.sendFeedback(fbWarrior as FeedbackOutput);

    // Simulate server response completion
    (voiceAgent as any).hasActiveServerResponse = false;

    // 2. Switch to Padmasana (Lotus Pose - Seated)
    voiceAgent.updateSessionContext({
      coach: "alice",
      asanaId: "padmasana",
      asanaName: "Lotus Pose",
      isSessionActive: true,
    });
    feedbackEngine.reset(); // Fresh state on pose switch

    // Trigger pose start for new asana
    voiceAgent.triggerPoseStart("padmasana", "Lotus Pose");

    const lastPayload = JSON.parse(mockDc.sentMessages[mockDc.sentMessages.length - 1]);
    assert.strictEqual(lastPayload.type, "response.create");
    assert.ok(
      lastPayload.response.instructions.includes("Lotus Pose"),
      `Expected Lotus Pose in startup instructions, got: ${lastPayload.response.instructions}`
    );
    assert.ok(
      lastPayload.response.instructions.includes("Sit") || lastPayload.response.instructions.includes("crossed"),
      `Expected seated instructions for Lotus, got: ${lastPayload.response.instructions}`
    );
    assert.strictEqual(lastPayload.response.instructions.toLowerCase().includes("stand tall"), false);
  });
});
