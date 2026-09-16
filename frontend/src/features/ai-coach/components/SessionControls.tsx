import { Square } from "lucide-react";

interface SessionControlsProps {
  isSessionActive: boolean;
  onStartSession: () => void;
  onStopSession: () => void;
  isCameraActive: boolean;
  onStartCamera?: () => void;
  onStopCamera?: () => void;
  videoRef?: React.RefObject<HTMLVideoElement | null>;
  isMirrored?: boolean;
  onToggleMirror?: () => void;
  showSkeleton: boolean;
  onToggleSkeleton: () => void;
  showVoice?: boolean;
  onToggleVoice?: () => void;
  coachName: string;
  className?: string;
  children?: React.ReactNode;
}

export function SessionControls({
  isSessionActive,
  onStartSession,
  onStopSession,
  isCameraActive,
  showSkeleton,
  onToggleSkeleton,
  coachName,
  className = "",
  children,
}: SessionControlsProps) {
  return (
    <div className={`flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm ${className}`}>
      {/* Primary Action Buttons Matching UI Design */}
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        {/* Practice Start/End Badge Button */}
        <div className="flex items-center gap-2">
          {!isSessionActive ? (
            <button
              type="button"
              onClick={onStartSession}
              className="flex items-center gap-1.5 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white px-4 py-2 text-xs font-bold transition shadow-sm cursor-pointer active:scale-95"
            >
              <span>Practice with {coachName}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onStopSession}
              className="flex items-center gap-1.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 text-xs font-bold transition shadow-sm cursor-pointer active:scale-95"
            >
              <Square size={11} className="fill-white" />
              <span>End Routine</span>
            </button>
          )}
        </div>

        {/* Right Controls (e.g. AsanaSelector below camera view) */}
        {children && <div className="flex items-center gap-2">{children}</div>}
      </div>

      {/* Secondary Controls Bar: Skeleton */}
      <div className="flex items-center justify-between border-t border-slate-100 pt-2 text-xs font-medium text-slate-600">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-1.5 cursor-pointer hover:text-slate-900 select-none">
            <input
              type="checkbox"
              checked={showSkeleton}
              onChange={onToggleSkeleton}
              className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500/20"
            />
            <span>Skeleton</span>
          </label>
        </div>

        <span className="text-[11px] text-slate-400 font-medium">
          {isCameraActive ? "Camera active" : "Camera standby"}
        </span>
      </div>
    </div>
  );
}

