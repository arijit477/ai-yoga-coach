import type { PoseLandmarks, Landmark } from "../types/landmarks";
import { PoseLandmarkIndex as P } from "../types/pose-landmarks";
import type { PostureStatus, PostureCheckItem, PostureCheckResult } from "../types/posture-check";

// -------------------------------------------------------------------------
// Helpers
// -------------------------------------------------------------------------

/** Euclidean distance in normalised landmark space (x, y only). */
function dist2D(a: Landmark, b: Landmark): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/** 2-D angle (degrees) at vertex B formed by A-B-C. */
function angleDeg(a: Landmark, b: Landmark, c: Landmark): number {
  const bax = a.x - b.x;
  const bay = a.y - b.y;
  const bcx = c.x - b.x;
  const bcy = c.y - b.y;
  const dot = bax * bcx + bay * bcy;
  const magBA = Math.sqrt(bax * bax + bay * bay);
  const magBC = Math.sqrt(bcx * bcx + bcy * bcy);
  if (magBA === 0 || magBC === 0) return 0;
  const cos = Math.max(-1, Math.min(1, dot / (magBA * magBC)));
  return (Math.acos(cos) * 180) / Math.PI;
}

/** Returns false when any of the listed landmark indices are invisible. */
function visible(lm: PoseLandmarks, ...indices: number[]): boolean {
  return indices.every((i) => {
    const l = lm[i];
    if (!l) return false;
    if (l.visibility !== undefined && l.visibility < 0.4) return false;
    return true;
  });
}

/** Mid-point of two landmarks. */
function mid(a: Landmark, b: Landmark): Landmark {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, z: (a.z + b.z) / 2 };
}

function statusFromDelta(delta: number, warnThreshold: number, critThreshold: number): PostureStatus {
  if (delta < warnThreshold) return "good";
  if (delta < critThreshold) return "warning";
  return "critical";
}

// -------------------------------------------------------------------------
// Individual checks
// -------------------------------------------------------------------------

function checkHeadPosition(lm: PoseLandmarks): PostureCheckItem {
  if (!visible(lm, P.NOSE, P.LEFT_SHOULDER, P.RIGHT_SHOULDER)) {
    return { key: "head", label: "Head Position", status: "unknown", hint: "Move fully into frame" };
  }
  const nose = lm[P.NOSE];
  const lShoulder = lm[P.LEFT_SHOULDER];
  const rShoulder = lm[P.RIGHT_SHOULDER];
  const shoulderMid = mid(lShoulder, rShoulder);

  // Lateral offset: nose should be roughly above shoulder midpoint (x-axis)
  const lateralOffset = Math.abs(nose.x - shoulderMid.x);
  // Forward lean proxy: if nose y is much lower than shoulders the head is very forward
  const shoulderWidth = dist2D(lShoulder, rShoulder);
  const relLateral = shoulderWidth > 0 ? lateralOffset / shoulderWidth : 0;

  const status = statusFromDelta(relLateral, 0.15, 0.30);
  const hint =
    status === "warning" ? "Centre your head over your shoulders" :
    status === "critical" ? "Head is significantly tilted — re-align" :
    undefined;
  return { key: "head", label: "Head Position", status, hint };
}

function checkNeckAlignment(lm: PoseLandmarks): PostureCheckItem {
  if (!visible(lm, P.NOSE, P.LEFT_EAR, P.RIGHT_EAR, P.LEFT_SHOULDER, P.RIGHT_SHOULDER)) {
    return { key: "neck", label: "Neck Alignment", status: "unknown" };
  }
  const earMid = mid(lm[P.LEFT_EAR], lm[P.RIGHT_EAR]);
  const shoulderMid = mid(lm[P.LEFT_SHOULDER], lm[P.RIGHT_SHOULDER]);
  const shoulderWidth = dist2D(lm[P.LEFT_SHOULDER], lm[P.RIGHT_SHOULDER]);

  // Lateral tilt: ear centre should be above shoulder centre
  const lateralDelta = Math.abs(earMid.x - shoulderMid.x);
  const relLateral = shoulderWidth > 0 ? lateralDelta / shoulderWidth : 0;

  // Forward neck: if ears are substantially forward of shoulders in x (camera view)
  const forwardDelta = Math.abs(earMid.x - shoulderMid.x);
  const relForward = shoulderWidth > 0 ? forwardDelta / shoulderWidth : 0;

  const status = statusFromDelta(Math.max(relLateral, relForward), 0.12, 0.25);
  const hint =
    status === "warning" ? "Lengthen through the back of your neck" :
    status === "critical" ? "Significant neck deviation — tuck chin gently" :
    undefined;
  return { key: "neck", label: "Neck Alignment", status, hint };
}

function checkShoulderBalance(lm: PoseLandmarks): PostureCheckItem {
  if (!visible(lm, P.LEFT_SHOULDER, P.RIGHT_SHOULDER)) {
    return { key: "shoulders", label: "Shoulder Balance", status: "unknown" };
  }
  const lShoulder = lm[P.LEFT_SHOULDER];
  const rShoulder = lm[P.RIGHT_SHOULDER];
  const shoulderWidth = dist2D(lShoulder, rShoulder);

  // Height difference (y axis; smaller y = higher in image)
  const heightDiff = Math.abs(lShoulder.y - rShoulder.y);
  const relHeight = shoulderWidth > 0 ? heightDiff / shoulderWidth : 0;

  const status = statusFromDelta(relHeight, 0.08, 0.18);
  const hint =
    status === "warning" ? "Level your shoulders" :
    status === "critical" ? "Shoulders are uneven — relax and square them" :
    undefined;
  return { key: "shoulders", label: "Shoulder Balance", status, hint };
}

function checkLeftElbow(lm: PoseLandmarks): PostureCheckItem {
  if (!visible(lm, P.LEFT_SHOULDER, P.LEFT_ELBOW, P.LEFT_WRIST)) {
    return { key: "leftElbow", label: "Left Elbow", status: "unknown" };
  }
  const angle = angleDeg(lm[P.LEFT_SHOULDER], lm[P.LEFT_ELBOW], lm[P.LEFT_WRIST]);

  // Fully extended (straight arm): 160-180°   ? good for many standing poses
  // Moderately bent: 100-160°                  ? warn if asana expects straight
  // Sharply bent: < 100°                       ? warn / critical

  // Generic heuristic: if elbow angle is very acute or very obtuse compared to expected,
  // flag it. We warn at < 150° and crit at < 90° (could not be holding the pose form).
  let status: PostureStatus;
  let hint: string | undefined;

  if (angle >= 150) {
    status = "good";
  } else if (angle >= 100) {
    status = "warning";
    hint = "Straighten your left arm if the pose requires it";
  } else {
    status = "critical";
    hint = "Left elbow is sharply bent — check your arm position";
  }
  return { key: "leftElbow", label: "Left Elbow", status, hint };
}

function checkSpineAlignment(lm: PoseLandmarks): PostureCheckItem {
  if (!visible(lm, P.LEFT_SHOULDER, P.RIGHT_SHOULDER, P.LEFT_HIP, P.RIGHT_HIP)) {
    return { key: "spine", label: "Spine Alignment", status: "unknown" };
  }
  const shoulderMid = mid(lm[P.LEFT_SHOULDER], lm[P.RIGHT_SHOULDER]);
  const hipMid = mid(lm[P.LEFT_HIP], lm[P.RIGHT_HIP]);
  const torsoLength = dist2D(shoulderMid, hipMid);

  // Lateral deviation: torso should be roughly vertical (shoulder mid x ˜ hip mid x)
  const lateralDelta = Math.abs(shoulderMid.x - hipMid.x);
  const relLateral = torsoLength > 0 ? lateralDelta / torsoLength : 0;

  const status = statusFromDelta(relLateral, 0.10, 0.22);
  const hint =
    status === "warning" ? "Lengthen your spine and reduce side-lean" :
    status === "critical" ? "Spine is significantly off-axis — straighten your torso" :
    undefined;
  return { key: "spine", label: "Spine Alignment", status, hint };
}

function checkHipPosition(lm: PoseLandmarks): PostureCheckItem {
  if (!visible(lm, P.LEFT_HIP, P.RIGHT_HIP)) {
    return { key: "hips", label: "Hip Position", status: "unknown" };
  }
  const lHip = lm[P.LEFT_HIP];
  const rHip = lm[P.RIGHT_HIP];
  const hipWidth = dist2D(lHip, rHip);

  // Height imbalance
  const heightDiff = Math.abs(lHip.y - rHip.y);
  const relHeight = hipWidth > 0 ? heightDiff / hipWidth : 0;

  const status = statusFromDelta(relHeight, 0.08, 0.18);
  const hint =
    status === "warning" ? "Square your hips evenly" :
    status === "critical" ? "Hips are significantly uneven — redistribute your weight" :
    undefined;
  return { key: "hips", label: "Hip Position", status, hint };
}

// -------------------------------------------------------------------------
// Public API
// -------------------------------------------------------------------------

/**
 * Analyses a set of MediaPipe pose landmarks and returns a PostureCheckResult
 * containing the 6 standard body-area checks.
 *
 * Uses *only* the provided landmarks — no additional detection pipeline.
 */
export function analyzePosture(landmarks: PoseLandmarks | null | undefined): PostureCheckResult {
  if (!landmarks || landmarks.length < 33) {
    const unknown: PostureCheckItem[] = [
      { key: "head",       label: "Head Position",    status: "unknown" },
      { key: "neck",       label: "Neck Alignment",   status: "unknown" },
      { key: "shoulders",  label: "Shoulder Balance", status: "unknown" },
      { key: "leftElbow",  label: "Left Elbow",       status: "unknown" },
      { key: "spine",      label: "Spine Alignment",  status: "unknown" },
      { key: "hips",       label: "Hip Position",     status: "unknown" },
    ];
    return { items: unknown, hasData: false };
  }

  const items: PostureCheckItem[] = [
    checkHeadPosition(landmarks),
    checkNeckAlignment(landmarks),
    checkShoulderBalance(landmarks),
    checkLeftElbow(landmarks),
    checkSpineAlignment(landmarks),
    checkHipPosition(landmarks),
  ];

  return { items, hasData: true };
}
