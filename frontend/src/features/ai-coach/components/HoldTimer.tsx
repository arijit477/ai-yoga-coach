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
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5">
          <span className={`h-2 w-2 rounded-full ${isHolding ? "bg-emerald-500 animate-pulse" : "bg-slate-300"}`} />
          <span className="font-semibold text-slate-700">Steady hold tracker</span>
        </div>
        <span className="font-mono font-bold text-emerald-800">
          {holdTime.toFixed(1)}s / {targetHoldSeconds.toFixed(1)}s
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 border border-slate-200/60">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-150 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
