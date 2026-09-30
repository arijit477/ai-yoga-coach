import type {
  PoseRule,
  PoseIssue,
  PoseEvaluatorContext,
  RuleEvaluationStatus,
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
import { isLandmarkUsable } from "./LandmarkUtils";

export interface RuleResult {
  passed: boolean;
  status: RuleEvaluationStatus;
  score: number;
  measuredValue: number | null;
  issue?: PoseIssue;
  ignored?: boolean; // alias for status === "unknown"
}

/**
 * Evaluate a single pose rule against the current pose.
 */
export function evaluateRule(
  rule: PoseRule,
  context: PoseEvaluatorContext,
): RuleResult {
  const imageLandmarks = context.landmarks;
  const worldLandmarks = context.worldLandmarks ?? context.landmarks;

  if (!imageLandmarks || imageLandmarks.length < 33) {
    return {
      passed: false,
      status: "unknown",
      score: 0,
      measuredValue: null,
      ignored: true,
    };
  }

  // 1. Validate rule configuration
  if (!rule || !rule.id || !rule.metric || !rule.points || !rule.comparison) {
    return {
      passed: false,
      status: "unknown",
      score: 0,
      measuredValue: null,
      ignored: true,
    };
  }

  // Check malformed comparisons
  if (rule.comparison === "between") {
    if (rule.min === undefined || rule.max === undefined || rule.min > rule.max) {
      return {
        passed: false,
        status: "unknown",
        score: 0,
        measuredValue: null,
        ignored: true,
      };
    }
  } else if (rule.comparison === "greater_than") {
    if (rule.target === undefined && rule.min === undefined) {
      return {
        passed: false,
        status: "unknown",
        score: 0,
        measuredValue: null,
        ignored: true,
      };
    }
  } else if (rule.comparison === "less_than") {
    if (rule.target === undefined && rule.max === undefined) {
      return {
        passed: false,
        status: "unknown",
        score: 0,
        measuredValue: null,
        ignored: true,
      };
    }
  }

  // 2. Pre-check landmark usability for all required rule points
  for (const pointIdx of rule.points) {
    const lm = imageLandmarks[pointIdx];
    if (!lm || !isLandmarkUsable(lm)) {
      return {
        passed: false,
        status: "unknown",
        score: 0,
        measuredValue: null,
        ignored: true,
      };
    }
  }

  // 3. Extract measured value based on metric
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
        status: "unknown",
        score: 0,
        measuredValue: null,
        ignored: true,
      };
  }

  if (value === null || !Number.isFinite(value)) {
    return {
      passed: false,
      status: "unknown",
      score: 0,
      measuredValue: null,
      ignored: true,
    };
  }

  // 4. Compare measured value against target/warning/failure zones
  let targetMin: number;
  let targetMax: number;

  if (rule.comparison === "between") {
    targetMin = rule.min!;
    targetMax = rule.max!;
  } else if (rule.comparison === "greater_than") {
    targetMin = rule.target ?? rule.min!;
    targetMax = Number.POSITIVE_INFINITY;
  } else {
    // less_than
    targetMin = Number.NEGATIVE_INFINITY;
    targetMax = rule.target ?? rule.max!;
  }

  // Determine warning tolerance zone
  const defaultWarningTol =
    rule.metric === "angle"
      ? 15
      : rule.metric === "horizontal_alignment" || rule.metric === "vertical_alignment"
        ? 0.04
        : 0.1;

  const warningTol =
    rule.warningTolerance ??
    (rule.tolerance !== undefined ? rule.tolerance * 1.5 : defaultWarningTol);

  // Exact target pass
  if (value >= targetMin && value <= targetMax) {
    return {
      passed: true,
      status: "pass",
      score: 100,
      measuredValue: value,
      ignored: false,
    };
  }

  // Compute deviation
  const delta = value < targetMin ? targetMin - value : value - targetMax;
  const baseTol = rule.tolerance ?? (rule.metric === "angle" ? 10 : 0.03);
  const normalizedDeviation = baseTol > 0 ? delta / baseTol : delta;

  // Warning vs Fail
  const isWarning = delta <= warningTol;
  const status: RuleEvaluationStatus = isWarning ? "warning" : "fail";

  const score = isWarning
    ? Math.max(50, Math.round(100 - (delta / Math.max(warningTol, 1e-6)) * 40))
    : Math.max(0, Math.round(50 - ((delta - warningTol) / Math.max(warningTol * 2, 1e-6)) * 50));

  const issue: PoseIssue = {
    ruleId: rule.id,
    ruleName: rule.name,
    severity: rule.severity,
    metric: rule.metric,
    currentValue: value,
    targetValue: rule.target,
    min: rule.min,
    max: rule.max,
    feedback: rule.feedback,
    joint: inferJointFromRule(rule),
    targetMin: rule.min,
    targetMax: rule.max,
    normalizedDeviation,
    isSafety: rule.isSafety ?? false,
  };

  return {
    passed: false,
    status,
    score,
    measuredValue: value,
    issue,
    ignored: false,
  };
}

/**
 * Evaluate an angle rule ABC (vertex = B).
 */
function evaluateAngle(
  rule: PoseRule,
  landmarks: PoseEvaluatorContext["landmarks"],
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
 * Evaluate a distance rule (2 points: direct, 4 points: relative ratio).
 */
function evaluateDistance(
  rule: PoseRule,
  landmarks: PoseEvaluatorContext["landmarks"],
): number | null {
  if (rule.points.length === 2) {
    const [a, b] = rule.points;
    if (!landmarks[a] || !landmarks[b]) {
      return null;
    }
    return calculateLandmarkDistance(landmarks[a], landmarks[b]);
  }

  if (rule.points.length === 4) {
    const [a, b, refA, refB] = rule.points;
    if (!landmarks[a] || !landmarks[b] || !landmarks[refA] || !landmarks[refB]) {
      return null;
    }
    return calculateRelativeLandmarkDistance(
      landmarks[a],
      landmarks[b],
      landmarks[refA],
      landmarks[refB],
    );
  }

  return null;
}

/**
 * Evaluate horizontal alignment (Y delta).
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
 * Evaluate vertical alignment (X delta).
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

function inferJointFromRule(rule: PoseRule): string | undefined {
  const id = rule.id.toLowerCase();
  const name = rule.name.toLowerCase();
  if (id.includes("right-knee") || id.includes("rightknee") || name.includes("right knee")) return "rightKnee";
  if (id.includes("left-knee") || id.includes("leftknee") || name.includes("left knee")) return "leftKnee";
  if (id.includes("right-shoulder") || name.includes("right shoulder")) return "rightShoulder";
  if (id.includes("left-shoulder") || name.includes("left shoulder")) return "leftShoulder";
  if (id.includes("right-elbow") || name.includes("right elbow")) return "rightElbow";
  if (id.includes("left-elbow") || name.includes("left elbow")) return "leftElbow";
  if (id.includes("right-hip") || name.includes("right hip")) return "rightHip";
  if (id.includes("left-hip") || name.includes("left hip")) return "leftHip";
  if (id.includes("shoulder") || name.includes("shoulder")) return "shoulders";
  if (id.includes("hip") || name.includes("hip")) return "hips";
  if (id.includes("spine") || name.includes("spine")) return "spine";
  return undefined;
}

