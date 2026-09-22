export interface CameraContext {
  isGranted: boolean;
  isEnabled: boolean;
  isStreamAvailable: boolean;
  isUserVisible: boolean;
  visibilityState: "full_body" | "partial_body" | "not_visible";
  areFeetVisible: boolean;
  cameraReady: boolean;
}

export interface PoseContext {
  currentAsanaId: string | null;
  isPoseDetected: boolean;
  confidence: number;
  currentAccuracy: number;
  previousAccuracy: number;
  scoreTrend: "improving" | "declining" | "stable";
  isStable: boolean;
  isHolding: boolean;
  isCompleted: boolean;
}

export interface PostureContext {
  primaryIssue: string | null;
  secondaryIssues: string[];
  affectedBodyPart: string | null;
  ruleId: string | null;
  severity: "info" | "low" | "medium" | "high" | "critical" | null;
  currentValue: number | null;
  targetRange: { min: number; max: number } | null;
  humanReadableCorrection: string | null;
}

export interface SessionContext {
  state: string;
  currentAsana: string | null;
  previousAsana: string | null;
  coachName: "Alice" | "Kevin" | null;
  guideState: string | null;
  isCalibrationReady: boolean;
  calibrationProgress: number;
  completedPosesCount: number;
  boundingBox: { minX: number; minY: number; maxX: number; maxY: number; width: number; height: number; centerX: number; centerY: number } | null;
  isMirrored: boolean;
  isFacingRight: boolean;
}

export interface SafetyContext {
  hasSafetyWarning: boolean;
  userMessagePainOrInjury: boolean;
  safetyState: "safe" | "warning" | "danger";
}

export interface InteractionContext {
  isUserSpeaking: boolean;
  hasUserQuestion: boolean;
  isInterruption: boolean;
  lastCoachEvent: string | null;
  lastCoachResponse: string | null;
}

export interface CoachContext {
  camera: CameraContext;
  pose: PoseContext;
  posture: PostureContext;
  session: SessionContext;
  safety: SafetyContext;
  interaction: InteractionContext;
  timestamp: number;
}
