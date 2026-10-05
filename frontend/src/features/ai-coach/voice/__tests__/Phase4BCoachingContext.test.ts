import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { CoachingContextManager } from "../CoachingContextManager";
import { CoachingPromptBuilder } from "../CoachingPromptBuilder";
import { RealtimeVoiceAgent } from "../RealtimeVoiceAgent";
import type { CoachingIssue, CoachingContext } from "../CoachingContext";
import type { CoachingEvent } from "../voice.types";

describe("Phase 4B — Context-Aware Real-Time Coaching Tests", () => {
  describe("CoachingContextManager", () => {
    it("1. startPose initializes clean starting context", () => {
      const manager = new CoachingContextManager();
      assert.equal(manager.getContext(), null);

      manager.startPose("Warrior II");
      const ctx = manager.getContext();
      assert.ok(ctx);
      assert.equal(ctx?.asanaName, "Warrior II");
      assert.equal(ctx?.state, "STARTING");
      assert.deepEqual(ctx?.activeIssues, []);
      assert.deepEqual(ctx?.correctedIssues, []);
    });

    it("2. setIssues sets active issues and lastIssueId", () => {
      const manager = new CoachingContextManager();
      manager.startPose("Warrior II");

      const issues: CoachingIssue[] = [
        {
          id: "left-knee-alignment",
          bodyPart: "Left knee",
          issue: "Knee is collapsing inward",
          correction: "Track your knee over your middle toes",
          severity: "medium",
          confidence: 0.95,
        },
      ];

      manager.setIssues(issues);
      const ctx = manager.getContext();
      assert.equal(ctx?.activeIssues.length, 1);
      assert.equal(ctx?.lastIssueId, "left-knee-alignment");
      assert.equal(ctx?.activeIssues[0].bodyPart, "Left knee");
    });

    it("3. markIssueCorrected transitions issue to correctedIssues", () => {
      const manager = new CoachingContextManager();
      manager.startPose("Tree Pose");

      manager.setIssues([
        {
          id: "hip-level",
          bodyPart: "Hips",
          issue: "Right hip is hitched",
          correction: "Level your pelvis",
          severity: "low",
        },
        {
          id: "arms-up",
          bodyPart: "Arms",
          issue: "Arms are bent",
          correction: "Reach straight up",
          severity: "medium",
        },
      ]);

      manager.markIssueCorrected("hip-level");
      const ctx = manager.getContext();
      assert.equal(ctx?.activeIssues.length, 1);
      assert.equal(ctx?.activeIssues[0].id, "arms-up");
      assert.deepEqual(ctx?.correctedIssues, ["hip-level"]);

      // Marking again does not duplicate
      manager.markIssueCorrected("hip-level");
      assert.deepEqual(manager.getContext()?.correctedIssues, ["hip-level"]);
    });

    it("4. updateHold updates hold duration and sets state to HOLDING", () => {
      const manager = new CoachingContextManager();
      manager.startPose("Downward Dog");

      manager.updateHold(5, 5);
      const ctx = manager.getContext();
      assert.equal(ctx?.state, "HOLDING");
      assert.equal(ctx?.holdSeconds, 5);
      assert.equal(ctx?.remainingHoldSeconds, 5);
    });

    it("5. setScore updates the posture score", () => {
      const manager = new CoachingContextManager();
      manager.startPose("Tadasana");

      manager.setScore(92);
      assert.equal(manager.getContext()?.score, 92);
    });

    it("6. reset clears the context", () => {
      const manager = new CoachingContextManager();
      manager.startPose("Warrior I");
      assert.ok(manager.getContext());

      manager.reset();
      assert.equal(manager.getContext(), null);
    });
  });

  describe("CoachingPromptBuilder", () => {
    it("7. builds complete structured prompt containing context and coaching rules", () => {
      const context: CoachingContext = {
        asanaName: "Warrior II",
        state: "CORRECTING",
        activeIssues: [
          {
            id: "front-knee-angle",
            bodyPart: "Right knee",
            issue: "Knee is bent past 90 degrees",
            correction: "Stack your knee directly over your ankle",
            severity: "high",
          },
        ],
        correctedIssues: ["arms-parallel"],
        holdSeconds: 3,
        remainingHoldSeconds: 7,
        score: 78,
      };

      const prompt = CoachingPromptBuilder.build(context);
      assert.ok(prompt.includes("Asana:\nWarrior II"));
      assert.ok(prompt.includes("Current state:\nCORRECTING"));
      assert.ok(prompt.includes("- Right knee: Knee is bent past 90 degrees. Correction: Stack your knee directly over your ankle"));
      assert.ok(prompt.includes("Previously corrected issues:\narms-parallel"));
      assert.ok(prompt.includes("Hold duration:\n3 seconds"));
      assert.ok(prompt.includes("Remaining hold:\n7 seconds"));
      assert.ok(prompt.includes("Score:\n78"));
      assert.ok(prompt.includes("COACHING RULES:"));
      assert.ok(prompt.includes("1. Speak like a real yoga coach."));
      assert.ok(prompt.includes("Trust the detected posture information."));
    });

    it("8. handles empty issues gracefully", () => {
      const context: CoachingContext = {
        asanaName: "Mountain Pose",
        state: "HOLDING",
        activeIssues: [],
        correctedIssues: [],
      };

      const prompt = CoachingPromptBuilder.build(context);
      assert.ok(prompt.includes("Active posture issues:\nNone"));
      assert.ok(prompt.includes("Previously corrected issues:\nnone"));
    });
  });

  describe("RealtimeVoiceAgent Context Integration", () => {
    it("9. startCoachingContext and updateCoachingContext populate context manager", () => {
      const agent = new RealtimeVoiceAgent();
      agent.startCoachingContext("Plank Pose");

      const manager = agent.getCoachingContextManager();
      assert.equal(manager.getContext()?.asanaName, "Plank Pose");
      assert.equal(manager.getContext()?.state, "STARTING");

      agent.updateCoachingContext({
        asanaName: "Plank Pose",
        state: "HOLDING",
        activeIssues: [],
        correctedIssues: ["hips-sagging"],
        holdSeconds: 10,
        score: 95,
      });

      const updated = manager.getContext();
      assert.equal(updated?.state, "HOLDING");
      assert.equal(updated?.holdSeconds, 10);
      assert.equal(updated?.score, 95);
      assert.deepEqual(updated?.correctedIssues, ["hips-sagging"]);

      agent.resetCoachingContext();
      assert.equal(manager.getContext(), null);
    });

    it("10. triggerPoseStart resets and initializes new coaching context", () => {
      const agent = new RealtimeVoiceAgent();
      agent.triggerPoseStart("warrior-2", "Warrior II");

      const ctx = agent.getCoachingContextManager().getContext();
      assert.ok(ctx);
      assert.equal(ctx?.asanaName, "Warrior II");
      assert.equal(ctx?.state, "MOVING_INTO_POSE");
    });

    it("11. sendCoachingEvent updates context state on pose correction and resolution", () => {
      const agent = new RealtimeVoiceAgent();
      agent.startCoachingContext("Warrior II");

      const correctionEvent: CoachingEvent = {
        id: "evt_corr_1",
        type: "pose_correction",
        feedback: "Straighten your back arm",
        severity: "medium",
        timestamp: Date.now(),
        data: {
          ruleId: "back-arm-straight",
          joint: "Left arm",
          score: 72,
        },
      };

      agent.sendCoachingEvent(correctionEvent);

      const ctx = agent.getCoachingContextManager().getContext();
      assert.equal(ctx?.state, "CORRECTING");
      assert.equal(ctx?.activeIssues.length, 1);
      assert.equal(ctx?.activeIssues[0].id, "back-arm-straight");
      assert.equal(ctx?.activeIssues[0].bodyPart, "Left arm");
      assert.equal(ctx?.score, 72);

      const resolvedEvent: CoachingEvent = {
        id: "evt_res_1",
        type: "issue_resolved",
        feedback: "Great, back arm is straight",
        severity: "low",
        timestamp: Date.now(),
        data: {
          ruleId: "back-arm-straight",
          score: 88,
        },
      };

      agent.sendCoachingEvent(resolvedEvent);

      const resolvedCtx = agent.getCoachingContextManager().getContext();
      assert.equal(resolvedCtx?.state, "CORRECT");
      assert.equal(resolvedCtx?.activeIssues.length, 0);
      assert.deepEqual(resolvedCtx?.correctedIssues, ["back-arm-straight"]);
      assert.equal(resolvedCtx?.score, 88);
    });
  });
});
