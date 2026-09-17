import React from "react";
import type { CoachId, AvatarState } from "../avatar/avatar.types";
import { AvatarPlayer } from "../avatar/AvatarPlayer";
import { VoiceControls } from "./VoiceControls";
import type { VoiceState } from "../voice/voice.types";

interface CoachPanelProps {
  coach: CoachId;
  coachName: string;
  avatarState: AvatarState;
  guidanceMessage?: string;
  isSpeaking: boolean;
  voiceState?: VoiceState;
  isSessionActive?: boolean;
  onStartVoice?: () => void;
  onStartListening?: () => void;
  onStopListening?: () => void;
  onStopVoice?: () => void;
  onToggleMute?: () => void;
  onRetryVoice?: () => void;
  className?: string;
}

export const CoachPanel = React.memo(function CoachPanel({
  coach,
  coachName,
  avatarState,
  isSpeaking,
  voiceState,
  isSessionActive = false,
  onStartVoice,
  onStartListening,
  onStopListening,
  onStopVoice,
  onToggleMute,
  onRetryVoice,
  className = "",
}: CoachPanelProps) {
  return (
    <div
      className={`rounded-3xl border border-slate-200/80 bg-white p-4 shadow-sm flex flex-col gap-3.5 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            AI Coach
          </h3>
          <p className="text-sm font-bold text-slate-900">{coachName}</p>
        </div>
        <span className="rounded-full bg-emerald-50 border border-emerald-200/70 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800">
          Personal Guide
        </span>
      </div>

      {/* Avatar Stage: fixed dimensions, zero layout shifts */}
      <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden rounded-2xl border border-emerald-100/80 bg-slate-900 shadow-inner">
        <AvatarPlayer
          coach={coach}
          state={avatarState}
          autoPlay
          muted={voiceState?.isMuted ?? false}
          loop
          className="h-full w-full object-cover object-top"
        />

        {/* Dynamic Voice Soundwave Indicator Overlay */}
        {isSpeaking && (
          <div className="absolute bottom-2.5 right-2.5 flex items-end gap-0.5 rounded-full bg-white/95 px-2 py-1 shadow-md border border-emerald-200/80 backdrop-blur-sm pointer-events-none">
            <span className="h-3 w-0.5 rounded-full bg-emerald-600 animate-[bounce_0.8s_infinite_100ms]" />
            <span className="h-4 w-0.5 rounded-full bg-emerald-700 animate-[bounce_0.8s_infinite_200ms]" />
            <span className="h-2.5 w-0.5 rounded-full bg-emerald-500 animate-[bounce_0.8s_infinite_300ms]" />
            <span className="h-4.5 w-0.5 rounded-full bg-emerald-800 animate-[bounce_0.8s_infinite_150ms]" />
            <span className="ml-1 text-[9px] font-bold uppercase tracking-wider text-emerald-800">
              Live
            </span>
          </div>
        )}
      </div>

      {/* Embedded Multi-Button Voice Assistant Control */}
      {voiceState && onToggleMute && onRetryVoice && (
        <VoiceControls
          voiceState={voiceState}
          isSessionActive={isSessionActive}
          coachName={coach === "alice" ? "Alice" : "Kevin"}
          onStartVoice={onStartVoice}
          onStartListening={onStartListening}
          onStopListening={onStopListening}
          onStopVoice={onStopVoice}
          onToggleMute={onToggleMute}
          onRetry={onRetryVoice}
        />
      )}
    </div>
  );
});

