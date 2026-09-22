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

  joint?: string;

  targetMin?: number;

  targetMax?: number;
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

export interface PoseEvaluationResult {
  asanaId: string;
  score: number;
  isValid: boolean;
  primaryIssue: PoseIssue | null;
  secondaryIssues: PoseIssue[];
  resolvedIssues: string[]; // array of ruleIds that were failing but are now passing
  scoreTrend: "improving" | "declining" | "stable";
  stability: number; // 0 to 100
  holdProgress: number; // how long they have been holding the pose correctly
  completionEligible: boolean; // if they have held it long enough with a high enough score
  activeRules: number; // number of rules currently being evaluated
  evaluatedAt: number;
}

export interface PoseEvaluatorContext {
  landmarks: PoseLandmarks;
  worldLandmarks: PoseLandmarks;
}