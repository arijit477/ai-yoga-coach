import { useEffect, useRef, useState, useCallback } from "react";
import { RealtimeVoiceAgent, type SessionContextData } from "./RealtimeVoiceAgent";
import { CoachingEventDispatcher } from "./CoachingEventDispatcher";
import type { VoiceState, CoachingEvent, VoiceTranscriptItem } from "./voice.types";

export function useRealtimeVoice() {
  const agentRef = useRef<RealtimeVoiceAgent | null>(null);
  const dispatcherRef = useRef<CoachingEventDispatcher | null>(null);
  // Store latest status in a ref so dispatchEvent never re-creates due to status changes
  const statusRef = useRef<VoiceState["status"]>("disconnected");

  const [state, setState] = useState<VoiceState>({
    status: "disconnected",
    isMuted: false,
    error: null,
    transcripts: [],
  });

  // Initialize refs once on first render (never re-runs)
  if (!agentRef.current) {
    agentRef.current = new RealtimeVoiceAgent(
      (status, error) => {
        statusRef.current = status;
        setState((prev) => ({
          ...prev,
          status,
          error: error || prev.error,
        }));
      },
      (item: VoiceTranscriptItem) => {
        setState((prev) => ({
          ...prev,
          // Keep last 8 transcript items to avoid unbounded memory growth
          transcripts: [...prev.transcripts.slice(-7), item],
        }));
      },
    );

    dispatcherRef.current = new CoachingEventDispatcher({
      cooldownMs: 4000, // 4 seconds default cooldown
    });
    dispatcherRef.current.setAgent(agentRef.current);
  }

  const connect = useCallback(async (coachId: string) => {
    statusRef.current = "connecting";
    setState((prev) => ({ ...prev, error: null, status: "connecting" }));
    if (agentRef.current) {
      await agentRef.current.connect(coachId);
      dispatcherRef.current?.reset();
    }
  }, []);

  const disconnect = useCallback(() => {
    if (agentRef.current) {
      agentRef.current.disconnect();
    }
    dispatcherRef.current?.reset();
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

  /**
   * Stable dispatchEvent that NEVER changes identity.
   */
  const dispatchEvent = useCallback((event: CoachingEvent) => {
    const s = statusRef.current;
    if (s === "connected" || s === "speaking" || s === "listening") {
      dispatcherRef.current?.dispatch(event);
    }
  }, []);

  /**
   * Sends session context updates to the realtime voice agent.
   */
  const updateSessionContext = useCallback((context: SessionContextData) => {
    const s = statusRef.current;
    if (s === "connected" || s === "speaking" || s === "listening") {
      agentRef.current?.updateSessionContext(context);
    }
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
    connect,
    disconnect,
    toggleMute,
    dispatchEvent,
    updateSessionContext,
  };
}
