import React, { useEffect, useRef, useState } from "react";
import { COACHES } from "./avatar.types";
import type { CoachId, AvatarState } from "./avatar.types";
import { AvatarAssetResolver } from "./AvatarAssetResolver";
import { AvatarController } from "./AvatarController";

interface AvatarPlayerProps {
  coach: CoachId;
  outfitId?: string;
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
  outfitId = "default",
  state = "idle",
  className = "",
  onError,
  controllerRef,
}: AvatarPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [internalController] = useState(() => new AvatarController());
  const [hasError, setHasError] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [smoothedState, setSmoothedState] = useState<AvatarState>(state);
  const stateTimerRef = useRef<number | null>(null);
  const lastCoachRef = useRef<CoachId>(coach);
  const videoSrc = AvatarAssetResolver.getVideoSrc(coach);

  // Debounced/smoothed state to prevent rapid flickering on fast voice/pose transitions
  useEffect(() => {
    if (stateTimerRef.current !== null) {
      window.clearTimeout(stateTimerRef.current);
    }

    if (state === "speaking") {
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

  // Permanent video mute to ensure only the LLM voice agent voice is heard
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
    }
  }, []);

  // Synchronize avatar lipsync animation:
  // Play the lipsync video ONLY while the voice agent is actually speaking!
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc || !isVideoReady) return;

    // Play video ONLY while speaking to maintain lipsync
    if (smoothedState === "speaking") {
      video.play().catch((err) => {
        if ((err as Error).name !== "AbortError") {
          console.warn("[AI Coach] Avatar speech play error:", err);
        }
      });
    } else {
      video.pause();
    }
  }, [smoothedState, videoSrc, isVideoReady]);

  // State-specific aura / border styling matching Yogaverse calm wellness aesthetic
  const stateBorderClass =
    smoothedState === "speaking"
      ? "border-emerald-500 shadow-[0_4px_20px_rgba(47,128,85,0.25)] ring-2 ring-emerald-400/30"
      : smoothedState === "thinking"
      ? "border-cyan-500 shadow-[0_4px_20px_rgba(6,182,212,0.25)] ring-2 ring-cyan-400/30"
      : smoothedState === "listening"
      ? "border-blue-500 shadow-[0_4px_18px_rgba(59,130,246,0.2)] ring-2 ring-blue-400/35"
      : "border-slate-200/80 shadow-sm";

  // Get the selected outfit image (or fallback to default)
  const coachData = COACHES[coach];
  const selectedOutfit = coachData?.outfits?.find(o => o.id === outfitId) || coachData?.outfits?.[0];
  const fallbackImageSrc = selectedOutfit?.imageSrc || (coach === "alice" ? "/images/alice.png" : "/images/kevin.jpg");

  // If a custom outfit is selected, we disable the video (since we don't have matching videos)
  const hasCustomOutfit = outfitId !== "default";
  const showVideo = videoSrc && !hasError && !hasCustomOutfit;

  return (
    <div
      className={`relative overflow-hidden bg-slate-900 rounded-2xl border transition-all duration-300 ${stateBorderClass} ${className}`}
      style={{ minHeight: "100%", contain: "paint" }}
    >
      {/* 
        High-Resolution Resting Portrait:
        Displays when coach is listening, analyzing, or idle (serene expression, mouth closed).
      */}
      <img
        src={fallbackImageSrc}
        alt={`AI Coach ${COACHES[coach]?.name}`}
        className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-300 ${
          smoothedState === "speaking" && isVideoReady && showVideo ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      />

      {/* 
        Lipsync Video Element:
        Muted = true so only the LLM voice agent voice is heard.
        Fades in and plays lipsync movement strictly while speaking.
      */}
      {showVideo && (
        <video
          ref={videoRef}
          src={videoSrc}
          className={`h-full w-full object-cover object-top transition-opacity duration-300 ${
            isVideoReady && smoothedState === "speaking"
              ? "opacity-100 z-10"
              : "opacity-0 pointer-events-none z-0"
          }`}
          playsInline
          preload="auto"
          autoPlay={false}
          muted={true}
          loop={true}
          onCanPlay={() => setIsVideoReady(true)}
          onError={(e) => {
            console.warn(`[AI Coach] Avatar video failed to load for ${coach}`, e);
            setHasError(true);
            onError?.();
          }}
          aria-label={`AI Coach ${COACHES[coach]?.name} Speaking`}
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

      {/* Listening badge */}
      {smoothedState === "listening" && (
        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full border border-blue-500/30 shadow-sm pointer-events-none animate-in fade-in duration-200">
          <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[10px] font-bold text-blue-900">Listening</span>
        </div>
      )}

      {/* Thinking badge */}
      {smoothedState === "thinking" && (
        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full border border-cyan-500/30 shadow-sm pointer-events-none animate-in fade-in duration-200">
          <span className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse" />
          <span className="text-[10px] font-bold text-cyan-900">Thinking</span>
        </div>
      )}
    </div>
  );
});

