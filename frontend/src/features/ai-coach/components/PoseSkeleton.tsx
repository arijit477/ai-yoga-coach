import { useEffect, useRef } from "react";
import type { PoseLandmarks } from "../types/landmarks";
import { PoseLandmarkIndex as P } from "../types/pose-landmarks";

interface PoseSkeletonProps {
  landmarks: PoseLandmarks | null;
  videoWidth: number;
  videoHeight: number;
}

const CONNECTIONS: [number, number][] = [
  // Face
  [P.NOSE, P.LEFT_EYE_INNER],
  [P.LEFT_EYE_INNER, P.LEFT_EYE],
  [P.LEFT_EYE, P.LEFT_EYE_OUTER],
  [P.LEFT_EYE_OUTER, P.LEFT_EAR],

  [P.NOSE, P.RIGHT_EYE_INNER],
  [P.RIGHT_EYE_INNER, P.RIGHT_EYE],
  [P.RIGHT_EYE, P.RIGHT_EYE_OUTER],
  [P.RIGHT_EYE_OUTER, P.RIGHT_EAR],

  // Upper body
  [P.LEFT_SHOULDER, P.RIGHT_SHOULDER],

  [P.LEFT_SHOULDER, P.LEFT_ELBOW],
  [P.LEFT_ELBOW, P.LEFT_WRIST],

  [P.RIGHT_SHOULDER, P.RIGHT_ELBOW],
  [P.RIGHT_ELBOW, P.RIGHT_WRIST],

  // Torso
  [P.LEFT_SHOULDER, P.LEFT_HIP],
  [P.RIGHT_SHOULDER, P.RIGHT_HIP],
  [P.LEFT_HIP, P.RIGHT_HIP],

  // Left leg
  [P.LEFT_HIP, P.LEFT_KNEE],
  [P.LEFT_KNEE, P.LEFT_ANKLE],
  [P.LEFT_ANKLE, P.LEFT_HEEL],
  [P.LEFT_HEEL, P.LEFT_FOOT_INDEX],

  // Right leg
  [P.RIGHT_HIP, P.RIGHT_KNEE],
  [P.RIGHT_KNEE, P.RIGHT_ANKLE],
  [P.RIGHT_ANKLE, P.RIGHT_HEEL],
  [P.RIGHT_HEEL, P.RIGHT_FOOT_INDEX],
];

export function PoseSkeleton({
  landmarks,
  videoWidth,
  videoHeight,
}: PoseSkeletonProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    canvas.width = videoWidth;
    canvas.height = videoHeight;

    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    if (!landmarks || landmarks.length === 0) {
      return;
    }

    // Draw connections
    ctx.lineWidth = 4;
    ctx.lineCap = "round";

    for (const [startIndex, endIndex] of CONNECTIONS) {
      const start = landmarks[startIndex];
      const end = landmarks[endIndex];

      if (!start || !end) {
        continue;
      }

      if (
        start.visibility !== undefined &&
        start.visibility < 0.5
      ) {
        continue;
      }

      if (
        end.visibility !== undefined &&
        end.visibility < 0.5
      ) {
        continue;
      }

      const startX = start.x * videoWidth;
      const startY = start.y * videoHeight;

      const endX = end.x * videoWidth;
      const endY = end.y * videoHeight;

      ctx.beginPath();

      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);

      ctx.stroke();
    }

    // Draw landmarks
    for (const landmark of landmarks) {
      if (
        landmark.visibility !== undefined &&
        landmark.visibility < 0.5
      ) {
        continue;
      }

      const x = landmark.x * videoWidth;
      const y = landmark.y * videoHeight;

      ctx.beginPath();

      ctx.arc(x, y, 6, 0, Math.PI * 2);

      ctx.fill();
    }
  }, [landmarks, videoWidth, videoHeight]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}