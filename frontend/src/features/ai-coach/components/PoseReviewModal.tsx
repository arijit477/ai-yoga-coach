import { ArrowRight, Award, X } from "lucide-react";
import type { Asana } from "../types/asana";

interface PoseReviewModalProps {
  asana: Asana;
  score: number;
  onMoveToNext: () => void;
  onStayHere: () => void;
  isLastAsana?: boolean;
}

export function PoseReviewModal({
  asana,
  score,
  onMoveToNext,
  onStayHere,
  isLastAsana = false,
}: PoseReviewModalProps) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-in fade-in zoom-in-95 duration-200">
      <div className="relative w-full max-w-sm rounded-3xl border border-emerald-100 bg-white p-6 shadow-2xl text-center">
        {/* Close Button */}
        <button
          type="button"
          onClick={onStayHere}
          className="absolute right-4 top-4 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Badge Icon with Elegant Celebration Animation */}
        <div className="relative mx-auto mb-4 flex h-14 w-14 items-center justify-center">
          {/* Subtle radiating halo */}
          <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-[ping_3s_ease-out_infinite]" />
          {/* Soft inner glow */}
          <div className="absolute inset-[-6px] rounded-full bg-emerald-100/40 animate-[pulse_2s_ease-in-out_infinite]" />
          
          <div className="relative z-10 flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/80 text-emerald-600 border border-emerald-200/50 shadow-sm">
            <Award size={26} className="drop-shadow-sm animate-[pulse_3s_ease-in-out_infinite]" />
          </div>
        </div>

        <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-800">
          Pose Achieved
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

        {/* Choice Buttons: Move to Next Asana / Stay Here */}
        <div className="flex flex-col gap-2.5">
          <button
            type="button"
            onClick={onMoveToNext}
            className="flex items-center justify-center gap-2 w-full rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white py-3 px-4 text-xs font-bold transition shadow-md active:scale-95"
          >
            <span>{isLastAsana ? "Finish Routine" : "Next Pose"}</span>
            <ArrowRight size={15} />
          </button>
          
          <button
            type="button"
            onClick={onStayHere}
            className="flex items-center justify-center gap-2 w-full rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 py-3 px-4 text-xs font-bold transition shadow-sm active:scale-95"
          >
            <span>Stay Here</span>
          </button>
        </div>
      </div>
    </div>
  );
}
