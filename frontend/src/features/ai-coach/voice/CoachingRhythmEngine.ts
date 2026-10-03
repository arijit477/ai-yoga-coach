import type { CoachingEvent, CoachingEventType } from "./voice.types";

export type CoachingRhythmReason =
  | "correction"
  | "encouragement"
  | "resolved"
  | "hold_progress"
  | "completion"
  | "safety"
  | "transition";

export interface CoachingRhythmInput {
  event: CoachingEvent;
  now?: number;
  lastSpokenAt?: number;
  lastEventType?: CoachingEventType;
}

export interface CoachingRhythmDecision {
  shouldSpeak: boolean;
  reason?: CoachingRhythmReason;
  cooldownMs: number;
}

const DEFAULT_COOLDOWN_MS = 3500;
const SAFETY_COOLDOWN_MS = 1200;
const COMPLETION_COOLDOWN_MS = 1500;

/**
 * Keeps the voice coach engaging without allowing continuous event spam.
 * The vision/rule pipeline remains authoritative; this layer only decides
 * whether a meaningful event is ready to be voiced.
 */
export function evaluateCoachingRhythm({
  event,
  now = Date.now(),
  lastSpokenAt = 0,
}: CoachingRhythmInput): CoachingRhythmDecision {
  const type = event.type;

  if (type === "safety_warning") {
    return {
      shouldSpeak: now - lastSpokenAt >= SAFETY_COOLDOWN_MS,
      reason: "safety",
      cooldownMs: SAFETY_COOLDOWN_MS,
    };
  }

  if (type === "completion") {
    return {
      shouldSpeak: now - lastSpokenAt >= COMPLETION_COOLDOWN_MS,
      reason: "completion",
      cooldownMs: COMPLETION_COOLDOWN_MS,
    };
  }

  if (type === "correction") {
    return {
      shouldSpeak: now - lastSpokenAt >= DEFAULT_COOLDOWN_MS,
      reason: "correction",
      cooldownMs: DEFAULT_COOLDOWN_MS,
    };
  }

  if (type === "correction_resolved") {
    return {
      shouldSpeak: now - lastSpokenAt >= DEFAULT_COOLDOWN_MS,
      reason: "resolved",
      cooldownMs: DEFAULT_COOLDOWN_MS,
    };
  }

  if (type === "encouragement") {
    return {
      shouldSpeak: now - lastSpokenAt >= DEFAULT_COOLDOWN_MS,
      reason: "encouragement",
      cooldownMs: DEFAULT_COOLDOWN_MS,
    };
  }

  return {
    shouldSpeak: false,
    cooldownMs: DEFAULT_COOLDOWN_MS,
  };
}
