import type { PoseEvaluationResult } from "../types/pose-rules";
import type { CameraReadinessState } from "../motion/CameraReadinessTracker";
import type { CoachSessionState } from "../types/CoachSessionState";
import type { CoachingEvent } from "./voice.types";
import { CoachingEventBuilder } from "./CoachingEventBuilder";

export class CoachingEventEngine {
  private lastSessionState: CoachSessionState = "idle";
  private lastCameraState: CameraReadinessState = "CAMERA_DISABLED";
  
  private activeIssue: {
    ruleId: string;
    initialDeviation: number;
    lastDeviation: number;
  } | null = null;

  private hasAnnouncedGoodFormForPose = false;
  private recentEvents: CoachingEvent[] = [];
  private lastOutOfFrameReminderTime: number = 0;

  public reset(): void {
    this.lastSessionState = "idle";
    this.lastCameraState = "CAMERA_DISABLED";
    this.activeIssue = null;
    this.hasAnnouncedGoodFormForPose = false;
    this.recentEvents = [];
    this.lastOutOfFrameReminderTime = 0;
  }

  public process(
    asanaId: string,
    asanaName: string,
    sessionState: CoachSessionState,
    cameraState: CameraReadinessState,
    evaluation: PoseEvaluationResult | null
  ): CoachingEvent[] {
    const events: CoachingEvent[] = [];

    // 1. Camera State Transitions & Continuous Presence
    if (this.lastCameraState !== cameraState) {
      if (cameraState === "CAMERA_DISABLED" || cameraState === "CAMERA_ERROR") {
        events.push(CoachingEventBuilder.buildCameraUnavailableEvent(asanaId, asanaName));
      } else if (cameraState === "NO_PERSON") {
        events.push(CoachingEventBuilder.buildUserOutOfFrameEvent(asanaId, asanaName));
        this.lastOutOfFrameReminderTime = Date.now();
      } else if (cameraState === "PARTIAL_BODY") {
        events.push(CoachingEventBuilder.buildPartialBodyEvent(asanaId, asanaName));
      } else if (cameraState === "CAMERA_READY") {
        events.push(CoachingEventBuilder.buildCameraReadyEvent(asanaId, asanaName));
      }
      this.lastCameraState = cameraState;
    } else if (cameraState === "NO_PERSON" && sessionState !== "idle") {
      // Continuous presence: if user stays out of frame for >15s, give gentle reminder
      const now = Date.now();
      if (now - this.lastOutOfFrameReminderTime >= 15000) {
        this.lastOutOfFrameReminderTime = now;
        events.push({
          id: `presence_${now}`,
          type: "user_out_of_frame",
          asanaId,
          asanaName,
          feedback: "I'm still here waiting for you. Take your time, and step into view when you're ready.",
          timestamp: now,
        });
      }
    }

    // 2. Session State Transitions
    if (this.lastSessionState !== sessionState) {
      if (sessionState === "calibrating") {
         events.push(CoachingEventBuilder.buildCalibrationRequiredEvent(asanaId, asanaName));
      } else if (sessionState === "coaching" && this.lastSessionState !== "holding") {
         // Entered pose active coaching
         events.push(CoachingEventBuilder.buildPoseStartedEvent(asanaId, asanaName));
         this.hasAnnouncedGoodFormForPose = false;
      } else if (sessionState === "holding") {
         events.push(CoachingEventBuilder.buildPoseHeldEvent(asanaId, asanaName, evaluation?.score));
      } else if (sessionState === "completed" || sessionState === "session_completed") {
         events.push(CoachingEventBuilder.buildPoseCompletedEvent(asanaId, asanaName, evaluation?.score));
         this.activeIssue = null;
      }
      this.lastSessionState = sessionState;
    }

    // 3. Pose Evaluation (Issues)
    if (sessionState === "coaching" || sessionState === "holding" || sessionState === "correcting") {
      if (evaluation) {
        
        // Safety Warning check
        const safetyIssue = evaluation.secondaryIssues.find(i => i.severity === "high") || 
                           (evaluation.primaryIssue?.severity === "high" ? evaluation.primaryIssue : null);
        
        if (safetyIssue) {
          events.push(CoachingEventBuilder.buildSafetyWarningEvent(asanaId, asanaName, safetyIssue, evaluation.score));
        }

        // Primary Issue Tracking
        const primary = evaluation.primaryIssue;

        if (primary && primary.severity !== "high") { // high is handled by safety warning
          const currentDeviation = Math.abs(primary.currentValue - (primary.targetValue ?? primary.currentValue));

          if (!this.activeIssue || this.activeIssue.ruleId !== primary.ruleId) {
            // New issue detected
            this.activeIssue = {
              ruleId: primary.ruleId,
              initialDeviation: currentDeviation,
              lastDeviation: currentDeviation,
            };
            events.push(CoachingEventBuilder.buildPoseCorrectionEvent(asanaId, asanaName, primary, evaluation.score));
          } else {
            // Existing issue
            const initialDev = this.activeIssue.initialDeviation;
            
            // If it improved by 30% from when it was first announced
            if (initialDev > 0 && currentDeviation < initialDev * 0.7 && currentDeviation < this.activeIssue.lastDeviation) {
               events.push(CoachingEventBuilder.buildIssueImprovingEvent(asanaId, asanaName, primary.ruleId));
               // Update initial to current so we don't spam 'improving' unless it improves another 30%
               this.activeIssue.initialDeviation = currentDeviation;
            }
            this.activeIssue.lastDeviation = currentDeviation;
          }
        } else if (!primary && this.activeIssue) {
          // Issue was resolved!
          events.push(CoachingEventBuilder.buildIssueResolvedEvent(asanaId, asanaName, this.activeIssue.ruleId));
          this.activeIssue = null;
        }

        // Good Form
        if (!primary && evaluation.score >= 85 && !this.hasAnnouncedGoodFormForPose && sessionState === "coaching") {
          events.push(CoachingEventBuilder.buildGoodFormEvent(asanaId, asanaName, evaluation.score));
          this.hasAnnouncedGoodFormForPose = true;
        }
      }
    }

    if (events.length > 0) {
      this.recentEvents.push(...events);
      if (this.recentEvents.length > 10) {
        this.recentEvents = this.recentEvents.slice(this.recentEvents.length - 10);
      }
    }

    return events;
  }

  public getRecentEvents(): CoachingEvent[] {
    return this.recentEvents;
  }

}
