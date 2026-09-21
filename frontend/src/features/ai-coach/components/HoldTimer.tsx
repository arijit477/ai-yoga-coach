interface HoldTimerProps {
  isHolding: boolean;
  holdTime: number;
  targetHoldSeconds: number;
  className?: string;
}

export function HoldTimer({
  isHolding,
  holdTime,
  targetHoldSeconds,
  className = "",
}: HoldTimerProps) {
  const progressPercent = Math.min(100, Math.max(0, (holdTime / targetHoldSeconds) * 100));

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className={`relative flex h-2.5 w-2.5 items-center justify-center`}>
            {isHolding && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            )}
            <span className={`relative inline-flex h-2 w-2 rounded-full ${isHolding ? "bg-emerald-600" : "bg-emerald-200"}`} />
          </span>
          <span className="font-bold uppercase tracking-wider text-[11px] text-emerald-900">
            {isHolding ? "Hold & Breathe" : "Hold Tracker"}
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className="font-mono font-extrabold text-xs text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60 shadow-sm">
            Current: {Math.floor(holdTime)} / {targetHoldSeconds} seconds
          </span>
          <span className="text-[10px] text-emerald-700 font-medium mt-1">
            Recommended: {targetHoldSeconds} seconds
          </span>
        </div>
      </div>

      {/* Progress Track */}
      <div className="h-2 w-full overflow-hidden rounded-full bg-emerald-50 border border-emerald-100 p-0.5">
        <div
          className="h-full rounded-full bg-emerald-600 transition-all duration-150 ease-out shadow-sm"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Subtle breath guidance tip */}
      {isHolding && (
        <div className="flex items-center justify-between text-[10px] font-semibold text-emerald-700 pt-0.5">
          <span>Inhale gently</span>
          <span className="italic">Steady gaze</span>
          <span>Exhale fully</span>
        </div>
      )}
    </div>
  );
}
