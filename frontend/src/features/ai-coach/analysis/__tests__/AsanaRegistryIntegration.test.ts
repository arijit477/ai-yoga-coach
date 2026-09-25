import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  AsanaRegistry,
  getAsana,
  hasAsana,
  getAllAsanas,
  getFreeAsanas,
  getPremiumAsanas,
  normalizeAsanaId,
} from "../../data/AsanaRegistry.ts";
import { getRequiredLandmarks, getRequiredBodyRegions } from "../AsanaLandmarkRequirements.ts";
import { evaluatePose } from "../PoseEvaluator.ts";
import type { PoseRule } from "../../types/pose-rules.ts";
import type { PoseLandmarks } from "../../types/landmarks.ts";

describe("Asana Registry & Asset Integration Tests", () => {
  describe("1. Filename Normalization", () => {
    it("normalizes standard .webp filenames to stable asana IDs", () => {
      assert.equal(normalizeAsanaId("cobra-bhujangasana.webp"), "cobra-bhujangasana");
      assert.equal(normalizeAsanaId("boat-navasana.webp"), "boat-navasana");
      assert.equal(normalizeAsanaId("childs-pose-balasana.webp"), "childs-pose-balasana");
    });

    it("handles URL paths and query strings gracefully", () => {
      assert.equal(
        normalizeAsanaId("https://example.com/assets/tree-vrksasana.webp?version=1.2"),
        "tree-vrksasana",
      );
    });

    it("handles variations in extensions and casing", () => {
      assert.equal(normalizeAsanaId("Mountain-Tadasana.PNG"), "mountain-tadasana");
      assert.equal(normalizeAsanaId("warrior-ii-virabhadrasana-ii.jpg"), "warrior-ii-virabhadrasana-ii");
    });
  });

  describe("2. AsanaRegistry Lookups & Aliases", () => {
    it("retrieves total of 170 registered Supabase asanas", () => {
      const all = getAllAsanas();
      assert.equal(all.length, 170);
    });

    it("resolves primary IDs accurately", () => {
      const cobra = getAsana("cobra-bhujangasana");
      assert.ok(cobra);
      assert.equal(cobra?.displayName, "Cobra Pose");
      assert.equal(cobra?.sanskritName, "Bhujangasana");
      assert.ok(cobra?.asset.imageUrl.includes("cobra-bhujangasana.webp"));
    });

    it("resolves aliases seamlessly (e.g. tadasana, warrior-ii, tree-pose)", () => {
      const mountain = getAsana("tadasana");
      assert.ok(mountain);
      assert.equal(mountain?.id, "mountain-tadasana");

      const warrior = getAsana("warrior-ii");
      assert.ok(warrior);
      assert.equal(warrior?.id, "warrior-ii-virabhadrasana-ii");

      const tree = getAsana("tree-pose");
      assert.ok(tree);
      assert.equal(tree?.id, "tree-vrksasana");
    });

    it("returns null for unknown IDs without throwing", () => {
      assert.equal(getAsana("non-existent-pose-xyz"), null);
      assert.equal(hasAsana("non-existent-pose-xyz"), false);
    });

    it("partitions free vs premium asanas correctly", () => {
      const free = getFreeAsanas();
      const premium = getPremiumAsanas();
      assert.ok(free.length > 0);
      assert.ok(premium.length > 0);
      assert.equal(free.length + premium.length, 170);
    });
  });

  describe("3. Required Landmarks Extraction & Body Region Mapping", () => {
    it("derives exact landmarks from rule points array", () => {
      const testRules: PoseRule[] = [
        {
          id: "rule-arms",
          name: "Arms",
          metric: "angle",
          points: [11, 13, 15],
          comparison: "between",
          min: 160,
          max: 180,
          weight: 1,
          severity: "medium",
          feedback: "Straighten arms",
        },
        {
          id: "rule-legs",
          name: "Legs",
          metric: "angle",
          points: [23, 25, 27],
          comparison: "between",
          min: 90,
          max: 110,
          weight: 2,
          severity: "high",
          feedback: "Bend knee",
        },
      ];

      const required = getRequiredLandmarks(testRules);
      assert.deepEqual(required, [11, 13, 15, 23, 25, 27]);

      const regions = getRequiredBodyRegions(required);
      assert.ok(regions.includes("shoulders"));
      assert.ok(regions.includes("elbows"));
      assert.ok(regions.includes("wrists"));
      assert.ok(regions.includes("hips"));
      assert.ok(regions.includes("knees"));
      assert.ok(regions.includes("ankles"));
    });

    it("every registered asana has valid requiredLandmarks derived", () => {
      const all = getAllAsanas();
      for (const asana of all) {
        assert.ok(asana.requiredLandmarks.length > 0, `Asana ${asana.id} missing required landmarks`);
        assert.ok(Array.isArray(asana.rules), `Asana ${asana.id} missing rules array`);
      }
    });
  });

  describe("4. Missing Landmark Handling & UNKNOWN Rule Status", () => {
    it("evaluates rules with missing landmarks as UNKNOWN, never PASS or FAIL", () => {
      const asana = getAsana("warrior-ii-virabhadrasana-ii");
      assert.ok(asana);

      // Create mock landmarks with only upper body visible (missing legs)
      const mockLandmarks: PoseLandmarks = [];
      for (let i = 0; i < 33; i++) {
        if (i === 11 || i === 12 || i === 15 || i === 16) {
          mockLandmarks.push({ x: 0.5, y: 0.5, z: 0, visibility: 0.95, presence: 0.95 });
        } else {
          mockLandmarks.push({ x: 0, y: 0, z: 0, visibility: 0, presence: 0 });
        }
      }

      const result = evaluatePose(asana.id, asana.rules, {
        landmarks: mockLandmarks,
        worldLandmarks: mockLandmarks,
      });

      const unknownRules = result.rules.filter((r) => r.status === "unknown");
      assert.ok(unknownRules.length > 0, "Leg rules must evaluate to unknown when legs missing");
      assert.equal(result.summary.failedRules, 0, "Unknown rules must not count as failed");
    });
  });

  describe("5. Validation Status Distinctions", () => {
    it("explicitly distinguishes production/validated rules from draft rules", () => {
      const warrior = getAsana("warrior-ii-virabhadrasana-ii");
      assert.equal(warrior?.validation?.status, "production");
      assert.equal(warrior?.validation?.expertReviewed, true);

      const mountain = getAsana("mountain-tadasana");
      assert.equal(mountain?.validation?.status, "production");

      const draftPose = getAsana("banana-supta-nitambasana");
      assert.equal(draftPose?.validation?.status, "draft");
      assert.equal(draftPose?.validation?.expertReviewed, false);
    });
  });
});
