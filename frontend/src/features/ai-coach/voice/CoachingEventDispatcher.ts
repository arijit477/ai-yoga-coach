import type { CoachingEvent } from "./voice.types";
import { RealtimeVoiceAgent } from "./RealtimeVoiceAgent";

interface DispatcherConfig {
  cooldownMs: number;
}

export class CoachingEventDispatcher {
  private agent: RealtimeVoiceAgent | null = null;
  private lastEventTime: number = 0;
  private lastIssuedRuleId: string | null = null;
  private config: DispatcherConfig;

  constructor(config: DispatcherConfig = { cooldownMs: 5000 }) {
    this.config = config;
  }

  setAgent(agent: RealtimeVoiceAgent) {
    this.agent = agent;
  }

  /**
   * Receives a candidate event. Checks priority, duplicates, and cooldowns.
   * If valid, dispatches it to the voice agent.
   */
  dispatch(event: CoachingEvent) {
    if (!this.agent) return;

    const now = Date.now();

    // Always allow safety warnings to pass through immediately
    if (event.type === "safety_warning") {
      this.send(event, now);
      return;
    }

    // Cooldown check
    if (now - this.lastEventTime < this.config.cooldownMs) {
      return; // Still in cooldown
    }

    // Duplicate check for corrections
    if (event.type === "pose_correction" && event.ruleId === this.lastIssuedRuleId) {
      // It's the same rule we just corrected, don't spam it.
      // Wait, if it's been a long time (say 3x cooldown), maybe we should remind them?
      // For now, let's strictly suppress consecutive duplicates until the issue is resolved
      // or a different issue takes precedence.
      return;
    }

    // Informational/Good form events
    if (event.type === "good_form") {
      if (this.lastIssuedRuleId !== null) {
        // They fixed the previous issue!
        this.send(event, now);
        this.lastIssuedRuleId = null;
      }
      return;
    }

    this.send(event, now);
  }

  private send(event: CoachingEvent, timestamp: number) {
    if (event.type === "pose_correction" || event.type === "safety_warning") {
      this.lastIssuedRuleId = event.ruleId || null;
    } else {
      this.lastIssuedRuleId = null;
    }
    
    this.lastEventTime = timestamp;
    this.agent?.sendCoachingEvent(event);
  }

  reset() {
    this.lastEventTime = 0;
    this.lastIssuedRuleId = null;
  }
}
