import type { PoseEvaluation } from "../types/pose-rules";

interface PoseScoreProps {
  evaluation: PoseEvaluation | null;
  score: number | null;
}

function getScoreLabel(score: number): string {
  if (score >= 90) {
    return "Excellent";
  }

  if (score >= 75) {
    return "Good";
  }

  if (score >= 50) {
    return "Needs Adjustment";
  }

  return "Keep Practicing";
}

function getScoreDescription(score: number): string {
  if (score >= 90) {
    return "Your alignment looks great.";
  }

  if (score >= 75) {
    return "Your form is looking good.";
  }

  if (score >= 50) {
    return "A few adjustments will improve your form.";
  }

  return "Follow the coach correction to improve your position.";
}

export function PoseScore({ evaluation, score }: PoseScoreProps) {
  if (!evaluation || score === null) {
    return null;
  }

  const normalizedScore = Math.max(0, Math.min(100, score));

  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-white/40">
            Pose Score
          </p>

          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-4xl font-bold tabular-nums">
              {Math.round(normalizedScore)}
            </span>

            <span className="text-sm text-white/30">/ 100</span>
          </div>
        </div>

        <div className="text-right">
          <p className="text-xs uppercase tracking-wider text-white/40">
            Form
          </p>

          <p className="mt-1 text-sm font-medium">
            {getScoreLabel(normalizedScore)}
          </p>
        </div>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-white transition-all duration-300 ease-out"
          style={{
            width: `${normalizedScore}%`,
          }}
        />
      </div>

      <p className="mt-3 text-sm leading-5 text-white/40">
        {getScoreDescription(normalizedScore)}
      </p>
    </div>
  );
}