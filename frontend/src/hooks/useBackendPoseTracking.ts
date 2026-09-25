import { useEffect, useRef, useState } from "react";
import type { PoseTrackingResult } from "../features/ai-coach/types/landmarks";
import { CameraReadinessTracker, type CameraReadinessState } from "../features/ai-coach/motion/CameraReadinessTracker";
import type { PoseEvaluationResult } from "../features/ai-coach/types/pose-rules";
import type { PostureCheckResult } from "../features/ai-coach/types/posture-check";

export function useBackendPoseTracking(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  enabled: boolean,
  asanaId: string
) {
  const wsRef = useRef<WebSocket | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const isRunningRef = useRef(false);
  const lastRenderTimeRef = useRef<number>(0);
  
  const [result, setResult] = useState<PoseTrackingResult | null>(null);
  const [evaluation, setEvaluation] = useState<PoseEvaluationResult | null>(null);
  const [posture, setPosture] = useState<PostureCheckResult | null>(null);
  
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cameraState, setCameraState] = useState<CameraReadinessState>("CAMERA_DISABLED");
  
  const onCameraStateChangeRef = useRef<(newState: CameraReadinessState) => void>(setCameraState);
  onCameraStateChangeRef.current = setCameraState;

  const readinessTrackerRef = useRef<CameraReadinessTracker | null>(null);
  
  if (!readinessTrackerRef.current) {
    readinessTrackerRef.current = new CameraReadinessTracker((newState) => {
      onCameraStateChangeRef.current(newState);
    });
  }

  useEffect(() => {
    let cancelled = false;

    const connectWebSocket = () => {
      const wsUrl = "ws://localhost:8000/api/ai-coach/video/stream";
      const ws = new WebSocket(wsUrl);
      readinessTrackerRef.current?.updateCameraStatus("requesting");
      
      ws.onopen = () => {
        setIsInitialized(true);
        setError(null);
        readinessTrackerRef.current?.updateCameraStatus("enabled");
        if (!cancelled && enabled && !isRunningRef.current) {
          isRunningRef.current = true;
          animationFrameRef.current = requestAnimationFrame(sendFrame);
        }
      };
      
      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.error) {
            console.error("Backend error:", data.error);
            return;
          }
          
          if (data.landmarks && data.landmarks.length > 0) {
            setResult({
              landmarks: data.landmarks,
              worldLandmarks: (data.worldLandmarks && data.worldLandmarks.length >= 33)
                ? data.worldLandmarks
                : data.landmarks,
              timestamp: Date.now(),
              confidence: 0.9
            });
            readinessTrackerRef.current?.updatePoseDetection(data.landmarks);
          } else {
            setResult(null);
            readinessTrackerRef.current?.updatePoseDetection(null);
          }
          
          if (data.evaluation) {
            const rawEval = data.evaluation;
            const issues = Array.isArray(rawEval.issues) ? rawEval.issues : [];
            const primaryIssue = rawEval.primaryIssue !== undefined 
              ? rawEval.primaryIssue 
              : (issues.length > 0 ? issues[0] : null);
            const secondaryIssues = Array.isArray(rawEval.secondaryIssues)
              ? rawEval.secondaryIssues
              : (issues.length > 1 ? issues.slice(1) : []);

            setEvaluation({
              asanaId: rawEval.asanaId || asanaId,
              score: rawEval.score ?? 0,
              rawScore: rawEval.rawScore ?? rawEval.score ?? 0,
              stableScore: rawEval.stableScore ?? rawEval.score ?? 0,
              displayedScore: rawEval.displayedScore ?? rawEval.score ?? 0,
              isValid: rawEval.isValid ?? true,
              issues,
              primaryIssue,
              secondaryIssues,
              resolvedIssues: rawEval.resolvedIssues ?? [],
              scoreTrend: rawEval.scoreTrend ?? "stable",
              stability: rawEval.stability ?? 100,
              holdProgress: rawEval.holdProgress ?? 0,
              completionEligible: rawEval.completionEligible ?? false,
              activeRules: rawEval.activeRules ?? 0,
              evaluatedAt: rawEval.evaluatedAt ?? Date.now(),
            } as PoseEvaluationResult);
          }
          if (data.posture) {
            setPosture({ items: data.posture, hasData: data.posture.length > 0 });
          }
          
        } catch (err) {
          console.error("Failed to parse websocket message", err);
        }
      };
      
      ws.onerror = (e) => {
        console.error("WebSocket error:", e);
        setError("WebSocket connection failed.");
      };
      
      ws.onclose = () => {
        setIsInitialized(false);
      };
      
      wsRef.current = ws;
    };

    const sendFrame = (timestamp: number) => {
      if (cancelled || !isRunningRef.current) return;
      
      const video = videoRef.current;
      const ws = wsRef.current;
      
      // Send at ~15fps to not overwhelm backend
      if (video && video.readyState >= 2 && ws && ws.readyState === WebSocket.OPEN) {
        if (timestamp - lastRenderTimeRef.current >= 66) {
          if (!canvasRef.current) {
            canvasRef.current = document.createElement("canvas");
          }
          const canvas = canvasRef.current;
          canvas.width = 640; 
          canvas.height = 480; 
          
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            // Convert to JPEG base64 for lighter transport
            const base64Data = canvas.toDataURL("image/jpeg", 0.6);
            
            ws.send(JSON.stringify({
              frame: base64Data,
              asanaId: asanaId
            }));
            
            lastRenderTimeRef.current = timestamp;
          }
        }
      }
      
      if (!cancelled && isRunningRef.current && enabled) {
        animationFrameRef.current = requestAnimationFrame(sendFrame);
      }
    };

    if (enabled && !wsRef.current) {
      connectWebSocket();
    } else if (!enabled && wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
      isRunningRef.current = false;
      readinessTrackerRef.current?.updateCameraStatus("disabled");
      readinessTrackerRef.current?.updatePoseDetection(null);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    }

    return () => {
      cancelled = true;
      isRunningRef.current = false;
      readinessTrackerRef.current?.updateCameraStatus("disabled");
      readinessTrackerRef.current?.updatePoseDetection(null);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
      setIsInitialized(false);
    };
  }, [enabled, asanaId]);

  return {
    result,
    isInitialized,
    error,
    cameraState,
    evaluation,
    posture
  };
}
