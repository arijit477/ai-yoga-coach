Update the existing AI Yoga Coach project to simplify the AI Coach experience.

IMPORTANT:
Do not redesign the entire application.
Do not remove the existing MediaPipe pose detection or posture analysis.
Do not create a new voice architecture.
Use the existing OpenAI Realtime voice implementation.

GOAL:
Separate the AI Coach video/guide experience from the live AI Coach voice experience.

1. FIRST-TIME WELCOME VIDEO

- Keep the existing Alice/Kevin welcome/guide video.
- Play the welcome video only on the user's first entry into the AI Coach experience.
- After the video is completed or skipped, mark the welcome experience as completed.
- Persist this state using localStorage or the existing user/session persistence mechanism.
- Example:
  `aiCoachWelcomeSeen = true`
- On future visits, do NOT automatically play the welcome video again.
- Do not replay the video when changing poses or restarting a session.

2. AFTER WELCOME VIDEO

After the first-time welcome video:

Show the normal AI Coach screen.

Do not keep the welcome video as part of the active coaching loop.

The main screen should contain:

- Camera
- Current pose/reference pose
- Posture/accuracy information
- AI Coach status
- Clear voice button

Example:

[ Camera / Pose Area ]

AI Coach
Alice

"Ready when you are."

[ 🎙 Speak with Alice ]

For Kevin:

[ 🎙 Speak with Kevin ]

3. SEPARATE VOICE CONTROL

Add a dedicated button:

`Speak with Alice`
or
`Speak with Kevin`

The button should explicitly start the OpenAI Realtime voice session.

Before the button is clicked:
- Do not automatically start the voice session.
- Do not automatically speak.
- Do not initialize unnecessary voice resources.

After clicking:
- Establish the OpenAI Realtime session.
- Start microphone capture.
- Enable natural two-way conversation.
- Update button state to something like:
  `Listening...`
  `Speaking...`
  `Connected`

Allow the user to stop/end the voice conversation.

4. VOICE COACHING MUST USE ACTUAL APP STATE

The voice agent must NOT behave like a generic chatbot.

It should receive the structured state from the existing application:

- camera enabled/disabled
- user visible/not visible
- full body detected/not detected
- calibration state
- current asana
- posture score
- current posture issue
- issue severity
- issue improving/resolved
- pose stability
- hold state
- session state
- safety state

Do NOT send raw camera frames or all 33 MediaPipe landmarks to OpenAI.

MediaPipe + the deterministic posture engine remain the source of truth.

OpenAI Realtime is responsible for communicating naturally with the user.

5. SIMPLE INITIAL VOICE FLOW

When the user clicks "Speak with Coach":

The coach should first check the basic state.

Example behavior:

If camera is disabled:
"Please enable your camera first."

If camera is enabled but no person is detected:
"I can't see you yet. Step into the camera frame."

If only part of the body is visible:
"I can see you, but not your full body. Take a small step back."

If the camera is ready:
"Perfect. Let's get you ready."

Then:

"Stand comfortably and hold still for a moment."

After calibration:

"Lovely. Let's start with your pose."

Then the coach should react to actual posture events.

6. POSTURE COACHING

When the posture engine detects an issue:

Do NOT send technical rule names to the user.

Instead convert the structured correction into natural coaching.

Example:

Engine:
left_knee_angle = outside target

Coach:
"Your left knee is drifting inward. Gently push it out."

When improving:

"Yes, that's much better."

When resolved:

"That's it. Keep that alignment."

Only speak when meaningful.

Do not speak every frame.

Do not repeatedly say:
"Great job."
"Excellent."
"Keep going."

Use varied, short, natural coaching language.

7. COACHING PRIORITY

Use this priority:

1. Safety
2. Camera unavailable
3. User out of frame
4. Partial body visibility
5. User question/interruption
6. Major posture correction
7. Posture improvement/resolution
8. Pose completion
9. Minor encouragement

Only one primary correction should normally be spoken at a time.

8. 75% COMPLETION

Keep the existing application-controlled completion rule.

When the deterministic pose engine reaches:

`score >= 75`

trigger the existing "Asana Completed" popup.

The popup is controlled by the application, NOT OpenAI.

The coach can say something natural such as:

"Lovely alignment. You've completed this pose."

Do not automatically move to the next pose.

The user chooses:

- Next Pose
- Stay Here

9. VIDEO MUST NEVER RESTART

Make sure the welcome video component is completely isolated from:

- MediaPipe render updates
- pose score updates
- posture evaluation updates
- voice state updates
- camera state updates
- asana changes

Do not use changing React keys.

Do not remount the video because of state changes.

Do not reset `currentTime` or call `play()` on every render.

10. VOICE MUST NEVER DEPEND ON VIDEO

The voice agent must work independently from the welcome video.

The architecture should be:

First visit:

Welcome Video
      ↓
AI Coach Screen
      ↓
User clicks "Speak with Coach"
      ↓
OpenAI Realtime
      ↓
Camera/Calibration/Posture Context
      ↓
Natural Voice Coaching

Returning visit:

AI Coach Screen
      ↓
User clicks "Speak with Coach"
      ↓
OpenAI Realtime
      ↓
Camera/Calibration/Posture Context
      ↓
Natural Voice Coaching

11. REMOVE UNNECESSARY VOICE PATHS

The active AI Coach voice path should use:

OpenAI Realtime only.

Remove/disable:

- ElevenLabs
- browser `speechSynthesis`
- duplicate TTS systems
- automatic voice playback unrelated to OpenAI Realtime

Do not break unrelated existing functionality.

12. IMPORTANT UX

Keep the UI simple.

Do not add extra technical controls such as:

- raw landmarks
- FPS
- angle debug
- voice provider selector
- TTS provider selector
- developer controls
- technical posture data

The user should simply see:

Camera
Reference Pose
Posture Feedback
AI Coach
Speak with Coach

13. IMPLEMENTATION SAFETY

Before changing code:

- inspect the existing AI Coach implementation
- identify the current welcome video component
- identify the existing OpenAI Realtime implementation
- identify camera state
- identify pose evaluation state
- identify coaching events/context
- reuse existing architecture wherever possible

Do not create duplicate camera loops, MediaPipe loops, or Realtime sessions.

Do not introduce another voice service.

Do not rewrite working posture detection.

After implementation:

- run TypeScript/build checks
- verify no Maximum update depth errors
- verify MediaPipe RAF loop remains stable
- verify avatar/video does not flicker or remount
- verify welcome video plays only once
- verify returning users do not see the welcome video
- verify Speak with Coach starts OpenAI Realtime
- verify voice reacts to camera state
- verify voice reacts to actual posture corrections
- verify 75% completion popup remains application-controlled
- verify voice failure does not break camera/posture detection

Deliver a concise summary of:
1. files changed
2. welcome-video persistence implementation
3. voice button implementation
4. OpenAI Realtime integration changes
5. camera/posture context used by the coach
6. test/build result