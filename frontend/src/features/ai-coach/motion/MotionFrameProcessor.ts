import type { PoseTrackingResult } from "../types/landmarks";

import { PoseLandmarkerService } from "./PoseLandmarkerService";
import { LandmarkSmoother } from "./LandmarkSmoother";

import {
  getLandmarkStatus,
  evaluatePoseValidity,
} from "../analysis/LandmarkUtils";

import { extractPoseFeatures } from "../analysis/PoseFeatureEngine";

const EXPECTED_LANDMARK_COUNT = 33;

const TRACKED_LANDMARKS: Record<number, string> = {
  0: "Nose",

  11: "Left Shoulder",
  12: "Right Shoulder",

  13: "Left Elbow",
  14: "Right Elbow",

  15: "Left Wrist",
  16: "Right Wrist",

  23: "Left Hip",
  24: "Right Hip",

  25: "Left Knee",
  26: "Right Knee",

  27: "Left Ankle",
  28: "Right Ankle",
};

interface PreviousLandmark {
  x: number;
  y: number;
  z: number;
}

export interface RawLandmarkDiagnostic {
  name: string;
  samples: number;

  averageDeltaX: number;
  averageDeltaY: number;
  averageDeltaZ: number;

  averageMovement: number;
  maxMovement: number;

  averageVisibility: number;
  averagePresence: number;
}

export interface ProcessFrameTimings {
  mediaPipeMs: number;
  featuresMs: number;
}

export interface MotionFrameProcessorStats {
  processedFrames: number;
  skippedFrames: number;
  invalidFrames: number;

  processingFps: number;

  lastProcessingMs: number;
  lastVideoTime: number;

  rawAverageMovement: number;
  rawMaximumMovement: number;
}

export class MotionFrameProcessor {
  private readonly poseLandmarkerService: PoseLandmarkerService;

  private readonly smoother =
    new LandmarkSmoother();

  private readonly worldSmoother =
    new LandmarkSmoother();

  /*
   * ============================================
   * VIDEO FRAME TRACKING
   * ============================================
   */

  private lastVideoTime = -1;

  /*
   * ============================================
   * PERFORMANCE
   * ============================================
   */

  private processedFrames = 0;

  private skippedFrames = 0;

  private invalidFrames = 0;

  private fpsFrameCount = 0;

  private fpsStartTime =
    performance.now();

  private processingFps = 0;

  /*
   * ============================================
   * TIMINGS
   * ============================================
   */

  private lastTimings: ProcessFrameTimings = {
    mediaPipeMs: 0,
    featuresMs: 0,
  };

  /*
   * ============================================
   * RAW LANDMARK DIAGNOSTICS
   * ============================================
   */

  private previousRawLandmarks =
    new Map<number, PreviousLandmark>();

  private rawDiagnostics =
    new Map<number, RawLandmarkDiagnostic>();

  constructor(
    poseLandmarkerService: PoseLandmarkerService,
  ) {
    this.poseLandmarkerService =
      poseLandmarkerService;
  }

  /*
   * ============================================
   * MAIN FRAME PROCESSOR
   * ============================================
   */

  processFrame(
    video: HTMLVideoElement,
  ): PoseTrackingResult | null {
    /*
     * --------------------------------------------
     * 1. Check video readiness
     * --------------------------------------------
     */

    if (
      video.readyState <
      HTMLMediaElement.HAVE_CURRENT_DATA
    ) {
      return null;
    }

    if (
      video.videoWidth <= 0 ||
      video.videoHeight <= 0
    ) {
      return null;
    }

    /*
     * --------------------------------------------
     * 2. Get actual camera frame time
     * --------------------------------------------
     *
     * video.currentTime is in seconds.
     */

    const videoTime =
      video.currentTime;

    if (
      !Number.isFinite(videoTime)
    ) {
      this.invalidFrames++;

      return null;
    }

    /*
     * --------------------------------------------
     * 3. Skip duplicate camera frames
     * --------------------------------------------
     *
     * requestAnimationFrame can run faster than
     * the actual camera FPS.
     */

    if (
      videoTime <= this.lastVideoTime
    ) {
      this.skippedFrames++;

      return null;
    }

    this.lastVideoTime =
      videoTime;

    /*
     * MediaPipe VIDEO mode expects
     * monotonically increasing milliseconds.
     */

    const timestamp = performance.now();

    /*
     * --------------------------------------------
     * 4. MediaPipe detection
     * --------------------------------------------
     */

    const mediaPipeStart =
      performance.now();

    let result;

    try {
      result =
        this.poseLandmarkerService.instance
          .detectForVideo(
            video,
            timestamp,
          );
    } catch (error) {
      this.invalidFrames++;

      console.error(
        "[MotionFrameProcessor] MediaPipe detection failed:",
        error,
      );

      return null;
    }

    const mediaPipeMs =
      performance.now() -
      mediaPipeStart;

    /*
     * --------------------------------------------
     * 5. Validate MediaPipe result
     * --------------------------------------------
     */

    if (
      !result.landmarks ||
      result.landmarks.length === 0
    ) {
      this.invalidFrames++;

      this.lastTimings = {
        mediaPipeMs,
        featuresMs: 0,
      };

      return null;
    }

    const rawLandmarks =
      result.landmarks[0];

    if (
      !rawLandmarks ||
      rawLandmarks.length !==
        EXPECTED_LANDMARK_COUNT
    ) {
      this.invalidFrames++;

      this.lastTimings = {
        mediaPipeMs,
        featuresMs: 0,
      };

      return null;
    }

    /*
     * ============================================
     * STEP 1B
     *
     * IMPORTANT:
     *
     * Diagnostics happen BEFORE smoothing.
     *
     * This tells us whether MediaPipe itself
     * is producing unstable landmarks.
     * ============================================
     */

    this.updateRawDiagnostics(
      rawLandmarks,
    );

    /*
     * --------------------------------------------
     * 6. Smooth image landmarks
     * --------------------------------------------
     */

    const landmarks =
      this.smoother.smooth(
        rawLandmarks,
      );

    /*
     * --------------------------------------------
     * 7. Smooth world landmarks
     * --------------------------------------------
     */

    const rawWorldLandmarks =
      result.worldLandmarks?.[0] ?? [];

    const worldLandmarks =
      rawWorldLandmarks.length ===
      EXPECTED_LANDMARK_COUNT
        ? this.worldSmoother.smooth(
            rawWorldLandmarks,
          )
        : [];

    /*
     * --------------------------------------------
     * 8. Calculate tracking confidence
     * --------------------------------------------
     */

    const confidence =
      this.calculateConfidence(
        landmarks,
      );

    /*
     * --------------------------------------------
     * 9. Evaluate landmark validity
     * --------------------------------------------
     */

    const validity =
      evaluatePoseValidity(
        landmarks,
      );

    /*
     * --------------------------------------------
     * 10. Landmark status
     * --------------------------------------------
     */

    const landmarkStatuses =
      landmarks.map(
        (landmark) =>
          getLandmarkStatus(
            landmark,
          ),
      );

    /*
     * --------------------------------------------
     * 11. Extract pose features
     * --------------------------------------------
     */

    const featuresStart =
      performance.now();

    const features =
      extractPoseFeatures({
        landmarks,
        worldLandmarks,
        timestamp,
        validity,
        confidence,
      });

    const featuresMs =
      performance.now() -
      featuresStart;

    /*
     * --------------------------------------------
     * 12. Save timings
     * --------------------------------------------
     */

    this.lastTimings = {
      mediaPipeMs,
      featuresMs,
    };

    /*
     * --------------------------------------------
     * 13. Update statistics
     * --------------------------------------------
     */

    this.processedFrames++;

    this.updateProcessingFps();

    /*
     * --------------------------------------------
     * 14. Return existing result
     * --------------------------------------------
     */

    return {
      landmarks,
      worldLandmarks,
      timestamp,
      confidence,
      validity,
      landmarkStatuses,
      features,
    };
  }

  /*
   * ============================================
   * RAW LANDMARK DIAGNOSTICS
   * ============================================
   */

  private updateRawDiagnostics(
    landmarks: any[],
  ): void {
    for (
      const [indexString, name] of
        Object.entries(
          TRACKED_LANDMARKS,
        )
    ) {
      const index =
        Number(indexString);

      const landmark =
        landmarks[index];

      if (!landmark) {
        continue;
      }

      const x =
        Number(landmark.x);

      const y =
        Number(landmark.y);

      const z =
        Number(landmark.z);

      if (
        !Number.isFinite(x) ||
        !Number.isFinite(y) ||
        !Number.isFinite(z)
      ) {
        continue;
      }

      /*
       * First frame:
       *
       * We cannot calculate movement yet.
       */

      const previous =
        this.previousRawLandmarks.get(
          index,
        );

      if (!previous) {
        this.previousRawLandmarks.set(
          index,
          {
            x,
            y,
            z,
          },
        );

        this.rawDiagnostics.set(
          index,
          {
            name,
            samples: 0,

            averageDeltaX: 0,
            averageDeltaY: 0,
            averageDeltaZ: 0,

            averageMovement: 0,
            maxMovement: 0,

            averageVisibility:
              landmark.visibility ?? 0,

            averagePresence:
              landmark.presence ?? 0,
          },
        );

        continue;
      }

      /*
       * ------------------------------------------
       * Frame-to-frame movement
       * ------------------------------------------
       */

      const deltaX =
        Math.abs(
          x - previous.x,
        );

      const deltaY =
        Math.abs(
          y - previous.y,
        );

      const deltaZ =
        Math.abs(
          z - previous.z,
        );

      const movement =
        Math.sqrt(
          deltaX * deltaX +
          deltaY * deltaY +
          deltaZ * deltaZ,
        );

      /*
       * ------------------------------------------
       * Get existing statistics
       * ------------------------------------------
       */

      const stats =
        this.rawDiagnostics.get(
          index,
        );

      if (!stats) {
        continue;
      }

      const samples =
        stats.samples + 1;

      /*
       * ------------------------------------------
       * Running averages
       * ------------------------------------------
       */

      stats.averageDeltaX =
        this.runningAverage(
          stats.averageDeltaX,
          deltaX,
          samples,
        );

      stats.averageDeltaY =
        this.runningAverage(
          stats.averageDeltaY,
          deltaY,
          samples,
        );

      stats.averageDeltaZ =
        this.runningAverage(
          stats.averageDeltaZ,
          deltaZ,
          samples,
        );

      stats.averageMovement =
        this.runningAverage(
          stats.averageMovement,
          movement,
          samples,
        );

      /*
       * Maximum raw movement.
       */

      stats.maxMovement =
        Math.max(
          stats.maxMovement,
          movement,
        );

      /*
       * ------------------------------------------
       * Confidence diagnostics
       * ------------------------------------------
       */

      const visibility =
        Number.isFinite(
          landmark.visibility,
        )
          ? landmark.visibility
          : 0;

      const presence =
        Number.isFinite(
          landmark.presence,
        )
          ? landmark.presence
          : 0;

      stats.averageVisibility =
        this.runningAverage(
          stats.averageVisibility,
          visibility,
          samples,
        );

      stats.averagePresence =
        this.runningAverage(
          stats.averagePresence,
          presence,
          samples,
        );

      stats.samples =
        samples;

      /*
       * Save current landmark for next frame.
       */

      this.previousRawLandmarks.set(
        index,
        {
          x,
          y,
          z,
        },
      );
    }
  }

  /*
   * ============================================
   * RUNNING AVERAGE
   * ============================================
   */

  private runningAverage(
    current: number,
    value: number,
    count: number,
  ): number {
    return (
      current +
      (value - current) / count
    );
  }

  /*
   * ============================================
   * GET RAW DIAGNOSTICS
   * ============================================
   */

  getRawLandmarkDiagnostics():
    RawLandmarkDiagnostic[] {
    return Array.from(
      this.rawDiagnostics.values(),
    );
  }

  getRawAverageMovement(): number {
    const values =
      this.getRawLandmarkDiagnostics();

    if (values.length === 0) {
      return 0;
    }

    return (
      values.reduce(
        (sum, item) =>
          sum +
          item.averageMovement,
        0,
      ) / values.length
    );
  }

  getRawMaximumMovement(): number {
    const values =
      this.getRawLandmarkDiagnostics();

    if (values.length === 0) {
      return 0;
    }

    return Math.max(
      ...values.map(
        (item) =>
          item.maxMovement,
      ),
    );
  }

  /*
   * ============================================
   * PROCESSING FPS
   * ============================================
   */

  private updateProcessingFps(): void {
    this.fpsFrameCount++;

    const now =
      performance.now();

    const elapsed =
      now -
      this.fpsStartTime;

    if (elapsed >= 1000) {
      this.processingFps =
        (this.fpsFrameCount /
          elapsed) *
        1000;

      this.fpsFrameCount = 0;

      this.fpsStartTime =
        now;
    }
  }

  /*
   * ============================================
   * CONFIDENCE
   * ============================================
   *
   * IMPORTANT:
   *
   * This is tracking confidence.
   * It is NOT asana accuracy.
   */

  private calculateConfidence(
    landmarks:
      PoseTrackingResult["landmarks"],
  ): number {
    if (
      !landmarks ||
      landmarks.length === 0
    ) {
      return 0;
    }

    let totalVisibility = 0;

    let validCount = 0;

    for (
      const landmark of landmarks
    ) {
      const visibility =
        landmark.visibility ?? 0;

      if (
        Number.isFinite(
          visibility,
        )
      ) {
        totalVisibility +=
          Math.max(
            0,
            Math.min(
              1,
              visibility,
            ),
          );

        validCount++;
      }
    }

    if (validCount === 0) {
      return 0;
    }

    return (
      totalVisibility /
      validCount
    );
  }

  /*
   * ============================================
   * TIMINGS
   * ============================================
   */

  getLastTimings():
    ProcessFrameTimings {
    return this.lastTimings;
  }

  /*
   * ============================================
   * DEBUG STATISTICS
   * ============================================
   */

  getStats():
    MotionFrameProcessorStats {
    return {
      processedFrames:
        this.processedFrames,

      skippedFrames:
        this.skippedFrames,

      invalidFrames:
        this.invalidFrames,

      processingFps:
        this.processingFps,

      lastProcessingMs:
        this.lastTimings.mediaPipeMs +
        this.lastTimings.featuresMs,

      lastVideoTime:
        this.lastVideoTime,

      rawAverageMovement:
        this.getRawAverageMovement(),

      rawMaximumMovement:
        this.getRawMaximumMovement(),
    };
  }

  /*
   * ============================================
   * RESET
   * ============================================
   */

  reset(): void {
    /*
     * Video timestamp.
     */
    this.lastVideoTime = -1;

    /*
     * Smoothers.
     */
    this.smoother.reset();

    this.worldSmoother.reset();

    /*
     * Raw diagnostics.
     */
    this.previousRawLandmarks.clear();

    this.rawDiagnostics.clear();

    /*
     * Performance counters.
     */
    this.processedFrames = 0;

    this.skippedFrames = 0;

    this.invalidFrames = 0;

    this.fpsFrameCount = 0;

    this.fpsStartTime =
      performance.now();

    this.processingFps = 0;

    /*
     * Timings.
     */
    this.lastTimings = {
      mediaPipeMs: 0,
      featuresMs: 0,
    };
  }
}