import { registerPoseRules } from "../RuleEngine";
import { warriorIIRules } from "./WarriorIIRules";

export const WARRIOR_II_ASANA_ID = "warrior-ii";

export function registerWarriorIIRules(): void {
  registerPoseRules(
    WARRIOR_II_ASANA_ID,
    warriorIIRules,
  );
}