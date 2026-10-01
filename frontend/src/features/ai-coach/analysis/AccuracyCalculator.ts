import type {
  PoseRule,
  PoseEvaluatorContext,
  RuleEvaluation,
} from "../types/pose-rules";
import { evaluateRule } from "./RuleEvaluator";

export interface PoseAccuracyResult {
  asanaId: string;
  accuracy: number;
  rawAccuracy: number;
  coverage: number;
  frameId?: number;
  timestamp: number;
  validRuleCount: number;
  warningRuleCount: number;
  failedRuleCount: number;
  unavailableRuleCount: number;
  totalRuleCount: number;
  isEvaluable: boolean;
  ruleEvaluations: RuleEvaluation[];
}

/**
 * Pure function to calculate pose accuracy deterministically.
 *
 * Formula:
 * rawAccuracy = sum(rule.score * rule.weight) / sum(rule.weight) for all evaluable rules.
 * accuracy = round(clamp(rawAccuracy, 0, 100))
 *
 * Missing / low confidence / unavailable rules do NOT corrupt the evaluable score as 0,
 * and failed critical rules properly reduce the score according to their weights.
 */
export function calculatePoseAccuracy(
  asanaId: string,
  rules: PoseRule[],
  context: PoseEvaluatorContext,
  frameId?: number,
  timestamp?: number,
): PoseAccuracyResult {
  const currentTimestamp = timestamp ?? context.timestamp ?? Date.now();
  const ruleEvaluations: RuleEvaluation[] = [];

  let passedRules = 0;
  let warningRules = 0;
  let failedRules = 0;
  let unavailableRules = 0;

  let totalRulesWeight = 0;
  let totalEvaluableWeight = 0;
  let weightedScoreSum = 0;

  for (const rule of rules) {
    const weight = Number.isFinite(rule.weight) && rule.weight > 0 ? rule.weight : 1;
    totalRulesWeight += weight;

    const result = evaluateRule(rule, context);

    const evalItem: RuleEvaluation = {
      ruleId: rule.id,
      ruleName: rule.name,
      metric: rule.metric,
      status: result.status,
      severity: rule.severity,
      weight: rule.weight,
      score: Number.isFinite(result.score) ? result.score : 0,
      measuredValue: Number.isFinite(result.measuredValue) ? result.measuredValue : null,
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
      totalEvaluableWeight += weight;
      weightedScoreSum += evalItem.score * weight;
    } else if (result.status === "warning") {
      warningRules++;
      totalEvaluableWeight += weight;
      weightedScoreSum += evalItem.score * weight;
    } else if (result.status === "fail") {
      failedRules++;
      totalEvaluableWeight += weight;
      weightedScoreSum += evalItem.score * weight;
    } else {
      // "unknown" or "not_evaluable"
      unavailableRules++;
    }
  }

  const coverage = totalRulesWeight > 0 ? totalEvaluableWeight / totalRulesWeight : (rules.length === 0 ? 1 : 0);

  let rawAccuracy = 0;
  let isEvaluable = false;

  if (totalEvaluableWeight > 0 && Number.isFinite(weightedScoreSum)) {
    rawAccuracy = weightedScoreSum / totalEvaluableWeight;
    isEvaluable = true;

    // If coverage is low when multiple rules are defined, scale score to prevent 1 rule false-100%
    if (rules.length > 1 && coverage < 0.40) {
      rawAccuracy = rawAccuracy * (coverage / 0.40);
    }
  }

  // Safe clamping and NaN protection
  if (!Number.isFinite(rawAccuracy) || isNaN(rawAccuracy)) {
    rawAccuracy = 0;
    isEvaluable = false;
  } else {
    rawAccuracy = Math.min(100, Math.max(0, rawAccuracy));
  }

  const accuracy = Math.round(rawAccuracy);

  return {
    asanaId,
    accuracy,
    rawAccuracy,
    coverage,
    frameId,
    timestamp: currentTimestamp,
    validRuleCount: passedRules,
    warningRuleCount: warningRules,
    failedRuleCount: failedRules,
    unavailableRuleCount: unavailableRules,
    totalRuleCount: rules.length,
    isEvaluable,
    ruleEvaluations,
  };
}

/**
 * Pure calculation from pre-evaluated rule results.
 */
export function calculateAccuracyFromRuleResults(
  asanaId: string,
  ruleEvaluations: RuleEvaluation[],
  frameId?: number,
  timestamp?: number,
): PoseAccuracyResult {
  const currentTimestamp = timestamp ?? Date.now();

  let passedRules = 0;
  let warningRules = 0;
  let failedRules = 0;
  let unavailableRules = 0;

  let totalRulesWeight = 0;
  let totalEvaluableWeight = 0;
  let weightedScoreSum = 0;

  for (const evalItem of ruleEvaluations) {
    const weight = Number.isFinite(evalItem.weight) && evalItem.weight > 0 ? evalItem.weight : 1;
    totalRulesWeight += weight;
    const score = Number.isFinite(evalItem.score) ? evalItem.score : 0;

    if (evalItem.status === "pass") {
      passedRules++;
      totalEvaluableWeight += weight;
      weightedScoreSum += score * weight;
    } else if (evalItem.status === "warning") {
      warningRules++;
      totalEvaluableWeight += weight;
      weightedScoreSum += score * weight;
    } else if (evalItem.status === "fail") {
      failedRules++;
      totalEvaluableWeight += weight;
      weightedScoreSum += score * weight;
    } else {
      unavailableRules++;
    }
  }

  const coverage = totalRulesWeight > 0 ? totalEvaluableWeight / totalRulesWeight : (ruleEvaluations.length === 0 ? 1 : 0);

  let rawAccuracy = 0;
  let isEvaluable = false;

  if (totalEvaluableWeight > 0 && Number.isFinite(weightedScoreSum)) {
    rawAccuracy = weightedScoreSum / totalEvaluableWeight;
    isEvaluable = true;

    if (ruleEvaluations.length > 1 && coverage < 0.40) {
      rawAccuracy = rawAccuracy * (coverage / 0.40);
    }
  }

  if (!Number.isFinite(rawAccuracy) || isNaN(rawAccuracy)) {
    rawAccuracy = 0;
    isEvaluable = false;
  } else {
    rawAccuracy = Math.min(100, Math.max(0, rawAccuracy));
  }

  const accuracy = Math.round(rawAccuracy);

  return {
    asanaId,
    accuracy,
    rawAccuracy,
    coverage,
    frameId,
    timestamp: currentTimestamp,
    validRuleCount: passedRules,
    warningRuleCount: warningRules,
    failedRuleCount: failedRules,
    unavailableRuleCount: unavailableRules,
    totalRuleCount: ruleEvaluations.length,
    isEvaluable,
    ruleEvaluations,
  };
}

/**
 * Formats a comprehensive diagnostic summary of an accuracy calculation.
 */
export function formatAccuracyDiagnostics(result: PoseAccuracyResult): string {
  const parts: string[] = [
    `[Accuracy Diagnostics] Asana: ${result.asanaId}`,
    `Score: ${result.accuracy}% (raw: ${result.rawAccuracy.toFixed(1)}%, coverage: ${(result.coverage * 100).toFixed(1)}%)`,
    `Rules: ${result.validRuleCount} passed, ${result.warningRuleCount} warning, ${result.failedRuleCount} failed, ${result.unavailableRuleCount} unavailable (Total: ${result.totalRuleCount})`,
    `Evaluable: ${result.isEvaluable}`,
  ];
  if (result.ruleEvaluations && result.ruleEvaluations.length > 0) {
    parts.push('Rule Breakdown:');
    for (const r of result.ruleEvaluations) {
      const val = r.measuredValue !== null ? r.measuredValue.toFixed(1) : 'N/A';
      parts.push(`  - [${r.status.toUpperCase()}] ${r.ruleName} (${r.ruleId}): measured=${val}, target=${r.target ?? 'N/A'}, weight=${r.weight}, score=${r.score.toFixed(1)}%`);
    }
  }
  return parts.join('\n');
}

