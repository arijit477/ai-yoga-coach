export type CoachSessionState =
  | "idle"
  | "countdown"
  | "detecting"
  | "analyzing"
  | "correcting"
  | "holding"
  | "completed"
  | "transition"
  | "session_completed";