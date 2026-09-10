import type { PoseRule } from "../types/pose-rules";

/**
 * Central registry for pose-analysis rules.
 *
 * Asanas should provide their rules as data rather than
 * requiring a separate evaluator implementation.
 */

const ruleRegistry = new Map<string, PoseRule[]>();

/**
 * Register rules for an asana.
 */
export function registerPoseRules(
  asanaId: string,
  rules: PoseRule[],
): void {
  if (!asanaId.trim()) {
    throw new Error(
      "Cannot register rules without an asana ID.",
    );
  }

  ruleRegistry.set(
    asanaId,
    [...rules],
  );
}

/**
 * Retrieve rules for an asana.
 */
export function getPoseRules(
  asanaId: string,
): PoseRule[] {
  return ruleRegistry.get(asanaId) ?? [];
}

/**
 * Check whether rules have been registered.
 */
export function hasPoseRules(
  asanaId: string,
): boolean {
  return ruleRegistry.has(asanaId);
}

/**
 * Remove registered rules for an asana.
 */
export function clearPoseRules(
  asanaId: string,
): void {
  ruleRegistry.delete(asanaId);
}

/**
 * Clear all registered rules.
 */
export function clearAllPoseRules(): void {
  ruleRegistry.clear();
}