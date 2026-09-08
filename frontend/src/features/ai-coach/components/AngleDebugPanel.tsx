import type { PoseLandmarks } from "../types/landmarks";
import { PoseLandmarkIndex as P } from "../types/pose-landmarks";
import { calculateLandmarkAngle } from "../analysis/AngleCalculator";

interface AngleDebugPanelProps {
  landmarks: PoseLandmarks | null;
}

export function AngleDebugPanel({
  landmarks,
}: AngleDebugPanelProps) {
  if (!landmarks || landmarks.length < 33) {
    return (
      <div className="rounded-xl bg-gray-100 p-4">
        <p className="text-sm text-gray-500">
          Waiting for pose...
        </p>
      </div>
    );
  }

  const leftElbow = calculateLandmarkAngle(
    landmarks[P.LEFT_SHOULDER],
    landmarks[P.LEFT_ELBOW],
    landmarks[P.LEFT_WRIST]
  );

  const rightElbow = calculateLandmarkAngle(
    landmarks[P.RIGHT_SHOULDER],
    landmarks[P.RIGHT_ELBOW],
    landmarks[P.RIGHT_WRIST]
  );

  const leftKnee = calculateLandmarkAngle(
    landmarks[P.LEFT_HIP],
    landmarks[P.LEFT_KNEE],
    landmarks[P.LEFT_ANKLE]
  );

  const rightKnee = calculateLandmarkAngle(
    landmarks[P.RIGHT_HIP],
    landmarks[P.RIGHT_KNEE],
    landmarks[P.RIGHT_ANKLE]
  );

  const leftShoulder = calculateLandmarkAngle(
    landmarks[P.LEFT_ELBOW],
    landmarks[P.LEFT_SHOULDER],
    landmarks[P.LEFT_HIP]
  );

  const rightShoulder = calculateLandmarkAngle(
    landmarks[P.RIGHT_ELBOW],
    landmarks[P.RIGHT_SHOULDER],
    landmarks[P.RIGHT_HIP]
  );

  return (
    <div className="rounded-2xl bg-gray-100 p-5 text-gray-900">
      <h2 className="text-lg font-semibold">
        Pose Geometry
      </h2>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Angle
          label="Left Elbow"
          value={leftElbow}
        />

        <Angle
          label="Right Elbow"
          value={rightElbow}
        />

        <Angle
          label="Left Knee"
          value={leftKnee}
        />

        <Angle
          label="Right Knee"
          value={rightKnee}
        />

        <Angle
          label="Left Shoulder"
          value={leftShoulder}
        />

        <Angle
          label="Right Shoulder"
          value={rightShoulder}
        />
      </div>
    </div>
  );
}

interface AngleProps {
  label: string;
  value: number;
}

function Angle({
  label,
  value,
}: AngleProps) {
  return (
    <div className="rounded-lg bg-white p-3 shadow-sm">
      <p className="text-xs text-gray-500">
        {label}
      </p>

      <p className="mt-1 text-xl font-bold">
        {Math.round(value)}°
      </p>
    </div>
  );
}