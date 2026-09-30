import {
  useEffect,
  useRef,
  useState,
} from "react";

import { PoseLandmarkerService } from "../features/ai-coach/motion/PoseLandmarkerService";
import { MotionFrameProcessor } from "../features/ai-coach/motion/MotionFrameProcessor";
import {
  CameraReadinessTracker,
  type CameraReadinessState,
} from "../features/ai-coach/motion/CameraReadinessTracker";
import type {
  PoseTrackingResult,
  PoseLandmarks,
} from "../features/ai-coach/types/landmarks";

export function usePoseTracking(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  enabled: boolean,
  requiredLandmarks?: number[],
) {
  const serviceRef = useRef<PoseLandmarkerService | null>(null);
  const processorRef = useRef<MotionFrameProcessor | null>(null);

  const isInitializingRef = useRef(false);
  const isMountedRef = useRef(true);

  const animationFrameRef = useRef<number | null>(null);
  const isRunningRef = useRef(false);

  const lastLandmarksRef = useRef<PoseLandmarks | null>(null);
  const lastWorldLandmarksRef = useRef<PoseLandmarks | null>(null);

  const lastRenderTimeRef = useRef<number>(0);
  const lastVideoElementRef = useRef<HTMLVideoElement | null>(null);

  const [result, setResult] = useState<PoseTrackingResult | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cameraState, setCameraState] =
    useState<CameraReadinessState>("CAMERA_DISABLED");

  /*
   * Keep the latest React state setter in a ref.
   *
   * CameraReadinessTracker may live for the entire lifetime of this hook,
   * so it must never capture a stale setState reference.
   */
  const onCameraStateChangeRef =
    useRef<(newState: CameraReadinessState) => void>(setCameraState);

  onCameraStateChangeRef.current = setCameraState;

  /*
   * Camera readiness tracker is intentionally created once.
   */
  const readinessTrackerRef =
    useRef<CameraReadinessTracker | null>(null);

  if (!readinessTrackerRef.current) {
    readinessTrackerRef.current = new CameraReadinessTracker(
      (newState) => {
        onCameraStateChangeRef.current(newState);
      },
    );
  }

  /*
   * Update asana-specific required landmarks.
   *
   * NOTE:
   * The caller should preferably pass a stable array.
   * Example:
   *
   * const requiredLandmarks = useMemo(
   *   () => [11, 12, 23, 24],
   *   []
   * );
   *
   * This effect itself does not start/stop the RAF loop.
   */
  useEffect(() => {
    readinessTrackerRef.current?.setRequiredLandmarks(
      requiredLandmarks ?? null,
    );
  }, [requiredLandmarks]);

  /*
   * MediaPipe service lifecycle.
   */
  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;

      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      isRunningRef.current = false;

      processorRef.current?.reset();
      processorRef.current = null;

      serviceRef.current?.close();
      serviceRef.current = null;

      readinessTrackerRef.current?.reset();

      lastLandmarksRef.current = null;
      lastWorldLandmarksRef.current = null;
      lastVideoElementRef.current = null;
      lastRenderTimeRef.current = 0;
    };
  }, []);

  /*
   * Camera + single RAF loop.
   *
   * IMPORTANT:
   * This effect intentionally depends ONLY on `enabled`.
   *
   * Pose `result` updates must NOT recreate this loop.
   */
  useEffect(() => {
    let cancelled = false;

    const clearScheduledFrame = () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };

    const stopLoop = () => {
      cancelled = true;

      clearScheduledFrame();

      isRunningRef.current = false;

      processorRef.current?.reset();

      lastLandmarksRef.current = null;
      lastWorldLandmarksRef.current = null;

      lastVideoElementRef.current = null;
      lastRenderTimeRef.current = 0;

      readinessTrackerRef.current?.updateCameraStatus("disabled");
      readinessTrackerRef.current?.updatePoseDetection(null);

      /*
       * Do not trigger a React render if the result is already null.
       */
      setResult((prev) => {
        if (prev === null) {
          return prev;
        }

        return null;
      });
    };

    const loop = (timestamp: number) => {
      /*
       * Never allow a cancelled/stopped callback to schedule another RAF.
       */
      if (
        cancelled ||
        !isRunningRef.current ||
        !isMountedRef.current
      ) {
        animationFrameRef.current = null;
        return;
      }

      const video = videoRef.current;
      const processor = processorRef.current;

      /*
       * Handle a changed video element.
       */
      if (video && video !== lastVideoElementRef.current) {
        lastVideoElementRef.current = video;

        processor?.reset();

        lastLandmarksRef.current = null;
        lastWorldLandmarksRef.current = null;

        readinessTrackerRef.current?.updatePoseDetection(null);

        /*
         * Only clear result if necessary.
         */
        setResult((prev) => {
          if (prev === null) {
            return prev;
          }

          return null;
        });
      }

      /*
       * Throttle React/UI updates to approximately 30 FPS.
       *
       * Pose processing itself can continue at RAF frequency.
       */
      const shouldUpdateUI =
        timestamp - lastRenderTimeRef.current >= 33;

      if (
        video &&
        processor &&
        video.readyState >= 2
      ) {
        try {
          const detection = processor.processFrame(video);

          /*
           * Update internal tracking refs on every valid frame.
           *
           * These refs do NOT trigger React renders.
           */
          if (detection && !cancelled) {
            lastLandmarksRef.current = detection.landmarks;
            lastWorldLandmarksRef.current =
              detection.worldLandmarks;

            readinessTrackerRef.current?.updatePoseDetection(
              detection.landmarks,
            );
          } else if (!detection && !cancelled) {
            lastLandmarksRef.current = null;
            lastWorldLandmarksRef.current = null;

            readinessTrackerRef.current?.updatePoseDetection(
              null,
            );
          }

          /*
           * Only update React state at the UI throttle rate.
           */
          if (
            detection &&
            !cancelled &&
            shouldUpdateUI
          ) {
            lastRenderTimeRef.current = timestamp;

            setResult(detection);
          } else if (
            !detection &&
            !cancelled &&
            shouldUpdateUI
          ) {
            lastRenderTimeRef.current = timestamp;

            setResult((prev) => {
              if (prev === null) {
                return prev;
              }

              return null;
            });
          }
        } catch (err) {
          /*
           * Do not terminate the RAF loop because of a single
           * pose-processing exception.
           */
          console.error(
            "Pose detection error:",
            err,
          );
        }
      } else if (shouldUpdateUI) {
        lastRenderTimeRef.current = timestamp;

        setResult((prev) => {
          if (prev === null) {
            return prev;
          }

          return null;
        });
      }

      /*
       * Schedule EXACTLY ONE next frame.
       *
       * Check every lifecycle condition again before scheduling.
       */
      if (
        !cancelled &&
        isRunningRef.current &&
        isMountedRef.current &&
        enabled
      ) {
        animationFrameRef.current =
          requestAnimationFrame(loop);
      } else {
        animationFrameRef.current = null;
      }
    };

    const startLoop = () => {
      /*
       * Prevent duplicate RAF loops.
       */
      if (
        isRunningRef.current ||
        animationFrameRef.current !== null
      ) {
        if (process.env.NODE_ENV !== "production") {
          console.warn(
            "[PoseTracking] DUPLICATE RAF LOOP DETECTED",
          );
        }

        return;
      }

      if (!enabled || cancelled) {
        return;
      }

      /*
       * Reset timing whenever a new loop starts.
       */
      lastRenderTimeRef.current = 0;

      isRunningRef.current = true;

      readinessTrackerRef.current?.updateCameraStatus(
        "enabled",
      );

      animationFrameRef.current =
        requestAnimationFrame(loop);
    };

    const initializeAndStart = async () => {
      /*
       * MediaPipe already initialized.
       * Only start the existing loop.
       */
      if (serviceRef.current) {
        startLoop();
        return;
      }

      /*
       * Prevent duplicate initialization.
       */
      if (isInitializingRef.current) {
        return;
      }

      isInitializingRef.current = true;

      readinessTrackerRef.current?.updateCameraStatus(
        "requesting",
      );

      try {
        setError(null);

        const service = new PoseLandmarkerService();

        await service.initialize();

        /*
         * Component/effect may have been cleaned up
         * while MediaPipe was initializing.
         */
        if (
          cancelled ||
          !isMountedRef.current
        ) {
          service.close();

          isInitializingRef.current = false;

          return;
        }

        const processor =
          new MotionFrameProcessor(service);

        serviceRef.current = service;
        processorRef.current = processor;

        isInitializingRef.current = false;

        setIsInitialized(true);

        if (
          enabled &&
          !cancelled &&
          isMountedRef.current
        ) {
          startLoop();
        }
      } catch (err) {
        isInitializingRef.current = false;

        if (
          !cancelled &&
          isMountedRef.current
        ) {
          console.error(
            "Failed to initialize MediaPipe:",
            err,
          );

          setError(
            "Unable to initialize pose detection.",
          );

          readinessTrackerRef.current?.updateCameraStatus(
            "error",
          );
        }
      }
    };

    /*
     * Start tracking when enabled.
     */
    if (enabled) {
      const video = videoRef.current;

      if (
        video &&
        video.readyState >= 2
      ) {
        initializeAndStart();
      } else if (video) {
        const onLoaded = () => {
          if (
            !cancelled &&
            isMountedRef.current &&
            enabled
          ) {
            initializeAndStart();
          }

          video.removeEventListener(
            "loadeddata",
            onLoaded,
          );
        };

        video.addEventListener(
          "loadeddata",
          onLoaded,
        );
      } else {
        initializeAndStart();
      }
    } else {
      /*
       * Disable tracking.
       */
      stopLoop();
    }

    /*
     * Cleanup for this enabled-state lifecycle.
     */
    return () => {
      cancelled = true;

      clearScheduledFrame();

      isRunningRef.current = false;

      processorRef.current?.reset();

      lastLandmarksRef.current = null;
      lastWorldLandmarksRef.current = null;

      lastVideoElementRef.current = null;
      lastRenderTimeRef.current = 0;

      readinessTrackerRef.current?.updatePoseDetection(
        null,
      );
    };
  }, [enabled]);

  return {
    result,
    isInitialized,
    error,
    cameraState,
  };
}