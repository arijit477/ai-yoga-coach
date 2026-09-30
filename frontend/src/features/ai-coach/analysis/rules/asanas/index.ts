import type { AsanaDefinition } from "../../../types/asana-definition";
import { getAsana, getAllAsanas } from "../../../data/AsanaRegistry";
import { mountainPose } from "./mountainPose";
import { treePose } from "./treePose";
import { warriorIIPose } from "./warriorIIPose";
import { padmasanaPose } from "./padmasanaPose";
import { bhujangasanaPose } from "./bhujangasanaPose";
import { setuBandhasanaPose } from "./setuBandhasanaPose";
import { chaturangaPose } from "./chaturangaPose";
import { balasanaPose } from "./balasanaPose";
import { downwardDogPose } from "./downwardDogPose";

export const ASANA_DEFINITIONS: Record<string, AsanaDefinition> = {
  "mountain-pose": mountainPose,
  "tadasana": mountainPose,
  "tree-pose": treePose,
  "vrksasana": treePose,
  "warrior-ii": warriorIIPose,
  "padmasana": padmasanaPose,
  "bhujangasana": bhujangasanaPose,
  "setu-bandhasana": setuBandhasanaPose,
  "chaturanga-dandasana": chaturangaPose,
  "balasana": balasanaPose,
  "adho-mukha-svanasana": downwardDogPose,
};

/**
 * Retrieves an AsanaDefinition from the authoritative AsanaRegistry by primary ID or alias.
 */
export function getAsanaDefinition(idOrAlias: string): AsanaDefinition | null {
  if (!idOrAlias) return null;
  return getAsana(idOrAlias) ?? ASANA_DEFINITIONS[idOrAlias] ?? null;
}

export {
  mountainPose,
  treePose,
  warriorIIPose,
  padmasanaPose,
  bhujangasanaPose,
  setuBandhasanaPose,
  chaturangaPose,
  balasanaPose,
  downwardDogPose,
  getAllAsanas,
};
