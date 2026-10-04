import type { CoachingEvent } from "./voice.types";

export interface CoachingContext {
  asana: {
    id: string;
    name: string;
  };

  posture: {
    score?: number;
    status?: string;
    trend?: "improving" | "worsening" | "stable";
  };

  primaryIssue: {
    ruleId: string;
    bodyRegion?: string;
    joint?: string;
    severity: string;
    currentValue?: number;
    targetMin?: number;
    targetMax?: number;
    feedback?: string;
  } | null;

  session: {
    state?: string;
    isHolding: boolean;
    holdTime: number;
    isCompleted: boolean;
    isActive: boolean;
  };

  camera: {
    state?: string;
    hasPose: boolean;
    userVisible: boolean;
  };

  coachingHistory: {
    recentEvents: CoachingEvent[];
  };
}
