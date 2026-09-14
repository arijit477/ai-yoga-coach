import type { VoiceState } from "../voice/voice.types";

interface VoiceControlsProps {
  voiceState: VoiceState;
  isSessionActive: boolean;
  onToggleMute: () => void;
  onRetry: () => void;
  className?: string;
}

export function VoiceControls({
  voiceState,
  isSessionActive,
  onToggleMute,
  onRetry,
  className = "",
}: VoiceControlsProps) {
  const isSpeaking = voiceState.status === "speaking";
  const isListening = voiceState.status === "listening";
  const isError = voiceState.status === "error";

  return (
    <div className={`flex items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/60 p-3 ${className}`}>
      <div className="flex items-center gap-2">
        <span
          className={`h-2.5 w-2.5 rounded-full ${
            isSpeaking
              ? "bg-emerald-600 animate-pulse"
              : isListening
              ? "bg-teal-500 animate-ping"
              : isError
              ? "bg-amber-500"
              : isSessionActive
              ? "bg-emerald-500"
              : "bg-slate-400"
          }`}
        />
        <div>
          <p className="text-xs font-semibold text-slate-800">
            Voice Coach:{" "}
            <span className="font-normal text-slate-600">
              {isSpeaking
                ? "Speaking"
                : isListening
                ? "Listening"
                : isError
                ? "Voice unavailable"
                : isSessionActive
                ? "Connected"
                : "Standby"}
            </span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {isError && (
          <button
            type="button"
            onClick={onRetry}
            className="rounded-lg bg-amber-50 border border-amber-200 px-2.5 py-1 text-xs font-semibold text-amber-800 hover:bg-amber-100 transition"
          >
            Retry
          </button>
        )}

        {isSessionActive && (
          <button
            type="button"
            onClick={onToggleMute}
            className={`rounded-lg px-2.5 py-1 text-xs font-semibold border transition ${
              voiceState.isMuted
                ? "bg-amber-50 border-amber-300 text-amber-800"
                : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            {voiceState.isMuted ? "Unmute" : "Mute"}
          </button>
        )}
      </div>
    </div>
  );
}
