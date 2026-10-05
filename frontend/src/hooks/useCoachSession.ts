import { useCallback, useEffect, useRef, useState } from "react";

import type { CoachSessionState } from "../features/ai-coach/types/CoachSessionState";
import type { PoseEvaluation, PoseEvaluationResult } from "../features/ai-coach/types/pose-rules";
import type { PoseLandmarks } from "../features/ai-coach/types/landmarks";
import { CalibrationTracker, type CalibrationResult } from "../features/ai-coach/motion/CalibrationTracker";
import { ScoreBuffer } from "../features/ai-coach/analysis/ScoreAggregator";
import { evaluateCameraReadiness } from "../features/ai-coach/motion/CameraReadinessEvaluator";
import { SessionStateMachine } from "../features/ai-coach/session/SessionStateMachine";
import type { CameraReadinessState } from "../features/ai-coach/motion/CameraReadinessTracker";
import {
  CAMERA_GUIDANCE_MESSAGES,
  type CameraReadinessResult,
  type BodyRegion,
} from "../features/ai-coach/types/camera";
import { evaluatePoseFrameState } from "../features/ai-coach/analysis/PoseFrameState";

interface UseCoachSessionOptions {
  evaluation: PoseEvaluation | PoseEvaluationResult | null;
  asanaId?: string;
  landmarks?: PoseLandmarks | null;
  requiredLandmarks?: number[];
  requiredRegions?: BodyRegion[];
  isInitialized: boolean;
  hasPose: boolean;
  isCameraActive?: boolean;
  cameraState?: CameraReadinessState;
  targetHoldSeconds?: number;
  completionHoldMs?: number;
  completionAccuracyThreshold?: number;
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

export interface UseCoachSessionResult {
  state: CoachSessionState;
  practiceStarted: boolean;
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

export const GET_READY_SECONDS = 3;
export const HOLD_STILL_SECONDS = 2;
export const DEFAULT_REQUIRED_HOLD_SECONDS = 5;
export const COMPLETION_ACCURACY_THRESHOLD = 75;
export const COMPLETION_HOLD_MS = 5000;

export function useCoachSession({
  evaluation,
  asanaId,
  landmarks,
  requiredLandmarks,
  requiredRegions,
  isInitialized: _isInitialized,
  hasPose,
  isCameraActive,
  cameraState,
  targetHoldSeconds = DEFAULT_REQUIRED_HOLD_SECONDS,
  completionHoldMs = COMPLETION_HOLD_MS,
  completionAccuracyThreshold = COMPLETION_ACCURACY_THRESHOLD,
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
  const [practiceStarted, setPracticeStarted] = useState(false);
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

  const hasPoseRef = useRef(hasPose);
  hasPoseRef.current = hasPose;
  const cameraReadinessRef = useRef(cameraReadiness);
  cameraReadinessRef.current = cameraReadiness;
  const isCameraActiveRef = useRef(isCameraActive ?? false);
  isCameraActiveRef.current = isCameraActive ?? false;

  const stateMachineRef = useRef<SessionStateMachine>(
    new SessionStateMachine("idle", (from, to, reason) => {
      setState(to);
      console.log(`[AI COACH][SESSION][STATE]`, {
        previousState: from,
        nextState: to,
        reason: reason || `transition_to_${to}`,
        cameraState: cameraReadinessRef.current?.state ?? "unknown",
        hasValidPose: Boolean(hasPoseRef.current),
      });
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
  const completionCandidateSinceRef = useRef<number | null>(null);
  const lastDebugLogTimeRef = useRef<number>(0);
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
  const transitionTo = useCallback((target: CoachSessionState, reason?: string): boolean => {
    return stateMachineRef.current.transition(target, reason);
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
    completionCandidateSinceRef.current = null;
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
    setPracticeStarted(false);
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
    onSessionComplete?.();
  }, [resetSession, onSessionComplete]);

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
   * Automatic coaching lifecycle activation when camera is started
   */
  useEffect(() => {
    if (isCameraActive && state === "idle" && practiceStarted) {
      transitionTo("camera_check", "camera_activated");
    } else if (
      isCameraActive === false &&
      state !== "idle" &&
      state !== "completed" &&
      state !== "session_completed"
    ) {
      resetSession();
    }
  }, [isCameraActive, state, practiceStarted, transitionTo, resetSession]);

  /**
   * 8. CAMERA CHECK Stage: Checks camera readiness
   */
  const startCameraCheck = useCallback(() => {
    clearTimers();
    setCountdown(null);
    transitionTo("camera_check", "get_ready_completed");
  }, [clearTimers, transitionTo]);

  /**
   * 7. GET READY Stage: 3s preparation countdown
   */
  const startGetReady = useCallback(() => {
    clearTimers();
    resetCurrentAsana();
    setCountdown(GET_READY_SECONDS);
    transitionTo("get_ready", "start_session");
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
      setPracticeStarted(true);
      resetCurrentAsana();
      if (hasGuideVideo && !options?.skipVideo) {
        transitionTo("guide_video", "guide_video_intro");
      } else {
        if (state === "idle") {
          transitionTo("camera_check", "start_session_camera_check");
        }
      }
    },
    [hasGuideVideo, resetCurrentAsana, transitionTo, state]
  );

  const skipGuideVideo = useCallback(() => {
    setPracticeStarted(true);
    if (state === "guide_video" || state === "idle") {
      transitionTo("camera_check", "skip_guide_video");
    }
  }, [state, transitionTo]);

  const finishGuideVideo = useCallback(() => {
    setPracticeStarted(true);
    if (state === "guide_video" || state === "idle") {
      transitionTo("camera_check", "finish_guide_video");
    }
  }, [state, transitionTo]);

  /**
   * Camera Check Flow: Transition to coaching when practice has started, camera is ready, and pose is valid
   */
  useEffect(() => {
    if (state !== "camera_check") return;

    const isCameraReadyForCoaching =
      cameraState === "CAMERA_READY" ||
      cameraState === "FULL_BODY_DETECTED" ||
      cameraReadiness.ready ||
      cameraReadiness.state === "camera_ready";

    const isCameraPartial =
      cameraState === "PARTIAL_BODY" ||
      cameraReadiness.state === "camera_partial";

    const poseValid = Boolean(
      hasPose &&
      landmarks &&
      landmarks.length >= 33 &&
      evaluation &&
      ("isValid" in evaluation ? evaluation.isValid !== false : true)
    );

    const canEnterCoaching =
      practiceStarted &&
      isCameraReadyForCoaching &&
      !isCameraPartial &&
      poseValid;

    if (canEnterCoaching) {
      console.log("[AI COACH][SESSION]", {
        previousState: state,
        nextState: "coaching",
        cameraState: cameraState ?? cameraReadiness.state,
        poseValid,
        reason: "practice_started_and_camera_ready",
      });

      transitionTo("coaching", "practice_started_and_camera_ready");
    }
  }, [
    state,
    practiceStarted,
    cameraState,
    cameraReadiness,
    hasPose,
    landmarks,
    evaluation,
    transitionTo,
  ]);


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
        transitionTo("coaching", "calibration_complete");
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

  // Reset completion flag and buffers when moving to a new asana index or asana ID
  const prevAsanaIdRef = useRef<string | undefined>(asanaId);
  useEffect(() => {
    if (prevAsanaIdRef.current !== asanaId) {
      prevAsanaIdRef.current = asanaId;
      resetCurrentAsana();
    }
  }, [asanaId, resetCurrentAsana]);

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
      state !== "holding"
    ) {
      hasPoseLostSinceRef.current = null;
      completionCandidateSinceRef.current = null;
      return;
    }

    // If already completed for this asana, ignore all subsequent completion frames (one-shot guard)
    if (hasCompletedCurrentAsanaRef.current) {
      completionCandidateSinceRef.current = null;
      return;
    }

    if (!hasPose) {
      completionCandidateSinceRef.current = null;
      setHoldTime(0);
      if (hasPoseLostSinceRef.current === null) {
        hasPoseLostSinceRef.current = Date.now();
      } else if (Date.now() - hasPoseLostSinceRef.current > 7000) {
        transitionTo("camera_check", "pose_lost");
        setHoldTime(0);
        holdScoresRef.current = [];
      }
      return;
    } else {
      hasPoseLostSinceRef.current = null;
    }

    if (!evaluation) {
      completionCandidateSinceRef.current = null;
      setHoldTime(0);
      return;
    }

    // Push valid score to rolling buffer only on valid tracking frames
    const isEvalValid = "isValid" in evaluation ? evaluation.isValid !== false : true;
    const isValidFrame = hasPose && isEvalValid && evaluation.score !== null && evaluation.score !== undefined && evaluation.score >= 0;
    if (isValidFrame) {
      scoreBufferRef.current.push(evaluation.score, true);
    }

    if (state === "holding" && isValidFrame) {
      holdScoresRef.current.push(evaluation.score);
    }

    // Authoritative Pose Frame State & Completion Gate (Physical stance, identity, critical rules, accuracy threshold)
    const activeAsanaId = asanaId || ("asanaId" in evaluation ? evaluation.asanaId : "") || "";
    const frameState = evaluatePoseFrameState({
      asanaId: activeAsanaId,
      evaluation,
      landmarks,
      cameraReady: cameraReadiness.ready,
      completionAccuracyThreshold,
    });

    const isPoseValidForCompletion = frameState.isCompletionEligible;

    if (isPoseValidForCompletion) {
      const now = Date.now();
      if (completionCandidateSinceRef.current === null) {
        completionCandidateSinceRef.current = now;
      }

      const elapsedHold = now - completionCandidateSinceRef.current;
      const currentHoldSeconds = Math.min(
        targetHoldSeconds,
        Math.round((elapsedHold / 1000) * 10) / 10
      );
      setHoldTime(currentHoldSeconds);

      // Throttled debug output (once per second)
      if (now - lastDebugLogTimeRef.current >= 1000) {
        lastDebugLogTimeRef.current = now;
        console.debug(
          `[AI Coach Completion Gate] Asana: ${activeAsanaId} (${frameState.requiredStance}), Score: ${evaluation.score.toFixed(1)}% (Threshold: ${completionAccuracyThreshold}%), ` +
          `CriticalRules: ${frameState.gateResult.criticalRulesPassed}/${frameState.gateResult.criticalRulesEvaluated}, StanceValid: ${frameState.stanceValid}, IdentityValid: ${frameState.identityValid}, ` +
          `Continuous Hold: ${elapsedHold}ms / ${completionHoldMs}ms, State: ${state}`
        );
      }

      // Complete asana only once valid pose is held continuously for completionHoldMs (5000ms)
      if (elapsedHold >= completionHoldMs) {
        if (!hasCompletedCurrentAsanaRef.current) {
          hasCompletedCurrentAsanaRef.current = true;
          completionCandidateSinceRef.current = null;
          scoreBufferRef.current.setCompleted(true);
          const finalScore = Math.max(0, Math.min(100, Math.round(evaluation.score)));
          onAsanaComplete?.(currentAsanaIndex, finalScore);
          onPoseReviewReady?.(finalScore);
          transitionTo("pose_review", "hold_duration_completed");
          // Immediately also support user_choice state
          setTimeout(() => {
            transitionTo("user_choice", "pose_review_ready");
          }, 50);
        }
      } else {
        if (state !== "holding") {
          transitionTo("holding", "pose_valid_for_completion");
        }
      }
    } else {
      // RESET candidate hold immediately on ANY signal invalidation (e.g. 75% -> 77% -> 73% or issue detected)
      completionCandidateSinceRef.current = null;
      setHoldTime(0);

      // Correcting state when primary issue exists
      if (evaluation.primaryIssue && state !== "correcting") {
        transitionTo("correcting", "primary_issue_detected");
      } else if (!evaluation.primaryIssue && state !== "coaching") {
        transitionTo("coaching", "issue_resolved_or_form_acceptable");
      }
    }
  }, [
    evaluation,
    hasPose,
    landmarks,
    cameraReadiness.ready,
    state,
    currentAsanaIndex,
    asanaId,
    targetHoldSeconds,
    completionAccuracyThreshold,
    completionHoldMs,
    onAsanaComplete,
    onPoseReviewReady,
    transitionTo,
  ]);

  /**
   * 13. Hold timer cleanup
   */
  useEffect(() => {
    if (state !== "holding") {
      if (holdTimerRef.current) {
        clearInterval(holdTimerRef.current);
        holdTimerRef.current = null;
      }
    }
    return () => {
      if (holdTimerRef.current) {
        clearInterval(holdTimerRef.current);
        holdTimerRef.current = null;
      }
    };
  }, [state]);

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
      transitionTo("session_completed", "all_asanas_completed");
      onSessionComplete?.();
      return;
    }

    onAdvanceAsana?.(currentAsanaIndex + 1);
    startGetReady();
  }, [
    clearTimers,
    resetCurrentAsana,
    currentAsanaIndex,
    totalAsanas,
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
    hasCompletedCurrentAsanaRef.current = false;
    completionCandidateSinceRef.current = null;
    scoreBufferRef.current.reset();
    transitionTo("coaching", "user_stay_here");
  }, [transitionTo]);

  /**
   * "End Session" (END SESSION)
   */
  const endSession = useCallback(() => {
    resetSession();
    onSessionComplete?.();
  }, [resetSession, onSessionComplete]);

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
    practiceStarted,
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
