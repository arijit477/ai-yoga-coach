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
  isSessionActive?: boolean;
  cameraState?: string;
  hasPose?: boolean;
  userVisible?: boolean;
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
  private pendingPoseStart: { id: string; name: string } | null = null;

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

    // 1. Pure audio receive (recvonly) - zero mic capture, zero VAD latency
    this.stream = null;

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

      // 3. Setup WebRTC Peer Connection with zero-latency audio receive
      this.pc = new RTCPeerConnection();
      this.pc.addTransceiver("audio", { direction: "recvonly" });

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
        if (this.pendingPoseStart) {
          const asana = this.pendingPoseStart;
          this.pendingPoseStart = null;
          this.speak(`Let's begin ${asana.name}. Stand comfortably and check your alignment.`);
        } else if (this.currentSessionContext?.isSessionActive) {
          this.speakGreeting();
        }
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
          }

          if (ev.type === "response.function_call_arguments.done") {
             this.handleFunctionCall(ev);
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

      const sdpResponse = await fetch("https://api.openai.com/v1/realtime/calls", {
        method: "POST",
        body: offer.sdp,
        headers: sdpHeaders,
      });

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
      console.error("[AI COACH] WebRTC connection failed:", e);
      this.isConnecting = false;
      this.updateStatus("error", e?.message || "Voice connection failed.");
    }
  }

  /**
   * High-fidelity speech synthesis using OpenAI Realtime or browser fallback
   */
  speak(text: string) {
    if (this.isMuted) return;

    if (this.dc && this.dc.readyState === "open") {
      try {
        // If coach is already speaking, cancel previous response to prevent queuing lag
        if (this.isSpeaking) {
          try {
            this.dc.send(JSON.stringify({ type: "response.cancel" }));
          } catch (_) {}
        }

        const responseCreate = {
          type: "response.create",
          response: {
            instructions: `Speak this yoga cue clearly and warmly: "${text}"`,
          },
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
   * Triggers or queues the pose start verbal cue.
   * If data channel is already open, speaks immediately.
   * Otherwise, queues it to speak immediately upon connection open.
   */
  triggerPoseStart(asanaId: string, asanaName: string) {
    if (this.dc && this.dc.readyState === "open") {
      this.speak(`Let's begin ${asanaName}. Stand comfortably and check your posture.`);
    } else {
      this.pendingPoseStart = { id: asanaId, name: asanaName };
    }
  }

  /**
   * Verbal guidance on connection:
   * Only provides verbal guidance if practice has actively started.
   * Stays silent and ready before practice is started.
   */
  speakGreeting() {
    const ctx = this.currentSessionContext;

    if (ctx && ctx.isSessionActive && ctx.sessionState && ctx.sessionState !== "idle") {
      let greeting = "";
      if (ctx.cameraState === "off" || ctx.cameraState === "unavailable") {
        greeting = "Please enable your camera first.";
      } else if (ctx.cameraState === "no_person" || ctx.hasPose === false) {
        greeting = "I can't see you yet. Step into the camera frame.";
      } else if (ctx.cameraState === "partial_body") {
        greeting = "I can see you, but not your full body. Take a small step back.";
      } else {
        greeting = `Perfect. Let's get you ready for ${ctx.asanaName || "your pose"}. Stand comfortably and hold still for a moment.`;
      }
      this.speak(greeting);
    }
  }

  /**
   * Listening feature removed. No-op.
   */
  startListening() {
    // No-op
  }

  /**
   * Listening feature removed. No-op.
   */
  stopListening() {
    // No-op
  }

  /**
   * Dispatches a structured coaching event and speaks verbal instructions clearly to the user.
   */
  sendCoachingEvent(event: CoachingEvent) {
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
    } else if (event.type === "hold_countdown" && event.feedback) {
      spokenText = event.feedback;
    } else if (event.type === "user_out_of_frame") {
      spokenText = event.feedback || "I can't see you. Step back into the frame so we can continue.";
    } else if (event.type === "partial_body") {
      spokenText = event.feedback || "I can only see part of your body. Take a small step back.";
    } else if (event.type === "camera_unavailable") {
      spokenText = event.feedback || "Please enable your camera so I can guide you.";
    } else if (event.type === "camera_ready") {
      spokenText = event.feedback || "Welcome back! I can see you clearly now.";
    }

    if (spokenText) {
      this.speak(spokenText);
    }
  }

  /**
   * Updates current session context locally (e.g. asana changed, session completed).
   */
  updateSessionContext(context: SessionContextData) {
    this.currentSessionContext = context;
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

    // Immediately stop browser speech synthesis if active
    if (typeof window !== "undefined" && window.speechSynthesis) {
      try {
        window.speechSynthesis.cancel();
      } catch (_) {}
    }

    // Cancel any ongoing speech response in OpenAI Realtime
    if (this.dc && this.dc.readyState === "open") {
      try {
        this.dc.send(JSON.stringify({ type: "response.cancel" }));
      } catch (_) {}
    }

    // Immediately pause and silence audio element
    if (this.audioEl) {
      try {
        this.audioEl.pause();
      } catch (_) {}
      this.audioEl.srcObject = null;
    }

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
