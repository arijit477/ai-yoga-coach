import type { CoachSessionState } from "../types/CoachSessionState";
import type { CameraReadinessState } from "../motion/CameraReadinessTracker";
import type { PostureAreaStatus, OverallPoseStatus } from "../types/pose-rules";

export type PostureStatus = "GOOD" | "WARNING" | "BAD" | "UNKNOWN" | PostureAreaStatus | OverallPoseStatus;

export type CoachingEventType =
  | "pose_started"
  | "calibration_prompt"
  | "calibration_complete"
  | "step_guidance"
  | "pose_correction"
  | "issue_improving"
  | "issue_resolved"
  | "good_form"
  | "pose_held"
  | "pose_completed"
  | "accuracy_threshold"
  | "hold_countdown"
  | "safety_warning"
  | "camera_state_change"
  | "camera_unavailable"
  | "user_out_of_frame"
  | "partial_body"
  | "camera_ready"
  | "calibration_required"
  | "calibration_failed";

export interface CoachingEventPrimaryIssue {
  ruleId: string;
  bodyRegion?: string;
  joint?: string;
  severity: "info" | "low" | "medium" | "high";
  feedback: string;
  currentValue?: number;
  target?: number;
  targetValue?: number;
  min?: number;
  max?: number;
  targetMin?: number;
  targetMax?: number;
}

export interface CoachingEvent {
  id: string;
  type: CoachingEventType;
  timestamp: number;

  coach?: "alice" | "kevin";

  asanaId: string;
  asanaName: string;

  score?: number;

  sessionState?: CoachSessionState;
  cameraState?: CameraReadinessState;

  posture?: PostureStatus | "GOOD" | "WARNING" | "BAD" | "UNKNOWN";

  primaryIssue?: CoachingEventPrimaryIssue;

  // Granular details for rule identification and backwards compatibility
  ruleId?: string;
  issue?: string;
  joint?: string;

  severity?: "info" | "low" | "medium" | "high";

  currentValue?: number;
  targetValue?: number;
  min?: number;
  max?: number;
  targetMin?: number;
  targetMax?: number;

  feedback?: string;
  messageContext?: string;
}

export interface CoachDecision {
  shouldSpeak: boolean;
  priority: number;
  eventType: string;
  reason: string;
  context?: any;
  interruptionRequired: boolean;
  suggestedGoal?: string;
}

/**
 * Dedicated WebRTC connection state machine.
 * Decoupled from yoga posture CoachState.
 */
export type VoiceConnectionState =
  | "idle"
  | "requesting_permission"
  | "connecting"
  | "connected"
  | "listening"
  | "thinking"
  | "speaking"
  | "interrupted"
  | "muted"
  | "reconnecting"
  | "error"
  | "disconnected";

// Backwards compatibility alias
export type VoiceStatus = VoiceConnectionState;

export interface VoiceTranscriptItem {
  id: string;
  role: "user" | "coach" | "system";
  text: string;
  timestamp: number;
  isCorrection?: boolean;
}

export interface VoiceState {
  status: VoiceConnectionState;
  isMuted: boolean;
  error: string | null;
  transcripts: VoiceTranscriptItem[];
  isConversationMode?: boolean;
}


