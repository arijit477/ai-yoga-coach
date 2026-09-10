import type { PoseRule } from "../../types/pose-rules";

/**
 * Initial Warrior II validation rules.
 *
 * These are intentionally conservative starter rules.
 * They should be calibrated against reference poses before
 * being treated as final production biomechanics rules.
 */
export const warriorIIRules: PoseRule[] = [
  {
    id: "warrior-ii-left-knee-angle",
    name: "Left Knee Angle",
    metric: "angle",
    points: [23, 25, 27],
    comparison: "between",
    min: 80,
    max: 100,
    weight: 2,
    severity: "high",
    feedback:
      "Bend your left knee toward a 90-degree position.",
  },

  {
    id: "warrior-ii-right-knee-angle",
    name: "Right Knee Angle",
    metric: "angle",
    points: [24, 26, 28],
    comparison: "between",
    min: 80,
    max: 100,
    weight: 2,
    severity: "high",
    feedback:
      "Bend your right knee toward a 90-degree position.",
  },

  {
    id: "warrior-ii-shoulder-alignment",
    name: "Shoulder Alignment",
    metric: "horizontal_alignment",
    points: [11, 12],
    comparison: "less_than",
    target: 0.05,
    weight: 1,
    severity: "medium",
    feedback:
      "Keep your shoulders level.",
  },

  {
    id: "warrior-ii-hip-alignment",
    name: "Hip Alignment",
    metric: "horizontal_alignment",
    points: [23, 24],
    comparison: "less_than",
    target: 0.08,
    weight: 1,
    severity: "medium",
    feedback:
      "Keep your hips stable and aligned.",
  },
];