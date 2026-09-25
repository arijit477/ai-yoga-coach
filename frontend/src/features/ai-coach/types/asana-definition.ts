import type { PoseRule } from "./pose-rules";

export interface AsanaDefinition {
  id: string;
  name: string;
  sanskritName: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  referenceImage?: string;
  description?: string;
  aliases?: string[];
  rules: PoseRule[];
}
