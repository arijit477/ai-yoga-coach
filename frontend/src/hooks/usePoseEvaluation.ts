import { useMemo } from "react";

import type { PoseTrackingResult } from "../features/ai-coach/types/landmarks";
import type { PoseEvaluation, PoseRule } from "../features/ai-coach/types/pose-rules";

import { evaluatePose } from "../features/ai-coach/analysis/PoseEvaluator";
import { getPoseRules } from "../features/ai-coach/analysis/RuleEngine";
import { ensureAsanaRules } from "../features/ai-coach/analysis/rules/poseRulesRegistry";

export function usePoseEvaluation(
  result: PoseTrackingResult | null,
  asanaId: string,
  customRules?: PoseRule[],
): PoseEvaluation | null {
  return useMemo(() => {
    if (!result || !asanaId) {
      return null;
    }

    // Ensure rules are registered for current asana
    ensureAsanaRules(asanaId, customRules);

    const rules = getPoseRules(asanaId);

    if (rules.length === 0) {
      return null;
    }

    if (result.landmarks.length < 33) {
      return null;
    }

    if (result.worldLandmarks.length < 33) {
      return null;
    }

    return evaluatePose(asanaId, rules, {
      landmarks: result.landmarks,
      worldLandmarks: result.worldLandmarks,
    });
  }, [result, asanaId, customRules]);
}