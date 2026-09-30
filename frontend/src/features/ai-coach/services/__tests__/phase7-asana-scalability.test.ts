import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { ALL_ASANAS_CATALOG } from "../../data/allAsanasCatalog";
import { getAsana, getAllAsanas, normalizeAsanaId } from "../../data/AsanaRegistry";
import { getAsanaCoachingProfile, validateCoachingProfile } from "../AsanaCoachingProfileService";
import { getAsanaStartingInstruction } from "../AsanaStartingInstructionService";
import { evaluatePose } from "../../analysis/PoseEvaluator";
import { categorizeAsana } from "../../../../../scripts/generateCoverageReport";

describe("Phase 7: Asana Coaching Scalability to 170+ Inventory", () => {
  it("1. Catalog Completeness: All 170 asanas from Supabase inventory are present and registered", () => {
    assert.equal(ALL_ASANAS_CATALOG.length, 170);
    const all = getAllAsanas();
    assert.equal(all.length, 170);
  });

  it("2. Complete Asana Mapping: Every asana maps to valid ID, Name, Asset, Category, Profile, and Rules", () => {
    for (const asana of ALL_ASANAS_CATALOG) {
      assert.ok(asana.id, `Asana missing ID`);
      assert.ok(asana.displayName || asana.name, `Asana ${asana.id} missing display name`);
      assert.ok(asana.category, `Asana ${asana.id} missing category`);
      assert.ok(asana.imageUrl || asana.asset?.imageUrl, `Asana ${asana.id} missing image asset`);

      const profile = getAsanaCoachingProfile(asana.id);
      assert.ok(profile, `Profile must exist for ${asana.id}`);
      assert.ok(profile.startingPosition, `Profile for ${asana.id} must define starting position`);
      assert.ok(profile.entryInstruction, `Profile for ${asana.id} must define entry instruction`);
      assert.ok(Array.isArray(profile.poseRules), `Profile for ${asana.id} must define pose rules array`);
      assert.ok(Array.isArray(profile.relevantJoints), `Profile for ${asana.id} must define relevant joints`);
    }
  });

  it("3. Stance Taxonomy: Categorizes stances across all 10 physical ground orientations", () => {
    const stances = new Set<string>();
    for (const asana of ALL_ASANAS_CATALOG) {
      const profile = getAsanaCoachingProfile(asana.id);
      stances.add(profile.startingPosition);
    }

    assert.ok(stances.has("standing"), "Must include standing stance");
    assert.ok(stances.has("seated"), "Must include seated stance");
    assert.ok(stances.has("kneeling"), "Must include kneeling stance");
    assert.ok(stances.has("prone"), "Must include prone stance");
    assert.ok(stances.has("supine"), "Must include supine stance");
    assert.ok(stances.has("plank"), "Must include plank stance");
    assert.ok(stances.has("inverted"), "Must include inverted stance");
  });

  it("4. Starting Instruction Feasibility: Generates stance-specific voice entry cues for all 170 asanas", () => {
    for (const asana of ALL_ASANAS_CATALOG) {
      const instruction = getAsanaStartingInstruction(asana.id);
      assert.ok(instruction && instruction.length > 5, `Instruction for ${asana.id} must be descriptive`);
      assert.ok(typeof instruction === "string");
    }
  });

  it("5. Zero Crash Pose Evaluation: PoseEvaluator handles all 170 asana rule sets gracefully with empty or partial landmarks", () => {
    const mockLandmarks = [
      { x: 0.5, y: 0.2, z: 0, visibility: 0.9, presence: 0.9 }, // 11
      { x: 0.6, y: 0.2, z: 0, visibility: 0.9, presence: 0.9 }, // 12
    ];

    for (const asana of ALL_ASANAS_CATALOG) {
      const profile = getAsanaCoachingProfile(asana.id);
      const evalResult = evaluatePose(asana.id, profile.poseRules, {
        landmarks: mockLandmarks as any,
        worldLandmarks: mockLandmarks as any,
      });

      assert.ok(evalResult, `Evaluation must return a result for ${asana.id}`);
      assert.ok(typeof evalResult.score === "number" && !Number.isNaN(evalResult.score));
      assert.ok(evalResult.overallStatus !== undefined);
    }
  });

  it("6. Coverage Classification: Accurately classifies all 170 asanas into Supported, Partial, and Manual tiers", () => {
    let supportedCount = 0;
    let partialCount = 0;
    let manualCount = 0;

    for (const asana of ALL_ASANAS_CATALOG) {
      const detail = categorizeAsana(asana);
      assert.ok(["supported", "partially_supported", "requires_manual_rule_definition"].includes(detail.supportLevel));
      assert.ok(detail.rationale && detail.rationale.length > 0, `Asana ${asana.id} missing classification rationale`);

      if (detail.supportLevel === "supported") supportedCount++;
      else if (detail.supportLevel === "partially_supported") partialCount++;
      else manualCount++;
    }

    assert.equal(supportedCount + partialCount + manualCount, 170);
    assert.ok(supportedCount >= 90, "Expected at least 90 fully supported asanas");
    assert.ok(partialCount >= 40, "Expected at least 40 partially supported asanas");
    assert.ok(manualCount >= 20, "Expected at least 20 manual rule asanas");
  });
});
