import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";

import { getAsanaDefinition } from "../rules/asanas";
import { getAsana, resolveCanonicalAsanaId, AsanaRegistry } from "../../data/AsanaRegistry";
import { ensureAsanaRules } from "../rules/poseRulesRegistry";
import { getPoseRules } from "../RuleEngine";
import { evaluatePose } from "../PoseEvaluator";
import { CoachingEventEngine } from "../../voice/CoachingEventEngine";
import type { NormalizedLandmark } from "../../types/landmarks";
import type { PoseEvaluationResult, PoseIssue } from "../../types/pose-rules";

describe("Surya Namaskar Asana ID Resolution & Posture Progression Regression Tests", () => {
  let eventEngine: CoachingEventEngine;

  beforeEach(() => {
    eventEngine = new CoachingEventEngine();
    eventEngine.reset();
  });

  const suryaSteps = [
    "step-01-prayer-pranamasana",
    "step-02-raised-arms-hastauttanasana",
    "step-03-standing-forward-bend-hastapadasana",
    "step-04-equestrian-right-back-ashwa-sanchalanasana",
    "step-05-plank-dandasana",
    "step-06-eight-limbed-salute-ashtanga-namaskara",
    "step-07-cobra-bhujangasana",
    "step-08-downward-dog-adho-mukha-svanasana",
    "step-09-equestrian-left-back-ashwa-sanchalanasana",
    "step-10-standing-forward-bend-hastapadasana",
    "step-11-raised-arms-hastauttanasana",
    "step-12-mountain-tadasana",
  ];

  // Helper to construct synthetic landmarks
  const createBaseLandmarks = (): NormalizedLandmark[] => {
    const lms: NormalizedLandmark[] = [];
    for (let i = 0; i < 33; i++) {
      lms.push({ x: 0.5, y: 0.5, z: 0, visibility: 0.95 });
    }
    return lms;
  };

  // TEST 1: step-01-prayer-pranamasana resolves to the correct pranamasana definition.
  it("TEST 1: step-01-prayer-pranamasana resolves to the correct pranamasana definition", () => {
    const def = getAsanaDefinition("step-01-prayer-pranamasana");
    assert.ok(def, "Expected step-01-prayer-pranamasana to resolve to a definition");
    assert.ok(
      def.id.includes("mountain") || def.id.includes("tadasana") || def.id.includes("pranamasana"),
      `Unexpected resolved definition ID: ${def.id}`
    );
    assert.ok(def.rules && def.rules.length > 0, "Expected rules to be present");
  });

  // TEST 2: step-02-raised-arms-hastauttanasana resolves to the correct definition.
  it("TEST 2: step-02-raised-arms-hastauttanasana resolves to the correct definition", () => {
    const def = getAsanaDefinition("step-02-raised-arms-hastauttanasana");
    assert.ok(def, "Expected step-02-raised-arms-hastauttanasana to resolve to a definition");
    assert.ok(def.rules && def.rules.length > 0, "Expected rules to be present");
  });

  // TEST 3: step-03-hand-to-foot-padahastasana resolves to the correct definition.
  it("TEST 3: step-03-hand-to-foot-padahastasana resolves to the correct definition", () => {
    const def = getAsanaDefinition("step-03-hand-to-foot-padahastasana");
    assert.ok(def, "Expected step-03-hand-to-foot-padahastasana to resolve to a definition");
    assert.ok(
      def.id.includes("standing-forward-bend") || def.id.includes("uttanasana") || def.id.includes("hastapadasana"),
      `Unexpected resolved definition ID: ${def.id}`
    );
    assert.ok(def.rules && def.rules.length > 0, "Expected rules to be present");
  });

  // TEST 4: Every remaining Surya Namaskar step resolves to a valid definition.
  it("TEST 4: Every remaining Surya Namaskar step resolves to a valid definition", () => {
    for (const stepId of suryaSteps) {
      const def = getAsanaDefinition(stepId);
      assert.ok(def, `Expected ${stepId} to resolve to a valid definition`);
      assert.ok(def.id, `Expected definition for ${stepId} to have an id`);
    }
  });

  // TEST 5: Every supported Surya Namaskar step returns rules.length > 0.
  it("TEST 5: Every supported Surya Namaskar step returns rules.length > 0", () => {
    for (const stepId of suryaSteps) {
      ensureAsanaRules(stepId);
      const rules = getPoseRules(stepId);
      assert.ok(
        rules.length > 0,
        `Expected ${stepId} to return rules.length > 0, but got ${rules.length}`
      );
    }
  });

  // TEST 6: warrior-ii continues returning its existing rules.
  it("TEST 6: warrior-ii continues returning its existing rules", () => {
    const def = getAsanaDefinition("warrior-ii");
    assert.ok(def, "Expected warrior-ii definition to be found");
    assert.ok(def.rules.length >= 6, `Expected >= 6 rules for warrior-ii, got ${def.rules.length}`);
    const ruleIds = def.rules.map((r) => r.id);
    assert.ok(
      ruleIds.some((id) => id.includes("front_knee") || id.includes("knee")),
      "Expected front knee rule in warrior-ii"
    );
  });

  // TEST 7: An intentionally incorrect posture produces a PoseIssue.
  it("TEST 7: An intentionally incorrect posture produces a PoseIssue", () => {
    const stepId = "step-01-prayer-pranamasana";
    ensureAsanaRules(stepId);
    const rules = getPoseRules(stepId);
    assert.ok(rules.length > 0, "Rules must be loaded");

    // Intentionally bad posture for mountain/prayer pose: knee is bent at 120 deg (target is ~175-180 deg)
    const landmarks = createBaseLandmarks();
    landmarks[23] = { x: 0.5, y: 0.5, z: 0, visibility: 0.95 }; // hip
    landmarks[25] = { x: 0.4, y: 0.6, z: 0, visibility: 0.95 }; // knee bent
    landmarks[27] = { x: 0.5, y: 0.8, z: 0, visibility: 0.95 }; // ankle

    const result = evaluatePose(stepId, rules, { landmarks });

    assert.ok(result.rules.length > 0, "Rules should have been evaluated");
    assert.ok(
      result.summary.failedRules > 0 || result.summary.warningRules > 0 || result.issues.length > 0,
      "Expected failing or warning rules for bad posture"
    );
    assert.ok(
      result.issues.length > 0,
      "Expected at least one PoseIssue produced for bad posture"
    );
  });

  // TEST 8: A persistent incorrect posture produces pose_correction.
  it("TEST 8: A persistent incorrect posture produces pose_correction", () => {
    const failingIssue: PoseIssue = {
      ruleId: "mountain-tadasana.knee.straight",
      ruleName: "Legs Straight",
      severity: "high",
      metric: "angle",
      currentValue: 120,
      targetValue: 175,
      min: 163,
      max: 180,
      feedback: "Straighten your knees.",
      joint: "knee",
      isSafety: false,
    };

    const mockEvaluation: PoseEvaluationResult = {
      asanaId: "step-01-prayer-pranamasana",
      score: 55,
      isValid: true,
      primaryIssue: failingIssue,
      secondaryIssues: [],
      resolvedIssues: [],
      scoreTrend: "stable",
      stability: 80,
      holdProgress: 0,
      completionEligible: false,
      activeRules: 4,
      evaluatedAt: Date.now(),
    };

    const events = eventEngine.process(
      "step-01-prayer-pranamasana",
      "Prayer Pose",
      "coaching",
      "CAMERA_READY",
      mockEvaluation
    );

    const correction = events.find((e) => e.type === "pose_correction");
    assert.ok(correction, "Expected pose_correction event to be produced");
    assert.equal(correction.ruleId, "mountain-tadasana.knee.straight");
  });

  // TEST 9: Improving the posture produces issue_improving.
  it("TEST 9: Improving the posture produces issue_improving", () => {
    const initialIssue: PoseIssue = {
      ruleId: "mountain-tadasana.knee.straight",
      ruleName: "Legs Straight",
      severity: "high",
      metric: "angle",
      currentValue: 120, // deviation = 55
      targetValue: 175,
      min: 163,
      max: 180,
      feedback: "Straighten your knees.",
      joint: "knee",
      isSafety: false,
    };

    // First frame registers initial active issue
    eventEngine.process(
      "step-01-prayer-pranamasana",
      "Prayer Pose",
      "coaching",
      "CAMERA_READY",
      {
        asanaId: "step-01-prayer-pranamasana",
        score: 55,
        isValid: true,
        primaryIssue: initialIssue,
        secondaryIssues: [],
        resolvedIssues: [],
        scoreTrend: "stable",
        stability: 80,
        holdProgress: 0,
        completionEligible: false,
        activeRules: 4,
        evaluatedAt: Date.now(),
      }
    );

    // Second frame: user straightens knee significantly to 165 (deviation reduced from 55 to 10 -> >70% improvement)
    const improvedIssue: PoseIssue = {
      ...initialIssue,
      currentValue: 165,
    };

    const secondEvents = eventEngine.process(
      "step-01-prayer-pranamasana",
      "Prayer Pose",
      "coaching",
      "CAMERA_READY",
      {
        asanaId: "step-01-prayer-pranamasana",
        score: 82,
        isValid: true,
        primaryIssue: improvedIssue,
        secondaryIssues: [],
        resolvedIssues: [],
        scoreTrend: "improving",
        stability: 85,
        holdProgress: 0,
        completionEligible: false,
        activeRules: 4,
        evaluatedAt: Date.now(),
      }
    );

    const improvingEvent = secondEvents.find((e) => e.type === "issue_improving");
    assert.ok(improvingEvent, "Expected issue_improving event when deviation is reduced by >30%");
    assert.equal(improvingEvent.ruleId, "mountain-tadasana.knee.straight");
  });

  // TEST 10: Returning to the correct posture produces issue_resolved.
  it("TEST 10: Returning to the correct posture produces issue_resolved", () => {
    const initialIssue: PoseIssue = {
      ruleId: "mountain-tadasana.knee.straight",
      ruleName: "Legs Straight",
      severity: "high",
      metric: "angle",
      currentValue: 120,
      targetValue: 175,
      min: 163,
      max: 180,
      feedback: "Straighten your knees.",
      joint: "knee",
      isSafety: false,
    };

    // Frame 1: Active issue
    eventEngine.process(
      "step-01-prayer-pranamasana",
      "Prayer Pose",
      "coaching",
      "CAMERA_READY",
      {
        asanaId: "step-01-prayer-pranamasana",
        score: 55,
        isValid: true,
        primaryIssue: initialIssue,
        secondaryIssues: [],
        resolvedIssues: [],
        scoreTrend: "stable",
        stability: 80,
        holdProgress: 0,
        completionEligible: false,
        activeRules: 4,
        evaluatedAt: Date.now(),
      }
    );

    // Frame 2: Correct posture achieved (primaryIssue is now null, score 95)
    const recoveredEvents = eventEngine.process(
      "step-01-prayer-pranamasana",
      "Prayer Pose",
      "coaching",
      "CAMERA_READY",
      {
        asanaId: "step-01-prayer-pranamasana",
        score: 95,
        isValid: true,
        primaryIssue: null,
        secondaryIssues: [],
        resolvedIssues: ["mountain-tadasana.knee.straight"],
        scoreTrend: "improving",
        stability: 95,
        holdProgress: 1,
        completionEligible: true,
        activeRules: 4,
        evaluatedAt: Date.now(),
      }
    );

    const resolvedEvent = recoveredEvents.find((e) => e.type === "issue_resolved");
    assert.ok(resolvedEvent, "Expected issue_resolved event when form issue is cleared");
    assert.equal(resolvedEvent.ruleId, "mountain-tadasana.knee.straight");
  });
});
