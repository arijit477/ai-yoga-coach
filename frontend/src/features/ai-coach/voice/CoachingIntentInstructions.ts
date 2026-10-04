import type { CoachingIntent } from "./coachingIntent.types";

export function getCoachingIntentInstruction(
  intent: CoachingIntent
): string {
  switch (intent) {
    case "GUIDE_ENTRY":
      return `
Guide the user physically into the asana.
Give concise setup instructions.
Do not explain the history or general meaning of the pose.
Do not ask questions.
`;

    case "CORRECT":
      return `
Give one concise, actionable correction based only on the supplied vision data.
Prioritize the detected issue.
Do not describe the entire pose.
Do not invent a correction.
Do not ask questions.
`;

    case "ACKNOWLEDGE_IMPROVEMENT":
      return `
Acknowledge the user's improvement briefly.
Do not repeat the previous correction unless necessary.
`;

    case "CONFIRM_RESOLUTION":
      return `
Confirm briefly that the detected issue has been resolved.
Do not introduce a new correction unless the event contains one.
`;

    case "CONFIRM_GOOD_FORM":
      return `
Give brief positive confirmation of the user's current form.
Avoid long encouragement.
`;

    case "ENCOURAGE_HOLD":
      return `
Encourage the user briefly while they hold the pose.
Keep the cue calm and concise.
`;

    case "CELEBRATE_COMPLETION":
      return `
Explicitly acknowledge that the asana has been completed.
Give brief positive congratulations.
`;

    case "SAFETY_WARNING":
      return `
Prioritize the safety instruction immediately.
Do not add unnecessary motivational language.
`;

    default:
      return "";
  }
}
