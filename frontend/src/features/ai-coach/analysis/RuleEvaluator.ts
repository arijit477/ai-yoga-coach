import type {
  PoseRule,
  PoseIssue,
  PoseEvaluatorContext,
} from "../types/pose-rules";

import { calculateLandmarkAngle } from "./AngleCalculator";

import {
  calculateLandmarkDistance,
  calculateRelativeLandmarkDistance,
} from "./DistanceCalculator";

import {
  calculateHorizontalDeviation,
  calculateVerticalDeviation,
} from "./AlignmentCalculator";

export interface RuleResult {
  passed: boolean;
  score: number;
  issue?: PoseIssue;
}

/**
 * Evaluate a single pose rule against the current pose.
 */
export function evaluateRule(
  rule: PoseRule,
  context: PoseEvaluatorContext,
): RuleResult {
  const imageLandmarks = context.landmarks;
  const worldLandmarks = context.worldLandmarks;

  if (
    !imageLandmarks ||
    imageLandmarks.length < 33 ||
    !worldLandmarks ||
    worldLandmarks.length < 33
  ) {
    return {
      passed: false,
      score: 0,
    };
  }

  let value: number | null = null;

  switch (rule.metric) {
    case "angle":
      value = evaluateAngle(rule, worldLandmarks);
      break;

    case "distance":
      value = evaluateDistance(rule, worldLandmarks);
      break;

    case "horizontal_alignment":
      value = evaluateHorizontalAlignment(rule, imageLandmarks);
      break;

    case "vertical_alignment":
      value = evaluateVerticalAlignment(rule, imageLandmarks);
      break;

    default:
      return {
        passed: false,
        score: 0,
      };
  }

  /*
   * Null means that the required landmarks could
   * not be evaluated reliably.
   */
  if (value === null) {
    return {
      passed: false,
      score: 0,
    };
  }

  const passed = compareValue(value, rule);

  if (passed) {
    return {
      passed: true,
      score: 100,
    };
  }

  return {
    passed: false,
    score: calculateRuleScore(value, rule),
    issue: createPoseIssue(rule, value),
  };
}

/**
 * Evaluate an angle rule.
 *
 * points = [A, B, C]
 *
 * Calculates angle ABC.
 */
function evaluateAngle(
  rule: PoseRule,
  landmarks: PoseEvaluatorContext["worldLandmarks"],
): number | null {
  if (rule.points.length !== 3) {
    return null;
  }

  const [a, b, c] = rule.points;

  if (!landmarks[a] || !landmarks[b] || !landmarks[c]) {
    return null;
  }

  return calculateLandmarkAngle(landmarks[a], landmarks[b], landmarks[c]);
}

/**
 * Evaluate a distance rule.
 *
 * 2 points:
 *   distance(A, B)
 *
 * 4 points:
 *   distance(A, B) /
 *   distance(referenceA, referenceB)
 *
 * The 4-point version provides a body-relative
 * measurement that is less dependent on camera distance.
 */
function evaluateDistance(
  rule: PoseRule,
  landmarks: PoseEvaluatorContext["worldLandmarks"],
): number | null {
  if (rule.points.length === 2) {
    const [a, b] = rule.points;

    if (!landmarks[a] || !landmarks[b]) {
      return null;
    }

    return calculateLandmarkDistance(landmarks[a], landmarks[b]);
  }

  if (rule.points.length === 4) {
    const [a, b, referenceA, referenceB] = rule.points;

    if (
      !landmarks[a] ||
      !landmarks[b] ||
      !landmarks[referenceA] ||
      !landmarks[referenceB]
    ) {
      return null;
    }

    return calculateRelativeLandmarkDistance(
      landmarks[a],
      landmarks[b],
      landmarks[referenceA],
      landmarks[referenceB],
    );
  }

  return null;
}

/**
 * Evaluate horizontal alignment.
 *
 * Smaller deviation means better alignment.
 */
function evaluateHorizontalAlignment(
  rule: PoseRule,
  landmarks: PoseEvaluatorContext["landmarks"],
): number | null {
  if (rule.points.length !== 2) {
    return null;
  }

  const [a, b] = rule.points;

  if (!landmarks[a] || !landmarks[b]) {
    return null;
  }

  return calculateHorizontalDeviation(landmarks[a], landmarks[b]);
}

/**
 * Evaluate vertical alignment.
 *
 * Smaller deviation means better alignment.
 */
function evaluateVerticalAlignment(
  rule: PoseRule,
  landmarks: PoseEvaluatorContext["landmarks"],
): number | null {
  if (rule.points.length !== 2) {
    return null;
  }

  const [a, b] = rule.points;

  if (!landmarks[a] || !landmarks[b]) {
    return null;
  }

  return calculateVerticalDeviation(landmarks[a], landmarks[b]);
}

/**
 * Compare a measured value against a rule.
 */
function compareValue(value: number, rule: PoseRule): boolean {
  switch (rule.comparison) {
    case "between":
      return (
        rule.min !== undefined &&
        rule.max !== undefined &&
        value >= rule.min &&
        value <= rule.max
      );

    case "greater_than":
      return rule.target !== undefined && value >= rule.target;

    case "less_than":
      return rule.target !== undefined && value <= rule.target;

    default:
      return false;
  }
}

/**
 * Calculate a continuous score for a failed rule.
 *
 * The score decreases as the measured value
 * moves farther away from the expected value.
 */
function calculateRuleScore(value: number, rule: PoseRule): number {
  /*
   * Range-based rule.
   */
  if (
    rule.comparison === "between" &&
    rule.min !== undefined &&
    rule.max !== undefined
  ) {
    const range = rule.max - rule.min;

    if (range <= 0) {
      return 0;
    }

    if (value < rule.min) {
      const distance = rule.min - value;

      return Math.max(0, Math.round(100 - (distance / range) * 100));
    }

    if (value > rule.max) {
      const distance = value - rule.max;

      return Math.max(0, Math.round(100 - (distance / range) * 100));
    }
  }

  /*
   * Greater-than / less-than rules.
   *
   * For these rules, tolerance defines how quickly
   * the score decreases when the target is missed.
   */
  if (rule.target !== undefined) {
    let difference = 0;

    if (rule.comparison === "greater_than") {
      difference = Math.max(0, rule.target - value);
    } else if (rule.comparison === "less_than") {
      difference = Math.max(0, value - rule.target);
    } else {
      difference = Math.abs(value - rule.target);
    }

    const tolerance = Math.max(Math.abs(rule.tolerance ?? 0.05), 1e-8);

    return Math.max(0, Math.round(100 - (difference / tolerance) * 100));
  }

  return 0;
}

/**
 * Create a structured pose issue.
 */
function createPoseIssue(rule: PoseRule, currentValue: number): PoseIssue {
  return {
    ruleId: rule.id,
    ruleName: rule.name,
    severity: rule.severity,
    metric: rule.metric,
    currentValue,
    targetValue: rule.target,
    min: rule.min,
    max: rule.max,
    feedback: rule.feedback,
  };
}
