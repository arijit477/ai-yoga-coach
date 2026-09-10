import { useEffect, useRef, useState } from "react";

import type { PoseEvaluation } from "../features/ai-coach/types/pose-rules";

import { FeedbackStabilizer } from "../features/ai-coach/analysis/FeedbackStabilizer";
import { prioritizePoseIssues } from "../features/ai-coach/analysis/FeedbackPrioritizer";

export function useStablePoseEvaluation(
  evaluation: PoseEvaluation | null,
): PoseEvaluation | null {
  const stabilizerRef = useRef<FeedbackStabilizer | null>(null);

  const [stableEvaluation, setStableEvaluation] =
    useState<PoseEvaluation | null>(null);

  if (stabilizerRef.current === null) {
    stabilizerRef.current = new FeedbackStabilizer({
      requiredFrames: 4,
      releaseFrames: 3,
    });
  }

  useEffect(() => {
    const stabilizer = stabilizerRef.current;

    if (!stabilizer) {
      return;
    }

    if (!evaluation) {
      stabilizer.reset();
      setStableEvaluation(null);
      return;
    }

    const prioritizedIssues = prioritizePoseIssues(
      evaluation.issues,
    );

    const prioritizedEvaluation: PoseEvaluation = {
      ...evaluation,
      issues: prioritizedIssues,
    };

    const stabilized =
      stabilizer.stabilize(prioritizedEvaluation);

    setStableEvaluation(stabilized);
  }, [evaluation]);

  return stableEvaluation;
}