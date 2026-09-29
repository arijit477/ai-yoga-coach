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

    // Detect if device is mobile or has a small screen
    const isMobile = typeof window !== 'undefined' && 
      (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
      window.innerWidth < 768);

    // Use lite model for mobile devices, full model for desktop
    const modelAssetPath = isMobile
      ? "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task"
      : "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_full/float16/1/pose_landmarker_full.task";

    this.poseLandmarker =
      await PoseLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath,
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