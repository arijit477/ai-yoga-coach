export const PoseLandmarkIndex = {
  NOSE: 0,

  LEFT_EYE_INNER: 1,
  LEFT_EYE: 2,
  LEFT_EYE_OUTER: 3,

  RIGHT_EYE_INNER: 4,
  RIGHT_EYE: 5,
  RIGHT_EYE_OUTER: 6,

  LEFT_EAR: 7,
  RIGHT_EAR: 8,

  MOUTH_LEFT: 9,
  MOUTH_RIGHT: 10,

  LEFT_SHOULDER: 11,
  RIGHT_SHOULDER: 12,

  LEFT_ELBOW: 13,
  RIGHT_ELBOW: 14,

  LEFT_WRIST: 15,
  RIGHT_WRIST: 16,

  LEFT_PINKY: 17,
  RIGHT_PINKY: 18,

  LEFT_INDEX: 19,
  RIGHT_INDEX: 20,

  LEFT_THUMB: 21,
  RIGHT_THUMB: 22,

  LEFT_HIP: 23,
  RIGHT_HIP: 24,

  LEFT_KNEE: 25,
  RIGHT_KNEE: 26,

  LEFT_ANKLE: 27,
  RIGHT_ANKLE: 28,

  LEFT_HEEL: 29,
  RIGHT_HEEL: 30,

  LEFT_FOOT_INDEX: 31,
  RIGHT_FOOT_INDEX: 32,
} as const;

export type PoseLandmarkIndex = typeof PoseLandmarkIndex[keyof typeof PoseLandmarkIndex];

/**
 * Clean visualization configuration:
 * MediaPipe landmarks 0-10 are facial landmarks (nose, eyes, ears, mouth).
 * Visible body landmarks are indices 11 through 32 (shoulders, elbows, wrists, hips, knees, ankles, feet).
 */
export const VISIBLE_BODY_LANDMARKS: readonly number[] = [
  PoseLandmarkIndex.LEFT_SHOULDER,  // 11
  PoseLandmarkIndex.RIGHT_SHOULDER, // 12
  PoseLandmarkIndex.LEFT_ELBOW,     // 13
  PoseLandmarkIndex.RIGHT_ELBOW,    // 14
  PoseLandmarkIndex.LEFT_WRIST,     // 15
  PoseLandmarkIndex.RIGHT_WRIST,    // 16
  PoseLandmarkIndex.LEFT_HIP,       // 23
  PoseLandmarkIndex.RIGHT_HIP,      // 24
  PoseLandmarkIndex.LEFT_KNEE,      // 25
  PoseLandmarkIndex.RIGHT_KNEE,     // 26
  PoseLandmarkIndex.LEFT_ANKLE,     // 27
  PoseLandmarkIndex.RIGHT_ANKLE,    // 28
] as const;

export const VISIBLE_BODY_LANDMARK_SET = new Set<number>(VISIBLE_BODY_LANDMARKS);

/**
 * Professional body-only skeleton connections without any facial lines.
 */
export const VISIBLE_SKELETON_CONNECTIONS: readonly [number, number][] = [
  // Upper body (Shoulders & Arms)
  [PoseLandmarkIndex.LEFT_SHOULDER, PoseLandmarkIndex.RIGHT_SHOULDER],
  [PoseLandmarkIndex.LEFT_SHOULDER, PoseLandmarkIndex.LEFT_ELBOW],
  [PoseLandmarkIndex.LEFT_ELBOW, PoseLandmarkIndex.LEFT_WRIST],
  [PoseLandmarkIndex.RIGHT_SHOULDER, PoseLandmarkIndex.RIGHT_ELBOW],
  [PoseLandmarkIndex.RIGHT_ELBOW, PoseLandmarkIndex.RIGHT_WRIST],

  // Torso
  [PoseLandmarkIndex.LEFT_SHOULDER, PoseLandmarkIndex.LEFT_HIP],
  [PoseLandmarkIndex.RIGHT_SHOULDER, PoseLandmarkIndex.RIGHT_HIP],
  [PoseLandmarkIndex.LEFT_HIP, PoseLandmarkIndex.RIGHT_HIP],

  // Lower body (Legs)
  [PoseLandmarkIndex.LEFT_HIP, PoseLandmarkIndex.LEFT_KNEE],
  [PoseLandmarkIndex.LEFT_KNEE, PoseLandmarkIndex.LEFT_ANKLE],
  [PoseLandmarkIndex.RIGHT_HIP, PoseLandmarkIndex.RIGHT_KNEE],
  [PoseLandmarkIndex.RIGHT_KNEE, PoseLandmarkIndex.RIGHT_ANKLE],
] as const;