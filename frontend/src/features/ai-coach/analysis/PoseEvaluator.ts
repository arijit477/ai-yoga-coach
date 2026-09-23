import type {
  PoseRule,
  PoseEvaluation,
  PoseEvaluatorContext,
  PoseIssue,
} from "../types/pose-rules";

import { evaluateRule } from "./RuleEvaluator";

export function evaluatePose(
  asanaId: string,
  rules: PoseRule[],
  context: PoseEvaluatorContext
): PoseEvaluation {
  const issues: PoseIssue[] = [];

  const expectedTotalWeight = rules.reduce((acc, r) => acc + r.weight, 0);
  let totalWeight = 0;
  let weightedScore = 0;

  for (const rule of rules) {
    const result = evaluateRule(
      rule,
      context
    );

    if (result.ignored) {
      issues.push({
        ruleId: rule.id,
        ruleName: rule.name,
        metric: rule.metric,
        severity: rule.severity,
        currentValue: 0,
        joint: rule.name,
        feedback: `Ensure your ${rule.name.toLowerCase()} are clearly visible to the camera.`,
      });
      continue;
    }

    totalWeight += rule.weight;

    weightedScore +=
      result.score * rule.weight;

    if (result.issue) {
      issues.push(result.issue);
    }
  }

  // Account for all expected rules of the asana: missing/occluded required limbs cannot grant 100% score
  const effectiveTotalWeight = Math.max(totalWeight, expectedTotalWeight);

  const rawScore =
    effectiveTotalWeight === 0
      ? 0
      : weightedScore / effectiveTotalWeight;

  const score = rawScore;

  const status = getPoseStatus(
    score,
    issues
  );

  return {
    asanaId,
    score,
    rawScore,
    status,
    issues,
    evaluatedAt: Date.now(),
  };
}

function getPoseStatus(
  score: number,
  issues: PoseIssue[]
): PoseEvaluation["status"] {
  const hasHighSeverityIssue =
    issues.some(
      (issue) =>
        issue.severity === "high"
    );

  if ( score< 50 && hasHighSeverityIssue) {
    return "unsafe";
  }

  if (score >= 90) {
    return "excellent";
  }

  if (score >= 75) {
    return "good";
  }

  return "needs_adjustment";
}