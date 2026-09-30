PHASE 10A — FIX THE ROOT CAUSE FOUND BY THE 170-ASANA AUDIT

The complete audit has confirmed the root cause of the false-positive completion problem.

DO NOT create 170 separate algorithms.

DO NOT modify MediaPipe.

DO NOT modify AccuracyCalculator.

DO NOT modify the 5-second hold logic.

DO NOT modify Phase 9 coaching.

This phase is specifically to fix the completion-gate architecture.

==================================================
PROBLEM CONFIRMED BY AUDIT
==================================================

The audit found:

- 170 active asanas
- KNOWN_CRITICAL_RULES runtime matches: 0
- 36 using auto-high-severity fallback
- 129 using low-severity first-rule fallback
- 5 with NO rules
- 134/170 without strong pose-defining critical rules
- 117 total potential false-positive risk in critical/high/medium-high tiers

ROOT CAUSE:

KNOWN_CRITICAL_RULES uses short IDs such as:

cobra
bhujangasana
warrior-ii
tadasana
tree-pose
lotus

while ALL_ASANAS_CATALOG uses compound IDs such as:

cobra-bhujangasana
warrior-ii-virabhadrasana-ii
mountain-tadasana
tree-vrksasana
lotus-padmasana

normalizeAsanaId() currently only removes file extensions/path information and does not resolve these aliases.

Therefore the hand-authored critical rules are effectively DEAD at runtime.

==================================================
STEP 1 — FIX ID RESOLUTION
==================================================

Create a single canonical asana-ID resolution mechanism.

The system must correctly resolve catalog IDs to the corresponding completion profile / critical-rule configuration.

Examples:

cobra-bhujangasana
→ cobra / bhujangasana critical profile

warrior-ii-virabhadrasana-ii
→ warrior-ii critical profile

mountain-tadasana
→ tadasana critical profile

tree-vrksasana
→ tree-pose / vrksasana critical profile

lotus-padmasana
→ lotus / padmasana critical profile

downward-dog-adho-mukha-svanasana
→ downward-dog critical profile

childs-pose-balasana
→ childs-pose / balasana critical profile

Do NOT solve this by randomly adding aliases throughout the codebase.

Create ONE canonical resolver or alias map and make AsanaCompletionGate use it.

After implementation, verify:

KNOWN_CRITICAL_RULES runtime matches > 0.

Print the exact matched count.

==================================================
STEP 2 — VERIFY THE EXISTING CRITICAL RULES
==================================================

After fixing ID resolution, run the audit again.

For every matched asana report:

Asana
Catalog ID
Resolved critical profile
Critical rule IDs
Critical rule count
Rules actually evaluated at runtime

IMPORTANT:

Do not assume that resolving the ID means the rules are good.

We need to confirm that the intended critical rules are ACTUALLY being evaluated.

==================================================
STEP 3 — REMOVE UNSAFE COMPLETION FALLBACK
==================================================

Current dangerous behavior:

No pose-specific rules
        ↓
generic accuracy + confidence
        ↓
eligible
        ↓
5-second hold
        ↓
completion

This must NOT happen for a strict AI Yoga Coach.

If an asana has:

requiresDetectionRefinement === true

AND there are no reliable pose-defining critical rules,

then:

isEligible = false

hold = 0

completion = false

popup = false

voice completion = false

The user may continue receiving normal coaching/guidance, but the system must NEVER claim the asana is completed without sufficient pose-specific evidence.

FAIL CLOSED.

==================================================
STEP 4 — REMOVE THE "FIRST RULE" COMPLETION FALLBACK
==================================================

The current fallback:

"No high-severity rules → use first rule"

is not acceptable for strict completion.

A generic first rule such as:

horizontal_alignment
vertical_alignment
body symmetry
should NOT be treated as proof that the user is performing a specific asana.

Change this behavior:

If no meaningful pose-defining rule exists:

→ requiresDetectionRefinement = true
→ completion gate = NOT ELIGIBLE

Do not invent a critical rule.

==================================================
STEP 5 — KEEP THE 5-SECOND HOLD
==================================================

Do NOT change the current 5-second continuous hold.

The hold should remain:

Valid pose gate
+
accuracy >= 75%
+
continuous validity
+
5000ms
=
completion

But now the pose gate must actually contain valid pose-specific evidence.

==================================================
STEP 6 — COBRA REGRESSION
==================================================

Cobra is the primary production regression.

Test:

User selects Cobra.

Scenario A:
User sits upright.

Expected:
- Cobra critical rules fail
- isEligible = false
- hold = 0
- no completion
- no popup
- no completion voice

Scenario B:
User moves randomly.

Expected:
- no completion

Scenario C:
User partially enters Cobra.

Expected:
- no completion

Scenario D:
User correctly performs Cobra.

Expected:
- critical Cobra rules pass
- accuracy >= 75%
- valid continuous hold begins
- after 5 continuous seconds → completion

==================================================
STEP 7 — TEST OTHER KNOWN PROFILES
==================================================

At minimum test:

Cobra
Lotus
Warrior II
Mountain
Tree
Bridge
Downward Dog
Child's Pose

For every one:

Wrong configuration
→ no completion

Partial configuration
→ no completion

Correct configuration
→ eligible

Correct configuration + 5 seconds
→ completion

==================================================
STEP 8 — RE-RUN THE 170-ASANA AUDIT
==================================================

After the above changes generate:

TOTAL ACTIVE ASANAS
KNOWN_CRITICAL_RULES MATCHED
STRONG CRITICAL RULES
REQUIRES DETECTION REFINEMENT
FALLBACK-BASED
NO RULES
FALSE-POSITIVE RISK

Also report:

Before:
KNOWN_CRITICAL_RULES = 0

After:
KNOWN_CRITICAL_RULES = ?

==================================================
STEP 9 — DO NOT PRETEND ALL 170 ARE FIXED
==================================================

This is extremely important.

If only 20/170 currently have meaningful pose-specific rules, report:

20 validated
150 require detection refinement

Do NOT mark all 170 as safe merely because they pass through the generic gate.

The purpose of this phase is to make the completion system STRICT and HONEST.

==================================================
STEP 10 — TESTS
==================================================

Run all existing tests.

Add regression tests for:

1. Compound ID resolves to critical profile
2. Cobra false positive rejected
3. Wrong stance rejected
4. Missing critical rules cannot complete
5. Generic first-rule cannot establish completion
6. requiresDetectionRefinement cannot complete
7. Correct pose + 5 sec completes
8. Asana switch resets hold
9. Invalid pose resets hold
10. No duplicate completion

Then run:

tsc -b

vite build

==================================================
FINAL REPORT
==================================================

Return:

1. Root cause
2. Files changed
3. Canonical ID resolution implemented
4. Number of KNOWN_CRITICAL_RULES matched before/after
5. Fallback completion removed/disabled
6. Number of asanas now strongly validated
7. Number requiring detection refinement
8. Cobra manual/regression result
9. Other representative asana results
10. Full test count
11. TypeScript result
12. Vite result

DO NOT proceed to authoring/refining all 170 pose-specific rules in this phase.

First fix the architecture and make the completion gate strict and fail-closed.

After this phase is complete, we will start the next phase:
POSE-SPECIFIC RULE REFINEMENT FOR THE 170 ASANAS.