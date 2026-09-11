import type { PoseLandmarks } from "../types/landmarks";
import { PoseLandmarkIndex as P } from "../types/pose-landmarks";
import { calculateLandmarkAngle } from "../analysis/AngleCalculator";

interface AngleDebugPanelProps {
  landmarks: PoseLandmarks | null;
}

export function AngleDebugPanel({ landmarks }: AngleDebugPanelProps) {
  if (!landmarks || landmarks.length < 33) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
        <p className="text-xs text-slate-500">Position full body to calculate joint angles</p>
      </div>
    );
  }

  const leftElbow = calculateLandmarkAngle(
    landmarks[P.LEFT_SHOULDER],
    landmarks[P.LEFT_ELBOW],
    landmarks[P.LEFT_WRIST],
  );

  const rightElbow = calculateLandmarkAngle(
    landmarks[P.RIGHT_SHOULDER],
    landmarks[P.RIGHT_ELBOW],
    landmarks[P.RIGHT_WRIST],
  );

  const leftKnee = calculateLandmarkAngle(
    landmarks[P.LEFT_HIP],
    landmarks[P.LEFT_KNEE],
    landmarks[P.LEFT_ANKLE],
  );

  const rightKnee = calculateLandmarkAngle(
    landmarks[P.RIGHT_HIP],
    landmarks[P.RIGHT_KNEE],
    landmarks[P.RIGHT_ANKLE],
  );

  const leftShoulder = calculateLandmarkAngle(
    landmarks[P.LEFT_ELBOW],
    landmarks[P.LEFT_SHOULDER],
    landmarks[P.LEFT_HIP],
  );

  const rightShoulder = calculateLandmarkAngle(
    landmarks[P.RIGHT_ELBOW],
    landmarks[P.RIGHT_SHOULDER],
    landmarks[P.RIGHT_HIP],
  );

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      <Angle label="Left Elbow" value={leftElbow} />
      <Angle label="Right Elbow" value={rightElbow} />
      <Angle label="Left Knee" value={leftKnee} />
      <Angle label="Right Knee" value={rightKnee} />
      <Angle label="Left Shoulder" value={leftShoulder} />
      <Angle label="Right Shoulder" value={rightShoulder} />
    </div>
  );
}

interface AngleProps {
  label: string;
  value: number | null;
}

function Angle({ label, value }: AngleProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 transition hover:border-slate-300 hover:bg-slate-100">
      <p className="text-[11px] font-medium text-slate-500 leading-tight truncate">{label}</p>
      <p className="mt-1 text-sm font-bold font-mono text-indigo-600">
        {value === null ? "--" : `${Math.round(value)}°`}
      </p>
    </div>
  );
}
