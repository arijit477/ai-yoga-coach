import {
  useEffect,
  useRef,
  useState,
} from "react";

import { PoseLandmarkerService } from "../features/ai-coach/motion/PoseLandmarkerService";

import { MotionFrameProcessor } from "../features/ai-coach/motion/MotionFrameProcessor";

import type { PoseTrackingResult } from "../features/ai-coach/types/landmarks";

export function usePoseTracking(
  videoRef: React.RefObject<HTMLVideoElement | null>,
) {
  const serviceRef = useRef<PoseLandmarkerService | null>(null);
  const processorRef = useRef<MotionFrameProcessor | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const isRunningRef = useRef(false);

  const [result, setResult] = useState<PoseTrackingResult | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loop = () => {
      if (cancelled || !isRunningRef.current) {
        return;
      }

      const video = videoRef.current;
      const processor = processorRef.current;

      if (video && processor) {
        try {
          const detection = processor.processFrame(video);
          if (detection && !cancelled) {
            setResult(detection);
          }
        } catch (err) {
          console.error("Pose detection error:", err);
        }
      }

      if (!cancelled && isRunningRef.current) {
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
        if (!isRunningRef.current && !cancelled) {
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

    initialize();

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
  }, []); // Run ONCE on mount, teardown on unmount

  return {
    result,
    isInitialized,
    error,
  };
}