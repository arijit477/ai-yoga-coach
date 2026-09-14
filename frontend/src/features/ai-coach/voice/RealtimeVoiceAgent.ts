import type { CoachingEvent, VoiceTranscriptItem, VoiceConnectionState } from "./voice.types";

export interface SessionContextData {
  coach: string;
  asanaId: string;
  asanaName: string;
  score?: number;
  coachState?: string;
  sessionState?: string;
  primaryIssue?: {
    ruleId: string;
    joint?: string;
    severity: string;
    currentValue?: number;
    currentAngle?: number;
    targetMin?: number;
    targetMax?: number;
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
  private onStatusChange?: (status: VoiceConnectionState, error?: string) => void;
  private onTranscript?: (item: VoiceTranscriptItem) => void;
  private clientSecret: string | null = null;
  private isMuted: boolean = false;
  private isSpeaking: boolean = false;
  private currentCoachId: string | null = null;
  private isConnecting: boolean = false;
  // Hook for future avatar lip-sync: returns incoming audio stream
  private remoteAudioStream: MediaStream | null = null;

  constructor(
    onStatusChange?: (status: VoiceConnectionState, error?: string) => void,
    onTranscript?: (item: VoiceTranscriptItem) => void,
  ) {
    this.onStatusChange = onStatusChange;
    this.onTranscript = onTranscript;
    this.audioEl = document.createElement("audio");
    this.audioEl.autoplay = true;
  }

  getRemoteAudioStream(): MediaStream | null {
    return this.remoteAudioStream;
  }

  getCoachId(): string | null {
    return this.currentCoachId;
  }

  async connect(coachId: string) {
    if (this.isConnecting) {
      console.warn("[AI COACH] RealtimeVoiceAgent connection already in progress.");
      return;
    }

    // Clean up any stale connection first
    this.disconnect();

    this.isConnecting = true;
    this.currentCoachId = coachId;

    // 1. Request microphone permission
    this.updateStatus("requesting_permission");
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
    } catch (micErr: any) {
      console.warn("[AI COACH] Microphone permission denied or device unavailable:", micErr);
      this.isConnecting = false;
      this.updateStatus("error", "Microphone access denied or unavailable.");
      return;
    }

    // 2. Connecting to backend session
    this.updateStatus("connecting");
    try {
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

      // 3. Setup WebRTC Peer Connection
      this.pc = new RTCPeerConnection();

      // Handle incoming audio stream from OpenAI
      this.pc.ontrack = (e) => {
        if (e.streams[0]) {
          this.remoteAudioStream = e.streams[0];
          if (this.audioEl) {
            this.audioEl.srcObject = e.streams[0];
            this.audioEl.play().catch((err) => {
              console.warn("[AI COACH] Audio autoplay pending user interaction:", err);
            });
          }
        }
      };

      // Add local microphone tracks to PeerConnection
      if (this.stream) {
        this.stream.getTracks().forEach((track) => {
          if (this.pc && this.stream) {
            this.pc.addTrack(track, this.stream);
          }
        });
      }

      // 4. Set up data channel for bidirectional events
      this.dc = this.pc.createDataChannel("oai-events");

      this.dc.onopen = () => {
        console.log("[AI COACH] RealtimeVoiceAgent Data Channel Opened");
      };

      this.dc.onmessage = (e) => {
        try {
          const ev = JSON.parse(e.data);

          // Track speaking and listening states
          if (ev.type === "response.audio.delta" || ev.type === "response.output_item.added") {
            if (!this.isSpeaking) {
              this.isSpeaking = true;
              this.updateStatus(this.isMuted ? "muted" : "speaking");
            }
          } else if (
            ev.type === "response.done" ||
            ev.type === "response.audio.done" ||
            ev.type === "response.cancelled"
          ) {
            if (this.isSpeaking) {
              this.isSpeaking = false;
              this.updateStatus(this.isMuted ? "muted" : "connected");
            }
          } else if (ev.type === "input_audio_buffer.speech_started") {
            // User interruption detected by OpenAI Server VAD
            console.log("[AI COACH] User interruption detected");
            this.isSpeaking = false;
            this.updateStatus(this.isMuted ? "muted" : "listening");
          } else if (ev.type === "input_audio_buffer.speech_stopped") {
            if (!this.isSpeaking) {
              this.updateStatus(this.isMuted ? "muted" : "connected");
            }
          }

          // Optional transcript capturing:
          // User speech transcription
          if (ev.type === "conversation.item.input_audio_transcription.completed" && ev.transcript) {
            this.onTranscript?.({
              id: ev.item_id || `user_${Date.now()}`,
              role: "user",
              text: ev.transcript.trim(),
              timestamp: Date.now(),
            });
          }

          // Coach spoken response transcript
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

      this.isConnecting = false;
      this.updateStatus(this.isMuted ? "muted" : "connected");
      this.syncMuteState();
    } catch (e: any) {
      console.error("[AI COACH] RealtimeVoiceAgent Connect Error:", e);
      this.isConnecting = false;
      this.updateStatus("error", e.message || "Failed to establish WebRTC connection.");
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
      `Asana: ${event.asanaName} (${event.asanaId})`,
      event.ruleId ? `Rule: ${event.ruleId}` : null,
      event.joint ? `Joint / Body Part: ${event.joint}` : null,
      event.issue ? `Issue: ${event.issue}` : null,
      event.severity ? `Severity: ${event.severity}` : null,
      event.currentValue !== undefined ? `Current Angle/Value: ${event.currentValue}°` : null,
      event.targetValue !== undefined ? `Target Value: ${event.targetValue}°` : null,
      (event.min !== undefined || event.targetMin !== undefined) && (event.max !== undefined || event.targetMax !== undefined)
        ? `Target Angle Range: ${event.targetMin ?? event.min}° - ${event.targetMax ?? event.max}°`
        : null,
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

    const primaryIssueText = context.primaryIssue
      ? [
          `Rule: ${context.primaryIssue.ruleId}`,
          context.primaryIssue.joint ? `Joint: ${context.primaryIssue.joint}` : null,
          `Severity: ${context.primaryIssue.severity}`,
          (context.primaryIssue.currentAngle !== undefined || context.primaryIssue.currentValue !== undefined)
            ? `Current Angle: ${context.primaryIssue.currentAngle ?? context.primaryIssue.currentValue}°`
            : null,
          (context.primaryIssue.targetMin !== undefined || context.primaryIssue.min !== undefined) && (context.primaryIssue.targetMax !== undefined || context.primaryIssue.max !== undefined)
            ? `Target Range: ${context.primaryIssue.targetMin ?? context.primaryIssue.min}° - ${context.primaryIssue.targetMax ?? context.primaryIssue.max}°`
            : null,
          context.primaryIssue.feedback ? `Feedback: ${context.primaryIssue.feedback}` : null,
        ].filter(Boolean).join(", ")
      : "Alignment in good standing";

    const contextText = [
      `[ACTIVE SESSION CONTEXT UPDATE]`,
      `Coach: ${context.coach}`,
      `Active Asana: ${context.asanaName} (${context.asanaId})`,
      context.score !== undefined ? `Current Score: ${context.score}` : null,
      context.coachState ? `Coach State: ${context.coachState}` : null,
      context.sessionState ? `Session State: ${context.sessionState}` : null,
      context.isHolding ? `Status: Holding target pose` : null,
      context.isCompleted ? `Status: Asana completed successfully` : null,
      `Primary Posture Issue Context: [${primaryIssueText}]`,
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
    if (this.pc && this.pc.connectionState === "connected") {
      this.updateStatus(isMuted ? "muted" : "connected");
    }
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
    this.isConnecting = false;
    if (this.stream) {
      this.stream.getTracks().forEach((track) => {
        track.stop();
      });
      this.stream = null;
    }
    if (this.dc) {
      try {
        this.dc.close();
      } catch (err) {
        // ignore
      }
      this.dc = null;
    }
    if (this.pc) {
      try {
        this.pc.close();
      } catch (err) {
        // ignore
      }
      this.pc = null;
    }
    if (this.audioEl) {
      this.audioEl.srcObject = null;
    }
    this.remoteAudioStream = null;
    this.clientSecret = null;
    this.currentCoachId = null;
    this.updateStatus("disconnected");
  }

  private updateStatus(status: VoiceConnectionState, error?: string) {
    if (this.onStatusChange) {
      this.onStatusChange(status, error);
    }
  }
}
