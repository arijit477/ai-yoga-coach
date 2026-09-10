export class CameraService {
  private stream: MediaStream | null = null;

  async start(
    video: HTMLVideoElement,
  ): Promise<MediaStream> {
    if (this.stream) {
      return this.stream;
    }

    if (!navigator.mediaDevices?.getUserMedia) {
      throw new Error(
        "Camera access is not supported by this browser.",
      );
    }

    const stream =
      await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: {
            ideal: 1280,
          },
          height: {
            ideal: 720,
          },
          frameRate: {
            ideal: 30,
            max: 30,
          },
        },
        audio: false,
      });

    this.stream = stream;

    video.srcObject = stream;

    await video.play();

    return stream;
  }

  stop(): void {
    if (!this.stream) {
      return;
    }

    for (const track of this.stream.getTracks()) {
      track.stop();
    }

    this.stream = null;
  }

  get isRunning(): boolean {
    return this.stream !== null;
  }
}