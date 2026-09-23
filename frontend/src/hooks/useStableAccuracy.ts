import { useRef, useMemo, useEffect } from "react";
import {
  AccuracyStabilizer,
  type AccuracyStabilizerConfig,
  type StableAccuracyState,
} from "../features/ai-coach/analysis/AccuracyStabilizer";
import type { PoseEvaluationResult } from "../features/ai-coach/types/pose-rules";

/**
 * useStableAccuracy
 *
 * Single source of truth hook to stabilize accuracy for circular gauges and score counters.
 * Exposes rawAccuracy, stableAccuracy (float for SVG arcs), displayedAccuracy (integer with dead-band),
 * stability status, and tracking confidence.
 */
export function useStableAccuracy(
  evaluation: PoseEvaluationResult | null,
  asanaId?: string,
  config?: Partial<AccuracyStabilizerConfig>
): StableAccuracyState {
  const stabilizerRef = useRef<AccuracyStabilizer | null>(null);
  const lastAsanaIdRef = useRef<string | undefined>(asanaId);

  if (!stabilizerRef.current) {
    stabilizerRef.current = new AccuracyStabilizer(config);
    lastAsanaIdRef.current = asanaId;
  }

  // Reset when asana changes
  useEffect(() => {
    if (lastAsanaIdRef.current !== asanaId) {
      lastAsanaIdRef.current = asanaId;
      stabilizerRef.current?.reset();
    }
  }, [asanaId]);

  return useMemo(() => {
    if (!stabilizerRef.current) {
      return {
        rawAccuracy: null,
        stableAccuracy: null,
        displayedAccuracy: null,
        isStable: true,
        confidence: 0,
      };
    }

    if (!evaluation) {
      return stabilizerRef.current.update(null, false);
    }

    // If evaluation already has stabilized values, pass them or update
    const raw = evaluation.rawScore ?? evaluation.score;
    return stabilizerRef.current.update(raw, evaluation.isValid);
  }, [evaluation]);
}
