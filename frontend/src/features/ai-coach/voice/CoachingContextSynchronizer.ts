import type { CoachingEvent } from "./voice.types";
import type { CoachingContextManager } from "./CoachingContextManager";
import type { CoachingIssue } from "./CoachingContext";

/**
 * CoachingContextSynchronizer
 *
 * Phase 4C: Live Coaching Context Synchronization.
 * Translates approved CoachingEvent objects into live state updates
 * in the CoachingContextManager.
 *
 * Responsibilities:
 * - Maps event types (pose_started, pose_correction, issue_improving, issue_resolved,
 *   good_form, pose_held, hold_countdown, pose_completed, safety_warning) to CoachingState.
 * - Extracts structured posture issues without creating duplicates.
 * - Manages transitions between activeIssues and correctedIssues.
 * - Synchronizes hold metrics and score.
 * - Pure state synchronizer: does NOT make speech or rhythm decisions.
 */
export class CoachingContextSynchronizer {
  private readonly contextManager: CoachingContextManager;

  constructor(contextManager: CoachingContextManager) {
    this.contextManager = contextManager;
  }

  public sync(event: CoachingEvent): void {
    const asanaName = event.asanaName || "Yoga Pose";
    const ruleId =
      event.ruleId ||
      event.primaryIssue?.ruleId ||
      (event as any).data?.ruleId;
    const joint =
      event.joint ||
      event.primaryIssue?.joint ||
      event.primaryIssue?.bodyRegion ||
      (event as any).data?.joint ||
      (event as any).data?.bodyRegion ||
      "Posture";
    const feedback =
      event.feedback ||
      event.primaryIssue?.feedback ||
      (event as any).data?.feedback ||
      "Alignment needs correction";
    const rawSeverity =
      event.severity ||
      event.primaryIssue?.severity ||
      (event as any).data?.severity ||
      "medium";
    const severity: "low" | "medium" | "high" =
      rawSeverity === "high" || rawSeverity === "low" ? rawSeverity : "medium";
    const score = event.score ?? (event as any).data?.score;
    const holdSec =
      (event as any).holdTime ?? (event as any).data?.holdTime;
    const targetHold =
      (event as any).targetHoldTime ?? (event as any).data?.targetHoldTime;
    const remainingSec =
      targetHold !== undefined && holdSec !== undefined
        ? Math.max(0, targetHold - holdSec)
        : (event as any).remainingHoldSeconds ?? (event as any).data?.remainingHoldSeconds;

    switch (event.type) {
      case "pose_started": {
        this.contextManager.startPose(asanaName);
        this.contextManager.setState("MOVING_INTO_POSE");
        break;
      }

      case "pose_correction": {
        if (!this.contextManager.getContext()) {
          this.contextManager.startPose(asanaName);
        }
        this.contextManager.setState("CORRECTING");
        if (ruleId) {
          const issue: CoachingIssue = {
            id: ruleId,
            bodyPart: joint,
            issue: feedback,
            correction: feedback,
            severity,
            confidence: (event as any).confidence ?? 0.95,
          };
          this.contextManager.addOrUpdateIssue(issue);
        }
        break;
      }

      case "issue_improving": {
        if (!this.contextManager.getContext()) {
          this.contextManager.startPose(asanaName);
        }
        this.contextManager.setState("IMPROVING");
        if (ruleId) {
          const currentIssues = this.contextManager.getContext()?.activeIssues ?? [];
          const existing = currentIssues.find((i) => i.id === ruleId);
          if (!existing) {
            this.contextManager.addOrUpdateIssue({
              id: ruleId,
              bodyPart: joint,
              issue: feedback,
              correction: feedback,
              severity,
            });
          }
        }
        break;
      }

      case "issue_resolved": {
        if (!this.contextManager.getContext()) {
          this.contextManager.startPose(asanaName);
        }
        this.contextManager.setState("CORRECT");
        if (ruleId) {
          this.contextManager.markIssueCorrected(ruleId);
        }
        break;
      }

      case "good_form": {
        if (!this.contextManager.getContext()) {
          this.contextManager.startPose(asanaName);
        }
        this.contextManager.setState("CORRECT");
        break;
      }

      case "pose_held": {
        if (!this.contextManager.getContext()) {
          this.contextManager.startPose(asanaName);
        }
        this.contextManager.updateHold(holdSec ?? 0, remainingSec);
        break;
      }

      case "hold_countdown": {
        if (!this.contextManager.getContext()) {
          this.contextManager.startPose(asanaName);
        }
        this.contextManager.updateHold(holdSec, remainingSec);
        break;
      }

      case "pose_completed": {
        if (!this.contextManager.getContext()) {
          this.contextManager.startPose(asanaName);
        }
        this.contextManager.setState("COMPLETED");
        break;
      }

      case "safety_warning": {
        if (!this.contextManager.getContext()) {
          this.contextManager.startPose(asanaName);
        }
        // Safety preserves current state without marking COMPLETED
        if (ruleId) {
          this.contextManager.addOrUpdateIssue({
            id: ruleId,
            bodyPart: joint,
            issue: feedback,
            correction: feedback,
            severity: "high",
          });
        }
        break;
      }

      default:
        break;
    }

    if (score !== undefined) {
      this.contextManager.setScore(score);
    }

    const currentContext = this.contextManager.getContext();
    if (currentContext) {
      console.log(`[AI COACH][CONTEXT]`, {
        event: event.type,
        state: currentContext.state,
        activeIssues: currentContext.activeIssues.length,
        correctedIssues: currentContext.correctedIssues.length,
        score: currentContext.score,
      });
    }
  }
}
