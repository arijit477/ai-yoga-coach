export type CoachId = "alice" | "kevin";

export type AvatarState =
  | "idle"
  | "guide"
  | "listening"
  | "thinking"
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

import { assetUrl } from "../../../lib/assetUrl";

export const COACHES: Record<CoachId, Coach> = {
  alice: {
    id: "alice",
    name: "Alice",
    description: "Your calm, supportive and professional yoga coach",
    introVideo: assetUrl("/coach/alice/intro.mp4"),
    outfits: [
      { id: "default", name: "Default (Emerald Green)", imageSrc: assetUrl("/images/alice.png") },
      { id: "charcoal", name: "Charcoal Grey", imageSrc: assetUrl("/images/alice_charcoal.jpg") },
      { id: "navy", name: "Navy Blue", imageSrc: assetUrl("/images/alice_navy.jpg") },
      { id: "pink", name: "Light Pink", imageSrc: assetUrl("/images/alice_pink.jpg") },
      { id: "teal", name: "Teal", imageSrc: assetUrl("/images/alice_teal.jpg") },
      { id: "white", name: "White", imageSrc: assetUrl("/images/alice_white.jpg") },
      { id: "blue", name: "Light Blue", imageSrc: assetUrl("/images/alice.png") }, // Fallback to default for now
    ],
  },
  kevin: {
    id: "kevin",
    name: "Kevin",
    description: "Your energetic, motivating and confident yoga coach",
    introVideo: assetUrl("/coach/kevin/intro.mp4"),
    outfits: [
      { id: "default", name: "Default (Black)", imageSrc: assetUrl("/images/kevin.jpg") },
      { id: "navy", name: "Navy", imageSrc: assetUrl("/images/kevin_navy.jpg") },
      { id: "grey", name: "Grey", imageSrc: assetUrl("/images/kevin_grey.jpg") },
      { id: "white", name: "White", imageSrc: assetUrl("/images/kevin_white.jpg") },
      { id: "maroon", name: "Maroon", imageSrc: assetUrl("/images/kevin_maroon.jpg") },
      { id: "forest", name: "Forest Green", imageSrc: assetUrl("/images/kevin_forest.jpg") },
      { id: "blue", name: "Light Blue", imageSrc: assetUrl("/images/kevin.jpg") }, // Fallback to default for now
    ],
  },
};
