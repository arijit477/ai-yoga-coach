STEP 2 — LANDMARK VALIDATION, CONFIDENCE HANDLING AND TEMPORAL SMOOTHING

Continue from the stabilized MediaPipe tracking loop implemented in Step 1.

IMPORTANT:
- Work only on landmark validation, confidence handling, and temporal smoothing.
- Do NOT modify the Rule Engine.
- Do NOT modify scoring.
- Do NOT modify Posture Check UI.
- Do NOT modify OpenAI/Re​altime.
- Do NOT modify Alice/Kevin/avatar behavior.
- Do NOT add an ML model.
- Do NOT create another MediaPipe pipeline.
- Preserve the Step 1 single RAF loop.

First inspect the existing:
- Landmark types/interfaces
- PoseTrackingResult
- LandmarkUtils
- MediaPipe result handling
- usePoseTracking
- any existing confidence/visibility logic
- any existing smoothing logic

Reuse existing utilities where possible instead of creating duplicate implementations.

==================================================
1. LANDMARK VALIDATION
==================================================

Create a reusable landmark validation layer.

Every landmark should be classified internally as:

- VALID
- LOW_CONFIDENCE
- MISSING

Use the existing MediaPipe visibility/presence information where available.

Do not invent confidence values.

Define sensible configurable thresholds rather than scattering magic numbers.

For example, centralize configuration:

LANDMARK_CONFIDENCE_CONFIG = {
  minVisibility: ...,
  minPresence: ...,
  minCombinedConfidence: ...
}

Use the actual MediaPipe values already available in the existing implementation.

Do not assume every landmark has visibility/presence.

Handle undefined/null values safely.

==================================================
2. BODY LANDMARK GROUPS
==================================================

Create reusable landmark groups for:

- face/head
- shoulders
- elbows
- wrists
- torso
- hips
- knees
- ankles
- feet

Keep face landmarks available internally because some asanas may require head/neck orientation.

Do NOT remove face landmarks from the tracking result.

The production skeleton can continue hiding facial geometry separately.

==================================================
3. VALID LANDMARK HELPERS
==================================================

Create/reuse helpers such as:

isLandmarkValid()
getLandmarkConfidence()
isLandmarkUsable()
getLandmarkStatus()

The helpers must not throw when:
- landmark is missing
- visibility is undefined
- presence is undefined
- landmark array is incomplete

==================================================
4. POSE VALIDITY
==================================================

Add a structured pose validity result.

It should distinguish:

- no_pose
- partial_pose
- valid_pose

Do not use a single boolean for all cases.

For example:

VALID_POSE:
required landmarks have sufficient confidence

PARTIAL_POSE:
person detected but important landmarks are missing/low confidence

NO_POSE:
no usable person detected

Keep this generic.

Do NOT hardcode one asana's required landmarks yet.

==================================================
5. TEMPORAL SMOOTHING
==================================================

Implement temporal landmark smoothing using an EMA-style filter.

Requirements:

- smooth x/y/z independently
- preserve visibility/presence/confidence separately
- configurable smoothing factor
- no smoothing across unrelated people/session resets
- reset smoothing state when camera/session tracking is restarted
- do not introduce noticeable input lag
- do not smooth invalid landmarks as if they were valid

Suggested behavior:

If current landmark is valid:
    smoothed = alpha * current + (1 - alpha) * previous

If current landmark is invalid:
    do not replace it with fabricated coordinates.

Use the previous valid smoothed value only according to an explicit, configurable grace policy.

Do not allow stale landmarks to persist indefinitely.

==================================================
6. TEMPORAL GRACE PERIOD
==================================================

Implement a short configurable grace period for temporary landmark loss.

Example:

A landmark can temporarily disappear for a small number of frames without causing immediate jitter/flicker.

After the grace period:
    mark the landmark unavailable.

Do NOT keep stale coordinates indefinitely.

The exact frame count should be configurable.

==================================================
7. CONFIDENCE-AWARE SMOOTHING
==================================================

Higher-confidence landmarks should influence the smoothed position more strongly.

Low-confidence landmarks should not cause large sudden movements in the smoothed output.

However:

- do not silently convert low-confidence landmarks into valid landmarks
- preserve their confidence/status metadata

==================================================
8. OUTPUT CONTRACT
==================================================

Keep the existing PoseTrackingResult compatible wherever possible.

If necessary, extend it with structured validation metadata rather than breaking existing consumers.

The output should conceptually provide:

{
  landmarks,
  worldLandmarks,
  timestamp,
  confidence,
  validity,
  landmarkStatuses
}

Where:

validity:
    "no_pose" | "partial_pose" | "valid_pose"

landmarkStatuses:
    per-landmark status/confidence information

Do not put UI-specific data into this layer.

==================================================
9. IMPORTANT: NO DUPLICATE TRACKING LOOP
==================================================

The smoothing/validation layer must run INSIDE the existing pose-processing flow.

Do NOT create:
- another requestAnimationFrame
- another MediaPipe instance
- another camera listener
- another independent pose detector

There must remain exactly one MediaPipe tracking pipeline.

==================================================
10. PERFORMANCE
==================================================

This code executes at camera frame rate.

Avoid:
- unnecessary array allocations
- unnecessary React state updates
- unnecessary object recreation
- logging every frame
- expensive calculations inside the tracking loop

Keep high-frequency mutable state in refs where appropriate.

Only publish meaningful pose results to React/store consumers according to the existing architecture.

==================================================
11. RESET BEHAVIOR
==================================================

When:
- camera stops
- camera restarts
- MediaPipe is recreated
- AI Coach tracking session is reset

clear the smoothing state.

Do not allow landmarks from the previous camera session to leak into the new session.

==================================================
12. TESTING
==================================================

Add unit tests for:

1. Valid landmark
2. Missing landmark
3. Undefined visibility
4. Low visibility
5. Low presence
6. Valid pose
7. Partial pose
8. No pose
9. EMA smoothing
10. Temporary landmark loss
11. Grace-period expiration
12. Smoothing reset
13. Camera/session reset
14. Low-confidence landmark does not create a large position jump

Run:
- TypeScript/build checks
- existing tests
- new landmark tests

Then manually verify:

1. Start camera.
2. Stand still.
3. Observe landmark/skeleton stability.
4. Move slowly.
5. Move quickly.
6. Move partially outside frame.
7. Move feet outside frame.
8. Return to full frame.
9. Stop camera.
10. Restart camera.

Expected behavior:

- skeleton should be noticeably less jittery
- temporary landmark loss should not immediately cause violent jumps
- missing landmarks should not be fabricated
- returning to frame should recover naturally
- camera restart should reset smoothing
- no duplicate MediaPipe loops
- no Maximum update depth error
- no unnecessary avatar restart
- no OpenAI session restart

Do NOT proceed to Rule Engine or scoring changes.

After implementation report:

1. Files changed
2. Existing utilities reused
3. Validation strategy
4. Confidence thresholds introduced
5. Smoothing method and parameters
6. Grace-period behavior
7. Tests run
8. Build result
9. Any remaining issues