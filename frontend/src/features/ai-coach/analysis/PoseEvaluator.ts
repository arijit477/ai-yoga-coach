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

  let totalWeight = 0;
  let weightedScore = 0;

  for (const rule of rules) {
    const result = evaluateRule(
      rule,
      context
    );

    totalWeight += rule.weight;

    weightedScore +=
      result.score * rule.weight;

    if (result.issue) {
      issues.push(result.issue);
    }
  }

  const score =
    totalWeight === 0
      ? 0
      : Math.round(
          weightedScore / totalWeight
        );

  const status = getPoseStatus(
    score,
    issues
  );

  return {
    asanaId,
    score,
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

  if (hasHighSeverityIssue) {
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