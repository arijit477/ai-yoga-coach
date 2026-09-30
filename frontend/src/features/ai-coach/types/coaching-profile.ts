import type { AsanaCategory, AsanaDifficulty } from "./asana";
import type { PoseRule } from "./pose-rules";

/**
 * Physical starting body stance taxonomy for asana coaching.
 */
export type AsanaStartingStance =
  | "standing"        // E.g. Tadasana, Warrior II, Tree Pose, Triangle
  | "seated"          // E.g. Lotus, Seated Forward Fold, Staff Pose
  | "kneeling"        // E.g. Camel Pose, Thunderbolt Pose, Hero Pose
  | "all_fours"       // Quadruped tabletop (E.g. Cat-Cow, Tabletop, Bird-Dog)
  | "prone"           // Lying on belly / stomach (E.g. Cobra, Locust, Sphinx, Bow)
  | "supine"          // Lying on back (E.g. Bridge, Corpse, Fish, Reclined Butterfly)
  | "plank"           // Prone arm/core support (E.g. High Plank, Four-Limbed Staff)
  | "bending"         // Standing forward/side bending (E.g. Uttanasana)
  | "inverted"        // Inverted posture (E.g. Downward Dog, Shoulder Stand, Headstand)
  | "arm_balance";    // Arm balances (E.g. Crow, Peacock, Eight-Angle)

/**
 * Backwards compatibility alias for StartingPosition.
 */
export type StartingPosition = AsanaStartingStance | "lying" | "backbend" | "mixed";

/**
 * Biomechanical movement taxonomy for yoga coaching.
 */
export type MovementType =
  | "static_hold"
  | "lateral_bend"
  | "forward_fold"
  | "backbend_extension"
  | "spinal_twist"
  | "balance_stabilization"
  | "core_engagement"
  | "inversion_inversion"
  | "restorative_rest";

/**
 * Actionable correction cue mapped to a specific joint rule violation.
 */
export interface AsanaProfileCorrection {
  ruleId: string;
  joint: string;
  commonMistake: string;
  correctionText: string;       // Direct concise physical instruction (5-14 words)
  progressionText?: string;     // Cue if issue persists (e.g., "Keep that front knee stacked")
  resolvedText?: string;        // Confirmation upon fix (e.g., "Knee alignment looks solid")
}

export type AsanaAlignmentRuleCue = AsanaProfileCorrection;

/**
 * Natural coach phrasing for session events.
 */
export interface AsanaVoiceGuidance {
  entryPrompt: string;          // Direct setup/entry cue (E.g. "Step feet wide, bend front knee...")
  calibrationPrompt: string;    // Cue during stillness check (E.g. "Hold this foundation while I align...")
  holdPrompt: string;           // Cue during active hold (E.g. "Strong stance. Breathe deeply and hold.")
  completionPrompt: string;     // Cue upon successful completion (E.g. "Beautiful hold. Slowly release.")
  mindfulnessPrompt?: string;   // Breath/gaze reminder during long holds
}

/**
 * Authoritative Asana Coaching Profile (Phase 9 Specification).
 * Encapsulates physical setup, stance, biomechanical focal points, deterministic rules, and natural guidance.
 */
export interface AsanaCoachingProfile {
  asanaId: string;
  asanaName: string;
  sanskritName?: string;
  category: AsanaCategory;
  difficulty: AsanaDifficulty;

  stance: AsanaStartingStance;
  startingPosition: StartingPosition;
  movementType: MovementType;

  // Stance & Setup Guidance
  entryCue: string;
  entryInstruction: string;
  executionInstructions: string[];
  focusAreas: string[];
  keyAlignmentPoints: string[];
  relevantJoints: string[];
  requiredRegions: ("torso" | "arms" | "legs" | "feet" | "head")[];

  // Deterministic Rules & Corrections
  poseRules: PoseRule[];
  alignmentCues: AsanaAlignmentRuleCue[];
  corrections: AsanaProfileCorrection[];

  // Feedback & Encouragement
  goodFormAffirmation: string;
  successFeedback: string[];
  holdMindfulnessCue: string;
  completionCue: string;
  voiceGuidance: AsanaVoiceGuidance;

  // Quality & Completeness Metadata
  isComplete: boolean;          // True if fully authored, false if using fallback placeholders
  placeholderNotes?: string;
}
