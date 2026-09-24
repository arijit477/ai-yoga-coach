import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { Maximize, Minimize, Camera, CameraOff } from "lucide-react";

import { CameraView } from "./CameraView";
import { PoseSkeleton } from "./PoseSkeleton";
import { CircularScoreRing } from "./CircularScoreRing";
import { HoldTimer } from "./HoldTimer";

import { usePoseTracking } from "../../../hooks/usePoseTracking";
import { usePoseEvaluation } from "../../../hooks/usePoseEvaluation";
import { useCoachState } from "../../../hooks/useCoachState";
import { useCoachSession } from "../../../hooks/useCoachSession";
import { AsanaSelector } from "./AsanaSelector";
import { GuideVideoOverlay } from "./GuideVideoOverlay";
import { PoseReviewModal } from "./PoseReviewModal";
import { SessionReportModal } from "./SessionReportModal";
import { useAICoachStore } from "../store/aiCoachStore";
import type { CoachPersona } from "../types/coach-session";
import { useRealtimeVoice, CoachingEventBuilder } from "../voice";
import { CoachingEventEngine } from "../voice/CoachingEventEngine";

import type { AvatarState } from "../avatar/avatar.types";
import { CoachSelector } from "./CoachSelector";
import { CoachPanel } from "./CoachPanel";
import { SessionControls } from "./SessionControls";
import { AsanaReference } from "./AsanaReference";
import { PrivacyNotice } from "./PrivacyNotice";
import { SafetyGuideBanner } from "./SafetyGuideBanner";
import { AsanaInstructionsCard } from "./AsanaInstructionsCard";
import { getAsanaVideoUrl } from "../data/freeAsanas";
import { PostureCheckPanel } from "./PostureCheckPanel";
import { PostureCheckOverlay } from "./PostureCheckOverlay";
import { analyzePosture } from "../analysis/PostureAnalyzer";

function getCoachStateMessage(state: ReturnType<typeof useCoachState>): string {
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
      return "Posture scanned & aligned. Hold this position.";

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

//guide video url from supabase
const INTRO_GUIDE_VIDEO_URL = getAsanaVideoUrl(
  "guide-videos/AI%20Yoga%20Coach.mp4",
);

export function AICoachPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Introductory guide video state (plays inside camera stage on initial page load)
  const [isIntroVideoActive, setIsIntroVideoActive] = useState(true);

  // Dedicated manual camera power state (starts on intro video completion/skip)
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
    setCurrentAsana,
    setCurrentAsanaIndex,
    completedAsanaIds,
    completedAsanaScores,
  } = useAICoachStore();

  const activeAsanas = useMemo(() => {
    return sessionAsanas.slice(0, sessionLength);
  }, [sessionAsanas, sessionLength]);

  const completedAsanasForReport = useMemo(() => {
    return activeAsanas
      .filter((a) => completedAsanaIds.includes(a.id))
      .map((a) => ({
        asana: a,
        score: completedAsanaScores[a.id] ?? 80,
      }));
  }, [activeAsanas, completedAsanaIds, completedAsanaScores]);

  /*
   * Pose tracking
   */
  const { result, isInitialized, error, cameraState } = usePoseTracking(
    videoRef,
    isCameraActive,
  );

  /*
   * Dynamic pose evaluation receiving rules for currentAsana
   */
  const stableEvaluation = usePoseEvaluation(result, currentAsana.id);

  /**
   * Keep score text smooth to prevent rapid flickering numbers
   */
  const stableScore = stableEvaluation?.score ?? null;

  /**
   * Posture Check — derived from live MediaPipe landmarks.
   * Re-runs every frame a new result arrives; no extra detection pipeline.
   */
  const postureCheck = useMemo(
    () => analyzePosture(result?.landmarks ?? null),
    [result],
  );

  const {
    state: voiceState,
    start: voiceStart,
    stop: voiceStop,
    toggleMute: voiceToggleMute,
    toggleConversationMode: voiceToggleConversationMode,
    updateSessionContext: voiceUpdateContext,
    triggerPoseStart: voiceTriggerPoseStart,
    dispatchEvent: voiceDispatch,
  } = useRealtimeVoice();

  // Keep coach connection updated when switching coach (Alice <-> Kevin) ONLY if voice is already active
  const prevCoachRef = useRef(selectedCoach);
  useEffect(() => {
    if (prevCoachRef.current !== selectedCoach) {
      prevCoachRef.current = selectedCoach;
      if (
        voiceState.status === "connected" ||
        voiceState.status === "speaking" ||
        voiceState.status === "connecting"
      ) {
        voiceStart(selectedCoach);
      }
    }
  }, [selectedCoach, voiceStart, voiceState.status]);

  const coachingEngineRef = useRef<CoachingEventEngine | null>(null);
  if (!coachingEngineRef.current) {
    coachingEngineRef.current = new CoachingEventEngine();
  }

  // Track one-shot events per asana to avoid redundant dispatching
  const hasDispatchedStartRef = useRef<string | null>(null);
  const hasDispatchedHeldRef = useRef<string | null>(null);
  const hasDispatchedCompletedRef = useRef<string | null>(null);
  const hasDispatchedThresholdRef = useRef<string | null>(null);
  const lastAnnouncedCountdownRef = useRef<number | null>(null);
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

  // Score to display after asana completes (animates from standby to final score)
  const [finalAsanaScore, setFinalAsanaScore] = useState<number | null>(null);

  /*
   * Multi-asana session state configured dynamically
   */
  const {
    state: sessionState,
    countdown,
    holdTime,
    currentStepIndex,
    startSession,
    skipGuideVideo,
    finishGuideVideo,
    stopSession,
    resetSession,
    moveToNextAsana,
    stayHere,
  } = useCoachSession({
    evaluation: stableEvaluation
      ? { ...stableEvaluation, score: stableScore ?? stableEvaluation.score }
      : null,
    landmarks: result?.landmarks ?? null,
    isInitialized,
    hasPose: Boolean(result),
    targetHoldSeconds: currentAsana.targetHoldSeconds,
    currentAsanaIndex,
    totalAsanas: activeAsanas.length,
    hasGuideVideo: Boolean(currentAsana.videoUrl),
    instructionsCount: currentAsana.instructions.length,
    onAsanaComplete: useCallback(
      (idx: number, score?: number) => {
        markAsanaCompleted(activeAsanas[idx].id, score ?? 80);
      },
      [activeAsanas, markAsanaCompleted],
    ),
    onAdvanceAsana: useCallback(
      (nextIdx: number) => {
        setFinalAsanaScore(null);
        setCurrentAsanaIndex(nextIdx);
      },
      [setCurrentAsanaIndex],
    ),
    onCalibrationPrompt: useCallback(
      (promptMessage?: string) => {
        const msg =
          promptMessage ||
          "Hold still for a moment while I check your position.";
        const key = `${currentAsana.id}_${msg}`;
        if (hasDispatchedCalibrationPromptRef.current !== key) {
          hasDispatchedCalibrationPromptRef.current = key;
          voiceDispatch(
            CoachingEventBuilder.buildCalibrationPromptEvent(
              currentAsana.id,
              currentAsana.name,
              msg,
            ),
            { isUserSpeaking: voiceState.status === "listening" },
          );
        }
      },
      [currentAsana.id, currentAsana.name, voiceDispatch],
    ),
    onCalibrationComplete: useCallback(() => {
      if (hasDispatchedCalibrationCompleteRef.current !== currentAsana.id) {
        hasDispatchedCalibrationCompleteRef.current = currentAsana.id;
        voiceDispatch(
          CoachingEventBuilder.buildCalibrationCompleteEvent(
            currentAsana.id,
            currentAsana.name,
          ),
          { isUserSpeaking: voiceState.status === "listening" },
        );
      }
    }, [currentAsana.id, currentAsana.name, voiceDispatch]),
    onStepChange: useCallback(
      (stepIdx: number) => {
        const stepInstruction = currentAsana.instructions[stepIdx];
        if (stepInstruction) {
          voiceDispatch(
            CoachingEventBuilder.buildStepGuidanceEvent(
              currentAsana.id,
              currentAsana.name,
              stepInstruction,
            ),
            { isUserSpeaking: voiceState.status === "listening" },
          );
        }
      },
      [
        currentAsana.id,
        currentAsana.name,
        currentAsana.instructions,
        voiceDispatch,
      ],
    ),
    onPoseReviewReady: useCallback((score: number) => {
      setFinalAsanaScore(score);
    }, []),
  });

  const isSessionActive =
    sessionState !== "idle" &&
    sessionState !== "completed" &&
    sessionState !== "session_completed";

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
    hasDispatchedThresholdRef.current = null;
    lastAnnouncedCountdownRef.current = null;
    hasDispatchedCalibrationPromptRef.current = null;
    hasDispatchedCalibrationCompleteRef.current = null;
    coachingEngineRef.current?.reset();

    if (!isCameraActive) {
      handleStartCamera();
    }
    startSession();

    // When practice starts, trigger active coaching guidance
    if (
      voiceState.status === "connected" ||
      voiceState.status === "speaking"
    ) {
      voiceDispatch(
        CoachingEventBuilder.buildPoseStartedEvent(
          currentAsana.id,
          currentAsana.name,
          currentAsana.description
        ),
      );
    } else {
      voiceStart(selectedCoach);
      voiceTriggerPoseStart(currentAsana.id, currentAsana.name, currentAsana.description);
    }
  }, [
    isCameraActive,
    handleStartCamera,
    startSession,
    voiceState.status,
    voiceDispatch,
    voiceTriggerPoseStart,
    voiceStart,
    selectedCoach,
    currentAsana.id,
    currentAsana.name,
    currentAsana.description,
  ]);

  const handleStopSession = useCallback(() => {
    stopSession();
    voiceStop(); // Stop speaking and disconnect voice coach immediately
    hasDispatchedStartRef.current = null;
    hasDispatchedHeldRef.current = null;
    hasDispatchedCompletedRef.current = null;
    hasDispatchedThresholdRef.current = null;
    lastAnnouncedCountdownRef.current = null;
    hasDispatchedCalibrationPromptRef.current = null;
    hasDispatchedCalibrationCompleteRef.current = null;
    lastSentContextRef.current = null;
    coachingEngineRef.current?.reset();
  }, [stopSession, voiceStop]);

  // Reset per-asana dispatch locks when coach persona changes
  useEffect(() => {
    hasDispatchedStartRef.current = null;
    hasDispatchedHeldRef.current = null;
    hasDispatchedCompletedRef.current = null;
    hasDispatchedThresholdRef.current = null;
    lastAnnouncedCountdownRef.current = null;
    lastSentContextRef.current = null;
  }, [selectedCoach]);

  // Reset per-asana dispatch locks and handle throttled session context updates
  useEffect(() => {
    hasDispatchedStartRef.current = null;
    hasDispatchedHeldRef.current = null;
    hasDispatchedCompletedRef.current = null;
    hasDispatchedThresholdRef.current = null;
    lastAnnouncedCountdownRef.current = null;
  }, [currentAsana.id]);

  // Dispatch camera state changes as voice events
  // Now handled by CoachingEventEngine in the main pipeline

  const scoreHistoryRef = useRef<number[]>([]);

  // Throttled session context synchronization to OpenAI Realtime
  useEffect(() => {
    const primaryRuleId = stableEvaluation?.primaryIssue?.ruleId ?? null;
    const currentScore = stableScore;
    const prev = lastSentContextRef.current;

    const shouldSendContext =
      !prev ||
      prev.coach !== selectedCoach ||
      prev.asanaId !== currentAsana.id ||
      prev.coachState !== coachState ||
      prev.sessionState !== sessionState ||
      prev.primaryIssueRuleId !== primaryRuleId ||
      (currentScore !== null &&
        prev.score !== null &&
        Math.abs(currentScore - prev.score) >= 6) ||
      (currentScore !== null && prev.score === null);

    if (shouldSendContext) {
      let scoreTrend: "improving" | "worsening" | "stable" = "stable";
      if (currentScore !== null) {
        scoreHistoryRef.current.push(currentScore);
        if (scoreHistoryRef.current.length > 5) {
          scoreHistoryRef.current.shift();
        }
      } else {
        scoreHistoryRef.current = [];
      }

      if (scoreHistoryRef.current.length >= 3) {
        const first = scoreHistoryRef.current[0];
        const last =
          scoreHistoryRef.current[scoreHistoryRef.current.length - 1];
        if (last - first >= 5) scoreTrend = "improving";
        else if (first - last >= 5) scoreTrend = "worsening";
      }

      const completedPoses = completedAsanasForReport.map((a) => ({
        name: a.asana.name,
        score: a.score,
      }));
      const previousAsanaName =
        completedPoses.length > 0
          ? completedPoses[completedPoses.length - 1].name
          : undefined;
      const previousScore =
        completedPoses.length > 0
          ? completedPoses[completedPoses.length - 1].score
          : undefined;

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
        isSessionActive,
        cameraState,
        hasPose: Boolean(result),
        userVisible: Boolean(result),
        holdTime,
        recentEvents: coachingEngineRef.current?.getRecentEvents() || [],
        scoreTrend,
        completedPoses,
        previousAsanaName,
        previousScore,
        primaryIssue: stableEvaluation?.primaryIssue
          ? {
              ruleId: stableEvaluation.primaryIssue.ruleId,
              joint: stableEvaluation.primaryIssue.joint,
              severity: stableEvaluation.primaryIssue.severity,
              currentValue: Math.round(
                stableEvaluation.primaryIssue.currentValue,
              ),
              currentAngle: Math.round(
                stableEvaluation.primaryIssue.currentValue,
              ),
              min: stableEvaluation.primaryIssue.min,
              max: stableEvaluation.primaryIssue.max,
              targetMin:
                stableEvaluation.primaryIssue.targetMin ??
                stableEvaluation.primaryIssue.min,
              targetMax:
                stableEvaluation.primaryIssue.targetMax ??
                stableEvaluation.primaryIssue.max,
              feedback: stableEvaluation.primaryIssue.feedback,
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
    cameraState,
    holdTime,
    completedAsanasForReport,
    voiceUpdateContext,
  ]);

  /*
   * Structured Coaching Event Pipeline:
   * MediaPipe -> PoseEvaluator -> TemporalPoseEvaluator -> CoachingEventEngine -> CoachingEventDispatcher -> RealtimeVoiceAgent
   */
  useEffect(() => {
    if (
      sessionState === "idle" ||
      sessionState === "countdown" ||
      sessionState === "guide_video"
    ) {
      return;
    }

    if (!coachingEngineRef.current) return;

    const newEvents = coachingEngineRef.current.process(
      currentAsana.id,
      currentAsana.name,
      sessionState,
      cameraState,
      stableEvaluation,
      currentAsana.description
    );

    newEvents.forEach((event) => {
      voiceDispatch(event, {
        isUserSpeaking: voiceState.status === "listening",
      });
    });
  }, [
    sessionState,
    cameraState,
    stableEvaluation,
    currentAsana,
    voiceDispatch,
    voiceState.status,
  ]);

  // Voice Countdown Effect based on holdTime
  useEffect(() => {
    if (sessionState === "holding" && holdTime > 0) {
      const remainingSeconds = Math.ceil(
        currentAsana.targetHoldSeconds - holdTime,
      );
      if (
        remainingSeconds > 0 &&
        remainingSeconds <= 10 &&
        lastAnnouncedCountdownRef.current !== remainingSeconds
      ) {
        lastAnnouncedCountdownRef.current = remainingSeconds;
        voiceDispatch(
          CoachingEventBuilder.buildHoldCountdownEvent(
            currentAsana.id,
            currentAsana.name,
            remainingSeconds,
          ),
          { isUserSpeaking: voiceState.status === "listening" },
        );
      }
    } else if (sessionState !== "holding") {
      lastAnnouncedCountdownRef.current = null;
    }
  }, [holdTime, sessionState, currentAsana, voiceDispatch]);

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

  const sessionLabel = getSessionLabel(sessionState);

  // Derive AvatarState purely from the intelligent voice state
  // This decouples the visual avatar completely from rapid MediaPipe frame updates
  const avatarState: AvatarState = useMemo(() => {
    switch (voiceState.status) {
      case "speaking":
        return "speaking";
      case "listening":
        return "listening";
      case "thinking":
        return "thinking";
      case "connected":
      case "idle":
      case "disconnected":
      case "muted":
      case "error":
      default:
        return "idle";
    }
  }, [voiceState.status]);

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

    if (stableEvaluation && stableEvaluation.primaryIssue) {
      return stableEvaluation.primaryIssue.feedback;
    }

    return getCoachStateMessage(coachState);
  }, [voiceState.transcripts, error, stableEvaluation, coachState]);

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
            <CameraView
              videoRef={videoRef}
              enabled={!isIntroVideoActive && isCameraActive}
              score={stableScore}
            />

            {/* Neon glowing skeleton overlay */}
            {!isIntroVideoActive &&
              isCameraActive &&
              result &&
              showSkeleton && (
                <PoseSkeleton
                  landmarks={result.landmarks}
                  videoWidth={videoSize.width}
                  videoHeight={videoSize.height}
                  coach={selectedCoach}
                  evaluation={stableEvaluation}
                />
              )}

            {/* Top-left: LIVE status, Asana Title & Asana Selector in Cinema Mode */}
            <div className="absolute left-5 top-5 z-20 flex items-center gap-3">
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-600/90 text-white px-3 py-1 text-xs font-bold tracking-wider uppercase shadow-md backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                {isIntroVideoActive ? "Intro Guide" : `LIVE • ${sessionLabel}`}
              </span>

              {!isIntroVideoActive && (
                <AsanaSelector
                  asanas={sessionAsanas}
                  currentAsana={currentAsana}
                  onSelectAsana={(asana) => {
                    resetSession();
                    setCurrentAsana(asana);
                  }}
                  disabled={isSessionActive}
                  isDark
                  align="left"
                />
              )}

              {isIntroVideoActive && (
                <span className="text-xl sm:text-2xl font-extrabold text-white drop-shadow-lg tracking-tight">
                  Welcome to AI Yoga Coach
                </span>
              )}
            </div>

            {/* Left-Side Posture Check Overlay (Cinema Mode) */}
            {isCameraActive && (
              <PostureCheckOverlay items={postureCheck.items} hasData={postureCheck.hasData} />
            )}

            {/* Top-Right: Target Pose Reference Card Overlaid on Fullscreen Camera */}
            <div className="absolute right-4 top-4 sm:right-6 sm:top-6 z-20">
              <AsanaReference
                asana={currentAsana}
                className="w-48 xs:w-52 sm:w-56 lg:w-60 shadow-2xl"
              />
            </div>

            {/* Top-Right Controls: Start/Stop Camera, Exit Fullscreen Button & Compact Score Ring */}
            <div className="absolute right-[180px] xs:right-[195px] sm:right-[220px] lg:right-[235px] top-4 sm:top-6 z-20 flex items-center gap-2.5">
              {/* Start / Stop Camera Toggle Button in Cinema Mode */}
              {!isCameraActive ? (
                <button
                  type="button"
                  onClick={handleStartCamera}
                  className="flex items-center gap-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 text-xs font-bold transition shadow-md active:scale-95 cursor-pointer"
                  title="Start camera"
                >
                  <Camera size={13} className="fill-white" />
                  <span className="hidden sm:inline">Start camera</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleStopCamera}
                  className="flex items-center gap-1.5 rounded-full bg-slate-800/90 hover:bg-slate-700 text-white border border-white/20 px-3 py-1.5 text-xs font-bold transition shadow-md active:scale-95 cursor-pointer"
                  title="Stop camera"
                >
                  <CameraOff size={13} />
                  <span className="hidden sm:inline">Stop camera</span>
                </button>
              )}

              {sessionState === "holding" && (
                <div className="mr-2 animate-in fade-in slide-in-from-right-2">
                  <HoldTimer
                    isHolding={true}
                    holdTime={holdTime}
                    targetHoldSeconds={currentAsana.targetHoldSeconds}
                    className="bg-white/95 backdrop-blur-md p-1.5 rounded-2xl border border-emerald-200/50 shadow-sm"
                  />
                </div>
              )}

              {isSessionActive &&
                sessionState !== "countdown" &&
                sessionState !== "guide_video" && (
                <div
                  className={
                    stableScore !== null && stableScore >= 75
                      ? "animate-[pulse_1.5s_ease-in-out_1]"
                      : ""
                  }
                >
                  <CircularScoreRing
                    score={finalAsanaScore ?? stableScore}
                    displayedScore={finalAsanaScore ?? stableEvaluation?.displayedScore ?? stableScore}
                    size={44}
                    strokeWidth={4}
                    compact
                  />
                </div>
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

            {/* Floating Mini Coach Presence Card (Cinema Mode: uses lightweight presence badge to avoid duplicate video conflict) */}
            <div className="absolute bottom-5 right-5 w-48 sm:w-56 overflow-hidden rounded-2xl border border-white/20 bg-slate-900/85 backdrop-blur-md shadow-2xl p-2.5 flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-2 z-20">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-800 shrink-0 border border-white/10 relative">
                <img
                  src={
                    selectedCoach === "alice"
                      ? "/images/alice.png"
                      : "/images/kevin.jpg"
                  }
                  alt={`Coach ${getCoachName(selectedCoach)}`}
                  className="w-full h-full object-cover object-top"
                />
                {voiceState.status === "speaking" && (
                  <div className="absolute inset-0 bg-emerald-500/20 ring-2 ring-emerald-400/50 rounded-xl" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                    Coach {getCoachName(selectedCoach)}
                  </span>
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      voiceState.status === "speaking"
                        ? "bg-emerald-400 animate-ping"
                        : voiceState.status === "listening"
                          ? "bg-teal-400 animate-pulse"
                          : "bg-emerald-500"
                    }`}
                  />
                </div>
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
            {!isIntroVideoActive &&
              sessionState === "guide_video" &&
              currentAsana.videoUrl && (
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

            {/* Step-by-Step Guidance Banner in Cinema Mode */}
            {sessionState === "coaching" &&
              currentAsana.instructions[currentStepIndex] && (
                <div className="absolute top-16 left-1/2 -translate-x-1/2 max-w-lg w-11/12 rounded-2xl bg-white/95 text-emerald-950 px-5 py-3 shadow-xl backdrop-blur-md border border-emerald-100 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between gap-2 mb-1.5 pb-1 border-b border-emerald-50">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                      Step {currentStepIndex + 1} of{" "}
                      {currentAsana.instructions.length}
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
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-3 rounded-full bg-white/95 text-emerald-950 px-6 py-2.5 shadow-xl backdrop-blur-md border border-emerald-200/80 animate-in fade-in slide-in-from-bottom-4 zoom-in-95 duration-500 hover:scale-105 transition-all">
                <span className="relative flex h-3 w-3 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                <span className="text-sm font-bold tracking-tight text-emerald-950">
                  Excellent Alignment • Hold for{" "}
                  <span className="font-mono text-emerald-700 font-extrabold">
                    {Math.ceil(currentAsana.targetHoldSeconds - holdTime)}
                  </span>{" "}
                  seconds
                </span>
              </div>
            )}

            {/* Pose Review Choice Modal in Cinema Mode */}
            {sessionState === "completed" && (
              <PoseReviewModal
                asana={currentAsana}
                score={
                  completedAsanaScores[currentAsana.id] ?? stableScore ?? 80
                }
                onMoveToNext={moveToNextAsana}
                onStayHere={stayHere}
                isLastAsana={currentAsanaIndex + 1 >= activeAsanas.length}
              />
            )}

            {/* Session Report Modal (End of session - cinema mode) */}
            {sessionState === "session_completed" && (
              <SessionReportModal
                completedAsanas={completedAsanasForReport}
                onClose={() => {
                  resetSession();
                  voiceStop();
                }}
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
          {/* Top Safety Guide Disclaimer Banner */}
          <SafetyGuideBanner className="mb-6" />

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
                Real-time posture feedback powered by private, on-device pose
                tracking. Choose your coach, step onto your mat, and flow with
                confidence.
              </p>
            </div>

            {/* Coach Quick Persona Switcher */}
            <div className="shrink-0 flex flex-wrap items-center gap-3">
              <CoachSelector
                selectedCoach={selectedCoach}
                onSelectCoach={setSelectedCoach}
                disabled={isSessionActive}
              />
            </div>
          </header>

          {/* ================================================== */}
          {/* MAIN EXPERIENCE (CAMERA-CENTERED + COACH PANEL)    */}
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
                    score={stableScore}
                  />
                )}

                {/* Body-Only MediaPipe Skeleton with Polished Neon Glow Tracer (face dots hidden) */}
                {!isIntroVideoActive &&
                  isCameraActive &&
                  result &&
                  showSkeleton && (
                    <PoseSkeleton
                      landmarks={result.landmarks}
                      videoWidth={videoSize.width}
                      videoHeight={videoSize.height}
                      coach={selectedCoach}
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
                    {isIntroVideoActive
                      ? "Welcome to AI Yoga Coach"
                      : currentAsana.name}
                  </span>

                  {isSessionActive &&
                    sessionState !== "countdown" &&
                    sessionState !== "guide_video" &&
                    isCameraActive && (
                      <CircularScoreRing
                        score={finalAsanaScore ?? stableScore}
                        displayedScore={finalAsanaScore ?? stableEvaluation?.displayedScore ?? stableScore}
                        size={38}
                        strokeWidth={4}
                        compact
                      />
                    )}
                </div>

                {/* Left-Side Posture Check Overlay — compact floating panel inside camera */}
                {isCameraActive && (
                  <PostureCheckOverlay items={postureCheck.items} hasData={postureCheck.hasData} />
                )}

                {/* Top-Right: Overlaid Target Pose Reference Card (Copy This Pose) */}
                <div className="absolute top-3 right-3 sm:top-3.5 sm:right-3.5 z-20">
                  <AsanaReference
                    asana={currentAsana}
                    className="w-44 xs:w-48 sm:w-52 md:w-56 shadow-xl"
                  />
                </div>

                {/* Bottom-Left Controls inside Camera View: Start & Stop Camera, Guide Video */}
                <div className="absolute bottom-3 left-3 sm:bottom-3.5 sm:left-3.5 z-20 flex items-center gap-2">
                  {!isCameraActive ? (
                    <button
                      type="button"
                      onClick={handleStartCamera}
                      className="flex items-center gap-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-1.5 text-xs font-bold transition shadow-lg active:scale-95 cursor-pointer backdrop-blur-md"
                      title="Start Camera"
                    >
                      <Camera size={13} className="fill-white" />
                      <span>Start camera</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleStopCamera}
                      className="flex items-center gap-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-white/20 px-3.5 py-1.5 text-xs font-bold transition shadow-lg active:scale-95 cursor-pointer backdrop-blur-md"
                      title="Stop Camera"
                    >
                      <CameraOff size={13} />
                      <span>Stop camera</span>
                    </button>
                  )}
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
                {!isIntroVideoActive &&
                  sessionState === "guide_video" &&
                  currentAsana.videoUrl && (
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

                {/* Step-by-Step Guidance Banner in Camera View */}
                {sessionState === "coaching" &&
                  currentAsana.instructions[currentStepIndex] && (
                    <div className="absolute top-14 left-1/2 -translate-x-1/2 max-w-lg w-11/12 rounded-2xl bg-white/95 text-emerald-950 px-5 py-3 shadow-xl backdrop-blur-md border border-emerald-100 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="flex items-center justify-between gap-2 mb-1.5 pb-1 border-b border-emerald-50">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                          Step {currentStepIndex + 1} of{" "}
                          {currentAsana.instructions.length}
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
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 rounded-full bg-white/95 text-emerald-950 px-6 py-2.5 shadow-xl backdrop-blur-md border border-emerald-200/80 animate-in fade-in slide-in-from-bottom-4 zoom-in-95 duration-500 hover:scale-105 transition-all">
                    <span className="relative flex h-3 w-3 items-center justify-center">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    </span>
                    <span className="text-xs font-bold tracking-tight text-emerald-950">
                      Excellent Alignment • Hold for{" "}
                      <span className="font-mono text-emerald-700 font-extrabold">
                        {Math.ceil(currentAsana.targetHoldSeconds - holdTime)}
                      </span>{" "}
                      seconds
                    </span>
                  </div>
                )}

                {/* Pose Review Choice Modal (>= 75% accuracy threshold achieved) */}
                {sessionState === "completed" && (
                  <PoseReviewModal
                    asana={currentAsana}
                    score={
                      completedAsanaScores[currentAsana.id] ?? stableScore ?? 80
                    }
                    onMoveToNext={moveToNextAsana}
                    onStayHere={stayHere}
                    isLastAsana={currentAsanaIndex + 1 >= activeAsanas.length}
                  />
                )}

                {/* Session Report Modal (End of session - normal mode) */}
                {sessionState === "session_completed" && (
                  <SessionReportModal
                    completedAsanas={completedAsanasForReport}
                    onClose={() => {
                      resetSession();
                      voiceStop();
                    }}
                  />
                )}
              </div>

              {/* Clean Session Controls Bar (Start/Stop Camera, Practice/End, Skeleton, Asana Selection) */}
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
              >
                <AsanaSelector
                  asanas={sessionAsanas}
                  currentAsana={currentAsana}
                  onSelectAsana={(asana) => {
                    resetSession();
                    setCurrentAsana(asana);
                  }}
                  disabled={isSessionActive}
                  align="right"
                />
              </SessionControls>

              {/* Concise Asana Instructions Card (🧘 Pose · Sanskrit + 3 concise steps) */}
              <AsanaInstructionsCard asana={currentAsana} />
            </main>

            {/* ------------------------------------------------ */}
            {/* RIGHT: COACH PRESENCE, CORRECTIONS & TARGET POSE */}
            {/* ------------------------------------------------ */}
            <aside className="flex flex-col gap-4">
              {/* Dedicated Coach Presence with Alice/Kevin & Integrated Multi-Button Voice Control */}
              <CoachPanel
                coach={selectedCoach}
                coachName={`Coach ${getCoachName(selectedCoach)}`}
                outfitId={useAICoachStore((s) => s.selectedOutfitId)}
                avatarState={avatarState}
                guidanceMessage={latestCoachMessage}
                isSpeaking={voiceState.status === "speaking"}
                voiceState={voiceState}
                isSessionActive={isSessionActive}
                onToggleMute={voiceToggleMute}
                onStopVoice={voiceStop}
                onToggleConversationMode={voiceToggleConversationMode}
              />

              {/* On-Device Privacy Guarantee Notice */}
              <PrivacyNotice />
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
