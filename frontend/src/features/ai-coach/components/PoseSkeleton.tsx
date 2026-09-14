import { useEffect, useRef } from "react";
import type { PoseLandmarks } from "../types/landmarks";
import {
  VISIBLE_BODY_LANDMARKS,
  VISIBLE_SKELETON_CONNECTIONS,
} from "../types/pose-landmarks";
import type { CoachPersona } from "../types/coach-session";

interface PoseSkeletonProps {
  landmarks: PoseLandmarks | null;
  videoWidth: number;
  videoHeight: number;
  coach?: CoachPersona;
}

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
     * Draw clean body-only skeleton connections (no face lines).
     * Polished neon tracer with subtle luminous glow around body landmarks.
     */
    const isKevin = coach === "kevin";
    // Sleek emerald/cyan/mint neon tones
    const strokeColor = isKevin ? "#10b981" : "#06b6d4";
    const neonGlowColor = isKevin ? "rgba(16, 185, 129, 0.45)" : "rgba(6, 182, 212, 0.45)";

    // 1. Outer subtle neon glow pass
    ctx.save();
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = neonGlowColor;
    ctx.shadowColor = strokeColor;
    ctx.shadowBlur = 10;

    VISIBLE_SKELETON_CONNECTIONS.forEach(([startIdx, endIdx]) => {
      const start = landmarks[startIdx];
      const end = landmarks[endIdx];

      if (
        !start ||
        !end ||
        (start.visibility ?? 1) < VISIBILITY_THRESHOLD ||
        (end.visibility ?? 1) < VISIBILITY_THRESHOLD
      ) {
        return;
      }

      ctx.beginPath();
      ctx.moveTo(start.x * videoWidth, start.y * videoHeight);
      ctx.lineTo(end.x * videoWidth, end.y * videoHeight);
      ctx.stroke();
    });
    ctx.restore();

    // 2. Inner crisp neon tracer core line (thin & elegant)
    ctx.save();
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#ffffff";
    ctx.shadowColor = strokeColor;
    ctx.shadowBlur = 4;

    VISIBLE_SKELETON_CONNECTIONS.forEach(([startIdx, endIdx]) => {
      const start = landmarks[startIdx];
      const end = landmarks[endIdx];

      if (
        !start ||
        !end ||
        (start.visibility ?? 1) < VISIBILITY_THRESHOLD ||
        (end.visibility ?? 1) < VISIBILITY_THRESHOLD
      ) {
        return;
      }

      ctx.beginPath();
      ctx.moveTo(start.x * videoWidth, start.y * videoHeight);
      ctx.lineTo(end.x * videoWidth, end.y * videoHeight);
      ctx.stroke();
    });
    ctx.restore();

    /*
     * Draw body joints (11–32: shoulders, elbows, wrists, hips, knees, ankles, feet)
     * Crisp white points with luminous neon halos. Strictly hides face dots (0-10).
     */
    for (const landmarkIndex of VISIBLE_BODY_LANDMARKS) {
      const landmark = landmarks[landmarkIndex];
      if (!landmark) continue;

      if (
        landmark.visibility !== undefined &&
        landmark.visibility < VISIBILITY_THRESHOLD
      ) {
        continue;
      }

      const x = landmark.x * videoWidth;
      const y = landmark.y * videoHeight;

      // Outer delicate neon halo
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 1.8;
      ctx.shadowColor = strokeColor;
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.restore();

      // Inner crisp joint point
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
    }
    
    // Reset shadow for next frame
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