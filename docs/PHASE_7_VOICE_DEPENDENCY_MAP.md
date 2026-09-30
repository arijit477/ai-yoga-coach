# Phase 7: Voice Dependency Map & Consolidation Plan

This document establishes the authoritative inventory, usage audit, dependency mapping, and disposition decisions for all voice-related files and components across the YogaVerse frontend and backend repositories prior to architectural cleanup.

---

## Complete Voice Dependency Map

| File / Component | Used By | Purpose | Action | Rationale |
|---|---|---|---|---|
| `frontend/src/features/ai-coach/voice/RealtimeVoiceAgent.ts` | `useRealtimeVoice.ts`, Unit test suites | Authoritative WebRTC client managing ephemeral session handshake, WebRTC `recvonly` audio track, bidirectional DataChannel (`response.create`, `response.cancel`), remote audio playback via Web Audio API (`GainNode`/`AnalyserNode`), and coach persona context formatting. | **KEEP (Authoritative Client)** | Core engine for unidirectional OpenAI Realtime voice delivery. |
| `frontend/src/features/ai-coach/voice/useRealtimeVoice.ts` | `AICoachPage.tsx`, `index.ts` | Clean React hook adapter managing component lifecycle, connection state updates, mute toggling, audio unlocking, and forwarding approved coaching events to `RealtimeVoiceAgent`. | **KEEP (React Adapter)** | Essential React bridge between UI components and the `RealtimeVoiceAgent` service. |
| `frontend/src/features/ai-coach/voice/CoachDecisionEngine.ts` | `useRealtimeVoice.ts`, `WarriorIIPipelineVerification.ts`, Unit test suites | Deterministic decision engine arbitrating posture corrections, cooldown enforcement (4s baseline, 10s repeat rule suppression, 6s good-form cooldown), safety escalation, and session reset. | **KEEP (Decision Core)** | Ensures posture evaluation remains deterministic and decoupled from LLM generation. |
| `frontend/src/features/ai-coach/voice/CoachingEventEngine.ts` | `AICoachPage.tsx`, Unit test suites | Translates real-time pose metrics and camera readiness states into deduplicated, discrete `CoachingEvent` items with improvement tracking and recovery detection. | **KEEP (Event Core)** | Converts continuous frame-by-frame posture data into discrete coaching events. |
| `frontend/src/features/ai-coach/voice/CoachingEventBuilder.ts` | `AICoachPage.tsx`, `CoachingEventEngine.ts`, `WarriorIIPipelineVerification.ts`, Unit test suites | Factory functions for constructing structured `CoachingEvent` payloads (`pose_started`, `pose_correction`, `good_form`, `pose_completed`, `safety_warning`, `camera_ready`). | **KEEP (Event Factory)** | Centralizes structured event creation. |
| `frontend/src/features/ai-coach/voice/NaturalCoachLanguage.ts` | `CoachingEventBuilder.ts`, `CoachingEventEngine.ts` | Curated mindfulness phrases, breathing cues, and milestone messages for Alice and Kevin personas. | **KEEP (Linguistic Helpers)** | Provides structured encouragement strings without altering biomechanical rules. |
| `frontend/src/features/ai-coach/voice/voice.types.ts` | All voice components, `CoachPanel.tsx`, `VoiceControls.tsx`, `AICoachPage.tsx`, Unit test suites | Shared TypeScript type definitions for `CoachingEvent`, `CoachDecision`, `VoiceConnectionState`, `VoiceTranscriptItem`, `VoiceState`. | **KEEP (Type Definitions)** | Essential type contracts across voice and UI layers. |
| `frontend/src/features/ai-coach/voice/index.ts` | `AICoachPage.tsx` | Public module barrel export. | **KEEP (Module Export)** | Clean entry point for voice feature imports. |
| `frontend/src/features/ai-coach/voice/CoachTTSAgent.ts` | **NONE (Orphaned)** | Legacy audio-blob TTS client attempting to call `/api/ai-coach/tts`. | **REMOVE (Obsolete Legacy)** | Orphaned, unused, and superseded by `RealtimeVoiceAgent`. |
| `frontend/src/features/ai-coach/voice/providers/VoiceProvider.ts` | **NONE (Orphaned)** | Abstract TypeScript interface stub from obsolete multi-provider architecture. | **REMOVE (Obsolete Interface)** | Unused interface stub from prior ElevenLabs WebSocket proxy experiments. |
| `backend/app/api/routes/realtime.py` | `RealtimeVoiceAgent.ts` (`POST /api/ai-coach/realtime/session`), `test_realtime_hardening.py` | Hardened FastAPI router generating ephemeral OpenAI Realtime WebRTC tokens, enforcing rate limiting (10 req/min/IP), and injecting system instructions. | **KEEP (Authoritative Endpoint)** | Core security layer preventing frontend exposure of permanent OpenAI API keys. |
| `backend/app/api/routes/tts.py` | **NONE** (Previously `CoachTTSAgent.ts`) | Legacy HTTP endpoint (`POST`/`GET` `/api/ai-coach/tts`) proxying requests to ElevenLabs / OpenAI TTS. | **REMOVE (Obsolete Route)** | Unused by the application; creates architectural confusion with WebRTC Realtime. |
| `backend/app/main.py` | FastAPI Application Server | Main server routing configuration. | **REFACTOR (Route Pruning)** | Remove obsolete `app.include_router(tts.router)` import and inclusion. |

---

## Detailed Component Disposition

### 1. Authoritative Voice Client: `RealtimeVoiceAgent`
- **Location**: `frontend/src/features/ai-coach/voice/RealtimeVoiceAgent.ts`
- **Responsibilities**:
  1. Requests ephemeral session tokens from `backend/app/api/routes/realtime.py`.
  2. Sets up `RTCPeerConnection` with strict `recvonly` audio direction (no mic capture).
  3. Establishes bidirectional WebRTC DataChannel (`oai-events`).
  4. Dispatches prompt-injected `response.create` events for approved coaching cues.
  5. Manages in-flight speech cancellation (`response.cancel`) to prevent race conditions.
  6. Routes remote WebRTC audio stream into Web Audio API `GainNode` and `AnalyserNode` for avatar lip-sync and volume amplification.
  7. Performs comprehensive cleanup of peer connection, audio elements, and media streams on disconnect.

### 2. React Layer: `useRealtimeVoice`
- **Location**: `frontend/src/features/ai-coach/voice/useRealtimeVoice.ts`
- **Responsibilities**:
  1. Instantiates `RealtimeVoiceAgent` and `CoachDecisionEngine`.
  2. Maps connection status and transcripts to reactive React state (`VoiceState`).
  3. Exposes clean action callbacks: `start`, `stop`, `mute`, `unmute`, `toggleMute`, `unlockAudio`, `dispatchEvent`, `updateSessionContext`.
  4. Automatically disconnects and releases WebRTC resources upon component unmount.

### 3. Obsolete Files Scheduled for Safe Removal
1. `frontend/src/features/ai-coach/voice/CoachTTSAgent.ts` (197 lines) — Verified 0 references in active code.
2. `frontend/src/features/ai-coach/voice/providers/VoiceProvider.ts` (22 lines) — Verified 0 references in active code.
3. `backend/app/api/routes/tts.py` (160 lines) — Verified 0 references in active code.

---

## Verification Plan Prior to Deletion

1. Remove `tts` router inclusion from `backend/app/main.py`.
2. Delete `frontend/src/features/ai-coach/voice/CoachTTSAgent.ts`.
3. Delete `frontend/src/features/ai-coach/voice/providers/VoiceProvider.ts` and `frontend/src/features/ai-coach/voice/providers/` directory.
4. Delete `backend/app/api/routes/tts.py`.
5. Execute full TypeScript build (`npm.cmd run build`) to ensure 0 broken imports.
6. Execute frontend test suite (`node --import tsx --test src/features/ai-coach/voice/__tests__/*.test.ts`) to ensure 22/22 tests pass.
7. Execute backend test suite (`python test_realtime_hardening.py`) to ensure 5/5 tests pass.
