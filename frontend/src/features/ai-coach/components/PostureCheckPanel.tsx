import type { PostureCheckItem, PostureStatus } from "../types/posture-check";

interface PostureCheckPanelProps {
  items: PostureCheckItem[];
  hasData: boolean;
  compact?: boolean;
  className?: string;
}

// -- Styling maps ------------------------------------------------------------

const DOT_CLASS: Record<PostureStatus, string> = {
  good:     "bg-emerald-500",
  warning:  "bg-amber-400",
  critical: "bg-rose-500",
  unknown:  "bg-slate-300",
};

const LABEL_CLASS: Record<PostureStatus, string> = {
  good:     "text-slate-700",
  warning:  "text-amber-800 font-semibold",
  critical: "text-rose-800 font-bold",
  unknown:  "text-slate-400",
};

const ROW_BG: Record<PostureStatus, string> = {
  good:     "bg-slate-50 border border-slate-100",
  warning:  "bg-amber-50 border border-amber-200",
  critical: "bg-rose-50 border border-rose-200",
  unknown:  "bg-slate-50/60 border border-slate-100",
};

const ICON: Record<PostureStatus, string> = {
  good:     "?",
  warning:  "?",
  critical: "?",
  unknown:  "?",
};

// -- Sub-component: a single row ----------------------------------------------

function PostureRow({ item, compact }: { item: PostureCheckItem; compact: boolean }) {
  const isIssue = item.status === "warning" || item.status === "critical";

  return (
    <div
      className={`flex items-center justify-between py-1.5 px-2 rounded-lg transition-all duration-200 ${ROW_BG[item.status]}`}
    >
      <div className="flex items-center gap-2 min-w-0">
        <span
          className={`text-[11px] shrink-0 ${
            item.status === "good"    ? "text-emerald-600" :
            item.status === "warning" ? "text-amber-500"   :
            item.status === "critical"? "text-rose-600"    :
                                        "text-slate-300"
          }`}
        >
          {ICON[item.status]}
        </span>
        <span className={`text-[12px] truncate ${LABEL_CLASS[item.status]}`}>
          {item.label}
        </span>
      </div>

      {/* Badge */}
      {isIssue && !compact && (
        <span
          className={`ml-2 shrink-0 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
            item.status === "critical"
              ? "bg-rose-100 text-rose-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {item.status === "critical" ? "Adjust" : "Check"}
        </span>
      )}
    </div>
  );
}

// -- Main panel ---------------------------------------------------------------

export function PostureCheckPanel({
  items,
  hasData,
  compact = false,
  className = "",
}: PostureCheckPanelProps) {
  const issueCount = items.filter(
    (i) => i.status === "warning" || i.status === "critical",
  ).length;

  // In compact mode, show only items that need attention (+ cap at 4)
  const displayItems = compact
    ? items
        .filter((i) => i.status !== "good")
        .slice(0, 4)
        .concat(
          items
            .filter((i) => i.status === "good")
            .slice(0, Math.max(0, 4 - items.filter((i) => i.status !== "good").length)),
        )
    : items;

  if (!hasData && compact) return null;

  return (
    <div
      className={`rounded-2xl border border-slate-200/80 bg-white shadow-sm ${compact ? "p-3" : "p-4"} ${className}`}
    >
      {/* Header */}
      <div
        className={`flex items-center justify-between ${compact ? "pb-2 mb-2" : "pb-3 mb-3"} border-b border-slate-100`}
      >
        <h3 className={`${compact ? "text-[11px]" : "text-xs"} font-bold uppercase tracking-wider text-slate-500`}>
          Posture Check
        </h3>
        <div className="flex items-center gap-2">
          {issueCount > 0 ? (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
              {issueCount} to fix
            </span>
          ) : hasData ? (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
              All good
            </span>
          ) : (
            <span className="text-[10px] text-slate-400 font-medium">Waiting…</span>
          )}
        </div>
      </div>

      {/* Rows */}
      {!hasData ? (
        <p className="text-[11px] text-slate-400 text-center py-2">
          Position in camera to begin posture check
        </p>
      ) : (
        <div className={`flex flex-col ${compact ? "gap-1" : "gap-1.5"}`}>
          {displayItems.map((item) => (
            <PostureRow key={item.key} item={item} compact={compact} />
          ))}
        </div>
      )}
    </div>
  );
}
