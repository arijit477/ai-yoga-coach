# PHASE 4 — REAL-TIME POSE VALIDATION, HOLD STABILITY & HUMAN-LIKE COACHING FLOW

## IMPORTANT CONTEXT

The project has already implemented:

Phase 1
- Pose Identity Validation
- Canonical Asana ID resolution
- Stance validation
- Landmark validation
- Pose-specific identity rules

Phase 1.5
- Identity-gated completion eligibility
- 75% accuracy threshold
- 5-second continuous hold
- Hold reset when identity/accuracy becomes invalid

Phase 2
- Weighted accuracy calculation
- Coverage protection
- NaN/Infinity protection
- Temporal accuracy stabilization
- Outlier rejection
- Score hysteresis

Phase 3
- 170-asana rule coverage
- Pose families
- PoseRuleFactory
- Pose-specific form rules
- Critical rules

Phase 3.5
- Rule quality / false-positive audit was attempted
- The generated audit report has known reporting problems
- DO NOT rely on its numerical claims as proof of accuracy

The current goal is to improve the ACTUAL REAL-TIME COACHING FLOW.

============================================================
PHASE 4 OBJECTIVE
============================================================

Build a robust real-time validation and coaching state pipeline so the
AI Yoga Coach behaves more like a human yoga instructor.

The desired behavior is:

USER SELECTS ASANA
        ↓
AI COACH INTRODUCES THE ASANA
        ↓
VOICE GUIDES USER INTO POSITION
        ↓
USER MOVES TOWARD THE POSE
        ↓
SYSTEM DETERMINES:
"Is the user actually performing the selected pose?"
        ↓
If NO:
    Continue guidance
    No completion
    No hold
        ↓
If YES:
    Evaluate form accuracy
        ↓
Accuracy ≥ 75%
        ↓
START 5-SECOND HOLD
        ↓
Continuously verify:
    - pose identity
    - required landmarks
    - form accuracy
    - tracking confidence
        ↓
If any required condition breaks:
    HOLD RESETS
        ↓
If valid for full 5 seconds:
    COACH ANNOUNCES COMPLETION
        ↓
ASANA COMPLETED POPUP
        ↓
NEXT ASANA

============================================================
CRITICAL PRINCIPLE
============================================================

Do NOT treat a high accuracy score alone as proof that the asana is
being performed.

Completion requires:

IDENTITY VALID
AND
FORM VALID
AND
ACCURACY >= 75%
AND
TRACKING VALID
AND
CONTINUOUS HOLD >= 5 SECONDS

All conditions must remain valid for the entire hold.

============================================================
STEP 1 — AUDIT THE CURRENT RUNTIME FLOW
============================================================

Before modifying anything, inspect the actual implementation.

Trace the runtime path from:

Camera frame
→ MediaPipe
→ landmarks
→ PoseEvaluator
→ PoseIdentityValidator
→ form evaluation
→ accuracy
→ AccuracyStabilizer
→ AsanaCompletionGate
→ useCoachSession
→ hold state
→ completion
→ PoseReviewModal
→ next asana

Inspect:

- usePoseTracking.ts
- useCoachSession.ts
- PoseEvaluator.ts
- TemporalPoseEvaluator.ts
- PoseIdentityValidator.ts
- AsanaCompletionGate.ts
- AccuracyPipeline.ts
- AccuracyStabilizer.ts
- AccuracyCalculator.ts
- RuleEngine.ts
- StanceDetector.ts
- PoseReviewModal.tsx
- AICoachPage.tsx
- voice/coaching services
- any session state machine

DO NOT assume the previous reports are completely accurate.

Use the actual source code as the source of truth.

============================================================
STEP 2 — CREATE ONE AUTHORITATIVE FRAME RESULT
============================================================

Create or improve a single runtime result representing the current
frame/session state.

For example:

PoseFrameState

containing conceptually:

- asanaId
- canonicalAsanaId
- identity
- stance
- tracking
- accuracy
- form validity
- completion eligibility
- failure reason
- timestamp

Do not duplicate the same calculations in multiple hooks.

The runtime should have one authoritative answer to:

"Is this frame valid for completion?"

============================================================
STEP 3 — DEFINE COMPLETION ELIGIBILITY
============================================================

Completion eligibility must be:

identity.isMatch === true
AND
identity confidence is acceptable
AND
required landmarks are valid
AND
form evaluation is valid
AND
accuracy >= 75%

Do NOT start the hold merely because:

accuracy >= 75%

This is extremely important.

============================================================
STEP 4 — HOLD STATE MACHINE
============================================================

Implement or verify an explicit hold state machine.

States:

IDLE
↓
POSITIONING
↓
POSE_DETECTED
↓
HOLDING
↓
COMPLETED

Possible transitions:

IDLE
→ POSITIONING

POSITIONING
→ POSE_DETECTED

POSE_DETECTED
→ HOLDING
when all completion conditions become valid

HOLDING
→ HOLDING
while all conditions remain valid

HOLDING
→ POSITIONING
if identity/form/tracking becomes invalid

HOLDING
→ COMPLETED
after 5000ms of continuous validity

COMPLETED
→ next asana / user choice

Do not allow:

HOLDING → COMPLETED

unless the complete 5000ms interval was continuously valid.

============================================================
STEP 5 — TRUE CONTINUOUS HOLD
============================================================

The hold timer must measure actual continuous validity.

Correct:

t = 0
identity = true
accuracy = 80
tracking = valid

t = 1s
identity = true
accuracy = 82
tracking = valid

t = 2s
identity = true
accuracy = 78
tracking = valid

t = 3s
identity = true
accuracy = 81
tracking = valid

t = 4s
identity = true
accuracy = 79
tracking = valid

t = 5s
→ COMPLETED

If at 3.2 seconds:

identity = false

then:

hold = 0
candidateSince = null
state = positioning

The timer must NOT resume from 3.2 seconds later.

============================================================
STEP 6 — TEMPORARY CAMERA/TRACKING LOSS
============================================================

Do NOT allow the accuracy grace period to automatically mean the
completion hold remains valid.

Accuracy stabilization and completion eligibility are separate.

Example:

Temporary tracking loss:

Accuracy UI:
    may temporarily preserve the previous score

Completion:
    must evaluate whether the required identity/form evidence is still
    valid.

Do not complete an asana using stale landmarks.

============================================================
STEP 7 — SCORE VS IDENTITY
============================================================

Maintain this distinction:

IDENTITY:

"Is this the selected asana?"

FORM SCORE:

"How well is the selected asana being performed?"

Example:

Selected:
Cobra

User lies flat:

Possible form-like generic measurements:
    80%

But:

identity:
    false

Therefore:

completion:
    false

hold:
    0

Do not allow a generic score to override identity.

============================================================
STEP 8 — FEEDBACK PRIORITIZATION
============================================================

Implement deterministic feedback priority.

Priority:

1. No person / tracking unavailable
2. Wrong pose / identity mismatch
3. Major pose/form error
4. Moderate form correction
5. Minor correction
6. Correct pose
7. Hold in progress
8. Completion

Only one primary correction should be presented at a time.

Avoid voice spam.

Example:

BAD:

"Straighten your knee"
"Lift your chest"
"Align your shoulder"
"Fix your hip"
"Straighten your spine"

all within a short interval.

GOOD:

"Lift your chest slightly."

Then wait for the user to respond.

============================================================
STEP 9 — FEEDBACK PERSISTENCE
============================================================

Feedback must not change every frame.

Implement/verify temporal persistence:

If a correction appears:

- require persistence before changing it
- use cooldown
- avoid repeating identical messages
- prioritize meaningful changes

The coach should sound like a human instructor.

============================================================
STEP 10 — HOLD FEEDBACK
============================================================

When hold begins:

Voice:

"Great. Hold here."

Then optionally:

"Keep breathing."

Avoid repeating this every frame.

At completion:

"Excellent. You've completed the pose."

Then show the existing completion popup.

Do NOT redesign the popup.

============================================================
STEP 11 — COMPLETION EVENT MUST FIRE ONCE
============================================================

During the 5-second hold:

Do NOT trigger completion multiple times.

Use a completion guard/ref/state transition.

After completion:

additional animation frames must not:

- restart completion
- replay completion voice
- show multiple popups
- increment completion count multiple times

============================================================
STEP 12 — PREVENT PREMATURE COMPLETION
============================================================

Specifically test these scenarios in code:

Scenario A:

User has not reached selected pose.

Expected:

identity = false
hold = 0
completion = false

Scenario B:

Identity true but accuracy = 70%.

Expected:

hold = 0
completion = false

Scenario C:

Identity true
accuracy = 80%

Expected:

hold starts.

Scenario D:

Identity true
accuracy = 80%
hold = 3 seconds
identity becomes false.

Expected:

hold resets to 0.

Scenario E:

Identity becomes valid again.

Expected:

new 5-second hold begins.

Scenario F:

Valid continuous hold reaches 5 seconds.

Expected:

completion fires exactly once.

Scenario G:

User reaches 75% for one frame only.

Expected:

hold does not complete.

Scenario H:

Accuracy oscillates:

74
76
74
76
74
76

Expected:

hold should only progress when the actual completion eligibility
condition remains continuously valid according to the existing
stabilized accuracy behavior.

============================================================
STEP 13 — PREVENT FALSE POSITIVE COMPLETION
============================================================

Test high-risk examples:

Cobra selected:
- standing
- sitting
- lying flat
- random movement

Tree selected:
- standing normally
- two feet on ground

Warrior II selected:
- standing normally
- narrow stance
- unrelated standing pose

Lotus selected:
- normal sitting
- legs not correctly positioned

Downward Dog selected:
- tabletop
- plank
- standing

Expected:

NO completion.

Do not hard-code these poses.

Use the existing identity/rule architecture.

============================================================
STEP 14 — REACT STATE SAFETY
============================================================

The previous project encountered:

"Maximum update depth exceeded"

Do NOT reintroduce this.

In particular inspect:

usePoseTracking.ts
useCoachSession.ts

Look for:

- setState inside requestAnimationFrame
- effects depending on state they update
- unstable object dependencies
- unstable callback dependencies
- effects recreated every render
- multiple animation loops
- missing cleanup
- multiple subscriptions

The real-time frame loop should not continuously force React renders.

Prefer refs for high-frequency runtime state where appropriate.

React state should be updated only when UI-visible state actually
changes.

============================================================
STEP 15 — REQUESTANIMATIONFRAME SAFETY
============================================================

There must be exactly one controlled pose-processing loop for the
camera/session.

Ensure:

- animation frame is scheduled once
- cleanup cancels it
- unmount stops it
- camera stop stops it
- session stop stops it
- no duplicate loops are created by re-renders

Do not create nested requestAnimationFrame chains accidentally.

============================================================
STEP 16 — PERFORMANCE
============================================================

The runtime loop should avoid:

- unnecessary React setState
- full catalog searches
- rule registration every frame
- recreating evaluators every frame
- creating large arrays every frame
- repeated canonical ID resolution
- repeated configuration parsing

Cache static configuration where appropriate.

============================================================
STEP 17 — TESTS
============================================================

Create:

frontend/src/features/ai-coach/analysis/__tests__/Phase4RuntimeCoaching.test.ts

Cover:

1. Wrong pose cannot start hold.
2. Wrong pose cannot complete.
3. Correct identity + accuracy <75 cannot start hold.
4. Correct identity + accuracy >=75 starts hold.
5. Identity breaks during hold → reset.
6. Tracking validity breaks during hold → reset.
7. Form validity breaks during hold → reset.
8. Identity recovers → fresh 5-second hold.
9. 5000ms continuous valid hold → completion.
10. Completion fires once.
11. Premature single-frame accuracy spike cannot complete.
12. Stale accuracy cannot complete without valid identity.
13. Feedback is prioritized.
14. Duplicate feedback is suppressed.
15. Completion voice/event is fired once.
16. Session transition after completion works.
17. requestAnimationFrame loop is cleaned up.
18. No duplicate processing loop is created.
19. React state update loop cannot recursively trigger itself.
20. Existing Phase 1 identity tests pass.
21. Existing Phase 1.5 hold tests pass.
22. Existing Phase 2 accuracy tests pass.
23. Existing Phase 3 catalog tests pass.

============================================================
STEP 18 — REGRESSION
============================================================

Run:

npm test
npm run typecheck
npm run build
npm run validate:asanas

Do not invent results.

Report exact numbers.

============================================================
STEP 19 — DOCUMENTATION
============================================================

Create:

docs/PHASE_4_REALTIME_COACHING_FLOW.md

Include:

# Phase 4 — Real-Time Pose Validation & Human-Like Coaching Flow

## Objective

## Existing Runtime Architecture

## Frame Evaluation Pipeline

## Completion Eligibility

## Hold State Machine

## Continuous Hold Logic

## Identity vs Form

## Tracking Loss Handling

## Feedback Priority

## Feedback Persistence

## Completion Event Protection

## requestAnimationFrame Safety

## React State Safety

## Performance

## Tests

## Regression Results

## Remaining Limitations

============================================================
FINAL REPORT
============================================================

At the end report:

PHASE:
4

FILES MODIFIED:
list exact files

FILES ADDED:
list exact files

FILES REMOVED:
list exact files

HOLD LOGIC:
PASS / FAIL

IDENTITY GATING:
PASS / FAIL

75% THRESHOLD:
PRESERVED / CHANGED

5000ms HOLD:
PRESERVED / CHANGED

COMPLETION EVENT:
PASS / FAIL

DUPLICATE COMPLETION PROTECTION:
PASS / FAIL

FEEDBACK PRIORITIZATION:
PASS / FAIL

VOICE COOLDOWN:
PASS / FAIL

RAF SAFETY:
PASS / FAIL

REACT STATE SAFETY:
PASS / FAIL

TESTS:
X passed / X failed

TYPECHECK:
PASS / FAIL

BUILD:
PASS / FAIL

CATALOG:
X/170

============================================================
STRICT RULES
============================================================

1. Do not redesign the UI.

2. Do not remove PoseReviewModal.

3. Do not remove completion popup.

4. Do not remove the 75% threshold.

5. Do not change 5000ms hold duration.

6. Do not bypass PoseIdentityValidator.

7. Do not bypass AsanaCompletionGate.

8. Do not make accuracy alone sufficient for completion.

9. Do not create another independent completion mechanism.

10. Do not create another requestAnimationFrame loop.

11. Do not fix unrelated cleanup issues.

12. Do not implement Phase 5.

STOP after Phase 4.