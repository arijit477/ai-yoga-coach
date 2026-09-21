export interface CoachingEvent {
  id: string;
  type:
    | "pose_started"
    | "calibration_prompt"
    | "calibration_complete"
    | "step_guidance"
    | "pose_correction"
    | "good_form"
    | "pose_held"
    | "pose_completed"
    | "accuracy_threshold"
    | "hold_countdown"
    | "safety_warning";

  asanaId: string;
  asanaName: string;

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
  score?: number;

  timestamp: number;
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
  | "speaking"
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
}

