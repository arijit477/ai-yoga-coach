import type { PoseLandmarks } from "./landmarks";

export type RuleMetric =
  | "angle"
  | "distance"
  | "horizontal_alignment"
  | "vertical_alignment";

export type RuleSeverity =
  | "info"
  | "low"
  | "medium"
  | "high";

export type RuleComparison =
  | "between"
  | "greater_than"
  | "less_than";

export interface PoseRule {
  id: string;

  name: string;

  metric: RuleMetric;

  points: number[];

  comparison: RuleComparison;

  min?: number;

  max?: number;

  target?: number;

  tolerance?: number;

  weight: number;

  severity: RuleSeverity;

  feedback: string;
}

export interface PoseIssue {
  ruleId: string;

  ruleName: string;

  severity: RuleSeverity;

  metric: RuleMetric;

  currentValue: number;

  targetValue?: number;

  min?: number;

  max?: number;

  feedback: string;
}

export interface PoseEvaluation {
  asanaId: string;

  score: number;

  status:
    | "excellent"
    | "good"
    | "needs_adjustment"
    | "unsafe";

  issues: PoseIssue[];

  evaluatedAt: number;
}

export interface PoseEvaluatorContext {
  landmarks: PoseLandmarks;
  worldLandmarks: PoseLandmarks;
}