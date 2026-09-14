import { RotateCcw, ArrowRight, Award } from "lucide-react";
import type { Asana } from "../types/asana";

interface PoseReviewModalProps {
  asana: Asana;
  score: number;
  onDoItAgain: () => void;
  onMoveToNext: () => void;
  isLastAsana?: boolean;
}

export function PoseReviewModal({
  asana,
  score,
  onDoItAgain,
  onMoveToNext,
  isLastAsana = false,
}: PoseReviewModalProps) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-in fade-in zoom-in-95 duration-200">
      <div className="w-full max-w-sm rounded-3xl border border-emerald-100 bg-white p-6 shadow-2xl text-center">
        {/* Badge Icon */}
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200/60 shadow-inner">
          <Award size={28} />
        </div>

        <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-800">
          Target Form Achieved!
        </p>
        <h3 className="mt-1 text-2xl font-bold text-slate-900 leading-tight">
          Great work on {asana.name}
        </h3>

        {/* Pose Accuracy Score */}
        <div className="my-4 inline-flex items-center gap-2 rounded-2xl bg-emerald-50/80 px-4 py-2 border border-emerald-200/50">
          <span className="text-xs font-semibold uppercase text-slate-600">Pose Accuracy:</span>
          <span className="text-2xl font-extrabold text-emerald-700">{score}%</span>
        </div>

        <p className="text-xs text-slate-600 mb-6 leading-relaxed">
          {score >= 80
            ? "Your alignment was steady and centered throughout the hold."
            : "You reached the 75% target threshold. Excellent consistency."}
        </p>

        {/* Choice Buttons: Do It Again OR Move to Next Asana */}
        <div className="flex flex-col gap-2.5">
          <button
            type="button"
            onClick={onMoveToNext}
            className="flex items-center justify-center gap-2 w-full rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white py-3 px-4 text-xs font-bold transition shadow-md active:scale-95"
          >
            <span>{isLastAsana ? "Finish Routine" : "Move to Next Asana"}</span>
            <ArrowRight size={15} />
          </button>

          <button
            type="button"
            onClick={onDoItAgain}
            className="flex items-center justify-center gap-2 w-full rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 py-2.5 px-4 text-xs font-semibold transition active:scale-95"
          >
            <RotateCcw size={14} />
            <span>Do It Again</span>
          </button>
        </div>
      </div>
    </div>
  );
}
