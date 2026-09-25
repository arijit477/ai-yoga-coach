import type { CoachSessionState } from "../types/CoachSessionState";

/**
 * Explicit Valid State Transitions for AI Coach Session Flow
 */
export const ALLOWED_SESSION_TRANSITIONS: Record<
  CoachSessionState,
  CoachSessionState[]
> = {
  idle: ["guide_video", "get_ready", "camera_check", "countdown", "coaching"],
  guide_video: ["get_ready", "countdown", "idle", "camera_check"],
  get_ready: ["camera_check", "detecting", "hold_still", "coaching", "idle"],
  camera_check: ["hold_still", "get_ready", "countdown", "coaching", "idle"],
  hold_still: ["calibrating", "camera_check", "get_ready", "countdown", "coaching", "idle"],
  calibrating: ["coaching", "hold_still", "camera_check", "get_ready", "idle"],
  coaching: [
    "correcting",
    "holding",
    "pose_review",
    "user_choice",
    "completed",
    "get_ready",
    "idle",
  ],
  correcting: [
    "coaching",
    "holding",
    "pose_review",
    "user_choice",
    "completed",
    "get_ready",
    "idle",
  ],
  holding: [
    "coaching",
    "correcting",
    "pose_review",
    "user_choice",
    "completed",
    "get_ready",
    "idle",
  ],
  pose_review: [
    "user_choice",
    "get_ready",
    "guide_video",
    "coaching",
    "completed",
    "idle",
  ],
  user_choice: [
    "get_ready", // Next Pose
    "guide_video", // Next Pose with guide video
    "coaching", // Stay Here
    "completed", // End Session
    "idle",
  ],
  completed: ["idle", "get_ready", "guide_video", "session_completed"],
  session_completed: ["idle", "get_ready", "guide_video"],

  // Legacy state transition support
  countdown: ["hold_still", "camera_check", "idle", "get_ready", "coaching"],
  detecting: ["camera_check", "hold_still", "analyzing", "coaching", "idle"],
  analyzing: ["coaching", "correcting", "detecting", "idle"],
  transition: ["get_ready", "guide_video", "idle", "completed"],
};

/**
 * Pure helper function to check if a state transition is legal
 */
export function canTransitionSession(
  from: CoachSessionState,
  to: CoachSessionState,
): boolean {
  if (from === to) return true;
  const allowed = ALLOWED_SESSION_TRANSITIONS[from];
  return Boolean(allowed && allowed.includes(to));
}

/**
 * SessionStateMachine
 *
 * Enforces explicit transition rules for the session flow layer.
 */
export class SessionStateMachine {
  private currentState: CoachSessionState;
  private onTransitionCallback?: (
    from: CoachSessionState,
    to: CoachSessionState,
  ) => void;

  constructor(
    initialState: CoachSessionState = "idle",
    onTransition?: (from: CoachSessionState, to: CoachSessionState) => void,
  ) {
    this.currentState = initialState;
    this.onTransitionCallback = onTransition;
  }

  public getState(): CoachSessionState {
    return this.currentState;
  }

  public canTransitionTo(target: CoachSessionState): boolean {
    return canTransitionSession(this.currentState, target);
  }

  public transition(target: CoachSessionState): boolean {
    if (this.currentState === target) {
      return true;
    }

    if (!canTransitionSession(this.currentState, target)) {
      console.warn(
        `[SessionStateMachine] Illegal state transition attempted: ${this.currentState} -> ${target}`,
      );
      return false;
    }

    const previous = this.currentState;
    this.currentState = target;
    this.onTransitionCallback?.(previous, target);
    return true;
  }

  public reset(toState: CoachSessionState = "idle"): void {
    const previous = this.currentState;
    this.currentState = toState;
    if (previous !== toState) {
      this.onTransitionCallback?.(previous, toState);
    }
  }
}
