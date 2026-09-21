import { useRef, useMemo } from "react";

import { ScoreSmoother } from "../features/ai-coach/analysis/ScoreSmoother";

export function useStableScore(
  score: number | null,
): number | null {
  const smootherRef = useRef<ScoreSmoother | null>(null);

  if (smootherRef.current === null) {
    smootherRef.current = new ScoreSmoother({
      windowSize: 8,
      maxChangePerFrame: 5,
    });
  }

  const stableScore = useMemo(() => {
    const smoother = smootherRef.current;
    if (!smoother) return null;

    if (score === null) {
      smoother.reset();
      return null;
    }

    return smoother.smooth(score);
  }, [score]);

  return stableScore;
}