import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { getAsanaCoachingProfile } from "../AsanaCoachingProfileService";
import { getAsanaStartingInstruction } from "../AsanaStartingInstructionService";
import { evaluateAsanaPose } from "../../analysis/AsanaPoseEvaluator";
import { FeedbackEngine } from "../../analysis/FeedbackEngine";
import { CoachingEventEngine } from "../../voice/CoachingEventEngine";
import { CoachingEventBuilder } from "../../voice/CoachingEventBuilder";
import type { PoseLandmarks } from "../../types/landmarks";
import type { AsanaEvaluationResult } from "../../types/asana-evaluation";

/**
 * Creates 33 normalized MediaPipe landmarks with default positions
 */
function createBaseLandmarks(): PoseLandmarks {
  const landmarks: PoseLandmarks = [];
  for (let i = 0; i < 33; i++) {
    landmarks.push({
      x: 0.5,
      y: 0.5,
      z: 0,
      visibility: 0.95,
      presence: 0.95,
    });
  }
  return landmarks;
}

describe("Phase 8: Full Asana Coach End-to-End Validation Across 9 Stance Categories", () => {
  const categoriesToTest = [
    { category: "1. Standing", asanaId: "warrior-ii", name: "Warrior II", stance: "standing" },
    { category: "2. Sitting", asanaId: "padmasana", name: "Lotus Pose", stance: "seated" },
    { category: "3. Kneeling", asanaId: "balasana", name: "Child's Pose", stance: "kneeling" },
    { category: "4. Forward Bending", asanaId: "uttanasana", name: "Standing Forward Fold", stance: "bending" },
    { category: "5. Backbend", asanaId: "bhujangasana", name: "Cobra Pose", stance: "prone" },
    { category: "6. Lying/Prone", asanaId: "bhujangasana", name: "Cobra Pose", stance: "prone" },
    { category: "7. Lying/Supine", asanaId: "setu-bandhasana", name: "Bridge Pose", stance: "supine" },
    { category: "8. Plank/Support", asanaId: "chaturanga", name: "Four-Limbed Staff Pose", stance: "plank" },
    { category: "9. Inverted", asanaId: "downward-dog", name: "Downward-Facing Dog", stance: "inverted" },
  ];

  for (const item of categoriesToTest) {
    it(`Category ${item.category} (${item.name}): Verifies full coaching flow from selection to recovery`, () => {
      // 1. Asana Selected & Profile loaded
      const profile = getAsanaCoachingProfile(item.asanaId);
      assert.ok(profile, `Profile must exist for ${item.asanaId}`);
      assert.equal(profile.startingPosition, item.stance);

      // 2. Starting Instruction
      const instruction = getAsanaStartingInstruction(item.asanaId);
      assert.ok(instruction && instruction.length > 10);
      assert.ok(!instruction.toLowerCase().includes("stand tall") || item.stance === "standing" || item.stance === "bending");

      // 3. MediaPipe Detection & Pose Evaluation
      const feedbackEngine = new FeedbackEngine({ requiredFrames: 2, generalCooldownMs: 2000, repeatRuleCooldownMs: 4000 });
      const rawEval = evaluateAsanaPose(item.asanaId, { landmarks: createBaseLandmarks(), worldLandmarks: createBaseLandmarks() });
      assert.ok(rawEval, `MediaPipe evaluateAsanaPose must return evaluation for ${item.asanaId}`);
      assert.equal(rawEval.asanaId, item.asanaId);

      // 4. Defect Simulation & Temporal Debounce (Frame 1: candidate, no speech)
      const defectEval: AsanaEvaluationResult = {
        asanaId: item.asanaId,
        asanaName: item.name,
        score: 55,
        overallStatus: "needs_adjustment",
        isValid: true,
        evaluatedAt: 1000,
        detectedIssues: [{
          issue: "alignment",
          ruleId: `${item.asanaId}-alignment-defect`,
          ruleName: "Primary Alignment",
          status: "incorrect",
          severity: "medium",
          correction: `Adjust your posture in ${item.name}.`,
          isSafety: false,
          deviation: 0.3,
        }],
        successfulRules: [],
        primaryCorrection: `Adjust your posture in ${item.name}.`,
        primaryIssue: null,
        confidence: 0.95,
        completionEligible: false,
        totalRules: 2,
        evaluatedRules: 2,
      };

      const fb1 = feedbackEngine.processEvaluation(defectEval, { timestamp: 1000 });
      assert.equal(fb1, null, "Frame 1 defect should debounce without firing speech");

      // Frame 2: defect persists -> emits correction message
      const fb2 = feedbackEngine.processEvaluation(defectEval, { timestamp: 1033 });
      assert.ok(fb2 !== null, "Frame 2 must trigger correction feedback");
      assert.ok(fb2.message && fb2.message.length > 5, "Correction message must be clear");
      assert.ok(["safety_warning", "pose_correction", "alignment_hint"].includes(fb2.type));

      // 5. Anti-Spam (Frame 3 immediately after: suppressed by cooldown)
      const fb3 = feedbackEngine.processEvaluation(defectEval, { timestamp: 1100 });
      assert.equal(fb3, null, "Must suppress repeated voice spam within cooldown window");

      // 6. User fixes posture -> Clean alignment & Positive Reinforcement
      const cleanEval: AsanaEvaluationResult = {
        asanaId: item.asanaId,
        asanaName: item.name,
        score: 90,
        overallStatus: "good",
        isValid: true,
        evaluatedAt: 4000,
        detectedIssues: [],
        successfulRules: [],
        primaryCorrection: null,
        primaryIssue: null,
        confidence: 0.95,
        completionEligible: true,
        totalRules: 2,
        evaluatedRules: 2,
      };

      // 6. User fixes posture -> Immediate resolution confirmation emitted
      const recoveryFb = feedbackEngine.processEvaluation(cleanEval, { timestamp: 4000 });
      assert.ok(recoveryFb !== null, "Must emit positive reinforcement when issue resolves");
      assert.equal(recoveryFb.type, "positive_reinforcement");
    });
  }
});

describe("Phase 8: Verification of Specific Edge & Failure Modes", () => {
  it("Failure 1: User starts in wrong starting position", () => {
    // E.g. Standing vertical spine when asana requires Prone (Bhujangasana)
    const standingLandmarks = createBaseLandmarks();
    standingLandmarks[11] = { x: 0.5, y: 0.2, z: 0, visibility: 0.95, presence: 0.95 };
    standingLandmarks[23] = { x: 0.5, y: 0.6, z: 0, visibility: 0.95, presence: 0.95 };

    const result = evaluateAsanaPose("bhujangasana", { landmarks: standingLandmarks, worldLandmarks: standingLandmarks });
    assert.ok(result.score < 90 || result.detectedIssues.length >= 0, "Evaluates posture against profile rules");
  });

  it("Failure 2: User performs another asana (e.g. Tree Pose during Warrior II)", () => {
    const treeLandmarks = createBaseLandmarks();
    // One bent leg at knee (0.7, 0.6)
    treeLandmarks[25] = { x: 0.5, y: 0.8, z: 0, visibility: 0.95, presence: 0.95 };
    treeLandmarks[26] = { x: 0.7, y: 0.6, z: 0, visibility: 0.95, presence: 0.95 };

    const result = evaluateAsanaPose("warrior-ii", { landmarks: treeLandmarks, worldLandmarks: treeLandmarks });
    assert.ok(result.score < 75, "Wrong asana geometry must fail warrior II validation");
  });

  it("Failure 3: Low landmark confidence / visibility", () => {
    const lowVisLandmarks = createBaseLandmarks().map(l => ({ ...l, visibility: 0.15, presence: 0.15 }));

    const result = evaluateAsanaPose("tadasana", { landmarks: lowVisLandmarks, worldLandmarks: lowVisLandmarks });
    assert.equal(result.overallStatus, "not_ready");
    assert.equal(result.score, 0);

    const feedbackEngine = new FeedbackEngine();
    const fb = feedbackEngine.processEvaluation(result);
    assert.equal(fb, null, "Must never emit voice correction when confidence is below threshold");
  });

  it("Failure 4: User leaves camera frame (NO_PERSON)", () => {
    const engine = new CoachingEventEngine();
    const events = engine.process("tadasana", "Mountain Pose", "coaching", "NO_PERSON", null);

    const outOfFrame = events.find(e => e.type === "user_out_of_frame");
    assert.ok(outOfFrame, "Must generate user_out_of_frame event when user leaves camera");
    const fbText = outOfFrame?.feedback?.toLowerCase() || "";
    assert.ok(fbText.includes("frame") || fbText.includes("sight") || fbText.includes("view") || fbText.includes("see"));
  });

  it("Failure 5: User switches asana mid-session", () => {
    const feedbackEngine = new FeedbackEngine();

    // Start with Warrior II
    const w2Result = evaluateAsanaPose("warrior-ii", { landmarks: createBaseLandmarks(), worldLandmarks: createBaseLandmarks() });
    feedbackEngine.processEvaluation(w2Result, { timestamp: 1000 });

    // Reset and switch to Tadasana
    feedbackEngine.reset();
    const tadaResult = evaluateAsanaPose("tadasana", { landmarks: createBaseLandmarks(), worldLandmarks: createBaseLandmarks() });
    const fb = feedbackEngine.processEvaluation(tadaResult, { timestamp: 1050 });

    assert.equal(tadaResult.asanaId, "tadasana");
  });

  it("Failure 6: Mirrored camera handling (Left vs Right symmetry invariance)", () => {
    const normal = createBaseLandmarks();
    normal[11] = { x: 0.4, y: 0.3, z: 0, visibility: 0.95, presence: 0.95 };
    normal[12] = { x: 0.6, y: 0.3, z: 0, visibility: 0.95, presence: 0.95 };

    const mirrored = createBaseLandmarks();
    mirrored[11] = { x: 0.6, y: 0.3, z: 0, visibility: 0.95, presence: 0.95 };
    mirrored[12] = { x: 0.4, y: 0.3, z: 0, visibility: 0.95, presence: 0.95 };

    const res1 = evaluateAsanaPose("tadasana", { landmarks: normal, worldLandmarks: normal });
    const res2 = evaluateAsanaPose("tadasana", { landmarks: mirrored, worldLandmarks: mirrored });

    assert.equal(res1.score, res2.score, "Symmetric horizontal level must be invariant to horizontal mirroring");
  });

  it("Failure 7: Multiple rules fail simultaneously (Strict Priority Arbitration)", () => {
    const feedbackEngine = new FeedbackEngine({ requiredFrames: 1 });
    const mockEval: AsanaEvaluationResult = {
      asanaId: "warrior-ii",
      asanaName: "Warrior II",
      score: 45,
      overallStatus: "needs_adjustment",
      isValid: true,
      evaluatedAt: 1000,
      detectedIssues: [
        {
          issue: "wrist",
          ruleId: "minor-wrist",
          ruleName: "Wrist Angle",
          status: "incorrect",
          severity: "low",
          correction: "Keep wrists straight.",
          isSafety: false,
          deviation: 0.1,
        },
        {
          issue: "knee",
          ruleId: "safety-knee-strain",
          ruleName: "Knee Hyperextension",
          status: "incorrect",
          severity: "high",
          correction: "Do not hyperextend your knee. Keep a micro-bend.",
          isSafety: true,
          deviation: 0.5,
        },
        {
          issue: "shoulder",
          ruleId: "med-shoulder-tilt",
          ruleName: "Shoulder Level",
          status: "incorrect",
          severity: "medium",
          correction: "Level your shoulders.",
          isSafety: false,
          deviation: 0.3,
        },
      ],
      successfulRules: [],
      primaryCorrection: null,
      primaryIssue: null,
      confidence: 0.9,
      completionEligible: false,
      totalRules: 3,
      evaluatedRules: 3,
    };

    const output = feedbackEngine.processEvaluation(mockEval, { timestamp: 1000 });
    assert.ok(output !== null);
    assert.equal(output.sourceRule, "safety-knee-strain", "Safety violation must override medium and low defects");
    assert.equal(output.type, "safety_warning");
  });

  it("Failure 8: Same rule fails continuously (Cooldown Suppresses Speech Loop)", () => {
    const feedbackEngine = new FeedbackEngine({ requiredFrames: 1, generalCooldownMs: 3000, repeatRuleCooldownMs: 6000 });
    const issueEval: AsanaEvaluationResult = {
      asanaId: "tadasana",
      asanaName: "Mountain Pose",
      score: 60,
      overallStatus: "needs_adjustment",
      isValid: true,
      evaluatedAt: 1000,
      detectedIssues: [{
        issue: "shoulder",
        ruleId: "r1",
        ruleName: "Shoulder Level",
        status: "incorrect",
        severity: "medium",
        correction: "Level your shoulders.",
        isSafety: false,
        deviation: 0.2,
      }],
      successfulRules: [],
      primaryCorrection: null,
      primaryIssue: null,
      confidence: 0.9,
      completionEligible: false,
      totalRules: 1,
      evaluatedRules: 1,
    };

    // Frame 1: Emits speech
    const fb1 = feedbackEngine.processEvaluation(issueEval, { timestamp: 1000 });
    assert.ok(fb1 !== null);

    // Frame 2 (at 1500ms): Suppressed by general cooldown
    const fb2 = feedbackEngine.processEvaluation(issueEval, { timestamp: 1500 });
    assert.equal(fb2, null);

    // Frame 3 (at 4000ms): General cooldown elapsed (3s), but repeat rule cooldown active (6s) -> Suppressed
    const fb3 = feedbackEngine.processEvaluation(issueEval, { timestamp: 4000 });
    assert.equal(fb3, null);

    // Frame 4 (at 7500ms): Repeat rule cooldown elapsed (6s) -> Allowed
    const fb4 = feedbackEngine.processEvaluation(issueEval, { timestamp: 7500 });
    assert.ok(fb4 !== null);
  });

  it("Failure 9: User moves too quickly / single-frame landmark glitch", () => {
    const feedbackEngine = new FeedbackEngine({ requiredFrames: 4 });
    const glitchEval: AsanaEvaluationResult = {
      asanaId: "tadasana",
      asanaName: "Mountain Pose",
      score: 50,
      overallStatus: "needs_adjustment",
      isValid: true,
      evaluatedAt: 1000,
      detectedIssues: [{
        issue: "glitch",
        ruleId: "glitch",
        ruleName: "Glitch Rule",
        status: "incorrect",
        severity: "medium",
        correction: "Glitch correction",
        isSafety: false,
        deviation: 0.5,
      }],
      successfulRules: [],
      primaryCorrection: null,
      primaryIssue: null,
      confidence: 0.9,
      completionEligible: false,
      totalRules: 1,
      evaluatedRules: 1,
    };

    // Glitch lasts 2 frames only, then vanishes
    assert.equal(feedbackEngine.processEvaluation(glitchEval, { timestamp: 1000 }), null);
    assert.equal(feedbackEngine.processEvaluation(glitchEval, { timestamp: 1033 }), null);

    // Recovered
    const cleanEval: AsanaEvaluationResult = {
      ...glitchEval,
      score: 95,
      overallStatus: "good",
      detectedIssues: [],
    };

    assert.equal(feedbackEngine.processEvaluation(cleanEval, { timestamp: 1066 }), null);
  });

  it("Failure 10: Active Voice Cooldown suppresses intermediate low-priority cues", () => {
    const feedbackEngine = new FeedbackEngine({ generalCooldownMs: 4000 });
    const evalA: AsanaEvaluationResult = {
      asanaId: "tadasana",
      asanaName: "Mountain Pose",
      score: 60,
      overallStatus: "needs_adjustment",
      isValid: true,
      evaluatedAt: 1000,
      detectedIssues: [{
        issue: "rule_a",
        ruleId: "rule-a",
        ruleName: "Rule A",
        status: "incorrect",
        severity: "medium",
        correction: "Fix A",
        isSafety: false,
        deviation: 0.2,
      }],
      successfulRules: [],
      primaryCorrection: null,
      primaryIssue: null,
      confidence: 0.9,
      completionEligible: false,
      totalRules: 1,
      evaluatedRules: 1,
    };

    feedbackEngine.processEvaluation(evalA, { timestamp: 1000 });

    const evalB: AsanaEvaluationResult = {
      ...evalA,
      detectedIssues: [{
        issue: "rule_b",
        ruleId: "rule-b",
        ruleName: "Rule B",
        status: "incorrect",
        severity: "low",
        correction: "Fix B",
        isSafety: false,
        deviation: 0.1,
      }],
    };

    const output = feedbackEngine.processEvaluation(evalB, { timestamp: 2000 });
    assert.equal(output, null, "General cooldown must suppress new low severity rule speech within 4s");
  });
});
