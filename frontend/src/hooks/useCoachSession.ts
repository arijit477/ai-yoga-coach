import { useCallback, useEffect, useRef, useState } from "react";

import type { CoachSessionState } from "../features/ai-coach/types/CoachSessionState";
import type { PoseEvaluation } from "../features/ai-coach/types/pose-rules";
import type { PoseLandmarks } from "../features/ai-coach/types/landmarks";
import { PoseStabilityDetector } from "../features/ai-coach/analysis/PoseStabilityDetector";

interface UseCoachSessionOptions {
  evaluation: PoseEvaluation | null;
  landmarks?: PoseLandmarks | null;
  isInitialized: boolean;
  hasPose: boolean;
  targetHoldSeconds?: number;
  currentAsanaIndex: number;
  totalAsanas: number;
  hasGuideVideo?: boolean;
  instructionsCount?: number;
  onAsanaComplete?: (index: number) => void;
  onAdvanceAsana?: (nextIndex: number) => void;
  onSessionComplete?: () => void;
  onCalibrationPrompt?: (warning?: string) => void;
  onCalibrationComplete?: () => void;
  onStepChange?: (stepIndex: number) => void;
  onPoseReviewReady?: (score: number) => void;
}

interface UseCoachSessionResult {
  state: CoachSessionState;
  countdown: number | null;
  holdTime: number;
  targetHoldSeconds: number;
  transitionCountdown: number | null;
  calibrationProgress: number;
  visibilityWarning: string | null;
  currentStepIndex: number;
  startSession: (options?: { skipVideo?: boolean }) => void;
  skipGuideVideo: () => void;
  finishGuideVideo: () => void;
  stopSession: () => void;
  resetSession: () => void;
  doItAgain: () => void;
  moveToNextAsana: () => void;
  skipTransition: () => void;
}

const COUNTDOWN_SECONDS = 3;
const DEFAULT_REQUIRED_HOLD_SECONDS = 5;
const COMPLETION_ACCURACY_THRESHOLD = 75;

export function useCoachSession({
  evaluation,
  landmarks,
  isInitialized: _isInitialized,
  hasPose,
  targetHoldSeconds = DEFAULT_REQUIRED_HOLD_SECONDS,
  currentAsanaIndex,
  totalAsanas,
  hasGuideVideo = false,
  instructionsCount = 1,
  onAsanaComplete,
  onAdvanceAsana,
  onSessionComplete,
  onCalibrationPrompt,
  onCalibrationComplete,
  onStepChange,
  onPoseReviewReady,
}: UseCoachSessionOptions): UseCoachSessionResult {
  const [state, setState] = useState<CoachSessionState>("idle");
  const [countdown, setCountdown] = useState<number | null>(null);
  const [holdTime, setHoldTime] = useState(0);
  const [transitionCountdown, setTransitionCountdown] = useState<number | null>(null);
  const [calibrationProgress, setCalibrationProgress] = useState(0);
  const [visibilityWarning, setVisibilityWarning] = useState<string | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const countdownTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const holdTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const transitionTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stabilityDetectorRef = useRef<PoseStabilityDetector>(new PoseStabilityDetector(25, 0.035));
  const hasPromptedCalibrationRef = useRef(false);
  const lastPromptedWarningRef = useRef<string | null>(null);

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
  }, []);

  const resetSession = useCallback(() => {
    clearTimers();
    stabilityDetectorRef.current.reset();
    setState("idle");
    setCountdown(null);
    setHoldTime(0);
    setTransitionCountdown(null);
    setCalibrationProgress(0);
    setVisibilityWarning(null);
    setCurrentStepIndex(0);
    hasPromptedCalibrationRef.current = false;
    lastPromptedWarningRef.current = null;
  }, [clearTimers]);

  const stopSession = useCallback(() => {
    resetSession();
  }, [resetSession]);

  /**
   * Begins Hold Still / Calibration stage after countdown.
   */
  const startHoldStillCalibration = useCallback(() => {
    clearTimers();
    stabilityDetectorRef.current.reset();
    setCalibrationProgress(0);
    setVisibilityWarning(null);
    hasPromptedCalibrationRef.current = false;
    lastPromptedWarningRef.current = null;
    setState("hold_still");
  }, [clearTimers]);

  /**
   * Countdown: 3, 2, 1 before Hold Still calibration.
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
        startHoldStillCalibration();
        return;
      }

      setCountdown(remaining);
    }, 1000);
  }, [clearTimers, startHoldStillCalibration]);

  /**
   * Starts session: checks for guide video first, else proceeds to countdown.
   */
  const startSession = useCallback(
    (options?: { skipVideo?: boolean }) => {
      if (hasGuideVideo && !options?.skipVideo) {
        setState("guide_video");
      } else {
        startCountdown();
      }
    },
    [hasGuideVideo, startCountdown],
  );

  const skipGuideVideo = useCallback(() => {
    startCountdown();
  }, [startCountdown]);

  const finishGuideVideo = useCallback(() => {
    startCountdown();
  }, [startCountdown]);

  /**
   * Real-time Hold Still / Calibration motion monitoring
   */
  useEffect(() => {
    if (state !== "hold_still" && state !== "calibrating") {
      return;
    }

    const stability = stabilityDetectorRef.current.evaluate(landmarks ?? null);
    setVisibilityWarning(stability.visibilityWarning);
    setCalibrationProgress(stability.stabilityProgress);

    // If there is a visibility warning (e.g. "Move back so I can see your full body.")
    if (stability.visibilityWarning) {
      if (lastPromptedWarningRef.current !== stability.visibilityWarning) {
        lastPromptedWarningRef.current = stability.visibilityWarning;
        onCalibrationPrompt?.(stability.visibilityWarning);
      }
    } else {
      // Body is visible; prompt to hold still if not yet prompted or after moving back into view
      if (!hasPromptedCalibrationRef.current || lastPromptedWarningRef.current !== null) {
        hasPromptedCalibrationRef.current = true;
        lastPromptedWarningRef.current = null;
        onCalibrationPrompt?.("Hold still for a moment while I check your position.");
      }
    }

    if (stability.stabilityProgress > 10 && state === "hold_still") {
      setState("calibrating");
    }

    if (stability.isStable) {
      onCalibrationComplete?.();
      // Calibration completed! Transition to active coaching
      setState("coaching");
      setCurrentStepIndex(0);
      onStepChange?.(0);
    }
  }, [landmarks, state, onCalibrationPrompt, onCalibrationComplete, onStepChange]);

  /**
   * Step-by-step guidance progression
   */
  useEffect(() => {
    if (state !== "coaching") return;

    // Advance steps if instructions exist and good progress is being made
    const maxSteps = Math.max(1, instructionsCount);
    if (currentStepIndex < maxSteps - 1) {
      // If user achieves good form or high score on this step, advance step
      if (evaluation && evaluation.score >= 60) {
        const stepTimer = setTimeout(() => {
          setCurrentStepIndex((prev) => {
            const next = Math.min(maxSteps - 1, prev + 1);
            if (next !== prev) {
              onStepChange?.(next);
            }
            return next;
          });
        }, 1500);
        return () => clearTimeout(stepTimer);
      }
    }
  }, [state, evaluation, instructionsCount, currentStepIndex, onStepChange]);

  /**
   * Posture evaluation state transitions during active practice
   */
  useEffect(() => {
    if (
      state !== "coaching" &&
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

    // High accuracy alignment reached
    setState("holding");
  }, [evaluation, hasPose, state]);

  /**
   * Hold timer count-up and 75% completion decision
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

          const finalScore = evaluation?.score ?? 80;

          // >= 75% accuracy: enter pose review choice dialog (NO silent automatic advance)
          if (finalScore >= COMPLETION_ACCURACY_THRESHOLD) {
            setState("pose_review");
            onAsanaComplete?.(currentAsanaIndex);
            onPoseReviewReady?.(finalScore);
          } else {
            // Under 75%: prompt correction
            setState("correcting");
          }

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
  }, [
    state,
    targetHoldSeconds,
    evaluation?.score,
    currentAsanaIndex,
    onAsanaComplete,
    onPoseReviewReady,
  ]);

  /**
   * Action: "Do It Again" -> restarts current asana directly at Get Ready / Hold Still (no guide video replay)
   */
  const doItAgain = useCallback(() => {
    clearTimers();
    stabilityDetectorRef.current.reset();
    setHoldTime(0);
    setCalibrationProgress(0);
    setVisibilityWarning(null);
    setCurrentStepIndex(0);
    startCountdown();
  }, [clearTimers, startCountdown]);

  /**
   * Action: "Move to Next Asana"
   */
  const moveToNextAsana = useCallback(() => {
    clearTimers();
    const isLastAsana = currentAsanaIndex + 1 >= totalAsanas;

    if (isLastAsana) {
      setState("session_completed");
      onSessionComplete?.();
      return;
    }

    // Advance to next asana and trigger fresh flow with guide video
    onAdvanceAsana?.(currentAsanaIndex + 1);
    setHoldTime(0);
    setCurrentStepIndex(0);
    // Move to guide video if available or countdown
    if (hasGuideVideo) {
      setState("guide_video");
    } else {
      startCountdown();
    }
  }, [
    clearTimers,
    currentAsanaIndex,
    totalAsanas,
    hasGuideVideo,
    onSessionComplete,
    onAdvanceAsana,
    startCountdown,
  ]);

  const skipTransition = useCallback(() => {
    moveToNextAsana();
  }, [moveToNextAsana]);

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
    calibrationProgress,
    visibilityWarning,
    currentStepIndex,
    startSession,
    skipGuideVideo,
    finishGuideVideo,
    stopSession,
    resetSession,
    doItAgain,
    moveToNextAsana,
    skipTransition,
  };
}