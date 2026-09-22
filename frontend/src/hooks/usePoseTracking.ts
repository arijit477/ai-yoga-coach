import {
  useEffect,
  useRef,
  useState,
} from "react";

import { PoseLandmarkerService } from "../features/ai-coach/motion/PoseLandmarkerService";

import { MotionFrameProcessor } from "../features/ai-coach/motion/MotionFrameProcessor";
import { CameraReadinessTracker, type CameraReadinessState } from "../features/ai-coach/motion/CameraReadinessTracker";

import type { PoseTrackingResult, PoseLandmarks } from "../features/ai-coach/types/landmarks";

const EMA_ALPHA = 0.3; // Smoothing factor (0 = no update, 1 = no smoothing)

function smoothLandmarks(current: PoseLandmarks, previous: PoseLandmarks | null): PoseLandmarks {
  if (!previous) return current;
  
  return current.map((curr, idx) => {
    const prev = previous[idx];
    if (!prev || curr.visibility === undefined || curr.visibility < 0.2) {
      return curr; // Don't smooth low-visibility landmarks or if no previous
    }
    
    return {
      ...curr,
      x: prev.x + EMA_ALPHA * (curr.x - prev.x),
      y: prev.y + EMA_ALPHA * (curr.y - prev.y),
      z: prev.z !== undefined && prev.z !== undefined ? prev.z + EMA_ALPHA * ((curr.z ?? 0) - prev.z) : curr.z,
    };
  });
}

export function usePoseTracking(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  enabled: boolean,
) {
  const serviceRef = useRef<PoseLandmarkerService | null>(null);
  const processorRef = useRef<MotionFrameProcessor | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const isRunningRef = useRef(false);
  const lastLandmarksRef = useRef<PoseLandmarks | null>(null);
  const lastWorldLandmarksRef = useRef<PoseLandmarks | null>(null);
  const lastRenderTimeRef = useRef<number>(0);

  const [result, setResult] = useState<PoseTrackingResult | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cameraState, setCameraState] = useState<CameraReadinessState>("CAMERA_DISABLED");
  
  const readinessTrackerRef = useRef<CameraReadinessTracker | null>(null);
  
  // Initialize the tracker once
  if (!readinessTrackerRef.current) {
    readinessTrackerRef.current = new CameraReadinessTracker((newState) => {
      setCameraState(newState);
    });
  }

  useEffect(() => {
    let cancelled = false;

    const loop = (timestamp: number) => {
      if (cancelled || !isRunningRef.current) {
        return;
      }

      const video = videoRef.current;
      const processor = processorRef.current;

      // Throttle UI updates slightly to prevent React render loops, but process every frame
      const shouldUpdateUI = timestamp - lastRenderTimeRef.current >= 30; // ~30fps max UI update

      if (video && processor && video.readyState >= 2) { // HAVE_CURRENT_DATA
        // Update hardware state inside the loop
        readinessTrackerRef.current?.updateCameraStatus(enabled ? "enabled" : "disabled");
        
        try {
          const detection = processor.processFrame(video);
          if (detection && !cancelled) {
            // Apply EMA Smoothing
            const smoothedLandmarks = smoothLandmarks(detection.landmarks, lastLandmarksRef.current);
            const smoothedWorldLandmarks = smoothLandmarks(detection.worldLandmarks, lastWorldLandmarksRef.current);
            
            lastLandmarksRef.current = smoothedLandmarks;
            lastWorldLandmarksRef.current = smoothedWorldLandmarks;
            
            readinessTrackerRef.current?.updatePoseDetection(smoothedLandmarks);

            if (shouldUpdateUI) {
              lastRenderTimeRef.current = timestamp;
              setResult({
                ...detection,
                landmarks: smoothedLandmarks,
                worldLandmarks: smoothedWorldLandmarks,
              });
            }
          } else if (!detection && !cancelled) {
            // Clear result if no pose detected so hasPose becomes false
            lastLandmarksRef.current = null;
            lastWorldLandmarksRef.current = null;
            readinessTrackerRef.current?.updatePoseDetection(null);
            
            if (shouldUpdateUI) {
              lastRenderTimeRef.current = timestamp;
              setResult(null);
            }
          }
        } catch (err) {
          console.error("Pose detection error:", err);
        }
      }

      if (!cancelled && isRunningRef.current && enabled) {
        animationFrameRef.current = requestAnimationFrame(loop);
      }
    };

    const initialize = async () => {
      try {
        setError(null);

        const service = new PoseLandmarkerService();
        await service.initialize();

        if (cancelled) {
          service.close();
          return;
        }

        const processor = new MotionFrameProcessor(service);

        serviceRef.current = service;
        processorRef.current = processor;

        setIsInitialized(true);

        // Start the single RAF processing loop
        if (!isRunningRef.current && !cancelled && enabled) {
          isRunningRef.current = true;
          animationFrameRef.current = requestAnimationFrame(loop);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Failed to initialize MediaPipe:", err);
          setError("Unable to initialize pose detection.");
        }
      }
    };

    if (enabled && !isInitialized) {
       readinessTrackerRef.current?.updateCameraStatus("requesting");
    }

    if (enabled && !serviceRef.current && !isInitialized) {
      // Lazy load only when video is ready to prevent blocking
      const video = videoRef.current;
      if (video && video.readyState >= 2) {
        initialize();
      } else if (video) {
        const onLoaded = () => {
          if (!isInitialized && !serviceRef.current) initialize();
          video.removeEventListener("loadeddata", onLoaded);
        };
        video.addEventListener("loadeddata", onLoaded);
      } else {
         initialize();
      }
    } else if (enabled && isInitialized && !isRunningRef.current) {
      isRunningRef.current = true;
      animationFrameRef.current = requestAnimationFrame(loop);
    } else if (!enabled && isRunningRef.current) {
      isRunningRef.current = false;
      readinessTrackerRef.current?.updateCameraStatus("disabled");
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    }

    return () => {
      cancelled = true;
      isRunningRef.current = false;

      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      processorRef.current?.reset();
      processorRef.current = null;

      serviceRef.current?.close();
      serviceRef.current = null;

      setIsInitialized(false);
      setResult(null);
    };
  }, [enabled]); // Only re-run when enabled state changes

  return {
    result,
    isInitialized,
    error,
    cameraState,
  };
}