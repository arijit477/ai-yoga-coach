Perform a COMPLETE READ-ONLY AUDIT of the current AI Yoga Coach project.

IMPORTANT:
- DO NOT modify any files.
- DO NOT create new files.
- DO NOT refactor anything.
- DO NOT fix anything.
- Only inspect the existing code and report the current status.
- Base the report ONLY on what actually exists in the repository.
- Do not assume a feature is implemented just because a UI element exists.

PROJECT GOAL:
Production-ready AI Yoga Coach with:
Camera → MediaPipe Pose Tracking → Landmark Validation → Asana-Specific Rules → Pose Evaluation → Live Accuracy → 75% Hold → Completion → Voice Coaching → Next Asana.

AUDIT THESE AREAS:

1. PROJECT ARCHITECTURE
- frontend structure
- backend structure
- motion/pose architecture
- rule engine
- accuracy pipeline
- voice pipeline
- asana configuration/registry
- shared types/interfaces

2. CAMERA + MEDIA PIPELINE
Check:
- camera initialization
- MediaPipe PoseLandmarker
- frame processing
- requestAnimationFrame
- landmark extraction
- landmark smoothing
- landmark confidence/visibility
- invalid landmark handling
- camera readiness
- performance/FPS
- React state updates inside tracking loop
- possible render loops / Maximum update depth problems

3. POSE LANDMARK PIPELINE
Trace the REAL data flow:

Camera
→ MediaPipe
→ landmarks
→ validation
→ smoothing
→ feature calculation
→ rule evaluation

Identify the exact files/functions responsible for each stage.

4. ASANA ARCHITECTURE
Check whether the project actually supports:
- asana registry
- asana-specific configuration
- required landmarks
- optional landmarks
- ignored landmarks
- camera requirements
- rules
- thresholds
- weights
- hold duration
- accuracy threshold
- coaching messages

Determine whether these are:
DONE / PARTIAL / MISSING.

5. RULE ENGINE
Inspect:
- RuleEvaluator
- angle rules
- distance rules
- horizontal alignment
- vertical alignment
- thresholds
- tolerance
- severity
- scoring
- rule weights

IMPORTANT:
Check whether the system distinguishes:

PASS
FAIL
NOT_EVALUABLE

Determine whether missing/low-confidence landmarks can incorrectly become PASS.

6. POSE EVALUATION
Trace exactly how PoseEvaluation is produced.

Check:
- what inputs it receives
- what rules it evaluates
- what score it produces
- how missing landmarks are handled
- whether it is asana-specific
- whether it is actually connected to the UI

7. LIVE ACCURACY
Trace the complete pipeline:

Current Pose
→ Asana Rules
→ Rule Results
→ Raw Accuracy
→ Temporal Stabilization
→ Live Accuracy
→ UI

Find the exact files/functions responsible.

Check:
- why accuracy can remain 0%
- whether raw accuracy is calculated correctly
- whether NOT_EVALUABLE rules incorrectly reduce score
- whether smoothing/stabilization is implemented
- whether the UI receives the real score
- whether score updates actually happen during tracking

8. 75% COMPLETION FLOW
Check the complete logic:

Accuracy >= 75%
→ Excellent Alignment
→ Hold for 10 seconds
→ stable accuracy
→ completion
→ popup
→ next pose

Determine:
- what triggers completion
- what prevents completion
- whether the hold timer resets correctly
- whether accuracy must remain above threshold
- whether completion is connected to PoseEvaluation or uses separate logic

9. POSTURE CHECK UI
Check whether:

"Landmark detected"

is incorrectly treated as:

"Posture correct".

Verify that every displayed ✓ actually comes from a passing asana rule.

Check whether the UI can show:

PASS
FAIL
NOT_EVALUABLE

Also check whether irrelevant body parts such as knees/ankles are evaluated for poses that don't require them.

10. CAMERA READINESS
Check whether camera warnings are asana-specific.

Example:
Prayer Pose should NOT require the entire body if its rules only need:
- head
- shoulders
- elbows
- wrists/hands

Check whether the current implementation incorrectly requires all 33 landmarks.

11. SKELETON RENDERING
Check:
- landmark rendering
- connection rendering
- confidence threshold
- invalid landmark handling

A connection should not be drawn when either endpoint is invalid/low confidence.

12. VOICE / AI COACH
Trace:

PoseEvaluation
→ coaching decision
→ message selection
→ ElevenLabs
→ audio playback

Check:
- Alice
- Kevin
- voice state
- coaching state
- duplicate messages
- repeated messages
- timing
- cooldown
- whether voice reacts to actual pose problems
- whether voice is independent from pose evaluation

13. COACH BEHAVIOUR
Check whether the system supports:
- one correction at a time
- natural encouragement
- success feedback
- failure/retry feedback
- humour
- hold instructions
- completion message
- next-pose question

14. 174+ ASANAS
Inspect the actual assets/configuration.

Determine:
- number of asana assets
- number of registered asanas
- number with actual rules
- number with required landmarks
- number with thresholds
- number with coaching messages

IMPORTANT:
Do NOT count an image as an implemented asana.

Report:

Assets: X
Registered: X
Rules implemented: X
Fully configured: X
Incomplete: X

15. PERFORMANCE
Check:
- MediaPipe inference frequency
- requestAnimationFrame usage
- React state updates
- unnecessary re-renders
- expensive calculations
- memory leaks
- animation frame cleanup
- camera cleanup
- audio cleanup

16. ERROR HANDLING
Search for:
- TODO
- FIXME
- console.error
- console.warn
- empty catch blocks
- fallback values
- hardcoded 0 accuracy
- hardcoded PASS/GOOD states
- temporary/mock data
- commented-out production logic

17. PRODUCTION READINESS
Check:
- environment variables
- Supabase configuration
- ElevenLabs configuration
- API errors
- browser compatibility
- camera permissions
- loading states
- failure states
- mobile responsiveness

18. ACTUAL USER FLOW
Trace this exact flow through the code:

User opens AI Coach
→ camera starts
→ camera becomes ready
→ selects asana
→ reference image appears
→ user performs pose
→ landmarks detected
→ landmarks validated
→ asana rules evaluated
→ live accuracy updates
→ accuracy reaches 75%
→ 10-second hold starts
→ hold completes
→ completion popup appears
→ coach speaks
→ user chooses:
   YES / STAY HERE / END SESSION
→ next asana starts

For EVERY step say:
DONE / PARTIAL / BROKEN / MISSING.

19. FIND ROOT CAUSES
Do NOT only list symptoms.

For every BROKEN feature identify:
- exact file
- exact function/component
- current behavior
- expected behavior
- likely root cause
- dependencies/blockers

20. FINAL STATUS REPORT

Generate a table:

| Area | Status | Evidence | Files | Problem | Next Action |
|------|--------|----------|-------|---------|-------------|

Use only:
🟢 DONE
🟡 IN PROGRESS
🔴 BROKEN
⚪ MISSING

Then provide:

A. COMPLETED FEATURES
B. IN-PROGRESS FEATURES
C. BROKEN FEATURES
D. MISSING FEATURES
E. TECHNICAL DEBT
F. CRITICAL BUGS
G. BLOCKERS
H. PRODUCTION RISKS
I. EXACT NEXT STEPS

Finally create a PRIORITY PLAN:

P0 = Must fix before client demo
P1 = Required for reliable POC
P2 = Required for production
P3 = Enhancement

DO NOT make any code changes.

At the very end provide:

PROJECT COMPLETION ESTIMATE:
- Tracking: __%
- Rule Engine: __%
- Accuracy: __%
- Completion Flow: __%
- Voice Agent: __%
- Asana Coverage: __%
- Overall: __%

Also provide the TOP 10 files that should be worked on next, ordered by priority.

Again: THIS IS AN AUDIT ONLY. DO NOT MODIFY THE PROJECT.