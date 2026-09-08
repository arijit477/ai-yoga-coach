export interface Landmark {
  x: number;
  y: number;
  z: number;
  visibility?: number;
  presence?: number;
}

export type PoseLandmarks = Landmark[];

export interface PoseTrackingResult {
  landmarks: PoseLandmarks;
  worldLandmarks: PoseLandmarks;
  timestamp: number;
  confidence: number;
}