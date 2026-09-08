import type {
  PoseRule,
  PoseIssue,
  PoseEvaluatorContext,
} from "../types/pose-rules";

import { calculateLandmarkAngle } from "./AngleCalculator";

export interface RuleResult {
  passed: boolean;

  score: number;

  issue?: PoseIssue;
}

export function evaluateRule(
  rule: PoseRule,
  context: PoseEvaluatorContext
): RuleResult {
  const landmarks = context.worldLandmarks;

  if (!landmarks || landmarks.length < 33) {
    return {
      passed: false,
      score: 0,
    };
  }

  let value = 0;

  switch (rule.metric) {
    case "angle":
      value = evaluateAngle(rule, landmarks);
      break;

    default:
      return {
        passed: true,
        score: 100,
      };
  }

  const passed = compareValue(
    value,
    rule
  );

  if (passed) {
    return {
      passed: true,
      score: 100,
    };
  }

  return {
    passed: false,
    score: calculateRuleScore(
      value,
      rule
    ),
    issue: {
      ruleId: rule.id,
      ruleName: rule.name,
      severity: rule.severity,
      metric: rule.metric,
      currentValue: value,
      targetValue: rule.target,
      min: rule.min,
      max: rule.max,
      feedback: rule.feedback,
    },
  };
}

function evaluateAngle(
  rule: PoseRule,
  landmarks: PoseEvaluatorContext["worldLandmarks"]
): number {
  if (rule.points.length !== 3) {
    throw new Error(
      `Angle rule "${rule.id}" requires exactly 3 points.`
    );
  }

  const [a, b, c] = rule.points;

  return calculateLandmarkAngle(
    landmarks[a],
    landmarks[b],
    landmarks[c]
  );
}

function compareValue(
  value: number,
  rule: PoseRule
): boolean {
  switch (rule.comparison) {
    case "between":
      return (
        rule.min !== undefined &&
        rule.max !== undefined &&
        value >= rule.min &&
        value <= rule.max
      );

    case "greater_than":
      return (
        rule.target !== undefined &&
        value >= rule.target
      );

    case "less_than":
      return (
        rule.target !== undefined &&
        value <= rule.target
      );

    default:
      return false;
  }
}

function calculateRuleScore(
  value: number,
  rule: PoseRule
): number {
  if (
    rule.comparison === "between" &&
    rule.min !== undefined &&
    rule.max !== undefined
  ) {
    if (value < rule.min) {
      const distance = rule.min - value;
      const range = rule.max - rule.min;

      return Math.max(
        0,
        100 - (distance / range) * 100
      );
    }

    if (value > rule.max) {
      const distance = value - rule.max;
      const range = rule.max - rule.min;

      return Math.max(
        0,
        100 - (distance / range) * 100
      );
    }
  }

  if (
    rule.target !== undefined
  ) {
    const difference = Math.abs(
      value - rule.target
    );

    const tolerance =
      rule.tolerance ?? 30;

    return Math.max(
      0,
      100 -
        (difference / tolerance) * 100
    );
  }

  return 0;
}