/**
 * Explicit Typed Session States for AI Coach Session Flow
 */
export type CoachSessionState =
  | "idle"
  | "guide_video"
  | "get_ready"
  | "camera_check"
  | "hold_still"
  | "calibrating"
  | "coaching"
  | "correcting"
  | "holding"
  | "pose_review"
  | "user_choice"
  | "completed"
  // Legacy / Aliases for backwards compatibility:
  | "countdown"
  | "detecting"
  | "analyzing"
  | "transition"
  | "session_completed";