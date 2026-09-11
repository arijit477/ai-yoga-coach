import { useEffect, useRef, useState, useCallback } from "react";
import { RealtimeVoiceAgent } from "./RealtimeVoiceAgent";
import { CoachingEventDispatcher } from "./CoachingEventDispatcher";
import type { VoiceState, CoachingEvent } from "./voice.types";

export function useRealtimeVoice() {
  const agentRef = useRef<RealtimeVoiceAgent | null>(null);
  const dispatcherRef = useRef<CoachingEventDispatcher | null>(null);

  const [state, setState] = useState<VoiceState>({
    status: "disconnected",
    isMuted: false,
    error: null,
  });

  // Initialize refs once
  if (!agentRef.current) {
    agentRef.current = new RealtimeVoiceAgent((status, error) => {
      setState(prev => ({
        ...prev,
        status,
        error: error || prev.error
      }));
    });
    
    dispatcherRef.current = new CoachingEventDispatcher({
      cooldownMs: 8000 // 8 seconds default cooldown
    });
    dispatcherRef.current.setAgent(agentRef.current);
  }

  const connect = useCallback(async (coachId: string) => {
    setState(prev => ({ ...prev, error: null, status: "connecting" }));
    if (agentRef.current) {
      await agentRef.current.connect(coachId);
      dispatcherRef.current?.reset();
    }
  }, []);

  const disconnect = useCallback(() => {
    if (agentRef.current) {
      agentRef.current.disconnect();
    }
  }, []);

  const toggleMute = useCallback(() => {
    setState(prev => {
      const nextMuted = !prev.isMuted;
      if (agentRef.current) {
        agentRef.current.setMuted(nextMuted);
      }
      return { ...prev, isMuted: nextMuted };
    });
  }, []);

  const dispatchEvent = useCallback((event: CoachingEvent) => {
    if (state.status === "connected" || state.status === "speaking" || state.status === "listening") {
      dispatcherRef.current?.dispatch(event);
    }
  }, [state.status]);

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
    connect,
    disconnect,
    toggleMute,
    dispatchEvent,
  };
}
