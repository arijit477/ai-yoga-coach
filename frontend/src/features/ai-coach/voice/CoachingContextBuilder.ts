import type { SessionContextData } from "./RealtimeVoiceAgent";
import type { CoachingContext, CoachingIssue, CoachingState } from "./CoachingContext";

export function buildCoachingContext(
  session: SessionContextData
): CoachingContext {
  const activeIssues: CoachingIssue[] = session.primaryIssue
    ? [
        {
          id: session.primaryIssue.ruleId,
          bodyPart: session.primaryIssue.joint || "body",
          issue: session.primaryIssue.feedback || "Alignment needs adjustment",
          correction: session.primaryIssue.feedback || "Adjust your position",
          severity: (session.primaryIssue.severity as "low" | "medium" | "high") || "medium",
        },
      ]
    : [];

  let state: CoachingState = "MOVING_INTO_POSE";
  if (session.isCompleted) {
    state = "COMPLETED";
  } else if (session.isHolding) {
    state = "HOLDING";
  } else if (session.scoreTrend === "improving") {
    state = "IMPROVING";
  } else if (activeIssues.length > 0) {
    state = "CORRECTING";
  } else if (session.score && session.score >= 80) {
    state = "CORRECT";
  }

  return {
    asanaName: session.asanaName || "Yoga Pose",
    state,
    activeIssues,
    correctedIssues: [],
    holdSeconds: session.holdTime ?? 0,
    score: session.score,
  };
}
