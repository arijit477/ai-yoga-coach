import { useMemo, useRef } from "react";

import type { PoseTrackingResult } from "../features/ai-coach/types/landmarks";
import type { PoseEvaluationResult, PoseRule } from "../features/ai-coach/types/pose-rules";

import { TemporalPoseEvaluator } from "../features/ai-coach/analysis/TemporalPoseEvaluator";
import { getPoseRules } from "../features/ai-coach/analysis/RuleEngine";
import { ensureAsanaRules } from "../features/ai-coach/analysis/rules/poseRulesRegistry";

export function usePoseEvaluation(
  result: PoseTrackingResult | null,
  asanaId: string,
  customRules?: PoseRule[],
): PoseEvaluationResult | null {
  const evaluatorRef = useRef<TemporalPoseEvaluator | null>(null);
  const lastAsanaIdRef = useRef<string | null>(null);

  if (!evaluatorRef.current || lastAsanaIdRef.current !== asanaId) {
    evaluatorRef.current = new TemporalPoseEvaluator();
    lastAsanaIdRef.current = asanaId;
  }
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

    return evaluatorRef.current?.evaluate(asanaId, rules, {
      landmarks: result.landmarks,
      worldLandmarks: result.worldLandmarks,
    }) || null;
  }, [result, asanaId, customRules]);
}