export class AvatarController {
  private videoElement: HTMLVideoElement | null = null;

  attach(videoElement: HTMLVideoElement) {
    this.videoElement = videoElement;
  }

  detach() {
    this.videoElement = null;
  }

  async play() {
    if (!this.videoElement) return;
    try {
      await this.videoElement.play();
    } catch (err) {
      console.warn("AvatarController failed to play video:", err);
    }
  }

  pause() {
    if (!this.videoElement) return;
    this.videoElement.pause();
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
