import React from "react";
import { Mic, MicOff, Volume2, RotateCcw } from "lucide-react";
import type { VoiceState } from "../voice/voice.types";

interface VoiceControlsProps {
  voiceState: VoiceState;
  isSessionActive: boolean;
  coachName?: string;
  onToggleMute: () => void;
  onRetry: () => void;
  onStartVoice?: () => void;
  className?: string;
}

/**
 * Professional Voice Assistant Control:
 * Provides 5 distinct, visually responsive states:
 * 1. READY: [ 🎙 Ask Coach ] / [ 🎙 Talk to Alice ]
 * 2. LISTENING: [ 🎙 Listening... ] (subtle pulse ring)
 * 3. SPEAKING: [ 🔊 Alice is speaking ] (animated soundwave)
 * 4. MUTED / DISABLED: [ 🔇 Voice off ]
 * 5. ERROR: [ ⚠️ Voice unavailable - Retry ]
 */
export const VoiceControls = React.memo(function VoiceControls({
  voiceState,
  isSessionActive,
  coachName = "Alice",
  onToggleMute,
  onRetry,
  onStartVoice,
  className = "",
}: VoiceControlsProps) {
  const isSpeaking = voiceState.status === "speaking";
  const isListening = voiceState.status === "listening";
  const isError = voiceState.status === "error";
  const isMuted = voiceState.isMuted;
  const isConnected =
    voiceState.status === "connected" || isSpeaking || isListening;

  // Determine current UI visual state
  let stateConfig = {
    label: `Talk to ${coachName}`,
    ariaLabel: `Ask AI Coach ${coachName} a question`,
    badgeText: "Ready",
    icon: <Mic size={16} className="text-emerald-700" />,
    buttonClass:
      "bg-emerald-50/90 hover:bg-emerald-100 text-emerald-900 border-emerald-300/80 shadow-xs",
    ringClass: "",
    dotClass: "bg-emerald-500",
  };

  if (isError) {
    stateConfig = {
      label: "Voice unavailable",
      ariaLabel: "Voice connection error. Click to retry.",
      badgeText: "Unavailable",
      icon: <MicOff size={16} className="text-amber-700" />,
      buttonClass:
        "bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300 shadow-xs",
      ringClass: "",
      dotClass: "bg-amber-500",
    };
  } else if (isMuted) {
    stateConfig = {
      label: "Voice off",
      ariaLabel: "Microphone is muted. Click to unmute.",
      badgeText: "Muted",
      icon: <MicOff size={16} className="text-slate-500" />,
      buttonClass:
        "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300 shadow-xs",
      ringClass: "",
      dotClass: "bg-slate-400",
    };
  } else if (isSpeaking) {
    stateConfig = {
      label: `${coachName} is speaking`,
      ariaLabel: `Coach ${coachName} is currently speaking cues`,
      badgeText: "Speaking",
      icon: <Volume2 size={16} className="text-emerald-600 animate-pulse" />,
      buttonClass:
        "bg-emerald-600 text-white border-emerald-700 shadow-md ring-2 ring-emerald-400/40",
      ringClass: "animate-pulse",
      dotClass: "bg-emerald-300 animate-ping",
    };
  } else if (isListening) {
    stateConfig = {
      label: "Listening...",
      ariaLabel: `Coach ${coachName} is listening to your question`,
      badgeText: "Listening",
      icon: <Mic size={16} className="text-teal-700 animate-bounce" />,
      buttonClass:
        "bg-teal-50 hover:bg-teal-100 text-teal-950 border-teal-400 shadow-md ring-2 ring-teal-300/40",
      ringClass: "animate-ping",
      dotClass: "bg-teal-500 animate-ping",
    };
  } else if (isConnected) {
    stateConfig = {
      label: "Ask Coach",
      ariaLabel: `Ask Coach ${coachName}`,
      badgeText: "Live",
      icon: <Mic size={16} className="text-emerald-700" />,
      buttonClass:
        "bg-white hover:bg-emerald-50 text-emerald-950 border-emerald-300 shadow-xs hover:border-emerald-400",
      ringClass: "",
      dotClass: "bg-emerald-500",
    };
  }

  const handleClick = () => {
    if (isError) {
      onRetry();
    } else if (!isSessionActive && onStartVoice) {
      onStartVoice();
    } else {
      onToggleMute();
    }
  };

  return (
    <div
      className={`rounded-2xl border border-slate-200/80 bg-slate-50/70 p-2.5 transition-all duration-200 ${className}`}
    >
      <div className="flex items-center justify-between gap-2">
        {/* Main Interactive Voice Assistant Button */}
        <button
          type="button"
          onClick={handleClick}
          aria-label={stateConfig.ariaLabel}
          title={stateConfig.ariaLabel}
          className={`flex-1 flex items-center justify-between gap-2.5 px-3 py-2 rounded-xl border font-semibold text-xs transition-all active:scale-[0.98] cursor-pointer ${stateConfig.buttonClass}`}
        >
          <div className="flex items-center gap-2 min-w-0">
            <span className="shrink-0 flex items-center justify-center">
              {stateConfig.icon}
            </span>
            <span className="truncate">{stateConfig.label}</span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0 ml-1">
            <span className={`h-2 w-2 rounded-full ${stateConfig.dotClass}`} />
            <span className="text-[10px] font-bold uppercase tracking-wider opacity-85">
              {stateConfig.badgeText}
            </span>
          </div>
        </button>

        {/* Retry or Mute quick toggle */}
        {isError ? (
          <button
            type="button"
            onClick={onRetry}
            aria-label="Retry voice connection"
            title="Retry voice connection"
            className="flex items-center justify-center h-9 w-9 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-800 transition active:scale-95 cursor-pointer shrink-0"
          >
            <RotateCcw size={14} />
          </button>
        ) : (
          isSessionActive && (
            <button
              type="button"
              onClick={onToggleMute}
              aria-label={isMuted ? "Unmute microphone" : "Mute microphone"}
              title={isMuted ? "Unmute microphone" : "Mute microphone"}
              className={`flex items-center justify-center h-9 w-9 rounded-xl border transition active:scale-95 cursor-pointer shrink-0 ${
                isMuted
                  ? "bg-amber-100 border-amber-300 text-amber-900"
                  : "bg-white border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {isMuted ? <MicOff size={14} /> : <Mic size={14} />}
            </button>
          )
        )}
      </div>
    </div>
  );
});

