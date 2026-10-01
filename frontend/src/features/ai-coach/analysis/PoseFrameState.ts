/**
 * PoseFrameState — Single authoritative runtime result representing
 * the current camera frame, pose identity, form accuracy, and completion eligibility.
 *
 * Phase 4 Core Principle:
 * Completion requires:
 *   IDENTITY VALID
 *   AND FORM VALID
 *   AND ACCURACY >= 75%
 *   AND TRACKING VALID
 *   AND CONTINUOUS HOLD >= 5000ms
 *
 * Accuracy score alone is NEVER sufficient for completion or starting a hold.
 */

import type { AsanaStartingStance } from "../types/coaching-profile";
import type { PoseLandmarks } from "../types/landmarks";
import type {
  PoseEvaluation,
  PoseEvaluationResult,
  PoseIdentityResult,
  PoseIssue,
} from "../types/pose-rules";
import {
  evaluateCompletionGate,
  type AsanaCompletionGateResult,
} from "./AsanaCompletionGate";
import { resolveCanonicalAsanaId } from "./AsanaCanonicalIdResolver";
import { normalizeAsanaId } from "../data/AsanaRegistry";
import { validatePoseIdentity } from "./PoseIdentityValidator";
import { detectStance } from "./StanceDetector";
import { getLandmarkConfidence } from "./LandmarkUtils";

export interface PoseFrameState {
  asanaId: string;
  canonicalAsanaId: string;
  timestamp: number;

  // Tracking state
  tracking: {
    valid: boolean;
    confidence: number;
    cameraReady: boolean;
    landmarksCount: number;
    isStale: boolean;
  };
  trackingValid: boolean;

  // Physical Stance
  requiredStance: AsanaStartingStance;
  detectedStance: AsanaStartingStance | "unknown";
  stanceValid: boolean;

  // Identity Validation
  identity: PoseIdentityResult;
  identityValid: boolean;

  // Accuracy & Form Evaluation
  accuracy: {
    raw: number;
    stable: number;
    displayed: number;
  };
  accuracyValid: boolean; // displayed / stable score >= threshold (default 75%)
  formValid: boolean;     // critical rules pass, no safety blockers
  primaryIssue: PoseIssue | null;

  // Single Authoritative Completion Eligibility
  isCompletionEligible: boolean;
  failureReason?: string;

  // Underlying gate result
  gateResult: AsanaCompletionGateResult;
}

export interface EvaluatePoseFrameOptions {
  asanaId: string;
  evaluation: PoseEvaluation | PoseEvaluationResult | null | undefined;
  landmarks?: PoseLandmarks | null | undefined;
  cameraReady?: boolean;
  completionAccuracyThreshold?: number;
  timestamp?: number;
  isStale?: boolean;
}

/**
 * Creates the single authoritative PoseFrameState for the current frame.
 * Consolidates tracking, stance, identity, form evaluation, and completion eligibility.
 */
export function evaluatePoseFrameState(options: EvaluatePoseFrameOptions): PoseFrameState {
  const {
    asanaId,
    evaluation,
    landmarks,
    cameraReady = true,
    completionAccuracyThreshold = 75,
    timestamp = Date.now(),
    isStale = false,
  } = options;

  const normalizedId = normalizeAsanaId(asanaId || "");
  const canonicalId = resolveCanonicalAsanaId(normalizedId);

  const landmarksCount = landmarks ? landmarks.length : 0;
  let avgConfidence = 0;
  if (landmarks && landmarks.length > 0) {
    let confSum = 0;
    for (const lm of landmarks) {
      confSum += getLandmarkConfidence(lm);
    }
    avgConfidence = confSum / landmarks.length;
  }

  // Tracking is valid only when landmarks exist (>= 33), confidence is usable, camera is ready, and data is NOT stale
  const trackingValid = Boolean(
    landmarks &&
    landmarks.length >= 33 &&
    cameraReady &&
    !isStale &&
    avgConfidence >= 0.40
  );

  // Raw, stable, and displayed scores
  const rawScore = evaluation ? ("rawScore" in evaluation && evaluation.rawScore !== undefined ? evaluation.rawScore : evaluation.score) : 0;
  const stableScore = evaluation ? ("stableScore" in evaluation && evaluation.stableScore !== undefined ? evaluation.stableScore : evaluation.score) : 0;
  const displayedScore = evaluation ? ("displayedScore" in evaluation && evaluation.displayedScore !== undefined ? evaluation.displayedScore : Math.round(evaluation.score)) : 0;

  // Form validity: evaluation exists, is valid, no safety issue, and passes completion gate
  const gateResult = evaluateCompletionGate({
    asanaId: normalizedId,
    evaluation,
    landmarks: trackingValid ? landmarks : null,
    cameraReady: cameraReady && !isStale,
    completionAccuracyThreshold,
  });

  // Stance
  const requiredStance = gateResult.requiredStance;
  const detectedStance = gateResult.detectedStance ?? (landmarks ? detectStance(landmarks).detectedStance : "unknown");
  const stanceValid = gateResult.stanceValid;

  // Identity
  const identity: PoseIdentityResult = gateResult.identityResult ?? (
    evaluation && "identity" in evaluation && evaluation.identity
      ? evaluation.identity
      : (trackingValid && landmarks
          ? validatePoseIdentity(normalizedId, { landmarks, timestamp })
          : {
              isMatch: false,
              confidence: 0,
              canonicalAsanaId: canonicalId,
              requiredStance,
              detectedStance,
              passedRequirements: [],
              failedRequirements: ["tracking_invalid"],
              criticalFailures: ["tracking_invalid"],
              reason: "Tracking invalid or insufficient landmarks",
            })
  );

  const identityValid = Boolean(identity.isMatch && identity.confidence >= 0.40);
  const accuracyValid = Boolean(displayedScore >= completionAccuracyThreshold || stableScore >= completionAccuracyThreshold);
  const formValid = Boolean(gateResult.criticalRulesValid && !gateResult.failedCriticalRuleIds.length && (!evaluation || !evaluation.primaryIssue || evaluation.primaryIssue.severity !== "high"));

  // Critical Gate: Completion eligibility requires ALL conditions to be true simultaneously
  const isCompletionEligible = Boolean(
    trackingValid &&
    identityValid &&
    stanceValid &&
    formValid &&
    accuracyValid &&
    gateResult.isEligible
  );

  let failureReason: string | undefined;
  if (!trackingValid) {
    failureReason = isStale ? "Tracking frame is stale" : "Camera tracking not ready or low confidence";
  } else if (!identityValid) {
    failureReason = identity.reason || `Pose identity mismatch for ${normalizedId}`;
  } else if (!stanceValid) {
    failureReason = `Body stance does not match required ${requiredStance} (detected: ${detectedStance})`;
  } else if (!accuracyValid) {
    failureReason = `Accuracy ${displayedScore}% below required ${completionAccuracyThreshold}%`;
  } else if (!formValid) {
    failureReason = gateResult.reason || "Form rules not satisfied";
  } else if (!gateResult.isEligible) {
    failureReason = gateResult.reason || "Completion gate not satisfied";
  }

  return {
    asanaId: normalizedId,
    canonicalAsanaId: canonicalId,
    timestamp,
    tracking: {
      valid: trackingValid,
      confidence: avgConfidence,
      cameraReady,
      landmarksCount,
      isStale,
    },
    trackingValid,
    requiredStance,
    detectedStance,
    stanceValid,
    identity,
    identityValid,
    accuracy: {
      raw: rawScore,
      stable: stableScore,
      displayed: displayedScore,
    },
    accuracyValid,
    formValid,
    primaryIssue: evaluation?.primaryIssue ?? null,
    isCompletionEligible,
    failureReason,
    gateResult,
  };
}
