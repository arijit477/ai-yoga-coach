import type { PoseIssue } from "../types/pose-rules";
import type { CoachingEvent } from "./voice.types";

function generateEventId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
}

export class CoachingEventBuilder {
  /**
   * Generates a pose_started event when a user enters the target asana.
   */
  static buildPoseStartedEvent(asanaId: string, asanaName: string): CoachingEvent {
    return {
      id: generateEventId("start"),
      type: "pose_started",
      asanaId,
      asanaName,
      timestamp: Date.now(),
    };
  }

  /**
   * Generates a pose_correction event from a prioritized, stabilized posture issue.
   */
  static buildPoseCorrectionEvent(
    asanaId: string,
    asanaName: string,
    issue: PoseIssue,
    score?: number,
  ): CoachingEvent {
    return {
      id: generateEventId("corr"),
      type: "pose_correction",
      asanaId,
      asanaName,
      ruleId: issue.ruleId,
      issue: issue.ruleName ? issue.ruleName.toLowerCase().replace(/\s+/g, "_") : issue.metric,
      severity: issue.severity,
      currentValue: Math.round(issue.currentValue),
      targetValue: issue.targetValue !== undefined ? Math.round(issue.targetValue) : undefined,
      min: issue.min,
      max: issue.max,
      feedback: issue.feedback,
      score: score !== undefined ? Math.round(score) : undefined,
      timestamp: Date.now(),
    };
  }

  /**
   * Generates a good_form event when the user corrects their posture.
   */
  static buildGoodFormEvent(asanaId: string, asanaName: string, score?: number): CoachingEvent {
    return {
      id: generateEventId("good"),
      type: "good_form",
      asanaId,
      asanaName,
      score: score !== undefined ? Math.round(score) : undefined,
      feedback: "Great form. Maintain this position.",
      timestamp: Date.now(),
    };
  }

  /**
   * Generates a pose_held event when the user maintains good form into holding.
   */
  static buildPoseHeldEvent(asanaId: string, asanaName: string, score?: number): CoachingEvent {
    return {
      id: generateEventId("held"),
      type: "pose_held",
      asanaId,
      asanaName,
      score: score !== undefined ? Math.round(score) : undefined,
      feedback: "Great hold. Keep breathing and stay steady.",
      timestamp: Date.now(),
    };
  }

  /**
   * Generates a pose_completed event when target hold time is successfully completed.
   */
  static buildPoseCompletedEvent(asanaId: string, asanaName: string, score?: number): CoachingEvent {
    return {
      id: generateEventId("comp"),
      type: "pose_completed",
      asanaId,
      asanaName,
      score: score !== undefined ? Math.round(score) : undefined,
      feedback: `Excellent work. ${asanaName} is complete.`,
      timestamp: Date.now(),
    };
  }

  /**
   * Generates a safety_warning event for critical safety issues.
   */
  static buildSafetyWarningEvent(
    asanaId: string,
    asanaName: string,
    issue: PoseIssue,
    score?: number,
  ): CoachingEvent {
    return {
      id: generateEventId("safe"),
      type: "safety_warning",
      asanaId,
      asanaName,
      ruleId: issue.ruleId,
      issue: issue.ruleName ? issue.ruleName.toLowerCase().replace(/\s+/g, "_") : "safety_alert",
      severity: "high",
      currentValue: Math.round(issue.currentValue),
      targetValue: issue.targetValue !== undefined ? Math.round(issue.targetValue) : undefined,
      min: issue.min,
      max: issue.max,
      feedback: issue.feedback || "Ease out of the pose and return to a comfortable position.",
      score: score !== undefined ? Math.round(score) : undefined,
      timestamp: Date.now(),
    };
  }
}
