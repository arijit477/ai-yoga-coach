import { useCallback, useEffect, useRef, useState } from "react";

import type { CoachSessionState } from "../features/ai-coach/types/CoachSessionState";
import type { PoseEvaluation } from "../features/ai-coach/types/pose-rules";

interface UseCoachSessionOptions {
  evaluation: PoseEvaluation | null;
  isInitialized: boolean;
  hasPose: boolean;
  targetHoldSeconds?: number;
  currentAsanaIndex: number;
  totalAsanas: number;
  transitionSeconds?: number;
  onAsanaComplete?: (index: number) => void;
  onAdvanceAsana?: (nextIndex: number) => void;
  onSessionComplete?: () => void;
}

interface UseCoachSessionResult {
  state: CoachSessionState;
  countdown: number | null;
  holdTime: number;
  targetHoldSeconds: number;
  transitionCountdown: number | null;
  startSession: () => void;
  stopSession: () => void;
  resetSession: () => void;
  skipTransition: () => void;
}

const COUNTDOWN_SECONDS = 3;
const DEFAULT_REQUIRED_HOLD_SECONDS = 5;
const DEFAULT_TRANSITION_SECONDS = 3;

export function useCoachSession({
  evaluation,
  isInitialized,
  hasPose,
  targetHoldSeconds = DEFAULT_REQUIRED_HOLD_SECONDS,
  currentAsanaIndex,
  totalAsanas,
  transitionSeconds = DEFAULT_TRANSITION_SECONDS,
  onAsanaComplete,
  onAdvanceAsana,
  onSessionComplete,
}: UseCoachSessionOptions): UseCoachSessionResult {
  const [state, setState] = useState<CoachSessionState>("idle");
  const [countdown, setCountdown] = useState<number | null>(null);
  const [holdTime, setHoldTime] = useState(0);
  const [transitionCountdown, setTransitionCountdown] = useState<number | null>(null);

  const countdownTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const holdTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const transitionTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const autoTransitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }
    if (holdTimerRef.current) {
      clearInterval(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    if (transitionTimerRef.current) {
      clearInterval(transitionTimerRef.current);
      transitionTimerRef.current = null;
    }
    if (autoTransitionTimeoutRef.current) {
      clearTimeout(autoTransitionTimeoutRef.current);
      autoTransitionTimeoutRef.current = null;
    }
  }, []);

  const resetSession = useCallback(() => {
    clearTimers();
    setState("idle");
    setCountdown(null);
    setHoldTime(0);
    setTransitionCountdown(null);
  }, [clearTimers]);

  const stopSession = useCallback(() => {
    clearTimers();
    setState("idle");
    setCountdown(null);
    setHoldTime(0);
    setTransitionCountdown(null);
  }, [clearTimers]);

  /**
   * Starts the countdown for an asana (either Asana 1 or upon advancing).
   */
  const startCountdown = useCallback(() => {
    clearTimers();
    setHoldTime(0);
    setTransitionCountdown(null);
    setCountdown(COUNTDOWN_SECONDS);
    setState("countdown");

    let remaining = COUNTDOWN_SECONDS;

    countdownTimerRef.current = setInterval(() => {
      remaining -= 1;

      if (remaining <= 0) {
        if (countdownTimerRef.current) {
          clearInterval(countdownTimerRef.current);
          countdownTimerRef.current = null;
        }

        setCountdown(null);
        setState("detecting");
        return;
      }

      setCountdown(remaining);
    }, 1000);
  }, [clearTimers]);

  const startSession = useCallback(() => {
    if (!isInitialized) {
      return;
    }
    startCountdown();
  }, [isInitialized, startCountdown]);

  /**
   * Transitions from a completed asana to the next asana or ends session.
   */
  const beginTransition = useCallback(() => {
    const isLastAsana = currentAsanaIndex + 1 >= totalAsanas;

    if (isLastAsana) {
      // Entire multi-asana session complete!
      autoTransitionTimeoutRef.current = setTimeout(() => {
        setState("session_completed");
        onSessionComplete?.();
      }, 1500);
      return;
    }

    // Move into transition countdown
    setState("transition");
    setTransitionCountdown(transitionSeconds);

    let remaining = transitionSeconds;

    transitionTimerRef.current = setInterval(() => {
      remaining -= 1;

      if (remaining <= 0) {
        if (transitionTimerRef.current) {
          clearInterval(transitionTimerRef.current);
          transitionTimerRef.current = null;
        }

        setTransitionCountdown(null);
        // Advance to next asana index
        onAdvanceAsana?.(currentAsanaIndex + 1);
        // Start countdown for next asana
        startCountdown();
        return;
      }

      setTransitionCountdown(remaining);
    }, 1000);
  }, [
    currentAsanaIndex,
    totalAsanas,
    transitionSeconds,
    onSessionComplete,
    onAdvanceAsana,
    startCountdown,
  ]);

  /**
   * Deliberate action to skip remaining transition waiting time.
   * Only allowed during "transition" state.
   */
  const skipTransition = useCallback(() => {
    if (state !== "transition") return;

    if (transitionTimerRef.current) {
      clearInterval(transitionTimerRef.current);
      transitionTimerRef.current = null;
    }

    setTransitionCountdown(null);
    onAdvanceAsana?.(currentAsanaIndex + 1);
    startCountdown();
  }, [state, currentAsanaIndex, onAdvanceAsana, startCountdown]);

  /*
   * Pose detection & evaluation state machine during active asana.
   */
  useEffect(() => {
    if (
      state !== "detecting" &&
      state !== "analyzing" &&
      state !== "correcting" &&
      state !== "holding"
    ) {
      return;
    }

    if (!hasPose) {
      setState("detecting");
      setHoldTime(0);
      return;
    }

    if (!evaluation) {
      setState("analyzing");
      setHoldTime(0);
      return;
    }

    if (evaluation.issues.length > 0) {
      setState("correcting");
      setHoldTime(0);
      return;
    }

    setState("holding");
  }, [evaluation, hasPose, state]);

  /*
   * Count how long good form is maintained for the current asana.
   */
  useEffect(() => {
    if (state !== "holding") {
      if (holdTimerRef.current) {
        clearInterval(holdTimerRef.current);
        holdTimerRef.current = null;
      }
      return;
    }

    if (holdTimerRef.current) {
      return;
    }

    holdTimerRef.current = setInterval(() => {
      setHoldTime((previous) => {
        const next = previous + 0.1;

        if (next >= targetHoldSeconds) {
          if (holdTimerRef.current) {
            clearInterval(holdTimerRef.current);
            holdTimerRef.current = null;
          }

          setState("completed");
          onAsanaComplete?.(currentAsanaIndex);

          // Give user a brief celebration view, then transition
          autoTransitionTimeoutRef.current = setTimeout(() => {
            beginTransition();
          }, 1200);

          return targetHoldSeconds;
        }

        return next;
      });
    }, 100);

    return () => {
      if (holdTimerRef.current) {
        clearInterval(holdTimerRef.current);
        holdTimerRef.current = null;
      }
    };
  }, [state, targetHoldSeconds, currentAsanaIndex, onAsanaComplete, beginTransition]);

  /*
   * Cleanup on unmount.
   */
  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, [clearTimers]);

  return {
    state,
    countdown,
    holdTime,
    targetHoldSeconds,
    transitionCountdown,
    startSession,
    stopSession,
    resetSession,
    skipTransition,
  };
}