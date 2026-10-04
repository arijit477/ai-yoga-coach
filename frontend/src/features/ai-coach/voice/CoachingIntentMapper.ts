import type { CoachingEvent } from "./voice.types";
import type { CoachingIntent } from "./coachingIntent.types";

export interface CoachingIntentResult {
  intent: CoachingIntent;
  eventType: CoachingEvent["type"];
}

export function mapCoachingEventToIntent(
  event: CoachingEvent
): CoachingIntentResult {
  switch (event.type) {
    case "pose_started":
    case "step_guidance":
    case "calibration_prompt":
    case "calibration_complete":
    case "calibration_required":
    case "calibration_failed":
    case "accuracy_threshold":
    case "camera_state_change":
    case "camera_unavailable":
    case "user_out_of_frame":
    case "partial_body":
    case "camera_ready":
      return {
        intent: "GUIDE_ENTRY",
        eventType: event.type,
      };

    case "pose_correction":
      return {
        intent: "CORRECT",
        eventType: event.type,
      };

    case "issue_improving":
      return {
        intent: "ACKNOWLEDGE_IMPROVEMENT",
        eventType: event.type,
      };

    case "issue_resolved":
      return {
        intent: "CONFIRM_RESOLUTION",
        eventType: event.type,
      };

    case "good_form":
      return {
        intent: "CONFIRM_GOOD_FORM",
        eventType: event.type,
      };

    case "pose_held":
    case "hold_countdown":
      return {
        intent: "ENCOURAGE_HOLD",
        eventType: event.type,
      };

    case "pose_completed":
      return {
        intent: "CELEBRATE_COMPLETION",
        eventType: event.type,
      };

    case "safety_warning":
      return {
        intent: "SAFETY_WARNING",
        eventType: event.type,
      };

    default:
      return {
        intent: "GUIDE_ENTRY",
        eventType: event.type,
      };
  }
}
