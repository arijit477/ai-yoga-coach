interface SessionControlsProps {
  isSessionActive: boolean;
  onStartSession: () => void;
  onStopSession: () => void;
  isMirrored: boolean;
  onToggleMirror: () => void;
  showSkeleton: boolean;
  onToggleSkeleton: () => void;
  showVoice: boolean;
  onToggleVoice: () => void;
  coachName: string;
  className?: string;
}

export function SessionControls({
  isSessionActive,
  onStartSession,
  onStopSession,
  isMirrored,
  onToggleMirror,
  showSkeleton,
  onToggleSkeleton,
  showVoice,
  onToggleVoice,
  coachName,
  className = "",
}: SessionControlsProps) {
  return (
    <div className={`flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm ${className}`}>
      {/* Primary Action Button */}
      <div className="flex items-center gap-2">
        {!isSessionActive ? (
          <button
            type="button"
            onClick={onStartSession}
            className="flex items-center gap-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 text-xs font-bold transition shadow-sm"
          >
            <span>▶</span>
            <span>Start Practice with {coachName}</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onStopSession}
            className="flex items-center gap-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 text-xs font-bold transition shadow-sm"
          >
            <span>■</span>
            <span>End Practice</span>
          </button>
        )}
      </div>

      {/* Quick Toggles: Mirror, Skeleton, Voice Coach */}
      <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
        <label className="flex items-center gap-1.5 cursor-pointer hover:text-slate-900 select-none">
          <input
            type="checkbox"
            checked={isMirrored}
            onChange={onToggleMirror}
            className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500/20"
          />
          <span>Mirror</span>
        </label>

        <label className="flex items-center gap-1.5 cursor-pointer hover:text-slate-900 select-none">
          <input
            type="checkbox"
            checked={showSkeleton}
            onChange={onToggleSkeleton}
            className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500/20"
          />
          <span>Skeleton</span>
        </label>

        <label className="flex items-center gap-1.5 cursor-pointer hover:text-slate-900 select-none">
          <input
            type="checkbox"
            checked={showVoice}
            onChange={onToggleVoice}
            className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500/20"
          />
          <span>Voice cues</span>
        </label>
      </div>
    </div>
  );
}
