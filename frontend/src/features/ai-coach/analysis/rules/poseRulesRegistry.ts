import type { PoseRule } from "../../types/pose-rules";
import { warriorIIRules } from "./WarriorIIRules";
import { registerPoseRules, getPoseRules, hasPoseRules } from "../RuleEngine";

export const ASANA_RULES_CATALOG: Record<string, PoseRule[]> = {
  "warrior-ii": warriorIIRules,
  tadasana: [
    {
      id: "tadasana-shoulder-level",
      name: "Shoulder Alignment",
      metric: "horizontal_alignment",
      points: [11, 12],
      comparison: "less_than",
      target: 0.05,
      weight: 1,
      severity: "medium",
      feedback: "Keep shoulders level and relaxed away from your ears.",
    },
    {
      id: "tadasana-hip-level",
      name: "Hip Alignment",
      metric: "horizontal_alignment",
      points: [23, 24],
      comparison: "less_than",
      target: 0.06,
      weight: 1,
      severity: "medium",
      feedback: "Distribute your weight evenly and keep your hips level.",
    },
  ],
  vrksasana: [
    {
      id: "vrksasana-hip-level",
      name: "Hip Alignment",
      metric: "horizontal_alignment",
      points: [23, 24],
      comparison: "less_than",
      target: 0.07,
      weight: 2,
      severity: "high",
      feedback: "Square your hips forward and keep them level.",
    },
    {
      id: "vrksasana-shoulder-level",
      name: "Shoulder Alignment",
      metric: "horizontal_alignment",
      points: [11, 12],
      comparison: "less_than",
      target: 0.06,
      weight: 1,
      severity: "medium",
      feedback: "Relax shoulders and open chest with hands in prayer.",
    },
  ],
  trikonasana: [
    {
      id: "trikonasana-torso-alignment",
      name: "Torso Extension",
      metric: "horizontal_alignment",
      points: [11, 12],
      comparison: "less_than",
      target: 0.12,
      weight: 1,
      severity: "medium",
      feedback: "Keep both sides of your waist long and open.",
    },
  ],
  "adho-mukha-svanasana": [
    {
      id: "downward-dog-arm-extension",
      name: "Arm Extension",
      metric: "angle",
      points: [11, 13, 15],
      comparison: "between",
      min: 155,
      max: 180,
      weight: 2,
      severity: "medium",
      feedback: "Straighten your arms and press firmly into your palms.",
    },
  ],
  bhujangasana: [
    {
      id: "cobra-shoulder-relaxed",
      name: "Shoulder Placement",
      metric: "horizontal_alignment",
      points: [11, 12],
      comparison: "less_than",
      target: 0.08,
      weight: 1,
      severity: "medium",
      feedback: "Draw shoulders down away from your ears as you lift.",
    },
  ],
  balasana: [
    {
      id: "childs-pose-hips",
      name: "Hip Grounding",
      metric: "horizontal_alignment",
      points: [23, 24],
      comparison: "less_than",
      target: 0.08,
      weight: 1,
      severity: "low",
      feedback: "Let hips settle gently back toward your heels.",
    },
  ],
  "marjaryasana-bitilasana": [
    {
      id: "cat-cow-shoulder-wrist",
      name: "Shoulder Stack",
      metric: "horizontal_alignment",
      points: [11, 12],
      comparison: "less_than",
      target: 0.08,
      weight: 1,
      severity: "medium",
      feedback: "Stack wrists under shoulders and keep hips balanced.",
    },
  ],
  "setu-bandhasana": [
    {
      id: "bridge-knee-angle",
      name: "Knee Angle",
      metric: "angle",
      points: [23, 25, 27],
      comparison: "between",
      min: 75,
      max: 120,
      weight: 2,
      severity: "high",
      feedback: "Keep knees directly above ankles as you lift your hips.",
    },
  ],
  savasana: [
    {
      id: "savasana-relaxation",
      name: "Stillness & Relaxation",
      metric: "horizontal_alignment",
      points: [11, 12],
      comparison: "less_than",
      target: 0.05,
      weight: 1,
      severity: "low",
      feedback: "Rest completely still, breathing naturally.",
    },
  ],
};

/**
 * Ensures rules for the specified asana are registered in the RuleEngine.
 */
export function ensureAsanaRules(asanaId: string, customRules?: PoseRule[]): PoseRule[] {
  if (customRules && customRules.length > 0) {
    registerPoseRules(asanaId, customRules);
    return customRules;
  }

  if (hasPoseRules(asanaId)) {
    const registered = getPoseRules(asanaId);
    if (registered.length > 0) {
      return registered;
    }
  }

  const defaultRules = ASANA_RULES_CATALOG[asanaId] ?? [];
  if (defaultRules.length > 0) {
    registerPoseRules(asanaId, defaultRules);
  }

  return defaultRules;
}
