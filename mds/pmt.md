Step 1 — Fix the tracking gate
We should modify:
frontend/src/features/ai-coach/analysis/TemporalPoseEvaluator.ts

Add these imports
At the top:
import {
  isLandmarkValid,
  getLandmarkConfidence,
} from "./LandmarkUtils";

import { getAsanaCoachingProfile } from "../services/AsanaCoachingProfileService";

Step 2 — Add this generic readiness function
Put this above the TemporalPoseEvaluator class:
interface TrackingReadinessResult {
  ready: boolean;
  requiredLandmarks: number[];
  missingLandmarks: number[];
  confidence: number;
  missingRegions: string[];
}

const REGION_LANDMARKS: Record<string, number[]> = {
  head: [0],

  shoulders: [11, 12],
  elbows: [13, 14],
  wrists: [15, 16],

  torso: [11, 12, 23, 24],
  spine: [11, 12, 23, 24],
  hips: [23, 24],

  knees: [25, 26],
  ankles: [27, 28],

  feet: [27, 28, 31, 32],

  // Conceptual regions used by the coaching profile system
  arms: [11, 12, 13, 14, 15, 16],
  legs: [23, 24, 25, 26, 27, 28],
};

function evaluateTrackingReadiness(
  asanaId: string,
  rules: PoseRule[],
  landmarks: PoseEvaluatorContext["landmarks"],
): TrackingReadinessResult {
  if (!landmarks || landmarks.length < 33) {
    return {
      ready: false,
      requiredLandmarks: [],
      missingLandmarks: [],
      confidence: 0,
      missingRegions: ["body"],
    };
  }

  const profile = getAsanaCoachingProfile(asanaId);

  const requiredIndices = new Set<number>();

  /*
   * 1. Always require the head anchor.
   *
   * This prevents a cropped camera view from being considered
   * fully ready simply because torso/limb rules can be evaluated.
   */
  requiredIndices.add(0);

  /*
   * 2. Add stance-specific body requirements.
   *
   * Examples:
   * standing -> torso + legs + feet
   * seated   -> torso + legs + head
   * prone    -> torso + arms + head
   * etc.
   */
  for (const region of profile.requiredRegions ?? []) {
    const indices = REGION_LANDMARKS[String(region)];

    if (!indices) {
      continue;
    }

    for (const index of indices) {
      requiredIndices.add(index);
    }
  }

  /*
   * 3. Also require every landmark explicitly referenced
   *    by the active pose rules.
   *
   * This makes the gate pose-specific without hard-coding
   * any individual asana.
   */
  for (const rule of rules) {
    for (const point of rule.points ?? []) {
      if (
        Number.isInteger(point) &&
        point >= 0 &&
        point < 33
      ) {
        requiredIndices.add(point);
      }
    }
  }

  const requiredLandmarks = Array.from(requiredIndices).sort(
    (a, b) => a - b,
  );

  const missingLandmarks = requiredLandmarks.filter(
    (index) => !isLandmarkValid(landmarks[index]),
  );

  const missingRegions: string[] = [];

  for (const region of profile.requiredRegions ?? []) {
    const indices = REGION_LANDMARKS[String(region)];

    if (!indices) {
      continue;
    }

    const regionReady = indices.every((index) =>
      isLandmarkValid(landmarks[index]),
    );

    if (!regionReady) {
      missingRegions.push(String(region));
    }
  }

  /*
   * Calculate confidence only from landmarks that matter
   * for this asana.
   */
  const confidence =
    requiredLandmarks.length > 0
      ? requiredLandmarks.reduce(
          (sum, index) =>
            sum + getLandmarkConfidence(landmarks[index]),
          0,
        ) / requiredLandmarks.length
      : 0;

  /*
   * Strict gate:
   *
   * ALL required landmarks must be valid.
   *
   * This is what prevents a partial camera frame from producing
   * a believable accuracy percentage.
   */
  const ready =
    requiredLandmarks.length > 0 &&
    missingLandmarks.length === 0 &&
    missingRegions.length === 0 &&
    confidence >= 0.5;

  return {
    ready,
    requiredLandmarks,
    missingLandmarks,
    confidence,
    missingRegions,
  };
}

Step 3 — Replace the current hasUsableTracking
You currently have this in TemporalPoseEvaluator.ts:
const hasUsableTracking =
  Boolean(context.landmarks &&
  context.landmarks.length >= 33 &&
  rawEvaluation.summary.evaluatedRules > 0 &&
  rawEvaluation.overallStatus !== "not_ready" &&
  rawEvaluation.overallStatus !== "unknown");

Remove that.
Replace it with:
const trackingReadiness = evaluateTrackingReadiness(
  asanaId,
  rules,
  context.landmarks,
);

const hasUsableTracking = trackingReadiness.ready;

Step 4 — Improve your debug log
Replace your current:
console.log("[TEMPORAL DEBUG]", {
  landmarkCount: context.landmarks?.length,
  evaluatedRules: rawEvaluation.summary.evaluatedRules,
  overallStatus: rawEvaluation.overallStatus,
  rawScore: rawEvaluation.score,
  hasUsableTracking,
});

with:
console.log("[TEMPORAL DEBUG]", {
  asanaId,

  landmarkCount: context.landmarks?.length,

  evaluatedRules: rawEvaluation.summary.evaluatedRules,

  overallStatus: rawEvaluation.overallStatus,

  rawScore: rawEvaluation.score,

  hasUsableTracking,

  requiredLandmarks:
    trackingReadiness.requiredLandmarks,

  missingLandmarks:
    trackingReadiness.missingLandmarks,

  missingRegions:
    trackingReadiness.missingRegions,

  trackingConfidence:
    trackingReadiness.confidence,
});

Now when the user is too close to the camera, you'll see something like:
[TEMPORAL DEBUG]

asanaId: "chair-utkatasana"

hasUsableTracking: false

requiredLandmarks: [
  0,
  11,
  12,
  13,
  14,
  15,
  16,
  23,
  24,
  25,
  26,
  27,
  28,
  31,
  32
]

missingLandmarks: [
  27,
  28,
  31,
  32
]

missingRegions: [
  "legs",
  "feet"
]

trackingConfidence: 0.42

That is exactly what we want.
Step 5 — What happens to the 72%?
This is the important part.
With the new gate:
Partial body
     ↓
trackingReadiness.ready = false
     ↓
AccuracyStabilizer receives null
     ↓
stableAccuracy eventually becomes null
     ↓
TemporalPoseEvaluator.isValid = false
     ↓
AICoachPage.liveAccuracyScore = null
     ↓
NO MISLEADING 72%

Your existing AICoachPage.tsx already has this protection:
if (
  !isCameraActive ||
  !stableEvaluation?.isValid
  ...
) {
  return null;
}

So we don't need to redesign the accuracy UI right now. 
That's good because we can fix the underlying tracking validity without unnecessarily touching the UI.
Step 6 — Do NOT change AccuracyStabilizer
Leave:
AccuracyStabilizer.ts

alone for now.
It is doing its job:
valid score
    ↓
smooth score
    ↓
display score

The problem is that we were feeding it a score that should never have been considered valid in the first place.
So the architecture becomes:
MediaPipe
   ↓
33 landmarks
   ↓
Pose-specific Tracking Readiness   ← FIX HERE
   ↓
Is full required body visible?
   │
   ├── NO ──→ null / waiting
   │
   └── YES
          ↓
     RuleEvaluator
          ↓
     PoseEvaluator
          ↓
     AccuracyStabilizer
          ↓
       Live Score

That is the correct order.
One important thing
Your existing AsanaLandmarkRequirements.ts is rule-dependent, which is useful but not sufficient by itself. For example, Chair's rules can depend on shoulders/elbows/hips/knees without explicitly requiring the feet. That's why I'm combining:
1. stance requirements
standing
→ torso + legs + feet

with
2. pose-rule landmarks
Chair rules
→ shoulders + elbows + hips + knees

plus
3. head anchor
head

This gives us a genuinely generic full-body gate instead of a Chair-specific patch.
Your existing camera types even already define states such as camera_partial, camera_no_pose, and partial_pose, so the project architecture is already set up for this kind of distinction.