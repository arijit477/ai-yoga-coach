import type { CoachId, AvatarState } from "./avatar.types";

export class AvatarController {
  private videoElement: HTMLVideoElement | null = null;
  private currentState: AvatarState = "idle";
  private currentCoach: CoachId = "alice";
  private isSwitchingCoach: boolean = false;

  attach(videoElement: HTMLVideoElement) {
    this.videoElement = videoElement;
  }

  detach() {
    this.videoElement = null;
  }

  setState(state: AvatarState) {
    if (this.currentState === state) return;
    this.currentState = state;

    // Only play if video element exists and is paused
    if (this.videoElement && this.videoElement.paused) {
      this.play();
    }
  }

  getState(): AvatarState {
    return this.currentState;
  }

  setCoach(coach: CoachId) {
    this.currentCoach = coach;
  }

  getCoach(): CoachId {
    return this.currentCoach;
  }

  /**
   * Plays video only if paused, guarding against redundant play calls
   */
  async play() {
    if (!this.videoElement || this.isSwitchingCoach) return;
    if (!this.videoElement.paused && !this.videoElement.ended) return;

    try {
      await this.videoElement.play();
    } catch (err) {
      // AbortError is normal when autoplay policy or rapid pause happens
      if ((err as Error).name !== "AbortError") {
        console.warn("[AI Coach] AvatarController play error:", err);
      }
    }
  }

  pause() {
    if (!this.videoElement) return;
    this.videoElement.pause();
  }

  /**
   * Clean transition when switching coach (Alice <-> Kevin)
   */
  async switchCoach(newCoach: CoachId, newSrc: string): Promise<void> {
    if (!this.videoElement) {
      this.currentCoach = newCoach;
      return;
    }

    this.isSwitchingCoach = true;
    this.currentCoach = newCoach;

    try {
      this.videoElement.pause();
      this.videoElement.src = newSrc;
      this.videoElement.load();

      await new Promise<void>((resolve) => {
        if (!this.videoElement) return resolve();
        const onCanPlay = () => {
          this.videoElement?.removeEventListener("canplay", onCanPlay);
          resolve();
        };
        this.videoElement.addEventListener("canplay", onCanPlay, { once: true });
        // Safety timeout in case canplay takes too long or fails
        setTimeout(resolve, 1500);
      });

      this.isSwitchingCoach = false;
      await this.play();
    } catch (err) {
      console.warn("[AI Coach] Failed to switch coach asset:", err);
      this.isSwitchingCoach = false;
    }
  }

  reset() {
    if (!this.videoElement) return;
    this.videoElement.pause();
    this.videoElement.currentTime = 0;
  }

  setMuted(muted: boolean) {
    if (!this.videoElement) return;
    this.videoElement.muted = muted;
  }

  setVolume(volume: number) {
    if (!this.videoElement) return;
    this.videoElement.volume = Math.max(0, Math.min(1, volume));
  }

  isPlaying(): boolean {
    if (!this.videoElement) return false;
    return !this.videoElement.paused && !this.videoElement.ended;
  }
}


