import { describe, it } from "node:test";
import assert from "node:assert";

import {
  getAsanaStartingInstruction,
  getAsanaCalibrationInstruction,
} from "../AsanaStartingInstructionService";
import { registerCustomCoachingProfile } from "../AsanaCoachingProfileService";
import type { AsanaCoachingProfile } from "../../types/coaching-profile";
import { CoachingEventBuilder } from "../../voice/CoachingEventBuilder";

describe("Phase 5: Dynamic Asana Starting Instructions", () => {
  // ── 1. STANDING POSES ───────────────────────────────────────────────────────
  describe("1. Standing Stance Postures", () => {
    it("returns specific Warrior II wide stance entry instruction", () => {
      const instruction = getAsanaStartingInstruction("warrior-ii");
      assert.ok(
        instruction.toLowerCase().includes("wide") || instruction.toLowerCase().includes("step"),
        `Expected wide stance setup for Warrior II, got: "${instruction}"`
      );
    });

    it("returns grounded standing entry instruction for Tadasana", () => {
      const instruction = getAsanaStartingInstruction("tadasana");
      assert.ok(
        instruction.toLowerCase().includes("stand") && instruction.toLowerCase().includes("feet"),
        `Expected feet grounded setup for Tadasana, got: "${instruction}"`
      );
    });

    it("returns balance setup instruction for Tree Pose", () => {
      const instruction = getAsanaStartingInstruction("vrksasana");
      assert.ok(
        instruction.toLowerCase().includes("weight") || instruction.toLowerCase().includes("balance") || instruction.toLowerCase().includes("foot"),
        `Expected balance entry for Tree Pose, got: "${instruction}"`
      );
    });
  });

  // ── 2. SEATED POSES ────────────────────────────────────────────────────────
  describe("2. Seated Stance Postures", () => {
    it("returns seated upright instruction for Lotus Pose (Padmasana)", () => {
      const instruction = getAsanaStartingInstruction("padmasana");
      assert.ok(
        instruction.toLowerCase().includes("sit") || instruction.toLowerCase().includes("crossed"),
        `Expected seated instruction for Lotus, got: "${instruction}"`
      );
      assert.strictEqual(
        instruction.toLowerCase().includes("stand tall"),
        false,
        "Seated pose must NOT contain 'stand tall'"
      );
    });

    it("returns seated legs extended instruction for Paschimottanasana (Seated Forward Bend)", () => {
      const instruction = getAsanaStartingInstruction("paschimottanasana");
      assert.ok(
        instruction.toLowerCase().includes("sit") || instruction.toLowerCase().includes("seated"),
        `Expected seated instruction for Paschimottanasana, got: "${instruction}"`
      );
      assert.strictEqual(
        instruction.toLowerCase().includes("stand tall"),
        false,
        "Seated pose must NOT contain 'stand tall'"
      );
    });
  });

  // ── 3. BENDING & KNEELING POSES ────────────────────────────────────────────
  describe("3. Bending & Kneeling Postures", () => {
    it("returns kneeling hip-to-heels instruction for Child's Pose (Balasana)", () => {
      const instruction = getAsanaStartingInstruction("balasana");
      assert.ok(
        instruction.toLowerCase().includes("kneel") || instruction.toLowerCase().includes("heels"),
        `Expected kneeling entry for Child's Pose, got: "${instruction}"`
      );
      assert.strictEqual(
        instruction.toLowerCase().includes("stand tall"),
        false,
        "Child's pose must NOT contain 'stand tall'"
      );
    });

    it("returns hip hinge fold instruction for Uttanasana (Standing Forward Fold)", () => {
      const instruction = getAsanaStartingInstruction("uttanasana");
      assert.ok(
        instruction.toLowerCase().includes("hinge") || instruction.toLowerCase().includes("fold") || instruction.toLowerCase().includes("stand"),
        `Expected hinge/fold entry for Uttanasana, got: "${instruction}"`
      );
    });
  });

  // ── 4. LYING POSES (PRONE & SUPINE) ────────────────────────────────────────
  describe("4. Lying Postures (Prone & Supine)", () => {
    it("returns prone stomach entry instruction for Cobra Pose (Bhujangasana)", () => {
      const instruction = getAsanaStartingInstruction("bhujangasana");
      assert.ok(
        instruction.toLowerCase().includes("stomach") || instruction.toLowerCase().includes("prone"),
        `Expected stomach/prone entry for Cobra Pose, got: "${instruction}"`
      );
      assert.strictEqual(
        instruction.toLowerCase().includes("stand tall"),
        false,
        "Prone cobra must NOT contain 'stand tall'"
      );
    });

    it("returns supine back-lying instruction for Bridge Pose (Setu Bandhasana)", () => {
      const instruction = getAsanaStartingInstruction("setu-bandhasana");
      assert.ok(
        instruction.toLowerCase().includes("back") && (instruction.toLowerCase().includes("lie") || instruction.toLowerCase().includes("knees")),
        `Expected supine/back entry for Bridge Pose, got: "${instruction}"`
      );
      assert.strictEqual(
        instruction.toLowerCase().includes("stand tall"),
        false,
        "Supine bridge must NOT contain 'stand tall'"
      );
    });
  });

  // ── 5. PLANK POSES ─────────────────────────────────────────────────────────
  describe("5. Plank Stance Postures", () => {
    it("returns strong plank hands beneath shoulders instruction for Chaturanga", () => {
      const instruction = getAsanaStartingInstruction("chaturanga-dandasana");
      assert.ok(
        instruction.toLowerCase().includes("plank") || instruction.toLowerCase().includes("elbows"),
        `Expected plank setup for Chaturanga, got: "${instruction}"`
      );
      assert.strictEqual(
        instruction.toLowerCase().includes("stand tall"),
        false,
        "Plank must NOT contain 'stand tall'"
      );
    });
  });

  // ── 6. 3-TIER FALLBACK HIERARCHY & SAFETY ──────────────────────────────────
  describe("6. Fallback Hierarchy & Safety Verification", () => {
    it("prioritizes profile.entryInstruction over category fallback (Tier 1)", () => {
      const customProfile: AsanaCoachingProfile = {
        asanaId: "custom-special-pose",
        asanaName: "Special Pose",
        category: "standing",
        difficulty: "beginner",
        startingPosition: "standing",
        movementType: "static_hold",
        entryInstruction: "Custom exact physical instruction: Cross your arms and sink low.",
        executionInstructions: [],
        keyAlignmentPoints: [],
        relevantJoints: [],
        poseRules: [],
        corrections: [],
        successFeedback: ["Great job!"],
        voiceGuidance: {
          entryPrompt: "Custom entry prompt.",
          calibrationPrompt: "Custom calibration.",
          holdPrompt: "Hold here.",
          completionPrompt: "Done.",
        },
        isComplete: true,
      };

      registerCustomCoachingProfile(customProfile);

      const instruction = getAsanaStartingInstruction("custom-special-pose");
      assert.strictEqual(instruction, "Custom exact physical instruction: Cross your arms and sink low.");
    });

    it("falls back to stance-specific guidance when custom instruction is empty (Tier 2)", () => {
      const emptyInstructionProfile: AsanaCoachingProfile = {
        asanaId: "empty-instruction-seated-pose",
        asanaName: "Empty Seated Pose",
        category: "seated",
        difficulty: "beginner",
        startingPosition: "seated",
        movementType: "static_hold",
        entryInstruction: "",
        executionInstructions: [],
        keyAlignmentPoints: [],
        relevantJoints: [],
        poseRules: [],
        corrections: [],
        successFeedback: [],
        voiceGuidance: {
          entryPrompt: "",
          calibrationPrompt: "",
          holdPrompt: "",
          completionPrompt: "",
        },
        isComplete: false,
      };

      registerCustomCoachingProfile(emptyInstructionProfile);

      const instruction = getAsanaStartingInstruction("empty-instruction-seated-pose");
      assert.ok(
        instruction.toLowerCase().includes("sit") || instruction.toLowerCase().includes("seated"),
        `Expected stance fallback, got: "${instruction}"`
      );
      assert.strictEqual(instruction.toLowerCase().includes("stand tall"), false);
    });

    it("generates stance-aware CoachingEvents in CoachingEventBuilder", () => {
      const event = CoachingEventBuilder.buildPoseStartedEvent("bhujangasana", "Cobra Pose");
      assert.strictEqual(event.type, "pose_started");
      assert.strictEqual(event.asanaId, "bhujangasana");
      assert.ok(
        event.feedback?.toLowerCase().includes("stomach") || event.feedback?.toLowerCase().includes("prone"),
        `Expected stance-aware event feedback, got: "${event.feedback}"`
      );
      assert.strictEqual(event.feedback?.toLowerCase().includes("stand tall"), false);
    });
  });
});
