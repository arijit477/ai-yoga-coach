import { useState } from "react";
import { BookOpen, CheckCircle2, ChevronDown, ChevronUp, Sparkles, Target } from "lucide-react";
import type { Asana } from "../types/asana";

interface AsanaInstructionsSectionProps {
  asana: Asana;
  currentStepIndex?: number;
  className?: string;
}

export function AsanaInstructionsSection({
  asana,
  currentStepIndex,
  className = "",
}: AsanaInstructionsSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!asana) return null;

  return (
    <section
      aria-label={`Instructions for ${asana.name}`}
      className={`rounded-3xl border border-emerald-100/80 bg-white/90 p-5 sm:p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md ${className}`}
    >
      {/* Header with Title, Sanskrit Name, and Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200/60 shadow-xs">
            <BookOpen size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                Step-by-Step Guidance
              </span>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-800 capitalize border border-emerald-200/50">
                {asana.difficulty}
              </span>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 capitalize">
                {asana.category}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 mt-0.5">
              <span>{asana.name}</span>
              {asana.sanskritName && (
                <span className="text-xs sm:text-sm font-medium text-slate-500 italic">
                  ({asana.sanskritName})
                </span>
              )}
            </h3>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <span>{isExpanded ? "Collapse" : "View Steps"}</span>
          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {/* Expandable Content Area */}
      {isExpanded && (
        <div className="pt-4 space-y-5 animate-in fade-in duration-200">
          {/* Brief Description */}
          {asana.description && (
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {asana.description}
            </p>
          )}

          {/* Numbered Instruction Steps */}
          {asana.instructions && asana.instructions.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5 flex items-center gap-1.5">
                <Target size={14} className="text-emerald-700" />
                <span>How to Perform</span>
              </h4>
              <ol className="grid gap-2 sm:grid-cols-2">
                {asana.instructions.map((step, index) => {
                  const isActiveStep = currentStepIndex === index;
                  return (
                    <li
                      key={index}
                      className={`flex items-start gap-3 rounded-2xl p-3 text-xs sm:text-sm transition-all duration-200 border ${
                        isActiveStep
                          ? "bg-emerald-50/80 border-emerald-300 ring-2 ring-emerald-400/20 shadow-xs"
                          : "bg-slate-50/60 border-slate-100 hover:bg-slate-50"
                      }`}
                    >
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                          isActiveStep
                            ? "bg-emerald-600 text-white shadow-xs"
                            : "bg-emerald-100/80 text-emerald-800"
                        }`}
                      >
                        {index + 1}
                      </span>
                      <div className="flex-1 leading-snug">
                        <p className={`${isActiveStep ? "font-semibold text-emerald-950" : "text-slate-700"}`}>
                          {step}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          )}

          {/* Key Alignment Cues & Form Focus */}
          {asana.cues && asana.cues.length > 0 && (
            <div className="rounded-2xl border border-emerald-200/60 bg-emerald-50/40 p-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2 flex items-center gap-1.5">
                <Sparkles size={14} className="text-emerald-700" />
                <span>Key Alignment Focus</span>
              </h4>
              <div className="grid gap-2 sm:grid-cols-2">
                {asana.cues.map((cue) => (
                  <div
                    key={cue.id}
                    className="flex items-start gap-2 text-xs sm:text-sm text-slate-700"
                  >
                    <CheckCircle2 size={15} className="text-emerald-600 mt-0.5 shrink-0" />
                    <div>
                      <span className="font-bold text-slate-900 mr-1.5">
                        {cue.jointOrBodyPart}:
                      </span>
                      <span>{cue.cue}</span>
                      {cue.tip && (
                        <p className="text-[11px] text-emerald-800/80 mt-0.5 italic">
                          Tip: {cue.tip}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Benefits summary pills */}
          {asana.benefits && asana.benefits.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap pt-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mr-1">
                Benefits:
              </span>
              {asana.benefits.map((benefit, idx) => (
                <span
                  key={idx}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700 font-medium"
                >
                  {benefit}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
