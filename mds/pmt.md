We have completed the read-only cleanup audit.

DO NOT perform the entire cleanup plan at once.

We will execute cleanup in controlled phases.

IMPORTANT:
Do not touch the active AI Yoga Coach architecture.

PROTECTED SYSTEMS — DO NOT DELETE OR REFACTOR:

- AICoachPage.tsx
- usePoseTracking.ts
- usePoseEvaluation.ts
- useCoachState.ts
- useCoachSession.ts
- AsanaRegistry.ts
- allAsanasCatalog.ts
- coachingProfilesCatalog.ts
- AsanaCompletionGate.ts
- AsanaLandmarkRequirements.ts
- HoldTimer.tsx
- PoseReviewModal.tsx
- SessionReportModal.tsx
- PoseLandmarkerService.ts
- LandmarkSmoother.ts
- CameraReadinessTracker.ts
- PoseFeatureEngine.ts
- PoseEvaluator.ts
- TemporalPoseEvaluator.ts
- RuleEvaluator.ts
- AccuracyStabilizer.ts
- PostureCheckAdapter.ts
- CoachingEventEngine.ts
- RealtimeVoiceAgent.ts
- useRealtimeVoice.ts
- Alice/Kevin avatar system
- all 170/174 asana definitions
- rules.json
- MediaPipe model
- Supabase integration required by the application
- active backend realtime route
- active backend chat route
- active backend asana upload route

==================================================
PHASE 1 — SAFE DEAD FILES ONLY
==================================================

Delete ONLY files that the audit confirmed have:

1. zero imports
2. zero dynamic references
3. zero runtime dependencies
4. zero deployment dependencies

Candidate files from the audit:

- frontend/src/App.css
- frontend/src/assets/hero.png
- frontend/src/assets/react.svg
- frontend/src/assets/vite.svg
- frontend/src/pages/ExerciseSelectionPage.tsx
- frontend/src/store/useCoachStore.ts
- frontend/src/store/useSessionStore.ts
- frontend/src/services/api.ts
- frontend/src/data/coaches.ts
- frontend/src/data/exercises.ts
- frontend/src/types/coach.ts
- frontend/src/types/exercise.ts
- frontend/src/features/folderGuide.md

Before deletion, perform one final repository-wide reference search.

If ANY candidate has an unexpected reference:
DO NOT DELETE IT.
Move it to INVESTIGATE.

==================================================
PHASE 2 — LEGACY BACKEND
==================================================

Only after Phase 1 is verified and the project builds:

Remove the confirmed-dead backend pose pipeline:

- backend/app/api/routes/video_stream.py
- backend/app/api/routes/temp.py
- backend/app/services/pose_analysis/

Also remove useBackendPoseTracking.ts if confirmed unused.

Before deleting:

Verify that no active frontend or backend route imports any of them.

==================================================
PHASE 3 — THREE.JS LEGACY SYSTEM
==================================================

Verify that the entire:

frontend/src/features/ai-coach/3d/

directory is unreachable from the production application.

Also verify:

- Avatar animation files
- Three.js components
- Three.js utilities

Only then remove the 3D cluster.

After removal, remove ONLY dependencies that become unused:

- @react-three/fiber
- @react-three/drei
- three
- @types/three

Do not remove any avatar system required by Alice/Kevin.

==================================================
PHASE 4 — DO NOT DELETE DUPLICATE ANALYSIS FILES YET
==================================================

DO NOT delete these yet:

- AsanaPoseEvaluator.ts
- AccuracyCalculator.ts
- PostureAnalyzer.ts
- JointAngleExtractor.ts
- PoseStabilityDetector.ts
- ScoreSmoother.ts
- useAsanaEvaluation.ts
- useStableAccuracy.ts
- useStablePoseEvaluation.ts
- useStableScore.ts

Instead create:

docs/CANDIDATE_LEGACY_ANALYSIS.md

For each file determine:

- Is it imported?
- Who imports it?
- Does it contain unique logic?
- Does current production code replace it?
- Does any test depend on it?
- Does it contain logic that could help fix current accuracy problems?
- Can it safely be deleted?

Mark each:

SAFE TO DELETE
or
KEEP
or
INVESTIGATE

Do NOT delete these during the first cleanup.

==================================================
PHASE 5 — FIX THE SESSION REPORT API MISMATCH
==================================================

Audit:

SessionReportModal.tsx

and:

backend/app/api/routes/chat.py

The audit found:

Frontend:
 /api/ai-coach/chat/summary

Backend:
 /api/chat/summary

Verify the actual deployed route.

If the mismatch is confirmed, fix ONLY the endpoint path.

Do not redesign the session-report system.

==================================================
PHASE 6 — DEPENDENCY CLEANUP
==================================================

Do NOT remove dependencies until the corresponding source code has been deleted.

After Phases 1–3:

Run dependency analysis again.

Only remove packages with zero remaining imports/usages.

==================================================
PHASE 7 — VERIFICATION
==================================================

After every phase:

Run:

npm run typecheck
npm run build
npm test
npm run validate:asanas

Do not continue to the next phase if:

- TypeScript errors appear
- build fails
- tests fail
- asana validation fails

Record the result after each phase.

==================================================
GIT SAFETY
==================================================

Create a separate git commit after each phase.

Commit 1:
cleanup: remove confirmed dead frontend files

Commit 2:
cleanup: remove obsolete backend pose pipeline

Commit 3:
cleanup: remove unused threejs pipeline

Commit 4:
fix: correct session report endpoint

Do NOT combine everything into one commit.

==================================================
FINAL REQUIREMENT
==================================================

After each phase, report:

1. Files deleted
2. Files retained
3. Dependencies removed
4. Tests run
5. Build result
6. Asana validation result
7. Any unexpected issue

DO NOT continue automatically if a verification step fails.

The goal is SAFE cleanup, not aggressive deletion.