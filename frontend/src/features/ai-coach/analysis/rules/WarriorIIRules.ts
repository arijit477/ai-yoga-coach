import type { PoseRule } from "../../types/pose-rules";

/**
 * Warrior II (Virabhadrasana II) pose rules.
 *
 * Derived from the notebook classifyPose() geometry:
 *   - Both arms straight (elbow ~165-180deg via acos dot-product)
 *   - Shoulder abduction: elbow-shoulder-hip angle ~75-115deg
 *   - Front knee bent ~75-125deg
 *   - Back leg straight ~155-180deg
 *   - Hips and shoulders level
 *   - Torso upright (spine lateral check)
 */
export const warriorIIRules: PoseRule[] = [
  // ARM EXTENSION
  {
    id: "warrior-ii-left-elbow-straight",
    name: "Left Arm Extension",
    metric: "angle",
    points: [11, 13, 15],
    comparison: "between",
    min: 155,
    max: 180,
    weight: 2,
    severity: "high",
    feedback: "Extend your left arm straight out to the side — reach through your fingertips.",
  },
  {
    id: "warrior-ii-right-elbow-straight",
    name: "Right Arm Extension",
    metric: "angle",
    points: [12, 14, 16],
    comparison: "between",
    min: 155,
    max: 180,
    weight: 2,
    severity: "high",
    feedback: "Extend your right arm straight out to the side — reach through your fingertips.",
  },

  // SHOULDER ABDUCTION (~80-110deg, notebook threshold)
  {
    id: "warrior-ii-left-shoulder-abduction",
    name: "Left Shoulder Lift",
    metric: "angle",
    points: [13, 11, 23],
    comparison: "between",
    min: 75,
    max: 115,
    weight: 2,
    severity: "high",
    feedback: "Lift your left arm to shoulder height — parallel to the floor.",
  },
  {
    id: "warrior-ii-right-shoulder-abduction",
    name: "Right Shoulder Lift",
    metric: "angle",
    points: [14, 12, 24],
    comparison: "between",
    min: 75,
    max: 115,
    weight: 2,
    severity: "high",
    feedback: "Lift your right arm to shoulder height — parallel to the floor.",
  },

  // FRONT KNEE BEND (~90deg, notebook: 90-120)
  {
    id: "warrior-ii-left-knee-angle",
    name: "Front Knee Bend",
    metric: "angle",
    points: [23, 25, 27],
    comparison: "between",
    min: 75,
    max: 125,
    weight: 3,
    severity: "high",
    feedback: "Bend your front knee toward 90 degrees — stack it directly over your ankle.",
  },

  // BACK LEG STRAIGHT (~165-180deg, notebook: >165)
  {
    id: "warrior-ii-right-knee-straight",
    name: "Back Leg Straight",
    metric: "angle",
    points: [24, 26, 28],
    comparison: "between",
    min: 155,
    max: 180,
    weight: 2,
    severity: "high",
    feedback: "Keep your back leg straight — press through the outer edge of your foot.",
  },

  // SHOULDER LEVEL
  {
    id: "warrior-ii-shoulder-alignment",
    name: "Shoulder Level",
    metric: "horizontal_alignment",
    points: [11, 12],
    comparison: "less_than",
    target: 0.05,
    tolerance: 0.04,
    weight: 1,
    severity: "medium",
    feedback: "Keep shoulders level — relax them away from your ears.",
  },

  // HIP ALIGNMENT
  {
    id: "warrior-ii-hip-alignment",
    name: "Hip Stability",
    metric: "horizontal_alignment",
    points: [23, 24],
    comparison: "less_than",
    target: 0.08,
    tolerance: 0.06,
    weight: 1,
    severity: "medium",
    feedback: "Keep hips open and stable — square them toward the side of the room.",
  },

  // TORSO UPRIGHT
  {
    id: "warrior-ii-torso-upright",
    name: "Torso Upright",
    metric: "vertical_alignment",
    points: [11, 23],
    comparison: "less_than",
    target: 0.08,
    tolerance: 0.06,
    weight: 1,
    severity: "medium",
    feedback: "Keep your torso tall and upright — do not lean forward or back.",
  },
];
