import {
  useEffect,
  useRef,
  useState,
} from "react";

import { PoseLandmarkerService } from "../features/ai-coach/motion/PoseLandmarkerService";
import { MotionFrameProcessor } from "../features/ai-coach/motion/MotionFrameProcessor";
import { CameraReadinessTracker, type CameraReadinessState } from "../features/ai-coach/motion/CameraReadinessTracker";
import type { PoseTrackingResult, PoseLandmarks } from "../features/ai-coach/types/landmarks";

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

  const [result, setResult] = useState<PoseTrackingResult | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cameraState, setCameraState] = useState<CameraReadinessState>("CAMERA_DISABLED");

  // Keep latest state setter in ref to ensure stable callback identity
  const onCameraStateChangeRef = useRef<(newState: CameraReadinessState) => void>(setCameraState);
  onCameraStateChangeRef.current = setCameraState;

  const readinessTrackerRef = useRef<CameraReadinessTracker | null>(null);
  if (!readinessTrackerRef.current) {
    readinessTrackerRef.current = new CameraReadinessTracker((newState) => {
      onCameraStateChangeRef.current(newState);
    });
  }

  // Update asana-specific required landmarks
  useEffect(() => {
    readinessTrackerRef.current?.setRequiredLandmarks(requiredLandmarks ?? null);
  }, [requiredLandmarks]);

  // 1. MediaPipe Service Lifecycle (Clean up on unmount)
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
    };
  }, []);

  // 2. Camera & Single RAF Loop Control
  useEffect(() => {
    let cancelled = false;

    const stopLoop = () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      isRunningRef.current = false;
      processorRef.current?.reset();
      lastLandmarksRef.current = null;
      lastWorldLandmarksRef.current = null;
      readinessTrackerRef.current?.updateCameraStatus("disabled");
      readinessTrackerRef.current?.updatePoseDetection(null);
      setResult((prev) => (prev === null ? prev : null));
    };

    const loop = (timestamp: number) => {
      if (cancelled || !isRunningRef.current || !isMountedRef.current) {
        return;
      }

      const video = videoRef.current;
      const processor = processorRef.current;

      const shouldUpdateUI = timestamp - lastRenderTimeRef.current >= 33; // ~30fps UI update throttle

      if (video && processor && video.readyState >= 2) {
        try {
          const detection = processor.processFrame(video);

          if (detection && !cancelled) {
            lastLandmarksRef.current = detection.landmarks;
            lastWorldLandmarksRef.current = detection.worldLandmarks;
            readinessTrackerRef.current?.updatePoseDetection(detection.landmarks);
          } else if (!detection && !cancelled) {
            lastLandmarksRef.current = null;
            lastWorldLandmarksRef.current = null;
            readinessTrackerRef.current?.updatePoseDetection(null);
          }

          if (detection && !cancelled && shouldUpdateUI) {
            lastRenderTimeRef.current = timestamp;
            setResult(detection);
          } else if (!detection && !cancelled && shouldUpdateUI) {
            lastRenderTimeRef.current = timestamp;
            setResult((prev) => (prev === null ? prev : null));
          }
        } catch (err) {
          console.error("Pose detection error:", err);
        }
      }

      if (!cancelled && isRunningRef.current && isMountedRef.current && enabled) {
        animationFrameRef.current = requestAnimationFrame(loop);
      }
    };

    const startLoop = () => {
      if (isRunningRef.current || animationFrameRef.current !== null) {
        if (process.env.NODE_ENV !== "production") {
          console.warn("[PoseTracking] DUPLICATE RAF LOOP DETECTED");
        }
        return;
      }
      if (!enabled || cancelled) return;

      isRunningRef.current = true;
      readinessTrackerRef.current?.updateCameraStatus("enabled");
      animationFrameRef.current = requestAnimationFrame(loop);
    };

    const initializeAndStart = async () => {
      if (serviceRef.current) {
        startLoop();
        return;
      }

      if (isInitializingRef.current) return;
      isInitializingRef.current = true;
      readinessTrackerRef.current?.updateCameraStatus("requesting");

      try {
        setError(null);
        const service = new PoseLandmarkerService();
        await service.initialize();

        if (cancelled || !isMountedRef.current) {
          service.close();
          isInitializingRef.current = false;
          return;
        }

        const processor = new MotionFrameProcessor(service);
        serviceRef.current = service;
        processorRef.current = processor;
        isInitializingRef.current = false;
        setIsInitialized(true);

        if (enabled && !cancelled && isMountedRef.current) {
          startLoop();
        }
      } catch (err) {
        isInitializingRef.current = false;
        if (!cancelled && isMountedRef.current) {
          console.error("Failed to initialize MediaPipe:", err);
          setError("Unable to initialize pose detection.");
          readinessTrackerRef.current?.updateCameraStatus("error");
        }
      }
    };

    if (enabled) {
      const video = videoRef.current;
      if (video && video.readyState >= 2) {
        initializeAndStart();
      } else if (video) {
        const onLoaded = () => {
          if (!cancelled && isMountedRef.current && enabled) {
            initializeAndStart();
          }
          video.removeEventListener("loadeddata", onLoaded);
        };
        video.addEventListener("loadeddata", onLoaded);
      } else {
        initializeAndStart();
      }
    } else {
      stopLoop();
    }

    return () => {
      cancelled = true;
      stopLoop();
    };
  }, [enabled]);

  return {
    result,
    isInitialized,
    error,
    cameraState,
  };
}