# Phase 1 — Pose Identity Validation Report

## Current Problem
Previously, the posture feedback system could evaluate posture rules on incoming body landmarks without guaranteeing that the user was actually performing the requested asana. In some edge cases, a user performing an unrelated posture (or standing with level shoulders while Cobra Pose was selected) could satisfy generic alignment checks (such as level shoulders or level hips), leading to misleading feedback or premature hold timers.

## Existing Architecture
The yoga coach pipeline comprises:
- **MediaPipe Pose Tracking**: Real-time 33 3D body landmark extraction.
- **Asana Registry & Catalog**: 170 active asanas with compound and canonical identifiers.
- **StanceDetector**: Stance classification across 10 physical postures (`standing`, `seated`, `prone`, `supine`, `kneeling`, `all_fours`, `plank`, `bending`, `inverted`, `arm_balance`).
- **Rule Engine & Evaluators**: Angle and alignment checks defined per asana.
- **AsanaCompletionGate**: Single-source-of-truth completion gating (`KNOWN_CRITICAL_RULES`).
- **Feedback & Voice Engines**: Cooldown-managed, event-driven audio coaching.

## Changes Made
1. **PoseIdentityResult Interface**: Extended `pose-rules.ts` with strongly-typed `PoseIdentityResult` containing `isMatch`, `confidence`, `canonicalAsanaId`, `requiredStance`, `detectedStance`, `passedRequirements`, `failedRequirements`, `criticalFailures`, and `reason`. Attached `identity?: PoseIdentityResult` to `PoseEvaluation` and `PoseEvaluationResult`.
2. **PoseIdentityValidator**: Implemented authoritative `validatePoseIdentity(asanaId, context, poseFeatures, customRules)` implementing the single-source-of-truth validation pipeline.
3. **Canonical ID Resolution**: Standardized `resolveCanonicalAsanaId` as the single point of entry to map compound IDs (e.g. `cobra-bhujangasana` $\to$ `bhujangasana`).
4. **Physical Stance & Landmark Verification**: Integrated `isStanceMatching` and landmark visibility/confidence checks (`getLandmarkConfidence`, `isLandmarkUsable`) before evaluating pose rules.
5. **Multi-Signal Identity Verification**: Required all pose-defining critical rules to pass, with fail-safe behavior when rules are absent or insufficient.
6. **PoseEvaluator & TemporalPoseEvaluator Integration**: Integrated identity validation into the primary evaluation path without modifying accuracy formulas or state machine hold timers.
7. **Comprehensive Unit & Specification Suite**: Added 10 dedicated specification tests covering all target cases in `src/features/ai-coach/analysis/__tests__/PoseIdentityValidation.test.ts`.

## Pose Identity Flow
```text
SELECTED ASANA (e.g., "cobra-bhujangasana")
      ↓
CANONICAL ID RESOLUTION ("bhujangasana")
      ↓
LANDMARK EXISTENCE & CONFIDENCE CHECK (33 points, min visibility/confidence)
      ↓
PHYSICAL STANCE VALIDATION (e.g., required: "prone" vs detected: "prone")
      ↓
ASANA-SPECIFIC CRITICAL IDENTITY RULES (Pose-defining angles & shapes)
      ↓
POSE IDENTITY RESULT: MATCH (isMatch = true) / NO MATCH (isMatch = false)
```

## Rule Source / Precedence
Deterministic single source of truth order:
1. **Hand-Authored Asana Definitions**: `analysis/rules/asanas/` (e.g. `bhujangasanaPose`, `padmasanaPose`, `warriorIIRules`).
2. **Custom / Runtime Rules**: Explicit custom rules provided in evaluator context.
3. **RuleEngine Registered Rules**: Dynamic rules registered in `RuleEngine`.
4. **Catalog Default Rules**: Extracted rules from `allAsanasCatalog.ts`.

## Stance Validation
- Physical stance requirement is resolved from the asana's coaching profile or definition category.
- `isStanceMatching(requiredStance, landmarks)` evaluates key geometric vectors (torso angle, leg vertical span, hip apex).
- Standing upright or sitting upright while a prone/supine pose is active results in an immediate `stance_mismatch` critical failure (`isMatch = false`).

## Landmark Validation
- Required key landmarks are checked for availability and confidence.
- Average confidence across required landmarks must be $\ge 0.40$ and no more than 50% of required landmarks may be missing or unusable.
- If landmarks are occluded or missing, validation fails safely with `required_landmarks_visibility` failure.

## Critical Identity Rules
Single-source-of-truth critical rules exported via `KNOWN_CRITICAL_RULES`:
- **Bhujangasana (Cobra)**: `bhujangasana.chest.lift`, `bhujangasana.elbows.tuck`
- **Setu Bandhasana (Bridge)**: `setu-bandhasana.hips.lift`, `bridge.pelvis.elevation`
- **Padmasana (Lotus)**: `padmasana.spine.upright`, `padmasana.knee.external`
- **Warrior II**: `warrior-ii-left-knee-angle`, `warrior-ii-right-knee-angle`, `warrior-ii-arm-horizontal`
- **Tadasana (Mountain)**: `tadasana-body-alignment`, `tadasana-vertical-spine`
- **Vrksasana (Tree)**: `tree.bent.knee`, `tree.foot.placement`
- **Adho Mukha Svanasana (Downward Dog)**: `downward-dog.hips.apex`, `downward-dog.spine.extension`
- **Balasana (Child's Pose)**: `balasana.torso.fold`, `balasana.hips.heels`
- **Chaturanga Dandasana**: `chaturanga.elbows.90`, `chaturanga.body.line`

## Test Results
- **Unit & Specification Tests**: 314 tests passing (`314 pass, 0 fail` across 71 suites).
- **TypeScript Typecheck**: `npm run typecheck` $\to$ Exit code 0 (0 errors).
- **Frontend Production Build**: `npm run build` $\to$ Exit code 0 (0 errors).
- **170 Catalog Asana Validation**: `npm run validate:asanas` $\to$ Exit code 0 (170/170 valid, 0 errors, 0 warnings).

## Files Modified
- `frontend/src/features/ai-coach/types/pose-rules.ts`: Added `PoseIdentityResult` and `identity` fields.
- `frontend/src/features/ai-coach/analysis/AsanaCompletionGate.ts`: Exported `KNOWN_CRITICAL_RULES`.
- `frontend/src/features/ai-coach/analysis/PoseIdentityValidator.ts`: Authoritative pose identity validator and diagnostics formatter.
- `frontend/src/features/ai-coach/analysis/PoseEvaluator.ts`: Integrated pose identity evaluation.
- `frontend/src/features/ai-coach/analysis/TemporalPoseEvaluator.ts`: Preserved identity in temporal evaluation.
- `frontend/src/features/ai-coach/analysis/__tests__/PoseIdentityValidation.test.ts`: Specification test suite.

## Files NOT Modified
- `AccuracyStabilizer.ts`
- `AccuracyCalculator.ts`
- `AccuracyPipeline.ts`
- `AsanaCompletionGate.ts` (hold / score threshold logic preserved)
- Voice integration / Realtime DataChannel architecture
- Session state machine and UI modals / popups

## Known Asanas Without Sufficient Identity Data
Catalog draft asanas that lack high-severity pose-defining rules fail safely in Phase 1 with `insufficient_rules` or `requiresDetectionRefinement`, preventing false positives until pose-specific rules are authored.

## Remaining Work for Phase 2
- Phase 2: Refined Joint Angle Extraction & Precision Metrics.
- Implementation of remaining hand-authored critical rule definitions for remaining draft asana categories.
- Alignment of real-time pose hold timer triggers with `identity.isMatch` verification.
