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
  cameraState?: string;
  recentEvents?: CoachingEvent[];
  holdTime?: number;
  previousAsanaName?: string;
  previousScore?: number;
  scoreTrend?: "improving" | "worsening" | "stable";
  completedPoses?: { name: string; score: number }[];
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
  private currentSessionContext: SessionContextData | null = null;
  
  // Hook for avatar lip-sync: returns incoming audio stream
  private remoteAudioStream: MediaStream | null = null;
  private audioCtx: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private gainNode: GainNode | null = null;
  private dataArray: Uint8Array | null = null;
  private volumeInterval: number | null = null;

  constructor(
    onStatusChange?: (status: VoiceConnectionState, error?: string) => void,
    onTranscript?: (item: VoiceTranscriptItem) => void,
  ) {
    this.onStatusChange = onStatusChange;
    this.onTranscript = onTranscript;
    this.audioEl = document.createElement("audio");
    this.audioEl.autoplay = true;
    this.audioEl.style.display = "none";
    if (typeof document !== "undefined" && document.body && !document.body.contains(this.audioEl)) {
      document.body.appendChild(this.audioEl);
    }
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

    // 1. Get microphone permission for WebRTC bidirectional audio
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (err) {
      console.warn("[AI COACH] Could not get microphone access:", err);
      this.stream = null;
    }

    // 2. Connecting to backend session
    this.updateStatus("connecting");
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
      const resp = await fetch(`${apiUrl}/api/ai-coach/realtime/session`, {
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
      
      // Since we want bidirectional audio, we add local tracks
      if (this.stream) {
        this.stream.getTracks().forEach((track) => {
          this.pc?.addTrack(track, this.stream!);
        });
      } else {
        // Fallback to recvonly if no mic permission
        this.pc.addTransceiver("audio", { direction: "recvonly" });
      }

      // Handle incoming audio stream from OpenAI
      this.pc.ontrack = (event) => {
        if (event.streams && event.streams[0]) {
          this.remoteAudioStream = event.streams[0];
          if (this.audioEl) {
            this.audioEl.srcObject = this.remoteAudioStream;
          }
          this.setupAudioAnalyzer();
        }
      };

      // Local microphone tracks handled above

      // 4. Set up data channel for bidirectional events
      this.dc = this.pc.createDataChannel("oai-events");

      this.dc.onopen = () => {
        console.log("[AI COACH] RealtimeVoiceAgent Data Channel Opened");
        this.speakGreeting();
      };

      this.dc.onmessage = (e) => {
        try {
          const ev = JSON.parse(e.data);

          // Track speaking and listening states
          if (ev.type === "response.audio.delta" || ev.type === "response.output_item.added") {
            // We now rely on the audio analyzer to set speaking state for precise lipsync
          } else if (
            ev.type === "response.done" ||
            ev.type === "response.audio.done" ||
            ev.type === "response.cancelled"
          ) {
            if (this.isSpeaking) {
              // We now rely on the audio analyzer to clear the speaking state
            }
          } else if (ev.type === "input_audio_buffer.speech_started") {
             if (this.isSpeaking) {
               // User interrupted the coach
               this.isSpeaking = false;
               this.updateStatus("interrupted");
             } else {
               this.updateStatus("listening");
             }
          } else if (ev.type === "input_audio_buffer.speech_stopped") {
             this.updateStatus("thinking");
          } else if (ev.type === "response.function_call_arguments.done") {
             this.handleFunctionCall(ev);
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

          // Coach spoken response text chunk
          if (ev.type === "response.audio_transcript.delta" || ev.type === "response.text.delta") {
            // Transcript delta
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
      console.warn("[AI COACH] WebRTC connection could not be established, continuing with instant speech synthesis:", e);
      this.isConnecting = false;
      this.updateStatus(this.isMuted ? "muted" : "connected");
    }
  }

  /**
   * High-fidelity speech synthesis using OpenAI Realtime or browser fallback
   */
  speak(text: string) {
    if (this.isMuted) return;

    if (this.dc && this.dc.readyState === "open") {
      try {
        const oaiEvent = {
          type: "conversation.item.create",
          item: {
            type: "message",
            role: "user",
            content: [
              {
                type: "input_text",
                text: `[SYSTEM COMMAND] Please speak exactly this message clearly to the user: "${text}"`,
              },
            ],
          },
        };
        this.dc.send(JSON.stringify(oaiEvent));

        const responseCreate = {
          type: "response.create",
        };
        this.dc.send(JSON.stringify(responseCreate));
      } catch (err) {
        console.warn("[AI COACH] Error asking OpenAI to speak:", err);
      }
    } else {
      console.warn("[AI COACH] Data channel not ready, dropping speech request:", text);
    }

    this.onTranscript?.({
      id: `coach_speech_${Date.now()}`,
      role: "coach",
      text,
      timestamp: Date.now(),
    });
  }

  /**
   * Speak a greeting when the session connects.
   */
  speakGreeting() {
    const greeting =
      this.currentCoachId === "kevin"
        ? "Hi, I'm Kevin, your AI yoga coach. Let's begin. Today, we will focus on building core strength. Remember to listen to your body and have fun."
        : "Welcome to your practice today. Let us begin by finding a tall, comfortable seat. Relax your shoulders and take a deep breath in. Feel the calm within you.";

    this.speak(greeting);
  }

  /**
   * Listening feature removed. No-op.
   */
  startListening() {
    console.log("[AI COACH] Listening feature is disabled.");
  }

  /**
   * Listening feature removed. No-op.
   */
  stopListening() {
    // No-op
  }

  /**
   * Dispatches a structured coaching event through the existing data channel
   * and speaks verbal instructions clearly to the user.
   */
  sendCoachingEvent(event: CoachingEvent) {
    // 1. Resolve human-friendly verbal cue for the yoga instruction
    let spokenText = "";
    if (event.type === "step_guidance" && event.feedback) {
      spokenText = event.feedback;
    } else if (event.type === "pose_started") {
      spokenText = `Let's begin ${event.asanaName}.`;
    } else if (event.type === "calibration_prompt" && event.feedback) {
      spokenText = event.feedback;
    } else if (event.type === "calibration_complete") {
      spokenText = event.feedback || `Great, let's begin ${event.asanaName}.`;
    } else if (event.type === "pose_correction" && event.feedback) {
      spokenText = event.feedback;
    } else if (event.type === "safety_warning" && event.feedback) {
      spokenText = event.feedback;
    } else if (event.type === "good_form") {
      spokenText = event.feedback || "Good form! Hold this position.";
    } else if (event.type === "pose_held") {
      spokenText = "Posture aligned! Hold steady and breathe.";
    } else if (event.type === "pose_completed") {
      spokenText = `Great job completing ${event.asanaName}!`;
    }

    // 2. If event has feedback, record it in transcripts
    if (event.feedback && (event.type === "pose_correction" || event.type === "safety_warning")) {
      this.onTranscript?.({
        id: event.id,
        role: "coach",
        text: event.feedback,
        timestamp: event.timestamp,
        isCorrection: true,
      });
    }

    // 3. If OpenAI Realtime WebRTC data channel is open, send structured event
    if (this.dc && this.dc.readyState === "open") {
      console.log(`[AI COACH] Pose event dispatched over WebRTC: ${event.type} for ${event.asanaName}`);

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

      try {
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
      } catch (err) {
        console.warn("[AI COACH] Error dispatching over WebRTC Data Channel:", err);
      }
    }

    // 4. Fallback audible voice cue if not connected to OpenAI
    if (spokenText && (!this.dc || this.dc.readyState !== "open")) {
      this.speak(spokenText);
    }
  }

  /**
   * Updates current session context (e.g. asana changed, session completed)
   * so the conversational model always knows what pose is active when the user asks questions.
   */
  updateSessionContext(context: SessionContextData) {
    this.currentSessionContext = context;
    
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

  private handleFunctionCall(ev: any) {
    if (!this.dc || this.dc.readyState !== "open") return;
    
    const callId = ev.call_id;
    const functionName = ev.name;
    
    console.log(`[AI COACH] OpenAI called function: ${functionName}`);
    let result: any = { error: "Context not available" };

    if (this.currentSessionContext) {
      const ctx = this.currentSessionContext;
      switch (functionName) {
        case "get_camera_status":
          result = { cameraState: ctx.cameraState || "unknown" };
          break;
        case "get_current_pose":
        case "get_current_asana":
          result = { asanaId: ctx.asanaId, asanaName: ctx.asanaName };
          break;
        case "get_posture_status":
          result = {
            score: ctx.score ?? null,
            status: ctx.primaryIssue ? "needs_correction" : (ctx.score && ctx.score > 80 ? "good" : "evaluating"),
            primaryIssue: ctx.primaryIssue || null,
            stability: ctx.coachState === "stable" ? "stable" : "transitioning",
            scoreTrend: ctx.scoreTrend,
            previousScore: ctx.previousScore
          };
          break;
        case "get_session_state":
          result = {
            coachState: ctx.coachState,
            sessionState: ctx.sessionState,
            isHolding: ctx.isHolding,
            isCompleted: ctx.isCompleted,
            previousAsana: ctx.previousAsanaName,
            completedPoses: ctx.completedPoses
          };
          break;
        case "get_primary_correction":
          result = { primaryIssue: ctx.primaryIssue || null };
          break;
        case "get_hold_status":
          result = { isHolding: ctx.isHolding || false, holdTimeRemaining: ctx.holdTime || 0 };
          break;
        case "get_recent_coaching_events":
          result = { recentEvents: (ctx.recentEvents || []).slice(-3).map(e => ({ type: e.type, feedback: e.feedback })) };
          break;
        default:
          result = { error: `Function ${functionName} not recognized locally.` };
      }
    }

    try {
      this.dc.send(JSON.stringify({
        type: "conversation.item.create",
        item: {
          type: "function_call_output",
          call_id: callId,
          output: JSON.stringify(result)
        }
      }));
      this.dc.send(JSON.stringify({ type: "response.create" }));
    } catch (e) {
      console.warn("[AI COACH] Error responding to function call", e);
    }
  }

  setMuted(isMuted: boolean) {
    this.isMuted = isMuted;
    if (isMuted) {
      this.isSpeaking = false;
    }
    this.syncMuteState();
    this.updateStatus(isMuted ? "muted" : (this.isSpeaking ? "speaking" : "connected"));
  }

  private syncMuteState() {
    // Microphone tracks removed
    if (this.audioEl) {
      this.audioEl.muted = this.isMuted;
    }
    if (this.gainNode) {
      this.gainNode.gain.value = this.isMuted ? 0 : 2.5; // Mute or 2.5x volume boost
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
    if (this.volumeInterval) {
      window.clearInterval(this.volumeInterval);
      this.volumeInterval = null;
    }
    if (this.audioCtx) {
      try {
        this.audioCtx.close();
      } catch (err) {}
      this.audioCtx = null;
    }
    this.gainNode = null;
    this.analyser = null;
    this.dataArray = null;

    if (this.audioEl) {
      this.audioEl.srcObject = null;
    }
    this.remoteAudioStream = null;
    this.clientSecret = null;
    this.currentCoachId = null;
    this.updateStatus("disconnected");
  }

  private setupAudioAnalyzer() {
    if (!this.remoteAudioStream) return;
    try {
      this.audioCtx = new window.AudioContext();
      const source = this.audioCtx.createMediaStreamSource(this.remoteAudioStream);
      
      this.gainNode = this.audioCtx.createGain();
      this.gainNode.gain.value = this.isMuted ? 0 : 2.5; // Boost the incoming voice by 2.5x

      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 256;
      
      // Connect nodes: Source -> Gain -> Analyser (We don't connect to destination to avoid double audio since audioEl is playing)
      source.connect(this.gainNode);
      this.gainNode.connect(this.analyser);
      
      this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);

      if (this.volumeInterval) window.clearInterval(this.volumeInterval);
      
      this.volumeInterval = window.setInterval(() => {
        if (this.isMuted) return;
        if (this.analyser && this.dataArray) {
          this.analyser.getByteFrequencyData(this.dataArray as any);
          let sum = 0;
          for (let i = 0; i < this.dataArray.length; i++) {
            sum += this.dataArray[i];
          }
          const avg = sum / this.dataArray.length;
          
          const isCurrentlySpeaking = avg > 3; // Threshold for voice activity
          
          if (isCurrentlySpeaking !== this.isSpeaking) {
             this.isSpeaking = isCurrentlySpeaking;
             this.updateStatus(this.isSpeaking ? "speaking" : "connected");
          }
        }
      }, 50);
    } catch (e) {
      console.warn("[AI COACH] Failed to setup audio analyzer for precise lipsync", e);
    }
  }

  private updateStatus(status: VoiceConnectionState, error?: string) {
    if (this.onStatusChange) {
      this.onStatusChange(status, error);
    }
  }
}
