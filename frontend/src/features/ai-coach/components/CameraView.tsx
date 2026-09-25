import React, { useEffect, useState } from "react";

interface CameraViewProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  enabled?: boolean;
  score?: number | null;
}

export const CameraView = React.memo(function CameraView({ videoRef, enabled = true, score }: CameraViewProps) {
  const [cameraReady, setCameraReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setCameraReady(false);
      return;
    }

    const videoEl = videoRef.current;
    let stream: MediaStream | null = null;
    let cancelled = false;

    const startCamera = async () => {
      try {
        if (!navigator.mediaDevices?.getUserMedia) {
          throw new Error("Camera access is not supported by this browser.");
        }

        // Avoid requesting if we already have a stream
        if (videoRef.current && videoRef.current.srcObject) {
          stream = videoRef.current.srcObject as MediaStream;
          setCameraReady(true);
          return;
        }

        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user",
            width: {
              ideal: 1280,
            },
            height: {
              ideal: 720,
            },
          },
          audio: false,
        });

        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        if (!videoRef.current) {
          throw new Error("Video element not available.");
        }

        videoRef.current.srcObject = stream;

        await videoRef.current.play();

        if (!cancelled) {
          setCameraReady(true);
          setError(null);
        }
      } catch (err) {
        console.error("Camera error:", err);

        if (!cancelled) {
          setCameraReady(false);
          setError(
            err instanceof Error ? err.message : "Failed to access camera.",
          );
        }
      }
    };

    startCamera();

    return () => {
      cancelled = true;

      stream?.getTracks().forEach((track) => {
        track.stop();
      });

      if (videoEl) {
        videoEl.srcObject = null;
      }
    };
  }, [videoRef, enabled]);

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-[#0e131f]">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="h-full w-full object-contain scale-x-[-1]"
      />

      {/* Standby state when camera is explicitly turned off */}
      {!enabled && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0e131f] text-white select-none">
          <p className="text-sm font-medium text-slate-400">
            Press &ldquo;Start camera&rdquo; to begin
          </p>
        </div>
      )}

      {/* Camera loading when enabled - No buffer UI per user request */}
      {enabled && !cameraReady && !error && (
        <div className="absolute inset-0 bg-[#0e131f]" />
      )}

      {/* Camera error */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/90 p-6 text-center">
          <div className="max-w-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-400/10 text-red-400">
              !
            </div>

            <p className="mt-4 text-sm font-medium text-white">
              Camera unavailable
            </p>

            <p className="mt-2 text-sm leading-5 text-white/50">
              {error}
            </p>
          </div>
        </div>
      )}

      {/* Camera ready indicator */}
      {cameraReady && !error && (
        <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />

          <span className="text-xs font-medium text-white/80">
            Camera Live
          </span>
        </div>
      )}
      
      {/* Accuracy Circular Progress Bar */}
      {cameraReady && !error && score !== undefined && score !== null && (
        <div className="absolute top-4 right-4 pointer-events-none drop-shadow-md">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-full bg-slate-900/40 backdrop-blur-sm p-1">
            <svg viewBox="0 0 36 36" className="absolute top-0 left-0 w-full h-full -rotate-90">
              <path
                className="text-white/20"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                className={`transition-all duration-300 ease-out ${
                  score >= 85 ? "text-emerald-400" : score >= 60 ? "text-amber-400" : "text-rose-400"
                }`}
                strokeDasharray={`${score}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
            <div className="flex flex-col items-center justify-center z-10 text-white leading-none">
              <span className="text-sm sm:text-lg font-bold tracking-tight">{Math.round(score)}%</span>
              <span className="text-[8px] sm:text-[10px] font-semibold tracking-widest uppercase opacity-80 mt-0.5">Acc</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});