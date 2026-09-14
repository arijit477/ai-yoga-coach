import type { JointAngleValue } from "../types/joint-angles";

interface KeyAnglesPanelProps {
  jointAngles: JointAngleValue[];
  compact?: boolean;
  className?: string;
}

export function KeyAnglesPanel({ jointAngles, compact = false, className = "" }: KeyAnglesPanelProps) {
  // In compact mode, show top relevant joints (prioritizing active issues or warning/errors, up to 4-5)
  const displayedAngles = compact
    ? [...jointAngles]
        .sort((a, b) => {
          const score = (j: JointAngleValue) => (j.isPrimaryIssue ? 3 : j.status === "error" ? 2 : j.status === "warning" ? 1 : 0);
          return score(b) - score(a);
        })
        .slice(0, 4)
    : jointAngles;

  if (displayedAngles.length === 0) {
    if (compact) return null;
    return (
      <div className={`rounded-2xl border border-white/5 bg-slate-900/60 p-3 text-center ${className}`}>
        <p className="text-xs text-slate-400">Position in camera to view key angles</p>
      </div>
    );
  }

  if (compact) {
    return (
      <div className={`rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm ${className}`}>
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Key Angles
          </h4>
          <span className="text-[10px] text-emerald-700 font-semibold px-2 py-0.5 rounded-full bg-emerald-50">
            Live
          </span>
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
          {displayedAngles.map((joint) => {
            const statusDotClass =
              joint.status === "good"
                ? "bg-emerald-600"
                : joint.status === "warning"
                ? "bg-amber-500"
                : joint.status === "error"
                ? "bg-rose-500"
                : "bg-slate-400";

            const angleColorClass =
              joint.status === "good"
                ? "text-emerald-800"
                : joint.status === "warning"
                ? "text-amber-800"
                : joint.status === "error"
                ? "text-rose-700"
                : "text-slate-600";

            const isHighlighted = Boolean(joint.isPrimaryIssue && (joint.status === "error" || joint.status === "warning"));

            return (
              <div
                key={joint.key}
                className={`flex items-center justify-between text-xs py-1 px-2 rounded-lg transition-all ${
                  isHighlighted
                    ? "bg-rose-50 border border-rose-200 text-rose-900"
                    : "bg-slate-50/80 border border-slate-100"
                }`}
              >
                <div className="flex items-center gap-1.5 min-w-0 pr-1">
                  <span className={`h-1.5 w-1.5 rounded-full ${statusDotClass} shrink-0`} />
                  <span className={`truncate text-[11px] font-medium ${isHighlighted ? "text-rose-900 font-bold" : "text-slate-700"}`}>
                    {joint.label}
                  </span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <span className={`font-mono font-bold text-xs ${angleColorClass}`}>
                    {joint.angle !== null ? `${joint.angle}°` : "--"}
                  </span>
                  {isHighlighted && (
                    <span className="text-[10px] text-rose-600" title="Adjustment needed">⚠</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm ${className}`}>
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Key Angles
        </h3>
        <span className="text-[10px] text-emerald-700 font-semibold px-2 py-0.5 rounded-full bg-emerald-50">
          Live
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {jointAngles.map((joint) => {
          const statusDotClass =
            joint.status === "good"
              ? "bg-emerald-600"
              : joint.status === "warning"
              ? "bg-amber-500"
              : joint.status === "error"
              ? "bg-rose-500"
              : "bg-slate-400";

          const angleColorClass =
            joint.status === "good"
              ? "text-emerald-800"
              : joint.status === "warning"
              ? "text-amber-800"
              : joint.status === "error"
              ? "text-rose-700"
              : "text-slate-600";

          const isHighlighted = Boolean(joint.isPrimaryIssue && (joint.status === "error" || joint.status === "warning"));

          return (
            <div
              key={joint.key}
              className={`flex items-center justify-between text-xs py-1.5 px-2.5 rounded-lg transition-all ${
                isHighlighted
                  ? "bg-rose-50 border border-rose-200"
                  : "bg-slate-50 border border-slate-100"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${statusDotClass} shrink-0`} />
                <span className={`font-medium ${isHighlighted ? "text-rose-900 font-bold" : "text-slate-800"}`}>
                  {joint.label}
                </span>
                {isHighlighted && (
                  <span className="text-[9px] font-bold text-rose-700 uppercase tracking-wider bg-rose-100 px-1.5 py-0.5 rounded">
                    Adjustment
                  </span>
                )}
              </div>
              <span className={`font-mono font-bold text-sm ${angleColorClass}`}>
                {joint.angle !== null ? `${joint.angle}°` : "--"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
