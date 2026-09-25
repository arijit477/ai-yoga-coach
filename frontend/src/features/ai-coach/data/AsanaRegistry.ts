import type { AsanaCategory, AsanaDifficulty } from "../types/asana";
import type { AsanaDefinition } from "../types/asana-definition";
import type { PoseRule } from "../types/pose-rules";
import { ALL_ASANAS_CATALOG } from "./allAsanasCatalog";

/**
 * High-performance lookup Map for all Asana definitions keyed by normalized ID and all known aliases.
 */
const ASANA_REGISTRY_MAP = new Map<string, AsanaDefinition>();

/**
 * Normalizes any asset filename, query string URL, or alias into a stable asanaId.
 */
export function normalizeAsanaId(filenameOrId: string): string {
  if (!filenameOrId) return "";
  // Strip URL paths, query parameters, and extensions
  const clean = filenameOrId.split("?")[0].split("/").pop() || filenameOrId;
  return clean.replace(/\.(webp|png|jpg|jpeg)$/i, "").trim().toLowerCase();
}

// Populate the registry and index all aliases
for (const asana of ALL_ASANAS_CATALOG) {
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
 * Returns all registered asanas (all 170 Supabase assets).
 */
export function getAllAsanas(): AsanaDefinition[] {
  return ALL_ASANAS_CATALOG;
}

/**
 * Returns the free beginner asanas.
 */
export function getFreeAsanas(): AsanaDefinition[] {
  return ALL_ASANAS_CATALOG.filter((a) => !a.isPremium);
}

/**
 * Returns premium asanas.
 */
export function getPremiumAsanas(): AsanaDefinition[] {
  return ALL_ASANAS_CATALOG.filter((a) => a.isPremium);
}

/**
 * Filters asanas by anatomical/movement category.
 */
export function getAsanasByCategory(category: AsanaCategory): AsanaDefinition[] {
  return ALL_ASANAS_CATALOG.filter((a) => a.category === category);
}

/**
 * Filters asanas by difficulty level.
 */
export function getAsanasByDifficulty(difficulty: AsanaDifficulty): AsanaDefinition[] {
  return ALL_ASANAS_CATALOG.filter((a) => a.difficulty === difficulty);
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
