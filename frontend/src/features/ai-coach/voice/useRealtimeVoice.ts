import { useEffect, useRef, useState, useCallback } from "react";
import { RealtimeVoiceAgent, type SessionContextData } from "./RealtimeVoiceAgent";
import { CoachTTSAgent } from "./CoachTTSAgent";
import { CoachDecisionEngine } from "./CoachDecisionEngine";
import type { VoiceState, CoachingEvent, VoiceTranscriptItem, VoiceConnectionState } from "./voice.types";

export function useRealtimeVoice() {
  const rtcAgentRef = useRef<RealtimeVoiceAgent | null>(null);
  const ttsAgentRef = useRef<CoachTTSAgent | null>(null);
  const decisionEngineRef = useRef<CoachDecisionEngine | null>(null);
  
  const statusRef = useRef<VoiceConnectionState>("disconnected");
  const lastActiveCoachRef = useRef<string>("alice");

  const [state, setState] = useState<VoiceState>({
    status: "disconnected",
    isMuted: false,
    error: null,
    transcripts: [],
    isConversationMode: false,
  });

  if (!ttsAgentRef.current) {
    ttsAgentRef.current = new CoachTTSAgent((item: VoiceTranscriptItem) => {
      setState((prev) => ({
        ...prev,
        transcripts: [...prev.transcripts.slice(-9), item],
      }));
    });
  }

  if (!rtcAgentRef.current) {
    rtcAgentRef.current = new RealtimeVoiceAgent(
      (status: VoiceConnectionState, error?: string) => {
        statusRef.current = status;
        setState((prev) => ({
          ...prev,
          status,
          error: error ?? (status === "error" ? prev.error : null),
        }));
      },
      (item: VoiceTranscriptItem) => {
        setState((prev) => ({
          ...prev,
          transcripts: [...prev.transcripts.slice(-9), item],
        }));
      },
    );

    decisionEngineRef.current = new CoachDecisionEngine({
      cooldownMs: 4000, 
      repeatSameRuleCooldownMs: 10000,
    });
  }

  const start = useCallback(async (coachId: string) => {
    lastActiveCoachRef.current = coachId;
    ttsAgentRef.current?.setCoach(coachId);
    
    // By default, start in TTS coaching mode (no WebRTC connection)
    statusRef.current = "connected";
    setState((prev) => ({ ...prev, error: null, status: "connected", isConversationMode: false }));
    decisionEngineRef.current?.reset();
  }, []);

  const toggleConversationMode = useCallback(async () => {
    setState((prev) => {
      const nextMode = !prev.isConversationMode;
      if (nextMode) {
        // Switching TO conversation mode: connect WebRTC
        ttsAgentRef.current?.stopSpeaking();
        rtcAgentRef.current?.connect(lastActiveCoachRef.current);
      } else {
        // Switching OFF conversation mode: disconnect WebRTC
        rtcAgentRef.current?.disconnect();
        statusRef.current = "connected";
      }
      return { ...prev, isConversationMode: nextMode, status: nextMode ? "connecting" : "connected" };
    });
  }, []);

  const stop = useCallback(() => {
    rtcAgentRef.current?.disconnect();
    ttsAgentRef.current?.stopSpeaking();
    decisionEngineRef.current?.reset();
    setState((prev) => ({ ...prev, isConversationMode: false, status: "disconnected" }));
  }, []);

  const mute = useCallback(() => {
    setState((prev) => {
      rtcAgentRef.current?.setMuted(true);
      ttsAgentRef.current?.setMuted(true);
      return { ...prev, isMuted: true };
    });
  }, []);

  const unmute = useCallback(() => {
    setState((prev) => {
      rtcAgentRef.current?.setMuted(false);
      ttsAgentRef.current?.setMuted(false);
      return { ...prev, isMuted: false };
    });
  }, []);

  const toggleMute = useCallback(() => {
    setState((prev) => {
      const nextMuted = !prev.isMuted;
      rtcAgentRef.current?.setMuted(nextMuted);
      ttsAgentRef.current?.setMuted(nextMuted);
      return { ...prev, isMuted: nextMuted };
    });
  }, []);

  const dispatchEvent = useCallback((event: CoachingEvent, context?: any) => {
    const decision = decisionEngineRef.current?.evaluate(event, context);
    if (decision?.shouldSpeak) {
       console.log(`[AI COACH] Coaching event approved: type=${event.type}, priority=${decision.priority}, reason=${decision.reason}`);
       // Use TTS for fast posture guidance, unless in conversation mode
       if (state.isConversationMode) {
         rtcAgentRef.current?.sendCoachingEvent(event);
       } else {
         ttsAgentRef.current?.sendCoachingEvent(event, decision.priority);
       }
    } else if (decision) {
       console.log(`[AI COACH] Coaching event suppressed: type=${event.type}, priority=${decision.priority}, reason=${decision.reason}`);
    }
  }, [state.isConversationMode]);

  const triggerPoseStart = useCallback((asanaId: string, asanaName: string, asanaDescription?: string) => {
    if (state.isConversationMode) {
      rtcAgentRef.current?.triggerPoseStart(asanaId, asanaName, asanaDescription);
    } else {
      const desc = asanaDescription ? ` ${asanaDescription}` : '';
      ttsAgentRef.current?.speak(`Let's begin ${asanaName}.${desc} Stand comfortably and check your posture.`, 10, "pose_started");
    }
  }, [state.isConversationMode]);

  const speakGreeting = useCallback(() => {
    if (state.isConversationMode) {
      rtcAgentRef.current?.speakGreeting();
    } else {
      ttsAgentRef.current?.speak("Welcome to your practice. Let's get started.", 10, "greeting");
    }
  }, [state.isConversationMode]);

  const speak = useCallback((text: string) => {
    if (state.isConversationMode) {
      rtcAgentRef.current?.speak(text);
    } else {
      ttsAgentRef.current?.speak(text, 5);
    }
  }, [state.isConversationMode]);

  const updateSessionContext = useCallback((context: SessionContextData) => {
    rtcAgentRef.current?.updateSessionContext(context);
  }, []);

  useEffect(() => {
    return () => {
      rtcAgentRef.current?.disconnect();
      ttsAgentRef.current?.stopSpeaking();
    };
  }, []);

  return {
    state,
    start,
    stop,
    mute,
    unmute,
    retry: () => start(lastActiveCoachRef.current),
    connect: start,
    disconnect: stop,
    toggleMute,
    toggleConversationMode,
    dispatchEvent,
    updateSessionContext,
    triggerPoseStart,
    speakGreeting,
    speak,
    getRemoteAudioStream: () => rtcAgentRef.current?.getRemoteAudioStream() ?? null,
  };
}
