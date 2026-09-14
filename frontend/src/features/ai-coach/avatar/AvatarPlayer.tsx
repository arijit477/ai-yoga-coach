import { useEffect, useRef, useState } from "react";
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

export function AvatarPlayer({
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
  
  // Resolve asset
  const videoSrc = AvatarAssetResolver.getCoachAsset(coach, state);

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

  useEffect(() => {
    // Reset error state when src changes
    setHasError(false);
  }, [videoSrc]);

  // Sync muted state manually just in case
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted;
    }
  }, [muted]);

  // Handle explicit autoPlay when state changes
  useEffect(() => {
    if (videoRef.current && autoPlay && videoSrc) {
      videoRef.current.play().catch(err => {
        console.warn("Avatar video autoplay failed", err);
        onError?.();
      });
    }
  }, [autoPlay, videoSrc, onError]);

  // State-specific aura / border styling matching Yogaverse calm wellness aesthetic
  const stateBorderClass =
    state === "speaking"
      ? "border-emerald-500 shadow-[0_4px_20px_rgba(47,128,85,0.25)] ring-2 ring-emerald-400/30"
      : state === "listening"
      ? "border-teal-500 shadow-[0_4px_20px_rgba(20,184,166,0.25)] ring-2 ring-teal-400/30"
      : state === "correction"
      ? "border-amber-500 shadow-[0_4px_18px_rgba(212,160,23,0.2)] ring-1 ring-amber-400/25"
      : state === "good_form"
      ? "border-emerald-600 shadow-[0_4px_24px_rgba(47,128,85,0.3)] ring-2 ring-emerald-400/40"
      : "border-slate-200/80 shadow-sm";

  // Helper to fallback to an image if video is not available or errors out
  const fallbackImageSrc = COACHES[coach]?.id === "alice" 
    ? "/images/alice.png" 
    : "/images/kevin.jpg";

  return (
    <div className={`relative overflow-hidden bg-slate-50 rounded-2xl border transition-all duration-300 ${stateBorderClass} ${className}`}>
      {!videoSrc || hasError ? (
        <>
          <img
            src={fallbackImageSrc}
            alt={`AI Coach ${COACHES[coach]?.name}`}
            className={`h-full w-full object-cover transition-transform duration-700 ${
              state === "speaking" ? "scale-105" : "scale-100"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
        </>
      ) : (
        <>
          <video
            ref={videoRef}
            src={videoSrc}
            className="h-full w-full object-cover"
            playsInline
            preload="metadata"
            autoPlay={autoPlay}
            muted={muted}
            loop={loop}
            onEnded={onEnded}
            onError={(e) => {
              console.warn(`Avatar video failed to load for ${coach}`, e);
              setHasError(true);
              onError?.();
            }}
            aria-label={`AI Coach ${COACHES[coach]?.name}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />
        </>
      )}

      {/* Speaking voice wave effect */}
      {state === "speaking" && (
        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-500/30 shadow-sm pointer-events-none">
          <span className="h-2 w-1 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="h-3 w-1 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="h-4 w-1 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          <span className="h-2.5 w-1 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: "75ms" }} />
          <span className="text-[10px] font-bold text-emerald-900 ml-1">Speaking</span>
        </div>
      )}

      {/* Listening pulse badge */}
      {state === "listening" && (
        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-teal-500/30 shadow-sm pointer-events-none">
          <span className="h-2 w-2 rounded-full bg-teal-500 animate-ping" />
          <span className="text-[10px] font-bold text-teal-900">Listening...</span>
        </div>
      )}

      {/* Good form badge */}
      {state === "good_form" && (
        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 bg-emerald-50/95 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-300 shadow-sm pointer-events-none">
          <span className="text-xs">✨</span>
          <span className="text-[10px] font-bold text-emerald-900">Beautiful form!</span>
        </div>
      )}
    </div>
  );
}
