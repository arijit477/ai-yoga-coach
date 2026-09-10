import { useEffect, useRef, useState } from "react";

import { ScoreSmoother } from "../features/ai-coach/analysis/ScoreSmoother";

export function useStableScore(
  score: number | null,
): number | null {
  const smootherRef = useRef<ScoreSmoother | null>(null);

  const [stableScore, setStableScore] =
    useState<number | null>(null);

  if (smootherRef.current === null) {
    smootherRef.current = new ScoreSmoother({
      windowSize: 8,
      maxChangePerFrame: 5,
    });
  }

  useEffect(() => {
    const smoother = smootherRef.current;

    if (!smoother) {
      return;
    }

    if (score === null) {
      smoother.reset();
      setStableScore(null);
      return;
    }

    setStableScore(smoother.smooth(score));
  }, [score]);

  return stableScore;
}