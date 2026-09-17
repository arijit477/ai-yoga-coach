# AI Coach Voice Architecture

This document describes the voice architecture of the AI Yoga Coach, which relies on a hybrid approach combining OpenAI Realtime WebRTC for natural language understanding and conversation intelligence, and ElevenLabs for premium British Text-To-Speech (TTS).

## High-Level Data Flow

1. **User Audio Input:** The user's voice is captured by the browser microphone and streamed over WebRTC to the OpenAI Realtime API.
2. **Conversation & Coaching Intelligence:** OpenAI interprets the user's speech and the posture events dispatched by the local MediaPipe engine.
3. **Text Streaming Output:** OpenAI generates the coach's response. The Realtime session is configured with `modalities: ["text"]`. Instead of outputting audio, OpenAI streams text chunks (`response.text.delta`) back to the frontend over the WebRTC Data Channel.
4. **WebSocket Proxy:** The frontend (`ElevenLabsVoiceProvider.ts`) captures these text chunks and sends them via WebSocket to our FastAPI backend (`ws://localhost:8000/api/ai-coach/voice/stream`).
5. **ElevenLabs TTS:** The backend proxies the text chunks securely to the ElevenLabs WebSocket API, which generates premium speech using the `eleven_flash_v2_5` model.
6. **Audio Playback:** ElevenLabs returns Base64-encoded PCM audio frames to the frontend. The `AudioPlaybackManager.ts` decodes and queues these frames seamlessly using the Web Audio API (`AudioContext`).
7. **Avatar Synchronization:** The Web Audio API output is connected to a `MediaStreamAudioDestinationNode`, providing a continuous `MediaStream` that drives the lipsync of the video avatar (`AvatarPlayer.tsx`).

## Interruption Handling (VAD)

To support natural conversation, the AI coach must stop speaking immediately if the user interrupts.

1. When the user speaks, OpenAI's Server Voice Activity Detection (VAD) detects speech.
2. OpenAI sends an `input_audio_buffer.speech_started` event over the WebRTC Data Channel.
3. `RealtimeVoiceAgent.ts` intercepts this event and calls `voiceProvider.stop()`.
4. `ElevenLabsVoiceProvider` sends a flush signal to ElevenLabs to halt text processing.
5. `AudioPlaybackManager` instantly clears the Web Audio API buffers and resets playback, ensuring zero latency interruption.

## Security

The ElevenLabs API Key (`ELEVENLABS_API_KEY`) is completely hidden from the browser. All ElevenLabs communication routes through the FastAPI backend proxy.

## Future Extensibility

The `VoiceProvider` interface decouples the synthesis engine from the WebRTC logic. If we want to switch back to OpenAI voices or integrate a new provider (e.g. PlayHT, Google Cloud TTS), we simply implement a new class adhering to the `VoiceProvider` interface.
