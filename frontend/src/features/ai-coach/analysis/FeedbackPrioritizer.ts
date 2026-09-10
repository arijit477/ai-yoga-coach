import type {
  PoseEvaluation,
  PoseIssue,
} from "../types/pose-rules";

const SEVERITY_PRIORITY: Record<PoseIssue["severity"], number> = {
  high: 4,
  medium: 3,
  low: 2,
  info: 1,
};

export function prioritizePoseIssues(
  issues: PoseIssue[],
): PoseIssue[] {
  return [...issues].sort((a, b) => {
    const severityDifference =
      SEVERITY_PRIORITY[b.severity] -
      SEVERITY_PRIORITY[a.severity];

    if (severityDifference !== 0) {
      return severityDifference;
    }

    return 0;
  });
}

export function getPrimaryPoseIssue(
  evaluation: PoseEvaluation | null,
): PoseIssue | null {
  if (!evaluation || evaluation.issues.length === 0) {
    return null;
  }

  const prioritized = prioritizePoseIssues(evaluation.issues);

  return prioritized[0] ?? null;
}