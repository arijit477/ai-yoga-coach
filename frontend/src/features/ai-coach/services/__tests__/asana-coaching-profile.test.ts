import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  getAsanaCoachingProfile,
  hasAsanaCoachingProfile,
  validateCoachingProfile,
  registerCustomCoachingProfile,
  getAllAsanaCoachingProfiles,
} from "../AsanaCoachingProfileService";
import type { AsanaCoachingProfile } from "../../types/coaching-profile";

describe("Phase 2 Asana Coaching Profile System Tests", () => {
  // 1. Core Profile Retrieval
  it("1. getAsanaCoachingProfile returns complete hand-authored profiles for foundational asanas", () => {
    const warrior = getAsanaCoachingProfile("warrior-ii");
    assert.equal(warrior.asanaId, "warrior-ii");
    assert.equal(warrior.asanaName, "Warrior II");
    assert.equal(warrior.startingPosition, "standing");
    assert.equal(warrior.isComplete, true);
    assert.ok(warrior.corrections.length >= 2);
    assert.ok(warrior.voiceGuidance.entryPrompt.includes("Step"));

    const tadasana = getAsanaCoachingProfile("tadasana");
    assert.equal(tadasana.startingPosition, "standing");
    assert.equal(tadasana.isComplete, true);

    const tree = getAsanaCoachingProfile("vrksasana");
    assert.equal(tree.startingPosition, "standing");
    assert.equal(tree.movementType, "balance_stabilization");
    assert.equal(tree.isComplete, true);
  });

  // 2. Starting Position Taxonomy Verification
  it("2. startingPosition correctly categorizes standing, seated, prone, supine, kneeling, and inverted poses", () => {
    // Prone (stomach)
    const cobra = getAsanaCoachingProfile("bhujangasana");
    assert.equal(cobra.startingPosition, "prone");
    assert.match(cobra.entryInstruction, /stomach|prone/i);
    assert.doesNotMatch(cobra.entryInstruction, /stand tall/i);

    // Seated
    const lotus = getAsanaCoachingProfile("padmasana");
    assert.equal(lotus.startingPosition, "seated");
    assert.match(lotus.entryInstruction, /sit/i);
    assert.doesNotMatch(lotus.entryInstruction, /stand tall/i);

    // Supine (back)
    const bridge = getAsanaCoachingProfile("setu-bandhasana");
    assert.equal(bridge.startingPosition, "supine");
    assert.match(bridge.entryInstruction, /back|supine/i);
    assert.doesNotMatch(bridge.entryInstruction, /stand tall/i);

    // Kneeling
    const childs = getAsanaCoachingProfile("balasana");
    assert.equal(childs.startingPosition, "kneeling");
    assert.match(childs.entryInstruction, /kneel/i);
    assert.doesNotMatch(childs.entryInstruction, /stand tall/i);

    // Inverted / All Fours
    const dog = getAsanaCoachingProfile("adho-mukha-svanasana");
    assert.ok(dog.startingPosition === "inverted" || dog.stance === "inverted");
    assert.match(dog.entryInstruction, /all fours|hands and knees|tuck your toes/i);
  });

  // 3. Stance-Aware Fallback Generation for Inventory Asanas
  it("3. getAsanaCoachingProfile generates stance-aware fallback profiles for inventory poses without inventing false data", () => {
    // Archer's pose (seated in inventory)
    const archer = getAsanaCoachingProfile("archers-akarna-dhanurasana");
    assert.equal(archer.startingPosition, "seated");
    assert.match(archer.voiceGuidance.entryPrompt, /sit|archer/i);
    assert.equal(archer.isComplete, false); // Identifiable fallback placeholder
    assert.ok(archer.placeholderNotes);

    // Banana pose (supta / supine)
    const banana = getAsanaCoachingProfile("banana-supta-nitambasana");
    assert.equal(banana.startingPosition, "supine");
    assert.match(banana.voiceGuidance.entryPrompt, /lie comfortably on your back/i);
    assert.equal(banana.isComplete, false);
  });

  // 4. Profile Validation Service
  it("4. validateCoachingProfile correctly identifies complete vs incomplete profiles", () => {
    const warrior = getAsanaCoachingProfile("warrior-ii");
    const valResult = validateCoachingProfile(warrior);
    assert.equal(valResult.isValid, true);
    assert.equal(valResult.isComplete, true);
    assert.equal(valResult.missingFields.length, 0);

    const incompleteProfile: Partial<AsanaCoachingProfile> = {
      asanaId: "test-pose",
      // missing asanaName, startingPosition, entryInstruction, voiceGuidance
    };
    const invalidResult = validateCoachingProfile(incompleteProfile);
    assert.equal(invalidResult.isValid, false);
    assert.ok(invalidResult.missingFields.includes("asanaName"));
    assert.ok(invalidResult.missingFields.includes("startingPosition"));
  });

  // 5. Custom Profile Registration
  it("5. registerCustomCoachingProfile allows dynamic runtime profile registration", () => {
    const customProfile: AsanaCoachingProfile = {
      asanaId: "custom-warrior",
      asanaName: "Custom Warrior",
      category: "standing",
      difficulty: "intermediate",
      startingPosition: "standing",
      movementType: "balance_stabilization",
      entryInstruction: "Step wide into custom warrior.",
      executionInstructions: ["Step wide", "Align arms"],
      keyAlignmentPoints: ["Front knee", "Arms"],
      relevantJoints: ["left_knee", "right_knee"],
      poseRules: [],
      corrections: [],
      successFeedback: ["Great custom warrior!"],
      voiceGuidance: {
        entryPrompt: "Step into custom warrior.",
        calibrationPrompt: "Hold still.",
        holdPrompt: "Hold steady.",
        completionPrompt: "Release custom warrior.",
      },
      isComplete: true,
    };

    registerCustomCoachingProfile(customProfile);
    assert.equal(hasAsanaCoachingProfile("custom-warrior"), true);

    const retrieved = getAsanaCoachingProfile("custom-warrior");
    assert.equal(retrieved.asanaName, "Custom Warrior");
    assert.equal(retrieved.isComplete, true);
  });

  // 6. Bulk Profiles Listing
  it("6. getAllAsanaCoachingProfiles returns all loaded profiles", () => {
    const all = getAllAsanaCoachingProfiles();
    assert.ok(all.length >= 8);
    const ids = all.map((p) => p.asanaId);
    assert.ok(ids.includes("warrior-ii"));
    assert.ok(ids.includes("tadasana"));
    assert.ok(ids.includes("bhujangasana"));
    assert.ok(ids.includes("padmasana"));
  });
});
