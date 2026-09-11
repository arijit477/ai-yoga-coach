import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { Maximize, Minimize } from "lucide-react";

import { CameraView } from "./CameraView";
import { PoseSkeleton } from "./PoseSkeleton";
import { AngleDebugPanel } from "./AngleDebugPanel";

import { usePoseTracking } from "../../../hooks/usePoseTracking";
import { usePoseEvaluation } from "../../../hooks/usePoseEvaluation";
import { useStablePoseEvaluation } from "../../../hooks/useStablePoseEvaluation";
import { useStableScore } from "../../../hooks/useStableScore";
import { useCoachState } from "../../../hooks/useCoachState";
import { useCoachSession } from "../../../hooks/useCoachSession";
import { PoseScore } from "./PoseScore";
import { CorrectionCard } from "./CorrectionCard";
import { AsanaInstruction } from "./AsanaInstruction";
import { AsanaProgress } from "./AsanaProgress";
import { AsanaTransition } from "./AsanaTransition";
import { useAICoachStore } from "../store/aiCoachStore";
import type { CoachPersona } from "../types/coach-session";
import { AICoachScene } from "../3d/AICoachScene";
import { AvatarPlayer } from "../avatar/AvatarPlayer";
import { AvatarController } from "../avatar/AvatarController";
import type { CoachId, AvatarState } from "../avatar/avatar.types";
import { useRealtimeVoice } from "../voice";

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

function getCoachAvatar(coach: CoachPersona): string {
  return coach === "alice" ? "/images/alice.jpg" : "/images/kevin.jpg";
}

function getCoachDescription(coach: CoachPersona): string {
  return coach === "alice"
    ? "Your calm and encouraging yoga coach."
    : "Your focused and energetic yoga coach.";
}

function getSessionLabel(
  state: ReturnType<typeof useCoachSession>["state"],
): string {
  switch (state) {
    case "idle":
      return "Ready";

    case "countdown":
      return "Get Ready";

    case "detecting":
      return "Detecting";

    case "analyzing":
      return "Analyzing";

    case "correcting":
      return "Correction Needed";

    case "holding":
      return "Hold Position";

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

export function AICoachPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const {
    currentAsana,
    currentAsanaIndex,
    sessionAsanas,
    sessionLength,
    setSessionLength,
    selectedCoach,
    setSelectedCoach,
    markAsanaCompleted,
    canAccessAsanaIndex,
    setCurrentAsanaIndex,
    skipToAsanaIndex,
    goBackToAsanaIndex,
    skippedAsanaIds,
  } = useAICoachStore();

  const activeAsanas = useMemo(() => {
    return sessionAsanas.slice(0, sessionLength);
  }, [sessionAsanas, sessionLength]);

  const nextUpcomingAsana =
    currentAsanaIndex + 1 < activeAsanas.length
      ? activeAsanas[currentAsanaIndex + 1]
      : null;

  /*
   * Pose tracking
   */
  const { result, isInitialized, error } = usePoseTracking(videoRef);

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
   * Multi-asana session state configured dynamically
   */
  const {
    state: sessionState,
    countdown,
    holdTime,
    transitionCountdown,
    startSession,
    stopSession,
    resetSession,
    skipTransition,
  } = useCoachSession({
    evaluation: stableEvaluation,
    isInitialized,
    hasPose: Boolean(result),
    targetHoldSeconds: currentAsana.targetHoldSeconds,
    currentAsanaIndex,
    totalAsanas: activeAsanas.length,
    onAsanaComplete: useCallback((idx: number) => {
      markAsanaCompleted(activeAsanas[idx].id);
    }, [activeAsanas, markAsanaCompleted]),
    onAdvanceAsana: useCallback((nextIdx: number) => {
      setCurrentAsanaIndex(nextIdx);
    }, [setCurrentAsanaIndex]),
  });

  /*
   * High-level coaching state
   */
  const coachState = useCoachState({
    isInitialized,
    hasPose: Boolean(result),
    evaluation: stableEvaluation,
  });

  /*
   * Avatar state and control
   */
  const avatarControllerRef = useRef<AvatarController | null>(null);
  const [avatarState, setAvatarState] = useState<AvatarState>("idle");
  const [isPlayingIntro, setIsPlayingIntro] = useState(false);

  const {
    state: voiceState,
    connect: voiceConnect,
    disconnect: voiceDisconnect,
    toggleMute: voiceToggleMute,
    dispatchEvent: voiceDispatch,
  } = useRealtimeVoice();

  const handleStartSession = useCallback(() => {
    setIsPlayingIntro(true);
    setAvatarState("intro");
    voiceConnect(selectedCoach);
  }, [selectedCoach, voiceConnect]);

  const handleIntroEnded = useCallback(() => {
    setIsPlayingIntro(false);
    setAvatarState("idle");
    startSession();
  }, [startSession]);

  const handleIntroError = useCallback(() => {
    setIsPlayingIntro(false);
    setAvatarState("idle");
    startSession();
  }, [startSession]);

  useEffect(() => {
    if (avatarControllerRef.current) {
        avatarControllerRef.current.reset();
        setAvatarState("idle");
        setIsPlayingIntro(false);
    }
    voiceDisconnect();
  }, [selectedCoach, voiceDisconnect]);

  /*
   * Map evaluation to Voice Events
   */
  useEffect(() => {
    if (
      sessionState === "idle" ||
      sessionState === "completed" ||
      sessionState === "session_completed" ||
      !stableEvaluation
    ) {
      return;
    }

    if (coachState === "correcting" && stableEvaluation.issues.length > 0) {
      const primaryIssue = stableEvaluation.issues[0];
      voiceDispatch({
        id: Date.now().toString(),
        type: "pose_correction",
        asanaId: currentAsana.id,
        asanaName: currentAsana.name,
        ruleId: primaryIssue.ruleId,
        issue: primaryIssue.feedback,
        severity: primaryIssue.severity,
        timestamp: Date.now(),
      });
    } else if (coachState === "good_form" || coachState === "holding") {
      voiceDispatch({
        id: Date.now().toString(),
        type: "good_form",
        asanaId: currentAsana.id,
        asanaName: currentAsana.name,
        feedback: "Great form, keep holding.",
        timestamp: Date.now(),
      });
    }
  }, [coachState, stableEvaluation, currentAsana, sessionState, voiceDispatch]);

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

  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(console.error);
    } else {
      document.exitFullscreen().catch(console.error);
    }
  };

  const hasPose = Boolean(result);

  const isSessionActive =
    sessionState !== "idle" &&
    sessionState !== "completed" &&
    sessionState !== "session_completed";

  const sessionLabel = getSessionLabel(sessionState);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/60 px-4 py-6 text-slate-900 md:px-6 font-display font-medium">
      <div className="mx-auto max-w-7xl">
        {/* ====================================================== */}
        {/* HEADER */}
        {/* ====================================================== */}

        <header className="mb-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-700">
                  AI POWERED
                </span>

                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700">
                  REAL-TIME
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                AI Personal Yoga Coach
              </h1>

              <p className="mt-2 text-sm text-slate-500 md:text-base">
                Real-time posture guidance across your customized yoga routine.
              </p>
            </div>

            {/* Coach & Length selector */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Fullscreen Toggle */}
              <button
                type="button"
                onClick={toggleFullscreen}
                className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white p-2.5 text-slate-500 shadow-sm transition hover:bg-slate-100 hover:text-slate-900"
                title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              >
                {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
              </button>

              {/* Session length config */}
              {!isSessionActive && (
                <div className="flex items-center gap-1 rounded-2xl border border-slate-200 bg-white p-1 text-xs shadow-sm">
                  <span className="px-2 text-slate-500 font-medium">Poses:</span>
                  {[3, 5, sessionAsanas.length].map((len) => (
                    <button
                      key={len}
                      type="button"
                      onClick={() => {
                        resetSession();
                        setSessionLength(len);
                      }}
                      className={`rounded-xl px-2.5 py-1.5 font-medium transition ${
                        sessionLength === len
                          ? "bg-indigo-600 text-white shadow-sm"
                          : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      {len === sessionAsanas.length ? `Full (${len})` : len}
                    </button>
                  ))}
                </div>
              )}

              {/* Coach selector */}
              <div className="flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm">
                <button
                  type="button"
                  onClick={() => setSelectedCoach("alice")}
                  className={`flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                    selectedCoach === "alice"
                      ? "bg-slate-900 text-white shadow-md"
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <img
                    src="/images/alice.jpg"
                    alt="Alice"
                    className="h-6 w-6 rounded-full object-cover border border-slate-300"
                  />
                  <span>Alice</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedCoach("kevin")}
                  className={`flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                    selectedCoach === "kevin"
                      ? "bg-slate-900 text-white shadow-md"
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <img
                    src="/images/kevin.jpg"
                    alt="Kevin"
                    className="h-6 w-6 rounded-full object-cover border border-slate-300"
                  />
                  <span>Kevin</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* ====================================================== */}
        {/* ASANA SESSION PROGRESS */}
        {/* ====================================================== */}
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

        {/* ====================================================== */}
        {/* MAIN */}
        {/* ====================================================== */}

        <div className="grid gap-6 lg:grid-cols-[1fr_2fr_1fr] relative">
          {/* ================================================== */}
          {/* 3D OVERLAY */}
          {/* ================================================== */}
          <AICoachScene 
            evaluation={stableEvaluation}
            sessionState={sessionState}
            holdTime={holdTime}
            hasPose={hasPose}
          />

          {/* ================================================== */}
          {/* REFERENCE POSE CARD (LEFT) */}
          {/* ================================================== */}
          <div className="lg:col-span-1 flex flex-col gap-5 relative z-0">
            <AsanaInstruction asana={currentAsana} />
          </div>

          {/* ================================================== */}
          {/* CAMERA (CENTER) */}
          {/* ================================================== */}

          <div className="lg:col-span-1 flex flex-col gap-4 relative z-0">
            {/* Camera Viewport */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl">
              <CameraView videoRef={videoRef} />

              {/* Pose Skeleton */}
              {result && (
                <PoseSkeleton
                  landmarks={result.landmarks}
                  videoWidth={videoSize.width}
                  videoHeight={videoSize.height}
                  coach={selectedCoach}
                />
              )}

              {/* Top-left coach status with avatar */}
              <div className="absolute left-4 top-4 flex items-center gap-2.5 rounded-2xl border border-white/10 bg-black/60 px-3 py-2 backdrop-blur-md">
                <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full border border-white/20">
                  <img
                    src={getCoachAvatar(selectedCoach)}
                    alt={getCoachName(selectedCoach)}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wider text-white/40 leading-none">
                    Coach
                  </p>
                  <p className="text-xs font-semibold text-white leading-tight mt-0.5">
                    {getCoachName(selectedCoach)}
                  </p>
                </div>
                <div
                  className={`ml-1 h-2 w-2 rounded-full ${
                    error
                      ? "bg-red-400"
                      : hasPose
                        ? "bg-emerald-400 animate-pulse"
                        : "bg-blue-400"
                  }`}
                />
              </div>

              {/* Top-right tracking status */}
              <div className="absolute right-4 top-4 rounded-2xl border border-white/10 bg-black/60 px-3.5 py-2 backdrop-blur-md">
                <p className="text-[10px] font-medium uppercase tracking-wider text-white/40">
                  Tracking
                </p>

                <p className="text-xs font-semibold mt-0.5">
                  {error
                    ? "Camera Error"
                    : hasPose
                      ? "Body Detected"
                      : isInitialized
                        ? "Searching..."
                        : "Initializing..."}
                </p>
              </div>

              {/* Reference pose thumbnail preview on camera */}
              <div className="absolute left-4 top-16 hidden sm:flex items-center gap-2.5 rounded-2xl border border-white/10 bg-black/70 p-2 backdrop-blur-md shadow-lg">
                <img
                  src={currentAsana.imageUrl}
                  alt={currentAsana.name}
                  className="h-12 w-12 rounded-xl object-contain bg-slate-900/90 p-1 border border-white/5"
                />
                <div className="pr-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-300">
                    Target Form
                  </span>
                  <p className="text-xs font-bold text-white leading-tight">
                    {currentAsana.name}
                  </p>
                  <p className="text-[10px] text-emerald-300">
                    {currentAsana.targetHoldSeconds}s hold
                  </p>
                </div>
              </div>

              {/* Bottom coach message with avatar */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="rounded-2xl border border-white/10 bg-black/75 p-3.5 backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/20 shadow-md">
                      <img
                        src={getCoachAvatar(selectedCoach)}
                        alt={getCoachName(selectedCoach)}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-medium text-white/40">
                        {getCoachName(selectedCoach)}
                      </p>

                      <p className="mt-0.5 text-sm font-medium text-white md:text-base leading-snug">
                        {error
                          ? error
                          : getCoachStateMessage(coachState)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Countdown */}
              {sessionState === "countdown" && countdown !== null && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
                  <div className="text-center">
                    <p className="text-sm font-medium uppercase tracking-[0.25em] text-white/60">
                      Get Ready
                    </p>

                    <p className="mt-3 text-8xl font-bold tabular-nums">
                      {countdown}
                    </p>

                    <p className="mt-3 text-sm text-white/60">
                      Prepare for {currentAsana.name}
                    </p>
                  </div>
                </div>
              )}

              {/* Live score */}
              {stableEvaluation && sessionState !== "idle" && (
                <div className="absolute bottom-24 right-4 hidden md:block">
                  <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full border-4 border-white/20 bg-black/70 backdrop-blur-md">
                    <span className="text-2xl font-bold">
                      {stableScore ?? "--"}
                    </span>

                    <span className="text-[9px] uppercase tracking-wider text-white/40">
                      Score
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* ================================================== */}
            {/* TRACKING SECTIONS: SIDE BY SIDE UNDER CAMERA */}
            {/* ================================================== */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card 1: Live System Status */}
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        error
                          ? "bg-red-500"
                          : hasPose
                            ? "bg-emerald-500 animate-pulse"
                            : "bg-amber-500"
                      }`}
                    />
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Live System Status
                    </h3>
                  </div>
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-500 border border-slate-200">
                    {hasPose ? "Active Stream" : "Standby"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
                    <p className="text-[11px] font-medium text-slate-500">Pose Tracker</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {isInitialized ? "Ready" : "Initializing"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
                    <p className="text-[11px] font-medium text-slate-500">Body</p>
                    <p className="mt-1 text-sm font-semibold text-emerald-600">
                      {hasPose ? "Detected" : "Searching"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
                    <p className="text-[11px] font-medium text-slate-500">Landmarks</p>
                    <p className="mt-1 text-sm font-semibold font-mono text-slate-900">
                      {result ? `${result.landmarks.length} / 33` : "--"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
                    <p className="text-[11px] font-medium text-slate-500">Confidence</p>
                    <p className="mt-1 text-sm font-semibold font-mono text-indigo-600">
                      {result ? `${Math.round(result.confidence * 100)}%` : "--"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2: Pose Geometry (Angles) */}
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Pose Geometry
                    </h3>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">
                    3D Angles
                  </span>
                </div>

                <AngleDebugPanel landmarks={result?.worldLandmarks ?? null} />
              </div>
            </div>
          </div>

          {/* ================================================== */}
          {/* COACH & GUIDANCE PANEL (RIGHT) */}
          {/* ================================================== */}

          <div className="lg:col-span-1 flex flex-col gap-5">
            {/* Coach Identity Card with Video Avatar */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
              <div className="relative mb-5 w-full aspect-[4/5] sm:aspect-video lg:aspect-[4/5] rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                <AvatarPlayer 
                  coach={selectedCoach as CoachId} 
                  state={avatarState} 
                  autoPlay={isPlayingIntro}
                  muted={!isPlayingIntro}
                  controllerRef={avatarControllerRef}
                  onEnded={isPlayingIntro ? handleIntroEnded : undefined}
                  onError={isPlayingIntro ? handleIntroError : undefined}
                />
                
                <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 backdrop-blur-md">
                   <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                   <span className="text-[9px] font-bold uppercase tracking-wider text-white">Live</span>
                </div>

                <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-xl bg-black/50 px-3 py-1.5 backdrop-blur-md">
                   <p className="text-[10px] font-bold uppercase tracking-wider text-white/60">
                     AI COACH
                   </p>
                   <p className="text-sm font-semibold text-white">
                     {getCoachName(selectedCoach)}
                   </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 mb-2">
                <p className="text-lg font-semibold text-slate-900">
                  {getCoachName(selectedCoach)}
                </p>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600">
                    {isPlayingIntro ? "Intro" : sessionLabel}
                  </span>
                  
                  {/* Voice Status Indicator */}
                  {voiceState.status !== "disconnected" && (
                    <button
                      onClick={voiceToggleMute}
                      className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition ${
                        voiceState.status === "error"
                          ? "border-red-200 bg-red-50 text-red-600"
                          : voiceState.isMuted
                          ? "border-amber-200 bg-amber-50 text-amber-600"
                          : "border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          voiceState.status === "error"
                            ? "bg-red-500"
                            : voiceState.isMuted
                            ? "bg-amber-500"
                            : voiceState.status === "speaking"
                            ? "bg-indigo-500 animate-pulse"
                            : "bg-indigo-400"
                        }`}
                      />
                      {voiceState.status === "error"
                        ? "Voice Error"
                        : voiceState.isMuted
                        ? "Muted"
                        : voiceState.status === "connecting"
                        ? "Connecting..."
                        : voiceState.status === "speaking"
                        ? "Speaking..."
                        : "Listening..."}
                    </button>
                  )}
                </div>
              </div>

              <p className="text-sm leading-6 text-slate-600">
                {getCoachDescription(selectedCoach)}
              </p>

              {/* Start Routine CTA */}
              {sessionState === "idle" && !isPlayingIntro && (
                <button
                  type="button"
                  onClick={handleStartSession}
                  className="mt-4 w-full rounded-2xl bg-slate-900 px-4 py-3.5 font-bold text-white transition hover:bg-slate-800 shadow-md"
                >
                  Start {currentAsana.name}
                </button>
              )}
            </div>

            {/* Real-Time Session Guidance (Active states) */}
            {sessionState !== "idle" && (
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6 flex flex-col gap-4">
                {/* Countdown */}
                {sessionState === "countdown" && countdown !== null && (
                  <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5 text-center">
                    <p className="text-xs uppercase tracking-wider text-slate-500">
                      Get Ready
                    </p>

                    <p className="mt-2 text-5xl font-bold tabular-nums text-indigo-900">
                      {countdown}
                    </p>

                    <p className="mt-2 text-sm text-slate-600">
                      Prepare for {currentAsana.name}
                    </p>
                  </div>
                )}

                {/* Pose Score */}
                {stableEvaluation && (
                  <PoseScore
                    evaluation={stableEvaluation}
                    score={stableScore}
                  />
                )}

                {/* Coach Correction */}
                {stableEvaluation && (
                  <div>
                    {stableEvaluation.issues.length > 0 ? (
                      <CorrectionCard
                        issue={stableEvaluation.issues[0] ?? null}
                      />
                    ) : (
                      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-emerald-500" />

                          <p className="text-xs font-medium uppercase tracking-wider text-emerald-700">
                            Good Form
                          </p>
                        </div>

                        <p className="mt-3 text-base font-medium leading-6 text-slate-900">
                          Great form. Hold your position.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Holding Status */}
                {sessionState === "holding" && (
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center">
                    <p className="text-xs uppercase tracking-wider text-emerald-700">
                      Hold Position
                    </p>

                    <p className="mt-2 text-4xl font-bold tabular-nums text-emerald-900">
                      {holdTime.toFixed(1)}s / {currentAsana.targetHoldSeconds}s
                    </p>

                    <p className="mt-2 text-sm text-slate-600">
                      Keep your form steady.
                    </p>
                  </div>
                )}

                {/* Pose Completed */}
                {sessionState === "completed" && (
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      ✓
                    </div>

                    <p className="mt-3 text-lg font-semibold text-slate-900">
                      Excellent work!
                    </p>

                    <p className="mt-2 text-sm leading-5 text-slate-600">
                      You successfully held {currentAsana.name} for {currentAsana.targetHoldSeconds} seconds.
                    </p>

                    {stableScore !== null && (
                      <p className="mt-4 text-3xl font-bold text-slate-900">
                        {stableScore}
                        <span className="ml-1 text-sm font-normal text-slate-500">
                          / 100
                        </span>
                      </p>
                    )}

                    <div className="mt-5 flex gap-3">
                      <button
                        type="button"
                        onClick={resetSession}
                        className="flex-1 rounded-2xl border border-slate-300 bg-white px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 shadow-sm"
                      >
                        Practice Again
                      </button>
                      {currentAsanaIndex < activeAsanas.length - 1 && (
                        <button
                          type="button"
                          onClick={skipTransition}
                          className="flex-1 rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-800 shadow-md"
                        >
                          Next Pose →
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Transition to Next Asana */}
                {sessionState === "transition" && nextUpcomingAsana && (
                  <AsanaTransition
                    completedAsana={currentAsana}
                    nextAsana={nextUpcomingAsana}
                    remainingSeconds={transitionCountdown}
                    onSkipWait={skipTransition}
                  />
                )}

                {/* Entire Multi-Asana Session Completed */}
                {sessionState === "session_completed" && (
                  <div className="rounded-3xl border border-indigo-200 bg-indigo-50 p-6 text-center shadow-md">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-3xl text-emerald-600">
                      🏆
                    </div>

                    <h3 className="mt-4 text-2xl font-bold text-indigo-900">
                      Routine Completed!
                    </h3>

                    <p className="mt-2 text-sm text-slate-600">
                      You have successfully completed all {activeAsanas.length} asanas in your routine.
                    </p>

                    <div className="mt-5 grid grid-cols-2 gap-3 rounded-2xl border border-slate-200 bg-white p-3 text-left">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-slate-500">
                          Asanas Mastered
                        </p>
                        <p className="text-xl font-bold text-emerald-600">
                          {activeAsanas.length} / {activeAsanas.length}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-slate-500">
                          Final Score
                        </p>
                        <p className="text-xl font-bold text-slate-900">
                          {stableScore ?? 92} <span className="text-xs text-slate-500">/ 100</span>
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={resetSession}
                      className="mt-5 w-full rounded-2xl bg-slate-900 px-4 py-3.5 font-bold text-white transition hover:bg-slate-800 shadow-lg"
                    >
                      Start Routine Again
                    </button>
                  </div>
                )}

                {/* Stop Session Button */}
                {isSessionActive && (
                  <button
                    type="button"
                    onClick={stopSession}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-800"
                  >
                    Stop Session
                  </button>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}