import { ArrowRight, Award, X, Sparkles, LogOut, CheckCircle2 } from "lucide-react";
import type { Asana } from "../types/asana";

interface PoseReviewModalProps {
  asana: Asana;
  score: number;
  onMoveToNext: () => void;
  onStayHere: () => void;
  onEndSession?: () => void;
  isLastAsana?: boolean;
}

export function PoseReviewModal({
  asana,
  score,
  onMoveToNext,
  onStayHere,
  onEndSession,
  isLastAsana = false,
}: PoseReviewModalProps) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-in fade-in zoom-in-95 duration-200">
      <div className="relative w-full max-w-sm rounded-3xl border border-emerald-100 bg-white p-6 shadow-2xl text-center">
        {/* Close / Stay Button */}
        <button
          type="button"
          onClick={onStayHere}
          className="absolute right-4 top-4 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Badge Icon with Elegant Celebration Animation */}
        <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-emerald-400/25 animate-[ping_2.5s_ease-out_infinite]" />
          <div className="absolute inset-[-6px] rounded-full bg-emerald-100/60 animate-[pulse_2s_ease-in-out_infinite]" />
          
          <div className="relative z-10 flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-200/90 text-emerald-700 border border-emerald-300/60 shadow-md">
            <Award size={32} className="drop-shadow-sm animate-[bounce_2s_ease-in-out_infinite]" />
          </div>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-amber-500 mb-1">
          <Sparkles size={14} className="fill-amber-400 text-amber-400 animate-spin" />
          <p className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-800">
            ASANA COMPLETED
          </p>
          <Sparkles size={14} className="fill-amber-400 text-amber-400 animate-spin" />
        </div>

        <h3 className="mt-1 text-2xl font-bold text-slate-900 leading-tight">
          Great work on {asana.name}!
        </h3>

        {/* Pose Accuracy Score */}
        <div className="my-4 inline-flex items-center gap-2.5 rounded-2xl bg-emerald-50 px-5 py-2.5 border border-emerald-200 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Final Accuracy:</span>
          <span className="text-3xl font-black text-emerald-700 tabular-nums">{score}%</span>
        </div>

        <p className="text-xs text-slate-600 mb-5 leading-relaxed">
          {score >= 80
            ? "Your alignment was steady and centered. Outstanding form!"
            : "You successfully completed the pose with strong alignment."}
        </p>

        {/* User Choice Actions: Next Pose, Stay Here, End Session */}
        <div className="flex flex-col gap-2.5">
          <button
            type="button"
            onClick={onMoveToNext}
            className="flex items-center justify-center gap-2 w-full rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white py-3 px-4 text-xs font-bold transition shadow-md active:scale-95 cursor-pointer"
          >
            <span>{isLastAsana ? "Finish Routine" : "Next Pose"}</span>
            <ArrowRight size={15} />
          </button>
          
          <button
            type="button"
            onClick={onStayHere}
            className="flex items-center justify-center gap-2 w-full rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 py-2.5 px-4 text-xs font-semibold transition shadow-xs active:scale-95 cursor-pointer"
          >
            <CheckCircle2 size={14} />
            <span>Stay Here</span>
          </button>

          {onEndSession && (
            <button
              type="button"
              onClick={onEndSession}
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 py-2.5 px-4 text-xs font-medium transition shadow-xs active:scale-95 cursor-pointer"
            >
              <LogOut size={13} />
              <span>End Session</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
