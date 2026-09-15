import type { CoachId, AvatarState } from "../avatar/avatar.types";
import { AvatarPlayer } from "../avatar/AvatarPlayer";

interface CoachPanelProps {
  coach: CoachId;
  coachName: string;
  avatarState: AvatarState;
  guidanceMessage: string;
  isSpeaking: boolean;
  className?: string;
}

export function CoachPanel({
  coach,
  coachName,
  avatarState,
  guidanceMessage,
  isSpeaking,
  className = "",
}: CoachPanelProps) {
  return (
    <div className={`rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm flex flex-col gap-3 ${className}`}>
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            AI Coach
          </h3>
          <p className="text-sm font-bold text-slate-900">
            {coachName}
          </p>
        </div>
        <span className="rounded-full bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800">
          Personal Guide
        </span>
      </div>

      {/* Avatar Stage */}
      <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-inner">
        <AvatarPlayer
          coach={coach}
          state={avatarState}
          autoPlay
          loop
          className="h-full w-full object-cover object-top"
        />

        {/* Dynamic Voice Soundwave Indicator Overlay */}
        {isSpeaking && (
          <div className="absolute bottom-2.5 right-2.5 flex items-end gap-0.5 rounded-full bg-white/95 px-2 py-1 shadow-md border border-emerald-200/80 backdrop-blur-sm">
            <span className="h-3 w-0.5 rounded-full bg-emerald-600 animate-[bounce_0.8s_infinite_100ms]" />
            <span className="h-4 w-0.5 rounded-full bg-emerald-700 animate-[bounce_0.8s_infinite_200ms]" />
            <span className="h-2.5 w-0.5 rounded-full bg-emerald-500 animate-[bounce_0.8s_infinite_300ms]" />
            <span className="h-4.5 w-0.5 rounded-full bg-emerald-800 animate-[bounce_0.8s_infinite_150ms]" />
            <span className="ml-1 text-[9px] font-bold uppercase tracking-wider text-emerald-800">Live</span>
          </div>
        )}
      </div>

      {/* Guidance Message Bubble */}
      <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-3 shadow-[0_2px_8px_rgba(16,185,129,0.04)]">
        <div className="flex items-center justify-between gap-1.5 mb-1.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-600" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
              Guidance & Cues
            </span>
          </div>
          {isSpeaking && (
            <span className="flex items-center gap-1 text-[10px] text-emerald-700 font-semibold animate-pulse">
              Speaking...
            </span>
          )}
        </div>
        <p className="text-xs font-semibold text-emerald-950 leading-relaxed italic">
          "{guidanceMessage}"
        </p>
      </div>
    </div>
  );
}
