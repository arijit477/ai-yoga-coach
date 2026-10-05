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
    const t0 = event.timestamp || Date.now();
    const decision = decisionEngineRef.current?.evaluate(event, context);
    const tDecisionEnd = Date.now();

    if (decision?.shouldSpeak) {
       const tOrchestratorStart = Date.now();
       agentRef.current?.sendCoachingEvent(event);
       const tVoiceEnd = Date.now();

       console.log(`[AI COACH][DEBUG][TIMING]`, {
         ruleDetected: t0,
         eventCreated: event.timestamp || t0,
         decision: tDecisionEnd,
         orchestrator: tOrchestratorStart,
         voiceRequest: tVoiceEnd,
         ruleToEventMs: Math.max(0, (event.timestamp || t0) - t0),
         eventToDecisionMs: Math.max(0, tDecisionEnd - (event.timestamp || t0)),
         decisionToOrchestratorMs: Math.max(0, tOrchestratorStart - tDecisionEnd),
         orchestratorToVoiceMs: Math.max(0, tVoiceEnd - tOrchestratorStart),
         totalPipelineLatencyMs: Math.max(0, tVoiceEnd - t0),
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
