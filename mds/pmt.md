You are working on my AI Yoga Coach project.

Repository:
ai-yoga-coach

Goal:
Fix the Chair Pose (Utkatasana) rule geometry so that the live pose accuracy is based on meaningful biomechanical measurements.

IMPORTANT:
This is STEP 2A only.

Do NOT modify the AccuracyStabilizer.
Do NOT redesign the scoring system.
Do NOT rewrite the shared RuleEvaluator.
Do NOT make changes to all 170+ asanas.
Do NOT change unrelated poses.
Do NOT modify the UI.
Do NOT change voice-agent functionality.

We are fixing ONLY the Chair Pose rule definitions/geometry.

Current runtime debugging has confirmed that the pose pipeline is working:

- landmarkCount = 33
- rulesCount = 4
- evaluatedRules > 0
- hasUsableTracking = true
- rawScore is no longer stuck at 0

Therefore, treat RuleEvaluator as functioning correctly unless you find a concrete bug that prevents the Chair rules from being evaluated.

Current Chair Pose runtime rules:

1. chair-utkatasana.knees.bend
   Name: Knees Deep Bend
   Metric: angle
   Intended measurement: hip → knee → ankle

2. chair-utkatasana.torso.incline
   Name: Torso Extended Forward
   Metric: angle
   Current points:
   [11, 23, 25]

3. chair-utkatasana.arms.reach
   Name: Arms Raised Overhead
   Metric: angle
   Current points:
   [23, 11, 13]

4. chair-utkatasana.knees.level
   Name: Knees Symmetrical
   Metric: horizontal_alignment
   Current points:
   [25, 26]

MediaPipe landmark indices:

11 = left shoulder
12 = right shoulder
13 = left elbow
14 = right elbow
15 = left wrist
16 = right wrist
23 = left hip
24 = right hip
25 = left knee
26 = right knee
27 = left ankle
28 = right ankle

IMPORTANT OBSERVATION:

The current rule:

chair-utkatasana.arms.reach
points [23, 11, 13]

calculates:

hip → shoulder → elbow

This does NOT directly measure whether the arm is raised overhead.

The debug output showed:

Arms Raised Overhead
measuredValue ≈ 30.65°
target = 145–180°
status = fail

This strongly suggests the rule geometry does not represent the intended "arms raised overhead" condition.

For the arm itself, the natural elbow-angle geometry is:

left arm:
[11, 13, 15]

right arm:
[12, 14, 16]

However, do NOT blindly modify the shared RuleEvaluator to support this.

First inspect the repository and determine how Chair Pose rules are actually loaded/generated.

There appears to be a discrepancy between:

frontend/public/data/rules.json

and the runtime Chair rules.

The repository rules.json contains an older Chair definition, while runtime logs show:

chair-utkatasana.knees.bend
chair-utkatasana.torso.incline
chair-utkatasana.arms.reach
chair-utkatasana.knees.level

Therefore:

1. Find the actual source of the runtime Chair rules.
2. Identify the authoritative source file.
3. Do NOT edit an unused/generated file.
4. Verify how those rules are loaded into PoseEvaluator.
5. Update ONLY the Chair Pose rule definitions.

For the Chair Pose rules, ensure the geometry represents the intended posture:

A. Knees:
Measure hip → knee → ankle.
The knee should be substantially bent.

B. Torso:
Measure a meaningful torso/thigh relationship.
Do not assume "upright torso" means a nearly 180° shoulder-hip-knee angle unless that is actually consistent with the project's coordinate/pose convention.
Use the existing angle calculation convention already used by the project.

C. Arms:
Measure the arm itself rather than hip → shoulder → elbow.
Use shoulder → elbow → wrist geometry.
If the existing rule architecture cannot express both left and right arms in one rule, do NOT add Chair-specific hacks to RuleEvaluator.
Instead determine the smallest compatible rule-definition change supported by the existing architecture.

D. Knees symmetrical:
Keep this as an alignment measurement between the left and right knees.
Do not unnecessarily change it if the current implementation is valid.

Preserve:
- existing PoseRule schema
- existing scoring logic
- existing severity values unless there is a strong reason
- existing feedback text where appropriate
- existing rule IDs where possible
- compatibility with the 170+ asana system

Before editing:
Show me which file contains the authoritative runtime Chair rules and explain why it is the correct file.

After editing:
Show me the exact changes made.

Then verify:

1. Chair Pose rules load successfully.
2. All Chair rules are evaluated.
3. No Chair rule becomes "unknown" because of malformed configuration.
4. Angle values are finite.
5. Chair Pose produces a non-zero raw score when landmarks are valid.
6. The live accuracy pipeline receives the resulting score.
7. No files belonging to unrelated asanas are modified.
8. No changes are made to AccuracyStabilizer.

Add temporary debug logging only where necessary.

Useful debug format:

[RULE DEBUG]
[ANGLE DEBUG]
[CHAIR RULE DEBUG]

Do not leave excessive frame-by-frame logging if the repository already has equivalent logging.

Finally, report:

- authoritative Chair rule source file
- old Chair geometry
- new Chair geometry
- why each geometry was changed
- files modified
- files NOT modified
- test/build result
- expected effect on live accuracy

Do not proceed to Step 2B or modify other asanas.