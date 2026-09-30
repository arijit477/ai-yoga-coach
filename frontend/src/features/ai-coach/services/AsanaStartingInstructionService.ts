/**
 * AsanaStartingInstructionService — Dynamic Asana Entry & Startup Guidance.
 *
 * Provides stance-aware, asana-specific startup instructions replacing universal "Stand tall" defaults.
 *
 * 3-Tier Fallback Hierarchy:
 * 1. Asana-specific entryInstruction / entryPrompt from coaching profile
 * 2. Stance/Category-specific instruction (standing, seated, kneeling, prone, supine, plank, bending, inverted)
 * 3. Generic safe fallback (neutral posture phrasing)
 */

import type { AsanaCoachingProfile, StartingPosition } from "../types/coaching-profile";
import { getAsanaCoachingProfile } from "./AsanaCoachingProfileService";

/**
 * Fallback instructions by physical starting position.
 */
const STANCE_FALLBACK_INSTRUCTIONS: Record<StartingPosition, (asanaName: string) => string> = {
  standing: (name) => `Stand with your feet grounded and prepare for ${name}.`,
  seated: (name) => `Sit comfortably with an upright spine and prepare for ${name}.`,
  kneeling: (name) => `Come onto your knees and gently prepare for ${name}.`,
  lying: (name) => `Lie down comfortably on your mat and prepare for ${name}.`,
  prone: (name) => `Lie on your stomach and place your hands beside your chest for ${name}.`,
  supine: (name) => `Lie on your back with knees bent and feet flat for ${name}.`,
  bending: (name) => `Stand tall, hinge from your hips, and prepare for ${name}.`,
  backbend: (name) => `Settle into your foundation and prepare to open your chest in ${name}.`,
  plank: (name) => `Come into a strong plank position with your hands beneath your shoulders for ${name}.`,
  all_fours: (name) => `Come onto all fours with wrists under shoulders and prepare for ${name}.`,
  inverted: (name) => `Set your foundation firmly and prepare for ${name}.`,
  arm_balance: (name) => `Plant your hands shoulder-width apart, shift forward, and prepare for ${name}.`,
  mixed: (name) => `Settle into your starting foundation and prepare for ${name}.`,
};

/**
 * Fallback calibration instructions by physical starting position.
 */
const STANCE_CALIBRATION_PROMPTS: Record<StartingPosition, (asanaName: string) => string> = {
  standing: (name) => `Stand still and tall while I scan your ${name} foundation.`,
  seated: (name) => `Sit still and tall while I observe your ${name} alignment.`,
  kneeling: (name) => `Hold your kneeling shape steady while I check your ${name} posture.`,
  lying: (name) => `Rest still on your mat while I verify your ${name} alignment.`,
  prone: (name) => `Hold your gentle lift steady while I check your ${name} form.`,
  supine: (name) => `Hold your position steady while I observe your ${name} foundation.`,
  bending: (name) => `Hold your fold steady while I scan your ${name} form.`,
  backbend: (name) => `Hold your lift steady while I verify your ${name} alignment.`,
  plank: (name) => `Hold your strong plank shape while I scan your ${name} form.`,
  all_fours: (name) => `Hold your tabletop position steady while I calibrate for ${name}.`,
  inverted: (name) => `Hold your inverted shape steady while I verify your ${name} alignment.`,
  arm_balance: (name) => `Hold your arm balance shape steady while I verify your ${name} alignment.`,
  mixed: (name) => `Hold still for a moment while I calibrate your ${name} alignment.`,
};

/**
 * Returns the authoritative startup instruction for any selected asana.
 *
 * @param asanaIdOrProfile The asana ID or loaded AsanaCoachingProfile
 * @returns Non-generic, stance-aware physical entry instruction
 */
export function getAsanaStartingInstruction(
  asanaIdOrProfile: string | AsanaCoachingProfile
): string {
  const profile: AsanaCoachingProfile =
    typeof asanaIdOrProfile === "string"
      ? getAsanaCoachingProfile(asanaIdOrProfile)
      : asanaIdOrProfile;

  const asanaName = profile.asanaName || "your pose";
  const stance = profile.startingPosition || "standing";

  // Tier 1: Asana-specific entryInstruction
  if (profile.entryInstruction && profile.entryInstruction.trim().length > 0) {
    return profile.entryInstruction.trim();
  }

  // Tier 1.5: Voice guidance entryPrompt
  if (profile.voiceGuidance?.entryPrompt && profile.voiceGuidance.entryPrompt.trim().length > 0) {
    return profile.voiceGuidance.entryPrompt.trim();
  }

  // Tier 2: Stance/Category-specific fallback
  const stanceBuilder = STANCE_FALLBACK_INSTRUCTIONS[stance];
  if (stanceBuilder) {
    return stanceBuilder(asanaName);
  }

  // Tier 3: Generic safe fallback (neutral phrasing, never universally "stand tall")
  return `Settle into a comfortable, steady foundation and prepare for ${asanaName}.`;
}

/**
 * Returns the authoritative stance-aware calibration prompt for any selected asana.
 *
 * @param asanaIdOrProfile The asana ID or loaded AsanaCoachingProfile
 * @returns Non-generic calibration prompt
 */
export function getAsanaCalibrationInstruction(
  asanaIdOrProfile: string | AsanaCoachingProfile
): string {
  const profile: AsanaCoachingProfile =
    typeof asanaIdOrProfile === "string"
      ? getAsanaCoachingProfile(asanaIdOrProfile)
      : asanaIdOrProfile;

  const asanaName = profile.asanaName || "your pose";
  const stance = profile.startingPosition || "standing";

  // Tier 1: Voice guidance calibrationPrompt
  if (profile.voiceGuidance?.calibrationPrompt && profile.voiceGuidance.calibrationPrompt.trim().length > 0) {
    return profile.voiceGuidance.calibrationPrompt.trim();
  }

  // Tier 2: Stance-specific fallback
  const stanceBuilder = STANCE_CALIBRATION_PROMPTS[stance];
  if (stanceBuilder) {
    return stanceBuilder(asanaName);
  }

  // Tier 3: Generic safe fallback
  return `Hold your ${asanaName} position steady while I observe your alignment.`;
}
