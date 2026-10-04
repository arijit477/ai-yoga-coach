export type CoachingState =
  | "STARTING"
  | "MOVING_INTO_POSE"
  | "CORRECTING"
  | "IMPROVING"
  | "CORRECT"
  | "HOLDING"
  | "COMPLETING"
  | "COMPLETED";

export interface CoachingIssue {
  id: string;
  bodyPart: string;
  issue: string;
  correction: string;
  severity: "low" | "medium" | "high";
  confidence?: number;
}

export interface CoachingContext {
  asanaName: string;
  state: CoachingState;

  activeIssues: CoachingIssue[];

  correctedIssues: string[];

  lastCorrectionAt?: number;
  lastIssueId?: string;

  holdSeconds?: number;
  remainingHoldSeconds?: number;

  score?: number;
}
