import type { CoachingContext } from "./CoachingContext";

export class CoachingPromptBuilder {
  static build(context: CoachingContext): string {
    const issues = context.activeIssues
      .map(
        issue =>
          `- ${issue.bodyPart}: ${issue.issue}. Correction: ${issue.correction}`
      )
      .join("\n");

    const corrected =
      context.correctedIssues.length > 0
        ? context.correctedIssues.join(", ")
        : "none";

    return `
AI YOGA COACHING CONTEXT

Asana:
${context.asanaName}

Current state:
${context.state}

Active posture issues:
${issues || "None"}

Previously corrected issues:
${corrected}

Hold duration:
${context.holdSeconds ?? 0} seconds

Remaining hold:
${context.remainingHoldSeconds ?? "unknown"} seconds

Score:
${context.score ?? "unknown"}

COACHING RULES:

1. Speak like a real yoga coach.
2. Give short, actionable instructions.
3. Never describe the entire asana when the user is already performing it.
4. Focus on the most important active issue.
5. Tell the user exactly what body part to move.
6. Do not invent posture problems.
7. Trust the detected posture information.
8. If the user is improving, acknowledge the improvement.
9. If the posture becomes correct, acknowledge it briefly.
10. During a hold, encourage breathing and stability.
11. When the pose is completed, congratulate the user.
12. Do not repeat the same correction unnecessarily.
13. Never overwhelm the user with multiple corrections at once.
14. Keep the coaching voice natural, warm, encouraging and concise.

The voice response should normally be 1-2 short sentences.
`;
  }
}
