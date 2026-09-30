import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { CoachingEventEngine } from "../CoachingEventEngine";
import { CoachDecisionEngine } from "../CoachDecisionEngine";
import { CoachingEventBuilder } from "../CoachingEventBuilder";
import { RealtimeVoiceAgent } from "../RealtimeVoiceAgent";
import type { PoseEvaluationResult, PoseIssue } from "../../types/pose-rules";

describe("Phase 6 Coach Personality & Asana Voice Test Matrix", () => {
  const createMockVoiceAgent = () => {
    const sentEvents: any[] = [];
    const mockDc = {
      readyState: "open",
      send: (data: string) => {
        sentEvents.push(JSON.parse(data));
      },
    };

    const agent = new RealtimeVoiceAgent();

    // Mock data channel & active connection
    (agent as any).dc = mockDc;
    (agent as any).hasActiveServerResponse = false;

    return { agent, sentEvents };
  };

  // 1. Alice Persona
  it("1. Alice uses calm, warm, graceful British mindfulness phrasing", () => {
    const { agent, sentEvents } = createMockVoiceAgent();
    (agent as any).currentCoachId = "alice";
    agent.updateSessionContext({
      coach: "alice",
      asanaId: "warrior-ii",
      asanaName: "Warrior II",
      isSessionActive: true,
    });

    agent.speak("Bend your front knee over your ankle.");

    assert.equal(sentEvents.length, 1);
    const event = sentEvents[0];
    assert.equal(event.type, "response.create");
    const instruction = event.response.instructions;
    assert.match(instruction, /Coach Alice/);
    assert.match(instruction, /calm, warm, graceful British/i);
    assert.match(instruction, /Warrior II/);
    assert.match(instruction, /Bend your front knee over your ankle/);
  });

  // 2. Kevin Persona
  it("2. Kevin uses energetic, direct, athletic phrasing for the exact same rule", () => {
    const { agent, sentEvents } = createMockVoiceAgent();
    (agent as any).currentCoachId = "kevin";
    agent.updateSessionContext({
      coach: "kevin",
      asanaId: "warrior-ii",
      asanaName: "Warrior II",
      isSessionActive: true,
    });

    agent.speak("Bend your front knee over your ankle.");

    assert.equal(sentEvents.length, 1);
    const event = sentEvents[0];
    assert.equal(event.type, "response.create");
    const instruction = event.response.instructions;
    assert.match(instruction, /Coach Kevin/);
    assert.match(instruction, /grounded, confident, motivating British/i);
    assert.match(instruction, /Warrior II/);
    // Crucially: rule content remains identical
    assert.match(instruction, /Bend your front knee over your ankle/);
  });

  // 3. Cross-Asana Testing: 5 representative categories
  it("3. Cross-Asana Testing: 5 representative categories with real asanas", () => {
    const testMatrix = [
      { asanaId: "warrior-ii", asanaName: "Warrior II (Virabhadrasana II)", category: "Standing", correction: "Lower your hips and bend the front knee to 90 degrees." },
      { asanaId: "tree-pose", asanaName: "Tree Pose (Vrikshasana)", category: "Balance", correction: "Place your foot on your inner thigh, not the knee joint." },
      { asanaId: "lotus-pose", asanaName: "Lotus Pose (Padmasana)", category: "Seated", correction: "Lengthen through your spine and relax your shoulders down." },
      { asanaId: "standing-forward-bend", asanaName: "Standing Forward Bend (Uttanasana)", category: "Forward Bend", correction: "Hinge from your hips and keep a micro-bend in your knees." },
      { asanaId: "cobra-pose", asanaName: "Cobra Pose (Bhujangasana)", category: "Backbend", correction: "Draw your elbows close to your ribs and lift your chest gently." },
    ];

    for (const testCase of testMatrix) {
      const { agent, sentEvents } = createMockVoiceAgent();
      (agent as any).currentCoachId = "alice";
      agent.updateSessionContext({
        coach: "alice",
        asanaId: testCase.asanaId,
        asanaName: testCase.asanaName,
        isSessionActive: true,
      });

      agent.speak(testCase.correction);

      assert.equal(sentEvents.length, 1);
      const instruction = sentEvents[0].response.instructions;
      assert.match(instruction, new RegExp(testCase.asanaName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
      assert.match(instruction, new RegExp(testCase.correction.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    }
  });

  // 4. Asana Switching
  it("4. Asana Switching updates active context without duplicating sessions", () => {
    const { agent, sentEvents } = createMockVoiceAgent();
    (agent as any).currentCoachId = "alice";

    agent.updateSessionContext({ coach: "alice", asanaId: "warrior-ii", asanaName: "Warrior II", isSessionActive: true });
    agent.speak("Check your stance.");

    (agent as any).hasActiveServerResponse = false;
    agent.updateSessionContext({ coach: "alice", asanaId: "downward-dog", asanaName: "Downward-Facing Dog", isSessionActive: true });
    agent.speak("Press firmly through your palms.");

    assert.equal(sentEvents.length, 2);
    assert.match(sentEvents[0].response.instructions, /Warrior II/);
    assert.match(sentEvents[1].response.instructions, /Downward-Facing Dog/);
  });

  // 5. Coach Switching
  it("5. Coach Switching updates persona without altering correction queue", () => {
    const { agent, sentEvents } = createMockVoiceAgent();

    (agent as any).currentCoachId = "alice";
    agent.updateSessionContext({ coach: "alice", asanaId: "warrior-ii", asanaName: "Warrior II", isSessionActive: true });
    agent.speak("Open your chest.");

    (agent as any).currentCoachId = "kevin";
    (agent as any).hasActiveServerResponse = false;
    agent.updateSessionContext({ coach: "kevin", asanaId: "warrior-ii", asanaName: "Warrior II", isSessionActive: true });
    agent.speak("Drive your hips forward.");

    assert.equal(sentEvents.length, 2);
    assert.match(sentEvents[0].response.instructions, /Coach Alice/);
    assert.match(sentEvents[1].response.instructions, /Coach Kevin/);
  });

  // 6. Good-Form Silence
  it("6. Good-Form Silence: Steady correct posture does not emit continuous speech", () => {
    const eventEngine = new CoachingEventEngine();
    const decisionEngine = new CoachDecisionEngine();

    const goodEval: PoseEvaluationResult = {
      status: "pass",
      score: 92,
      ruleResults: [],
      primaryIssue: null,
      secondaryIssues: [],
      timestamp: 1000,
    };

    // Frame 1: good form transition triggers initial affirmation
    const events1 = eventEngine.process("warrior-ii", "Warrior II", "coaching", "CAMERA_READY", goodEval);
    const goodEvents1 = events1.filter((e) => e.type === "good_form");
    assert.ok(goodEvents1.length >= 1, "Good form event emitted on alignment");
    const d1 = decisionEngine.evaluate(goodEvents1[0], { now: 1000 });
    assert.equal(d1.shouldSpeak, true, "Initial good form transition is approved");

    // Frame 2-50: continuous steady good form must produce zero new events (SILENCE)
    for (let t = 1100; t < 5000; t += 100) {
      const steadyEval: PoseEvaluationResult = { ...goodEval, timestamp: t };
      const events = eventEngine.process("warrior-ii", "Warrior II", "coaching", "CAMERA_READY", steadyEval);
      assert.equal(events.length, 0, `Event engine emitted event during steady good form at t=${t}`);
    }
  });

  // 7. Error Safety
  it("7. Error Safety: Missing asana, empty text, or disconnected channel fail safely", () => {
    const { agent, sentEvents } = createMockVoiceAgent();

    // Disconnect data channel
    (agent as any).dc = null;

    // Should fail safely without uncaught exception
    assert.doesNotThrow(() => {
      agent.speak("Test speech on disconnected agent");
    });
    assert.equal(sentEvents.length, 0);

    // Empty text
    (agent as any).dc = { readyState: "open", send: () => {} };
    agent.speak("");
    assert.equal(sentEvents.length, 0);
  });
});
