export interface CoachingEvent {
  id: string;
  type:
    | "pose_started"
    | "pose_correction"
    | "good_form"
    | "pose_held"
    | "pose_completed"
    | "safety_warning";

  asanaId: string;
  asanaName: string;

  ruleId?: string;
  issue?: string;

  severity?: "info" | "low" | "medium" | "high";

  currentValue?: number;
  targetValue?: number;
  min?: number;
  max?: number;

  feedback?: string;
  score?: number;

  timestamp: number;
}

export type VoiceStatus = 
  | "disconnected"
  | "connecting"
  | "connected"
  | "listening"
  | "speaking"
  | "muted"
  | "error";

export interface VoiceTranscriptItem {
  id: string;
  role: "user" | "coach" | "system";
  text: string;
  timestamp: number;
  isCorrection?: boolean;
}

export interface VoiceState {
  status: VoiceStatus;
  isMuted: boolean;
  error: string | null;
  transcripts: VoiceTranscriptItem[];
}
