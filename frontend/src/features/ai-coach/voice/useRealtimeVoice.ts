import { useEffect, useRef, useState, useCallback } from "react";
import { RealtimeVoiceAgent, type SessionContextData } from "./RealtimeVoiceAgent";
import { CoachDecisionEngine, DEFAULT_COACHING_CONFIG } from "./CoachDecisionEngine";
import type { VoiceState, CoachingEvent, VoiceTranscriptItem, VoiceConnectionState } from "./voice.types";
import type { FeedbackOutput } from "../analysis/FeedbackEngine";

export function useRealtimeVoice() {
  const agentRef = useRef<RealtimeVoiceAgent | null>(null);
  const decisionEngineRef = useRef<CoachDecisionEngine | null>(null);
  
  const statusRef = useRef<VoiceConnectionState>("disconnected");
  const lastActiveCoachRef = useRef<string>("alice");
  const isMutedRef = useRef<boolean>(false);

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
    if (isMutedRef.current) {
      agentRef.current?.setMuted(true);
    }
  }, []);

  const stop = useCallback(() => {
    agentRef.current?.disconnect();
    decisionEngineRef.current?.reset();
    statusRef.current = "disconnected";
    setState((prev) => ({ ...prev, status: "disconnected" }));
  }, []);

  const mute = useCallback(() => {
    isMutedRef.current = true;
    agentRef.current?.setMuted(true);
    setState((prev) => ({ ...prev, isMuted: true }));
  }, []);

  const unmute = useCallback(() => {
    isMutedRef.current = false;
    agentRef.current?.setMuted(false);
    setState((prev) => ({ ...prev, isMuted: false }));
  }, []);

  const toggleMute = useCallback(() => {
    const nextMuted = !isMutedRef.current;
    isMutedRef.current = nextMuted;
    agentRef.current?.setMuted(nextMuted);
    setState((prev) => ({ ...prev, isMuted: nextMuted }));
  }, []);

  const unlockAudio = useCallback(() => {
    agentRef.current?.unlockAudio();
  }, []);

  const dispatchEvent = useCallback((event: CoachingEvent, context?: any) => {
    console.log(`[AI COACH][EVENT]`, {
      type: event.type,
      id: event.id,
      asanaId: event.asanaId,
      severity: event.severity,
      feedback: event.feedback,
    });
    const decision = decisionEngineRef.current?.evaluate(event, context);
    if (decision?.shouldSpeak) {
       console.log(`[AI COACH][DECISION]`, {
         type: event.type,
         shouldSpeak: true,
         priority: decision.priority,
         reason: decision.reason,
       });
       agentRef.current?.sendCoachingEvent(event);
    } else if (decision) {
       console.log(`[AI COACH][DECISION]`, {
         type: event.type,
         shouldSpeak: false,
         priority: decision.priority,
         reason: decision.reason,
       });
    }
  }, []);

  const sendFeedback = useCallback((feedback: FeedbackOutput) => {
    agentRef.current?.sendFeedback(feedback);
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
    sendFeedback,
    updateSessionContext,
    triggerPoseStart,
    speakGreeting,
    speak,
    resetEngine: () => decisionEngineRef.current?.reset(),
    getRemoteAudioStream: () => agentRef.current?.getRemoteAudioStream() || null,
  };
}
