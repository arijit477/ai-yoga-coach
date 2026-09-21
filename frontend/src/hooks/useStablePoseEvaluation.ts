import { useRef, useMemo } from "react";

import type { PoseEvaluation } from "../features/ai-coach/types/pose-rules";

import { FeedbackStabilizer } from "../features/ai-coach/analysis/FeedbackStabilizer";
import { prioritizePoseIssues } from "../features/ai-coach/analysis/FeedbackPrioritizer";

export function useStablePoseEvaluation(
  evaluation: PoseEvaluation | null,
): PoseEvaluation | null {
  const stabilizerRef = useRef<FeedbackStabilizer | null>(null);

  if (stabilizerRef.current === null) {
    stabilizerRef.current = new FeedbackStabilizer({
      requiredFrames: 4,
      releaseFrames: 3,
    });
  }

  const stableEvaluation = useMemo(() => {
    const stabilizer = stabilizerRef.current;
    if (!stabilizer) return null;

    if (!evaluation) {
      stabilizer.reset();
      return null;
    }

    const prioritizedIssues = prioritizePoseIssues(
      evaluation.issues,
    );

    const prioritizedEvaluation: PoseEvaluation = {
      ...evaluation,
      issues: prioritizedIssues,
    };

    return stabilizer.stabilize(prioritizedEvaluation);
  }, [evaluation]);

  return stableEvaluation;
}