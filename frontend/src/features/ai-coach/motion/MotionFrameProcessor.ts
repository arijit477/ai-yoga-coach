import type { PoseTrackingResult } from "../types/landmarks";

import { PoseLandmarkerService } from "./PoseLandmarkerService";
import { LandmarkSmoother } from "./LandmarkSmoother";

export class MotionFrameProcessor {
  private readonly poseLandmarkerService: PoseLandmarkerService;

  private readonly smoother = new LandmarkSmoother();

  private readonly worldSmoother =
    new LandmarkSmoother();

  private lastTimestamp = -1;

  constructor(
    poseLandmarkerService: PoseLandmarkerService,
  ) {
    this.poseLandmarkerService =
      poseLandmarkerService;
  }

  processFrame(
    video: HTMLVideoElement,
  ): PoseTrackingResult | null {
    /*
     * Video must contain usable frame data.
     */
    if (
      video.readyState <
      HTMLMediaElement.HAVE_CURRENT_DATA
    ) {
      return null;
    }

    /*
     * MediaPipe cannot process a video
     * that has not received valid dimensions.
     */
    if (
      video.videoWidth === 0 ||
      video.videoHeight === 0
    ) {
      return null;
    }

    /*
     * MediaPipe VIDEO mode requires monotonically
     * increasing timestamps.
     */
    const timestamp = performance.now();

    if (timestamp <= this.lastTimestamp) {
      return null;
    }

    this.lastTimestamp = timestamp;

    /*
     * Run MediaPipe pose detection.
     */
    const result =
      this.poseLandmarkerService.instance
        .detectForVideo(
          video,
          timestamp,
        );

    /*
     * No pose detected.
     */
    if (
      !result.landmarks ||
      result.landmarks.length === 0
    ) {
      return null;
    }

    const rawLandmarks =
      result.landmarks[0];

    if (
      !rawLandmarks ||
      rawLandmarks.length < 33
    ) {
      return null;
    }

    /*
     * Smooth image-space landmarks.
     *
     * Used for:
     * - skeleton rendering
     * - image-space alignment
     * - visual analysis
     */
    const landmarks =
      this.smoother.smooth(
        rawLandmarks,
      );

    /*
     * World landmarks are required for:
     * - joint angles
     * - 3D distances
     * - body-relative measurements
     */
    const rawWorldLandmarks =
      result.worldLandmarks?.[0] ?? [];

    const worldLandmarks =
      rawWorldLandmarks.length >= 33
        ? this.worldSmoother.smooth(
            rawWorldLandmarks,
          )
        : [];

    /*
     * Calculate overall pose confidence.
     */
    const confidence =
      this.calculateConfidence(
        landmarks,
      );

    /*
     * Return a normalized application-level
     * pose tracking result.
     */
    return {
      landmarks,
      worldLandmarks,
      timestamp,
      confidence,
    };
  }

  /**
   * Reset temporal state.
   *
   * Called when:
   * - camera stops
   * - tracking restarts
   * - user changes pose/session
   */
  reset(): void {
    this.lastTimestamp = -1;

    this.smoother.reset();

    this.worldSmoother.reset();
  }

  /**
   * Calculate average landmark visibility.
   *
   * Returns a value between 0 and 1.
   */
  private calculateConfidence(
    landmarks: PoseTrackingResult["landmarks"],
  ): number {
    if (
      !landmarks ||
      landmarks.length === 0
    ) {
      return 0;
    }

    let totalVisibility = 0;
    let validCount = 0;

    for (const landmark of landmarks) {
      const visibility =
        landmark.visibility ?? 0;

      if (
        Number.isFinite(visibility)
      ) {
        totalVisibility += Math.max(
          0,
          Math.min(1, visibility),
        );

        validCount++;
      }
    }

    if (validCount === 0) {
      return 0;
    }

    return totalVisibility / validCount;
  }
}