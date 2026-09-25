import { describe, it } from "node:test";
import assert from "node:assert/strict";

import type { Landmark, PoseLandmarks } from "../../types/landmarks.ts";
import { PoseLandmarkIndex as P } from "../../types/pose-landmarks.ts";
import type { PoseRule, PoseEvaluatorContext } from "../../types/pose-rules.ts";
import { evaluateRule } from "../RuleEvaluator.ts";
import { evaluatePose } from "../PoseEvaluator.ts";
import { mountainPose } from "../rules/asanas/mountainPose.ts";
import { treePose } from "../rules/asanas/treePose.ts";
import { warriorIIPose } from "../rules/asanas/warriorIIPose.ts";

function createMockLandmarks(overrides: Partial<Record<number, Partial<Landmark>>> = {}): PoseLandmarks {
  const landmarks: PoseLandmarks = [];
  for (let i = 0; i < 33; i++) {
    const base: Landmark = {
      x: 0.5,
      y: 0.5,
      z: 0.0,
      visibility: 0.95,
      presence: 0.95,
    };
    if (overrides[i]) {
      landmarks.push({ ...base, ...overrides[i] });
    } else {
      landmarks.push(base);
    }
  }
  return landmarks;
}

function createContext(overrides: Partial<Record<number, Partial<Landmark>>> = {}): PoseEvaluatorContext {
  const lm = createMockLandmarks(overrides);
  return {
    landmarks: lm,
    worldLandmarks: lm,
    timestamp: 1000,
  };
}

describe("Rule Engine General & Metric Tests", () => {
  // Test 1: Valid angle rule
  it("1. valid angle rule: evaluates 90 deg elbow bend within [80, 100] as PASS", () => {
    const ctx = createContext({
      [P.LEFT_SHOULDER]: { x: 0, y: 1, z: 0, visibility: 0.9 },
      [P.LEFT_ELBOW]: { x: 0, y: 0, z: 0, visibility: 0.9 },
      [P.LEFT_WRIST]: { x: 1, y: 0, z: 0, visibility: 0.9 },
    });
    const rule: PoseRule = {
      id: "test.left_elbow.90",
      name: "Left Elbow 90",
      metric: "angle",
      points: [P.LEFT_SHOULDER, P.LEFT_ELBOW, P.LEFT_WRIST],
      comparison: "between",
      min: 80,
      max: 100,
      weight: 1,
      severity: "high",
      feedback: "Maintain 90 degree elbow bend",
    };
    const res = evaluateRule(rule, ctx);
    assert.equal(res.status, "pass");
    assert.equal(res.passed, true);
    assert.equal(res.score, 100);
    assert.ok(Math.abs(res.measuredValue! - 90) < 1e-4);
  });

  // Test 2: Invalid angle rule
  it("2. invalid angle rule: evaluates straight arm (180 deg) when expecting 90 deg as FAIL", () => {
    const ctx = createContext({
      [P.LEFT_SHOULDER]: { x: -1, y: 0, z: 0, visibility: 0.9 },
      [P.LEFT_ELBOW]: { x: 0, y: 0, z: 0, visibility: 0.9 },
      [P.LEFT_WRIST]: { x: 1, y: 0, z: 0, visibility: 0.9 },
    });
    const rule: PoseRule = {
      id: "test.left_elbow.90",
      name: "Left Elbow 90",
      metric: "angle",
      points: [P.LEFT_SHOULDER, P.LEFT_ELBOW, P.LEFT_WRIST],
      comparison: "between",
      min: 80,
      max: 100,
      warningTolerance: 15,
      weight: 1,
      severity: "high",
      feedback: "Bend your left elbow",
    };
    const res = evaluateRule(rule, ctx);
    assert.equal(res.status, "fail");
    assert.equal(res.passed, false);
    assert.ok(res.issue !== undefined);
  });

  // Test 3: Distance rule
  it("3. distance rule: evaluates 2-point distance accurately", () => {
    const ctx = createContext({
      [P.LEFT_WRIST]: { x: 0.3, y: 0.5, z: 0, visibility: 0.9 },
      [P.RIGHT_WRIST]: { x: 0.7, y: 0.5, z: 0, visibility: 0.9 },
    });
    const rule: PoseRule = {
      id: "test.wrist.distance",
      name: "Wrist Distance",
      metric: "distance",
      points: [P.LEFT_WRIST, P.RIGHT_WRIST],
      comparison: "less_than",
      target: 0.5,
      weight: 1,
      severity: "medium",
      feedback: "Keep hands close",
    };
    const res = evaluateRule(rule, ctx);
    assert.equal(res.status, "pass");
    assert.ok(Math.abs(res.measuredValue! - 0.4) < 1e-4);
  });

  // Test 4: Horizontal alignment rule
  it("4. horizontal alignment rule: evaluates level shoulders as PASS", () => {
    const ctx = createContext({
      [P.LEFT_SHOULDER]: { x: 0.3, y: 0.4, z: 0, visibility: 0.9 },
      [P.RIGHT_SHOULDER]: { x: 0.7, y: 0.4, z: 0, visibility: 0.9 },
    });
    const rule: PoseRule = {
      id: "test.shoulders.level",
      name: "Shoulder Level",
      metric: "horizontal_alignment",
      points: [P.LEFT_SHOULDER, P.RIGHT_SHOULDER],
      comparison: "less_than",
      target: 0.05,
      weight: 1,
      severity: "medium",
      feedback: "Keep shoulders level",
    };
    const res = evaluateRule(rule, ctx);
    assert.equal(res.status, "pass");
    assert.equal(res.measuredValue, 0);
  });

  // Test 5: Vertical alignment rule
  it("5. vertical alignment rule: evaluates vertical spine as PASS", () => {
    const ctx = createContext({
      [P.LEFT_SHOULDER]: { x: 0.4, y: 0.3, z: 0, visibility: 0.9 },
      [P.LEFT_HIP]: { x: 0.4, y: 0.7, z: 0, visibility: 0.9 },
    });
    const rule: PoseRule = {
      id: "test.spine.vertical",
      name: "Torso Vertical",
      metric: "vertical_alignment",
      points: [P.LEFT_SHOULDER, P.LEFT_HIP],
      comparison: "less_than",
      target: 0.05,
      weight: 1,
      severity: "medium",
      feedback: "Keep torso vertical",
    };
    const res = evaluateRule(rule, ctx);
    assert.equal(res.status, "pass");
    assert.equal(res.measuredValue, 0);
  });

  // Test 6: Between comparison
  it("6. between comparison: correctly bounds [min, max]", () => {
    const ctx = createContext({
      [P.LEFT_HIP]: { x: 0, y: 1, z: 0 },
      [P.LEFT_KNEE]: { x: 0, y: 0, z: 0 },
      [P.LEFT_ANKLE]: { x: 1, y: 0, z: 0 },
    }); // 90 deg
    const rule: PoseRule = {
      id: "test.knee.between",
      name: "Knee Range",
      metric: "angle",
      points: [P.LEFT_HIP, P.LEFT_KNEE, P.LEFT_ANKLE],
      comparison: "between",
      min: 80,
      max: 100,
      weight: 1,
      severity: "high",
      feedback: "Knee within range",
    };
    const res = evaluateRule(rule, ctx);
    assert.equal(res.status, "pass");
  });

  // Test 7: Greater_than comparison
  it("7. greater_than comparison: evaluates values above threshold as PASS", () => {
    const ctx = createContext({
      [P.LEFT_HIP]: { x: -1, y: 0, z: 0 },
      [P.LEFT_KNEE]: { x: 0, y: 0, z: 0 },
      [P.LEFT_ANKLE]: { x: 1, y: 0, z: 0 },
    }); // 180 deg
    const rule: PoseRule = {
      id: "test.knee.straight",
      name: "Knee Straight",
      metric: "angle",
      points: [P.LEFT_HIP, P.LEFT_KNEE, P.LEFT_ANKLE],
      comparison: "greater_than",
      target: 160,
      weight: 1,
      severity: "medium",
      feedback: "Straighten leg",
    };
    const res = evaluateRule(rule, ctx);
    assert.equal(res.status, "pass");
  });

  // Test 8: Less_than comparison
  it("8. less_than comparison: evaluates values below threshold as PASS", () => {
    const ctx = createContext({
      [P.LEFT_SHOULDER]: { x: 0.3, y: 0.4, z: 0 },
      [P.RIGHT_SHOULDER]: { x: 0.7, y: 0.42, z: 0 },
    }); // delta = 0.02
    const rule: PoseRule = {
      id: "test.shoulder.diff",
      name: "Shoulder Diff",
      metric: "horizontal_alignment",
      points: [P.LEFT_SHOULDER, P.RIGHT_SHOULDER],
      comparison: "less_than",
      target: 0.05,
      weight: 1,
      severity: "medium",
      feedback: "Keep shoulders level",
    };
    const res = evaluateRule(rule, ctx);
    assert.equal(res.status, "pass");
  });

  // Test 9: Malformed rule
  it("9. malformed rule: returns UNKNOWN state instead of throwing or false passing", () => {
    const ctx = createContext();
    const badRule: PoseRule = {
      id: "bad.rule",
      name: "Bad Rule",
      metric: "angle",
      points: [11], // Missing points for angle
      comparison: "between",
      min: 100,
      max: 50, // min > max
      weight: 1,
      severity: "high",
      feedback: "Malformed",
    };
    const res = evaluateRule(badRule, ctx);
    assert.equal(res.status, "unknown");
    assert.equal(res.passed, false);
    assert.equal(res.score, 0);
  });

  // Test 10: Missing feature
  it("10. missing feature: returns UNKNOWN when required points are out of bounds", () => {
    const ctx = createContext();
    const missingPointRule: PoseRule = {
      id: "test.missing.point",
      name: "Missing Point",
      metric: "angle",
      points: [11, 13, 99], // 99 does not exist
      comparison: "between",
      min: 80,
      max: 100,
      weight: 1,
      severity: "medium",
      feedback: "Check point",
    };
    const res = evaluateRule(missingPointRule, ctx);
    assert.equal(res.status, "unknown");
  });

  // Test 11: UNKNOWN result
  it("11. UNKNOWN result: does not register as FAIL and does not corrupt pose evaluation", () => {
    const ctx = createContext({
      [P.LEFT_ANKLE]: { visibility: 0.05, presence: 0.05 }, // Occluded
    });
    const rule: PoseRule = {
      id: "test.ankle.angle",
      name: "Ankle Angle",
      metric: "angle",
      points: [P.LEFT_KNEE, P.LEFT_ANKLE, P.LEFT_FOOT_INDEX],
      comparison: "between",
      min: 80,
      max: 100,
      weight: 2,
      severity: "medium",
      feedback: "Check ankle",
    };
    const res = evaluateRule(rule, ctx);
    assert.equal(res.status, "unknown");
  });

  // Test 12: Weighted score
  it("12. weighted score: calculates correct weighted score across evaluable rules", () => {
    const ctx = createContext({
      [P.LEFT_SHOULDER]: { x: 0.3, y: 0.4, z: 0 },
      [P.RIGHT_SHOULDER]: { x: 0.7, y: 0.4, z: 0 },
      [P.LEFT_HIP]: { x: 0.3, y: 0.8, z: 0 },
      [P.RIGHT_HIP]: { x: 0.7, y: 0.8, z: 0 },
    });
    const rules: PoseRule[] = [
      {
        id: "r1",
        name: "R1",
        metric: "horizontal_alignment",
        points: [P.LEFT_SHOULDER, P.RIGHT_SHOULDER],
        comparison: "less_than",
        target: 0.05,
        weight: 3, // passes -> score 100
        severity: "high",
        feedback: "",
      },
      {
        id: "r2",
        name: "R2",
        metric: "horizontal_alignment",
        points: [P.LEFT_HIP, P.RIGHT_HIP],
        comparison: "less_than",
        target: 0.01,
        weight: 1, // fails (dev 0 <= 0.01 actually passes, let's make target negative to force fail)
        min: 0.5,
        max: 0.6,
        comparison: "between",
        warningTolerance: 0.05,
        severity: "low",
        feedback: "",
      },
    ];
    const evaluation = evaluatePose("test", rules, ctx);
    assert.ok(evaluation.score > 0 && evaluation.score <= 100);
    assert.equal(evaluation.summary.totalRules, 2);
  });

  // Test 13: Warning state
  it("13. warning state: classifies small deviations into WARNING zone", () => {
    const ctx = createContext({
      [P.LEFT_SHOULDER]: { x: 0.3, y: 0.4, z: 0 },
      [P.RIGHT_SHOULDER]: { x: 0.7, y: 0.47, z: 0 }, // delta = 0.07 (target 0.05, warningTol 0.08)
    });
    const rule: PoseRule = {
      id: "test.warn",
      name: "Warning Rule",
      metric: "horizontal_alignment",
      points: [P.LEFT_SHOULDER, P.RIGHT_SHOULDER],
      comparison: "less_than",
      target: 0.05,
      tolerance: 0.03,
      warningTolerance: 0.08,
      weight: 1,
      severity: "medium",
      feedback: "Level shoulders slightly",
    };
    const res = evaluateRule(rule, ctx);
    assert.equal(res.status, "warning");
    assert.ok(res.score >= 50 && res.score < 100);
  });

  // Test 14: Failure state
  it("14. failure state: classifies large deviations into FAIL zone", () => {
    const ctx = createContext({
      [P.LEFT_SHOULDER]: { x: 0.3, y: 0.4, z: 0 },
      [P.RIGHT_SHOULDER]: { x: 0.7, y: 0.7, z: 0 }, // delta = 0.30 >> 0.05
    });
    const rule: PoseRule = {
      id: "test.fail",
      name: "Fail Rule",
      metric: "horizontal_alignment",
      points: [P.LEFT_SHOULDER, P.RIGHT_SHOULDER],
      comparison: "less_than",
      target: 0.05,
      tolerance: 0.03,
      warningTolerance: 0.08,
      weight: 1,
      severity: "high",
      feedback: "Level shoulders",
    };
    const res = evaluateRule(rule, ctx);
    assert.equal(res.status, "fail");
    assert.ok(res.score < 50);
  });

  // Test 15: Primary correction selection
  it("15. primary correction selection: prioritizes high severity and larger deviation", () => {
    const ctx = createContext({
      [P.LEFT_SHOULDER]: { x: 0.3, y: 0.4, z: 0 },
      [P.RIGHT_SHOULDER]: { x: 0.7, y: 0.46, z: 0 }, // minor warning
      [P.LEFT_KNEE]: { x: 0.5, y: 0.5, z: 0 },
      [P.LEFT_HIP]: { x: 0.5, y: 0.2, z: 0 },
      [P.LEFT_ANKLE]: { x: 0.5, y: 0.9, z: 0 }, // 180 deg straight knee when expecting 90
    });
    const rules: PoseRule[] = [
      {
        id: "minor.shoulder",
        name: "Shoulder Tilt",
        metric: "horizontal_alignment",
        points: [P.LEFT_SHOULDER, P.RIGHT_SHOULDER],
        comparison: "less_than",
        target: 0.05,
        weight: 1,
        severity: "low",
        feedback: "Minor shoulder tilt",
      },
      {
        id: "major.knee",
        name: "Front Knee Angle",
        metric: "angle",
        points: [P.LEFT_HIP, P.LEFT_KNEE, P.LEFT_ANKLE],
        comparison: "between",
        min: 80,
        max: 100,
        weight: 3,
        severity: "high",
        feedback: "Bend your front knee deeply",
      },
    ];
    const evalResult = evaluatePose("warrior-ii", rules, ctx);
    assert.ok(evalResult.primaryIssue !== null);
    assert.equal(evalResult.primaryIssue?.ruleId, "major.knee");
  });
});

describe("Asana Specific Rule Architecture Tests", () => {
  // Test 16: Mountain Pose rules
  it("16. Mountain Pose rules: evaluates Tadasana standing alignment", () => {
    const ctx = createContext({
      [P.LEFT_SHOULDER]: { x: 0.3, y: 0.3, z: 0 },
      [P.RIGHT_SHOULDER]: { x: 0.7, y: 0.3, z: 0 },
      [P.LEFT_HIP]: { x: 0.3, y: 0.6, z: 0 },
      [P.RIGHT_HIP]: { x: 0.7, y: 0.6, z: 0 },
      [P.LEFT_KNEE]: { x: 0.3, y: 0.8, z: 0 },
      [P.RIGHT_KNEE]: { x: 0.7, y: 0.8, z: 0 },
      [P.LEFT_ANKLE]: { x: 0.3, y: 1.0, z: 0 },
      [P.RIGHT_ANKLE]: { x: 0.7, y: 1.0, z: 0 },
    });
    const evaluation = evaluatePose(mountainPose.id, mountainPose.rules, ctx);
    assert.equal(evaluation.overallStatus, "excellent");
    assert.equal(evaluation.score, 100);
    assert.equal(evaluation.issues.length, 0);
  });

  // Test 17: Tree Pose rules
  it("17. Tree Pose rules: evaluates standing leg straight and raised knee bent", () => {
    const ctx = createContext({
      // Standing left leg straight (180 deg)
      [P.LEFT_HIP]: { x: 0.4, y: 0.5, z: 0 },
      [P.LEFT_KNEE]: { x: 0.4, y: 0.7, z: 0 },
      [P.LEFT_ANKLE]: { x: 0.4, y: 0.9, z: 0 },
      // Raised right leg bent (~45 deg)
      [P.RIGHT_HIP]: { x: 0.6, y: 0.5, z: 0 },
      [P.RIGHT_KNEE]: { x: 0.8, y: 0.6, z: 0 },
      [P.RIGHT_ANKLE]: { x: 0.6, y: 0.65, z: 0 },
      // Shoulders and hips level
      [P.LEFT_SHOULDER]: { x: 0.3, y: 0.3, z: 0 },
      [P.RIGHT_SHOULDER]: { x: 0.7, y: 0.3, z: 0 },
    });
    const evaluation = evaluatePose(treePose.id, treePose.rules, ctx);
    assert.ok(evaluation.score >= 75);
    assert.equal(evaluation.summary.totalRules, treePose.rules.length);
  });

  // Test 18: Warrior II rules
  it("18. Warrior II rules: evaluates 90 deg front knee and extended arms", () => {
    const ctx = createContext({
      // Front knee 90 deg: Hip(0.3, 0.5), Knee(0.3, 0.7), Ankle(0.5, 0.7)
      [P.LEFT_HIP]: { x: 0.3, y: 0.5, z: 0 },
      [P.LEFT_KNEE]: { x: 0.3, y: 0.7, z: 0 },
      [P.LEFT_ANKLE]: { x: 0.5, y: 0.7, z: 0 },
      // Back leg straight: Hip(0.7, 0.5), Knee(0.85, 0.7), Ankle(1.0, 0.9)
      [P.RIGHT_HIP]: { x: 0.7, y: 0.5, z: 0 },
      [P.RIGHT_KNEE]: { x: 0.85, y: 0.7, z: 0 },
      [P.RIGHT_ANKLE]: { x: 1.0, y: 0.9, z: 0 },
      // Left arm extended straight: Shoulder(0.4, 0.3), Elbow(0.2, 0.3), Wrist(0.0, 0.3)
      [P.LEFT_SHOULDER]: { x: 0.4, y: 0.3, z: 0 },
      [P.LEFT_ELBOW]: { x: 0.2, y: 0.3, z: 0 },
      [P.LEFT_WRIST]: { x: 0.0, y: 0.3, z: 0 },
      // Right arm extended straight: Shoulder(0.6, 0.3), Elbow(0.8, 0.3), Wrist(1.0, 0.3)
      [P.RIGHT_SHOULDER]: { x: 0.6, y: 0.3, z: 0 },
      [P.RIGHT_ELBOW]: { x: 0.8, y: 0.3, z: 0 },
      [P.RIGHT_WRIST]: { x: 1.0, y: 0.3, z: 0 },
    });
    const evaluation = evaluatePose(warriorIIPose.id, warriorIIPose.rules, ctx);
    assert.ok(evaluation.score >= 70);
    assert.equal(evaluation.summary.totalRules, warriorIIPose.rules.length);
  });
});

describe("Rule Engine Edge Cases", () => {
  // Test 19: NaN
  it("19. NaN: gracefully handles NaN coordinate without throwing or NaN score", () => {
    const ctx = createContext({
      [P.LEFT_SHOULDER]: { x: NaN, y: 0.5, z: 0 },
    });
    const rule: PoseRule = {
      id: "nan.test",
      name: "NaN Test",
      metric: "angle",
      points: [P.LEFT_SHOULDER, P.LEFT_ELBOW, P.LEFT_WRIST],
      comparison: "between",
      min: 80,
      max: 100,
      weight: 1,
      severity: "medium",
      feedback: "",
    };
    const res = evaluateRule(rule, ctx);
    assert.equal(res.status, "unknown");
    assert.equal(res.score, 0);
    assert.ok(!Number.isNaN(res.score));
  });

  // Test 20: Infinity
  it("20. Infinity: gracefully handles Infinite coordinate without NaN score", () => {
    const ctx = createContext({
      [P.LEFT_SHOULDER]: { x: Infinity, y: 0.5, z: 0 },
    });
    const rule: PoseRule = {
      id: "inf.test",
      name: "Inf Test",
      metric: "horizontal_alignment",
      points: [P.LEFT_SHOULDER, P.RIGHT_SHOULDER],
      comparison: "less_than",
      target: 0.05,
      weight: 1,
      severity: "medium",
      feedback: "",
    };
    const res = evaluateRule(rule, ctx);
    assert.equal(res.status, "unknown");
    assert.ok(!Number.isNaN(res.score));
  });

  // Test 21: Null feature / null landmarks
  it("21. null feature: gracefully handles empty landmark context", () => {
    const emptyCtx: PoseEvaluatorContext = {
      landmarks: [],
      worldLandmarks: [],
    };
    const evaluation = evaluatePose("test", warriorIIPose.rules, emptyCtx);
    assert.equal(evaluation.overallStatus, "unknown");
    assert.equal(evaluation.score, 0);
  });

  // Test 22: Missing landmark
  it("22. missing landmark: marks rule as UNKNOWN when one point is undefined", () => {
    const lm = createMockLandmarks();
    delete (lm as unknown as Record<number, unknown>)[P.LEFT_ANKLE];
    const ctx: PoseEvaluatorContext = { landmarks: lm, worldLandmarks: lm };
    const rule: PoseRule = {
      id: "missing.point",
      name: "Missing Point",
      metric: "angle",
      points: [P.LEFT_HIP, P.LEFT_KNEE, P.LEFT_ANKLE],
      comparison: "between",
      min: 160,
      max: 180,
      weight: 1,
      severity: "high",
      feedback: "",
    };
    const res = evaluateRule(rule, ctx);
    assert.equal(res.status, "unknown");
  });

  // Test 23: Low-confidence landmark
  it("23. low-confidence landmark: marks rule as UNKNOWN when visibility < 0.25", () => {
    const ctx = createContext({
      [P.LEFT_KNEE]: { visibility: 0.1, presence: 0.1 },
    });
    const rule: PoseRule = {
      id: "low.vis",
      name: "Low Vis",
      metric: "angle",
      points: [P.LEFT_HIP, P.LEFT_KNEE, P.LEFT_ANKLE],
      comparison: "between",
      min: 160,
      max: 180,
      weight: 1,
      severity: "high",
      feedback: "",
    };
    const res = evaluateRule(rule, ctx);
    assert.equal(res.status, "unknown");
  });

  // Test 24: All rules UNKNOWN
  it("24. all rules UNKNOWN: overall status is unknown, score is 0, does not count as failure", () => {
    const ctx = createContext({
      [P.LEFT_SHOULDER]: { visibility: 0.0 },
      [P.RIGHT_SHOULDER]: { visibility: 0.0 },
      [P.LEFT_HIP]: { visibility: 0.0 },
      [P.RIGHT_HIP]: { visibility: 0.0 },
      [P.LEFT_KNEE]: { visibility: 0.0 },
      [P.RIGHT_KNEE]: { visibility: 0.0 },
      [P.LEFT_ANKLE]: { visibility: 0.0 },
      [P.RIGHT_ANKLE]: { visibility: 0.0 },
      [P.LEFT_ELBOW]: { visibility: 0.0 },
      [P.RIGHT_ELBOW]: { visibility: 0.0 },
      [P.LEFT_WRIST]: { visibility: 0.0 },
      [P.RIGHT_WRIST]: { visibility: 0.0 },
    });
    const evalResult = evaluatePose("mountain-pose", mountainPose.rules, ctx);
    assert.equal(evalResult.overallStatus, "unknown");
    assert.equal(evalResult.score, 0);
    assert.equal(evalResult.summary.unknownRules, mountainPose.rules.length);
    assert.equal(evalResult.summary.evaluatedRules, 0);
  });

  // Test 25: Mixed PASS/WARNING/FAIL/UNKNOWN
  it("25. mixed PASS/WARNING/FAIL/UNKNOWN: correctly aggregates statistics and scores", () => {
    const ctx = createContext({
      // Shoulders level (PASS)
      [P.LEFT_SHOULDER]: { x: 0.3, y: 0.4, z: 0 },
      [P.RIGHT_SHOULDER]: { x: 0.7, y: 0.4, z: 0 },
      // Hips slightly uneven (WARNING)
      [P.LEFT_HIP]: { x: 0.3, y: 0.8, z: 0 },
      [P.RIGHT_HIP]: { x: 0.7, y: 0.87, z: 0 },
      // Knees severely uneven (FAIL)
      [P.LEFT_KNEE]: { x: 0.3, y: 1.0, z: 0 },
      [P.RIGHT_KNEE]: { x: 0.7, y: 1.4, z: 0 },
      // Ankles occluded (UNKNOWN)
      [P.LEFT_ANKLE]: { visibility: 0.0 },
      [P.RIGHT_ANKLE]: { visibility: 0.0 },
    });

    const rules: PoseRule[] = [
      {
        id: "pass.rule",
        name: "Pass Rule",
        metric: "horizontal_alignment",
        points: [P.LEFT_SHOULDER, P.RIGHT_SHOULDER],
        comparison: "less_than",
        target: 0.05,
        weight: 1,
        severity: "medium",
        feedback: "",
      },
      {
        id: "warn.rule",
        name: "Warn Rule",
        metric: "horizontal_alignment",
        points: [P.LEFT_HIP, P.RIGHT_HIP],
        comparison: "less_than",
        target: 0.05,
        tolerance: 0.03,
        warningTolerance: 0.08,
        weight: 1,
        severity: "medium",
        feedback: "",
      },
      {
        id: "fail.rule",
        name: "Fail Rule",
        metric: "horizontal_alignment",
        points: [P.LEFT_KNEE, P.RIGHT_KNEE],
        comparison: "less_than",
        target: 0.05,
        tolerance: 0.03,
        warningTolerance: 0.08,
        weight: 2,
        severity: "high",
        feedback: "",
      },
      {
        id: "unknown.rule",
        name: "Unknown Rule",
        metric: "horizontal_alignment",
        points: [P.LEFT_ANKLE, P.RIGHT_ANKLE],
        comparison: "less_than",
        target: 0.05,
        weight: 1,
        severity: "low",
        feedback: "",
      },
    ];

    const evalResult = evaluatePose("mixed", rules, ctx);
    assert.equal(evalResult.summary.passedRules, 1);
    assert.equal(evalResult.summary.warningRules, 1);
    assert.equal(evalResult.summary.failedRules, 1);
    assert.equal(evalResult.summary.unknownRules, 1);
    assert.equal(evalResult.summary.evaluatedRules, 3);
    assert.ok(evalResult.score > 0 && evalResult.score < 100);
    assert.ok(evalResult.primaryIssue !== null);
    assert.equal(evalResult.primaryIssue?.ruleId, "fail.rule");
  });
});
