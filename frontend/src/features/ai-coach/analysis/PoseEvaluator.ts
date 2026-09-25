import type {
  PoseRule,
  PoseEvaluation,
  PoseEvaluatorContext,
  PoseIssue,
  RuleEvaluation,
  RuleSeverity,
  OverallPoseStatus,
} from "../types/pose-rules";

import { evaluateRule } from "./RuleEvaluator";
import { getLandmarkConfidence } from "./LandmarkUtils";

const SEVERITY_WEIGHTS: Record<RuleSeverity, number> = {
  high: 4,
  medium: 3,
  low: 2,
  info: 1,
};

export function evaluatePose(
  asanaId: string,
  rules: PoseRule[],
  context: PoseEvaluatorContext,
): PoseEvaluation {
  const timestamp = context.timestamp ?? Date.now();
  const ruleEvaluations: RuleEvaluation[] = [];
  const issues: PoseIssue[] = [];

  let passedRules = 0;
  let warningRules = 0;
  let failedRules = 0;
  let unknownRules = 0;

  let totalEvaluableWeight = 0;
  let weightedScoreSum = 0;

  for (const rule of rules) {
    const result = evaluateRule(rule, context);

    const evalItem: RuleEvaluation = {
      ruleId: rule.id,
      ruleName: rule.name,
      metric: rule.metric,
      status: result.status,
      severity: rule.severity,
      weight: rule.weight,
      score: result.score,
      measuredValue: result.measuredValue,
      target: rule.target,
      min: rule.min,
      max: rule.max,
      tolerance: rule.tolerance,
      feedback: rule.feedback,
      issue: result.issue,
    };

    ruleEvaluations.push(evalItem);

    if (result.status === "pass") {
      passedRules++;
      totalEvaluableWeight += rule.weight;
      weightedScoreSum += result.score * rule.weight;
    } else if (result.status === "warning") {
      warningRules++;
      totalEvaluableWeight += rule.weight;
      weightedScoreSum += result.score * rule.weight;
      if (result.issue) issues.push(result.issue);
    } else if (result.status === "fail") {
      failedRules++;
      totalEvaluableWeight += rule.weight;
      weightedScoreSum += result.score * rule.weight;
      if (result.issue) issues.push(result.issue);
    } else {
      // status === "unknown"
      unknownRules++;
    }
  }

  const evaluatedRules = passedRules + warningRules + failedRules;

  let totalRulesWeight = 0;
  for (const rule of rules) {
    totalRulesWeight += (rule.weight ?? 1);
  }

  // Weighted score calculation against evaluable rules
  let rawScore = 0;
  if (totalEvaluableWeight > 0) {
    rawScore = weightedScoreSum / totalEvaluableWeight;
  }
  const score = Math.max(0, Math.min(100, rawScore));

  // Determine Primary Issue
  const primaryIssue = selectPrimaryIssue(issues);

  // Overall Status
  const overallStatus = determineOverallStatus(score, evaluatedRules, rules.length, issues);

  // Derive 8 body area posture statuses
  const posture = derivePostureStatuses(ruleEvaluations);

  // Average confidence from landmarks
  let confidence = 0;
  if (context.landmarks && context.landmarks.length > 0) {
    let confSum = 0;
    for (const lm of context.landmarks) {
      confSum += getLandmarkConfidence(lm);
    }
    confidence = confSum / context.landmarks.length;
  }

  const completionEligible = score >= 75 && primaryIssue === null && evaluatedRules > 0;

  return {
    asanaId,
    timestamp,
    score,
    rawScore,
    overallStatus,
    status: overallStatus,
    rules: ruleEvaluations,
    issues,
    primaryIssue,
    summary: {
      totalRules: rules.length,
      evaluatedRules,
      passedRules,
      warningRules,
      failedRules,
      unknownRules,
    },
    posture,
    completionEligible,
    confidence,
    evaluatedAt: timestamp,
  };
}

/**
 * Select the single primary issue according to explicit prioritization:
 * 1. Explicit safety-critical rules (isSafety: true)
 * 2. High severity over medium/low/info
 * 3. Larger normalized deviation
 * 4. Higher rule weight
 */
function selectPrimaryIssue(issues: PoseIssue[]): PoseIssue | null {
  if (issues.length === 0) {
    return null;
  }

  const sorted = [...issues].sort((a, b) => {
    // 1. Safety critical first
    if (a.isSafety !== b.isSafety) {
      return a.isSafety ? -1 : 1;
    }

    // 2. Severity weight
    const sevA = SEVERITY_WEIGHTS[a.severity] ?? 0;
    const sevB = SEVERITY_WEIGHTS[b.severity] ?? 0;
    if (sevA !== sevB) {
      return sevB - sevA;
    }

    // 3. Normalized deviation (larger deviation is higher priority)
    const devA = a.normalizedDeviation ?? 0;
    const devB = b.normalizedDeviation ?? 0;
    if (Math.abs(devA - devB) > 1e-4) {
      return devB - devA;
    }

    return 0;
  });

  return sorted[0] ?? null;
}

function determineOverallStatus(
  score: number,
  evaluatedRules: number,
  totalRules: number,
  issues: PoseIssue[],
): OverallPoseStatus {
  if (evaluatedRules === 0 && totalRules > 0) {
    return "unknown";
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

/**
 * Derive 8-area posture statuses from evaluated rules
 */
function derivePostureStatuses(
  ruleEvaluations: RuleEvaluation[],
): PoseEvaluation["posture"] {
  const result: PoseEvaluation["posture"] = {
    head: "unknown",
    neck: "unknown",
    shoulders: "unknown",
    elbows: "unknown",
    spine: "unknown",
    hips: "unknown",
    knees: "unknown",
    ankles: "unknown",
  };

  const areaMap: Record<keyof PoseEvaluation["posture"], RuleEvaluation[]> = {
    head: [],
    neck: [],
    shoulders: [],
    elbows: [],
    spine: [],
    hips: [],
    knees: [],
    ankles: [],
  };

  for (const evalItem of ruleEvaluations) {
    const id = evalItem.ruleId.toLowerCase();
    const name = evalItem.ruleName.toLowerCase();

    if (id.includes("head") || name.includes("head")) areaMap.head.push(evalItem);
    if (id.includes("neck") || name.includes("neck")) areaMap.neck.push(evalItem);
    if (id.includes("shoulder") || name.includes("shoulder")) areaMap.shoulders.push(evalItem);
    if (id.includes("elbow") || id.includes("arm") || name.includes("elbow") || name.includes("arm")) areaMap.elbows.push(evalItem);
    if (id.includes("spine") || id.includes("torso") || name.includes("spine") || name.includes("torso")) areaMap.spine.push(evalItem);
    if (id.includes("hip") || name.includes("hip")) areaMap.hips.push(evalItem);
    if (id.includes("knee") || id.includes("leg") || name.includes("knee") || name.includes("leg")) areaMap.knees.push(evalItem);
    if (id.includes("ankle") || id.includes("foot") || name.includes("ankle") || name.includes("foot")) areaMap.ankles.push(evalItem);
  }

  for (const key of Object.keys(areaMap) as (keyof PoseEvaluation["posture"])[]) {
    const items = areaMap[key];
    if (items.length === 0) {
      result[key] = "unknown";
      continue;
    }

    const hasFail = items.some((i) => i.status === "fail");
    const hasWarn = items.some((i) => i.status === "warning");
    const allPass = items.every((i) => i.status === "pass");
    const allUnknown = items.every((i) => i.status === "unknown");

    if (hasFail) {
      result[key] = "bad";
    } else if (hasWarn) {
      result[key] = "warning";
    } else if (allPass) {
      result[key] = "good";
    } else if (allUnknown) {
      result[key] = "unknown";
    } else {
      result[key] = "good";
    }
  }

  return result;
}