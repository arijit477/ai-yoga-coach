import type { CoachingEvent, VoiceTranscriptItem } from "./voice.types";

export interface SessionContextData {
  coach: string;
  asanaId: string;
  asanaName: string;
  score?: number;
  coachState?: string;
  sessionState?: string;
  primaryIssue?: {
    ruleId: string;
    severity: string;
    currentValue?: number;
    min?: number;
    max?: number;
    feedback?: string;
  } | null;
  isHolding?: boolean;
  isCompleted?: boolean;
}

export class RealtimeVoiceAgent {
  private pc: RTCPeerConnection | null = null;
  private dc: RTCDataChannel | null = null;
  private audioEl: HTMLAudioElement | null = null;
  private stream: MediaStream | null = null;
  private onStatusChange?: (
    status: "disconnected" | "connecting" | "connected" | "listening" | "speaking" | "error",
    error?: string,
  ) => void;
  private onTranscript?: (item: VoiceTranscriptItem) => void;
  private clientSecret: string | null = null;
  private isMuted: boolean = false;
  private isSpeaking: boolean = false;

  constructor(
    onStatusChange?: (
      status: "disconnected" | "connecting" | "connected" | "listening" | "speaking" | "error",
      error?: string,
    ) => void,
    onTranscript?: (item: VoiceTranscriptItem) => void,
  ) {
    this.onStatusChange = onStatusChange;
    this.onTranscript = onTranscript;
    this.audioEl = document.createElement("audio");
    this.audioEl.autoplay = true;
  }

  async connect(coachId: string) {
    this.updateStatus("connecting");
    try {
      // 1. Get ephemeral token from backend
      const resp = await fetch("http://localhost:8000/api/ai-coach/realtime/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coach_id: coachId }),
      });

      if (!resp.ok) {
        const errText = await resp.text();
        throw new Error(`Failed to create voice session: ${resp.status} ${errText}`);
      }

      const data = await resp.json();
      this.clientSecret = data.client_secret;

      if (!this.clientSecret) {
        throw new Error("No client secret returned from voice session backend.");
      }

      // 2. Setup WebRTC Peer Connection
      this.pc = new RTCPeerConnection();

      // Handle incoming audio stream from OpenAI
      this.pc.ontrack = (e) => {
        if (this.audioEl && e.streams[0]) {
          this.audioEl.srcObject = e.streams[0];
          this.audioEl.play().catch((err) => {
            console.warn("[AI COACH] Audio autoplay pending user interaction:", err);
          });
        }
      };

      // 3. Set up data channel for bidirectional events
      this.dc = this.pc.createDataChannel("oai-events");

      this.dc.onopen = () => {
        console.log("[AI COACH] RealtimeVoiceAgent Data Channel Opened");
      };

      this.dc.onmessage = (e) => {
        try {
          const ev = JSON.parse(e.data);

          // Track speaking state
          if (ev.type === "response.audio.delta" || ev.type === "response.output_item.added") {
            if (!this.isSpeaking) {
              this.isSpeaking = true;
              this.updateStatus("speaking");
            }
          } else if (ev.type === "response.done" || ev.type === "response.audio.done") {
            if (this.isSpeaking) {
              this.isSpeaking = false;
              this.updateStatus("connected");
            }
          } else if (ev.type === "input_audio_buffer.speech_started") {
            // User interruption detected by OpenAI VAD
            console.log("[AI COACH] User started speaking (interruption)");
            this.isSpeaking = false;
            this.updateStatus("listening");
          } else if (ev.type === "input_audio_buffer.speech_stopped") {
            this.updateStatus("connected");
          }

          // Optional transcript capturing:
          // User input audio transcription completed
          if (ev.type === "conversation.item.input_audio_transcription.completed" && ev.transcript) {
            this.onTranscript?.({
              id: ev.item_id || `user_${Date.now()}`,
              role: "user",
              text: ev.transcript.trim(),
              timestamp: Date.now(),
            });
          }

          // Coach spoken response transcript completed
          if (ev.type === "response.audio_transcript.done" && ev.transcript) {
            this.onTranscript?.({
              id: ev.item_id || `coach_${Date.now()}`,
              role: "coach",
              text: ev.transcript.trim(),
              timestamp: Date.now(),
            });
          }

          if (ev.type === "error") {
            console.error("[AI COACH] Realtime Server Event Error:", ev.error);
          }
        } catch (err) {
          // ignore non-json messages
        }
      };

      // 4. Request local microphone stream (graceful fallback if denied)
      try {
        this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.stream.getTracks().forEach((track) => {
          if (this.pc && this.stream) {
            this.pc.addTrack(track, this.stream);
          }
        });
      } catch (micErr: any) {
        console.warn("[AI COACH] Microphone not granted or available; proceeding with audio output only.", micErr);
      }

      // 5. Create local SDP offer
      const offer = await this.pc.createOffer();
      await this.pc.setLocalDescription(offer);

      // 6. Send offer to OpenAI Realtime GA endpoint: /v1/realtime/calls
      const sdpHeaders = {
        Authorization: `Bearer ${this.clientSecret}`,
        "Content-Type": "application/sdp",
      };

      let sdpResponse = await fetch("https://api.openai.com/v1/realtime/calls", {
        method: "POST",
        body: offer.sdp,
        headers: sdpHeaders,
      });

      // Fallback if GA path is routed differently
      if (!sdpResponse.ok && sdpResponse.status === 404) {
        console.warn("[AI COACH] /calls returned 404, falling back to /v1/realtime");
        sdpResponse = await fetch("https://api.openai.com/v1/realtime", {
          method: "POST",
          body: offer.sdp,
          headers: sdpHeaders,
        });
      }

      if (!sdpResponse.ok) {
        const errorDetail = await sdpResponse.text();
        throw new Error(`OpenAI WebRTC error ${sdpResponse.status}: ${errorDetail}`);
      }

      const answerSdp = await sdpResponse.text();
      const answer = { type: "answer" as RTCSdpType, sdp: answerSdp };
      await this.pc.setRemoteDescription(answer);

      this.updateStatus("connected");
      this.syncMuteState();
    } catch (e: any) {
      console.error("[AI COACH] RealtimeVoiceAgent Connect Error:", e);
      this.updateStatus("error", e.message);
      this.disconnect();
    }
  }

  /**
   * Dispatches a structured coaching event through the existing data channel.
   */
  sendCoachingEvent(event: CoachingEvent) {
    if (!this.dc || this.dc.readyState !== "open") {
      console.warn("[AI COACH] Cannot send coaching event: data channel not open");
      return;
    }

    console.log(`[AI COACH] Pose event dispatched: ${event.type} for ${event.asanaName}`);

    // If event has feedback, record it in transcripts as a posture event
    if (event.feedback && (event.type === "pose_correction" || event.type === "safety_warning")) {
      this.onTranscript?.({
        id: event.id,
        role: "coach",
        text: event.feedback,
        timestamp: event.timestamp,
        isCorrection: true,
      });
    }

    const eventContent = [
      `[SYSTEM POSTURE EVENT]`,
      `Type: ${event.type}`,
      `Asana: ${event.asanaName}`,
      `Rule: ${event.ruleId || "N/A"}`,
      `Issue: ${event.issue || "None"}`,
      `Severity: ${event.severity || "normal"}`,
      event.currentValue !== undefined ? `Current Value: ${event.currentValue}` : null,
      event.targetValue !== undefined ? `Target: ${event.targetValue}` : null,
      event.min !== undefined && event.max !== undefined ? `Acceptable Range: ${event.min} - ${event.max}` : null,
      event.feedback ? `Instruction: ${event.feedback}` : null,
      event.score !== undefined ? `Current Score: ${event.score}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const oaiEvent = {
      type: "conversation.item.create",
      item: {
        type: "message",
        role: "user",
        content: [
          {
            type: "input_text",
            text: eventContent,
          },
        ],
      },
    };

    this.dc.send(JSON.stringify(oaiEvent));

    // Request immediate voice response generation
    const responseCreate = {
      type: "response.create",
    };
    this.dc.send(JSON.stringify(responseCreate));
  }

  /**
   * Updates current session context (e.g. asana changed, session completed)
   * so the conversational model always knows what pose is active when the user asks questions.
   */
  updateSessionContext(context: SessionContextData) {
    if (!this.dc || this.dc.readyState !== "open") {
      return;
    }

    const contextText = [
      `[ACTIVE SESSION CONTEXT UPDATE]`,
      `Coach: ${context.coach}`,
      `Active Asana: ${context.asanaName} (${context.asanaId})`,
      context.score !== undefined ? `Current Score: ${context.score}` : null,
      context.coachState ? `Coach State: ${context.coachState}` : null,
      context.sessionState ? `Session State: ${context.sessionState}` : null,
      context.isHolding ? `Status: Holding target pose` : null,
      context.isCompleted ? `Status: Asana completed successfully` : null,
      context.primaryIssue
        ? `Primary Form Focus: ${context.primaryIssue.feedback || context.primaryIssue.ruleId} (Severity: ${context.primaryIssue.severity})`
        : `Primary Form Focus: Alignment in good standing`,
    ]
      .filter(Boolean)
      .join("\n");

    const oaiContextMessage = {
      type: "conversation.item.create",
      item: {
        type: "message",
        role: "user",
        content: [
          {
            type: "input_text",
            text: contextText,
          },
        ],
      },
    };

    this.dc.send(JSON.stringify(oaiContextMessage));
    console.log(`[AI COACH] Session context updated: ${context.asanaName} (${context.coachState || "active"})`);
  }

  setMuted(isMuted: boolean) {
    this.isMuted = isMuted;
    this.syncMuteState();
  }

  private syncMuteState() {
    if (this.stream) {
      this.stream.getAudioTracks().forEach((track) => {
        track.enabled = !this.isMuted;
      });
    }
    if (this.audioEl) {
      this.audioEl.muted = this.isMuted;
    }
  }

  disconnect() {
    this.isSpeaking = false;
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }
    if (this.dc) {
      this.dc.close();
      this.dc = null;
    }
    if (this.pc) {
      this.pc.close();
      this.pc = null;
    }
    if (this.audioEl) {
      this.audioEl.srcObject = null;
    }
    this.clientSecret = null;
    this.updateStatus("disconnected");
  }

  private updateStatus(
    status: "disconnected" | "connecting" | "connected" | "listening" | "speaking" | "error",
    error?: string,
  ) {
    if (this.onStatusChange) {
      this.onStatusChange(status, error);
    }
  }
}
