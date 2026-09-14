import { useState, useEffect } from "react";
import { Maximize2, X, Sparkles, CheckCircle2 } from "lucide-react";
import type { Asana } from "../types/asana";

interface AsanaReferenceProps {
  asana: Asana;
  className?: string;
}

export function AsanaReference({ asana, className = "" }: AsanaReferenceProps) {
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Reset image error whenever asana changes
  useEffect(() => {
    setHasError(false);
  }, [asana.imageUrl, asana.id]);

  // Close modal on Escape key press
  useEffect(() => {
    if (!isEnlarged) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsEnlarged(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isEnlarged]);

  const cleanName = asana.name.replace(/\s+Pose$/i, "");

  return (
    <>
      <div
        className={`rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-md p-2.5 sm:p-3 shadow-md text-center flex flex-col items-center ${className}`}
      >
        {/* Centered Header */}
        <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-emerald-800 mb-2">
          COPY THIS POSE
        </p>

        {/* Rounded Portrait Image Container */}
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-slate-100 border border-slate-200/60 flex items-center justify-center">
          {!hasError ? (
            <img
              src={asana.imageUrl}
              alt={asana.name}
              onError={() => setHasError(true)}
              className="h-full w-full object-contain p-1.5 rounded-lg transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-3 text-center text-slate-400">
              <span className="text-3xl mb-1">🧘</span>
              <span className="text-xs font-medium text-slate-500">{cleanName}</span>
            </div>
          )}
        </div>

        {/* Pose Title with Meditator Emoji */}
        <div className="mt-2 flex items-center justify-center gap-1 text-xs sm:text-sm font-bold text-slate-800 leading-tight">
          <span className="text-sm sm:text-base leading-none">🧘</span>
          <span>{cleanName}</span>
        </div>

        {/* Sanskrit Subtitle (Clean & Centered) */}
        {asana.sanskritName && (
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5 line-clamp-1">
            {asana.sanskritName}
          </p>
        )}

        {/* Enlarge Button */}
        <button
          type="button"
          onClick={() => setIsEnlarged(true)}
          className="mt-2.5 w-full rounded-full border border-emerald-300/80 bg-[#edf7f2] hover:bg-emerald-100/70 text-emerald-800 text-[11px] sm:text-xs font-semibold py-1 sm:py-1.5 px-2.5 flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-xs cursor-pointer"
        >
          <Maximize2 size={12} className="text-emerald-700 shrink-0" />
          <span>Enlarge</span>
        </button>
      </div>

      {/* Enlarged Reference Modal */}
      {isEnlarged && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setIsEnlarged(false)}
        >
          <div
            className="w-full max-w-lg rounded-3xl border border-emerald-100 bg-white p-5 sm:p-6 shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-emerald-800 border border-emerald-200/60">
                  COPY THIS POSE
                </span>
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-600 capitalize">
                  {asana.difficulty}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setIsEnlarged(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition"
                title="Close"
              >
                <X size={16} />
              </button>
            </div>

            {/* Pose Identity */}
            <div className="text-center mb-4">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center justify-center gap-2">
                <span>🧘</span>
                <span>{asana.name}</span>
              </h3>
              {asana.sanskritName && (
                <p className="text-sm text-slate-500 font-medium mt-0.5">
                  {asana.sanskritName}
                </p>
              )}
            </div>

            {/* High-Resolution View */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center mb-4">
              <img
                src={asana.imageUrl}
                alt={asana.name}
                className="h-full w-full object-contain p-2"
              />
              <div className="absolute bottom-3 right-3 rounded-full bg-slate-900/80 text-white px-3 py-1 text-xs font-semibold backdrop-blur-sm">
                Target Hold: {asana.targetHoldSeconds}s
              </div>
            </div>

            {/* Form Focus Cues */}
            {asana.cues && asana.cues.length > 0 && (
              <div className="rounded-2xl border border-emerald-200/60 bg-emerald-50/50 p-3.5 mb-4">
                <div className="flex items-center gap-1.5 mb-2">
                  <Sparkles size={14} className="text-emerald-700" />
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                    Form Focus Points
                  </span>
                </div>
                <div className="space-y-1.5 text-xs text-slate-700">
                  {asana.cues.map((cue) => (
                    <div key={cue.id} className="flex items-start gap-2">
                      <CheckCircle2 size={13} className="text-emerald-600 mt-0.5 shrink-0" />
                      <p>
                        <strong className="text-slate-900">{cue.jointOrBodyPart}:</strong> {cue.cue}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsEnlarged(false)}
              className="w-full rounded-xl bg-slate-900 hover:bg-slate-800 text-white py-2.5 text-xs font-bold transition shadow-sm"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}
    </>
  );
}

