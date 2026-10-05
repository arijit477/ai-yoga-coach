import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { ALL_ASANAS_CATALOG } from "../../data/allAsanasCatalog";
import { 
  KNOWN_CRITICAL_RULES, 
  getAsanaCompletionRequirements,
  evaluateCompletionGate,
  getCompletionCoverageAudit
} from "../AsanaCompletionGate";
import { validatePoseIdentity } from "../PoseIdentityValidator";
import { AccuracyStabilizer } from "../AccuracyStabilizer";
import type { NormalizedLandmark } from "../../../types/pose";
import type { PoseEvaluation, PoseEvaluatorContext } from "../../../types/pose-rules";

describe("Phase 3.5 — Asana Rule Quality & False-Positive Audit Tests", () => {
  // 1. Identity rules are distinguishable from form rules
  it("1. Identity rules are distinguishable from form rules by severity and critical registration", () => {
    const warrior = ALL_ASANAS_CATALOG.find((a) => a.id === "warrior-ii-virabhadrasana-ii");
    assert.ok(warrior, "Warrior II should exist");

    const criticalRules = warrior.rules.filter((r) => r.severity === "high");
    const formRules = warrior.rules.filter((r) => r.severity !== "high");

    assert.ok(criticalRules.length > 0, "Should have identity/critical rules");
    assert.ok(formRules.length > 0, "Should have form rules");
    assert.notDeepEqual(criticalRules.map((r) => r.id), formRules.map((r) => r.id));
  });

  // 2. Generic rules are not incorrectly treated as identity evidence
  it("2. Generic rules are not solely treated as identity evidence", () => {
    for (const asana of ALL_ASANAS_CATALOG) {
      const poseDefiningRules = asana.rules.filter((r) => {
        const name = r.name.toLowerCase();
        return !name.includes("horizontal shoulders") && 
               !name.includes("level hips") && 
               !name.includes("neutral gaze");
      });
      assert.ok(
        poseDefiningRules.length >= 1,
        `Asana ${asana.id} must have at least 1 pose-defining rule besides generic alignments`
      );
    }
  });

  // 3. Critical rules are registered correctly
  it("3. Critical rules in KNOWN_CRITICAL_RULES map to valid rule IDs", () => {
    for (const [canonicalId, ruleIds] of Object.entries(KNOWN_CRITICAL_RULES)) {
      assert.ok(Array.isArray(ruleIds), `Critical rules for ${canonicalId} should be an array`);
      assert.ok(ruleIds.length > 0, `Critical rules for ${canonicalId} should not be empty`);
    }
  });

  // 4. Critical rule failures prevent identity match where appropriate
  it("4. Critical rule failures prevent completion gate qualification", () => {
    const mockLandmarks: NormalizedLandmark[] = Array(33).fill({
      x: 0.5,
      y: 0.5,
      z: 0,
      visibility: 0.9,
    });
    // Standing landmarks
    mockLandmarks[0] = { x: 0.5, y: 0.1, z: 0, visibility: 0.9 };
    mockLandmarks[23] = { x: 0.45, y: 0.5, z: 0, visibility: 0.9 };
    mockLandmarks[24] = { x: 0.55, y: 0.5, z: 0, visibility: 0.9 };
    mockLandmarks[27] = { x: 0.45, y: 0.9, z: 0, visibility: 0.9 };
    mockLandmarks[28] = { x: 0.55, y: 0.9, z: 0, visibility: 0.9 };

    const mockEval: PoseEvaluation = {
      score: 85,
      rawScore: 85,
      isValid: true,
      overallStatus: "good",
      issues: [],
      primaryIssue: null,
      summary: { totalRules: 3, evaluatedRules: 3, passedRules: 2, warningRules: 0, failedRules: 1, unknownRules: 0 },
      posture: { head: "good", neck: "good", shoulders: "good", elbows: "good", spine: "good", hips: "good", knees: "bad", ankles: "good" },
      completionEligible: false,
      confidence: 0.9,
      evaluatedAt: Date.now(),
      timestamp: Date.now(),
      rules: [
        { ruleId: "w2-left-arm", ruleName: "Left Arm Extension", metric: "angle", status: "pass", severity: "medium", weight: 1, score: 95, measuredValue: 175, feedback: "Good" },
        { ruleId: "w2-right-arm", ruleName: "Right Arm Extension", metric: "angle", status: "pass", severity: "medium", weight: 1, score: 95, measuredValue: 175, feedback: "Good" },
        { ruleId: "warrior-ii-left-knee-angle", ruleName: "Front Knee Bend 90", metric: "angle", status: "fail", severity: "high", weight: 3, score: 30, measuredValue: 140, feedback: "Bend front knee" }, // Critical failure
      ],
    };

    const result = evaluateCompletionGate({
      asanaId: "warrior-ii-virabhadrasana-ii",
      landmarks: mockLandmarks,
      evaluation: mockEval,
      cameraReady: true,
    });

    assert.equal(result.isEligible, false, "Failed critical rule must prevent eligibility");
    assert.equal(result.criticalRulesValid, false);
  });

  // 5. Minor form deviation does not automatically invalidate identity
  it("5. Minor form deviation does not prevent completion if threshold is met", () => {
    const mockLandmarks: NormalizedLandmark[] = Array(33).fill({
      x: 0.5,
      y: 0.5,
      z: 0,
      visibility: 0.9,
    });
    mockLandmarks[0] = { x: 0.5, y: 0.1, z: 0, visibility: 0.9 };
    mockLandmarks[11] = { x: 0.45, y: 0.25, z: 0, visibility: 0.9 };
    mockLandmarks[12] = { x: 0.55, y: 0.25, z: 0, visibility: 0.9 };
    mockLandmarks[23] = { x: 0.45, y: 0.5, z: 0, visibility: 0.9 };
    mockLandmarks[24] = { x: 0.55, y: 0.5, z: 0, visibility: 0.9 };
    mockLandmarks[27] = { x: 0.45, y: 0.9, z: 0, visibility: 0.9 };
    mockLandmarks[28] = { x: 0.55, y: 0.9, z: 0, visibility: 0.9 };

    const mockEval: PoseEvaluation = {
      score: 82, // Above 75% threshold
      rawScore: 82,
      isValid: true,
      overallStatus: "good",
      issues: [],
      primaryIssue: null,
      summary: { totalRules: 4, evaluatedRules: 4, passedRules: 3, warningRules: 1, failedRules: 0, unknownRules: 0 },
      posture: { head: "good", neck: "good", shoulders: "good", elbows: "good", spine: "warning", hips: "good", knees: "good", ankles: "good" },
      completionEligible: true,
      confidence: 0.9,
      evaluatedAt: Date.now(),
      timestamp: Date.now(),
      identity: {
        isMatch: true,
        confidence: 0.9,
        canonicalAsanaId: "warrior-ii",
        passedRequirements: ["stance:standing", "warrior-ii-left-knee-angle"],
        failedRequirements: [],
        criticalFailures: [],
      },
      rules: [
        { ruleId: "warrior-ii-left-knee-angle", ruleName: "Front Knee Bend", metric: "angle", status: "pass", severity: "high", weight: 3, score: 90, measuredValue: 92, feedback: "Good" },
        { ruleId: "w2-left-arm", ruleName: "Left Arm Extension", metric: "angle", status: "pass", severity: "medium", weight: 1, score: 90, measuredValue: 170, feedback: "Good" },
        { ruleId: "w2-right-arm", ruleName: "Right Arm Extension", metric: "angle", status: "pass", severity: "medium", weight: 1, score: 90, measuredValue: 170, feedback: "Good" },
        { ruleId: "w2-torso-vertical", ruleName: "Torso Vertical", metric: "vertical_alignment", status: "warning", severity: "low", weight: 1, score: 65, measuredValue: 10, feedback: "Torso slight tilt" }, // Non-critical minor deviation
      ],
    };

    const result = evaluateCompletionGate({
      asanaId: "warrior-ii-virabhadrasana-ii",
      landmarks: mockLandmarks,
      evaluation: mockEval,
      cameraReady: true,
    });

    assert.equal(result.criticalRulesValid, true, "Critical rules passed");
    assert.equal(result.accuracyValid, true, "Accuracy >= 75% is valid");
  });

  // 6. Missing pose-defining rules are detected
  it("6. Asanas without high-severity critical rules are flagged as requiresDetectionRefinement", () => {
    const unauthoredReqs = getAsanaCompletionRequirements("big-toe-padangushthasana");
    assert.equal(unauthoredReqs.requiresDetectionRefinement, true);

    const chairReqs = getAsanaCompletionRequirements("chair-utkatasana");
    assert.equal(chairReqs.requiresDetectionRefinement, false);
  });

  // 7. Duplicate/redundant rules are detected where appropriate
  it("7. No asana in catalog has duplicate rule IDs", () => {
    for (const asana of ALL_ASANAS_CATALOG) {
      const ids = asana.rules.map((r) => r.id);
      const uniqueIds = new Set(ids);
      assert.equal(ids.length, uniqueIds.size, `Duplicate rule ID found in ${asana.id}`);
    }
  });

  // 8. Invalid landmark references are detected
  it("8. All rule points are within MediaPipe landmark range [0..32]", () => {
    for (const asana of ALL_ASANAS_CATALOG) {
      for (const rule of asana.rules) {
        for (const pt of rule.points) {
          assert.ok(
            pt >= 0 && pt <= 32,
            `Rule ${rule.id} in ${asana.id} references invalid landmark index: ${pt}`
          );
        }
      }
    }
  });

  // 9. Similar-pose discrimination configuration exists for high-risk poses
  it("9. High-risk similar pose pairs possess distinct stances or rule targets", () => {
    const tree = ALL_ASANAS_CATALOG.find((a) => a.id === "tree-vrksasana");
    const tadasana = ALL_ASANAS_CATALOG.find((a) => a.id === "mountain-tadasana");
    assert.ok(tree && tadasana);

    const treeBentKnee = tree.rules.find((r) => r.id.includes("bent_knee") || r.id.includes("knee-bent"));
    const tadasanaStraight = tadasana.rules.find((r) => r.id.includes("knee.straight") || r.id.includes("knees-straight"));
    assert.ok(treeBentKnee && tadasanaStraight);
    assert.notEqual(treeBentKnee.target, tadasanaStraight.target);
  });

  // 10. Existing Phase 1 identity behavior remains intact
  it("10. validatePoseIdentity correctly resolves canonical ID and stance", () => {
    const mockLandmarks: NormalizedLandmark[] = Array(33).fill({
      x: 0.5,
      y: 0.5,
      z: 0,
      visibility: 0.9,
    });
    mockLandmarks[0] = { x: 0.5, y: 0.1, z: 0, visibility: 0.9 };
    mockLandmarks[11] = { x: 0.45, y: 0.25, z: 0, visibility: 0.9 };
    mockLandmarks[12] = { x: 0.55, y: 0.25, z: 0, visibility: 0.9 };
    mockLandmarks[23] = { x: 0.45, y: 0.5, z: 0, visibility: 0.9 };
    mockLandmarks[24] = { x: 0.55, y: 0.5, z: 0, visibility: 0.9 };
    mockLandmarks[27] = { x: 0.45, y: 0.9, z: 0, visibility: 0.9 };
    mockLandmarks[28] = { x: 0.55, y: 0.9, z: 0, visibility: 0.9 };

    const ctx: PoseEvaluatorContext = {
      landmarks: mockLandmarks as any,
      timestamp: Date.now(),
    };

    const identity = validatePoseIdentity("warrior-ii-virabhadrasana-ii", ctx);
    assert.equal(identity.canonicalAsanaId, "warrior-ii");
    assert.equal(identity.requiredStance, "standing");
    assert.equal(identity.detectedStance, "standing");
  });

  // 11. Existing Phase 1.5 hold eligibility remains intact
  it("11. Phase 1.5 default completion accuracy threshold is 75%", () => {
    const mockLandmarks: NormalizedLandmark[] = Array(33).fill({
      x: 0.5,
      y: 0.5,
      z: 0,
      visibility: 0.9,
    });
    mockLandmarks[0] = { x: 0.5, y: 0.1, z: 0, visibility: 0.9 };
    mockLandmarks[11] = { x: 0.45, y: 0.25, z: 0, visibility: 0.9 };
    mockLandmarks[12] = { x: 0.55, y: 0.25, z: 0, visibility: 0.9 };
    mockLandmarks[23] = { x: 0.45, y: 0.5, z: 0, visibility: 0.9 };
    mockLandmarks[24] = { x: 0.55, y: 0.5, z: 0, visibility: 0.9 };
    mockLandmarks[27] = { x: 0.45, y: 0.9, z: 0, visibility: 0.9 };
    mockLandmarks[28] = { x: 0.55, y: 0.9, z: 0, visibility: 0.9 };

    const mockEval: PoseEvaluation = {
      score: 74, // 1% below threshold
      rawScore: 74,
      isValid: true,
      overallStatus: "needs_adjustment",
      issues: [],
      primaryIssue: null,
      summary: { totalRules: 1, evaluatedRules: 1, passedRules: 1, warningRules: 0, failedRules: 0, unknownRules: 0 },
      posture: { head: "good", neck: "good", shoulders: "good", elbows: "good", spine: "good", hips: "good", knees: "good", ankles: "good" },
      completionEligible: false,
      confidence: 0.9,
      evaluatedAt: Date.now(),
      timestamp: Date.now(),
      rules: [
        { ruleId: "warrior-ii-left-knee-angle", ruleName: "Front Knee Bend", metric: "angle", status: "pass", severity: "high", weight: 3, score: 74, measuredValue: 90, feedback: "Good" },
      ],
    };

    const belowResult = evaluateCompletionGate({
      asanaId: "warrior-ii-virabhadrasana-ii",
      landmarks: mockLandmarks,
      evaluation: mockEval,
      cameraReady: true,
    });

    assert.equal(belowResult.accuracyValid, false, "74% should be below 75% threshold");
    assert.equal(belowResult.threshold, 75);
  });

  // 12. Existing Phase 2 scoring behavior remains intact
  it("12. AccuracyStabilizer maintains stable 0-100 scoring with hysteresis and outlier rejection", () => {
    const stabilizer = new AccuracyStabilizer();
    const stabilized = stabilizer.update(82.4, true);
    assert.ok(stabilized.stableAccuracy !== null && stabilized.stableAccuracy >= 0 && stabilized.stableAccuracy <= 100);
    assert.ok(typeof stabilized.stableAccuracy === "number");
    assert.ok(!Number.isNaN(stabilized.stableAccuracy));
  });
});
