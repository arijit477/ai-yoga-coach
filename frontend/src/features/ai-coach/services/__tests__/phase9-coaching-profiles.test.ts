import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { ALL_ASANAS_CATALOG } from "../../data/allAsanasCatalog";
import {
  getAsanaCoachingProfile,
  validateCoachingProfile,
} from "../AsanaCoachingProfileService";
import { getAsanaStartingInstruction } from "../AsanaStartingInstructionService";
import type { AsanaStartingStance } from "../../types/coaching-profile";

describe("Phase 9: Asana-Specific Coaching Profiles Specification & Completeness", () => {
  const VALID_STANCES: AsanaStartingStance[] = [
    "standing",
    "seated",
    "kneeling",
    "all_fours",
    "prone",
    "supine",
    "plank",
    "bending",
    "inverted",
    "arm_balance",
  ];

  describe("1. Target Poses Stance & Entry Cue Validation", () => {
    it("Warrior II has stance 'standing' and specific entry cue", () => {
      const profile = getAsanaCoachingProfile("warrior-ii");
      assert.equal(profile.stance, "standing");
      assert.ok(profile.entryCue.toLowerCase().includes("feet wide") || profile.entryCue.toLowerCase().includes("front knee"));
      assert.ok(profile.goodFormAffirmation.toLowerCase().includes("warrior ii"));
      assert.ok(profile.completionCue.toLowerCase().includes("feet together") || profile.completionCue.toLowerCase().includes("straighten"));
    });

    it("Cobra Pose has stance 'prone' and appropriate belly-down cue (never universal 'Stand tall')", () => {
      const profile = getAsanaCoachingProfile("bhujangasana");
      assert.equal(profile.stance, "prone");
      assert.ok(
        profile.entryCue.toLowerCase().includes("stomach") ||
        profile.entryCue.toLowerCase().includes("prone") ||
        profile.entryCue.toLowerCase().includes("hands"),
      );
      assert.ok(!profile.entryCue.toLowerCase().includes("stand tall"), "Cobra Pose must never instruct to 'Stand tall'");
      const startup = getAsanaStartingInstruction("bhujangasana");
      assert.ok(!startup.toLowerCase().includes("stand tall"), "Cobra startup instruction must not be 'Stand tall'");
    });

    it("Bridge Pose has stance 'supine' and back-lying cue (never universal 'Stand tall')", () => {
      const profile = getAsanaCoachingProfile("setu-bandhasana");
      assert.equal(profile.stance, "supine");
      assert.ok(
        profile.entryCue.toLowerCase().includes("back") ||
        profile.entryCue.toLowerCase().includes("feet"),
      );
      assert.ok(!profile.entryCue.toLowerCase().includes("stand tall"), "Bridge Pose must never instruct to 'Stand tall'");
      const startup = getAsanaStartingInstruction("setu-bandhasana");
      assert.ok(!startup.toLowerCase().includes("stand tall"), "Bridge startup instruction must not be 'Stand tall'");
    });

    it("Lotus Pose has stance 'seated' and seated spine cue (never universal 'Stand tall')", () => {
      const profile = getAsanaCoachingProfile("padmasana");
      assert.equal(profile.stance, "seated");
      assert.ok(
        profile.entryCue.toLowerCase().includes("sit") ||
        profile.entryCue.toLowerCase().includes("legs crossed"),
      );
      assert.ok(!profile.entryCue.toLowerCase().includes("stand tall"), "Lotus Pose must never instruct to 'Stand tall'");
      const startup = getAsanaStartingInstruction("padmasana");
      assert.ok(!startup.toLowerCase().includes("stand tall"), "Lotus startup instruction must not be 'Stand tall'");
    });

    it("Child's Pose has stance 'kneeling' and folding cue (never universal 'Stand tall')", () => {
      const profile = getAsanaCoachingProfile("balasana");
      assert.equal(profile.stance, "kneeling");
      assert.ok(
        profile.entryCue.toLowerCase().includes("kneel") ||
        profile.entryCue.toLowerCase().includes("heels") ||
        profile.entryCue.toLowerCase().includes("hips"),
      );
      assert.ok(!profile.entryCue.toLowerCase().includes("stand tall"), "Child's Pose must never instruct to 'Stand tall'");
      const startup = getAsanaStartingInstruction("balasana");
      assert.ok(!startup.toLowerCase().includes("stand tall"), "Child's Pose startup instruction must not be 'Stand tall'");
    });

    it("Downward Dog has stance 'inverted' and inverted V / hands cue (never universal 'Stand tall')", () => {
      const profile = getAsanaCoachingProfile("adho-mukha-svanasana");
      assert.equal(profile.stance, "inverted");
      assert.ok(
        profile.entryCue.toLowerCase().includes("all fours") ||
        profile.entryCue.toLowerCase().includes("hands") ||
        profile.entryCue.toLowerCase().includes("hips") ||
        profile.entryCue.toLowerCase().includes("tuck"),
      );
      assert.ok(!profile.entryCue.toLowerCase().includes("stand tall"), "Downward Dog must never instruct to 'Stand tall'");
    });
  });

  describe("2. Profile Completeness Across All Active Asanas (170 Inventory)", () => {
    it("Verifies every active asana in ALL_ASANAS_CATALOG has a complete coaching profile", () => {
      assert.equal(ALL_ASANAS_CATALOG.length, 170, "Total active asanas in catalog must be 170");

      const missingProfiles: string[] = [];
      const invalidProfiles: Array<{ id: string; missingFields: string[] }> = [];

      for (const asana of ALL_ASANAS_CATALOG) {
        const id = asana.id || asana.slug;
        const profile = getAsanaCoachingProfile(id);

        if (!profile) {
          missingProfiles.push(id);
          continue;
        }

        const validation = validateCoachingProfile(profile);
        if (!validation.isValid) {
          invalidProfiles.push({ id, missingFields: validation.missingFields });
        }

        // Deep field assertions
        assert.ok(profile.asanaId, `Asana ${id} missing asanaId`);
        assert.ok(profile.asanaName, `Asana ${id} missing asanaName`);
        assert.ok(VALID_STANCES.includes(profile.stance), `Asana ${id} has invalid stance: ${profile.stance}`);
        assert.ok(typeof profile.entryCue === "string" && profile.entryCue.trim().length > 0, `Asana ${id} missing entryCue`);
        assert.ok(Array.isArray(profile.focusAreas) && profile.focusAreas.length > 0, `Asana ${id} missing focusAreas`);
        assert.ok(Array.isArray(profile.requiredRegions) && profile.requiredRegions.length > 0, `Asana ${id} missing requiredRegions`);
        assert.ok(typeof profile.goodFormAffirmation === "string" && profile.goodFormAffirmation.trim().length > 0, `Asana ${id} missing goodFormAffirmation`);
        assert.ok(typeof profile.holdMindfulnessCue === "string" && profile.holdMindfulnessCue.trim().length > 0, `Asana ${id} missing holdMindfulnessCue`);
        assert.ok(typeof profile.completionCue === "string" && profile.completionCue.trim().length > 0, `Asana ${id} missing completionCue`);
      }

      assert.equal(missingProfiles.length, 0, `Missing profiles: ${missingProfiles.join(", ")}`);
      assert.equal(invalidProfiles.length, 0, `Invalid profiles: ${JSON.stringify(invalidProfiles)}`);
    });
  });

  describe("3. Universal 'Stand Tall' Fallback Removal Test", () => {
    it("Verifies non-standing asanas never receive a generic 'Stand tall' instruction", () => {
      const nonStandingStances: AsanaStartingStance[] = [
        "seated",
        "kneeling",
        "all_fours",
        "prone",
        "supine",
        "plank",
        "inverted",
        "arm_balance",
      ];

      for (const asana of ALL_ASANAS_CATALOG) {
        const id = asana.id || asana.slug;
        const profile = getAsanaCoachingProfile(id);

        if (nonStandingStances.includes(profile.stance)) {
          const entry = profile.entryCue.toLowerCase();
          const startup = getAsanaStartingInstruction(id).toLowerCase();

          assert.ok(
            !entry.startsWith("stand tall"),
            `Asana ${id} (stance: ${profile.stance}) incorrectly starts entryCue with 'Stand tall': "${profile.entryCue}"`,
          );
          assert.ok(
            !startup.startsWith("stand tall"),
            `Asana ${id} (stance: ${profile.stance}) incorrectly starts startup instruction with 'Stand tall': "${startup}"`,
          );
        }
      }
    });
  });

  describe("4. Stance Distribution Statistics", () => {
    it("Calculates and verifies coverage across all 10 stance categories", () => {
      const counts: Record<AsanaStartingStance, number> = {
        standing: 0,
        seated: 0,
        kneeling: 0,
        all_fours: 0,
        prone: 0,
        supine: 0,
        plank: 0,
        bending: 0,
        inverted: 0,
        arm_balance: 0,
      };

      for (const asana of ALL_ASANAS_CATALOG) {
        const id = asana.id || asana.slug;
        const profile = getAsanaCoachingProfile(id);
        counts[profile.stance] = (counts[profile.stance] || 0) + 1;
      }

      console.log("PHASE_9_STANCE_BREAKDOWN:", JSON.stringify(counts));

      const total = Object.values(counts).reduce((a, b) => a + b, 0);
      assert.equal(total, 170, "Sum of all stance counts must equal 170");

      // Verify each stance is utilized
      assert.ok(counts.standing > 0, "Standing count must be > 0");
      assert.ok(counts.seated > 0, "Seated count must be > 0");
      assert.ok(counts.kneeling > 0, "Kneeling count must be > 0");
      assert.ok(counts.all_fours > 0, "All fours count must be > 0");
      assert.ok(counts.prone > 0, "Prone count must be > 0");
      assert.ok(counts.supine > 0, "Supine count must be > 0");
      assert.ok(counts.plank > 0, "Plank count must be > 0");
      assert.ok(counts.bending > 0, "Bending count must be > 0");
      assert.ok(counts.inverted > 0, "Inverted count must be > 0");
      assert.ok(counts.arm_balance > 0, "Arm balance count must be > 0");
    });
  });
});
