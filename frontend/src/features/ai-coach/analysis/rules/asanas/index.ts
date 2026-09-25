import type { AsanaDefinition } from "../../../types/asana-definition";
import { getAsana, getAllAsanas } from "../../../data/AsanaRegistry";
import { mountainPose } from "./mountainPose";
import { treePose } from "./treePose";
import { warriorIIPose } from "./warriorIIPose";

export const ASANA_DEFINITIONS: Record<string, AsanaDefinition> = {
  "mountain-pose": mountainPose,
  "tree-pose": treePose,
  "warrior-ii": warriorIIPose,
};

/**
 * Retrieves an AsanaDefinition from the authoritative AsanaRegistry by primary ID or alias.
 */
export function getAsanaDefinition(idOrAlias: string): AsanaDefinition | null {
  if (!idOrAlias) return null;
  return getAsana(idOrAlias) ?? null;
}

export { mountainPose, treePose, warriorIIPose, getAllAsanas };
