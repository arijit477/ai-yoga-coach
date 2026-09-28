MASTER TASK — FIX LIVE ACCURACY END-TO-END

The Live Accuracy is currently broken. The user can perform an asana correctly and MediaPipe clearly detects the body/skeleton, but Live Accuracy remains at 0% and does not update.

Example:
Prayer Pose / Pranamasana is correctly performed and tracked, but:
Live Accuracy = 0%
Alignment Goal = 75%
Status = Getting Started
The skeleton is visible and landmarks are being detected.

DO NOT blindly rewrite the system. First inspect the existing implementation and trace the COMPLETE pipeline:

MediaPipe landmarks
→ MotionFrameProcessor
→ PoseEvaluation
→ asana-specific rules
→ RuleEvaluator
→ raw accuracy
→ temporal smoothing
→ stable accuracy
→ completion threshold
→ AccuracyPanel / CircularScoreRing

FIND THE ACTUAL ROOT CAUSE before changing code.

REQUIREMENTS:

1. FIX RAW ACCURACY
- Confirm that valid MediaPipe landmarks are reaching the rule engine.
- Confirm rules are actually being evaluated.
- Confirm rule results are contributing to the score.
- Prevent missing/irrelevant landmarks from forcing the entire score to 0.
- Do not require the whole body for every asana.
- Only required body parts for the current asana should affect its accuracy.

2. FIX ASANA-SPECIFIC RULES
Each asana must define:
- required landmarks/body parts
- relevant measurements
- target values
- tolerance
- rule weight

Example:
Prayer Pose should primarily evaluate the relevant upper-body/hand/arm alignment instead of failing because unrelated knees/ankles are unavailable.

3. FIX SCORE CALCULATION
Calculate:

rawAccuracy =
sum(valid rule scores × rule weights)
/
sum(weights of evaluated rules)

Do NOT calculate accuracy using missing/unrelated rules.

A correctly performed pose must produce a meaningful score such as:
60% → 68% → 73% → 76% → 80%

not:

0% → 0% → 0%.

4. FIX TEMPORAL STABILIZATION
Do not display raw frame-by-frame accuracy directly.

Implement stable live accuracy:
- Smooth small fluctuations.
- Prevent sudden jumps.
- Allow genuine improvement to increase the score.
- Allow genuine posture changes to decrease the score.
- Do not let one good frame produce 100%.

Example:

BAD:
72 → 81 → 67 → 89 → 74 → 92

GOOD:
68 → 71 → 74 → 76 → 78 → 80

5. FIX 75% HOLD LOGIC

When stable accuracy reaches >= 75%:

Show:
"Excellent Alignment"
"Hold for 10 seconds"

Start the hold timer.

The user must maintain the required pose while accuracy remains >=75%.

If accuracy drops below the threshold, reset/pause the hold according to the existing architecture.

After 10 successful seconds:
- Trigger pose completion once.
- Trigger the existing completion animation once.
- Trigger the coach voice once.
- Do not repeatedly trigger completion every frame.

6. FIX ACCURACY UI

Keep the existing AccuracyPanel / CircularScoreRing.

Display:

0–40:
Getting Started

41–60:
Looking Better

61–74:
Almost There

75–80:
Great Alignment

81–90:
Very Good Form

91–99:
Excellent Form

100:
Perfect Hold

Colour ranges:
0–40 = Red
40–60 = Orange
60–80 = Green
80–100 = Gold

7. IMPORTANT DEBUGGING

Before finalizing, temporarily add development-only diagnostics showing:

- detected landmark count
- current asana
- number of required rules
- number of evaluated rules
- passed rules
- failed rules
- skipped rules
- raw accuracy
- stabilized accuracy
- current completion/hold state
- reason if accuracy is forced to 0

Use these diagnostics to identify the failure instead of guessing.

8. CALIBRATION

Check whether the current "LIVE • CALIBRATING" state is preventing accuracy from being calculated or displayed.

Calibration must not permanently keep the score at 0.

Once sufficient valid landmarks are available, transition into normal scoring automatically.

9. PERFORMANCE

Do not introduce React state updates on every animation frame.

Keep high-frequency pose calculations outside unnecessary React renders.

Do not recreate rule configurations or objects every frame.

Do not break MediaPipe, camera tracking, voice guidance, or existing coach functionality.

10. DO NOT CREATE DUPLICATE SYSTEMS

Do NOT create:
- another accuracy engine
- another RuleEvaluator
- another CircularProgress component
- another pose tracking system
- another voice system

Reuse the existing architecture.

11. ASANA SCALABILITY

The solution must work with the existing 174+ asanas.

Do not hardcode a special fix only for Prayer Pose.

Create/reuse a generic asana rule structure so every asana can define its own relevant body parts and scoring rules.

12. FINAL VALIDATION

After implementation, test at minimum:

- Prayer Pose
- one standing pose
- one balance pose
- one seated pose
- one pose requiring legs

Verify:
- accuracy starts updating
- score increases when alignment improves
- score decreases when posture breaks
- irrelevant missing landmarks do not force 0%
- 75% threshold works
- 10-second hold works
- completion triggers exactly once
- UI reflects the actual score

MOST IMPORTANT:

Do not tell me that the implementation is fixed just because the code compiles.

Run the application, inspect the actual runtime values, and verify that performing Prayer Pose produces a changing Live Accuracy value.

If the score is still 0%, continue tracing the pipeline until you find the exact condition causing the 0%.

Make the minimum necessary code changes and clearly report:
1. Root cause
2. Files changed
3. What was fixed
4. How the live accuracy is now calculated
5. How the 75% hold/completion flow works