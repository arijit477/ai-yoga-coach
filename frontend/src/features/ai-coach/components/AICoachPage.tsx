import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { Maximize, Minimize } from "lucide-react";

import { CameraView } from "./CameraView";
import { PoseSkeleton } from "./PoseSkeleton";
import { AngleDebugPanel } from "./AngleDebugPanel";
import { JointAngleOverlay } from "./JointAngleOverlay";
import { KeyAnglesPanel } from "./KeyAnglesPanel";
import { CircularScoreRing } from "./CircularScoreRing";

import { usePoseTracking } from "../../../hooks/usePoseTracking";
import { usePoseEvaluation } from "../../../hooks/usePoseEvaluation";
import { useStablePoseEvaluation } from "../../../hooks/useStablePoseEvaluation";
import { useStableScore } from "../../../hooks/useStableScore";
import { useCoachState } from "../../../hooks/useCoachState";
import { useCoachSession } from "../../../hooks/useCoachSession";
import { AsanaProgress } from "./AsanaProgress";
import { AsanaSelector } from "./AsanaSelector";
import { GuideVideoOverlay } from "./GuideVideoOverlay";
import { PoseReviewModal } from "./PoseReviewModal";
import { useAICoachStore } from "../store/aiCoachStore";
import type { CoachPersona } from "../types/coach-session";
import { useRealtimeVoice, CoachingEventBuilder } from "../voice";
import { extractJointAngles } from "../analysis/JointAngleExtractor";
import { getPoseRules } from "../analysis/RuleEngine";
import type { AvatarState } from "../avatar/avatar.types";
import { CoachSelector } from "./CoachSelector";
import { CoachPanel } from "./CoachPanel";
import { SessionControls } from "./SessionControls";
import { AsanaReference } from "./AsanaReference";
import { PrivacyNotice } from "./PrivacyNotice";
import { VoiceControls } from "./VoiceControls";
import { HoldTimer } from "./HoldTimer";
import { CorrectionCard } from "./CorrectionCard";
import { AsanaInstructionsCard } from "./AsanaInstructionsCard";


function getCoachStateMessage(
  state: ReturnType<typeof useCoachState>,
): string {
  switch (state) {
    case "idle":
      return "Initializing pose detection...";

    case "get_ready":
      return "Position your full body inside the camera.";

    case "detecting":
      return "Detecting your pose...";

    case "analyzing":
      return "Analyzing your form...";

    case "correcting":
      return "Make a small adjustment.";

    case "good_form":
      return "Good form. Keep going.";

    case "holding":
      return "Excellent. Hold your position.";

    default:
      return "Ready.";
  }
}

function getCoachName(coach: CoachPersona): string {
  return coach === "alice" ? "Alice" : "Kevin";
}

function getSessionLabel(
  state: ReturnType<typeof useCoachSession>["state"],
): string {
  switch (state) {
    case "idle":
      return "Ready";

    case "guide_video":
      return "Guide Video";

    case "countdown":
      return "Get Ready";

    case "hold_still":
    case "calibrating":
      return "Calibrating";

    case "detecting":
      return "Detecting";

    case "coaching":
    case "analyzing":
      return "Coaching";

    case "correcting":
      return "Correction Needed";

    case "holding":
      return "Hold Position";

    case "pose_review":
      return "Target Form Reached";

    case "completed":
      return "Pose Completed";

    case "transition":
      return "Next Pose Up";

    case "session_completed":
      return "Routine Completed";

    default:
      return "Ready";
  }
}

const INTRO_GUIDE_VIDEO_URL = "/guide_videos/AI Yoga Coach.mp4";

export function AICoachPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Introductory guide video state (plays inside camera stage on initial page load)
  const [isIntroVideoActive, setIsIntroVideoActive] = useState(true);

  // Dedicated manual camera power state (defaults to false until user presses 'Start camera' or finishes/skips intro)
  const [isCameraActive, setIsCameraActive] = useState(false);

  const handleStartCamera = useCallback(() => {
    setIsIntroVideoActive(false);
    setIsCameraActive(true);
  }, []);

  const handleStopCamera = useCallback(() => {
    setIsCameraActive(false);
  }, []);

  const handleSkipIntroVideo = useCallback(() => {
    setIsIntroVideoActive(false);
    setIsCameraActive(true);
  }, []);

  const handleIntroVideoEnded = useCallback(() => {
    setIsIntroVideoActive(false);
    setIsCameraActive(true);
  }, []);

  const {
    currentAsana,
    currentAsanaIndex,
    sessionAsanas,
    sessionLength,
    selectedCoach,
    setSelectedCoach,
    markAsanaCompleted,
    canAccessAsanaIndex,
    setCurrentAsana,
    setCurrentAsanaIndex,
    skipToAsanaIndex,
    goBackToAsanaIndex,
    skippedAsanaIds,
  } = useAICoachStore();

  const activeAsanas = useMemo(() => {
    return sessionAsanas.slice(0, sessionLength);
  }, [sessionAsanas, sessionLength]);

  /*
   * Pose tracking
   */
  const { result, isInitialized, error } = usePoseTracking(videoRef);
  const hasPose = Boolean(result);

  /*
   * Dynamic pose evaluation receiving rules for currentAsana
   */
  const evaluation = usePoseEvaluation(result, currentAsana.id);

  /*
   * Stable correction / feedback
   */
  const stableEvaluation = useStablePoseEvaluation(evaluation);

  /*
   * Stable score for UI
   */
  const stableScore = useStableScore(evaluation?.score ?? null);

  /*
   * Real-time Joint Angles calculated with single source of truth (authoritative 3D engine & rules)
   */
  const activeRules = useMemo(() => {
    return getPoseRules(currentAsana.id);
  }, [currentAsana.id]);

  const jointAngles = useMemo(() => {
    return extractJointAngles(
      result?.worldLandmarks ?? null,
      activeRules,
      stableEvaluation?.issues ?? [],
      currentAsana.id,
    );
  }, [result?.worldLandmarks, activeRules, stableEvaluation?.issues, currentAsana.id]);

  const {
    state: voiceState,
    start: voiceStart,
    stop: voiceStop,
    toggleMute: voiceToggleMute,
    retry: voiceRetry,
    dispatchEvent: voiceDispatch,
    updateSessionContext: voiceUpdateContext,
  } = useRealtimeVoice();

  // Track one-shot events per asana to avoid redundant dispatching
  const hasDispatchedStartRef = useRef<string | null>(null);
  const hasDispatchedHeldRef = useRef<string | null>(null);
  const hasDispatchedCompletedRef = useRef<string | null>(null);
  const hasDispatchedCalibrationPromptRef = useRef<string | null>(null);
  const hasDispatchedCalibrationCompleteRef = useRef<string | null>(null);
  // Track last sent session context to avoid spamming OpenAI with per-frame updates
  const lastSentContextRef = useRef<{
    coach: string;
    asanaId: string;
    score: number | null;
    coachState: string;
    sessionState: string;
    primaryIssueRuleId: string | null;
  } | null>(null);

  /*
   * Multi-asana session state configured dynamically
   */
  const {
    state: sessionState,
    countdown,
    holdTime,
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
  } = useCoachSession({
    evaluation: stableEvaluation,
    landmarks: result?.landmarks ?? null,
    isInitialized,
    hasPose: Boolean(result),
    targetHoldSeconds: currentAsana.targetHoldSeconds,
    currentAsanaIndex,
    totalAsanas: activeAsanas.length,
    hasGuideVideo: Boolean(currentAsana.videoUrl),
    instructionsCount: currentAsana.instructions.length,
    onAsanaComplete: useCallback((idx: number) => {
      markAsanaCompleted(activeAsanas[idx].id);
    }, [activeAsanas, markAsanaCompleted]),
    onAdvanceAsana: useCallback((nextIdx: number) => {
      setCurrentAsanaIndex(nextIdx);
    }, [setCurrentAsanaIndex]),
    onCalibrationPrompt: useCallback(() => {
      if (hasDispatchedCalibrationPromptRef.current !== currentAsana.id) {
        hasDispatchedCalibrationPromptRef.current = currentAsana.id;
        voiceDispatch(
          CoachingEventBuilder.buildCalibrationPromptEvent(
            currentAsana.id,
            currentAsana.name,
          ),
        );
      }
    }, [currentAsana.id, currentAsana.name, voiceDispatch]),
    onCalibrationComplete: useCallback(() => {
      if (hasDispatchedCalibrationCompleteRef.current !== currentAsana.id) {
        hasDispatchedCalibrationCompleteRef.current = currentAsana.id;
        voiceDispatch(
          CoachingEventBuilder.buildCalibrationCompleteEvent(
            currentAsana.id,
            currentAsana.name,
          ),
        );
      }
    }, [currentAsana.id, currentAsana.name, voiceDispatch]),
    onStepChange: useCallback((stepIdx: number) => {
      const stepInstruction = currentAsana.instructions[stepIdx];
      if (stepInstruction) {
        voiceDispatch(
          CoachingEventBuilder.buildStepGuidanceEvent(
            currentAsana.id,
            currentAsana.name,
            stepInstruction,
          ),
        );
      }
    }, [currentAsana.id, currentAsana.name, currentAsana.instructions, voiceDispatch]),
  });

  /*
   * High-level coaching state
   */
  const coachState = useCoachState({
    isInitialized,
    hasPose: Boolean(result),
    evaluation: stableEvaluation,
  });

  const handleStartSession = useCallback(() => {
    hasDispatchedStartRef.current = null;
    hasDispatchedHeldRef.current = null;
    hasDispatchedCompletedRef.current = null;
    hasDispatchedCalibrationPromptRef.current = null;
    hasDispatchedCalibrationCompleteRef.current = null;
    startSession();
    voiceStart(selectedCoach);
  }, [selectedCoach, startSession, voiceStart]);

  const handleStopSession = useCallback(() => {
    stopSession();
    voiceStop();
    hasDispatchedStartRef.current = null;
    hasDispatchedHeldRef.current = null;
    hasDispatchedCompletedRef.current = null;
    hasDispatchedCalibrationPromptRef.current = null;
    hasDispatchedCalibrationCompleteRef.current = null;
    lastSentContextRef.current = null;
  }, [stopSession, voiceStop]);

  // Clean up voice connection when coach persona changes or unmounts
  useEffect(() => {
    voiceStop();
    hasDispatchedStartRef.current = null;
    hasDispatchedHeldRef.current = null;
    hasDispatchedCompletedRef.current = null;
    lastSentContextRef.current = null;
  }, [selectedCoach, voiceStop]);

  // Reset per-asana dispatch locks and handle throttled session context updates
  useEffect(() => {
    hasDispatchedStartRef.current = null;
    hasDispatchedHeldRef.current = null;
    hasDispatchedCompletedRef.current = null;
  }, [currentAsana.id]);

  // Throttled session context synchronization to OpenAI Realtime
  useEffect(() => {
    const primaryRuleId = stableEvaluation?.issues[0]?.ruleId ?? null;
    const currentScore = stableScore;
    const prev = lastSentContextRef.current;

    const shouldSendContext =
      !prev ||
      prev.coach !== selectedCoach ||
      prev.asanaId !== currentAsana.id ||
      prev.coachState !== coachState ||
      prev.sessionState !== sessionState ||
      prev.primaryIssueRuleId !== primaryRuleId ||
      (currentScore !== null && prev.score !== null && Math.abs(currentScore - prev.score) >= 6) ||
      (currentScore !== null && prev.score === null);

    if (shouldSendContext) {
      lastSentContextRef.current = {
        coach: selectedCoach,
        asanaId: currentAsana.id,
        score: currentScore,
        coachState,
        sessionState,
        primaryIssueRuleId: primaryRuleId,
      };

      voiceUpdateContext({
        coach: selectedCoach,
        asanaId: currentAsana.id,
        asanaName: currentAsana.name,
        score: currentScore ?? undefined,
        coachState,
        sessionState,
        isHolding: sessionState === "holding",
        isCompleted: sessionState === "completed",
        primaryIssue: stableEvaluation?.issues[0]
          ? {
              ruleId: stableEvaluation.issues[0].ruleId,
              joint: stableEvaluation.issues[0].joint,
              severity: stableEvaluation.issues[0].severity,
              currentValue: Math.round(stableEvaluation.issues[0].currentValue),
              currentAngle: Math.round(stableEvaluation.issues[0].currentValue),
              min: stableEvaluation.issues[0].min,
              max: stableEvaluation.issues[0].max,
              targetMin: stableEvaluation.issues[0].targetMin ?? stableEvaluation.issues[0].min,
              targetMax: stableEvaluation.issues[0].targetMax ?? stableEvaluation.issues[0].max,
              feedback: stableEvaluation.issues[0].feedback,
            }
          : null,
      });
    }
  }, [
    currentAsana.id,
    currentAsana.name,
    selectedCoach,
    coachState,
    sessionState,
    stableScore,
    stableEvaluation,
    voiceUpdateContext,
  ]);

  /*
   * Structured Coaching Event Pipeline:
   * MediaPipe -> PoseEvaluator -> FeedbackPrioritizer -> FeedbackStabilizer -> CoachingEventBuilder -> CoachingEventDispatcher -> RealtimeVoiceAgent
   */
  useEffect(() => {
    if (sessionState === "idle") {
      return;
    }

    // 1. POSE COMPLETED (CoachSessionState = completed)
    if (sessionState === "completed") {
      if (hasDispatchedCompletedRef.current !== currentAsana.id) {
        hasDispatchedCompletedRef.current = currentAsana.id;
        voiceDispatch(
          CoachingEventBuilder.buildPoseCompletedEvent(
            currentAsana.id,
            currentAsana.name,
            stableScore ?? undefined,
          ),
        );
      }
      return;
    }

    // 2. POSE STARTED (User enters active detection with valid landmarks)
    if (
      sessionState !== "countdown" &&
      sessionState !== "transition" &&
      hasPose &&
      hasDispatchedStartRef.current !== currentAsana.id
    ) {
      hasDispatchedStartRef.current = currentAsana.id;
      voiceDispatch(
        CoachingEventBuilder.buildPoseStartedEvent(
          currentAsana.id,
          currentAsana.name,
        ),
      );
    }

    // 3. POSE HELD (CoachSessionState = holding)
    if (sessionState === "holding") {
      if (hasDispatchedHeldRef.current !== currentAsana.id) {
        hasDispatchedHeldRef.current = currentAsana.id;
        voiceDispatch(
          CoachingEventBuilder.buildPoseHeldEvent(
            currentAsana.id,
            currentAsana.name,
            stableScore ?? undefined,
          ),
        );
      }
    }

    // 4. POSTURE EVALUATION & FEEDBACK
    if (!stableEvaluation) {
      return;
    }

    if (stableEvaluation.issues.length > 0) {
      // Prioritized primary issue from FeedbackPrioritizer & FeedbackStabilizer
      const primaryIssue = stableEvaluation.issues[0];

      const isSafety =
        primaryIssue.severity === "high" &&
        (primaryIssue.ruleId.includes("safety") ||
          primaryIssue.feedback.toLowerCase().includes("safety") ||
          primaryIssue.feedback.toLowerCase().includes("stop") ||
          primaryIssue.feedback.toLowerCase().includes("pain"));

      if (isSafety) {
        voiceDispatch(
          CoachingEventBuilder.buildSafetyWarningEvent(
            currentAsana.id,
            currentAsana.name,
            primaryIssue,
            stableScore ?? undefined,
          ),
        );
      } else {
        voiceDispatch(
          CoachingEventBuilder.buildPoseCorrectionEvent(
            currentAsana.id,
            currentAsana.name,
            primaryIssue,
            stableScore ?? undefined,
          ),
        );
      }
    } else if (
      coachState === "good_form" ||
      (coachState === "holding" && stableEvaluation.issues.length === 0)
    ) {
      // 5. GOOD FORM EVENT (User corrected issue or entered high-accuracy posture)
      voiceDispatch(
        CoachingEventBuilder.buildGoodFormEvent(
          currentAsana.id,
          currentAsana.name,
          stableScore ?? undefined,
        ),
      );
    }
  }, [
    sessionState,
    hasPose,
    stableEvaluation,
    coachState,
    currentAsana,
    stableScore,
    voiceDispatch,
  ]);

  /*
   * Camera/video dimensions
   */
  const [videoSize, setVideoSize] = useState({
    width: 1280,
    height: 720,
  });

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const updateVideoSize = () => {
      if (video.videoWidth > 0 && video.videoHeight > 0) {
        setVideoSize({
          width: video.videoWidth,
          height: video.videoHeight,
        });
      }
    };

    updateVideoSize();

    video.addEventListener("loadedmetadata", updateVideoSize);

    return () => {
      video.removeEventListener("loadedmetadata", updateVideoSize);
    };
  }, []);

  const [isCinemaMode, setIsCinemaMode] = useState(false);

  const toggleCinemaMode = () => setIsCinemaMode((v) => !v);

  // Exit cinema mode on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsCinemaMode(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const isSessionActive =
    sessionState !== "idle" &&
    sessionState !== "completed" &&
    sessionState !== "session_completed";

  const sessionLabel = getSessionLabel(sessionState);

  // Derive AvatarState for AvatarPlayer
  const avatarState: AvatarState = useMemo(() => {
    if (voiceState.status === "speaking") return "speaking";
    if (voiceState.status === "listening") return "listening";
    if (sessionState === "completed" || sessionState === "session_completed") return "complete";
    if (coachState === "correcting" || (stableEvaluation && stableEvaluation.issues.length > 0)) return "correction";
    if (coachState === "good_form" || sessionState === "holding") return "good_form";
    return "idle";
  }, [voiceState.status, sessionState, coachState, stableEvaluation]);

  // Derive latest coach spoken message or text guidance
  const latestCoachMessage = useMemo(() => {
    const lastCoachTranscript = [...voiceState.transcripts]
      .reverse()
      .find((t) => t.role === "coach" && t.text.trim().length > 0);

    if (lastCoachTranscript) {
      return lastCoachTranscript.text;
    }

    if (error) {
      return error;
    }

    if (stableEvaluation && stableEvaluation.issues.length > 0) {
      return stableEvaluation.issues[0].feedback;
    }

    return getCoachStateMessage(coachState);
  }, [voiceState.transcripts, error, stableEvaluation, coachState]);

  const showDebugPanel = import.meta.env.VITE_ENABLE_POSE_DEBUG === "true";
  const [isMirrored, setIsMirrored] = useState(true);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [showVoiceCues, setShowVoiceCues] = useState(true);

  return (
    <>
      {/* ====================================================== */}
      {/* CINEMA MODE OVERLAY (PERSISTENT 100% VIEWPORT EXPERIENCE) */}
      {/* ====================================================== */}
      {isCinemaMode && (
        <div className="fixed inset-0 z-[9999] bg-slate-950 flex flex-col overflow-hidden">
          {/* Camera + skeleton fills entire viewport */}
          <div className="relative flex-1 overflow-hidden w-full h-full flex items-center justify-center">
            <CameraView videoRef={videoRef} enabled={!isIntroVideoActive && isCameraActive} />

            {/* Neon glowing skeleton overlay */}
            {!isIntroVideoActive && isCameraActive && result && showSkeleton && (
              <PoseSkeleton
                landmarks={result.landmarks}
                videoWidth={videoSize.width}
                videoHeight={videoSize.height}
                coach={selectedCoach}
              />
            )}

            {/* Joint angle labels tracking body joints */}
            {!isIntroVideoActive && isCameraActive && result && (
              <JointAngleOverlay
                landmarks={result.landmarks}
                jointAngles={jointAngles}
                videoWidth={videoSize.width}
                videoHeight={videoSize.height}
                isMirrored={isMirrored}
              />
            )}

            {/* Top-left: LIVE status & asana title */}
            <div className="absolute left-5 top-5 flex items-center gap-3">
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-600/90 text-white px-3 py-1 text-xs font-bold tracking-wider uppercase shadow-md backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                {isIntroVideoActive ? "Intro Guide" : `LIVE • ${sessionLabel}`}
              </span>
              <span className="text-xl sm:text-2xl font-extrabold text-white drop-shadow-lg tracking-tight">
                {isIntroVideoActive ? "Welcome to AI Yoga Coach" : currentAsana.name}
              </span>
              {!isIntroVideoActive && currentAsana.sanskritName && (
                <span className="hidden sm:inline text-xs text-white/70 italic">
                  ({currentAsana.sanskritName})
                </span>
              )}
            </div>

            {/* Top-Right: Target Pose Reference Card Overlaid on Fullscreen Camera */}
            <div className="absolute right-4 top-4 sm:right-6 sm:top-6 z-20">
              <AsanaReference
                asana={currentAsana}
                className="w-40 xs:w-44 sm:w-48 lg:w-52 shadow-2xl"
              />
            </div>

            {/* Top-Right Controls: Exit Fullscreen Button & Compact Score Ring */}
            <div className="absolute right-[180px] xs:right-[195px] sm:right-[220px] lg:right-[235px] top-4 sm:top-6 z-20 flex items-center gap-2.5">
              {stableScore !== null && (
                <CircularScoreRing score={stableScore} size={44} strokeWidth={4} compact />
              )}

              <button
                type="button"
                onClick={toggleCinemaMode}
                className="flex items-center gap-1.5 rounded-full bg-slate-900/80 border border-white/25 px-3 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-md hover:bg-slate-800 hover:text-white transition shadow-md active:scale-95 cursor-pointer"
                title="Exit Fullscreen (Esc)"
              >
                <Minimize size={13} />
                <span className="hidden sm:inline">Exit Fullscreen</span>
              </button>
            </div>

            {/* Bottom-Left: Asana Instructions Card in Fullscreen / Cinema Mode */}
            {!isIntroVideoActive && (
              <div className="absolute bottom-5 left-5 z-20 max-w-xs sm:max-w-sm">
                <AsanaInstructionsCard asana={currentAsana} isDark />
              </div>
            )}

            {/* Floating Mini Coach Presence Card */}
            <div className="absolute bottom-5 right-5 w-48 sm:w-56 overflow-hidden rounded-2xl border border-white/20 bg-slate-900/85 backdrop-blur-md shadow-2xl p-2.5 flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-2">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-800 shrink-0 border border-white/10">
                <CoachPanel
                  coach={selectedCoach}
                  coachName={getCoachName(selectedCoach)}
                  avatarState={avatarState}
                  guidanceMessage={latestCoachMessage}
                  isSpeaking={voiceState.status === "speaking"}
                  className="!border-0 !p-0 !shadow-none !bg-transparent"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                    Coach {getCoachName(selectedCoach)}
                  </span>
                  {voiceState.status === "speaking" && (
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  )}
                </div>
                <p className="text-[11px] text-white/90 truncate font-medium mt-0.5">
                  {latestCoachMessage}
                </p>
              </div>
            </div>

            {/* Introductory Guide Video on Page Load (Cinema Mode) */}
            {isIntroVideoActive && (
              <GuideVideoOverlay
                videoUrl={INTRO_GUIDE_VIDEO_URL}
                title="AI Yoga Coach Guide"
                subtitle="Watch how your AI coach guides your posture in real time"
                badge="Intro Guide"
                onSkip={handleSkipIntroVideo}
                onEnded={handleIntroVideoEnded}
              />
            )}

            {/* Guide Video Overlay in Cinema Mode (Per-Asana) */}
            {!isIntroVideoActive && sessionState === "guide_video" && currentAsana.videoUrl && (
              <GuideVideoOverlay
                asana={currentAsana}
                onSkip={skipGuideVideo}
                onEnded={finishGuideVideo}
              />
            )}

            {/* Countdown Overlay in Cinema Mode */}
            {sessionState === "countdown" && countdown !== null && (
              <div className="absolute inset-0 flex items-center justify-center bg-emerald-950/40 backdrop-blur-[2px]">
                <div className="text-center bg-white/95 rounded-3xl p-6 shadow-2xl border border-emerald-100 max-w-xs">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-800">
                    Get Ready
                  </p>
                  <p
                    className="my-2 text-6xl font-bold tabular-nums text-emerald-950"
                    style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                  >
                    {countdown}
                  </p>
                  <p className="text-xs text-slate-600 font-medium">
                    Prepare for {currentAsana.name}
                  </p>
                </div>
              </div>
            )}

            {/* Hold Still / Calibration Overlay in Cinema Mode */}
            {(sessionState === "hold_still" || sessionState === "calibrating") && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-950/60 backdrop-blur-[2px] p-4">
                <div className="text-center bg-white/95 rounded-3xl p-6 shadow-2xl border border-emerald-200 max-w-sm w-full animate-in fade-in zoom-in-95 duration-200">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-800 mb-1">
                    Body Position Check
                  </p>
                  <h4 className="text-xl font-bold text-slate-900">
                    Hold still for a moment
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 mb-4">
                    Stay steady while your coach checks your alignment points.
                  </p>

                  {visibilityWarning && (
                    <div className="mb-4 rounded-xl bg-amber-50 border border-amber-200 p-2.5 text-xs font-semibold text-amber-900">
                      {visibilityWarning}
                    </div>
                  )}

                  <div className="w-full bg-slate-100 rounded-full h-3.5 p-0.5 border border-slate-200 overflow-hidden">
                    <div
                      className="bg-emerald-600 h-full rounded-full transition-all duration-200 ease-out"
                      style={{ width: `${calibrationProgress}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-2 text-[11px] font-semibold text-slate-500">
                    <span>Stabilizing...</span>
                    <span className="font-mono text-emerald-800">{calibrationProgress}%</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step-by-Step Guidance Banner in Cinema Mode */}
            {sessionState === "coaching" && currentAsana.instructions[currentStepIndex] && (
              <div className="absolute top-16 left-1/2 -translate-x-1/2 max-w-lg w-11/12 rounded-2xl bg-white/95 text-emerald-950 px-5 py-3 shadow-xl backdrop-blur-md border border-emerald-100 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-between gap-2 mb-1.5 pb-1 border-b border-emerald-50">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                    Step {currentStepIndex + 1} of {currentAsana.instructions.length}
                  </span>
                  {/* Step Timeline Progress Indicator */}
                  <div className="flex items-center gap-1.5">
                    {currentAsana.instructions.map((_, idx) => (
                      <span
                        key={idx}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          idx === currentStepIndex
                            ? "w-5 bg-emerald-600 shadow-sm"
                            : idx < currentStepIndex
                            ? "w-2 bg-emerald-400"
                            : "w-1.5 bg-emerald-100"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs font-semibold leading-snug text-emerald-950">
                  {currentAsana.instructions[currentStepIndex]}
                </p>
              </div>
            )}

            {/* Hold Timer Banner in Cinema Mode */}
            {sessionState === "holding" && (
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-3 rounded-full bg-white/95 text-emerald-950 px-6 py-2.5 shadow-xl backdrop-blur-md border border-emerald-200/80 animate-in fade-in zoom-in-95 duration-200">
                <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
                </span>
                <span className="text-sm font-bold tracking-tight text-emerald-950">
                  Hold Steady: <span className="font-mono text-emerald-700 font-extrabold">{holdTime.toFixed(1)}s</span> / {currentAsana.targetHoldSeconds.toFixed(1)}s
                </span>
              </div>
            )}

            {/* Pose Review Choice Modal in Cinema Mode */}
            {sessionState === "pose_review" && (
              <PoseReviewModal
                asana={currentAsana}
                score={stableScore ?? 80}
                onDoItAgain={doItAgain}
                onMoveToNext={moveToNextAsana}
                isLastAsana={currentAsanaIndex + 1 >= activeAsanas.length}
              />
            )}
          </div>
        </div>
      )}

      {/* ====================================================== */}
      {/* NORMAL PAGE LAYOUT (CLEAN YOGAVERSE LIGHT WELLNESS)  */}
      {/* ====================================================== */}
      <div className="min-h-screen bg-[#f9fdfb] px-4 py-8 text-slate-800 md:px-8 font-sans selection:bg-emerald-100">
        <div className="mx-auto max-w-[1440px]">
          {/* ================================================== */}
          {/* 1. YOGAVERSE HEADER & BRAND POSITIONING           */}
          {/* ================================================== */}
          <header className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200/80">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-800 mb-1">
                AI Yoga Coach
              </p>
              <h1
                className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-emerald-950 tracking-tight"
                style={{ fontFamily: "'Fraunces', Georgia, serif" }}
              >
                Your camera becomes your yoga instructor.
              </h1>
              <p className="mt-1 text-sm text-slate-600 max-w-2xl">
                Real-time posture feedback powered by private, on-device pose tracking. Choose your coach, step onto your mat, and flow with confidence.
              </p>
            </div>

            {/* Asana Selector & Coach Quick Persona Switcher */}
            <div className="shrink-0 flex flex-wrap items-center gap-3">
              <AsanaSelector
                asanas={sessionAsanas}
                currentAsana={currentAsana}
                onSelectAsana={(asana) => {
                  resetSession();
                  setCurrentAsana(asana);
                }}
                disabled={isSessionActive}
              />

              <CoachSelector
                selectedCoach={selectedCoach}
                onSelectCoach={setSelectedCoach}
                disabled={isSessionActive}
              />
            </div>
          </header>

          {/* ================================================== */}
          {/* 2. SESSION PROGRESS FLOW                           */}
          {/* ================================================== */}
          <div className="mb-6">
            <AsanaProgress
              currentIndex={currentAsanaIndex}
              totalAsanas={activeAsanas.length}
              asanas={activeAsanas}
              currentAsana={currentAsana}
              isHolding={sessionState === "holding"}
              holdTime={holdTime}
              targetHoldSeconds={currentAsana.targetHoldSeconds}
              isSessionActive={isSessionActive}
              canAccessIndex={canAccessAsanaIndex}
              skippedAsanaIds={skippedAsanaIds}
              onSelectIndex={(idx) => {
                resetSession();
                setCurrentAsanaIndex(idx);
              }}
              onSkipToIndex={(idx) => {
                resetSession();
                skipToAsanaIndex(idx);
              }}
              onGoBackToIndex={(idx) => {
                resetSession();
                goBackToAsanaIndex(idx);
              }}
              disabled={isSessionActive}
            />
          </div>

          {/* ================================================== */}
          {/* 3. MAIN EXPERIENCE (CAMERA-CENTERED + COACH PANEL) */}
          {/* ================================================== */}
          <div className="grid gap-6 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_400px] items-start">
            {/* ------------------------------------------------ */}
            {/* LEFT / CENTER: PRIMARY CAMERA & POSTURE TRACKING */}
            {/* ------------------------------------------------ */}
            <main className="flex flex-col gap-4 min-w-0">
              {/* Camera Stage Card */}
              <div
                className={`relative overflow-hidden rounded-3xl border bg-slate-900 shadow-md aspect-[4/3] md:aspect-[16/10] xl:aspect-video w-full flex items-center justify-center transition-all duration-700 ${
                  sessionState === "holding" || coachState === "good_form"
                    ? "border-emerald-400/80 shadow-[0_0_40px_-5px_rgba(16,185,129,0.35)] ring-2 ring-emerald-400/40"
                    : "border-slate-200/90 shadow-sm"
                }`}
              >
                {!isCinemaMode && (
                  <CameraView
                    videoRef={videoRef}
                    enabled={!isIntroVideoActive && isCameraActive}
                  />
                )}

                {/* Body-Only MediaPipe Skeleton with Polished Neon Glow Tracer (face dots hidden) */}
                {!isIntroVideoActive && isCameraActive && result && showSkeleton && (
                  <PoseSkeleton
                    landmarks={result.landmarks}
                    videoWidth={videoSize.width}
                    videoHeight={videoSize.height}
                    coach={selectedCoach}
                  />
                )}

                {/* Live Joint Angles displayed directly beside joints */}
                {!isIntroVideoActive && isCameraActive && result && (
                  <JointAngleOverlay
                    landmarks={result.landmarks}
                    jointAngles={jointAngles}
                    videoWidth={videoSize.width}
                    videoHeight={videoSize.height}
                    isMirrored={isMirrored}
                  />
                )}

                {/* Top-Left: LIVE Status Indicator, Asana Name Pill & Score Ring */}
                <div className="absolute top-3 left-3 sm:top-3.5 sm:left-3.5 z-20 flex items-center gap-2">
                  <span className="flex items-center gap-1.5 rounded-full bg-emerald-600/95 text-white px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase shadow-sm backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                    {isIntroVideoActive
                      ? "Intro Guide"
                      : !isCameraActive
                      ? "Camera Standby"
                      : `LIVE • ${sessionLabel}`}
                  </span>

                  <span className="rounded-full bg-slate-900/80 text-white/90 px-3 py-1 text-xs font-semibold backdrop-blur-md border border-white/10 hidden sm:inline-block">
                    {isIntroVideoActive ? "Welcome to AI Yoga Coach" : currentAsana.name}
                  </span>

                  {isCameraActive && stableScore !== null && (
                    <CircularScoreRing score={stableScore} size={38} strokeWidth={4} compact />
                  )}
                </div>

                {/* Top-Right: Overlaid Target Pose Reference Card (Copy This Pose) */}
                <div className="absolute top-3 right-3 sm:top-3.5 sm:right-3.5 z-20">
                  <AsanaReference
                    asana={currentAsana}
                    className="w-36 xs:w-40 sm:w-44 md:w-48 shadow-xl"
                  />
                </div>

                {/* Bottom-Right: Maximize to Fullscreen / Cinema Mode */}
                <button
                  type="button"
                  onClick={toggleCinemaMode}
                  className="absolute bottom-3 right-3 sm:bottom-3.5 sm:right-3.5 z-20 flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900/80 text-white/80 hover:text-white hover:bg-slate-800 border border-white/20 backdrop-blur-md transition shadow-md active:scale-95 cursor-pointer"
                  title="Full screen view"
                >
                  <Maximize size={15} />
                </button>

                {/* Introductory Guide Video on Page Load (Standard View) */}
                {isIntroVideoActive && (
                  <GuideVideoOverlay
                    videoUrl={INTRO_GUIDE_VIDEO_URL}
                    title="AI Yoga Coach Guide"
                    subtitle="Watch how your AI coach guides your posture in real time"
                    badge="Intro Guide"
                    onSkip={handleSkipIntroVideo}
                    onEnded={handleIntroVideoEnded}
                  />
                )}

                {/* Guide Video Overlay (First stage of session if video exists) */}
                {!isIntroVideoActive && sessionState === "guide_video" && currentAsana.videoUrl && (
                  <GuideVideoOverlay
                    asana={currentAsana}
                    onSkip={skipGuideVideo}
                    onEnded={finishGuideVideo}
                  />
                )}

                {/* Center / Countdown Overlay */}
                {sessionState === "countdown" && countdown !== null && (
                  <div className="absolute inset-0 flex items-center justify-center bg-emerald-950/40 backdrop-blur-[2px]">
                    <div className="text-center bg-white/95 rounded-3xl p-6 shadow-2xl border border-emerald-100 max-w-xs">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-800">
                        Get Ready
                      </p>
                      <p
                        className="my-2 text-6xl font-bold tabular-nums text-emerald-950"
                        style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                      >
                        {countdown}
                      </p>
                      <p className="text-xs text-slate-600 font-medium">
                        Prepare for {currentAsana.name}
                      </p>
                    </div>
                  </div>
                )}

                {/* Hold Still / Calibration Overlay */}
                {(sessionState === "hold_still" || sessionState === "calibrating") && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-950/60 backdrop-blur-[2px] p-4">
                    <div className="text-center bg-white/95 rounded-3xl p-6 shadow-2xl border border-emerald-200 max-w-sm w-full animate-in fade-in zoom-in-95 duration-200">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-800 mb-1">
                        Body Position Check
                      </p>
                      <h4 className="text-xl font-bold text-slate-900">
                        Hold still for a moment
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 mb-4">
                        Stay steady while your coach checks your alignment points.
                      </p>

                      {/* Visibility Warning Prompt */}
                      {visibilityWarning && (
                        <div className="mb-4 rounded-xl bg-amber-50 border border-amber-200 p-2.5 text-xs font-semibold text-amber-900">
                          {visibilityWarning}
                        </div>
                      )}

                      {/* Stability Progress Bar */}
                      <div className="w-full bg-slate-100 rounded-full h-3.5 p-0.5 border border-slate-200 overflow-hidden">
                        <div
                          className="bg-emerald-600 h-full rounded-full transition-all duration-200 ease-out"
                          style={{ width: `${calibrationProgress}%` }}
                        />
                      </div>
                      <div className="flex justify-between items-center mt-2 text-[11px] font-semibold text-slate-500">
                        <span>Stabilizing...</span>
                        <span className="font-mono text-emerald-800">{calibrationProgress}%</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step-by-Step Guidance Banner in Camera View */}
                {sessionState === "coaching" && currentAsana.instructions[currentStepIndex] && (
                  <div className="absolute top-14 left-1/2 -translate-x-1/2 max-w-lg w-11/12 rounded-2xl bg-white/95 text-emerald-950 px-5 py-3 shadow-xl backdrop-blur-md border border-emerald-100 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="flex items-center justify-between gap-2 mb-1.5 pb-1 border-b border-emerald-50">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                        Step {currentStepIndex + 1} of {currentAsana.instructions.length}
                      </span>
                      {/* Step Timeline Progress Indicator */}
                      <div className="flex items-center gap-1.5">
                        {currentAsana.instructions.map((_, idx) => (
                          <span
                            key={idx}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              idx === currentStepIndex
                                ? "w-5 bg-emerald-600 shadow-sm"
                                : idx < currentStepIndex
                                ? "w-2 bg-emerald-400"
                                : "w-1.5 bg-emerald-100"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs font-semibold leading-snug text-emerald-950">
                      {currentAsana.instructions[currentStepIndex]}
                    </p>
                  </div>
                )}

                {/* Bottom Center: Hold Progress Banner */}
                {sessionState === "holding" && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 rounded-full bg-white/95 text-emerald-950 px-6 py-2.5 shadow-xl backdrop-blur-md border border-emerald-200/80 animate-in fade-in zoom-in-95 duration-200">
                    <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
                    </span>
                    <span className="text-xs font-bold tracking-tight text-emerald-950">
                      Hold Steady: <span className="font-mono text-emerald-700 font-extrabold">{holdTime.toFixed(1)}s</span> / {currentAsana.targetHoldSeconds.toFixed(1)}s
                    </span>
                  </div>
                )}

                {/* Pose Review Choice Modal (>= 75% accuracy threshold achieved) */}
                {sessionState === "pose_review" && (
                  <PoseReviewModal
                    asana={currentAsana}
                    score={stableScore ?? 80}
                    onDoItAgain={doItAgain}
                    onMoveToNext={moveToNextAsana}
                    isLastAsana={currentAsanaIndex + 1 >= activeAsanas.length}
                  />
                )}
              </div>

              {/* Clean Session Controls Bar (Start/Stop Camera, Record, Stop & Save, Mirror, Skeleton, Voice) */}
              <SessionControls
                isSessionActive={isSessionActive}
                onStartSession={handleStartSession}
                onStopSession={handleStopSession}
                isCameraActive={isCameraActive}
                onStartCamera={handleStartCamera}
                onStopCamera={handleStopCamera}
                videoRef={videoRef}
                isMirrored={isMirrored}
                onToggleMirror={() => setIsMirrored((v) => !v)}
                showSkeleton={showSkeleton}
                onToggleSkeleton={() => setShowSkeleton((v) => !v)}
                showVoice={showVoiceCues}
                onToggleVoice={() => setShowVoiceCues((v) => !v)}
                coachName={getCoachName(selectedCoach)}
              />

              {/* Concise Asana Instructions Card (🧘 Pose · Sanskrit + 3 concise steps) */}
              <AsanaInstructionsCard asana={currentAsana} />

              {/* Compact Key Angles Summary (Body overlay is primary) */}
              <KeyAnglesPanel jointAngles={jointAngles} compact />

              {/* Optional Developer Debug Panel (Only when explicitly enabled) */}
              {showDebugPanel && (
                <div className="rounded-2xl border border-amber-300 bg-amber-50/60 p-4 shadow-sm text-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                      Developer Debug Mode
                    </span>
                    <span className="text-[11px] text-amber-800 font-mono">
                      {result ? `${result.landmarks.length} Landmarks` : "No landmarks"}
                    </span>
                  </div>
                  <AngleDebugPanel landmarks={result?.worldLandmarks ?? null} />
                </div>
              )}
            </main>

            {/* ------------------------------------------------ */}
            {/* RIGHT: COACH PRESENCE, CORRECTIONS & TARGET POSE */}
            {/* ------------------------------------------------ */}
            <aside className="flex flex-col gap-4">
              {/* Dedicated Coach Presence with Alice/Kevin */}
              <CoachPanel
                coach={selectedCoach}
                coachName={`Coach ${getCoachName(selectedCoach)}`}
                avatarState={avatarState}
                guidanceMessage={latestCoachMessage}
                isSpeaking={voiceState.status === "speaking"}
              />

              {/* Active Posture Correction Card (Synchronized with Voice & Joint Overlay) */}
              <CorrectionCard issue={stableEvaluation?.issues[0] ?? null} />

              {/* Voice Coach Connection Widget */}
              <VoiceControls
                voiceState={voiceState}
                isSessionActive={isSessionActive}
                onToggleMute={voiceToggleMute}
                onRetry={() => voiceRetry(selectedCoach)}
              />

              {/* Steady Hold Tracker Progress Bar */}
              <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
                <HoldTimer
                  isHolding={sessionState === "holding"}
                  holdTime={holdTime}
                  targetHoldSeconds={currentAsana.targetHoldSeconds}
                />
              </div>

              {/* On-Device Privacy Guarantee Notice */}
              <PrivacyNotice />
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

