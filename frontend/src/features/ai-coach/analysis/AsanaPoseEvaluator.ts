/**
 * AsanaPoseEvaluator — Authoritative Asana-Aware Pose Evaluation Layer.
 *
 * Implements the data-driven evaluation pipeline:
 * Selected Asana → Asana Coaching Profile → Asana Pose Rules → MediaPipe Landmarks → RuleEvaluator → AsanaEvaluationResult
 *
 * Invariants:
 * 1. Zero hardcoded `if (asana === "warrior2")` branching — completely data-driven.
 * 2. MediaPipe detection remains generic.
 * 3. Evaluates ONLY the rules attached to the active asana profile.
 * 4. Produces rich, asana-specific corrections from the coaching profile catalog.
 */

import type {
  PoseRule,
  PoseEvaluatorContext,
  RuleSeverity,
  OverallPoseStatus,
} from "../types/pose-rules";
import type { AsanaCoachingProfile, AsanaProfileCorrection } from "../types/coaching-profile";
import type {
  AsanaEvaluationResult,
  AsanaDetectedIssue,
  AsanaSuccessfulRule,
} from "../types/asana-evaluation";
import { getAsanaCoachingProfile } from "../services/AsanaCoachingProfileService";
import { evaluateRule } from "./RuleEvaluator";
import { getLandmarkConfidence } from "./LandmarkUtils";
import { ensureAsanaRules } from "./rules/poseRulesRegistry";

const SEVERITY_WEIGHTS: Record<RuleSeverity, number> = {
  high: 4,
  medium: 3,
  low: 2,
  info: 1,
};

/**
 * Normalizes rule names/ids to standard semantic issue keys (e.g., "front_knee", "shoulders", "spine").
 */
function normalizeIssueKey(ruleId: string, ruleName: string, joint?: string): string {
  if (joint) {
    return joint.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
  }
  const cleanId = ruleId.toLowerCase();
  if (cleanId.includes("knee")) return "front_knee";
  if (cleanId.includes("shoulder") || cleanId.includes("arm") || cleanId.includes("elbow")) return "arms_and_shoulders";
  if (cleanId.includes("hip") || cleanId.includes("pelvis")) return "hips";
  if (cleanId.includes("spine") || cleanId.includes("torso")) return "spine";
  if (cleanId.includes("leg") || cleanId.includes("ankle")) return "legs";
  return ruleName.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}

/**
 * Finds the most relevant coaching profile correction for a given pose rule.
 */
function findMatchingCorrection(
  rule: PoseRule,
  corrections: AsanaProfileCorrection[],
): AsanaProfileCorrection | null {
  if (!corrections || corrections.length === 0) return null;

  // 1. Direct ruleId match
  const directMatch = corrections.find(
    (c) => c.ruleId.toLowerCase() === rule.id.toLowerCase()
  );
  if (directMatch) return directMatch;

  // 2. Normalized prefix match (e.g. "warrior-ii-left-knee-angle" matches "left-knee")
  const ruleIdLower = rule.id.toLowerCase();
  const ruleNameLower = rule.name.toLowerCase();

  const partialMatch = corrections.find((c) => {
    const cIdLower = c.ruleId.toLowerCase();
    const cJointLower = c.joint.toLowerCase();
    return (
      ruleIdLower.includes(cIdLower) ||
      cIdLower.includes(ruleIdLower) ||
      ruleNameLower.includes(cJointLower) ||
      ruleIdLower.includes(cJointLower)
    );
  });

  return partialMatch ?? null;
}

export interface EvaluateAsanaPoseOptions {
  customRules?: PoseRule[];
  timestamp?: number;
}

/**
 * Evaluates user landmarks strictly against the selected asana's profile rules.
 *
 * @param asanaIdOrProfile The asana ID string or loaded AsanaCoachingProfile
 * @param context MediaPipe landmarks context (image and world coordinates)
 * @param options Optional rule overrides or timestamp
 * @returns Structured AsanaEvaluationResult
 */
export function evaluateAsanaPose(
  asanaIdOrProfile: string | AsanaCoachingProfile,
  context: PoseEvaluatorContext,
  options?: EvaluateAsanaPoseOptions,
): AsanaEvaluationResult {
  const timestamp = options?.timestamp ?? context.timestamp ?? Date.now();

  // 1. Load Asana Coaching Profile
  const profile: AsanaCoachingProfile =
    typeof asanaIdOrProfile === "string"
      ? getAsanaCoachingProfile(asanaIdOrProfile)
      : asanaIdOrProfile;

  const asanaId = profile.asanaId;
  const asanaName = profile.asanaName;

  // 2. Load and verify pose rules for this asana
  let rules = options?.customRules ?? profile.poseRules;
  if (!rules || rules.length === 0) {
    rules = ensureAsanaRules(asanaId);
  }

  // 3. Check for valid landmark inputs
  const landmarks = context.landmarks;
  if (!landmarks || landmarks.length < 33) {
    return {
      asanaId,
      asanaName,
      category: profile.category,
      startingPosition: profile.startingPosition,
      movementType: profile.movementType,
      overallStatus: "not_ready",
      score: 0,
      rawScore: 0,
      detectedIssues: [],
      successfulRules: [],
      primaryCorrection: null,
      primaryIssue: null,
      confidence: 0,
      completionEligible: false,
      totalRules: rules.length,
      evaluatedRules: 0,
      evaluatedAt: timestamp,
    };
  }

  // 4. Evaluate ONLY the rules relevant to this asana
  const detectedIssues: AsanaDetectedIssue[] = [];
  const successfulRules: AsanaSuccessfulRule[] = [];

  let passedCount = 0;
  let warningCount = 0;
  let failCount = 0;
  let notEvaluableCount = 0;

  let totalEvaluableWeight = 0;
  let weightedScoreSum = 0;

  for (const rule of rules) {
    const result = evaluateRule(rule, context);

    if (result.passed || result.status === "pass") {
      passedCount++;
      totalEvaluableWeight += (rule.weight ?? 1);
      weightedScoreSum += result.score * (rule.weight ?? 1);

      successfulRules.push({
        ruleId: rule.id,
        ruleName: rule.name,
        metric: rule.metric,
        score: result.score,
        measuredValue: result.measuredValue,
        joint: rule.name,
      });
    } else if (result.status === "warning" || result.status === "fail") {
      if (result.status === "warning") warningCount++;
      if (result.status === "fail") failCount++;

      totalEvaluableWeight += (rule.weight ?? 1);
      weightedScoreSum += result.score * (rule.weight ?? 1);

      // Map to asana-specific correction
      const matchedCorrection = findMatchingCorrection(rule, profile.corrections);
      const correctionText =
        matchedCorrection?.correctionText ||
        rule.feedback ||
        `Adjust your ${rule.name.toLowerCase()} alignment.`;

      const issueKey = normalizeIssueKey(rule.id, rule.name, matchedCorrection?.joint);

      const issueItem: AsanaDetectedIssue = {
        issue: issueKey,
        ruleId: rule.id,
        ruleName: rule.name,
        status: result.status === "warning" ? "warning" : "incorrect",
        severity: rule.severity,
        correction: correctionText,
        progression: matchedCorrection?.progressionText,
        resolvedText: matchedCorrection?.resolvedText,
        currentValue: result.measuredValue,
        targetValue: rule.target,
        min: rule.min,
        max: rule.max,
        joint: matchedCorrection?.joint || rule.name,
        isSafety: rule.isSafety ?? false,
        deviation: result.issue?.normalizedDeviation,
      };

      detectedIssues.push(issueItem);
    } else {
      notEvaluableCount++;
    }
  }

  const evaluatedRules = passedCount + warningCount + failCount;

  // 5. Calculate weighted score (0 - 100)
  let rawScore = 0;
  if (totalEvaluableWeight > 0) {
    rawScore = weightedScoreSum / totalEvaluableWeight;
  }
  const score = Math.max(0, Math.min(100, Math.round(rawScore)));

  // 6. Multi-tier defect prioritization for primaryIssue & primaryCorrection
  // Sort order: 1. Safety > 2. Severity (High > Med > Low > Info) > 3. Deviation > 4. Weight
  const sortedIssues = [...detectedIssues].sort((a, b) => {
    if (a.isSafety !== b.isSafety) {
      return a.isSafety ? -1 : 1;
    }
    const sevA = SEVERITY_WEIGHTS[a.severity] ?? 0;
    const sevB = SEVERITY_WEIGHTS[b.severity] ?? 0;
    if (sevA !== sevB) {
      return sevB - sevA;
    }
    const devA = a.deviation ?? 0;
    const devB = b.deviation ?? 0;
    if (Math.abs(devA - devB) > 1e-4) {
      return devB - devA;
    }
    return 0;
  });

  const primaryIssue = sortedIssues[0] ?? null;
  const primaryCorrection = primaryIssue ? primaryIssue.correction : null;

  // 7. Determine overall posture status
  const overallStatus = determineOverallStatus(
    score,
    evaluatedRules,
    rules.length,
    detectedIssues
  );

  // 8. Landmark Confidence
  let confidenceSum = 0;
  for (const lm of landmarks) {
    confidenceSum += getLandmarkConfidence(lm);
  }
  const confidence = landmarks.length > 0 ? confidenceSum / landmarks.length : 0;

  const completionEligible = score >= 75 && primaryIssue === null && evaluatedRules > 0;

  return {
    asanaId,
    asanaName,
    category: profile.category,
    startingPosition: profile.startingPosition,
    movementType: profile.movementType,
    overallStatus,
    score,
    rawScore,
    detectedIssues,
    successfulRules,
    primaryCorrection,
    primaryIssue,
    confidence,
    completionEligible,
    totalRules: rules.length,
    evaluatedRules,
    evaluatedAt: timestamp,
  };
}

function determineOverallStatus(
  score: number,
  evaluatedRules: number,
  totalRules: number,
  issues: AsanaDetectedIssue[],
): OverallPoseStatus {
  if (evaluatedRules === 0 && totalRules > 0) {
    return "not_ready";
  }

  const hasSafetyIssue = issues.some((i) => i.isSafety);
  const hasHighSeverityIssue = issues.some((i) => i.severity === "high");

  if (hasSafetyIssue || (score < 50 && hasHighSeverityIssue)) {
    return "unsafe";
  }

  if (score >= 90 && issues.length === 0) {
    return "excellent";
  }

  if (score >= 75) {
    return "good";
  }

  return "needs_adjustment";
}
