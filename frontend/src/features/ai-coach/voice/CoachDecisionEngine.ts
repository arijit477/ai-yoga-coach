import type { CoachingEvent, CoachDecision } from "./voice.types";

export interface CoachingEngineConfig {
  cooldownMs: number;
  repeatSameRuleCooldownMs: number;
  goodFormCooldownMs: number;
}

export const DEFAULT_COACHING_CONFIG: CoachingEngineConfig = {
  cooldownMs: 4000,
  repeatSameRuleCooldownMs: 10000,
  goodFormCooldownMs: 6000,
};

export class CoachDecisionEngine {
  private config: CoachingEngineConfig;
  private lastEventTime: number = 0;
  private lastGoodFormTime: number = 0;
  private ruleTimestamps = new Map<string, number>();
  private lastEventType: string | null = null;
  private lastEventPriority: number = 99; // Lower number means higher priority
  private completedAsanas = new Set<string>();

  constructor(config?: Partial<CoachingEngineConfig>) {
    this.config = {
      cooldownMs: config?.cooldownMs ?? DEFAULT_COACHING_CONFIG.cooldownMs,
      repeatSameRuleCooldownMs: config?.repeatSameRuleCooldownMs ?? DEFAULT_COACHING_CONFIG.repeatSameRuleCooldownMs,
      goodFormCooldownMs: config?.goodFormCooldownMs ?? DEFAULT_COACHING_CONFIG.goodFormCooldownMs,
    };
  }

  public getEventPriority(event: CoachingEvent): number {
    switch (event.type) {
      case "safety_warning": return 1;
      case "camera_unavailable": return 2;
      case "user_out_of_frame": return 3;
      case "partial_body": return 4;
      // 5 is reserved for user speech / user questions
      case "pose_correction":
        if (event.severity === "high") return 6;
        if (event.severity === "medium") return 6.1;
        return 6.2;
      case "issue_improving": return 7;
      case "issue_resolved": return 7.1;
      case "pose_completed": return 8;
      case "good_form": return 9;
      case "pose_held":
      case "calibration_prompt":
      case "calibration_complete":
      case "calibration_required":
      case "camera_ready":
      case "pose_started": return 10;
      default: return 10;
    }
  }

  public evaluate(event: CoachingEvent, context?: any): CoachDecision {
    const now = context?.now ?? Date.now();
    const priority = this.getEventPriority(event);
    const isUserSpeaking = context?.isUserSpeaking === true;

    // 1. Safety Warnings always pass through immediately
    if (priority === 1) {
      return this.approve(event, priority, true, "Safety warning requires immediate interruption.", "Correct safety issue", now);
    }

    // 2. Camera states bypass standard rule cooldowns but have minimal cooldown
    if (priority <= 4) {
      if (this.lastEventType === event.type && now - this.lastEventTime < this.config.cooldownMs) {
        return this.reject(event, priority, "Already recently announced this camera state.");
      }
      return this.approve(event, priority, true, "Camera/visibility issues must be addressed immediately.", "Fix camera/position", now);
    }

    // 3. Prevent interrupting the user while user is actively speaking (unless priority <= 4)
    if (isUserSpeaking) {
      return this.reject(event, priority, "User is currently speaking. Suppressing non-critical event.");
    }

    // 4. Pose Completed: fire exactly once per asana
    if (event.type === "pose_completed") {
      if (this.completedAsanas.has(event.asanaId)) {
        return this.reject(event, priority, `Pose ${event.asanaId} completion already announced.`);
      }
      this.completedAsanas.add(event.asanaId);
      return this.approve(event, priority, false, "Pose completion achieved.", "Complete pose", now);
    }

    // 5. Good Form: respect dedicated good form cooldown
    if (event.type === "good_form" && this.lastGoodFormTime > 0) {
      const timeSinceGoodForm = now - this.lastGoodFormTime;
      if (timeSinceGoodForm < this.config.goodFormCooldownMs) {
        return this.reject(event, priority, `Good form cooldown active (${timeSinceGoodForm}ms < ${this.config.goodFormCooldownMs}ms).`);
      }
    }

    // 6. Duplicate identical rule suppression (e.g. repeated same knee issue)
    if (event.type === "pose_correction" && event.ruleId) {
      const lastTime = this.ruleTimestamps.get(event.ruleId) || 0;
      if (lastTime > 0) {
        const timeSince = now - lastTime;
        if (timeSince < this.config.repeatSameRuleCooldownMs) {
          return this.reject(event, priority, `Repeated rule '${event.ruleId}' too recently (${timeSince}ms).`);
        }
      }
    }

    // 7. Preemption / Active baseline cooldown
    if (this.lastEventTime > 0) {
      const timeSinceLastEvent = now - this.lastEventTime;
      const isHigherPriority = priority < this.lastEventPriority; // Note: lower number = higher priority

      if (!isHigherPriority && timeSinceLastEvent < this.config.cooldownMs) {
        return this.reject(event, priority, `Baseline cooldown active (${timeSinceLastEvent}ms). Current priority ${priority} does not preempt last priority ${this.lastEventPriority}.`);
      }
    }

    // 8. Duplicate event types for state-driven one-time lifecycle events
    const oneTimeEvents = [
      "pose_started", "calibration_prompt", "calibration_complete", "calibration_required",
      "pose_held", "camera_ready"
    ];
    if (oneTimeEvents.includes(event.type) && this.lastEventType === event.type) {
      return this.reject(event, priority, `Duplicate lifecycle event ${event.type}.`);
    }
    
    // Issue improving/resolved deduplication
    if ((event.type === "issue_improving" || event.type === "issue_resolved") && this.lastEventType === event.type) {
      return this.reject(event, priority, `Already announced ${event.type}.`);
    }

    // Approve the event
    return this.approve(event, priority, false, "Event meets all criteria to be spoken.", "Improve posture/form", now);
  }

  private approve(
    event: CoachingEvent,
    priority: number,
    interruptionRequired: boolean,
    reason: string,
    suggestedGoal: string,
    now: number
  ): CoachDecision {
    this.lastEventTime = now;
    this.lastEventType = event.type;
    this.lastEventPriority = priority;
    
    if (event.type === "pose_correction" && event.ruleId) {
      this.ruleTimestamps.set(event.ruleId, now);
    }
    if (event.type === "good_form") {
      this.lastGoodFormTime = now;
      this.ruleTimestamps.clear();
    }
    if (event.type === "pose_completed") {
      this.ruleTimestamps.clear();
    }

    return {
      shouldSpeak: true,
      priority,
      eventType: event.type,
      reason,
      interruptionRequired,
      suggestedGoal
    };
  }

  private reject(event: CoachingEvent, priority: number, reason: string): CoachDecision {
    return {
      shouldSpeak: false,
      priority,
      eventType: event.type,
      reason,
      interruptionRequired: false
    };
  }

  public reset() {
    this.lastEventTime = 0;
    this.lastGoodFormTime = 0;
    this.ruleTimestamps.clear();
    this.lastEventType = null;
    this.lastEventPriority = 99;
    this.completedAsanas.clear();
  }
}

