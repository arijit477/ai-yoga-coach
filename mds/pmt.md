PHASE 4B — Context-Aware Real-Time Coaching
4B.1 — Create CoachingContext.ts
Create:
frontend/src/features/ai-coach/voice/CoachingContext.ts

export type CoachingState =
  | "STARTING"
  | "MOVING_INTO_POSE"
  | "CORRECTING"
  | "IMPROVING"
  | "CORRECT"
  | "HOLDING"
  | "COMPLETING"
  | "COMPLETED";

export interface CoachingIssue {
  id: string;
  bodyPart: string;
  issue: string;
  correction: string;
  severity: "low" | "medium" | "high";
  confidence?: number;
}

export interface CoachingContext {
  asanaName: string;
  state: CoachingState;

  activeIssues: CoachingIssue[];

  correctedIssues: string[];

  lastCorrectionAt?: number;
  lastIssueId?: string;

  holdSeconds?: number;
  remainingHoldSeconds?: number;

  score?: number;
}

This becomes the structured information we give the voice agent.
4B.2 — Create CoachingContextManager.ts
Create:
frontend/src/features/ai-coach/voice/CoachingContextManager.ts

import {
  CoachingContext,
  CoachingIssue,
  CoachingState,
} from "./CoachingContext";

export class CoachingContextManager {
  private context: CoachingContext | null = null;

  startPose(asanaName: string): void {
    this.context = {
      asanaName,
      state: "STARTING",
      activeIssues: [],
      correctedIssues: [],
    };
  }

  setState(state: CoachingState): void {
    if (!this.context) return;

    this.context.state = state;
  }

  setIssues(issues: CoachingIssue[]): void {
    if (!this.context) return;

    this.context.activeIssues = issues;

    if (issues.length > 0) {
      this.context.lastIssueId = issues[0].id;
    }
  }

  markIssueCorrected(issueId: string): void {
    if (!this.context) return;

    this.context.activeIssues =
      this.context.activeIssues.filter(
        issue => issue.id !== issueId
      );

    if (!this.context.correctedIssues.includes(issueId)) {
      this.context.correctedIssues.push(issueId);
    }
  }

  updateHold(
    holdSeconds: number,
    remainingHoldSeconds?: number
  ): void {
    if (!this.context) return;

    this.context.holdSeconds = holdSeconds;
    this.context.remainingHoldSeconds =
      remainingHoldSeconds;

    this.context.state = "HOLDING";
  }

  setScore(score: number): void {
    if (!this.context) return;

    this.context.score = score;
  }

  getContext(): CoachingContext | null {
    if (!this.context) return null;

    return {
      ...this.context,
      activeIssues: [...this.context.activeIssues],
      correctedIssues: [...this.context.correctedIssues],
    };
  }

  reset(): void {
    this.context = null;
  }
}

4B.3 — Create CoachingPromptBuilder.ts
This is important.
GPT should not decide what the user's body is doing.
MediaPipe + your rule engine decides that.
GPT's job is to turn that structured information into natural coaching speech.
Create:
frontend/src/features/ai-coach/voice/CoachingPromptBuilder.ts

import { CoachingContext } from "./CoachingContext";

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

4B.4 — Add context to RealtimeVoiceAgent
Now modify your existing:
RealtimeVoiceAgent.ts

Add:
import { CoachingContextManager } from "./CoachingContextManager";
import { CoachingPromptBuilder } from "./CoachingPromptBuilder";
import { CoachingContext } from "./CoachingContext";

Inside the class add:
private readonly coachingContextManager =
  new CoachingContextManager();

4B.5 — Add context methods
Inside RealtimeVoiceAgent:
public startCoachingContext(asanaName: string): void {
  this.coachingContextManager.startPose(asanaName);
}

public updateCoachingContext(
  context: CoachingContext
): void {
  this.coachingContextManager.setState(context.state);

  this.coachingContextManager.setIssues(
    context.activeIssues
  );

  context.correctedIssues.forEach(issueId => {
    this.coachingContextManager.markIssueCorrected(
      issueId
    );
  });

  if (context.holdSeconds !== undefined) {
    this.coachingContextManager.updateHold(
      context.holdSeconds,
      context.remainingHoldSeconds
    );
  }

  if (context.score !== undefined) {
    this.coachingContextManager.setScore(
      context.score
    );
  }
}

public resetCoachingContext(): void {
  this.coachingContextManager.reset();
}

4B.6 — Modify sendCoachingEvent()
You already have:
sendCoachingEvent(event: CoachingEvent)

Do not replace your existing orchestrator logic.
Keep:
const decision =
  this.voiceCoachingOrchestrator.evaluate(event);

and all your existing rhythm/arbitration logic.
After the event has been approved, obtain the context:
const context =
  this.coachingContextManager.getContext();

Then build the coaching instruction:
const coachingPrompt = context
  ? CoachingPromptBuilder.build(context)
  : "";

Your existing event prompt should then include:
const finalInstruction = `
${coachingPrompt}

CURRENT COACHING EVENT:

Event type:
${event.type}

Cue type:
${event.cueType}

Event message:
${event.message}

Respond as the AI yoga coach.
`;

Then send your existing Realtime response using:
finalInstruction

instead of replacing the entire existing event mechanism.
Important
Don't remove:
Realtime coaching context

that already exists in your project.
We're adding the structured context, not replacing your existing prompt.
4B.7 — Connect pose start
Where you currently have:
triggerPoseStart()

you should initialize the context.
For example:
this.startCoachingContext(asanaName);

Then keep your existing:
this.voiceCoachingOrchestrator.reset();

So the sequence becomes:
New Asana
   ↓
Reset orchestrator
   ↓
Reset coaching context
   ↓
Start new coaching context
   ↓
Pose-start event

4B.8 — Connect posture corrections
Where your pose analysis generates a correction, create a structured issue.
For example:
const issue = {
  id: "left-elbow-extension",
  bodyPart: "Left elbow",
  issue: "Elbow is too bent",
  correction: "Straighten your left arm",
  severity: "medium" as const,
  confidence: 0.94,
};

Then:
this.coachingContextManager.setIssues([
  issue,
]);

Now GPT receives:
Active posture issues:

- Left elbow: Elbow is too bent.
  Correction: Straighten your left arm.

Instead of having to guess what the user is doing.
4B.9 — Improvement state
When your rule engine detects improvement:
this.coachingContextManager.setState(
  "IMPROVING"
);

Then:
this.sendCoachingEvent(event);

GPT can naturally say:
"Much better. Keep extending that arm."

4B.10 — Correct posture
When the issue disappears:
this.coachingContextManager.markIssueCorrected(
  issueId
);

this.coachingContextManager.setState(
  "CORRECT"
);

Then your existing:
issue_resolved

event can produce:
"Perfect. Your alignment is good."

4B.11 — Holding
When the user enters the hold:
this.coachingContextManager.updateHold(
  holdSeconds,
  remainingHoldSeconds
);

The state automatically becomes:
HOLDING

GPT should then produce short encouragement:
"Keep breathing. Stay strong and steady."

Not another posture explanation.
4B.12 — Completion
When:
pose_completed

fires:
this.coachingContextManager.setState(
  "COMPLETING"
);

The GPT instruction should naturally produce:
"Excellent! You completed Warrior Two. Take a deep breath and relax."

After the completion event:
this.coachingContextManager.setState(
  "COMPLETED"
);

4B.13 — Very important: don't let GPT talk continuously
This is where your existing Phase 3.5 work becomes valuable.
Keep your current:
CoachingRhythmManager
        ↓
VoiceCoachingOrchestrator

The new context layer doesn't bypass the rhythm system.
The architecture should remain:
MediaPipe
    ↓
Pose Analysis
    ↓
CoachingEventEngine
    ↓
CoachDecisionEngine
    ↓
VoiceCoachingOrchestrator
    ↓
CoachingContext
    ↓
GPT Realtime
    ↓
Voice

The orchestrator still decides:
Should the coach speak?

The context layer tells GPT:
What exactly should the coach say?

That's the key distinction.
4B.14 — Expected behavior after Phase 4B
Scenario 1 — Wrong elbow
MediaPipe:
Left elbow = incorrect

Voice:
"Straighten your left arm a little."

Scenario 2 — Still wrong
After cooldown:
"Your left arm is still slightly bent. Extend it a little more."

Scenario 3 — Improving
"Yes, much better. Keep it there."

Scenario 4 — Correct
"Perfect. Your alignment looks good."

Scenario 5 — Holding
"Beautiful. Keep breathing and hold steady."

Scenario 6 — Almost finished
"Almost there. Stay strong."

Scenario 7 — Completed
"Excellent work! You completed the pose. Take a breath and relax."

4B.15 — Build and test
After implementing:
npm run build

Then:
npm test

You should preserve your existing 389 tests / 76 suites baseline.
If tests fail, don't start changing unrelated files. Give me the exact error.
Phase 4B success criteria
