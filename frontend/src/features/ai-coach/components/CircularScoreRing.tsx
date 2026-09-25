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

  // Continuous float score for SVG arc (0 - 100)
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

  const color =
    integerScore === null
      ? "#94a3b8"
      : integerScore >= 80
      ? "#eab308" // Gold
      : integerScore >= 60
      ? "#22c55e" // Green
      : integerScore >= 40
      ? "#f97316" // Orange
      : "#ef4444"; // Red

  const getLabel = () => {
    if (integerScore === null) return "Adjust Position";
    if (integerScore === 100) return "Perfect Hold";
    if (integerScore >= 90) return "Excellent Form";
    if (integerScore >= 75) return "Great Alignment";
    if (integerScore >= 60) return "Almost There";
    if (integerScore >= 40) return "Looking Better";
    return "Getting Started";
  };

  const ringElement = (
    <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background track circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#f1f5f3"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
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
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span
          className={`font-bold text-slate-800 tracking-tight leading-none ${
            size < 70 ? "text-base" : "text-2xl"
          }`}
          style={{ fontFamily: "'Fraunces', Georgia, serif" }}
        >
          {integerScore !== null ? integerScore : "--"}
        </span>
        <span
          className={`text-slate-400 font-medium ${
            size < 70 ? "text-[8px]" : "text-[10px]"
          }`}
        >
          accuracy
        </span>
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
          <span
            className="text-xs font-bold"
            style={{ color }}
          >
            {getLabel()}
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
          className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
          style={{
            backgroundColor: `${color}15`,
            color: color,
          }}
        >
          {getLabel()}
        </span>
      </div>

      <div className="my-1">
        {ringElement}
      </div>
    </div>
  );
});
