import React, { useState, useEffect } from "react";

interface CircularScoreRingProps {
  /**
   * Continuous smoothed accuracy score (0-100 float).
   * Drives the SVG progress circle arc with sub-pixel fluid precision.
   */
  score: number | null;

  /**
   * Optional discrete integer accuracy score protected by dead-band hysteresis.
   * If not provided, Math.round(score) is used.
   */
  displayedScore?: number | null;

  size?: number;
  strokeWidth?: number;
  compact?: boolean;
  className?: string;
}

/** Returns the status label for a given integer score per spec thresholds */
function getAccuracyLabel(integerScore: number | null): string {
  if (integerScore === null) return "Adjust Position";
  if (integerScore === 100) return "Perfect Hold";
  if (integerScore >= 91) return "Excellent Form";
  if (integerScore >= 81) return "Very Good Form";
  if (integerScore >= 75) return "Great Alignment";
  if (integerScore >= 61) return "Almost There";
  if (integerScore >= 41) return "Looking Better";
  return "Getting Started";
}

/**
 * Returns a CSS color string based on the score:
 * 0–40   → Red   (#ef4444)
 * 41–60  → Orange (#f97316)
 * 61–80  → Green  (#22c55e)
 * 81–100 → Gold   (#eab308)
 */
function getAccuracyColor(integerScore: number | null): string {
  if (integerScore === null) return "#94a3b8";
  if (integerScore > 80) return "#eab308";  // Gold
  if (integerScore > 60) return "#22c55e";  // Green
  if (integerScore > 40) return "#f97316";  // Orange
  return "#ef4444";                          // Red
}

export const CircularScoreRing = React.memo(function CircularScoreRing({
  score,
  displayedScore,
  size = 110,
  strokeWidth = 8,
  compact = false,
  className = "",
}: CircularScoreRingProps) {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // Continuous float score for SVG arc (0-100)
  const continuousScore = score !== null && !isNaN(score) ? Math.max(0, Math.min(100, score)) : null;

  // Discrete integer score for text label (respects dead-band if provided)
  const integerScore =
    displayedScore !== undefined && displayedScore !== null && !isNaN(displayedScore)
      ? Math.max(0, Math.min(100, displayedScore))
      : continuousScore !== null
      ? Math.round(continuousScore)
      : null;

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset =
    continuousScore !== null && isMounted
      ? circumference - (continuousScore / 100) * circumference
      : circumference;

  const color = getAccuracyColor(integerScore);
  const label = getAccuracyLabel(integerScore);
  const isPerfect = integerScore === 100;

  const isSmall = size < 65;
  const isTiny = size < 44;

  const ringElement = (
    <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#f1f5f3"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          className="transition-[stroke-dashoffset,stroke] duration-300 ease-out"
          style={isPerfect ? { filter: `drop-shadow(0 0 6px ${color})` } : undefined}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none">
        <span
          className={`font-bold text-slate-800 tracking-tight leading-none ${
            isTiny ? "text-xs" : isSmall ? "text-sm" : "text-2xl"
          }`}
          style={{ fontFamily: "'Fraunces', Georgia, serif" }}
        >
          {integerScore !== null ? integerScore : "--"}
        </span>
        {!isSmall && (
          <span className="text-slate-400 font-medium text-[10px] mt-0.5">
            %
          </span>
        )}
      </div>
    </div>
  );

  if (compact) {
    return (
      <div className={`flex items-center gap-2 rounded-2xl border border-slate-200/80 bg-white/95 p-1.5 shadow-sm backdrop-blur-md ${className}`}>
        {ringElement}
        <div className="flex flex-col pr-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Alignment
          </span>
          <span className="text-xs font-bold" style={{ color }}>
            {label}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm flex flex-col items-center ${className}`}>
      <div className="w-full flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Alignment
        </span>
        <span
          className="text-[11px] font-semibold px-2 py-0.5 rounded-full transition-colors duration-300"
          style={{ backgroundColor: `${color}20`, color }}
        >
          {label}
        </span>
      </div>
      <div className="my-1">{ringElement}</div>
    </div>
  );
});
