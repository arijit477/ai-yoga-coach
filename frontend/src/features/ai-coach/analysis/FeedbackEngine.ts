/**
 * FeedbackEngine — Asana-Specific Feedback Generation & Temporal Stability Layer.
 *
 * Converts deterministic MediaPipe AsanaEvaluationResults into short, specific coaching messages.
 *
 * Invariants:
 * 1. Strictly Unidirectional: Emits guidance only (no conversational logic).
 * 2. Multi-Defect Arbitration: Only 1 primary correction at a time (Safety > High > Med > Low).
 * 3. Temporal Stability: Candidate issue must persist for N frames before triggering feedback.
 * 4. Anti-Flooding & Cooldowns: Enforces repeat-rule and general cooldowns.
 * 5. Positive Feedback on Resolution: Emits "Good. Hold that position" / asana-specific praise when issues resolve.
 */

import type { RuleSeverity, OverallPoseStatus } from "../types/pose-rules";
import type { AsanaCoachingProfile } from "../types/coaching-profile";
import type { AsanaEvaluationResult, AsanaDetectedIssue } from "../types/asana-evaluation";
import { getAsanaCoachingProfile } from "../services/AsanaCoachingProfileService";

export type FeedbackType =
  | "safety_warning"
  | "pose_correction"
  | "positive_reinforcement"
  | "good_form"
  | "alignment_hint"
  | "pose_completed";

export interface FeedbackOutput {
  message: string;              // Short, specific physical coaching message
  type: FeedbackType;           // Feedback category
  priority: number;             // 1 = Safety (highest), 2 = Major/High, 3 = Medium, 4 = Minor/Low, 5 = Positive
  severity?: RuleSeverity;      // "high" | "medium" | "low" | "info"
  cooldown: number;             // Minimum cooldown in ms before next similar message
  sourceRule?: string;          // Originating rule ID (e.g., "warrior-ii-left-knee-angle")
  asanaId: string;              // Active asana ID
  asanaName: string;            // Active asana Name
  status: OverallPoseStatus;    // Current overall posture status
  timestamp: number;
}

export interface FeedbackEngineConfig {
  requiredFrames: number;       // Frames a defect must persist before triggering feedback (default: 4)
  releaseFrames: number;        // Frames clean form must persist before clearing active defect (default: 3)
  generalCooldownMs: number;    // General speech cooldown (default: 4000ms)
  repeatRuleCooldownMs: number; // Cooldown before repeating the exact same rule (default: 8000ms)
  positiveCooldownMs: number;   // Cooldown between positive reinforcement / good form cues (default: 6000ms)
  safetyCooldownMs: number;     // Cooldown for safety warnings (default: 2000ms)
}

const DEFAULT_CONFIG: FeedbackEngineConfig = {
  requiredFrames: 4,
  releaseFrames: 3,
  generalCooldownMs: 4000,
  repeatRuleCooldownMs: 8000,
  positiveCooldownMs: 6000,
  safetyCooldownMs: 2000,
};

export class FeedbackEngine {
  private config: FeedbackEngineConfig;

  // Temporal Stability Tracking
  private activeRuleId: string | null = null;
  private candidateRuleId: string | null = null;
  private candidateFrames = 0;
  private cleanFormFrames = 0;
  private goodFormFrames = 0;

  // Timestamps & Cooldowns
  private lastFeedbackTime = 0;
  private lastPositiveTime = 0;
  private ruleLastSpokenTime = new Map<string, number>();

  // State Tracking
  private lastSpokenIssue: AsanaDetectedIssue | null = null;
  private hadActiveIssue = false;

  constructor(config?: Partial<FeedbackEngineConfig>) {
    this.config = {
      ...DEFAULT_CONFIG,
      ...config,
    };
  }

  /**
   * Resets all internal temporal smoothing and cooldown states.
   */
  public reset(): void {
    this.activeRuleId = null;
    this.candidateRuleId = null;
    this.candidateFrames = 0;
    this.cleanFormFrames = 0;
    this.goodFormFrames = 0;
    this.lastFeedbackTime = 0;
    this.lastPositiveTime = 0;
    this.ruleLastSpokenTime.clear();
    this.lastSpokenIssue = null;
    this.hadActiveIssue = false;
  }

  /**
   * Processes an AsanaEvaluationResult and generates the highest-priority, temporally-stabilized FeedbackOutput.
   * Returns null if no feedback should be emitted this frame (due to cooldown, smoothing, or stable good form).
   */
  public processEvaluation(
    evaluation: AsanaEvaluationResult,
    options?: { timestamp?: number; profile?: AsanaCoachingProfile }
  ): FeedbackOutput | null {
    const now = options?.timestamp ?? evaluation.evaluatedAt ?? Date.now();
    const profile = options?.profile ?? getAsanaCoachingProfile(evaluation.asanaId);

    // If pose is not ready or no landmarks detected, no speech
    if (evaluation.overallStatus === "not_ready") {
      return null;
    }

    // 1. Multi-Defect Priority Arbitration
    // Sort hierarchy: Safety (1) > High Severity (2) > Medium Severity (3) > Low/Info (4)
    const sortedIssues = this.arbitrateDefects(evaluation.detectedIssues);
    const topIssue = sortedIssues[0] ?? null;

    // 2. Temporal Smoothing / Hysteresis
    if (topIssue) {
      this.cleanFormFrames = 0;
      this.goodFormFrames = 0;

      // Check if candidate is safety critical (bypasses frame debounce)
      const isSafety = Boolean(topIssue.isSafety);

      if (isSafety) {
        this.activeRuleId = topIssue.ruleId;
        this.candidateRuleId = null;
        this.candidateFrames = 0;
      } else {
        if (topIssue.ruleId === this.candidateRuleId) {
          this.candidateFrames++;
        } else {
          this.candidateRuleId = topIssue.ruleId;
          this.candidateFrames = 1;
        }

        if (this.candidateFrames >= this.config.requiredFrames) {
          this.activeRuleId = topIssue.ruleId;
          this.candidateRuleId = null;
          this.candidateFrames = 0;
        }
      }

      // If activeRuleId matches topIssue, evaluate cooldown and emit correction
      if (this.activeRuleId === topIssue.ruleId) {
        this.hadActiveIssue = true;
        this.lastSpokenIssue = topIssue;
        return this.tryEmitCorrection(topIssue, evaluation, profile, now);
      }

      return null;
    }

    // 3. No Issues Detected (Clean Form)
    this.cleanFormFrames++;
    this.goodFormFrames++;

    if (this.cleanFormFrames >= this.config.releaseFrames) {
      this.activeRuleId = null;
      this.candidateRuleId = null;
      this.candidateFrames = 0;
    }

    // 4. Positive Reinforcement when user fixes an issue or maintains steady good form
    if (evaluation.score >= 75 && (evaluation.overallStatus === "good" || evaluation.overallStatus === "excellent")) {
      // If user just fixed an issue, confirm resolution
      if (this.hadActiveIssue && this.lastSpokenIssue) {
        const resolvedText =
          this.lastSpokenIssue.resolvedText ||
          `Good adjustment. Hold that position.`;

        this.hadActiveIssue = false;
        this.lastSpokenIssue = null;

        return this.tryEmitPositiveFeedback(resolvedText, evaluation, profile, now, 5);
      }

      // Steady good form hold reminder (requires at least 5 frames of continuous good form)
      const posElapsed = this.lastPositiveTime === 0 || (now - this.lastPositiveTime >= this.config.positiveCooldownMs);
      const genElapsed = this.lastFeedbackTime === 0 || (now - this.lastFeedbackTime >= this.config.generalCooldownMs);
      if (this.goodFormFrames >= 5 && posElapsed && genElapsed) {
        const praise =
          profile.successFeedback[0] ||
          `Good. Hold that position.`;

        return this.tryEmitPositiveFeedback(praise, evaluation, profile, now, 5);
      }
    }

    return null;
  }

  /**
   * Arbitrates multiple defects according to strict priority hierarchy:
   * 1. Safety > 2. High Severity > 3. Medium Severity > 4. Low/Info Severity > 5. Deviation
   */
  private arbitrateDefects(issues: AsanaDetectedIssue[]): AsanaDetectedIssue[] {
    if (!issues || issues.length === 0) return [];

    const severityWeight: Record<RuleSeverity, number> = {
      high: 3,
      medium: 2,
      low: 1,
      info: 0,
    };

    return [...issues].sort((a, b) => {
      // 1. Safety first
      if (a.isSafety !== b.isSafety) {
        return a.isSafety ? -1 : 1;
      }

      // 2. Severity tier
      const sevA = severityWeight[a.severity] ?? 0;
      const sevB = severityWeight[b.severity] ?? 0;
      if (sevA !== sevB) {
        return sevB - sevA;
      }

      // 3. Normalized deviation (larger defect prioritized)
      const devA = a.deviation ?? 0;
      const devB = b.deviation ?? 0;
      if (Math.abs(devA - devB) > 1e-4) {
        return devB - devA;
      }

      return 0;
    });
  }

  /**
   * Attempts to emit a pose correction if cooldown constraints are met.
   */
  private tryEmitCorrection(
    issue: AsanaDetectedIssue,
    evaluation: AsanaEvaluationResult,
    _profile: AsanaCoachingProfile,
    now: number,
  ): FeedbackOutput | null {
    const isSafety = Boolean(issue.isSafety);
    const ruleId = issue.ruleId;

    const lastSpoken = this.ruleLastSpokenTime.get(ruleId) || 0;
    const timeSinceRule = now - lastSpoken;
    const timeSinceGeneral = now - this.lastFeedbackTime;

    // Safety warnings bypass standard general cooldown, but check safety cooldown
    if (isSafety) {
      if (lastSpoken > 0 && timeSinceRule < this.config.safetyCooldownMs) {
        return null;
      }
    } else {
      // Normal corrections require general cooldown and repeat rule cooldown
      if (this.lastFeedbackTime > 0 && timeSinceGeneral < this.config.generalCooldownMs) {
        return null;
      }
      if (lastSpoken > 0 && timeSinceRule < this.config.repeatRuleCooldownMs) {
        return null;
      }
    }

    // Update cooldown timestamps
    this.lastFeedbackTime = now;
    this.ruleLastSpokenTime.set(ruleId, now);

    // Determine priority and type
    const priority = isSafety
      ? 1
      : issue.severity === "high"
        ? 2
        : issue.severity === "medium"
          ? 3
          : 4;

    const type: FeedbackType = isSafety
      ? "safety_warning"
      : priority <= 3
        ? "pose_correction"
        : "alignment_hint";

    const cooldown = isSafety
      ? this.config.safetyCooldownMs
      : this.config.repeatRuleCooldownMs;

    return {
      message: issue.correction,
      type,
      priority,
      severity: issue.severity,
      cooldown,
      sourceRule: ruleId,
      asanaId: evaluation.asanaId,
      asanaName: evaluation.asanaName,
      status: evaluation.overallStatus,
      timestamp: now,
    };
  }

  /**
   * Attempts to emit positive feedback / resolution confirmation.
   */
  private tryEmitPositiveFeedback(
    message: string,
    evaluation: AsanaEvaluationResult,
    _profile: AsanaCoachingProfile,
    now: number,
    priority: number = 5,
  ): FeedbackOutput | null {
    this.lastFeedbackTime = now;
    this.lastPositiveTime = now;

    return {
      message,
      type: "positive_reinforcement",
      priority,
      cooldown: this.config.positiveCooldownMs,
      asanaId: evaluation.asanaId,
      asanaName: evaluation.asanaName,
      status: evaluation.overallStatus,
      timestamp: now,
    };
  }
}
