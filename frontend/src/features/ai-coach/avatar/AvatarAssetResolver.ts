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

    if (state === "intro") {
      return coach.introVideo;
    }

    // Fallbacks can be implemented here in the future
    // For now, only intro has a dedicated video.
    return null;
  }
}
