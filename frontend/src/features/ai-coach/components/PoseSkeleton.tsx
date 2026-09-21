import { useEffect, useRef } from "react";
import type { PoseLandmarks } from "../types/landmarks";
import {
  VISIBLE_BODY_LANDMARKS,
  VISIBLE_SKELETON_CONNECTIONS,
} from "../types/pose-landmarks";
import type { CoachPersona } from "../types/coach-session";
import type { PoseEvaluation } from "../types/pose-rules";

interface PoseSkeletonProps {
  landmarks: PoseLandmarks | null;
  videoWidth: number;
  videoHeight: number;
  coach?: CoachPersona;
  evaluation?: PoseEvaluation | null;
}

const VISIBILITY_THRESHOLD = 0.5;

export function PoseSkeleton(props: PoseSkeletonProps) {
  const {
    landmarks,
    videoWidth,
    videoHeight,
    coach = "alice",
    evaluation,
  } = props;

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
     * Polished neon tracer with dynamic colors based on evaluation.
     */
    let strokeColor = "#3b82f6"; // Default blue
    let neonGlowColor = "rgba(59, 130, 246, 0.45)";
    
    if (evaluation) {
      if (evaluation.score >= 75) {
        strokeColor = "#10b981"; // Excellent: Green
        neonGlowColor = "rgba(16, 185, 129, 0.45)";
      } else if (evaluation.score >= 60) {
        strokeColor = "#f59e0b"; // Improving: Yellow/Orange
        neonGlowColor = "rgba(245, 158, 11, 0.45)";
      } else {
        strokeColor = "#ef4444"; // Needs correction: Red
        neonGlowColor = "rgba(239, 68, 68, 0.45)";
      }
    } else {
       const isKevin = coach === "kevin";
       strokeColor = isKevin ? "#10b981" : "#06b6d4";
       neonGlowColor = isKevin ? "rgba(16, 185, 129, 0.45)" : "rgba(6, 182, 212, 0.45)";
    }

    /*
     * 1. Draw body joints (11–32: shoulders, elbows, wrists, hips, knees, ankles, feet)
     * Crisp points with luminous neon halos underneath the tracking lines.
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
      ctx.arc(x, y, 7, 0, Math.PI * 2);
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 2.2;
      ctx.shadowColor = strokeColor;
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.restore();

      // Inner crisp joint point
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
    }

    /*
     * 2. Draw skeleton connections ON TOP of the joints with increased thickness.
     * Glow pass + sharp bright core line.
     */
    // Outer prominent neon glow pass
    ctx.save();
    ctx.lineWidth = 7;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = neonGlowColor;
    ctx.shadowColor = strokeColor;
    ctx.shadowBlur = 14;

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

    // Inner crisp neon tracer core line (bolder and vibrant)
    ctx.save();
    ctx.lineWidth = 3.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#ffffff";
    ctx.shadowColor = strokeColor;
    ctx.shadowBlur = 6;

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