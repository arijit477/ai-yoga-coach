STEP 8 — IMPLEMENT PRODUCTION ASANA REGISTRY FOR ALL 174+ ASANAS

Project:
AI Yoga Coach / YogaVerse

Goal:
Move from the current limited asana implementation to a production-ready,
data-driven system supporting ALL asanas represented by the Supabase assets.

SOURCE OF TRUTH FOR ASANA ASSETS:

Supabase Storage bucket:
asana-images

Folder:
yogaverse-model-asanas-beach

IMPORTANT:
Do NOT invent an asana list.
Do NOT assume there are exactly 174 files.
Do NOT manually hardcode 174 React components.

First inspect the actual Supabase asset folder and build the registry from
the assets that actually exist.

--------------------------------------------------
1. INVENTORY THE SUPABASE ASSETS
--------------------------------------------------

Inspect:

asana-images/
└── yogaverse-model-asanas-beach/

Create an inventory containing:

- asset filename
- asset URL/path
- normalized asana ID
- display name
- Sanskrit name if available from existing project data
- duplicate detection
- invalid/missing filename detection

Do not modify or delete Supabase assets.

If the application already has an asana list/database/configuration,
compare it against the Supabase assets instead of creating a competing list.

Produce a clear inventory/report:

TOTAL ASSETS
VALID ASSETS
DUPLICATES
UNMAPPED ASSETS
MISSING ASSETS
INVALID ASSETS

--------------------------------------------------
2. DO NOT BREAK EXISTING ASANA DATA
--------------------------------------------------

Before creating new data structures:

Search the existing repository for:

- asana
- asanaId
- asanaName
- Sanskrit names
- imageUrl
- Supabase storage paths
- asana definitions
- pose rules
- Warrior II
- Tree Pose
- Mountain Pose
- existing pose configuration

Reuse existing structures where possible.

Do not create duplicate AsanaDefinition systems.

If an existing architecture already supports this, extend it.

--------------------------------------------------
3. CREATE A SINGLE PRODUCTION ASANA REGISTRY
--------------------------------------------------

Create one authoritative registry.

Conceptually:

AsanaRegistry
    ↓
AsanaDefinition
    ↓
Pose Rules
    ↓
Pose Evaluation

Suggested structure:

interface AsanaDefinition {
  id: string;
  name: string;
  sanskritName?: string;

  asset: {
    bucket: string;
    folder: string;
    path: string;
    url: string;
  };

  category?: string;
  difficulty?: "beginner" | "intermediate" | "advanced";

  requiredLandmarks: number[];

  readiness: {
    requiredRegions: string[];
    minimumConfidence: number;
  };

  rules: PoseRule[];

  coaching: {
    correctionMessages: string[];
    goodFormMessages: string[];
  };

  completion: {
    minimumScore: number;
    stableDuration?: number;
  };

  status:
    | "draft"
    | "configured"
    | "validated"
    | "tested"
    | "production";
}

Use the project's existing types if equivalent types already exist.

--------------------------------------------------
4. ASANA ID NORMALIZATION
--------------------------------------------------

Create deterministic IDs from asset names.

Example:

"Warrior-II.jpg"
→ warrior-ii

"Tree Pose.png"
→ tree-pose

Do NOT silently merge two different assets just because their names look
similar.

If two files could represent different poses, keep them separate and flag
them for review.

Do not use array indexes as IDs.

IDs must remain stable.

--------------------------------------------------
5. ASANA ASSET REGISTRY
--------------------------------------------------

Create a registry that maps:

asanaId
→ Supabase asset

Example conceptually:

{
  "warrior-ii": {
    "name": "Warrior II",
    "asset": {
      "bucket": "asana-images",
      "folder": "yogaverse-model-asanas-beach",
      "path": "..."
    }
  }
}

Do not expose Supabase service-role credentials to the frontend.

Use the existing public asset/access strategy.

--------------------------------------------------
6. RULE CONFIGURATION
--------------------------------------------------

IMPORTANT:

Do NOT create arbitrary rules simply to make every asana appear supported.

Every asana must eventually have meaningful posture rules.

Reuse generic rule metrics:

- angle
- distance
- horizontal_alignment
- vertical_alignment

Also support reusable derived relationships where already supported by the
existing Pose Feature Engine.

The RuleEvaluator must remain generic.

It must NOT contain:

if (asana === "tree") ...
if (asana === "cobra") ...
if (asana === "warrior") ...

Pose-specific configuration belongs inside the AsanaDefinition.

--------------------------------------------------
7. RULE TEMPLATE SYSTEM
--------------------------------------------------

Create reusable rule templates where appropriate.

Examples:

- knee alignment
- elbow extension
- shoulder alignment
- hip alignment
- spine alignment
- head position
- ankle/foot position
- arm horizontal alignment
- leg extension
- torso orientation
- symmetry
- body-centre alignment

Templates should produce normal PoseRule objects.

Do not bypass the existing RuleEvaluator.

--------------------------------------------------
8. REQUIRED LANDMARK CONFIGURATION
--------------------------------------------------

Each asana must define which body regions/landmarks are required.

Example:

Warrior II:

head
shoulders
elbows
wrists
hips
knees
ankles
feet

A pose that does not require facial landmarks should NOT require facial
landmarks for readiness.

Use existing MediaPipe landmark indices.

Do not change the global landmark numbering.

--------------------------------------------------
9. ASANA-AWARE CAMERA READINESS
--------------------------------------------------

Connect the registry to the Step 6 readiness system.

Camera readiness must be based on the current asana's required landmarks.

For example:

Pose A may require:

hips + knees + ankles

while Pose B may require:

shoulders + elbows + wrists

Do not force every asana to use identical readiness requirements.

Camera validation remains generic.

--------------------------------------------------
10. PRODUCTION SCORING
--------------------------------------------------

All asanas must use the existing scoring pipeline:

MediaPipe
↓
Landmark validation
↓
Smoothing
↓
Pose Features
↓
AsanaDefinition.rules
↓
RuleEvaluator
↓
PoseEvaluation
↓
Accuracy

Do NOT introduce a separate scoring implementation for the 174+ poses.

Keep:

- weighted rules
- UNKNOWN handling
- severity
- primary issue
- posture state
- confidence

from the existing Step 4 architecture.

--------------------------------------------------
11. COMPLETION
--------------------------------------------------

Keep the existing production completion requirement:

accuracy >= 75%

when the score is stable.

Completion must:

- fire once per asana
- create pose_completed CoachingEvent
- show Asana Completed popup
- allow:
  - Next Pose
  - Stay Here
  - End Session

Do NOT introduce a 90% or 100% requirement.

Do NOT require a 10-second hold.

--------------------------------------------------
12. COACHING INTEGRATION
--------------------------------------------------

Every configured asana must work with Step 7:

PoseEvaluation
    ↓
CoachingEventGenerator
    ↓
Voice Orchestrator
    ↓
OpenAI Realtime

OpenAI must NOT calculate posture.

OpenAI must only verbalize the deterministic local evaluation.

--------------------------------------------------
13. DO NOT FAKE PRODUCTION SUPPORT
--------------------------------------------------

This is extremely important.

Do NOT mark an asana as "production" merely because:

- its image exists
- it appears in the UI
- it has a name
- it has an empty rule array

An asana is production-ready only when:

1. Asset exists
2. Metadata exists
3. Required landmarks are defined
4. Rules are defined
5. Rule thresholds are meaningful
6. Coaching feedback exists
7. Readiness works
8. Evaluation works
9. Completion works
10. It passes validation/testing

Until then:

status = "draft" / "configured" / "validated"

as appropriate.

--------------------------------------------------
14. VALIDATION TOOLING
--------------------------------------------------

Create a development validation script/tool that checks every asana.

Example:

validateAsanaRegistry()

It should report:

✓ Asset exists
✓ Valid ID
✓ Required landmarks configured
✓ Rules configured
✓ Valid metrics
✓ Valid points
✓ Valid comparisons
✓ Valid thresholds
✓ Valid weights
✓ Feedback configured
✓ Completion configuration valid

And report errors such as:

✗ Missing asset
✗ No rules
✗ Invalid landmark index
✗ Invalid threshold
✗ Zero/negative weight
✗ Missing feedback
✗ Duplicate ID

The tool should produce a summary.

--------------------------------------------------
15. ASANA COVERAGE REPORT
--------------------------------------------------

Create a production coverage report.

Example:

Total assets: XXX

Configured: XXX
Validated: XXX
Tested: XXX
Production: XXX

Missing rules: XXX
Missing metadata: XXX
Duplicate assets: XXX
Unmapped assets: XXX

Do not fabricate numbers.

Use the actual inventory discovered from Supabase.

--------------------------------------------------
16. UI INTEGRATION
--------------------------------------------------

Update the existing asana selection flow to use AsanaRegistry.

Do NOT create 174 new UI components.

The same CameraStage, Posture Check, Accuracy Circle, Coach Panel,
Correction Overlay, TargetPoseCard and completion flow should work for
every asana through configuration.

Changing:

currentAsanaId

should change the configuration, not the component architecture.

--------------------------------------------------
17. PERFORMANCE
--------------------------------------------------

Do not load every full-resolution image unnecessarily.

Use the existing Supabase asset strategy.

Avoid:

- loading all 174 images simultaneously
- recalculating rule definitions every frame
- recreating asana objects every React render
- network requests inside requestAnimationFrame

Asana definitions should be static/memoized.

Only the active asana configuration should be used by the realtime evaluator.

--------------------------------------------------
18. PRODUCTION SAFETY
--------------------------------------------------

Do not expose:

SUPABASE_SERVICE_ROLE_KEY
OpenAI API keys
private credentials

in frontend code.

Use only the existing safe client-side configuration.

--------------------------------------------------
19. TESTING STRATEGY
--------------------------------------------------

Do not attempt to manually validate all 174 poses in one test.

Create:

A. Registry validation tests
B. Rule schema tests
C. Asset mapping tests
D. Generic evaluator tests
E. Representative asana tests

Representative tests should cover different body configurations, such as:

- standing
- balance
- seated
- kneeling
- prone
- supine
- twisting
- forward fold
- backbend
- arm-supported
- one-leg balance

Use actual asanas from the discovered asset inventory.

--------------------------------------------------
20. IMPORTANT: DO NOT INVENT POSTURE RULES
--------------------------------------------------

The image asset can identify the visual pose, but it does not automatically
provide precise production thresholds.

If the repository already contains trusted rule/metadata information, reuse it.

If an asana lacks enough information to define reliable rules:

mark it:

"configured" or "needs_validation"

Do NOT invent medically/safety-sensitive posture thresholds simply to
increase the production count.

--------------------------------------------------
21. FINAL OUTPUT FROM THIS STEP
--------------------------------------------------

After implementation provide:

1. Actual number of Supabase assets discovered
2. Actual number of unique asanas
3. Duplicate assets
4. Unmapped assets
5. Asanas with existing rules
6. Asanas newly configured
7. Asanas still requiring rule definition/validation
8. Registry files created/modified
9. Validation results
10. TypeScript/lint/test/build results
11. Any blockers

DO NOT claim all 174+ are production-ready unless the validation actually
confirms this.

--------------------------------------------------
SCOPE RESTRICTION
--------------------------------------------------

Do NOT implement:

- ML model training
- new ML inference
- YOLO
- dynamic AI avatars
- lip-sync
- ElevenLabs
- browser speechSynthesis
- separate scoring engine
- separate camera pipeline
- second MediaPipe loop

Preserve Steps 1–7.

This step is specifically:

SUPABASE ASSETS
→ ASANA REGISTRY
→ DATA-DRIVEN ASANA CONFIGURATION
→ PRODUCTION VALIDATION
→ EXISTING POSE ENGINE