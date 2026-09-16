import { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, FastForward } from "lucide-react";
import type { Asana } from "../types/asana";

interface GuideVideoOverlayProps {
  asana?: Asana;
  videoUrl?: string;
  title?: string;
  subtitle?: string;
  badge?: string;
  onSkip: () => void;
  onEnded: () => void;
}

export function GuideVideoOverlay({
  asana,
  videoUrl,
  title,
  subtitle,
  badge = "AI Coach Intro",
  onSkip,
  onEnded,
}: GuideVideoOverlayProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  const src = videoUrl || asana?.videoUrl;
  const displayTitle = title || asana?.name || "AI Yoga Coach";
  const displaySubtitle = subtitle || asana?.sanskritName;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Attempt autoplay with sound, fallback to muted if browser blocks unmuted autoplay
    video.muted = isMuted;
    video
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        // If unmuted autoplay is blocked by browser policy, fallback to muted autoplay
        video.muted = true;
        setIsMuted(true);
        video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      });
  }, [src]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(console.error);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  if (!src) {
    return null;
  }

  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="w-full max-w-lg flex items-center justify-between mb-3 text-white">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
            {badge}
          </span>
          <h3 className="text-lg font-bold text-white leading-tight">
            {displayTitle}
          </h3>
          {displaySubtitle && (
            <p className="text-xs text-slate-300 italic">{displaySubtitle}</p>
          )}
        </div>

        <button
          type="button"
          onClick={onSkip}
          className="flex items-center gap-1.5 rounded-xl bg-white/20 hover:bg-white/30 border border-white/30 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md transition shadow-sm active:scale-95 cursor-pointer"
          title="Skip guide video and get ready"
        >
          <span>Skip</span>
          <FastForward size={14} />
        </button>
      </div>

      {/* Video Container */}
      <div className="group relative w-full max-w-lg aspect-video rounded-2xl overflow-hidden border border-white/20 bg-black shadow-2xl">
        <video
          ref={videoRef}
          src={src}
          playsInline
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={onEnded}
          onClick={togglePlay}
          className="h-full w-full object-cover cursor-pointer"
        />

        {/* Center overlay play button when paused */}
        {!isPlaying && (
          <button
            type="button"
            onClick={togglePlay}
            className="absolute inset-0 m-auto flex h-14 w-14 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md border border-white/30 hover:scale-110 transition shadow-lg cursor-pointer"
            aria-label="Play video"
          >
            <Play size={24} className="fill-white ml-0.5" />
          </button>
        )}

        {/* Bottom video controls bar */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/90 bg-slate-900/80 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 shadow-lg transition-opacity duration-200">
          <div className="flex items-center gap-2">
            {/* Play / Pause Button */}
            <button
              type="button"
              onClick={togglePlay}
              className="flex items-center justify-center h-7 w-7 rounded-lg bg-white/10 hover:bg-white/20 text-white transition active:scale-95 cursor-pointer"
              title={isPlaying ? "Pause" : "Play"}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause size={14} className="fill-white" />
              ) : (
                <Play size={14} className="fill-white ml-0.5" />
              )}
            </button>

            {/* Mute / Unmute Button */}
            <button
              type="button"
              onClick={toggleMute}
              className="flex items-center justify-center h-7 w-7 rounded-lg bg-white/10 hover:bg-white/20 text-white transition active:scale-95 cursor-pointer"
              title={isMuted ? "Unmute" : "Mute"}
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <VolumeX size={15} className="text-red-400" />
              ) : (
                <Volume2 size={15} className="text-emerald-400" />
              )}
            </button>

            <span className="text-[11px] text-white/70 hidden sm:inline ml-1">
              Watch alignment form
            </span>
          </div>

          <span className="text-[11px] text-white/60">Auto-advances when done</span>
        </div>
      </div>
    </div>
  );
}

