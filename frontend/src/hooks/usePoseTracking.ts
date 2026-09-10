import {
  useCallback,
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
  const serviceRef =
    useRef<PoseLandmarkerService | null>(null);

  const processorRef =
    useRef<MotionFrameProcessor | null>(null);

  const animationFrameRef =
    useRef<number | null>(null);

  const [result, setResult] =
    useState<PoseTrackingResult | null>(null);

  const [isInitialized, setIsInitialized] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const processFrame = useCallback(() => {
    const video = videoRef.current;
    const processor = processorRef.current;

    if (!video || !processor) {
      animationFrameRef.current =
        requestAnimationFrame(processFrame);

      return;
    }

    try {
      const detection =
        processor.processFrame(video);

      if (detection) {
        setResult(detection);
      }
    } catch (err) {
      console.error(
        "Pose detection error:",
        err,
      );
    }

    animationFrameRef.current =
      requestAnimationFrame(processFrame);
  }, [videoRef]);

  useEffect(() => {
    let cancelled = false;

    const initialize = async () => {
      try {
        setError(null);

        const service =
          new PoseLandmarkerService();

        await service.initialize();

        if (cancelled) {
          service.close();
          return;
        }

        const processor =
          new MotionFrameProcessor(service);

        serviceRef.current = service;
        processorRef.current = processor;

        setIsInitialized(true);
      } catch (err) {
        console.error(
          "Failed to initialize MediaPipe:",
          err,
        );

        setError(
          "Unable to initialize pose detection.",
        );
      }
    };

    initialize();

    return () => {
      cancelled = true;

      if (
        animationFrameRef.current !== null
      ) {
        cancelAnimationFrame(
          animationFrameRef.current,
        );
      }

      processorRef.current?.reset();

      processorRef.current = null;

      serviceRef.current?.close();

      serviceRef.current = null;

      setIsInitialized(false);
    };
  }, []);

  useEffect(() => {
    if (!isInitialized) {
      return;
    }

    animationFrameRef.current =
      requestAnimationFrame(processFrame);

    return () => {
      if (
        animationFrameRef.current !== null
      ) {
        cancelAnimationFrame(
          animationFrameRef.current,
        );

        animationFrameRef.current = null;
      }
    };
  }, [
    isInitialized,
    processFrame,
  ]);

  return {
    result,
    isInitialized,
    error,
  };
}