Implement the latest AI Yoga Coach tester feedback in the existing YogaVerse project.

IMPORTANT:
Do not create a mock implementation.
Do not replace the existing MediaPipe pose engine with another library.
Inspect the current implementation first and fix the underlying causes.
Preserve the existing React/Vite + FastAPI + MediaPipe architecture, OpenAI Realtime intelligence, ElevenLabs voice pipeline, asana rules, and session state machine.

The tester reported 11 issues. Group and solve them through the following engineering work.

==================================================
1. CAMERA STARTUP PERFORMANCE — HIGH PRIORITY
==================================================

Problem:
Camera takes too long to start in Safari and Chrome.

Inspect the current camera initialization lifecycle.

Requirements:
- Minimize time between clicking "Start Camera" and displaying the live camera.
- Do not initialize unnecessary MediaPipe/model resources before camera startup.
- Avoid repeated getUserMedia calls.
- Avoid repeatedly creating/destroying MediaPipe PoseLandmarker.
- Reuse the existing MediaPipe instance during the session.
- Start video playback as soon as the camera stream is available.
- Initialize secondary processing after the camera becomes visible where possible.
- Ensure permissions are requested only once.
- Handle Safari and Chrome correctly.
- Add clear loading state while camera initializes.
- Do not block camera rendering while unrelated UI/voice/avatar resources load.
- Do not preload unnecessary assets during camera startup.

Measure/inspect startup timing before and after the change.

==================================================
2. BROWSER-INDEPENDENT VOICE — HIGH PRIORITY
==================================================

Problem:
Voice sounds different between Safari and Chrome.

The browser's native speechSynthesis must NOT be used for production coaching.

Use the existing backend ElevenLabs proxy as the single speech-generation path.

Architecture:

OpenAI Realtime / Coach Intelligence
        ↓
Coaching Event
        ↓
Backend Voice Layer
        ↓
ElevenLabs
        ↓
Audio Stream
        ↓
Browser Playback

Requirements:
- Never use browser-native speechSynthesis for coach speech.
- Do not select a browser-specific voice.
- Alice must always use ELEVENLABS_ALICE_VOICE_ID.
- Kevin must always use ELEVENLABS_KEVIN_VOICE_ID.
- Keep ElevenLabs API key server-side.
- Keep voice generation out of MediaPipe frame processing.
- Use the same ElevenLabs model/settings for both browsers.
- Use the same voice configuration regardless of Safari/Chrome.
- Ensure audio playback itself does not modify pitch, speed, or voice characteristics.
- Investigate browser AudioContext/sample-rate differences if they affect playback.
- Normalize the playback pipeline where practical.

Add logging that identifies:
coach_id
voice_id
model
voice generation request
playback start/end

Never log the API key.

==================================================
3. ALICE AND KEVIN VOICE IDENTITY — HIGH PRIORITY
==================================================

Problem:
Voices do not feel like they match the selected coach and can sound robotic.

Requirements:

Alice:
- Calm
- Warm
- Graceful
- Patient
- Supportive
- Natural
- British English

Kevin:
- Confident
- Energetic
- Friendly
- Motivating
- Athletic
- Natural
- British English

Use the configured ElevenLabs voice IDs.

Verify:
- coach_id=alice always resolves to Alice voice.
- coach_id=kevin always resolves to Kevin voice.
- No fallback silently switches Alice to Kevin or vice versa.
- Invalid/missing voice IDs produce a clear backend error.

Improve voice generation settings for natural conversational delivery.

Do not make the voice overly dramatic or robotic.

Keep coaching sentences concise and conversational.

Examples:
"Nice start. Let's raise your elbows slightly."
"Almost there. Let your shoulders relax a little."
"Beautiful posture. Hold that position."
"Excellent work. Let's stay here for a few breaths."

Use contextual variation rather than repeating identical sentences.

==================================================
4. NO ACTIVITY / USER LEAVES CAMERA — MEDIUM PRIORITY
==================================================

Problem:
"No activity tracked" appears too quickly when the user temporarily leaves the camera.

Implement a grace period of approximately 5–10 seconds.

Recommended behavior:

User detected
    ↓
Tracking normally

No valid pose detected
    ↓
Grace period
    ↓
Show:
"Please return to the camera"

Continue waiting for approximately 7 seconds.

If user returns:
    ↓
Resume tracking normally

If user does not return:
    ↓
Enter existing no-activity/session handling

IMPORTANT:
Do not immediately reset the pose/session when one or a few MediaPipe frames fail.

Differentiate:
- temporary landmark loss
- partial body visibility
- complete absence from camera

Use temporal persistence rather than a single-frame decision.

Do not trigger voice repeatedly during the grace period.

==================================================
5. SKELETON JITTER / HYPER TRACKING — HIGH PRIORITY
==================================================

Problem:
Skeleton moves/shakes even when the user is standing still.

This is a core tracking problem and must be fixed properly.

Inspect the existing usePoseTracking and landmark rendering pipeline.

Implement temporal landmark smoothing.

Requirements:
- Maintain previous stable landmarks.
- Apply smoothing to x/y/z coordinates.
- Preserve landmark visibility/presence separately.
- Reject extreme single-frame jumps.
- Handle low-confidence landmarks safely.
- Do not smooth indefinitely or introduce obvious lag.
- Use adaptive smoothing where appropriate.
- Stable body positions should produce visually stable skeletons.
- Moving users should still be responsive.

Use a proper approach such as:
- exponential moving average
- One Euro filter
- adaptive EMA

Choose the approach that fits the existing architecture.

IMPORTANT:
The smoothing must happen before:
- angle calculation
- pose scoring
- skeleton rendering
- movement detection

Therefore all downstream systems use the same stabilized landmarks.

Do not create separate "smoothed landmarks" implementations for UI and scoring.

==================================================
6. FALSE MOVEMENT DETECTION — HIGH PRIORITY
==================================================

Problem:
System sometimes says the user is moving while they are actually still.

Do not determine movement from raw frame-to-frame landmark differences.

Create a stable movement detector using the smoothed landmarks.

Requirements:
- Calculate meaningful body movement from normalized landmark displacement.
- Ignore tiny jitter below a configurable threshold.
- Require movement persistence across multiple frames before declaring "moving".
- Require stability persistence before declaring "still".
- Avoid rapidly switching:

moving → still → moving → still

Use temporal hysteresis/debouncing.

Movement detection should have configurable thresholds.

Keep movement detection separate from pose accuracy.

==================================================
7. ACCURACY SCORE FLUCTUATION — HIGH PRIORITY
==================================================

Problem:
Accuracy percentage changes significantly while user holds the same pose.

The score must become stable.

IMPORTANT:
Do not simply freeze the score.

Use stabilized landmarks and stabilize the score.

Requirements:
- Pose evaluation must use smoothed landmarks.
- Calculate raw score normally.
- Apply temporal score smoothing.
- Avoid large score changes from tiny landmark noise.
- Use EMA/rolling average or another suitable temporal filter.
- Limit maximum score change per update where appropriate.
- Maintain responsiveness when the user genuinely changes posture.

Example:

Raw:
72 → 79 → 70 → 81 → 74

Displayed:
72 → 74 → 74 → 76 → 75

Do not hardcode these exact values.

The displayed score must represent the actual posture while remaining visually stable.

Use one score source for:
- circular accuracy indicator
- completion threshold
- hold eligibility
- coaching state
- pose report

Do not create multiple competing scores.

==================================================
8. SIMPLIFY SKELETON UI — MEDIUM PRIORITY
==================================================

Problem:
Skeleton is visually overwhelming.

The skeleton should become a coaching visualization, not a technical landmark display.

Requirements:
- Hide face landmarks.
- Hide unnecessary landmark dots.
- Show only the relevant body structure.
- Prioritize the body regions involved in the current asana.
- Highlight incorrect regions rather than highlighting everything equally.
- Keep the normal skeleton subtle.
- Incorrect body part → red/orange highlight.
- Improving → yellow/green.
- Correct → subtle green.
- Use correction arrows/target lines only when useful.

Do NOT display all 33 MediaPipe landmarks to the user.

Do NOT show Raw Geometry Data, FPS, or debugging information in production.

The internal system can continue using all required landmarks.

For each asana, define relevant joints/body regions.

Example:
Warrior II:
- shoulders
- elbows
- wrists
- hips
- knees
- ankles
- spine

The UI should make the required correction obvious within one glance.

==================================================
9. TARGET POSE IMAGE SIZE — MEDIUM PRIORITY
==================================================

Problem:
Reference pose becomes too small when user moves further away.

Improve the existing TargetPoseCard.

Requirements:
- Increase reference image visibility.
- Preserve aspect ratio.
- Keep it readable when camera is fullscreen.
- Allow expand/enlarge.
- Do not cover the user's body unnecessarily.
- Maintain responsive sizing.
- Keep it inside the camera stage.
- Ensure it remains visible during fullscreen.

Do not create a duplicate target-pose panel elsewhere.

==================================================
10. WARRIOR II ACCURACY — HIGH PRIORITY
==================================================

Problem:
Warrior II feels less accurate than other poses.

Inspect the actual Warrior II PoseRules and evaluator.

Do not simply lower the threshold to make the score look better.

Validate:
- left/right orientation handling
- mirrored camera handling
- shoulder alignment
- elbow extension
- hip position
- front knee alignment
- rear leg alignment
- foot orientation
- torso/spine alignment
- landmark visibility requirements
- angle ranges
- rule weights
- rule severity
- scoring normalization

Check whether the current RuleEvaluator correctly implements:
- angle
- distance
- horizontal_alignment
- vertical_alignment

Do not allow unsupported metrics to silently pass.

Test Warrior II with multiple body orientations and camera distances.

Tune the rules based on actual posture geometry rather than arbitrary score inflation.

==================================================
11. CLEAR CORRECT-POSE FEEDBACK — MEDIUM PRIORITY
==================================================

When the user's posture is correct, make it immediately obvious.

At the existing successful threshold:

- Show a clear green state.
- Entire relevant pose outline can transition to green.
- Show a subtle check/tick indicator.
- Display:
"Excellent Alignment"
or the appropriate existing positive state.
- Start/continue the hold tracker when pose-specific conditions are satisfied.
- Trigger positive coach feedback once.

Do not use excessive animations.

The success state should feel premium and professional.

==================================================
12. HOLDING / TEMPORAL VALIDATION
==================================================

Integrate the above stability work with the existing hold tracker.

Holding should require:
- sufficient pose accuracy
- pose-specific rule validity
- stable posture
- valid landmark confidence

Do not start the hold timer because of one good frame.

Require the valid condition to persist briefly before starting.

If posture briefly fluctuates because of tracking noise:
- do not immediately reset the hold
- use a small grace period

If the user genuinely breaks posture:
- pause/reset according to the existing session rules.

==================================================
13. VOICE EVENT STABILITY
==================================================

Because tracking will now be stabilized, make sure coaching events are also temporally stable.

Do not produce:

"Raise your elbow."
"Raise your elbow."
"Raise your elbow."

Use:
- correction cooldown
- event deduplication
- transition-based good-form events
- safety priority
- user speech priority

Priority:

1. Safety
2. User question/interruption
3. Important posture correction
4. Hold/completion
5. Positive feedback

User interruption must immediately stop queued coach speech.

==================================================
14. PERFORMANCE ARCHITECTURE
==================================================

Maintain a single stable MediaPipe requestAnimationFrame loop.

Do NOT restart the RAF loop because of:
- landmarks
- score
- angles
- evaluation
- coaching state
- voice state

Avoid the previous:
"Maximum update depth exceeded"

Use refs for rapidly changing values where appropriate.

Separate:
Camera
MediaPipe
Pose evaluation
UI
Voice
Avatar

so a change in one does not unnecessarily restart another.

==================================================
15. TESTING
==================================================

Test on:
- Chrome desktop
- Safari desktop where available
- different camera distances
- user standing still
- user moving
- user temporarily leaving frame
- Warrior II
- at least two other asanas

Verify:

1. Camera starts quickly.
2. Same coach voice is used across browsers.
3. Alice always sounds like Alice.
4. Kevin always sounds like Kevin.
5. No browser speechSynthesis is used.
6. Skeleton is stable when user is still.
7. Movement detection does not trigger from jitter.
8. Accuracy percentage remains relatively stable during a held pose.
9. Temporary camera loss gets approximately 7 seconds grace.
10. Skeleton UI is simpler and highlights relevant corrections.
11. Target pose remains readable.
12. Warrior II rules respond correctly to actual alignment.
13. Correct posture has an obvious green/check state.
14. Hold timer only starts after stable valid posture.
15. Voice events do not repeat or overlap.
16. No camera/MediaPipe restart loops.
17. No React maximum update depth errors.
18. Production build succeeds.

Before modifying code, inspect the current implementation and identify the root cause of each issue.

At the end provide:
- Root cause for each issue
- Files changed
- Tracking/smoothing algorithm implemented
- Movement detection logic
- Score stabilization logic
- Warrior II rule changes
- Camera startup optimization
- Voice changes
- UI changes
- Test results
- Remaining issues