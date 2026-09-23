import type { CoachingEvent, VoiceTranscriptItem } from "./voice.types";

interface QueuedUtterance {
  text: string;
  priority: number; 
  eventType?: string;
}

export class CoachTTSAgent {
  private isMuted: boolean = false;
  private queue: QueuedUtterance[] = [];
  private isSpeaking: boolean = false;
  private currentCoachId: string = "alice";
  private onTranscript?: (item: VoiceTranscriptItem) => void;
  private audioElement: HTMLAudioElement | null = null;
  private currentObjectUrl: string | null = null;

  constructor(onTranscript?: (item: VoiceTranscriptItem) => void) {
    this.onTranscript = onTranscript;
    if (typeof window !== "undefined") {
      this.audioElement = new Audio();
      this.audioElement.onended = () => {
        this.cleanupCurrentAudio();
        this.isSpeaking = false;
        this.processQueue();
      };
      this.audioElement.onerror = (e) => {
        console.warn("[AI COACH] ElevenLabs audio playback error:", e);
        this.cleanupCurrentAudio();
        this.isSpeaking = false;
        this.processQueue();
      };
    }
  }

  private cleanupCurrentAudio() {
    if (this.currentObjectUrl) {
      URL.revokeObjectURL(this.currentObjectUrl);
      this.currentObjectUrl = null;
    }
  }

  setCoach(coachId: string) {
    this.currentCoachId = coachId;
  }

  setMuted(isMuted: boolean) {
    this.isMuted = isMuted;
    if (isMuted) {
      this.stopSpeaking();
    }
  }

  sendCoachingEvent(event: CoachingEvent, priority: number) {
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
      this.speak(spokenText, priority, event.type);
    }
  }

  speak(text: string, priority: number = 5, eventType?: string) {
    if (this.isMuted || typeof window === "undefined" || !this.audioElement) return;

    if (priority <= 1) {
      this.stopSpeaking();
      this.queue = [];
    }

    if (priority <= 4 && this.isSpeaking) {
      this.stopSpeaking();
      this.queue = this.queue.filter(q => q.priority <= 4);
    }

    this.queue.push({ text, priority, eventType });
    this.queue.sort((a, b) => a.priority - b.priority); 

    this.processQueue();
  }

  private async processQueue() {
    if (this.isSpeaking || this.queue.length === 0 || this.isMuted || !this.audioElement) return;

    const nextUtterance = this.queue.shift();
    if (!nextUtterance) return;

    this.isSpeaking = true;
    
    this.onTranscript?.({
      id: `coach_tts_${Date.now()}`,
      role: "coach",
      text: nextUtterance.text,
      timestamp: Date.now(),
    });

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
      const response = await fetch(`${apiUrl}/api/ai-coach/tts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: nextUtterance.text,
          coach_id: this.currentCoachId,
        }),
      });

      if (!response.ok) {
        throw new Error(`TTS API Error: ${response.status}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const blob = new Blob([arrayBuffer], { type: 'audio/mpeg' });
      this.currentObjectUrl = URL.createObjectURL(blob);
      
      this.audioElement.src = this.currentObjectUrl;
      
      // Wait for it to be ready
      await new Promise<void>((resolve, reject) => {
        if (!this.audioElement) return reject(new Error("No audio element"));
        const onCanPlay = () => {
          this.audioElement?.removeEventListener('canplaythrough', onCanPlay);
          resolve();
        };
        this.audioElement.addEventListener('canplaythrough', onCanPlay);
        this.audioElement.addEventListener('error', (e) => reject(e), { once: true });
        
        // Timeout in case it hangs
        setTimeout(() => resolve(), 2000);
      });
      
      await this.audioElement.play();
      
    } catch (err) {
      console.error("[AI COACH] Failed to fetch ElevenLabs TTS:", err);
      this.cleanupCurrentAudio();
      this.isSpeaking = false;
      this.processQueue();
    }
  }

  stopSpeaking() {
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
    }
    this.cleanupCurrentAudio();
    this.isSpeaking = false;
    this.queue = [];
  }

  destroy() {
    this.stopSpeaking();
    if (this.audioElement) {
      this.audioElement.src = "";
      this.audioElement = null;
    }
  }
}
