import type { Asana } from "../types/asana";

interface AsanaInstructionsCardProps {
  asana: Asana;
  className?: string;
  isDark?: boolean;
}

/**
 * Clean, concise instruction summary card matching user's exact design:
 *
 * 🧘 Mountain · Tadasana
 * 1. Stand tall, feet together
 * 2. Arms relaxed by your sides
 * 3. Lengthen the spine, soften the shoulders
 */
export function AsanaInstructionsCard({
  asana,
  className = "",
  isDark = false,
}: AsanaInstructionsCardProps) {
  if (!asana) return null;

  // Clean asana name (e.g., "Mountain Pose" -> "Mountain")
  const cleanName = asana.name.replace(/\s+Pose$/i, "");

  // Take top 3 concise instructions
  const conciseSteps = (asana.instructions || [])
    .slice(0, 3)
    .map((step) => {
      // Remove trailing period if present for clean display
      return step.replace(/\.$/, "");
    });

  if (isDark) {
    return (
      <div
        className={`rounded-2xl border border-white/20 bg-slate-900/85 backdrop-blur-md p-3.5 sm:p-4 text-white shadow-2xl transition-all ${className}`}
      >
        {/* Title row: 🧘 Name · SanskritName */}
        <div className="flex items-center gap-1.5 flex-wrap text-xs sm:text-sm font-bold text-white pb-2 border-b border-white/10">
          <span className="text-sm leading-none">🧘</span>
          <span>{cleanName}</span>
          {asana.sanskritName && (
            <span className="font-semibold text-emerald-400 italic text-[11px] sm:text-xs">
              · {asana.sanskritName}
            </span>
          )}
        </div>

        {/* 3 concise numbered bullet points */}
        <ol className="mt-2.5 space-y-1.5 text-[11px] sm:text-xs text-slate-200/90 leading-snug">
          {conciseSteps.map((step, idx) => (
            <li key={idx} className="flex items-start gap-1.5">
              <span className="font-bold text-white shrink-0 select-none">
                {idx + 1}.
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm text-slate-800 transition-all ${className}`}
    >
      {/* Title row: 🧘 Name · SanskritName */}
      <div className="flex items-center gap-1.5 flex-wrap text-sm sm:text-[15px] font-bold text-slate-900 pb-2 border-b border-slate-100">
        <span className="text-base leading-none">🧘</span>
        <span>{cleanName}</span>
        {asana.sanskritName && (
          <span className="font-semibold text-emerald-700 italic text-xs sm:text-[13px]">
            · {asana.sanskritName}
          </span>
        )}
      </div>

      {/* 3 concise numbered bullet points */}
      <ol className="mt-2.5 space-y-1.5 text-xs sm:text-[13px] text-slate-700 leading-snug">
        {conciseSteps.map((step, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span className="font-semibold text-slate-800 shrink-0 select-none">
              {idx + 1}.
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}


