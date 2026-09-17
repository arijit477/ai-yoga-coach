Implement a production-quality ElevenLabs realtime TTS voice layer in the existing YogaVerse AI Yoga Coach repository.

IMPORTANT:
Do NOT rebuild the application.
Do NOT replace React.
Do NOT replace MediaPipe.
Do NOT replace PoseEvaluator.
Do NOT replace the existing OpenAI conversational intelligence.
Do NOT implement Tavus, MuseTalk, LiveTalking, or LiveKit in this task.
Do NOT modify unrelated features.

The goal of this task is specifically to replace the current generic/normal TTS voice with a high-quality, natural, humanistic British English coach voice using ElevenLabs.

The client's desired experience is:
- crisp British English accent
- humanistic delivery
- natural pacing
- expressive but professional
- warm and conversational
- suitable for a premium yoga instructor
- low latency
- supports interruption
- does not sound like generic browser/system TTS

==================================================
1. FIRST INSPECT THE EXISTING VOICE ARCHITECTURE
==================================================

Before changing code, inspect the entire repository and identify:

- current OpenAI Realtime implementation
- current microphone implementation
- current audio output implementation
- current TTS implementation
- any browser speechSynthesis usage
- current voice state
- current Alice/Kevin personality configuration
- CoachingEvent implementation
- correction cooldown
- existing audio interruption handling

Do not assume the implementation.

Produce a short internal architecture summary before editing.

Preserve existing OpenAI conversational reasoning wherever possible.

==================================================
2. ELEVENLABS CONFIGURATION
==================================================

Add backend-only environment variables:

ELEVENLABS_API_KEY=
ELEVENLABS_ALICE_VOICE_ID=
ELEVENLABS_KEVIN_VOICE_ID=

Optional:

ELEVENLABS_MODEL_ID=eleven_flash_v2_5

Never expose:

ELEVENLABS_API_KEY

to the React/browser bundle.

Do NOT use:

VITE_ELEVENLABS_API_KEY

Do not hardcode voice IDs.

==================================================
3. VOICE PROVIDER ABSTRACTION
==================================================

Create a provider abstraction so the application is not tightly coupled to ElevenLabs.

Conceptually:

VoiceProvider
  ├── synthesize()
  ├── stream()
  ├── stop()
  └── dispose()

Implement:

ElevenLabsVoiceProvider

The provider should be replaceable in the future.

==================================================
4. KEEP OPENAI AS THE CONVERSATIONAL BRAIN
==================================================

Do not use ElevenLabs as the LLM.

OpenAI remains responsible for:

- understanding user speech
- understanding current asana
- understanding pose context
- generating coaching responses
- answering yoga questions
- handling conversational context
- deciding what the coach should say

ElevenLabs is responsible ONLY for converting the final coach response into speech.

Architecture:

User Speech
    ↓
OpenAI
    ↓
Coach Response Text
    ↓
ElevenLabs
    ↓
Audio

Do not send pose frames to ElevenLabs.

Do not send camera frames to ElevenLabs.

==================================================
5. REALTIME STREAMING
==================================================

Use ElevenLabs realtime streaming rather than generating a complete long MP3 before playback.

Prefer ElevenLabs Flash v2.5 for low-latency realtime speech.

Use the current official ElevenLabs realtime TTS/WebSocket API.

Do not implement a fake streaming system by downloading a complete audio file first.

The user should begin hearing the coach as soon as practical after the response begins.

Handle audio chunks efficiently.

Do not create unnecessary temporary audio files.

==================================================
6. BRITISH ENGLISH VOICES
==================================================

Alice:

British English female voice.

Desired characteristics:

- warm
- elegant
- calm
- graceful
- patient
- supportive
- clear
- natural
- professional
- slightly soft
- not overly dramatic

Kevin:

British English male voice.

Desired characteristics:

- confident
- energetic
- warm
- athletic
- motivating
- clear
- natural
- professional

Do not force the accent through text spelling such as:

"gentlyyy"
"right-o"
"brilliant, mate"

Use an actual British English voice.

Use the configured ElevenLabs voice IDs.

==================================================
7. VOICE SETTINGS
==================================================

Create centralized voice configuration.

Conceptually:

const ALICE_VOICE_CONFIG = {
  voiceId: process.env.ELEVENLABS_ALICE_VOICE_ID,
  modelId: process.env.ELEVENLABS_MODEL_ID,
  languageCode: "en-GB",
};

const KEVIN_VOICE_CONFIG = {
  voiceId: process.env.ELEVENLABS_KEVIN_VOICE_ID,
  modelId: process.env.ELEVENLABS_MODEL_ID,
  languageCode: "en-GB",
};

Do not scatter voice settings across components.

Use the current ElevenLabs API-supported parameters.

Do not invent unsupported API parameters.

==================================================
8. NATURAL COACHING DELIVERY
==================================================

The voice will sound human only if the generated text is also natural.

Do not generate robotic technical sentences.

Bad:

"Your right knee angle is currently 145 degrees which is outside the target range."

Good:

"Gently bend your right knee a little more."

Bad:

"Your shoulder alignment has improved."

Good:

"Lovely. Keep those shoulders relaxed."

Bad:

"Your pose accuracy is 82 percent."

Good:

"That's looking much stronger. Hold it there."

The voice layer should receive concise coaching text.

==================================================
9. COACH RESPONSE LENGTH
==================================================

Automatic posture corrections should normally be:

1 short sentence.

Target approximately:
5–18 words.

Examples:

"Relax your shoulders and take a slow breath."

"Bring your front knee slightly outward."

"Beautiful. Hold that position."

"Almost there. Keep your hips level."

Do not make every correction a paragraph.

User questions may receive longer responses when appropriate.

==================================================
10. COACH PERSONALITY
==================================================

Alice:

You are Alice, a calm, warm and graceful yoga instructor.

Speak naturally.
Use gentle encouragement.
Never sound robotic.
Avoid excessive praise.
Do not repeat the same phrase continuously.

Kevin:

You are Kevin, an energetic, confident and friendly yoga instructor.

Speak naturally.
Use motivating but professional language.
Avoid shouting or exaggerated enthusiasm.
Do not repeat the same phrase continuously.

==================================================
11. COACHING PHRASE VARIATION
==================================================

Avoid repeating identical corrections.

For example, instead of always:

"Straighten your knee."

allow natural variants:

"Gently straighten your front knee."

"Bring that knee a little straighter."

"Let's lengthen that front leg slightly."

However:

Do NOT randomly vary the actual correction meaning.

The PoseEvaluator remains authoritative.

==================================================
12. PRIORITY SYSTEM
==================================================

Voice events must respect priority.

Highest:

safety_warning

Then:

user_question / user_speech

Then:

pose_correction

Then:

good_form

Then:

pose_held

Do not allow low-priority praise to interrupt an important correction or user conversation.

==================================================
13. INTERRUPTION
==================================================

This is critical.

If the coach is speaking and the user starts speaking:

1. immediately stop current ElevenLabs audio playback
2. clear pending audio chunks
3. return to listening state
4. process the user's speech
5. generate the new response
6. stream the new response through ElevenLabs

Do not wait for the previous speech to finish.

Do not overlap two voices.

Only one coach speech stream can be active at a time.

==================================================
14. VOICE STATE
==================================================

Create a dedicated voice state.

Do not combine voice state with pose state.

Use:

idle
listening
thinking
speaking
interrupted
error

Example:

idle
 ↓
listening
 ↓
thinking
 ↓
speaking
 ↓
idle

If user interrupts:

speaking
 ↓
interrupted
 ↓
listening

==================================================
15. AI COACH UI
==================================================

Update the existing AI Coach UI to display clear voice states.

Examples:

Listening
Analyzing Posture
Coaching
Speaking
Ready

Use subtle animation.

Do not create excessive UI movement.

Do not cause the camera or MediaPipe component to rerender/reinitialize when voice state changes.

==================================================
16. REMOVE GENERIC TTS
==================================================

If the existing application uses:

window.speechSynthesis

or another generic/system TTS implementation for coaching:

remove it from the production coaching path.

Do not remove unrelated browser speech functionality if it is required elsewhere.

The production coaching voice must use ElevenLabs.

==================================================
17. AUDIO PLAYBACK
==================================================

Implement a stable audio playback manager.

Responsibilities:

- receive streaming audio
- queue chunks correctly
- play continuously
- stop immediately on interruption
- clear queued audio
- avoid gaps between chunks
- release resources correctly
- recover from audio errors

Do not create a new Audio object on every React render.

Keep audio playback outside high-frequency MediaPipe render cycles.

Use refs/state appropriately.

==================================================
18. MEDIA PIPE ISOLATION
==================================================

Do not modify the MediaPipe processing loop unnecessarily.

The application currently performs realtime pose tracking.

Ensure:

- pose frames do not trigger TTS directly
- MediaPipe does not create ElevenLabs requests
- score updates do not recreate the voice provider
- angle updates do not recreate the voice provider
- voice updates do not restart MediaPipe
- voice playback does not restart the camera

Only stabilized CoachingEvents should reach the voice orchestration layer.

==================================================
19. COACHING EVENT → VOICE
==================================================

Use the existing CoachingEvent architecture.

Example:

{
  type: "pose_correction",
  asanaId: "warrior-ii",
  asanaName: "Warrior II",
  score: 78,
  severity: "medium",
  ruleId: "warrior-ii-front-knee",
  joint: "right_knee",
  currentAngle: 145,
  targetRange: [165, 180],
  feedback: "Straighten your front knee slightly."
}

The voice system should convert this into natural spoken coaching.

Do not call ElevenLabs for every MediaPipe frame.

Use the existing event cooldown/stabilization.

==================================================
20. GOOD FORM
==================================================

Do not continuously speak:

"Good."

"Great."

"Excellent."

only speak on meaningful state transitions.

For example:

correction
 ↓
alignment achieved
 ↓
"Beautiful. That's much better."

Then remain quiet while the user holds.

==================================================
21. HOLD COUNTDOWN
==================================================

Do not speak all ten countdown numbers by default.

Prefer:

"Great. Hold this position for ten seconds."

Then optionally:

"Five seconds."

"Three... two... one."

The visual countdown remains continuously visible.

==================================================
22. ERROR HANDLING
==================================================

If ElevenLabs fails:

- show Voice unavailable
- do not crash the page
- do not stop MediaPipe
- do not stop the camera
- keep the existing conversational system functional where possible
- allow retry

If audio playback fails:

- reset playback manager
- clear pending audio
- return to idle/error
- allow another response

Never let voice failure break posture detection.

==================================================
23. API SECURITY
==================================================

ElevenLabs API key must remain backend-only.

If the current architecture requires the frontend to request speech:

React
 ↓
FastAPI
 ↓
ElevenLabs

Do not expose the API key.

Use server-side proxy/session handling as appropriate.

Do not log:
- API keys
- user private audio
- provider secrets

==================================================
24. FUTURE AVATAR COMPATIBILITY
==================================================

Design the voice output so that the same generated audio stream can later be sent to:

MuseTalk / LiveTalking
        ↓
Alice/Kevin lip sync
        ↓
LiveKit

Do not implement that integration now.

The voice provider should expose audio output in a way that a future avatar adapter can consume without redesigning the entire voice system.

Conceptually:

Coach Text
   ↓
VoiceProvider
   ↓
Audio Stream
   ├── Local Playback
   └── Future Avatar Pipeline

==================================================
25. TESTING
==================================================

Test Alice:

1. simple greeting
2. posture correction
3. praise
4. hold instruction
5. user question
6. interruption
7. repeated correction
8. long user question
9. ElevenLabs failure
10. network interruption

Test Kevin with the same cases.

Verify:

- British accent
- natural pacing
- no robotic browser voice
- low perceived latency
- no overlapping speech
- interruption works
- voice state updates correctly
- camera continues running
- MediaPipe continues running
- no React update-depth errors
- no audio memory leak
- no repeated ElevenLabs requests

==================================================
26. TEST VOICE SCRIPT
==================================================

Create a development-only voice test panel.

Alice test phrases:

"Welcome to YogaVerse. Take your time and get comfortable."

"Nice start. Let's gently relax your shoulders."

"Beautiful. That's much better. Hold that position."

"Almost there. Bring your front knee slightly outward."

"Excellent work. Take a slow breath and stay here."

Kevin test phrases:

"Nice work. You're almost there."

"Bring that knee slightly outward."

"Good. Keep your chest open."

"That's it. Hold strong and breathe."

"Excellent. You've got it."

The test panel must be disabled in production.

==================================================
27. VALIDATION
==================================================

Run:

npm run build

Run TypeScript checks.

Run backend startup/import checks.

Verify environment variables.

Verify no secrets are bundled into the frontend.

Search the codebase for:

speechSynthesis

and ensure production coaching no longer uses it.

Check for accidental:

new Audio()

inside React render functions.

Check for voice provider initialization inside high-frequency pose effects.

==================================================
28. DOCUMENTATION
==================================================

Update README with:

ElevenLabs setup
API key configuration
Alice voice configuration
Kevin voice configuration
local development
production environment variables
voice testing
troubleshooting

Create:

docs/VOICE_ARCHITECTURE.md

Document:

OpenAI
  ↓
Coach Response
  ↓
ElevenLabs
  ↓
Streaming Audio
  ↓
User

And future:

Streaming Audio
  ├── User
  └── MuseTalk
       ↓
    Alice/Kevin
       ↓
    LiveKit

==================================================
FINAL REQUIREMENT
==================================================

Do not implement unrelated features.

After implementation report:

1. files modified
2. files created
3. dependencies added
4. environment variables required
5. existing TTS implementation removed/replaced
6. OpenAI architecture preserved
7. interruption implementation
8. ElevenLabs model used
9. Alice voice configuration
10. Kevin voice configuration
11. build/test results
12. remaining manual configuration required

Most importantly:
The resulting voice must sound like a premium human British yoga instructor, not generic system TTS.