import { useState, useRef } from "react";
import { Play, Square, Circle } from "lucide-react";

interface SessionControlsProps {
  isSessionActive: boolean;
  onStartSession: () => void;
  onStopSession: () => void;
  isCameraActive: boolean;
  onStartCamera: () => void;
  onStopCamera: () => void;
  videoRef?: React.RefObject<HTMLVideoElement | null>;
  isMirrored: boolean;
  onToggleMirror: () => void;
  showSkeleton: boolean;
  onToggleSkeleton: () => void;
  showVoice: boolean;
  onToggleVoice: () => void;
  coachName: string;
  className?: string;
}

export function SessionControls({
  isSessionActive,
  onStartSession,
  onStopSession,
  isCameraActive,
  onStartCamera,
  onStopCamera,
  videoRef,
  isMirrored,
  onToggleMirror,
  showSkeleton,
  onToggleSkeleton,
  showVoice,
  onToggleVoice,
  coachName,
  className = "",
}: SessionControlsProps) {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  const handleStartRecording = () => {
    try {
      const videoEl = videoRef?.current;
      const stream = videoEl?.srcObject as MediaStream | null;
      if (!stream) {
        alert("Please start the camera first before recording.");
        return;
      }

      recordedChunksRef.current = [];
      const recorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
          ? "video/webm;codecs=vp9"
          : "video/webm",
      });

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      recorder.start(500);
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
    } catch (err) {
      console.error("Recording error:", err);
    }
  };

  const handleStopAndSave = () => {
    const recorder = mediaRecorderRef.current;
    if (!recorder || recorder.state === "inactive") {
      setIsRecording(false);
      return;
    }

    recorder.onstop = () => {
      const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `yoga-session-${new Date().toISOString().slice(0, 19).replace(/:/g, "-")}.webm`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      recordedChunksRef.current = [];
      setIsRecording(false);
    };

    recorder.stop();
  };

  return (
    <div className={`flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm ${className}`}>
      {/* 4 Primary Action Buttons Matching UI Design */}
      <div className="flex flex-wrap items-center gap-2.5">
        {/* 1. Start camera */}
        <button
          type="button"
          onClick={onStartCamera}
          disabled={isCameraActive}
          className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition shadow-sm active:scale-95 cursor-pointer ${
            isCameraActive
              ? "bg-emerald-600/60 text-white cursor-default opacity-85"
              : "bg-[#48bb78] hover:bg-[#38a169] text-white"
          }`}
        >
          <Play size={13} className="fill-white" />
          <span>Start camera</span>
        </button>

        {/* 2. Stop camera */}
        <button
          type="button"
          onClick={onStopCamera}
          disabled={!isCameraActive}
          className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition shadow-sm active:scale-95 cursor-pointer ${
            !isCameraActive
              ? "bg-slate-300 text-slate-500 cursor-not-allowed"
              : "bg-[#9498a4] hover:bg-[#7e828e] text-white"
          }`}
        >
          <span>- Stop camera</span>
        </button>

        {/* 3. Record */}
        <button
          type="button"
          onClick={handleStartRecording}
          disabled={!isCameraActive || isRecording}
          className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition shadow-sm active:scale-95 cursor-pointer ${
            !isCameraActive || isRecording
              ? "bg-[#e8b5ab]/60 text-white/80 cursor-not-allowed"
              : "bg-[#e29d91] hover:bg-[#d58c80] text-white"
          }`}
        >
          <Circle
            size={11}
            className={`fill-white ${isRecording ? "animate-pulse fill-red-600 text-red-600" : ""}`}
          />
          <span>{isRecording ? "Recording..." : "● Record"}</span>
        </button>

        {/* 4. Stop & save */}
        <button
          type="button"
          onClick={handleStopAndSave}
          disabled={!isRecording}
          className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition shadow-sm active:scale-95 cursor-pointer ${
            !isRecording
              ? "bg-[#d4a59a]/50 text-white/70 cursor-not-allowed"
              : "bg-[#cb8e81] hover:bg-[#bd7e71] text-white"
          }`}
        >
          <span>▼ Stop &amp; save</span>
        </button>

        {/* Optional Practice Start/End Badge Button */}
        <div className="ml-auto flex items-center gap-2">
          {!isSessionActive ? (
            <button
              type="button"
              onClick={onStartSession}
              className="flex items-center gap-1.5 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white px-3.5 py-1.5 text-xs font-bold transition shadow-xs cursor-pointer active:scale-95"
            >
              <span>Practice with {coachName}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onStopSession}
              className="flex items-center gap-1.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white px-3.5 py-1.5 text-xs font-bold transition shadow-xs cursor-pointer active:scale-95"
            >
              <Square size={11} className="fill-white" />
              <span>End Routine</span>
            </button>
          )}
        </div>
      </div>

      {/* Secondary Controls Bar: Mirror, Skeleton, Voice Coach */}
      <div className="flex items-center justify-between border-t border-slate-100 pt-2 text-xs font-medium text-slate-600">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-1.5 cursor-pointer hover:text-slate-900 select-none">
            <input
              type="checkbox"
              checked={isMirrored}
              onChange={onToggleMirror}
              className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500/20"
            />
            <span>Mirror</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer hover:text-slate-900 select-none">
            <input
              type="checkbox"
              checked={showSkeleton}
              onChange={onToggleSkeleton}
              className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500/20"
            />
            <span>Skeleton</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer hover:text-slate-900 select-none">
            <input
              type="checkbox"
              checked={showVoice}
              onChange={onToggleVoice}
              className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500/20"
            />
            <span>Voice cues</span>
          </label>
        </div>

        <span className="text-[11px] text-slate-400 font-medium">
          {isCameraActive ? "Camera active" : "Camera standby"}
        </span>
      </div>
    </div>
  );
}

