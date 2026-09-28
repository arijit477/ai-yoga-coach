/**
 * NaturalCoachLanguage.ts
 *
 * Provides contextual, personality-driven coaching language for Alice and Kevin.
 * Messages are varied, natural, and context-sensitive — not scripted.
 *
 * Architecture:
 *  - Each event type has a bank of messages per coach persona.
 *  - The pick() function chooses a message without immediate repeats.
 *  - Score/issue context enriches the message with relevant detail.
 */

export type CoachPersona = "alice" | "kevin";

// ─── Internal helpers ──────────────────────────────────────────────────────────

const lastPickedIndex = new Map<string, number>();

/**
 * Picks a random item from the array while avoiding the last-picked index.
 */
function pick<T>(bank: T[], key: string): T {
  if (bank.length === 1) return bank[0];
  const last = lastPickedIndex.get(key) ?? -1;
  let idx: number;
  do {
    idx = Math.floor(Math.random() * bank.length);
  } while (idx === last && bank.length > 1);
  lastPickedIndex.set(key, idx);
  return bank[idx];
}

/**
 * Fills in {asana}, {score}, {joint}, {target}, {seconds} placeholders.
 */
function fill(
  template: string,
  vars: { asana?: string; score?: number; joint?: string; target?: number; seconds?: number }
): string {
  return template
    .replace("{asana}", vars.asana ?? "this pose")
    .replace("{score}", vars.score !== undefined ? `${Math.round(vars.score)}%` : "")
    .replace("{joint}", vars.joint ?? "that area")
    .replace("{target}", vars.target !== undefined ? `${Math.round(vars.target)}\u00b0` : "")
    .replace("{seconds}", vars.seconds !== undefined ? `${Math.round(vars.seconds)}` : "");
}

// ─── Message Banks ─────────────────────────────────────────────────────────────

const POSE_STARTED: Record<CoachPersona, string[]> = {
  alice: [
    "Let's gently move into {asana}. Take your time settling in.",
    "Wonderful. Let's explore {asana} together.",
    "Take a breath and ease into {asana}. There is no rush.",
    "Let us begin {asana}. Focus on how it feels, not just how it looks.",
    "Step into {asana} mindfully. Remember to breathe.",
    "We are starting {asana}. Let the posture feel natural.",
    "Let's begin {asana}. Listen to your body as we move.",
  ],
  kevin: [
    "Alright, let's go! Starting {asana} — let's make it count.",
    "Here we go — {asana}. Give it your best shot.",
    "Time for {asana}. You can do this.",
    "Let's step into {asana}. Focus and commit.",
    "Starting {asana} — stay strong, stay present.",
    "Get into {asana}. I know you have got this.",
    "We're doing {asana}. Let's crush it together.",
  ],
};

const CALIBRATION_PROMPT: Record<CoachPersona, string[]> = {
  alice: [
    "Please hold still for a moment while I check your position.",
    "Just a moment — I am checking your alignment.",
    "Stand tall and hold still so I can calibrate.",
    "Stay steady for a second while I get a clear read on your posture.",
  ],
  kevin: [
    "Hold still for a sec — I am locking in your position.",
    "Freeze for a moment while I calibrate.",
    "Stand firm — just getting a quick read on your stance.",
    "Don't move — calibrating your position right now.",
  ],
};

const CALIBRATION_COMPLETE: Record<CoachPersona, string[]> = {
  alice: [
    "Perfect. I can see you clearly. Let's begin {asana}.",
    "Great — all calibrated. Let's flow into {asana}.",
    "Lovely. Now we're aligned. Starting {asana}.",
    "I can see you well. Let's gently start {asana}.",
  ],
  kevin: [
    "Got you. All set. Let's launch into {asana}.",
    "Calibrated. Let's get moving with {asana}.",
    "Perfect. I have got your position. Time for {asana}.",
    "Locked in. Let's power through {asana}.",
  ],
};

const GOOD_FORM: Record<CoachPersona, string[]> = {
  alice: [
    "Beautiful posture. Hold that position.",
    "You are doing better than you think. Stay right there.",
    "Yoga is not about perfection — and this looks close to perfect.",
    "Lovely alignment. Keep breathing and hold.",
    "That is wonderful. Let's stay here for a few breaths.",
    "Excellent work. Maintain this graceful posture.",
    "You are flowing beautifully. Stay with it.",
    "Your body found it. Hold this feeling.",
    "Focus on how the posture feels, not just how it looks — and it feels great.",
    "Almost there. Just breathe and sustain.",
  ],
  kevin: [
    "That is it! Hold that position, you have got it!",
    "Nice! We are getting closer — hold it right there.",
    "Great effort! That posture looks solid.",
    "Strong form! Keep that energy and hold.",
    "Yes! That is what I am talking about — maintain it.",
    "Excellent. You are nailing this — hold on.",
    "Looking powerful! Keep that position locked in.",
    "You are doing great — do not let go now.",
    "That is the one. Commit to it.",
    "Well done — stay there and own it.",
  ],
};

const POSE_HELD: Record<CoachPersona, string[]> = {
  alice: [
    "Beautifully held. Now breathe and stay present.",
    "Posture aligned. Breathe slowly and hold this space.",
    "Wonderful. You are in the pose. Just breathe.",
    "Your body is doing the work. Rest in the posture.",
  ],
  kevin: [
    "Locked in! Now hold it — you can do this.",
    "That is the pose! Dig in and hold strong.",
    "Great alignment — hold steady and breathe.",
    "Now maintain it — show me what you have got.",
  ],
};

const POSE_COMPLETED: Record<CoachPersona, string[]> = {
  alice: [
    "Well done. You have completed {asana} with grace.",
    "Beautiful work. Take a breath and be proud of that.",
    "You completed {asana}. That was truly wonderful.",
    "Lovely. You moved through {asana} mindfully.",
  ],
  kevin: [
    "Yes! You crushed {asana}! Amazing effort.",
    "Incredible! {asana} — done and dusted. Great work.",
    "You completed {asana}! I knew you could do it.",
    "That's how it's done. {asana} complete — well earned.",
  ],
};

const ISSUE_IMPROVING: Record<CoachPersona, string[]> = {
  alice: [
    "Much better. Keep gently adjusting.",
    "I can see that improving — keep going.",
    "You are finding it. Stay with that direction.",
    "Nice progress. Let's keep refining.",
    "That is better. Listen to your body and continue.",
  ],
  kevin: [
    "Getting there! Keep pushing.",
    "Yes — that is better! Stay on it.",
    "Looking much better — keep going.",
    "You are improving — do not stop now.",
    "Nice correction! Keep that momentum.",
  ],
};

const ISSUE_RESOLVED: Record<CoachPersona, string[]> = {
  alice: [
    "Perfect. That looks just right now.",
    "Lovely — that correction is exactly what was needed.",
    "You found it. That feels better, doesn't it?",
    "Beautifully corrected. Hold that alignment.",
  ],
  kevin: [
    "Nailed it! That is the correction I wanted.",
    "Yes! Fixed. Now hold it there.",
    "Great job — that is exactly right now.",
    "That is what I am talking about. Excellent fix.",
  ],
};

const POSE_CORRECTION: Record<CoachPersona, string[]> = {
  alice: [
    "Let's gently adjust your {joint}.",
    "Notice your {joint} — try softening it a little.",
    "Your {joint} can open up a bit more.",
    "Try to ease your {joint} toward the natural position.",
    "Let's bring some awareness to your {joint}.",
    "A small adjustment in your {joint} will make a big difference.",
    "Breathe into your {joint} and let it release.",
  ],
  kevin: [
    "Focus on your {joint} — bring it into position.",
    "Adjust your {joint} — you can do better.",
    "Lock in your {joint} now.",
    "Your {joint} needs to shift. Stay with it.",
    "Come on — get your {joint} into alignment.",
    "Tighten up your {joint} — almost there.",
    "Your {joint} is slightly off — make the correction.",
  ],
};

const POSE_CORRECTION_WITH_TARGET: Record<CoachPersona, string[]> = {
  alice: [
    "Nice start. Let's raise your {joint} slightly toward {target}.",
    "Almost there. Your {joint} can move a little more toward {target}.",
    "Try guiding your {joint} gently to around {target}.",
    "Your {joint} is close — aim for about {target} to complete the posture.",
    "Let's fine-tune your {joint} — we are looking for around {target}.",
  ],
  kevin: [
    "Your {joint} needs to reach {target} — push a bit more.",
    "Get your {joint} to {target} — you are almost there.",
    "Come on — {joint} to {target}. Make the adjustment.",
    "Lock in your {joint} at around {target} — that is the target.",
    "{joint} to {target} — commit to that correction.",
  ],
};

const USER_OUT_OF_FRAME: Record<CoachPersona, string[]> = {
  alice: [
    "I cannot see you clearly. Please step back into the frame.",
    "Come back into view so I can guide you.",
    "I have lost sight of you — come back to the center.",
  ],
  kevin: [
    "I can't see you! Come back into the frame.",
    "Step back in — I need to see you to coach you.",
    "You're out of frame — get back in there.",
  ],
};

const PARTIAL_BODY: Record<CoachPersona, string[]> = {
  alice: [
    "I can only see part of you. Can you step back a little so I can see your full body?",
    "Please adjust your camera so your whole body is visible.",
    "I need to see your full posture to guide you well.",
  ],
  kevin: [
    "I can only see part of you. Step back so I get the full picture.",
    "Full body in frame, please — I need to see everything.",
    "Back up a little — I can only see half of you.",
  ],
};

const CAMERA_READY: Record<CoachPersona, string[]> = {
  alice: [
    "I can see you clearly now. Welcome back.",
    "Perfect — I have a clear view now.",
    "I can see you. Let's continue.",
  ],
  kevin: [
    "I can see you again. Let's get back to it.",
    "Got you in frame. Back to work.",
    "Camera clear. Let's go.",
  ],
};

const MINDFULNESS_REMINDERS: Record<CoachPersona, string[]> = {
  alice: [
    "Remember to breathe. Let your breath guide the posture.",
    "Take a deep breath. Let your body settle into the pose.",
    "Yoga is a conversation between body and breath.",
    "Focus inward for a moment. Notice how your body feels.",
    "Breathe slowly. Your breath is your anchor.",
  ],
  kevin: [
    "Keep breathing — do not hold your breath.",
    "Inhale strength, exhale tension.",
    "Steady breath, steady posture. Stay focused.",
    "Breathe through it — that is how you sustain.",
    "Your breath is fuel. Use it.",
  ],
};

const MILESTONE_ENCOURAGEMENT: Record<CoachPersona, Record<string, string[]>> = {
  alice: {
    first_pose_started: [
      "Wonderful start. Let's see how we do together.",
      "You showed up — that is already half the practice.",
      "Take your time. We will build this together.",
    ],
    score_above_75: [
      "You are doing beautifully. Your body is listening.",
      "That is a wonderful accuracy score. Keep breathing.",
      "You are truly in the flow now.",
    ],
    score_above_90: [
      "That is exceptional. Your posture is nearly perfect.",
      "Incredible precision. You have worked hard for this.",
      "This is what practice leads to — outstanding.",
    ],
    hold_5s: [
      "Five seconds held beautifully. Keep going.",
      "You are sustaining it. Breathe and stay.",
      "Halfway through the hold. Wonderful.",
    ],
    hold_10s: [
      "Ten seconds — magnificent effort.",
      "You are holding with grace. Almost there.",
      "Ten seconds of stillness. That is yoga.",
    ],
  },
  kevin: {
    first_pose_started: [
      "Let's do this! I am right here with you.",
      "Game on. Let's make every second count.",
      "You started — now let's finish strong.",
    ],
    score_above_75: [
      "That is a solid score — keep building on it.",
      "Nice accuracy! Push a little more.",
      "You are in the zone — stay there.",
    ],
    score_above_90: [
      "Ninety percent accuracy! That is elite.",
      "Outstanding! You are crushing it right now.",
      "That score is incredible — do not stop.",
    ],
    hold_5s: [
      "Five seconds! Keep going strong.",
      "Halfway — you can do this.",
      "Five in. Do not give up now.",
    ],
    hold_10s: [
      "Ten seconds! Insane endurance!",
      "You held it for ten seconds — respect.",
      "Ten strong seconds. That took grit.",
    ],
  },
};

// ─── Public API ────────────────────────────────────────────────────────────────

export interface CoachingMessageContext {
  asanaName?: string;
  score?: number;
  joint?: string;
  targetValue?: number;
  holdSeconds?: number;
  coach: CoachPersona;
}

export function getPoseStartedMessage(ctx: CoachingMessageContext): string {
  const template = pick(POSE_STARTED[ctx.coach], `pose_started_${ctx.coach}`);
  return fill(template, { asana: ctx.asanaName });
}

export function getCalibrationPromptMessage(ctx: CoachingMessageContext): string {
  const template = pick(CALIBRATION_PROMPT[ctx.coach], `calib_prompt_${ctx.coach}`);
  return fill(template, { asana: ctx.asanaName });
}

export function getCalibrationCompleteMessage(ctx: CoachingMessageContext): string {
  const template = pick(CALIBRATION_COMPLETE[ctx.coach], `calib_complete_${ctx.coach}`);
  return fill(template, { asana: ctx.asanaName });
}

export function getGoodFormMessage(ctx: CoachingMessageContext): string {
  const template = pick(GOOD_FORM[ctx.coach], `good_form_${ctx.coach}`);
  return fill(template, { asana: ctx.asanaName, score: ctx.score });
}

export function getPoseHeldMessage(ctx: CoachingMessageContext): string {
  const template = pick(POSE_HELD[ctx.coach], `pose_held_${ctx.coach}`);
  return fill(template, { asana: ctx.asanaName, score: ctx.score });
}

export function getPoseCompletedMessage(ctx: CoachingMessageContext): string {
  const template = pick(POSE_COMPLETED[ctx.coach], `pose_completed_${ctx.coach}`);
  return fill(template, { asana: ctx.asanaName, score: ctx.score });
}

export function getIssueImprovingMessage(ctx: CoachingMessageContext): string {
  const template = pick(ISSUE_IMPROVING[ctx.coach], `issue_improving_${ctx.coach}`);
  return fill(template, { joint: ctx.joint });
}

export function getIssueResolvedMessage(ctx: CoachingMessageContext): string {
  const template = pick(ISSUE_RESOLVED[ctx.coach], `issue_resolved_${ctx.coach}`);
  return fill(template, { joint: ctx.joint });
}

/**
 * Returns a natural pose correction message.
 * Uses target-angle variant when targetValue is available.
 */
export function getPoseCorrectionMessage(ctx: CoachingMessageContext): string {
  const hasTarget = ctx.targetValue !== undefined && ctx.targetValue > 0;
  const bank = hasTarget ? POSE_CORRECTION_WITH_TARGET[ctx.coach] : POSE_CORRECTION[ctx.coach];
  const key = `pose_correction_${ctx.coach}_${hasTarget ? "target" : "no_target"}`;
  const template = pick(bank, key);
  return fill(template, { joint: ctx.joint, target: ctx.targetValue });
}

export function getUserOutOfFrameMessage(ctx: CoachingMessageContext): string {
  const template = pick(USER_OUT_OF_FRAME[ctx.coach], `out_of_frame_${ctx.coach}`);
  return fill(template, {});
}

export function getPartialBodyMessage(ctx: CoachingMessageContext): string {
  const template = pick(PARTIAL_BODY[ctx.coach], `partial_body_${ctx.coach}`);
  return fill(template, {});
}

export function getCameraReadyMessage(ctx: CoachingMessageContext): string {
  const template = pick(CAMERA_READY[ctx.coach], `camera_ready_${ctx.coach}`);
  return fill(template, {});
}

export function getMindfulnessReminder(coach: CoachPersona): string {
  return pick(MINDFULNESS_REMINDERS[coach], `mindful_${coach}`);
}

export function getMilestoneMessage(
  coach: CoachPersona,
  milestone: "first_pose_started" | "score_above_75" | "score_above_90" | "hold_5s" | "hold_10s"
): string {
  const bank = MILESTONE_ENCOURAGEMENT[coach][milestone];
  return pick(bank, `milestone_${coach}_${milestone}`);
}

export function shouldFireMilestone(
  milestone: "score_above_75" | "score_above_90" | "hold_5s" | "hold_10s",
  value: number,
  firedMilestones: Set<string>,
  coach: CoachPersona
): boolean {
  const key = `${coach}_${milestone}`;
  if (firedMilestones.has(key)) return false;
  switch (milestone) {
    case "score_above_75": return value >= 75;
    case "score_above_90": return value >= 90;
    case "hold_5s": return value >= 5;
    case "hold_10s": return value >= 10;
    default: return false;
  }
}
