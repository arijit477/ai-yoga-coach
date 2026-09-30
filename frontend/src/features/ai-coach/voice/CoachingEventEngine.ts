import type { PoseEvaluationResult } from "../types/pose-rules";
import type { CameraReadinessState } from "../motion/CameraReadinessTracker";
import type { CoachSessionState } from "../types/CoachSessionState";
import type { CoachingEvent } from "./voice.types";
import { CoachingEventBuilder } from "./CoachingEventBuilder";
import {
  getMindfulnessReminder,
  getMilestoneMessage,
  shouldFireMilestone,
} from "./NaturalCoachLanguage";

/**
 * CoachingEventEngine
 * 
 * Translates low-level pose evaluation states and camera transitions
 * into structured high-level coaching events.
 * 
 * Rules:
 * - Never processes pose corrections when camera readiness is low/occluded.
 * - Enforces single primary correction selection.
 * - Tracks 30% improvement deltas before emitting positive encouragement.
 * - Resolves issues and clears state upon posture recovery.
 */
export class CoachingEventEngine {
  private lastSessionState: CoachSessionState = "idle";
  private lastCameraState: CameraReadinessState = "CAMERA_DISABLED";

  private activeIssue: {
    ruleId: string;
    initialDeviation: number;
    lastDeviation: number;
  } | null = null;

  private hasAnnouncedGoodFormForPose = false;
  private hasAnnouncedCompletionForPose = false;
  private recentEvents: CoachingEvent[] = [];
  private lastOutOfFrameReminderTime: number = 0;

  // Milestone tracking — reset per asana
  private firedMilestones: Set<string> = new Set();

  // Mindfulness reminder timing during static holding
  private lastMindfulnessTime: number = 0;
  private readonly MINDFULNESS_INTERVAL_MS = 45_000; // Every ~45 seconds during holding

  public reset(): void {
    this.lastSessionState = "idle";
    this.lastCameraState = "CAMERA_DISABLED";
    this.activeIssue = null;
    this.hasAnnouncedGoodFormForPose = false;
    this.hasAnnouncedCompletionForPose = false;
    this.recentEvents = [];
    this.lastOutOfFrameReminderTime = 0;
    this.firedMilestones.clear();
    this.lastMindfulnessTime = 0;
  }

  public process(
    asanaId: string,
    asanaName: string,
    sessionState: CoachSessionState,
    cameraState: CameraReadinessState,
    evaluation: PoseEvaluationResult | null,
    coachId?: "alice" | "kevin"
  ): CoachingEvent[] {
    const events: CoachingEvent[] = [];
    const coach = coachId ?? "alice";
    const now = Date.now();

    // 1. Camera State Transitions & Continuous Visibility Tracking
    if (this.lastCameraState !== cameraState) {
      if (cameraState === "CAMERA_DISABLED" || cameraState === "CAMERA_ERROR") {
        events.push(CoachingEventBuilder.buildCameraUnavailableEvent(asanaId, asanaName, coachId));
        this.activeIssue = null;
      } else if (cameraState === "NO_PERSON") {
        events.push(CoachingEventBuilder.buildUserOutOfFrameEvent(asanaId, asanaName, coachId));
        this.lastOutOfFrameReminderTime = now;
        this.activeIssue = null;
      } else if (cameraState === "PARTIAL_BODY") {
        events.push(CoachingEventBuilder.buildPartialBodyEvent(asanaId, asanaName, coachId));
        this.activeIssue = null;
      } else if (cameraState === "CAMERA_READY") {
        events.push(CoachingEventBuilder.buildCameraReadyEvent(asanaId, asanaName, coachId));
      }
      this.lastCameraState = cameraState;
    } else if (cameraState === "NO_PERSON" && sessionState !== "idle") {
      // Gentle reminder if user stays out of frame for >8s
      if (now - this.lastOutOfFrameReminderTime >= 8000) {
        this.lastOutOfFrameReminderTime = now;
        events.push({
          id: `presence_${now}`,
          type: "user_out_of_frame",
          coach: coachId,
          asanaId,
          asanaName,
          sessionState,
          cameraState,
          feedback: "Step back into the frame so I can guide you.",
          timestamp: now,
        });
      }
    }

    // 2. Session State Transitions
    if (this.lastSessionState !== sessionState) {
      if (sessionState === "calibrating") {
        events.push(CoachingEventBuilder.buildCalibrationRequiredEvent(asanaId, asanaName, coachId));
      } else if (
        sessionState === "coaching" &&
        this.lastSessionState !== "holding" &&
        this.lastSessionState !== "user_choice"
      ) {
        // Entered active pose coaching
        events.push(CoachingEventBuilder.buildPoseStartedEvent(asanaId, asanaName, coachId, cameraState));
        this.hasAnnouncedGoodFormForPose = false;
        this.hasAnnouncedCompletionForPose = false;
        this.firedMilestones.clear();
        this.lastMindfulnessTime = 0;
      } else if (sessionState === "holding") {
        events.push(CoachingEventBuilder.buildPoseHeldEvent(asanaId, asanaName, evaluation?.score, coachId));
      } else if (
        sessionState === "completed" ||
        sessionState === "session_completed" ||
        sessionState === "pose_review" ||
        sessionState === "user_choice"
      ) {
        if (!this.hasAnnouncedCompletionForPose) {
          events.push(CoachingEventBuilder.buildPoseCompletedEvent(asanaId, asanaName, evaluation?.score, coachId));
          this.hasAnnouncedCompletionForPose = true;
        }
        this.activeIssue = null;
      }
      this.lastSessionState = sessionState;
    }

    // 3. Pose Evaluation (Strictly guarded by CAMERA_READY to avoid occlusion false-positives)
    const isActiveCoaching =
      sessionState === "coaching" || sessionState === "holding" || sessionState === "correcting";

    if (isActiveCoaching && cameraState === "CAMERA_READY" && evaluation && evaluation.isValid !== false) {
      
      // Safety Warning check (explicit high severity alignment issues)
      const secondary = evaluation.secondaryIssues || [];
      const safetyIssue =
        secondary.find((i) => i.severity === "high") ||
        (evaluation.primaryIssue?.severity === "high" ? evaluation.primaryIssue : null);

      if (safetyIssue) {
        events.push(
          CoachingEventBuilder.buildSafetyWarningEvent(
            asanaId,
            asanaName,
            safetyIssue,
            evaluation.score,
            sessionState,
            cameraState,
            coachId
          )
        );
      }

      // Single Primary Issue Processing
      const primary = evaluation.primaryIssue;

      if (primary && primary.severity !== "high") {
        const currentDeviation = Math.abs(
          primary.currentValue - (primary.targetValue ?? primary.currentValue)
        );

        if (!this.activeIssue || this.activeIssue.ruleId !== primary.ruleId) {
          // New issue detected or primary issue switched
          this.activeIssue = {
            ruleId: primary.ruleId,
            initialDeviation: currentDeviation,
            lastDeviation: currentDeviation,
          };
          events.push(
            CoachingEventBuilder.buildPoseCorrectionEvent(
              asanaId,
              asanaName,
              primary,
              evaluation.score,
              sessionState,
              cameraState,
              coachId
            )
          );
          this.hasAnnouncedGoodFormForPose = false;
        } else {
          // Existing issue — check for meaningful improvement (30% reduction in deviation)
          const initialDev = this.activeIssue.initialDeviation;
          if (
            initialDev > 0 &&
            currentDeviation < initialDev * 0.7 &&
            currentDeviation < this.activeIssue.lastDeviation
          ) {
            events.push(
              CoachingEventBuilder.buildIssueImprovingEvent(asanaId, asanaName, primary.ruleId, coachId)
            );
            this.activeIssue.initialDeviation = currentDeviation;
          }
          this.activeIssue.lastDeviation = currentDeviation;
        }
      } else if (!primary && this.activeIssue) {
        // Previously incorrect posture is now recovered and acceptable
        events.push(
          CoachingEventBuilder.buildIssueResolvedEvent(
            asanaId,
            asanaName,
            this.activeIssue.ruleId,
            coachId
          )
        );
        this.activeIssue = null;
      }

      // Good Form Announcement (fires once when alignment is achieved and score >= 75)
      if (
        !primary &&
        evaluation.score >= 75 &&
        !this.hasAnnouncedGoodFormForPose &&
        sessionState === "coaching"
      ) {
        events.push(
          CoachingEventBuilder.buildGoodFormEvent(
            asanaId,
            asanaName,
            evaluation.score,
            sessionState,
            cameraState,
            coachId
          )
        );
        this.hasAnnouncedGoodFormForPose = true;
      }

      // Milestone Encouragement
      const score = evaluation.score;
      if (shouldFireMilestone("score_above_90", score, this.firedMilestones, coach)) {
        const milestoneKey = `${coach}_score_above_90`;
        this.firedMilestones.add(milestoneKey);
        events.push({
          id: `milestone_90_${now}`,
          type: "good_form",
          coach: coachId,
          asanaId,
          asanaName,
          sessionState,
          cameraState,
          posture: "GOOD",
          score: Math.round(score),
          feedback: getMilestoneMessage(coach, "score_above_90"),
          timestamp: now,
        });
      } else if (shouldFireMilestone("score_above_75", score, this.firedMilestones, coach)) {
        const milestoneKey = `${coach}_score_above_75`;
        this.firedMilestones.add(milestoneKey);
        if (!this.hasAnnouncedGoodFormForPose) {
          events.push({
            id: `milestone_75_${now}`,
            type: "good_form",
            coach: coachId,
            asanaId,
            asanaName,
            sessionState,
            cameraState,
            posture: "GOOD",
            score: Math.round(score),
            feedback: getMilestoneMessage(coach, "score_above_75"),
            timestamp: now,
          });
        }
      }

      // Mindfulness / Breathing Reminders during long static hold (Good-Form Silence)
      if (sessionState === "holding" && events.length === 0) {
        const timeSinceMindfulness = now - this.lastMindfulnessTime;
        if (timeSinceMindfulness >= this.MINDFULNESS_INTERVAL_MS) {
          this.lastMindfulnessTime = now;
          events.push({
            id: `mindful_${now}`,
            type: "good_form",
            coach: coachId,
            asanaId,
            asanaName,
            sessionState,
            cameraState,
            posture: "GOOD",
            feedback: getMindfulnessReminder(coach),
            timestamp: now,
          });
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
