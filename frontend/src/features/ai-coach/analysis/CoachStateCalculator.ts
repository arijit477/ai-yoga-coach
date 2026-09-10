import type { PoseEvaluation } from "../types/pose-rules";
import type { CoachState } from "../types/coach-state";

interface CoachStateInput {
  isInitialized: boolean;
  hasPose: boolean;
  evaluation: PoseEvaluation | null;
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

  if (evaluation.issues.length > 0) {
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