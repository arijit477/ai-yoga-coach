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

  private lastLoggedGateKey: string | null = null;

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
    this.lastLoggedGateKey = null;
  }

  private logGateDecision(details: {
    sessionState: string;
    cameraState: string;
    hasValidPose: boolean;
    ruleId?: string;
    severity?: string;
    isSafetyIssue?: boolean;
    activeIssue?: string | null;
    decision: string;
    reason?: string;
  }): void {
    const key = `${details.sessionState}_${details.cameraState}_${details.decision}_${details.ruleId || 'none'}_${details.reason || 'none'}`;
    if (this.lastLoggedGateKey === key) return;
    this.lastLoggedGateKey = key;

    console.log(
      `[AI COACH][CORRECTION GATE]\n` +
      `sessionState=${details.sessionState}\n` +
      `cameraState=${details.cameraState}\n` +
      `hasValidPose=${details.hasValidPose}\n` +
      (details.ruleId ? `ruleId=${details.ruleId}\n` : "") +
      (details.severity ? `severity=${details.severity}\n` : "") +
      (details.isSafetyIssue !== undefined ? `isSafetyIssue=${details.isSafetyIssue}\n` : "") +
      (details.activeIssue !== undefined ? `activeIssue=${details.activeIssue}\n` : "") +
      `decision=${details.decision}` +
      (details.reason ? `\nreason=${details.reason}` : "")
    );
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

    console.log(`[AI COACH][TRACE][7][EVENT_ENGINE_INPUT]`, {
      sessionState,
      cameraState,
      hasEvaluation: Boolean(evaluation),
      poseValid: Boolean(evaluation && evaluation.isValid !== false),
      primaryIssue: evaluation?.primaryIssue?.ruleId ?? null,
      selectedAsana: asanaId,
    });

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

    // 3. Pose Evaluation & Correction Gating
    const isActiveCoaching =
      sessionState === "coaching" || sessionState === "holding" || sessionState === "correcting";
    const isCameraValidForCoaching =
      cameraState === "CAMERA_READY" || cameraState === "FULL_BODY_DETECTED";
    const hasValidPose = Boolean(evaluation && evaluation.isValid !== false);

    if (evaluation?.primaryIssue) {
      if (!isActiveCoaching || !isCameraValidForCoaching || !hasValidPose) {
        const blockReason = !isActiveCoaching
          ? "session_not_active"
          : !isCameraValidForCoaching
            ? `camera_state_${cameraState.toLowerCase()}`
            : "invalid_pose";
        this.logGateDecision({
          sessionState,
          cameraState,
          hasValidPose,
          ruleId: evaluation.primaryIssue.ruleId,
          severity: evaluation.primaryIssue.severity,
          isSafetyIssue: Boolean(evaluation.primaryIssue.isSafety),
          activeIssue: this.activeIssue?.ruleId ?? null,
          decision: "BLOCK",
          reason: blockReason,
        });

        console.log(`[AI COACH][TRACE][7][EVENT_ENGINE_BLOCKED]`, {
          reason: blockReason,
          sessionState,
          cameraState,
          ruleId: evaluation.primaryIssue.ruleId,
        });

        console.log(
          `[AI COACH][RUNTIME][EVENT_INPUT]\n` +
          `sessionState=${sessionState}\n` +
          `cameraState=${cameraState}\n` +
          `ruleId=${evaluation.primaryIssue.ruleId}\n` +
          `severity=${evaluation.primaryIssue.severity}\n` +
          `isSafety=${Boolean(evaluation.primaryIssue.isSafety)}\n` +
          `validPose=${hasValidPose}\n\n` +
          `[AI COACH][RUNTIME][EVENT_OUTPUT]\n` +
          `event=NONE\n` +
          `reason=${blockReason}`
        );
      }
    } else if (isActiveCoaching && isCameraValidForCoaching && hasValidPose) {
      console.log(`[AI COACH][TRACE][7][EVENT_ENGINE_BLOCKED]`, {
        reason: "no_primary_issue",
      });
    }

    if (isActiveCoaching && isCameraValidForCoaching && hasValidPose && evaluation) {
      
      // Safety Warning check (explicit safety hazards flagged with isSafety === true)
      const secondary = evaluation.secondaryIssues || [];
      const safetyIssue =
        secondary.find((i) => i.isSafety === true) ||
        (evaluation.primaryIssue?.isSafety === true ? evaluation.primaryIssue : null);

      if (safetyIssue) {
        this.logGateDecision({
          sessionState,
          cameraState,
          hasValidPose,
          ruleId: safetyIssue.ruleId,
          severity: safetyIssue.severity,
          isSafetyIssue: true,
          activeIssue: this.activeIssue?.ruleId ?? null,
          decision: "ALLOW_SAFETY_WARNING",
        });

        console.log(`[AI COACH][TRACE][7][EVENT_CREATED]`, {
          eventType: "safety_warning",
          ruleId: safetyIssue.ruleId,
          severity: safetyIssue.severity,
          feedback: safetyIssue.feedback,
        });

        console.log(
          `[AI COACH][RUNTIME][EVENT_INPUT]\n` +
          `sessionState=${sessionState}\n` +
          `cameraState=${cameraState}\n` +
          `ruleId=${safetyIssue.ruleId}\n` +
          `severity=${safetyIssue.severity}\n` +
          `isSafety=true\n` +
          `validPose=true\n\n` +
          `[AI COACH][RUNTIME][EVENT_OUTPUT]\n` +
          `event=safety_warning`
        );

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

      // Single Primary Issue Processing (Normal form issues, including high-severity form corrections)
      const primary = evaluation.primaryIssue;

      if (primary && !primary.isSafety) {
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
          this.logGateDecision({
            sessionState,
            cameraState,
            hasValidPose,
            ruleId: primary.ruleId,
            severity: primary.severity,
            isSafetyIssue: false,
            activeIssue: null,
            decision: "ALLOW_POSE_CORRECTION",
          });

          console.log(`[AI COACH][TRACE][7][EVENT_CREATED]`, {
            eventType: "pose_correction",
            ruleId: primary.ruleId,
            severity: primary.severity,
            feedback: primary.feedback,
          });

          console.log(
            `[AI COACH][RUNTIME][EVENT_INPUT]\n` +
            `sessionState=${sessionState}\n` +
            `cameraState=${cameraState}\n` +
            `ruleId=${primary.ruleId}\n` +
            `severity=${primary.severity}\n` +
            `isSafety=false\n` +
            `validPose=true\n\n` +
            `[AI COACH][RUNTIME][EVENT_OUTPUT]\n` +
            `event=pose_correction`
          );

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
          const prevDev = this.activeIssue.lastDeviation;
          const improvementPercent = initialDev > 0 ? ((initialDev - currentDeviation) / initialDev) * 100 : 0;

          if (
            initialDev > 0 &&
            currentDeviation < initialDev * 0.7 &&
            currentDeviation < this.activeIssue.lastDeviation
          ) {
            console.log(`[AI COACH][TRACE][7][EVENT_CREATED]`, {
              eventType: "issue_improving",
              ruleId: primary.ruleId,
              severity: primary.severity,
              feedback: "Form improving",
            });

            console.log(
              `[AI COACH][RUNTIME][IMPROVEMENT]\n` +
              `previousDeviation=${prevDev.toFixed(1)}\n` +
              `currentDeviation=${currentDeviation.toFixed(1)}\n` +
              `improvementPercent=${improvementPercent.toFixed(1)}\n` +
              `activeIssue=${primary.ruleId}\n` +
              `decision=ISSUE_IMPROVING`
            );

            events.push(
              CoachingEventBuilder.buildIssueImprovingEvent(asanaId, asanaName, primary.ruleId, coachId)
            );
            this.activeIssue.initialDeviation = currentDeviation;
          } else {
            console.log(`[AI COACH][TRACE][7][EVENT_ENGINE_BLOCKED]`, {
              reason: "duplicate_issue",
              ruleId: primary.ruleId,
            });
          }
          this.activeIssue.lastDeviation = currentDeviation;
        }
      } else if (!primary && this.activeIssue) {
        // Previously incorrect posture is now recovered and acceptable
        console.log(`[AI COACH][TRACE][7][EVENT_CREATED]`, {
          eventType: "issue_resolved",
          ruleId: this.activeIssue.ruleId,
        });

        console.log(
          `[AI COACH][RUNTIME][IMPROVEMENT]\n` +
          `activeIssue=${this.activeIssue.ruleId}\n` +
          `decision=ISSUE_RESOLVED`
        );

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
