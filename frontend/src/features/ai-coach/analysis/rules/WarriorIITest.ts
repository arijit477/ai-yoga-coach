import type { PoseEvaluatorContext } from "../../types/pose-rules";

import { evaluatePose } from "../PoseEvaluator";
import { getPoseRules } from "../RuleEngine";

import {
  registerWarriorIIRules,
  WARRIOR_II_ASANA_ID,
} from "./WarriorII";

export function validateWarriorII(
  context: PoseEvaluatorContext,
) {
  registerWarriorIIRules();

  const rules = getPoseRules(
    WARRIOR_II_ASANA_ID,
  );

  if (rules.length === 0) {
    throw new Error(
      "Warrior II rules were not registered.",
    );
  }

  return evaluatePose(
    WARRIOR_II_ASANA_ID,
    rules,
    context,
  );
}