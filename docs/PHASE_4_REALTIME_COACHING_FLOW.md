# Phase 4 — Real-Time Pose Validation & Human-Like Coaching Flow

## Objective
The objective of Phase 4 is to establish a robust real-time validation and coaching state pipeline so the AI Yoga Coach behaves like an experienced, attentive human yoga instructor.

The flow guarantees:
1. When a user selects an asana, the coach introduces the pose and guides the user into position.
2. The system continuously evaluates whether the user is actually performing the selected pose (`PoseIdentityValidator` + `StanceDetector`).
3. If identity does not match, guidance continues without initiating hold or completion.
4. When identity matches and form accuracy reaches $\ge 75\%$, a true continuous 5-second hold begins.
5. If identity, tracking, form, or accuracy drops below threshold at any point during the hold, the hold resets to 0 immediately (no resume from intermediate state).
6. When held continuously for the full 5000ms, the coach announces completion once and displays the pose review modal.

---

## Existing Runtime Architecture
The real-time runtime pipeline connects the following layers:
- **Camera Stream (`CameraView.tsx`)**: Captures video stream from user webcam.
- **MediaPipe Tasks Vision (`PoseLandmarkerService.ts`, `MotionFrameProcessor.ts`)**: Generates 33 normalized landmarks at up to 60 FPS on GPU.
- **Tracking Hook (`usePoseTracking.ts`)**: Runs a single RAF loop, throttles UI state updates to 30 FPS, and tracks camera readiness via `CameraReadinessTracker`.
- **Pose Evaluation (`usePoseEvaluation.ts`, `TemporalPoseEvaluator.ts`, `PoseEvaluator.ts`)**: Evaluates geometric rules and kinematic metrics.
- **Identity & Gate (`PoseIdentityValidator.ts`, `AsanaCompletionGate.ts`, `PoseFrameState.ts`)**: Validates physical stance, required landmarks, and pose-defining critical rules.
- **Accuracy Stabilization (`AccuracyStabilizer.ts`)**: Smooths scores with EMA, filters transient landmark glitches, and provides hysteresis.
- **Hold & Session Flow (`useCoachSession.ts`, `PoseHoldStateMachine.ts`, `SessionStateMachine.ts`)**: Manages continuous 5000ms hold and state transitions.
- **Voice Coaching (`useRealtimeVoice.ts`, `CoachingEventEngine.ts`, `CoachDecisionEngine.ts`)**: Dispatches prioritized, debounced natural coaching events to the voice agent.

---

## Frame Evaluation Pipeline
The runtime utilizes a single authoritative frame evaluation: `evaluatePoseFrameState()` (`PoseFrameState.ts`).

```
Camera Frame
    ↓
MediaPipe Landmarker (33 landmarks)
    ↓
PoseEvaluator (Rules, Kinematics, Stance)
    ↓
PoseIdentityValidator (Stance Match + Pose-Defining Critical Rules)
    ↓
AccuracyStabilizer (EMA smoothing, Outlier rejection)
    ↓
PoseFrameState (Authoritative Single Truth: identity + accuracy + form + gate)
    ↓
PoseHoldStateMachine (IDLE → POSITIONING → POSE_DETECTED → HOLDING → COMPLETED)
```

---

## Completion Eligibility
Completion eligibility requires all of the following conditions to be true simultaneously:
- `identity.isMatch === true`
- `identity.confidence >= 0.40`
- `tracking.valid === true` (at least 33 landmarks, camera ready, not occluded)
- `tracking.isStale === false` (fresh real-time data)
- `stanceValid === true` (physical stance matches required category)
- `formValid === true` (critical rules satisfied, no high-severity safety blockers)
- `accuracyValid === true` (displayed or stable score $\ge 75\%$)
- `gateResult.isEligible === true`

A high accuracy score alone is never treated as proof that an asana is being performed.

---

## Hold State Machine
The explicit hold state machine (`PoseHoldStateMachine.ts`) enforces the following states and transitions:

```
IDLE
  ↓ (start)
POSITIONING
  ↓ (identity match)
POSE_DETECTED
  ↓ (identity + form + tracking + accuracy ≥ 75%)
HOLDING
  ↓ (5000ms continuous unbroken hold)
COMPLETED
```

### Transition Matrix:
- `IDLE -> POSITIONING`: When session/pose evaluation begins.
- `POSITIONING -> POSE_DETECTED`: When pose identity matches (`identity.isMatch === true`).
- `POSE_DETECTED -> HOLDING`: When all completion conditions become valid.
- `HOLDING -> HOLDING`: While all conditions remain continuously valid (advances timer).
- `HOLDING -> POSITIONING / POSE_DETECTED`: Immediately upon ANY condition breaking (resets hold to 0).
- `HOLDING -> COMPLETED`: After 5000ms of continuous unbroken validity.

---

## Continuous Hold Logic
The timer measures actual continuous validity from `holdStartTimestamp`:
- `t = 0s`: `isCompletionEligible = true` → `holdStartTime = now`
- `t = 1s`: valid → `elapsed = 1000ms`
- `t = 2s`: valid → `elapsed = 2000ms`
- `t = 3s`: valid → `elapsed = 3000ms`
- `t = 3.2s`: condition breaks (`identity = false` or `accuracy = 73%`) → `holdStartTime = null`, `elapsed = 0ms`, state resets.
- `t = 4.0s`: condition recovers → new hold starts fresh from `0ms` (requires full 5000ms until `t = 9.0s`).

---

## Identity vs Form
The system strictly distinguishes between identity and form:
- **Identity**: *"Is the user performing the selected asana?"* Checked via physical stance (e.g., prone for Cobra, supine for Bridge, seated for Lotus, standing for Warrior II) and pose-defining critical rules.
- **Form Score**: *"How accurately is the pose being executed?"* Quantified 0–100% against joint angles and alignment constraints.

Example: If Cobra is selected and the user lies flat on the floor, geometric level rules might give 80%, but identity is `false` (no chest lift / spinal extension). The hold remains at 0 and completion is impossible.

---

## Tracking Loss Handling
- **UI Score Preservation**: `AccuracyStabilizer` provides a 600ms grace period to avoid integer flickering when a single frame drops.
- **Completion Eligibility**: `PoseFrameState` immediately marks `trackingValid = false` and `isCompletionEligible = false` upon tracking loss or stale frames. Stale frames never advance the hold timer or complete an asana.

---

## Feedback Priority
The coach dispatches feedback according to strict deterministic priority:
1. **Safety Warning** (Priority 1): Immediate physical safety corrections.
2. **Camera / Presence** (Priority 2–4): No person, out of frame, partial body occlusion.
3. **Identity Mismatch / Wrong Pose** (Priority 5): Prompting into correct physical stance.
4. **Major Pose Correction** (Priority 6): High-severity joint angle corrections.
5. **Moderate Form Correction** (Priority 6.1): Medium-severity adjustments.
6. **Minor Alignment Hint** (Priority 6.2): Low-severity fine-tuning.
7. **Issue Resolved / Improving** (Priority 7): Positive reinforcement on correction.
8. **Good Form / Correct Pose** (Priority 9): Initial entry praise ("Good form. Hold here.").
9. **Hold In Progress / Mindfulness** (Priority 9.5): Breathing reminders and countdown cues.
10. **Completion** (Priority 8): "Excellent. You've completed the pose."

---

## Feedback Persistence
- Candidate issue debounce: Defect must persist for at least 4 frames before replacing active guidance.
- Cooldown periods:
  - General speech cooldown: 4000ms
  - Repeat identical rule cooldown: 8000–10000ms
  - Good form praise cooldown: 6000ms
  - Safety warning cooldown: 2000ms (bypasses general cooldown)
- Duplicate suppression: Duplicate identical messages are filtered out.

---

## Completion Event Protection
- One-shot completion flag: When hold reaches 5000ms, `hasCompleted` is set to `true`.
- Completion callbacks (`onAsanaComplete`, `onPoseReviewReady`, voice event dispatch) are protected by one-shot guards.
- Subsequent animation frames in completed state do not re-trigger completion speech, duplicate modals, or duplicate database increments.

---

## requestAnimationFrame Safety
- Exactly one controlled MediaPipe RAF loop is created per camera session in `usePoseTracking.ts`.
- Lifecycle safety: RAF is explicitly cancelled on unmount, camera stop, or session reset.
- Throttling: UI state updates are throttled to 30 FPS (`~33ms`) while internal landmark tracking refs update smoothly at camera frequency.
- Re-render protection: Loop execution does not depend on changing React state objects.

---

## React State Safety
- Prevents "Maximum update depth exceeded" errors.
- High-frequency tracking data uses React `useRef` rather than state setters.
- Camera readiness state changes are deduplicated before triggering state updates.
- Session state machine transitions are guarded against illegal cycles.

---

## Performance
- Static catalog configurations and canonical IDs are cached in memory.
- Rules are registered once per asana using `ensureAsanaRules()`.
- Evaluator instances are preserved across frames with `.reset()` on asana changes.
- Object allocations in the inner frame loop are minimized.

---

## Tests
Comprehensive test suite located at:
`frontend/src/features/ai-coach/analysis/__tests__/Phase4RuntimeCoaching.test.ts`

Covering all 23 core scenarios:
1. Wrong pose cannot start hold.
2. Wrong pose cannot complete.
3. Correct identity + accuracy < 75% cannot start hold.
4. Correct identity + accuracy $\ge 75\%$ starts hold.
5. Identity breaks during hold $\rightarrow$ hold resets to 0 immediately.
6. Tracking validity breaks during hold $\rightarrow$ hold resets to 0.
7. Form validity breaks during hold $\rightarrow$ hold resets to 0.
8. Identity recovers after reset $\rightarrow$ fresh full 5-second hold begins from 0.
9. 5000ms continuous valid hold $\rightarrow$ completion.
10. Completion fires exactly once.
11. Premature single-frame accuracy spike cannot complete.
12. Stale accuracy cannot complete without valid live tracking landmarks.
13. Feedback priority hierarchy enforces Safety > Camera > Form Correction > Good Form.
14. Duplicate feedback within cooldown period is suppressed.
15. Completion voice event is fired once per asana.
16. Session state machine transitions cleanly from completion to pose review and user choice.
17. State machine rejects illegal transitions.
18. HoldStateMachine start() resets state cleanly without dangling timers.
19. FeedbackEngine arbitrates multiple issues deterministically.
20. Existing Phase 1 identity validation passes.
21. Existing Phase 1.5 threshold (75%) passes.
22. Existing Phase 2 accuracy stabilization passes.
23. Existing Phase 3 catalog tests pass (170 asanas).

---

## Regression Results
- `npm test`: **389 passed / 0 failed** (76 suites)
- `npm run typecheck`: **PASS** (0 TypeScript errors)
- `npm run build`: **PASS** (Vite production bundle built successfully)
- `npm run validate:asanas`: **PASS** (170/170 asanas validated)

---

## Remaining Limitations
- Single 2D camera perspective can cause depth ambiguity for complex rotational poses without multi-angle setups.
- Extreme low-light environments may reduce landmark visibility confidence.
- Mat boundaries and loose clothing can occasionally reduce ankle/wrist landmark confidence.
