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

  // Helper to fallback to an image if video is not available or errors out
  const fallbackImageSrc = COACHES[coach]?.id === "alice" 
    ? "/images/alice.jpg" 
    : "/images/kevin.jpg";

  if (!videoSrc || hasError) {
    // Fallback UI
    return (
      <div className={`relative overflow-hidden bg-slate-900 rounded-2xl border-2 border-indigo-100 shadow-sm shadow-indigo-500/5 ${className}`}>
        <img
          src={fallbackImageSrc}
          alt={`Fallback avatar for ${COACHES[coach]?.name}`}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-slate-900 rounded-2xl border-2 border-indigo-100 shadow-sm shadow-indigo-500/5 ${className}`}>
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
    </div>
  );
}
