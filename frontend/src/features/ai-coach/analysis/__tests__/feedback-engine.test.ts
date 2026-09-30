import { describe, it, beforeEach } from "node:test";
import assert from "node:assert";

import type { AsanaEvaluationResult, AsanaDetectedIssue } from "../../types/asana-evaluation";
import { FeedbackEngine } from "../FeedbackEngine";
import { getAsanaCoachingProfile } from "../../services/AsanaCoachingProfileService";

function createMockEvaluation(
  asanaId: string,
  overrides?: Partial<AsanaEvaluationResult>
): AsanaEvaluationResult {
  const profile = getAsanaCoachingProfile(asanaId);
  return {
    asanaId: profile.asanaId,
    asanaName: profile.asanaName,
    category: profile.category,
    startingPosition: profile.startingPosition,
    overallStatus: "needs_adjustment",
    score: 60,
    rawScore: 60,
    detectedIssues: [],
    successfulRules: [],
    primaryCorrection: null,
    primaryIssue: null,
    confidence: 0.95,
    completionEligible: false,
    totalRules: 4,
    evaluatedRules: 4,
    evaluatedAt: 1000,
    ...overrides,
  };
}

describe("Phase 4: Asana-Specific FeedbackEngine", () => {
  let engine: FeedbackEngine;

  beforeEach(() => {
    engine = new FeedbackEngine({
      requiredFrames: 3,
      releaseFrames: 2,
      generalCooldownMs: 4000,
      repeatRuleCooldownMs: 8000,
      positiveCooldownMs: 6000,
      safetyCooldownMs: 2000,
    });
  });

  // ───────────────────────────────────────────────────────────────────────────
  // 1. ASANA-SPECIFIC COACHING MESSAGES (MULTIPLE ASANAS)
  // ───────────────────────────────────────────────────────────────────────────
  describe("1. Multi-Asana Specific Coaching Messages", () => {
    it("generates specific Warrior II front knee correction instead of generic advice", () => {
      const kneeIssue: AsanaDetectedIssue = {
        issue: "front_knee",
        ruleId: "warrior-ii-left-knee-angle",
        ruleName: "Front Knee Bend",
        status: "incorrect",
        severity: "high",
        correction: "Bend your front knee directly over your ankle, aiming for a 90-degree angle.",
      };

      const evalResult = createMockEvaluation("warrior-ii", {
        detectedIssues: [kneeIssue],
      });

      // Frames 1 and 2: candidate accumulation (smoothing)
      assert.strictEqual(engine.processEvaluation(evalResult, { timestamp: 1000 }), null);
      assert.strictEqual(engine.processEvaluation(evalResult, { timestamp: 1033 }), null);

      // Frame 3: threshold reached -> triggers specific feedback
      const feedback = engine.processEvaluation(evalResult, { timestamp: 1066 });
      assert.ok(feedback !== null);
      assert.strictEqual(feedback?.asanaId, "warrior-ii");
      assert.strictEqual(feedback?.type, "pose_correction");
      assert.strictEqual(feedback?.priority, 2); // High severity
      assert.strictEqual(feedback?.sourceRule, "warrior-ii-left-knee-angle");
      assert.ok(
        feedback?.message.includes("knee") && feedback?.message.includes("ankle"),
        `Expected specific knee correction, got: ${feedback?.message}`
      );
    });

    it("generates specific Cobra Pose chest lift correction", () => {
      const chestIssue: AsanaDetectedIssue = {
        issue: "chest_lift",
        ruleId: "bhujangasana.chest.lift",
        ruleName: "Chest Lift Extension",
        status: "incorrect",
        severity: "high",
        correction: "Lift your chest off the mat using your back muscles while keeping your hips grounded.",
      };

      const evalResult = createMockEvaluation("bhujangasana", {
        detectedIssues: [chestIssue],
      });

      engine.processEvaluation(evalResult, { timestamp: 1000 });
      engine.processEvaluation(evalResult, { timestamp: 1033 });
      const feedback = engine.processEvaluation(evalResult, { timestamp: 1066 });

      assert.ok(feedback !== null);
      assert.strictEqual(feedback?.asanaId, "bhujangasana");
      assert.strictEqual(feedback?.sourceRule, "bhujangasana.chest.lift");
      assert.ok(
        feedback?.message.includes("chest") && feedback?.message.includes("mat"),
        `Expected specific cobra cue, got: ${feedback?.message}`
      );
    });

    it("generates specific Seated Lotus Pose spine lengthening correction", () => {
      const spineIssue: AsanaDetectedIssue = {
        issue: "spine",
        ruleId: "padmasana.spine.vertical",
        ruleName: "Upright Spine",
        status: "incorrect",
        severity: "high",
        correction: "Sit tall on your sitting bones and lengthen your spine toward the ceiling.",
      };

      const evalResult = createMockEvaluation("padmasana", {
        detectedIssues: [spineIssue],
      });

      engine.processEvaluation(evalResult, { timestamp: 1000 });
      engine.processEvaluation(evalResult, { timestamp: 1033 });
      const feedback = engine.processEvaluation(evalResult, { timestamp: 1066 });

      assert.ok(feedback !== null);
      assert.strictEqual(feedback?.asanaId, "padmasana");
      assert.ok(
        feedback?.message.includes("sitting bones") || feedback?.message.includes("spine"),
        `Expected seated spine cue, got: ${feedback?.message}`
      );
    });

    it("generates specific Chaturanga core line correction", () => {
      const coreIssue: AsanaDetectedIssue = {
        issue: "core_line",
        ruleId: "chaturanga.body.line",
        ruleName: "Straight Body Plank Line",
        status: "incorrect",
        severity: "high",
        correction: "Engage your core firmly to keep your body in a straight plank line.",
      };

      const evalResult = createMockEvaluation("chaturanga-dandasana", {
        detectedIssues: [coreIssue],
      });

      engine.processEvaluation(evalResult, { timestamp: 1000 });
      engine.processEvaluation(evalResult, { timestamp: 1033 });
      const feedback = engine.processEvaluation(evalResult, { timestamp: 1066 });

      assert.ok(feedback !== null);
      assert.strictEqual(feedback?.asanaId, "chaturanga-dandasana");
      assert.ok(feedback?.message.includes("core"));
    });
  });

  // ───────────────────────────────────────────────────────────────────────────
  // 2. MULTI-DEFECT PRIORITY ARBITRATION
  // ───────────────────────────────────────────────────────────────────────────
  describe("2. Multi-Defect Priority Arbitration", () => {
    it("prioritizes safety issues over high severity and medium severity issues", () => {
      const medIssue: AsanaDetectedIssue = {
        issue: "shoulders",
        ruleId: "warrior-ii-shoulder-alignment",
        ruleName: "Shoulder Level",
        status: "warning",
        severity: "medium",
        correction: "Keep shoulders level and relaxed.",
      };

      const highIssue: AsanaDetectedIssue = {
        issue: "knee",
        ruleId: "warrior-ii-left-knee-angle",
        ruleName: "Front Knee Bend",
        status: "incorrect",
        severity: "high",
        correction: "Bend your front knee over your ankle.",
      };

      const safetyIssue: AsanaDetectedIssue = {
        issue: "knee_joint_safety",
        ruleId: "warrior-ii-knee-safety",
        ruleName: "Knee Hyperextension Safety",
        status: "incorrect",
        severity: "high",
        isSafety: true,
        correction: "Ease back slightly to protect your front knee joint.",
      };

      const evalResult = createMockEvaluation("warrior-ii", {
        detectedIssues: [medIssue, highIssue, safetyIssue], // Deliberately unsorted
      });

      // Safety issues bypass frame debounce
      const feedback = engine.processEvaluation(evalResult, { timestamp: 1000 });

      assert.ok(feedback !== null);
      assert.strictEqual(feedback?.priority, 1);
      assert.strictEqual(feedback?.type, "safety_warning");
      assert.strictEqual(feedback?.sourceRule, "warrior-ii-knee-safety");
      assert.strictEqual(feedback?.message, safetyIssue.correction);
    });

    it("prioritizes major high-severity defect over secondary medium-severity defect", () => {
      const medIssue: AsanaDetectedIssue = {
        issue: "shoulders",
        ruleId: "warrior-ii-shoulder-alignment",
        ruleName: "Shoulder Level",
        status: "warning",
        severity: "medium",
        correction: "Keep shoulders level and relaxed.",
      };

      const highIssue: AsanaDetectedIssue = {
        issue: "front_knee",
        ruleId: "warrior-ii-left-knee-angle",
        ruleName: "Front Knee Bend",
        status: "incorrect",
        severity: "high",
        correction: "Bend your front knee over your ankle.",
      };

      const evalResult = createMockEvaluation("warrior-ii", {
        detectedIssues: [medIssue, highIssue],
      });

      engine.processEvaluation(evalResult, { timestamp: 1000 });
      engine.processEvaluation(evalResult, { timestamp: 1033 });
      const feedback = engine.processEvaluation(evalResult, { timestamp: 1066 });

      assert.ok(feedback !== null);
      assert.strictEqual(feedback?.priority, 2);
      assert.strictEqual(feedback?.sourceRule, "warrior-ii-left-knee-angle");
    });
  });

  // ───────────────────────────────────────────────────────────────────────────
  // 3. TEMPORAL STABILITY & ANTI-FLOODING
  // ───────────────────────────────────────────────────────────────────────────
  describe("3. Temporal Stability & Anti-Flooding Cooldowns", () => {
    it("suppresses single-frame transient noise without emitting speech", () => {
      const glitchIssue: AsanaDetectedIssue = {
        issue: "knee_glitch",
        ruleId: "warrior-ii-left-knee-angle",
        ruleName: "Front Knee Bend",
        status: "incorrect",
        severity: "high",
        correction: "Bend your front knee over your ankle.",
      };

      const dirtyEval = createMockEvaluation("warrior-ii", { detectedIssues: [glitchIssue] });
      const cleanEval = createMockEvaluation("warrior-ii", { detectedIssues: [], score: 90, overallStatus: "good" });

      // Frame 1: Glitch occurs
      assert.strictEqual(engine.processEvaluation(dirtyEval, { timestamp: 1000 }), null);
      // Frame 2: Glitch disappears -> clean form
      assert.strictEqual(engine.processEvaluation(cleanEval, { timestamp: 1033 }), null);
      // Frame 3: Clean form continues
      assert.strictEqual(engine.processEvaluation(cleanEval, { timestamp: 1066 }), null);
    });

    it("enforces cooldowns between consecutive speech events", () => {
      const issueA: AsanaDetectedIssue = {
        issue: "knee",
        ruleId: "warrior-ii-left-knee-angle",
        ruleName: "Front Knee Bend",
        status: "incorrect",
        severity: "high",
        correction: "Bend your front knee over your ankle.",
      };

      const evalResult = createMockEvaluation("warrior-ii", { detectedIssues: [issueA] });

      // Trigger first feedback at 1066ms
      engine.processEvaluation(evalResult, { timestamp: 1000 });
      engine.processEvaluation(evalResult, { timestamp: 1033 });
      const fb1 = engine.processEvaluation(evalResult, { timestamp: 1066 });
      assert.ok(fb1 !== null);

      // Next frame at 1100ms (within 4000ms cooldown) -> rejected
      assert.strictEqual(engine.processEvaluation(evalResult, { timestamp: 1100 }), null);

      // At 3000ms (still within 4000ms general cooldown) -> rejected
      assert.strictEqual(engine.processEvaluation(evalResult, { timestamp: 3000 }), null);

      // At 6000ms (>4000ms general cooldown, but within 8000ms repeat rule cooldown) -> rejected for same rule
      assert.strictEqual(engine.processEvaluation(evalResult, { timestamp: 6000 }), null);

      // At 10000ms (>8000ms repeat rule cooldown) -> allowed
      const fb2 = engine.processEvaluation(evalResult, { timestamp: 10000 });
      assert.ok(fb2 !== null);
      assert.strictEqual(fb2?.sourceRule, "warrior-ii-left-knee-angle");
    });
  });

  // ───────────────────────────────────────────────────────────────────────────
  // 4. RESOLUTION & POSITIVE FEEDBACK
  // ───────────────────────────────────────────────────────────────────────────
  describe("4. Issue Resolution & Positive Feedback", () => {
    it("emits positive feedback when a previously announced issue is resolved", () => {
      const issue: AsanaDetectedIssue = {
        issue: "knee",
        ruleId: "warrior-ii-left-knee-angle",
        ruleName: "Front Knee Bend",
        status: "incorrect",
        severity: "high",
        correction: "Bend your front knee over your ankle.",
        resolvedText: "Front knee alignment looks great.",
      };

      const faultyEval = createMockEvaluation("warrior-ii", { detectedIssues: [issue] });
      const goodEval = createMockEvaluation("warrior-ii", {
        detectedIssues: [],
        score: 92,
        overallStatus: "good",
      });

      // 1. Announce issue
      engine.processEvaluation(faultyEval, { timestamp: 1000 });
      engine.processEvaluation(faultyEval, { timestamp: 1033 });
      const fbFault = engine.processEvaluation(faultyEval, { timestamp: 1066 });
      assert.ok(fbFault !== null);

      // 2. User fixes issue at timestamp 6000ms
      const fbGood = engine.processEvaluation(goodEval, { timestamp: 6000 });
      assert.ok(fbGood !== null);
      assert.strictEqual(fbGood?.type, "positive_reinforcement");
      assert.strictEqual(fbGood?.message, "Front knee alignment looks great.");
    });
  });
});
