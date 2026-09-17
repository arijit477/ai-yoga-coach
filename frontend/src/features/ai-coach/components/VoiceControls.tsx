import React from "react";
import {
  Mic,
  Volume2,
  VolumeX,
  Play,
  Square,
  RotateCcw,
  Radio,
} from "lucide-react";
import type { VoiceState } from "../voice/voice.types";

interface VoiceControlsProps {
  voiceState: VoiceState;
  isSessionActive?: boolean;
  coachName?: string;
  onStartVoice?: () => void;
  onStartListening?: () => void;
  onStopListening?: () => void;
  onStopVoice?: () => void;
  onToggleMute?: () => void;
  onRetry?: () => void;
  className?: string;
}

/**
 * Dedicated Multi-Button Voice Control Bar:
 * Provides distinct, intuitive buttons for:
 * 1. [Start Voice] / [Start Listening] / [Stop Listening]
 * 2. [Stop Voice] (cancels speech & disconnects)
 * 3. [Mute / Unmute] (toggles audio & mic)
 * 4. [Retry] (connection recovery)
 */
export const VoiceControls = React.memo(function VoiceControls({
  voiceState,
  coachName = "Alice",
  onStartVoice,
  onStartListening,
  onStopListening,
  onStopVoice,
  onToggleMute,
  onRetry,
  className = "",
}: VoiceControlsProps) {
  const isSpeaking = voiceState.status === "speaking";
  const isListening = voiceState.status === "listening";
  const isError = voiceState.status === "error";
  const isMuted = voiceState.isMuted;
  const isConnected =
    voiceState.status === "connected" || isSpeaking || isListening;
  const isConnecting = voiceState.status === "connecting" || voiceState.status === "requesting_permission";
  const isDisconnected = voiceState.status === "disconnected" || (!isConnected && !isConnecting && !isError);

  // Status indicator styling & text
  let statusBadge = {
    text: "Offline",
    dotClass: "bg-slate-400",
    bgClass: "bg-slate-100 text-slate-700 border-slate-200",
    message: "Voice coach is offline. Click Start Voice to activate.",
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
  } else if (isSpeaking) {
    statusBadge = {
      text: "Speaking",
      dotClass: "bg-emerald-500 animate-ping",
      bgClass: "bg-emerald-50 text-emerald-900 border-emerald-300",
      message: `${coachName} is speaking verbal guidance cues`,
    };
  } else if (isListening) {
    statusBadge = {
      text: "Listening...",
      dotClass: "bg-teal-500 animate-ping",
      bgClass: "bg-teal-50 text-teal-950 border-teal-300",
      message: "Listening to your voice... Speak anytime!",
    };
  } else if (isMuted) {
    statusBadge = {
      text: "Muted",
      dotClass: "bg-amber-500",
      bgClass: "bg-amber-50 text-amber-900 border-amber-200",
      message: "Voice is muted. Click Unmute to hear coach guidance.",
    };
  } else if (isConnected) {
    statusBadge = {
      text: "Live & Ready",
      dotClass: "bg-emerald-500",
      bgClass: "bg-emerald-50 text-emerald-900 border-emerald-200",
      message: `${coachName} is ready. Click 'Start Listening' to speak.`,
    };
  }

  return (
    <div
      className={`rounded-2xl border border-slate-200/90 bg-white/95 p-3 shadow-sm transition-all flex flex-col gap-2.5 ${className}`}
    >
      {/* Top Status Header */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <Radio size={14} className={isConnected ? "text-emerald-600 animate-pulse" : "text-slate-400"} />
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 truncate">
            Voice Agent
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

      {/* Multiple Action Buttons Control Bar */}
      <div className="grid grid-cols-3 gap-2">
        {/* BUTTON 1: START / LISTEN / STOP LISTENING */}
        {isDisconnected ? (
          <button
            type="button"
            onClick={onStartVoice}
            disabled={isConnecting}
            aria-label="Start voice coach"
            title="Start voice coach assistant"
            className="flex flex-col items-center justify-center gap-1 px-2 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[11px] transition shadow-xs active:scale-[0.97] cursor-pointer disabled:opacity-50"
          >
            <Play size={15} className="fill-white" />
            <span className="truncate">Start Voice</span>
          </button>
        ) : isListening ? (
          <button
            type="button"
            onClick={onStopListening}
            aria-label="Stop listening"
            title="Stop listening for questions"
            className="flex flex-col items-center justify-center gap-1 px-2 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-[11px] transition shadow-xs active:scale-[0.97] cursor-pointer"
          >
            <Square size={14} className="fill-white" />
            <span className="truncate">Stop Listening</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onStartListening}
            disabled={isConnecting || isError}
            aria-label="Start listening to user voice"
            title="Activate microphone listening mode to ask a question"
            className="flex flex-col items-center justify-center gap-1 px-2 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-300 font-semibold text-[11px] transition shadow-xs active:scale-[0.97] cursor-pointer disabled:opacity-50"
          >
            <Mic size={15} className="text-teal-700 animate-pulse" />
            <span className="truncate">Start Listening</span>
          </button>
        )}

        {/* BUTTON 2: STOP VOICE */}
        <button
          type="button"
          onClick={onStopVoice}
          disabled={isDisconnected && !isConnecting}
          aria-label="Stop voice coach"
          title="Disconnect and silence voice coach"
          className={`flex flex-col items-center justify-center gap-1 px-2 py-2 rounded-xl border font-semibold text-[11px] transition shadow-xs active:scale-[0.97] ${
            !isDisconnected || isConnecting
              ? "bg-rose-50 hover:bg-rose-100 text-rose-800 border-rose-300 cursor-pointer"
              : "bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed opacity-60"
          }`}
        >
          <Square size={14} className={!isDisconnected ? "fill-rose-700 text-rose-700" : "text-slate-400"} />
          <span className="truncate">Stop Voice</span>
        </button>

        {/* BUTTON 3: MUTE / UNMUTE (or RETRY if in error state) */}
        {isError ? (
          <button
            type="button"
            onClick={onRetry}
            aria-label="Retry voice connection"
            title="Retry voice connection"
            className="flex flex-col items-center justify-center gap-1 px-2 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-[11px] transition shadow-xs active:scale-[0.97] cursor-pointer"
          >
            <RotateCcw size={14} />
            <span className="truncate">Retry</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onToggleMute}
            aria-label={isMuted ? "Unmute voice coach" : "Mute voice coach"}
            title={isMuted ? "Unmute voice coach" : "Mute voice coach"}
            className={`flex flex-col items-center justify-center gap-1 px-2 py-2 rounded-xl border font-semibold text-[11px] transition shadow-xs active:scale-[0.97] cursor-pointer ${
              isMuted
                ? "bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-300"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300"
            }`}
          >
            {isMuted ? (
              <>
                <VolumeX size={15} className="text-amber-800" />
                <span className="truncate">Unmute</span>
              </>
            ) : (
              <>
                <Volume2 size={15} className="text-slate-700" />
                <span className="truncate">Mute</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Helper text / status message */}
      <p className="text-[10px] text-slate-700 leading-tight text-center px-1">
        {statusBadge.message}
      </p>
    </div>
  );
});
