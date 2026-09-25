import { useCallback, useEffect, useRef, useState } from "react";

import type { CoachSessionState } from "../features/ai-coach/types/CoachSessionState";
import type { PoseEvaluation, PoseEvaluationResult } from "../features/ai-coach/types/pose-rules";
import type { PoseLandmarks } from "../features/ai-coach/types/landmarks";
import { CalibrationTracker, type CalibrationResult } from "../features/ai-coach/motion/CalibrationTracker";
import { ScoreBuffer } from "../features/ai-coach/analysis/ScoreAggregator";
import { evaluateCameraReadiness } from "../features/ai-coach/motion/CameraReadinessEvaluator";
import { SessionStateMachine } from "../features/ai-coach/session/SessionStateMachine";
import {
  CAMERA_GUIDANCE_MESSAGES,
  type CameraReadinessResult,
  type BodyRegion,
} from "../features/ai-coach/types/camera";

interface UseCoachSessionOptions {
  evaluation: PoseEvaluation | PoseEvaluationResult | null;
  landmarks?: PoseLandmarks | null;
  requiredLandmarks?: number[];
  requiredRegions?: BodyRegion[];
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
  cameraReadiness: CameraReadinessResult;
  cameraGuidanceMessage: string;
  currentStepIndex: number;
  startSession: (options?: { skipVideo?: boolean }) => void;
  skipGuideVideo: () => void;
  finishGuideVideo: () => void;
  stopSession: () => void;
  resetSession: () => void;
  resetCurrentAsana: () => void;
  resetCamera: () => void;
  doItAgain: () => void;
  moveToNextAsana: () => void;
  skipTransition: () => void;
  stayHere: () => void;
  endSession: () => void;
}

const GET_READY_SECONDS = 3;
const HOLD_STILL_SECONDS = 2;
const DEFAULT_REQUIRED_HOLD_SECONDS = 5;
const COMPLETION_ACCURACY_THRESHOLD = 75;

export function useCoachSession({
  evaluation,
  landmarks,
  requiredLandmarks,
  requiredRegions,
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

  const [cameraReadiness, setCameraReadiness] = useState<CameraReadinessResult>(() =>
    evaluateCameraReadiness(landmarks, {
      hardwareStatus: hasPose ? "ready" : "disabled",
      requiredLandmarks,
      requiredRegions,
    })
  );

  const stateMachineRef = useRef<SessionStateMachine>(
    new SessionStateMachine("idle", (_from, to) => {
      setState(to);
    })
  );

  const countdownTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const holdTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const transitionTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const scoreBufferRef = useRef<ScoreBuffer>(new ScoreBuffer());
  
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

  /**
   * Safe State Machine Transition helper
   */
  const transitionTo = useCallback((target: CoachSessionState): boolean => {
    return stateMachineRef.current.transition(target);
  }, []);

  /**
   * 16. SESSION RESET — Clean separation of reset boundaries:
   * resetCurrentAsana(): resets asana-specific score, buffer, completion, hold, calibration
   */
  const resetCurrentAsana = useCallback(() => {
    clearTimers();
    calibrationTrackerRef.current?.reset();
    scoreBufferRef.current.reset();
    hasCompletedCurrentAsanaRef.current = false;
    setHoldTime(0);
    setCalibrationProgress(0);
    setVisibilityWarning(null);
    setCalibrationResult(null);
    setCurrentStepIndex(0);
    hasPromptedCalibrationRef.current = false;
    lastPromptedWarningRef.current = null;
    holdScoresRef.current = [];
  }, [clearTimers]);

  /**
   * resetSession(): resets session progression, timers, state -> idle
   */
  const resetSession = useCallback(() => {
    resetCurrentAsana();
    stateMachineRef.current.reset("idle");
    setCountdown(null);
    setTransitionCountdown(null);
  }, [resetCurrentAsana]);

  /**
   * Helper to deduplicate camera readiness results
   */
  const areReadinessResultsEqual = (
    a: CameraReadinessResult | null | undefined,
    b: CameraReadinessResult | null | undefined
  ): boolean => {
    if (a === b) return true;
    if (!a || !b) return false;
    if (a.ready !== b.ready || a.state !== b.state || a.guidance !== b.guidance) return false;
    if (Math.round(a.confidence * 10) !== Math.round(b.confidence * 10)) return false;
    if (a.missing.length !== b.missing.length) return false;
    for (let i = 0; i < a.missing.length; i++) {
      if (a.missing[i] !== b.missing[i]) return false;
    }
    return true;
  };

  const prevReadinessRef = useRef<CameraReadinessResult>(cameraReadiness);

  /**
   * resetCamera(): preserves session/asana, resets camera readiness state
   */
  const resetCamera = useCallback(() => {
    const newReadiness = evaluateCameraReadiness(null, { hardwareStatus: "disabled" });
    if (!areReadinessResultsEqual(prevReadinessRef.current, newReadiness)) {
      prevReadinessRef.current = newReadiness;
      setCameraReadiness(newReadiness);
    }
  }, []);

  const stopSession = useCallback(() => {
    resetSession();
  }, [resetSession]);

  /**
   * Evaluate Camera Readiness on landmark update — deduplicated to avoid unnecessary re-renders
   */
  useEffect(() => {
    const readiness = evaluateCameraReadiness(landmarks, {
      hardwareStatus: hasPose ? "ready" : "starting",
      requiredLandmarks,
      requiredRegions,
    });
    if (!areReadinessResultsEqual(prevReadinessRef.current, readiness)) {
      prevReadinessRef.current = readiness;
      setCameraReadiness(readiness);
    }
  }, [landmarks, hasPose, requiredLandmarks, requiredRegions]);

  /**
   * 10. CALIBRATING Stage
   */
  const startCalibrating = useCallback(() => {
    clearTimers();
    calibrationTrackerRef.current?.reset();
    setCalibrationProgress(0);
    setVisibilityWarning(null);
    hasPromptedCalibrationRef.current = false;
    lastPromptedWarningRef.current = null;
    transitionTo("calibrating");
  }, [clearTimers, transitionTo]);

  /**
   * 9. HOLD STILL Stage: 2s stability confirmation before calibration
   */
  const startHoldStill = useCallback(() => {
    clearTimers();
    setCountdown(HOLD_STILL_SECONDS);
    transitionTo("hold_still");
  }, [clearTimers, transitionTo]);

  useEffect(() => {
    if (state !== "hold_still") return;

    setCountdown(HOLD_STILL_SECONDS);

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          startCalibrating();
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [state, startCalibrating]);

  /**
   * 8. CAMERA CHECK Stage: Checks camera readiness before allowing hold still
   */
  const startCameraCheck = useCallback(() => {
    clearTimers();
    setCountdown(null);
    transitionTo("camera_check");
  }, [clearTimers, transitionTo]);

  /**
   * 7. GET READY Stage: 3s preparation countdown
   */
  const startGetReady = useCallback(() => {
    clearTimers();
    resetCurrentAsana();
    setCountdown(GET_READY_SECONDS);
    transitionTo("get_ready");
  }, [clearTimers, resetCurrentAsana, transitionTo]);

  useEffect(() => {
    if (state !== "get_ready" && state !== "countdown") return;

    setCountdown(GET_READY_SECONDS);

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          startCameraCheck();
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [state, startCameraCheck]);

  /**
   * 6. GUIDE VIDEO / Session Startup
   */
  const startSession = useCallback(
    (options?: { skipVideo?: boolean }) => {
      resetSession();
      if (hasGuideVideo && !options?.skipVideo) {
        transitionTo("guide_video");
      } else {
        startGetReady();
      }
    },
    [hasGuideVideo, resetSession, transitionTo, startGetReady]
  );

  const skipGuideVideo = useCallback(() => {
    startGetReady();
  }, [startGetReady]);

  const finishGuideVideo = useCallback(() => {
    startGetReady();
  }, [startGetReady]);

  /**
   * Camera Check Flow: Transition to hold_still once camera readiness is satisfied
   */
  useEffect(() => {
    if (state !== "camera_check") return;

    if (cameraReadiness.ready) {
      startHoldStill();
    }
  }, [state, cameraReadiness.ready, startHoldStill]);

  /**
   * Hold Still Flow: If user moves or visibility is lost during hold_still, reset countdown
   */
  useEffect(() => {
    if (state !== "hold_still") return;

    if (!cameraReadiness.ready) {
      // Pause/reset hold still countdown if readiness lost
      setCountdown(HOLD_STILL_SECONDS);
    }
  }, [state, cameraReadiness.ready]);

  /**
   * Calibration tracking in calibrating state
   */
  useEffect(() => {
    if (state !== "calibrating") return;

    if (landmarks && landmarks.length >= 33) {
      calibrationTrackerRef.current?.updatePoseDetection(landmarks);
    }

    if (calibrationResult) {
      if (
        calibrationResult.state === "CALIBRATION_FAILED" &&
        calibrationResult.reason
      ) {
        if (lastPromptedWarningRef.current !== calibrationResult.reason) {
          lastPromptedWarningRef.current = calibrationResult.reason;
          onCalibrationPrompt?.(calibrationResult.reason);
        }
      } else if (
        calibrationResult.state === "CALIBRATION_STARTED" ||
        calibrationResult.state === "CALIBRATION_STABLE"
      ) {
        if (
          !hasPromptedCalibrationRef.current ||
          lastPromptedWarningRef.current !== null
        ) {
          hasPromptedCalibrationRef.current = true;
          lastPromptedWarningRef.current = null;
          onCalibrationPrompt?.("Hold still for a moment while I check your position.");
        }
      }

      if (calibrationResult.state === "CALIBRATION_COMPLETE") {
        onCalibrationComplete?.();
        transitionTo("coaching");
        setCurrentStepIndex(0);
        onStepChange?.(0);
      }
    }
  }, [
    landmarks,
    state,
    calibrationResult,
    onCalibrationPrompt,
    onCalibrationComplete,
    onStepChange,
    transitionTo,
  ]);

  /**
   * Step-by-step guidance progression
   */
  useEffect(() => {
    if (state !== "coaching") return;

    const maxSteps = Math.max(1, instructionsCount);
    if (currentStepIndex < maxSteps - 1) {
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

  // Reset completion flag and buffers when moving to a new asana index
  useEffect(() => {
    resetCurrentAsana();
  }, [currentAsanaIndex, resetCurrentAsana]);

  /**
   * 11. Coaching, 12. Correcting, 13. Holding, and 14. Completion
   */
  useEffect(() => {
    if (
      state !== "coaching" &&
      state !== "correcting" &&
      state !== "holding" &&
      state !== "camera_check"
    ) {
      hasPoseLostSinceRef.current = null;
      highAccuracySinceRef.current = null;
      return;
    }

    if (!hasPose) {
      highAccuracySinceRef.current = null;
      if (hasPoseLostSinceRef.current === null) {
        hasPoseLostSinceRef.current = Date.now();
      } else if (Date.now() - hasPoseLostSinceRef.current > 7000) {
        if (state !== "camera_check") {
          transitionTo("camera_check");
        }
        setHoldTime(0);
        holdScoresRef.current = [];
      }
      return;
    } else {
      hasPoseLostSinceRef.current = null;
    }

    if (!evaluation) {
      highAccuracySinceRef.current = null;
      return;
    }

    // Push valid score to rolling buffer
    const isValidFrame = hasPose && evaluation.score >= 0;
    scoreBufferRef.current.push(evaluation.score, isValidFrame);

    if (state === "holding") {
      holdScoresRef.current.push(evaluation.score);
    }

    // 14. 75% Completion Threshold
    if (evaluation.score >= COMPLETION_ACCURACY_THRESHOLD) {
      if (highAccuracySinceRef.current === null) {
        highAccuracySinceRef.current = Date.now();
      }

      // Complete asana once held steadily for 1500ms (>= 75% threshold crossing)
      if (Date.now() - highAccuracySinceRef.current >= 1500) {
        if (!hasCompletedCurrentAsanaRef.current) {
          hasCompletedCurrentAsanaRef.current = true;
          scoreBufferRef.current.setCompleted(true);
          const finalScore =
            scoreBufferRef.current.getFinalScore() ??
            Math.max(75, Math.min(100, Math.round(evaluation.score)));
          onAsanaComplete?.(currentAsanaIndex, finalScore);
          onPoseReviewReady?.(finalScore);
          transitionTo("pose_review");
          // Immediately also support user_choice state
          setTimeout(() => {
            transitionTo("user_choice");
          }, 50);
        }
      } else {
        if (state !== "coaching" && state !== "holding") {
          transitionTo("coaching");
        }
      }
    } else {
      highAccuracySinceRef.current = null;
      // 12. Correcting state when primary issue exists
      if (evaluation.primaryIssue && state !== "correcting" && state !== "holding") {
        transitionTo("correcting");
      } else if (!evaluation.primaryIssue && state === "correcting") {
        transitionTo("coaching");
      }
    }
  }, [
    evaluation,
    hasPose,
    state,
    currentAsanaIndex,
    onAsanaComplete,
    onPoseReviewReady,
    transitionTo,
  ]);

  /**
   * 13. Optional Hold timer count-up (does NOT block 75% completion)
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

          if (!hasCompletedCurrentAsanaRef.current) {
            hasCompletedCurrentAsanaRef.current = true;
            scoreBufferRef.current.setCompleted(true);
            const samples = holdScoresRef.current;
            const finalScore =
              samples.length > 0
                ? Math.max(
                    50,
                    Math.min(
                      100,
                      Math.round(
                        samples.reduce((sum, s) => sum + s, 0) / samples.length
                      )
                    )
                  )
                : (scoreBufferRef.current.getFinalScore() ??
                  Math.round(evaluation?.score ?? 80));

            onAsanaComplete?.(currentAsanaIndex, finalScore);
            onPoseReviewReady?.(finalScore);
            transitionTo("pose_review");
            setTimeout(() => {
              transitionTo("user_choice");
            }, 50);
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
    transitionTo,
  ]);

  /**
   * 15. User Choice Actions:
   * "Do It Again" -> restarts current asana
   */
  const doItAgain = useCallback(() => {
    startGetReady();
  }, [startGetReady]);

  /**
   * "Move to Next Asana" (NEXT POSE)
   */
  const moveToNextAsana = useCallback(() => {
    clearTimers();
    resetCurrentAsana();
    const isLastAsana = currentAsanaIndex + 1 >= totalAsanas;

    if (isLastAsana) {
      transitionTo("completed");
      onSessionComplete?.();
      return;
    }

    onAdvanceAsana?.(currentAsanaIndex + 1);
    if (hasGuideVideo) {
      transitionTo("guide_video");
    } else {
      startGetReady();
    }
  }, [
    clearTimers,
    resetCurrentAsana,
    currentAsanaIndex,
    totalAsanas,
    hasGuideVideo,
    onSessionComplete,
    onAdvanceAsana,
    startGetReady,
    transitionTo,
  ]);

  const skipTransition = useCallback(() => {
    moveToNextAsana();
  }, [moveToNextAsana]);

  /**
   * "Stay Here" (STAY HERE)
   */
  const stayHere = useCallback(() => {
    transitionTo("coaching");
  }, [transitionTo]);

  /**
   * "End Session" (END SESSION)
   */
  const endSession = useCallback(() => {
    transitionTo("completed");
    onSessionComplete?.();
  }, [transitionTo, onSessionComplete]);

  /*
   * Cleanup on unmount.
   */
  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, [clearTimers]);

  const guidanceMessage =
    CAMERA_GUIDANCE_MESSAGES[cameraReadiness.guidance] || "Ready for Yoga.";

  return {
    state,
    countdown,
    holdTime,
    targetHoldSeconds,
    transitionCountdown,
    calibrationProgress,
    visibilityWarning,
    calibrationResult,
    cameraReadiness,
    cameraGuidanceMessage: guidanceMessage,
    currentStepIndex,
    startSession,
    skipGuideVideo,
    finishGuideVideo,
    stopSession,
    resetSession,
    resetCurrentAsana,
    resetCamera,
    doItAgain,
    moveToNextAsana,
    skipTransition,
    stayHere,
    endSession,
  };
}
