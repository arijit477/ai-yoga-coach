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
import { useRealtimeVoice, CoachingEventBuilder } from "../voice";

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
  return coach === "alice" ? "/images/alice.png" : "/images/kevin.jpg";
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
    updateSessionContext: voiceUpdateContext,
  } = useRealtimeVoice();

  // Track one-shot events per asana to avoid redundant dispatching
  const hasDispatchedStartRef = useRef<string | null>(null);
  const hasDispatchedHeldRef = useRef<string | null>(null);
  const hasDispatchedCompletedRef = useRef<string | null>(null);
  // Track last dispatched evaluation fingerprint to avoid re-dispatching identical feedback
  const lastEvalFingerprintRef = useRef<string | null>(null);

  const handleStartSession = useCallback(() => {
    hasDispatchedStartRef.current = null;
    hasDispatchedHeldRef.current = null;
    hasDispatchedCompletedRef.current = null;
    setIsPlayingIntro(true);
    setAvatarState("intro");
    voiceConnect(selectedCoach);
  }, [selectedCoach, voiceConnect]);

  const handleStopSession = useCallback(() => {
    stopSession();
    voiceDisconnect();
    hasDispatchedStartRef.current = null;
    hasDispatchedHeldRef.current = null;
    hasDispatchedCompletedRef.current = null;
  }, [stopSession, voiceDisconnect]);

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

  // Clean up voice connection when coach persona changes or unmounts
  useEffect(() => {
    if (avatarControllerRef.current) {
        avatarControllerRef.current.reset();
        setAvatarState("idle");
        setIsPlayingIntro(false);
    }
    voiceDisconnect();
    hasDispatchedStartRef.current = null;
    hasDispatchedHeldRef.current = null;
    hasDispatchedCompletedRef.current = null;
  }, [selectedCoach, voiceDisconnect]);

  // Reset per-asana dispatch locks whenever current asana changes
  useEffect(() => {
    hasDispatchedStartRef.current = null;
    hasDispatchedHeldRef.current = null;
    hasDispatchedCompletedRef.current = null;
    lastEvalFingerprintRef.current = null;

    // Push active asana context to OpenAI Realtime voice agent so conversational memory is maintained
    voiceUpdateContext({
      coach: selectedCoach,
      asanaId: currentAsana.id,
      asanaName: currentAsana.name,
      score: stableScore ?? undefined,
      coachState,
      sessionState,
      isHolding: sessionState === "holding",
      isCompleted: sessionState === "completed",
      primaryIssue: stableEvaluation?.issues[0] ? {
        ruleId: stableEvaluation.issues[0].ruleId,
        severity: stableEvaluation.issues[0].severity,
        currentValue: stableEvaluation.issues[0].currentValue,
        min: stableEvaluation.issues[0].min,
        max: stableEvaluation.issues[0].max,
        feedback: stableEvaluation.issues[0].feedback,
      } : null,
    });
  }, [currentAsana.id, selectedCoach, voiceUpdateContext]);

  /*
   * Structured Coaching Event Pipeline:
   * MediaPipe -> PoseEvaluator -> FeedbackPrioritizer -> FeedbackStabilizer -> CoachingEventBuilder -> CoachingEventDispatcher -> RealtimeVoiceAgent
   */
  useEffect(() => {
    if (sessionState === "idle" || isPlayingIntro) {
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
      // Build a fingerprint to avoid re-dispatching the same issue content
      const evalFingerprint = `correction:${primaryIssue.ruleId}:${primaryIssue.severity}`;
      if (lastEvalFingerprintRef.current === evalFingerprint) {
        return; // Same issue already dispatched — CoachingEventDispatcher cooldown will handle retry
      }
      lastEvalFingerprintRef.current = evalFingerprint;

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
      const evalFingerprint = `good_form:${coachState}`;
      if (lastEvalFingerprintRef.current === evalFingerprint) {
        return; // Already dispatched good form for this state
      }
      lastEvalFingerprintRef.current = evalFingerprint;
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
    isPlayingIntro,
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

  const hasPose = Boolean(result);

  const isSessionActive =
    sessionState !== "idle" &&
    sessionState !== "completed" &&
    sessionState !== "session_completed";

  const sessionLabel = getSessionLabel(sessionState);

  return (
    <>
      {/* ====================================================== */}
      {/* CINEMA MODE OVERLAY */}
      {/* ====================================================== */}
      {isCinemaMode && (
        <div className="fixed inset-0 z-[9999] bg-black flex flex-col">
          {/* Camera + skeleton fills entire viewport */}
          <div className="relative flex-1 overflow-hidden">
            <CameraView videoRef={videoRef} />

            {result && (
              <PoseSkeleton
                landmarks={result.landmarks}
                videoWidth={videoSize.width}
                videoHeight={videoSize.height}
                coach={selectedCoach}
              />
            )}

            {/* Top-left: pose name */}
            <div className="absolute left-5 top-5 flex items-center gap-3">
              <span className="text-2xl">🧘</span>
              <span className="text-2xl font-extrabold text-white drop-shadow-lg tracking-tight">
                {currentAsana.name}
              </span>
            </div>

            {/* Top-right: score */}
            {stableEvaluation && (
              <div className="absolute right-5 top-5">
                <span
                  className={`text-2xl font-extrabold drop-shadow-lg ${
                    (stableScore ?? 0) >= 70
                      ? "text-emerald-400"
                      : (stableScore ?? 0) >= 40
                        ? "text-amber-400"
                        : "text-red-400"
                  }`}
                >
                  {stableScore ?? 0}%
                </span>
              </div>
            )}

            {/* Bottom-left: corrections card */}
            {stableEvaluation && stableEvaluation.issues.length > 0 && (
              <div className="absolute bottom-6 left-5 max-w-xs rounded-2xl bg-black/70 p-4 backdrop-blur-md border border-white/10 shadow-xl">
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-white/50">
                  {currentAsana.name}
                </p>
                <p className="text-xs font-semibold text-white/80 mb-2">
                  {stableEvaluation.issues[0]?.ruleId?.replace(/_/g, " ")}
                </p>
                <div className="flex flex-col gap-1.5">
                  {stableEvaluation.issues.slice(0, 2).map((issue) => (
                    <div key={issue.ruleId} className="rounded-xl bg-white/10 px-3 py-1.5 text-[11px] text-white/90">
                      {issue.feedback}
                      <span className="ml-2 text-[10px] text-amber-400">target {issue.ruleId?.split("_").at(-1)}°</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom-right: coach message */}
            <div className="absolute bottom-6 right-5 max-w-xs rounded-2xl bg-black/60 px-4 py-3 backdrop-blur-md border border-white/10 flex items-center gap-3">
              <img
                src={getCoachAvatar(selectedCoach)}
                alt={getCoachName(selectedCoach)}
                className="h-8 w-8 rounded-full object-cover border border-white/20 shrink-0"
              />
              <p className="text-sm font-medium text-white leading-snug">
                {error ? error : getCoachStateMessage(coachState)}
              </p>
            </div>

            {/* Exit cinema mode button */}
            <button
              type="button"
              onClick={toggleCinemaMode}
              className="absolute right-5 top-14 flex items-center gap-1.5 rounded-xl bg-white/10 border border-white/20 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md hover:bg-white/20 transition"
            >
              <Minimize size={13} />
              Exit
            </button>
          </div>
        </div>
      )}

      {/* ====================================================== */}
      {/* NORMAL PAGE LAYOUT */}
      {/* ====================================================== */}
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
                    src="/images/alice.png"
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



              {/* Top-left tracking status */}
              <div className="absolute left-4 top-4 rounded-2xl border border-white/10 bg-black/60 px-3.5 py-2 backdrop-blur-md">
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

              {/* Top-right cinema mode toggle */}
              <button
                type="button"
                onClick={toggleCinemaMode}
                className="absolute right-4 top-4 flex items-center justify-center rounded-2xl border border-white/10 bg-black/60 p-2 backdrop-blur-md text-white/70 transition hover:bg-black/80 hover:text-white"
                title={isCinemaMode ? "Exit Cinema Mode" : "Cinema Mode"}
              >
                {isCinemaMode ? <Minimize size={16} /> : <Maximize size={16} />}
              </button>

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
                  
                  {/* Voice Status Indicator & Controls */}
                  {voiceState.status !== "disconnected" ? (
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={voiceToggleMute}
                        title={voiceState.isMuted ? "Unmute Coach" : "Mute Coach"}
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
                              : "bg-emerald-400 animate-pulse"
                          }`}
                        />
                        {voiceState.status === "error"
                          ? "Voice unavailable"
                          : voiceState.isMuted
                          ? "Muted"
                          : voiceState.status === "connecting"
                          ? "Connecting..."
                          : voiceState.status === "speaking"
                          ? `${getCoachName(selectedCoach)} is speaking...`
                          : "Listening..."}
                      </button>
                      {voiceState.status === "error" && (
                        <button
                          type="button"
                          onClick={() => voiceConnect(selectedCoach)}
                          className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-600 hover:bg-slate-50 transition"
                        >
                          Retry
                        </button>
                      )}
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => voiceConnect(selectedCoach)}
                      className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100 transition"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                      Voice Ready
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

              {sessionState === "idle" && isPlayingIntro && (
                <button
                  type="button"
                  onClick={handleIntroEnded}
                  className="mt-4 w-full rounded-2xl bg-indigo-600 px-4 py-3.5 font-bold text-white transition hover:bg-indigo-700 shadow-md flex items-center justify-center gap-2"
                >
                  <span>Skip Intro & Begin</span> →
                </button>
              )}

              {/* Lightweight Live Voice Dialogue / Posture Feed */}
              {voiceState.transcripts.length > 0 && (
                <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Live Voice Dialogue
                    </p>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <div className="flex flex-col gap-1.5 max-h-36 overflow-y-auto pr-1">
                    {voiceState.transcripts.slice(-4).map((t) => (
                      <div
                        key={t.id}
                        className={`text-xs leading-relaxed rounded-xl px-2.5 py-1.5 ${
                          t.role === "user"
                            ? "bg-indigo-50 text-indigo-900 ml-4 self-end border border-indigo-100/60"
                            : t.isCorrection
                            ? "bg-amber-50 text-amber-900 mr-4 self-start border border-amber-200/60"
                            : "bg-white text-slate-800 mr-4 self-start border border-slate-200/60"
                        }`}
                      >
                        <span className="font-semibold text-[10px] block opacity-70 mb-0.5">
                          {t.role === "user" ? "You" : t.isCorrection ? `${getCoachName(selectedCoach)} • Posture` : getCoachName(selectedCoach)}
                        </span>
                        {t.text}
                      </div>
                    ))}
                  </div>
                </div>
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
                    onClick={handleStopSession}
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
    </>
  );
}
