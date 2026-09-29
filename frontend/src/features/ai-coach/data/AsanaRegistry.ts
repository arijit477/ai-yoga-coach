import type { AsanaCategory, AsanaDifficulty } from "../types/asana";
import type { AsanaDefinition } from "../types/asana-definition";
import type { PoseRule } from "../types/pose-rules";
import { supabase } from "../../../lib/supabase";
import { fetchRulesCache } from "../analysis/rules/poseRulesRegistry";
import { getAsanaImageUrl, getAsanaVideoUrl } from "./freeAsanas";

let ALL_ASANAS: AsanaDefinition[] = [];
const ASANA_REGISTRY_MAP = new Map<string, AsanaDefinition>();

/**
 * Normalizes any asset filename, query string URL, or alias into a stable asanaId.
 */
export function normalizeAsanaId(filenameOrId: string): string {
  if (!filenameOrId) return "";
  const clean = filenameOrId.split("?")[0].split("/").pop() || filenameOrId;
  return clean.replace(/\.(webp|png|jpg|jpeg)$/i, "").trim().toLowerCase();
}

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

  ASANA_REGISTRY_MAP.clear();
  for (const asana of ALL_ASANAS) {
    const primaryKey = normalizeAsanaId(asana.id);
    ASANA_REGISTRY_MAP.set(primaryKey, asana);

    if (asana.aliases) {
      for (const alias of asana.aliases) {
        const aliasKey = normalizeAsanaId(alias);
        if (aliasKey && !ASANA_REGISTRY_MAP.has(aliasKey)) {
          ASANA_REGISTRY_MAP.set(aliasKey, asana);
        }
      }
    }
  }
}

/**
 * Retrieves an AsanaDefinition by primary ID or known alias. Returns null if not found.
 */
export function getAsana(idOrAlias: string): AsanaDefinition | null {
  if (!idOrAlias) return null;
  const key = normalizeAsanaId(idOrAlias);
  return ASANA_REGISTRY_MAP.get(key) ?? null;
}

/**
 * Checks if an asana exists in the registry.
 */
export function hasAsana(idOrAlias: string): boolean {
  if (!idOrAlias) return false;
  const key = normalizeAsanaId(idOrAlias);
  return ASANA_REGISTRY_MAP.has(key);
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
};
