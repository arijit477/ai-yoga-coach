export class AudioPlaybackManager {
  private audioContext: AudioContext | null = null;
  private nextPlayTime: number = 0;
  private mediaStreamDestination: MediaStreamAudioDestinationNode | null = null;

  constructor() {
    // We defer creating the AudioContext until the first play to avoid autoplay policy issues
  }

  private initAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({
        sampleRate: 16000,
      });
      this.mediaStreamDestination = this.audioContext.createMediaStreamDestination();
      this.nextPlayTime = this.audioContext.currentTime;
    } else if (this.audioContext.state === "suspended") {
      this.audioContext.resume();
    }
  }

  /**
   * Retrieves the media stream destination for avatar lipsyncing.
   */
  public getMediaStream(): MediaStream | null {
    if (!this.mediaStreamDestination) {
      this.initAudioContext();
    }
    return this.mediaStreamDestination?.stream || null;
  }

  /**
   * Queues a base64 encoded PCM 16000Hz 16-bit mono audio chunk.
   */
  public queueBase64PCM(base64: string) {
    this.initAudioContext();
    if (!this.audioContext) return;

    try {
      // Decode base64
      const binaryString = window.atob(base64);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // Convert 16-bit PCM to Float32
      const pcm16 = new Int16Array(bytes.buffer);
      const float32 = new Float32Array(pcm16.length);
      for (let i = 0; i < pcm16.length; i++) {
        // Normalize 16-bit signed integer to -1.0 .. 1.0
        float32[i] = pcm16[i] / 32768.0;
      }

      // Create an AudioBuffer
      const audioBuffer = this.audioContext.createBuffer(
        1, // Mono
        float32.length,
        16000 // Sample rate from ElevenLabs
      );
      audioBuffer.copyToChannel(float32, 0);

      // Create buffer source
      const source = this.audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(this.audioContext.destination);
      
      // Also connect to mediaStreamDestination for lipsync
      if (this.mediaStreamDestination) {
        source.connect(this.mediaStreamDestination);
      }

      // Schedule playback
      const currentTime = this.audioContext.currentTime;
      if (this.nextPlayTime < currentTime) {
        this.nextPlayTime = currentTime;
      }

      source.start(this.nextPlayTime);
      this.nextPlayTime += audioBuffer.duration;
    } catch (err) {
      console.error("[AudioPlaybackManager] Error queuing chunk:", err);
    }
  }

  /**
   * Immediately stops playback and clears the queue.
   */
  public stop() {
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
      this.mediaStreamDestination = null;
      this.nextPlayTime = 0;
    }
  }

  public dispose() {
    this.stop();
  }
}
