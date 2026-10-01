/**
 * PoseIdentityValidator — Reusable, authoritative validator distinguishing
 * "User is actively performing the selected asana" vs "User happens to satisfy generic posture checks".
 *
 * Implements Phase 1 Pose Identity Architecture:
 * 1. Selected Asana -> Canonical ID normalization via AsanaCanonicalIdResolver.
 * 2. Physical body stance validation via StanceDetector.
 * 3. Required key landmark presence & visibility confidence check.
 * 4. Multi-signal evaluation against hand-authored pose-defining critical rules.
 * 5. Fail-safe rejection when identity requirements are missing or ambiguous.
 */

import type {
  PoseEvaluatorContext,
  PoseIdentityResult,
  PoseRule,
} from "../types/pose-rules";
import type { PoseFeatures } from "../types/pose-features";
import { resolveCanonicalAsanaId } from "./AsanaCanonicalIdResolver";
import { normalizeAsanaId } from "../data/AsanaRegistry";
import { isStanceMatching, detectStance } from "./StanceDetector";
import { getAsanaCoachingProfile } from "../services/AsanaCoachingProfileService";
import { getAsanaLandmarkRequirements } from "./AsanaLandmarkRequirements";
import { getAsanaDefinition } from "./rules/asanas";
import { getLandmarkConfidence, isLandmarkUsable } from "./LandmarkUtils";
import { KNOWN_CRITICAL_RULES } from "./AsanaCompletionGate";
import { evaluateRule } from "./RuleEvaluator";
import { getPoseRules, hasPoseRules } from "./RuleEngine";
import type { AsanaStartingStance } from "../types/coaching-profile";

/**
 * Validates whether the user's current physical body configuration
 * matches the selected asana's true pose identity.
 */
export function validatePoseIdentity(
  asanaId: string,
  context: PoseEvaluatorContext,
  _poseFeatures?: PoseFeatures,
  customRules?: PoseRule[],
): PoseIdentityResult {
  if (!asanaId) {
    return {
      isMatch: false,
      confidence: 0,
      canonicalAsanaId: "",
      passedRequirements: [],
      failedRequirements: ["asana_id_missing"],
      criticalFailures: ["asana_id_missing"],
      reason: "No asana selected",
    };
  }

  // 1. Resolve Canonical Asana ID
  const normalizedId = normalizeAsanaId(asanaId);
  const canonicalId = resolveCanonicalAsanaId(normalizedId);

  // 2. Validate Landmarks Existence & Confidence
  const landmarks = context.landmarks;
  if (!landmarks || landmarks.length < 33) {
    return {
      isMatch: false,
      confidence: 0,
      canonicalAsanaId: canonicalId,
      passedRequirements: [],
      failedRequirements: ["landmarks_unavailable"],
      criticalFailures: ["landmarks_unavailable"],
      reason: "Insufficient landmark tracking (less than 33 landmarks detected)",
    };
  }

  // 3. Resolve Stance & Landmark Requirements
  const coachingProfile = getAsanaCoachingProfile(normalizedId) || getAsanaCoachingProfile(canonicalId);
  const asanaDef = getAsanaDefinition(canonicalId) || getAsanaDefinition(normalizedId);
  const requiredStance: AsanaStartingStance =
    coachingProfile?.stance ??
    (asanaDef?.category === "backbend" && (canonicalId.includes("cobra") || canonicalId.includes("bhujangasana"))
      ? "prone"
      : "standing");

  // 4. Validate Required Landmark Visibility & Confidence
  const landmarkReqs = getAsanaLandmarkRequirements(canonicalId);
  const requiredLandmarkIndices: number[] =
    asanaDef?.requiredLandmarks && asanaDef.requiredLandmarks.length > 0
      ? asanaDef.requiredLandmarks
      : (landmarkReqs?.requiredLandmarks ?? []);

  const indicesToEvaluate = requiredLandmarkIndices.length > 0 ? requiredLandmarkIndices : [11, 12, 23, 24];
  let totalLandmarkConfidence = 0;
  for (const idx of indicesToEvaluate) {
    totalLandmarkConfidence += landmarks[idx] ? getLandmarkConfidence(landmarks[idx]) : 0;
  }
  const landmarkConfidence = indicesToEvaluate.length > 0 ? totalLandmarkConfidence / indicesToEvaluate.length : 0;
  
  // Verify critical landmark points are individually usable
  const missingOrLowConfidenceLandmarks: number[] = [];
  for (const idx of indicesToEvaluate) {
    if (!landmarks[idx] || !isLandmarkUsable(landmarks[idx], 0.35)) {
      missingOrLowConfidenceLandmarks.push(idx);
    }
  }

  if (landmarkConfidence < 0.40 || missingOrLowConfidenceLandmarks.length > Math.ceil(requiredLandmarkIndices.length * 0.5)) {
    return {
      isMatch: false,
      confidence: landmarkConfidence,
      canonicalAsanaId: canonicalId,
      requiredStance,
      detectedStance: "unknown",
      passedRequirements: [],
      failedRequirements: ["required_landmarks_visibility"],
      criticalFailures: ["required_landmarks_visibility"],
      reason: `Required body landmarks unavailable or low confidence (${Math.round(landmarkConfidence * 100)}%)`,
    };
  }

  // 5. Run Physical Stance Validation
  const stanceMatch = isStanceMatching(requiredStance, landmarks);
  const detectedStance = stanceMatch.detectedStance ?? detectStance(landmarks).detectedStance;

  if (!stanceMatch.matches) {
    return {
      isMatch: false,
      confidence: stanceMatch.confidence,
      canonicalAsanaId: canonicalId,
      requiredStance,
      detectedStance,
      passedRequirements: [],
      failedRequirements: [`stance:${requiredStance}`],
      criticalFailures: [`stance_mismatch:${requiredStance}_vs_${detectedStance}`],
      reason: stanceMatch.reason || `Stance mismatch: expected ${requiredStance}, detected ${detectedStance}`,
    };
  }

  // 5. Deterministic Rule Source Priority
  // Precedence 1: Hand-authored AsanaDefinition rules (e.g. bhujangasanaPose)
  // Precedence 2: Custom / Registered Pose Rules in RuleEngine
  // Precedence 3: Cached or fallback rules
  let activeRules: PoseRule[] = [];
  if (asanaDef?.rules && asanaDef.rules.length > 0) {
    activeRules = asanaDef.rules;
  } else if (customRules && customRules.length > 0) {
    activeRules = customRules;
  } else if (hasPoseRules(canonicalId)) {
    activeRules = getPoseRules(canonicalId);
  } else if (hasPoseRules(asanaId)) {
    activeRules = getPoseRules(asanaId);
  }

  if (!activeRules || activeRules.length === 0) {
    // Step 11: Fail safe if asana has insufficient identity requirements
    return {
      isMatch: false,
      confidence: landmarkConfidence,
      canonicalAsanaId: canonicalId,
      requiredStance,
      detectedStance,
      passedRequirements: [`stance:${requiredStance}`],
      failedRequirements: ["insufficient_rules"],
      criticalFailures: ["insufficient_rules"],
      reason: "Insufficient pose identity requirements defined for this asana",
    };
  }

  // 6. Asana-Specific Identity & Critical Rules Evaluation
  // Collect known critical rules for this asana
  const knownCriticalRuleIds = new Set<string>(
    KNOWN_CRITICAL_RULES[canonicalId] ??
    KNOWN_CRITICAL_RULES[asanaId] ??
    []
  );

  const passedRequirements: string[] = [`stance:${requiredStance}`];
  const failedRequirements: string[] = [];
  const criticalFailures: string[] = [];

  let criticalRulesCount = 0;
  let criticalRulesPassed = 0;
  let poseDefiningRulesPassed = 0;
  let totalEvaluableRules = 0;

  for (const rule of activeRules) {
    const isCritical =
      knownCriticalRuleIds.has(rule.id) ||
      rule.severity === "high" ||
      rule.isSafety === true;

    if (isCritical) {
      criticalRulesCount++;
    }

    const evalResult = evaluateRule(rule, context);

    if (evalResult.status === "pass" || (evalResult.status === "warning" && evalResult.score >= 60)) {
      passedRequirements.push(rule.id);
      totalEvaluableRules++;
      if (isCritical) {
        criticalRulesPassed++;
      }
      // Distinguish pose-defining kinematic rules (angles/distances) from mere level/alignment rules
      if (rule.metric === "angle" || rule.metric === "distance" || isCritical) {
        poseDefiningRulesPassed++;
      }
    } else if (evalResult.status === "fail" || evalResult.status === "warning") {
      failedRequirements.push(rule.id);
      totalEvaluableRules++;
      if (isCritical) {
        criticalFailures.push(rule.id);
      }
    } else {
      // "unknown" or "not_evaluable"
      if (isCritical) {
        criticalFailures.push(`${rule.id}:not_evaluable`);
        failedRequirements.push(`${rule.id}:not_evaluable`);
      }
    }
  }

  // 7. Multi-Signal Identity Decision (Step 8 & 9)
  // Condition 1: All critical identity rules must pass (0 critical failures)
  const criticalPassed = criticalFailures.length === 0;

  // Condition 2: At least 1 pose-defining kinematic rule passed, preventing single-generic-rule false positives
  const hasPoseDefiningEvidence =
    activeRules.length <= 1
      ? passedRequirements.length >= 1
      : poseDefiningRulesPassed >= 1;

  // Condition 3: If multiple rules are configured, require at least half of evaluable rules to be satisfied
  const minimumRuleCoveragePassed =
    totalEvaluableRules > 0 &&
    (passedRequirements.length - 1) >= Math.min(2, Math.ceil(activeRules.length * 0.4));

  const isMatch = Boolean(
    criticalPassed &&
    hasPoseDefiningEvidence &&
    minimumRuleCoveragePassed
  );

  let reason = "Pose identity confirmed";
  if (!criticalPassed) {
    reason = `Critical identity requirements failed: ${criticalFailures.join(", ")}`;
  } else if (!hasPoseDefiningEvidence) {
    reason = "Pose-defining geometric angles not achieved";
  } else if (!minimumRuleCoveragePassed) {
    reason = "Insufficient pose requirement coverage";
  }

  return {
    isMatch,
    confidence: landmarkConfidence,
    canonicalAsanaId: canonicalId,
    requiredStance,
    detectedStance,
    passedRequirements,
    failedRequirements,
    criticalFailures,
    reason,
  };
}

/**
 * Format human-readable diagnostics for development and test debugging.
 */
export function formatPoseIdentityDiagnostics(result: PoseIdentityResult): string {
  const lines: string[] = [
    "POSE IDENTITY DIAGNOSTICS",
    "------------------------",
    `Canonical Asana: ${result.canonicalAsanaId}`,
    `Required Stance: ${result.requiredStance ?? "none"}`,
    `Detected Stance: ${result.detectedStance ?? "unknown"}`,
    `Match Status:    ${result.isMatch ? "MATCH (✓)" : "NO MATCH (✗)"}`,
    `Confidence:      ${Math.round(result.confidence * 100)}%`,
    `Reason:          ${result.reason ?? "N/A"}`,
    `Passed (${result.passedRequirements.length}):   ${result.passedRequirements.join(", ") || "none"}`,
    `Failed (${result.failedRequirements.length}):   ${result.failedRequirements.join(", ") || "none"}`,
    `Critical Failures (${result.criticalFailures.length}): ${result.criticalFailures.join(", ") || "none"}`,
  ];
  return lines.join("\n");
}
