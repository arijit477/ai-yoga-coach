import React from "react";
import {
  Volume2,
  VolumeX,
  Radio,
} from "lucide-react";
import type { VoiceState } from "../voice/voice.types";

interface VoiceControlsProps {
  voiceState: VoiceState;
  isSessionActive?: boolean;
  coachName?: string;
  onToggleMute?: () => void;
  className?: string;
}

/**
 * Dedicated Voice Guidance Control Bar:
 * Provides clean, intuitive toggle for:
 * [Mute Coach / Unmute Coach]
 */
export const VoiceControls = React.memo(function VoiceControls({
  voiceState,
  coachName = "Alice",
  onToggleMute,
  className = "",
}: VoiceControlsProps) {
  const isSpeaking = voiceState.status === "speaking";
  const isError = voiceState.status === "error";
  const isMuted = voiceState.isMuted || voiceState.status === "muted";
  const isConversationMode = voiceState.isConversationMode;
  const isConnected =
    voiceState.status === "connected" ||
    voiceState.status === "muted" ||
    isSpeaking ||
    isConversationMode ||
    isMuted;
  const isConnecting =
    voiceState.status === "connecting" ||
    voiceState.status === "requesting_permission";

  // Status indicator styling & text
  let statusBadge = {
    text: "Standby",
    dotClass: "bg-slate-400",
    bgClass: "bg-slate-100 text-slate-700 border-slate-200",
    message: `Voice guidance will activate when you click Practice with ${coachName}.`,
  };

  if (isError) {
    statusBadge = {
      text: "Connection Error",
      dotClass: "bg-red-500",
      bgClass: "bg-red-50 text-red-800 border-red-200",
      message: voiceState.error || "Unable to connect voice. Click Retry.",
    };
  } else if (isConnecting) {
    statusBadge = {
      text: "Connecting...",
      dotClass: "bg-amber-500 animate-ping",
      bgClass: "bg-amber-50 text-amber-800 border-amber-200",
      message: "Establishing voice connection...",
    };
  } else if (isMuted) {
    statusBadge = {
      text: "Muted",
      dotClass: "bg-amber-500",
      bgClass: "bg-amber-50 text-amber-900 border-amber-200",
      message: "Voice is muted. Click Unmute Coach to hear spoken cues.",
    };
  } else if (isConversationMode) {
    statusBadge = {
      text: "Conversation Mode",
      dotClass: "bg-blue-500 animate-pulse",
      bgClass: "bg-blue-50 text-blue-900 border-blue-300",
      message: `You can now speak with ${coachName}.`,
    };
  } else if (isSpeaking) {
    statusBadge = {
      text: "Guiding",
      dotClass: "bg-emerald-500 animate-ping",
      bgClass: "bg-emerald-50 text-emerald-900 border-emerald-300",
      message: `${coachName} is speaking verbal guidance.`,
    };
  } else if (isConnected) {
    statusBadge = {
      text: "Live & Ready",
      dotClass: "bg-emerald-500",
      bgClass: "bg-emerald-50 text-emerald-900 border-emerald-200",
      message: `${coachName} is ready to guide your practice.`,
    };
  }

  return (
    <div
      className={`rounded-2xl border border-slate-200/90 bg-white/95 p-3 shadow-sm transition-all flex flex-col gap-2.5 ${className}`}
    >
      {/* Top Status Header */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <Radio
            size={14}
            className={
              isConnected && !isMuted
                ? "text-emerald-600 animate-pulse"
                : isMuted
                  ? "text-amber-500"
                  : "text-slate-400"
            }
          />
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 truncate">
            Voice Guidance
          </span>
        </div>

        {/* Dynamic Status Badge */}
        <div
          className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-bold ${statusBadge.bgClass}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${statusBadge.dotClass}`} />
          <span>{statusBadge.text}</span>
        </div>
      </div>

      {/* Action Button: MUTE / UNMUTE COACH */}
      <div className="flex flex-col gap-2">
        {!isConnected && !isConnecting ? (
          <div className="flex flex-col items-center justify-center gap-2 px-4 py-3 rounded-xl border border-dashed border-slate-200 bg-slate-50">
            <Radio size={18} className="text-slate-300" />
            <span className="text-xs text-slate-500 font-medium text-center">
              Voice controls will appear once you start practice.
            </span>
          </div>
        ) : (
          <button
            type="button"
            onClick={onToggleMute}
            aria-label={isMuted ? "Unmute voice coach" : "Mute voice coach"}
            title={isMuted ? "Unmute voice coach" : "Mute voice coach"}
            className={`w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border font-semibold text-xs transition shadow-xs active:scale-[0.98] cursor-pointer ${
              isMuted
                ? "bg-amber-100 hover:bg-amber-200 text-amber-950 border-amber-300 font-bold"
                : "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300"
            }`}
          >
            {isMuted ? (
              <>
                <VolumeX size={16} className="text-amber-800 shrink-0" />
                <span>Unmute Coach</span>
              </>
            ) : (
              <>
                <Volume2 size={16} className="text-slate-700 shrink-0" />
                <span>Mute Coach</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Helper text / status message */}
      <p className="text-[10px] text-slate-600 leading-tight text-center px-1">
        {statusBadge.message}
      </p>
    </div>
  );
});


