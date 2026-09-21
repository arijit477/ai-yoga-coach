export type CoachId = "alice" | "kevin";

export type AvatarState =
  | "idle"
  | "guide"
  | "listening"
  | "analyzing"
  | "speaking"
  | "correction"
  | "good_form"
  | "complete"
  | "intro";

export interface CoachOutfit {
  id: string;
  name: string;
  imageSrc: string;
}

export interface Coach {
  id: CoachId;
  name: string;
  description: string;
  introVideo: string;
  outfits: CoachOutfit[];
}

export const COACHES: Record<CoachId, Coach> = {
  alice: {
    id: "alice",
    name: "Alice",
    description: "Your calm, supportive and professional yoga coach",
    introVideo: "/coach/alice/intro.mp4",
    outfits: [
      { id: "default", name: "Default (Emerald Green)", imageSrc: "/images/alice.png" },
      { id: "charcoal", name: "Charcoal Grey", imageSrc: "/images/alice_charcoal.jpg" },
      { id: "navy", name: "Navy Blue", imageSrc: "/images/alice_navy.jpg" },
      { id: "pink", name: "Light Pink", imageSrc: "/images/alice_pink.jpg" },
      { id: "teal", name: "Teal", imageSrc: "/images/alice_teal.jpg" },
      { id: "white", name: "White", imageSrc: "/images/alice_white.jpg" },
      { id: "blue", name: "Light Blue", imageSrc: "/images/alice.png" }, // Fallback to default for now
    ],
  },
  kevin: {
    id: "kevin",
    name: "Kevin",
    description: "Your energetic, motivating and confident yoga coach",
    introVideo: "/coach/kevin/intro.mp4",
    outfits: [
      { id: "default", name: "Default (Black)", imageSrc: "/images/kevin.jpg" },
      { id: "navy", name: "Navy", imageSrc: "/images/kevin_navy.jpg" },
      { id: "grey", name: "Grey", imageSrc: "/images/kevin_grey.jpg" },
      { id: "white", name: "White", imageSrc: "/images/kevin_white.jpg" },
      { id: "maroon", name: "Maroon", imageSrc: "/images/kevin_maroon.jpg" },
      { id: "forest", name: "Forest Green", imageSrc: "/images/kevin_forest.jpg" },
      { id: "blue", name: "Light Blue", imageSrc: "/images/kevin.jpg" }, // Fallback to default for now
    ],
  },
};
