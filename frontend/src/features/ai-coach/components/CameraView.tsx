import { useEffect, useState } from "react";

interface CameraViewProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  enabled?: boolean;
}

export function CameraView({ videoRef, enabled = true }: CameraViewProps) {
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

      {/* Camera loading when enabled */}
      {enabled && !cameraReady && !error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0e131f] text-white">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-400/20 border-t-emerald-400" />

          <p className="mt-4 text-sm text-slate-300">
            Starting camera...
          </p>
        </div>
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
}