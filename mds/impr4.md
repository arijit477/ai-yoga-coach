Step 4 — Rule Engine correctness and asana-specific rule architecture.
STEP 4 — RULE ENGINE CORRECTNESS AND ASANA-SPECIFIC RULE ARCHITECTURE

Continue from the completed Step 1, Step 2 and Step 3 implementations.

Current pipeline:

Camera
→ MediaPipe
→ Landmark Validation
→ Confidence Handling
→ Temporal Smoothing
→ Pose Feature Engine
→ PoseFeatures

Now implement and stabilize the generic Rule Engine and establish the data-driven asana-specific rule architecture.

IMPORTANT:

- Do NOT create another MediaPipe pipeline.
- Do NOT modify the camera/RAF architecture.
- Do NOT add an ML model.
- Do NOT modify OpenAI/Re​altime.
- Do NOT modify Alice/Kevin/avatar behavior.
- Do NOT build the 174-asana rule set yet.
- Do NOT create separate hardcoded evaluator logic for individual asanas.
- Reuse the existing PoseRule types and RuleEvaluator where possible.
- Inspect the current implementation before modifying it.

==================================================
1. INSPECT EXISTING RULE ENGINE
==================================================

Inspect:

- PoseRule
- RuleEvaluator
- PoseFeatures
- existing rule data
- scoring logic
- existing Warrior II rules
- any asana configuration
- existing evaluation types
- current correction generation

Identify and fix existing correctness problems before adding new architecture.

Specifically verify that every supported RuleMetric is actually evaluated:

- angle
- distance
- horizontal_alignment
- vertical_alignment

There must be no default behavior where an unsupported/unimplemented metric silently passes.

If a metric cannot be evaluated because required data is unavailable, return UNKNOWN rather than PASS.

==================================================
2. DEFINE RULE RESULT STATES
==================================================

Create a consistent internal result state:

- PASS
- WARNING
- FAIL
- UNKNOWN

Do not confuse:
- missing data
with
- failed posture.

Examples:

Valid measurement inside target:
PASS

Valid measurement slightly outside target:
WARNING

Valid measurement significantly outside target:
FAIL

Required landmark/feature unavailable:
UNKNOWN

Keep this distinction throughout the rule engine.

==================================================
3. RULE EVALUATION
==================================================

Implement generic evaluation for:

ANGLE
DISTANCE
HORIZONTAL_ALIGNMENT
VERTICAL_ALIGNMENT

For each rule:

1. Obtain the required feature from PoseFeatures.
2. Validate the feature.
3. Apply the rule comparison.
4. Determine PASS/WARNING/FAIL/UNKNOWN.
5. Calculate a normalized rule score where appropriate.
6. Preserve rule metadata:
   - ruleId
   - rule name
   - metric
   - severity
   - feedback
   - measured value
   - target/range
   - status

Do not generate UI-specific JSX here.

==================================================
4. COMPARISON BEHAVIOR
==================================================

Support:

between
greater_than
less_than

Correctly handle:

min/max
target/tolerance

Do not silently accept invalid rule configurations.

If a rule is malformed, return a clear configuration error during development/testing.

==================================================
5. TOLERANCE AND WARNING ZONES
==================================================

Rules should support:

target range
warning tolerance
failure boundary

Do not make every small deviation an immediate FAIL.

For example conceptually:

Target:
80–100 degrees

Near boundary:
WARNING

Clearly outside:
FAIL

The exact thresholds must come from the rule configuration.

Do not hardcode yoga-specific thresholds inside RuleEvaluator.

==================================================
6. RULE WEIGHTS
==================================================

Use rule weights for overall pose scoring.

Example:

Critical/important posture rule:
weight = 2

Minor alignment rule:
weight = 1

Calculate a weighted score only from evaluable rules.

UNKNOWN rules should not automatically count as failures.

Also expose:
- total evaluated rules
- passed rules
- warning rules
- failed rules
- unknown rules

==================================================
7. SEVERITY
==================================================

Preserve:

info
low
medium
high

Do NOT automatically interpret every high-severity rule as a safety issue.

Safety should remain a separate concept.

A high-severity posture correction means the posture issue is important; it does not automatically mean the user is injured.

==================================================
8. PRIMARY CORRECTION
==================================================

From the failed/warning rules, determine one primary correction.

Prioritize approximately by:

1. safety-critical rules if explicitly marked
2. high severity
3. larger normalized deviation
4. rule weight

Do not simply select the first failed rule.

Return the selected rule as:

primaryIssue

with:

- ruleId
- bodyPart
- severity
- feedback
- measuredValue
- target/range

Do not generate spoken text here.

OpenAI will later turn structured coaching events into natural language.

==================================================
9. POSE EVALUATION CONTRACT
==================================================

Create or strengthen a single PoseEvaluation result.

Conceptually:

PoseEvaluation {
    asanaId
    timestamp

    score

    overallStatus

    rules: RuleEvaluation[]

    primaryIssue

    posture: {
        head
        neck
        shoulders
        elbows
        spine
        hips
        knees
        ankles
    }

    completionEligible

    confidence
}

Posture statuses should support:

GOOD
WARNING
BAD
UNKNOWN

Do not calculate posture separately in the UI.

==================================================
10. SCORE CALCULATION
==================================================

The score should:

- use weighted evaluable rules
- not treat UNKNOWN as failure
- remain bounded between 0 and 100
- be deterministic for the same PoseFeatures + rules
- not contain UI animation logic

Do not implement the final stable-asana-score buffer yet.

That will be handled in a later step.

==================================================
11. DATA-DRIVEN ASANA RULE ARCHITECTURE
==================================================

Create a clean structure where each asana provides metadata + rules.

Conceptually:

AsanaDefinition {
    id
    name
    sanskritName
    category
    difficulty
    referenceImage
    rules[]
}

Do not put evaluation code inside AsanaDefinition.

Rules should be configuration/data.

Example:

warrior2.ts/data should define rules.

The generic RuleEvaluator should not know what Warrior II is.

==================================================
12. INITIAL ASANAS
==================================================

Implement and validate rules for ONLY:

1. Mountain Pose
2. Tree Pose
3. Warrior II

Use the existing PoseFeatures and existing rule conventions.

Do not pretend these rules are medically authoritative.

They are configurable posture/form heuristics for the application.

Document the rule intent clearly.

==================================================
13. RULE IDENTIFIERS
==================================================

Rule IDs must be stable.

Examples:

mountain.shoulders.level
mountain.spine.neutral

tree.standing.knee
tree.hips.level

warrior2.front_knee
warrior2.shoulder_alignment
warrior2.arm_alignment

Do not use array indexes as rule IDs.

==================================================
14. NO UI COUPLING
==================================================

Rule Engine must NOT import:

- React
- JSX
- components
- browser APIs
- camera APIs
- OpenAI
- avatar code

It should remain a pure analysis layer.

==================================================
15. UNKNOWN HANDLING
==================================================

This is critical.

Example:

A Warrior II rule requires:
left knee
left ankle
left hip

If the ankle is low-confidence:

Result:
UNKNOWN

NOT:
FAIL

The UI can later show:
"Unable to verify"

rather than:
"Incorrect posture"

==================================================
16. TESTING

Create comprehensive unit tests.

Test:

GENERAL:
1. valid angle rule
2. invalid angle rule
3. distance rule
4. horizontal alignment rule
5. vertical alignment rule
6. between comparison
7. greater_than
8. less_than
9. malformed rule
10. missing feature
11. UNKNOWN result
12. weighted score
13. warning state
14. failure state
15. primary correction selection

ASANA:
16. Mountain Pose rules
17. Tree Pose rules
18. Warrior II rules

EDGE CASES:
19. NaN
20. Infinity
21. null feature
22. missing landmark
23. low-confidence landmark
24. all rules UNKNOWN
25. mixed PASS/WARNING/FAIL/UNKNOWN

Ensure no invalid numeric value reaches the final score.

==================================================
17. INTEGRATION

Connect:

PoseFeatures
→ RuleEvaluator
→ PoseEvaluation

Do NOT connect PoseEvaluation to:
- Posture Check UI
- accuracy circle
- hold tracker
- OpenAI

yet.

We will do that in the next phase.

==================================================
18. BUILD AND TEST

Run:

- TypeScript checks
- frontend build
- all existing tests
- new Rule Engine tests

Verify that the existing AI Coach camera still works.

Do not introduce:
- additional RAF loops
- additional MediaPipe detectors
- React state loops
- camera restart behavior

==================================================
FINAL REPORT

After implementation provide:

1. Files changed
2. Existing Rule Engine code reused
3. Rule evaluation logic implemented
4. Rule result states
5. Score calculation method
6. Primary correction selection logic
7. Asana rule architecture
8. Rules implemented for Mountain, Tree and Warrior II
9. Tests added
10. Test results
11. Build result
12. Remaining issues