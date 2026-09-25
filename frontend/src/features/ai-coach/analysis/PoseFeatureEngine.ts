/**
 * PoseFeatureEngine — Pure measurement engine for human pose geometry.
 *
 * Coordinate Conventions:
 * -----------------------
 * 1. Image-Space Landmarks (`landmarks`):
 *    - Normalized image coordinates: x in [0, 1], y in [0, 1] (origin at top-left).
 *    - Used for image alignment, 2D deviation, and skeleton-level scale.
 * 2. 3D World Landmarks (`worldLandmarks`):
 *    - Metric coordinates (in meters) centered at the body midpoint.
 *    - Used for accurate 3D joint angles and true distance measurements.
 *
 * Separation of Concerns:
 * -----------------------
 * This engine ONLY calculates geometric measurements (angles, distances,
 * deviations, body centers). It does NOT evaluate correctness or issue coaching hints.
 */

import type {
  PoseLandmarks,
  Landmark,
  PoseValidity,
} from "../types/landmarks";
import { PoseLandmarkIndex as P } from "../types/pose-landmarks";
import type {
  PoseFeatures,
  PoseJointAngles,
  PoseDistances,
  PoseNormalizedDistances,
  PoseAlignments,
  PoseBodyGeometry,
  Point3DCoord,
} from "../types/pose-features";
import { calculateLandmarkAngle } from "./AngleCalculator";
import {
  calculateLandmarkDistance,
  calculateRelativeDistance,
} from "./DistanceCalculator";
import {
  calculateHorizontalDeviation,
  calculateVerticalDeviation,
} from "./AlignmentCalculator";
import {
  isLandmarkUsable,
  evaluatePoseValidity,
  getLandmarkConfidence,
} from "./LandmarkUtils";

export interface ExtractPoseFeaturesOptions {
  landmarks: PoseLandmarks | null | undefined;
  worldLandmarks?: PoseLandmarks | null | undefined;
  timestamp?: number;
  validity?: PoseValidity;
  confidence?: number;
}

/**
 * Midpoint helper between two landmarks.
 */
function calculateMidpoint(
  a: Landmark | null | undefined,
  b: Landmark | null | undefined,
): Point3DCoord | null {
  if (!a || !b || !isLandmarkUsable(a) || !isLandmarkUsable(b)) {
    return null;
  }
  return {
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2,
    z: ((a.z ?? 0) + (b.z ?? 0)) / 2,
  };
}

/**
 * Extract all joint angles from landmarks (uses world landmarks if available).
 */
export function extractJointAngles(
  landmarks: PoseLandmarks | null | undefined,
): PoseJointAngles {
  const result: PoseJointAngles = {
    leftElbow: null,
    rightElbow: null,
    leftShoulder: null,
    rightShoulder: null,
    leftHip: null,
    rightHip: null,
    leftKnee: null,
    rightKnee: null,
    leftAnkle: null,
    rightAnkle: null,
  };

  if (!landmarks || landmarks.length < 33) {
    return result;
  }

  // Left Elbow: Shoulder -> Elbow -> Wrist
  result.leftElbow = calculateLandmarkAngle(
    landmarks[P.LEFT_SHOULDER],
    landmarks[P.LEFT_ELBOW],
    landmarks[P.LEFT_WRIST],
  );

  // Right Elbow: Shoulder -> Elbow -> Wrist
  result.rightElbow = calculateLandmarkAngle(
    landmarks[P.RIGHT_SHOULDER],
    landmarks[P.RIGHT_ELBOW],
    landmarks[P.RIGHT_WRIST],
  );

  // Left Shoulder: Elbow -> Shoulder -> Hip
  result.leftShoulder = calculateLandmarkAngle(
    landmarks[P.LEFT_ELBOW],
    landmarks[P.LEFT_SHOULDER],
    landmarks[P.LEFT_HIP],
  );

  // Right Shoulder: Elbow -> Shoulder -> Hip
  result.rightShoulder = calculateLandmarkAngle(
    landmarks[P.RIGHT_ELBOW],
    landmarks[P.RIGHT_SHOULDER],
    landmarks[P.RIGHT_HIP],
  );

  // Left Hip: Shoulder -> Hip -> Knee
  result.leftHip = calculateLandmarkAngle(
    landmarks[P.LEFT_SHOULDER],
    landmarks[P.LEFT_HIP],
    landmarks[P.LEFT_KNEE],
  );

  // Right Hip: Shoulder -> Hip -> Knee
  result.rightHip = calculateLandmarkAngle(
    landmarks[P.RIGHT_SHOULDER],
    landmarks[P.RIGHT_HIP],
    landmarks[P.RIGHT_KNEE],
  );

  // Left Knee: Hip -> Knee -> Ankle
  result.leftKnee = calculateLandmarkAngle(
    landmarks[P.LEFT_HIP],
    landmarks[P.LEFT_KNEE],
    landmarks[P.LEFT_ANKLE],
  );

  // Right Knee: Hip -> Knee -> Ankle
  result.rightKnee = calculateLandmarkAngle(
    landmarks[P.RIGHT_HIP],
    landmarks[P.RIGHT_KNEE],
    landmarks[P.RIGHT_ANKLE],
  );

  // Left Ankle: Knee -> Ankle -> Foot Index
  result.leftAnkle = calculateLandmarkAngle(
    landmarks[P.LEFT_KNEE],
    landmarks[P.LEFT_ANKLE],
    landmarks[P.LEFT_FOOT_INDEX],
  );

  // Right Ankle: Knee -> Ankle -> Foot Index
  result.rightAnkle = calculateLandmarkAngle(
    landmarks[P.RIGHT_KNEE],
    landmarks[P.RIGHT_ANKLE],
    landmarks[P.RIGHT_FOOT_INDEX],
  );

  return result;
}

/**
 * Extract body geometry, centers, distances, and normalized scale.
 */
export function extractBodyGeometry(
  imageLandmarks: PoseLandmarks | null | undefined,
  worldLandmarks: PoseLandmarks | null | undefined,
): {
  body: PoseBodyGeometry;
  distances: PoseDistances;
  normalizedDistances: PoseNormalizedDistances;
} {
  const body: PoseBodyGeometry = {
    shoulderCenter: null,
    hipCenter: null,
    bodyCenter: null,
    bodyScale: null,
  };

  const distances: PoseDistances = {
    shoulderWidth: null,
    hipWidth: null,
    torsoLength: null,
    wristDistance: null,
    ankleDistance: null,
    leftArmLength: null,
    rightArmLength: null,
    leftLegLength: null,
    rightLegLength: null,
  };

  const normalizedDistances: PoseNormalizedDistances = {
    wristDistanceToShoulderWidth: null,
    ankleDistanceToHipWidth: null,
    wristDistanceToTorso: null,
    ankleDistanceToTorso: null,
  };

  if (!imageLandmarks || imageLandmarks.length < 33) {
    return { body, distances, normalizedDistances };
  }

  // 1. Centers (using image-space for 2D/normalized position representation)
  const leftShoulder = imageLandmarks[P.LEFT_SHOULDER];
  const rightShoulder = imageLandmarks[P.RIGHT_SHOULDER];
  const leftHip = imageLandmarks[P.LEFT_HIP];
  const rightHip = imageLandmarks[P.RIGHT_HIP];

  body.shoulderCenter = calculateMidpoint(leftShoulder, rightShoulder);
  body.hipCenter = calculateMidpoint(leftHip, rightHip);

  if (body.shoulderCenter && body.hipCenter) {
    body.bodyCenter = {
      x: (body.shoulderCenter.x + body.hipCenter.x) / 2,
      y: (body.shoulderCenter.y + body.hipCenter.y) / 2,
      z: (body.shoulderCenter.z + body.hipCenter.z) / 2,
    };
  }

  // 2. Distances (use world landmarks if available, otherwise fallback to image landmarks)
  const geomSource =
    worldLandmarks && worldLandmarks.length >= 33
      ? worldLandmarks
      : imageLandmarks;

  const gLeftShoulder = geomSource[P.LEFT_SHOULDER];
  const gRightShoulder = geomSource[P.RIGHT_SHOULDER];
  const gLeftHip = geomSource[P.LEFT_HIP];
  const gRightHip = geomSource[P.RIGHT_HIP];
  const gLeftElbow = geomSource[P.LEFT_ELBOW];
  const gRightElbow = geomSource[P.RIGHT_ELBOW];
  const gLeftWrist = geomSource[P.LEFT_WRIST];
  const gRightWrist = geomSource[P.RIGHT_WRIST];
  const gLeftKnee = geomSource[P.LEFT_KNEE];
  const gRightKnee = geomSource[P.RIGHT_KNEE];
  const gLeftAnkle = geomSource[P.LEFT_ANKLE];
  const gRightAnkle = geomSource[P.RIGHT_ANKLE];

  distances.shoulderWidth = calculateLandmarkDistance(gLeftShoulder, gRightShoulder);
  distances.hipWidth = calculateLandmarkDistance(gLeftHip, gRightHip);
  distances.wristDistance = calculateLandmarkDistance(gLeftWrist, gRightWrist);
  distances.ankleDistance = calculateLandmarkDistance(gLeftAnkle, gRightAnkle);

  // Torso length = distance between shoulder center and hip center in geometry space
  const gShoulderCenter = calculateMidpoint(gLeftShoulder, gRightShoulder);
  const gHipCenter = calculateMidpoint(gLeftHip, gRightHip);

  if (gShoulderCenter && gHipCenter) {
    const dx = gShoulderCenter.x - gHipCenter.x;
    const dy = gShoulderCenter.y - gHipCenter.y;
    const dz = (gShoulderCenter.z ?? 0) - (gHipCenter.z ?? 0);
    const tLen = Math.sqrt(dx * dx + dy * dy + dz * dz);
    distances.torsoLength = Number.isFinite(tLen) ? tLen : null;
  }

  // Arm lengths
  const lUpperArm = calculateLandmarkDistance(gLeftShoulder, gLeftElbow);
  const lForeArm = calculateLandmarkDistance(gLeftElbow, gLeftWrist);
  distances.leftArmLength =
    lUpperArm !== null && lForeArm !== null ? lUpperArm + lForeArm : null;

  const rUpperArm = calculateLandmarkDistance(gRightShoulder, gRightElbow);
  const rForeArm = calculateLandmarkDistance(gRightElbow, gRightWrist);
  distances.rightArmLength =
    rUpperArm !== null && rForeArm !== null ? rUpperArm + rForeArm : null;

  // Leg lengths
  const lThigh = calculateLandmarkDistance(gLeftHip, gLeftKnee);
  const lShin = calculateLandmarkDistance(gLeftKnee, gLeftAnkle);
  distances.leftLegLength =
    lThigh !== null && lShin !== null ? lThigh + lShin : null;

  const rThigh = calculateLandmarkDistance(gRightHip, gRightKnee);
  const rShin = calculateLandmarkDistance(gRightKnee, gRightAnkle);
  distances.rightLegLength =
    rThigh !== null && rShin !== null ? rThigh + rShin : null;

  // Body scale: primarily torso length, fallback to shoulder width
  body.bodyScale = distances.torsoLength ?? distances.shoulderWidth;

  // 3. Normalized distances
  if (distances.wristDistance !== null && distances.shoulderWidth !== null) {
    normalizedDistances.wristDistanceToShoulderWidth = calculateRelativeDistance(
      distances.wristDistance,
      distances.shoulderWidth,
    );
  }

  if (distances.ankleDistance !== null && distances.hipWidth !== null) {
    normalizedDistances.ankleDistanceToHipWidth = calculateRelativeDistance(
      distances.ankleDistance,
      distances.hipWidth,
    );
  }

  if (distances.wristDistance !== null && distances.torsoLength !== null) {
    normalizedDistances.wristDistanceToTorso = calculateRelativeDistance(
      distances.wristDistance,
      distances.torsoLength,
    );
  }

  if (distances.ankleDistance !== null && distances.torsoLength !== null) {
    normalizedDistances.ankleDistanceToTorso = calculateRelativeDistance(
      distances.ankleDistance,
      distances.torsoLength,
    );
  }

  return { body, distances, normalizedDistances };
}

/**
 * Extract horizontal and vertical alignment features from image landmarks.
 */
export function extractAlignments(
  landmarks: PoseLandmarks | null | undefined,
  bodyGeometry: PoseBodyGeometry,
): PoseAlignments {
  const result: PoseAlignments = {
    shoulderHorizontal: null,
    hipHorizontal: null,
    kneeHorizontal: null,
    ankleHorizontal: null,
    wristHorizontal: null,
    spineVertical: null,
    leftArmVertical: null,
    rightArmVertical: null,
    leftLegVertical: null,
    rightLegVertical: null,
  };

  if (!landmarks || landmarks.length < 33) {
    return result;
  }

  // Horizontal deviations (Y differences)
  result.shoulderHorizontal = calculateHorizontalDeviation(
    landmarks[P.LEFT_SHOULDER],
    landmarks[P.RIGHT_SHOULDER],
  );

  result.hipHorizontal = calculateHorizontalDeviation(
    landmarks[P.LEFT_HIP],
    landmarks[P.RIGHT_HIP],
  );

  result.kneeHorizontal = calculateHorizontalDeviation(
    landmarks[P.LEFT_KNEE],
    landmarks[P.RIGHT_KNEE],
  );

  result.ankleHorizontal = calculateHorizontalDeviation(
    landmarks[P.LEFT_ANKLE],
    landmarks[P.RIGHT_ANKLE],
  );

  result.wristHorizontal = calculateHorizontalDeviation(
    landmarks[P.LEFT_WRIST],
    landmarks[P.RIGHT_WRIST],
  );

  // Vertical deviations (X differences)
  result.leftArmVertical = calculateVerticalDeviation(
    landmarks[P.LEFT_SHOULDER],
    landmarks[P.LEFT_WRIST],
  );

  result.rightArmVertical = calculateVerticalDeviation(
    landmarks[P.RIGHT_SHOULDER],
    landmarks[P.RIGHT_WRIST],
  );

  result.leftLegVertical = calculateVerticalDeviation(
    landmarks[P.LEFT_HIP],
    landmarks[P.LEFT_ANKLE],
  );

  result.rightLegVertical = calculateVerticalDeviation(
    landmarks[P.RIGHT_HIP],
    landmarks[P.RIGHT_ANKLE],
  );

  // Spine vertical alignment: horizontal offset between shoulder center and hip center
  if (bodyGeometry.shoulderCenter && bodyGeometry.hipCenter) {
    const spineDiff = Math.abs(
      bodyGeometry.shoulderCenter.x - bodyGeometry.hipCenter.x,
    );
    result.spineVertical = Number.isFinite(spineDiff) ? spineDiff : null;
  }

  return result;
}

/**
 * Main Entry Point: Extracts all pose features from validated landmarks.
 */
export function extractPoseFeatures(
  options: ExtractPoseFeaturesOptions,
): PoseFeatures {
  const {
    landmarks,
    worldLandmarks,
    timestamp = performance.now(),
    validity = evaluatePoseValidity(landmarks),
    confidence = calculatePoseConfidence(landmarks),
  } = options;

  // Use world landmarks for 3D angles if available, otherwise fallback to image landmarks
  const angleSource =
    worldLandmarks && worldLandmarks.length >= 33
      ? worldLandmarks
      : landmarks;

  const angles = extractJointAngles(angleSource);
  const { body, distances, normalizedDistances } = extractBodyGeometry(
    landmarks,
    worldLandmarks,
  );
  const alignments = extractAlignments(landmarks, body);

  return {
    timestamp,
    validity,
    confidence,
    angles,
    distances,
    normalizedDistances,
    alignments,
    body,
  };
}

/**
 * Calculate average landmark confidence.
 */
function calculatePoseConfidence(
  landmarks: PoseLandmarks | null | undefined,
): number {
  if (!landmarks || landmarks.length === 0) {
    return 0;
  }

  let sum = 0;
  let count = 0;

  for (const lm of landmarks) {
    if (lm) {
      sum += getLandmarkConfidence(lm);
      count++;
    }
  }

  return count > 0 ? sum / count : 0;
}
