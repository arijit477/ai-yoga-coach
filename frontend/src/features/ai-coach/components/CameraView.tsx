import { useEffect, useState } from "react";

interface CameraViewProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
}

export function CameraView({
  videoRef,
}: CameraViewProps) {
  const [cameraReady, setCameraReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user",
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        });

        if (!videoRef.current) {
          throw new Error("Video element not available.");
        }

        videoRef.current.srcObject = stream;

        await videoRef.current.play();

        setCameraReady(true);
      } catch (err) {
        console.error("Camera error:", err);

        setError(
          "Unable to access your camera. Please allow camera permission."
        );
      }
    };

    startCamera();

    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, [videoRef]);

  return (
    <div className="relative w-full aspect-video overflow-hidden rounded-2xl">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="h-full w-full object-contain"
      />

      {!cameraReady && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
          Starting camera...
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 p-6 text-center text-white">
          {error}
        </div>
      )}
    </div>
  );
}