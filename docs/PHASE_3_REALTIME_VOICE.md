# Phase 3 — Unidirectional OpenAI Realtime Voice Coach Optimization

**Repository:** [ai-yoga-coach](https://github.com/arijit477/ai-yoga-coach)  
**Date:** 2026-09-30  
**Phase:** Phase 3 — Optimize Unidirectional OpenAI Realtime Voice Coach  

---

## 1. Architecture

The AI Yoga Coach voice system operates as a **strictly unidirectional, low-latency, event-driven speech instructor**:

```
[MediaPipe Vision] (Local 30+ FPS GPU)
       │
       ▼
[Pose Rule Evaluator] (Joint angles & deviations)
       │
       ▼
[Coaching Event Engine] (State transitions & milestones)
       │
       ▼
[Coach Decision Engine] (Priorities & cooldowns)
       │
       ▼ Approved Event
[RealtimeVoiceAgent] (Unidirectional WebRTC Client)
       │
       │ DataChannel ("oai-events"): { type: "response.create", instructions: "..." }
       ▼
[OpenAI Realtime API] (gpt-realtime-2.1-mini)
       │
       │ WebRTC Remote Audio Stream (24kHz Opus/PCM)
       ▼
[AudioContext & GainNode (2.5x)] ──► [Speakers (audioCtx.destination)]
       │
       ▼
[AnalyserNode (FFT 256)] ─────────► [AvatarPlayer Speaking Animation (Lip-sync)]
```

---

## 2. Why Voice Is Unidirectional

1. **Product Purpose:**
   - The user is practicing yoga on a mat in front of a camera. The interaction is visual and physical.
   - The AI acts as an **observant instructor**, giving real-time verbal alignment cues (e.g. *"Sink your front knee a little deeper"* or *"Soften your shoulders and hold"*).
   - It is **not** a conversational Q&A chatbot.
2. **Performance & Reliability:**
   - Eliminating microphone capture removes background ambient noise, heavy breathing audio artifacts, echo cancellation complexity, and server VAD false triggers.
   - WebRTC connection is created with `recvonly` audio direction, saving bandwidth, eliminating client microphone permission prompts, and ensuring zero latency on instructional cues.

---

## 3. WebRTC Configuration

- **Transceiver Direction:** `pc.addTransceiver("audio", { direction: "recvonly" })`.
- **Signaling:** Client creates local SDP offer, sending it directly to `https://api.openai.com/v1/realtime/calls` authenticated with an ephemeral `client_secret` minted by FastAPI.
- **Connection Monitoring:**
  - `pc.onconnectionstatechange`: Detects `"connected"`, `"disconnected"`, and `"failed"`.
  - `pc.oniceconnectionstatechange`: Detects ICE disconnects and prompts the user with an in-place recovery option.
- **DataChannel:** `"oai-events"` created by the client for bidirectional JSON protocol messages (`response.create`, `response.cancel`, `response.done`, transcripts, and tool calls).

---

## 4. DataChannel Flow

1. **Client $\rightarrow$ OpenAI:**
   - `response.create`: Triggers voice generation with localized prosody cues (e.g., `instructions: "Speak this yoga guidance with a peaceful, warm, graceful tone: 'Let's step into Warrior Two.'"`).
   - `response.cancel`: Sent when an active speech item must be interrupted by a higher-priority correction.
   - `conversation.item.create`: Returns local computer vision context for function calls (`get_camera_status`, `get_posture_status`, etc.).
2. **OpenAI $\rightarrow$ Client:**
   - `response.created` / `response.output_item.added` / `response.audio.delta`: Marks `hasActiveServerResponse = true`.
   - `response.audio_transcript.done`: Delivers finalized text for accessibility transcripts.
   - `response.done` / `response.cancelled`: Marks `hasActiveServerResponse = false` and executes any pending queued speech.
   - `error`: Handles race condition error codes (`response_cancel_not_active`, `conversation_already_has_active_response`) safely.

---

## 5. Pose $\rightarrow$ Voice Flow

- **Zero Raw Landmark Transmission:** MediaPipe 33-point skeletal landmark coordinates and video frames are **never** transmitted to OpenAI.
- **Rule Evaluation:** Calculated joint angles and deviation scores are processed locally.
- **Decision Filtering:**
  - Priority 1: Safety warnings (immediate preemption).
  - Priority 2-4: Camera visibility changes.
  - Priority 6: Posture corrections.
  - Priority 9: Good form & breathing milestones.
  - Cooldowns: 4,000ms global cooldown, 10,000ms repeat rule cooldown, 6,000ms good-form cooldown.
- **Execution:** Only approved coaching events reach `RealtimeVoiceAgent.speak()`.

---

## 6. Audio Playback

- **Web Audio API Routing:**
  - `remoteAudioStream` $\rightarrow$ `MediaStreamAudioSourceNode` $\rightarrow$ `GainNode` $\rightarrow$ `AnalyserNode` $\rightarrow$ `audioCtx.destination`.
- **Gain Tuning:** Configured to `2.5x` (`DEFAULT_GAIN = 2.5`), providing a clear and audible coaching voice without clipping or digital distortion.
- **Echo Suppression:** The hidden `<audio>` DOM element remains permanently `muted = true` so audio plays exclusively through `AudioContext`.
- **Lip-Sync Detection:** An `AnalyserNode` polls frequency data every 50ms. An average energy threshold (`> 3.0`) sets `isSpeaking = true`, animating the coach video avatar smoothly in [`AvatarPlayer.tsx`](file:///c:/Users/prabi/OneDrive/Desktop/arijit/ai-yoga-coach/frontend/src/features/ai-coach/avatar/AvatarPlayer.tsx).

---

## 7. Response Handling & Race Condition Elimination

- **Atomic State Tracking:**
  - `hasActiveServerResponse`: Tracks in-flight generation.
  - `isCancelling`: Prevents duplicate `response.cancel` spam.
  - `pendingSpeechText`: Buffers the next spoken guidance if a response is currently active.
- **Safe Preemption:** When a higher-priority event arrives while the coach is speaking:
  1. `pendingSpeechText` is updated with the new text.
  2. If not already cancelling, `response.cancel` is dispatched.
  3. Upon receiving `response.cancelled` or `response.done`, the pending speech is immediately dispatched via `response.create`.
- **Benign Error Recovery:** `response_cancel_not_active` is caught gracefully and triggers the pending speech without UI disruption.

---

## 8. Interruption Handling

- Since microphone input is disabled (`recvonly`), interruption is purely **event-driven from computer vision**:
  - Example: User enters incorrect alignment $\rightarrow$ previous hold praise is cancelled $\rightarrow$ alignment correction is spoken immediately.
  - Example: User leaves camera frame $\rightarrow$ active cue is cancelled $\rightarrow$ camera warning is spoken immediately.

---

## 9. Reconnection & Lifecycle

- When `retry()` or `connect()` is invoked:
  1. All previous WebRTC connections, DataChannels, audio contexts, and intervals are cleanly torn down.
  2. A fresh ephemeral token is obtained from `/api/ai-coach/realtime/session`.
  3. A new `RTCPeerConnection` with `recvonly` audio is established.
  4. Audio analysis and playback resume automatically.
- **No Infinite Loops:** If reconnection fails, the status transitions to `"error"`, displaying a recoverable button in the UI.

---

## 10. Browser Compatibility

- **SpeechSynthesis Removed from Coaching Path:** Robotic browser `window.speechSynthesis` is completely removed from the active coaching path, ensuring consistent voice identity across Chrome, Safari, macOS, iOS, and Windows.
- **AudioContext Autoplay Handling:**
  - `unlockAudio()` can be invoked on any user gesture (e.g. clicking "Start AI Coach" or "Start Camera").
  - `audioCtx.resume()` is automatically called if `audioCtx.state === "suspended"`.

---

## 11. Files Modified

1. [`frontend/src/features/ai-coach/voice/RealtimeVoiceAgent.ts`](file:///c:/Users/prabi/OneDrive/Desktop/arijit/ai-yoga-coach/frontend/src/features/ai-coach/voice/RealtimeVoiceAgent.ts):
   - Enforced strict `recvonly` WebRTC transport without mic capture.
   - Refactored `response.create` and `response.cancel` queue state machine.
   - Balanced `GainNode` volume multiplier to `2.5x`.
   - Added connection state and ICE monitoring with clean error handling.
   - Removed `speechSynthesis` fallback from production coaching execution.
   - Added `unlockAudio()` for browser autoplay handling.
2. [`frontend/src/features/ai-coach/voice/useRealtimeVoice.ts`](file:///c:/Users/prabi/OneDrive/Desktop/arijit/ai-yoga-coach/frontend/src/features/ai-coach/voice/useRealtimeVoice.ts):
   - Exposed `unlockAudio()` and streamlined state lifecycle.
3. [`docs/PHASE_3_REALTIME_VOICE.md`](file:///c:/Users/prabi/OneDrive/Desktop/arijit/ai-yoga-coach/docs/PHASE_3_REALTIME_VOICE.md):
   - Created comprehensive Phase 3 architectural specification.

---

## 12. Known Issues / Next Phase Items

- **Orphaned TTS Files (Scheduled for Phase 7 Cleanup):** [`CoachTTSAgent.ts`](file:///c:/Users/prabi/OneDrive/Desktop/arijit/ai-yoga-coach/frontend/src/features/ai-coach/voice/CoachTTSAgent.ts) and [`VoiceProvider.ts`](file:///c:/Users/prabi/OneDrive/Desktop/arijit/ai-yoga-coach/frontend/src/features/ai-coach/voice/providers/VoiceProvider.ts) remain in the codebase as legacy files but are inactive.
- **Avatar Lip-Sync Granularity:** Volume-based RMS lip-sync in `AvatarPlayer.tsx` is functional; higher-precision viseme generation can be explored in future avatar iterations.
