I uploaded `yoga-pose-recognition-mediapipe.ipynb`.

Study the notebook and use its pose-analysis approach as a reference, especially:

- calculateAngle()
- landmark-based joint angle calculation
- Warrior II detection
- Tree Pose detection
- T-Pose detection
- landmark relationships
- geometric threshold-based posture evaluation

Do NOT copy the old notebook architecture directly.

My current project is:
https://github.com/arijit477/ai-yoga-coach

The project already uses React + TypeScript + MediaPipe Tasks Vision for browser-side realtime pose detection.

GOAL:
Improve the existing posture detection engine using the useful geometry/analysis approach from the notebook and introduce OpenCV where it provides value.

ARCHITECTURE:

Camera
→ MediaPipe Pose Landmarker
→ Landmark Processing
→ OpenCV-based camera/image quality checks where appropriate
→ Posture Measurements
→ Existing PoseRule Engine
→ Posture Check
→ Visual Corrections
→ AI Coach

IMPORTANT:

Do NOT replace MediaPipe with Python MediaPipe.

Do NOT send camera frames continuously to the backend.

Do NOT create a second MediaPipe loop.

Do NOT create a second requestAnimationFrame loop.

Do NOT rewrite the entire existing pose engine.

==================================================
1. AUDIT EXISTING IMPLEMENTATION
==================================================

First inspect:

- MediaPipe implementation
- usePoseTracking
- LandmarkUtils
- RuleEvaluator
- current angle calculations
- distance calculations
- alignment calculations
- smoothing
- posture scoring
- asana rules
- Posture Check UI

Compare the current implementation with the uploaded notebook.

Identify what useful logic from the notebook is missing.

==================================================
2. IMPROVE ANGLE CALCULATION
==================================================

Use a robust reusable angle calculation based on three landmarks.

Support:

- knee
- elbow
- shoulder
- hip
- ankle
- neck/head relationships

Do not blindly use the notebook's old implementation.

Normalize the resulting angle consistently to:

0–180 degrees

Handle:

- invalid landmarks
- low visibility
- missing landmarks
- mirrored camera
- left/right orientation

==================================================
3. ADD ROBUST BODY MEASUREMENTS
==================================================

Create reusable measurements for:

- joint angles
- distances
- horizontal alignment
- vertical alignment
- shoulder balance
- hip balance
- torso/spine alignment
- head position
- neck alignment

Keep these utilities independent from individual asanas.

==================================================
4. IMPROVE POSTURE CHECK
==================================================

Create:

POSTURE CHECK

- Head Position
- Neck Alignment
- Shoulder Balance
- Left Elbow
- Spine Alignment
- Hip Position

Each item should return:

good
warning
critical
unknown

No angle numbers should be displayed in the UI.

The underlying angle measurements remain available internally.

==================================================
5. ASANA-SPECIFIC RULES
==================================================

Use the notebook's Warrior II logic as a reference.

Do NOT hardcode Warrior II directly into the UI.

Instead create/configure PoseRules.

Example:

Warrior II:

- arms extended
- elbows approximately straight
- shoulder/arm alignment
- front knee bend
- rear leg straight
- hip positioning
- torso alignment

Tree Pose:

- standing leg stability
- raised-leg position
- hip alignment
- torso alignment
- head/neck position

Use the existing data-driven PoseRule architecture.

==================================================
6. OPENCV INTEGRATION
==================================================

Before adding OpenCV, determine exactly where it improves the current system.

Use OpenCV.js only for useful CV operations such as:

- brightness/lighting estimation
- blur/image-quality detection
- camera tilt estimation
- frame-quality checks
- optional image preprocessing

Do NOT use OpenCV to duplicate MediaPipe pose detection.

Do NOT process unnecessary full-resolution frames if a smaller frame is sufficient.

Keep processing lightweight enough for realtime browser performance.

==================================================
7. CAMERA READINESS

Use the CV layer together with MediaPipe state to improve:

- camera available
- lighting acceptable
- person visible
- full body visible
- feet visible
- camera tilted
- user too close
- user too far

Return structured state instead of directly changing UI.

Example:

CameraReadinessResult {
  cameraReady,
  lighting,
  bodyVisible,
  fullBodyVisible,
  cameraTilt,
  distanceStatus
}

==================================================
8. TEMPORAL STABILITY

All posture states must use the existing smoothing/temporal validation.

Do not allow:

GOOD
→ WARNING
→ GOOD
→ WARNING

on every frame.

Require a condition to persist before changing the displayed Posture Check state.

Keep live posture corrections responsive while preventing UI flicker.

==================================================
9. ACCURACY

Do NOT make the circular accuracy a frame-by-frame UI value.

Continue calculating posture scores internally.

During the asana:
- live posture analysis continues
- corrections continue
- accuracy is collected internally

When the asana completes:
- calculate final stable accuracy
- update the circular accuracy once
- keep the final value visible

==================================================
10. AI COACH

The AI Coach must use the same posture-analysis result.

Example:

Posture Check:
⚠ Left Elbow

AI Coach:
"Your left elbow needs a little adjustment."

When fixed:

Posture Check:
● Left Elbow

AI Coach:
"That's it. Much better."

Do not create separate detection logic for the voice agent.

==================================================
11. PERFORMANCE

Maintain a single realtime processing pipeline.

Avoid unnecessary React state updates.

Keep heavy calculations outside the render cycle.

Do not introduce additional RAF loops.

Do not cause the existing Maximum update depth issue.

==================================================
12. VALIDATION

Test at minimum:

1. Warrior II
2. Tree Pose
3. T-Pose

For each:

- correct posture
- incorrect knee
- incorrect elbow
- shoulder imbalance
- hip imbalance
- torso/spine deviation
- head/neck deviation
- low-confidence landmarks
- user moving
- temporary tracking loss

Verify:

MediaPipe remains stable.
Posture Check updates correctly.
Corrections are meaningful.
OpenCV does not introduce noticeable latency.
Circular accuracy remains stable during the pose.
Final accuracy updates when the asana completes.
AI Coach receives the same posture state.

Run TypeScript/build checks after implementation.

Before making code changes, provide a short audit of the current architecture and explain exactly where OpenCV and the notebook-derived logic will be integrated.