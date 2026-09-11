import type { Asana } from "../types/asana";
import { ChevronLeft, ChevronRight, SkipForward } from "lucide-react";

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
  skippedAsanaIds?: string[];
  onSelectIndex: (index: number) => void;
  onSkipToIndex?: (index: number) => void;
  onGoBackToIndex?: (index: number) => void;
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
  skippedAsanaIds = [],
  onSelectIndex,
  onSkipToIndex,
  onGoBackToIndex,
  disabled = false,
}: AsanaProgressProps) {
  const percentComplete = Math.round((currentIndex / totalAsanas) * 100);
  const canSkipForward = !isSessionActive && currentIndex < totalAsanas - 1;
  const canGoBack = !isSessionActive && currentIndex > 0;

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
            </div>
            <p className="text-sm font-semibold text-slate-900">
              {currentAsana.name}{" "}
              <span className="text-xs font-normal text-slate-500">
                ({currentIndex + 1} of {totalAsanas})
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Back button — returns to previous pose, un-skipping if needed */}
          {canGoBack && onGoBackToIndex && (
            <button
              type="button"
              onClick={() => onGoBackToIndex(currentIndex - 1)}
              className="flex items-center gap-1.5 rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 hover:border-slate-400 active:scale-95"
              title="Go back to the previous pose"
            >
              <SkipForward size={13} className="rotate-180" />
              Back
            </button>
          )}

          {/* Skip current pose button */}
          {canSkipForward && onSkipToIndex && (
            <button
              type="button"
              onClick={() => onSkipToIndex(currentIndex + 1)}
              className="flex items-center gap-1.5 rounded-xl border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 transition hover:bg-amber-100 hover:border-amber-300 active:scale-95"
              title="Skip this pose and move to the next one"
            >
              <SkipForward size={13} />
              Skip
            </button>
          )}

          {/* Previous / Next Controls */}
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
              onClick={() => {
                const nextIdx = currentIndex + 1;
                if (canAccessIndex && canAccessIndex(nextIdx)) {
                  onSelectIndex(nextIdx);
                } else if (onSkipToIndex) {
                  onSkipToIndex(nextIdx);
                }
              }}
              disabled={disabled || isSessionActive || currentIndex >= totalAsanas - 1}
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
              title={isSessionActive ? "Hold position to advance" : "Next Asana"}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Segmented Timeline Bar */}
      <div className="mt-3.5">
        <div className="flex items-center gap-1.5">
          {asanas.map((pose, idx) => {
            const isDone = idx < currentIndex && !skippedAsanaIds.includes(pose.id);
            const isSkipped = skippedAsanaIds.includes(pose.id);
            const isCurrent = idx === currentIndex;
            const isAccessible = !isSessionActive && (!canAccessIndex || canAccessIndex(idx));
            const isClickable = !disabled && !isSessionActive && (isAccessible || !!onSkipToIndex);

            return (
              <button
                key={pose.id}
                type="button"
                onClick={() => {
                  if (!isClickable) return;
                  if (isAccessible) {
                    onSelectIndex(idx);
                  } else if (onSkipToIndex) {
                    onSkipToIndex(idx);
                  }
                }}
                disabled={disabled || isSessionActive}
                title={`${idx + 1}. ${pose.name}${isSkipped ? " (Skipped)" : !isAccessible ? " — Click to skip to this pose" : ""}`}
                className={`group relative h-2.5 flex-1 rounded-full transition-all duration-300 ${
                  isCurrent
                    ? "bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.4)]"
                    : isDone
                      ? "bg-emerald-500/80"
                      : isSkipped
                        ? "bg-amber-400/80"
                        : isClickable
                          ? "bg-slate-200 hover:bg-indigo-200 cursor-pointer"
                          : "bg-slate-100 cursor-not-allowed opacity-60"
                }`}
              >
                {/* Micro tooltip */}
                <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2 py-0.5 text-[9px] font-medium text-white opacity-0 shadow transition-opacity group-hover:opacity-100 z-10">
                  {idx + 1}. {pose.name}{" "}
                  {isSkipped ? "⏭" : isCurrent ? "▶" : isDone ? "✓" : !isAccessible ? "→ Skip to" : ""}
                </span>
              </button>
            );
          })}
        </div>

        {/* Legend + Status Subtext */}
        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
          <span>{percentComplete}% Completed</span>
          <div className="flex items-center gap-3">
            {skippedAsanaIds.length > 0 && (
              <span className="flex items-center gap-1 text-amber-600">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                {skippedAsanaIds.length} skipped
              </span>
            )}
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
    </div>
  );
}
