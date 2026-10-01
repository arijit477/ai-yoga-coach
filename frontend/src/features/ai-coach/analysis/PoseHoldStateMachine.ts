/**
 * PoseHoldStateMachine — Explicit State Machine managing true continuous 5-second hold validation.
 *
 * Implements Phase 4 Steps 4, 5, 6, 11:
 *
 * States:
 *   IDLE -> POSITIONING -> POSE_DETECTED -> HOLDING -> COMPLETED
 *
 * Transitions:
 *   IDLE -> POSITIONING
 *     when session/pose evaluation starts
 *
 *   POSITIONING -> POSE_DETECTED
 *     when pose identity matches (user is in the pose)
 *
 *   POSE_DETECTED -> HOLDING
 *     when ALL completion conditions become valid:
 *       identity.isMatch === true
 *       AND form valid (critical rules passed)
 *       AND accuracy >= 75%
 *       AND tracking valid
 *
 *   HOLDING -> HOLDING
 *     while all conditions remain continuously valid
 *
 *   HOLDING -> POSITIONING (or POSE_DETECTED)
 *     immediately upon ANY condition invalidation:
 *       hold timer RESETS TO 0
 *       candidateSince = null
 *       timer does NOT resume from previous elapsed time
 *
 *   HOLDING -> COMPLETED
 *     after exactly 5000ms of unbroken continuous validity
 *
 *   COMPLETED -> stays completed
 *     guarded: fires completion callback EXACTLY ONCE
 */

import type { PoseFrameState } from "./PoseFrameState";

export type HoldState =
  | "IDLE"
  | "POSITIONING"
  | "POSE_DETECTED"
  | "HOLDING"
  | "COMPLETED";

export interface PoseHoldStateMachineConfig {
  requiredHoldMs: number;              // Continuous hold duration (default: 5000ms)
  targetHoldSeconds: number;           // Target hold in seconds for display (default: 5s)
  completionAccuracyThreshold: number; // Accuracy threshold (default: 75%)
}

export const DEFAULT_HOLD_CONFIG: PoseHoldStateMachineConfig = {
  requiredHoldMs: 5000,
  targetHoldSeconds: 5,
  completionAccuracyThreshold: 75,
};

export interface PoseHoldStateMachineCallbacks {
  onStateChange?: (from: HoldState, to: HoldState) => void;
  onHoldStart?: (frameState: PoseFrameState) => void;
  onHoldProgress?: (elapsedMs: number, remainingMs: number, percent: number) => void;
  onHoldReset?: (reason: string) => void;
  onPoseCompleted?: (finalScore: number, frameState: PoseFrameState) => void;
}

export class PoseHoldStateMachine {
  private config: PoseHoldStateMachineConfig;
  private callbacks: PoseHoldStateMachineCallbacks;

  private state: HoldState = "IDLE";
  private holdStartTimestamp: number | null = null;
  private holdElapsedMs: number = 0;
  private hasCompleted: boolean = false;
  private completedScore: number | null = null;
  private lastResetReason: string | null = null;

  constructor(
    callbacks: PoseHoldStateMachineCallbacks = {},
    customConfig?: Partial<PoseHoldStateMachineConfig>
  ) {
    this.callbacks = callbacks;
    this.config = {
      ...DEFAULT_HOLD_CONFIG,
      ...customConfig,
    };
  }

  public getState(): HoldState {
    return this.state;
  }

  public getHoldElapsedMs(): number {
    return this.holdElapsedMs;
  }

  public getHoldSeconds(): number {
    return Math.min(
      this.config.targetHoldSeconds,
      Math.round((this.holdElapsedMs / 1000) * 10) / 10
    );
  }

  public getHoldProgressPercent(): number {
    return Math.min(100, Math.round((this.holdElapsedMs / this.config.requiredHoldMs) * 100));
  }

  public isCompleted(): boolean {
    return this.hasCompleted;
  }

  public getCompletedScore(): number | null {
    return this.completedScore;
  }

  public getLastResetReason(): string | null {
    return this.lastResetReason;
  }

  /**
   * Starts or restarts positioning for the current asana.
   */
  public start(): void {
    this.reset("POSITIONING");
  }

  /**
   * Resets the hold state machine to IDLE or a specified state.
   */
  public reset(toState: HoldState = "IDLE"): void {
    const prevState = this.state;
    this.state = toState;
    this.holdStartTimestamp = null;
    this.holdElapsedMs = 0;
    this.hasCompleted = false;
    this.completedScore = null;
    this.lastResetReason = null;

    if (prevState !== toState) {
      this.callbacks.onStateChange?.(prevState, toState);
    }
  }

  /**
   * Updates the hold state machine with the latest authoritative PoseFrameState.
   *
   * @param frameState The authoritative frame evaluation result.
   * @param now Current timestamp in ms (default Date.now()).
   * @returns Current HoldState after transition.
   */
  public update(frameState: PoseFrameState | null, now: number = Date.now()): HoldState {
    // If already completed for this asana, do not process further frames (one-shot guard)
    if (this.state === "COMPLETED" || this.hasCompleted) {
      return "COMPLETED";
    }

    // If state is IDLE and no frame or inactive, remain in IDLE
    if (this.state === "IDLE") {
      if (frameState && frameState.trackingValid) {
        this.transitionTo("POSITIONING");
      }
      return this.state;
    }

    // Handle null or invalid tracking
    if (!frameState || !frameState.trackingValid || frameState.tracking.isStale) {
      if (this.state === "HOLDING" || this.holdStartTimestamp !== null) {
        this.resetHold("Tracking lost or stale during hold");
      }
      if (this.state !== "POSITIONING") {
        this.transitionTo("POSITIONING");
      }
      return this.state;
    }

    const { identityValid, isCompletionEligible, failureReason } = frameState;

    switch (this.state) {
      case "POSITIONING": {
        if (identityValid) {
          if (isCompletionEligible) {
            // Eligible immediately -> start holding
            this.transitionTo("HOLDING");
            this.startHold(now, frameState);
          } else {
            // Identity recognized but form/accuracy needs refinement
            this.transitionTo("POSE_DETECTED");
          }
        }
        break;
      }

      case "POSE_DETECTED": {
        if (!identityValid) {
          // Lost pose identity -> back to positioning
          this.transitionTo("POSITIONING");
        } else if (isCompletionEligible) {
          // Reached >= 75% accuracy and passed all form rules -> start holding!
          this.transitionTo("HOLDING");
          this.startHold(now, frameState);
        }
        break;
      }

      case "HOLDING": {
        // Continuous Hold Verification:
        // If ANY condition breaks (identity, form, accuracy, tracking), hold timer resets IMMEDIATELY!
        if (!isCompletionEligible) {
          const reason = failureReason || "Hold broken: form or accuracy fell below requirements";
          this.resetHold(reason);
          this.transitionTo(identityValid ? "POSE_DETECTED" : "POSITIONING");
          break;
        }

        // All conditions remain valid: advance hold timer
        if (this.holdStartTimestamp === null) {
          this.holdStartTimestamp = now;
        }

        this.holdElapsedMs = Math.max(0, now - this.holdStartTimestamp);
        const remainingMs = Math.max(0, this.config.requiredHoldMs - this.holdElapsedMs);
        const percent = this.getHoldProgressPercent();

        this.callbacks.onHoldProgress?.(this.holdElapsedMs, remainingMs, percent);

        // Check for 5000ms continuous hold completion!
        if (this.holdElapsedMs >= this.config.requiredHoldMs) {
          this.completePose(frameState);
        }
        break;
      }
    }

    return this.state;
  }

  private startHold(now: number, frameState: PoseFrameState): void {
    this.holdStartTimestamp = now;
    this.holdElapsedMs = 0;
    this.callbacks.onHoldStart?.(frameState);
  }

  private resetHold(reason: string): void {
    this.holdStartTimestamp = null;
    this.holdElapsedMs = 0;
    this.lastResetReason = reason;
    this.callbacks.onHoldReset?.(reason);
  }

  private completePose(frameState: PoseFrameState): void {
    if (this.hasCompleted) return;

    this.hasCompleted = true;
    this.completedScore = Math.max(0, Math.min(100, Math.round(frameState.accuracy.displayed)));
    this.transitionTo("COMPLETED");
    this.callbacks.onPoseCompleted?.(this.completedScore, frameState);
  }

  private transitionTo(nextState: HoldState): void {
    if (this.state === nextState) return;

    const previous = this.state;
    this.state = nextState;
    this.callbacks.onStateChange?.(previous, nextState);
  }
}
