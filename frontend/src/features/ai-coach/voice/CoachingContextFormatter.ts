import type { SessionContextData } from "./RealtimeVoiceAgent";
import type { CoachingEvent } from "./voice.types";

export interface RealtimeCoachingContext {
  coach: string;
  asana: {
    id: string;
    name: string;
  };
  posture: {
    score: number | null;
    state: string | null;
    trend: string | null;
  };
  primaryIssue: {
    ruleId: string;
    joint?: string;
    severity: string;
    currentValue: number | null;
    targetMin: number | null;
    targetMax: number | null;
    feedback?: string;
  } | null;
  session: {
    state: string | null;
    isHolding: boolean;
    holdTime: number;
    isCompleted: boolean;
    isActive: boolean;
  };
  camera: {
    state: string | null;
    hasPose: boolean;
    userVisible: boolean;
  };
  recentEvents: Array<{
    type: CoachingEvent["type"];
    feedback?: string;
    severity?: string;
  }>;
  progress: {
    previousScore: number | null;
    completedPoses: Array<{
      name: string;
      score: number;
    }>;
  };
}

export function buildRealtimeCoachingContext(
  session: SessionContextData
): RealtimeCoachingContext {
  const issue = session.primaryIssue;

  return {
    coach: session.coach,

    asana: {
      id: session.asanaId,
      name: session.asanaName,
    },

    posture: {
      score: session.score ?? null,
      state: session.coachState ?? null,
      trend: session.scoreTrend ?? null,
    },

    primaryIssue: issue
      ? {
          ruleId: issue.ruleId,
          joint: issue.joint,
          severity: issue.severity,
          currentValue:
            issue.currentValue ??
            issue.currentAngle ??
            null,
          targetMin:
            issue.targetMin ??
            issue.min ??
            null,
          targetMax:
            issue.targetMax ??
            issue.max ??
            null,
          feedback: issue.feedback,
        }
      : null,

    session: {
      state: session.sessionState ?? null,
      isHolding: session.isHolding ?? false,
      holdTime: session.holdTime ?? 0,
      isCompleted: session.isCompleted ?? false,
      isActive: session.isSessionActive ?? false,
    },

    camera: {
      state: session.cameraState ?? null,
      hasPose: session.hasPose ?? false,
      userVisible: session.userVisible ?? false,
    },

    recentEvents: (session.recentEvents ?? [])
      .slice(-5)
      .map((event) => ({
        type: event.type,
        feedback: event.feedback,
        severity: event.severity,
      })),

    progress: {
      previousScore: session.previousScore ?? null,
      completedPoses: session.completedPoses ?? [],
    },
  };
}
