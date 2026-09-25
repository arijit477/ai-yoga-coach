import type { AsanaDefinition } from "../../../types/asana-definition";
import { mountainPose } from "./mountainPose";
import { treePose } from "./treePose";
import { warriorIIPose } from "./warriorIIPose";

export const ASANA_DEFINITIONS: Record<string, AsanaDefinition> = {
  "mountain-pose": mountainPose,
  "tree-pose": treePose,
  "warrior-ii": warriorIIPose,
};

export const ASANA_LOOKUP: Map<string, AsanaDefinition> = new Map();

// Register primary keys and aliases
for (const asana of Object.values(ASANA_DEFINITIONS)) {
  ASANA_LOOKUP.set(asana.id.toLowerCase(), asana);
  if (asana.aliases) {
    for (const alias of asana.aliases) {
      ASANA_LOOKUP.set(alias.toLowerCase(), asana);
    }
  }
}

export function getAsanaDefinition(idOrAlias: string): AsanaDefinition | null {
  if (!idOrAlias) return null;
  return ASANA_LOOKUP.get(idOrAlias.toLowerCase()) ?? null;
}

export { mountainPose, treePose, warriorIIPose };
