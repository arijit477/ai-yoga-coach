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
        container: "border-red-400/20 bg-red-400/5",
        indicator: "bg-red-400",
        label: "text-red-300",
      };

    case "medium":
      return {
        container: "border-orange-400/20 bg-orange-400/5",
        indicator: "bg-orange-400",
        label: "text-orange-300",
      };

    case "low":
      return {
        container: "border-yellow-400/20 bg-yellow-400/5",
        indicator: "bg-yellow-400",
        label: "text-yellow-300",
      };

    case "info":
    default:
      return {
        container: "border-blue-400/20 bg-blue-400/5",
        indicator: "bg-blue-400",
        label: "text-blue-300",
      };
  }
}

export function CorrectionCard({ issue }: CorrectionCardProps) {
  if (!issue) {
    return (
      <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />

          <p className="text-xs font-medium uppercase tracking-wider text-emerald-300">
            Good Form
          </p>
        </div>

        <p className="mt-3 text-base font-medium leading-6">
          Great form. Hold your position.
        </p>

        <p className="mt-2 text-sm leading-5 text-white/40">
          Keep your alignment steady while you hold the pose.
        </p>
      </div>
    );
  }

  const styles = getSeverityClasses(issue.severity);

  return (
    <div className={`rounded-2xl border p-5 ${styles.container}`}>
      <div className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${styles.indicator}`} />

        <p
          className={`text-xs font-medium uppercase tracking-wider ${styles.label}`}
        >
          {getSeverityLabel(issue.severity)}
        </p>
      </div>

      <p className="mt-3 text-base font-medium leading-6 text-white">
        {issue.feedback}
      </p>

      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-xs text-white/30">{issue.ruleName}</p>

        <span className="rounded-full bg-black/20 px-2.5 py-1 text-[10px] uppercase tracking-wider text-white/40">
          {issue.severity}
        </span>
      </div>
    </div>
  );
}