import { useRef } from "react";
import { Play, FastForward } from "lucide-react";
import type { Asana } from "../types/asana";

interface GuideVideoOverlayProps {
  asana: Asana;
  onSkip: () => void;
  onEnded: () => void;
}

export function GuideVideoOverlay({ asana, onSkip, onEnded }: GuideVideoOverlayProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!asana.videoUrl) {
    return null;
  }

  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="w-full max-w-lg flex items-center justify-between mb-3 text-white">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
            Asana Guide
          </span>
          <h3 className="text-lg font-bold text-white leading-tight">
            {asana.name}
          </h3>
          {asana.sanskritName && (
            <p className="text-xs text-slate-300 italic">{asana.sanskritName}</p>
          )}
        </div>

        <button
          type="button"
          onClick={onSkip}
          className="flex items-center gap-1.5 rounded-xl bg-white/20 hover:bg-white/30 border border-white/30 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md transition shadow-sm active:scale-95"
          title="Skip guide video and get ready"
        >
          <span>Skip</span>
          <FastForward size={14} />
        </button>
      </div>

      {/* Video Container */}
      <div className="relative w-full max-w-lg aspect-video rounded-2xl overflow-hidden border border-white/20 bg-black shadow-2xl">
        <video
          ref={videoRef}
          src={asana.videoUrl}
          autoPlay
          muted
          playsInline
          onEnded={onEnded}
          className="h-full w-full object-cover"
        />

        {/* Bottom subtle progress hint */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-white/80 bg-slate-900/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
          <span className="flex items-center gap-1.5">
            <Play size={12} className="text-emerald-400 fill-emerald-400" />
            Watch alignment form
          </span>
          <span>Auto-advances when finished</span>
        </div>
      </div>
    </div>
  );
}
