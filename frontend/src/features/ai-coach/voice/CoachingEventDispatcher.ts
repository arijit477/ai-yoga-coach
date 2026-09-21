import type { CoachingEvent } from "./voice.types";
import { RealtimeVoiceAgent } from "./RealtimeVoiceAgent";

interface DispatcherConfig {
  cooldownMs: number;
  repeatSameRuleCooldownMs: number;
}

const DEFAULT_COACHING_COOLDOWN_MS = 4000;
const DEFAULT_REPEAT_RULE_COOLDOWN_MS = 10000;

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
  private ruleTimestamps = new Map<string, number>();
  private ruleSeverities = new Map<string, number>();
  private lastEventType: string | null = null;
  private config: DispatcherConfig;

  constructor(config?: Partial<DispatcherConfig>) {
    this.config = {
      cooldownMs: config?.cooldownMs ?? DEFAULT_COACHING_COOLDOWN_MS,
      repeatSameRuleCooldownMs:
        config?.repeatSameRuleCooldownMs ?? DEFAULT_REPEAT_RULE_COOLDOWN_MS,
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
    const eventSeverity =
      event.type === "safety_warning" ? 5 : SEVERITY_WEIGHT[event.severity || "info"] || 1;

    // 1. Safety warnings ALWAYS pass through immediately with top priority
    if (event.type === "safety_warning") {
      this.send(event, now, eventSeverity);
      return true;
    }

    // 2. State-driven one-time lifecycle events (pose_started, calibration_prompt, calibration_complete, step_guidance, pose_held, pose_completed)
    if (
      event.type === "pose_started" ||
      event.type === "calibration_prompt" ||
      event.type === "calibration_complete" ||
      event.type === "step_guidance" ||
      event.type === "pose_held" ||
      event.type === "pose_completed"
    ) {
      if (this.lastEventType === event.type && event.type !== "step_guidance") {
        console.log(
          `[AI COACH] Coaching event suppressed by cooldown: duplicate lifecycle event ${event.type}`
        );
        return false;
      }
      this.send(event, now, eventSeverity);
      return true;
    }

    // 3. Good form acknowledgment: only trigger on transition
    if (event.type === "good_form") {
      if (this.lastEventType === "good_form") {
        console.log("[AI COACH] Coaching event suppressed: already acknowledged good form");
        return false;
      }
      this.send(event, now, eventSeverity);
      this.ruleTimestamps.clear(); // Good form resets rule trackers
      this.ruleSeverities.clear();
      return true;
    }

    // 4. Duplicate suppression: do not repeat the exact same rule within the repeat window
    if (event.type === "pose_correction" && event.ruleId) {
      const lastRuleTime = this.ruleTimestamps.get(event.ruleId) || 0;
      const lastRuleSeverity = this.ruleSeverities.get(event.ruleId) || 0;
      const timeSinceRule = now - lastRuleTime;

      // If severity increased from medium/low to high, allow preemption
      const isSeverityEscalation = eventSeverity > lastRuleSeverity;
      
      if (!isSeverityEscalation && timeSinceRule < this.config.repeatSameRuleCooldownMs) {
        console.log(
          `[AI COACH] Coaching event suppressed by cooldown: duplicate rule '${event.ruleId}' within repeat window (${Math.round(timeSinceRule)}ms / ${this.config.repeatSameRuleCooldownMs}ms)`
        );
        return false;
      }
    }

    // 5. Higher-severity preempts an active baseline cooldown of a lower-severity event
    const timeSinceLastEvent = now - this.lastEventTime;
    // Check if the current event is higher severity than whatever was last spoken generally (to allow interrupting info with a high warning)
    let isHigherThanLast = false;
    if (event.type === "pose_correction" && event.ruleId) {
      // Find the max severity among recently fired rules
      let maxRecentSeverity = 0;
      for (const [id, time] of this.ruleTimestamps.entries()) {
         if (now - time < this.config.cooldownMs) {
            maxRecentSeverity = Math.max(maxRecentSeverity, this.ruleSeverities.get(id) || 0);
         }
      }
      isHigherThanLast = eventSeverity > maxRecentSeverity;
    }

    if (!isHigherThanLast && timeSinceLastEvent < this.config.cooldownMs) {
      console.log(
        `[AI COACH] Coaching event suppressed by cooldown: active baseline cooldown (${Math.round(timeSinceLastEvent)}ms / ${this.config.cooldownMs}ms)`
      );
      return false;
    }

    this.send(event, now, eventSeverity);
    return true;
  }

  private send(event: CoachingEvent, timestamp: number, severity: number) {
    this.lastEventTime = timestamp;
    this.lastEventType = event.type;

    if (event.type === "pose_correction" && event.ruleId) {
      this.ruleTimestamps.set(event.ruleId, timestamp);
      this.ruleSeverities.set(event.ruleId, severity);
    }

    console.log(
      `[AI COACH] Coaching event dispatched: type=${event.type}, asana=${event.asanaName}, rule=${event.ruleId || "none"}, severity=${event.severity || "normal"}`
    );
    this.agent?.sendCoachingEvent(event);
  }

  reset() {
    this.lastEventTime = 0;
    this.ruleTimestamps.clear();
    this.ruleSeverities.clear();
    this.lastEventType = null;
  }
}

