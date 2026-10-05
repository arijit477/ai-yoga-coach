import { useMemo, useRef } from "react";

import type { PoseTrackingResult } from "../features/ai-coach/types/landmarks";
import type { PoseEvaluationResult, PoseRule } from "../features/ai-coach/types/pose-rules";

import { TemporalPoseEvaluator } from "../features/ai-coach/analysis/TemporalPoseEvaluator";
import { getPoseRules } from "../features/ai-coach/analysis/RuleEngine";
import { ensureAsanaRules } from "../features/ai-coach/analysis/rules/poseRulesRegistry";
import { isLandmarkUsable } from "../features/ai-coach/analysis/LandmarkUtils";
import { resolveCanonicalAsanaId } from "../features/ai-coach/data/AsanaRegistry";
import { getAsanaDefinition } from "../features/ai-coach/analysis/rules/asanas";

export function usePoseEvaluation(
  result: PoseTrackingResult | null,
  asanaId: string,
  customRules?: PoseRule[],
): PoseEvaluationResult | null {
  const evaluatorRef = useRef<TemporalPoseEvaluator | null>(null);
  const lastAsanaIdRef = useRef<string | null>(null);
  const lastLogTimeRef = useRef<number>(0);
  const lastLoggedAsanaRef = useRef<string | null>(null);

  if (!evaluatorRef.current || lastAsanaIdRef.current !== asanaId) {
    evaluatorRef.current = new TemporalPoseEvaluator();
    lastAsanaIdRef.current = asanaId;
  }
  return useMemo(() => {
    const hasPose = Boolean(result && result.landmarks && result.landmarks.length > 0);
    const landmarkCount = result?.landmarks?.length ?? 0;
    const validCount = result?.landmarks ? result.landmarks.filter((lm) => lm && isLandmarkUsable(lm)).length : 0;
    const poseValid = landmarkCount >= 33 && validCount >= 20;

    if (!result || !asanaId) {
      return null;
    }

    // Ensure rules are registered for current asana
    ensureAsanaRules(asanaId, customRules);

    const rules = getPoseRules(asanaId);
    const now = Date.now();

    // Throttled runtime diagnostics (every ~1000ms or on asana change)
    if (now - lastLogTimeRef.current >= 1000 || lastLoggedAsanaRef.current !== asanaId) {
      lastLogTimeRef.current = now;
      lastLoggedAsanaRef.current = asanaId;

      const canonicalId = resolveCanonicalAsanaId(asanaId);
      const asanaDef = getAsanaDefinition(asanaId);

      console.log(`[AI COACH][TRACE][2][EVALUATION_INPUT]`, {
        asanaId,
        hasPose,
        poseValid,
        landmarkCount,
        rulesCount: rules.length,
        ruleIds: rules.map((r) => r.id),
      });

      console.log(`[AI COACH][TRACE][3][ASANA_RESOLUTION]`, {
        rawAsanaId: asanaId,
        normalizedAsanaId: canonicalId,
        definitionFound: Boolean(asanaDef),
        rulesFound: rules.length > 0,
        ruleCount: rules.length,
      });

      if (rules.length === 0) {
        console.log(`[AI COACH][TRACE][2][NO_RULES]`, {
          asanaId,
          rulesCount: 0,
          availableRuleIds: [],
        });
      }
    }

    if (rules.length === 0) {
      return null;
    }

    if (result.landmarks.length < 33) {
      return null;
    }

    const worldLandmarks =
      result.worldLandmarks && result.worldLandmarks.length >= 33
        ? result.worldLandmarks
        : undefined;

    return (
      evaluatorRef.current?.evaluate(asanaId, rules, {
        landmarks: result.landmarks,
        worldLandmarks,
      }) || null
    );
  }, [result, asanaId, customRules]);
}