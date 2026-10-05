import type { CoachingEvent } from "./voice.types";
import {
  CoachingRhythmManager,
  type CoachingRhythmDecision,
} from "./CoachingRhythmManager";
import type { CoachingIntent } from "./coachingIntent.types";
import { mapCoachingEventToIntent } from "./CoachingIntentMapper";

export interface VoiceCoachingDecision {
  shouldSpeak: boolean;
  reason: string;
  cueType: CoachingRhythmDecision["cueType"];
  intent: CoachingIntent;
}

/**
 * Central arbitration layer for voice coaching.
 *
 * IMPORTANT:
 * - Does NOT analyze pose data.
 * - Does NOT calculate scores.
 * - Does NOT modify coaching events.
 * - Does NOT replace CoachDecisionEngine.
 *
 * It only decides whether an already-approved coaching event
 * should reach the voice agent.
 */
export class VoiceCoachingOrchestrator {
  private readonly rhythmManager: CoachingRhythmManager;

  constructor() {
    this.rhythmManager = new CoachingRhythmManager();
  }

  public evaluate(
    event: CoachingEvent,
    now: number = Date.now()
  ): VoiceCoachingDecision {
    const intentResult = mapCoachingEventToIntent(event);
    const rhythmDecision =
      this.rhythmManager.evaluate(event, now);

    console.log(`[AI COACH][TRACE][9][ORCHESTRATOR]`, {
      eventType: event.type,
      cueType: rhythmDecision.cueType,
      shouldSpeak: rhythmDecision.shouldSpeak,
      reason: rhythmDecision.reason,
    });

    console.log(`[AI COACH][DEBUG][ORCHESTRATOR]`, {
      eventType: event.type,
      cueType: rhythmDecision.cueType,
      shouldSpeak: rhythmDecision.shouldSpeak,
      reason: rhythmDecision.reason,
      intent: intentResult.intent,
      timestamp: now,
    });

    return {
      shouldSpeak: rhythmDecision.shouldSpeak,
      reason: rhythmDecision.reason,
      cueType: rhythmDecision.cueType,
      intent: intentResult.intent,
    };
  }

  public reset(): void {
    this.rhythmManager.reset();
  }

  public getRhythmManager(): CoachingRhythmManager {
    return this.rhythmManager;
  }
}
