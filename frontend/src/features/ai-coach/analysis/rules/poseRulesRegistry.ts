import type { PoseRule } from "../../types/pose-rules";

import { registerPoseRules, getPoseRules, hasPoseRules } from "../RuleEngine";

let RULES_CACHE: Record<string, PoseRule[]> | null = null;

export async function fetchRulesCache() {
  if (RULES_CACHE) return RULES_CACHE;
  try {
    const res = await fetch("/data/rules.json");
    RULES_CACHE = await res.json();
  } catch (err) {
    console.error("Failed to fetch rules", err);
    RULES_CACHE = {};
  }
  return RULES_CACHE;
}

export const ASANA_RULES_CATALOG: Record<string, PoseRule[]> = {}; // Kept for backwards compat during init, but empty

import { getAsanaDefinition } from "./asanas";

/**
 * Ensures rules for the specified asana are registered in the RuleEngine.
 */
export function ensureAsanaRules(asanaId: string, customRules?: PoseRule[]): PoseRule[] {
  if (customRules && customRules.length > 0) {
    registerPoseRules(asanaId, customRules);
    return customRules;
  }

  if (hasPoseRules(asanaId)) {
    const registered = getPoseRules(asanaId);
    if (registered.length > 0) {
      return registered;
    }
  }

  const asanaDef = getAsanaDefinition(asanaId);
  const defaultRules = asanaDef?.rules ?? (RULES_CACHE && RULES_CACHE[asanaId]) ?? ASANA_RULES_CATALOG[asanaId] ?? [];
  if (defaultRules.length > 0) {
    registerPoseRules(asanaId, defaultRules);
  }

  return defaultRules;
}
