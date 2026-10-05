import type { AsanaCategory, AsanaDifficulty } from "../types/asana";
import type { AsanaDefinition } from "../types/asana-definition";
import type { PoseRule } from "../types/pose-rules";
import { supabase } from "../../../lib/supabase";
import { fetchRulesCache } from "../analysis/rules/poseRulesRegistry";
import { getAsanaImageUrl, getAsanaVideoUrl } from "./freeAsanas";

import { ALL_ASANAS_CATALOG } from "./allAsanasCatalog";

let ALL_ASANAS: AsanaDefinition[] = [...ALL_ASANAS_CATALOG];
const ASANA_REGISTRY_MAP = new Map<string, AsanaDefinition>();

/**
 * Normalizes any asset filename, query string URL, or alias into a stable asanaId.
 */
export function normalizeAsanaId(filenameOrId: string): string {
  if (!filenameOrId) return "";
  const clean = filenameOrId.split("?")[0].split("/").pop() || filenameOrId;
  return clean.replace(/\.(webp|png|jpg|jpeg)$/i, "").trim().toLowerCase();
}

/**
 * Authoritative canonical alias map for resolving sequence step IDs, Sanskrit aliases, and shorthand names
 * to actual registered AsanaDefinitions with full pose rules.
 */
export const ASANA_CANONICAL_ALIASES: Record<string, string> = {
  // Step 1: Prayer / Pranamasana
  "step-01-prayer-pranamasana": "mountain-tadasana",
  "step-1-prayer-pranamasana": "mountain-tadasana",
  "step-01-pranamasana": "mountain-tadasana",
  "step-1-pranamasana": "mountain-tadasana",
  "step-1-pranamasana-namaskar": "mountain-tadasana",
  "prayer-pranamasana": "mountain-tadasana",
  "pranamasana": "mountain-tadasana",
  "pranamasana-namaskar": "mountain-tadasana",

  // Step 2: Raised Arms / Hasta Uttanasana
  "step-02-raised-arms-hastauttanasana": "mountain-tadasana",
  "step-2-raised-arms-hastauttanasana": "mountain-tadasana",
  "step-02-hastauttanasana": "mountain-tadasana",
  "step-2-hastauttanasana": "mountain-tadasana",
  "step-2-raised-arms-hastauttana": "mountain-tadasana",
  "raised-arms-hastauttanasana": "mountain-tadasana",
  "hastauttanasana": "mountain-tadasana",
  "hasta-uttanasana": "mountain-tadasana",

  // Step 3: Standing Forward Bend / Hastapadasana / Padahastasana
  "step-03-standing-forward-bend-hastapadasana": "standing-forward-bend-uttanasana",
  "step-3-standing-forward-bend-hastapadasana": "standing-forward-bend-uttanasana",
  "step-03-hand-to-foot-padahastasana": "standing-forward-bend-uttanasana",
  "step-3-hand-to-foot-padahastasana": "standing-forward-bend-uttanasana",
  "step-03-hastapadasana": "standing-forward-bend-uttanasana",
  "step-3-hastapadasana": "standing-forward-bend-uttanasana",
  "standing-forward-bend-hastapadasana": "standing-forward-bend-uttanasana",
  "hastapadasana": "standing-forward-bend-uttanasana",
  "padahastasana": "standing-forward-bend-uttanasana",

  // Step 4: Equestrian / Ashwa Sanchalanasana (Right Leg Back)
  "step-04-equestrian-right-back-ashwa-sanchalanasana": "crescent-lunge-on-knee-anjaneyasana",
  "step-4-equestrian-right-back-ashwa-sanchalanasana": "crescent-lunge-on-knee-anjaneyasana",
  "step-04-ashwa-sanchalanasana": "crescent-lunge-on-knee-anjaneyasana",
  "step-4-ashwa-sanchalanasana": "crescent-lunge-on-knee-anjaneyasana",
  "equestrian-right-back-ashwa-sanchalanasana": "crescent-lunge-on-knee-anjaneyasana",
  "ashwa-sanchalanasana": "crescent-lunge-on-knee-anjaneyasana",
  "ashwasanchalanasana": "crescent-lunge-on-knee-anjaneyasana",

  // Step 5: Plank / Dandasana / Phalakasana
  "step-05-plank-dandasana": "plank-phalakasana",
  "step-5-plank-dandasana": "plank-phalakasana",
  "step-05-dandasana": "plank-phalakasana",
  "step-5-dandasana": "plank-phalakasana",
  "plank-dandasana": "plank-phalakasana",
  "dandasana": "plank-phalakasana",
  "phalakasana": "plank-phalakasana",
  "plank": "plank-phalakasana",

  // Step 6: Eight-Limbed Salute / Ashtanga Namaskara
  "step-06-eight-limbed-salute-ashtanga-namaskara": "eight-point-ashtangasana",
  "step-6-eight-limbed-salute-ashtanga-namaskara": "eight-point-ashtangasana",
  "step-06-ashtanga-namaskara": "eight-point-ashtangasana",
  "step-6-ashtanga-namaskara": "eight-point-ashtangasana",
  "eight-limbed-salute-ashtanga-namaskara": "eight-point-ashtangasana",
  "ashtanga-namaskara": "eight-point-ashtangasana",
  "ashtanga-namaskar": "eight-point-ashtangasana",
  "ashtangasana": "eight-point-ashtangasana",

  // Step 7: Cobra / Bhujangasana
  "step-07-cobra-bhujangasana": "cobra-bhujangasana",
  "step-7-cobra-bhujangasana": "cobra-bhujangasana",
  "step-07-bhujangasana": "cobra-bhujangasana",
  "step-7-bhujangasana": "cobra-bhujangasana",
  "cobra-bhujangasana": "cobra-bhujangasana",
  "bhujangasana": "cobra-bhujangasana",
  "cobra": "cobra-bhujangasana",

  // Step 8: Downward-Facing Dog / Adho Mukha Svanasana
  "step-08-downward-dog-adho-mukha-svanasana": "downward-dog-adho-mukha-svanasana",
  "step-8-downward-dog-adho-mukha-svanasana": "downward-dog-adho-mukha-svanasana",
  "step-08-adho-mukha-svanasana": "downward-dog-adho-mukha-svanasana",
  "step-8-adho-mukha-svanasana": "downward-dog-adho-mukha-svanasana",
  "downward-dog-adho-mukha-svanasana": "downward-dog-adho-mukha-svanasana",
  "adho-mukha-svanasana": "downward-dog-adho-mukha-svanasana",
  "downward-dog": "downward-dog-adho-mukha-svanasana",
  "downdog": "downward-dog-adho-mukha-svanasana",

  // Step 9: Equestrian / Ashwa Sanchalanasana (Left Leg Back)
  "step-09-equestrian-left-back-ashwa-sanchalanasana": "crescent-lunge-on-knee-anjaneyasana",
  "step-9-equestrian-left-back-ashwa-sanchalanasana": "crescent-lunge-on-knee-anjaneyasana",
  "equestrian-left-back-ashwa-sanchalanasana": "crescent-lunge-on-knee-anjaneyasana",

  // Step 10: Standing Forward Bend (Return)
  "step-10-standing-forward-bend-hastapadasana": "standing-forward-bend-uttanasana",
  "standing-forward-bend-hastapadasana-return": "standing-forward-bend-uttanasana",

  // Step 11: Raised Arms (Return)
  "step-11-raised-arms-hastauttanasana": "mountain-tadasana",
  "raised-arms-hastauttanasana-return": "mountain-tadasana",

  // Step 12: Mountain Pose / Tadasana
  "step-12-mountain-tadasana": "mountain-tadasana",
  "mountain-tadasana": "mountain-tadasana",
  "mountain-pose": "mountain-tadasana",
  "tadasana": "mountain-tadasana",
};

/**
 * Resolves any asana ID or alias to its registered canonical ID.
 */
export function resolveCanonicalAsanaId(idOrAlias: string): string {
  if (!idOrAlias) return "";
  const normalized = normalizeAsanaId(idOrAlias);
  return ASANA_CANONICAL_ALIASES[normalized] || normalized;
}

function populateRegistryMap(asanas: AsanaDefinition[]) {
  ASANA_REGISTRY_MAP.clear();
  for (const asana of asanas) {
    const primaryKey = normalizeAsanaId(asana.id);
    ASANA_REGISTRY_MAP.set(primaryKey, asana);

    if (asana.slug) {
      const slugKey = normalizeAsanaId(asana.slug);
      if (slugKey && !ASANA_REGISTRY_MAP.has(slugKey)) {
        ASANA_REGISTRY_MAP.set(slugKey, asana);
      }
    }

    if (asana.aliases) {
      for (const alias of asana.aliases) {
        const aliasKey = normalizeAsanaId(alias);
        if (aliasKey && !ASANA_REGISTRY_MAP.has(aliasKey)) {
          ASANA_REGISTRY_MAP.set(aliasKey, asana);
        }
      }
    }
  }

  // Also bind canonical aliases to definitions in registry
  for (const [alias, targetId] of Object.entries(ASANA_CANONICAL_ALIASES)) {
    const targetKey = normalizeAsanaId(targetId);
    const targetDef = ASANA_REGISTRY_MAP.get(targetKey);
    if (targetDef && !ASANA_REGISTRY_MAP.has(alias)) {
      ASANA_REGISTRY_MAP.set(alias, targetDef);
    }
  }
}

// Initial populate from bundled authoritative catalog
populateRegistryMap(ALL_ASANAS);

// Duplicate declarations removed

export async function initAsanaRegistry() {
  const [supabaseRes, rulesCache] = await Promise.all([
    supabase.from("asanas").select("*").order("order_index", { ascending: true }),
    fetchRulesCache()
  ]);

  const { data, error } = supabaseRes;
  if (error) {
    console.error("Failed to fetch asanas from Supabase:", error);
    // Fallback if needed could go here
    return;
  }
  
  const mapped = data.map(row => {
    const rules = (rulesCache && (rulesCache[row.id] || rulesCache[row.slug])) || [];
    return {
      id: row.id,
      slug: row.slug,
      name: row.name,
      displayName: row.name,
      sanskritName: row.sanskrit_name,
      category: row.category,
      difficulty: row.difficulty,
      storagePath: row.storage_path,
      imageUrl: row.image_url || getAsanaImageUrl(`${row.slug || row.id}.webp`),
      videoUrl: row.video_url || getAsanaVideoUrl(`${row.slug || row.id}.mp4`),
      description: row.description,
      benefits: row.benefits || [],
      instructions: row.instructions || [],
      cues: row.cues || [],
      targetHoldSeconds: row.target_hold_seconds,
      ruleIds: row.rule_ids || [],
      isPremium: row.is_premium,
      orderIndex: row.order_index,
      aliases: [],
      rules: rules,
      requiredLandmarks: [],
    };
  }) as AsanaDefinition[];

  ALL_ASANAS = mapped;
  populateRegistryMap(ALL_ASANAS);
}

/**
 * Retrieves an AsanaDefinition by primary ID or known alias. Returns null if not found.
 */
export function getAsana(idOrAlias: string): AsanaDefinition | null {
  if (!idOrAlias) return null;
  const key = normalizeAsanaId(idOrAlias);
  const direct = ASANA_REGISTRY_MAP.get(key);
  if (direct) return direct;

  const canonicalKey = resolveCanonicalAsanaId(idOrAlias);
  if (canonicalKey && canonicalKey !== key) {
    return ASANA_REGISTRY_MAP.get(canonicalKey) ?? null;
  }
  return null;
}

/**
 * Checks if an asana exists in the registry.
 */
export function hasAsana(idOrAlias: string): boolean {
  if (!idOrAlias) return false;
  const key = normalizeAsanaId(idOrAlias);
  if (ASANA_REGISTRY_MAP.has(key)) return true;

  const canonicalKey = resolveCanonicalAsanaId(idOrAlias);
  return ASANA_REGISTRY_MAP.has(canonicalKey);
}

/**
 * Returns all registered asanas
 */
export function getAllAsanas(): AsanaDefinition[] {
  return ALL_ASANAS;
}

/**
 * Returns the free beginner asanas.
 */
export function getFreeAsanas(): AsanaDefinition[] {
  return ALL_ASANAS.filter((a) => !a.isPremium);
}

/**
 * Returns premium asanas.
 */
export function getPremiumAsanas(): AsanaDefinition[] {
  return ALL_ASANAS.filter((a) => a.isPremium);
}

/**
 * Filters asanas by anatomical/movement category.
 */
export function getAsanasByCategory(category: AsanaCategory): AsanaDefinition[] {
  return ALL_ASANAS.filter((a) => a.category === category);
}

/**
 * Filters asanas by difficulty level.
 */
export function getAsanasByDifficulty(difficulty: AsanaDifficulty): AsanaDefinition[] {
  return ALL_ASANAS.filter((a) => a.difficulty === difficulty);
}

/**
 * Retrieves PoseRules for a given asana ID or alias.
 */
export function getAsanaRules(idOrAlias: string): PoseRule[] {
  const asana = getAsana(idOrAlias);
  return asana ? asana.rules : [];
}

/**
 * Retrieves required landmarks for an asana.
 */
export function getAsanaRequiredLandmarks(idOrAlias: string): number[] {
  const asana = getAsana(idOrAlias);
  return asana ? asana.requiredLandmarks : [];
}

export const AsanaRegistry = {
  get: getAsana,
  has: hasAsana,
  getAll: getAllAsanas,
  getFree: getFreeAsanas,
  getPremium: getPremiumAsanas,
  getByCategory: getAsanasByCategory,
  getByDifficulty: getAsanasByDifficulty,
  getRules: getAsanaRules,
  getRequiredLandmarks: getAsanaRequiredLandmarks,
  normalizeId: normalizeAsanaId,
  resolveCanonicalId: resolveCanonicalAsanaId,
};
