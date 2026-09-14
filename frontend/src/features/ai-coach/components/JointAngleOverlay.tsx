import { useEffect, useRef } from "react";
import type { PoseLandmarks } from "../types/landmarks";
import type { JointAngleValue, JointAngleStatus } from "../types/joint-angles";

interface JointAngleOverlayProps {
  landmarks: PoseLandmarks | null;
  jointAngles: JointAngleValue[];
  videoWidth: number;
  videoHeight: number;
  // If the video container uses CSS scale-x-[-1] mirroring
  isMirrored?: boolean;
}

const STATUS_COLORS: Record<JointAngleStatus, { stroke: string; fill: string; text: string; bg: string }> = {
  good: {
    stroke: "#2f8055", // Yogaverse sage-dk
    fill: "rgba(47, 128, 85, 0.2)",
    text: "#ffffff",
    bg: "rgba(30, 77, 50, 0.88)",
  },
  warning: {
    stroke: "#d4a017", // Yogaverse gold / honey
    fill: "rgba(212, 160, 23, 0.25)",
    text: "#ffffff",
    bg: "rgba(60, 48, 12, 0.88)",
  },
  error: {
    stroke: "#e07b5f", // Yogaverse coral / terracotta
    fill: "rgba(224, 123, 95, 0.3)",
    text: "#ffffff",
    bg: "rgba(70, 28, 20, 0.9)",
  },
  unknown: {
    stroke: "#7ba686",
    fill: "rgba(123, 166, 134, 0.15)",
    text: "#ffffff",
    bg: "rgba(30, 50, 40, 0.8)",
  },
};

export function JointAngleOverlay({
  landmarks,
  jointAngles,
  videoWidth,
  videoHeight,
  isMirrored = true,
}: JointAngleOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = videoWidth;
    canvas.height = videoHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!landmarks || landmarks.length < 33 || jointAngles.length === 0) {
      return;
    }

    // Helper: convert landmark normalized coordinates to canvas coordinates
    // When isMirrored is true, landmark x is mirrored: (1 - landmark.x) * videoWidth
    const getPoint = (idx: number) => {
      const lm = landmarks[idx];
      if (!lm) return null;
      const x = isMirrored ? (1 - lm.x) * videoWidth : lm.x * videoWidth;
      const y = lm.y * videoHeight;
      return { x, y, visibility: lm.visibility };
    };

    for (const joint of jointAngles) {
      if (joint.angle === null) continue;

      const [pA, pB, pC] = joint.points;
      const ptA = getPoint(pA);
      const ptB = getPoint(pB); // Vertex
      const ptC = getPoint(pC);

      if (!ptA || !ptB || !ptC) continue;
      if (ptB.visibility !== undefined && ptB.visibility < 0.4) continue;

      const isHighlighted = Boolean(joint.isPrimaryIssue && (joint.status === "error" || joint.status === "warning"));
      const colors = STATUS_COLORS[joint.status] || STATUS_COLORS.good;

      // 1. Draw angle arc around joint vertex
      const angleA = Math.atan2(ptA.y - ptB.y, ptA.x - ptB.x);
      const angleC = Math.atan2(ptC.y - ptB.y, ptC.x - ptB.x);

      // Determine smallest sweeping arc
      let diff = angleC - angleA;
      while (diff < -Math.PI) diff += Math.PI * 2;
      while (diff > Math.PI) diff -= Math.PI * 2;

      const arcRadius = isHighlighted ? 30 : 22;
      const counterClockwise = diff < 0;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(ptB.x, ptB.y);
      ctx.arc(ptB.x, ptB.y, arcRadius, angleA, angleC, counterClockwise);
      ctx.closePath();
      ctx.fillStyle = isHighlighted ? "rgba(239, 68, 68, 0.35)" : colors.fill;
      ctx.fill();

      // Outer arc stroke
      ctx.beginPath();
      ctx.arc(ptB.x, ptB.y, arcRadius, angleA, angleC, counterClockwise);
      ctx.strokeStyle = colors.stroke;
      ctx.lineWidth = isHighlighted ? 3.5 : 2;
      ctx.shadowColor = colors.stroke;
      ctx.shadowBlur = isHighlighted ? 12 : 4;
      ctx.stroke();
      ctx.restore();

      // If highlighted problem joint: draw target beacon ring around the vertex itself
      if (isHighlighted) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(ptB.x, ptB.y, 8, 0, Math.PI * 2);
        ctx.strokeStyle = colors.stroke;
        ctx.lineWidth = 2.5;
        ctx.shadowColor = colors.stroke;
        ctx.shadowBlur = 10;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(ptB.x, ptB.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = colors.stroke;
        ctx.fill();
        ctx.restore();
      }

      // 2. Draw angle value badge (compact dark pill with colored border)
      // Position badge along bisector or slightly offset from vertex
      const bisector = angleA + diff / 2;
      const badgeDistance = isHighlighted ? 46 : 38;
      let badgeX = ptB.x + Math.cos(bisector) * badgeDistance;
      let badgeY = ptB.y + Math.sin(bisector) * badgeDistance;

      // Keep within bounds
      const padding = 22;
      badgeX = Math.max(padding, Math.min(videoWidth - padding, badgeX));
      badgeY = Math.max(padding, Math.min(videoHeight - padding, badgeY));

      const angleText = `${joint.angle}°`;
      ctx.font = isHighlighted
        ? "bold 13px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        : "600 12px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      const textMetrics = ctx.measureText(angleText);
      const textWidth = textMetrics.width;

      // Extra space for status indicator dot
      const dotRadius = isHighlighted ? 3.5 : 2.5;
      const badgeW = textWidth + (isHighlighted ? 26 : 20);
      const badgeH = isHighlighted ? 24 : 20;
      const badgeR = 6;

      const boxLeft = badgeX - badgeW / 2;
      const boxTop = badgeY - badgeH / 2;

      // Draw badge background
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(boxLeft, boxTop, badgeW, badgeH, badgeR);
      ctx.fillStyle = isHighlighted ? "rgba(15, 23, 42, 0.95)" : colors.bg;
      ctx.fill();

      // Draw subtle status border
      ctx.strokeStyle = colors.stroke;
      ctx.lineWidth = isHighlighted ? 2 : 1.2;
      ctx.shadowColor = colors.stroke;
      ctx.shadowBlur = isHighlighted ? 12 : (joint.status === "error" ? 6 : 3);
      ctx.stroke();

      // Draw status indicator dot (left of text)
      const dotX = boxLeft + 8;
      const dotY = badgeY;
      ctx.beginPath();
      ctx.arc(dotX, dotY, dotRadius, 0, Math.PI * 2);
      ctx.fillStyle = colors.stroke;
      ctx.fill();

      // Draw text
      ctx.shadowBlur = 0;
      ctx.fillStyle = colors.text;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(angleText, dotX + dotRadius + 4, badgeY + 0.5);
      ctx.restore();
    }
  }, [landmarks, jointAngles, videoWidth, videoHeight, isMirrored]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
