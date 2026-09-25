
STEP 3 — BUILD AND STABILIZE THE POSE FEATURE ENGINE

Continue from the completed Step 1 and Step 2 implementation.

The current pipeline is:

Camera
→ MediaPipe
→ Landmark Validation
→ Confidence Handling
→ Temporal Smoothing
→ Stable Landmarks

Now implement the reusable Pose Feature Engine.

IMPORTANT:

- Do NOT modify the MediaPipe tracking loop.
- Do NOT create another MediaPipe pipeline.
- Do NOT create another requestAnimationFrame loop.
- Do NOT modify OpenAI/Re​altime.
- Do NOT modify Alice/Kevin/avatar behavior.
- Do NOT implement the Rule Engine yet.
- Do NOT implement asana-specific logic yet.
- Do NOT implement scoring yet.
- Do NOT add an ML model.
- Reuse the existing angle/distance/alignment utilities where they already exist.
- First inspect the existing implementation and consolidate duplicated calculations instead of creating competing implementations.

==================================================
1. INSPECT EXISTING IMPLEMENTATION
==================================================

Inspect the current:

- LandmarkUtils
- angle calculation utilities
- RuleEvaluator
- pose analysis utilities
- existing distance calculations
- horizontal alignment calculations
- vertical alignment calculations
- any existing body geometry utilities
- current types/interfaces

Identify what already exists and reuse it.

If an existing utility is incorrect or incomplete, fix it rather than creating a duplicate.

==================================================
2. JOINT ANGLES
==================================================

Create/reuse a generic angle calculation utility:

angle(A, B, C)

where B is the joint.

It must:
- use stable/validated landmarks
- handle missing landmarks safely
- return null/undefined when the calculation cannot be trusted
- clamp cosine input to [-1, 1] before acos
- return degrees
- avoid NaN/Infinity
- not throw

Support common yoga joints:

- left/right elbow
- left/right shoulder
- left/right hip
- left/right knee
- left/right ankle

Also allow arbitrary three-landmark combinations.

Do not hardcode asana-specific thresholds here.

==================================================
3. DISTANCE FEATURES
==================================================

Implement/reuse generic distance calculations.

Support:

- Euclidean 2D distance
- Euclidean 3D distance where appropriate
- normalized distance

Examples:

- wrist-to-wrist
- ankle-to-ankle
- hand-to-shoulder
- foot-to-hip
- shoulder width
- hip width

The feature engine should not assume a fixed image resolution.

==================================================
4. HORIZONTAL ALIGNMENT
==================================================

Implement a reusable horizontal alignment feature.

Example:

Compare the x positions of two landmarks.

Return a normalized difference rather than a UI-specific message.

Example concept:

horizontalDifference =
    abs(pointA.x - pointB.x)

Do not decide whether it is "good" or "bad" here.

The Rule Engine will decide that later.

==================================================
5. VERTICAL ALIGNMENT
==================================================

Implement a reusable vertical alignment feature.

Example:

verticalDifference =
    abs(pointA.y - pointB.y)

Again:

- return the measurement
- do not determine correctness
- do not produce coaching text

==================================================
6. BODY CENTER / BODY SCALE
==================================================

Add reusable body normalization helpers.

Calculate:

- shoulder center
- hip center
- body center where useful
- shoulder width
- hip width
- torso length

Use these for normalization.

The purpose is to prevent feature values from depending heavily on:

- camera resolution
- user distance from camera
- person's position in the frame

Do not alter the actual MediaPipe coordinates.

Create normalized derived features instead.

==================================================
7. LEFT/RIGHT ORIENTATION
==================================================

Handle left/right landmarks consistently.

Do not assume the camera is unmirrored.

The feature engine should consume the landmark coordinate system produced by the existing tracking layer.

If camera mirroring/orientation normalization already exists, reuse it.

Do not introduce a second mirroring transformation.

Document clearly which coordinate convention the feature engine expects.

==================================================
8. FEATURE RESULT CONTRACT
==================================================

Create a single reusable PoseFeatures structure.

Conceptually:

PoseFeatures {
    timestamp

    angles: {
        leftElbow
        rightElbow
        leftShoulder
        rightShoulder
        leftHip
        rightHip
        leftKnee
        rightKnee
        leftAnkle
        rightAnkle
    }

    distances: {
        shoulderWidth
        hipWidth
        wristDistance
        ankleDistance
        ...
    }

    alignments: {
        shoulderHorizontal
        hipHorizontal
        kneeHorizontal
        ...
    }

    body: {
        shoulderCenter
        hipCenter
        torsoLength
        ...
    }

    validity/confidence metadata
}

Use null for features that cannot be reliably calculated.

Do not substitute zero for missing values.

==================================================
9. FEATURE CALCULATION MUST BE SAFE
==================================================

If one landmark is missing:

Do NOT crash.

Example:

leftKneeAngle = null

while other valid features continue to calculate.

The feature engine should degrade gracefully.

==================================================
10. SEPARATE MEASUREMENT FROM EVALUATION
==================================================

This is critical.

The Pose Feature Engine answers:

"What is the measured geometry?"

Examples:

kneeAngle = 94
shoulderDifference = 0.03
hipDifference = 0.07

It must NOT answer:

"knee is wrong"
"shoulder is good"
"move your hip"

Those decisions belong to the Rule Engine.

==================================================
11. PERFORMANCE
==================================================

This executes at camera frame rate.

Avoid unnecessary allocations and expensive processing.

Do not use React state inside the feature calculation layer.

Keep this layer as pure/reusable TypeScript utilities wherever possible.

The same input landmarks should produce deterministic feature output.

==================================================
12. TESTS
==================================================

Add unit tests for:

1. 90-degree joint angle
2. 180-degree joint angle
3. 0-degree/near-zero edge case
4. Missing landmark
5. Low-confidence landmark
6. Clamped acos input
7. Distance calculation
8. Normalized distance
9. Horizontal alignment
10. Vertical alignment
11. Shoulder center
12. Hip center
13. Body scale
14. Mirrored coordinate consistency
15. Feature calculation with partial landmarks
16. No NaN/Infinity results

Use synthetic landmark data for unit tests.

Do not depend on the camera for unit tests.

==================================================
13. INTEGRATION
==================================================

Connect the feature engine to the existing pose-processing flow only after the utilities are tested.

The pipeline should become:

Raw MediaPipe landmarks
→ validation
→ confidence handling
→ temporal smoothing
→ Pose Feature Engine
→ PoseFeatures

Do not connect PoseFeatures to the Rule Engine yet.

==================================================
14. DEBUGGING SUPPORT
==================================================

If there is already an angle/debug panel, make sure it can consume the new PoseFeatures structure.

Do not expose raw geometry/debug information in the production UI.

Keep debug functionality development-only.

==================================================
15. BUILD AND VALIDATION
==================================================

After implementation:

- run TypeScript checks
- run frontend build
- run all existing tests
- run new Pose Feature Engine tests

Manually verify:
- camera still works
- landmarks still track
- smoothing still works
- no duplicate RAF loop
- no Maximum update depth error
- no camera restart
- no avatar restart
- feature calculations remain stable

Do not proceed to Rule Engine changes.

At the end provide:

1. Files changed
2. Existing utilities reused
3. New PoseFeatures interface
4. Feature categories implemented
5. Tests added
6. Test results
7. Build result
8. Any remaining issues