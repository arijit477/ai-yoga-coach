STEP 5 — CONNECT POSEEVALUATION TO POSTURE CHECK, LIVE CORRECTIONS, STABLE ACCURACY AND 75% COMPLETION

Continue from the completed Step 1–4 implementation.

Current pipeline:

Camera
→ MediaPipe
→ Landmark Validation
→ Confidence Handling
→ Temporal Smoothing
→ Pose Feature Engine
→ Rule Engine
→ PoseEvaluation

Now connect PoseEvaluation to the existing AI Coach UI and session flow.

IMPORTANT:

- Do NOT create another MediaPipe pipeline.
- Do NOT create another pose-analysis pipeline.
- Do NOT calculate posture independently inside React components.
- Do NOT calculate angles inside UI components.
- Do NOT create an ML model.
- Do NOT modify OpenAI/Re​altime yet.
- Do NOT modify Alice/Kevin/avatar lifecycle.
- Reuse the existing UI components and stores wherever possible.
- Inspect existing components before creating new ones.
- Preserve the existing camera/RAF architecture.

==================================================
1. SINGLE SOURCE OF TRUTH
==================================================

PoseEvaluation is now the single source of truth for:

- Posture Check
- live corrections
- visible accuracy state
- completion eligibility
- hold eligibility

UI components must consume PoseEvaluation.

They must NOT independently calculate:

- angles
- distances
- alignment
- posture status
- score

==================================================
2. POSTURE CHECK
==================================================

Connect the existing Posture Check UI to PoseEvaluation.

Display:

POSTURE CHECK

- Head Position
- Neck Alignment
- Shoulder Balance
- Left Elbow / Right Elbow as applicable
- Spine Alignment
- Hip Position
- Knee Position
- Ankle Position where applicable

Each item should map to:

GOOD
WARNING
BAD
UNKNOWN

Visual mapping:

GOOD:
green indicator

WARNING:
yellow indicator

BAD:
red indicator

UNKNOWN:
grey indicator

Do not show raw angle numbers.

Do not invent a posture status when the Rule Engine returns UNKNOWN.

If an asana has no applicable rule for a body area:
show UNKNOWN or omit it according to the existing UI design.

Do not create a new detection pipeline.

==================================================
3. POSTURE CHECK STABILITY
==================================================

Posture indicators must not flicker frame-to-frame.

Use the existing temporal analysis/evaluation flow.

Do not implement a second smoothing system in the UI.

If the same rule rapidly transitions:

GOOD → BAD → GOOD → BAD

use a short persistence/debounce mechanism before changing the visible status.

Keep the actual underlying PoseEvaluation accurate.

Only stabilize the UI presentation.

==================================================
4. LIVE CORRECTION
==================================================

Use:

PoseEvaluation.primaryIssue

as the source of the main correction.

When a rule fails:

- identify body part
- identify severity
- identify correction
- highlight the affected body region
- display the existing correction UI/overlay
- use existing animation/visual systems where possible

Do NOT generate correction text from raw UI calculations.

Example:

PoseEvaluation:

primaryIssue:
{
  ruleId: "warrior2.front_knee",
  bodyPart: "left_knee",
  severity: "medium",
  feedback: "Keep your front knee aligned over your ankle."
}

UI should display the correction.

==================================================
5. CORRECTION PRIORITY
==================================================

Only display ONE primary correction at a time.

Use the primaryIssue selected by the Rule Engine.

Do not show five simultaneous correction messages.

If the current primary issue is resolved:

- allow the next important issue to become primary
- avoid rapid switching

Use a short persistence/cooldown so the correction feels deliberate.

Do not modify the Rule Engine's prioritization logic unless a clear integration issue is found.

==================================================
6. BODY REGION HIGHLIGHT
==================================================

If the existing application supports skeleton/body highlighting:

map:

head
neck
shoulder
elbow
spine
hip
knee
ankle

to the corresponding MediaPipe landmark indices.

Incorrect region:
red

Improving:
yellow

Correct:
green

Do not create a second pose detector.

If a correction region cannot be safely determined:
do not render a misleading highlight.

==================================================
7. TARGET / IDEAL GUIDANCE
==================================================

If the existing architecture supports correction arrows/target lines:

use the rule's target information.

For example:

current elbow position
        ↓
target position/range
        ↓
visual guidance

Do NOT invent target geometry where the rule does not define it.

If no target visualization is available for a rule:
show textual correction only.

==================================================
8. LIVE ACCURACY VS FINAL ACCURACY
==================================================

IMPORTANT:

The circular accuracy indicator is the FINAL ASANA SCORE.

It must NOT continuously reflect every frame.

During active coaching:

PoseEvaluation.score may change internally.

The visible circular accuracy value should remain stable.

Maintain a short rolling buffer of valid PoseEvaluation scores.

Example:

82
78
81
84
80

Do not update the visible circle every frame.

==================================================
9. FINAL SCORE CALCULATION
==================================================

When the asana becomes completion eligible:

calculate the final score from a short recent buffer of valid scores.

Use a robust aggregation method such as:

- median

or

- trimmed mean

Avoid using one noisy frame.

Only include valid/evaluable scores.

If there are insufficient valid samples:
use the best available stable score according to the existing architecture.

Clamp final score:

0–100

==================================================
10. ACCURACY CIRCLE UPDATE
==================================================

When the final score is calculated:

- animate the circular progress to the final score
- update the displayed percentage
- keep it stable
- do not restart animation every render
- do not reset it because of ordinary landmark updates

The visible final score remains until the next asana begins.

When a new asana starts:

reset the final-score state.

==================================================
11. 75% COMPLETION
==================================================

Use the existing PoseEvaluation completion eligibility.

The desired product behavior is:

When accuracy reaches at least 75% with the required stability:

→ mark asana completed.

Do NOT require:

- 90%
- 100%
- 10-second hold

for completion.

The 10-second hold may remain as an optional challenge and must not block completion.

==================================================
12. THRESHOLD CROSSING
==================================================

Do not trigger completion repeatedly.

Completion should occur only when:

previous state:
score < 75%

and then:

stable evaluation:
score >= 75%

Once completed:

completedForCurrentAsana = true

Ignore subsequent frames for completion triggering.

Only reset this state when:

- next asana starts
- current asana is explicitly restarted
- session is reset

==================================================
13. COMPLETION POPUP
==================================================

Connect the completion state to the existing UI.

Show:

ASANA COMPLETED

Final Accuracy: XX%

Provide the existing user actions:

- Next Pose
- Stay Here
- End Session

Do not automatically move to the next asana.

The user must choose.

If existing UI already has these actions, reuse them.

==================================================
14. HOLD TRACKER
==================================================

Keep hold tracking separate from completion.

The flow is:

Pose becomes valid
      ↓
Optional hold tracking
      ↓
If form remains valid:
hold progresses

If form becomes invalid:
hold pauses/resets according to existing behavior.

IMPORTANT:

The hold tracker must NOT be required to reach 10 seconds before the 75% completion popup.

==================================================
15. ASANA RESET
==================================================

When a new asana starts:

reset:

- final visible accuracy
- score buffer
- completion state
- correction persistence
- posture presentation state
- optional hold timer

Do NOT reset:

- camera
- MediaPipe
- OpenAI session
- avatar

The camera and tracking pipeline must continue.

==================================================
16. SESSION CONTINUITY
==================================================

Changing asana must not:

- restart camera
- recreate MediaPipe unnecessarily
- restart avatar video
- recreate unrelated React components

Only reset the asana-specific analysis/session state.

==================================================
17. PERFORMANCE

PoseEvaluation can update frequently.

Do not force the entire AI Coach UI to render at camera frame rate.

Use appropriate selectors/memoization/refs based on the existing state architecture.

Especially isolate:

- camera
- avatar
- score display
- posture panel
- correction overlay

so a change in one does not unnecessarily recreate the others.

==================================================
18. ERROR / UNKNOWN HANDLING

If PoseEvaluation is:

UNKNOWN / insufficient confidence:

- do not show a false correction
- do not mark the pose completed
- do not increase the completion score
- show a neutral state where appropriate

Example:

"Move slightly back so I can see your full body."

But do not add voice behavior in this step.

==================================================
19. TESTING

Add tests for:

POSTURE CHECK:
1. GOOD mapping
2. WARNING mapping
3. BAD mapping
4. UNKNOWN mapping
5. missing rule

CORRECTIONS:
6. primaryIssue displayed
7. correction changes when issue resolves
8. correction does not flicker rapidly
9. only one primary correction shown

ACCURACY:
10. score does not update circle every frame
11. valid score buffer
12. final median/aggregation
13. score clamped 0–100
14. final score remains stable

COMPLETION:
15. score below 75 does not complete
16. crossing 75 completes
17. completion fires only once
18. 90/100 is not required
19. 10-second hold is not required
20. new asana resets completion state

SESSION:
21. next asana resets asana state
22. camera remains active
23. MediaPipe remains active
24. avatar remains active

UNKNOWN:
25. low confidence does not complete
26. missing landmark does not generate false correction

==================================================
20. MANUAL VALIDATION

Test at minimum:

Mountain Pose
Tree Pose
Warrior II

For each:

1. Start asana.
2. Perform correct posture.
3. Introduce one intentional posture error.
4. Confirm Posture Check changes.
5. Confirm the correct body region is highlighted.
6. Confirm one primary correction appears.
7. Correct the posture.
8. Confirm correction clears/changes.
9. Reach >=75%.
10. Confirm Asana Completed appears.
11. Confirm final accuracy updates once.
12. Confirm score remains stable.
13. Click Stay Here.
14. Confirm session remains on same asana.
15. Click Next Pose.
16. Confirm asana-specific state resets.
17. Confirm camera/MediaPipe/avatar do not restart.

==================================================
21. DO NOT IMPLEMENT YET

Do NOT implement:

- OpenAI coaching events
- voice triggering
- voice cooldown
- AI Coach conversational logic
- 174-asana rule expansion
- freemium
- session report

Those will be later phases.

==================================================
FINAL REPORT

After implementation provide:

1. Files changed
2. How PoseEvaluation is connected to Posture Check
3. How live correction uses primaryIssue
4. How accuracy buffering works
5. Final-score calculation method
6. 75% completion behavior
7. Hold behavior
8. Asana reset behavior
9. Tests added
10. Test results
11. Build result
12. Manual validation results
13. Remaining issues