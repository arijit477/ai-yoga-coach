import type { PoseRule, RuleSeverity, RuleComparison } from "../types/pose-rules";
import { PoseLandmarkIndex as P } from "../types/pose-landmarks";

export interface AngleRuleOptions {
  id: string;
  name: string;
  points: [number, number, number];
  target?: number;
  min?: number;
  max?: number;
  tolerance?: number;
  warningTolerance?: number;
  weight?: number;
  severity?: RuleSeverity;
  feedback: string;
  isSafety?: boolean;
}

export interface DistanceRuleOptions {
  id: string;
  name: string;
  points: [number, number];
  comparison?: RuleComparison;
  target?: number;
  min?: number;
  max?: number;
  tolerance?: number;
  weight?: number;
  severity?: RuleSeverity;
  feedback: string;
  isSafety?: boolean;
}

export interface AlignmentRuleOptions {
  id: string;
  name: string;
  type: "horizontal" | "vertical";
  points: [number, number];
  target?: number;
  tolerance?: number;
  weight?: number;
  severity?: RuleSeverity;
  feedback: string;
  isSafety?: boolean;
}

/**
 * Creates a normalized angle rule measuring joint angle between 3 points.
 */
export function createAngleRule(options: AngleRuleOptions): PoseRule {
  const min = options.min ?? (options.target !== undefined && options.tolerance !== undefined ? options.target - options.tolerance : 0);
  const max = options.max ?? (options.target !== undefined && options.tolerance !== undefined ? options.target + options.tolerance : 180);
  const target = options.target ?? (min + max) / 2;
  const tolerance = options.tolerance ?? (max - min) / 2;

  return {
    id: options.id,
    name: options.name,
    metric: "angle",
    points: options.points,
    comparison: "between",
    min,
    max,
    target,
    tolerance,
    warningTolerance: options.warningTolerance ?? tolerance * 1.5,
    weight: options.weight ?? 3,
    severity: options.severity ?? "high",
    feedback: options.feedback,
    isSafety: options.isSafety ?? false,
  };
}

/**
 * Creates a distance rule measuring normalized landmark separation.
 */
export function createDistanceRule(options: DistanceRuleOptions): PoseRule {
  const comparison = options.comparison ?? "less_than";
  return {
    id: options.id,
    name: options.name,
    metric: "distance",
    points: options.points,
    comparison,
    min: options.min,
    max: options.max,
    target: options.target ?? (options.max ?? 0.15),
    tolerance: options.tolerance ?? 0.05,
    weight: options.weight ?? 2,
    severity: options.severity ?? "medium",
    feedback: options.feedback,
    isSafety: options.isSafety ?? false,
  };
}

/**
 * Creates a horizontal or vertical alignment rule (e.g. spine line or shoulder level).
 */
export function createAlignmentRule(options: AlignmentRuleOptions): PoseRule {
  return {
    id: options.id,
    name: options.name,
    metric: options.type === "horizontal" ? "horizontal_alignment" : "vertical_alignment",
    points: options.points,
    comparison: "less_than",
    target: options.target ?? 0.08,
    tolerance: options.tolerance ?? 0.06,
    weight: options.weight ?? 2,
    severity: options.severity ?? "medium",
    feedback: options.feedback,
    isSafety: options.isSafety ?? false,
  };
}

export { P as LandmarkIndex };
