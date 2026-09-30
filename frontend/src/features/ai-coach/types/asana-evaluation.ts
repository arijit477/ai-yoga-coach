import type {
  RuleSeverity,
  RuleMetric,
  OverallPoseStatus,
} from "./pose-rules";
import type { StartingPosition, MovementType } from "./coaching-profile";

/**
 * An individual detected alignment issue during asana-aware rule evaluation.
 */
export interface AsanaDetectedIssue {
  issue: string;                    // Semantic identifier (e.g., "front_knee", "arms_level", "spine")
  ruleId: string;                   // Exact rule identifier
  ruleName: string;                 // Human-readable rule title
  status: "incorrect" | "warning" | "fail";
  severity: RuleSeverity;
  correction: string;               // Direct asana-specific physical correction text
  progression?: string;             // Secondary coaching cue if issue persists
  resolvedText?: string;            // Confirmation phrase when alignment is corrected
  currentValue?: number | null;     // Measured landmark angle / distance
  targetValue?: number;             // Target angle / distance
  min?: number;                     // Target min threshold
  max?: number;                     // Target max threshold
  joint?: string;                   // Target joint / anatomical body part
  isSafety?: boolean;               // True if critical safety constraint
  deviation?: number;               // Normalized deviation from allowable target zone
}

/**
 * A successfully passed pose rule in the current evaluation frame.
 */
export interface AsanaSuccessfulRule {
  ruleId: string;
  ruleName: string;
  metric: RuleMetric;
  score: number;
  measuredValue: number | null;
  joint?: string;
}

/**
 * Authoritative Asana-Aware Evaluation Result.
 * Emitted per frame when analyzing landmarks against the selected asana's profile rules.
 */
export interface AsanaEvaluationResult {
  asanaId: string;
  asanaName: string;
  category?: string;
  startingPosition?: StartingPosition;
  movementType?: MovementType;
  overallStatus: OverallPoseStatus;
  score: number;                     // Weighted score normalized to 0-100
  rawScore: number;
  detectedIssues: AsanaDetectedIssue[];
  successfulRules: AsanaSuccessfulRule[];
  primaryCorrection: string | null;  // Asana-specific correction for highest-priority defect
  primaryIssue: AsanaDetectedIssue | null;
  confidence: number;                // Landmark visibility confidence [0, 1]
  completionEligible: boolean;       // Form stable and score threshold met
  totalRules: number;
  evaluatedRules: number;
  evaluatedAt: number;
}
