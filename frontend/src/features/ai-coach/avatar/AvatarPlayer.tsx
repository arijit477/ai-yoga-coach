import React, { useEffect, useRef, useState } from "react";
import { COACHES } from "./avatar.types";
import type { CoachId, AvatarState } from "./avatar.types";
import { AvatarAssetResolver } from "./AvatarAssetResolver";
import { AvatarController } from "./AvatarController";

interface AvatarPlayerProps {
  coach: CoachId;
  state?: AvatarState;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  className?: string;
  onEnded?: () => void;
  onError?: () => void;
  controllerRef?: React.MutableRefObject<AvatarController | null>;
}

export const AvatarPlayer = React.memo(function AvatarPlayer({
  coach,
  state = "idle",
  autoPlay = false,
  muted = true,
  loop = false,
  className = "",
  onEnded,
  onError,
  controllerRef,
}: AvatarPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [internalController] = useState(() => new AvatarController());
  const [hasError, setHasError] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  // Debounced/smoothed state to prevent rapid flickering on fast voice/pose transitions
  const [smoothedState, setSmoothedState] = useState<AvatarState>(state);
  const stateTimerRef = useRef<number | null>(null);
  const lastCoachRef = useRef<CoachId>(coach);

  // Resolve asset for the coach
  const videoSrc = AvatarAssetResolver.getCoachAsset(coach, state);

  // Debounce state updates slightly (~300ms min display time for speaking/correction)
  useEffect(() => {
    if (stateTimerRef.current !== null) {
      window.clearTimeout(stateTimerRef.current);
    }

    if (state === "speaking" || state === "correction" || state === "good_form") {
      setSmoothedState(state);
    } else {
      stateTimerRef.current = window.setTimeout(() => {
        setSmoothedState(state);
      }, 300);
    }

    return () => {
      if (stateTimerRef.current !== null) {
        window.clearTimeout(stateTimerRef.current);
      }
    };
  }, [state]);

  // Attach controller to video element once mounted
  useEffect(() => {
    if (videoRef.current) {
      internalController.attach(videoRef.current);
      if (controllerRef) {
        controllerRef.current = internalController;
      }
    }

    return () => {
      internalController.detach();
      if (controllerRef) {
        controllerRef.current = null;
      }
    };
  }, [internalController, controllerRef]);

  // Handle coach switching (Alice <-> Kevin) smoothly without resetting session
  useEffect(() => {
    if (lastCoachRef.current !== coach && videoSrc) {
      lastCoachRef.current = coach;
      internalController.switchCoach(coach, videoSrc).catch(() => {
        setHasError(true);
      });
    }
  }, [coach, videoSrc, internalController]);

  // Sync muted state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted;
    }
  }, [muted]);

  // Safe playback: play ONLY when video is loaded, autoplay requested, and not already playing
  useEffect(() => {
    if (!videoRef.current || !autoPlay || !videoSrc || !isVideoReady) return;

    if (videoRef.current.paused) {
      videoRef.current.play().catch((err) => {
        if ((err as Error).name !== "AbortError") {
          console.warn("[AI Coach] Avatar autoplay pending interaction", err);
          onError?.();
        }
      });
    }
  }, [autoPlay, videoSrc, isVideoReady, onError]);

  // State-specific aura / border styling matching Yogaverse calm wellness aesthetic
  const stateBorderClass =
    smoothedState === "speaking"
      ? "border-emerald-500 shadow-[0_4px_20px_rgba(47,128,85,0.25)] ring-2 ring-emerald-400/30"
      : smoothedState === "listening"
      ? "border-teal-500 shadow-[0_4px_20px_rgba(20,184,166,0.25)] ring-2 ring-teal-400/30"
      : smoothedState === "analyzing"
      ? "border-cyan-500 shadow-[0_4px_20px_rgba(6,182,212,0.25)] ring-2 ring-cyan-400/30"
      : smoothedState === "correction"
      ? "border-amber-500 shadow-[0_4px_18px_rgba(212,160,23,0.2)] ring-2 ring-amber-400/35"
      : smoothedState === "good_form"
      ? "border-emerald-600 shadow-[0_4px_24px_rgba(47,128,85,0.3)] ring-2 ring-emerald-400/40"
      : smoothedState === "complete"
      ? "border-emerald-500 shadow-[0_4px_20px_rgba(16,185,129,0.25)] ring-2 ring-emerald-300/40"
      : smoothedState === "guide"
      ? "border-emerald-400/80 shadow-sm"
      : "border-slate-200/80 shadow-sm";

  // Fallback to high-resolution portrait if video fails or when idle
  const fallbackImageSrc =
    COACHES[coach]?.id === "alice" ? "/images/alice.png" : "/images/kevin.jpg";

  return (
    <div
      className={`relative overflow-hidden bg-slate-900 rounded-2xl border transition-all duration-300 ${stateBorderClass} ${className}`}
      style={{ minHeight: "100%", contain: "paint" }}
    >
      {/* 
        Persistent Video Element:
        Always mounted in DOM when videoSrc is valid.
        Never unmounts or resets currentTime on posture/score/angle updates.
      */}
      {videoSrc && !hasError && (
        <video
          ref={videoRef}
          src={videoSrc}
          className={`h-full w-full object-cover object-top transition-opacity duration-500 ${
            isVideoReady ? "opacity-100" : "opacity-0"
          }`}
          playsInline
          preload="auto"
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          onCanPlay={() => setIsVideoReady(true)}
          onEnded={onEnded}
          onError={(e) => {
            console.warn(`[AI Coach] Avatar video failed to load for ${coach}`, e);
            setHasError(true);
            onError?.();
          }}
          aria-label={`AI Coach ${COACHES[coach]?.name}`}
        />
      )}

      {/* Fallback Image when idle, loading, or video error */}
      {(!videoSrc || hasError || !isVideoReady) && (
        <img
          src={fallbackImageSrc}
          alt={`AI Coach ${COACHES[coach]?.name}`}
          className={`absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ${
            smoothedState === "speaking" ? "scale-105" : "scale-100"
          }`}
        />
      )}

      {/* Subtle bottom gradient overlay for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent pointer-events-none" />

      {/* Speaking voice wave effect */}
      {smoothedState === "speaking" && (
        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-500/30 shadow-sm pointer-events-none animate-in fade-in duration-200">
          <span className="h-2 w-1 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="h-3 w-1 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="h-4 w-1 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          <span className="h-2.5 w-1 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: "75ms" }} />
          <span className="text-[10px] font-bold text-emerald-900 ml-1">Speaking</span>
        </div>
      )}

      {/* Listening pulse badge */}
      {smoothedState === "listening" && (
        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full border border-teal-500/30 shadow-sm pointer-events-none animate-in fade-in duration-200">
          <span className="h-2 w-2 rounded-full bg-teal-500 animate-ping" />
          <span className="text-[10px] font-bold text-teal-900">Listening...</span>
        </div>
      )}

      {/* Analyzing posture badge */}
      {smoothedState === "analyzing" && (
        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full border border-cyan-500/30 shadow-sm pointer-events-none animate-in fade-in duration-200">
          <span className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse" />
          <span className="text-[10px] font-bold text-cyan-950">Analyzing...</span>
        </div>
      )}

      {/* Posture correction badge */}
      {smoothedState === "correction" && (
        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 bg-amber-50/95 backdrop-blur-md px-2.5 py-1 rounded-full border border-amber-300 shadow-sm pointer-events-none animate-in fade-in duration-200">
          <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-[10px] font-bold text-amber-950">Adjusting...</span>
        </div>
      )}

      {/* Good form badge */}
      {smoothedState === "good_form" && (
        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 bg-emerald-50/95 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-300 shadow-sm pointer-events-none animate-in fade-in duration-200">
          <span className="text-xs">✨</span>
          <span className="text-[10px] font-bold text-emerald-900">Good Form!</span>
        </div>
      )}

      {/* Complete badge */}
      {smoothedState === "complete" && (
        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 bg-emerald-50/95 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-300 shadow-sm pointer-events-none animate-in fade-in duration-200">
          <span className="text-xs">🎉</span>
          <span className="text-[10px] font-bold text-emerald-900">Pose Complete</span>
        </div>
      )}
    </div>
  );
});

