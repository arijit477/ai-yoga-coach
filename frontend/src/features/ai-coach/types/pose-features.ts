import type { PoseValidity } from "./landmarks";

export interface Point3DCoord {
  x: number;
  y: number;
  z: number;
}

export interface PoseJointAngles {
  leftElbow: number | null;
  rightElbow: number | null;
  leftShoulder: number | null;
  rightShoulder: number | null;
  leftHip: number | null;
  rightHip: number | null;
  leftKnee: number | null;
  rightKnee: number | null;
  leftAnkle: number | null;
  rightAnkle: number | null;
  [key: string]: number | null;
}

export interface PoseDistances {
  shoulderWidth: number | null;
  hipWidth: number | null;
  torsoLength: number | null;
  wristDistance: number | null;
  ankleDistance: number | null;
  leftArmLength: number | null;
  rightArmLength: number | null;
  leftLegLength: number | null;
  rightLegLength: number | null;
  [key: string]: number | null;
}

export interface PoseNormalizedDistances {
  wristDistanceToShoulderWidth: number | null;
  ankleDistanceToHipWidth: number | null;
  wristDistanceToTorso: number | null;
  ankleDistanceToTorso: number | null;
  [key: string]: number | null;
}

export interface PoseAlignments {
  shoulderHorizontal: number | null;
  hipHorizontal: number | null;
  kneeHorizontal: number | null;
  ankleHorizontal: number | null;
  wristHorizontal: number | null;
  spineVertical: number | null;
  leftArmVertical: number | null;
  rightArmVertical: number | null;
  leftLegVertical: number | null;
  rightLegVertical: number | null;
  [key: string]: number | null;
}

export interface PoseBodyGeometry {
  shoulderCenter: Point3DCoord | null;
  hipCenter: Point3DCoord | null;
  bodyCenter: Point3DCoord | null;
  bodyScale: number | null;
}

export interface PoseFeatures {
  timestamp: number;
  validity: PoseValidity;
  confidence: number;
  angles: PoseJointAngles;
  distances: PoseDistances;
  normalizedDistances: PoseNormalizedDistances;
  alignments: PoseAlignments;
  body: PoseBodyGeometry;
}
