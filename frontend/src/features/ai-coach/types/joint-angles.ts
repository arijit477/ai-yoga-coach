export type JointAngleKey =
  | "leftShoulder"
  | "rightShoulder"
  | "leftElbow"
  | "rightElbow"
  | "leftHip"
  | "rightHip"
  | "leftKnee"
  | "rightKnee"
  | "leftAnkle"
  | "rightAnkle";

export type JointAngleStatus = "good" | "warning" | "error" | "unknown";

export interface JointAngleConfig {
  key: JointAngleKey;
  label: string;
  vertexIndex: number;
  points: [number, number, number]; // [A, B (vertex), C]
  // Default fallback reference range if asana does not have an explicit rule
  defaultMin?: number;
  defaultMax?: number;
}

export interface JointAngleValue {
  key: JointAngleKey;
  label: string;
  vertexIndex: number;
  points: [number, number, number];
  angle: number | null;
  status: JointAngleStatus;
  ruleId?: string;
  min?: number;
  max?: number;
  target?: number;
  feedback?: string;
  isPrimaryIssue?: boolean;
}
