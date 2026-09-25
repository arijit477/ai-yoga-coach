import React, { useEffect, useRef } from "react";
import type { Landmark, PoseLandmarks } from "../types/landmarks";
import {
  VISIBLE_BODY_LANDMARKS,
  VISIBLE_SKELETON_CONNECTIONS,
} from "../types/pose-landmarks";
import type { CoachPersona } from "../types/coach-session";
import type { PoseEvaluation, PoseEvaluationResult } from "../types/pose-rules";
import { getLandmarkConfidence } from "../analysis/LandmarkUtils";

interface PoseSkeletonProps {
  landmarks: PoseLandmarks | null;
  videoWidth: number;
  videoHeight: number;
  coach?: CoachPersona;
  evaluation?: PoseEvaluation | PoseEvaluationResult | null;
}

const VISIBILITY_THRESHOLD = 0.5;

function isLandmarkVisible(landmark: Landmark | undefined | null): boolean {
  if (!landmark) return false;
  return getLandmarkConfidence(landmark) >= VISIBILITY_THRESHOLD;
}

// MediaPipe landmark indices per body area
const BODY_AREA_LANDMARKS: Record<string, number[]> = {
  head: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  neck: [11, 12],
  shoulders: [11, 12],
  elbows: [13, 14],
  spine: [11, 12, 23, 24],
  hips: [23, 24],
  knees: [25, 26],
  ankles: [27, 28, 29, 30, 31, 32],
};

function getJointColor(
  landmarkIndex: number,
  evaluation?: PoseEvaluation | PoseEvaluationResult | null,
  defaultColor: string = "#10b981",
): string {
  if (!evaluation) return defaultColor;

  const primary = evaluation.primaryIssue;
  if (primary) {
    const jointName = (primary.joint || primary.ruleId || "").toLowerCase();
    // Check specific joint matches
    if (jointName.includes("knee") && (landmarkIndex === 25 || landmarkIndex === 26)) {
      return primary.severity === "high" ? "#ef4444" : "#f59e0b";
    }
    if (jointName.includes("elbow") && (landmarkIndex === 13 || landmarkIndex === 14)) {
      return primary.severity === "high" ? "#ef4444" : "#f59e0b";
    }
    if (jointName.includes("shoulder") && (landmarkIndex === 11 || landmarkIndex === 12)) {
      return primary.severity === "high" ? "#ef4444" : "#f59e0b";
    }
    if (jointName.includes("hip") && (landmarkIndex === 23 || landmarkIndex === 24)) {
      return primary.severity === "high" ? "#ef4444" : "#f59e0b";
    }
    if (jointName.includes("ankle") && (landmarkIndex >= 27 && landmarkIndex <= 32)) {
      return primary.severity === "high" ? "#ef4444" : "#f59e0b";
    }
  }

  // Check posture areas
  const posture = (evaluation as PoseEvaluation).posture;
  if (posture) {
    for (const [area, indices] of Object.entries(BODY_AREA_LANDMARKS)) {
      if (indices.includes(landmarkIndex)) {
        const status = posture[area as keyof typeof posture];
        if (status === "bad") return "#ef4444";
        if (status === "warning") return "#f59e0b";
      }
    }
  }

  if (evaluation.score >= 75) return "#10b981";
  if (evaluation.score >= 50) return "#f59e0b";
  return "#ef4444";
}

export const PoseSkeleton = React.memo(function PoseSkeleton(props: PoseSkeletonProps) {
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
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = videoWidth;
    canvas.height = videoHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!landmarks || landmarks.length === 0) {
      return;
    }

    let defaultStrokeColor = "#3b82f6";
    let defaultGlowColor = "rgba(59, 130, 246, 0.45)";

    if (evaluation) {
      if (evaluation.score >= 75) {
        defaultStrokeColor = "#10b981";
        defaultGlowColor = "rgba(16, 185, 129, 0.45)";
      } else if (evaluation.score >= 50) {
        defaultStrokeColor = "#f59e0b";
        defaultGlowColor = "rgba(245, 158, 11, 0.45)";
      } else {
        defaultStrokeColor = "#ef4444";
        defaultGlowColor = "rgba(239, 68, 68, 0.45)";
      }
    } else {
      const isKevin = coach === "kevin";
      defaultStrokeColor = isKevin ? "#10b981" : "#06b6d4";
      defaultGlowColor = isKevin ? "rgba(16, 185, 129, 0.45)" : "rgba(6, 182, 212, 0.45)";
    }

    /*
     * 1. Draw body joints (11-32: shoulders, elbows, wrists, hips, knees, ankles, feet)
     */
    for (const landmarkIndex of VISIBLE_BODY_LANDMARKS) {
      const landmark = landmarks[landmarkIndex];
      if (!isLandmarkVisible(landmark)) continue;

      const x = landmark!.x * videoWidth;
      const y = landmark!.y * videoHeight;
      const jointColor = getJointColor(landmarkIndex, evaluation, defaultStrokeColor);

      // Outer delicate neon halo
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, 7, 0, Math.PI * 2);
      ctx.strokeStyle = jointColor;
      ctx.lineWidth = 2.2;
      ctx.shadowColor = jointColor;
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
     * 2. Draw skeleton connections
     */
    // Outer prominent neon glow pass
    ctx.save();
    ctx.lineWidth = 7;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = defaultGlowColor;
    ctx.shadowColor = defaultStrokeColor;
    ctx.shadowBlur = 14;

    VISIBLE_SKELETON_CONNECTIONS.forEach(([startIdx, endIdx]) => {
      const start = landmarks[startIdx];
      const end = landmarks[endIdx];

      if (!isLandmarkVisible(start) || !isLandmarkVisible(end)) {
        return;
      }

      ctx.beginPath();
      ctx.moveTo(start!.x * videoWidth, start!.y * videoHeight);
      ctx.lineTo(end!.x * videoWidth, end!.y * videoHeight);
      ctx.stroke();
    });
    ctx.restore();

    // Inner crisp neon tracer core line
    ctx.save();
    ctx.lineWidth = 3.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#ffffff";
    ctx.shadowColor = defaultStrokeColor;
    ctx.shadowBlur = 6;

    VISIBLE_SKELETON_CONNECTIONS.forEach(([startIdx, endIdx]) => {
      const start = landmarks[startIdx];
      const end = landmarks[endIdx];

      if (!isLandmarkVisible(start) || !isLandmarkVisible(end)) {
        return;
      }

      ctx.beginPath();
      ctx.moveTo(start!.x * videoWidth, start!.y * videoHeight);
      ctx.lineTo(end!.x * videoWidth, end!.y * videoHeight);
      ctx.stroke();
    });
    ctx.restore();

    ctx.shadowBlur = 0;
  }, [landmarks, videoWidth, videoHeight, coach, evaluation]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full scale-x-[-1]"
      aria-hidden="true"
    />
  );
});
