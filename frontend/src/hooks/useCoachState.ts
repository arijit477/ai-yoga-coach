import { useMemo } from "react";

import type { PoseEvaluationResult } from "../features/ai-coach/types/pose-rules";
import type { CoachState } from "../features/ai-coach/types/coach-state";

import { calculateCoachState } from "../features/ai-coach/analysis/CoachStateCalculator";

interface UseCoachStateOptions {
  isInitialized: boolean;
  hasPose: boolean;
  evaluation: PoseEvaluationResult | null;
}

export function useCoachState({
  isInitialized,
  hasPose,
  evaluation,
}: UseCoachStateOptions): CoachState {
  return useMemo(
    () =>
      calculateCoachState({
        isInitialized,
        hasPose,
        evaluation,
      }),
    [isInitialized, hasPose, evaluation],
  );
}