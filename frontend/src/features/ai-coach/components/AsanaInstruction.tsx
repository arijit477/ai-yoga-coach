import { useState } from "react";
import type { Asana } from "../types/asana";
import { Info, Sparkles } from "lucide-react";

interface AsanaInstructionProps {
  asana: Asana;
}

export function AsanaInstruction({ asana }: AsanaInstructionProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md">
      {/* Header & Badges */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-indigo-300">
              Reference Pose
            </span>
            <span className="text-xs text-white/40 capitalize">
              {asana.category}
            </span>
          </div>
          <h2 className="mt-1 text-xl font-bold tracking-tight text-white md:text-2xl">
            {asana.name}
          </h2>
          {asana.sanskritName && (
            <p className="text-xs font-serif italic text-indigo-200/70">
              {asana.sanskritName}
            </p>
          )}
        </div>

        <div className="flex flex-col items-end gap-1">
          <span className="rounded-xl border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-white/80 capitalize">
            {asana.difficulty}
          </span>
          <span className="text-[11px] font-medium text-emerald-300/80">
            {asana.targetHoldSeconds}s hold
          </span>
        </div>
      </div>

      {/* Supabase Reference Image Showcase */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 shadow-inner">
        {!imageError ? (
          <>
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80">
                <div className="flex flex-col items-center gap-2">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-400 border-t-transparent" />
                  <span className="text-xs text-white/40">Loading reference pose...</span>
                </div>
              </div>
            )}
            <img
              src={asana.imageUrl}
              alt={asana.name}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={`h-full w-full object-contain p-2 transition-opacity duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          </>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center">
            <Sparkles className="h-8 w-8 text-indigo-400/50 mb-2" />
            <p className="text-sm font-medium text-white/80">{asana.name}</p>
            <p className="mt-1 text-xs text-white/40">Follow AI coach voice & skeleton cues</p>
          </div>
        )}

        <div className="absolute bottom-2 right-2 rounded-lg bg-black/60 px-2 py-1 text-[10px] font-medium text-white/60 backdrop-blur-sm">
          Supabase Pose Reference
        </div>
      </div>

      {/* Alignment Cues */}
      {asana.cues && asana.cues.length > 0 && (
        <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-3.5">
          <div className="flex items-center gap-1.5 mb-2">
            <Sparkles size={14} className="text-indigo-300" />
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300">
              Form Focus Points
            </span>
          </div>
          <div className="space-y-1.5">
            {asana.cues.map((cue) => (
              <div key={cue.id} className="flex items-start gap-2 text-xs">
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
                <p className="text-white/80">
                  <strong className="text-indigo-200">{cue.jointOrBodyPart}:</strong> {cue.cue}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step Instructions */}
      <div className="rounded-2xl border border-white/5 bg-black/20 p-3.5">
        <div className="flex items-center gap-1.5 mb-2.5">
          <Info size={14} className="text-white/40" />
          <span className="text-xs font-semibold uppercase tracking-wider text-white/40">
            How to perform
          </span>
        </div>
        <ol className="space-y-2 text-xs leading-relaxed text-white/70">
          {asana.instructions.map((inst, index) => (
            <li key={index} className="flex items-start gap-2.5">
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/10 text-[10px] font-bold text-white/60">
                {index + 1}
              </span>
              <span>{inst}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
