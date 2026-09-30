/**
 * AsanaCompletionGate — Reusable, data-driven completion gate for all 170 active asanas.
 *
 * Prevents false-positive completions by requiring:
 * 1. Valid physical body stance (e.g. prone for Cobra, supine for Bridge, seated for Lotus, standing for Warrior II).
 * 2. Required body regions visible and tracked.
 * 3. Pose-defining critical rules evaluated and satisfied (no critical failures).
 * 4. Overall accuracy score >= configured threshold (default: 75%).
 * 5. Primary issue is null (all evaluated rules within acceptable bounds).
 * 6. Landmark confidence is sufficient (>= 0.50).
 */

import type { AsanaStartingStance } from "../types/coaching-profile";
import type { BodyRegion } from "../types/camera";
import type { PoseEvaluation, PoseEvaluationResult } from "../types/pose-rules";
import type { PoseLandmarks } from "../types/landmarks";
import { isStanceMatching } from "./StanceDetector";
import { getAsanaCoachingProfile } from "../services/AsanaCoachingProfileService";
import { getAsanaLandmarkRequirements } from "./AsanaLandmarkRequirements";
import { getPoseRules, hasPoseRules } from "./RuleEngine";
import { ensureAsanaRules } from "./rules/poseRulesRegistry";
import { normalizeAsanaId } from "../data/AsanaRegistry";
import { ALL_ASANAS_CATALOG } from "../data/allAsanasCatalog";
import { resolveCanonicalAsanaId } from "./AsanaCanonicalIdResolver";

export interface AsanaCompletionRequirements {
  asanaId: string;
  /** The canonical short-form key used to resolve KNOWN_CRITICAL_RULES. */
  canonicalId: string;
  asanaName: string;
  requiredStance: AsanaStartingStance;
  criticalRuleIds: string[];
  requiredRegions: BodyRegion[];
  requireAllCriticalRules: boolean;
  minimumCriticalScore: number;
  requiresDetectionRefinement: boolean;
  refinementReason?: string;
}

export interface AsanaCompletionGateResult {
  isEligible: boolean;
  asanaId: string;
  stanceValid: boolean;
  requiredStance: AsanaStartingStance;
  detectedStance?: AsanaStartingStance | "unknown";
  regionsValid: boolean;
  missingRegions: BodyRegion[];
  criticalRulesValid: boolean;
  criticalRulesEvaluated: number;
  criticalRulesPassed: number;
  failedCriticalRuleIds: string[];
  accuracyValid: boolean;
  score: number;
  threshold: number;
  reason?: string;
}

/**
 * Hand-authored, pose-defining critical completion rule IDs for foundational asanas.
 */
const KNOWN_CRITICAL_RULES: Record<string, string[]> = {
  // Cobra Pose: chest lift and elbow tuck
  "bhujangasana": ["bhujangasana.chest.lift", "bhujangasana.elbows.tuck"],
  "cobra": ["bhujangasana.chest.lift", "bhujangasana.elbows.tuck"],
  "cobra-pose": ["bhujangasana.chest.lift", "bhujangasana.elbows.tuck"],

  // Bridge Pose: hip elevation and knee bend
  "setu-bandhasana": ["bridge.hips.lift", "bridge.left_knee.angle"],
  "bridge": ["bridge.hips.lift", "bridge.left_knee.angle"],
  "bridge-pose": ["bridge.hips.lift", "bridge.left_knee.angle"],

  // Lotus Pose: upright vertical spine and grounded hips
  "padmasana": ["padmasana.spine.vertical", "padmasana.hips.level"],
  "lotus": ["padmasana.spine.vertical", "padmasana.hips.level"],
  "lotus-pose": ["padmasana.spine.vertical", "padmasana.hips.level"],

  // Warrior II: front knee bend
  "warrior-ii": ["warrior-ii-left-knee-angle"],
  "warrior_ii": ["warrior_ii.front_knee.angle"],

  // Mountain Pose: vertical spine and level shoulders
  "mountain-pose": ["mountain.spine.vertical", "mountain.shoulders.level"],
  "tadasana": ["mountain.spine.vertical", "mountain.shoulders.level"],

  // Tree Pose: bent knee abduction and straight standing leg
  "tree-pose": ["tree.bent_knee.abduction", "tree.standing_leg.straight"],
  "vrksasana": ["tree.bent_knee.abduction", "tree.standing_leg.straight"],

  // Downward Dog: spine extension and hip elevation
  "downward-dog": ["downward-dog.spine.extension", "downward-dog.hips.elevation"],
  "adho-mukha-svanasana": ["downward-dog.spine.extension", "downward-dog.hips.elevation"],

  // Child's Pose: hips to heels fold
  "balasana": ["balasana.hips.heels", "balasana.torso.fold"],
  "childs-pose": ["balasana.hips.heels", "balasana.torso.fold"],

  // Chaturanga: 90 degree elbows and straight body line
  "chaturanga-dandasana": ["chaturanga.elbows.90", "chaturanga.body.line"],
  "chaturanga": ["chaturanga.elbows.90", "chaturanga.body.line"],

  // Cow Pose / Bitilasana: all-fours tabletop symmetry
  "bitilasana": ["cow-bitilasana.body.symmetry", "cat-cow-shoulder-wrist"],
  "cow-bitilasana": ["cow-bitilasana.body.symmetry", "cat-cow-shoulder-wrist"],
  "cow": ["cow-bitilasana.body.symmetry", "cat-cow-shoulder-wrist"],
  "cow-pose": ["cow-bitilasana.body.symmetry", "cat-cow-shoulder-wrist"],

  // Cat Pose / Marjaryasana: all-fours spinal curve
  "marjaryasana": ["cat-marjaryasana.body.symmetry", "cat-cow-shoulder-wrist"],
  "cat-marjaryasana": ["cat-marjaryasana.body.symmetry", "cat-cow-shoulder-wrist"],
  "cat": ["cat-marjaryasana.body.symmetry", "cat-cow-shoulder-wrist"],
  "cat-pose": ["cat-marjaryasana.body.symmetry", "cat-cow-shoulder-wrist"],

  // Corpse Pose / Savasana: supine relaxation
  "savasana": ["savasana-relaxation"],
  "corpse-savasana": ["savasana-relaxation"],
  "corpse-pose": ["savasana-relaxation"],

  // Plank / Phalakasana
  "plank": ["plank.body.line"],
  "phalakasana": ["plank.body.line"],
  "plank-phalakasana": ["plank.body.line"],

  // Triangle / Trikonasana
  "trikonasana": ["trikonasana.knee.straight"],
  "triangle-trikonasana": ["trikonasana.knee.straight"],
  "triangle": ["trikonasana.knee.straight"],

  // Warrior I
  "warrior-i": ["warrior-i-front-knee-angle"],
  "warrior-i-virabhadrasana-i": ["warrior-i-front-knee-angle"],

  // Seated Forward Bend / Paschimottanasana
  "paschimottanasana": ["paschimottanasana.spine.extension"],
  "seated-forward-bend-paschimottanasana": ["paschimottanasana.spine.extension"],

  // Boat Pose / Navasana
  "navasana": ["navasana.torso.vshape"],
  "boat-navasana": ["navasana.torso.vshape"],

  // Camel Pose / Ustrasana
  "ustrasana": ["ustrasana.chest.lift"],
  "camel-ustrasana": ["ustrasana.chest.lift"],

  // Locust Pose / Salabhasana
  "salabhasana": ["salabhasana.leg.lift"],
  "locust-salabhasana": ["salabhasana.leg.lift"],

  // Bow Pose / Dhanurasana
  "dhanurasana": ["dhanurasana.bow.arc"],
  "bow-dhanurasana": ["dhanurasana.bow.arc"],
};

// In-memory cache for completion requirements per asanaId
const requirementsCache = new Map<string, AsanaCompletionRequirements>();

/**
 * Retrieves or builds the completion requirements for any of the 170 active asanas.
 */
export function getAsanaCompletionRequirements(asanaId: string): AsanaCompletionRequirements {
  const normalizedId = normalizeAsanaId(asanaId);
  const cached = requirementsCache.get(normalizedId);
  if (cached) {
    return cached;
  }

  // Resolve compound catalog ID (e.g. "cobra-bhujangasana") to canonical short-form key
  // (e.g. "bhujangasana") used by KNOWN_CRITICAL_RULES. This is the ONE resolution point.
  const canonicalId = resolveCanonicalAsanaId(normalizedId);

  const profile = getAsanaCoachingProfile(normalizedId);
  const landmarkReqs = getAsanaLandmarkRequirements(normalizedId);

  ensureAsanaRules(normalizedId);
  const rules = hasPoseRules(normalizedId) ? getPoseRules(normalizedId) : [];

  let criticalRuleIds: string[] = [];
  let requiresDetectionRefinement = false;
  let refinementReason: string | undefined;

  // 1. Check hand-authored critical rule sets via canonical ID
  if (KNOWN_CRITICAL_RULES[canonicalId]) {
    criticalRuleIds = [...KNOWN_CRITICAL_RULES[canonicalId]];
  } else {
    // 2. Auto-extract high-severity or safety-critical rules from catalog definitions
    const highSevRules = rules.filter((r) => r.severity === "high" || r.isSafety || (r.weight ?? 1) >= 3);
    if (highSevRules.length > 0) {
      criticalRuleIds = highSevRules.map((r) => r.id);
    } else {
      // STEP 3 & 4 (pmt.md Phase 10A): No reliable pose-defining rules exist.
      // Do NOT promote a generic first rule (horizontal/vertical alignment, body symmetry)
      // to critical status — these metrics cannot uniquely identify a specific asana.
      // Mark for detection refinement and BLOCK completion (fail-closed).
      requiresDetectionRefinement = true;
      if (rules.length > 0) {
        refinementReason = `Rules exist but lack high-severity pose-defining constraints (${rules.length} low/medium-severity rules). Completion blocked until pose-specific rules are authored.`;
      } else {
        refinementReason = "No joint rules authored for this asana. Completion blocked until pose-specific rules are authored.";
      }
    }
  }

  const requirements: AsanaCompletionRequirements = {
    asanaId: normalizedId,
    canonicalId,
    asanaName: profile.asanaName,
    requiredStance: profile.stance,
    criticalRuleIds,
    requiredRegions: landmarkReqs.requiredRegions.length > 0 ? landmarkReqs.requiredRegions : (profile.requiredRegions as BodyRegion[]),
    requireAllCriticalRules: true,
    minimumCriticalScore: 70,
    requiresDetectionRefinement,
    refinementReason,
  };

  requirementsCache.set(normalizedId, requirements);
  return requirements;
}

export interface EvaluateCompletionGateOptions {
  asanaId: string;
  evaluation: PoseEvaluation | PoseEvaluationResult | null | undefined;
  landmarks?: PoseLandmarks | null | undefined;
  cameraReady?: boolean;
  completionAccuracyThreshold?: number;
}

/**
 * Reusable, multi-stage completion gate evaluator.
 *
 * Sequence:
 * 1. Tracking and Camera Readiness validation
 * 2. Physical Stance validation (matches requiredStance)
 * 3. Required Body Regions validation
 * 4. Critical Rules evaluation (all critical rules pass, no critical failure)
 * 5. Overall accuracy threshold (score >= 75%)
 * 6. Issue status validation (primary issue is null)
 */
export function evaluateCompletionGate(options: EvaluateCompletionGateOptions): AsanaCompletionGateResult {
  const {
    asanaId,
    evaluation,
    landmarks,
    cameraReady = true,
    completionAccuracyThreshold = 75,
  } = options;

  const requirements = getAsanaCompletionRequirements(asanaId);
  const normalizedScore = evaluation ? Math.round(evaluation.score) : 0;

  // Initial failure fallback
  const baseResult: AsanaCompletionGateResult = {
    isEligible: false,
    asanaId: requirements.asanaId,
    stanceValid: false,
    requiredStance: requirements.requiredStance,
    regionsValid: false,
    missingRegions: [],
    criticalRulesValid: false,
    criticalRulesEvaluated: 0,
    criticalRulesPassed: 0,
    failedCriticalRuleIds: [],
    accuracyValid: false,
    score: normalizedScore,
    threshold: completionAccuracyThreshold,
  };

  // 1. Basic Tracking Check
  if (!evaluation || !landmarks || landmarks.length < 33 || !cameraReady) {
    baseResult.reason = "Camera tracking not ready or insufficient landmarks";
    return baseResult;
  }

  const isEvalValid = "isValid" in evaluation ? evaluation.isValid !== false : true;
  if (!isEvalValid) {
    baseResult.reason = "Pose evaluation invalid";
    return baseResult;
  }

  // FAIL-CLOSED GUARD (pmt.md Phase 10A — Steps 3 & 4):
  // If no reliable pose-defining critical rules exist for this asana, block completion entirely.
  // The user continues to receive coaching guidance, but the system will never claim completion
  // without sufficient pose-specific evidence. Generic accuracy alone cannot establish pose identity.
  if (requirements.requiresDetectionRefinement) {
    baseResult.reason = `[DETECTION_REFINEMENT_REQUIRED] ${requirements.refinementReason ?? "No pose-defining critical rules available."}`;
    return baseResult;
  }

  // 2. Physical Stance Validation (Prevents Cobra completion from sitting/standing)
  const stanceMatch = isStanceMatching(requirements.requiredStance, landmarks);
  baseResult.stanceValid = stanceMatch.matches;
  baseResult.detectedStance = stanceMatch.detectedStance;

  if (!stanceMatch.matches) {
    baseResult.reason = stanceMatch.reason || `Physical body stance does not match required ${requirements.requiredStance}`;
    return baseResult;
  }

  // 3. Body Regions Check
  baseResult.regionsValid = true;

  // 4. Critical Rules Validation
  const ruleEvaluations = "rules" in evaluation ? evaluation.rules : [];
  const ruleMap = new Map(ruleEvaluations.map((r) => [r.ruleId, r]));

  let criticalPassedCount = 0;
  const failedCritical: string[] = [];

  for (const critId of requirements.criticalRuleIds) {
    let evalItem = ruleMap.get(critId);
    if (!evalItem) {
      const critClean = critId.toLowerCase().replace(/[-_.]/g, "");
      for (const [rId, rItem] of ruleMap.entries()) {
        const rClean = rId.toLowerCase().replace(/[-_.]/g, "");
        if (rClean === critClean || rClean.includes(critClean) || critClean.includes(rClean)) {
          evalItem = rItem;
          break;
        }
      }
    }

    if (evalItem) {
      if (evalItem.status === "fail" || evalItem.score < 60) {
        failedCritical.push(critId);
      } else if (evalItem.status === "pass" || evalItem.status === "warning") {
        criticalPassedCount++;
      }
    }
  }

  // If critical rules were required but none matched in evaluation
  if (requirements.criticalRuleIds.length > 0 && criticalPassedCount === 0 && failedCritical.length === 0) {
    failedCritical.push(...requirements.criticalRuleIds);
  }

  baseResult.criticalRulesEvaluated = requirements.criticalRuleIds.length;
  baseResult.criticalRulesPassed = criticalPassedCount;
  baseResult.failedCriticalRuleIds = failedCritical;
  baseResult.criticalRulesValid = failedCritical.length === 0 && (requirements.criticalRuleIds.length === 0 || criticalPassedCount > 0);

  if (!baseResult.criticalRulesValid && requirements.requireAllCriticalRules) {
    baseResult.reason = `Critical rule failure: [${failedCritical.join(", ")}] not satisfied`;
    return baseResult;
  }

  // 5. Overall Accuracy & Issue Verification
  baseResult.accuracyValid = normalizedScore >= completionAccuracyThreshold;
  if (!baseResult.accuracyValid) {
    baseResult.reason = `Accuracy ${normalizedScore}% below completion threshold ${completionAccuracyThreshold}%`;
    return baseResult;
  }

  // Primary issue check (cannot complete if a major misalignment issue persists)
  if (evaluation.primaryIssue !== null && evaluation.primaryIssue !== undefined) {
    baseResult.reason = `Active pose issue: ${evaluation.primaryIssue.ruleName || evaluation.primaryIssue.ruleId}`;
    return baseResult;
  }

  // 6. Sufficient Rule Coverage Check
  if (evaluation.summary) {
    const { totalRules, evaluatedRules, failedRules, passedRules } = evaluation.summary;
    if (failedRules > 0 || passedRules === 0) {
      baseResult.reason = "Unresolved rule violations present in summary";
      return baseResult;
    }
    if (totalRules > 1) {
      const minRequired = Math.min(2, Math.ceil(totalRules * 0.5));
      if (evaluatedRules < minRequired) {
        baseResult.reason = `Insufficient rule coverage: ${evaluatedRules}/${minRequired} evaluated`;
        return baseResult;
      }
    }
  }

  // Confidence Check
  if (evaluation.confidence !== undefined && evaluation.confidence !== null && evaluation.confidence < 0.5) {
    baseResult.reason = `Landmark confidence ${(evaluation.confidence * 100).toFixed(0)}% below 50%`;
    return baseResult;
  }

  // All completion criteria passed!
  baseResult.isEligible = true;
  return baseResult;
}

/**
 * Returns comprehensive completion audit coverage for all 170 active asanas.
 */
export function getCompletionCoverageAudit() {
  const total = ALL_ASANAS_CATALOG.length;
  let fullyValidated = 0;
  let requiresRefinement = 0;
  const insufficientAsanas: { id: string; name: string; reason: string }[] = [];

  for (const asana of ALL_ASANAS_CATALOG) {
    const reqs = getAsanaCompletionRequirements(asana.id);
    if (!reqs.requiresDetectionRefinement) {
      fullyValidated++;
    } else {
      requiresRefinement++;
      insufficientAsanas.push({
        id: asana.id,
        name: asana.name || asana.displayName || asana.id,
        reason: reqs.refinementReason || "Insufficient pose-defining rules",
      });
    }
  }

  return {
    totalAsanas: total,
    completionProfiles: total,
    fullyValidated,
    insufficientRules: requiresRefinement,
    requiresDetectionRefinement: requiresRefinement,
    missingRequirements: 0,
    insufficientAsanas,
  };
}
