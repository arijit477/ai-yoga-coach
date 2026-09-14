import type { PoseIssue } from "../types/pose-rules";

interface CorrectionCardProps {
  issue: PoseIssue | null;
}

function getSeverityLabel(severity: PoseIssue["severity"]): string {
  switch (severity) {
    case "high":
      return "Important Correction";

    case "medium":
      return "Form Correction";

    case "low":
      return "Small Adjustment";

    case "info":
      return "Form Tip";

    default:
      return "Coach Feedback";
  }
}

function getSeverityClasses(severity: PoseIssue["severity"]): {
  container: string;
  indicator: string;
  label: string;
} {
  switch (severity) {
    case "high":
      return {
        container: "border-rose-200 bg-rose-50/70",
        indicator: "bg-rose-500",
        label: "text-rose-800",
      };

    case "medium":
      return {
        container: "border-amber-200 bg-amber-50/70",
        indicator: "bg-amber-500",
        label: "text-amber-800",
      };

    case "low":
    case "info":
    default:
      return {
        container: "border-emerald-200 bg-emerald-50/70",
        indicator: "bg-emerald-600",
        label: "text-emerald-800",
      };
  }
}

export function CorrectionCard({ issue }: CorrectionCardProps) {
  if (!issue) {
    return (
      <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/60 p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-600" />
          <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
            Good Alignment
          </p>
        </div>

        <p className="mt-2 text-sm font-semibold text-slate-800">
          Great form. Hold your position.
        </p>

        <p className="mt-1 text-xs text-slate-500">
          Maintain steady breathing while holding the pose.
        </p>
      </div>
    );
  }

  const styles = getSeverityClasses(issue.severity);

  return (
    <div className={`rounded-2xl border p-4 shadow-sm ${styles.container}`}>
      <div className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${styles.indicator}`} />
        <p className={`text-[11px] font-bold uppercase tracking-wider ${styles.label}`}>
          {getSeverityLabel(issue.severity)}
        </p>
      </div>

      <p className="mt-2 text-sm font-semibold text-slate-900 leading-snug">
        {issue.feedback}
      </p>
    </div>
  );
}