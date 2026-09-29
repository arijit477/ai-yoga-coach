import type { PoseLandmarks } from "./landmarks";
import type { PoseFeatures } from "./pose-features";

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

export type RuleEvaluationStatus =
  | "pass"
  | "warning"
  | "fail"
  | "not_evaluable"
  | "unknown";

export type OverallPoseStatus =
  | "not_ready"
  | "calibrating"
  | "evaluating"
  | "good"
  | "needs_adjustment"
  | "excellent" // kept for backward compatibility
  | "unsafe" // kept for backward compatibility
  | "unknown"; // kept for backward compatibility

export type PostureAreaStatus =
  | "good"
  | "warning"
  | "bad"
  | "not_required"
  | "unknown";

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
  warningTolerance?: number;
  weight: number;
  severity: RuleSeverity;
  feedback: string;
  isSafety?: boolean;
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
  normalizedDeviation?: number;
  isSafety?: boolean;
}

export interface RuleEvaluation {
  ruleId: string;
  ruleName: string;
  metric: RuleMetric;
  status: RuleEvaluationStatus;
  severity: RuleSeverity;
  weight: number;
  score: number;
  measuredValue: number | null;
  target?: number;
  min?: number;
  max?: number;
  tolerance?: number;
  feedback: string;
  issue?: PoseIssue;
}

export interface PoseEvaluationSummary {
  totalRules: number;
  evaluatedRules: number;
  passedRules: number;
  warningRules: number;
  failedRules: number;
  unknownRules: number;
}

export interface PoseEvaluation {
  asanaId: string;
  timestamp: number;
  score: number;
  rawScore?: number;
  overallStatus: OverallPoseStatus;
  status?: OverallPoseStatus; // alias for backwards compatibility
  rules: RuleEvaluation[];
  issues: PoseIssue[];
  primaryIssue: PoseIssue | null;
  summary: PoseEvaluationSummary;
  posture: {
    head: PostureAreaStatus;
    neck: PostureAreaStatus;
    shoulders: PostureAreaStatus;
    elbows: PostureAreaStatus;
    spine: PostureAreaStatus;
    hips: PostureAreaStatus;
    knees: PostureAreaStatus;
    ankles: PostureAreaStatus;
  };
  completionEligible: boolean;
  confidence: number;
  evaluatedAt: number;
}

export interface PoseEvaluationResult {
  asanaId: string;
  score: number;
  rawScore?: number;
  stableScore?: number;
  displayedScore?: number;
  isValid: boolean;
  primaryIssue: PoseIssue | null;
  secondaryIssues: PoseIssue[];
  resolvedIssues: string[];
  scoreTrend: "improving" | "declining" | "stable";
  stability: number;
  holdProgress: number;
  completionEligible: boolean;
  activeRules: number;
  evaluatedAt: number;
  posture?: PoseEvaluation["posture"];
}

export interface PoseEvaluatorContext {
  landmarks: PoseLandmarks;
  worldLandmarks?: PoseLandmarks;
  features?: PoseFeatures;
  timestamp?: number;
}