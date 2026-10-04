import React, { useEffect, useState } from "react";

interface CameraViewProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  enabled?: boolean;
}

let sharedStream: MediaStream | null = null;
let streamUsers = 0;
let cleanupTimeout: ReturnType<typeof setTimeout> | null = null;

export const CameraView = React.memo(function CameraView({ videoRef, enabled = true }: CameraViewProps) {
  const [cameraReady, setCameraReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setCameraReady(false);
      return;
    }

    const videoEl = videoRef.current;
    let cancelled = false;

    streamUsers++;
    if (cleanupTimeout) {
      clearTimeout(cleanupTimeout);
      cleanupTimeout = null;
    }

    const startCamera = async () => {
      try {
        if (!navigator.mediaDevices?.getUserMedia) {
          throw new Error("Camera access is not supported by this browser.");
        }

        // Seamlessly reuse the global stream if it's already running
        if (sharedStream) {
          if (videoRef.current) {
            videoRef.current.srcObject = sharedStream;
            await videoRef.current.play().catch(e => console.warn("Play interrupted", e));
          }
          if (!cancelled) {
            setCameraReady(true);
            setError(null);
          }
          return;
        }

        const isMobile = typeof window !== 'undefined' && 
          (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
          window.innerWidth < 768);

        const newStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user",
            width: {
              ideal: isMobile ? 640 : 1280,
            },
            height: {
              ideal: isMobile ? 480 : 720,
            },
          },
          audio: false,
        });

        if (cancelled) {
          newStream.getTracks().forEach((track) => track.stop());
          return;
        }

        sharedStream = newStream;

        if (!videoRef.current) {
          throw new Error("Video element not available.");
        }

        videoRef.current.srcObject = sharedStream;
        await videoRef.current.play();

        if (!cancelled) {
          setCameraReady(true);
          setError(null);
        }
      } catch (err) {
        console.error("Camera error:", err);
        if (!cancelled) {
          setCameraReady(false);
          setError(err instanceof Error ? err.message : "Failed to access camera.");
        }
      }
    };

    startCamera();

    return () => {
      cancelled = true;
      streamUsers--;

      if (streamUsers === 0) {
        // Give a short grace period before killing the camera hardware, 
        // allowing another component (like Cinema Mode) to mount and claim it.
        cleanupTimeout = setTimeout(() => {
          if (streamUsers === 0 && sharedStream) {
            sharedStream.getTracks().forEach((track) => track.stop());
            sharedStream = null;
          }
        }, 500); 
      }

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
    </div>
  );
});