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

  /*
   * Multi-asana session state configured dynamically
   */
  const {
    state: sessionState,
    countdown,
    holdTime,
    startSession,
    stopSession,
    resetSession,
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
  // Track last sent session context to avoid spamming OpenAI with per-frame updates
  const lastSentContextRef = useRef<{
    coach: string;
    asanaId: string;
    score: number | null;
    coachState: string;
    sessionState: string;
    primaryIssueRuleId: string | null;
  } | null>(null);

  const handleStartSession = useCallback(() => {
    hasDispatchedStartRef.current = null;
    hasDispatchedHeldRef.current = null;
    hasDispatchedCompletedRef.current = null;
    startSession();
    voiceStart(selectedCoach);
  }, [selectedCoach, startSession, voiceStart]);

  const handleStopSession = useCallback(() => {
    stopSession();
    voiceStop();
    hasDispatchedStartRef.current = null;
    hasDispatchedHeldRef.current = null;
    hasDispatchedCompletedRef.current = null;
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
      {/* CINEMA MODE OVERLAY */}
      {/* ====================================================== */}
      {isCinemaMode && (
        <div className="fixed inset-0 z-[9999] bg-black flex flex-col">
          {/* Camera + skeleton fills entire viewport */}
          <div className="relative flex-1 overflow-hidden">
            <CameraView videoRef={videoRef} />

            {result && showSkeleton && (
              <PoseSkeleton
                landmarks={result.landmarks}
                videoWidth={videoSize.width}
                videoHeight={videoSize.height}
                coach={selectedCoach}
              />
            )}

            {result && (
              <JointAngleOverlay
                landmarks={result.landmarks}
                jointAngles={jointAngles}
                videoWidth={videoSize.width}
                videoHeight={videoSize.height}
                isMirrored={isMirrored}
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
                <span className="text-2xl font-extrabold text-emerald-400 drop-shadow-lg">
                  {stableScore ?? 0}%
                </span>
              </div>
            )}

            {/* Exit cinema mode button */}
            <button
              type="button"
              onClick={toggleCinemaMode}
              className="absolute right-5 top-16 flex items-center gap-1.5 rounded-xl bg-white/20 border border-white/30 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md hover:bg-white/30 transition"
            >
              <Minimize size={13} />
              Exit
            </button>
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

            {/* Coach Quick Persona Switcher */}
            <div className="shrink-0 flex items-center gap-3">
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
              <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-slate-900 shadow-md aspect-[4/3] md:aspect-[16/10] xl:aspect-video w-full flex items-center justify-center">
                {!isCinemaMode && <CameraView videoRef={videoRef} />}

                {/* Body-Only MediaPipe Skeleton (face dots hidden) */}
                {result && showSkeleton && (
                  <PoseSkeleton
                    landmarks={result.landmarks}
                    videoWidth={videoSize.width}
                    videoHeight={videoSize.height}
                    coach={selectedCoach}
                  />
                )}

                {/* Live Joint Angles displayed directly beside joints */}
                {result && (
                  <JointAngleOverlay
                    landmarks={result.landmarks}
                    jointAngles={jointAngles}
                    videoWidth={videoSize.width}
                    videoHeight={videoSize.height}
                    isMirrored={isMirrored}
                  />
                )}

                {/* Top-Left: LIVE Status Indicator & Asana Name Pill */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                  <span className="flex items-center gap-1.5 rounded-full bg-emerald-600/95 text-white px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase shadow-sm backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                    LIVE • {sessionLabel}
                  </span>

                  <span className="rounded-full bg-slate-900/80 text-white/90 px-3 py-1 text-xs font-semibold backdrop-blur-md border border-white/10 hidden sm:inline-block">
                    {currentAsana.name}
                  </span>
                </div>

                {/* Top-Right: Clean Pose Match Score & Expand */}
                <div className="absolute top-3.5 right-3.5 flex items-center gap-2">
                  <CircularScoreRing score={stableScore} size={48} strokeWidth={5} compact />

                  <button
                    type="button"
                    onClick={toggleCinemaMode}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900/80 text-white/80 hover:text-white border border-white/15 backdrop-blur-md transition"
                    title="Full screen view"
                  >
                    <Maximize size={14} />
                  </button>
                </div>

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

                {/* Bottom Center: Hold Progress Banner */}
                {sessionState === "holding" && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2.5 rounded-full bg-white/95 text-emerald-900 px-5 py-2 shadow-lg backdrop-blur-md border border-emerald-200 animate-in fade-in zoom-in-95 duration-200">
                    <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
                    <span className="text-xs font-bold">
                      Hold steady: {holdTime.toFixed(1)}s / {currentAsana.targetHoldSeconds.toFixed(1)}s
                    </span>
                  </div>
                )}
              </div>

              {/* Clean Session Controls Bar (Start/Stop, Mirror, Skeleton, Voice) */}
              <SessionControls
                isSessionActive={isSessionActive}
                onStartSession={handleStartSession}
                onStopSession={handleStopSession}
                isMirrored={isMirrored}
                onToggleMirror={() => setIsMirrored((v) => !v)}
                showSkeleton={showSkeleton}
                onToggleSkeleton={() => setShowSkeleton((v) => !v)}
                showVoice={showVoiceCues}
                onToggleVoice={() => setShowVoiceCues((v) => !v)}
                coachName={getCoachName(selectedCoach)}
              />

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

              {/* Target Pose Reference Image */}
              <AsanaReference asana={currentAsana} />

              {/* On-Device Privacy Guarantee Notice */}
              <PrivacyNotice />
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

