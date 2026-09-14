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
     * Yogaverse wellness aesthetic: calm sage/mint lines with soft white joint markers
     */
    const isKevin = coach === "kevin";
    // Yogaverse brand sage & mint accents
    const strokeColor = isKevin ? "#2f8055" : "#3aab74"; // Yogaverse sage-dk / violet
    const strokeHighlight = "rgba(78, 184, 122, 0.4)";

    // Subtle, clean skeleton lines (thin & sleek for professional wellness look)
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = strokeColor;
    ctx.shadowColor = strokeHighlight;
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

    /*
     * Draw body joints (11–32: shoulders, elbows, wrists, hips, knees, ankles, feet) as crisp 4px white dots with a sage border.
     * Strictly hides face dots (indices 0-10: nose, eyes, ears, mouth) to keep user face unobstructed.
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

      // Inner crisp joint point (small & neat)
      ctx.beginPath();
      ctx.arc(x, y, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();

      // Outer delicate sage halo
      ctx.beginPath();
      ctx.arc(x, y, 5.5, 0, Math.PI * 2);
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 1.5;
      ctx.stroke();
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