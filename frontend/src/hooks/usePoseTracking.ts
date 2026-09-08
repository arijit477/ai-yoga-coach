import { useCallback, useEffect, useRef, useState } from 'react';
import { PoseLandmarkerService } from '../features/ai-coach/motion/PoseLandmarkerService';
import type { PoseTrackingResult } from '../features/ai-coach/types/landmarks';

export function usePoseTracking(
  videoRef: React.RefObject<HTMLVideoElement | null>
) {
  const serviceRef = useRef<PoseLandmarkerService | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const [result, setResult] = useState<PoseTrackingResult | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processFrame = useCallback(() => {
    const video = videoRef.current;
    const service = serviceRef.current;

    if (
      !video ||
      !service ||
      video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA
    ) {
      animationFrameRef.current =
        requestAnimationFrame(processFrame);

      return;
    }

    try {
      const timestamp = performance.now();

      const detection = service.instance.detectForVideo(
        video,
        timestamp
      );

      if (detection.landmarks.length > 0) {
        const landmarks = detection.landmarks[0];
        const worldLandmarks =
          detection.worldLandmarks?.[0] ?? [];

        setResult({
          landmarks,
          worldLandmarks,
          timestamp,
          confidence: 1,
        });
      }
    } catch (err) {
      console.error('Pose detection error:', err);
    }

    animationFrameRef.current =
      requestAnimationFrame(processFrame);
  }, [videoRef]);

  useEffect(() => {
    let cancelled = false;

    const initialize = async () => {
      try {
        setError(null);

        const service = new PoseLandmarkerService();

        await service.initialize();

        if (cancelled) {
          service.close();
          return;
        }

        serviceRef.current = service;
        setIsInitialized(true);
      } catch (err) {
        console.error(
          'Failed to initialize MediaPipe:',
          err
        );

        setError(
          'Unable to initialize pose detection.'
        );
      }
    };

    initialize();

    return () => {
      cancelled = true;

      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(
          animationFrameRef.current
        );
      }

      serviceRef.current?.close();
      serviceRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!isInitialized) {
      return;
    }

    animationFrameRef.current =
      requestAnimationFrame(processFrame);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(
          animationFrameRef.current
        );
      }
    };
  }, [isInitialized, processFrame]);

  return {
    result,
    isInitialized,
    error,
  };
}