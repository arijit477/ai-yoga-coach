import type { Asana } from "./asana";
import type { CoachSessionState } from "./CoachSessionState";

export type { CoachSessionState };

export type CoachPersona = "alice" | "kevin";

export interface AsanaAttemptResult {
  asanaId: string;
  asanaName: string;
  sanskritName?: string;
  completed: boolean;
  holdDurationSeconds: number;
  targetHoldSeconds: number;
  averageScore: number;
  peakScore: number;
  correctionsFaced: string[];
  startedAt: number;
  completedAt?: number;
}

export interface CoachSessionSummary {
  sessionId: string;
  coach: CoachPersona;
  startedAt: number;
  endedAt: number;
  totalDurationSeconds: number;
  asanasAttemptedCount: number;
  asanasCompletedCount: number;
  overallScore: number;
  accuracyRate: number;
  isFreeSession: boolean;
  results: AsanaAttemptResult[];
}

export interface SessionProgressState {
  currentAsanaIndex: number;
  totalAsanas: number;
  currentAsana: Asana | null;
  state: CoachSessionState;
  holdTime: number;
  targetHoldTime: number;
  isCompleted: boolean;
  activeScore: number | null;
}
