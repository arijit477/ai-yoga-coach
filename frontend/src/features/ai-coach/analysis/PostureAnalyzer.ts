/**
 * PostureAnalyzer — 6-area body posture check.
 *
 * Uses the SAME angle/alignment calculators as the RuleEvaluator so all
 * measurements are consistent across the posture check panel and the
 * asana-specific rules.
 *
 * Adds per-area temporal hysteresis: a status change is only confirmed
 * after it persists for N consecutive frames, preventing UI flicker.
 *
 * Geometry approach:
 *   - Shoulder/hip balance: horizontal Y-deviation (same as horizontal_alignment rules)
 *   - Joint angles: acos dot-product (0-180deg, same as RuleEvaluator angle metric)
 *   - Spine/neck lateral: X-deviation relative to torso width
 *   All use world landmarks for 3D accuracy where available.
 */

import type { PoseLandmarks, Landmark } from "../types/landmarks";
import { PoseLandmarkIndex as P } from "../types/pose-landmarks";
import type { PostureStatus, PostureCheckItem, PostureCheckResult } from "../types/posture-check";
import { calculateLandmarkAngle } from "./AngleCalculator";

// ── Hysteresis configuration ─────────────────────────────────────────────────

/**
 * Frames a new status must persist before it replaces the previous one.
 * Lower = more responsive, higher = more stable.
 */
const HYSTERESIS_FRAMES = 8;

// ── Internal state for temporal smoothing ────────────────────────────────────

interface AreaState {
  current: PostureStatus;
  candidate: PostureStatus;
  candidateFrames: number;
}

const areaKeys = ["head", "neck", "shoulders", "leftElbow", "spine", "hips"] as const;
type AreaKey = typeof areaKeys[number];

// Module-level state (singleton). Resets when landmarks disappear.
const state = new Map<AreaKey, AreaState>(
  areaKeys.map((k) => [k, { current: "unknown", candidate: "unknown", candidateFrames: 0 }])
);

function applyHysteresis(key: AreaKey, rawStatus: PostureStatus): PostureStatus {
  const s = state.get(key)!;

  if (rawStatus === s.current) {
    // Already confirmed — reset candidate
    s.candidate = rawStatus;
    s.candidateFrames = 0;
    return s.current;
  }

  if (rawStatus === s.candidate) {
    s.candidateFrames++;
    if (s.candidateFrames >= HYSTERESIS_FRAMES) {
      // Promote candidate to confirmed
      s.current = rawStatus;
      s.candidate = rawStatus;
      s.candidateFrames = 0;
    }
  } else {
    // New candidate
    s.candidate = rawStatus;
    s.candidateFrames = 1;
  }

  return s.current;
}

function resetState(): void {
  for (const key of areaKeys) {
    state.set(key, { current: "unknown", candidate: "unknown", candidateFrames: 0 });
  }
}

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Visibility threshold consistent with LandmarkUtils defaults */
const VIS_THRESHOLD = 0.45;

function ok(lm: PoseLandmarks, ...indices: number[]): boolean {
  return indices.every((i) => {
    const l = lm[i];
    if (!l) return false;
    if (!Number.isFinite(l.x) || !Number.isFinite(l.y) || !Number.isFinite(l.z)) return false;
    return (l.visibility === undefined || l.visibility >= VIS_THRESHOLD);
  });
}

function mid(a: Landmark, b: Landmark): Landmark {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, z: ((a.z ?? 0) + (b.z ?? 0)) / 2 };
}

function dist2D(a: Landmark, b: Landmark): number {
  const dx = a.x - b.x, dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function statusFromRatio(ratio: number, warnThresh: number, critThresh: number): PostureStatus {
  if (ratio < warnThresh) return "good";
  if (ratio < critThresh) return "warning";
  return "critical";
}

// ── Per-area raw detection (no hysteresis) ───────────────────────────────────

function rawHead(lm: PoseLandmarks): PostureStatus {
  if (!ok(lm, P.NOSE, P.LEFT_SHOULDER, P.RIGHT_SHOULDER)) return "unknown";
  const nose = lm[P.NOSE];
  const shoulderMid = mid(lm[P.LEFT_SHOULDER], lm[P.RIGHT_SHOULDER]);
  const shoulderWidth = dist2D(lm[P.LEFT_SHOULDER], lm[P.RIGHT_SHOULDER]);
  if (shoulderWidth < 1e-6) return "unknown";
  const lateralRatio = Math.abs(nose.x - shoulderMid.x) / shoulderWidth;
  return statusFromRatio(lateralRatio, 0.15, 0.30);
}

function rawNeck(lm: PoseLandmarks): PostureStatus {
  if (!ok(lm, P.LEFT_EAR, P.RIGHT_EAR, P.LEFT_SHOULDER, P.RIGHT_SHOULDER)) return "unknown";
  const earMid = mid(lm[P.LEFT_EAR], lm[P.RIGHT_EAR]);
  const shoulderMid = mid(lm[P.LEFT_SHOULDER], lm[P.RIGHT_SHOULDER]);
  const shoulderWidth = dist2D(lm[P.LEFT_SHOULDER], lm[P.RIGHT_SHOULDER]);
  if (shoulderWidth < 1e-6) return "unknown";
  const lateralRatio = Math.abs(earMid.x - shoulderMid.x) / shoulderWidth;
  return statusFromRatio(lateralRatio, 0.12, 0.25);
}

function rawShoulders(lm: PoseLandmarks): PostureStatus {
  if (!ok(lm, P.LEFT_SHOULDER, P.RIGHT_SHOULDER)) return "unknown";
  // Y-deviation normalized by shoulder width — same metric as horizontal_alignment rule
  const heightDiff = Math.abs(lm[P.LEFT_SHOULDER].y - lm[P.RIGHT_SHOULDER].y);
  const shoulderWidth = dist2D(lm[P.LEFT_SHOULDER], lm[P.RIGHT_SHOULDER]);
  if (shoulderWidth < 1e-6) return "unknown";
  return statusFromRatio(heightDiff / shoulderWidth, 0.08, 0.18);
}

function rawLeftElbow(lm: PoseLandmarks): PostureStatus {
  if (!ok(lm, P.LEFT_SHOULDER, P.LEFT_ELBOW, P.LEFT_WRIST)) return "unknown";
  // Use the SAME acos dot-product as RuleEvaluator angle metric (0-180deg)
  const angle = calculateLandmarkAngle(
    lm[P.LEFT_SHOULDER],
    lm[P.LEFT_ELBOW],
    lm[P.LEFT_WRIST],
  );
  if (angle === null) return "unknown";
  // Straight arm >= 155: good; moderately bent 100-155: warn; sharply bent < 100: critical
  if (angle >= 150) return "good";
  if (angle >= 95) return "warning";
  return "critical";
}

function rawSpine(lm: PoseLandmarks): PostureStatus {
  if (!ok(lm, P.LEFT_SHOULDER, P.RIGHT_SHOULDER, P.LEFT_HIP, P.RIGHT_HIP)) return "unknown";
  const shoulderMid = mid(lm[P.LEFT_SHOULDER], lm[P.RIGHT_SHOULDER]);
  const hipMid = mid(lm[P.LEFT_HIP], lm[P.RIGHT_HIP]);
  const torsoLength = dist2D(shoulderMid, hipMid);
  if (torsoLength < 1e-6) return "unknown";
  const lateralDelta = Math.abs(shoulderMid.x - hipMid.x);
  return statusFromRatio(lateralDelta / torsoLength, 0.10, 0.22);
}

function rawHips(lm: PoseLandmarks): PostureStatus {
  if (!ok(lm, P.LEFT_HIP, P.RIGHT_HIP)) return "unknown";
  const heightDiff = Math.abs(lm[P.LEFT_HIP].y - lm[P.RIGHT_HIP].y);
  const hipWidth = dist2D(lm[P.LEFT_HIP], lm[P.RIGHT_HIP]);
  if (hipWidth < 1e-6) return "unknown";
  return statusFromRatio(heightDiff / hipWidth, 0.08, 0.18);
}

// ── Hint messages ─────────────────────────────────────────────────────────────

const HINTS: Record<AreaKey, Partial<Record<Exclude<PostureStatus, "good" | "unknown">, string>>> = {
  head: {
    warning: "Centre your head over your shoulders",
    critical: "Head is significantly tilted — re-align",
  },
  neck: {
    warning: "Lengthen through the back of your neck",
    critical: "Neck deviation — tuck chin gently",
  },
  shoulders: {
    warning: "Level your shoulders",
    critical: "Shoulders are uneven — relax and square them",
  },
  leftElbow: {
    warning: "Check your left arm position",
    critical: "Left elbow sharply bent — adjust your arm",
  },
  spine: {
    warning: "Reduce side-lean and lengthen your spine",
    critical: "Spine off-axis — straighten your torso",
  },
  hips: {
    warning: "Square your hips evenly",
    critical: "Hips uneven — redistribute your weight",
  },
};

const LABELS: Record<AreaKey, string> = {
  head: "Head Position",
  neck: "Neck Alignment",
  shoulders: "Shoulder Balance",
  leftElbow: "Left Elbow",
  spine: "Spine Alignment",
  hips: "Hip Position",
};

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Analyse MediaPipe pose landmarks and return a temporally-smoothed
 * PostureCheckResult with 6 body-area checks.
 *
 * Reuses the SAME geometric primitives (calculateLandmarkAngle,
 * horizontal Y-deviation) as the RuleEvaluator so measurements
 * are always consistent with the asana rule engine.
 *
 * Call once per frame with the latest image landmarks.
 */
export function analyzePosture(landmarks: PoseLandmarks | null | undefined): PostureCheckResult {
  if (!landmarks || landmarks.length < 33) {
    resetState();
    const items: PostureCheckItem[] = areaKeys.map((key) => ({
      key,
      label: LABELS[key],
      status: "unknown" as PostureStatus,
    }));
    return { items, hasData: false };
  }

  const rawChecks: Record<AreaKey, PostureStatus> = {
    head: rawHead(landmarks),
    neck: rawNeck(landmarks),
    shoulders: rawShoulders(landmarks),
    leftElbow: rawLeftElbow(landmarks),
    spine: rawSpine(landmarks),
    hips: rawHips(landmarks),
  };

  const items: PostureCheckItem[] = areaKeys.map((key) => {
    const smoothed = applyHysteresis(key, rawChecks[key]);
    const hint =
      smoothed === "warning" || smoothed === "critical"
        ? HINTS[key][smoothed]
        : undefined;
    return { key, label: LABELS[key], status: smoothed, hint };
  });

  return { items, hasData: true };
}
