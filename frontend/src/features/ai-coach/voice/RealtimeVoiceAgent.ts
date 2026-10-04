import type { CoachingEvent, VoiceTranscriptItem, VoiceConnectionState } from "./voice.types";
import { getAsanaStartingInstruction } from "../services/AsanaStartingInstructionService";
import type { FeedbackOutput } from "../analysis/FeedbackEngine";
import { buildCoachingContext } from "./CoachingContextBuilder";
import type { CoachingContext } from "./CoachingContext";
import {
  CoachingRhythmManager,
  type CoachingRhythmDecision,
} from "./CoachingRhythmManager";
import { buildRealtimeCoachingContext } from "./CoachingContextFormatter";

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

/**
 * RealtimeVoiceAgent
 * 
 * Authoritative client-side OpenAI Realtime WebRTC voice client.
 * Operates in strict UNIDIRECTIONAL (recvonly) mode:
 * - NO microphone capture or user speech input.
 * - Computer vision coaching events trigger programmatic `response.create` requests via DataChannel.
 * - OpenAI streams high-fidelity coach speech audio back over the WebRTC peer connection.
 */
export class RealtimeVoiceAgent {
  private pc: RTCPeerConnection | null = null;
  private dc: RTCDataChannel | null = null;
  private audioEl: HTMLAudioElement | null = null;
  private onStatusChange?: (status: VoiceConnectionState, error?: string) => void;
  private onTranscript?: (item: VoiceTranscriptItem) => void;
  private clientSecret: string | null = null;
  private isMuted: boolean = false;
  private isSpeaking: boolean = false;
  private currentCoachId: string | null = null;
  private isConnecting: boolean = false;
  private currentSessionContext: SessionContextData | null = null;

  // Phase 3: controls when coaching events should become voice output
  private coachingRhythm = new CoachingRhythmManager();

  // Safe response orchestration state
  private hasActiveServerResponse: boolean = false;
  private pendingSpeechText: string | null = null;
  private isCancelling: boolean = false;

  // Web Audio API pipeline for lipsync and volume control
  private remoteAudioStream: MediaStream | null = null;
  private audioCtx: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private gainNode: GainNode | null = null;
  private dataArray: Uint8Array | null = null;
  private volumeInterval: number | null = null;
  private pendingPoseStart: { id: string; name: string; description?: string } | null = null;

  // Balanced default gain multiplier (prevents distortion while ensuring clarity)
  private readonly DEFAULT_GAIN: number = 2.5;

  constructor(
    onStatusChange?: (status: VoiceConnectionState, error?: string) => void,
    onTranscript?: (item: VoiceTranscriptItem) => void,
  ) {
    this.onStatusChange = onStatusChange;
    this.onTranscript = onTranscript;

    if (typeof document !== "undefined") {
      this.audioEl = document.createElement("audio");
      this.audioEl.autoplay = true;
      // Must stay permanently muted to prevent dual-playback echo through Web Audio API
      this.audioEl.muted = true;
      this.audioEl.style.display = "none";
      if (document.body && !document.body.contains(this.audioEl)) {
        document.body.appendChild(this.audioEl);
      }
    }
  }

  getRemoteAudioStream(): MediaStream | null {
    return this.remoteAudioStream;
  }

  getCoachId(): string | null {
    return this.currentCoachId;
  }

  /**
   * Resumes Web Audio API AudioContext if suspended by browser autoplay policy.
   * Can be invoked during any user gesture (e.g. clicking Start AI Coach).
   */
  public unlockAudio(): void {
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume().catch((err) => {
        console.warn("[AI COACH] AudioContext resume failed:", err);
      });
    }
  }

  /**
   * Establishes a secure WebRTC session with OpenAI Realtime API.
   * Unidirectional recvonly audio transport — ZERO microphone access.
   */
  async connect(coachId: string): Promise<void> {
    if (this.isConnecting) {
      console.warn("[AI COACH] RealtimeVoiceAgent connection already in progress.");
      return;
    }

    // Clean up any existing connection first
    this.disconnect();

    this.isConnecting = true;
    this.currentCoachId = coachId;
    this.updateStatus("connecting");

    try {
      // 1. Fetch ephemeral session token from hardened FastAPI backend
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
      const resp = await fetch(`${apiUrl}/api/ai-coach/realtime/session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coach_id: coachId }),
      });

      if (!resp.ok) {
        const errText = await resp.text();
        throw new Error(`Session creation failed (${resp.status}): ${errText}`);
      }

      const data = await resp.json();
      this.clientSecret = data.client_secret;

      if (!this.clientSecret) {
        throw new Error("No client secret returned from voice session backend.");
      }

      // 2. Initialize RTCPeerConnection in strict recvonly audio mode
      this.pc = new RTCPeerConnection();
      this.pc.addTransceiver("audio", { direction: "recvonly" });

      // Listen for connection state transitions
      this.pc.onconnectionstatechange = () => {
        const connState = this.pc?.connectionState;
        console.log(`[AI COACH] WebRTC Connection State: ${connState}`);
        if (connState === "disconnected" || connState === "failed") {
          this.updateStatus("error", "Voice connection lost. Click to reconnect.");
        } else if (connState === "connected") {
          this.updateStatus(this.isMuted ? "muted" : "connected");
        }
      };

      this.pc.oniceconnectionstatechange = () => {
        const iceState = this.pc?.iceConnectionState;
        if (iceState === "failed" || iceState === "disconnected") {
          console.warn(`[AI COACH] ICE State: ${iceState}`);
          this.updateStatus("error", "Voice connection interrupted. Click to reconnect.");
        }
      };

      // 3. Handle incoming remote audio stream from OpenAI
      this.pc.ontrack = (event) => {
        if (event.streams && event.streams[0]) {
          this.remoteAudioStream = event.streams[0];
          if (this.audioEl) {
            this.audioEl.srcObject = this.remoteAudioStream;
          }
          this.setupAudioPipeline();
        }
      };

      // 4. Create RTCDataChannel for programmatic JSON event messaging
      this.dc = this.pc.createDataChannel("oai-events");

      this.dc.onopen = () => {
        console.log("[AI COACH] RealtimeVoiceAgent Data Channel Opened.");
        this.updateStatus(this.isMuted ? "muted" : "connected");

        // Handle any pending pose announcement queued during connection
        if (this.pendingPoseStart) {
          const asana = this.pendingPoseStart;
          this.pendingPoseStart = null;
          const desc = asana.description ? ` ${asana.description}` : '';
          const instruction = getAsanaStartingInstruction(asana.id);

          this.speak(`Let's begin ${asana.name}.${desc} ${instruction}`);
        } else if (this.currentSessionContext?.isSessionActive) {
          this.speakGreeting();
        }
      };

      this.dc.onclose = () => {
        console.log("[AI COACH] RealtimeVoiceAgent Data Channel Closed.");
      };

      this.dc.onerror = (err) => {
        console.warn("[AI COACH] Data Channel error:", err);
      };

      this.dc.onmessage = (e) => {
        this.handleDataChannelMessage(e.data);
      };

      // 5. Create local SDP offer & set local description
      const offer = await this.pc.createOffer();
      await this.pc.setLocalDescription(offer);

      // 6. Send offer to OpenAI Realtime GA endpoint
      const sdpResponse = await fetch("https://api.openai.com/v1/realtime/calls", {
        method: "POST",
        body: offer.sdp,
        headers: {
          Authorization: `Bearer ${this.clientSecret}`,
          "Content-Type": "application/sdp",
        },
      });

      if (!sdpResponse.ok) {
        const errorDetail = await sdpResponse.text();
        throw new Error(`OpenAI WebRTC signaling failed (${sdpResponse.status}): ${errorDetail}`);
      }

      const answerSdp = await sdpResponse.text();
      const answer = { type: "answer" as RTCSdpType, sdp: answerSdp };
      await this.pc.setRemoteDescription(answer);

      this.isConnecting = false;
      this.updateStatus(this.isMuted ? "muted" : "connected");
      this.syncMuteState();

    } catch (e: any) {
      console.error("[AI COACH] Realtime WebRTC connection failed:", e);
      this.isConnecting = false;
      this.updateStatus("error", e?.message || "Voice connection failed. Please retry.");
    }
  }

  /**
   * Processes incoming DataChannel JSON events from OpenAI Realtime.
   */
  private handleDataChannelMessage(rawData: string): void {
    try {
      const ev = JSON.parse(rawData);

      // Track active server generation and playback
      if (
        ev.type === "response.created" ||
        ev.type === "response.output_item.added" ||
        ev.type === "response.audio.delta"
      ) {
        this.hasActiveServerResponse = true;
      } else if (
        ev.type === "response.done" ||
        ev.type === "response.audio.done" ||
        ev.type === "response.cancelled"
      ) {
        this.hasActiveServerResponse = false;
        this.isCancelling = false;

        // If a new coaching prompt was queued while previous speech was finishing/cancelling, trigger it now
        if (this.pendingSpeechText) {
          const nextText = this.pendingSpeechText;
          this.pendingSpeechText = null;
          this.sendResponseCreate(nextText);
        }
      }

      // Handle function calls from the model if any
      if (ev.type === "response.function_call_arguments.done") {
        this.handleFunctionCall(ev);
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

      // Handle benign race conditions and errors
      if (ev.type === "error") {
        if (ev.error?.code === "response_cancel_not_active") {
          // Benign race: response finished just before cancel signal arrived
          this.hasActiveServerResponse = false;
          this.isCancelling = false;
          if (this.pendingSpeechText) {
            const nextText = this.pendingSpeechText;
            this.pendingSpeechText = null;
            this.sendResponseCreate(nextText);
          }
          return;
        }

        if (ev.error?.code === "conversation_already_has_active_response") {
          this.hasActiveServerResponse = true;
          if (!this.isCancelling && this.dc?.readyState === "open") {
            this.isCancelling = true;
            try {
              this.dc.send(JSON.stringify({ type: "response.cancel" }));
            } catch (_) { }
          }
          return;
        }

        console.error("[AI COACH] OpenAI Realtime Server Event Error:", ev.error);
      }
    } catch (_) {
      // Ignore non-JSON raw events
    }
  }

  /**
   * Helper to dispatch response.create with rich coach prosody instructions.
   */
  private sendResponseCreate(text: string): void {
    if (!this.dc || this.dc.readyState !== "open" || this.isMuted) {
      return;
    }

    const session: SessionContextData = this.currentSessionContext ?? {
      coach: this.currentCoachId || "alice",
      asanaId: "",
      asanaName: "this pose",
      isSessionActive: true,
    };

    const context = buildRealtimeCoachingContext(session);

    const isAlice = this.currentCoachId !== "kevin";
    const coachName = isAlice ? "Alice" : "Kevin";

    const personality = isAlice
      ? `
You are Coach Alice, a calm, warm, graceful British yoga instructor.
Your coaching style is supportive, elegant, reassuring and encouraging.
`
      : `
You are Coach Kevin, a grounded, confident, motivating British yoga instructor.
Your coaching style is energetic, focused, encouraging and athletic.
`;

    const instructions = `
You are Coach ${coachName}, the user's real-time AI yoga coach.

${personality}

You are operating in a UNIDIRECTIONAL coaching experience.

The user is performing yoga in front of a camera.
Do NOT ask the user questions.
Do NOT start a conversation.
Do NOT expect microphone input.
Do NOT ask the user to respond verbally.

The computer-vision system is authoritative for posture measurement.

You must NEVER invent a posture problem that is not supported
by the supplied coaching context.

Your job is to turn the trusted coaching state into natural,
short and useful spoken coaching.

COACHING PRINCIPLES:

1. Safety comes first.
2. Correct the most important issue first.
3. Give only one physical correction at a time.
4. Do not repeatedly say the same correction.
5. Recognize improvement.
6. Encourage the user when they are doing well.
7. During a stable hold, occasionally encourage breathing,
   stability and focus.
8. When the user successfully corrects a problem, acknowledge it.
9. When the pose is completed, give concise positive reinforcement.
10. If nothing meaningful has changed, prefer silence over unnecessary chatter.
11. Never overwhelm the user with multiple instructions.
12. Keep spoken responses concise and natural.

ENGAGEMENT:

The user should feel like they have a real yoga instructor
watching and guiding them.

Use a natural rhythm:

GUIDE → OBSERVE → CORRECT → ENCOURAGE → OBSERVE → CONFIRM

Do not praise every single event.
Do not repeat identical phrases.
Do not speak just because data arrived.

When appropriate, use brief coaching language such as:

"Good."
"That's better."
"Keep breathing."
"Nice work."
"Stay there."
"Beautiful alignment."
"Just a little longer."

Adapt the wording naturally rather than repeating these exact phrases.

CURRENT COACHING CONTEXT:

${JSON.stringify(context, null, 2)}

CURRENT EVENT:

${text}

Use the CURRENT EVENT together with the CURRENT COACHING CONTEXT.

The event is trusted input from the existing pose-analysis system.
Do not reinterpret the biomechanics beyond the information supplied.

Return ONLY the short spoken coaching response.
No explanations.
No JSON.
No bullet points.
No technical terminology.
No questions.

The response should normally be one or two short sentences.
`;

    const responseCreate = {
      type: "response.create",
      response: {
        instructions,
      },
    };

    try {
      this.dc.send(JSON.stringify(responseCreate));

      this.hasActiveServerResponse = true;
      this.isCancelling = false;
    } catch (err) {
      console.warn(
        "[AI COACH] Failed to send intelligent response.create:",
        err
      );

      this.hasActiveServerResponse = false;
    }
  }

  /**
   * Spoken guidance trigger for approved coaching events.
   * Programmatically requests OpenAI to synthesize and stream speech.
   */
  public speak(text: string): void {
    if (!text || this.isMuted) return;

    if (this.dc && this.dc.readyState === "open") {
      if (this.hasActiveServerResponse) {
        // Queue latest text and cancel in-flight response safely
        this.pendingSpeechText = text;
        if (!this.isCancelling) {
          this.isCancelling = true;
          try {
            this.dc.send(JSON.stringify({ type: "response.cancel" }));
          } catch (_) {
            this.hasActiveServerResponse = false;
            this.isCancelling = false;
          }
        }
      } else {
        this.pendingSpeechText = null;
        this.sendResponseCreate(text);
      }

      this.onTranscript?.({
        id: `coach_speech_${Date.now()}`,
        role: "coach",
        text,
        timestamp: Date.now(),
      });
    } else {
      console.warn("[AI COACH] Realtime DataChannel not open. Speech suppressed:", text);
    }
  }

  /**
   * Triggers the pose entry cue when an asana starts.
   */
  public triggerPoseStart(asanaId: string, asanaName: string, _asanaDescription?: string): void {
    const instruction = getAsanaStartingInstruction(asanaId);
    const message = `Let's begin ${asanaName}. ${instruction}`;

    if (this.dc && this.dc.readyState === "open") {
      this.speak(message);
    } else {
      this.pendingPoseStart = { id: asanaId, name: asanaName, description: instruction };
    }
  }

  /**
   * Spoken guidance greeting on initial session start.
   */
  public speakGreeting(): void {
    const ctx = this.currentSessionContext;
    if (ctx && ctx.isSessionActive && ctx.sessionState && ctx.sessionState !== "idle") {
      let greeting = "";
      if (ctx.cameraState === "off" || ctx.cameraState === "unavailable") {
        greeting = "Please enable your camera so I can guide your practice.";
      } else if (ctx.cameraState === "no_person" || ctx.hasPose === false) {
        greeting = "I can't see you yet. Step into the camera frame.";
      } else if (ctx.cameraState === "partial_body") {
        greeting = "I can see you, but not your full posture. Take a small step back.";
      } else {
        const instruction = ctx.asanaId ? getAsanaStartingInstruction(ctx.asanaId) : `Settle into your foundation and take a deep breath.`;
        greeting = `Perfect. ${instruction}`;
      }
      this.speak(greeting);
    }
  }

  /**
   * Dispatches an asana-specific feedback message from FeedbackEngine.
   */
  public sendFeedback(feedback: FeedbackOutput): void {
    if (!feedback || !feedback.message || this.isMuted) return;

    if (this.dc && this.dc.readyState === "open") {
      if (this.hasActiveServerResponse) {
        this.pendingSpeechText = feedback.message;
        if (!this.isCancelling) {
          this.isCancelling = true;
          try {
            this.dc.send(JSON.stringify({ type: "response.cancel" }));
          } catch (_) {
            this.hasActiveServerResponse = false;
            this.isCancelling = false;
          }
        }
      } else {
        this.pendingSpeechText = null;
        this.sendFeedbackResponse(feedback);
      }

      this.onTranscript?.({
        id: `coach_feedback_${Date.now()}`,
        role: "coach",
        text: feedback.message,
        timestamp: Date.now(),
      });
    } else {
      console.warn("[AI COACH] Realtime DataChannel not open. Feedback suppressed:", feedback.message);
    }
  }

  /**
   * Sends a structured instruction payload ensuring the Realtime model speaks the exact coaching cue.
   */
  public sendFeedbackResponse(feedback: FeedbackOutput): void {
    if (!this.dc || this.dc.readyState !== "open" || this.isMuted) return;

    const asanaName = feedback.asanaName || this.currentSessionContext?.asanaName || "this pose";
    const isAlice = this.currentCoachId !== "kevin";
    const coachName = isAlice ? "Alice" : "Kevin";
    const toneStyle = isAlice
      ? "calm, warm, graceful British tone with natural breath pauses"
      : "grounded, confident, motivating British tone with athletic focus";

    const prompt = `As Coach ${coachName} for ${asanaName}, speak this exact yoga coaching guidance with a ${toneStyle}. Do not add conversational filler, do not ask questions, and do not explain biomechanics. Speak only the instruction: "${feedback.message}"`;

    const responseCreate = {
      type: "response.create",
      response: {
        instructions: prompt,
      },
    };

    try {
      this.dc.send(JSON.stringify(responseCreate));
      this.hasActiveServerResponse = true;
      this.isCancelling = false;
    } catch (err) {
      console.warn("[AI COACH] Failed to send feedback response.create:", err);
      this.hasActiveServerResponse = false;
    }
  }

  /**
   * Dispatches a structured coaching event approved by CoachDecisionEngine.
   *
   * Phase 3:
   * CoachingRhythmManager decides whether the event should be spoken now.
   * It does NOT modify pose detection, scoring, or event generation.
   */
  public sendCoachingEvent(event: CoachingEvent): void {
    if (this.isMuted) return;

    const decision: CoachingRhythmDecision =
      this.coachingRhythm.shouldSpeak(event);

    if (!decision.shouldSpeak) {
      console.debug(
        "[AI COACH] Coaching event suppressed by rhythm:",
        event.type,
        decision.reason
      );
      return;
    }

    let spokenText = event.feedback ?? "";

    if (!spokenText) {
      switch (event.type) {
        case "pose_started":
          spokenText = getAsanaStartingInstruction(event.asanaId);
          break;

        case "calibration_complete":
          spokenText =
            `Alignment looks ready. Let's begin ${event.asanaName}.`;
          break;

        case "good_form":
          spokenText =
            "Beautiful form. Breathe smoothly and hold right here.";
          break;

        case "issue_improving":
          spokenText =
            event.feedback ?? "That's getting better. Keep going.";
          break;

        case "issue_resolved":
          spokenText =
            event.feedback ?? "Yes, that's much better. Keep that alignment.";
          break;

        case "pose_held":
          spokenText =
            "Posture is aligned. Soften your shoulders and keep breathing.";
          break;

        case "hold_countdown":
          spokenText =
            event.feedback ?? "Keep holding. Stay steady and breathe.";
          break;

        case "pose_completed":
          spokenText =
            `Wonderful hold! You completed ${event.asanaName}.`;
          break;

        case "user_out_of_frame":
          spokenText =
            "I lost sight of you. Step back into the frame so we can continue.";
          break;

        case "partial_body":
          spokenText =
            "I can only see part of your body. Step back slightly so I can see your full form.";
          break;

        case "camera_unavailable":
          spokenText =
            "Please enable your camera so I can guide you.";
          break;

        case "camera_ready":
          spokenText =
            "Welcome back! I can see your alignment clearly now.";
          break;

        default:
          break;
      }
    }

    if (!spokenText) {
      return;
    }

    // Mark the event only when we actually intend to speak it.
    this.coachingRhythm.markSpoken(
      event,
      decision.cueType
    );

    this.speak(spokenText);
  }

  /**
   * Updates session context locally (e.g. asana changed, score updated).
   */
  public updateSessionContext(context: SessionContextData): void {
    this.currentSessionContext = context;
  }

  private handleFunctionCall(ev: any): void {
    if (!this.dc || this.dc.readyState !== "open") return;

    const callId = ev.call_id;
    const functionName = ev.name;
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
            previousScore: ctx.previousScore,
          };
          break;
        case "get_session_state":
          result = {
            coachState: ctx.coachState,
            sessionState: ctx.sessionState,
            isHolding: ctx.isHolding,
            isCompleted: ctx.isCompleted,
            previousAsana: ctx.previousAsanaName,
            completedPoses: ctx.completedPoses,
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
          output: JSON.stringify(result),
        },
      }));
      this.dc.send(JSON.stringify({ type: "response.create" }));
    } catch (e) {
      console.warn("[AI COACH] Error responding to function call", e);
    }
  }

  public setMuted(isMuted: boolean): void {
    this.isMuted = isMuted;
    if (isMuted) {
      this.isSpeaking = false;
    }
    this.syncMuteState();
    this.updateStatus(isMuted ? "muted" : (this.isSpeaking ? "speaking" : "connected"));
  }

  private syncMuteState(): void {
    if (this.gainNode) {
      this.gainNode.gain.value = this.isMuted ? 0 : this.DEFAULT_GAIN;
    }
  }

  /**
   * Disconnects and cleans up all WebRTC, DataChannel, and Web Audio API resources.
   */
  public disconnect(): void {
    this.isSpeaking = false;
    this.isConnecting = false;
    this.pendingSpeechText = null;
    this.isCancelling = false;
    this.coachingRhythm.reset();

    // Cancel in-flight response if active
    if (this.dc && this.dc.readyState === "open" && this.hasActiveServerResponse) {
      try {
        this.dc.send(JSON.stringify({ type: "response.cancel" }));
      } catch (_) { }
      this.hasActiveServerResponse = false;
    }

    // Silence audio element
    if (this.audioEl) {
      try {
        this.audioEl.pause();
      } catch (_) { }
      this.audioEl.srcObject = null;
    }

    if (this.dc) {
      try {
        this.dc.close();
      } catch (_) { }
      this.dc = null;
    }

    if (this.pc) {
      try {
        this.pc.close();
      } catch (_) { }
      this.pc = null;
    }

    if (this.volumeInterval) {
      window.clearInterval(this.volumeInterval);
      this.volumeInterval = null;
    }

    if (this.audioCtx) {
      try {
        this.audioCtx.close();
      } catch (_) { }
      this.audioCtx = null;
    }

    this.gainNode = null;
    this.analyser = null;
    this.dataArray = null;
    this.remoteAudioStream = null;
    this.clientSecret = null;
    this.currentCoachId = null;

    this.updateStatus("disconnected");
  }

  /**
   * Sets up the Web Audio API pipeline for speech volume boosting and real-time lip-sync analysis.
   */
  private setupAudioPipeline(): void {
    if (!this.remoteAudioStream) return;

    try {
      const AudioCtxConstructor = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtxConstructor) return;

      this.audioCtx = new AudioCtxConstructor();
      this.unlockAudio();

      const source = this.audioCtx.createMediaStreamSource(this.remoteAudioStream);

      this.gainNode = this.audioCtx.createGain();
      this.gainNode.gain.value = this.isMuted ? 0 : this.DEFAULT_GAIN;

      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 256;

      // Source -> Gain -> Analyser -> Speakers (audioCtx.destination)
      source.connect(this.gainNode);
      this.gainNode.connect(this.analyser);
      this.gainNode.connect(this.audioCtx.destination);

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

          // Threshold for voice activity detection driving lipsync
          const isCurrentlySpeaking = avg > 3.0;

          if (isCurrentlySpeaking !== this.isSpeaking) {
            this.isSpeaking = isCurrentlySpeaking;
            this.updateStatus(this.isSpeaking ? "speaking" : "connected");
          }
        }
      }, 50);

    } catch (e) {
      console.warn("[AI COACH] Failed to setup Web Audio API analyzer:", e);
    }
  }

  private updateStatus(status: VoiceConnectionState, error?: string): void {
    if (this.onStatusChange) {
      this.onStatusChange(status, error);
    }
  }
}
