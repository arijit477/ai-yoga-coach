import type { CoachingEvent, VoiceTranscriptItem } from "./voice.types";

interface QueuedUtterance {
  text: string;
  priority: number; 
  eventType?: string;
}

type SpeakingStateCallback = (isSpeaking: boolean) => void;

export class CoachTTSAgent {
  private isMuted: boolean = false;
  private queue: QueuedUtterance[] = [];
  private isSpeaking: boolean = false;
  private currentCoachId: string = "alice";
  private onTranscript?: (item: VoiceTranscriptItem) => void;
  private onSpeakingChange?: SpeakingStateCallback;
  private audioElement: HTMLAudioElement | null = null;
  private currentObjectUrl: string | null = null;

  constructor(
    onTranscript?: (item: VoiceTranscriptItem) => void,
    onSpeakingChange?: SpeakingStateCallback
  ) {
    this.onTranscript = onTranscript;
    this.onSpeakingChange = onSpeakingChange;
    if (typeof window !== "undefined") {
      this.audioElement = new Audio();
      this.audioElement.volume = 1.0;
      this.audioElement.onended = () => {
        this.cleanupCurrentAudio();
        this.setSpeaking(false);
        this.processQueue();
      };
      this.audioElement.onerror = (e) => {
        console.warn("[AI COACH] TTS audio playback error:", e);
        this.cleanupCurrentAudio();
        this.setSpeaking(false);
        this.processQueue();
      };
    }
  }

  unlockAudio() {
    if (this.audioElement) {
      // Synchronously play/pause on a user gesture to unblock autoplay
      this.audioElement.play().catch(() => {});
      this.audioElement.pause();
    }
  }

  private setSpeaking(value: boolean) {
    this.isSpeaking = value;
    this.onSpeakingChange?.(value);
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
    // Always prefer the natural language feedback from the event builder first.
    // Fallbacks are minimal and only used if the event has no feedback set.
    let spokenText = event.feedback ?? "";

    if (!spokenText) {
      switch (event.type) {
        case "pose_started":
          spokenText = `Let's begin ${event.asanaName}.`;
          break;
        case "calibration_complete":
          spokenText = `Great, let's begin ${event.asanaName}.`;
          break;
        case "good_form":
          spokenText = "Good form. Hold this position.";
          break;
        case "pose_held":
          spokenText = "Posture aligned. Hold steady and breathe.";
          break;
        case "pose_completed":
          spokenText = `Great job completing ${event.asanaName}!`;
          break;
        case "user_out_of_frame":
          spokenText = "I can't see you. Step back into the frame so we can continue.";
          break;
        case "partial_body":
          spokenText = "I can only see part of your body. Take a small step back.";
          break;
        case "camera_unavailable":
          spokenText = "Please enable your camera so I can guide you.";
          break;
        case "camera_ready":
          spokenText = "Welcome back! I can see you clearly now.";
          break;
        default:
          break;
      }
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

  stopSpeaking() {
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.removeAttribute('src');
      this.audioElement.load();
    }
    this.cleanupCurrentAudio();
    this.setSpeaking(false);
    this.queue = [];
  }

  destroy() {
    this.stopSpeaking();
    if (this.audioElement) {
      this.audioElement = null;
    }
  }

  private async processQueue() {
    if (this.isSpeaking || this.queue.length === 0 || this.isMuted || !this.audioElement) return;

    const nextUtterance = this.queue.shift();
    if (!nextUtterance) return;

    this.setSpeaking(true);
    
    this.onTranscript?.({
      id: `coach_tts_${Date.now()}`,
      role: "coach",
      text: nextUtterance.text,
      timestamp: Date.now(),
    });

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
      const url = new URL(`${apiUrl}/api/ai-coach/tts`);
      url.searchParams.set("text", nextUtterance.text);
      url.searchParams.set("coach_id", this.currentCoachId);
      
      this.cleanupCurrentAudio();

      // Fetch audio as blob so playback is not blocked by streaming autoplay restrictions
      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error(`TTS HTTP ${response.status}: ${response.statusText}`);
      }

      const blob = await response.blob();

      // Guard: check if stopSpeaking() was called while we were fetching
      if (!this.isSpeaking || !this.audioElement) return;

      const objectUrl = URL.createObjectURL(blob);
      this.currentObjectUrl = objectUrl;
      this.audioElement.src = objectUrl;

      await this.audioElement.play();

    } catch (err: any) {
      if (err?.name === "AbortError") {
        // Interrupted intentionally — do nothing
        return;
      }
      console.error("[AI COACH] Failed to stream TTS:", err);
      this.cleanupCurrentAudio();
      this.setSpeaking(false);
      this.processQueue();
    }
  }
}
