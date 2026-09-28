import React from "react";
import type { Asana } from "../types/asana";
import type { PostureCheckResult } from "../types/posture-check";

interface AccuracyPanelProps {
  score?: number | null;
  displayedScore?: number | null;
  holdTime?: number;
  targetHoldSeconds?: number;
  isHolding?: boolean;
  asana: Asana;
  postureCheck?: PostureCheckResult;
  className?: string;
}

interface PoseGuidanceItem {
  id: string;
  label: string;
  target?: string;
  matchingAreaKey?: string;
}

/**
 * Pose-specific guidance checklist items with target angle annotations
 */
const ASANA_GUIDANCE_ITEMS: Record<string, PoseGuidanceItem[]> = {
  "mountain-pose": [
    { id: "head", label: "Head / neck tilt", matchingAreaKey: "head" },
    { id: "l_shoulder", label: "L shoulder", matchingAreaKey: "shoulders" },
    { id: "r_shoulder", label: "R shoulder", matchingAreaKey: "shoulders" },
    { id: "l_elbow", label: "L elbow", target: "target 170°", matchingAreaKey: "elbows" },
    { id: "r_elbow", label: "R elbow", target: "target 170°", matchingAreaKey: "elbows" },
    { id: "l_hip", label: "L hip", matchingAreaKey: "hips" },
    { id: "r_hip", label: "R hip", matchingAreaKey: "hips" },
    { id: "l_knee", label: "L knee", target: "target 178°", matchingAreaKey: "knees" },
    { id: "r_knee", label: "R knee", target: "target 178°", matchingAreaKey: "knees" },
  ],
  tadasana: [
    { id: "head", label: "Head / neck tilt", matchingAreaKey: "head" },
    { id: "l_shoulder", label: "L shoulder", matchingAreaKey: "shoulders" },
    { id: "r_shoulder", label: "R shoulder", matchingAreaKey: "shoulders" },
    { id: "l_elbow", label: "L elbow", target: "target 170°", matchingAreaKey: "elbows" },
    { id: "r_elbow", label: "R elbow", target: "target 170°", matchingAreaKey: "elbows" },
    { id: "l_hip", label: "L hip", matchingAreaKey: "hips" },
    { id: "r_hip", label: "R hip", matchingAreaKey: "hips" },
    { id: "l_knee", label: "L knee", target: "target 178°", matchingAreaKey: "knees" },
    { id: "r_knee", label: "R knee", target: "target 178°", matchingAreaKey: "knees" },
  ],
  "warrior-ii": [
    { id: "head", label: "Head / neck gaze", matchingAreaKey: "head" },
    { id: "l_shoulder", label: "L shoulder", target: "target 90°", matchingAreaKey: "shoulders" },
    { id: "r_shoulder", label: "R shoulder", target: "target 90°", matchingAreaKey: "shoulders" },
    { id: "l_elbow", label: "L elbow", target: "target 170°", matchingAreaKey: "elbows" },
    { id: "r_elbow", label: "R elbow", target: "target 170°", matchingAreaKey: "elbows" },
    { id: "l_hip", label: "L hip", matchingAreaKey: "hips" },
    { id: "r_hip", label: "R hip", matchingAreaKey: "hips" },
    { id: "l_knee", label: "Front knee", target: "target 90°", matchingAreaKey: "knees" },
    { id: "r_knee", label: "Back knee", target: "target 175°", matchingAreaKey: "knees" },
  ],
  "step-01-prayer-pranamasana": [
    { id: "hands", label: "Palms at Heart", target: "together", matchingAreaKey: "elbows" },
    { id: "l_elbow", label: "L elbow", target: "bent", matchingAreaKey: "elbows" },
    { id: "r_elbow", label: "R elbow", target: "bent", matchingAreaKey: "elbows" },
    { id: "l_shoulder", label: "L shoulder", target: "level", matchingAreaKey: "shoulders" },
    { id: "r_shoulder", label: "R shoulder", target: "level", matchingAreaKey: "shoulders" },
    { id: "spine", label: "Spine / torso", target: "upright", matchingAreaKey: "spine" },
  ],
  "tree-pose": [
    { id: "head", label: "Head / neck balance", matchingAreaKey: "head" },
    { id: "l_shoulder", label: "L shoulder", matchingAreaKey: "shoulders" },
    { id: "r_shoulder", label: "R shoulder", matchingAreaKey: "shoulders" },
    { id: "l_elbow", label: "L elbow", target: "target 160°", matchingAreaKey: "elbows" },
    { id: "r_elbow", label: "R elbow", target: "target 160°", matchingAreaKey: "elbows" },
    { id: "l_hip", label: "L hip", matchingAreaKey: "hips" },
    { id: "r_hip", label: "R hip", matchingAreaKey: "hips" },
    { id: "l_knee", label: "Standing knee", target: "target 178°", matchingAreaKey: "knees" },
    { id: "r_knee", label: "Raised knee", target: "target 45°", matchingAreaKey: "knees" },
  ],
  "adho-mukha-svanasana": [
    { id: "head", label: "Head / neck release", matchingAreaKey: "head" },
    { id: "l_shoulder", label: "L shoulder", target: "target 170°", matchingAreaKey: "shoulders" },
    { id: "r_shoulder", label: "R shoulder", target: "target 170°", matchingAreaKey: "shoulders" },
    { id: "l_elbow", label: "L elbow", target: "target 175°", matchingAreaKey: "elbows" },
    { id: "r_elbow", label: "R elbow", target: "target 175°", matchingAreaKey: "elbows" },
    { id: "l_hip", label: "L hip / pelvis", target: "target 80°", matchingAreaKey: "hips" },
    { id: "r_hip", label: "R hip / pelvis", target: "target 80°", matchingAreaKey: "hips" },
    { id: "l_knee", label: "L knee", target: "target 175°", matchingAreaKey: "knees" },
    { id: "r_knee", label: "R knee", target: "target 175°", matchingAreaKey: "knees" },
  ],
  trikonasana: [
    { id: "head", label: "Head / upward gaze", matchingAreaKey: "head" },
    { id: "l_shoulder", label: "L shoulder", target: "target 180°", matchingAreaKey: "shoulders" },
    { id: "r_shoulder", label: "R shoulder", target: "target 180°", matchingAreaKey: "shoulders" },
    { id: "l_elbow", label: "L elbow", target: "target 175°", matchingAreaKey: "elbows" },
    { id: "r_elbow", label: "R elbow", target: "target 175°", matchingAreaKey: "elbows" },
    { id: "l_hip", label: "Front hip", target: "target 85°", matchingAreaKey: "hips" },
    { id: "r_hip", label: "Back hip", matchingAreaKey: "hips" },
    { id: "l_knee", label: "Front knee", target: "target 178°", matchingAreaKey: "knees" },
    { id: "r_knee", label: "Back knee", target: "target 178°", matchingAreaKey: "knees" },
  ],
  bhujangasana: [
    { id: "head", label: "Head / gentle lift", matchingAreaKey: "head" },
    { id: "l_shoulder", label: "L shoulder roll", matchingAreaKey: "shoulders" },
    { id: "r_shoulder", label: "R shoulder roll", matchingAreaKey: "shoulders" },
    { id: "l_elbow", label: "L elbow", target: "target 140°", matchingAreaKey: "elbows" },
    { id: "r_elbow", label: "R elbow", target: "target 140°", matchingAreaKey: "elbows" },
    { id: "spine", label: "Spine / chest lift", matchingAreaKey: "spine" },
    { id: "l_hip", label: "L hip grounded", matchingAreaKey: "hips" },
    { id: "r_hip", label: "R hip grounded", matchingAreaKey: "hips" },
    { id: "legs", label: "Legs extended", target: "target 178°", matchingAreaKey: "knees" },
  ],
};

const DEFAULT_GUIDANCE_ITEMS: PoseGuidanceItem[] = [
  { id: "head", label: "Head / neck tilt", matchingAreaKey: "head" },
  { id: "l_shoulder", label: "L shoulder", matchingAreaKey: "shoulders" },
  { id: "r_shoulder", label: "R shoulder", matchingAreaKey: "shoulders" },
  { id: "l_elbow", label: "L elbow", target: "target 170°", matchingAreaKey: "elbows" },
  { id: "r_elbow", label: "R elbow", target: "target 170°", matchingAreaKey: "elbows" },
  { id: "l_hip", label: "L hip", matchingAreaKey: "hips" },
  { id: "r_hip", label: "R hip", matchingAreaKey: "hips" },
  { id: "l_knee", label: "L knee", target: "target 178°", matchingAreaKey: "knees" },
  { id: "r_knee", label: "R knee", target: "target 178°", matchingAreaKey: "knees" },
];

/** Status label per spec thresholds */
function getAccuracyLabel(numericScore: number): string {
  if (numericScore === 100) return "Perfect Hold";
  if (numericScore >= 91) return "Excellent Form";
  if (numericScore >= 81) return "Very Good Form";
  if (numericScore >= 75) return "Great Alignment";
  if (numericScore >= 61) return "Almost There";
  if (numericScore >= 41) return "Looking Better";
  return "Getting Started";
}

/**
 * Ring color per spec:
 * 0–40   → Red
 * 41–60  → Orange
 * 61–80  → Green
 * 81–100 → Gold
 */
function getRingColor(numericScore: number): string {
  if (numericScore > 80) return "#eab308";  // Gold
  if (numericScore > 60) return "#22c55e";  // Green
  if (numericScore > 40) return "#f97316";  // Orange
  return "#ef4444";                          // Red
}

export const AccuracyPanel = React.memo(function AccuracyPanel({
  score,
  displayedScore,
  holdTime = 0,
  targetHoldSeconds = 5,
  isHolding = false,
  asana,

  className = "",
}: AccuracyPanelProps) {
  // Determine score value to show — prefer displayedScore (dead-band stabilized integer)
  const numericScore =
    displayedScore !== undefined && displayedScore !== null && !isNaN(displayedScore)
      ? Math.max(0, Math.min(100, displayedScore))
      : score !== null && score !== undefined && !isNaN(score)
      ? Math.max(0, Math.min(100, Math.round(score)))
      : 0;

  // Clean asana name (e.g. "Mountain Pose" -> "Mountain")
  const cleanName = asana?.name ? asana.name.replace(/\s+Pose$/i, "") : "Mountain";

  // Take top 3 concise instructions
  const conciseSteps = (asana?.instructions || [])
    .slice(0, 3)
    .map((step) => step.replace(/\.$/, ""));

  // Calculate hold progress percentage
  const safeTargetHold = targetHoldSeconds > 0 ? targetHoldSeconds : 5;
  const holdProgressPercent = Math.min(100, Math.max(0, (holdTime / safeTargetHold) * 100));

  // Retrieve guidance items for current asana
  const asanaKey = asana?.id || asana?.slug || "mountain-pose";
  const guidanceItems = ASANA_GUIDANCE_ITEMS[asanaKey] || ASANA_GUIDANCE_ITEMS[asana?.category || ""] || DEFAULT_GUIDANCE_ITEMS;

  // Derived display values
  const statusLabel = getAccuracyLabel(numericScore);
  const ringColor = getRingColor(numericScore);
  const isAligned = numericScore >= 75;
  const isPerfect = numericScore === 100;

  // SVG parameters for circular score ring
  const ringSize = 88;
  const strokeWidth = 7;
  const radius = (ringSize - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset =
    numericScore > 0
      ? circumference - (numericScore / 100) * circumference
      : circumference;

  return (
    <div className={`flex flex-col gap-4 text-slate-800 ${className}`}>
      {/* ---------------------------------------------------- */}
      {/* TOP ROW: Circular Accuracy Ring + Status/Hold Timer  */}
      {/* ---------------------------------------------------- */}
      <div className="flex items-center gap-4">
        {/* Circular Score Meter */}
        <div
          className="relative flex items-center justify-center shrink-0"
          style={{ width: ringSize, height: ringSize }}
        >
          <svg width={ringSize} height={ringSize} className="-rotate-90">
            {/* Background subtle track */}
            <circle
              cx={ringSize / 2}
              cy={ringSize / 2}
              r={radius}
              stroke="#ece7f6"
              strokeWidth={strokeWidth}
              fill="none"
            />
            {/* Dynamic progress ring */}
            <circle
              cx={ringSize / 2}
              cy={ringSize / 2}
              r={radius}
              stroke={ringColor}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="none"
              className="transition-[stroke-dashoffset,stroke] duration-300 ease-out"
              style={isPerfect ? { filter: `drop-shadow(0 0 6px ${ringColor})` } : undefined}
            />
          </svg>

          {/* Central Number & live % */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none">
            <span
              className="text-2xl font-black text-slate-900 leading-none tracking-tight"
              style={{ fontFamily: "'Fraunces', Georgia, serif" }}
            >
              {numericScore}
            </span>
            <span className="text-[9px] font-semibold tracking-tight mt-0.5" style={{ color: ringColor }}>
              {statusLabel}
            </span>
          </div>
        </div>

        {/* Right-side: Hold Timer or Alignment Prompt */}
        <div className="flex-1 flex flex-col justify-center gap-1.5 min-w-0">
          {isAligned ? (
            /* Excellent Alignment state — show hold timer */
            <>
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-emerald-800 tracking-tight">
                  {isPerfect ? "🏆 Perfect Hold!" : "✅ Excellent Alignment"}
                </h4>
                {isHolding && (
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                )}
              </div>

              {/* "Hold for N seconds" sub-label */}
              {!isPerfect && (
                <p className="text-[11px] text-emerald-700 font-medium leading-tight">
                  Hold for {safeTargetHold} seconds
                </p>
              )}

              {/* Hold Progress Bar */}
              <div className="h-2 w-full overflow-hidden rounded-full bg-[#e6f4ea] border border-emerald-100/50">
                <div
                  className="h-full rounded-full transition-all duration-150 ease-out shadow-sm"
                  style={{
                    width: `${holdProgressPercent}%`,
                    backgroundColor: isPerfect ? "#eab308" : "#10b981",
                  }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>Steady hold tracker</span>
                <span className="font-mono font-bold text-slate-700 tabular-nums">
                  {holdTime > 0 ? `${holdTime.toFixed(1)}s` : "0.0s"} / {safeTargetHold}s
                </span>
              </div>
            </>
          ) : (
            /* Not yet aligned — show status + progress */
            <>
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900 tracking-tight">
                  Live Accuracy
                </h4>
              </div>

              <p className="text-[11px] font-medium leading-tight" style={{ color: ringColor }}>
                {statusLabel} — keep adjusting
              </p>

              {/* Score progress bar (toward 75% threshold) */}
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 border border-slate-200/50">
                <div
                  className="h-full rounded-full transition-all duration-300 ease-out"
                  style={{
                    width: `${Math.min(100, (numericScore / 75) * 100)}%`,
                    backgroundColor: ringColor,
                  }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>Alignment goal: 75%</span>
                <span className="font-mono font-bold tabular-nums" style={{ color: ringColor }}>
                  {numericScore}%
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* MIDDLE: 🧘 Pose Name & Numbered Instructions         */}
      {/* ---------------------------------------------------- */}
      <div className="flex flex-col gap-1.5 pt-1">
        {/* Title */}
        <div className="flex items-center gap-1.5 flex-wrap text-sm sm:text-[15px] font-bold text-slate-900">
          <span className="text-base leading-none">🧘</span>
          <span>{cleanName}</span>
          {asana?.sanskritName && (
            <span className="font-semibold text-emerald-700 italic text-xs sm:text-[13px]">
              · {asana.sanskritName}
            </span>
          )}
        </div>

        {/* 3 concise numbered bullet points */}
        <ol className="space-y-1 text-xs sm:text-[13px] text-slate-700 leading-snug">
          {conciseSteps.map((step, idx) => (
            <li key={idx} className="flex items-start gap-1.5">
              <span className="font-semibold text-slate-900 shrink-0 select-none">
                {idx + 1}.
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* ---------------------------------------------------- */}
      {/* BOTTOM: CURRENT POSE GUIDANCE & Joint Target List    */}
      {/* ---------------------------------------------------- */}
      <div className="flex flex-col gap-1.5 pt-1">
        <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#0f766e]">
          Current Pose Guidance
        </h4>

        <div className="flex flex-col gap-1">
          {guidanceItems.map((item) => {
            return (
              <div
                key={item.id}
                className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#f0fdf4] hover:bg-[#e6f9ed] transition-colors border border-emerald-100/40 text-xs sm:text-[12.5px]"
              >
                <span className="font-medium text-slate-800">
                  {item.label}
                </span>
                {item.target && (
                  <span className="font-mono text-slate-400 text-[11px] shrink-0">
                    {item.target}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});
