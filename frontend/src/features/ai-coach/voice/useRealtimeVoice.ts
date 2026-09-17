import { useEffect, useRef, useState, useCallback } from "react";
import { RealtimeVoiceAgent, type SessionContextData } from "./RealtimeVoiceAgent";
import { CoachingEventDispatcher } from "./CoachingEventDispatcher";
import type { VoiceState, CoachingEvent, VoiceTranscriptItem, VoiceConnectionState } from "./voice.types";

export function useRealtimeVoice() {
  const agentRef = useRef<RealtimeVoiceAgent | null>(null);
  const dispatcherRef = useRef<CoachingEventDispatcher | null>(null);
  // Store latest status in a ref so dispatchEvent never re-creates due to status changes
  const statusRef = useRef<VoiceConnectionState>("disconnected");
  const lastActiveCoachRef = useRef<string>("kevin");

  const [state, setState] = useState<VoiceState>({
    status: "disconnected",
    isMuted: false,
    error: null,
    transcripts: [],
  });

  // Initialize refs once on first render (never re-runs)
  if (!agentRef.current) {
    agentRef.current = new RealtimeVoiceAgent(
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
          // Keep last 10 transcript items for lightweight dialogue
          transcripts: [...prev.transcripts.slice(-9), item],
        }));
      },
    );

    dispatcherRef.current = new CoachingEventDispatcher({
      cooldownMs: 4000, // 4 seconds default cooldown
      repeatSameRuleCooldownMs: 10000, // 10 seconds for repeating identical rule
    });
    dispatcherRef.current.setAgent(agentRef.current);
  }

  const start = useCallback(async (coachId: string) => {
    lastActiveCoachRef.current = coachId;
    statusRef.current = "connecting";
    setState((prev) => ({ ...prev, error: null, status: "connecting" }));
    if (agentRef.current) {
      await agentRef.current.connect(coachId);
      dispatcherRef.current?.reset();
    }
  }, []);

  const stop = useCallback(() => {
    if (agentRef.current) {
      agentRef.current.disconnect();
    }
    dispatcherRef.current?.reset();
  }, []);

  const mute = useCallback(() => {
    setState((prev) => {
      if (agentRef.current) {
        agentRef.current.setMuted(true);
      }
      return { ...prev, isMuted: true };
    });
  }, []);

  const unmute = useCallback(() => {
    setState((prev) => {
      if (agentRef.current) {
        agentRef.current.setMuted(false);
      }
      return { ...prev, isMuted: false };
    });
  }, []);

  const toggleMute = useCallback(() => {
    setState((prev) => {
      const nextMuted = !prev.isMuted;
      if (agentRef.current) {
        agentRef.current.setMuted(nextMuted);
      }
      return { ...prev, isMuted: nextMuted };
    });
  }, []);

  const retry = useCallback(async (coachId?: string) => {
    const coach = coachId || lastActiveCoachRef.current;
    await start(coach);
  }, [start]);

  /**
   * Stable dispatchEvent that NEVER changes identity.
   * Dispatches coaching events to provide immediate spoken verbal cues.
   */
  const dispatchEvent = useCallback((event: CoachingEvent) => {
    dispatcherRef.current?.dispatch(event);
  }, []);

  const speakGreeting = useCallback((coachId: string) => {
    agentRef.current?.speakGreeting(coachId);
  }, []);

  const speak = useCallback((text: string) => {
    agentRef.current?.speakWithSynthesizer(text);
  }, []);

  const startListening = useCallback(() => {
    agentRef.current?.startListening();
    setState((prev) => ({ ...prev, status: "listening" }));
  }, []);

  const stopListening = useCallback(() => {
    agentRef.current?.stopListening();
    setState((prev) => ({ ...prev, status: "connected" }));
  }, []);

  /**
   * Sends session context updates to the realtime voice agent.
   */
  const updateSessionContext = useCallback((context: SessionContextData) => {
    agentRef.current?.updateSessionContext(context);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (agentRef.current) {
        agentRef.current.disconnect();
      }
    };
  }, []);

  return {
    state,
    start,
    stop,
    mute,
    unmute,
    retry,
    connect: start, // backwards compatibility alias
    disconnect: stop, // backwards compatibility alias
    toggleMute,
    dispatchEvent,
    updateSessionContext,
    speakGreeting,
    speak,
    startListening,
    stopListening,
    getRemoteAudioStream: () => agentRef.current?.getRemoteAudioStream() ?? null,
  };
}

