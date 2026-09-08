import {
  FilesetResolver,
  PoseLandmarker,
} from "@mediapipe/tasks-vision";

export class PoseLandmarkerService {
  private poseLandmarker: PoseLandmarker | null = null;

  async initialize(): Promise<void> {
    if (this.poseLandmarker) {
      return;
    }

    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );

    this.poseLandmarker =
      await PoseLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: "/models/pose_landmarker_lite.task",
        },

        runningMode: "VIDEO",

        numPoses: 1,

        minPoseDetectionConfidence: 0.5,

        minPosePresenceConfidence: 0.5,

        minTrackingConfidence: 0.5,
      });
  }

  get instance(): PoseLandmarker {
    if (!this.poseLandmarker) {
      throw new Error(
        "PoseLandmarker has not been initialized."
      );
    }

    return this.poseLandmarker;
  }

  close(): void {
    this.poseLandmarker?.close();
    this.poseLandmarker = null;
  }
}