/**
 * StanceDetector — Physical body stance detection and validation from MediaPipe landmarks.
 *
 * Distinguishes physical body configurations:
 * - standing: upright body, vertical spine and legs extending downwards
 * - seated: upright/inclined spine, hips low/grounded, knees/feet near hip height
 * - prone: lying belly-down horizontally on the mat (Cobra, Locust, Sphinx, Bow)
 * - supine: lying back-down horizontally on the mat (Bridge, Corpse, Fish)
 * - kneeling: shins/knees on floor, torso elevated
 * - all_fours: quadruped tabletop, horizontal torso, hands and knees grounded
 * - plank: prone straight-line suspended on hands/feet
 * - bending: standing forward/lateral fold, upper body inverted or hinged at hips
 * - inverted: hips at apex above shoulders/head (Downward Dog, Headstand)
 * - arm_balance: weight on arms, feet suspended
 */

import type { PoseLandmarks } from "../types/landmarks";
import { PoseLandmarkIndex as P } from "../types/pose-landmarks";
import type { AsanaStartingStance } from "../types/coaching-profile";
import { isLandmarkUsable } from "./LandmarkUtils";

export interface StanceDetectionResult {
  detectedStance: AsanaStartingStance | "unknown";
  confidence: number;
  features: {
    isVerticalTorso: boolean;
    isHorizontalTorso: boolean;
    isLegsExtendedDown: boolean;
    isHipsApex: boolean;
    torsoHeight: number;
    legVerticalSpan: number;
    bodyOrientationAngleDeg: number;
  };
}

export interface StanceMatchResult {
  matches: boolean;
  detectedStance: AsanaStartingStance | "unknown";
  confidence: number;
  reason?: string;
}

/**
 * Computes the angle in degrees of a 2D vector relative to the horizontal axis (0 = horizontal, 90 = vertical).
 */
function getVectorAngleFromHorizontal(dx: number, dy: number): number {
  const rad = Math.atan2(Math.abs(dy), Math.abs(dx));
  return (rad * 180) / Math.PI;
}

/**
 * Detects the physical starting stance from MediaPipe 33 landmarks.
 */
export function detectStance(landmarks: PoseLandmarks | null | undefined): StanceDetectionResult {
  const fallbackFeatures = {
    isVerticalTorso: false,
    isHorizontalTorso: false,
    isLegsExtendedDown: false,
    isHipsApex: false,
    torsoHeight: 0,
    legVerticalSpan: 0,
    bodyOrientationAngleDeg: 0,
  };

  if (!landmarks || landmarks.length < 33) {
    return {
      detectedStance: "unknown",
      confidence: 0,
      features: fallbackFeatures,
    };
  }

  // Key landmark groups
  const leftShoulder = landmarks[P.LEFT_SHOULDER];
  const rightShoulder = landmarks[P.RIGHT_SHOULDER];
  const leftHip = landmarks[P.LEFT_HIP];
  const rightHip = landmarks[P.RIGHT_HIP];
  const leftAnkle = landmarks[P.LEFT_ANKLE];
  const rightAnkle = landmarks[P.RIGHT_ANKLE];

  // Must have usable shoulders and hips to evaluate stance
  const hasShoulders = (leftShoulder && isLandmarkUsable(leftShoulder)) || (rightShoulder && isLandmarkUsable(rightShoulder));
  const hasHips = (leftHip && isLandmarkUsable(leftHip)) || (rightHip && isLandmarkUsable(rightHip));

  if (!hasShoulders || !hasHips) {
    return {
      detectedStance: "unknown",
      confidence: 0,
      features: fallbackFeatures,
    };
  }

  // Midpoints
  const midShoulder = {
    x: ((leftShoulder?.x ?? rightShoulder!.x) + (rightShoulder?.x ?? leftShoulder!.x)) / 2,
    y: ((leftShoulder?.y ?? rightShoulder!.y) + (rightShoulder?.y ?? leftShoulder!.y)) / 2,
    z: ((leftShoulder?.z ?? 0) + (rightShoulder?.z ?? 0)) / 2,
  };

  const midHip = {
    x: ((leftHip?.x ?? rightHip!.x) + (rightHip?.x ?? leftHip!.x)) / 2,
    y: ((leftHip?.y ?? rightHip!.y) + (rightHip?.y ?? leftHip!.y)) / 2,
    z: ((leftHip?.z ?? 0) + (rightHip?.z ?? 0)) / 2,
  };

  const midAnkleY = leftAnkle && rightAnkle ? (leftAnkle.y + rightAnkle.y) / 2 : leftAnkle?.y ?? rightAnkle?.y ?? midHip.y;

  // Torso vector from shoulder to hip
  const torsoDx = midHip.x - midShoulder.x;
  const torsoDy = midHip.y - midShoulder.y; // Positive if hip is below shoulder in image coordinates
  const torsoHeight = Math.abs(torsoDy);
  const torsoAngleDeg = getVectorAngleFromHorizontal(torsoDx, torsoDy);

  const isVerticalTorso = torsoAngleDeg > 55 && torsoDy > 0.12;
  const isHorizontalTorso = torsoAngleDeg <= 35 || torsoHeight < 0.12;
  const legVerticalSpan = midAnkleY - midHip.y;
  const isLegsExtendedDown = legVerticalSpan > 0.28;
  const isHipsApex = midHip.y < midShoulder.y - 0.04;

  const features = {
    isVerticalTorso,
    isHorizontalTorso,
    isLegsExtendedDown,
    isHipsApex,
    torsoHeight,
    legVerticalSpan,
    bodyOrientationAngleDeg: torsoAngleDeg,
  };

  // 1. Inverted Stance (e.g. Downward Dog, Headstand): hips are apex significantly above shoulders AND ankles
  const isInvertedApex = midHip.y < midShoulder.y - 0.10 && midHip.y < midAnkleY - 0.20;
  if (isInvertedApex) {
    return {
      detectedStance: "inverted",
      confidence: 0.9,
      features,
    };
  }

  // 2. Standing Stance: vertical torso and legs extending straight down below hips
  if (isVerticalTorso && isLegsExtendedDown && midHip.y < 0.75) {
    return {
      detectedStance: "standing",
      confidence: 0.92,
      features,
    };
  }

  // 3. Bending Stance: standing forward fold where torso hangs downward towards ankles
  if (isLegsExtendedDown && midShoulder.y > midHip.y - 0.05) {
    return {
      detectedStance: "bending",
      confidence: 0.85,
      features,
    };
  }

  // 4. Seated Stance: upright torso, but hips are low on mat and ankles/feet are near hip height
  if (isVerticalTorso && !isLegsExtendedDown && midHip.y > 0.45) {
    return {
      detectedStance: "seated",
      confidence: 0.88,
      features,
    };
  }

  // 5. Horizontal Stances: Prone, Supine, Plank, All-Fours
  if (isHorizontalTorso || (torsoAngleDeg <= 45 && midHip.y > 0.40)) {
    // Check orientation: in prone, chest is facing down or lifted from mat
    // In supine (e.g. bridge), back is facing down and hips are lifted up or flat
    return {
      detectedStance: "prone", // Candidate for prone/mat postures
      confidence: 0.80,
      features,
    };
  }

  // Fallback stance based on verticality
  if (isVerticalTorso) {
    return {
      detectedStance: isLegsExtendedDown ? "standing" : "seated",
      confidence: 0.70,
      features,
    };
  }

  return {
    detectedStance: "unknown",
    confidence: 0.5,
    features,
  };
}

/**
 * Validates whether the current physical body landmarks match the required asana stance.
 */
export function isStanceMatching(
  requiredStance: AsanaStartingStance,
  landmarks: PoseLandmarks | null | undefined,
): StanceMatchResult {
  if (!landmarks || landmarks.length < 33) {
    return {
      matches: false,
      detectedStance: "unknown",
      confidence: 0,
      reason: "Insufficient landmarks to evaluate body stance",
    };
  }

  const detection = detectStance(landmarks);
  const { detectedStance, confidence, features } = detection;

  // Stance category matching rules:
  switch (requiredStance) {
    case "prone": {
      // Cobra, Locust, Sphinx, Bow: MUST be lying on the mat, NOT standing or sitting upright!
      if (features.isLegsExtendedDown && features.isVerticalTorso) {
        return {
          matches: false,
          detectedStance: "standing",
          confidence,
          reason: "User is standing upright; Cobra requires prone belly-down stance on the mat",
        };
      }
      if (features.isVerticalTorso && features.torsoHeight > 0.22 && features.bodyOrientationAngleDeg > 65) {
        return {
          matches: false,
          detectedStance: "seated",
          confidence,
          reason: "User is sitting upright; Cobra requires prone belly-down stance on the mat",
        };
      }
      if (features.isHipsApex) {
        return {
          matches: false,
          detectedStance: "inverted",
          confidence,
          reason: "User is inverted; Cobra requires prone belly-down stance on the mat",
        };
      }
      // Prone is valid if body is horizontal on mat
      const isProneOrientation = features.bodyOrientationAngleDeg <= 55 || features.isHorizontalTorso || !features.isVerticalTorso;
      return {
        matches: isProneOrientation,
        detectedStance: isProneOrientation ? "prone" : detectedStance,
        confidence,
        reason: isProneOrientation ? undefined : "Body is not in a prone belly-down orientation",
      };
    }

    case "supine": {
      // Bridge, Corpse, Fish: MUST be lying on back on the mat, NOT standing or sitting upright!
      if (features.isLegsExtendedDown && features.isVerticalTorso) {
        return {
          matches: false,
          detectedStance: "standing",
          confidence,
          reason: "User is standing upright; Bridge requires supine back-lying stance on the mat",
        };
      }
      if (features.isVerticalTorso && features.torsoHeight > 0.22) {
        return {
          matches: false,
          detectedStance: "seated",
          confidence,
          reason: "User is sitting upright; Bridge requires supine back-lying stance on the mat",
        };
      }
      return {
        matches: true,
        detectedStance: "supine",
        confidence,
      };
    }

    case "standing": {
      // Warrior II, Mountain, Tree, Triangle: MUST be standing upright
      if (features.isHorizontalTorso || (!features.isVerticalTorso && !features.isLegsExtendedDown)) {
        return {
          matches: false,
          detectedStance: detectedStance === "unknown" ? "prone" : detectedStance,
          confidence,
          reason: "User is not standing upright; standing stance required",
        };
      }
      return {
        matches: features.isVerticalTorso || features.isLegsExtendedDown,
        detectedStance: "standing",
        confidence,
      };
    }

    case "seated": {
      // Lotus, Staff, Seated Twist: MUST be seated, NOT standing with legs straight down!
      if (features.isLegsExtendedDown && features.isVerticalTorso && features.torsoHeight > 0.25) {
        return {
          matches: false,
          detectedStance: "standing",
          confidence,
          reason: "User is standing with legs extended; seated stance required",
        };
      }
      return {
        matches: true,
        detectedStance: "seated",
        confidence,
      };
    }

    case "inverted": {
      // Downward Dog: hips must be elevated
      if (features.isVerticalTorso && features.isLegsExtendedDown) {
        return {
          matches: false,
          detectedStance: "standing",
          confidence,
          reason: "User is standing upright; inverted foundation required",
        };
      }
      return {
        matches: features.isHipsApex || !features.isVerticalTorso,
        detectedStance: "inverted",
        confidence,
      };
    }

    case "all_fours":
    case "kneeling":
    case "plank":
    case "arm_balance":
    case "bending":
    default: {
      // For specialized stances, ensure obvious contradictory stances (e.g. standing when plank required) fail
      if (requiredStance === "plank" && features.isVerticalTorso && features.isLegsExtendedDown) {
        return {
          matches: false,
          detectedStance: "standing",
          confidence,
          reason: "User is standing upright; plank stance required",
        };
      }
      return {
        matches: true,
        detectedStance,
        confidence,
      };
    }
  }
}
