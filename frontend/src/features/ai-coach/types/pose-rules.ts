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

  /**
   * Unrounded floating-point score for this frame (0-100).
   */
  score: number;

  /**
   * Alias for raw unrounded score.
   */
  rawScore?: number;

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

  /**
   * Displayed/stable score for backward compatibility.
   */
  score: number;

  /**
   * Unrounded instantaneous frame score from rule evaluator (0-100).
   */
  rawScore?: number;

  /**
   * Temporally smoothed, outlier-filtered continuous float accuracy (0-100).
   */
  stableScore?: number;

  /**
   * Stable integer percentage for UI text display, protected by dead-band hysteresis.
   */
  displayedScore?: number;

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