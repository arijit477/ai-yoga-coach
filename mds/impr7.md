STEP 7 — IMPLEMENT STRUCTURED COACHING EVENTS + OPENAI REALTIME VOICE INTEGRATION

Project:
AI Yoga Coach / YogaVerse

Goal:
Connect the existing deterministic PoseEvaluation + Session State Machine to the existing OpenAI Realtime voice system so Alice/Kevin behave like a natural real-time yoga instructor.

IMPORTANT ARCHITECTURE RULE:

MediaPipe + Pose Feature Engine + Rule Engine remain the source of truth for posture.

OpenAI Realtime must NOT calculate posture, angles, scores, or determine whether a pose is correct.

OpenAI is the conversational / verbal coaching layer only.

Do NOT send MediaPipe frames or continuous pose data to OpenAI.

Do NOT call OpenAI on every frame.

Use structured CoachingEvents generated locally from PoseEvaluation/session state.

--------------------------------------------------
1. AUDIT EXISTING VOICE IMPLEMENTATION FIRST
--------------------------------------------------

Before changing code:

- Inspect the existing OpenAI Realtime implementation.
- Identify:
  - Realtime session creation
  - WebRTC/WebSocket transport currently used
  - audio input/output handling
  - microphone lifecycle
  - existing coach/avatar integration
  - existing environment variables
  - existing voice state/store
  - existing interruption handling
- Reuse the existing architecture where possible.
- Do NOT create a second voice system.
- Do NOT reintroduce ElevenLabs.
- Do NOT use browser speechSynthesis.
- Do NOT create duplicate microphone/audio sessions.

OpenAI Realtime is the ONLY active AI voice provider.

--------------------------------------------------
2. CREATE STRUCTURED COACHING EVENTS
--------------------------------------------------

Create a strongly typed event model.

Suggested:

type CoachingEventType =
  | "pose_started"
  | "pose_correction"
  | "good_form"
  | "pose_held"
  | "pose_completed"
  | "safety_warning";

interface CoachingEvent {
  id: string;
  type: CoachingEventType;
  timestamp: number;

  coach: "alice" | "kevin";

  asanaId: string;
  asanaName: string;

  score?: number;

  sessionState: SessionState;
  cameraState: CameraState;

  posture?: "GOOD" | "WARNING" | "BAD" | "UNKNOWN";

  primaryIssue?: {
    ruleId: string;
    bodyRegion?: string;
    severity: "info" | "low" | "medium" | "high";
    feedback: string;
    currentValue?: number;
    target?: number;
    min?: number;
    max?: number;
  };

  messageContext?: string;
}

Use the actual existing project types where available instead of duplicating them.

Keep the event model independent from React UI.

--------------------------------------------------
3. EVENT GENERATION
--------------------------------------------------

Create a dedicated coaching-event layer.

Example:

PoseEvaluation
      ↓
Coaching Event Generator
      ↓
CoachingEvent
      ↓
Voice Orchestrator
      ↓
OpenAI Realtime

The event generator should react to meaningful state transitions.

DO NOT generate an event every frame.

Examples:

pose_started:
- User enters a valid pose/calibrated state.

pose_correction:
- A meaningful primary issue appears or changes.
- Same correction must not repeat continuously.

good_form:
- User transitions from incorrect/warning state to stable good alignment.
- Do not repeatedly announce "good form" every frame.

pose_held:
- Optional hold milestone is reached.

pose_completed:
- Existing Step 5 completion logic reaches the >=75% completion threshold.
- Fire exactly once per asana.

safety_warning:
- Only when the existing posture/session system explicitly identifies a safety-critical condition.
- Do NOT infer safety risk from generic high severity.

--------------------------------------------------
4. EVENT STABILIZATION + COOLDOWN
--------------------------------------------------

Implement event deduplication and cooldown.

Suggested starting values:

CORRECTION_COOLDOWN = 4000ms
GOOD_FORM_COOLDOWN = 6000ms
POSE_STARTED = once per pose
POSE_COMPLETED = once per pose
SAFETY_WARNING = can bypass normal cooldown when necessary

Do not hardcode these values throughout the code.

Create centralized configuration.

Repeated identical corrections should not trigger repeated voice responses.

Example:

Frame 1:
"Keep your left knee aligned."

Frame 2:
same issue

Frame 3:
same issue

Frame 100:
same issue

→ Only one coaching event should be emitted until cooldown/state-change rules allow another event.

If the primary issue changes meaningfully:

left knee issue
→ right shoulder issue

a new event may be emitted.

--------------------------------------------------
5. EVENT PRIORITY
--------------------------------------------------

Implement deterministic priority:

1. safety_warning
2. user speech / direct user interaction
3. high severity correction
4. medium severity correction
5. low severity correction
6. good_form
7. pose_held
8. informational events

The voice system must not talk over the user unnecessarily.

If the user starts speaking:

- prioritize user speech
- allow interruption of coach speech where supported
- do not immediately inject another coaching event

High-severity posture feedback should interrupt lower-priority coaching only when appropriate.

--------------------------------------------------
6. OPENAI REALTIME VOICE ORCHESTRATOR
--------------------------------------------------

Create/reuse a single persistent voice orchestration layer.

Responsibilities:

- maintain one Realtime session
- receive CoachingEvents
- convert events into concise spoken instructions
- handle user interruptions
- maintain current coach context
- maintain current asana context
- maintain session state
- maintain camera state
- prevent duplicate sessions

DO NOT create a new OpenAI session when:

- camera starts
- camera stops
- user leaves frame
- user returns to frame
- asana changes
- calibration starts
- calibration ends
- fullscreen opens
- fullscreen closes

The voice session lifecycle must be independent from camera lifecycle.

--------------------------------------------------
7. COACH CONTEXT
--------------------------------------------------

The Realtime session should receive structured context such as:

Coach:
Alice

Current Asana:
Warrior II

Score:
76

Posture:
GOOD

Primary Issue:
Left knee slightly inward

Severity:
medium

Session State:
coaching

Camera State:
camera_ready

The context should be updated when meaningful state changes occur.

Do NOT stream unnecessary frame-level data.

--------------------------------------------------
8. SYSTEM INSTRUCTIONS FOR ALICE
--------------------------------------------------

Alice personality:

- warm
- calm
- graceful
- patient
- reassuring
- emotionally intelligent
- professional
- natural contemporary British English
- human conversational rhythm

Avoid:

- exaggerated British/RP accent
- BBC/newsreader style
- robotic narration
- repetitive scripted phrases
- long explanations
- motivational speeches

Corrections should generally be short:

"Ease your left knee outward slightly."

"Lift your chest a little."

"Keep your shoulders relaxed."

"Beautiful alignment."

Do not force the exact same sentence every time.

--------------------------------------------------
9. SYSTEM INSTRUCTIONS FOR KEVIN
--------------------------------------------------

Kevin personality:

- confident
- energetic
- warm
- friendly
- athletic
- motivating
- approachable
- natural contemporary British English

Avoid:

- sports commentator style
- commercial advertisement style
- exaggerated enthusiasm
- robotic repetition
- long speeches

Examples:

"Nice work. Keep that knee tracking over your foot."

"Good alignment. Hold that position."

"Bring your shoulders back slightly."

Again, allow natural variation.

--------------------------------------------------
10. RESPONSE LENGTH
--------------------------------------------------

Real-time coaching should be concise.

Typical correction:

5–18 words.

Do not generate long explanations during an active pose.

User conversation can naturally be longer when the user explicitly asks a question.

During active coaching:

CORRECTION
→ short

GOOD FORM
→ short

SAFETY
→ clear and direct

USER QUESTION
→ natural conversational response

--------------------------------------------------
11. OUT-OF-FRAME BEHAVIOUR
--------------------------------------------------

IMPORTANT:

Camera state must NOT control voice session lifecycle.

If the user leaves the camera frame:

Camera:
camera_no_pose / camera_partial

Voice:
CONNECTED

Session:
PRESERVED

Asana:
PRESERVED

Score:
PRESERVED

Corrections:
PRESERVED

Do NOT restart:

- OpenAI Realtime
- MediaPipe
- avatar
- session

The coach may say:

"I can’t see you at the moment. Come back into the frame."

Use a cooldown of approximately 5–8 seconds.

Do not repeat this every frame.

The user must still be able to talk to Alice/Kevin while outside the camera frame.

--------------------------------------------------
12. CAMERA RECOVERY
--------------------------------------------------

When the user returns:

Do not restart the voice session.

Do not restart the avatar.

Do not reset the asana.

Resume normal coaching after pose validation/calibration conditions are satisfied.

--------------------------------------------------
13. POSE COMPLETION VOICE
--------------------------------------------------

Use the existing Step 5 completion logic.

When accuracy reaches >=75% stably:

1. Pose completion event fires once.
2. Final score is captured.
3. Asana Completed popup is shown.
4. Coach can verbally acknowledge completion.

Example:

"Excellent. You've completed this pose."

Do NOT require:

- 90%
- 100%
- 10-second hold

for completion.

The 10-second hold remains optional.

--------------------------------------------------
14. USER CHOICE AFTER COMPLETION
--------------------------------------------------

Existing completion flow:

Asana Completed

Next Pose
Stay Here
End Session

Voice should understand these user interactions.

Examples:

User:
"Yes, next one."

→ advance to next pose.

User:
"Stay here."

→ remain on current pose.

User:
"Let's finish."

→ end session.

Do not build a separate NLP system for this if the existing Realtime conversation layer can handle it naturally.

Map recognized intent into the existing session state machine.

--------------------------------------------------
15. VOICE MUST NEVER CONTROL POSTURE SCORING
--------------------------------------------------

Do NOT allow OpenAI to:

- calculate accuracy
- change posture status
- override Rule Engine results
- decide whether completion threshold is reached
- modify landmark data
- modify pose features
- change rule thresholds

OpenAI only communicates the locally determined result.

--------------------------------------------------
16. ERROR HANDLING
--------------------------------------------------

Voice failure must never break:

- camera
- MediaPipe
- pose tracking
- scoring
- rule engine
- session state
- completion flow

If OpenAI Realtime disconnects:

- keep camera and pose engine running
- preserve session state
- show/recover voice connection state
- reconnect according to existing safe reconnect strategy
- never restart MediaPipe unnecessarily

If microphone permission fails:

- camera and pose tracking continue
- user can still use visual coaching
- do not crash the session

--------------------------------------------------
17. AVATAR INTEGRATION
--------------------------------------------------

Do NOT implement true dynamic AI avatar/lip-sync in this step.

Existing Alice/Kevin visual/avatar implementation should remain intact.

Voice output can continue through the existing avatar/voice presentation layer.

Do not replace existing Flow-generated guide videos.

This step is only about the coaching/voice architecture.

--------------------------------------------------
18. STATE SEPARATION
--------------------------------------------------

Maintain clear separation:

Camera State
Pose State
Session State
Voice State
Avatar State

No component should assume:

camera stopped = session stopped
camera stopped = voice stopped
voice stopped = session stopped

These are independent systems.

--------------------------------------------------
19. LOGGING / DEBUGGING
--------------------------------------------------

Add development-only structured logs.

Examples:

[CoachingEvent]
pose_correction
Warrior II
left_knee
medium

[Voice]
event_sent
pose_correction

[Voice]
user_interrupted

[Voice]
realtime_connected

[Voice]
realtime_disconnected

Do not log:

- API keys
- sensitive audio data
- unnecessary user information

--------------------------------------------------
20. TESTS
--------------------------------------------------

Add/update tests for:

1. Same correction does not emit every frame.
2. Correction cooldown works.
3. Meaningful issue change creates a new event.
4. Good form fires only on transition.
5. Pose completion fires once.
6. Safety warning can bypass normal cooldown.
7. Camera loss does not terminate voice session.
8. Camera recovery does not create a second voice session.
9. Voice failure does not stop pose tracking.
10. New asana does not create duplicate Realtime sessions.
11. User interruption takes priority.
12. Completion at >=75% creates pose_completed.
13. 90% or 100% is NOT required.
14. 10-second hold is NOT required for completion.
15. OpenAI never receives frame-by-frame pose data.

--------------------------------------------------
21. MANUAL VALIDATION
--------------------------------------------------

Test at minimum:

Mountain Pose
Tree Pose
Warrior II

Test scenarios:

A. Correct posture
B. Incorrect posture
C. Repeated same correction
D. Changing correction
E. User leaves camera
F. User returns
G. User interrupts coach
H. Camera permission failure
I. OpenAI disconnect
J. Pose reaches 75%
K. Stay Here
L. Next Pose
M. End Session

Verify:

- one voice session only
- no duplicate audio
- no repeated corrections
- no camera restart
- no MediaPipe restart
- no session reset
- no OpenAI frame streaming
- no React render loop
- no Maximum update depth error

--------------------------------------------------
22. PERFORMANCE REQUIREMENT
--------------------------------------------------

The realtime pose pipeline must remain local.

DO NOT:

- send every landmark frame to backend
- send every landmark frame to OpenAI
- run network requests from requestAnimationFrame
- block MediaPipe processing waiting for OpenAI

OpenAI interaction must be event-driven and asynchronous.

--------------------------------------------------
23. FILE / ARCHITECTURE CLEANUP
--------------------------------------------------

Use the project's existing architecture.

Before creating new files, check whether equivalent services/stores already exist.

Prefer a structure conceptually similar to:

pose/
  PoseFeatureEngine
  RuleEvaluator
  PoseEvaluation

coaching/
  CoachingEvent
  CoachingEventGenerator
  CoachingEventQueue
  CoachingPriority
  CoachingConfig

voice/
  RealtimeVoiceService
  VoiceOrchestrator
  VoiceContext

session/
  SessionState
  SessionStore

Do not duplicate existing functionality.

--------------------------------------------------
24. IMPORTANT SCOPE LIMIT
--------------------------------------------------

Do NOT implement in this step:

- ML model training
- YOLO
- dynamic AI avatar generation
- lip-sync
- 3D avatar generation
- ElevenLabs
- browser speechSynthesis
- new pose rules beyond what already exists
- major UI redesign
- new backend architecture

This step is strictly:

PoseEvaluation
→ CoachingEvents
→ Voice Orchestrator
→ OpenAI Realtime

--------------------------------------------------
25. FINAL VALIDATION

After implementation:

- run TypeScript type-check
- run lint
- run unit tests
- run production build
- verify no duplicate RAF loops
- verify no duplicate Realtime sessions
- verify camera lifecycle remains stable
- verify voice lifecycle remains independent
- verify completion remains >=75%
- verify existing Step 1–6 functionality is not broken

At the end, provide:

1. Files changed
2. Architecture changes
3. Tests added/updated
4. Build/test results
5. Any remaining issues
6. Any assumptions made

Do NOT move to Step 8 yet.