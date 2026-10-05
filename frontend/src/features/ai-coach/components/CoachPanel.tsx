import React from "react";
import type { CoachId, AvatarState } from "../avatar/avatar.types";
import { COACHES } from "../avatar/avatar.types";
import { VoiceControls } from "./VoiceControls";
import { AccuracyPanel } from "./AccuracyPanel";
import type { VoiceState } from "../voice/voice.types";
import type { Asana } from "../types/asana";
import type { PostureCheckResult } from "../types/posture-check";

import { assetUrl } from "../../../lib/assetUrl";

interface CoachPanelProps {
  coach: CoachId;
  coachName: string;
  outfitId?: string;
  avatarState?: AvatarState;
  guidanceMessage?: string;
  isSpeaking?: boolean;
  voiceState?: VoiceState;
  isSessionActive?: boolean;
  onToggleMute?: () => void;
  score?: number | null;
  displayedScore?: number | null;
  holdTime?: number;
  targetHoldSeconds?: number;
  isHolding?: boolean;
  asana: Asana;
  postureCheck?: PostureCheckResult;
  className?: string;
}

export const CoachPanel = React.memo(function CoachPanel({
  coach,
  coachName,
  outfitId,
  isSpeaking = false,
  voiceState,
  isSessionActive = false,
  onToggleMute,
  score,
  displayedScore,
  holdTime = 0,
  targetHoldSeconds = 5,
  isHolding = false,
  asana,
  postureCheck,
  className = "",
}: CoachPanelProps) {
  // Resolve coach outfit image for the selected outfit
  const coachData = COACHES[coach];
  const outfit = outfitId
    ? coachData?.outfits.find((o) => o.id === outfitId) ?? coachData?.outfits[0]
    : coachData?.outfits[0];
  const outfitImageSrc = outfit?.imageSrc ?? (coach === "alice" ? assetUrl("/images/alice.png") : assetUrl("/images/kevin.jpg"));

  return (
    <div
      className={`relative rounded-3xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-sm flex flex-col gap-4 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          {/* Coach Portrait Thumbnail (outfit-aware) */}
          <div className="relative shrink-0">
            <div
              className={`w-9 h-9 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                isSpeaking
                  ? "border-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                  : "border-slate-200/60"
              }`}
            >
              <img
                src={outfitImageSrc}
                alt={coachName}
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
            </div>
            {/* Speaking pulse indicator */}
            {isSpeaking && (
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 border border-white animate-ping" />
            )}
          </div>

          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              AI Coach
            </h3>
            <p className="text-sm font-bold text-slate-900 leading-tight">{coachName}</p>
          </div>
        </div>

        {/* Yogaverse Brand Badge */}
        <span className="rounded-full bg-emerald-50 border border-emerald-200/70 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800 tracking-wide">
          Yogaverse
        </span>
      </div>

      {/* Accuracy & Guidance Panel Stage (Replaces video avatar with real-time pose guidance) */}
      <AccuracyPanel
        score={score}
        displayedScore={displayedScore}
        holdTime={holdTime}
        targetHoldSeconds={targetHoldSeconds}
        isHolding={isHolding}
        asana={asana}
        postureCheck={postureCheck}
      />

      {/* Embedded Voice Assistant Control (Mute/Unmute Coach) */}
      {voiceState && onToggleMute && (
        <div className={`pt-1 border-t border-slate-100 ${!isSessionActive ? "opacity-90" : ""}`}>
          <VoiceControls
            voiceState={voiceState}
            isSessionActive={isSessionActive}
            coachName={coach === "alice" ? "Alice" : "Kevin"}
            onToggleMute={onToggleMute}
          />
        </div>
      )}
    </div>
  );
});
