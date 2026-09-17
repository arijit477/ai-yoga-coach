import type { VoiceProvider } from "./VoiceProvider";
import { AudioPlaybackManager } from "./AudioPlaybackManager";

export class ElevenLabsVoiceProvider implements VoiceProvider {
  private ws: WebSocket | null = null;
  private audioManager: AudioPlaybackManager;
  private wsUrl: string = "ws://localhost:8000/api/ai-coach/voice/stream";
  private isConnected: boolean = false;
  private coachId: string = "alice";

  constructor() {
    this.audioManager = new AudioPlaybackManager();
  }

  public getMediaStream(): MediaStream | null {
    return this.audioManager.getMediaStream();
  }

  public async initialize(coachId: string): Promise<void> {
    this.coachId = coachId;
    return new Promise((resolve, reject) => {
      try {
        const url = new URL(this.wsUrl);
        url.searchParams.append("coach_id", this.coachId);
        
        this.ws = new WebSocket(url.toString());

        this.ws.onopen = () => {
          console.log("[ElevenLabsVoiceProvider] Connected to proxy WebSocket");
          this.isConnected = true;
          resolve();
        };

        this.ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.type === "audio" && data.audio) {
              this.audioManager.queueBase64PCM(data.audio);
            }
          } catch (e) {
            console.error("[ElevenLabsVoiceProvider] Error parsing message:", e);
          }
        };

        this.ws.onerror = (error) => {
          console.error("[ElevenLabsVoiceProvider] WebSocket error:", error);
          reject(error);
        };

        this.ws.onclose = () => {
          console.log("[ElevenLabsVoiceProvider] WebSocket closed");
          this.isConnected = false;
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  public streamText(text: string): void {
    if (this.ws && this.isConnected) {
      this.ws.send(JSON.stringify({ type: "text", text: text }));
    } else {
      console.warn("[ElevenLabsVoiceProvider] Cannot stream text, WebSocket not connected");
    }
  }

  public stop(): void {
    if (this.ws && this.isConnected) {
      // Send flush to finish any ongoing generation on the ElevenLabs side
      this.ws.send(JSON.stringify({ type: "flush" }));
    }
    // Instantly stop audio playback and clear queue
    this.audioManager.stop();
  }

  public dispose(): void {
    this.stop();
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.audioManager.dispose();
  }
}
