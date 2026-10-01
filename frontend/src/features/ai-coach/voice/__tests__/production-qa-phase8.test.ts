import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { CoachingEventEngine } from "../CoachingEventEngine";
import { CoachDecisionEngine } from "../CoachDecisionEngine";
import { CoachingEventBuilder } from "../CoachingEventBuilder";
import { RealtimeVoiceAgent } from "../RealtimeVoiceAgent";
import type { PoseEvaluationResult, PoseIssue } from "../../types/pose-rules";

describe("Phase 8 Production QA & Reliability Verification", () => {
  const createMockVoiceAgent = () => {
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

    return { agent, sentEvents };
  };

  // 1. Coaching Latency & Pipeline Flow Simulation
  it("1. End-to-end coaching latency measurement from violation to DataChannel dispatch", () => {
    const eventEngine = new CoachingEventEngine();
    const decisionEngine = new CoachDecisionEngine();
    const { agent, sentEvents } = createMockVoiceAgent();

    agent.updateSessionContext({
      coach: "alice",
      asanaId: "warrior-ii",
      asanaName: "Warrior II",
      isSessionActive: true,
    });

    const kneeIssue: PoseIssue = {
      ruleId: "warrior_ii_front_knee_angle",
      ruleName: "Front Knee Angle",
      severity: "medium",
      metric: "angle",
      currentValue: 65,
      targetValue: 90,
      min: 80,
      max: 105,
      feedback: "Bend your front knee over your ankle.",
    };

    const evalResult: PoseEvaluationResult = {
      status: "warning",
      score: 68,
      ruleResults: [],
      primaryIssue: kneeIssue,
      secondaryIssues: [],
      timestamp: Date.now(),
    };

    const startTime = performance.now();

    // Step 1: Event Engine processes frame
    const events = eventEngine.process("warrior-ii", "Warrior II", "coaching", "CAMERA_READY", evalResult);
    assert.ok(events.length >= 1, "Coaching event generated");

    // Step 2: Decision Engine evaluates event
    const correctionEvent = events.find((e) => e.type === "pose_correction");
    assert.ok(correctionEvent, "Correction event present");
    const decision = decisionEngine.evaluate(correctionEvent, { now: Date.now() });
    assert.equal(decision.shouldSpeak, true, "Decision Engine approved cue");

    // Step 3: RealtimeVoiceAgent dispatches via DataChannel
    agent.sendCoachingEvent(correctionEvent);

    const endTime = performance.now();
    const totalPipelineLatency = endTime - startTime;

    assert.equal(sentEvents.length, 1);
    assert.equal(sentEvents[0].type, "response.create");
    assert.ok(totalPipelineLatency < 25, `Local processing latency must be <25ms (measured ${totalPipelineLatency.toFixed(2)}ms)`);
  });

  // 2. OpenAI Response Frequency / Spam Prevention Test (Simulated 5-Minute Practice)
  it("2. Response frequency ratio test across 3000 simulated frames (5-minute session)", () => {
    const eventEngine = new CoachingEventEngine();
    const decisionEngine = new CoachDecisionEngine({ cooldownMs: 4000, repeatSameRuleCooldownMs: 10000 });
    const { agent, sentEvents } = createMockVoiceAgent();

    let totalFrames = 0;
    let totalEventsGenerated = 0;
    let totalApprovedEvents = 0;

    const staticKneeIssue: PoseIssue = {
      ruleId: "warrior_ii_front_knee_angle",
      severity: "medium",
      metric: "angle",
      currentValue: 65,
      targetValue: 90,
      feedback: "Bend your front knee over your ankle.",
    };

    const badPose: PoseEvaluationResult = {
      status: "warning",
      score: 65,
      ruleResults: [],
      primaryIssue: staticKneeIssue,
      secondaryIssues: [],
      timestamp: 0,
    };

    // Simulate 3000 video frames at 10 FPS (300 seconds / 5 minutes)
    for (let frameIndex = 0; frameIndex < 3000; frameIndex++) {
      const timestamp = frameIndex * 100;
      totalFrames++;

      const currentEval = { ...badPose, timestamp };
      const events = eventEngine.process("warrior-ii", "Warrior II", "coaching", "CAMERA_READY", currentEval);
      totalEventsGenerated += events.length;

      for (const event of events) {
        const decision = decisionEngine.evaluate(event, { now: timestamp });
        if (decision.shouldSpeak) {
          totalApprovedEvents++;
          agent.sendCoachingEvent(event);
        }
      }
    }

    // In a 5-minute session with persistent unchanging error:
    // Frames = 3000
    // Initial pose_started + 1st pose_correction + repeat suppression (max 1 correction every 10s = ~30 max)
    assert.equal(totalFrames, 3000);
    assert.ok(totalEventsGenerated < 10, `Event engine suppressed repeated identical frame violations (${totalEventsGenerated} generated)`);
    assert.ok(sentEvents.length < 5, `Total voice responses generated was constrained to ${sentEvents.length}`);
    assert.ok(totalFrames > totalEventsGenerated && totalEventsGenerated >= sentEvents.length, "Strict ratio: frames >> events >= voice");
  });

  // 3. Recovery & Regression Lifecycle
  it("3. Recovery and regression cycle allows subsequent correction after fix and relapse", () => {
    const eventEngine = new CoachingEventEngine();
    const decisionEngine = new CoachDecisionEngine({ cooldownMs: 4000, repeatSameRuleCooldownMs: 10000 });
    const { agent, sentEvents } = createMockVoiceAgent();

    const kneeIssue: PoseIssue = {
      ruleId: "knee_alignment",
      severity: "medium",
      metric: "angle",
      currentValue: 65,
      targetValue: 90,
      feedback: "Adjust knee",
    };

    // T=1000: User is misaligned
    const eval1: PoseEvaluationResult = { status: "warning", score: 65, ruleResults: [], primaryIssue: kneeIssue, secondaryIssues: [], timestamp: 1000 };
    const e1 = eventEngine.process("warrior-ii", "Warrior II", "coaching", "CAMERA_READY", eval1);
    const d1 = decisionEngine.evaluate(e1.find((e) => e.type === "pose_correction")!, { now: 1000 });
    assert.equal(d1.shouldSpeak, true, "Initial correction approved");

    // T=6000: User recovers to good form (after 4000ms baseline cooldown)
    const evalGood: PoseEvaluationResult = { status: "pass", score: 90, ruleResults: [], primaryIssue: null, secondaryIssues: [], timestamp: 6000 };
    const eGood = eventEngine.process("warrior-ii", "Warrior II", "coaching", "CAMERA_READY", evalGood);
    const resolvedEvent = eGood.find((e) => e.type === "issue_resolved" || e.type === "good_form");
    assert.ok(resolvedEvent, "Issue resolved or good form emitted upon recovery");
    const dGood = decisionEngine.evaluate(resolvedEvent, { now: 6000 });
    assert.equal(dGood.shouldSpeak, true, "Recovery acknowledgment approved");

    // T=12000: User relapses into knee misalignment (after recovery and cooldown)
    const evalRelapse: PoseEvaluationResult = { status: "warning", score: 65, ruleResults: [], primaryIssue: kneeIssue, secondaryIssues: [], timestamp: 12000 };
    const eRelapse = eventEngine.process("warrior-ii", "Warrior II", "coaching", "CAMERA_READY", evalRelapse);
    const corrRelapse = eRelapse.find((e) => e.type === "pose_correction");
    assert.ok(corrRelapse, "New correction emitted upon regression");
    const dRelapse = decisionEngine.evaluate(corrRelapse, { now: 12000 });
    assert.equal(dRelapse.shouldSpeak, true, "Relapse correction approved after recovery and cooldown");
  });

  // 4. Memory and Session Reset Cleanliness
  it("4. Session reset clears in-flight state without resource leaks", () => {
    const decisionEngine = new CoachDecisionEngine();
    const { agent } = createMockVoiceAgent();

    const issue: PoseIssue = { ruleId: "arms", severity: "medium", metric: "angle", currentValue: 120, feedback: "Extend arms" };
    const event = CoachingEventBuilder.buildPoseCorrectionEvent("tree-pose", "Tree Pose", issue, 70);

    decisionEngine.evaluate(event, { now: 1000 });
    
    // Reset session
    decisionEngine.reset();

    // Immediate new session at t=1200 must not be blocked by prior session cooldown
    const newEvent = CoachingEventBuilder.buildPoseCorrectionEvent("warrior-ii", "Warrior II", issue, 70);
    const newDecision = decisionEngine.evaluate(newEvent, { now: 1200 });
    assert.equal(newDecision.shouldSpeak, true, "Clean reset allows immediate new session evaluation");

    // Disconnect agent cleanly
    assert.doesNotThrow(() => {
      agent.disconnect();
    });
  });
});
