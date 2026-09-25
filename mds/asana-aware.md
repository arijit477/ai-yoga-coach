STEP 9 — IMPLEMENT ASANA-AWARE LANDMARK REQUIREMENTS

Project:
AI Yoga Coach / YogaVerse

Goal:

Replace the current global/full-body landmark readiness requirement with
ASANA-SPECIFIC landmark requirements.

The system must NOT require head, shoulders, elbows, wrists, hips, knees,
ankles and feet for every asana.

Instead:

Asana Rules
    ↓
Required landmarks
    ↓
Camera readiness
    ↓
Pose evaluation
    ↓
Accuracy

The same architecture must support all 174+ asanas.

--------------------------------------------------
IMPORTANT ARCHITECTURE PRINCIPLE
--------------------------------------------------

The current asana's posture rules are the source for determining which
landmarks are actually required.

Do NOT create a global requirement such as:

head + shoulders + elbows + wrists + hips + knees + ankles + feet

for every pose.

If an asana does not use the feet in any of its active rules, missing feet
must NOT make that asana invalid.

If an asana does not use wrists, missing wrists must NOT automatically make
the pose invalid.

--------------------------------------------------
1. AUDIT EXISTING IMPLEMENTATION FIRST
--------------------------------------------------

Inspect:

- AsanaDefinition
- PoseRule
- RuleEvaluator
- PoseFeatureEngine
- CameraReadinessTracker
- landmark validation
- PoseTrackingResult
- PoseEvaluation
- Session state
- Accuracy calculation

Find where the current system globally requires:

- head
- shoulders
- elbows
- wrists
- hips
- knees
- ankles
- feet

Document the current flow before changing it.

Do not create a duplicate readiness system.

--------------------------------------------------
2. CREATE BODY REGION MAPPING
--------------------------------------------------

Create/reuse a centralized body-region mapping.

Conceptually:

type BodyRegion =
  | "head"
  | "neck"
  | "shoulders"
  | "elbows"
  | "wrists"
  | "spine"
  | "hips"
  | "knees"
  | "ankles"
  | "feet";

Map each region to the relevant MediaPipe landmark indices.

Example:

head:
  nose / ears as appropriate

shoulders:
  left shoulder
  right shoulder

elbows:
  left elbow
  right elbow

wrists:
  left wrist
  right wrist

hips:
  left hip
  right hip

knees:
  left knee
  right knee

ankles:
  left ankle
  right ankle

feet:
  heel / foot index as required

Use the existing MediaPipe landmark constants.

Do not duplicate landmark index numbers throughout the project.

--------------------------------------------------
3. RULE → LANDMARK DEPENDENCY
--------------------------------------------------

This is the most important part.

Each rule must declare or be able to derive which landmarks it requires.

Example:

Angle rule:

angle(A, B, C)

requires:

A + B + C

Distance:

distance(A, B)

requires:

A + B

Horizontal alignment:

A + B

Vertical alignment:

A + B

If the existing PoseRule already has:

points: number[]

then use those points to derive dependencies.

Do NOT require an entire body region if only one/two landmarks are actually
used by the rule.

--------------------------------------------------
4. DERIVE REQUIRED LANDMARKS
--------------------------------------------------

Create a pure utility:

getRequiredLandmarks(asanaDefinition)

Conceptually:

rules
  ↓
rule.points
  ↓
unique landmark indices
  ↓
required landmark set

Example:

Tree Pose rules:

1. standing knee angle
2. hip alignment
3. shoulder alignment

might produce:

required landmarks:
hip
knee
ankle
left shoulder
right shoulder

The exact result must come from the actual rules.

Do NOT manually add unrelated landmarks.

--------------------------------------------------
5. DERIVE REQUIRED BODY REGIONS
--------------------------------------------------

Create:

getRequiredBodyRegions(asanaDefinition)

This should derive regions from the required landmark indices.

Example:

required landmarks:

23, 25, 27

→

hips
knees
ankles

If a pose uses:

11, 12, 13, 14, 15, 16

→

shoulders
elbows
wrists

This information will be consumed by CameraReadinessTracker.

--------------------------------------------------
6. UPDATE ASANA DEFINITION
--------------------------------------------------

Do NOT make every asana manually specify all landmarks.

Use the rules as the primary dependency source.

AsanaDefinition can expose derived requirements:

interface AsanaDefinition {
  id: string;
  name: string;

  rules: PoseRule[];

  // Derived, not manually duplicated where possible
  requiredLandmarks?: number[];
  requiredRegions?: BodyRegion[];

  readiness?: {
    minimumConfidence?: number;
    minimumRequiredLandmarkCoverage?: number;
  };

  ...
}

Prefer deriving them at registry initialization instead of duplicating data.

--------------------------------------------------
7. CAMERA READINESS
--------------------------------------------------

Update CameraReadinessTracker.

Instead of:

checkWholeBodyVisible()

use:

checkRequiredLandmarksVisible(
  trackingResult,
  activeAsanaDefinition
)

The tracker should return something like:

interface CameraReadiness {
  status:
    | "ready"
    | "partial"
    | "no_pose"
    | "low_confidence";

  requiredLandmarks: number[];

  missingLandmarks: number[];

  requiredRegions: BodyRegion[];

  missingRegions: BodyRegion[];

  confidence: number;

  guidanceKey?: string;
}

--------------------------------------------------
8. IMPORTANT READINESS BEHAVIOUR
--------------------------------------------------

Example:

Current asana requires:

shoulders
elbows
wrists

Feet are outside camera.

Result:

READY

NOT:

"Make sure your feet are visible."

Another asana requires:

hips
knees
ankles
feet

Feet outside camera.

Result:

PARTIAL

Guidance:

"Make sure your feet are visible."

This message must only appear when the feet are actually required by the
current asana.

--------------------------------------------------
9. POSE VALIDITY
--------------------------------------------------

Update pose validity to be ASANA-AWARE.

Current concept:

no_pose
partial_pose
valid_pose

should now consider:

activeAsana.requiredLandmarks

Example:

If 6/6 required landmarks are valid:

VALID

If 4/6 are valid:

PARTIAL

If the minimum required landmarks are unavailable:

UNKNOWN / PARTIAL according to existing project semantics.

Do NOT make missing optional landmarks invalidate the pose.

--------------------------------------------------
10. UNKNOWN MUST REMAIN UNKNOWN
--------------------------------------------------

This is critical.

If a required landmark is missing:

the related rule cannot be reliably evaluated.

It must become:

UNKNOWN

NOT:

PASS

NOT:

FAIL

Do not penalize the user for a landmark that cannot be observed.

The overall score should use the existing weighted scoring logic and exclude
UNKNOWN rules according to the existing Step 4 design.

--------------------------------------------------
11. ACCURACY
--------------------------------------------------

Accuracy must be based only on evaluable rules.

Example:

Pose has 10 rules.

8 are valid.

2 are UNKNOWN because the corresponding required landmarks are missing.

Do not automatically convert those 2 UNKNOWN rules into failures.

Use the existing weighted evaluation architecture.

The final/live accuracy should therefore represent:

"How well can we evaluate the currently visible required posture?"

not:

"How much of the person's entire body is visible?"

--------------------------------------------------
12. CAMERA READINESS ≠ POSE CORRECTNESS
--------------------------------------------------

Keep these separate.

Camera readiness asks:

"Can I see the landmarks required to evaluate this asana?"

Pose evaluation asks:

"Are those landmarks positioned correctly?"

Do NOT make CameraReadinessTracker calculate posture accuracy.

Do NOT make PoseEvaluation control camera readiness.

--------------------------------------------------
13. TARGET POSE / REFERENCE IMAGE
--------------------------------------------------

The reference image remains the visual guide.

Do not use image dimensions or visible body regions in the image to determine
runtime landmark requirements.

Runtime requirements must come from the configured pose rules.

--------------------------------------------------
14. ACCURACY UI
--------------------------------------------------

If the active asana has sufficient required landmarks:

show the live accuracy score.

If insufficient required landmarks exist:

do not keep showing a stale valid score.

Show an appropriate state:

—
Adjust Position

or the project's existing equivalent.

When the required landmarks become valid again:

resume live accuracy.

Do NOT reset the whole session.

--------------------------------------------------
15. BODY REGION FEEDBACK
--------------------------------------------------

The same dependency system should support correction highlighting.

Example:

Rule:
left knee alignment

→ required landmarks:
left hip
left knee
left ankle

→ body region:
left knee

The correction overlay should highlight the relevant body region rather than
the entire body.

--------------------------------------------------
16. RULE DEPENDENCY EXAMPLES
--------------------------------------------------

Use examples only to validate the architecture.

Example:

Rule:

angle(leftHip, leftKnee, leftAnkle)

Dependencies:

leftHip
leftKnee
leftAnkle

Regions:

left hip
left knee
left ankle

Another:

horizontal_alignment(leftShoulder, rightShoulder)

Dependencies:

left shoulder
right shoulder

Regions:

shoulders

Another:

angle(leftShoulder, leftElbow, leftWrist)

Dependencies:

left shoulder
left elbow
left wrist

Regions:

left shoulder
left elbow
left wrist

--------------------------------------------------
17. PERFORMANCE
--------------------------------------------------

This must be lightweight.

DO NOT calculate required landmarks from rules on every MediaPipe frame.

Precompute/cache:

AsanaDefinition
→ required landmark set
→ required regions

when the active asana changes.

During realtime tracking:

use the cached requirement.

Do NOT introduce another requestAnimationFrame.

Do NOT introduce another MediaPipe instance.

--------------------------------------------------
18. ASANA CHANGE
--------------------------------------------------

When:

currentAsanaId changes

update:

activeAsana
requiredLandmarks
requiredRegions
readiness configuration

without restarting:

- camera
- MediaPipe
- RAF
- OpenAI Realtime
- avatar

Only the evaluation configuration changes.

--------------------------------------------------
19. PRESERVE EXISTING FEATURES
--------------------------------------------------

Do NOT break:

- landmark validation
- smoothing
- pose features
- rule evaluation
- scoring
- 75% completion
- completion popup
- session state
- coaching events
- OpenAI Realtime
- camera lifecycle

This is an architectural improvement to landmark dependency handling.

--------------------------------------------------
20. TESTS
--------------------------------------------------

Add unit tests for:

1. Rule points produce correct landmark dependencies.
2. Multiple rules deduplicate landmarks.
3. Landmark indices map to correct body regions.
4. Missing optional landmarks do not block readiness.
5. Missing required landmarks block readiness.
6. Feet are not required for an asana that doesn't use feet.
7. Feet are required for an asana whose rules use feet.
8. UNKNOWN rules are not treated as failures.
9. Accuracy does not become stale when required landmarks disappear.
10. Accuracy resumes when required landmarks return.
11. Asana switching updates requirements.
12. Camera does not restart when asana changes.
13. MediaPipe does not restart when asana changes.
14. RAF does not restart when asana changes.

--------------------------------------------------
21. TEST WITH EXISTING ASANAS
--------------------------------------------------

At minimum test:

Mountain Pose
Tree Pose
Warrior II

For each one, inspect the actual configured rules and verify that the
required landmark set is derived correctly.

Do NOT assume the examples above are the final requirements.

Use the actual rules in the repository.

--------------------------------------------------
22. VALIDATION OUTPUT
--------------------------------------------------

Create a development/debug utility that can print:

Active Asana:
Warrior II

Required Regions:
shoulders
elbows
wrists
hips
knees
ankles

Required Landmarks:
...

Missing:
...

Readiness:
READY / PARTIAL / NO_POSE

This should be development-only.

--------------------------------------------------
23. FINAL VALIDATION
--------------------------------------------------

Run:

- TypeScript check
- ESLint
- unit tests
- production build

Then manually verify:

A. Pose requiring feet:
   remove feet from camera
   → readiness warns

B. Pose not requiring feet:
   remove feet from camera
   → no feet warning

C. Pose requiring upper body:
   hide legs
   → pose can remain evaluable if required landmarks remain visible

D. Change asana:
   requirements update immediately

E. Camera:
   does not restart

F. MediaPipe:
   does not restart

G. OpenAI:
   does not restart

H. Accuracy:
   does not display stale score when evaluation becomes invalid

--------------------------------------------------
FINAL REPORT
--------------------------------------------------

Report:

1. Current global landmark requirement and where it existed.
2. New rule → landmark dependency architecture.
3. Body-region mapping.
4. CameraReadiness changes.
5. PoseEvaluation changes.
6. Accuracy changes.
7. Files changed.
8. Tests added.
9. Test/build results.
10. Any asanas whose current rules are insufficient to derive reliable
    requirements.

Do not proceed to manually creating new rules for all 174+ asanas in this
step.

First make the architecture correctly support asana-specific landmark
requirements.