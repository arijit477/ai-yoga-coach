import type { BodyRegion } from "../types/camera";
import type { PoseRule } from "../types/pose-rules";
import { getPoseRules, hasPoseRules } from "./RuleEngine";
import { ensureAsanaRules } from "./rules/poseRulesRegistry";

/**
 * Standard MediaPipe 33 Landmark Indices per Body Region
 */
export const BODY_REGION_LANDMARKS: Record<BodyRegion, readonly number[]> = {
  head: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  neck: [11, 12],
  shoulders: [11, 12],
  elbows: [13, 14],
  wrists: [15, 16],
  spine: [11, 12, 23, 24],
  torso: [11, 12, 23, 24],
  hips: [23, 24],
  knees: [25, 26],
  ankles: [27, 28],
  feet: [27, 28, 29, 30, 31, 32],
};

/**
 * Mapping from MediaPipe landmark index to primary BodyRegion
 */
export const LANDMARK_INDEX_TO_REGION: Record<number, BodyRegion> = {
  0: "head", 1: "head", 2: "head", 3: "head", 4: "head",
  5: "head", 6: "head", 7: "head", 8: "head", 9: "head", 10: "head",
  11: "shoulders", 12: "shoulders",
  13: "elbows", 14: "elbows",
  15: "wrists", 16: "wrists",
  17: "wrists", 18: "wrists", 19: "wrists", 20: "wrists", 21: "wrists", 22: "wrists",
  23: "hips", 24: "hips",
  25: "knees", 26: "knees",
  27: "ankles", 28: "ankles",
  29: "feet", 30: "feet", 31: "feet", 32: "feet",
};

export interface AsanaLandmarkRequirements {
  asanaId: string;
  requiredLandmarks: number[];
  requiredRegions: BodyRegion[];
}

/**
 * Extract unique, sorted landmark indices required by a list of rules
 */
export function getRequiredLandmarks(rules: PoseRule[]): number[] {
  if (!rules || rules.length === 0) return [];
  const pointsSet = new Set<number>();
  for (const rule of rules) {
    if (Array.isArray(rule.points)) {
      for (const pt of rule.points) {
        if (typeof pt === "number" && pt >= 0 && pt <= 32) {
          pointsSet.add(pt);
        }
      }
    }
  }
  return Array.from(pointsSet).sort((a, b) => a - b);
}

/**
 * Map landmark indices to unique BodyRegions
 */
export function getRequiredBodyRegions(landmarkIndices: number[]): BodyRegion[] {
  if (!landmarkIndices || landmarkIndices.length === 0) return [];
  const regionsSet = new Set<BodyRegion>();
  for (const idx of landmarkIndices) {
    const region = LANDMARK_INDEX_TO_REGION[idx];
    if (region) {
      regionsSet.add(region);
    }
  }
  return Array.from(regionsSet);
}

// In-memory cache for precomputed requirements per asanaId
const requirementsCache = new Map<string, AsanaLandmarkRequirements>();

export function getAsanaLandmarkRequirements(
  asanaId: string,
  customRules?: PoseRule[],
): AsanaLandmarkRequirements {
  const cacheKey = customRules ? `${asanaId}_custom_${customRules.length}` : asanaId;
  const cached = requirementsCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  ensureAsanaRules(asanaId, customRules);
  const rules = customRules ?? (hasPoseRules(asanaId) ? getPoseRules(asanaId) : []);
  const requiredLandmarks = getRequiredLandmarks(rules);
  const requiredRegions = getRequiredBodyRegions(requiredLandmarks);

  const result: AsanaLandmarkRequirements = {
    asanaId,
    requiredLandmarks,
    requiredRegions,
  };

  requirementsCache.set(cacheKey, result);
  return result;
}

export function clearAsanaRequirementsCache(): void {
  requirementsCache.clear();
}

/**
 * Development & debug validation formatter
 */
export function formatAsanaReadinessDebug(
  asanaId: string,
  requirements: AsanaLandmarkRequirements,
  missingRegions: BodyRegion[],
  readinessStatus: string,
): string {
  return [
    `Active Asana: ${asanaId}`,
    `Required Regions: ${requirements.requiredRegions.join(", ") || "none"}`,
    `Required Landmarks: ${requirements.requiredLandmarks.join(", ") || "none"}`,
    `Missing Regions: ${missingRegions.join(", ") || "none"}`,
    `Readiness: ${readinessStatus}`,
  ].join("\n");
}
