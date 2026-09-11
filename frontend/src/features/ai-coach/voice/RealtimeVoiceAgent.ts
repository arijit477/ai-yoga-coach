import type { CoachingEvent } from "./voice.types";

export class RealtimeVoiceAgent {
  private pc: RTCPeerConnection | null = null;
  private dc: RTCDataChannel | null = null;
  private audioEl: HTMLAudioElement | null = null;
  private stream: MediaStream | null = null;
  private onStatusChange?: (status: "disconnected" | "connecting" | "connected" | "listening" | "speaking" | "error", error?: string) => void;
  private clientSecret: string | null = null;
  private isMuted: boolean = false;

  constructor(
    onStatusChange?: (status: "disconnected" | "connecting" | "connected" | "listening" | "speaking" | "error", error?: string) => void
  ) {
    this.onStatusChange = onStatusChange;
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
        body: JSON.stringify({ coach_id: coachId })
      });
      if (!resp.ok) {
        throw new Error("Failed to create voice session");
      }
      const data = await resp.json();
      this.clientSecret = data.client_secret;

      // 2. Setup WebRTC
      this.pc = new RTCPeerConnection();
      
      // Handle incoming audio
      this.pc.ontrack = e => {
        if (this.audioEl) {
          this.audioEl.srcObject = e.streams[0];
        }
      };

      // Set up data channel
      this.dc = this.pc.createDataChannel("oai-events");
      this.dc.onopen = () => {
        console.log("RealtimeVoiceAgent Data Channel Opened");
      };
      
      // Monitor speaking state from OpenAI events over the data channel
      this.dc.onmessage = (e) => {
        try {
          const ev = JSON.parse(e.data);
          if (ev.type === "response.audio.delta" || ev.type === "response.output_item.added") {
            this.updateStatus("speaking");
          } else if (ev.type === "response.done" || ev.type === "response.audio.done") {
            this.updateStatus("connected");
          }
        } catch (err) {}
      };

      // 3. Get local microphone stream
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.pc.addTrack(this.stream.getTracks()[0], this.stream);

      // 4. Create and set local offer
      const offer = await this.pc.createOffer();
      await this.pc.setLocalDescription(offer);

      // 5. Send offer to OpenAI Realtime API using the ephemeral token
      const baseUrl = "https://api.openai.com/v1/realtime";
      const model = "gpt-4o-realtime-preview-2024-12-17"; // or the current model matching the backend
      const sdpResponse = await fetch(`${baseUrl}?model=${model}`, {
        method: "POST",
        body: offer.sdp,
        headers: {
          Authorization: `Bearer ${this.clientSecret}`,
          "Content-Type": "application/sdp"
        },
      });

      if (!sdpResponse.ok) {
        throw new Error("Failed to connect to OpenAI WebRTC");
      }

      const answerSdp = await sdpResponse.text();
      const answer = { type: "answer" as RTCSdpType, sdp: answerSdp };
      await this.pc.setRemoteDescription(answer);

      this.updateStatus("connected");
      this.syncMuteState();

    } catch (e: any) {
      console.error("RealtimeVoiceAgent Connect Error:", e);
      this.updateStatus("error", e.message);
      this.disconnect();
    }
  }

  sendCoachingEvent(event: CoachingEvent) {
    if (!this.dc || this.dc.readyState !== "open") return;

    // We send a client-side event to the realtime API as an app message
    // So the model receives it as context
    const oaiEvent = {
      type: "conversation.item.create",
      item: {
        type: "message",
        role: "user",
        content: [
          {
            type: "input_text",
            text: `[SYSTEM POSTURE EVENT] You have received a new posture event. Type: ${event.type}. Asana: ${event.asanaName}. Issue: ${event.issue || 'None'}. Severity: ${event.severity}. Feedback: ${event.feedback}. Address this based on your instructions.`
          }
        ]
      }
    };
    this.dc.send(JSON.stringify(oaiEvent));

    // Force response generation
    const responseCreate = {
      type: "response.create"
    };
    this.dc.send(JSON.stringify(responseCreate));
  }

  setMuted(isMuted: boolean) {
    this.isMuted = isMuted;
    this.syncMuteState();
  }

  private syncMuteState() {
    if (this.stream) {
      this.stream.getAudioTracks().forEach(track => {
        track.enabled = !this.isMuted;
      });
    }
    if (this.audioEl) {
      this.audioEl.muted = this.isMuted;
    }
  }

  disconnect() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
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

  private updateStatus(status: "disconnected" | "connecting" | "connected" | "listening" | "speaking" | "error", error?: string) {
    if (this.onStatusChange) {
      this.onStatusChange(status, error);
    }
  }
}
