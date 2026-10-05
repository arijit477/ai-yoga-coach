import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { CoachingContextManager } from "../CoachingContextManager";
import { CoachingContextSynchronizer } from "../CoachingContextSynchronizer";
import { RealtimeVoiceAgent } from "../RealtimeVoiceAgent";
import type { CoachingEvent } from "../voice.types";

describe("Phase 4C — Live Coaching Context Synchronization Tests", () => {
  it("Test 1 — Pose start: pose_started -> MOVING_INTO_POSE", () => {
    const manager = new CoachingContextManager();
    const synchronizer = new CoachingContextSynchronizer(manager);

    const event: CoachingEvent = {
      id: "evt_start",
      type: "pose_started",
      timestamp: Date.now(),
      asanaId: "warrior-2",
      asanaName: "Warrior II",
    };

    synchronizer.sync(event);
    const ctx = manager.getContext();
    assert.ok(ctx);
    assert.equal(ctx?.asanaName, "Warrior II");
    assert.equal(ctx?.state, "MOVING_INTO_POSE");
    assert.deepEqual(ctx?.activeIssues, []);
    assert.deepEqual(ctx?.correctedIssues, []);
  });

  it("Test 2 — Correction: pose_correction -> CORRECTING and active issue exists", () => {
    const manager = new CoachingContextManager();
    const synchronizer = new CoachingContextSynchronizer(manager);

    const event: CoachingEvent = {
      id: "evt_corr",
      type: "pose_correction",
      timestamp: Date.now(),
      asanaId: "warrior-2",
      asanaName: "Warrior II",
      ruleId: "left-knee-inward",
      joint: "Left Knee",
      feedback: "Push your left knee outward",
      severity: "medium",
      score: 82,
    };

    synchronizer.sync(event);
    const ctx = manager.getContext();
    assert.equal(ctx?.state, "CORRECTING");
    assert.equal(ctx?.activeIssues.length, 1);
    assert.equal(ctx?.activeIssues[0].id, "left-knee-inward");
    assert.equal(ctx?.activeIssues[0].bodyPart, "Left Knee");
    assert.equal(ctx?.activeIssues[0].correction, "Push your left knee outward");
    assert.equal(ctx?.score, 82);
  });

  it("Test 3 — Improvement: issue_improving -> IMPROVING and issue stays active", () => {
    const manager = new CoachingContextManager();
    const synchronizer = new CoachingContextSynchronizer(manager);

    // Initial correction
    synchronizer.sync({
      id: "evt_corr",
      type: "pose_correction",
      timestamp: Date.now(),
      asanaId: "warrior-2",
      asanaName: "Warrior II",
      ruleId: "left-knee-inward",
      joint: "Left Knee",
      feedback: "Push your left knee outward",
    });

    // Improvement occurs
    synchronizer.sync({
      id: "evt_imp",
      type: "issue_improving",
      timestamp: Date.now(),
      asanaId: "warrior-2",
      asanaName: "Warrior II",
      ruleId: "left-knee-inward",
      score: 86,
    });

    const ctx = manager.getContext();
    assert.equal(ctx?.state, "IMPROVING");
    assert.equal(ctx?.activeIssues.length, 1);
    assert.equal(ctx?.activeIssues[0].id, "left-knee-inward");
    assert.equal(ctx?.score, 86);
  });

  it("Test 4 — Resolution: issue_resolved -> CORRECT, moved from active to corrected", () => {
    const manager = new CoachingContextManager();
    const synchronizer = new CoachingContextSynchronizer(manager);

    // Initial correction
    synchronizer.sync({
      id: "evt_corr",
      type: "pose_correction",
      timestamp: Date.now(),
      asanaId: "warrior-2",
      asanaName: "Warrior II",
      ruleId: "left-knee-inward",
    });

    // Resolution occurs
    synchronizer.sync({
      id: "evt_res",
      type: "issue_resolved",
      timestamp: Date.now(),
      asanaId: "warrior-2",
      asanaName: "Warrior II",
      ruleId: "left-knee-inward",
      score: 90,
    });

    const ctx = manager.getContext();
    assert.equal(ctx?.state, "CORRECT");
    assert.equal(ctx?.activeIssues.length, 0);
    assert.deepEqual(ctx?.correctedIssues, ["left-knee-inward"]);
    assert.equal(ctx?.score, 90);
  });

  it("Test 5 — Good form: good_form -> CORRECT", () => {
    const manager = new CoachingContextManager();
    const synchronizer = new CoachingContextSynchronizer(manager);

    synchronizer.sync({
      id: "evt_gf",
      type: "good_form",
      timestamp: Date.now(),
      asanaId: "tree-pose",
      asanaName: "Tree Pose",
      score: 95,
    });

    const ctx = manager.getContext();
    assert.equal(ctx?.state, "CORRECT");
    assert.equal(ctx?.score, 95);
  });

  it("Test 6 — Hold: pose_held -> HOLDING with hold information synchronized", () => {
    const manager = new CoachingContextManager();
    const synchronizer = new CoachingContextSynchronizer(manager);

    synchronizer.sync({
      id: "evt_held",
      type: "pose_held",
      timestamp: Date.now(),
      asanaId: "warrior-2",
      asanaName: "Warrior II",
      score: 91,
      ...({ holdTime: 8, targetHoldTime: 20 } as any),
    });

    const ctx = manager.getContext();
    assert.equal(ctx?.state, "HOLDING");
    assert.equal(ctx?.holdSeconds, 8);
    assert.equal(ctx?.remainingHoldSeconds, 12);
    assert.equal(ctx?.score, 91);
  });

  it("Test 7 — Countdown: hold_countdown -> HOLDING with remaining hold synchronized", () => {
    const manager = new CoachingContextManager();
    const synchronizer = new CoachingContextSynchronizer(manager);

    synchronizer.sync({
      id: "evt_cd",
      type: "hold_countdown",
      timestamp: Date.now(),
      asanaId: "warrior-2",
      asanaName: "Warrior II",
      ...({ holdTime: 15, remainingHoldSeconds: 5 } as any),
    });

    const ctx = manager.getContext();
    assert.equal(ctx?.state, "HOLDING");
    assert.equal(ctx?.holdSeconds, 15);
    assert.equal(ctx?.remainingHoldSeconds, 5);
  });

  it("Test 8 — Completion: pose_completed -> COMPLETED with score preserved", () => {
    const manager = new CoachingContextManager();
    const synchronizer = new CoachingContextSynchronizer(manager);

    synchronizer.sync({
      id: "evt_comp",
      type: "pose_completed",
      timestamp: Date.now(),
      asanaId: "warrior-2",
      asanaName: "Warrior II",
      score: 94,
    });

    const ctx = manager.getContext();
    assert.equal(ctx?.state, "COMPLETED");
    assert.equal(ctx?.score, 94);
  });

  it("Test 9 — New pose reset: old pose completed -> new pose started -> previous issues cleared", () => {
    const manager = new CoachingContextManager();
    const synchronizer = new CoachingContextSynchronizer(manager);

    // Pose 1 completion with corrected issue
    synchronizer.sync({
      id: "evt_p1_start",
      type: "pose_started",
      timestamp: Date.now(),
      asanaId: "warrior-1",
      asanaName: "Warrior I",
    });
    synchronizer.sync({
      id: "evt_p1_corr",
      type: "pose_correction",
      timestamp: Date.now(),
      asanaId: "warrior-1",
      asanaName: "Warrior I",
      ruleId: "back-foot-angle",
    });
    synchronizer.sync({
      id: "evt_p1_res",
      type: "issue_resolved",
      timestamp: Date.now(),
      asanaId: "warrior-1",
      asanaName: "Warrior I",
      ruleId: "back-foot-angle",
    });
    synchronizer.sync({
      id: "evt_p1_comp",
      type: "pose_completed",
      timestamp: Date.now(),
      asanaId: "warrior-1",
      asanaName: "Warrior I",
      score: 95,
    });

    assert.equal(manager.getContext()?.state, "COMPLETED");
    assert.deepEqual(manager.getContext()?.correctedIssues, ["back-foot-angle"]);

    // Pose 2 start resets previous issues
    synchronizer.sync({
      id: "evt_p2_start",
      type: "pose_started",
      timestamp: Date.now(),
      asanaId: "warrior-2",
      asanaName: "Warrior II",
    });

    const ctx2 = manager.getContext();
    assert.equal(ctx2?.asanaName, "Warrior II");
    assert.equal(ctx2?.state, "MOVING_INTO_POSE");
    assert.deepEqual(ctx2?.activeIssues, []);
    assert.deepEqual(ctx2?.correctedIssues, []);
  });

  it("Test 10 — Duplicate correction: repeated corrections do not duplicate in activeIssues or correctedIssues", () => {
    const manager = new CoachingContextManager();
    const synchronizer = new CoachingContextSynchronizer(manager);

    synchronizer.sync({
      id: "evt_start",
      type: "pose_started",
      timestamp: Date.now(),
      asanaId: "tree-pose",
      asanaName: "Tree Pose",
    });

    // Send same correction 3 times
    for (let i = 0; i < 3; i++) {
      synchronizer.sync({
        id: `evt_corr_${i}`,
        type: "pose_correction",
        timestamp: Date.now(),
        asanaId: "tree-pose",
        asanaName: "Tree Pose",
        ruleId: "hip-alignment",
        joint: "Hips",
        feedback: "Level your pelvis",
      });
    }

    assert.equal(manager.getContext()?.activeIssues.length, 1);
    assert.equal(manager.getContext()?.activeIssues[0].id, "hip-alignment");

    // Resolve issue twice
    synchronizer.sync({
      id: "evt_res_1",
      type: "issue_resolved",
      timestamp: Date.now(),
      asanaId: "tree-pose",
      asanaName: "Tree Pose",
      ruleId: "hip-alignment",
    });
    synchronizer.sync({
      id: "evt_res_2",
      type: "issue_resolved",
      timestamp: Date.now(),
      asanaId: "tree-pose",
      asanaName: "Tree Pose",
      ruleId: "hip-alignment",
    });

    assert.equal(manager.getContext()?.activeIssues.length, 0);
    assert.deepEqual(manager.getContext()?.correctedIssues, ["hip-alignment"]);
  });

  it("Test 11 — RealtimeVoiceAgent integrates context synchronizer smoothly", () => {
    const agent = new RealtimeVoiceAgent();
    const synchronizer = agent.getContextSynchronizer();
    assert.ok(synchronizer);

    agent.triggerPoseStart("warrior-2", "Warrior II");
    assert.equal(agent.getCoachingContextManager().getContext()?.state, "MOVING_INTO_POSE");

    agent.sendCoachingEvent({
      id: "evt_corr",
      type: "pose_correction",
      timestamp: Date.now(),
      asanaId: "warrior-2",
      asanaName: "Warrior II",
      ruleId: "front-knee",
      feedback: "Bend your front knee to 90 degrees",
    });

    assert.equal(agent.getCoachingContextManager().getContext()?.state, "CORRECTING");
    assert.equal(agent.getCoachingContextManager().getContext()?.activeIssues.length, 1);
  });
});
