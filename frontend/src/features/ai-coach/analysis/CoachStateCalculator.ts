import type { PoseEvaluationResult } from "../types/pose-rules";
import type { CoachState } from "../types/coach-state";

interface CoachStateInput {
  isInitialized: boolean;
  hasPose: boolean;
  evaluation: PoseEvaluationResult | null;
}

export function calculateCoachState(
  input: CoachStateInput,
): CoachState {
  const {
    isInitialized,
    hasPose,
    evaluation,
  } = input;

  if (!isInitialized) {
    return "idle";
  }

  if (!hasPose) {
    return "get_ready";
  }

  if (!evaluation) {
    return "detecting";
  }

  if (evaluation.primaryIssue) {
    return "correcting";
  }

  if (evaluation.score >= 90) {
    return "holding";
  }

  if (evaluation.score >= 75) {
    return "good_form";
  }

  return "analyzing";
}