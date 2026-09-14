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

  // ==========================================
  // SURYA NAMASKAR (SUN SALUTATION - BEACH FLOW)
  // ==========================================
  "step-01-prayer-pranamasana": [
    {
      id: "pranamasana-shoulder-level",
      name: "Shoulder Alignment",
      metric: "horizontal_alignment",
      points: [11, 12],
      comparison: "less_than",
      target: 0.05,
      weight: 1,
      severity: "medium",
      feedback: "Keep shoulders level and relaxed down away from ears.",
    },
    {
      id: "pranamasana-elbow-level",
      name: "Forearm & Elbow Balance",
      metric: "horizontal_alignment",
      points: [13, 14],
      comparison: "less_than",
      target: 0.07,
      weight: 1,
      severity: "low",
      feedback: "Keep elbows balanced with palms centered at heart.",
    },
  ],

  "step-02-raised-arms-hastauttanasana": [
    {
      id: "hastauttanasana-arm-extension",
      name: "Arm Extension",
      metric: "angle",
      points: [11, 13, 15],
      comparison: "between",
      min: 155,
      max: 180,
      weight: 2,
      severity: "high",
      feedback: "Extend both arms straight upward alongside your ears.",
    },
    {
      id: "hastauttanasana-torso-extension",
      name: "Chest Elevation",
      metric: "horizontal_alignment",
      points: [11, 12],
      comparison: "less_than",
      target: 0.06,
      weight: 1,
      severity: "medium",
      feedback: "Lift through your chest evenly as you arch gently back.",
    },
  ],

  "step-03-standing-forward-bend-hastapadasana": [
    {
      id: "hastapadasana-hip-flexion",
      name: "Forward Hip Fold",
      metric: "angle",
      points: [11, 23, 25],
      comparison: "between",
      min: 30,
      max: 110,
      weight: 2,
      severity: "high",
      feedback: "Hinge deeply from your hips, letting head release downward.",
    },
    {
      id: "hastapadasana-knee-angle",
      name: "Leg Stance",
      metric: "angle",
      points: [23, 25, 27],
      comparison: "between",
      min: 140,
      max: 180,
      weight: 1,
      severity: "medium",
      feedback: "Keep legs long with a slight gentle micro-bend in knees.",
    },
  ],

  "step-04-equestrian-right-back-ashwa-sanchalanasana": [
    {
      id: "ashwa-front-knee-angle",
      name: "Front Knee Angle",
      metric: "angle",
      points: [23, 25, 27],
      comparison: "between",
      min: 75,
      max: 115,
      weight: 2,
      severity: "high",
      feedback: "Keep front knee stacked cleanly over your ankle at 90 degrees.",
    },
    {
      id: "ashwa-chest-lift",
      name: "Chest Elevation",
      metric: "horizontal_alignment",
      points: [11, 12],
      comparison: "less_than",
      target: 0.08,
      weight: 1,
      severity: "medium",
      feedback: "Roll shoulders back and look forward with an open chest.",
    },
  ],

  "step-05-plank-dandasana": [
    {
      id: "plank-torso-alignment",
      name: "Body Line Alignment",
      metric: "angle",
      points: [11, 23, 25],
      comparison: "between",
      min: 155,
      max: 180,
      weight: 2,
      severity: "high",
      feedback: "Engage your core to maintain a straight line from head to heels.",
    },
    {
      id: "plank-arm-extension",
      name: "Arm Stack",
      metric: "angle",
      points: [11, 13, 15],
      comparison: "between",
      min: 155,
      max: 180,
      weight: 1,
      severity: "medium",
      feedback: "Press firmly into hands with arms straight and shoulders broad.",
    },
  ],

  "step-06-eight-limbed-salute-ashtanga-namaskara": [
    {
      id: "ashtanga-elbow-tuck",
      name: "Elbow Position",
      metric: "angle",
      points: [11, 13, 15],
      comparison: "between",
      min: 60,
      max: 120,
      weight: 2,
      severity: "medium",
      feedback: "Keep elbows bent and hugged tightly in toward your ribs.",
    },
    {
      id: "ashtanga-chest-grounded",
      name: "Chest Low & Hips Lifted",
      metric: "horizontal_alignment",
      points: [11, 12],
      comparison: "less_than",
      target: 0.08,
      weight: 1,
      severity: "low",
      feedback: "Lower chest between hands while keeping hips gently elevated.",
    },
  ],

  "step-07-cobra-bhujangasana": [
    {
      id: "cobra-shoulder-relaxed",
      name: "Shoulders Down",
      metric: "horizontal_alignment",
      points: [11, 12],
      comparison: "less_than",
      target: 0.07,
      weight: 1,
      severity: "medium",
      feedback: "Roll shoulders down away from ears as chest rises smoothly.",
    },
    {
      id: "cobra-elbow-bend",
      name: "Elbow Tuck",
      metric: "angle",
      points: [11, 13, 15],
      comparison: "between",
      min: 90,
      max: 160,
      weight: 1,
      severity: "low",
      feedback: "Keep a gentle bend in elbows close to your torso.",
    },
  ],

  "step-08-downward-dog-adho-mukha-svanasana": [
    {
      id: "downward-dog-arm-extension",
      name: "Arm Straightening",
      metric: "angle",
      points: [11, 13, 15],
      comparison: "between",
      min: 155,
      max: 180,
      weight: 2,
      severity: "medium",
      feedback: "Extend through both arms, pressing through palms.",
    },
    {
      id: "downward-dog-hip-angle",
      name: "Inverted V Hips",
      metric: "angle",
      points: [11, 23, 25],
      comparison: "between",
      min: 60,
      max: 115,
      weight: 2,
      severity: "high",
      feedback: "Send hips high and back to lengthen the spine.",
    },
  ],

  "step-09-equestrian-left-back-ashwa-sanchalanasana": [
    {
      id: "ashwa-front-knee-angle",
      name: "Front Knee Angle",
      metric: "angle",
      points: [24, 26, 28],
      comparison: "between",
      min: 75,
      max: 115,
      weight: 2,
      severity: "high",
      feedback: "Keep front knee steady directly over your ankle at 90 degrees.",
    },
    {
      id: "ashwa-chest-lift",
      name: "Chest Lift",
      metric: "horizontal_alignment",
      points: [11, 12],
      comparison: "less_than",
      target: 0.08,
      weight: 1,
      severity: "medium",
      feedback: "Open your chest and breathe into the front of your hip.",
    },
  ],

  "step-10-standing-forward-bend-hastapadasana": [
    {
      id: "hastapadasana-hip-flexion",
      name: "Forward Hip Fold",
      metric: "angle",
      points: [11, 23, 25],
      comparison: "between",
      min: 30,
      max: 110,
      weight: 2,
      severity: "high",
      feedback: "Hinge deeply from your hips with head releasing toward floor.",
    },
    {
      id: "hastapadasana-knee-angle",
      name: "Leg Stance",
      metric: "angle",
      points: [23, 25, 27],
      comparison: "between",
      min: 140,
      max: 180,
      weight: 1,
      severity: "medium",
      feedback: "Keep legs long, letting gravity traction the spine.",
    },
  ],

  "step-11-raised-arms-hastauttanasana": [
    {
      id: "hastauttanasana-arm-extension",
      name: "Arm Extension",
      metric: "angle",
      points: [11, 13, 15],
      comparison: "between",
      min: 155,
      max: 180,
      weight: 2,
      severity: "high",
      feedback: "Reach both arms high overhead with energy through fingers.",
    },
    {
      id: "hastauttanasana-torso-extension",
      name: "Spinal Extension",
      metric: "horizontal_alignment",
      points: [11, 12],
      comparison: "less_than",
      target: 0.06,
      weight: 1,
      severity: "medium",
      feedback: "Lift tall through both sides of waist as you greet the sun.",
    },
  ],

  "step-12-mountain-tadasana": [
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
      feedback: "Stand steady and grounded, distributing weight evenly.",
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
