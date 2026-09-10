import { useEffect, useRef, useState } from "react";

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
    getActiveSessionAsanas,
    selectedCoach,
    setSelectedCoach,
    markAsanaCompleted,
    canAccessAsanaIndex,
    setCurrentAsanaIndex,
  } = useAICoachStore();

  const activeAsanas = getActiveSessionAsanas();
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
   * High-level coaching state
   */
  const coachState = useCoachState({
    isInitialized,
    hasPose: Boolean(result),
    evaluation: stableEvaluation,
  });

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
    onAsanaComplete: (idx) => {
      markAsanaCompleted(activeAsanas[idx].id);
    },
    onAdvanceAsana: (nextIdx) => {
      setCurrentAsanaIndex(nextIdx);
    },
  });

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

  const hasPose = Boolean(result);

  const isSessionActive =
    sessionState !== "idle" &&
    sessionState !== "completed" &&
    sessionState !== "session_completed";

  const sessionLabel = getSessionLabel(sessionState);

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-6 text-white md:px-6">
      <div className="mx-auto max-w-7xl">
        {/* ====================================================== */}
        {/* HEADER */}
        {/* ====================================================== */}

        <header className="mb-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300">
                  AI POWERED
                </span>

                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                  REAL-TIME
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                AI Personal Yoga Coach
              </h1>

              <p className="mt-2 text-sm text-white/50 md:text-base">
                Real-time posture guidance across your customized yoga routine.
              </p>
            </div>

            {/* Coach & Length selector */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Session length config */}
              {!isSessionActive && (
                <div className="flex items-center gap-1 rounded-2xl border border-white/10 bg-white/[0.03] p-1 text-xs">
                  <span className="px-2 text-white/40 font-medium">Poses:</span>
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
                          : "text-white/50 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {len === sessionAsanas.length ? `Full (${len})` : len}
                    </button>
                  ))}
                </div>
              )}

              {/* Coach selector */}
              <div className="flex items-center gap-1.5 rounded-2xl border border-white/10 bg-white/[0.03] p-1.5 backdrop-blur-md">
                <button
                  type="button"
                  onClick={() => setSelectedCoach("alice")}
                  className={`flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                    selectedCoach === "alice"
                      ? "bg-white text-slate-950 shadow-md"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
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
                      ? "bg-white text-slate-950 shadow-md"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
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
            onSelectIndex={(idx) => {
              resetSession();
              setCurrentAsanaIndex(idx);
            }}
            disabled={isSessionActive}
          />
        </div>

        {/* ====================================================== */}
        {/* MAIN */}
        {/* ====================================================== */}

        <div className="grid gap-6 lg:grid-cols-3">
          {/* ================================================== */}
          {/* CAMERA */}
          {/* ================================================== */}

          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Camera Viewport */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl">
              <CameraView videoRef={videoRef} />

              {/* Pose Skeleton */}
              {result && (
                <PoseSkeleton
                  landmarks={result.landmarks}
                  videoWidth={videoSize.width}
                  videoHeight={videoSize.height}
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
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-xl backdrop-blur-md">
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        error
                          ? "bg-red-400"
                          : hasPose
                            ? "bg-emerald-400 animate-pulse"
                            : "bg-amber-400"
                      }`}
                    />
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-white/70">
                      Live System Status
                    </h3>
                  </div>
                  <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-[11px] font-medium text-white/50">
                    {hasPose ? "Active Stream" : "Standby"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="rounded-2xl border border-white/5 bg-black/20 p-3">
                    <p className="text-[11px] font-medium text-white/40">Pose Tracker</p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      {isInitialized ? "Ready" : "Initializing"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/5 bg-black/20 p-3">
                    <p className="text-[11px] font-medium text-white/40">Body</p>
                    <p className="mt-1 text-sm font-semibold text-emerald-300">
                      {hasPose ? "Detected" : "Searching"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/5 bg-black/20 p-3">
                    <p className="text-[11px] font-medium text-white/40">Landmarks</p>
                    <p className="mt-1 text-sm font-semibold font-mono text-white">
                      {result ? `${result.landmarks.length} / 33` : "--"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/5 bg-black/20 p-3">
                    <p className="text-[11px] font-medium text-white/40">Confidence</p>
                    <p className="mt-1 text-sm font-semibold font-mono text-indigo-300">
                      {result ? `${Math.round(result.confidence * 100)}%` : "--"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2: Pose Geometry (Angles) */}
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-xl backdrop-blur-md">
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-indigo-400" />
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-white/70">
                      Pose Geometry
                    </h3>
                  </div>
                  <span className="text-[11px] text-white/40 font-mono">
                    3D Angles
                  </span>
                </div>

                <AngleDebugPanel landmarks={result?.worldLandmarks ?? null} />
              </div>
            </div>
          </div>

          {/* ================================================== */}
          {/* COACH & GUIDANCE PANEL */}
          {/* ================================================== */}

          <div className="lg:col-span-1 flex flex-col gap-5">
            {/* Coach Identity Card with Avatar */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-xl backdrop-blur-md md:p-6">
              <div className="flex items-center gap-4">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border-2 border-indigo-400/40 shadow-lg shadow-indigo-500/10">
                  <img
                    src={getCoachAvatar(selectedCoach)}
                    alt={getCoachName(selectedCoach)}
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full bg-emerald-400 border-2 border-slate-950 shadow-sm" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-lg font-semibold text-white">
                        {getCoachName(selectedCoach)}
                      </p>

                      <p className="text-xs text-white/40">
                        AI Yoga Coach
                      </p>
                    </div>

                    <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-white/60">
                      {sessionLabel}
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-3.5 text-sm leading-6 text-white/50">
                {getCoachDescription(selectedCoach)}
              </p>

              {/* Start Routine CTA */}
              {sessionState === "idle" && (
                <button
                  type="button"
                  onClick={startSession}
                  disabled={!isInitialized}
                  className="mt-4 w-full rounded-2xl bg-white px-4 py-3.5 font-bold text-slate-950 transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-40 shadow-lg"
                >
                  Start {currentAsana.name}
                </button>
              )}
            </div>

            {/* Real-Time Session Guidance (Active states) */}
            {sessionState !== "idle" && (
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-xl backdrop-blur-md md:p-6 flex flex-col gap-4">
                {/* Countdown */}
                {sessionState === "countdown" && countdown !== null && (
                  <div className="rounded-2xl border border-indigo-400/20 bg-indigo-400/5 p-5 text-center">
                    <p className="text-xs uppercase tracking-wider text-white/40">
                      Get Ready
                    </p>

                    <p className="mt-2 text-5xl font-bold tabular-nums">
                      {countdown}
                    </p>

                    <p className="mt-2 text-sm text-white/50">
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
                      <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-5">
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-emerald-400" />

                          <p className="text-xs font-medium uppercase tracking-wider text-emerald-300">
                            Good Form
                          </p>
                        </div>

                        <p className="mt-3 text-base font-medium leading-6">
                          Great form. Hold your position.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Holding Status */}
                {sessionState === "holding" && (
                  <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-5 text-center">
                    <p className="text-xs uppercase tracking-wider text-emerald-300/70">
                      Hold Position
                    </p>

                    <p className="mt-2 text-4xl font-bold tabular-nums">
                      {holdTime.toFixed(1)}s / {currentAsana.targetHoldSeconds}s
                    </p>

                    <p className="mt-2 text-sm text-white/50">
                      Keep your form steady.
                    </p>
                  </div>
                )}

                {/* Pose Completed */}
                {sessionState === "completed" && (
                  <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-5 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-400/10">
                      ✓
                    </div>

                    <p className="mt-3 text-lg font-semibold">
                      Excellent work!
                    </p>

                    <p className="mt-2 text-sm leading-5 text-white/50">
                      You successfully held {currentAsana.name} for {currentAsana.targetHoldSeconds} seconds.
                    </p>

                    {stableScore !== null && (
                      <p className="mt-4 text-3xl font-bold">
                        {stableScore}
                        <span className="ml-1 text-sm font-normal text-white/40">
                          / 100
                        </span>
                      </p>
                    )}

                    <div className="mt-5 flex gap-3">
                      <button
                        type="button"
                        onClick={resetSession}
                        className="flex-1 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 font-semibold text-white transition hover:bg-white/20"
                      >
                        Practice Again
                      </button>
                      {currentAsanaIndex < activeAsanas.length - 1 && (
                        <button
                          type="button"
                          onClick={skipTransition}
                          className="flex-1 rounded-2xl bg-white px-4 py-3 font-semibold text-slate-950 transition hover:bg-white/90"
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
                  <div className="rounded-3xl border border-indigo-400/30 bg-gradient-to-br from-indigo-950/90 via-slate-950 to-emerald-950/50 p-6 text-center shadow-2xl backdrop-blur-xl">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-400/20 text-3xl text-emerald-300">
                      🏆
                    </div>

                    <h3 className="mt-4 text-2xl font-bold text-white">
                      Routine Completed!
                    </h3>

                    <p className="mt-2 text-sm text-white/60">
                      You have successfully completed all {activeAsanas.length} asanas in your routine.
                    </p>

                    <div className="mt-5 grid grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-left">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-white/40">
                          Asanas Mastered
                        </p>
                        <p className="text-xl font-bold text-emerald-300">
                          {activeAsanas.length} / {activeAsanas.length}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-white/40">
                          Final Score
                        </p>
                        <p className="text-xl font-bold text-white">
                          {stableScore ?? 92} <span className="text-xs text-white/40">/ 100</span>
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={resetSession}
                      className="mt-5 w-full rounded-2xl bg-white px-4 py-3.5 font-bold text-slate-950 transition hover:bg-white/90 shadow-lg"
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
                    className="w-full rounded-2xl border border-white/10 px-4 py-3 text-sm font-medium text-white/60 transition hover:bg-white/5 hover:text-white"
                  >
                    Stop Session
                  </button>
                )}
              </div>
            )}

            {/* Asana Reference Image & Instructions from Supabase */}
            <AsanaInstruction asana={currentAsana} />
          </div>
        </div>
      </div>
    </div>
  );
}