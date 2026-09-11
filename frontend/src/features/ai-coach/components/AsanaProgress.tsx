import type { Asana } from "../types/asana";
import { ChevronLeft, ChevronRight, Lock } from "lucide-react";

interface AsanaProgressProps {
  currentIndex: number;
  totalAsanas: number;
  asanas: Asana[];
  currentAsana: Asana;
  isHolding?: boolean;
  holdTime?: number;
  targetHoldSeconds?: number;
  isSessionActive?: boolean;
  canAccessIndex?: (index: number) => boolean;
  onSelectIndex: (index: number) => void;
  disabled?: boolean;
}

export function AsanaProgress({
  currentIndex,
  totalAsanas,
  asanas,
  currentAsana,
  isHolding = false,
  holdTime = 0,
  targetHoldSeconds = 5,
  isSessionActive = false,
  canAccessIndex,
  onSelectIndex,
  disabled = false,
}: AsanaProgressProps) {
  const percentComplete = Math.round((currentIndex / totalAsanas) * 100);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm backdrop-blur-md">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-indigo-500/20 text-xs font-bold text-indigo-700">
            {currentIndex + 1}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Session Progress
              </span>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                {totalAsanas} Asanas Flow
              </span>
              {isSessionActive && (
                <span className="flex items-center gap-1 text-[10px] text-amber-700/80 bg-amber-500/10 px-2 py-0.5 rounded-full">
                  <Lock size={10} />
                  <span>Locked during pose</span>
                </span>
              )}
            </div>
            <p className="text-sm font-semibold text-slate-900">
              {currentAsana.name}{" "}
              <span className="text-xs font-normal text-slate-500">
                ({currentIndex + 1} of {totalAsanas})
              </span>
            </p>
          </div>
        </div>

        {/* Previous / Next Controls - Prevents accidental skipping during active pose */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onSelectIndex(currentIndex - 1)}
            disabled={disabled || isSessionActive || currentIndex === 0}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
            title="Previous Asana"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => onSelectIndex(currentIndex + 1)}
            disabled={
              disabled ||
              isSessionActive ||
              currentIndex >= totalAsanas - 1 ||
              (canAccessIndex && !canAccessIndex(currentIndex + 1))
            }
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
            title={
              isSessionActive
                ? "Hold position to advance"
                : "Next Asana"
            }
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Segmented Timeline Bar */}
      <div className="mt-3.5">
        <div className="flex items-center gap-1.5">
          {asanas.map((pose, idx) => {
            const isDone = idx < currentIndex;
            const isCurrent = idx === currentIndex;
            const isAccessible = !isSessionActive && (!canAccessIndex || canAccessIndex(idx));

            return (
              <button
                key={pose.id}
                type="button"
                onClick={() => isAccessible && !disabled && onSelectIndex(idx)}
                disabled={disabled || !isAccessible}
                title={`${idx + 1}. ${pose.name} ${!isAccessible ? "(Locked)" : ""}`}
                className={`group relative h-2.5 flex-1 rounded-full transition-all duration-300 ${
                  isCurrent
                    ? "bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.4)]"
                    : isDone
                      ? "bg-emerald-500/80"
                      : isAccessible
                        ? "bg-slate-200 hover:bg-slate-300 cursor-pointer"
                        : "bg-slate-100 cursor-not-allowed opacity-60"
                }`}
              >
                {/* Micro tooltip */}
                <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2 py-0.5 text-[9px] font-medium text-white opacity-0 shadow transition-opacity group-hover:opacity-100 z-10">
                  {idx + 1}. {pose.name} {!isAccessible ? "🔒" : ""}
                </span>
              </button>
            );
          })}
        </div>

        {/* Status Subtext */}
        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
          <span>{percentComplete}% Completed</span>
          {isHolding ? (
            <span className="font-semibold text-emerald-600 animate-pulse">
              Holding form: {holdTime.toFixed(1)}s / {targetHoldSeconds}s
            </span>
          ) : (
            <span>Target: {targetHoldSeconds}s hold per pose</span>
          )}
        </div>
      </div>
    </div>
  );
}
