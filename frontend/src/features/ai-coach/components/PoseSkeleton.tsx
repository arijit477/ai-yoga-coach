import { useEffect, useRef } from "react";
import type { PoseLandmarks } from "../types/landmarks";
import { PoseLandmarkIndex as P } from "../types/pose-landmarks";
import type { CoachPersona } from "../types/coach-session";

interface PoseSkeletonProps {
  landmarks: PoseLandmarks | null;
  videoWidth: number;
  videoHeight: number;
  coach?: CoachPersona;
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

const VISIBILITY_THRESHOLD = 0.5;

export function PoseSkeleton({
  landmarks,
  videoWidth,
  videoHeight,
  coach = "alice",
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

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!landmarks || landmarks.length === 0) {
      return;
    }

    /*
     * Draw skeleton connections.
     */
    const isKevin = coach === "kevin";
    const neonColor = isKevin ? "#39ff14" : "#00f3ff";
    const neonHighlight = isKevin ? "rgba(57, 255, 20, 0.5)" : "rgba(0, 243, 255, 0.5)";

    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = neonColor;
    ctx.shadowColor = neonColor;
    ctx.shadowBlur = 10;

    for (const [startIndex, endIndex] of CONNECTIONS) {
      const start = landmarks[startIndex];
      const end = landmarks[endIndex];

      if (!start || !end) {
        continue;
      }

      if (
        start.visibility !== undefined &&
        start.visibility < VISIBILITY_THRESHOLD
      ) {
        continue;
      }

      if (
        end.visibility !== undefined &&
        end.visibility < VISIBILITY_THRESHOLD
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

    /*
     * Draw landmarks.
     */
    for (const landmark of landmarks) {
      if (
        landmark.visibility !== undefined &&
        landmark.visibility < VISIBILITY_THRESHOLD
      ) {
        continue;
      }

      const x = landmark.x * videoWidth;
      const y = landmark.y * videoHeight;

      ctx.beginPath();

      ctx.arc(x, y, 5, 0, Math.PI * 2);

      ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
      ctx.shadowBlur = 10;
      ctx.shadowColor = neonColor;
      ctx.fill();

      ctx.beginPath();

      ctx.arc(x, y, 8, 0, Math.PI * 2);

      ctx.strokeStyle = neonHighlight;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
    
    // Reset shadow for next frame just in case
    ctx.shadowBlur = 0;
  }, [landmarks, videoWidth, videoHeight, coach]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full scale-x-[-1]"
      aria-hidden="true"
    />
  );
}