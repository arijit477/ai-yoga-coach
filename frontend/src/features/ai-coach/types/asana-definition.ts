import type { AsanaAlignmentCue, AsanaCategory, AsanaDifficulty } from "./asana";
import type { BodyRegion } from "./camera";
import type { PoseRule } from "./pose-rules";

export interface AsanaValidationMetadata {
  status: "draft" | "validated" | "production";
  version: string;
  sampleCount: number;
  expertReviewed: boolean;
}

export interface AsanaAssetInfo {
  imageUrl: string;
  storagePath: string;
}

export interface AsanaDefinition {
  id: string;
  slug?: string;
  displayName: string;
  name: string; // alias/backward compatibility
  sanskritName?: string | null;
  asset?: AsanaAssetInfo;
  imageUrl?: string;
  storagePath?: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  category: AsanaCategory;
  difficulty: AsanaDifficulty;
  description?: string;
  benefits?: string[];
  instructions?: string[];
  cues?: AsanaAlignmentCue[];
  targetHoldSeconds?: number;
  ruleIds?: string[];
  isPremium?: boolean;
  orderIndex?: number;
  aliases?: string[];
  rules: PoseRule[];
  requiredLandmarks: number[];
  requiredRegions?: BodyRegion[];
  validation?: AsanaValidationMetadata;
}
