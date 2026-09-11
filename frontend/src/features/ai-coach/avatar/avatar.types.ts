export type CoachId = "alice" | "kevin";

export type AvatarState =
  | "idle"
  | "intro"
  | "speaking"
  | "correction"
  | "good_form"
  | "complete";

export interface Coach {
  id: CoachId;
  name: string;
  description: string;
  introVideo: string;
}

export const COACHES: Record<CoachId, Coach> = {
  alice: {
    id: "alice",
    name: "Alice",
    description: "Your calm, supportive and professional yoga coach",
    introVideo: "/coach/alice/intro.mp4",
  },
  kevin: {
    id: "kevin",
    name: "Kevin",
    description: "Your energetic, motivating and confident yoga coach",
    introVideo: "/coach/kevin/intro.mp4",
  },
};
