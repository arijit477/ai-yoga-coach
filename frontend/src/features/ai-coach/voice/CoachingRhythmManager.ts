import type { CoachingEvent } from "./voice.types";

export type CoachingCueType =
  | "correction"
  | "encouragement"
  | "resolution"
  | "hold"
  | "completion"
  | "safety"
  | "camera"
  | "guidance";

export interface CoachingRhythmDecision {
  shouldSpeak: boolean;
  cueType?: CoachingCueType;
  reason: string;
  cooldownMs: number;
}

export interface CoachingRhythmConfig {
  correctionCooldownMs?: number;
  encouragementCooldownMs?: number;
  holdCooldownMs?: number;
  completionCooldownMs?: number;
}

const DEFAULT_CONFIG: Required<CoachingRhythmConfig> = {
  correctionCooldownMs: 5000,
  encouragementCooldownMs: 7000,
  holdCooldownMs: 12000,
  completionCooldownMs: 1500,
};

export class CoachingRhythmManager {
  private readonly config: Required<CoachingRhythmConfig>;

  private lastSpokenAt = 0;
  private lastCueType: CoachingCueType | null = null;
  private lastEventId: string | null = null;

  constructor(config: CoachingRhythmConfig = {}) {
    this.config = {
      ...DEFAULT_CONFIG,
      ...config,
    };
  }

  public reset(): void {
    this.lastSpokenAt = 0;
    this.lastCueType = null;
    this.lastEventId = null;
  }

  public shouldSpeak(
    event: CoachingEvent,
    now = Date.now()
  ): CoachingRhythmDecision {
    const cueType = this.getCueType(event);

    // Safety feedback should always have the highest priority.
    if (cueType === "safety") {
      return this.allow(
        cueType,
        "Safety event should be communicated immediately.",
        now,
        1000
      );
    }

    // Never speak the exact same event twice.
    if (this.lastEventId === event.id) {
      return this.deny("The same coaching event was already spoken.");
    }

    const cooldownMs = this.getCooldown(cueType);
    const elapsed = now - this.lastSpokenAt;

    // Corrections can interrupt encouragement/hold chatter,
    // but ordinary encouragement should not interrupt a recent correction.
    if (
      this.lastCueType === "correction" &&
      cueType === "encouragement" &&
      elapsed < this.config.encouragementCooldownMs
    ) {
      return this.deny(
        "Wait after a correction before giving encouragement."
      );
    }

    if (elapsed < cooldownMs) {
      return this.deny(
        `Rhythm cooldown active for ${Math.ceil(
          (cooldownMs - elapsed) / 1000
        )}s.`
      );
    }

    return this.allow(
      cueType,
      "Coaching event is appropriate to speak now.",
      now,
      cooldownMs
    );
  }

  public markSpoken(
    event: CoachingEvent,
    cueType?: CoachingCueType,
    now = Date.now()
  ): void {
    this.lastSpokenAt = now;
    this.lastEventId = event.id;
    this.lastCueType = cueType ?? this.getCueType(event);
  }

  private allow(
    cueType: CoachingCueType,
    reason: string,
    _now: number,
    cooldownMs: number
  ): CoachingRhythmDecision {
    return {
      shouldSpeak: true,
      cueType,
      reason,
      cooldownMs,
    };
  }

  private deny(reason: string): CoachingRhythmDecision {
    return {
      shouldSpeak: false,
      reason,
      cooldownMs: 0,
    };
  }

  private getCooldown(cueType: CoachingCueType): number {
    switch (cueType) {
      case "correction":
        return this.config.correctionCooldownMs;

      case "encouragement":
      case "resolution":
        return this.config.encouragementCooldownMs;

      case "hold":
        return this.config.holdCooldownMs;

      case "completion":
        return this.config.completionCooldownMs;

      case "safety":
        return 1000;

      case "camera":
      case "guidance":
      default:
        return this.config.encouragementCooldownMs;
    }
  }

  private getCueType(event: CoachingEvent): CoachingCueType {
    switch (event.type) {
      case "safety_warning":
        return "safety";

      case "pose_correction":
        return "correction";

      case "issue_improving":
      case "issue_resolved":
      case "good_form":
        return "encouragement";

      case "pose_held":
      case "hold_countdown":
        return "hold";

      case "pose_completed":
        return "completion";

      case "camera_unavailable":
      case "user_out_of_frame":
      case "partial_body":
      case "camera_ready":
      case "camera_state_change":
        return "camera";

      case "pose_started":
      case "step_guidance":
      case "calibration_prompt":
      case "calibration_complete":
      case "calibration_required":
      case "calibration_failed":
      case "accuracy_threshold":
      default:
        return "guidance";
    }
  }
}
