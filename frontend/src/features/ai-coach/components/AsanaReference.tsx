import type { Asana } from "../types/asana";

interface AsanaReferenceProps {
  asana: Asana;
  className?: string;
}

export function AsanaReference({ asana, className = "" }: AsanaReferenceProps) {
  return (
    <div className={`rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm ${className}`}>
      <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-100">
        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
          Target Pose
        </span>
        <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 border border-emerald-200/50">
          {asana.targetHoldSeconds}s hold
        </span>
      </div>

      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-center mb-3">
        <img
          src={asana.imageUrl}
          alt={asana.name}
          className="h-full w-full object-contain p-2"
          loading="lazy"
        />
      </div>

      <div>
        <h4 className="text-sm font-bold text-slate-800 leading-tight">
          {asana.name}
        </h4>
        {asana.sanskritName && (
          <p className="text-xs text-slate-500 italic mt-0.5">
            {asana.sanskritName}
          </p>
        )}
      </div>
    </div>
  );
}
