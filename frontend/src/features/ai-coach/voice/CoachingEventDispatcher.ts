import type { CoachingEvent } from "./voice.types";
import { RealtimeVoiceAgent } from "./RealtimeVoiceAgent";

interface DispatcherConfig {
  cooldownMs: number;
}

const DEFAULT_COACHING_COOLDOWN_MS = 4000;

const SEVERITY_WEIGHT: Record<string, number> = {
  safety_warning: 5,
  high: 4,
  medium: 3,
  low: 2,
  info: 1,
};

export class CoachingEventDispatcher {
  private agent: RealtimeVoiceAgent | null = null;
  private lastEventTime: number = 0;
  private lastIssuedRuleId: string | null = null;
  private lastIssuedSeverity: number = 0;
  private lastEventType: string | null = null;
  private config: DispatcherConfig;

  constructor(config?: Partial<DispatcherConfig>) {
    this.config = {
      cooldownMs: config?.cooldownMs ?? DEFAULT_COACHING_COOLDOWN_MS,
    };
  }

  setAgent(agent: RealtimeVoiceAgent | null) {
    this.agent = agent;
  }

  /**
   * Receives a candidate event. Checks priority, duplicates, and cooldowns.
   * If valid, dispatches it to the voice agent.
   */
  dispatch(event: CoachingEvent): boolean {
    if (!this.agent) {
      return false;
    }

    const now = Date.now();
    const eventSeverity = event.type === "safety_warning" ? 5 : SEVERITY_WEIGHT[event.severity || "info"] || 1;

    // 1. Safety warnings ALWAYS pass through immediately
    if (event.type === "safety_warning") {
      this.send(event, now, eventSeverity);
      return true;
    }

    // 2. State-driven one-time lifecycle events (pose_started, pose_held, pose_completed)
    if (event.type === "pose_started" || event.type === "pose_held" || event.type === "pose_completed") {
      if (this.lastEventType === event.type) {
        console.log(`[AI COACH] Coaching event suppressed by cooldown: identical lifecycle event ${event.type}`);
        return false;
      }
      this.send(event, now, eventSeverity);
      return true;
    }

    // 3. Good form acknowledgment
    if (event.type === "good_form") {
      if (this.lastEventType === "good_form") {
        console.log("[AI COACH] Coaching event suppressed by cooldown: already in good form");
        return false;
      }
      // Send good form acknowledgment if transitioning from a correction or entering good form
      this.send(event, now, eventSeverity);
      this.lastIssuedRuleId = null;
      return true;
    }

    // 4. Higher-severity preempts an active cooldown of a lower-severity event
    const isHigherSeverity = eventSeverity > this.lastIssuedSeverity;
    const timeSinceLastEvent = now - this.lastEventTime;

    if (!isHigherSeverity && timeSinceLastEvent < this.config.cooldownMs) {
      console.log(
        `[AI COACH] Coaching event suppressed by cooldown: active cooldown (${Math.round(timeSinceLastEvent)}ms / ${this.config.cooldownMs}ms)`
      );
      return false;
    }

    // 5. Duplicate suppression: do not repeat the exact same rule immediately
    if (event.type === "pose_correction" && event.ruleId && event.ruleId === this.lastIssuedRuleId) {
      // Must wait at least 2.5x cooldown before repeating the same correction to prevent voice nagging
      if (timeSinceLastEvent < this.config.cooldownMs * 2.5) {
        console.log(
          `[AI COACH] Coaching event suppressed by cooldown: duplicate rule ${event.ruleId} within repeat window`
        );
        return false;
      }
    }

    this.send(event, now, eventSeverity);
    return true;
  }

  private send(event: CoachingEvent, timestamp: number, severity: number) {
    this.lastEventTime = timestamp;
    this.lastEventType = event.type;
    this.lastIssuedSeverity = severity;

    if (event.type === "pose_correction") {
      this.lastIssuedRuleId = event.ruleId || null;
    } else if (event.type !== "safety_warning") {
      this.lastIssuedRuleId = null;
    }

    console.log(
      `[AI COACH] Coaching event dispatched: type=${event.type}, asana=${event.asanaName}, rule=${event.ruleId || "none"}, severity=${event.severity || "normal"}`
    );
    this.agent?.sendCoachingEvent(event);
  }

  reset() {
    this.lastEventTime = 0;
    this.lastIssuedRuleId = null;
    this.lastIssuedSeverity = 0;
    this.lastEventType = null;
  }
}
