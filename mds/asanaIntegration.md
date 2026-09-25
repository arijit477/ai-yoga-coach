You are working on the existing AI Yoga Coach / YogaVerse production project.

Repository:
https://github.com/arijit477/ai-yoga-coach

IMPORTANT:
Do NOT rebuild the project.
Do NOT replace the existing pose detection architecture.
Do NOT create a separate parallel pose engine.
Extend the existing architecture cleanly.

The Supabase Storage folder is the source of truth for the supported asanas.

Supabase bucket:
asana-images

Primary asana asset folder:
yogaverse-model-asanas-beach

The folder contains properly named asana image files such as:

- archers-akama-dhanurasana...
- banana-supta-nitambasana...
- big-toe-padangushthasana.webp
- bird-of-paradise-svarga-dvijasana...
- boat-navasana.webp
- bound-angle-baddha-konasana...
- bow-dhanurasana.webp
- box-chakravakasana.webp
- bridge-setu-bandha-sarvangasana...
- butterfly.webp
- camel-ustrasana.webp
- cat-marjariasana.webp
- caterpillar.webp
- chair-utkatasana.webp
- childs-pose-balasana...
- chin-stand-ganda-bherundasana...
- cobra-bhujangasana.webp
- corpse-savasana.webp
- cow-bitilasana.webp
- cow-face-gomukhasana...
- crane-bakasana.webp

There are many more assets in the folder.

DO NOT hardcode only the examples above.
You MUST inspect the actual Supabase folder/assets and build the registry from the real asset inventory.

==================================================
PRIMARY OBJECTIVE
==================================================

Build a production-ready, data-driven Asana Registry that connects the existing:

Supabase assets
        ↓
Asana Registry
        ↓
Asana Definition
        ↓
Pose Rules
        ↓
Required Landmarks
        ↓
Camera Readiness
        ↓
Pose Evaluation
        ↓
Accuracy
        ↓
Corrections
        ↓
Coaching Events
        ↓
OpenAI Realtime Coach

The system must support all valid asanas present in the Supabase source folder without creating a separate implementation for every pose.

==================================================
1. FIRST — INSPECT THE EXISTING CODE
==================================================

Before changing anything, inspect the current implementation.

Locate and understand:

- AsanaDefinition
- AsanaRegistry
- PoseRule
- RuleEvaluator
- PoseFeatureEngine
- Landmark utilities
- CameraReadinessTracker
- pose tracking hook
- PoseEvaluation
- Posture Check UI
- accuracy calculation
- completion logic
- session state machine
- coaching event system
- OpenAI Realtime integration
- TargetPoseCard
- Supabase asset loading

Do not duplicate existing functionality.

Reuse existing types/interfaces/services wherever possible.

If the existing architecture differs from assumptions in this prompt, adapt to the actual implementation rather than blindly creating duplicate files.

==================================================
2. INSPECT THE SUPABASE ASANA ASSETS
==================================================

Treat:

yogaverse-model-asanas-beach

as the authoritative source of supported asanas.

Create an asset inventory.

For each valid asset determine:

- filename
- normalized asanaId
- display name
- Sanskrit/common name when explicitly represented by the filename
- Supabase storage path
- image URL/reference
- asset availability
- whether metadata/rules already exist

Example:

cobra-bhujangasana.webp

should become conceptually:

{
  asanaId: "cobra-bhujangasana",
  displayName: "Cobra",
  sanskritName: "Bhujangasana",
  assetPath: "...",
  assetStatus: "available"
}

Do not invent Sanskrit names when the filename does not support them.

Do not silently rename assets.

Preserve a stable ID once created.

==================================================
3. CREATE/EXTEND THE ASANA REGISTRY
==================================================

Create or extend the existing AsanaRegistry.

The registry must be data-driven.

Conceptually:

AsanaRegistry
 ├── cobra-bhujangasana
 ├── boat-navasana
 ├── camel-ustrasana
 ├── chair-utkatasana
 ├── ...
 └── every valid asset discovered in Supabase

Do NOT manually implement one React component per asana.

Do NOT create:

CobraPose.tsx
BoatPose.tsx
CamelPose.tsx
etc.

unless an existing architecture genuinely requires a specialized component.

The preferred architecture is:

ONE generic AsanaSession
ONE generic PoseEvaluation pipeline
ONE generic RuleEvaluator
ONE generic CameraReadiness system
ONE generic coaching system

with data-driven asana definitions.

==================================================
4. ASANA DEFINITION
==================================================

Extend the existing AsanaDefinition if necessary.

Use a structure conceptually similar to:

interface AsanaDefinition {
  id: string;
  displayName: string;
  sanskritName?: string;

  asset: {
    imageUrl: string;
    storagePath: string;
  };

  category?: string;

  difficulty?: "beginner" | "intermediate" | "advanced";

  rules: PoseRule[];

  requiredLandmarks: number[];

  requiredRegions?: BodyRegion[];

  validation?: {
    status: "draft" | "validated" | "production";
    version: string;
    sampleCount: number;
    expertReviewed: boolean;
  };
}

Adapt this to the existing project's types instead of blindly replacing them.

==================================================
5. REQUIRED LANDMARKS MUST BE ASANA-SPECIFIC
==================================================

CRITICAL.

Do NOT require the whole body for every asana.

Required landmarks must be derived from the actual rules/features required by the current asana.

Examples:

If a rule is:

angle(shoulder, elbow, wrist)

then:

shoulder
elbow
wrist

are required.

If a rule is:

angle(hip, knee, ankle)

then:

hip
knee
ankle

are required.

If a rule uses:

distance(hip, ankle)

then both are required.

If a rule uses:

horizontal_alignment(leftShoulder, rightShoulder)

then both shoulders are required.

Build this dependency relationship programmatically.

Conceptually:

PoseRule
    ↓
Rule points
    ↓
Required landmarks
    ↓
Required body regions
    ↓
Camera readiness

Do not maintain a second manually duplicated list unless necessary.

==================================================
6. CAMERA READINESS
==================================================

Update CameraReadinessTracker so that it checks only the landmarks required by the CURRENT asana.

Example:

Cobra may require:

- shoulders
- elbows
- wrists
- hips
- spine-related landmarks

Tree may require:

- hips
- standing knee
- standing ankle
- shoulders
- head

An asana must NOT fail camera readiness simply because an irrelevant body region is outside the frame.

Camera readiness states should continue to support:

- ready
- partial
- no_pose
- error

When required landmarks are missing:

- show appropriate guidance
- do not fabricate a pose score
- do not treat missing landmarks as PASS
- related rules become UNKNOWN

Do not restart:

- camera
- MediaPipe
- RAF loop
- session
- OpenAI Realtime
- avatar

when the current asana changes.

Only update the current asana's dependency configuration.

==================================================
7. RULE ENGINE
==================================================

Use the existing RuleEvaluator.

Verify that all supported metrics work correctly:

- angle
- distance
- horizontal_alignment
- vertical_alignment

IMPORTANT EXISTING ARCHITECTURE REQUIREMENT:

A missing feature MUST produce:

UNKNOWN

It must never become:

PASS

and must never automatically become:

FAIL

Do not use a default pass for unsupported or missing metrics.

Every asana must use the same generic evaluation pipeline.

==================================================
8. DO NOT INVENT VALIDATED THRESHOLDS
==================================================

This is extremely important.

The Supabase image tells us what the target asana is.

It does NOT automatically provide scientifically validated joint-angle thresholds.

Therefore:

DO NOT claim that newly created angle thresholds are validated.

If an asana does not yet have validated rules:

mark it as:

validation.status = "draft"

or equivalent.

The system may support a draft configuration for development/testing, but production validation must remain explicit.

Never label arbitrary thresholds as:

validated
expert approved
production accurate
scientifically accurate

unless actual validation evidence exists.

==================================================
9. RULE CONFIGURATION
==================================================

Create a scalable configuration model.

Conceptually:

{
  id: "...",
  metric: "angle",
  points: [...],
  comparison: "between",
  min: ...,
  max: ...,
  weight: ...,
  severity: "...",
  feedback: "...",
  validation: {
    status: "draft",
    version: "..."
  }
}

Use stable rule IDs.

Example:

cobra.elbow.extension
cobra.shoulder.position
cobra.hip.position

Do not use random IDs.

Stable IDs are required for:

- analytics
- debugging
- calibration
- future threshold updates
- coaching events
- rule-level testing

==================================================
10. SUPPORT ALL SUPABASE ASANAS
==================================================

After inventorying the actual Supabase folder:

Create registry entries for every valid asana asset.

Do not stop at the example list.

Do not manually type a guessed list of 150+ poses.

The implementation must derive the registry from the actual asset inventory.

If direct Supabase listing is not available in the current development environment:

DO NOT invent the inventory.

Instead:

1. Inspect existing Supabase integration.
2. Determine how the project currently accesses the bucket.
3. Add an asset inventory mechanism using the existing Supabase configuration.
4. Provide a deterministic validation/report command that outputs discovered assets.

For example:

npm run validate:asanas

The command should report:

Total assets:
Registered asanas:
Missing registry entries:
Duplicate IDs:
Missing images:
Invalid filenames:
Asanas without rules:
Asanas with draft rules:
Asanas with validated rules:

==================================================
11. FILENAME NORMALIZATION
==================================================

Create a deterministic filename normalization strategy.

Example:

"cobra-bhujangasana.webp"

→

asanaId:
cobra-bhujangasana

displayName:
Cobra

sanskritName:
Bhujangasana

Do not use filename position or array index as an ID.

Do not create IDs like:

asana-001
asana-002
asana-003

because asset ordering may change.

Handle:

- .webp
- .png
- .jpg
- .jpeg

and query strings if URLs contain them.

Avoid duplicate IDs.

If two assets normalize to the same ID:

report the collision instead of silently overwriting one.

==================================================
12. ASANA METADATA
==================================================

Where information is explicitly available from the filename or existing project data, create:

- display name
- Sanskrit name
- asset path
- category
- difficulty
- validation status

Do not fabricate metadata.

For unknown values use:

undefined

or an explicit draft/unknown state.

==================================================
13. FREE BEGINNER FLOW
==================================================

Preserve the existing required beginner flow:

Prayer Pose
→ Mountain Pose
→ Tree Pose
→ Cobra Pose
→ Child's Pose

Do not break the free/premium structure.

If these asanas exist in Supabase, resolve them through the new registry.

Do not duplicate them in another hardcoded system.

If the current application already has beginner configuration, migrate it to use AsanaRegistry.

==================================================
14. PREMIUM ASANAS
==================================================

All additional Supabase asanas should become available through the same registry.

Do not create a separate premium implementation.

Premium/free access should remain an entitlement/access-control concern.

Pose evaluation should remain independent from subscription logic.

==================================================
15. TARGET POSE CARD
==================================================

Update TargetPoseCard to consume the current AsanaDefinition.

It should display:

- asana image
- display name
- Sanskrit name when available
- current pose target

Do not create pose-specific UI components.

When the user changes pose:

TargetPoseCard updates.

Camera stays running.

MediaPipe stays running.

RAF stays running.

Voice stays running.

Session state changes cleanly.

==================================================
16. ACCURACY
==================================================

Preserve the existing accuracy architecture.

IMPORTANT:

Do not calculate all 150+ asanas every frame.

Only evaluate:

CURRENT ASANA

against:

CURRENT ASANA'S rules.

The visible live accuracy should come from the current PoseEvaluation.

If required landmarks disappear:

do not continue displaying a stale valid accuracy.

Use the existing live/final accuracy separation.

Final accuracy should be calculated from the recent valid score buffer at completion.

Completion remains:

accuracy >= 75%

once per asana.

Do NOT change the completion threshold.

Do NOT require:

90%
100%
10-second hold

for completion.

The 10-second hold remains optional if already implemented.

==================================================
17. POSTURE CHECK
==================================================

Posture Check must remain generic.

Display meaningful regions such as:

- Head Position
- Neck Alignment
- Shoulder Balance
- Left Elbow
- Spine Alignment
- Hip Position

The exact active regions should come from the current asana's rule dependencies.

Do not show irrelevant body regions for an asana.

Do not display raw angle numbers in the primary user UI.

==================================================
18. LIVE CORRECTION
==================================================

Corrections must come from the current asana's rules.

Only show relevant corrections.

Do not generate corrections for rules whose required landmarks are unavailable.

Use:

PASS
WARNING
FAIL
UNKNOWN

internally.

UNKNOWN should not generate an incorrect correction.

Maintain the existing correction prioritization/cooldown architecture.

==================================================
19. COACHING / OPENAI REALTIME
==================================================

Do not change the existing OpenAI Realtime architecture unless required for compatibility.

The pose engine remains deterministic.

OpenAI remains the conversational/coaching layer.

Do NOT call OpenAI every MediaPipe frame.

Continue using structured coaching events:

- pose_started
- pose_correction
- good_form
- pose_held
- pose_completed
- safety_warning

The event should include the current asana ID/name and relevant rule information.

Changing asanas must not recreate the OpenAI session unnecessarily.

Camera failure must not terminate voice.

==================================================
20. PERFORMANCE REQUIREMENTS
==================================================

This project currently needs low-latency realtime pose tracking.

DO NOT introduce a performance regression.

Never do:

174 asanas × all rules × every frame

Never fetch Supabase assets inside the RAF loop.

Never perform network requests inside the RAF loop.

Never update React state every frame unless absolutely necessary.

Use:

- refs
- memoization
- cached asana definitions
- cached rule dependencies
- current-asana-only evaluation

The realtime pipeline should be:

Camera
 ↓
MediaPipe
 ↓
Landmark validation
 ↓
Smoothing
 ↓
Feature extraction
 ↓
CURRENT ASANA rules
 ↓
PoseEvaluation
 ↓
UI/coaching event

==================================================
21. VALIDATION COMMAND
==================================================

Create or extend:

npm run validate:asanas

The validation should detect:

1. Supabase asset without registry entry
2. Registry entry without asset
3. Duplicate asana IDs
4. Invalid filename
5. Missing display name
6. Missing required landmarks
7. Rule referencing invalid landmark
8. Rule with invalid metric
9. Missing rule configuration
10. Draft validation status
11. Missing image URL/path
12. Duplicate rule IDs

Output a readable report.

Example:

ASANA VALIDATION REPORT

Total assets: XXX
Registered: XXX
Missing: X
Duplicates: X
Invalid rules: X

Production-ready: X
Draft: X

Missing:
- ...

Draft:
- ...

==================================================
22. TESTS
==================================================

Add tests for:

Filename normalization.

Examples:

cobra-bhujangasana.webp
→ cobra-bhujangasana

boat-navasana.webp
→ boat-navasana

childs-pose-balasana.webp
→ childs-pose-balasana

Required landmark extraction.

Example:

angle(11,13,15)

must require:

11
13
15

Missing landmark handling.

Rule evaluation with missing data must return UNKNOWN.

Asana switching.

Changing:

Cobra → Tree

must update required landmarks/rules without restarting:

- camera
- RAF
- MediaPipe
- voice

Registry lookup.

Unknown asana IDs must fail safely.

Duplicate asset IDs must be detected.

==================================================
23. DO NOT BREAK EXISTING CAMERA ARCHITECTURE
==================================================

This is critical because the project previously experienced:

"Maximum update depth exceeded"

and realtime tracking lag.

Do not reintroduce this problem.

There must remain:

ONE RAF loop.

ONE MediaPipe video detection loop.

Do not create an RAF loop per asana.

Do not create an RAF loop per rule.

Do not create an effect that continuously recreates the tracking callback.

Do not put frequently changing pose objects directly into React dependency arrays.

High-frequency values should remain in refs where appropriate.

React state should update only when UI-visible values meaningfully change.

==================================================
24. DO NOT BREAK SESSION STATE
==================================================

Preserve:

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

Asana registry integration must not bypass the session state machine.

==================================================
25. DO NOT BREAK AVATAR / VOICE
==================================================

Alice/Kevin behavior must continue working.

Changing asanas should NOT:

- restart avatar
- restart OpenAI
- reset voice
- restart camera
- reset MediaPipe

Only update the coaching context.

Preserve the existing Alice/Kevin personality configuration.

==================================================
26. SUPABASE SECURITY
==================================================

Do not expose:

SUPABASE_SERVICE_ROLE_KEY

in frontend code.

Do not hardcode secrets.

Public asset URLs or properly configured public storage access may be used according to the existing project configuration.

Never move service-role credentials into Vite frontend environment variables.

==================================================
27. IMPLEMENTATION ORDER
==================================================

Work in this order:

PHASE A
Inspect existing architecture.

PHASE B
Inspect current Supabase integration.

PHASE C
Build asset inventory.

PHASE D
Implement/extend AsanaRegistry.

PHASE E
Implement deterministic filename normalization.

PHASE F
Connect assets to AsanaDefinition.

PHASE G
Derive required landmarks from rules.

PHASE H
Connect current-asana requirements to CameraReadinessTracker.

PHASE I
Connect current asana to PoseEvaluation.

PHASE J
Connect TargetPoseCard.

PHASE K
Connect Posture Check and corrections.

PHASE L
Connect coaching context/events.

PHASE M
Add validation command.

PHASE N
Add tests.

PHASE O
Run:

npm run typecheck
npm run lint
npm run test
npm run build
npm run validate:asanas

Use the project's actual scripts if their names differ.

==================================================
28. IMPORTANT — DO NOT INVENT IMPLEMENTATION RESULTS
==================================================

At the end, report actual results.

Do not say:

"All 174 asanas are production-ready"

unless validation actually confirms this.

Report:

- number of assets discovered
- number registered
- number with draft rules
- number with validated rules
- number with missing metadata
- number with missing rules
- number of validation errors
- tests passed
- build status

If an asset could not be accessed because Supabase credentials/configuration are unavailable, explicitly report that.

Do not fabricate the asset count.

==================================================
29. FINAL DELIVERABLE
==================================================

After implementation, provide a concise report:

1. Files created/modified
2. Asana asset count discovered
3. Registry count
4. Validation status
5. Draft vs validated rules
6. Camera-readiness changes
7. Pose evaluation changes
8. Accuracy/completion impact
9. Coaching/OpenAI impact
10. Performance impact
11. Tests
12. Build result
13. Remaining blockers

IMPORTANT:

Do not proceed into threshold "validation" or invent expert-approved joint-angle ranges in this step.

This step establishes the complete production asana data architecture and asset integration.

Threshold calibration/validation will be implemented as a separate controlled step after the registry is confirmed.

==================================================
SUCCESS CRITERIA
==================================================

The implementation is successful only if:

✓ Supabase is treated as the source of truth for asana assets
✓ Actual assets are inventoried
✓ Every valid asset has a stable asanaId
✓ Registry is data-driven
✓ No pose-specific React implementation is duplicated
✓ Required landmarks are asana-specific
✓ Missing landmarks produce UNKNOWN
✓ Camera readiness is asana-aware
✓ Only the current asana is evaluated
✓ Accuracy does not show stale values when required landmarks disappear
✓ Completion remains >=75%
✓ OpenAI Realtime remains persistent
✓ Camera and voice remain independent
✓ One RAF loop remains
✓ No React update-depth loop is introduced
✓ No network calls occur inside the realtime loop
✓ Supabase secrets remain protected
✓ Validation command exists
✓ Tests pass
✓ Production build passes

DO NOT optimize by lowering pose accuracy requirements.

DO NOT disable React StrictMode to hide lifecycle problems.

DO NOT add setTimeout hacks.

DO NOT suppress console errors.

DO NOT create duplicate pose-tracking systems.

Implement the architecture cleanly and production-ready.