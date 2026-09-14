import type { CoachPersona } from "../types/coach-session";

interface CoachSelectorProps {
  selectedCoach: CoachPersona;
  onSelectCoach: (coach: CoachPersona) => void;
  disabled?: boolean;
  className?: string;
}

export function CoachSelector({
  selectedCoach,
  onSelectCoach,
  disabled = false,
  className = "",
}: CoachSelectorProps) {
  return (
    <div className={`flex items-center gap-1.5 rounded-xl bg-slate-100/80 p-1 border border-slate-200/70 ${className}`}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => onSelectCoach("alice")}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
          selectedCoach === "alice"
            ? "bg-white text-emerald-900 shadow-sm border border-slate-200/50"
            : "text-slate-600 hover:text-slate-900"
        } disabled:opacity-50`}
      >
        <img
          src="/images/alice.png"
          alt="Alice"
          className="h-4 w-4 rounded-full object-cover border border-slate-200"
        />
        <span>Alice</span>
      </button>

      <button
        type="button"
        disabled={disabled}
        onClick={() => onSelectCoach("kevin")}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
          selectedCoach === "kevin"
            ? "bg-white text-emerald-900 shadow-sm border border-slate-200/50"
            : "text-slate-600 hover:text-slate-900"
        } disabled:opacity-50`}
      >
        <img
          src="/images/kevin.jpg"
          alt="Kevin"
          className="h-4 w-4 rounded-full object-cover border border-slate-200"
        />
        <span>Kevin</span>
      </button>
    </div>
  );
}
