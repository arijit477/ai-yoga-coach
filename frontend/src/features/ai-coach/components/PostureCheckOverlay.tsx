import React, { useState, useEffect, useRef } from "react";
import type { PostureCheckItem } from "../types/posture-check";

interface PostureCheckOverlayProps {
  items: PostureCheckItem[];
  hasData: boolean;
  asanaId?: string;
}

export const PostureCheckOverlay = React.memo(function PostureCheckOverlay({
  items,
  hasData,
  asanaId,
}: PostureCheckOverlayProps) {
  const [isOpen, setIsOpen] = useState(true);
  const userClosedRef = useRef(false);
  const hasAutoClosedForAsanaRef = useRef(false);
  const allGoodTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset overlay to open state once when asana changes
  useEffect(() => {
    setIsOpen(true);
    userClosedRef.current = false;
    hasAutoClosedForAsanaRef.current = false;
    if (allGoodTimerRef.current) {
      clearTimeout(allGoodTimerRef.current);
      allGoodTimerRef.current = null;
    }
  }, [asanaId]);

  // Auto-close 1s after all checks go green; do NOT auto-reopen for the rest of this asana
  useEffect(() => {
    if (!hasData) {
      if (allGoodTimerRef.current) {
        clearTimeout(allGoodTimerRef.current);
        allGoodTimerRef.current = null;
      }
      return;
    }

    const issueCount = items.filter(
      (i) => i.status === "warning" || i.status === "bad" || i.status === "critical",
    ).length;
    const hasGoodItem = items.some((i) => i.status === "good");
    const isAllGood = items.length > 0 && issueCount === 0 && hasGoodItem;

    if (isAllGood) {
      if (!allGoodTimerRef.current && isOpen && !hasAutoClosedForAsanaRef.current) {
        allGoodTimerRef.current = setTimeout(() => {
          setIsOpen(false);
          hasAutoClosedForAsanaRef.current = true;
          allGoodTimerRef.current = null;
        }, 1000);
      }
    } else {
      if (allGoodTimerRef.current) {
        clearTimeout(allGoodTimerRef.current);
        allGoodTimerRef.current = null;
      }
    }
  }, [items, hasData, isOpen]);

  useEffect(() => {
    return () => {
      if (allGoodTimerRef.current) {
        clearTimeout(allGoodTimerRef.current);
      }
    };
  }, []);

  if (!hasData) return null;

  const issueCount = items.filter(
    (i) => i.status === "warning" || i.status === "bad" || i.status === "critical",
  ).length;
  const allGood = issueCount === 0;

  const handleToggle = () => {
    setIsOpen((prev) => {
      const next = !prev;
      userClosedRef.current = !next;
      return next;
    });
  };

  return (
    <div className="absolute left-0 top-[58%] -translate-y-1/2 z-20 flex items-center pointer-events-none select-none">
      {/* -- Animated panel area -- */}
      <div
        className="overflow-hidden pointer-events-auto"
        style={{
          width: isOpen ? "164px" : "0px",
          opacity: isOpen ? 1 : 0,
          transition: "width 300ms cubic-bezier(0.4,0,0.2,1), opacity 250ms ease-in-out",
        }}
      >
        <div
          className="ml-3 rounded-2xl bg-slate-900/50 backdrop-blur-sm border border-white/10 shadow-xl p-2.5"
          style={{ width: "148px" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-1.5 pb-1.5 border-b border-white/10">
            <span className="text-[8px] font-bold uppercase tracking-[0.14em] text-white/50 shrink-0">
              Posture Check
            </span>
            <span
              className={`text-[8px] font-semibold ml-1.5 shrink-0 ${allGood ? "text-emerald-400" : "text-amber-400"}`}
            >
              {allGood ? "\u2713 Good" : `${issueCount} issue${issueCount > 1 ? "s" : ""}`}
            </span>
          </div>

          {/* Rows */}
          <div className="flex flex-col gap-0.5">
            {items.map((item) => (
              <div
                key={item.key}
                className={`flex items-center gap-1.5 px-1.5 py-[5px] rounded-lg transition-all duration-300 ${
                  item.status === "bad" || item.status === "critical"
                    ? "bg-rose-500/15"
                    : item.status === "warning"
                      ? "bg-amber-400/10"
                      : "bg-transparent"
                }`}
              >
                <span
                  className={`text-[10px] shrink-0 transition-colors duration-300 ${
                    item.status === "good"
                      ? "text-emerald-400"
                      : item.status === "warning"
                        ? "text-amber-400"
                        : item.status === "bad" || item.status === "critical"
                          ? "text-rose-400"
                          : "text-white/20"
                  }`}
                >
                  {item.status === "good"
                    ? "\u25cf"
                    : item.status === "warning"
                      ? "\u26a0"
                      : item.status === "bad" || item.status === "critical"
                        ? "\u2715"
                        : "\u25cb"}
                </span>
                <span
                  className={`text-[10px] font-medium truncate transition-colors duration-300 ${
                    item.status === "good"
                      ? "text-white/60"
                      : item.status === "warning"
                        ? "text-amber-200/90"
                        : item.status === "bad" || item.status === "critical"
                          ? "text-rose-200/90"
                          : "text-white/25"
                  }`}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* -- Toggle tab -- */}
      <button
        type="button"
        onClick={handleToggle}
        className="pointer-events-auto flex flex-col items-center justify-center gap-0.5 bg-slate-900/50 hover:bg-slate-900/70 backdrop-blur-sm border border-l-0 border-white/10 text-white/50 hover:text-white/90 transition-all duration-200 cursor-pointer rounded-r-xl shrink-0"
        style={{
          width: "18px",
          height: "60px",
          transition: "background 200ms",
        }}
        title={isOpen ? "Hide posture check" : "Show posture check"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="9"
          height="9"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 300ms cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>

        {!isOpen && (
          <span
            className="text-[7px] font-bold uppercase text-white/40"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", letterSpacing: "0.1em" }}
          >
            {allGood ? "\u2713" : issueCount}
          </span>
        )}
      </button>
    </div>
  );
});
