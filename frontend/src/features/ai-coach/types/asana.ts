export type AsanaCategory =
  | "standing"
  | "balancing"
  | "seated"
  | "backbend"
  | "forward_bend"
  | "core"
  | "inversion"
  | "restorative";

export type AsanaDifficulty = "beginner" | "intermediate" | "advanced";

export interface AsanaAlignmentCue {
  id: string;
  jointOrBodyPart: string;
  cue: string;
  tip?: string;
}

export interface Asana {
  id: string;
  slug: string;
  name: string;
  sanskritName?: string;
  category: AsanaCategory;
  difficulty: AsanaDifficulty;
  imageUrl: string;
  storagePath: string;
  thumbnailUrl?: string;
  description: string;
  benefits: string[];
  instructions: string[];
  cues: AsanaAlignmentCue[];
  targetHoldSeconds: number;
  ruleIds: string[];
  isPremium: boolean;
  orderIndex?: number;
}
