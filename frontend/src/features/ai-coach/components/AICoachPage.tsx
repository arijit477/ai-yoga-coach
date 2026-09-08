import { useRef, useState, useEffect } from "react";
import { CameraView } from "./CameraView";
import { PoseSkeleton } from "./PoseSkeleton";
import { usePoseTracking } from "../../../hooks/usePoseTracking";
import { AngleDebugPanel } from "./AngleDebugPanel";

export function AICoachPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const { result, isInitialized, error } = usePoseTracking(videoRef);

  const [videoSize, setVideoSize] = useState({
    width: 1280,
    height: 720,
  });

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const updateVideoSize = () => {
      if (video.videoWidth > 0 && video.videoHeight > 0) {
        setVideoSize({
          width: video.videoWidth,
          height: video.videoHeight,
        });
      }
    };

    updateVideoSize();

    video.addEventListener("loadedmetadata", updateVideoSize);

    return () => {
      video.removeEventListener("loadedmetadata", updateVideoSize);
    };
  }, []);

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">AI Personal Yoga Coach</h1>

          <p className="mt-2">Real-time posture and form analysis</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Camera */}
          <div className="lg:col-span-2">
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-black">
              <CameraView videoRef={videoRef} />

              {/* Skeleton */}
              {result && (
                <PoseSkeleton
                  landmarks={result.landmarks}
                  videoWidth={videoSize.width}
                  videoHeight={videoSize.height}
                />
              )}

              {/* Status */}
              <div className="absolute left-4 top-4 rounded-lg bg-black/70 px-4 py-2 text-sm text-white">
                {!isInitialized && !error && (
                  <span className="text-yellow-400">
                    Initializing pose detection...
                  </span>
                )}

                {isInitialized && !result && (
                  <span className="text-blue-400">
                    Looking for your body...
                  </span>
                )}

                {result && (
                  <span className="text-green-400">Pose detected ✓</span>
                )}

                {error && <span className="text-red-400">{error}</span>}
              </div>
            </div>
          </div>

          {/* Coach Panel */}
          <div>
            <div className="rounded-2xl p-6">
              <h2 className="text-xl font-semibold">AI Coach</h2>

              <p className="mt-3">Position your full body inside the camera.</p>
              <AngleDebugPanel landmarks={result?.worldLandmarks ?? null} />

              <div className="mt-6 space-y-3">
                <div className="rounded-lg bg-gray-100 p-3">
                  <p className="text-sm text-gray-500">Pose Tracker</p>

                  <p className="font-medium">
                    {isInitialized ? "Ready" : "Initializing"}
                  </p>
                </div>

                <div className="rounded-lg bg-gray-100 p-3">
                  <p className="text-sm text-gray-500">Body Detection</p>

                  <p className="font-medium">
                    {result ? "Detected" : "Searching..."}
                  </p>
                </div>

                {result && (
                  <div className="rounded-lg bg-gray-100 p-3">
                    <p className="text-sm text-gray-500">Landmarks</p>

                    <p className="font-medium">
                      {result.landmarks.length} / 33
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
