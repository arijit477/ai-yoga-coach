import { useMemo } from "react";
import type { PoseTrackingResult } from "../features/ai-coach/types/landmarks";
import type { AsanaEvaluationResult } from "../features/ai-coach/types/asana-evaluation";
import type { PoseRule } from "../features/ai-coach/types/pose-rules";
import { evaluateAsanaPose } from "../features/ai-coach/analysis/AsanaPoseEvaluator";

/**
 * React hook to perform asana-aware pose evaluation on current tracking landmarks.
 *
 * @param result Pose tracking result from MediaPipe
 * @param asanaId Current selected asana ID
 * @param customRules Optional rule overrides
 * @returns AsanaEvaluationResult or null
 */
export function useAsanaEvaluation(
  result: PoseTrackingResult | null,
  asanaId: string,
  customRules?: PoseRule[],
): AsanaEvaluationResult | null {
  return useMemo(() => {
    if (!result || !asanaId) {
      return null;
    }

    if (!result.landmarks || result.landmarks.length < 33) {
      return null;
    }

    const worldLandmarks =
      result.worldLandmarks && result.worldLandmarks.length >= 33
        ? result.worldLandmarks
        : result.landmarks;

    return evaluateAsanaPose(
      asanaId,
      {
        landmarks: result.landmarks,
        worldLandmarks,
        timestamp: result.timestamp,
      },
      { customRules },
    );
  }, [result, asanaId, customRules]);
}
