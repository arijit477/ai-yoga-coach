import { COACHES } from "./avatar.types";
import type { CoachId, AvatarState } from "./avatar.types";

export class AvatarAssetResolver {
  /**
   * Resolves the video asset URL for a given coach and state.
   * Currently, only the 'intro' state has a generated video.
   * If an asset for the requested state does not exist, returns null.
   */
  static getCoachAsset(coachId: CoachId, state: AvatarState): string | null {
    const coach = COACHES[coachId];
    
    if (!coach) {
      return null;
    }

    // When the coach is idle or not in session, show the serene portrait image
    if (state === "idle") {
      return null;
    }

    // For all active session lifecycle states (guide, listening, analyzing, speaking, correction, good_form, complete, intro)
    // resolve to the coach's video asset
    return coach.introVideo;
  }
}
