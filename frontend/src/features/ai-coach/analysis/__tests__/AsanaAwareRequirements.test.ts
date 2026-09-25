import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";

import type { PoseRule } from "../../types/pose-rules.ts";
import type { PoseLandmarks } from "../../types/landmarks.ts";
import {
  getRequiredLandmarks,
  getRequiredBodyRegions,
  getAsanaLandmarkRequirements,
  clearAsanaRequirementsCache,
  formatAsanaReadinessDebug,
} from "../AsanaLandmarkRequirements.ts";
import { evaluateCameraReadiness } from "../../motion/CameraReadinessEvaluator.ts";
import { CameraReadinessTracker } from "../../motion/CameraReadinessTracker.ts";
import { evaluatePose } from "../PoseEvaluator.ts";
import { TemporalPoseEvaluator } from "../TemporalPoseEvaluator.ts";

function createMockLandmarks(visibleIndices: number[]): PoseLandmarks {
  const landmarks: PoseLandmarks = [];
  for (let i = 0; i < 33; i++) {
    if (visibleIndices.includes(i)) {
      landmarks.push({
        x: 0.5,
        y: 0.5,
        z: 0.0,
        visibility: 0.95,
        presence: 0.95,
      });
    } else {
      landmarks.push({
        x: 0.0,
        y: 0.0,
        z: 0.0,
        visibility: 0.0,
        presence: 0.0,
      });
    }
  }
  return landmarks;
}

describe("Step 9 — Asana-Aware Landmark Requirements", () => {
  beforeEach(() => {
    clearAsanaRequirementsCache();
  });

  describe("1. Rule -> Landmark Dependencies & Deduplication", () => {
    it("derives exact required landmarks from a rule's points array", () => {
      const armRule: PoseRule = {
        id: "left-elbow-angle",
        name: "Left Arm Angle",
        metric: "angle",
        points: [11, 13, 15],
        comparison: "between",
        min: 160,
        max: 180,
        weight: 1,
        severity: "medium",
        feedback: "Straighten left arm",
      };

      const required = getRequiredLandmarks([armRule]);
      assert.deepEqual(required, [11, 13, 15]);
    });

    it("deduplicates and sorts landmarks across multiple rules", () => {
      const rules: PoseRule[] = [
        {
          id: "rule-1",
          name: "Shoulders",
          metric: "horizontal_alignment",
          points: [11, 12],
          comparison: "less_than",
          target: 0.05,
          weight: 1,
          severity: "low",
          feedback: "Keep shoulders level",
        },
        {
          id: "rule-2",
          name: "Left Arm",
          metric: "angle",
          points: [11, 13, 15], // shares 11
          comparison: "between",
          min: 80,
          max: 100,
          weight: 1,
          severity: "medium",
          feedback: "Raise arm",
        },
        {
          id: "rule-3",
          name: "Right Arm",
          metric: "angle",
          points: [12, 14, 16], // shares 12
          comparison: "between",
          min: 80,
          max: 100,
          weight: 1,
          severity: "medium",
          feedback: "Raise arm",
        },
      ];

      const required = getRequiredLandmarks(rules);
      assert.deepEqual(required, [11, 12, 13, 14, 15, 16]);
    });
  });

  describe("2. Landmark Indices -> Body Region Mapping", () => {
    it("maps upper body landmarks to shoulders, elbows, and wrists", () => {
      const regions = getRequiredBodyRegions([11, 12, 13, 14, 15, 16]);
      assert.ok(regions.includes("shoulders"));
      assert.ok(regions.includes("elbows"));
      assert.ok(regions.includes("wrists"));
      assert.ok(!regions.includes("feet"));
      assert.ok(!regions.includes("knees"));
      assert.ok(!regions.includes("hips"));
    });

    it("maps lower body landmarks to hips, knees, and ankles/feet", () => {
      const regions = getRequiredBodyRegions([23, 24, 25, 26, 27, 28]);
      assert.ok(regions.includes("hips"));
      assert.ok(regions.includes("knees"));
      assert.ok(regions.includes("ankles"));
      assert.ok(!regions.includes("elbows"));
      assert.ok(!regions.includes("wrists"));
    });
  });

  describe("3. Camera Readiness for Asanas (Feet Required vs Not Required)", () => {
    it("does NOT warn about missing feet when asana only requires upper body", () => {
      // Upper body asana: requires shoulders (11, 12), elbows (13, 14), wrists (15, 16)
      const upperBodyRules: PoseRule[] = [
        {
          id: "arms-horizontal",
          name: "Arms Level",
          metric: "horizontal_alignment",
          points: [15, 16],
          comparison: "less_than",
          target: 0.05,
          weight: 1,
          severity: "medium",
          feedback: "Keep arms level",
        },
      ];

      const reqs = getAsanaLandmarkRequirements("upper-body-test", upperBodyRules);
      assert.ok(!reqs.requiredRegions.includes("feet"));

      // User has shoulders, elbows, wrists visible, but NO feet
      const landmarks = createMockLandmarks([11, 12, 13, 14, 15, 16]);

      const readiness = evaluateCameraReadiness(landmarks, {
        requiredLandmarks: reqs.requiredLandmarks,
        requiredRegions: reqs.requiredRegions,
      });

      assert.equal(readiness.ready, true);
      assert.equal(readiness.state, "camera_ready");
      assert.equal(readiness.guidance, "camera_ready");
      assert.deepEqual(readiness.missing, []);
    });

    it("WARNS about missing feet when asana explicitly requires feet/legs", () => {
      // Standing asana requiring feet/ankles
      const standingRules: PoseRule[] = [
        {
          id: "standing-knee",
          name: "Standing Knee Straight",
          metric: "angle",
          points: [23, 25, 27],
          comparison: "between",
          min: 160,
          max: 180,
          weight: 1,
          severity: "high",
          feedback: "Keep standing leg straight",
        },
      ];

      const reqs = getAsanaLandmarkRequirements("standing-test", standingRules);
      assert.ok(reqs.requiredRegions.includes("knees"));
      assert.ok(reqs.requiredRegions.includes("ankles"));

      // User only has upper body visible (missing hips, knees, ankles)
      const landmarks = createMockLandmarks([11, 12, 13, 14]);

      const readiness = evaluateCameraReadiness(landmarks, {
        requiredLandmarks: reqs.requiredLandmarks,
        requiredRegions: reqs.requiredRegions,
      });

      assert.equal(readiness.ready, false);
      assert.equal(readiness.state, "camera_partial");
      assert.ok(readiness.missing.length > 0);
    });
  });

  describe("4. CameraReadinessTracker Asana Awareness", () => {
    it("reports READY when all asana-specific required landmarks are visible", () => {
      const tracker = new CameraReadinessTracker(() => {});

      tracker.updateCameraStatus("enabled");
      tracker.setRequiredLandmarks([11, 12, 13, 14]); // only shoulders and elbows

      const landmarks = createMockLandmarks([11, 12, 13, 14]);
      tracker.updatePoseDetection(landmarks);

      assert.equal(tracker.getCurrentState(), "CAMERA_READY");
    });

    it("reports PARTIAL_BODY when required landmarks are missing", () => {
      const tracker = new CameraReadinessTracker(() => {});
      tracker.updateCameraStatus("enabled");
      tracker.setRequiredLandmarks([11, 12, 25, 27]); // shoulders + knee + ankle

      // Only shoulders visible
      const landmarks = createMockLandmarks([11, 12]);
      tracker.updatePoseDetection(landmarks);

      assert.equal(tracker.getCurrentState(), "PARTIAL_BODY");
    });
  });

  describe("5. Pose Validity & UNKNOWN Rules Handling", () => {
    it("marks rules with missing required landmarks as UNKNOWN without counting as FAIL", () => {
      const rules: PoseRule[] = [
        {
          id: "shoulder-level",
          name: "Shoulders Level",
          metric: "horizontal_alignment",
          points: [11, 12],
          comparison: "less_than",
          target: 0.05,
          tolerance: 0.05,
          weight: 1,
          severity: "low",
          feedback: "Keep shoulders level",
        },
        {
          id: "knee-angle",
          name: "Knee Angle",
          metric: "angle",
          points: [23, 25, 27],
          comparison: "between",
          min: 80,
          max: 100,
          weight: 2,
          severity: "high",
          feedback: "Bend knee to 90 degrees",
        },
      ];

      // Context with only shoulders visible (11, 12)
      const landmarks = createMockLandmarks([11, 12]);
      const result = evaluatePose("test-pose", rules, {
        landmarks,
        worldLandmarks: landmarks,
      });

      // Shoulder rule should pass
      assert.equal(result.rules[0].status, "pass");
      // Knee rule must be unknown (not fail!)
      assert.equal(result.rules[1].status, "unknown");
      // Summary checks
      assert.equal(result.summary.passedRules, 1);
      assert.equal(result.summary.failedRules, 0);
      assert.equal(result.summary.unknownRules, 1);
      // No failure issues generated
      assert.deepEqual(result.issues, []);
    });

    it("TemporalPoseEvaluator returns invalid when required landmarks are missing", () => {
      const evaluator = new TemporalPoseEvaluator();
      const rules: PoseRule[] = [
        {
          id: "knee-1",
          name: "Knee 1",
          metric: "angle",
          points: [23, 25, 27],
          comparison: "between",
          min: 80,
          max: 100,
          weight: 1,
          severity: "medium",
          feedback: "Bend knee",
        },
        {
          id: "knee-2",
          name: "Knee 2",
          metric: "angle",
          points: [24, 26, 28],
          comparison: "between",
          min: 160,
          max: 180,
          weight: 1,
          severity: "medium",
          feedback: "Straighten leg",
        },
      ];

      // No lower body landmarks in frame
      const landmarks = createMockLandmarks([11, 12]);
      const res = evaluator.evaluate("test-asana", rules, {
        landmarks,
        worldLandmarks: landmarks,
      });

      assert.equal(res?.isValid, false);
      assert.equal(res?.displayedScore, undefined);
    });
  });

  describe("6. Real Asanas Requirements Verification", () => {
    it("derives correct requirements for Mountain Pose (tadasana)", () => {
      const reqs = getAsanaLandmarkRequirements("tadasana");
      assert.ok(reqs.requiredLandmarks.length > 0);
      assert.ok(reqs.requiredRegions.includes("shoulders"));
      assert.ok(reqs.requiredRegions.includes("hips"));
      assert.ok(reqs.requiredRegions.includes("knees"));
    });

    it("derives correct requirements for Warrior II (warrior-ii)", () => {
      const reqs = getAsanaLandmarkRequirements("warrior-ii");
      assert.ok(reqs.requiredLandmarks.includes(11)); // shoulder
      assert.ok(reqs.requiredLandmarks.includes(13)); // elbow
      assert.ok(reqs.requiredLandmarks.includes(15)); // wrist
      assert.ok(reqs.requiredLandmarks.includes(23)); // hip
      assert.ok(reqs.requiredLandmarks.includes(25)); // knee
      assert.ok(reqs.requiredLandmarks.includes(27)); // ankle
    });

    it("formats debug string correctly", () => {
      const reqs = getAsanaLandmarkRequirements("warrior-ii");
      const debug = formatAsanaReadinessDebug("warrior-ii", reqs, [], "READY");
      assert.ok(debug.includes("Active Asana: warrior-ii"));
      assert.ok(debug.includes("Readiness: READY"));
    });
  });
});
