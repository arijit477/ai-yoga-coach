import { useEffect, useRef, useState, useCallback } from "react";
import { RealtimeVoiceAgent, type SessionContextData } from "./RealtimeVoiceAgent";
import { CoachDecisionEngine, DEFAULT_COACHING_CONFIG } from "./CoachDecisionEngine";
import type { VoiceState, CoachingEvent, VoiceTranscriptItem, VoiceConnectionState } from "./voice.types";

export function useRealtimeVoice() {
  const agentRef = useRef<RealtimeVoiceAgent | null>(null);
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

  if (!agentRef.current) {
    agentRef.current = new RealtimeVoiceAgent(
      (status, error) => {
        statusRef.current = status;
        setState((prev) => ({ ...prev, status, error: error || null }));
      },
      (item: VoiceTranscriptItem) => {
        setState((prev) => ({
          ...prev,
          transcripts: [...prev.transcripts.slice(-9), item],
        }));
      }
    );
    decisionEngineRef.current = new CoachDecisionEngine(DEFAULT_COACHING_CONFIG);
  }

  const start = useCallback(async (coachId: string) => {
    lastActiveCoachRef.current = coachId;
    decisionEngineRef.current?.reset();
    await agentRef.current?.connect(coachId);
  }, []);

  const stop = useCallback(() => {
    agentRef.current?.disconnect();
    decisionEngineRef.current?.reset();
    statusRef.current = "disconnected";
    setState((prev) => ({ ...prev, status: "disconnected" }));
  }, []);

  const mute = useCallback(() => {
    setState((prev) => {
      agentRef.current?.setMuted(true);
      return { ...prev, isMuted: true };
    });
  }, []);

  const unmute = useCallback(() => {
    setState((prev) => {
      agentRef.current?.setMuted(false);
      return { ...prev, isMuted: false };
    });
  }, []);

  const toggleMute = useCallback(() => {
    setState((prev) => {
      const nextMuted = !prev.isMuted;
      agentRef.current?.setMuted(nextMuted);
      return { ...prev, isMuted: nextMuted };
    });
  }, []);

  const unlockAudio = useCallback(() => {
    agentRef.current?.unlockAudio();
  }, []);

  const dispatchEvent = useCallback((event: CoachingEvent, context?: any) => {
    const decision = decisionEngineRef.current?.evaluate(event, context);
    if (decision?.shouldSpeak) {
       console.log(`[AI COACH] Coaching event approved: type=${event.type}, priority=${decision.priority}, reason=${decision.reason}`);
       agentRef.current?.sendCoachingEvent(event);
    } else if (decision) {
       console.log(`[AI COACH] Coaching event suppressed: type=${event.type}, priority=${decision.priority}, reason=${decision.reason}`);
    }
  }, []);

  const triggerPoseStart = useCallback((asanaId: string, asanaName: string, asanaDescription?: string) => {
    agentRef.current?.triggerPoseStart(asanaId, asanaName, asanaDescription);
  }, []);

  const speakGreeting = useCallback(() => {
    agentRef.current?.speakGreeting();
  }, []);

  const speak = useCallback((text: string) => {
    agentRef.current?.speak(text);
  }, []);

  const updateSessionContext = useCallback((context: SessionContextData) => {
    agentRef.current?.updateSessionContext(context);
  }, []);

  useEffect(() => {
    return () => {
      agentRef.current?.disconnect();
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
    unlockAudio,
    dispatchEvent,
    updateSessionContext,
    triggerPoseStart,
    speakGreeting,
    speak,
    resetEngine: () => decisionEngineRef.current?.reset(),
    getRemoteAudioStream: () => agentRef.current?.getRemoteAudioStream() || null,
  };
}
