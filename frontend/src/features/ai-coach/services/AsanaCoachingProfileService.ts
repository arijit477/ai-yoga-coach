import type { AsanaCoachingProfile } from "../types/coaching-profile";
import {
  CORE_COACHING_PROFILES,
  inferStartingPosition,
  inferMovementType,
  getStanceAwareEntryPrompt,
} from "../data/coachingProfilesCatalog";
import { getAsana, normalizeAsanaId } from "../data/AsanaRegistry";
import { getPoseRules } from "../analysis/RuleEngine";

// In-memory cache for dynamic & custom profiles
const DYNAMIC_PROFILES_MAP = new Map<string, AsanaCoachingProfile>();

/**
 * Validates whether a coaching profile contains all required fields.
 */
export function validateCoachingProfile(profile: Partial<AsanaCoachingProfile>): {
  isValid: boolean;
  missingFields: string[];
  isComplete: boolean;
} {
  const missingFields: string[] = [];

  if (!profile.asanaId) missingFields.push("asanaId");
  if (!profile.asanaName) missingFields.push("asanaName");
  if (!profile.category) missingFields.push("category");
  if (!profile.startingPosition && !profile.stance) missingFields.push("startingPosition");
  if (!profile.entryCue && !profile.entryInstruction && !profile.voiceGuidance?.entryPrompt) missingFields.push("entryCue");
  if (!profile.focusAreas || profile.focusAreas.length === 0) missingFields.push("focusAreas");
  if (!profile.requiredRegions || profile.requiredRegions.length === 0) missingFields.push("requiredRegions");
  if (!profile.goodFormAffirmation) missingFields.push("goodFormAffirmation");
  if (!profile.holdMindfulnessCue && !profile.voiceGuidance?.holdPrompt) missingFields.push("holdMindfulnessCue");
  if (!profile.completionCue && !profile.voiceGuidance?.completionPrompt) missingFields.push("completionCue");

  const isValid = missingFields.length === 0;
  const isComplete = Boolean(profile.isComplete && isValid);

  return { isValid, missingFields, isComplete };
}

/**
 * Returns default required body regions based on physical starting stance.
 */
function getStanceRequiredRegions(stance: string): ("torso" | "arms" | "legs" | "feet" | "head")[] {
  switch (stance) {
    case "standing":
    case "bending":
      return ["torso", "legs", "feet"];
    case "seated":
    case "kneeling":
      return ["torso", "legs", "head"];
    case "prone":
      return ["torso", "arms", "head"];
    case "supine":
      return ["torso", "legs", "arms"];
    case "all_fours":
    case "plank":
    case "arm_balance":
    case "inverted":
    default:
      return ["torso", "arms", "legs"];
  }
}

/**
 * Returns stance-specific positive good-form affirmation.
 */
function getStanceGoodFormAffirmation(asanaName: string, stance: string): string {
  switch (stance) {
    case "standing":
      return `Strong ${asanaName}. Keep your foundation steady and breathe.`;
    case "seated":
      return `Beautiful seated posture in ${asanaName}. Keep your spine long and shoulders relaxed.`;
    case "kneeling":
      return `Steady kneeling foundation in ${asanaName}. Relax your shoulders and breathe.`;
    case "prone":
      return `Beautiful chest lift in ${asanaName}. Keep your pelvis grounded and shoulders relaxed.`;
    case "supine":
      return `Strong grounded foundation in ${asanaName}. Keep your neck relaxed and breathe.`;
    case "all_fours":
      return `Stable tabletop alignment in ${asanaName}. Keep your spine neutral.`;
    case "plank":
      return `Solid core and arm stability in ${asanaName}. Maintain a strong, straight line.`;
    case "bending":
      return `Spine is long and spacious in ${asanaName}. Let your upper body release.`;
    case "inverted":
      return `Spacious inverted alignment in ${asanaName}. Keep pressing through your hands.`;
    case "arm_balance":
      return `Dynamic arm balance in ${asanaName}! Keep your core engaged and gaze steady.`;
    default:
      return `Strong form in ${asanaName}. Keep breathing smoothly and hold steady.`;
  }
}

/**
 * Returns stance-specific mindfulness hold cue.
 */
function getStanceHoldCue(stance: string): string {
  switch (stance) {
    case "standing":
      return "Root down through your feet, lengthen your spine, and breathe steadily.";
    case "seated":
      return "Maintain your upright spine and breathe calmly into your belly.";
    case "kneeling":
      return "Keep your core lightly engaged and maintain steady, smooth breaths.";
    case "prone":
      return "Engage your back muscles gently and breathe deeply into your chest.";
    case "supine":
      return "Feel your back supported by the floor and maintain slow, rhythmic breaths.";
    case "all_fours":
      return "Distribute weight evenly through palms and knees while breathing smoothly.";
    case "plank":
      return "Press through your hands, draw your navel in, and sustain your hold.";
    case "bending":
      return "Allow gravity to gently lengthen your spine with each exhale.";
    case "inverted":
      return "Lengthen your spine and feel the spacious decompressing flow of breath.";
    case "arm_balance":
      return "Find your balance point, engage your fingers, and breathe steadily.";
    default:
      return "Keep breathing steadily and maintain your steady posture.";
  }
}

/**
 * Returns stance-specific completion exit cue.
 */
function getStanceCompletionCue(asanaName: string, stance: string): string {
  switch (stance) {
    case "standing":
    case "bending":
      return `Step your feet together and return to standing with a long spine.`;
    case "seated":
      return `Gently release ${asanaName}, uncross your legs, and relax your seat.`;
    case "kneeling":
      return `Gently lower your hips and release your kneeling posture.`;
    case "prone":
      return `Lower gently to the mat and relax your shoulders and spine.`;
    case "supine":
      return `Lower your hips slowly back to the mat and release your legs.`;
    case "all_fours":
      return `Return to a neutral tabletop and ease your hips back.`;
    case "plank":
      return `Lower your knees gently to the mat and rest in a comfortable posture.`;
    case "inverted":
      return `Lower your knees softly to the mat and rest in child's pose.`;
    case "arm_balance":
      return `Lower your feet gently back to the mat and release your wrists.`;
    default:
      return `Gently release ${asanaName} and return to a comfortable resting position.`;
  }
}

/**
 * Builds a valid stance-aware fallback coaching profile from registered asana metadata.
 */
function buildFallbackCoachingProfile(asanaId: string): AsanaCoachingProfile {
  const normalizedId = normalizeAsanaId(asanaId);
  const asanaDef = getAsana(normalizedId);
  const rules = getPoseRules(normalizedId);

  const asanaName = asanaDef?.displayName || asanaDef?.name || asanaId.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const category = asanaDef?.category || "standing";
  const difficulty = asanaDef?.difficulty || "beginner";
  const sanskritName = asanaDef?.sanskritName || undefined;

  const stance = inferStartingPosition(normalizedId, category, sanskritName);
  const startingPosition = stance;
  const movementType = inferMovementType(category, stance, normalizedId);
  const stanceEntryPrompt = getStanceAwareEntryPrompt(asanaName, stance);

  const instructions = asanaDef?.instructions && asanaDef.instructions.length > 0
    ? asanaDef.instructions
    : [
        stanceEntryPrompt,
        `Focus on lengthening your spine and breathing calmly.`,
        `Hold the posture with relaxed, steady awareness.`,
      ];

  const focusAreas = asanaDef?.cues && asanaDef.cues.length > 0
    ? asanaDef.cues.map((c) => c.jointOrBodyPart)
    : ["spinal alignment", "core engagement", "breath awareness"];

  const corrections = (asanaDef?.cues || []).map((cue) => ({
    ruleId: cue.id,
    joint: cue.jointOrBodyPart,
    commonMistake: cue.tip || "Maintain stable alignment.",
    correctionText: cue.cue,
    progressionText: cue.tip,
    resolvedText: `${cue.jointOrBodyPart} alignment verified.`,
  }));

  const requiredRegions = getStanceRequiredRegions(stance);
  const goodFormAffirmation = getStanceGoodFormAffirmation(asanaName, stance);
  const holdMindfulnessCue = getStanceHoldCue(stance);
  const completionCue = getStanceCompletionCue(asanaName, stance);
  
  const rawInstruction = asanaDef?.instructions?.[0];
  const isGenericCatalogTemplate = rawInstruction && rawInstruction.toLowerCase().startsWith("begin by preparing your foundation");
  const entryCue = (rawInstruction && !isGenericCatalogTemplate) ? rawInstruction : stanceEntryPrompt;

  return {
    asanaId: normalizedId,
    asanaName,
    sanskritName,
    category,
    difficulty,
    stance,
    startingPosition,
    movementType,
    entryCue,
    entryInstruction: entryCue,
    executionInstructions: instructions,
    focusAreas,
    keyAlignmentPoints: focusAreas,
    relevantJoints: focusAreas,
    requiredRegions,
    poseRules: rules,
    alignmentCues: corrections,
    corrections,
    goodFormAffirmation,
    holdMindfulnessCue,
    completionCue,
    successFeedback: [
      goodFormAffirmation,
      `Excellent alignment and grounded presence in ${asanaName}.`,
    ],
    voiceGuidance: {
      entryPrompt: stanceEntryPrompt,
      calibrationPrompt: `Hold your ${asanaName} shape steady while I observe your alignment.`,
      holdPrompt: holdMindfulnessCue,
      completionPrompt: completionCue,
      mindfulnessPrompt: `Connect with your breath and maintain a calm focus.`,
    },
    isComplete: false,
    placeholderNotes: "Generated from stance-aware baseline taxonomy.",
  };
}

/**
 * Retrieves the authoritative AsanaCoachingProfile for any asana.
 * Always returns a complete, strongly-typed profile (hand-authored or stance-aware fallback).
 */
export function getAsanaCoachingProfile(asanaId: string): AsanaCoachingProfile {
  if (!asanaId) {
    return buildFallbackCoachingProfile("tadasana");
  }

  const normalizedId = normalizeAsanaId(asanaId);

  // 1. Check custom dynamically registered profiles
  if (DYNAMIC_PROFILES_MAP.has(normalizedId)) {
    return DYNAMIC_PROFILES_MAP.get(normalizedId)!;
  }

  // 2. Check Core Hand-Authored Profiles Catalog
  if (CORE_COACHING_PROFILES[normalizedId]) {
    return CORE_COACHING_PROFILES[normalizedId];
  }

  // 3. Fallback to stance-aware dynamic profile builder
  const fallback = buildFallbackCoachingProfile(normalizedId);
  DYNAMIC_PROFILES_MAP.set(normalizedId, fallback);
  return fallback;
}

/**
 * Checks whether an explicit coaching profile exists.
 */
export function hasAsanaCoachingProfile(asanaId: string): boolean {
  if (!asanaId) return false;
  const normalizedId = normalizeAsanaId(asanaId);
  return Boolean(CORE_COACHING_PROFILES[normalizedId] || DYNAMIC_PROFILES_MAP.has(normalizedId));
}

/**
 * Registers a custom or runtime-loaded AsanaCoachingProfile.
 */
export function registerCustomCoachingProfile(profile: AsanaCoachingProfile): void {
  if (!profile.asanaId) return;
  const key = normalizeAsanaId(profile.asanaId);
  DYNAMIC_PROFILES_MAP.set(key, profile);
}

/**
 * Returns all currently loaded coaching profiles.
 */
export function getAllAsanaCoachingProfiles(): AsanaCoachingProfile[] {
  const merged = new Map<string, AsanaCoachingProfile>();

  for (const [k, v] of Object.entries(CORE_COACHING_PROFILES)) {
    merged.set(k, v);
  }
  for (const [k, v] of DYNAMIC_PROFILES_MAP.entries()) {
    merged.set(k, v);
  }

  return Array.from(merged.values());
}
