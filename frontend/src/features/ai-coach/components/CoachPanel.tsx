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
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
        <AvatarPlayer
          coach={coach}
          state={avatarState}
          autoPlay
          loop
          className="h-full w-full object-cover"
        />
      </div>

      {/* Guidance Message Bubble */}
      <div className="rounded-xl border border-emerald-900/10 bg-emerald-50/50 p-3">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
            Feedback
          </span>
          {isSpeaking && (
            <span className="text-[10px] text-emerald-600 font-medium animate-pulse">
              • Speaking
            </span>
          )}
        </div>
        <p className="text-xs font-medium text-slate-800 leading-relaxed italic">
          "{guidanceMessage}"
        </p>
      </div>
    </div>
  );
}
