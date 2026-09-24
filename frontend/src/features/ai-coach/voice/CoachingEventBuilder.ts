import type { PoseIssue } from "../types/pose-rules";
import type { CoachingEvent } from "./voice.types";

function generateEventId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
}

export class CoachingEventBuilder {
  /**
   * Generates a pose_started event when a user enters the target asana.
   */
  static buildPoseStartedEvent(asanaId: string, asanaName: string, asanaDescription?: string): CoachingEvent {
    return {
      id: generateEventId("start"),
      type: "pose_started",
      asanaId,
      asanaName,
      feedback: asanaDescription ? `Let's begin ${asanaName}. ${asanaDescription}` : `Let's begin ${asanaName}.`,
      timestamp: Date.now(),
    };
  }

  /**
   * Generates a calibration_prompt event asking the user to hold still or adjust position (e.g. move back).
   */
  static buildCalibrationPromptEvent(
    asanaId: string,
    asanaName: string,
    message: string = "Hold still for a moment while I check your position.",
  ): CoachingEvent {
    return {
      id: generateEventId("calib_prompt"),
      type: "calibration_prompt",
      asanaId,
      asanaName,
      feedback: message,
      timestamp: Date.now(),
    };
  }

  /**
   * Generates a calibration_complete event once the user is stable.
   */
  static buildCalibrationCompleteEvent(asanaId: string, asanaName: string): CoachingEvent {
    return {
      id: generateEventId("calib_done"),
      type: "calibration_complete",
      asanaId,
      asanaName,
      feedback: `Perfect. I can see you clearly. Let's begin ${asanaName}.`,
      timestamp: Date.now(),
    };
  }

  /**
   * Generates a step_guidance event for step-by-step posture instruction.
   */
  static buildStepGuidanceEvent(asanaId: string, asanaName: string, stepText: string): CoachingEvent {
    return {
      id: generateEventId("step"),
      type: "step_guidance",
      asanaId,
      asanaName,
      feedback: stepText,
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
      joint: issue.joint,
      severity: issue.severity,
      currentValue: Math.round(issue.currentValue),
      targetValue: issue.targetValue !== undefined ? Math.round(issue.targetValue) : undefined,
      min: issue.min,
      max: issue.max,
      targetMin: issue.targetMin ?? issue.min,
      targetMax: issue.targetMax ?? issue.max,
      feedback: issue.feedback,
      score: score !== undefined ? Math.round(score) : undefined,
      timestamp: Date.now(),
    };
  }

  /**
   * Generates an issue_improving event when a known issue gets significantly better.
   */
  static buildIssueImprovingEvent(asanaId: string, asanaName: string, ruleId: string): CoachingEvent {
    return {
      id: generateEventId("impr"),
      type: "issue_improving",
      asanaId,
      asanaName,
      ruleId,
      feedback: "Much better, keep going.",
      timestamp: Date.now(),
    };
  }

  /**
   * Generates an issue_resolved event when a known issue is completely fixed.
   */
  static buildIssueResolvedEvent(asanaId: string, asanaName: string, ruleId: string): CoachingEvent {
    return {
      id: generateEventId("resolv"),
      type: "issue_resolved",
      asanaId,
      asanaName,
      ruleId,
      feedback: "Great job, that looks perfect now.",
      timestamp: Date.now(),
    };
  }

  /**
   * Generates a good_form event when the user corrects their posture or starts with good form.
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
      feedback: `Excellent alignment. Achieving ${score ? Math.round(score) : 75}% accuracy is a great result! Now hold for 10 seconds.`,
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
      feedback: `Congratulations! You have completed ${asanaName}.`,
      timestamp: Date.now(),
    };
  }



  /**
   * Generates a hold_countdown event.
   */
  static buildHoldCountdownEvent(asanaId: string, asanaName: string, remainingSeconds: number): CoachingEvent {
    return {
      id: generateEventId("count"),
      type: "hold_countdown",
      asanaId,
      asanaName,
      feedback: `${Math.ceil(remainingSeconds)}`,
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

  /**
   * Generates specific camera state events
   */
  static buildCameraUnavailableEvent(asanaId: string, asanaName: string): CoachingEvent {
    return {
      id: generateEventId("cam_unav"),
      type: "camera_unavailable",
      asanaId,
      asanaName,
      feedback: "Camera is currently unavailable.",
      timestamp: Date.now(),
    };
  }

  static buildUserOutOfFrameEvent(asanaId: string, asanaName: string): CoachingEvent {
    return {
      id: generateEventId("cam_out"),
      type: "user_out_of_frame",
      asanaId,
      asanaName,
      feedback: "I can't see you. Please step into the frame.",
      timestamp: Date.now(),
    };
  }

  static buildPartialBodyEvent(asanaId: string, asanaName: string): CoachingEvent {
    return {
      id: generateEventId("cam_part"),
      type: "partial_body",
      asanaId,
      asanaName,
      feedback: "I can only see part of you. Please adjust your camera so your full body is visible.",
      timestamp: Date.now(),
    };
  }

  static buildCameraReadyEvent(asanaId: string, asanaName: string): CoachingEvent {
    return {
      id: generateEventId("cam_rdy"),
      type: "camera_ready",
      asanaId,
      asanaName,
      feedback: "I can see you clearly now.",
      timestamp: Date.now(),
    };
  }

  static buildCalibrationRequiredEvent(asanaId: string, asanaName: string): CoachingEvent {
    return {
      id: generateEventId("calib_req"),
      type: "calibration_required",
      asanaId,
      asanaName,
      feedback: "Please stand back so we can calibrate.",
      timestamp: Date.now(),
    };
  }

  /**
   * Generates a calibration_failed event.
   */
  static buildCalibrationFailedEvent(
    asanaId: string,
    asanaName: string,
    reason: string,
  ): CoachingEvent {
    let feedback = "";
    switch (reason) {
      case "move_back":
        feedback = "Please step back so I can see your full body.";
        break;
      case "move_forward":
        feedback = "Please step forward, you are too far away.";
        break;
      case "center_body":
        feedback = "Please move to the center of the camera.";
        break;
      case "show_feet":
        feedback = "Please adjust the camera to show your feet.";
        break;
      case "improve_visibility":
        feedback = "Make sure the room is well-lit and you are clearly visible.";
        break;
      case "hold_still":
        feedback = "Please hold still so I can calibrate your position.";
        break;
      default:
        feedback = "Please adjust your position.";
    }

    return {
      id: generateEventId("calib_fail"),
      type: "calibration_failed",
      asanaId,
      asanaName,
      issue: reason,
      feedback,
      timestamp: Date.now(),
    };
  }
}
