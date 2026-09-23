import { useCallback, useEffect, useRef, useState } from "react";

import type { CoachSessionState } from "../features/ai-coach/types/CoachSessionState";
import type { PoseEvaluationResult } from "../features/ai-coach/types/pose-rules";
import type { PoseLandmarks } from "../features/ai-coach/types/landmarks";
import { CalibrationTracker, type CalibrationResult } from "../features/ai-coach/motion/CalibrationTracker";

interface UseCoachSessionOptions {
  evaluation: PoseEvaluationResult | null;
  landmarks?: PoseLandmarks | null;
  isInitialized: boolean;
  hasPose: boolean;
  targetHoldSeconds?: number;
  currentAsanaIndex: number;
  totalAsanas: number;
  hasGuideVideo?: boolean;
  instructionsCount?: number;
  onAsanaComplete?: (index: number, score: number) => void;
  onAdvanceAsana?: (nextIndex: number) => void;
  onSessionComplete?: () => void;
  onCalibrationPrompt?: (warning?: string, reason?: string) => void;
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
  calibrationResult: CalibrationResult | null;
  currentStepIndex: number;
  startSession: (options?: { skipVideo?: boolean }) => void;
  skipGuideVideo: () => void;
  finishGuideVideo: () => void;
  stopSession: () => void;
  resetSession: () => void;
  doItAgain: () => void;
  moveToNextAsana: () => void;
  skipTransition: () => void;
  stayHere: () => void;
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
  const [calibrationResult, setCalibrationResult] = useState<CalibrationResult | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const countdownTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const holdTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const transitionTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  
  const calibrationTrackerRef = useRef<CalibrationTracker | null>(null);
  if (!calibrationTrackerRef.current) {
    calibrationTrackerRef.current = new CalibrationTracker((result) => {
      setCalibrationResult(result);
      if (result.state === "CALIBRATION_FAILED" && result.reason) {
        setVisibilityWarning(result.reason);
      } else if (result.state === "CALIBRATION_STABLE") {
        setCalibrationProgress(50);
        setVisibilityWarning(null);
      } else if (result.state === "CALIBRATION_COMPLETE") {
        setCalibrationProgress(100);
        setVisibilityWarning(null);
      } else {
         setCalibrationProgress(0);
         setVisibilityWarning(null);
      }
    });
  }

  const hasPromptedCalibrationRef = useRef(false);
  const lastPromptedWarningRef = useRef<string | null>(null);
  const hasCompletedCurrentAsanaRef = useRef(false);
  const holdScoresRef = useRef<number[]>([]);

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
    calibrationTrackerRef.current?.reset();
    setState("idle");
    setCountdown(null);
    setHoldTime(0);
    setTransitionCountdown(null);
    setCalibrationProgress(0);
    setVisibilityWarning(null);
    setCalibrationResult(null);
    setCurrentStepIndex(0);
    hasPromptedCalibrationRef.current = false;
    lastPromptedWarningRef.current = null;
    hasCompletedCurrentAsanaRef.current = false;
    holdScoresRef.current = [];
  }, [clearTimers]);

  const stopSession = useCallback(() => {
    resetSession();
  }, [resetSession]);

  /**
   * Begins Hold Still / Calibration stage after countdown.
   */
  const startHoldStillCalibration = useCallback(() => {
    clearTimers();
    calibrationTrackerRef.current?.reset();
    setCalibrationProgress(0);
    setVisibilityWarning(null);
    setCalibrationResult(null);
    hasPromptedCalibrationRef.current = false;
    lastPromptedWarningRef.current = null;
    
    // Skip calibration directly to coaching to keep flow simple and responsive
    setState("coaching");
    setCurrentStepIndex(0);
    onStepChange?.(0);
  }, [clearTimers, onStepChange]);

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

    calibrationTrackerRef.current?.updatePoseDetection(landmarks ?? null);

    if (calibrationResult) {
      if (calibrationResult.state === "CALIBRATION_FAILED" && calibrationResult.reason) {
        if (lastPromptedWarningRef.current !== calibrationResult.reason) {
          lastPromptedWarningRef.current = calibrationResult.reason;
          onCalibrationPrompt?.(calibrationResult.reason, calibrationResult.reason); // pass reason string
        }
      } else if (calibrationResult.state === "CALIBRATION_STARTED" || calibrationResult.state === "CALIBRATION_STABLE") {
        if (!hasPromptedCalibrationRef.current || lastPromptedWarningRef.current !== null) {
          hasPromptedCalibrationRef.current = true;
          lastPromptedWarningRef.current = null;
          onCalibrationPrompt?.("Hold still for a moment while I check your position.");
        }
      }

      if (calibrationResult.state === "CALIBRATION_STABLE" && state === "hold_still") {
        setState("calibrating");
      }

      if (calibrationResult.state === "CALIBRATION_COMPLETE") {
        onCalibrationComplete?.();
        // Calibration completed! Transition to active coaching
        setState("coaching");
        setCurrentStepIndex(0);
        onStepChange?.(0);
      }
    }
  }, [landmarks, state, calibrationResult, onCalibrationPrompt, onCalibrationComplete, onStepChange]);

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

  const hasPoseLostSinceRef = useRef<number | null>(null);
  const highAccuracySinceRef = useRef<number | null>(null);

  // Reset completion flag and hold scores when moving to a new asana
  useEffect(() => {
    hasCompletedCurrentAsanaRef.current = false;
    holdScoresRef.current = [];
    setHoldTime(0);
  }, [currentAsanaIndex]);

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
      hasPoseLostSinceRef.current = null;
      highAccuracySinceRef.current = null;
      return;
    }

    if (!hasPose) {
      highAccuracySinceRef.current = null;
      if (hasPoseLostSinceRef.current === null) {
        hasPoseLostSinceRef.current = Date.now();
      } else if (Date.now() - hasPoseLostSinceRef.current > 7000) { // 7 second grace period
        setState("detecting");
        setHoldTime(0);
        holdScoresRef.current = [];
      }
      return;
    } else {
      hasPoseLostSinceRef.current = null;
    }

    if (!evaluation) {
      highAccuracySinceRef.current = null;
      setState("analyzing");
      setHoldTime(0);
      holdScoresRef.current = [];
      return;
    }

    // High accuracy alignment reached (>= 75% threshold)
    if (evaluation.score >= COMPLETION_ACCURACY_THRESHOLD) {
      if (highAccuracySinceRef.current === null) {
        highAccuracySinceRef.current = Date.now();
      }

      // Complete the asana immediately once alignment is held steadily for 500ms
      if (Date.now() - highAccuracySinceRef.current >= 500) {
        if (!hasCompletedCurrentAsanaRef.current) {
          hasCompletedCurrentAsanaRef.current = true;
          const finalScore = Math.max(75, Math.min(100, Math.round(evaluation.score)));
          onAsanaComplete?.(currentAsanaIndex, finalScore);
          onPoseReviewReady?.(finalScore);
          setState("completed");
        }
      } else {
        if (state !== "coaching") {
          setState("coaching");
        }
      }
    } else {
      highAccuracySinceRef.current = null;
      setState("correcting");
    }
  }, [evaluation, hasPose, state, currentAsanaIndex]);

  /**
   * Hold timer count-up: Once targetHoldSeconds is completed, calculate final average hold accuracy
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
        const next = Math.round((previous + 0.1) * 10) / 10;

        if (next >= targetHoldSeconds) {
          if (holdTimerRef.current) {
            clearInterval(holdTimerRef.current);
            holdTimerRef.current = null;
          }

          // Compute genuine hold accuracy across all collected frames during the hold
          const samples = holdScoresRef.current;
          const finalScore =
            samples.length > 0
              ? Math.max(50, Math.min(100, Math.round(samples.reduce((sum, s) => sum + s, 0) / samples.length)))
              : Math.round(evaluation?.score ?? 80);

          hasCompletedCurrentAsanaRef.current = true;
          onAsanaComplete?.(currentAsanaIndex, finalScore);
          onPoseReviewReady?.(finalScore);

          // Auto-advance to the next asana instead of requiring manual button click
          moveToNextAsana();

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
    calibrationTrackerRef.current?.reset();
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

  const stayHere = useCallback(() => {
    setState("coaching");
  }, []);

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
    calibrationResult,
    currentStepIndex,
    startSession,
    skipGuideVideo,
    finishGuideVideo,
    stopSession,
    resetSession,
    doItAgain,
    moveToNextAsana,
    skipTransition,
    stayHere,
  };
}