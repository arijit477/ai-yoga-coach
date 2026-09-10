import type { Asana } from "../types/asana";
import { CheckCircle2, ArrowRight } from "lucide-react";

interface AsanaTransitionProps {
  completedAsana: Asana;
  nextAsana: Asana;
  remainingSeconds: number | null;
  onSkipWait: () => void;
}

export function AsanaTransition({
  completedAsana,
  nextAsana,
  remainingSeconds,
  onSkipWait,
}: AsanaTransitionProps) {
  return (
    <div className="rounded-3xl border border-indigo-400/30 bg-gradient-to-br from-indigo-950/80 via-slate-950/90 to-emerald-950/40 p-6 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
            Pose Completed!
          </span>
        </div>
        <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-medium text-indigo-200">
          Transitioning
        </span>
      </div>

      <p className="mt-2 text-lg font-bold text-white">
        Awesome form on {completedAsana.name}!
      </p>

      {/* Next pose preview card */}
      <div className="mt-4 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-3.5">
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-slate-900">
          <img
            src={nextAsana.imageUrl}
            alt={nextAsana.name}
            className="h-full w-full object-contain p-1"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] uppercase tracking-wider text-white/40 font-semibold">
            Up Next
          </p>
          <p className="text-base font-bold text-white truncate">
            {nextAsana.name}
          </p>
          {nextAsana.sanskritName && (
            <p className="text-xs font-serif italic text-indigo-300/80 truncate">
              {nextAsana.sanskritName}
            </p>
          )}
        </div>
        {remainingSeconds !== null && (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/20 border border-indigo-400/30">
            <span className="text-2xl font-black text-indigo-300 tabular-nums">
              {remainingSeconds}
            </span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="text-xs text-white/50">
          Get into position for your next asana...
        </span>
        <button
          type="button"
          onClick={onSkipWait}
          className="flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-2 text-xs font-bold text-slate-950 transition hover:bg-white/90 shadow-md"
        >
          <span>Begin Now</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
