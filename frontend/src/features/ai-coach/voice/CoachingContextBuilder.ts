import type { SessionContextData } from "./RealtimeVoiceAgent";
import type { CoachingContext } from "./CoachingContext";

export function buildCoachingContext(
  session: SessionContextData
): CoachingContext {
  return {
    asana: {
      id: session.asanaId,
      name: session.asanaName,
    },

    posture: {
      score: session.score,
      status: session.coachState,
      trend: session.scoreTrend,
    },

    primaryIssue: session.primaryIssue
      ? {
          ruleId: session.primaryIssue.ruleId,
          joint: session.primaryIssue.joint,
          severity: session.primaryIssue.severity,
          currentValue:
            session.primaryIssue.currentValue ??
            session.primaryIssue.currentAngle,
          targetMin:
            session.primaryIssue.targetMin ??
            session.primaryIssue.min,
          targetMax:
            session.primaryIssue.targetMax ??
            session.primaryIssue.max,
          feedback: session.primaryIssue.feedback,
        }
      : null,

    session: {
      state: session.sessionState,
      isHolding: session.isHolding ?? false,
      holdTime: session.holdTime ?? 0,
      isCompleted: session.isCompleted ?? false,
      isActive: session.isSessionActive ?? false,
    },

    camera: {
      state: session.cameraState,
      hasPose: session.hasPose ?? false,
      userVisible: session.userVisible ?? false,
    },

    coachingHistory: {
      recentEvents: session.recentEvents ?? [],
    },
  };
}
