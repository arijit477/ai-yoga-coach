export interface VoiceProvider {
  /**
   * Initializes the provider (e.g., setting up WebSockets).
   */
  initialize(coachId: string): Promise<void>;

  /**
   * Streams a text chunk for speech synthesis.
   */
  streamText(text: string): void;

  /**
   * Instantly stops any ongoing audio playback and clears buffers.
   */
  stop(): void;

  /**
   * Cleans up all resources.
   */
  dispose(): void;
}
