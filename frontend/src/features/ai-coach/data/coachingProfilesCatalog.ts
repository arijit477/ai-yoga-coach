import type { AsanaCoachingProfile, StartingPosition, MovementType, AsanaStartingStance } from "../types/coaching-profile";
import { warriorIIRules } from "../analysis/rules/WarriorIIRules";
import { mountainPose } from "../analysis/rules/asanas/mountainPose";
import { treePose } from "../analysis/rules/asanas/treePose";
import { padmasanaPose } from "../analysis/rules/asanas/padmasanaPose";
import { bhujangasanaPose } from "../analysis/rules/asanas/bhujangasanaPose";
import { setuBandhasanaPose } from "../analysis/rules/asanas/setuBandhasanaPose";
import { chaturangaPose } from "../analysis/rules/asanas/chaturangaPose";
import { balasanaPose } from "../analysis/rules/asanas/balasanaPose";
import { downwardDogPose } from "../analysis/rules/asanas/downwardDogPose";

/**
 * Hand-authored, production-grade Asana Coaching Profiles for foundational poses across all stances.
 */
export const CORE_COACHING_PROFILES: Record<string, AsanaCoachingProfile> = {
  "warrior-ii": {
    asanaId: "warrior-ii",
    asanaName: "Warrior II",
    sanskritName: "Vīrabhadrāsana II",
    category: "standing",
    difficulty: "beginner",
    stance: "standing",
    startingPosition: "standing",
    movementType: "balance_stabilization",
    entryCue: "Step your feet wide apart, turn your front foot out 90 degrees, bend your front knee, and extend both arms parallel to the floor.",
    entryInstruction: "Step your feet wide apart, turn your front foot out 90 degrees, bend your front knee over your ankle, and extend both arms parallel to the floor.",
    executionInstructions: [
      "Step feet 3 to 4 feet apart with heels aligned.",
      "Turn right foot outward 90 degrees and back foot slightly inward.",
      "Bend right knee directly above right ankle, tracking toward the second toe.",
      "Extend arms out wide at shoulder height, palms facing down.",
      "Gaze softly past your front fingertips with shoulders relaxed."
    ],
    focusAreas: ["front knee alignment", "arm horizontal plane", "torso verticality", "hip opening"],
    keyAlignmentPoints: [
      "Front knee bent at 90 degrees and stacked directly over ankle",
      "Back leg fully straight and grounded firmly through outer edge of foot",
      "Torso centered upright between hips, not leaning forward",
      "Both arms parallel to the floor at shoulder level"
    ],
    relevantJoints: [
      "left_knee", "right_knee", "left_hip", "right_hip", "left_shoulder", "right_shoulder", "left_elbow", "right_elbow"
    ],
    requiredRegions: ["torso", "legs", "arms", "feet"],
    poseRules: warriorIIRules,
    alignmentCues: [
      {
        ruleId: "warrior-ii-left-knee-angle",
        joint: "Front Knee",
        commonMistake: "Front knee collapsing inward or not bending deeply enough.",
        correctionText: "Bend your front knee directly over your ankle, aiming for a 90-degree angle.",
        progressionText: "Keep that front knee stacked and pressing outward.",
        resolvedText: "Front knee alignment looks great."
      },
      {
        ruleId: "warrior-ii-shoulder-alignment",
        joint: "Shoulders / Arms",
        commonMistake: "Arms drooping below shoulder height or shoulders hunching toward ears.",
        correctionText: "Lift your arms until they are parallel with the floor.",
        progressionText: "Reach actively through both fingertips at shoulder height.",
        resolvedText: "Arms and shoulders are level."
      },
      {
        ruleId: "warrior-ii-hip-alignment",
        joint: "Hips & Torso",
        commonMistake: "Torso leaning forward over the front thigh.",
        correctionText: "Lengthen your spine and keep your chest lifted.",
        progressionText: "Maintain an upright torso centered between your legs.",
        resolvedText: "Torso is beautifully centered."
      }
    ],
    corrections: [
      {
        ruleId: "warrior-ii-left-knee-angle",
        joint: "Front Knee",
        commonMistake: "Front knee collapsing inward or not bending deeply enough.",
        correctionText: "Bend your front knee directly over your ankle, aiming for a 90-degree angle.",
        progressionText: "Keep that front knee stacked and pressing outward.",
        resolvedText: "Front knee alignment looks great."
      },
      {
        ruleId: "warrior-ii-shoulder-alignment",
        joint: "Shoulders / Arms",
        commonMistake: "Arms drooping below shoulder height or shoulders hunching toward ears.",
        correctionText: "Lift your arms until they are parallel with the floor.",
        progressionText: "Reach actively through both fingertips at shoulder height.",
        resolvedText: "Arms and shoulders are level."
      },
      {
        ruleId: "warrior-ii-hip-alignment",
        joint: "Hips & Torso",
        commonMistake: "Torso leaning forward over the front thigh.",
        correctionText: "Lengthen your spine and keep your chest lifted.",
        progressionText: "Maintain an upright torso centered between your legs.",
        resolvedText: "Torso is beautifully centered."
      }
    ],
    goodFormAffirmation: "Strong Warrior II. Keep your gaze steady and breathe.",
    holdMindfulnessCue: "Stay strong and keep your gaze steady.",
    completionCue: "Straighten your front leg and step your feet together.",
    successFeedback: [
      "Solid Warrior II! Your foundation is grounded and strong.",
      "Beautiful alignment. Gaze steadily forward and breathe smoothly."
    ],
    voiceGuidance: {
      entryPrompt: "Step wide, turn your front foot out, bend your front knee, and extend your arms.",
      calibrationPrompt: "Hold your Warrior II foundation steady while I scan your alignment.",
      holdPrompt: "Strong foundation. Settle into the hips, soften your shoulders, and breathe.",
      completionPrompt: "Wonderful Warrior II! Straighten your front leg and release your arms.",
      mindfulnessPrompt: "Find ease in your shoulders while maintaining power through your legs."
    },
    isComplete: true
  },

  "tadasana": {
    asanaId: "tadasana",
    asanaName: "Mountain Pose",
    sanskritName: "Tādāsana",
    category: "standing",
    difficulty: "beginner",
    stance: "standing",
    startingPosition: "standing",
    movementType: "static_hold",
    entryCue: "Stand tall with your feet grounded hip-width apart, lengthen your spine, and relax your arms beside you.",
    entryInstruction: "Stand tall with your feet grounded hip-width apart, lengthen your spine, and relax your arms beside you.",
    executionInstructions: [
      "Stand with feet parallel, either touching or hip-width apart.",
      "Distribute weight evenly across the balls and heels of both feet.",
      "Engage quadriceps and lift kneecaps gently without hyperextending.",
      "Draw tailbone down and lengthen spine upward through crown of head.",
      "Broaden collarbones and let arms rest at sides with palms forward."
    ],
    focusAreas: ["even weight distribution", "tall spine", "relaxed shoulders", "neutral pelvis"],
    keyAlignmentPoints: [
      "Even weight distribution through both feet",
      "Spine long with neutral pelvic tilt",
      "Shoulders stacked above hips and relaxed away from ears",
      "Chin parallel to the floor with relaxed facial muscles"
    ],
    relevantJoints: ["left_knee", "right_knee", "left_hip", "right_hip", "spine", "left_shoulder", "right_shoulder"],
    requiredRegions: ["torso", "legs", "feet", "head"],
    poseRules: mountainPose.rules,
    alignmentCues: [
      {
        ruleId: "tadasana-shoulder-level",
        joint: "Shoulders",
        commonMistake: "Shoulders rolled forward or hunched upward.",
        correctionText: "Roll your shoulders back and down, opening your chest gently.",
        progressionText: "Keep your chest open and shoulders level.",
        resolvedText: "Shoulders are beautifully relaxed and aligned."
      },
      {
        ruleId: "tadasana-hip-level",
        joint: "Hips & Pelvis",
        commonMistake: "Excessive anterior pelvic tilt or leaning to one side.",
        correctionText: "Engage your core lightly and balance your weight equally on both feet.",
        progressionText: "Ground down evenly through both heels.",
        resolvedText: "Pelvis and hips are stable."
      }
    ],
    corrections: [
      {
        ruleId: "tadasana-shoulder-level",
        joint: "Shoulders",
        commonMistake: "Shoulders rolled forward or hunched upward.",
        correctionText: "Roll your shoulders back and down, opening your chest gently.",
        progressionText: "Keep your chest open and shoulders level.",
        resolvedText: "Shoulders are beautifully relaxed and aligned."
      },
      {
        ruleId: "tadasana-hip-level",
        joint: "Hips & Pelvis",
        commonMistake: "Excessive anterior pelvic tilt or leaning to one side.",
        correctionText: "Engage your core lightly and balance your weight equally on both feet.",
        progressionText: "Ground down evenly through both heels.",
        resolvedText: "Pelvis and hips are stable."
      }
    ],
    goodFormAffirmation: "Tall, grounded Mountain Pose. Feel the steady stillness in your posture.",
    holdMindfulnessCue: "Feel your steady foundation. Relax your shoulders and breathe deeply.",
    completionCue: "Release the posture gently and soften your breath.",
    successFeedback: [
      "Perfect Mountain Pose. Tall, grounded, and aligned.",
      "Excellent posture. Feel the length through your entire spine."
    ],
    voiceGuidance: {
      entryPrompt: "Stand tall, ground your feet firmly, and lengthen upward through your spine.",
      calibrationPrompt: "Stand still and tall while I calibrate your posture.",
      holdPrompt: "Feel your steady foundation. Relax your shoulders and breathe deeply.",
      completionPrompt: "Great posture awareness. Gently release and soften your breath.",
      mindfulnessPrompt: "Notice the balance of grounding down into the earth while rising tall."
    },
    isComplete: true
  },

  "vrksasana": {
    asanaId: "vrksasana",
    asanaName: "Tree Pose",
    sanskritName: "Vṛkṣāsana",
    category: "balancing",
    difficulty: "beginner",
    stance: "standing",
    startingPosition: "standing",
    movementType: "balance_stabilization",
    entryCue: "Shift weight onto your standing foot, place the other sole against your inner calf or thigh, and bring hands to heart center.",
    entryInstruction: "Shift weight onto your standing foot, place the other sole against your inner calf or thigh, and bring hands to heart center.",
    executionInstructions: [
      "Root down firmly through all four corners of your standing foot.",
      "Lift the opposite foot and place the sole on your inner thigh or calf (avoid the knee joint).",
      "Press the foot and standing leg actively into each other.",
      "Bring hands together in prayer position at your chest or reach upward.",
      "Fix your gaze on a non-moving point in front of you."
    ],
    focusAreas: ["standing leg stability", "hip squaring", "knee safety", "focal point gaze"],
    keyAlignmentPoints: [
      "Foot placed on inner thigh or calf, never on the side of the knee",
      "Standing leg strong with a subtle micro-bend to avoid joint locking",
      "Hips level and squared forward",
      "Spine tall and crown reaching upward"
    ],
    relevantJoints: ["left_ankle", "right_ankle", "left_knee", "right_knee", "left_hip", "right_hip", "spine"],
    requiredRegions: ["torso", "legs", "feet"],
    poseRules: treePose.rules,
    alignmentCues: [
      {
        ruleId: "vrksasana-hip-level",
        joint: "Hips",
        commonMistake: "Hip of the standing leg hitching outward.",
        correctionText: "Draw your standing hip in and keep your hips squared and level.",
        progressionText: "Maintain level hips and engage your standing glute.",
        resolvedText: "Hips are squared and balanced."
      },
      {
        ruleId: "vrksasana-knee-safety",
        joint: "Knee / Foot Placement",
        commonMistake: "Sole pressing directly against the side of the standing knee joint.",
        correctionText: "Place your foot on your inner calf or inner thigh, avoiding the knee joint.",
        progressionText: "Protect your knee by pressing foot against inner thigh or calf.",
        resolvedText: "Foot placement is safe and secure."
      }
    ],
    corrections: [
      {
        ruleId: "vrksasana-hip-level",
        joint: "Hips",
        commonMistake: "Hip of the standing leg hitching outward.",
        correctionText: "Draw your standing hip in and keep your hips squared and level.",
        progressionText: "Maintain level hips and engage your standing glute.",
        resolvedText: "Hips are squared and balanced."
      },
      {
        ruleId: "vrksasana-knee-safety",
        joint: "Knee / Foot Placement",
        commonMistake: "Sole pressing directly against the side of the standing knee joint.",
        correctionText: "Place your foot on your inner calf or inner thigh, avoiding the knee joint.",
        progressionText: "Protect your knee by pressing foot against inner thigh or calf.",
        resolvedText: "Foot placement is safe and secure."
      }
    ],
    goodFormAffirmation: "Beautiful Tree Pose balance. Steady and rooted through your foundation.",
    holdMindfulnessCue: "Root firmly into the earth. Lengthen your spine and breathe calmly.",
    completionCue: "Lower your foot gently to the mat and return to standing.",
    successFeedback: [
      "Beautiful balance! Steady and rooted like a tree.",
      "Great focus and stability in Tree Pose."
    ],
    voiceGuidance: {
      entryPrompt: "Shift your weight to one foot, place the other sole on your inner leg, and find your focal point.",
      calibrationPrompt: "Find your steady balance point while I scan your form.",
      holdPrompt: "Root firmly into the earth. Lengthen your spine and breathe calmly.",
      completionPrompt: "Wonderful balance! Lower your foot down and return to standing.",
      mindfulnessPrompt: "Smooth out your breath to find stillness in the balance."
    },
    isComplete: true
  },

  "adho-mukha-svanasana": {
    asanaId: "adho-mukha-svanasana",
    asanaName: "Downward-Facing Dog",
    sanskritName: "Adho Mukha Śvānāsana",
    category: "inversion",
    difficulty: "beginner",
    stance: "inverted",
    startingPosition: "inverted",
    movementType: "inversion_inversion",
    entryCue: "Start on all fours, tuck your toes, lift your hips high, and press your chest gently toward your thighs.",
    entryInstruction: "Start on all fours, tuck your toes, lift your hips high, and press your chest gently toward your thighs.",
    executionInstructions: [
      "Start on hands and knees with wrists under shoulders and knees under hips.",
      "Spread fingers wide and press through your knuckles and palms.",
      "Tuck toes and lift knees off the floor, sending sitting bones up and back.",
      "Lengthen your spine; keep knees slightly bent if hamstrings are tight.",
      "Let head hang naturally with ears between upper arms."
    ],
    focusAreas: ["spine elongation", "palm grounding", "shoulder width", "hip lift"],
    keyAlignmentPoints: [
      "Spine completely elongated in an inverted V-shape",
      "Palms grounded with index fingers pointing forward",
      "Shoulders broad and rotated away from ears",
      "Sitting bones reaching high toward the ceiling"
    ],
    relevantJoints: ["left_wrist", "right_wrist", "left_shoulder", "right_shoulder", "spine", "left_hip", "right_hip", "left_knee", "right_knee"],
    requiredRegions: ["torso", "arms", "legs"],
    poseRules: downwardDogPose.rules,
    alignmentCues: [
      {
        ruleId: "downward-dog.hips.inverted_v",
        joint: "Spine & Hips",
        commonMistake: "Rounding the lower back to force heels to the floor.",
        correctionText: "Bend your knees slightly and push your hips up and back to lengthen your spine.",
        progressionText: "Prioritize a straight spine over straight legs.",
        resolvedText: "Spine is long and decompressed."
      },
      {
        ruleId: "downward-dog.arms.extension",
        joint: "Shoulders & Arms",
        commonMistake: "Collapsing shoulders toward the neck or bending elbows.",
        correctionText: "Press firmly through your palms and broaden across your upper back.",
        progressionText: "Keep shoulders wide and relaxed away from ears.",
        resolvedText: "Upper back and shoulders are broad."
      }
    ],
    corrections: [
      {
        ruleId: "downward-dog.hips.inverted_v",
        joint: "Spine & Hips",
        commonMistake: "Rounding the lower back to force heels to the floor.",
        correctionText: "Bend your knees slightly and push your hips up and back to lengthen your spine.",
        progressionText: "Prioritize a straight spine over straight legs.",
        resolvedText: "Spine is long and decompressed."
      },
      {
        ruleId: "downward-dog.arms.extension",
        joint: "Shoulders & Arms",
        commonMistake: "Collapsing shoulders toward the neck or bending elbows.",
        correctionText: "Press firmly through your palms and broaden across your upper back.",
        progressionText: "Keep shoulders wide and relaxed away from ears.",
        resolvedText: "Upper back and shoulders are broad."
      }
    ],
    goodFormAffirmation: "Excellent Downward Dog. Spine is long and spacious.",
    holdMindfulnessCue: "Press through your hands, reach your hips high, and let your head relax.",
    completionCue: "Lower your knees gently to the mat and rest.",
    successFeedback: [
      "Excellent Downward Dog. Spine is long and spacious.",
      "Great inverted alignment. Keep pressing through the hands."
    ],
    voiceGuidance: {
      entryPrompt: "From hands and knees, tuck your toes, lift your hips up and back, and lengthen your spine.",
      calibrationPrompt: "Hold your inverted V-shape while I verify your alignment.",
      holdPrompt: "Press through your hands, reach your hips high, and let your head relax.",
      completionPrompt: "Great hold! Lower your knees gently to the mat.",
      mindfulnessPrompt: "Deepen your exhalations and feel your spine decompress."
    },
    isComplete: true
  },

  "bhujangasana": {
    asanaId: "bhujangasana",
    asanaName: "Cobra Pose",
    sanskritName: "Bhujaṅgāsana",
    category: "backbend",
    difficulty: "beginner",
    stance: "prone",
    startingPosition: "prone",
    movementType: "backbend_extension",
    entryCue: "Lie on your stomach and place your hands beneath your shoulders.",
    entryInstruction: "Lie flat on your stomach, place hands beneath your shoulders, draw elbows close to your ribs, and gently lift your chest.",
    executionInstructions: [
      "Lie prone on the floor with tops of feet flat on the mat.",
      "Place palms flat on the mat under your shoulders, hugging elbows into your sides.",
      "Press the tops of your feet and pubic bone firmly into the floor.",
      "Inhale and lift your chest off the mat using your back muscles.",
      "Keep neck long and gaze forward and slightly down."
    ],
    focusAreas: ["chest lift", "elbow tuck", "shoulder depression", "pelvic grounding"],
    keyAlignmentPoints: [
      "Elbows bent and kept close to the ribs, not splayed out",
      "Chest lifted by back strength rather than pushing solely with arms",
      "Shoulders drawn back and down away from the ears",
      "Tops of feet and pelvis grounded into the floor"
    ],
    relevantJoints: ["left_elbow", "right_elbow", "left_shoulder", "right_shoulder", "spine", "left_hip", "right_hip"],
    requiredRegions: ["torso", "arms", "head"],
    poseRules: bhujangasanaPose.rules,
    alignmentCues: [
      {
        ruleId: "bhujangasana.elbows.tuck",
        joint: "Elbows",
        commonMistake: "Elbows flaring outward or locking straight.",
        correctionText: "Keep a soft bend in your elbows and hug them close to your ribcage.",
        progressionText: "Draw your elbows toward your waist.",
        resolvedText: "Elbows are neatly tucked."
      },
      {
        ruleId: "bhujangasana.shoulders.level",
        joint: "Shoulders & Neck",
        commonMistake: "Crunching neck or shrugging shoulders to ears.",
        correctionText: "Roll your shoulders down away from your ears and lengthen the back of your neck.",
        progressionText: "Broaden your collarbones and soften your neck.",
        resolvedText: "Neck and shoulders look great."
      },
      {
        ruleId: "bhujangasana.chest.lift",
        joint: "Chest & Spine",
        commonMistake: "Lifting with shoulders instead of engaging back muscles.",
        correctionText: "Lift your chest off the mat using your back muscles while keeping your hips grounded.",
        progressionText: "Keep your pelvis grounded into the mat.",
        resolvedText: "Spinal extension looks beautiful."
      }
    ],
    corrections: [
      {
        ruleId: "bhujangasana.elbows.tuck",
        joint: "Elbows",
        commonMistake: "Elbows flaring outward or locking straight.",
        correctionText: "Keep a soft bend in your elbows and hug them close to your ribcage.",
        progressionText: "Draw your elbows toward your waist.",
        resolvedText: "Elbows are neatly tucked."
      },
      {
        ruleId: "bhujangasana.shoulders.level",
        joint: "Shoulders & Neck",
        commonMistake: "Crunching neck or shrugging shoulders to ears.",
        correctionText: "Roll your shoulders down away from your ears and lengthen the back of your neck.",
        progressionText: "Broaden your collarbones and soften your neck.",
        resolvedText: "Neck and shoulders look great."
      },
      {
        ruleId: "bhujangasana.chest.lift",
        joint: "Chest & Spine",
        commonMistake: "Lifting with shoulders instead of engaging back muscles.",
        correctionText: "Lift your chest off the mat using your back muscles while keeping your hips grounded.",
        progressionText: "Keep your pelvis grounded into the mat.",
        resolvedText: "Spinal extension looks beautiful."
      }
    ],
    goodFormAffirmation: "Beautiful chest lift. Keep your shoulders relaxed.",
    holdMindfulnessCue: "Relax your shoulders and breathe.",
    completionCue: "Lower gently to the mat and relax your shoulders.",
    successFeedback: [
      "Beautiful Cobra Pose! Chest is open and spine is supple.",
      "Wonderful back extension with grounded foundation."
    ],
    voiceGuidance: {
      entryPrompt: "Lie on your stomach, place hands under shoulders, hug elbows in, and lift your chest.",
      calibrationPrompt: "Hold your gentle lift while I check your back alignment.",
      holdPrompt: "Breathe into your chest. Keep your shoulders down and neck long.",
      completionPrompt: "Gently lower your chest back down to the mat and rest.",
      mindfulnessPrompt: "Expand your ribcage with each breath while keeping your lower body grounded."
    },
    isComplete: true
  },

  "padmasana": {
    asanaId: "padmasana",
    asanaName: "Lotus Pose",
    sanskritName: "Padmāsana",
    category: "seated",
    difficulty: "advanced",
    stance: "seated",
    startingPosition: "seated",
    movementType: "static_hold",
    entryCue: "Sit comfortably and lengthen your spine upward.",
    entryInstruction: "Sit comfortably on the floor with legs crossed, rest your hands on your knees, and lengthen your spine tall.",
    executionInstructions: [
      "Sit on the floor with legs extended forward.",
      "Bend right knee and cradle foot into left hip crease with sole facing up.",
      "Bend left knee and cross foot over right shin into right hip crease.",
      "Rest hands on knees in Jnana mudra (thumb and index finger touching).",
      "Keep spine tall, shoulders relaxed, and chin level."
    ],
    focusAreas: ["sitting bones grounding", "spine verticality", "shoulder relaxation", "relaxed breathing"],
    keyAlignmentPoints: [
      "Pelvis grounded evenly on both sitting bones",
      "Spine long without slouching or excessive arching",
      "Shoulders relaxed directly over hips",
      "Knees resting comfortably near or on the floor without pain"
    ],
    relevantJoints: ["left_knee", "right_knee", "left_hip", "right_hip", "spine", "left_shoulder", "right_shoulder"],
    requiredRegions: ["torso", "legs", "head"],
    poseRules: padmasanaPose.rules,
    alignmentCues: [
      {
        ruleId: "padmasana.spine.vertical",
        joint: "Spine",
        commonMistake: "Slouching or rounding the lower back.",
        correctionText: "Lengthen your spine and keep your chest lifted.",
        progressionText: "Lift through the crown of your head.",
        resolvedText: "Spine is tall and centered."
      },
      {
        ruleId: "padmasana.shoulders.level",
        joint: "Shoulders",
        commonMistake: "Tension in shoulders and upper traps.",
        correctionText: "Release your shoulders down and let your hands rest gently on your knees.",
        progressionText: "Relax your upper body and breathe calmly.",
        resolvedText: "Shoulders are relaxed."
      }
    ],
    corrections: [
      {
        ruleId: "padmasana.spine.vertical",
        joint: "Spine",
        commonMistake: "Slouching or rounding the lower back.",
        correctionText: "Lengthen your spine and keep your chest lifted.",
        progressionText: "Lift through the crown of your head.",
        resolvedText: "Spine is tall and centered."
      },
      {
        ruleId: "padmasana.shoulders.level",
        joint: "Shoulders",
        commonMistake: "Tension in shoulders and upper traps.",
        correctionText: "Release your shoulders down and let your hands rest gently on your knees.",
        progressionText: "Relax your upper body and breathe calmly.",
        resolvedText: "Shoulders are relaxed."
      }
    ],
    goodFormAffirmation: "Serene Lotus Pose. Balanced, grounded, and centered.",
    holdMindfulnessCue: "Maintain your upright spine. Soften your breath and find stillness.",
    completionCue: "Gently uncross your legs and release your seat.",
    successFeedback: [
      "Serene Lotus Pose. Balanced, grounded, and centered.",
      "Beautiful posture. Feel the natural stillness in your seat."
    ],
    voiceGuidance: {
      entryPrompt: "Sit comfortably with your legs crossed, lengthen your spine, and rest your hands on your knees.",
      calibrationPrompt: "Sit tall and still while I check your alignment.",
      holdPrompt: "Maintain your upright spine. Soften your breath and find stillness.",
      completionPrompt: "Gently uncross your legs and release your seat.",
      mindfulnessPrompt: "Notice the steady stillness of your seated foundation."
    },
    isComplete: true
  },

  "setu-bandhasana": {
    asanaId: "setu-bandhasana",
    asanaName: "Bridge Pose",
    sanskritName: "Setu Bandhāsana",
    category: "backbend",
    difficulty: "beginner",
    stance: "supine",
    startingPosition: "supine",
    movementType: "backbend_extension",
    entryCue: "Lie on your back and place your feet firmly on the mat.",
    entryInstruction: "Lie on your back with knees bent and feet flat, press through your heels, and lift your hips toward the ceiling.",
    executionInstructions: [
      "Lie supine on your mat with knees bent and feet hip-width apart.",
      "Walk heels close to your sitting bones so fingers can graze heels.",
      "Press feet and arms firmly into the mat as you exhale.",
      "Lift hips toward the ceiling, rolling shoulders underneath your chest.",
      "Keep thighs parallel and knees stacked over ankles."
    ],
    focusAreas: ["heel drive", "hip elevation", "knee parallel tracking", "chest opening"],
    keyAlignmentPoints: [
      "Knees parallel and directly above ankles (not splaying outward)",
      "Hips lifted by pressing through heels and engaging glutes/hamstrings",
      "Chest lifting toward chin without turning head",
      "Neck relaxed with neutral cervical curve"
    ],
    relevantJoints: ["left_knee", "right_knee", "left_hip", "right_hip", "spine", "left_shoulder", "right_shoulder"],
    requiredRegions: ["torso", "legs", "arms"],
    poseRules: setuBandhasanaPose.rules,
    alignmentCues: [
      {
        ruleId: "bridge.left_knee.angle",
        joint: "Knees & Thighs",
        commonMistake: "Knees splaying wide apart during the lift.",
        correctionText: "Keep your thighs parallel and track your knees directly over your ankles.",
        progressionText: "Gently squeeze an imaginary block between your inner thighs.",
        resolvedText: "Thighs and knees are parallel."
      },
      {
        ruleId: "bridge.hips.lift",
        joint: "Hips",
        commonMistake: "Hips sagging toward the floor.",
        correctionText: "Press firmly through your heels and lift your hips higher.",
        progressionText: "Engage your glutes and lift your pelvis upward.",
        resolvedText: "Hips are lifted and strong."
      }
    ],
    corrections: [
      {
        ruleId: "bridge.left_knee.angle",
        joint: "Knees & Thighs",
        commonMistake: "Knees splaying wide apart during the lift.",
        correctionText: "Keep your thighs parallel and track your knees directly over your ankles.",
        progressionText: "Gently squeeze an imaginary block between your inner thighs.",
        resolvedText: "Thighs and knees are parallel."
      },
      {
        ruleId: "bridge.hips.lift",
        joint: "Hips",
        commonMistake: "Hips sagging toward the floor.",
        correctionText: "Press firmly through your heels and lift your hips higher.",
        progressionText: "Engage your glutes and lift your pelvis upward.",
        resolvedText: "Hips are lifted and strong."
      }
    ],
    goodFormAffirmation: "Strong bridge. Keep your knees parallel and breathe.",
    holdMindfulnessCue: "Keep breathing steadily.",
    completionCue: "Lower your hips slowly back to the mat.",
    successFeedback: [
      "Strong Bridge Pose! Hips are high and chest is open.",
      "Great hip extension and grounded foundation."
    ],
    voiceGuidance: {
      entryPrompt: "Lie on your back with knees bent, press your feet down, and lift your hips toward the ceiling.",
      calibrationPrompt: "Hold your bridge lift steady while I verify your form.",
      holdPrompt: "Press through your heels, open your chest, and breathe smoothly.",
      completionPrompt: "Slowly lower your spine down one vertebra at a time.",
      mindfulnessPrompt: "Feel the opening across your chest and the strength in your legs."
    },
    isComplete: true
  },

  "chaturanga-dandasana": {
    asanaId: "chaturanga-dandasana",
    asanaName: "Four-Limbed Staff Pose",
    sanskritName: "Caturaṅga Daṇḍāsana",
    category: "core",
    difficulty: "intermediate",
    stance: "plank",
    startingPosition: "plank",
    movementType: "core_engagement",
    entryCue: "From high plank, shift slightly forward and lower your body until your elbows form a 90-degree angle hugging your ribs.",
    entryInstruction: "From high plank, shift slightly forward and lower your body until your elbows form a 90-degree angle hugging your ribs.",
    executionInstructions: [
      "Begin in a firm high plank position with shoulders over wrists.",
      "Shift forward onto the tips of your toes.",
      "Exhale and bend elbows straight back, keeping them close to your ribcage.",
      "Lower until upper arms are parallel to the floor (elbows at 90 degrees).",
      "Maintain a straight line from heels through the crown of your head."
    ],
    focusAreas: ["elbow 90-degree angle", "core plank line", "shoulder elevation", "forearm verticality"],
    keyAlignmentPoints: [
      "Elbows bent at 90 degrees and hugging the ribs, not splaying",
      "Body in one straight horizontal plane without sagging hips",
      "Shoulders level with or above elbows, never dipping below",
      "Core firmly engaged and neck in neutral alignment"
    ],
    relevantJoints: ["left_wrist", "right_wrist", "left_elbow", "right_elbow", "left_shoulder", "right_shoulder", "spine", "left_hip", "right_hip"],
    requiredRegions: ["torso", "arms", "legs"],
    poseRules: chaturangaPose.rules,
    alignmentCues: [
      {
        ruleId: "chaturanga.left_elbow.angle",
        joint: "Elbows",
        commonMistake: "Dipping shoulders lower than elbows or splaying elbows wide.",
        correctionText: "Keep elbows at 90 degrees hugged tight against your ribs.",
        progressionText: "Do not let your shoulders drop below your elbows.",
        resolvedText: "Elbow angle and alignment is solid."
      },
      {
        ruleId: "chaturanga.body.line",
        joint: "Hips & Core",
        commonMistake: "Hips sagging toward the mat or piking upward.",
        correctionText: "Engage your core firmly to keep your body in a straight plank line.",
        progressionText: "Lift through your belly button and maintain a straight line.",
        resolvedText: "Core is strong and flat."
      }
    ],
    corrections: [
      {
        ruleId: "chaturanga.left_elbow.angle",
        joint: "Elbows",
        commonMistake: "Dipping shoulders lower than elbows or splaying elbows wide.",
        correctionText: "Keep elbows at 90 degrees hugged tight against your ribs.",
        progressionText: "Do not let your shoulders drop below your elbows.",
        resolvedText: "Elbow angle and alignment is solid."
      },
      {
        ruleId: "chaturanga.body.line",
        joint: "Hips & Core",
        commonMistake: "Hips sagging toward the mat or piking upward.",
        correctionText: "Engage your core firmly to keep your body in a straight plank line.",
        progressionText: "Lift through your belly button and maintain a straight line.",
        resolvedText: "Core is strong and flat."
      }
    ],
    goodFormAffirmation: "Incredible strength in Chaturanga! Form is crisp and solid.",
    holdMindfulnessCue: "Engage your core, keep elbows tucked, and hold strong.",
    completionCue: "Press back up or lower softly to the mat and rest.",
    successFeedback: [
      "Incredible strength in Chaturanga! Form is crisp and solid.",
      "Rock-solid core stability and arm alignment."
    ],
    voiceGuidance: {
      entryPrompt: "From plank, shift forward and lower halfway with elbows bent at 90 degrees hugging your ribs.",
      calibrationPrompt: "Hold your strong plank shape while I scan your alignment.",
      holdPrompt: "Engage your core, keep elbows tucked, and hold strong.",
      completionPrompt: "Excellent strength! Press back up or lower softly to the mat.",
      mindfulnessPrompt: "Channel power from your core through your heels and hands."
    },
    isComplete: true
  },

  "balasana": {
    asanaId: "balasana",
    asanaName: "Child's Pose",
    sanskritName: "Bālāsana",
    category: "restorative",
    difficulty: "beginner",
    stance: "kneeling",
    startingPosition: "kneeling",
    movementType: "restorative_rest",
    entryCue: "Kneel down and gently fold your hips toward your heels.",
    entryInstruction: "Kneel on the floor, bring big toes together, sit hips onto your heels, and fold your torso forward resting your forehead down.",
    executionInstructions: [
      "Kneel with knees hip-width or wide, big toes touching.",
      "Sit hips back onto your heels.",
      "Exhale and fold torso forward between thighs, resting forehead on mat.",
      "Extend arms forward with palms down, or rest arms back alongside hips.",
      "Allow entire back body to relax and breathe deeply into your ribs."
    ],
    focusAreas: ["hip release to heels", "relaxed spine", "forehead grounding", "soft shoulders"],
    keyAlignmentPoints: [
      "Hips settling back toward heels",
      "Forehead supported on mat or block with neck relaxed",
      "Spine rounded in gentle restorative flexion",
      "Shoulders and arms soft and tension-free"
    ],
    relevantJoints: ["left_knee", "right_knee", "left_hip", "right_hip", "spine", "left_shoulder", "right_shoulder"],
    requiredRegions: ["torso", "legs", "head"],
    poseRules: balasanaPose.rules,
    alignmentCues: [
      {
        ruleId: "balasana.hip.flexion",
        joint: "Hips & Spine",
        commonMistake: "Hips floating high off heels due to tight hips or ankles.",
        correctionText: "Sink your hips gently back toward your heels and soften your back.",
        progressionText: "Let gravity draw your hips down and rest your forehead.",
        resolvedText: "Restorative alignment achieved."
      }
    ],
    corrections: [
      {
        ruleId: "balasana.hip.flexion",
        joint: "Hips & Spine",
        commonMistake: "Hips floating high off heels due to tight hips or ankles.",
        correctionText: "Sink your hips gently back toward your heels and soften your back.",
        progressionText: "Let gravity draw your hips down and rest your forehead.",
        resolvedText: "Restorative alignment achieved."
      }
    ],
    goodFormAffirmation: "Relax into the pose and breathe steadily.",
    holdMindfulnessCue: "Let your hips sink back. Soften your shoulders and take deep, soothing breaths.",
    completionCue: "Gently press through your hands and slowly rise back up.",
    successFeedback: [
      "Peaceful Child's Pose. Rest, decompress, and breathe.",
      "Deep restorative posture. Allow your body to release tension."
    ],
    voiceGuidance: {
      entryPrompt: "Kneel, sit back on your heels, fold forward, and rest your forehead on the mat.",
      calibrationPrompt: "Rest still while I observe your relaxation posture.",
      holdPrompt: "Let your hips sink back. Soften your shoulders and take deep, soothing breaths.",
      completionPrompt: "Gently press through your hands and slowly rise back up.",
      mindfulnessPrompt: "Feel the rhythmic rise and fall of your breath against your thighs."
    },
    isComplete: true
  }
};

/**
 * Infers physical starting position / stance from asana category, Sanskrit name, and slug across all 10 stances.
 */
export function inferStartingPosition(slugOrId: string, category?: string, sanskritName?: string): AsanaStartingStance {
  const normCategory = (category || "").toLowerCase();
  const text = `${slugOrId} ${sanskritName || ""}`.toLowerCase();

  // 1. Direct Category Precedence
  if (normCategory === "seated") return "seated";
  if (normCategory === "kneeling") return "kneeling";
  if (normCategory === "arm_balance") return "arm_balance";

  // 2. Arm Balances
  if (
    text.includes("bakasana") ||
    text.includes("kakasana") ||
    text.includes("crow") ||
    text.includes("crane") ||
    text.includes("mayurasana") ||
    text.includes("peacock") ||
    text.includes("astavakrasana") ||
    text.includes("eight-angle") ||
    text.includes("tittibhasana") ||
    text.includes("firefly") ||
    text.includes("tolasana") ||
    text.includes("scale") ||
    text.includes("lolasana") ||
    text.includes("pendant") ||
    text.includes("koundinya") ||
    text.includes("visvamitrasana") ||
    text.includes("bhujapidasana") ||
    text.includes("shoulder-pressing") ||
    text.includes("flying")
  ) {
    return "arm_balance";
  }

  // 3. Inversions
  if (
    text.includes("adho mukha svanasana") ||
    text.includes("downward") ||
    text.includes("sirsa") ||
    text.includes("headstand") ||
    text.includes("sarvang") ||
    text.includes("shoulderstand") ||
    text.includes("halasana") ||
    text.includes("plow") ||
    text.includes("pincha") ||
    text.includes("handstand") ||
    text.includes("adho-mukha-vrksasana") ||
    text.includes("viparita") ||
    text.includes("vrschika") ||
    text.includes("scorpion") ||
    normCategory === "inversion"
  ) {
    return "inverted";
  }

  // 4. Supine (Lying on Back)
  if (
    text.includes("supta") ||
    text.includes("corpse") ||
    text.includes("savasana") ||
    text.includes("bridge") ||
    text.includes("matsyasana") ||
    text.includes("reclining") ||
    text.includes("setu") ||
    text.includes("ananda balasana") ||
    text.includes("happy-baby") ||
    text.includes("pawanmukta") ||
    text.includes("wind-relieving") ||
    text.includes("fish") ||
    text.includes("chakrasana") ||
    text.includes("wheel") ||
    text.includes("urdhva-dhanurasana")
  ) {
    return "supine";
  }

  // 5. Prone (Lying on Stomach / Belly)
  if (
    (text.includes("dhanurasana") && !text.includes("akarna")) ||
    text.includes("bhujanga") ||
    text.includes("salabha") ||
    text.includes("locust") ||
    text.includes("cobra") ||
    text.includes("sphinx") ||
    text.includes("makarasana") ||
    text.includes("crocodile") ||
    text.includes("bow")
  ) {
    return "prone";
  }

  // 6. All Fours / Quadruped Tabletop
  if (
    text.includes("marjary") ||
    text.includes("bitil") ||
    text.includes("cat") ||
    text.includes("cow") ||
    text.includes("chakravak") ||
    text.includes("tabletop") ||
    text.includes("bird-dog")
  ) {
    return "all_fours";
  }

  // 7. Plank Support
  if (
    text.includes("chaturanga") ||
    text.includes("plank") ||
    text.includes("phalak") ||
    text.includes("vasistha")
  ) {
    return "plank";
  }

  // 8. Kneeling
  if (
    text.includes("ustrasana") ||
    text.includes("camel") ||
    text.includes("vajrasana") ||
    text.includes("thunderbolt") ||
    text.includes("balasana") ||
    text.includes("child") ||
    text.includes("hero") ||
    text.includes("virasana") ||
    text.includes("parighasana") ||
    text.includes("gate")
  ) {
    return "kneeling";
  }

  // 9. Standing Forward / Side Bends
  if (
    text.includes("uttanasana") ||
    text.includes("forward-bend") ||
    text.includes("forward fold") ||
    text.includes("padangustha") ||
    text.includes("prasarita") ||
    text.includes("padahastasana") ||
    text.includes("standing-split")
  ) {
    return "bending";
  }

  // 10. Seated
  if (
    text.includes("seated") ||
    text.includes("padma") ||
    text.includes("sukhasana") ||
    text.includes("baddha") ||
    text.includes("paschimottan") ||
    text.includes("gomukhasana") ||
    text.includes("janu") ||
    text.includes("dandasana") ||
    text.includes("staff") ||
    text.includes("akarna") ||
    text.includes("marichi") ||
    text.includes("matsyendra") ||
    text.includes("navasana") ||
    text.includes("boat") ||
    text.includes("krounchasana") ||
    text.includes("heron")
  ) {
    return "seated";
  }

  // 11. Standing (Default)
  return "standing";
}

/**
 * Infers movement type from starting position, category, and slug.
 */
export function inferMovementType(category?: string, stance?: StartingPosition, slugOrId?: string): MovementType {
  const text = `${slugOrId || ""} ${category || ""} ${stance || ""}`.toLowerCase();
  if (text.includes("twist") || text.includes("matsyendra") || text.includes("parivrtta")) return "spinal_twist";
  if (text.includes("bend") && (stance === "bending" || text.includes("forward") || text.includes("uttan") || text.includes("paschim"))) return "forward_fold";
  if (stance === "prone" || text.includes("backbend") || text.includes("bhujanga") || text.includes("ustra") || text.includes("setu")) return "backbend_extension";
  if (category === "balancing" || text.includes("balance") || text.includes("tree") || text.includes("garuda") || text.includes("half-moon")) return "balance_stabilization";
  if (category === "core" || text.includes("core") || text.includes("boat") || text.includes("navasana") || stance === "plank") return "core_engagement";
  if (stance === "inverted" || category === "inversion") return "inversion_inversion";
  if (category === "restorative" || text.includes("child") || text.includes("savasana") || text.includes("rest")) return "restorative_rest";
  if (text.includes("lateral") || text.includes("side") || text.includes("crescent")) return "lateral_bend";
  return "static_hold";
}

/**
 * Generates an appropriate stance-aware entry setup prompt for any asana.
 */
export function getStanceAwareEntryPrompt(asanaName: string, stance: StartingPosition): string {
  switch (stance) {
    case "seated":
      return `Sit comfortably on your mat, lengthen your spine, and prepare for ${asanaName}.`;
    case "kneeling":
      return `Kneel comfortably on your mat, find length through your spine, and prepare for ${asanaName}.`;
    case "prone":
      return `Lie down flat on your stomach, place your hands beside your chest, and prepare for ${asanaName}.`;
    case "supine":
      return `Lie comfortably on your back, relax your shoulders, and prepare for ${asanaName}.`;
    case "all_fours":
      return `Come to hands and knees in a steady tabletop, and prepare for ${asanaName}.`;
    case "plank":
      return `Step into a strong plank position, engage your core, and prepare for ${asanaName}.`;
    case "inverted":
      return `Find your inverted foundation, ground through your hands, and prepare for ${asanaName}.`;
    case "bending":
      return `Stand tall, hinge smoothly from your hips, and prepare for ${asanaName}.`;
    case "arm_balance":
      return `Plant your hands firmly shoulder-width apart, shift your weight forward, and prepare for ${asanaName}.`;
    case "standing":
    default:
      return `Stand tall, ground your feet firmly, and prepare for ${asanaName}.`;
  }
}

