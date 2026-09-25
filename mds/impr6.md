STEP 6 — SESSION STATE MACHINE, CAMERA VALIDATION, GUIDE VIDEO AND CALIBRATION FLOW

Continue from the completed Step 1–5 implementation.

Current pipeline:

Camera
→ MediaPipe
→ Landmark Validation
→ Confidence Handling
→ Temporal Smoothing
→ Pose Feature Engine
→ Rule Engine
→ PoseEvaluation
→ Posture Check / Corrections / Accuracy / 75% Completion

Now implement the session-flow layer.

IMPORTANT:

- Do NOT create another MediaPipe pipeline.
- Do NOT create another camera pipeline.
- Do NOT modify the existing RAF loop.
- Do NOT modify the Rule Engine unless required for integration.
- Do NOT modify PoseFeatures.
- Do NOT add an ML model.
- Do NOT implement OpenAI coaching events yet.
- Do NOT change Alice/Kevin voice behavior yet.
- Do NOT unnecessarily redesign the existing UI.
- Inspect the current session/state/store/components before changing anything.

==================================================
1. SESSION STATE MACHINE
==================================================

Replace scattered boolean-driven session flow with an explicit typed state machine where practical.

Use these states:

idle
guide_video
get_ready
camera_check
hold_still
calibrating
coaching
correcting
holding
pose_review
user_choice
completed

Create explicit allowed transitions.

Expected flow:

idle
→ guide_video
→ get_ready
→ camera_check
→ hold_still
→ calibrating
→ coaching

During coaching:

coaching
↔ correcting
coaching
↔ holding

When PoseEvaluation reaches completion criteria:

coaching/correcting/holding
→ pose_review
→ user_choice

From user_choice:

next pose
→ get_ready

stay here
→ coaching

end session
→ completed

Do not allow arbitrary state transitions.

==================================================
2. SINGLE SOURCE OF SESSION STATE
==================================================

Identify the existing Zustand/store/state implementation.

Use the existing store if appropriate.

Do not create multiple competing session-state stores.

Session state should contain only session-level information.

Keep these separate:

Camera state
Pose analysis state
Session state
AI voice state

Do not mix them.

==================================================
3. CAMERA STATE
==================================================

Create/use explicit camera states:

camera_disabled
camera_starting
camera_ready
camera_checking
camera_partial
camera_no_pose
camera_error

Do not equate:

camera_no_pose
with
session_completed

Do not equate:

camera_partial
with
posture_incorrect

==================================================
4. CAMERA VALIDATION
==================================================

Use the existing validated/smoothed landmark output from Step 2.

Do NOT create another detector.

Implement a reusable camera readiness evaluator.

It should determine whether the body visibility is sufficient for the current session/asana.

At minimum evaluate:

- head visibility
- shoulders
- torso/hips
- knees
- ankles/feet

Do not require every landmark in every situation if the asana does not need it.

Keep this generic.

The result should contain:

camera readiness
missing body regions
confidence information
user-facing guidance key

Example:

{
  ready: false,
  missing: ["feet"],
  guidance: "move_back"
}

Do not hardcode long UI sentences inside the analysis layer.

==================================================
5. CAMERA GUIDANCE
==================================================

Map camera validation states to existing UI.

Examples:

No body:
"Please move into the camera frame."

Partial body:
"Move back slightly so I can see your full body."

Feet missing:
"Make sure your feet are visible."

Poor confidence:
"Adjust your position or lighting."

Camera ready:
"Ready for Yoga."

Do not generate voice in this step.

==================================================
6. GUIDE VIDEO
==================================================

Use the existing guide video implementation.

Guide video should be separate from the active AI Coach.

Requirements:

- show guide video before active coaching
- allow Skip
- allow completion
- when video ends or is skipped, transition to get_ready
- do not restart camera unnecessarily
- do not restart MediaPipe unnecessarily
- do not restart avatar unnecessarily

The guide video is instructional content, not the live AI avatar.

==================================================
7. GET READY
==================================================

When entering get_ready:

- ensure camera is running
- ensure MediaPipe is running
- reset current asana-specific completion state
- reset final accuracy buffer
- reset hold state
- reset correction persistence
- preserve session/camera lifecycle

Then transition to camera_check.

==================================================
8. CAMERA CHECK
==================================================

During camera_check:

Use the existing pose tracking output.

Wait until camera readiness is satisfied.

If not ready:
remain in camera_check.

Do NOT start posture scoring/completion.

Once ready:
transition to hold_still.

==================================================
9. HOLD STILL
==================================================

Implement a short stability period before calibration.

Target approximately 2–3 seconds.

Use existing temporal stability/landmark data.

Do NOT create another RAF loop.

The countdown should only begin when:

- required body regions are visible
- landmark confidence is sufficient
- body position is stable enough

If stability is lost:

reset/pause the countdown appropriately.

Do not crash or restart MediaPipe.

==================================================
10. CALIBRATING
==================================================

During calibration:

- collect a short stable window of valid PoseEvaluation/PoseFeatures data
- establish a reliable starting state
- verify required landmarks/features remain available

Do not classify the calibration pose as a completed asana.

Do not trigger:
- completion
- final score
- coaching correction

until calibration is complete.

When calibration succeeds:
→ coaching

==================================================
11. COACHING
==================================================

When entering coaching:

- use current PoseEvaluation
- enable posture feedback
- enable correction UI
- enable internal score evaluation
- enable optional hold tracking

Do not start OpenAI voice event logic yet.

==================================================
12. CORRECTING
==================================================

This is a presentation/session state.

Enter correcting when:
- a stable primaryIssue exists
- correction should be shown

Return to coaching when:
- issue is resolved
- no stable correction remains

Do not create a second Rule Engine.

==================================================
13. HOLDING
==================================================

Enter holding when the existing valid-pose/hold conditions are satisfied.

The hold tracker should use PoseEvaluation.

If posture becomes invalid:
- pause/reset according to the existing hold behavior
- return to correcting or coaching

IMPORTANT:

The hold duration is NOT required for 75% completion.

==================================================
14. COMPLETION
==================================================

Reuse Step 5 completion behavior.

When:

PoseEvaluation completion eligibility
AND
75% threshold/stability requirements

are satisfied:

→ pose_review

Do not require:
- 90%
- 100%
- 10-second hold

Then:

pose_review
→ user_choice

==================================================
15. USER CHOICE
==================================================

Reuse the existing completion UI where possible.

Actions:

NEXT POSE
STAY HERE
END SESSION

NEXT POSE:
- advance to next asana
- reset asana-specific state
- transition to get_ready
- preserve camera
- preserve MediaPipe

STAY HERE:
- preserve current asana
- reset/reinitialize only relevant completion/hold state
- transition to coaching

END SESSION:
- transition to completed
- stop session-specific processing
- do not unnecessarily destroy global camera infrastructure unless the existing UX expects camera shutdown

==================================================
16. SESSION RESET
==================================================

Create a clear distinction between:

resetCurrentAsana()
resetSession()
resetCamera()

They must not all do the same thing.

resetCurrentAsana():
- final score
- score buffer
- completion
- hold
- correction persistence
- calibration

resetSession():
- asana progression
- session metrics
- current asana
- session state

resetCamera():
- camera-specific state
- MediaPipe lifecycle only as required

Avoid accidental full resets.

==================================================
17. ERROR RECOVERY
==================================================

If camera temporarily fails:

Do not automatically:
- end session
- restart the whole application
- recreate avatar
- recreate OpenAI
- lose asana progress

Instead:

camera error/partial
→ show recovery UI
→ attempt recovery where existing architecture supports it
→ return to previous session state when camera becomes valid

If recovery is impossible:
provide an explicit user action.

==================================================
18. FULLSCREEN
==================================================

If the existing camera stage supports fullscreen:

Fullscreen must apply to the entire CameraStage:

- camera
- skeleton
- target pose card
- correction overlay
- posture/accuracy overlays
- controls

Entering/exiting fullscreen must NOT:

- restart MediaPipe
- restart camera
- reset asana
- restart avatar
- reset session

==================================================
19. TARGET POSE CARD
==================================================

Keep the existing target pose card/reference image integrated with the CameraStage.

It should show:

- asana image
- asana name
- Sanskrit name if available
- expand/enlarge control where already supported

It must remain visible in fullscreen.

Do not create a second target-pose data source.

==================================================
20. TESTS

Add tests for:

STATE TRANSITIONS:
1. idle → guide_video
2. guide_video → get_ready
3. get_ready → camera_check
4. camera_check → hold_still
5. hold_still → calibrating
6. calibrating → coaching
7. coaching → correcting
8. correcting → coaching
9. coaching → holding
10. holding → coaching
11. completion → pose_review
12. pose_review → user_choice
13. user_choice → next pose
14. user_choice → stay
15. user_choice → completed

CAMERA:
16. no body
17. partial body
18. full body
19. low confidence
20. camera recovery

RESET:
21. current asana reset
22. session reset
23. camera reset

BEHAVIOR:
24. guide video skip
25. guide video completion
26. hold stability reset
27. calibration failure
28. completion remains one-time
29. next pose does not restart camera
30. fullscreen does not reset session

==================================================
21. MANUAL TESTING

Test:

1. Open AI Coach.
2. Select an asana.
3. Play guide video.
4. Skip guide.
5. Verify Get Ready.
6. Move partially out of frame.
7. Verify camera guidance.
8. Return to full frame.
9. Verify camera ready.
10. Hold still.
11. Verify calibration.
12. Enter coaching.
13. Create posture error.
14. Verify correcting state.
15. Correct posture.
16. Verify return to coaching.
17. Reach 75%.
18. Verify pose review/completion.
19. Choose Stay Here.
20. Verify same asana continues.
21. Choose Next Pose.
22. Verify new asana starts correctly.
23. Verify camera and MediaPipe never unnecessarily restart.
24. Test fullscreen during coaching.
25. Exit fullscreen and verify session continues.

==================================================
22. DO NOT IMPLEMENT YET

Do NOT implement:

- OpenAI coaching events
- voice cooldown
- conversational AI
- dynamic avatar behavior
- 174-asana rule expansion
- freemium/subscription
- session report

Those are later phases.

==================================================
FINAL REPORT

After implementation provide:

1. Files changed
2. State machine implementation
3. State transition table
4. Camera validation implementation
5. Guide-video flow
6. Hold-still implementation
7. Calibration behavior
8. Completion integration
9. Reset behavior
10. Tests added
11. Test results
12. Build result
13. Manual testing result
14. Remaining issues