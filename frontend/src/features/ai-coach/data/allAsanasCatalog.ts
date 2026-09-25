// AUTO-GENERATED AUTHORITATIVE ASANA CATALOG DERIVED FROM SUPABASE ASSET INVENTORY
// Source of truth: Supabase bucket 'asana-images' / folder 'yogaverse-model-asanas-beach'
// Total Assets: 170

import type { AsanaDefinition } from "../types/asana-definition";

export const ALL_ASANAS_CATALOG: AsanaDefinition[] = [
  {
    "id": "archers-akarna-dhanurasana",
    "slug": "archers-akarna-dhanurasana",
    "displayName": "Archer's Pose",
    "name": "Archer's Pose",
    "sanskritName": "Akarna Dhanurasana",
    "category": "seated",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/archers-akarna-dhanurasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/archers-akarna-dhanurasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/archers-akarna-dhanurasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/archers-akarna-dhanurasana.webp",
    "description": "Traditional seated yoga posture (Akarna Dhanurasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Archer's Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "archers-akarna-dhanurasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "archers-akarna-dhanurasana.spine.erect",
      "archers-akarna-dhanurasana.shoulder.relaxation"
    ],
    "isPremium": true,
    "orderIndex": 1,
    "aliases": [],
    "rules": [
      {
        "id": "archers-akarna-dhanurasana.spine.erect",
        "name": "Spine Length",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.1,
        "tolerance": 0.08,
        "weight": 1,
        "severity": "medium",
        "feedback": "Sit tall with a straight, elongated spine."
      },
      {
        "id": "archers-akarna-dhanurasana.shoulder.relaxation",
        "name": "Relaxed Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.05,
        "weight": 1,
        "severity": "low",
        "feedback": "Relax shoulders away from your ears."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "banana-supta-nitambasana",
    "slug": "banana-supta-nitambasana",
    "displayName": "Banana Pose",
    "name": "Banana Pose",
    "sanskritName": "Supta Nitambasana",
    "category": "restorative",
    "difficulty": "beginner",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/banana-supta-nitambasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/banana-supta-nitambasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/banana-supta-nitambasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/banana-supta-nitambasana.webp",
    "description": "Traditional restorative yoga posture (Supta Nitambasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Banana Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "banana-supta-nitambasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "banana-supta-nitambasana.body.symmetry"
    ],
    "isPremium": true,
    "orderIndex": 2,
    "aliases": [],
    "rules": [
      {
        "id": "banana-supta-nitambasana.body.symmetry",
        "name": "Symmetric Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "low",
        "feedback": "Relax deeply and breathe steadily into the posture."
      }
    ],
    "requiredLandmarks": [
      11,
      12
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "big-toe-padangushthasana",
    "slug": "big-toe-padangushthasana",
    "displayName": "Big Toe Pose",
    "name": "Big Toe Pose",
    "sanskritName": "Padangushthasana",
    "category": "standing",
    "difficulty": "beginner",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/big-toe-padangushthasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/big-toe-padangushthasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/big-toe-padangushthasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/big-toe-padangushthasana.webp",
    "description": "Traditional standing yoga posture (Padangushthasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Big Toe Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "big-toe-padangushthasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "big-toe-padangushthasana.shoulder.level",
      "big-toe-padangushthasana.spine.vertical",
      "big-toe-padangushthasana.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 3,
    "aliases": [],
    "rules": [
      {
        "id": "big-toe-padangushthasana.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "big-toe-padangushthasana.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "big-toe-padangushthasana.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "bird-of-paradise-svarga-dvijasana",
    "slug": "bird-of-paradise-svarga-dvijasana",
    "displayName": "Bird of Paradise",
    "name": "Bird of Paradise",
    "sanskritName": "Svarga Dvijasana",
    "category": "balancing",
    "difficulty": "advanced",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/bird-of-paradise-svarga-dvijasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/bird-of-paradise-svarga-dvijasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/bird-of-paradise-svarga-dvijasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/bird-of-paradise-svarga-dvijasana.webp",
    "description": "Traditional balancing yoga posture (Svarga Dvijasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Bird of Paradise.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "bird-of-paradise-svarga-dvijasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "bird-of-paradise-svarga-dvijasana.standing.leg",
      "bird-of-paradise-svarga-dvijasana.shoulder.alignment"
    ],
    "isPremium": true,
    "orderIndex": 4,
    "aliases": [],
    "rules": [
      {
        "id": "bird-of-paradise-svarga-dvijasana.standing.leg",
        "name": "Standing Leg Stability",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "tolerance": 10,
        "weight": 2,
        "severity": "high",
        "feedback": "Firm your standing leg and root down through the foot."
      },
      {
        "id": "bird-of-paradise-svarga-dvijasana.shoulder.alignment",
        "name": "Shoulder Level",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders even and focus your gaze on a steady point."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "boat-navasana",
    "slug": "boat-navasana",
    "displayName": "Boat Pose",
    "name": "Boat Pose",
    "sanskritName": "Navasana",
    "category": "core",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/boat-navasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/boat-navasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/boat-navasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/boat-navasana.webp",
    "description": "Traditional core yoga posture (Navasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Boat Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "boat-navasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "boat-navasana.core.alignment",
      "boat-navasana.shoulder.stability"
    ],
    "isPremium": false,
    "orderIndex": 5,
    "aliases": [
      "boat-pose",
      "navasana"
    ],
    "rules": [
      {
        "id": "boat-navasana.core.alignment",
        "name": "Torso Line",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 150,
        "max": 180,
        "tolerance": 15,
        "weight": 2,
        "severity": "high",
        "feedback": "Engage abdominal muscles to maintain straight body line."
      },
      {
        "id": "boat-navasana.shoulder.stability",
        "name": "Shoulder Stability",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Press through hands and keep shoulder girdle firm."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      25
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "bound-angle-baddha-konasana",
    "slug": "bound-angle-baddha-konasana",
    "displayName": "Bound Angle Pose",
    "name": "Bound Angle Pose",
    "sanskritName": "Baddha Konasana",
    "category": "seated",
    "difficulty": "beginner",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/bound-angle-baddha-konasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/bound-angle-baddha-konasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/bound-angle-baddha-konasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/bound-angle-baddha-konasana.webp",
    "description": "Traditional seated yoga posture (Baddha Konasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Bound Angle Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "bound-angle-baddha-konasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "bound-angle-baddha-konasana.spine.erect",
      "bound-angle-baddha-konasana.shoulder.relaxation"
    ],
    "isPremium": true,
    "orderIndex": 6,
    "aliases": [],
    "rules": [
      {
        "id": "bound-angle-baddha-konasana.spine.erect",
        "name": "Spine Length",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.1,
        "tolerance": 0.08,
        "weight": 1,
        "severity": "medium",
        "feedback": "Sit tall with a straight, elongated spine."
      },
      {
        "id": "bound-angle-baddha-konasana.shoulder.relaxation",
        "name": "Relaxed Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.05,
        "weight": 1,
        "severity": "low",
        "feedback": "Relax shoulders away from your ears."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "bow-dhanurasana",
    "slug": "bow-dhanurasana",
    "displayName": "Bow Pose",
    "name": "Bow Pose",
    "sanskritName": "Dhanurasana",
    "category": "backbend",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/bow-dhanurasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/bow-dhanurasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/bow-dhanurasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/bow-dhanurasana.webp",
    "description": "Traditional backbend yoga posture (Dhanurasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Bow Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "bow-dhanurasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "bow-dhanurasana.chest.opening",
      "bow-dhanurasana.arm.extension"
    ],
    "isPremium": true,
    "orderIndex": 7,
    "aliases": [],
    "rules": [
      {
        "id": "bow-dhanurasana.chest.opening",
        "name": "Chest Opening",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.05,
        "weight": 1,
        "severity": "medium",
        "feedback": "Broaden across your collarbones and open your chest."
      },
      {
        "id": "bow-dhanurasana.arm.extension",
        "name": "Arm Support",
        "metric": "angle",
        "points": [
          11,
          13,
          15
        ],
        "comparison": "between",
        "min": 140,
        "max": 180,
        "tolerance": 15,
        "weight": 1,
        "severity": "medium",
        "feedback": "Engage arms to support gentle spinal arch."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      13,
      15
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "box-chakravakasana",
    "slug": "box-chakravakasana",
    "displayName": "Box Pose",
    "name": "Box Pose",
    "sanskritName": "Chakravakasana",
    "category": "restorative",
    "difficulty": "beginner",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/box-chakravakasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/box-chakravakasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/box-chakravakasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/box-chakravakasana.webp",
    "description": "Traditional restorative yoga posture (Chakravakasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Box Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "box-chakravakasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "box-chakravakasana.body.symmetry"
    ],
    "isPremium": true,
    "orderIndex": 8,
    "aliases": [],
    "rules": [
      {
        "id": "box-chakravakasana.body.symmetry",
        "name": "Symmetric Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "low",
        "feedback": "Relax deeply and breathe steadily into the posture."
      }
    ],
    "requiredLandmarks": [
      11,
      12
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "bridge-setu-bandha-sarvangasana",
    "slug": "bridge-setu-bandha-sarvangasana",
    "displayName": "Bridge Pose",
    "name": "Bridge Pose",
    "sanskritName": "Setu Bandha Sarvangasana",
    "category": "backbend",
    "difficulty": "beginner",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/bridge-setu-bandha-sarvangasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/bridge-setu-bandha-sarvangasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/bridge-setu-bandha-sarvangasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/bridge-setu-bandha-sarvangasana.webp",
    "description": "Traditional backbend yoga posture (Setu Bandha Sarvangasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Bridge Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "bridge-setu-bandha-sarvangasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "bridge-setu-bandha-sarvangasana.chest.opening",
      "bridge-setu-bandha-sarvangasana.arm.extension"
    ],
    "isPremium": false,
    "orderIndex": 9,
    "aliases": [
      "bridge-pose",
      "setu-bandhasana",
      "setu-bandha-sarvangasana"
    ],
    "rules": [
      {
        "id": "bridge-setu-bandha-sarvangasana.chest.opening",
        "name": "Chest Opening",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.05,
        "weight": 1,
        "severity": "medium",
        "feedback": "Broaden across your collarbones and open your chest."
      },
      {
        "id": "bridge-setu-bandha-sarvangasana.arm.extension",
        "name": "Arm Support",
        "metric": "angle",
        "points": [
          11,
          13,
          15
        ],
        "comparison": "between",
        "min": 140,
        "max": 180,
        "tolerance": 15,
        "weight": 1,
        "severity": "medium",
        "feedback": "Engage arms to support gentle spinal arch."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      13,
      15
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "butterfly",
    "slug": "butterfly",
    "displayName": "Butterfly Pose",
    "name": "Butterfly Pose",
    "sanskritName": "Baddha Konasana",
    "category": "seated",
    "difficulty": "beginner",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/butterfly.webp",
      "storagePath": "yogaverse-model-asanas-beach/butterfly.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/butterfly.webp",
    "storagePath": "yogaverse-model-asanas-beach/butterfly.webp",
    "description": "Traditional seated yoga posture (Baddha Konasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Butterfly Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "butterfly-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "butterfly.spine.erect",
      "butterfly.shoulder.relaxation"
    ],
    "isPremium": true,
    "orderIndex": 10,
    "aliases": [],
    "rules": [
      {
        "id": "butterfly.spine.erect",
        "name": "Spine Length",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.1,
        "tolerance": 0.08,
        "weight": 1,
        "severity": "medium",
        "feedback": "Sit tall with a straight, elongated spine."
      },
      {
        "id": "butterfly.shoulder.relaxation",
        "name": "Relaxed Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.05,
        "weight": 1,
        "severity": "low",
        "feedback": "Relax shoulders away from your ears."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "camel-ustrasana",
    "slug": "camel-ustrasana",
    "displayName": "Camel Pose",
    "name": "Camel Pose",
    "sanskritName": "Ustrasana",
    "category": "backbend",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/camel-ustrasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/camel-ustrasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/camel-ustrasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/camel-ustrasana.webp",
    "description": "Traditional backbend yoga posture (Ustrasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Camel Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "camel-ustrasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "camel-ustrasana.chest.opening",
      "camel-ustrasana.arm.extension"
    ],
    "isPremium": true,
    "orderIndex": 11,
    "aliases": [],
    "rules": [
      {
        "id": "camel-ustrasana.chest.opening",
        "name": "Chest Opening",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.05,
        "weight": 1,
        "severity": "medium",
        "feedback": "Broaden across your collarbones and open your chest."
      },
      {
        "id": "camel-ustrasana.arm.extension",
        "name": "Arm Support",
        "metric": "angle",
        "points": [
          11,
          13,
          15
        ],
        "comparison": "between",
        "min": 140,
        "max": 180,
        "tolerance": 15,
        "weight": 1,
        "severity": "medium",
        "feedback": "Engage arms to support gentle spinal arch."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      13,
      15
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "cat-marjariasana",
    "slug": "cat-marjariasana",
    "displayName": "Cat Pose",
    "name": "Cat Pose",
    "sanskritName": "Marjariasana",
    "category": "restorative",
    "difficulty": "beginner",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/cat-marjariasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/cat-marjariasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/cat-marjariasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/cat-marjariasana.webp",
    "description": "Traditional restorative yoga posture (Marjariasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Cat Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "cat-marjariasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "cat-marjariasana.body.symmetry"
    ],
    "isPremium": true,
    "orderIndex": 12,
    "aliases": [],
    "rules": [
      {
        "id": "cat-marjariasana.body.symmetry",
        "name": "Symmetric Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "low",
        "feedback": "Relax deeply and breathe steadily into the posture."
      }
    ],
    "requiredLandmarks": [
      11,
      12
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "caterpillar",
    "slug": "caterpillar",
    "displayName": "Caterpillar Pose",
    "name": "Caterpillar Pose",
    "sanskritName": "Paschimottanasana Variation",
    "category": "restorative",
    "difficulty": "beginner",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/caterpillar.webp",
      "storagePath": "yogaverse-model-asanas-beach/caterpillar.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/caterpillar.webp",
    "storagePath": "yogaverse-model-asanas-beach/caterpillar.webp",
    "description": "Traditional restorative yoga posture (Paschimottanasana Variation) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Caterpillar Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "caterpillar-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "caterpillar.body.symmetry"
    ],
    "isPremium": true,
    "orderIndex": 13,
    "aliases": [],
    "rules": [
      {
        "id": "caterpillar.body.symmetry",
        "name": "Symmetric Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "low",
        "feedback": "Relax deeply and breathe steadily into the posture."
      }
    ],
    "requiredLandmarks": [
      11,
      12
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "chair-utkatasana",
    "slug": "chair-utkatasana",
    "displayName": "Chair Pose",
    "name": "Chair Pose",
    "sanskritName": "Utkatasana",
    "category": "standing",
    "difficulty": "beginner",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/chair-utkatasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/chair-utkatasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/chair-utkatasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/chair-utkatasana.webp",
    "description": "Traditional standing yoga posture (Utkatasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Chair Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "chair-utkatasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "chair-utkatasana.shoulder.level",
      "chair-utkatasana.spine.vertical",
      "chair-utkatasana.hip.level"
    ],
    "isPremium": false,
    "orderIndex": 14,
    "aliases": [
      "chair-pose",
      "utkatasana"
    ],
    "rules": [
      {
        "id": "chair-utkatasana.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "chair-utkatasana.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "chair-utkatasana.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "childs-pose-balasana",
    "slug": "childs-pose-balasana",
    "displayName": "Child's Pose",
    "name": "Child's Pose",
    "sanskritName": "Balasana",
    "category": "restorative",
    "difficulty": "beginner",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/childs-pose-balasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/childs-pose-balasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/childs-pose-balasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/childs-pose-balasana.webp",
    "description": "Traditional restorative yoga posture (Balasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Child's Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "childs-pose-balasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "childs-pose-symmetry"
    ],
    "isPremium": false,
    "orderIndex": 15,
    "aliases": [
      "childs-pose",
      "balasana",
      "child-pose"
    ],
    "rules": [
      {
        "id": "childs-pose-symmetry",
        "name": "Shoulder Alignment",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "low",
        "feedback": "Rest deeply and extend arms evenly along the mat."
      }
    ],
    "requiredLandmarks": [
      11,
      12
    ],
    "validation": {
      "status": "validated",
      "version": "1.0.0",
      "sampleCount": 20,
      "expertReviewed": true
    }
  },
  {
    "id": "chin-stand-ganda-bherundasana",
    "slug": "chin-stand-ganda-bherundasana",
    "displayName": "Chin Stand",
    "name": "Chin Stand",
    "sanskritName": "Ganda Bherundasana",
    "category": "inversion",
    "difficulty": "advanced",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/chin-stand-ganda-bherundasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/chin-stand-ganda-bherundasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/chin-stand-ganda-bherundasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/chin-stand-ganda-bherundasana.webp",
    "description": "Traditional inversion yoga posture (Ganda Bherundasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Chin Stand.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "chin-stand-ganda-bherundasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "chin-stand-ganda-bherundasana.inversion.line",
      "chin-stand-ganda-bherundasana.shoulder.base"
    ],
    "isPremium": true,
    "orderIndex": 16,
    "aliases": [],
    "rules": [
      {
        "id": "chin-stand-ganda-bherundasana.inversion.line",
        "name": "Vertical Line",
        "metric": "vertical_alignment",
        "points": [
          23,
          27
        ],
        "comparison": "less_than",
        "target": 0.12,
        "tolerance": 0.08,
        "weight": 2,
        "severity": "high",
        "feedback": "Stack hips and legs vertically with smooth control."
      },
      {
        "id": "chin-stand-ganda-bherundasana.shoulder.base",
        "name": "Shoulder Base",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "high",
        "isSafety": true,
        "feedback": "Maintain broad shoulder foundation without compressing neck."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "cobra-bhujangasana",
    "slug": "cobra-bhujangasana",
    "displayName": "Cobra Pose",
    "name": "Cobra Pose",
    "sanskritName": "Bhujangasana",
    "category": "backbend",
    "difficulty": "beginner",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/cobra-bhujangasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/cobra-bhujangasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/cobra-bhujangasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/cobra-bhujangasana.webp",
    "description": "Traditional backbend yoga posture (Bhujangasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Cobra Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "cobra-bhujangasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "cobra-shoulder-level",
      "cobra-elbow-bend"
    ],
    "isPremium": false,
    "orderIndex": 17,
    "aliases": [
      "cobra-pose",
      "bhujangasana",
      "step-7-cobra-bhujangasana"
    ],
    "rules": [
      {
        "id": "cobra-shoulder-level",
        "name": "Shoulder Level",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.05,
        "weight": 1,
        "severity": "medium",
        "feedback": "Roll shoulders back and down away from your ears."
      },
      {
        "id": "cobra-elbow-bend",
        "name": "Elbows Bent",
        "metric": "angle",
        "points": [
          11,
          13,
          15
        ],
        "comparison": "between",
        "min": 90,
        "max": 160,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep a soft bend in your elbows hugged close to your ribs."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      13,
      15
    ],
    "validation": {
      "status": "validated",
      "version": "1.0.0",
      "sampleCount": 20,
      "expertReviewed": true
    }
  },
  {
    "id": "corpse-savasana",
    "slug": "corpse-savasana",
    "displayName": "Corpse Pose",
    "name": "Corpse Pose",
    "sanskritName": "Savasana",
    "category": "restorative",
    "difficulty": "beginner",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/corpse-savasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/corpse-savasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/corpse-savasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/corpse-savasana.webp",
    "description": "Traditional restorative yoga posture (Savasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Corpse Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "corpse-savasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "corpse-savasana.body.symmetry"
    ],
    "isPremium": true,
    "orderIndex": 18,
    "aliases": [
      "corpse-pose",
      "savasana",
      "shavasana"
    ],
    "rules": [
      {
        "id": "corpse-savasana.body.symmetry",
        "name": "Symmetric Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "low",
        "feedback": "Relax deeply and breathe steadily into the posture."
      }
    ],
    "requiredLandmarks": [
      11,
      12
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "cow-bitilasana",
    "slug": "cow-bitilasana",
    "displayName": "Cow Pose",
    "name": "Cow Pose",
    "sanskritName": "Bitilasana",
    "category": "restorative",
    "difficulty": "beginner",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/cow-bitilasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/cow-bitilasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/cow-bitilasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/cow-bitilasana.webp",
    "description": "Traditional restorative yoga posture (Bitilasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Cow Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "cow-bitilasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "cow-bitilasana.body.symmetry"
    ],
    "isPremium": true,
    "orderIndex": 19,
    "aliases": [],
    "rules": [
      {
        "id": "cow-bitilasana.body.symmetry",
        "name": "Symmetric Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "low",
        "feedback": "Relax deeply and breathe steadily into the posture."
      }
    ],
    "requiredLandmarks": [
      11,
      12
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "cow-face-gomukhasana",
    "slug": "cow-face-gomukhasana",
    "displayName": "Cow Face Pose",
    "name": "Cow Face Pose",
    "sanskritName": "Gomukhasana",
    "category": "seated",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/cow-face-gomukhasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/cow-face-gomukhasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/cow-face-gomukhasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/cow-face-gomukhasana.webp",
    "description": "Traditional seated yoga posture (Gomukhasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Cow Face Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "cow-face-gomukhasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "cow-face-gomukhasana.spine.erect",
      "cow-face-gomukhasana.shoulder.relaxation"
    ],
    "isPremium": true,
    "orderIndex": 20,
    "aliases": [],
    "rules": [
      {
        "id": "cow-face-gomukhasana.spine.erect",
        "name": "Spine Length",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.1,
        "tolerance": 0.08,
        "weight": 1,
        "severity": "medium",
        "feedback": "Sit tall with a straight, elongated spine."
      },
      {
        "id": "cow-face-gomukhasana.shoulder.relaxation",
        "name": "Relaxed Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.05,
        "weight": 1,
        "severity": "low",
        "feedback": "Relax shoulders away from your ears."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "crane-bakasana",
    "slug": "crane-bakasana",
    "displayName": "Crane Pose",
    "name": "Crane Pose",
    "sanskritName": "Bakasana",
    "category": "balancing",
    "difficulty": "advanced",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/crane-bakasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/crane-bakasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/crane-bakasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/crane-bakasana.webp",
    "description": "Traditional balancing yoga posture (Bakasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Crane Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "crane-bakasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "crane-bakasana.standing.leg",
      "crane-bakasana.shoulder.alignment"
    ],
    "isPremium": true,
    "orderIndex": 21,
    "aliases": [],
    "rules": [
      {
        "id": "crane-bakasana.standing.leg",
        "name": "Standing Leg Stability",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "tolerance": 10,
        "weight": 2,
        "severity": "high",
        "feedback": "Firm your standing leg and root down through the foot."
      },
      {
        "id": "crane-bakasana.shoulder.alignment",
        "name": "Shoulder Level",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders even and focus your gaze on a steady point."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "crescent-lunge-ashta-chandrasana",
    "slug": "crescent-lunge-ashta-chandrasana",
    "displayName": "Crescent Lunge",
    "name": "Crescent Lunge",
    "sanskritName": "Ashta Chandrasana",
    "category": "standing",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/crescent-lunge-ashta-chandrasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/crescent-lunge-ashta-chandrasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/crescent-lunge-ashta-chandrasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/crescent-lunge-ashta-chandrasana.webp",
    "description": "Traditional standing yoga posture (Ashta Chandrasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Crescent Lunge.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "crescent-lunge-ashta-chandrasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "crescent-lunge-ashta-chandrasana.shoulder.level",
      "crescent-lunge-ashta-chandrasana.spine.vertical",
      "crescent-lunge-ashta-chandrasana.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 22,
    "aliases": [],
    "rules": [
      {
        "id": "crescent-lunge-ashta-chandrasana.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "crescent-lunge-ashta-chandrasana.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "crescent-lunge-ashta-chandrasana.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "crescent-lunge-on-knee-anjaneyasana",
    "slug": "crescent-lunge-on-knee-anjaneyasana",
    "displayName": "Low Lunge",
    "name": "Low Lunge",
    "sanskritName": "Anjaneyasana",
    "category": "standing",
    "difficulty": "beginner",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/crescent-lunge-on-knee-anjaneyasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/crescent-lunge-on-knee-anjaneyasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/crescent-lunge-on-knee-anjaneyasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/crescent-lunge-on-knee-anjaneyasana.webp",
    "description": "Traditional standing yoga posture (Anjaneyasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Low Lunge.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "crescent-lunge-on-knee-anjaneyasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "crescent-lunge-on-knee-anjaneyasana.shoulder.level",
      "crescent-lunge-on-knee-anjaneyasana.spine.vertical",
      "crescent-lunge-on-knee-anjaneyasana.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 23,
    "aliases": [
      "anjaneyasana",
      "low-lunge"
    ],
    "rules": [
      {
        "id": "crescent-lunge-on-knee-anjaneyasana.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "crescent-lunge-on-knee-anjaneyasana.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "crescent-lunge-on-knee-anjaneyasana.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "crescent-moon-ardha-chandrasana",
    "slug": "crescent-moon-ardha-chandrasana",
    "displayName": "Crescent Moon Pose",
    "name": "Crescent Moon Pose",
    "sanskritName": "Ardha Chandrasana",
    "category": "balancing",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/crescent-moon-ardha-chandrasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/crescent-moon-ardha-chandrasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/crescent-moon-ardha-chandrasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/crescent-moon-ardha-chandrasana.webp",
    "description": "Traditional balancing yoga posture (Ardha Chandrasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Crescent Moon Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "crescent-moon-ardha-chandrasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "crescent-moon-ardha-chandrasana.standing.leg",
      "crescent-moon-ardha-chandrasana.shoulder.alignment"
    ],
    "isPremium": true,
    "orderIndex": 24,
    "aliases": [],
    "rules": [
      {
        "id": "crescent-moon-ardha-chandrasana.standing.leg",
        "name": "Standing Leg Stability",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "tolerance": 10,
        "weight": 2,
        "severity": "high",
        "feedback": "Firm your standing leg and root down through the foot."
      },
      {
        "id": "crescent-moon-ardha-chandrasana.shoulder.alignment",
        "name": "Shoulder Level",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders even and focus your gaze on a steady point."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "crooked-monkey",
    "slug": "crooked-monkey",
    "displayName": "Crooked Monkey",
    "name": "Crooked Monkey",
    "sanskritName": "Markatasana Variation",
    "category": "seated",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/crooked-monkey.webp",
      "storagePath": "yogaverse-model-asanas-beach/crooked-monkey.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/crooked-monkey.webp",
    "storagePath": "yogaverse-model-asanas-beach/crooked-monkey.webp",
    "description": "Traditional seated yoga posture (Markatasana Variation) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Crooked Monkey.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "crooked-monkey-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "crooked-monkey.spine.erect",
      "crooked-monkey.shoulder.relaxation"
    ],
    "isPremium": true,
    "orderIndex": 25,
    "aliases": [],
    "rules": [
      {
        "id": "crooked-monkey.spine.erect",
        "name": "Spine Length",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.1,
        "tolerance": 0.08,
        "weight": 1,
        "severity": "medium",
        "feedback": "Sit tall with a straight, elongated spine."
      },
      {
        "id": "crooked-monkey.shoulder.relaxation",
        "name": "Relaxed Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.05,
        "weight": 1,
        "severity": "low",
        "feedback": "Relax shoulders away from your ears."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "crow-kakasana",
    "slug": "crow-kakasana",
    "displayName": "Crow Pose",
    "name": "Crow Pose",
    "sanskritName": "Kakasana",
    "category": "balancing",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/crow-kakasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/crow-kakasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/crow-kakasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/crow-kakasana.webp",
    "description": "Traditional balancing yoga posture (Kakasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Crow Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "crow-kakasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "crow-kakasana.standing.leg",
      "crow-kakasana.shoulder.alignment"
    ],
    "isPremium": true,
    "orderIndex": 26,
    "aliases": [],
    "rules": [
      {
        "id": "crow-kakasana.standing.leg",
        "name": "Standing Leg Stability",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "tolerance": 10,
        "weight": 2,
        "severity": "high",
        "feedback": "Firm your standing leg and root down through the foot."
      },
      {
        "id": "crow-kakasana.shoulder.alignment",
        "name": "Shoulder Level",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders even and focus your gaze on a steady point."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "dancer-natarajasana",
    "slug": "dancer-natarajasana",
    "displayName": "Dancer Pose",
    "name": "Dancer Pose",
    "sanskritName": "Natarajasana",
    "category": "balancing",
    "difficulty": "advanced",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/dancer-natarajasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/dancer-natarajasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/dancer-natarajasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/dancer-natarajasana.webp",
    "description": "Traditional balancing yoga posture (Natarajasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Dancer Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "dancer-natarajasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "dancer-natarajasana.standing.leg",
      "dancer-natarajasana.shoulder.alignment"
    ],
    "isPremium": true,
    "orderIndex": 27,
    "aliases": [],
    "rules": [
      {
        "id": "dancer-natarajasana.standing.leg",
        "name": "Standing Leg Stability",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "tolerance": 10,
        "weight": 2,
        "severity": "high",
        "feedback": "Firm your standing leg and root down through the foot."
      },
      {
        "id": "dancer-natarajasana.shoulder.alignment",
        "name": "Shoulder Level",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders even and focus your gaze on a steady point."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "deaf-mans-karna-pidasana",
    "slug": "deaf-mans-karna-pidasana",
    "displayName": "Deaf Man's Pose",
    "name": "Deaf Man's Pose",
    "sanskritName": "Karnapidasana",
    "category": "inversion",
    "difficulty": "advanced",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/deaf-mans-karna-pidasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/deaf-mans-karna-pidasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/deaf-mans-karna-pidasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/deaf-mans-karna-pidasana.webp",
    "description": "Traditional inversion yoga posture (Karnapidasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Deaf Man's Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "deaf-mans-karna-pidasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "deaf-mans-karna-pidasana.inversion.line",
      "deaf-mans-karna-pidasana.shoulder.base"
    ],
    "isPremium": true,
    "orderIndex": 28,
    "aliases": [],
    "rules": [
      {
        "id": "deaf-mans-karna-pidasana.inversion.line",
        "name": "Vertical Line",
        "metric": "vertical_alignment",
        "points": [
          23,
          27
        ],
        "comparison": "less_than",
        "target": 0.12,
        "tolerance": 0.08,
        "weight": 2,
        "severity": "high",
        "feedback": "Stack hips and legs vertically with smooth control."
      },
      {
        "id": "deaf-mans-karna-pidasana.shoulder.base",
        "name": "Shoulder Base",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "high",
        "isSafety": true,
        "feedback": "Maintain broad shoulder foundation without compressing neck."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "dolphin-shishumarasana",
    "slug": "dolphin-shishumarasana",
    "displayName": "Dolphin Pose",
    "name": "Dolphin Pose",
    "sanskritName": "Shishumarasana",
    "category": "inversion",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/dolphin-shishumarasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/dolphin-shishumarasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/dolphin-shishumarasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/dolphin-shishumarasana.webp",
    "description": "Traditional inversion yoga posture (Shishumarasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Dolphin Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "dolphin-shishumarasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "dolphin-shishumarasana.inversion.line",
      "dolphin-shishumarasana.shoulder.base"
    ],
    "isPremium": true,
    "orderIndex": 29,
    "aliases": [],
    "rules": [
      {
        "id": "dolphin-shishumarasana.inversion.line",
        "name": "Vertical Line",
        "metric": "vertical_alignment",
        "points": [
          23,
          27
        ],
        "comparison": "less_than",
        "target": 0.12,
        "tolerance": 0.08,
        "weight": 2,
        "severity": "high",
        "feedback": "Stack hips and legs vertically with smooth control."
      },
      {
        "id": "dolphin-shishumarasana.shoulder.base",
        "name": "Shoulder Base",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "high",
        "isSafety": true,
        "feedback": "Maintain broad shoulder foundation without compressing neck."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "downward-dog-adho-mukha-svanasana",
    "slug": "downward-dog-adho-mukha-svanasana",
    "displayName": "Downward-Facing Dog",
    "name": "Downward-Facing Dog",
    "sanskritName": "Adho Mukha Svanasana",
    "category": "standing",
    "difficulty": "beginner",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/downward-dog-adho-mukha-svanasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/downward-dog-adho-mukha-svanasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/downward-dog-adho-mukha-svanasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/downward-dog-adho-mukha-svanasana.webp",
    "description": "Traditional standing yoga posture (Adho Mukha Svanasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Downward-Facing Dog.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "downward-dog-adho-mukha-svanasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "downward-dog-adho-mukha-svanasana.shoulder.level",
      "downward-dog-adho-mukha-svanasana.spine.vertical",
      "downward-dog-adho-mukha-svanasana.hip.level"
    ],
    "isPremium": false,
    "orderIndex": 30,
    "aliases": [
      "downward-dog",
      "downward-facing-dog",
      "adho-mukha-svanasana",
      "step-5-downward-dog-adho-mukha-svanasana",
      "step-8-downward-dog-adho-mukha-svanasana"
    ],
    "rules": [
      {
        "id": "downward-dog-adho-mukha-svanasana.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "downward-dog-adho-mukha-svanasana.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "downward-dog-adho-mukha-svanasana.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "eagle-garudasana",
    "slug": "eagle-garudasana",
    "displayName": "Eagle Pose",
    "name": "Eagle Pose",
    "sanskritName": "Garudasana",
    "category": "balancing",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/eagle-garudasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/eagle-garudasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/eagle-garudasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/eagle-garudasana.webp",
    "description": "Traditional balancing yoga posture (Garudasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Eagle Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "eagle-garudasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "eagle-garudasana.standing.leg",
      "eagle-garudasana.shoulder.alignment"
    ],
    "isPremium": true,
    "orderIndex": 31,
    "aliases": [],
    "rules": [
      {
        "id": "eagle-garudasana.standing.leg",
        "name": "Standing Leg Stability",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "tolerance": 10,
        "weight": 2,
        "severity": "high",
        "feedback": "Firm your standing leg and root down through the foot."
      },
      {
        "id": "eagle-garudasana.shoulder.alignment",
        "name": "Shoulder Level",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders even and focus your gaze on a steady point."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "easy-sukhasana",
    "slug": "easy-sukhasana",
    "displayName": "Easy Pose",
    "name": "Easy Pose",
    "sanskritName": "Sukhasana",
    "category": "seated",
    "difficulty": "beginner",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/easy-sukhasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/easy-sukhasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/easy-sukhasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/easy-sukhasana.webp",
    "description": "Traditional seated yoga posture (Sukhasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Easy Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "easy-sukhasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "easy-sukhasana.spine.erect",
      "easy-sukhasana.shoulder.relaxation"
    ],
    "isPremium": true,
    "orderIndex": 32,
    "aliases": [
      "easy-pose",
      "sukhasana"
    ],
    "rules": [
      {
        "id": "easy-sukhasana.spine.erect",
        "name": "Spine Length",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.1,
        "tolerance": 0.08,
        "weight": 1,
        "severity": "medium",
        "feedback": "Sit tall with a straight, elongated spine."
      },
      {
        "id": "easy-sukhasana.shoulder.relaxation",
        "name": "Relaxed Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.05,
        "weight": 1,
        "severity": "low",
        "feedback": "Relax shoulders away from your ears."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "eight-angle-ashtavakrasana",
    "slug": "eight-angle-ashtavakrasana",
    "displayName": "Eight-Angle Pose",
    "name": "Eight-Angle Pose",
    "sanskritName": "Ashtavakrasana",
    "category": "balancing",
    "difficulty": "advanced",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/eight-angle-ashtavakrasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/eight-angle-ashtavakrasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/eight-angle-ashtavakrasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/eight-angle-ashtavakrasana.webp",
    "description": "Traditional balancing yoga posture (Ashtavakrasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Eight-Angle Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "eight-angle-ashtavakrasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "eight-angle-ashtavakrasana.standing.leg",
      "eight-angle-ashtavakrasana.shoulder.alignment"
    ],
    "isPremium": true,
    "orderIndex": 33,
    "aliases": [],
    "rules": [
      {
        "id": "eight-angle-ashtavakrasana.standing.leg",
        "name": "Standing Leg Stability",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "tolerance": 10,
        "weight": 2,
        "severity": "high",
        "feedback": "Firm your standing leg and root down through the foot."
      },
      {
        "id": "eight-angle-ashtavakrasana.shoulder.alignment",
        "name": "Shoulder Level",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders even and focus your gaze on a steady point."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "eight-point-ashtangasana",
    "slug": "eight-point-ashtangasana",
    "displayName": "Eight-Limbed Pose",
    "name": "Eight-Limbed Pose",
    "sanskritName": "Ashtangasana",
    "category": "core",
    "difficulty": "beginner",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/eight-point-ashtangasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/eight-point-ashtangasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/eight-point-ashtangasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/eight-point-ashtangasana.webp",
    "description": "Traditional core yoga posture (Ashtangasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Eight-Limbed Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "eight-point-ashtangasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "eight-point-ashtangasana.core.alignment",
      "eight-point-ashtangasana.shoulder.stability"
    ],
    "isPremium": true,
    "orderIndex": 34,
    "aliases": [
      "step-6-eight-limbed-ashtanga-namaskara",
      "ashtangasana",
      "ashtanga-namaskara"
    ],
    "rules": [
      {
        "id": "eight-point-ashtangasana.core.alignment",
        "name": "Torso Line",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 150,
        "max": 180,
        "tolerance": 15,
        "weight": 2,
        "severity": "high",
        "feedback": "Engage abdominal muscles to maintain straight body line."
      },
      {
        "id": "eight-point-ashtangasana.shoulder.stability",
        "name": "Shoulder Stability",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Press through hands and keep shoulder girdle firm."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      25
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "elbow-balance-shayanasana",
    "slug": "elbow-balance-shayanasana",
    "displayName": "Elbow Balance",
    "name": "Elbow Balance",
    "sanskritName": "Shayanasana",
    "category": "inversion",
    "difficulty": "advanced",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/elbow-balance-shayanasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/elbow-balance-shayanasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/elbow-balance-shayanasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/elbow-balance-shayanasana.webp",
    "description": "Traditional inversion yoga posture (Shayanasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Elbow Balance.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "elbow-balance-shayanasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "elbow-balance-shayanasana.inversion.line",
      "elbow-balance-shayanasana.shoulder.base"
    ],
    "isPremium": true,
    "orderIndex": 35,
    "aliases": [],
    "rules": [
      {
        "id": "elbow-balance-shayanasana.inversion.line",
        "name": "Vertical Line",
        "metric": "vertical_alignment",
        "points": [
          23,
          27
        ],
        "comparison": "less_than",
        "target": 0.12,
        "tolerance": 0.08,
        "weight": 2,
        "severity": "high",
        "feedback": "Stack hips and legs vertically with smooth control."
      },
      {
        "id": "elbow-balance-shayanasana.shoulder.base",
        "name": "Shoulder Base",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "high",
        "isSafety": true,
        "feedback": "Maintain broad shoulder foundation without compressing neck."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "elephant-trunk-eka-hasta-bhujasana",
    "slug": "elephant-trunk-eka-hasta-bhujasana",
    "displayName": "Elephant's Trunk Pose",
    "name": "Elephant's Trunk Pose",
    "sanskritName": "Eka Hasta Bhujasana",
    "category": "balancing",
    "difficulty": "advanced",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/elephant-trunk-eka-hasta-bhujasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/elephant-trunk-eka-hasta-bhujasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/elephant-trunk-eka-hasta-bhujasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/elephant-trunk-eka-hasta-bhujasana.webp",
    "description": "Traditional balancing yoga posture (Eka Hasta Bhujasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Elephant's Trunk Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "elephant-trunk-eka-hasta-bhujasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "elephant-trunk-eka-hasta-bhujasana.standing.leg",
      "elephant-trunk-eka-hasta-bhujasana.shoulder.alignment"
    ],
    "isPremium": true,
    "orderIndex": 36,
    "aliases": [],
    "rules": [
      {
        "id": "elephant-trunk-eka-hasta-bhujasana.standing.leg",
        "name": "Standing Leg Stability",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "tolerance": 10,
        "weight": 2,
        "severity": "high",
        "feedback": "Firm your standing leg and root down through the foot."
      },
      {
        "id": "elephant-trunk-eka-hasta-bhujasana.shoulder.alignment",
        "name": "Shoulder Level",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders even and focus your gaze on a steady point."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "embryo-in-womb-garbha-pindasana",
    "slug": "embryo-in-womb-garbha-pindasana",
    "displayName": "Embryo In Womb",
    "name": "Embryo In Womb",
    "sanskritName": "Garbha Pindasana",
    "category": "standing",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/embryo-in-womb-garbha-pindasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/embryo-in-womb-garbha-pindasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/embryo-in-womb-garbha-pindasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/embryo-in-womb-garbha-pindasana.webp",
    "description": "Traditional standing yoga posture (Garbha Pindasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Embryo In Womb.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "embryo-in-womb-garbha-pindasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "embryo-in-womb-garbha-pindasana.shoulder.level",
      "embryo-in-womb-garbha-pindasana.spine.vertical",
      "embryo-in-womb-garbha-pindasana.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 37,
    "aliases": [],
    "rules": [
      {
        "id": "embryo-in-womb-garbha-pindasana.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "embryo-in-womb-garbha-pindasana.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "embryo-in-womb-garbha-pindasana.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "embryo-pindasana",
    "slug": "embryo-pindasana",
    "displayName": "Embryo",
    "name": "Embryo",
    "sanskritName": "Pindasana",
    "category": "standing",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/embryo-pindasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/embryo-pindasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/embryo-pindasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/embryo-pindasana.webp",
    "description": "Traditional standing yoga posture (Pindasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Embryo.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "embryo-pindasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "embryo-pindasana.shoulder.level",
      "embryo-pindasana.spine.vertical",
      "embryo-pindasana.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 38,
    "aliases": [],
    "rules": [
      {
        "id": "embryo-pindasana.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "embryo-pindasana.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "embryo-pindasana.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "extended-puppy-uttana-shishosana",
    "slug": "extended-puppy-uttana-shishosana",
    "displayName": "Extended Puppy Pose",
    "name": "Extended Puppy Pose",
    "sanskritName": "Uttana Shishosana",
    "category": "restorative",
    "difficulty": "beginner",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/extended-puppy-uttana-shishosana.webp",
      "storagePath": "yogaverse-model-asanas-beach/extended-puppy-uttana-shishosana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/extended-puppy-uttana-shishosana.webp",
    "storagePath": "yogaverse-model-asanas-beach/extended-puppy-uttana-shishosana.webp",
    "description": "Traditional restorative yoga posture (Uttana Shishosana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Extended Puppy Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "extended-puppy-uttana-shishosana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "extended-puppy-uttana-shishosana.body.symmetry"
    ],
    "isPremium": true,
    "orderIndex": 39,
    "aliases": [],
    "rules": [
      {
        "id": "extended-puppy-uttana-shishosana.body.symmetry",
        "name": "Symmetric Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "low",
        "feedback": "Relax deeply and breathe steadily into the posture."
      }
    ],
    "requiredLandmarks": [
      11,
      12
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "extended-side-angle-utthita-parshvakonasana",
    "slug": "extended-side-angle-utthita-parshvakonasana",
    "displayName": "Extended Side Angle",
    "name": "Extended Side Angle",
    "sanskritName": "Utthita Parshvakonasana",
    "category": "standing",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/extended-side-angle-utthita-parshvakonasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/extended-side-angle-utthita-parshvakonasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/extended-side-angle-utthita-parshvakonasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/extended-side-angle-utthita-parshvakonasana.webp",
    "description": "Traditional standing yoga posture (Utthita Parshvakonasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Extended Side Angle.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "extended-side-angle-utthita-parshvakonasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "extended-side-angle-utthita-parshvakonasana.shoulder.level",
      "extended-side-angle-utthita-parshvakonasana.spine.vertical",
      "extended-side-angle-utthita-parshvakonasana.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 40,
    "aliases": [
      "extended-side-angle",
      "utthita-parshvakonasana"
    ],
    "rules": [
      {
        "id": "extended-side-angle-utthita-parshvakonasana.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "extended-side-angle-utthita-parshvakonasana.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "extended-side-angle-utthita-parshvakonasana.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "extended-standing-hand-to-big-toe-utthita-hasta-padangushthasana-b",
    "slug": "extended-standing-hand-to-big-toe-utthita-hasta-padangushthasana-b",
    "displayName": "Extended Standing Hand To Big Toe Utthita",
    "name": "Extended Standing Hand To Big Toe Utthita",
    "sanskritName": "Hasta Padangushthasana B",
    "category": "standing",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/extended-standing-hand-to-big-toe-utthita-hasta-padangushthasana-b.webp",
      "storagePath": "yogaverse-model-asanas-beach/extended-standing-hand-to-big-toe-utthita-hasta-padangushthasana-b.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/extended-standing-hand-to-big-toe-utthita-hasta-padangushthasana-b.webp",
    "storagePath": "yogaverse-model-asanas-beach/extended-standing-hand-to-big-toe-utthita-hasta-padangushthasana-b.webp",
    "description": "Traditional standing yoga posture (Hasta Padangushthasana B) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Extended Standing Hand To Big Toe Utthita.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "extended-standing-hand-to-big-toe-utthita-hasta-padangushthasana-b-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "extended-standing-hand-to-big-toe-utthita-hasta-padangushthasana-b.shoulder.level",
      "extended-standing-hand-to-big-toe-utthita-hasta-padangushthasana-b.spine.vertical",
      "extended-standing-hand-to-big-toe-utthita-hasta-padangushthasana-b.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 41,
    "aliases": [],
    "rules": [
      {
        "id": "extended-standing-hand-to-big-toe-utthita-hasta-padangushthasana-b.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "extended-standing-hand-to-big-toe-utthita-hasta-padangushthasana-b.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "extended-standing-hand-to-big-toe-utthita-hasta-padangushthasana-b.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "extended-supine-hand-to-big-toe-supta-padangushthasana-b",
    "slug": "extended-supine-hand-to-big-toe-supta-padangushthasana-b",
    "displayName": "Extended Supine Hand To Big Toe",
    "name": "Extended Supine Hand To Big Toe",
    "sanskritName": "Supta Padangushthasana B",
    "category": "restorative",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/extended-supine-hand-to-big-toe-supta-padangushthasana-b.webp",
      "storagePath": "yogaverse-model-asanas-beach/extended-supine-hand-to-big-toe-supta-padangushthasana-b.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/extended-supine-hand-to-big-toe-supta-padangushthasana-b.webp",
    "storagePath": "yogaverse-model-asanas-beach/extended-supine-hand-to-big-toe-supta-padangushthasana-b.webp",
    "description": "Traditional restorative yoga posture (Supta Padangushthasana B) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Extended Supine Hand To Big Toe.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "extended-supine-hand-to-big-toe-supta-padangushthasana-b-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "extended-supine-hand-to-big-toe-supta-padangushthasana-b.body.symmetry"
    ],
    "isPremium": true,
    "orderIndex": 42,
    "aliases": [],
    "rules": [
      {
        "id": "extended-supine-hand-to-big-toe-supta-padangushthasana-b.body.symmetry",
        "name": "Symmetric Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "low",
        "feedback": "Relax deeply and breathe steadily into the posture."
      }
    ],
    "requiredLandmarks": [
      11,
      12
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "fire-log-agnistambhasana",
    "slug": "fire-log-agnistambhasana",
    "displayName": "Fire Log Pose",
    "name": "Fire Log Pose",
    "sanskritName": "Agnistambhasana",
    "category": "seated",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/fire-log-agnistambhasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/fire-log-agnistambhasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/fire-log-agnistambhasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/fire-log-agnistambhasana.webp",
    "description": "Traditional seated yoga posture (Agnistambhasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Fire Log Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "fire-log-agnistambhasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "fire-log-agnistambhasana.spine.erect",
      "fire-log-agnistambhasana.shoulder.relaxation"
    ],
    "isPremium": true,
    "orderIndex": 43,
    "aliases": [],
    "rules": [
      {
        "id": "fire-log-agnistambhasana.spine.erect",
        "name": "Spine Length",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.1,
        "tolerance": 0.08,
        "weight": 1,
        "severity": "medium",
        "feedback": "Sit tall with a straight, elongated spine."
      },
      {
        "id": "fire-log-agnistambhasana.shoulder.relaxation",
        "name": "Relaxed Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.05,
        "weight": 1,
        "severity": "low",
        "feedback": "Relax shoulders away from your ears."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "firefly-i-tittibhasana-a",
    "slug": "firefly-i-tittibhasana-a",
    "displayName": "Firefly I",
    "name": "Firefly I",
    "sanskritName": "Tittibhasana A",
    "category": "standing",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/firefly-i-tittibhasana-a.webp",
      "storagePath": "yogaverse-model-asanas-beach/firefly-i-tittibhasana-a.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/firefly-i-tittibhasana-a.webp",
    "storagePath": "yogaverse-model-asanas-beach/firefly-i-tittibhasana-a.webp",
    "description": "Traditional standing yoga posture (Tittibhasana A) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Firefly I.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "firefly-i-tittibhasana-a-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "firefly-i-tittibhasana-a.shoulder.level",
      "firefly-i-tittibhasana-a.spine.vertical",
      "firefly-i-tittibhasana-a.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 44,
    "aliases": [],
    "rules": [
      {
        "id": "firefly-i-tittibhasana-a.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "firefly-i-tittibhasana-a.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "firefly-i-tittibhasana-a.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "firefly-ii-tittibhasana-b",
    "slug": "firefly-ii-tittibhasana-b",
    "displayName": "Firefly II",
    "name": "Firefly II",
    "sanskritName": "Tittibhasana B",
    "category": "standing",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/firefly-ii-tittibhasana-b.webp",
      "storagePath": "yogaverse-model-asanas-beach/firefly-ii-tittibhasana-b.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/firefly-ii-tittibhasana-b.webp",
    "storagePath": "yogaverse-model-asanas-beach/firefly-ii-tittibhasana-b.webp",
    "description": "Traditional standing yoga posture (Tittibhasana B) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Firefly II.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "firefly-ii-tittibhasana-b-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "firefly-ii-tittibhasana-b.shoulder.level",
      "firefly-ii-tittibhasana-b.spine.vertical",
      "firefly-ii-tittibhasana-b.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 45,
    "aliases": [],
    "rules": [
      {
        "id": "firefly-ii-tittibhasana-b.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "firefly-ii-tittibhasana-b.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "firefly-ii-tittibhasana-b.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "firefly-iii-tittibhasana-c",
    "slug": "firefly-iii-tittibhasana-c",
    "displayName": "Firefly III",
    "name": "Firefly III",
    "sanskritName": "Tittibhasana C",
    "category": "standing",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/firefly-iii-tittibhasana-c.webp",
      "storagePath": "yogaverse-model-asanas-beach/firefly-iii-tittibhasana-c.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/firefly-iii-tittibhasana-c.webp",
    "storagePath": "yogaverse-model-asanas-beach/firefly-iii-tittibhasana-c.webp",
    "description": "Traditional standing yoga posture (Tittibhasana C) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Firefly III.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "firefly-iii-tittibhasana-c-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "firefly-iii-tittibhasana-c.shoulder.level",
      "firefly-iii-tittibhasana-c.spine.vertical",
      "firefly-iii-tittibhasana-c.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 46,
    "aliases": [],
    "rules": [
      {
        "id": "firefly-iii-tittibhasana-c.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "firefly-iii-tittibhasana-c.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "firefly-iii-tittibhasana-c.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "fish-matsyasana",
    "slug": "fish-matsyasana",
    "displayName": "Fish Pose",
    "name": "Fish Pose",
    "sanskritName": "Matsyasana",
    "category": "backbend",
    "difficulty": "beginner",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/fish-matsyasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/fish-matsyasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/fish-matsyasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/fish-matsyasana.webp",
    "description": "Traditional backbend yoga posture (Matsyasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Fish Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "fish-matsyasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "fish-matsyasana.chest.opening",
      "fish-matsyasana.arm.extension"
    ],
    "isPremium": true,
    "orderIndex": 47,
    "aliases": [],
    "rules": [
      {
        "id": "fish-matsyasana.chest.opening",
        "name": "Chest Opening",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.05,
        "weight": 1,
        "severity": "medium",
        "feedback": "Broaden across your collarbones and open your chest."
      },
      {
        "id": "fish-matsyasana.arm.extension",
        "name": "Arm Support",
        "metric": "angle",
        "points": [
          11,
          13,
          15
        ],
        "comparison": "between",
        "min": 140,
        "max": 180,
        "tolerance": 15,
        "weight": 1,
        "severity": "medium",
        "feedback": "Engage arms to support gentle spinal arch."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      13,
      15
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "floating-stick-brahmacharyasana",
    "slug": "floating-stick-brahmacharyasana",
    "displayName": "Floating Stick",
    "name": "Floating Stick",
    "sanskritName": "Brahmacharyasana",
    "category": "standing",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/floating-stick-brahmacharyasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/floating-stick-brahmacharyasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/floating-stick-brahmacharyasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/floating-stick-brahmacharyasana.webp",
    "description": "Traditional standing yoga posture (Brahmacharyasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Floating Stick.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "floating-stick-brahmacharyasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "floating-stick-brahmacharyasana.shoulder.level",
      "floating-stick-brahmacharyasana.spine.vertical",
      "floating-stick-brahmacharyasana.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 48,
    "aliases": [],
    "rules": [
      {
        "id": "floating-stick-brahmacharyasana.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "floating-stick-brahmacharyasana.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "floating-stick-brahmacharyasana.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "flying-lizard",
    "slug": "flying-lizard",
    "displayName": "Flying Lizard",
    "name": "Flying Lizard",
    "sanskritName": null,
    "category": "balancing",
    "difficulty": "advanced",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/flying-lizard.webp",
      "storagePath": "yogaverse-model-asanas-beach/flying-lizard.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/flying-lizard.webp",
    "storagePath": "yogaverse-model-asanas-beach/flying-lizard.webp",
    "description": "Traditional balancing yoga posture (Flying Lizard) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Flying Lizard.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "flying-lizard-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "flying-lizard.standing.leg",
      "flying-lizard.shoulder.alignment"
    ],
    "isPremium": true,
    "orderIndex": 49,
    "aliases": [],
    "rules": [
      {
        "id": "flying-lizard.standing.leg",
        "name": "Standing Leg Stability",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "tolerance": 10,
        "weight": 2,
        "severity": "high",
        "feedback": "Firm your standing leg and root down through the foot."
      },
      {
        "id": "flying-lizard.shoulder.alignment",
        "name": "Shoulder Level",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders even and focus your gaze on a steady point."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "flying-man-eka-pada-koundinyasana",
    "slug": "flying-man-eka-pada-koundinyasana",
    "displayName": "Flying Man",
    "name": "Flying Man",
    "sanskritName": "Eka Pada Koundinyasana",
    "category": "balancing",
    "difficulty": "advanced",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/flying-man-eka-pada-koundinyasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/flying-man-eka-pada-koundinyasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/flying-man-eka-pada-koundinyasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/flying-man-eka-pada-koundinyasana.webp",
    "description": "Traditional balancing yoga posture (Eka Pada Koundinyasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Flying Man.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "flying-man-eka-pada-koundinyasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "flying-man-eka-pada-koundinyasana.standing.leg",
      "flying-man-eka-pada-koundinyasana.shoulder.alignment"
    ],
    "isPremium": true,
    "orderIndex": 50,
    "aliases": [],
    "rules": [
      {
        "id": "flying-man-eka-pada-koundinyasana.standing.leg",
        "name": "Standing Leg Stability",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "tolerance": 10,
        "weight": 2,
        "severity": "high",
        "feedback": "Firm your standing leg and root down through the foot."
      },
      {
        "id": "flying-man-eka-pada-koundinyasana.shoulder.alignment",
        "name": "Shoulder Level",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders even and focus your gaze on a steady point."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "flying-pigeon-eka-pada-galavasana",
    "slug": "flying-pigeon-eka-pada-galavasana",
    "displayName": "Flying Pigeon",
    "name": "Flying Pigeon",
    "sanskritName": "Eka Pada Galavasana",
    "category": "balancing",
    "difficulty": "advanced",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/flying-pigeon-eka-pada-galavasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/flying-pigeon-eka-pada-galavasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/flying-pigeon-eka-pada-galavasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/flying-pigeon-eka-pada-galavasana.webp",
    "description": "Traditional balancing yoga posture (Eka Pada Galavasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Flying Pigeon.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "flying-pigeon-eka-pada-galavasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "flying-pigeon-eka-pada-galavasana.standing.leg",
      "flying-pigeon-eka-pada-galavasana.shoulder.alignment"
    ],
    "isPremium": true,
    "orderIndex": 51,
    "aliases": [],
    "rules": [
      {
        "id": "flying-pigeon-eka-pada-galavasana.standing.leg",
        "name": "Standing Leg Stability",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "tolerance": 10,
        "weight": 2,
        "severity": "high",
        "feedback": "Firm your standing leg and root down through the foot."
      },
      {
        "id": "flying-pigeon-eka-pada-galavasana.shoulder.alignment",
        "name": "Shoulder Level",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders even and focus your gaze on a steady point."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "forearm-balance-pincha-mayurasana",
    "slug": "forearm-balance-pincha-mayurasana",
    "displayName": "Forearm Stand",
    "name": "Forearm Stand",
    "sanskritName": "Pincha Mayurasana",
    "category": "inversion",
    "difficulty": "advanced",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/forearm-balance-pincha-mayurasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/forearm-balance-pincha-mayurasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/forearm-balance-pincha-mayurasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/forearm-balance-pincha-mayurasana.webp",
    "description": "Traditional inversion yoga posture (Pincha Mayurasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Forearm Stand.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "forearm-balance-pincha-mayurasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "forearm-balance-pincha-mayurasana.inversion.line",
      "forearm-balance-pincha-mayurasana.shoulder.base"
    ],
    "isPremium": true,
    "orderIndex": 52,
    "aliases": [],
    "rules": [
      {
        "id": "forearm-balance-pincha-mayurasana.inversion.line",
        "name": "Vertical Line",
        "metric": "vertical_alignment",
        "points": [
          23,
          27
        ],
        "comparison": "less_than",
        "target": 0.12,
        "tolerance": 0.08,
        "weight": 2,
        "severity": "high",
        "feedback": "Stack hips and legs vertically with smooth control."
      },
      {
        "id": "forearm-balance-pincha-mayurasana.shoulder.base",
        "name": "Shoulder Base",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "high",
        "isSafety": true,
        "feedback": "Maintain broad shoulder foundation without compressing neck."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "frog-bhekasana",
    "slug": "frog-bhekasana",
    "displayName": "Frog Pose",
    "name": "Frog Pose",
    "sanskritName": "Bhekasana",
    "category": "backbend",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/frog-bhekasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/frog-bhekasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/frog-bhekasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/frog-bhekasana.webp",
    "description": "Traditional backbend yoga posture (Bhekasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Frog Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "frog-bhekasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "frog-bhekasana.chest.opening",
      "frog-bhekasana.arm.extension"
    ],
    "isPremium": true,
    "orderIndex": 53,
    "aliases": [],
    "rules": [
      {
        "id": "frog-bhekasana.chest.opening",
        "name": "Chest Opening",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.05,
        "weight": 1,
        "severity": "medium",
        "feedback": "Broaden across your collarbones and open your chest."
      },
      {
        "id": "frog-bhekasana.arm.extension",
        "name": "Arm Support",
        "metric": "angle",
        "points": [
          11,
          13,
          15
        ],
        "comparison": "between",
        "min": 140,
        "max": 180,
        "tolerance": 15,
        "weight": 1,
        "severity": "medium",
        "feedback": "Engage arms to support gentle spinal arch."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      13,
      15
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "front-splits-hanumanasana",
    "slug": "front-splits-hanumanasana",
    "displayName": "Front Splits",
    "name": "Front Splits",
    "sanskritName": "Hanumanasana",
    "category": "seated",
    "difficulty": "advanced",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/front-splits-hanumanasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/front-splits-hanumanasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/front-splits-hanumanasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/front-splits-hanumanasana.webp",
    "description": "Traditional seated yoga posture (Hanumanasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Front Splits.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "front-splits-hanumanasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "front-splits-hanumanasana.spine.erect",
      "front-splits-hanumanasana.shoulder.relaxation"
    ],
    "isPremium": true,
    "orderIndex": 54,
    "aliases": [],
    "rules": [
      {
        "id": "front-splits-hanumanasana.spine.erect",
        "name": "Spine Length",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.1,
        "tolerance": 0.08,
        "weight": 1,
        "severity": "medium",
        "feedback": "Sit tall with a straight, elongated spine."
      },
      {
        "id": "front-splits-hanumanasana.shoulder.relaxation",
        "name": "Relaxed Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.05,
        "weight": 1,
        "severity": "low",
        "feedback": "Relax shoulders away from your ears."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "garland-malasana",
    "slug": "garland-malasana",
    "displayName": "Garland Pose",
    "name": "Garland Pose",
    "sanskritName": "Malasana",
    "category": "standing",
    "difficulty": "beginner",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/garland-malasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/garland-malasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/garland-malasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/garland-malasana.webp",
    "description": "Traditional standing yoga posture (Malasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Garland Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "garland-malasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "garland-malasana.shoulder.level",
      "garland-malasana.spine.vertical",
      "garland-malasana.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 55,
    "aliases": [],
    "rules": [
      {
        "id": "garland-malasana.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "garland-malasana.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "garland-malasana.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "gate-parighasana",
    "slug": "gate-parighasana",
    "displayName": "Gate Pose",
    "name": "Gate Pose",
    "sanskritName": "Parighasana",
    "category": "standing",
    "difficulty": "beginner",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/gate-parighasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/gate-parighasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/gate-parighasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/gate-parighasana.webp",
    "description": "Traditional standing yoga posture (Parighasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Gate Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "gate-parighasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "gate-parighasana.shoulder.level",
      "gate-parighasana.spine.vertical",
      "gate-parighasana.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 56,
    "aliases": [],
    "rules": [
      {
        "id": "gate-parighasana.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "gate-parighasana.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "gate-parighasana.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "goddess-utkata-konasana",
    "slug": "goddess-utkata-konasana",
    "displayName": "Goddess Pose",
    "name": "Goddess Pose",
    "sanskritName": "Utkata Konasana",
    "category": "standing",
    "difficulty": "beginner",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/goddess-utkata-konasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/goddess-utkata-konasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/goddess-utkata-konasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/goddess-utkata-konasana.webp",
    "description": "Traditional standing yoga posture (Utkata Konasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Goddess Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "goddess-utkata-konasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "goddess-utkata-konasana.shoulder.level",
      "goddess-utkata-konasana.spine.vertical",
      "goddess-utkata-konasana.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 57,
    "aliases": [],
    "rules": [
      {
        "id": "goddess-utkata-konasana.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "goddess-utkata-konasana.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "goddess-utkata-konasana.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "gorilla-pada-hastasana",
    "slug": "gorilla-pada-hastasana",
    "displayName": "Gorilla",
    "name": "Gorilla",
    "sanskritName": "Pada Hastasana",
    "category": "standing",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/gorilla-pada-hastasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/gorilla-pada-hastasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/gorilla-pada-hastasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/gorilla-pada-hastasana.webp",
    "description": "Traditional standing yoga posture (Pada Hastasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Gorilla.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "gorilla-pada-hastasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "gorilla-pada-hastasana.shoulder.level",
      "gorilla-pada-hastasana.spine.vertical",
      "gorilla-pada-hastasana.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 58,
    "aliases": [],
    "rules": [
      {
        "id": "gorilla-pada-hastasana.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "gorilla-pada-hastasana.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "gorilla-pada-hastasana.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "grasshopper-maksikanagasana",
    "slug": "grasshopper-maksikanagasana",
    "displayName": "Grasshopper",
    "name": "Grasshopper",
    "sanskritName": "Maksikanagasana",
    "category": "standing",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/grasshopper-maksikanagasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/grasshopper-maksikanagasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/grasshopper-maksikanagasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/grasshopper-maksikanagasana.webp",
    "description": "Traditional standing yoga posture (Maksikanagasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Grasshopper.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "grasshopper-maksikanagasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "grasshopper-maksikanagasana.shoulder.level",
      "grasshopper-maksikanagasana.spine.vertical",
      "grasshopper-maksikanagasana.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 59,
    "aliases": [],
    "rules": [
      {
        "id": "grasshopper-maksikanagasana.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "grasshopper-maksikanagasana.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "grasshopper-maksikanagasana.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "half-bow-ardha-dhanurasana",
    "slug": "half-bow-ardha-dhanurasana",
    "displayName": "Half Bow",
    "name": "Half Bow",
    "sanskritName": "Ardha Dhanurasana",
    "category": "backbend",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/half-bow-ardha-dhanurasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/half-bow-ardha-dhanurasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/half-bow-ardha-dhanurasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/half-bow-ardha-dhanurasana.webp",
    "description": "Traditional backbend yoga posture (Ardha Dhanurasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Half Bow.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "half-bow-ardha-dhanurasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "half-bow-ardha-dhanurasana.chest.opening",
      "half-bow-ardha-dhanurasana.arm.extension"
    ],
    "isPremium": true,
    "orderIndex": 60,
    "aliases": [],
    "rules": [
      {
        "id": "half-bow-ardha-dhanurasana.chest.opening",
        "name": "Chest Opening",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.05,
        "weight": 1,
        "severity": "medium",
        "feedback": "Broaden across your collarbones and open your chest."
      },
      {
        "id": "half-bow-ardha-dhanurasana.arm.extension",
        "name": "Arm Support",
        "metric": "angle",
        "points": [
          11,
          13,
          15
        ],
        "comparison": "between",
        "min": 140,
        "max": 180,
        "tolerance": 15,
        "weight": 1,
        "severity": "medium",
        "feedback": "Engage arms to support gentle spinal arch."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      13,
      15
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "half-moon-ardha-chandrasana",
    "slug": "half-moon-ardha-chandrasana",
    "displayName": "Half Moon Pose",
    "name": "Half Moon Pose",
    "sanskritName": "Ardha Chandrasana",
    "category": "balancing",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/half-moon-ardha-chandrasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/half-moon-ardha-chandrasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/half-moon-ardha-chandrasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/half-moon-ardha-chandrasana.webp",
    "description": "Traditional balancing yoga posture (Ardha Chandrasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Half Moon Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "half-moon-ardha-chandrasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "half-moon-ardha-chandrasana.standing.leg",
      "half-moon-ardha-chandrasana.shoulder.alignment"
    ],
    "isPremium": true,
    "orderIndex": 61,
    "aliases": [
      "half-moon",
      "ardha-chandrasana"
    ],
    "rules": [
      {
        "id": "half-moon-ardha-chandrasana.standing.leg",
        "name": "Standing Leg Stability",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "tolerance": 10,
        "weight": 2,
        "severity": "high",
        "feedback": "Firm your standing leg and root down through the foot."
      },
      {
        "id": "half-moon-ardha-chandrasana.shoulder.alignment",
        "name": "Shoulder Level",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders even and focus your gaze on a steady point."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "half-pigeon-ardha-kapotasana",
    "slug": "half-pigeon-ardha-kapotasana",
    "displayName": "Half Pigeon Pose",
    "name": "Half Pigeon Pose",
    "sanskritName": "Ardha Kapotasana",
    "category": "seated",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/half-pigeon-ardha-kapotasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/half-pigeon-ardha-kapotasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/half-pigeon-ardha-kapotasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/half-pigeon-ardha-kapotasana.webp",
    "description": "Traditional seated yoga posture (Ardha Kapotasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Half Pigeon Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "half-pigeon-ardha-kapotasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "half-pigeon-ardha-kapotasana.spine.erect",
      "half-pigeon-ardha-kapotasana.shoulder.relaxation"
    ],
    "isPremium": true,
    "orderIndex": 62,
    "aliases": [],
    "rules": [
      {
        "id": "half-pigeon-ardha-kapotasana.spine.erect",
        "name": "Spine Length",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.1,
        "tolerance": 0.08,
        "weight": 1,
        "severity": "medium",
        "feedback": "Sit tall with a straight, elongated spine."
      },
      {
        "id": "half-pigeon-ardha-kapotasana.shoulder.relaxation",
        "name": "Relaxed Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.05,
        "weight": 1,
        "severity": "low",
        "feedback": "Relax shoulders away from your ears."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "handstand-adho-mukha-vrksasana",
    "slug": "handstand-adho-mukha-vrksasana",
    "displayName": "Handstand",
    "name": "Handstand",
    "sanskritName": "Adho Mukha Vrksasana",
    "category": "inversion",
    "difficulty": "advanced",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/handstand-adho-mukha-vrksasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/handstand-adho-mukha-vrksasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/handstand-adho-mukha-vrksasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/handstand-adho-mukha-vrksasana.webp",
    "description": "Traditional inversion yoga posture (Adho Mukha Vrksasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Handstand.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "handstand-adho-mukha-vrksasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "handstand-adho-mukha-vrksasana.inversion.line",
      "handstand-adho-mukha-vrksasana.shoulder.base"
    ],
    "isPremium": true,
    "orderIndex": 63,
    "aliases": [],
    "rules": [
      {
        "id": "handstand-adho-mukha-vrksasana.inversion.line",
        "name": "Vertical Line",
        "metric": "vertical_alignment",
        "points": [
          23,
          27
        ],
        "comparison": "less_than",
        "target": 0.12,
        "tolerance": 0.08,
        "weight": 2,
        "severity": "high",
        "feedback": "Stack hips and legs vertically with smooth control."
      },
      {
        "id": "handstand-adho-mukha-vrksasana.shoulder.base",
        "name": "Shoulder Base",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "high",
        "isSafety": true,
        "feedback": "Maintain broad shoulder foundation without compressing neck."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "happy-baby-ananda-balasana",
    "slug": "happy-baby-ananda-balasana",
    "displayName": "Happy Baby Pose",
    "name": "Happy Baby Pose",
    "sanskritName": "Ananda Balasana",
    "category": "restorative",
    "difficulty": "beginner",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/happy-baby-ananda-balasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/happy-baby-ananda-balasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/happy-baby-ananda-balasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/happy-baby-ananda-balasana.webp",
    "description": "Traditional restorative yoga posture (Ananda Balasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Happy Baby Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "happy-baby-ananda-balasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "happy-baby-ananda-balasana.body.symmetry"
    ],
    "isPremium": true,
    "orderIndex": 64,
    "aliases": [],
    "rules": [
      {
        "id": "happy-baby-ananda-balasana.body.symmetry",
        "name": "Symmetric Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "low",
        "feedback": "Relax deeply and breathe steadily into the posture."
      }
    ],
    "requiredLandmarks": [
      11,
      12
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "head-to-knee-janu-sirsasana",
    "slug": "head-to-knee-janu-sirsasana",
    "displayName": "Head To Knee Janu",
    "name": "Head To Knee Janu",
    "sanskritName": "Sirsasana",
    "category": "inversion",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/head-to-knee-janu-sirsasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/head-to-knee-janu-sirsasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/head-to-knee-janu-sirsasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/head-to-knee-janu-sirsasana.webp",
    "description": "Traditional inversion yoga posture (Sirsasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Head To Knee Janu.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "head-to-knee-janu-sirsasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "head-to-knee-janu-sirsasana.inversion.line",
      "head-to-knee-janu-sirsasana.shoulder.base"
    ],
    "isPremium": true,
    "orderIndex": 65,
    "aliases": [],
    "rules": [
      {
        "id": "head-to-knee-janu-sirsasana.inversion.line",
        "name": "Vertical Line",
        "metric": "vertical_alignment",
        "points": [
          23,
          27
        ],
        "comparison": "less_than",
        "target": 0.12,
        "tolerance": 0.08,
        "weight": 2,
        "severity": "high",
        "feedback": "Stack hips and legs vertically with smooth control."
      },
      {
        "id": "head-to-knee-janu-sirsasana.shoulder.base",
        "name": "Shoulder Base",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "high",
        "isSafety": true,
        "feedback": "Maintain broad shoulder foundation without compressing neck."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "headstand-sirsasana",
    "slug": "headstand-sirsasana",
    "displayName": "Headstand",
    "name": "Headstand",
    "sanskritName": "Sirsasana",
    "category": "inversion",
    "difficulty": "advanced",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/headstand-sirsasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/headstand-sirsasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/headstand-sirsasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/headstand-sirsasana.webp",
    "description": "Traditional inversion yoga posture (Sirsasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Headstand.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "headstand-sirsasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "headstand-sirsasana.inversion.line",
      "headstand-sirsasana.shoulder.base"
    ],
    "isPremium": true,
    "orderIndex": 66,
    "aliases": [],
    "rules": [
      {
        "id": "headstand-sirsasana.inversion.line",
        "name": "Vertical Line",
        "metric": "vertical_alignment",
        "points": [
          23,
          27
        ],
        "comparison": "less_than",
        "target": 0.12,
        "tolerance": 0.08,
        "weight": 2,
        "severity": "high",
        "feedback": "Stack hips and legs vertically with smooth control."
      },
      {
        "id": "headstand-sirsasana.shoulder.base",
        "name": "Shoulder Base",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "high",
        "isSafety": true,
        "feedback": "Maintain broad shoulder foundation without compressing neck."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "hero-virasana",
    "slug": "hero-virasana",
    "displayName": "Hero Pose",
    "name": "Hero Pose",
    "sanskritName": "Virasana",
    "category": "seated",
    "difficulty": "beginner",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/hero-virasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/hero-virasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/hero-virasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/hero-virasana.webp",
    "description": "Traditional seated yoga posture (Virasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Hero Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "hero-virasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "hero-virasana.spine.erect",
      "hero-virasana.shoulder.relaxation"
    ],
    "isPremium": true,
    "orderIndex": 67,
    "aliases": [
      "hero-pose",
      "virasana"
    ],
    "rules": [
      {
        "id": "hero-virasana.spine.erect",
        "name": "Spine Length",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.1,
        "tolerance": 0.08,
        "weight": 1,
        "severity": "medium",
        "feedback": "Sit tall with a straight, elongated spine."
      },
      {
        "id": "hero-virasana.shoulder.relaxation",
        "name": "Relaxed Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.05,
        "weight": 1,
        "severity": "low",
        "feedback": "Relax shoulders away from your ears."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "heron-kraunchasana",
    "slug": "heron-kraunchasana",
    "displayName": "Heron",
    "name": "Heron",
    "sanskritName": "Kraunchasana",
    "category": "seated",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/heron-kraunchasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/heron-kraunchasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/heron-kraunchasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/heron-kraunchasana.webp",
    "description": "Traditional seated yoga posture (Kraunchasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Heron.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "heron-kraunchasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "heron-kraunchasana.spine.erect",
      "heron-kraunchasana.shoulder.relaxation"
    ],
    "isPremium": true,
    "orderIndex": 68,
    "aliases": [],
    "rules": [
      {
        "id": "heron-kraunchasana.spine.erect",
        "name": "Spine Length",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.1,
        "tolerance": 0.08,
        "weight": 1,
        "severity": "medium",
        "feedback": "Sit tall with a straight, elongated spine."
      },
      {
        "id": "heron-kraunchasana.shoulder.relaxation",
        "name": "Relaxed Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.05,
        "weight": 1,
        "severity": "low",
        "feedback": "Relax shoulders away from your ears."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "himalayan-duck-karandavasana",
    "slug": "himalayan-duck-karandavasana",
    "displayName": "Himalayan Duck",
    "name": "Himalayan Duck",
    "sanskritName": "Karandavasana",
    "category": "standing",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/himalayan-duck-karandavasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/himalayan-duck-karandavasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/himalayan-duck-karandavasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/himalayan-duck-karandavasana.webp",
    "description": "Traditional standing yoga posture (Karandavasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Himalayan Duck.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "himalayan-duck-karandavasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "himalayan-duck-karandavasana.shoulder.level",
      "himalayan-duck-karandavasana.spine.vertical",
      "himalayan-duck-karandavasana.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 69,
    "aliases": [],
    "rules": [
      {
        "id": "himalayan-duck-karandavasana.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "himalayan-duck-karandavasana.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "himalayan-duck-karandavasana.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "horse-vatayanasana",
    "slug": "horse-vatayanasana",
    "displayName": "Horse",
    "name": "Horse",
    "sanskritName": "Vatayanasana",
    "category": "standing",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/horse-vatayanasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/horse-vatayanasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/horse-vatayanasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/horse-vatayanasana.webp",
    "description": "Traditional standing yoga posture (Vatayanasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Horse.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "horse-vatayanasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "horse-vatayanasana.shoulder.level",
      "horse-vatayanasana.spine.vertical",
      "horse-vatayanasana.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 70,
    "aliases": [],
    "rules": [
      {
        "id": "horse-vatayanasana.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "horse-vatayanasana.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "horse-vatayanasana.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "humble-flamingo",
    "slug": "humble-flamingo",
    "displayName": "Humble Flamingo",
    "name": "Humble Flamingo",
    "sanskritName": null,
    "category": "standing",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/humble-flamingo.webp",
      "storagePath": "yogaverse-model-asanas-beach/humble-flamingo.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/humble-flamingo.webp",
    "storagePath": "yogaverse-model-asanas-beach/humble-flamingo.webp",
    "description": "Traditional standing yoga posture (Humble Flamingo) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Humble Flamingo.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "humble-flamingo-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "humble-flamingo.shoulder.level",
      "humble-flamingo.spine.vertical",
      "humble-flamingo.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 71,
    "aliases": [],
    "rules": [
      {
        "id": "humble-flamingo.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "humble-flamingo.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "humble-flamingo.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "inverted-staff-dvi-pada-viparita-dandasana",
    "slug": "inverted-staff-dvi-pada-viparita-dandasana",
    "displayName": "Inverted Staff Dvi Pada Viparita",
    "name": "Inverted Staff Dvi Pada Viparita",
    "sanskritName": "Dandasana",
    "category": "seated",
    "difficulty": "beginner",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/inverted-staff-dvi-pada-viparita-dandasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/inverted-staff-dvi-pada-viparita-dandasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/inverted-staff-dvi-pada-viparita-dandasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/inverted-staff-dvi-pada-viparita-dandasana.webp",
    "description": "Traditional seated yoga posture (Dandasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Inverted Staff Dvi Pada Viparita.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "inverted-staff-dvi-pada-viparita-dandasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "inverted-staff-dvi-pada-viparita-dandasana.spine.erect",
      "inverted-staff-dvi-pada-viparita-dandasana.shoulder.relaxation"
    ],
    "isPremium": true,
    "orderIndex": 72,
    "aliases": [],
    "rules": [
      {
        "id": "inverted-staff-dvi-pada-viparita-dandasana.spine.erect",
        "name": "Spine Length",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.1,
        "tolerance": 0.08,
        "weight": 1,
        "severity": "medium",
        "feedback": "Sit tall with a straight, elongated spine."
      },
      {
        "id": "inverted-staff-dvi-pada-viparita-dandasana.shoulder.relaxation",
        "name": "Relaxed Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.05,
        "weight": 1,
        "severity": "low",
        "feedback": "Relax shoulders away from your ears."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "king-pigeon-eka-pada-rajakapotasana",
    "slug": "king-pigeon-eka-pada-rajakapotasana",
    "displayName": "King Pigeon Pose",
    "name": "King Pigeon Pose",
    "sanskritName": "Eka Pada Rajakapotasana",
    "category": "backbend",
    "difficulty": "advanced",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/king-pigeon-eka-pada-rajakapotasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/king-pigeon-eka-pada-rajakapotasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/king-pigeon-eka-pada-rajakapotasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/king-pigeon-eka-pada-rajakapotasana.webp",
    "description": "Traditional backbend yoga posture (Eka Pada Rajakapotasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for King Pigeon Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "king-pigeon-eka-pada-rajakapotasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "king-pigeon-eka-pada-rajakapotasana.chest.opening",
      "king-pigeon-eka-pada-rajakapotasana.arm.extension"
    ],
    "isPremium": true,
    "orderIndex": 73,
    "aliases": [],
    "rules": [
      {
        "id": "king-pigeon-eka-pada-rajakapotasana.chest.opening",
        "name": "Chest Opening",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.05,
        "weight": 1,
        "severity": "medium",
        "feedback": "Broaden across your collarbones and open your chest."
      },
      {
        "id": "king-pigeon-eka-pada-rajakapotasana.arm.extension",
        "name": "Arm Support",
        "metric": "angle",
        "points": [
          11,
          13,
          15
        ],
        "comparison": "between",
        "min": 140,
        "max": 180,
        "tolerance": 15,
        "weight": 1,
        "severity": "medium",
        "feedback": "Engage arms to support gentle spinal arch."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      13,
      15
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "legs-up-the-wall-viparita-karani",
    "slug": "legs-up-the-wall-viparita-karani",
    "displayName": "Legs-Up-The-Wall Pose",
    "name": "Legs-Up-The-Wall Pose",
    "sanskritName": "Viparita Karani",
    "category": "restorative",
    "difficulty": "beginner",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/legs-up-the-wall-viparita-karani.webp",
      "storagePath": "yogaverse-model-asanas-beach/legs-up-the-wall-viparita-karani.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/legs-up-the-wall-viparita-karani.webp",
    "storagePath": "yogaverse-model-asanas-beach/legs-up-the-wall-viparita-karani.webp",
    "description": "Traditional restorative yoga posture (Viparita Karani) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Legs-Up-The-Wall Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "legs-up-the-wall-viparita-karani-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "legs-up-the-wall-viparita-karani.body.symmetry"
    ],
    "isPremium": true,
    "orderIndex": 74,
    "aliases": [],
    "rules": [
      {
        "id": "legs-up-the-wall-viparita-karani.body.symmetry",
        "name": "Symmetric Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "low",
        "feedback": "Relax deeply and breathe steadily into the posture."
      }
    ],
    "requiredLandmarks": [
      11,
      12
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "little-thunderbolt-laghu-vajrasana",
    "slug": "little-thunderbolt-laghu-vajrasana",
    "displayName": "Little Thunderbolt",
    "name": "Little Thunderbolt",
    "sanskritName": "Laghu Vajrasana",
    "category": "standing",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/little-thunderbolt-laghu-vajrasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/little-thunderbolt-laghu-vajrasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/little-thunderbolt-laghu-vajrasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/little-thunderbolt-laghu-vajrasana.webp",
    "description": "Traditional standing yoga posture (Laghu Vajrasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Little Thunderbolt.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "little-thunderbolt-laghu-vajrasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "little-thunderbolt-laghu-vajrasana.shoulder.level",
      "little-thunderbolt-laghu-vajrasana.spine.vertical",
      "little-thunderbolt-laghu-vajrasana.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 75,
    "aliases": [],
    "rules": [
      {
        "id": "little-thunderbolt-laghu-vajrasana.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "little-thunderbolt-laghu-vajrasana.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "little-thunderbolt-laghu-vajrasana.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "lizard-uttana-pristhasana",
    "slug": "lizard-uttana-pristhasana",
    "displayName": "Lizard Pose",
    "name": "Lizard Pose",
    "sanskritName": "Uttana Pristhasana",
    "category": "standing",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/lizard-uttana-pristhasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/lizard-uttana-pristhasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/lizard-uttana-pristhasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/lizard-uttana-pristhasana.webp",
    "description": "Traditional standing yoga posture (Uttana Pristhasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Lizard Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "lizard-uttana-pristhasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "lizard-uttana-pristhasana.shoulder.level",
      "lizard-uttana-pristhasana.spine.vertical",
      "lizard-uttana-pristhasana.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 76,
    "aliases": [],
    "rules": [
      {
        "id": "lizard-uttana-pristhasana.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "lizard-uttana-pristhasana.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "lizard-uttana-pristhasana.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "locust-i-shalabhasana-a",
    "slug": "locust-i-shalabhasana-a",
    "displayName": "Locust I",
    "name": "Locust I",
    "sanskritName": "Shalabhasana A",
    "category": "backbend",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/locust-i-shalabhasana-a.webp",
      "storagePath": "yogaverse-model-asanas-beach/locust-i-shalabhasana-a.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/locust-i-shalabhasana-a.webp",
    "storagePath": "yogaverse-model-asanas-beach/locust-i-shalabhasana-a.webp",
    "description": "Traditional backbend yoga posture (Shalabhasana A) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Locust I.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "locust-i-shalabhasana-a-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "locust-i-shalabhasana-a.chest.opening",
      "locust-i-shalabhasana-a.arm.extension"
    ],
    "isPremium": true,
    "orderIndex": 77,
    "aliases": [],
    "rules": [
      {
        "id": "locust-i-shalabhasana-a.chest.opening",
        "name": "Chest Opening",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.05,
        "weight": 1,
        "severity": "medium",
        "feedback": "Broaden across your collarbones and open your chest."
      },
      {
        "id": "locust-i-shalabhasana-a.arm.extension",
        "name": "Arm Support",
        "metric": "angle",
        "points": [
          11,
          13,
          15
        ],
        "comparison": "between",
        "min": 140,
        "max": 180,
        "tolerance": 15,
        "weight": 1,
        "severity": "medium",
        "feedback": "Engage arms to support gentle spinal arch."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      13,
      15
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "locust-ii-shalabhasana-b",
    "slug": "locust-ii-shalabhasana-b",
    "displayName": "Locust II",
    "name": "Locust II",
    "sanskritName": "Shalabhasana B",
    "category": "backbend",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/locust-ii-shalabhasana-b.webp",
      "storagePath": "yogaverse-model-asanas-beach/locust-ii-shalabhasana-b.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/locust-ii-shalabhasana-b.webp",
    "storagePath": "yogaverse-model-asanas-beach/locust-ii-shalabhasana-b.webp",
    "description": "Traditional backbend yoga posture (Shalabhasana B) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Locust II.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "locust-ii-shalabhasana-b-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "locust-ii-shalabhasana-b.chest.opening",
      "locust-ii-shalabhasana-b.arm.extension"
    ],
    "isPremium": true,
    "orderIndex": 78,
    "aliases": [],
    "rules": [
      {
        "id": "locust-ii-shalabhasana-b.chest.opening",
        "name": "Chest Opening",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.05,
        "weight": 1,
        "severity": "medium",
        "feedback": "Broaden across your collarbones and open your chest."
      },
      {
        "id": "locust-ii-shalabhasana-b.arm.extension",
        "name": "Arm Support",
        "metric": "angle",
        "points": [
          11,
          13,
          15
        ],
        "comparison": "between",
        "min": 140,
        "max": 180,
        "tolerance": 15,
        "weight": 1,
        "severity": "medium",
        "feedback": "Engage arms to support gentle spinal arch."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      13,
      15
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "locust-iii-shalabhasana-c",
    "slug": "locust-iii-shalabhasana-c",
    "displayName": "Locust III",
    "name": "Locust III",
    "sanskritName": "Shalabhasana C",
    "category": "backbend",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/locust-iii-shalabhasana-c.webp",
      "storagePath": "yogaverse-model-asanas-beach/locust-iii-shalabhasana-c.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/locust-iii-shalabhasana-c.webp",
    "storagePath": "yogaverse-model-asanas-beach/locust-iii-shalabhasana-c.webp",
    "description": "Traditional backbend yoga posture (Shalabhasana C) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Locust III.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "locust-iii-shalabhasana-c-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "locust-iii-shalabhasana-c.chest.opening",
      "locust-iii-shalabhasana-c.arm.extension"
    ],
    "isPremium": true,
    "orderIndex": 79,
    "aliases": [],
    "rules": [
      {
        "id": "locust-iii-shalabhasana-c.chest.opening",
        "name": "Chest Opening",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.05,
        "weight": 1,
        "severity": "medium",
        "feedback": "Broaden across your collarbones and open your chest."
      },
      {
        "id": "locust-iii-shalabhasana-c.arm.extension",
        "name": "Arm Support",
        "metric": "angle",
        "points": [
          11,
          13,
          15
        ],
        "comparison": "between",
        "min": 140,
        "max": 180,
        "tolerance": 15,
        "weight": 1,
        "severity": "medium",
        "feedback": "Engage arms to support gentle spinal arch."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      13,
      15
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "lord-of-the-fishes-paripurna-matsyendrasana",
    "slug": "lord-of-the-fishes-paripurna-matsyendrasana",
    "displayName": "Lord Of The Fishes'",
    "name": "Lord Of The Fishes'",
    "sanskritName": "Paripurna Matsyendrasana",
    "category": "backbend",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/lord-of-the-fishes-paripurna-matsyendrasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/lord-of-the-fishes-paripurna-matsyendrasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/lord-of-the-fishes-paripurna-matsyendrasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/lord-of-the-fishes-paripurna-matsyendrasana.webp",
    "description": "Traditional backbend yoga posture (Paripurna Matsyendrasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Lord Of The Fishes'.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "lord-of-the-fishes-paripurna-matsyendrasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "lord-of-the-fishes-paripurna-matsyendrasana.chest.opening",
      "lord-of-the-fishes-paripurna-matsyendrasana.arm.extension"
    ],
    "isPremium": true,
    "orderIndex": 80,
    "aliases": [],
    "rules": [
      {
        "id": "lord-of-the-fishes-paripurna-matsyendrasana.chest.opening",
        "name": "Chest Opening",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.05,
        "weight": 1,
        "severity": "medium",
        "feedback": "Broaden across your collarbones and open your chest."
      },
      {
        "id": "lord-of-the-fishes-paripurna-matsyendrasana.arm.extension",
        "name": "Arm Support",
        "metric": "angle",
        "points": [
          11,
          13,
          15
        ],
        "comparison": "between",
        "min": 140,
        "max": 180,
        "tolerance": 15,
        "weight": 1,
        "severity": "medium",
        "feedback": "Engage arms to support gentle spinal arch."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      13,
      15
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "lotus-padmasana",
    "slug": "lotus-padmasana",
    "displayName": "Lotus Pose",
    "name": "Lotus Pose",
    "sanskritName": "Padmasana",
    "category": "seated",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/lotus-padmasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/lotus-padmasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/lotus-padmasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/lotus-padmasana.webp",
    "description": "Traditional seated yoga posture (Padmasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Lotus Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "lotus-padmasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "lotus-padmasana.spine.erect",
      "lotus-padmasana.shoulder.relaxation"
    ],
    "isPremium": true,
    "orderIndex": 81,
    "aliases": [
      "lotus-pose",
      "padmasana"
    ],
    "rules": [
      {
        "id": "lotus-padmasana.spine.erect",
        "name": "Spine Length",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.1,
        "tolerance": 0.08,
        "weight": 1,
        "severity": "medium",
        "feedback": "Sit tall with a straight, elongated spine."
      },
      {
        "id": "lotus-padmasana.shoulder.relaxation",
        "name": "Relaxed Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.05,
        "weight": 1,
        "severity": "low",
        "feedback": "Relax shoulders away from your ears."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "low-push-up-chaturanga-dandasana",
    "slug": "low-push-up-chaturanga-dandasana",
    "displayName": "Four-Limbed Staff Pose",
    "name": "Four-Limbed Staff Pose",
    "sanskritName": "Chaturanga Dandasana",
    "category": "core",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/low-push-up-chaturanga-dandasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/low-push-up-chaturanga-dandasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/low-push-up-chaturanga-dandasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/low-push-up-chaturanga-dandasana.webp",
    "description": "Traditional core yoga posture (Chaturanga Dandasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Four-Limbed Staff Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "low-push-up-chaturanga-dandasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "low-push-up-chaturanga-dandasana.core.alignment",
      "low-push-up-chaturanga-dandasana.shoulder.stability"
    ],
    "isPremium": true,
    "orderIndex": 82,
    "aliases": [
      "chaturanga-dandasana",
      "chaturanga",
      "four-limbed-staff"
    ],
    "rules": [
      {
        "id": "low-push-up-chaturanga-dandasana.core.alignment",
        "name": "Torso Line",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 150,
        "max": 180,
        "tolerance": 15,
        "weight": 2,
        "severity": "high",
        "feedback": "Engage abdominal muscles to maintain straight body line."
      },
      {
        "id": "low-push-up-chaturanga-dandasana.shoulder.stability",
        "name": "Shoulder Stability",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Press through hands and keep shoulder girdle firm."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      25
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "lunge-runner",
    "slug": "lunge-runner",
    "displayName": "Lunge Runner",
    "name": "Lunge Runner",
    "sanskritName": null,
    "category": "standing",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/lunge-runner.webp",
      "storagePath": "yogaverse-model-asanas-beach/lunge-runner.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/lunge-runner.webp",
    "storagePath": "yogaverse-model-asanas-beach/lunge-runner.webp",
    "description": "Traditional standing yoga posture (Lunge Runner) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Lunge Runner.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "lunge-runner-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "lunge-runner.shoulder.level",
      "lunge-runner.spine.vertical",
      "lunge-runner.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 83,
    "aliases": [
      "step-4-low-lunge-ashwa-sanchalanasana",
      "step-9-low-lunge-ashwa-sanchalanasana",
      "ashwa-sanchalanasana"
    ],
    "rules": [
      {
        "id": "lunge-runner.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "lunge-runner.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "lunge-runner.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "moon-bird-eka-pada-shirshasana-c",
    "slug": "moon-bird-eka-pada-shirshasana-c",
    "displayName": "Moon Bird",
    "name": "Moon Bird",
    "sanskritName": "Eka Pada Shirshasana C",
    "category": "standing",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/moon-bird-eka-pada-shirshasana-c.webp",
      "storagePath": "yogaverse-model-asanas-beach/moon-bird-eka-pada-shirshasana-c.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/moon-bird-eka-pada-shirshasana-c.webp",
    "storagePath": "yogaverse-model-asanas-beach/moon-bird-eka-pada-shirshasana-c.webp",
    "description": "Traditional standing yoga posture (Eka Pada Shirshasana C) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Moon Bird.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "moon-bird-eka-pada-shirshasana-c-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "moon-bird-eka-pada-shirshasana-c.shoulder.level",
      "moon-bird-eka-pada-shirshasana-c.spine.vertical",
      "moon-bird-eka-pada-shirshasana-c.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 84,
    "aliases": [],
    "rules": [
      {
        "id": "moon-bird-eka-pada-shirshasana-c.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "moon-bird-eka-pada-shirshasana-c.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "moon-bird-eka-pada-shirshasana-c.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "mountain-tadasana",
    "slug": "mountain-tadasana",
    "displayName": "Mountain Pose",
    "name": "Mountain Pose",
    "sanskritName": "Tadasana",
    "category": "standing",
    "difficulty": "beginner",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/mountain-tadasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/mountain-tadasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/mountain-tadasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/mountain-tadasana.webp",
    "description": "Traditional standing yoga posture (Tadasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Mountain Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "mountain-tadasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "tadasana-shoulder-level",
      "tadasana-hip-level",
      "tadasana-legs-straight"
    ],
    "isPremium": false,
    "orderIndex": 85,
    "aliases": [
      "mountain-pose",
      "tadasana",
      "step-1-pranamasana-namaskar",
      "step-12-mountain-tadasana"
    ],
    "rules": [
      {
        "id": "tadasana-shoulder-level",
        "name": "Shoulder Alignment",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed away from your ears."
      },
      {
        "id": "tadasana-hip-level",
        "name": "Hip Alignment",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute your weight evenly and keep your hips level."
      },
      {
        "id": "tadasana-legs-straight",
        "name": "Leg Extension",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "weight": 1,
        "severity": "low",
        "feedback": "Stand tall with both legs fully straight."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24,
      25,
      27
    ],
    "validation": {
      "status": "production",
      "version": "1.0.0",
      "sampleCount": 20,
      "expertReviewed": true
    }
  },
  {
    "id": "noose-pashasana",
    "slug": "noose-pashasana",
    "displayName": "Noose",
    "name": "Noose",
    "sanskritName": "Pashasana",
    "category": "standing",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/noose-pashasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/noose-pashasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/noose-pashasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/noose-pashasana.webp",
    "description": "Traditional standing yoga posture (Pashasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Noose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "noose-pashasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "noose-pashasana.shoulder.level",
      "noose-pashasana.spine.vertical",
      "noose-pashasana.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 86,
    "aliases": [],
    "rules": [
      {
        "id": "noose-pashasana.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "noose-pashasana.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "noose-pashasana.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "one-leg-behind-the-head-i-eka-pada-shirshasana-a",
    "slug": "one-leg-behind-the-head-i-eka-pada-shirshasana-a",
    "displayName": "One Leg Behind The Head I",
    "name": "One Leg Behind The Head I",
    "sanskritName": "Eka Pada Shirshasana A",
    "category": "standing",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/one-leg-behind-the-head-i-eka-pada-shirshasana-a.webp",
      "storagePath": "yogaverse-model-asanas-beach/one-leg-behind-the-head-i-eka-pada-shirshasana-a.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/one-leg-behind-the-head-i-eka-pada-shirshasana-a.webp",
    "storagePath": "yogaverse-model-asanas-beach/one-leg-behind-the-head-i-eka-pada-shirshasana-a.webp",
    "description": "Traditional standing yoga posture (Eka Pada Shirshasana A) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for One Leg Behind The Head I.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "one-leg-behind-the-head-i-eka-pada-shirshasana-a-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "one-leg-behind-the-head-i-eka-pada-shirshasana-a.shoulder.level",
      "one-leg-behind-the-head-i-eka-pada-shirshasana-a.spine.vertical",
      "one-leg-behind-the-head-i-eka-pada-shirshasana-a.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 87,
    "aliases": [],
    "rules": [
      {
        "id": "one-leg-behind-the-head-i-eka-pada-shirshasana-a.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "one-leg-behind-the-head-i-eka-pada-shirshasana-a.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "one-leg-behind-the-head-i-eka-pada-shirshasana-a.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "one-leg-behind-the-head-ii-eka-pada-shirshasana-b",
    "slug": "one-leg-behind-the-head-ii-eka-pada-shirshasana-b",
    "displayName": "One Leg Behind The Head II",
    "name": "One Leg Behind The Head II",
    "sanskritName": "Eka Pada Shirshasana B",
    "category": "standing",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/one-leg-behind-the-head-ii-eka-pada-shirshasana-b.webp",
      "storagePath": "yogaverse-model-asanas-beach/one-leg-behind-the-head-ii-eka-pada-shirshasana-b.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/one-leg-behind-the-head-ii-eka-pada-shirshasana-b.webp",
    "storagePath": "yogaverse-model-asanas-beach/one-leg-behind-the-head-ii-eka-pada-shirshasana-b.webp",
    "description": "Traditional standing yoga posture (Eka Pada Shirshasana B) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for One Leg Behind The Head II.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "one-leg-behind-the-head-ii-eka-pada-shirshasana-b-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "one-leg-behind-the-head-ii-eka-pada-shirshasana-b.shoulder.level",
      "one-leg-behind-the-head-ii-eka-pada-shirshasana-b.spine.vertical",
      "one-leg-behind-the-head-ii-eka-pada-shirshasana-b.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 88,
    "aliases": [],
    "rules": [
      {
        "id": "one-leg-behind-the-head-ii-eka-pada-shirshasana-b.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "one-leg-behind-the-head-ii-eka-pada-shirshasana-b.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "one-leg-behind-the-head-ii-eka-pada-shirshasana-b.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "peacock-mayurasana",
    "slug": "peacock-mayurasana",
    "displayName": "Peacock Pose",
    "name": "Peacock Pose",
    "sanskritName": "Mayurasana",
    "category": "balancing",
    "difficulty": "advanced",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/peacock-mayurasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/peacock-mayurasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/peacock-mayurasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/peacock-mayurasana.webp",
    "description": "Traditional balancing yoga posture (Mayurasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Peacock Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "peacock-mayurasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "peacock-mayurasana.standing.leg",
      "peacock-mayurasana.shoulder.alignment"
    ],
    "isPremium": true,
    "orderIndex": 89,
    "aliases": [],
    "rules": [
      {
        "id": "peacock-mayurasana.standing.leg",
        "name": "Standing Leg Stability",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "tolerance": 10,
        "weight": 2,
        "severity": "high",
        "feedback": "Firm your standing leg and root down through the foot."
      },
      {
        "id": "peacock-mayurasana.shoulder.alignment",
        "name": "Shoulder Level",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders even and focus your gaze on a steady point."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "pendant-lolasana",
    "slug": "pendant-lolasana",
    "displayName": "Pendant",
    "name": "Pendant",
    "sanskritName": "Lolasana",
    "category": "standing",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/pendant-lolasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/pendant-lolasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/pendant-lolasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/pendant-lolasana.webp",
    "description": "Traditional standing yoga posture (Lolasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Pendant.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "pendant-lolasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "pendant-lolasana.shoulder.level",
      "pendant-lolasana.spine.vertical",
      "pendant-lolasana.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 90,
    "aliases": [],
    "rules": [
      {
        "id": "pendant-lolasana.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "pendant-lolasana.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "pendant-lolasana.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "pigeon-kapotasana",
    "slug": "pigeon-kapotasana",
    "displayName": "Pigeon Pose",
    "name": "Pigeon Pose",
    "sanskritName": "Kapotasana",
    "category": "backbend",
    "difficulty": "advanced",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/pigeon-kapotasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/pigeon-kapotasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/pigeon-kapotasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/pigeon-kapotasana.webp",
    "description": "Traditional backbend yoga posture (Kapotasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Pigeon Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "pigeon-kapotasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "pigeon-kapotasana.chest.opening",
      "pigeon-kapotasana.arm.extension"
    ],
    "isPremium": true,
    "orderIndex": 91,
    "aliases": [],
    "rules": [
      {
        "id": "pigeon-kapotasana.chest.opening",
        "name": "Chest Opening",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.05,
        "weight": 1,
        "severity": "medium",
        "feedback": "Broaden across your collarbones and open your chest."
      },
      {
        "id": "pigeon-kapotasana.arm.extension",
        "name": "Arm Support",
        "metric": "angle",
        "points": [
          11,
          13,
          15
        ],
        "comparison": "between",
        "min": 140,
        "max": 180,
        "tolerance": 15,
        "weight": 1,
        "severity": "medium",
        "feedback": "Engage arms to support gentle spinal arch."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      13,
      15
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "plank-phalakasana",
    "slug": "plank-phalakasana",
    "displayName": "Plank Pose",
    "name": "Plank Pose",
    "sanskritName": "Phalakasana",
    "category": "core",
    "difficulty": "beginner",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/plank-phalakasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/plank-phalakasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/plank-phalakasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/plank-phalakasana.webp",
    "description": "Traditional core yoga posture (Phalakasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Plank Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "plank-phalakasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "plank-phalakasana.core.alignment",
      "plank-phalakasana.shoulder.stability"
    ],
    "isPremium": true,
    "orderIndex": 92,
    "aliases": [
      "plank",
      "phalakasana"
    ],
    "rules": [
      {
        "id": "plank-phalakasana.core.alignment",
        "name": "Torso Line",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 150,
        "max": 180,
        "tolerance": 15,
        "weight": 2,
        "severity": "high",
        "feedback": "Engage abdominal muscles to maintain straight body line."
      },
      {
        "id": "plank-phalakasana.shoulder.stability",
        "name": "Shoulder Stability",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Press through hands and keep shoulder girdle firm."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      25
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "plow-halasana",
    "slug": "plow-halasana",
    "displayName": "Plow Pose",
    "name": "Plow Pose",
    "sanskritName": "Halasana",
    "category": "inversion",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/plow-halasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/plow-halasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/plow-halasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/plow-halasana.webp",
    "description": "Traditional inversion yoga posture (Halasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Plow Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "plow-halasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "plow-halasana.inversion.line",
      "plow-halasana.shoulder.base"
    ],
    "isPremium": true,
    "orderIndex": 93,
    "aliases": [],
    "rules": [
      {
        "id": "plow-halasana.inversion.line",
        "name": "Vertical Line",
        "metric": "vertical_alignment",
        "points": [
          23,
          27
        ],
        "comparison": "less_than",
        "target": 0.12,
        "tolerance": 0.08,
        "weight": 2,
        "severity": "high",
        "feedback": "Stack hips and legs vertically with smooth control."
      },
      {
        "id": "plow-halasana.shoulder.base",
        "name": "Shoulder Base",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "high",
        "isSafety": true,
        "feedback": "Maintain broad shoulder foundation without compressing neck."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "pyramid-parshvottanasana",
    "slug": "pyramid-parshvottanasana",
    "displayName": "Pyramid Pose",
    "name": "Pyramid Pose",
    "sanskritName": "Parshvottanasana",
    "category": "standing",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/pyramid-parshvottanasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/pyramid-parshvottanasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/pyramid-parshvottanasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/pyramid-parshvottanasana.webp",
    "description": "Traditional standing yoga posture (Parshvottanasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Pyramid Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "pyramid-parshvottanasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "pyramid-parshvottanasana.shoulder.level",
      "pyramid-parshvottanasana.spine.vertical",
      "pyramid-parshvottanasana.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 94,
    "aliases": [],
    "rules": [
      {
        "id": "pyramid-parshvottanasana.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "pyramid-parshvottanasana.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "pyramid-parshvottanasana.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "rabbit-shashankasana",
    "slug": "rabbit-shashankasana",
    "displayName": "Rabbit Pose",
    "name": "Rabbit Pose",
    "sanskritName": "Shashankasana",
    "category": "restorative",
    "difficulty": "beginner",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/rabbit-shashankasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/rabbit-shashankasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/rabbit-shashankasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/rabbit-shashankasana.webp",
    "description": "Traditional restorative yoga posture (Shashankasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Rabbit Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "rabbit-shashankasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "rabbit-shashankasana.body.symmetry"
    ],
    "isPremium": true,
    "orderIndex": 95,
    "aliases": [],
    "rules": [
      {
        "id": "rabbit-shashankasana.body.symmetry",
        "name": "Symmetric Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "low",
        "feedback": "Relax deeply and breathe steadily into the posture."
      }
    ],
    "requiredLandmarks": [
      11,
      12
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "reclined-bound-angle-supta-baddha-konasana",
    "slug": "reclined-bound-angle-supta-baddha-konasana",
    "displayName": "Reclining Bound Angle",
    "name": "Reclining Bound Angle",
    "sanskritName": "Supta Baddha Konasana",
    "category": "restorative",
    "difficulty": "beginner",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/reclined-bound-angle-supta-baddha-konasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/reclined-bound-angle-supta-baddha-konasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/reclined-bound-angle-supta-baddha-konasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/reclined-bound-angle-supta-baddha-konasana.webp",
    "description": "Traditional restorative yoga posture (Supta Baddha Konasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Reclining Bound Angle.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "reclined-bound-angle-supta-baddha-konasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "reclined-bound-angle-supta-baddha-konasana.body.symmetry"
    ],
    "isPremium": true,
    "orderIndex": 96,
    "aliases": [],
    "rules": [
      {
        "id": "reclined-bound-angle-supta-baddha-konasana.body.symmetry",
        "name": "Symmetric Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "low",
        "feedback": "Relax deeply and breathe steadily into the posture."
      }
    ],
    "requiredLandmarks": [
      11,
      12
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "reverse-corpse-advasana",
    "slug": "reverse-corpse-advasana",
    "displayName": "Reverse Corpse",
    "name": "Reverse Corpse",
    "sanskritName": "Advasana",
    "category": "restorative",
    "difficulty": "beginner",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/reverse-corpse-advasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/reverse-corpse-advasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/reverse-corpse-advasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/reverse-corpse-advasana.webp",
    "description": "Traditional restorative yoga posture (Advasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Reverse Corpse.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "reverse-corpse-advasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "reverse-corpse-advasana.body.symmetry"
    ],
    "isPremium": true,
    "orderIndex": 97,
    "aliases": [],
    "rules": [
      {
        "id": "reverse-corpse-advasana.body.symmetry",
        "name": "Symmetric Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "low",
        "feedback": "Relax deeply and breathe steadily into the posture."
      }
    ],
    "requiredLandmarks": [
      11,
      12
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "revolved-bird-of-paradise-parivritta-svarga-dvijasana",
    "slug": "revolved-bird-of-paradise-parivritta-svarga-dvijasana",
    "displayName": "Revolved Bird Of Paradise",
    "name": "Revolved Bird Of Paradise",
    "sanskritName": "Parivritta Svarga Dvijasana",
    "category": "balancing",
    "difficulty": "advanced",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/revolved-bird-of-paradise-parivritta-svarga-dvijasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/revolved-bird-of-paradise-parivritta-svarga-dvijasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/revolved-bird-of-paradise-parivritta-svarga-dvijasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/revolved-bird-of-paradise-parivritta-svarga-dvijasana.webp",
    "description": "Traditional balancing yoga posture (Parivritta Svarga Dvijasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Revolved Bird Of Paradise.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "revolved-bird-of-paradise-parivritta-svarga-dvijasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "revolved-bird-of-paradise-parivritta-svarga-dvijasana.standing.leg",
      "revolved-bird-of-paradise-parivritta-svarga-dvijasana.shoulder.alignment"
    ],
    "isPremium": true,
    "orderIndex": 98,
    "aliases": [],
    "rules": [
      {
        "id": "revolved-bird-of-paradise-parivritta-svarga-dvijasana.standing.leg",
        "name": "Standing Leg Stability",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "tolerance": 10,
        "weight": 2,
        "severity": "high",
        "feedback": "Firm your standing leg and root down through the foot."
      },
      {
        "id": "revolved-bird-of-paradise-parivritta-svarga-dvijasana.shoulder.alignment",
        "name": "Shoulder Level",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders even and focus your gaze on a steady point."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "revolved-chair-parivrtta-utkatasana",
    "slug": "revolved-chair-parivrtta-utkatasana",
    "displayName": "Revolved Chair",
    "name": "Revolved Chair",
    "sanskritName": "Parivrtta Utkatasana",
    "category": "standing",
    "difficulty": "beginner",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/revolved-chair-parivrtta-utkatasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/revolved-chair-parivrtta-utkatasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/revolved-chair-parivrtta-utkatasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/revolved-chair-parivrtta-utkatasana.webp",
    "description": "Traditional standing yoga posture (Parivrtta Utkatasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Revolved Chair.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "revolved-chair-parivrtta-utkatasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "revolved-chair-parivrtta-utkatasana.shoulder.level",
      "revolved-chair-parivrtta-utkatasana.spine.vertical",
      "revolved-chair-parivrtta-utkatasana.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 99,
    "aliases": [],
    "rules": [
      {
        "id": "revolved-chair-parivrtta-utkatasana.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "revolved-chair-parivrtta-utkatasana.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "revolved-chair-parivrtta-utkatasana.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "revolved-flying-man-parivritta-eka-pada-koundinyasana",
    "slug": "revolved-flying-man-parivritta-eka-pada-koundinyasana",
    "displayName": "Revolved Flying Man",
    "name": "Revolved Flying Man",
    "sanskritName": "Parivritta Eka Pada Koundinyasana",
    "category": "balancing",
    "difficulty": "advanced",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/revolved-flying-man-parivritta-eka-pada-koundinyasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/revolved-flying-man-parivritta-eka-pada-koundinyasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/revolved-flying-man-parivritta-eka-pada-koundinyasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/revolved-flying-man-parivritta-eka-pada-koundinyasana.webp",
    "description": "Traditional balancing yoga posture (Parivritta Eka Pada Koundinyasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Revolved Flying Man.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "revolved-flying-man-parivritta-eka-pada-koundinyasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "revolved-flying-man-parivritta-eka-pada-koundinyasana.standing.leg",
      "revolved-flying-man-parivritta-eka-pada-koundinyasana.shoulder.alignment"
    ],
    "isPremium": true,
    "orderIndex": 100,
    "aliases": [],
    "rules": [
      {
        "id": "revolved-flying-man-parivritta-eka-pada-koundinyasana.standing.leg",
        "name": "Standing Leg Stability",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "tolerance": 10,
        "weight": 2,
        "severity": "high",
        "feedback": "Firm your standing leg and root down through the foot."
      },
      {
        "id": "revolved-flying-man-parivritta-eka-pada-koundinyasana.shoulder.alignment",
        "name": "Shoulder Level",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders even and focus your gaze on a steady point."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "revolved-half-moon-parivritta-ardha-chandrasana",
    "slug": "revolved-half-moon-parivritta-ardha-chandrasana",
    "displayName": "Revolved Half Moon",
    "name": "Revolved Half Moon",
    "sanskritName": "Parivritta Ardha Chandrasana",
    "category": "balancing",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/revolved-half-moon-parivritta-ardha-chandrasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/revolved-half-moon-parivritta-ardha-chandrasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/revolved-half-moon-parivritta-ardha-chandrasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/revolved-half-moon-parivritta-ardha-chandrasana.webp",
    "description": "Traditional balancing yoga posture (Parivritta Ardha Chandrasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Revolved Half Moon.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "revolved-half-moon-parivritta-ardha-chandrasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "revolved-half-moon-parivritta-ardha-chandrasana.standing.leg",
      "revolved-half-moon-parivritta-ardha-chandrasana.shoulder.alignment"
    ],
    "isPremium": true,
    "orderIndex": 101,
    "aliases": [],
    "rules": [
      {
        "id": "revolved-half-moon-parivritta-ardha-chandrasana.standing.leg",
        "name": "Standing Leg Stability",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "tolerance": 10,
        "weight": 2,
        "severity": "high",
        "feedback": "Firm your standing leg and root down through the foot."
      },
      {
        "id": "revolved-half-moon-parivritta-ardha-chandrasana.shoulder.alignment",
        "name": "Shoulder Level",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders even and focus your gaze on a steady point."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "revolved-seated-hand-to-big-toe-upavishta-parivritta-hasta-padangushthasana",
    "slug": "revolved-seated-hand-to-big-toe-upavishta-parivritta-hasta-padangushthasana",
    "displayName": "Revolved Seated Hand To Big Toe",
    "name": "Revolved Seated Hand To Big Toe",
    "sanskritName": "Upavishta Parivritta Hasta Padangushthasana",
    "category": "seated",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/revolved-seated-hand-to-big-toe-upavishta-parivritta-hasta-padangushthasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/revolved-seated-hand-to-big-toe-upavishta-parivritta-hasta-padangushthasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/revolved-seated-hand-to-big-toe-upavishta-parivritta-hasta-padangushthasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/revolved-seated-hand-to-big-toe-upavishta-parivritta-hasta-padangushthasana.webp",
    "description": "Traditional seated yoga posture (Upavishta Parivritta Hasta Padangushthasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Revolved Seated Hand To Big Toe.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "revolved-seated-hand-to-big-toe-upavishta-parivritta-hasta-padangushthasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "revolved-seated-hand-to-big-toe-upavishta-parivritta-hasta-padangushthasana.spine.erect",
      "revolved-seated-hand-to-big-toe-upavishta-parivritta-hasta-padangushthasana.shoulder.relaxation"
    ],
    "isPremium": true,
    "orderIndex": 102,
    "aliases": [],
    "rules": [
      {
        "id": "revolved-seated-hand-to-big-toe-upavishta-parivritta-hasta-padangushthasana.spine.erect",
        "name": "Spine Length",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.1,
        "tolerance": 0.08,
        "weight": 1,
        "severity": "medium",
        "feedback": "Sit tall with a straight, elongated spine."
      },
      {
        "id": "revolved-seated-hand-to-big-toe-upavishta-parivritta-hasta-padangushthasana.shoulder.relaxation",
        "name": "Relaxed Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.05,
        "weight": 1,
        "severity": "low",
        "feedback": "Relax shoulders away from your ears."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "revolved-standing-hand-to-big-toe-parivritta-hasta-padangushthasana",
    "slug": "revolved-standing-hand-to-big-toe-parivritta-hasta-padangushthasana",
    "displayName": "Revolved Standing Hand To Big Toe",
    "name": "Revolved Standing Hand To Big Toe",
    "sanskritName": "Parivritta Hasta Padangushthasana",
    "category": "standing",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/revolved-standing-hand-to-big-toe-parivritta-hasta-padangushthasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/revolved-standing-hand-to-big-toe-parivritta-hasta-padangushthasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/revolved-standing-hand-to-big-toe-parivritta-hasta-padangushthasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/revolved-standing-hand-to-big-toe-parivritta-hasta-padangushthasana.webp",
    "description": "Traditional standing yoga posture (Parivritta Hasta Padangushthasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Revolved Standing Hand To Big Toe.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "revolved-standing-hand-to-big-toe-parivritta-hasta-padangushthasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "revolved-standing-hand-to-big-toe-parivritta-hasta-padangushthasana.shoulder.level",
      "revolved-standing-hand-to-big-toe-parivritta-hasta-padangushthasana.spine.vertical",
      "revolved-standing-hand-to-big-toe-parivritta-hasta-padangushthasana.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 103,
    "aliases": [],
    "rules": [
      {
        "id": "revolved-standing-hand-to-big-toe-parivritta-hasta-padangushthasana.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "revolved-standing-hand-to-big-toe-parivritta-hasta-padangushthasana.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "revolved-standing-hand-to-big-toe-parivritta-hasta-padangushthasana.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "revolved-triangle-parivritta-trikonasana",
    "slug": "revolved-triangle-parivritta-trikonasana",
    "displayName": "Revolved Triangle Pose",
    "name": "Revolved Triangle Pose",
    "sanskritName": "Parivritta Trikonasana",
    "category": "standing",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/revolved-triangle-parivritta-trikonasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/revolved-triangle-parivritta-trikonasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/revolved-triangle-parivritta-trikonasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/revolved-triangle-parivritta-trikonasana.webp",
    "description": "Traditional standing yoga posture (Parivritta Trikonasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Revolved Triangle Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "revolved-triangle-parivritta-trikonasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "revolved-triangle-parivritta-trikonasana.shoulder.level",
      "revolved-triangle-parivritta-trikonasana.spine.vertical",
      "revolved-triangle-parivritta-trikonasana.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 104,
    "aliases": [],
    "rules": [
      {
        "id": "revolved-triangle-parivritta-trikonasana.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "revolved-triangle-parivritta-trikonasana.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "revolved-triangle-parivritta-trikonasana.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "rock-the-baby",
    "slug": "rock-the-baby",
    "displayName": "Rock The Baby",
    "name": "Rock The Baby",
    "sanskritName": null,
    "category": "standing",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/rock-the-baby.webp",
      "storagePath": "yogaverse-model-asanas-beach/rock-the-baby.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/rock-the-baby.webp",
    "storagePath": "yogaverse-model-asanas-beach/rock-the-baby.webp",
    "description": "Traditional standing yoga posture (Rock The Baby) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Rock The Baby.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "rock-the-baby-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "rock-the-baby.shoulder.level",
      "rock-the-baby.spine.vertical",
      "rock-the-baby.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 105,
    "aliases": [],
    "rules": [
      {
        "id": "rock-the-baby.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "rock-the-baby.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "rock-the-baby.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "rooster-kukkutasana",
    "slug": "rooster-kukkutasana",
    "displayName": "Rooster",
    "name": "Rooster",
    "sanskritName": "Kukkutasana",
    "category": "standing",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/rooster-kukkutasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/rooster-kukkutasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/rooster-kukkutasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/rooster-kukkutasana.webp",
    "description": "Traditional standing yoga posture (Kukkutasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Rooster.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "rooster-kukkutasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "rooster-kukkutasana.shoulder.level",
      "rooster-kukkutasana.spine.vertical",
      "rooster-kukkutasana.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 106,
    "aliases": [],
    "rules": [
      {
        "id": "rooster-kukkutasana.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "rooster-kukkutasana.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "rooster-kukkutasana.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "sage-bharadvajas-twist-bharadvajasana",
    "slug": "sage-bharadvajas-twist-bharadvajasana",
    "displayName": "Sage Bharadvaja's Twist",
    "name": "Sage Bharadvaja's Twist",
    "sanskritName": "Bharadvajasana",
    "category": "standing",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/sage-bharadvajas-twist-bharadvajasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/sage-bharadvajas-twist-bharadvajasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/sage-bharadvajas-twist-bharadvajasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/sage-bharadvajas-twist-bharadvajasana.webp",
    "description": "Traditional standing yoga posture (Bharadvajasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Sage Bharadvaja's Twist.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "sage-bharadvajas-twist-bharadvajasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "sage-bharadvajas-twist-bharadvajasana.shoulder.level",
      "sage-bharadvajas-twist-bharadvajasana.spine.vertical",
      "sage-bharadvajas-twist-bharadvajasana.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 107,
    "aliases": [],
    "rules": [
      {
        "id": "sage-bharadvajas-twist-bharadvajasana.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "sage-bharadvajas-twist-bharadvajasana.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "sage-bharadvajas-twist-bharadvajasana.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "sage-gherandas-gherandasana",
    "slug": "sage-gherandas-gherandasana",
    "displayName": "Sage Gheranda's",
    "name": "Sage Gheranda's",
    "sanskritName": "Gherandasana",
    "category": "standing",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/sage-gherandas-gherandasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/sage-gherandas-gherandasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/sage-gherandas-gherandasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/sage-gherandas-gherandasana.webp",
    "description": "Traditional standing yoga posture (Gherandasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Sage Gheranda's.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "sage-gherandas-gherandasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "sage-gherandas-gherandasana.shoulder.level",
      "sage-gherandas-gherandasana.spine.vertical",
      "sage-gherandas-gherandasana.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 108,
    "aliases": [],
    "rules": [
      {
        "id": "sage-gherandas-gherandasana.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "sage-gherandas-gherandasana.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "sage-gherandas-gherandasana.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "sage-marichis-i-marichyasana-a",
    "slug": "sage-marichis-i-marichyasana-a",
    "displayName": "Sage Marichi's I",
    "name": "Sage Marichi's I",
    "sanskritName": "Marichyasana A",
    "category": "standing",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/sage-marichis-i-marichyasana-a.webp",
      "storagePath": "yogaverse-model-asanas-beach/sage-marichis-i-marichyasana-a.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/sage-marichis-i-marichyasana-a.webp",
    "storagePath": "yogaverse-model-asanas-beach/sage-marichis-i-marichyasana-a.webp",
    "description": "Traditional standing yoga posture (Marichyasana A) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Sage Marichi's I.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "sage-marichis-i-marichyasana-a-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "sage-marichis-i-marichyasana-a.shoulder.level",
      "sage-marichis-i-marichyasana-a.spine.vertical",
      "sage-marichis-i-marichyasana-a.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 109,
    "aliases": [],
    "rules": [
      {
        "id": "sage-marichis-i-marichyasana-a.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "sage-marichis-i-marichyasana-a.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "sage-marichis-i-marichyasana-a.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "sage-marichis-ii-marichyasana-b",
    "slug": "sage-marichis-ii-marichyasana-b",
    "displayName": "Sage Marichi's II",
    "name": "Sage Marichi's II",
    "sanskritName": "Marichyasana B",
    "category": "standing",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/sage-marichis-ii-marichyasana-b.webp",
      "storagePath": "yogaverse-model-asanas-beach/sage-marichis-ii-marichyasana-b.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/sage-marichis-ii-marichyasana-b.webp",
    "storagePath": "yogaverse-model-asanas-beach/sage-marichis-ii-marichyasana-b.webp",
    "description": "Traditional standing yoga posture (Marichyasana B) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Sage Marichi's II.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "sage-marichis-ii-marichyasana-b-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "sage-marichis-ii-marichyasana-b.shoulder.level",
      "sage-marichis-ii-marichyasana-b.spine.vertical",
      "sage-marichis-ii-marichyasana-b.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 110,
    "aliases": [],
    "rules": [
      {
        "id": "sage-marichis-ii-marichyasana-b.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "sage-marichis-ii-marichyasana-b.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "sage-marichis-ii-marichyasana-b.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "sage-marichis-iii-marichyasana-c",
    "slug": "sage-marichis-iii-marichyasana-c",
    "displayName": "Sage Marichi's III",
    "name": "Sage Marichi's III",
    "sanskritName": "Marichyasana C",
    "category": "standing",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/sage-marichis-iii-marichyasana-c.webp",
      "storagePath": "yogaverse-model-asanas-beach/sage-marichis-iii-marichyasana-c.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/sage-marichis-iii-marichyasana-c.webp",
    "storagePath": "yogaverse-model-asanas-beach/sage-marichis-iii-marichyasana-c.webp",
    "description": "Traditional standing yoga posture (Marichyasana C) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Sage Marichi's III.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "sage-marichis-iii-marichyasana-c-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "sage-marichis-iii-marichyasana-c.shoulder.level",
      "sage-marichis-iii-marichyasana-c.spine.vertical",
      "sage-marichis-iii-marichyasana-c.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 111,
    "aliases": [],
    "rules": [
      {
        "id": "sage-marichis-iii-marichyasana-c.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "sage-marichis-iii-marichyasana-c.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "sage-marichis-iii-marichyasana-c.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "sage-marichis-iv-marichyasana-d",
    "slug": "sage-marichis-iv-marichyasana-d",
    "displayName": "Sage Marichi's Iv",
    "name": "Sage Marichi's Iv",
    "sanskritName": "Marichyasana D",
    "category": "standing",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/sage-marichis-iv-marichyasana-d.webp",
      "storagePath": "yogaverse-model-asanas-beach/sage-marichis-iv-marichyasana-d.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/sage-marichis-iv-marichyasana-d.webp",
    "storagePath": "yogaverse-model-asanas-beach/sage-marichis-iv-marichyasana-d.webp",
    "description": "Traditional standing yoga posture (Marichyasana D) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Sage Marichi's Iv.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "sage-marichis-iv-marichyasana-d-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "sage-marichis-iv-marichyasana-d.shoulder.level",
      "sage-marichis-iv-marichyasana-d.spine.vertical",
      "sage-marichis-iv-marichyasana-d.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 112,
    "aliases": [],
    "rules": [
      {
        "id": "sage-marichis-iv-marichyasana-d.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "sage-marichis-iv-marichyasana-d.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "sage-marichis-iv-marichyasana-d.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "sage-visvamitras-vishvamitrasana",
    "slug": "sage-visvamitras-vishvamitrasana",
    "displayName": "Sage Visvamitra's",
    "name": "Sage Visvamitra's",
    "sanskritName": "Vishvamitrasana",
    "category": "standing",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/sage-visvamitras-vishvamitrasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/sage-visvamitras-vishvamitrasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/sage-visvamitras-vishvamitrasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/sage-visvamitras-vishvamitrasana.webp",
    "description": "Traditional standing yoga posture (Vishvamitrasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Sage Visvamitra's.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "sage-visvamitras-vishvamitrasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "sage-visvamitras-vishvamitrasana.shoulder.level",
      "sage-visvamitras-vishvamitrasana.spine.vertical",
      "sage-visvamitras-vishvamitrasana.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 113,
    "aliases": [],
    "rules": [
      {
        "id": "sage-visvamitras-vishvamitrasana.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "sage-visvamitras-vishvamitrasana.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "sage-visvamitras-vishvamitrasana.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "scale-tolasana",
    "slug": "scale-tolasana",
    "displayName": "Scale Pose",
    "name": "Scale Pose",
    "sanskritName": "Tolasana",
    "category": "balancing",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/scale-tolasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/scale-tolasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/scale-tolasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/scale-tolasana.webp",
    "description": "Traditional balancing yoga posture (Tolasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Scale Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "scale-tolasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "scale-tolasana.standing.leg",
      "scale-tolasana.shoulder.alignment"
    ],
    "isPremium": true,
    "orderIndex": 114,
    "aliases": [],
    "rules": [
      {
        "id": "scale-tolasana.standing.leg",
        "name": "Standing Leg Stability",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "tolerance": 10,
        "weight": 2,
        "severity": "high",
        "feedback": "Firm your standing leg and root down through the foot."
      },
      {
        "id": "scale-tolasana.shoulder.alignment",
        "name": "Shoulder Level",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders even and focus your gaze on a steady point."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "scorpion-vrischikasana-a",
    "slug": "scorpion-vrischikasana-a",
    "displayName": "Scorpion",
    "name": "Scorpion",
    "sanskritName": "Vrischikasana A",
    "category": "standing",
    "difficulty": "advanced",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/scorpion-vrischikasana-a.webp",
      "storagePath": "yogaverse-model-asanas-beach/scorpion-vrischikasana-a.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/scorpion-vrischikasana-a.webp",
    "storagePath": "yogaverse-model-asanas-beach/scorpion-vrischikasana-a.webp",
    "description": "Traditional standing yoga posture (Vrischikasana A) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Scorpion.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "scorpion-vrischikasana-a-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "scorpion-vrischikasana-a.shoulder.level",
      "scorpion-vrischikasana-a.spine.vertical",
      "scorpion-vrischikasana-a.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 115,
    "aliases": [],
    "rules": [
      {
        "id": "scorpion-vrischikasana-a.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "scorpion-vrischikasana-a.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "scorpion-vrischikasana-a.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "seated-forward-fold-paschimottanasana",
    "slug": "seated-forward-fold-paschimottanasana",
    "displayName": "Seated Forward Fold",
    "name": "Seated Forward Fold",
    "sanskritName": "Paschimottanasana",
    "category": "seated",
    "difficulty": "beginner",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/seated-forward-fold-paschimottanasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/seated-forward-fold-paschimottanasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/seated-forward-fold-paschimottanasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/seated-forward-fold-paschimottanasana.webp",
    "description": "Traditional seated yoga posture (Paschimottanasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Seated Forward Fold.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "seated-forward-fold-paschimottanasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "seated-forward-fold-paschimottanasana.spine.erect",
      "seated-forward-fold-paschimottanasana.shoulder.relaxation"
    ],
    "isPremium": true,
    "orderIndex": 116,
    "aliases": [],
    "rules": [
      {
        "id": "seated-forward-fold-paschimottanasana.spine.erect",
        "name": "Spine Length",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.1,
        "tolerance": 0.08,
        "weight": 1,
        "severity": "medium",
        "feedback": "Sit tall with a straight, elongated spine."
      },
      {
        "id": "seated-forward-fold-paschimottanasana.shoulder.relaxation",
        "name": "Relaxed Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.05,
        "weight": 1,
        "severity": "low",
        "feedback": "Relax shoulders away from your ears."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "seated-gate-parighasana",
    "slug": "seated-gate-parighasana",
    "displayName": "Seated Gate",
    "name": "Seated Gate",
    "sanskritName": "Parighasana",
    "category": "seated",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/seated-gate-parighasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/seated-gate-parighasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/seated-gate-parighasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/seated-gate-parighasana.webp",
    "description": "Traditional seated yoga posture (Parighasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Seated Gate.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "seated-gate-parighasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "seated-gate-parighasana.spine.erect",
      "seated-gate-parighasana.shoulder.relaxation"
    ],
    "isPremium": true,
    "orderIndex": 117,
    "aliases": [],
    "rules": [
      {
        "id": "seated-gate-parighasana.spine.erect",
        "name": "Spine Length",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.1,
        "tolerance": 0.08,
        "weight": 1,
        "severity": "medium",
        "feedback": "Sit tall with a straight, elongated spine."
      },
      {
        "id": "seated-gate-parighasana.shoulder.relaxation",
        "name": "Relaxed Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.05,
        "weight": 1,
        "severity": "low",
        "feedback": "Relax shoulders away from your ears."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "seated-half-bound-lotus-forward-bend-ardha-baddha-padma-paschimottanasana",
    "slug": "seated-half-bound-lotus-forward-bend-ardha-baddha-padma-paschimottanasana",
    "displayName": "Seated Half Bound Lotus Forward Bend Ardha Baddha Padma",
    "name": "Seated Half Bound Lotus Forward Bend Ardha Baddha Padma",
    "sanskritName": "Paschimottanasana",
    "category": "seated",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/seated-half-bound-lotus-forward-bend-ardha-baddha-padma-paschimottanasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/seated-half-bound-lotus-forward-bend-ardha-baddha-padma-paschimottanasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/seated-half-bound-lotus-forward-bend-ardha-baddha-padma-paschimottanasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/seated-half-bound-lotus-forward-bend-ardha-baddha-padma-paschimottanasana.webp",
    "description": "Traditional seated yoga posture (Paschimottanasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Seated Half Bound Lotus Forward Bend Ardha Baddha Padma.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "seated-half-bound-lotus-forward-bend-ardha-baddha-padma-paschimottanasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "seated-half-bound-lotus-forward-bend-ardha-baddha-padma-paschimottanasana.spine.erect",
      "seated-half-bound-lotus-forward-bend-ardha-baddha-padma-paschimottanasana.shoulder.relaxation"
    ],
    "isPremium": true,
    "orderIndex": 118,
    "aliases": [],
    "rules": [
      {
        "id": "seated-half-bound-lotus-forward-bend-ardha-baddha-padma-paschimottanasana.spine.erect",
        "name": "Spine Length",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.1,
        "tolerance": 0.08,
        "weight": 1,
        "severity": "medium",
        "feedback": "Sit tall with a straight, elongated spine."
      },
      {
        "id": "seated-half-bound-lotus-forward-bend-ardha-baddha-padma-paschimottanasana.shoulder.relaxation",
        "name": "Relaxed Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.05,
        "weight": 1,
        "severity": "low",
        "feedback": "Relax shoulders away from your ears."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "seated-three-limbed-forward-bend-trianga-mukha-eka-pada-paschimottanasana",
    "slug": "seated-three-limbed-forward-bend-trianga-mukha-eka-pada-paschimottanasana",
    "displayName": "Seated Three Limbed Forward Bend",
    "name": "Seated Three Limbed Forward Bend",
    "sanskritName": "Trianga Mukha Eka Pada Paschimottanasana",
    "category": "seated",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/seated-three-limbed-forward-bend-trianga-mukha-eka-pada-paschimottanasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/seated-three-limbed-forward-bend-trianga-mukha-eka-pada-paschimottanasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/seated-three-limbed-forward-bend-trianga-mukha-eka-pada-paschimottanasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/seated-three-limbed-forward-bend-trianga-mukha-eka-pada-paschimottanasana.webp",
    "description": "Traditional seated yoga posture (Trianga Mukha Eka Pada Paschimottanasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Seated Three Limbed Forward Bend.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "seated-three-limbed-forward-bend-trianga-mukha-eka-pada-paschimottanasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "seated-three-limbed-forward-bend-trianga-mukha-eka-pada-paschimottanasana.spine.erect",
      "seated-three-limbed-forward-bend-trianga-mukha-eka-pada-paschimottanasana.shoulder.relaxation"
    ],
    "isPremium": true,
    "orderIndex": 119,
    "aliases": [],
    "rules": [
      {
        "id": "seated-three-limbed-forward-bend-trianga-mukha-eka-pada-paschimottanasana.spine.erect",
        "name": "Spine Length",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.1,
        "tolerance": 0.08,
        "weight": 1,
        "severity": "medium",
        "feedback": "Sit tall with a straight, elongated spine."
      },
      {
        "id": "seated-three-limbed-forward-bend-trianga-mukha-eka-pada-paschimottanasana.shoulder.relaxation",
        "name": "Relaxed Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.05,
        "weight": 1,
        "severity": "low",
        "feedback": "Relax shoulders away from your ears."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "seated-twist-ardha-matsyendrasana",
    "slug": "seated-twist-ardha-matsyendrasana",
    "displayName": "Seated Twist",
    "name": "Seated Twist",
    "sanskritName": "Ardha Matsyendrasana",
    "category": "seated",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/seated-twist-ardha-matsyendrasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/seated-twist-ardha-matsyendrasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/seated-twist-ardha-matsyendrasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/seated-twist-ardha-matsyendrasana.webp",
    "description": "Traditional seated yoga posture (Ardha Matsyendrasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Seated Twist.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "seated-twist-ardha-matsyendrasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "seated-twist-ardha-matsyendrasana.spine.erect",
      "seated-twist-ardha-matsyendrasana.shoulder.relaxation"
    ],
    "isPremium": true,
    "orderIndex": 120,
    "aliases": [],
    "rules": [
      {
        "id": "seated-twist-ardha-matsyendrasana.spine.erect",
        "name": "Spine Length",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.1,
        "tolerance": 0.08,
        "weight": 1,
        "severity": "medium",
        "feedback": "Sit tall with a straight, elongated spine."
      },
      {
        "id": "seated-twist-ardha-matsyendrasana.shoulder.relaxation",
        "name": "Relaxed Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.05,
        "weight": 1,
        "severity": "low",
        "feedback": "Relax shoulders away from your ears."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "shiva-squat",
    "slug": "shiva-squat",
    "displayName": "Shiva Squat",
    "name": "Shiva Squat",
    "sanskritName": null,
    "category": "standing",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/shiva-squat.webp",
      "storagePath": "yogaverse-model-asanas-beach/shiva-squat.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/shiva-squat.webp",
    "storagePath": "yogaverse-model-asanas-beach/shiva-squat.webp",
    "description": "Traditional standing yoga posture (Shiva Squat) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Shiva Squat.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "shiva-squat-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "shiva-squat.shoulder.level",
      "shiva-squat.spine.vertical",
      "shiva-squat.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 121,
    "aliases": [],
    "rules": [
      {
        "id": "shiva-squat.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "shiva-squat.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "shiva-squat.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "shoelace",
    "slug": "shoelace",
    "displayName": "Shoelace",
    "name": "Shoelace",
    "sanskritName": null,
    "category": "seated",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/shoelace.webp",
      "storagePath": "yogaverse-model-asanas-beach/shoelace.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/shoelace.webp",
    "storagePath": "yogaverse-model-asanas-beach/shoelace.webp",
    "description": "Traditional seated yoga posture (Shoelace) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Shoelace.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "shoelace-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "shoelace.spine.erect",
      "shoelace.shoulder.relaxation"
    ],
    "isPremium": true,
    "orderIndex": 122,
    "aliases": [],
    "rules": [
      {
        "id": "shoelace.spine.erect",
        "name": "Spine Length",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.1,
        "tolerance": 0.08,
        "weight": 1,
        "severity": "medium",
        "feedback": "Sit tall with a straight, elongated spine."
      },
      {
        "id": "shoelace.shoulder.relaxation",
        "name": "Relaxed Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.05,
        "weight": 1,
        "severity": "low",
        "feedback": "Relax shoulders away from your ears."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "shoulder-pressing-bhuja-pidasana",
    "slug": "shoulder-pressing-bhuja-pidasana",
    "displayName": "Shoulder Pressing Bhuja",
    "name": "Shoulder Pressing Bhuja",
    "sanskritName": "Pidasana",
    "category": "standing",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/shoulder-pressing-bhuja-pidasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/shoulder-pressing-bhuja-pidasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/shoulder-pressing-bhuja-pidasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/shoulder-pressing-bhuja-pidasana.webp",
    "description": "Traditional standing yoga posture (Pidasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Shoulder Pressing Bhuja.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "shoulder-pressing-bhuja-pidasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "shoulder-pressing-bhuja-pidasana.shoulder.level",
      "shoulder-pressing-bhuja-pidasana.spine.vertical",
      "shoulder-pressing-bhuja-pidasana.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 123,
    "aliases": [],
    "rules": [
      {
        "id": "shoulder-pressing-bhuja-pidasana.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "shoulder-pressing-bhuja-pidasana.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "shoulder-pressing-bhuja-pidasana.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "shoulder-stand-with-lotus-legs-urdhva-padmasana",
    "slug": "shoulder-stand-with-lotus-legs-urdhva-padmasana",
    "displayName": "Shoulder Stand With Lotus Legs Urdhva",
    "name": "Shoulder Stand With Lotus Legs Urdhva",
    "sanskritName": "Padmasana",
    "category": "seated",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/shoulder-stand-with-lotus-legs-urdhva-padmasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/shoulder-stand-with-lotus-legs-urdhva-padmasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/shoulder-stand-with-lotus-legs-urdhva-padmasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/shoulder-stand-with-lotus-legs-urdhva-padmasana.webp",
    "description": "Traditional seated yoga posture (Padmasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Shoulder Stand With Lotus Legs Urdhva.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "shoulder-stand-with-lotus-legs-urdhva-padmasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "shoulder-stand-with-lotus-legs-urdhva-padmasana.spine.erect",
      "shoulder-stand-with-lotus-legs-urdhva-padmasana.shoulder.relaxation"
    ],
    "isPremium": true,
    "orderIndex": 124,
    "aliases": [],
    "rules": [
      {
        "id": "shoulder-stand-with-lotus-legs-urdhva-padmasana.spine.erect",
        "name": "Spine Length",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.1,
        "tolerance": 0.08,
        "weight": 1,
        "severity": "medium",
        "feedback": "Sit tall with a straight, elongated spine."
      },
      {
        "id": "shoulder-stand-with-lotus-legs-urdhva-padmasana.shoulder.relaxation",
        "name": "Relaxed Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.05,
        "weight": 1,
        "severity": "low",
        "feedback": "Relax shoulders away from your ears."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "shoulderstand-sarvangasana",
    "slug": "shoulderstand-sarvangasana",
    "displayName": "Shoulderstand",
    "name": "Shoulderstand",
    "sanskritName": "Sarvangasana",
    "category": "inversion",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/shoulderstand-sarvangasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/shoulderstand-sarvangasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/shoulderstand-sarvangasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/shoulderstand-sarvangasana.webp",
    "description": "Traditional inversion yoga posture (Sarvangasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Shoulderstand.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "shoulderstand-sarvangasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "shoulderstand-sarvangasana.inversion.line",
      "shoulderstand-sarvangasana.shoulder.base"
    ],
    "isPremium": true,
    "orderIndex": 125,
    "aliases": [],
    "rules": [
      {
        "id": "shoulderstand-sarvangasana.inversion.line",
        "name": "Vertical Line",
        "metric": "vertical_alignment",
        "points": [
          23,
          27
        ],
        "comparison": "less_than",
        "target": 0.12,
        "tolerance": 0.08,
        "weight": 2,
        "severity": "high",
        "feedback": "Stack hips and legs vertically with smooth control."
      },
      {
        "id": "shoulderstand-sarvangasana.shoulder.base",
        "name": "Shoulder Base",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "high",
        "isSafety": true,
        "feedback": "Maintain broad shoulder foundation without compressing neck."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "side-crow-parsva-bakasana",
    "slug": "side-crow-parsva-bakasana",
    "displayName": "Side Crow Pose",
    "name": "Side Crow Pose",
    "sanskritName": "Parsva Bakasana",
    "category": "balancing",
    "difficulty": "advanced",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/side-crow-parsva-bakasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/side-crow-parsva-bakasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/side-crow-parsva-bakasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/side-crow-parsva-bakasana.webp",
    "description": "Traditional balancing yoga posture (Parsva Bakasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Side Crow Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "side-crow-parsva-bakasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "side-crow-parsva-bakasana.standing.leg",
      "side-crow-parsva-bakasana.shoulder.alignment"
    ],
    "isPremium": true,
    "orderIndex": 126,
    "aliases": [],
    "rules": [
      {
        "id": "side-crow-parsva-bakasana.standing.leg",
        "name": "Standing Leg Stability",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "tolerance": 10,
        "weight": 2,
        "severity": "high",
        "feedback": "Firm your standing leg and root down through the foot."
      },
      {
        "id": "side-crow-parsva-bakasana.shoulder.alignment",
        "name": "Shoulder Level",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders even and focus your gaze on a steady point."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "side-lunge-skandasana",
    "slug": "side-lunge-skandasana",
    "displayName": "Side Lunge",
    "name": "Side Lunge",
    "sanskritName": "Skandasana",
    "category": "standing",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/side-lunge-skandasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/side-lunge-skandasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/side-lunge-skandasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/side-lunge-skandasana.webp",
    "description": "Traditional standing yoga posture (Skandasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Side Lunge.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "side-lunge-skandasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "side-lunge-skandasana.shoulder.level",
      "side-lunge-skandasana.spine.vertical",
      "side-lunge-skandasana.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 127,
    "aliases": [],
    "rules": [
      {
        "id": "side-lunge-skandasana.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "side-lunge-skandasana.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "side-lunge-skandasana.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "side-plank-vasishthasana",
    "slug": "side-plank-vasishthasana",
    "displayName": "Side Plank Pose",
    "name": "Side Plank Pose",
    "sanskritName": "Vasishthasana",
    "category": "core",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/side-plank-vasishthasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/side-plank-vasishthasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/side-plank-vasishthasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/side-plank-vasishthasana.webp",
    "description": "Traditional core yoga posture (Vasishthasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Side Plank Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "side-plank-vasishthasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "side-plank-vasishthasana.core.alignment",
      "side-plank-vasishthasana.shoulder.stability"
    ],
    "isPremium": true,
    "orderIndex": 128,
    "aliases": [
      "side-plank",
      "vasishthasana"
    ],
    "rules": [
      {
        "id": "side-plank-vasishthasana.core.alignment",
        "name": "Torso Line",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 150,
        "max": 180,
        "tolerance": 15,
        "weight": 2,
        "severity": "high",
        "feedback": "Engage abdominal muscles to maintain straight body line."
      },
      {
        "id": "side-plank-vasishthasana.shoulder.stability",
        "name": "Shoulder Stability",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Press through hands and keep shoulder girdle firm."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      25
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "sleeping-yogi-yoga-nidrasana",
    "slug": "sleeping-yogi-yoga-nidrasana",
    "displayName": "Sleeping Yogi Yoga",
    "name": "Sleeping Yogi Yoga",
    "sanskritName": "Nidrasana",
    "category": "standing",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/sleeping-yogi-yoga-nidrasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/sleeping-yogi-yoga-nidrasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/sleeping-yogi-yoga-nidrasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/sleeping-yogi-yoga-nidrasana.webp",
    "description": "Traditional standing yoga posture (Nidrasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Sleeping Yogi Yoga.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "sleeping-yogi-yoga-nidrasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "sleeping-yogi-yoga-nidrasana.shoulder.level",
      "sleeping-yogi-yoga-nidrasana.spine.vertical",
      "sleeping-yogi-yoga-nidrasana.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 129,
    "aliases": [],
    "rules": [
      {
        "id": "sleeping-yogi-yoga-nidrasana.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "sleeping-yogi-yoga-nidrasana.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "sleeping-yogi-yoga-nidrasana.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "snake-sarpasana",
    "slug": "snake-sarpasana",
    "displayName": "Snake",
    "name": "Snake",
    "sanskritName": "Sarpasana",
    "category": "standing",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/snake-sarpasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/snake-sarpasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/snake-sarpasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/snake-sarpasana.webp",
    "description": "Traditional standing yoga posture (Sarpasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Snake.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "snake-sarpasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "snake-sarpasana.shoulder.level",
      "snake-sarpasana.spine.vertical",
      "snake-sarpasana.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 130,
    "aliases": [],
    "rules": [
      {
        "id": "snake-sarpasana.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "snake-sarpasana.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "snake-sarpasana.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "sphinx-salamba-bhujangasana",
    "slug": "sphinx-salamba-bhujangasana",
    "displayName": "Sphinx Pose",
    "name": "Sphinx Pose",
    "sanskritName": "Salamba Bhujangasana",
    "category": "backbend",
    "difficulty": "beginner",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/sphinx-salamba-bhujangasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/sphinx-salamba-bhujangasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/sphinx-salamba-bhujangasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/sphinx-salamba-bhujangasana.webp",
    "description": "Traditional backbend yoga posture (Salamba Bhujangasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Sphinx Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "sphinx-salamba-bhujangasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "sphinx-salamba-bhujangasana.chest.opening",
      "sphinx-salamba-bhujangasana.arm.extension"
    ],
    "isPremium": true,
    "orderIndex": 131,
    "aliases": [],
    "rules": [
      {
        "id": "sphinx-salamba-bhujangasana.chest.opening",
        "name": "Chest Opening",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.05,
        "weight": 1,
        "severity": "medium",
        "feedback": "Broaden across your collarbones and open your chest."
      },
      {
        "id": "sphinx-salamba-bhujangasana.arm.extension",
        "name": "Arm Support",
        "metric": "angle",
        "points": [
          11,
          13,
          15
        ],
        "comparison": "between",
        "min": 140,
        "max": 180,
        "tolerance": 15,
        "weight": 1,
        "severity": "medium",
        "feedback": "Engage arms to support gentle spinal arch."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      13,
      15
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "staff-dandasana",
    "slug": "staff-dandasana",
    "displayName": "Staff Pose",
    "name": "Staff Pose",
    "sanskritName": "Dandasana",
    "category": "seated",
    "difficulty": "beginner",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/staff-dandasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/staff-dandasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/staff-dandasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/staff-dandasana.webp",
    "description": "Traditional seated yoga posture (Dandasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Staff Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "staff-dandasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "staff-dandasana.spine.erect",
      "staff-dandasana.shoulder.relaxation"
    ],
    "isPremium": true,
    "orderIndex": 132,
    "aliases": [],
    "rules": [
      {
        "id": "staff-dandasana.spine.erect",
        "name": "Spine Length",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.1,
        "tolerance": 0.08,
        "weight": 1,
        "severity": "medium",
        "feedback": "Sit tall with a straight, elongated spine."
      },
      {
        "id": "staff-dandasana.shoulder.relaxation",
        "name": "Relaxed Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.05,
        "weight": 1,
        "severity": "low",
        "feedback": "Relax shoulders away from your ears."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "standing-bow-dandayamana-dhanurasana",
    "slug": "standing-bow-dandayamana-dhanurasana",
    "displayName": "Standing Bow",
    "name": "Standing Bow",
    "sanskritName": "Dandayamana Dhanurasana",
    "category": "backbend",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/standing-bow-dandayamana-dhanurasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/standing-bow-dandayamana-dhanurasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/standing-bow-dandayamana-dhanurasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/standing-bow-dandayamana-dhanurasana.webp",
    "description": "Traditional backbend yoga posture (Dandayamana Dhanurasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Standing Bow.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "standing-bow-dandayamana-dhanurasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "standing-bow-dandayamana-dhanurasana.chest.opening",
      "standing-bow-dandayamana-dhanurasana.arm.extension"
    ],
    "isPremium": true,
    "orderIndex": 133,
    "aliases": [],
    "rules": [
      {
        "id": "standing-bow-dandayamana-dhanurasana.chest.opening",
        "name": "Chest Opening",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.05,
        "weight": 1,
        "severity": "medium",
        "feedback": "Broaden across your collarbones and open your chest."
      },
      {
        "id": "standing-bow-dandayamana-dhanurasana.arm.extension",
        "name": "Arm Support",
        "metric": "angle",
        "points": [
          11,
          13,
          15
        ],
        "comparison": "between",
        "min": 140,
        "max": 180,
        "tolerance": 15,
        "weight": 1,
        "severity": "medium",
        "feedback": "Engage arms to support gentle spinal arch."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      13,
      15
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "standing-foot-to-head-trivikramasana-a",
    "slug": "standing-foot-to-head-trivikramasana-a",
    "displayName": "Standing Foot To Head",
    "name": "Standing Foot To Head",
    "sanskritName": "Trivikramasana A",
    "category": "standing",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/standing-foot-to-head-trivikramasana-a.webp",
      "storagePath": "yogaverse-model-asanas-beach/standing-foot-to-head-trivikramasana-a.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/standing-foot-to-head-trivikramasana-a.webp",
    "storagePath": "yogaverse-model-asanas-beach/standing-foot-to-head-trivikramasana-a.webp",
    "description": "Traditional standing yoga posture (Trivikramasana A) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Standing Foot To Head.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "standing-foot-to-head-trivikramasana-a-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "standing-foot-to-head-trivikramasana-a.shoulder.level",
      "standing-foot-to-head-trivikramasana-a.spine.vertical",
      "standing-foot-to-head-trivikramasana-a.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 134,
    "aliases": [],
    "rules": [
      {
        "id": "standing-foot-to-head-trivikramasana-a.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "standing-foot-to-head-trivikramasana-a.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "standing-foot-to-head-trivikramasana-a.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "standing-forward-bend-uttanasana",
    "slug": "standing-forward-bend-uttanasana",
    "displayName": "Standing Forward Bend",
    "name": "Standing Forward Bend",
    "sanskritName": "Uttanasana",
    "category": "standing",
    "difficulty": "beginner",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/standing-forward-bend-uttanasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/standing-forward-bend-uttanasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/standing-forward-bend-uttanasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/standing-forward-bend-uttanasana.webp",
    "description": "Traditional standing yoga posture (Uttanasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Standing Forward Bend.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "standing-forward-bend-uttanasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "standing-forward-bend-uttanasana.shoulder.level",
      "standing-forward-bend-uttanasana.spine.vertical",
      "standing-forward-bend-uttanasana.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 135,
    "aliases": [
      "standing-forward-bend",
      "uttanasana",
      "step-3-forward-fold-padahastasana",
      "step-10-standing-forward-bend-padahastasana"
    ],
    "rules": [
      {
        "id": "standing-forward-bend-uttanasana.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "standing-forward-bend-uttanasana.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "standing-forward-bend-uttanasana.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "standing-half-bound-lotus-forward-bend-ardha-baddha-padmottanasana",
    "slug": "standing-half-bound-lotus-forward-bend-ardha-baddha-padmottanasana",
    "displayName": "Standing Half Bound Lotus Forward Bend",
    "name": "Standing Half Bound Lotus Forward Bend",
    "sanskritName": "Ardha Baddha Padmottanasana",
    "category": "seated",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/standing-half-bound-lotus-forward-bend-ardha-baddha-padmottanasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/standing-half-bound-lotus-forward-bend-ardha-baddha-padmottanasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/standing-half-bound-lotus-forward-bend-ardha-baddha-padmottanasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/standing-half-bound-lotus-forward-bend-ardha-baddha-padmottanasana.webp",
    "description": "Traditional seated yoga posture (Ardha Baddha Padmottanasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Standing Half Bound Lotus Forward Bend.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "standing-half-bound-lotus-forward-bend-ardha-baddha-padmottanasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "standing-half-bound-lotus-forward-bend-ardha-baddha-padmottanasana.spine.erect",
      "standing-half-bound-lotus-forward-bend-ardha-baddha-padmottanasana.shoulder.relaxation"
    ],
    "isPremium": true,
    "orderIndex": 136,
    "aliases": [],
    "rules": [
      {
        "id": "standing-half-bound-lotus-forward-bend-ardha-baddha-padmottanasana.spine.erect",
        "name": "Spine Length",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.1,
        "tolerance": 0.08,
        "weight": 1,
        "severity": "medium",
        "feedback": "Sit tall with a straight, elongated spine."
      },
      {
        "id": "standing-half-bound-lotus-forward-bend-ardha-baddha-padmottanasana.shoulder.relaxation",
        "name": "Relaxed Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.05,
        "weight": 1,
        "severity": "low",
        "feedback": "Relax shoulders away from your ears."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "standing-hand-to-big-toe-utthita-hasta-padangushthasana-a",
    "slug": "standing-hand-to-big-toe-utthita-hasta-padangushthasana-a",
    "displayName": "Standing Hand To Big Toe Utthita",
    "name": "Standing Hand To Big Toe Utthita",
    "sanskritName": "Hasta Padangushthasana A",
    "category": "standing",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/standing-hand-to-big-toe-utthita-hasta-padangushthasana-a.webp",
      "storagePath": "yogaverse-model-asanas-beach/standing-hand-to-big-toe-utthita-hasta-padangushthasana-a.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/standing-hand-to-big-toe-utthita-hasta-padangushthasana-a.webp",
    "storagePath": "yogaverse-model-asanas-beach/standing-hand-to-big-toe-utthita-hasta-padangushthasana-a.webp",
    "description": "Traditional standing yoga posture (Hasta Padangushthasana A) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Standing Hand To Big Toe Utthita.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "standing-hand-to-big-toe-utthita-hasta-padangushthasana-a-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "standing-hand-to-big-toe-utthita-hasta-padangushthasana-a.shoulder.level",
      "standing-hand-to-big-toe-utthita-hasta-padangushthasana-a.spine.vertical",
      "standing-hand-to-big-toe-utthita-hasta-padangushthasana-a.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 137,
    "aliases": [],
    "rules": [
      {
        "id": "standing-hand-to-big-toe-utthita-hasta-padangushthasana-a.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "standing-hand-to-big-toe-utthita-hasta-padangushthasana-a.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "standing-hand-to-big-toe-utthita-hasta-padangushthasana-a.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "standing-leg-behind-head-durvasasana",
    "slug": "standing-leg-behind-head-durvasasana",
    "displayName": "Standing Leg Behind Head",
    "name": "Standing Leg Behind Head",
    "sanskritName": "Durvasasana",
    "category": "standing",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/standing-leg-behind-head-durvasasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/standing-leg-behind-head-durvasasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/standing-leg-behind-head-durvasasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/standing-leg-behind-head-durvasasana.webp",
    "description": "Traditional standing yoga posture (Durvasasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Standing Leg Behind Head.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "standing-leg-behind-head-durvasasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "standing-leg-behind-head-durvasasana.shoulder.level",
      "standing-leg-behind-head-durvasasana.spine.vertical",
      "standing-leg-behind-head-durvasasana.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 138,
    "aliases": [],
    "rules": [
      {
        "id": "standing-leg-behind-head-durvasasana.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "standing-leg-behind-head-durvasasana.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "standing-leg-behind-head-durvasasana.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "standing-leg-behind-head-forward-bend-richikasana",
    "slug": "standing-leg-behind-head-forward-bend-richikasana",
    "displayName": "Standing Leg Behind Head Forward Bend",
    "name": "Standing Leg Behind Head Forward Bend",
    "sanskritName": "Richikasana",
    "category": "forward_bend",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/standing-leg-behind-head-forward-bend-richikasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/standing-leg-behind-head-forward-bend-richikasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/standing-leg-behind-head-forward-bend-richikasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/standing-leg-behind-head-forward-bend-richikasana.webp",
    "description": "Traditional forward_bend yoga posture (Richikasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Standing Leg Behind Head Forward Bend.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "standing-leg-behind-head-forward-bend-richikasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "standing-leg-behind-head-forward-bend-richikasana.body.symmetry"
    ],
    "isPremium": true,
    "orderIndex": 139,
    "aliases": [],
    "rules": [
      {
        "id": "standing-leg-behind-head-forward-bend-richikasana.body.symmetry",
        "name": "Symmetric Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "low",
        "feedback": "Relax deeply and breathe steadily into the posture."
      }
    ],
    "requiredLandmarks": [
      11,
      12
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "standing-splits-urdhva-prasarita-eka-padasana",
    "slug": "standing-splits-urdhva-prasarita-eka-padasana",
    "displayName": "Standing Splits Urdhva",
    "name": "Standing Splits Urdhva",
    "sanskritName": "Prasarita Eka Padasana",
    "category": "forward_bend",
    "difficulty": "advanced",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/standing-splits-urdhva-prasarita-eka-padasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/standing-splits-urdhva-prasarita-eka-padasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/standing-splits-urdhva-prasarita-eka-padasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/standing-splits-urdhva-prasarita-eka-padasana.webp",
    "description": "Traditional forward_bend yoga posture (Prasarita Eka Padasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Standing Splits Urdhva.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "standing-splits-urdhva-prasarita-eka-padasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "standing-splits-urdhva-prasarita-eka-padasana.body.symmetry"
    ],
    "isPremium": true,
    "orderIndex": 140,
    "aliases": [],
    "rules": [
      {
        "id": "standing-splits-urdhva-prasarita-eka-padasana.body.symmetry",
        "name": "Symmetric Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "low",
        "feedback": "Relax deeply and breathe steadily into the posture."
      }
    ],
    "requiredLandmarks": [
      11,
      12
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "star-utthita-tadasana",
    "slug": "star-utthita-tadasana",
    "displayName": "Star Utthita",
    "name": "Star Utthita",
    "sanskritName": "Tadasana",
    "category": "standing",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/star-utthita-tadasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/star-utthita-tadasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/star-utthita-tadasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/star-utthita-tadasana.webp",
    "description": "Traditional standing yoga posture (Tadasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Star Utthita.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "star-utthita-tadasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "star-utthita-tadasana.shoulder.level",
      "star-utthita-tadasana.spine.vertical",
      "star-utthita-tadasana.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 141,
    "aliases": [],
    "rules": [
      {
        "id": "star-utthita-tadasana.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "star-utthita-tadasana.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "star-utthita-tadasana.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "supine-angle-supta-konasana",
    "slug": "supine-angle-supta-konasana",
    "displayName": "Supine Angle",
    "name": "Supine Angle",
    "sanskritName": "Supta Konasana",
    "category": "restorative",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/supine-angle-supta-konasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/supine-angle-supta-konasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/supine-angle-supta-konasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/supine-angle-supta-konasana.webp",
    "description": "Traditional restorative yoga posture (Supta Konasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Supine Angle.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "supine-angle-supta-konasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "supine-angle-supta-konasana.body.symmetry"
    ],
    "isPremium": true,
    "orderIndex": 142,
    "aliases": [],
    "rules": [
      {
        "id": "supine-angle-supta-konasana.body.symmetry",
        "name": "Symmetric Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "low",
        "feedback": "Relax deeply and breathe steadily into the posture."
      }
    ],
    "requiredLandmarks": [
      11,
      12
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "supine-foot-to-head-supta-trivikramasana",
    "slug": "supine-foot-to-head-supta-trivikramasana",
    "displayName": "Supine Foot To Head",
    "name": "Supine Foot To Head",
    "sanskritName": "Supta Trivikramasana",
    "category": "restorative",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/supine-foot-to-head-supta-trivikramasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/supine-foot-to-head-supta-trivikramasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/supine-foot-to-head-supta-trivikramasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/supine-foot-to-head-supta-trivikramasana.webp",
    "description": "Traditional restorative yoga posture (Supta Trivikramasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Supine Foot To Head.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "supine-foot-to-head-supta-trivikramasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "supine-foot-to-head-supta-trivikramasana.body.symmetry"
    ],
    "isPremium": true,
    "orderIndex": 143,
    "aliases": [],
    "rules": [
      {
        "id": "supine-foot-to-head-supta-trivikramasana.body.symmetry",
        "name": "Symmetric Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "low",
        "feedback": "Relax deeply and breathe steadily into the posture."
      }
    ],
    "requiredLandmarks": [
      11,
      12
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "supine-hand-to-big-toe-supta-padangushthasana-a",
    "slug": "supine-hand-to-big-toe-supta-padangushthasana-a",
    "displayName": "Supine Hand To Big Toe",
    "name": "Supine Hand To Big Toe",
    "sanskritName": "Supta Padangushthasana A",
    "category": "restorative",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/supine-hand-to-big-toe-supta-padangushthasana-a.webp",
      "storagePath": "yogaverse-model-asanas-beach/supine-hand-to-big-toe-supta-padangushthasana-a.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/supine-hand-to-big-toe-supta-padangushthasana-a.webp",
    "storagePath": "yogaverse-model-asanas-beach/supine-hand-to-big-toe-supta-padangushthasana-a.webp",
    "description": "Traditional restorative yoga posture (Supta Padangushthasana A) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Supine Hand To Big Toe.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "supine-hand-to-big-toe-supta-padangushthasana-a-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "supine-hand-to-big-toe-supta-padangushthasana-a.body.symmetry"
    ],
    "isPremium": true,
    "orderIndex": 144,
    "aliases": [],
    "rules": [
      {
        "id": "supine-hand-to-big-toe-supta-padangushthasana-a.body.symmetry",
        "name": "Symmetric Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "low",
        "feedback": "Relax deeply and breathe steadily into the posture."
      }
    ],
    "requiredLandmarks": [
      11,
      12
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "supine-straddle-supta-samakonasana",
    "slug": "supine-straddle-supta-samakonasana",
    "displayName": "Supine Straddle",
    "name": "Supine Straddle",
    "sanskritName": "Supta Samakonasana",
    "category": "restorative",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/supine-straddle-supta-samakonasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/supine-straddle-supta-samakonasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/supine-straddle-supta-samakonasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/supine-straddle-supta-samakonasana.webp",
    "description": "Traditional restorative yoga posture (Supta Samakonasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Supine Straddle.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "supine-straddle-supta-samakonasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "supine-straddle-supta-samakonasana.body.symmetry"
    ],
    "isPremium": true,
    "orderIndex": 145,
    "aliases": [],
    "rules": [
      {
        "id": "supine-straddle-supta-samakonasana.body.symmetry",
        "name": "Symmetric Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "low",
        "feedback": "Relax deeply and breathe steadily into the posture."
      }
    ],
    "requiredLandmarks": [
      11,
      12
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "supine-twist-supta-matsyendrasana",
    "slug": "supine-twist-supta-matsyendrasana",
    "displayName": "Supine Twist",
    "name": "Supine Twist",
    "sanskritName": "Supta Matsyendrasana",
    "category": "restorative",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/supine-twist-supta-matsyendrasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/supine-twist-supta-matsyendrasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/supine-twist-supta-matsyendrasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/supine-twist-supta-matsyendrasana.webp",
    "description": "Traditional restorative yoga posture (Supta Matsyendrasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Supine Twist.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "supine-twist-supta-matsyendrasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "supine-twist-supta-matsyendrasana.body.symmetry"
    ],
    "isPremium": true,
    "orderIndex": 146,
    "aliases": [],
    "rules": [
      {
        "id": "supine-twist-supta-matsyendrasana.body.symmetry",
        "name": "Symmetric Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "low",
        "feedback": "Relax deeply and breathe steadily into the posture."
      }
    ],
    "requiredLandmarks": [
      11,
      12
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "thunderbolt-vajrasana",
    "slug": "thunderbolt-vajrasana",
    "displayName": "Thunderbolt Pose",
    "name": "Thunderbolt Pose",
    "sanskritName": "Vajrasana",
    "category": "seated",
    "difficulty": "beginner",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/thunderbolt-vajrasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/thunderbolt-vajrasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/thunderbolt-vajrasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/thunderbolt-vajrasana.webp",
    "description": "Traditional seated yoga posture (Vajrasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Thunderbolt Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "thunderbolt-vajrasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "thunderbolt-vajrasana.spine.erect",
      "thunderbolt-vajrasana.shoulder.relaxation"
    ],
    "isPremium": true,
    "orderIndex": 147,
    "aliases": [],
    "rules": [
      {
        "id": "thunderbolt-vajrasana.spine.erect",
        "name": "Spine Length",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.1,
        "tolerance": 0.08,
        "weight": 1,
        "severity": "medium",
        "feedback": "Sit tall with a straight, elongated spine."
      },
      {
        "id": "thunderbolt-vajrasana.shoulder.relaxation",
        "name": "Relaxed Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.05,
        "weight": 1,
        "severity": "low",
        "feedback": "Relax shoulders away from your ears."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "tiger-vyaghrasana",
    "slug": "tiger-vyaghrasana",
    "displayName": "Tiger",
    "name": "Tiger",
    "sanskritName": "Vyaghrasana",
    "category": "standing",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/tiger-vyaghrasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/tiger-vyaghrasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/tiger-vyaghrasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/tiger-vyaghrasana.webp",
    "description": "Traditional standing yoga posture (Vyaghrasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Tiger.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "tiger-vyaghrasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "tiger-vyaghrasana.shoulder.level",
      "tiger-vyaghrasana.spine.vertical",
      "tiger-vyaghrasana.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 148,
    "aliases": [],
    "rules": [
      {
        "id": "tiger-vyaghrasana.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "tiger-vyaghrasana.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "tiger-vyaghrasana.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "toe-stand-padangushthasana",
    "slug": "toe-stand-padangushthasana",
    "displayName": "Toe Stand",
    "name": "Toe Stand",
    "sanskritName": "Padangushthasana",
    "category": "standing",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/toe-stand-padangushthasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/toe-stand-padangushthasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/toe-stand-padangushthasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/toe-stand-padangushthasana.webp",
    "description": "Traditional standing yoga posture (Padangushthasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Toe Stand.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "toe-stand-padangushthasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "toe-stand-padangushthasana.shoulder.level",
      "toe-stand-padangushthasana.spine.vertical",
      "toe-stand-padangushthasana.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 149,
    "aliases": [],
    "rules": [
      {
        "id": "toe-stand-padangushthasana.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "toe-stand-padangushthasana.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "toe-stand-padangushthasana.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "tortoise-kurmasana",
    "slug": "tortoise-kurmasana",
    "displayName": "Tortoise",
    "name": "Tortoise",
    "sanskritName": "Kurmasana",
    "category": "standing",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/tortoise-kurmasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/tortoise-kurmasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/tortoise-kurmasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/tortoise-kurmasana.webp",
    "description": "Traditional standing yoga posture (Kurmasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Tortoise.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "tortoise-kurmasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "tortoise-kurmasana.shoulder.level",
      "tortoise-kurmasana.spine.vertical",
      "tortoise-kurmasana.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 150,
    "aliases": [],
    "rules": [
      {
        "id": "tortoise-kurmasana.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "tortoise-kurmasana.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "tortoise-kurmasana.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "tree-vrksasana",
    "slug": "tree-vrksasana",
    "displayName": "Tree Pose",
    "name": "Tree Pose",
    "sanskritName": "Vrksasana",
    "category": "balancing",
    "difficulty": "beginner",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/tree-vrksasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/tree-vrksasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/tree-vrksasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/tree-vrksasana.webp",
    "description": "Traditional balancing yoga posture (Vrksasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Tree Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "tree-vrksasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "tree-standing-leg-straight",
      "tree-shoulders-level"
    ],
    "isPremium": false,
    "orderIndex": 151,
    "aliases": [
      "tree-pose",
      "vrksasana",
      "tree"
    ],
    "rules": [
      {
        "id": "tree-standing-leg-straight",
        "name": "Standing Leg Straight",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "weight": 2,
        "severity": "high",
        "feedback": "Keep your standing leg straight and firmly grounded."
      },
      {
        "id": "tree-shoulders-level",
        "name": "Shoulders Level",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep both shoulders level and open across the chest."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      25,
      27
    ],
    "validation": {
      "status": "production",
      "version": "1.0.0",
      "sampleCount": 20,
      "expertReviewed": true
    }
  },
  {
    "id": "triangle-trikonasana",
    "slug": "triangle-trikonasana",
    "displayName": "Triangle Pose",
    "name": "Triangle Pose",
    "sanskritName": "Trikonasana",
    "category": "standing",
    "difficulty": "beginner",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/triangle-trikonasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/triangle-trikonasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/triangle-trikonasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/triangle-trikonasana.webp",
    "description": "Traditional standing yoga posture (Trikonasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Triangle Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "triangle-trikonasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "triangle-trikonasana.shoulder.level",
      "triangle-trikonasana.spine.vertical",
      "triangle-trikonasana.hip.level"
    ],
    "isPremium": false,
    "orderIndex": 152,
    "aliases": [
      "triangle-pose",
      "trikonasana"
    ],
    "rules": [
      {
        "id": "triangle-trikonasana.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "triangle-trikonasana.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "triangle-trikonasana.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "tripod-headstand-mukta-hasta-shirshasana-a",
    "slug": "tripod-headstand-mukta-hasta-shirshasana-a",
    "displayName": "Tripod Headstand",
    "name": "Tripod Headstand",
    "sanskritName": "Mukta Hasta Shirshasana A",
    "category": "inversion",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/tripod-headstand-mukta-hasta-shirshasana-a.webp",
      "storagePath": "yogaverse-model-asanas-beach/tripod-headstand-mukta-hasta-shirshasana-a.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/tripod-headstand-mukta-hasta-shirshasana-a.webp",
    "storagePath": "yogaverse-model-asanas-beach/tripod-headstand-mukta-hasta-shirshasana-a.webp",
    "description": "Traditional inversion yoga posture (Mukta Hasta Shirshasana A) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Tripod Headstand.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "tripod-headstand-mukta-hasta-shirshasana-a-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "tripod-headstand-mukta-hasta-shirshasana-a.inversion.line",
      "tripod-headstand-mukta-hasta-shirshasana-a.shoulder.base"
    ],
    "isPremium": true,
    "orderIndex": 153,
    "aliases": [],
    "rules": [
      {
        "id": "tripod-headstand-mukta-hasta-shirshasana-a.inversion.line",
        "name": "Vertical Line",
        "metric": "vertical_alignment",
        "points": [
          23,
          27
        ],
        "comparison": "less_than",
        "target": 0.12,
        "tolerance": 0.08,
        "weight": 2,
        "severity": "high",
        "feedback": "Stack hips and legs vertically with smooth control."
      },
      {
        "id": "tripod-headstand-mukta-hasta-shirshasana-a.shoulder.base",
        "name": "Shoulder Base",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "high",
        "isSafety": true,
        "feedback": "Maintain broad shoulder foundation without compressing neck."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "two-legs-behind-the-head-i-dvi-pada-shirshasana-a",
    "slug": "two-legs-behind-the-head-i-dvi-pada-shirshasana-a",
    "displayName": "Two Legs Behind The Head I",
    "name": "Two Legs Behind The Head I",
    "sanskritName": "Dvi Pada Shirshasana A",
    "category": "standing",
    "difficulty": "advanced",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/two-legs-behind-the-head-i-dvi-pada-shirshasana-a.webp",
      "storagePath": "yogaverse-model-asanas-beach/two-legs-behind-the-head-i-dvi-pada-shirshasana-a.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/two-legs-behind-the-head-i-dvi-pada-shirshasana-a.webp",
    "storagePath": "yogaverse-model-asanas-beach/two-legs-behind-the-head-i-dvi-pada-shirshasana-a.webp",
    "description": "Traditional standing yoga posture (Dvi Pada Shirshasana A) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Two Legs Behind The Head I.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "two-legs-behind-the-head-i-dvi-pada-shirshasana-a-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "two-legs-behind-the-head-i-dvi-pada-shirshasana-a.shoulder.level",
      "two-legs-behind-the-head-i-dvi-pada-shirshasana-a.spine.vertical",
      "two-legs-behind-the-head-i-dvi-pada-shirshasana-a.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 154,
    "aliases": [],
    "rules": [
      {
        "id": "two-legs-behind-the-head-i-dvi-pada-shirshasana-a.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "two-legs-behind-the-head-i-dvi-pada-shirshasana-a.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "two-legs-behind-the-head-i-dvi-pada-shirshasana-a.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "two-legs-behind-the-head-ii-dvi-pada-shirshasana-b",
    "slug": "two-legs-behind-the-head-ii-dvi-pada-shirshasana-b",
    "displayName": "Two Legs Behind The Head II",
    "name": "Two Legs Behind The Head II",
    "sanskritName": "Dvi Pada Shirshasana B",
    "category": "standing",
    "difficulty": "advanced",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/two-legs-behind-the-head-ii-dvi-pada-shirshasana-b.webp",
      "storagePath": "yogaverse-model-asanas-beach/two-legs-behind-the-head-ii-dvi-pada-shirshasana-b.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/two-legs-behind-the-head-ii-dvi-pada-shirshasana-b.webp",
    "storagePath": "yogaverse-model-asanas-beach/two-legs-behind-the-head-ii-dvi-pada-shirshasana-b.webp",
    "description": "Traditional standing yoga posture (Dvi Pada Shirshasana B) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Two Legs Behind The Head II.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "two-legs-behind-the-head-ii-dvi-pada-shirshasana-b-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "two-legs-behind-the-head-ii-dvi-pada-shirshasana-b.shoulder.level",
      "two-legs-behind-the-head-ii-dvi-pada-shirshasana-b.spine.vertical",
      "two-legs-behind-the-head-ii-dvi-pada-shirshasana-b.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 155,
    "aliases": [],
    "rules": [
      {
        "id": "two-legs-behind-the-head-ii-dvi-pada-shirshasana-b.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "two-legs-behind-the-head-ii-dvi-pada-shirshasana-b.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "two-legs-behind-the-head-ii-dvi-pada-shirshasana-b.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "upward-facing-dog-urdhva-mukha-shvanasana",
    "slug": "upward-facing-dog-urdhva-mukha-shvanasana",
    "displayName": "Upward-Facing Dog",
    "name": "Upward-Facing Dog",
    "sanskritName": "Urdhva Mukha Svanasana",
    "category": "backbend",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/upward-facing-dog-urdhva-mukha-shvanasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/upward-facing-dog-urdhva-mukha-shvanasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/upward-facing-dog-urdhva-mukha-shvanasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/upward-facing-dog-urdhva-mukha-shvanasana.webp",
    "description": "Traditional backbend yoga posture (Urdhva Mukha Svanasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Upward-Facing Dog.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "upward-facing-dog-urdhva-mukha-shvanasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "upward-facing-dog-urdhva-mukha-shvanasana.chest.opening",
      "upward-facing-dog-urdhva-mukha-shvanasana.arm.extension"
    ],
    "isPremium": true,
    "orderIndex": 156,
    "aliases": [
      "upward-facing-dog",
      "upward-dog",
      "urdhva-mukha-shvanasana"
    ],
    "rules": [
      {
        "id": "upward-facing-dog-urdhva-mukha-shvanasana.chest.opening",
        "name": "Chest Opening",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.05,
        "weight": 1,
        "severity": "medium",
        "feedback": "Broaden across your collarbones and open your chest."
      },
      {
        "id": "upward-facing-dog-urdhva-mukha-shvanasana.arm.extension",
        "name": "Arm Support",
        "metric": "angle",
        "points": [
          11,
          13,
          15
        ],
        "comparison": "between",
        "min": 140,
        "max": 180,
        "tolerance": 15,
        "weight": 1,
        "severity": "medium",
        "feedback": "Engage arms to support gentle spinal arch."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      13,
      15
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "upward-plank-purvottanasana",
    "slug": "upward-plank-purvottanasana",
    "displayName": "Upward Plank Pose",
    "name": "Upward Plank Pose",
    "sanskritName": "Purvottanasana",
    "category": "core",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/upward-plank-purvottanasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/upward-plank-purvottanasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/upward-plank-purvottanasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/upward-plank-purvottanasana.webp",
    "description": "Traditional core yoga posture (Purvottanasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Upward Plank Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "upward-plank-purvottanasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "upward-plank-purvottanasana.core.alignment",
      "upward-plank-purvottanasana.shoulder.stability"
    ],
    "isPremium": true,
    "orderIndex": 157,
    "aliases": [],
    "rules": [
      {
        "id": "upward-plank-purvottanasana.core.alignment",
        "name": "Torso Line",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 150,
        "max": 180,
        "tolerance": 15,
        "weight": 2,
        "severity": "high",
        "feedback": "Engage abdominal muscles to maintain straight body line."
      },
      {
        "id": "upward-plank-purvottanasana.shoulder.stability",
        "name": "Shoulder Stability",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Press through hands and keep shoulder girdle firm."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      25
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "warrior-i-virabhadrasana-a",
    "slug": "warrior-i-virabhadrasana-a",
    "displayName": "Warrior I",
    "name": "Warrior I",
    "sanskritName": "Virabhadrasana I",
    "category": "standing",
    "difficulty": "beginner",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/warrior-i-virabhadrasana-a.webp",
      "storagePath": "yogaverse-model-asanas-beach/warrior-i-virabhadrasana-a.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/warrior-i-virabhadrasana-a.webp",
    "storagePath": "yogaverse-model-asanas-beach/warrior-i-virabhadrasana-a.webp",
    "description": "Traditional standing yoga posture (Virabhadrasana I) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Warrior I.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "warrior-i-virabhadrasana-a-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "warrior-i-virabhadrasana-a.shoulder.level",
      "warrior-i-virabhadrasana-a.spine.vertical",
      "warrior-i-virabhadrasana-a.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 158,
    "aliases": [
      "warrior-i",
      "virabhadrasana-i",
      "virabhadrasana-1"
    ],
    "rules": [
      {
        "id": "warrior-i-virabhadrasana-a.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "warrior-i-virabhadrasana-a.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "warrior-i-virabhadrasana-a.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "warrior-ii-virabhadrasana-ii",
    "slug": "warrior-ii-virabhadrasana-ii",
    "displayName": "Warrior II",
    "name": "Warrior II",
    "sanskritName": "Virabhadrasana II",
    "category": "standing",
    "difficulty": "beginner",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/warrior-ii-virabhadrasana-ii.webp",
      "storagePath": "yogaverse-model-asanas-beach/warrior-ii-virabhadrasana-ii.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/warrior-ii-virabhadrasana-ii.webp",
    "storagePath": "yogaverse-model-asanas-beach/warrior-ii-virabhadrasana-ii.webp",
    "description": "Traditional standing yoga posture (Virabhadrasana II) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Warrior II.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "warrior-ii-virabhadrasana-ii-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "warrior-ii-left-elbow-straight",
      "warrior-ii-right-elbow-straight",
      "warrior-ii-left-knee-angle",
      "warrior-ii-right-knee-straight",
      "warrior-ii-shoulder-alignment",
      "warrior-ii-hip-alignment"
    ],
    "isPremium": false,
    "orderIndex": 159,
    "aliases": [
      "warrior-ii",
      "virabhadrasana-ii",
      "virabhadrasana-2"
    ],
    "rules": [
      {
        "id": "warrior-ii-left-elbow-straight",
        "name": "Left Arm Extension",
        "metric": "angle",
        "points": [
          11,
          13,
          15
        ],
        "comparison": "between",
        "min": 155,
        "max": 180,
        "weight": 2,
        "severity": "high",
        "feedback": "Extend your left arm straight out to the side \u2014 reach through your fingertips."
      },
      {
        "id": "warrior-ii-right-elbow-straight",
        "name": "Right Arm Extension",
        "metric": "angle",
        "points": [
          12,
          14,
          16
        ],
        "comparison": "between",
        "min": 155,
        "max": 180,
        "weight": 2,
        "severity": "high",
        "feedback": "Extend your right arm straight out to the side \u2014 reach through your fingertips."
      },
      {
        "id": "warrior-ii-left-knee-angle",
        "name": "Front Knee Bend",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 75,
        "max": 125,
        "target": 90,
        "tolerance": 15,
        "warningTolerance": 25,
        "weight": 3,
        "severity": "high",
        "feedback": "Bend your front knee toward 90 degrees \u2014 stack it directly over your ankle."
      },
      {
        "id": "warrior-ii-right-knee-straight",
        "name": "Back Leg Straight",
        "metric": "angle",
        "points": [
          24,
          26,
          28
        ],
        "comparison": "between",
        "min": 155,
        "max": 180,
        "tolerance": 10,
        "warningTolerance": 18,
        "weight": 2,
        "severity": "high",
        "feedback": "Keep your back leg straight \u2014 press through the outer edge of your foot."
      },
      {
        "id": "warrior-ii-shoulder-alignment",
        "name": "Shoulder Level",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "warningTolerance": 0.08,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed away from ears."
      },
      {
        "id": "warrior-ii-hip-alignment",
        "name": "Hip Stability",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep hips open and stable \u2014 square them toward the side of the room."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      13,
      14,
      15,
      16,
      23,
      24,
      25,
      26,
      27,
      28
    ],
    "validation": {
      "status": "production",
      "version": "1.0.0",
      "sampleCount": 20,
      "expertReviewed": true
    }
  },
  {
    "id": "warrior-iii-virabhadrasana-c",
    "slug": "warrior-iii-virabhadrasana-c",
    "displayName": "Warrior III",
    "name": "Warrior III",
    "sanskritName": "Virabhadrasana III",
    "category": "balancing",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/warrior-iii-virabhadrasana-c.webp",
      "storagePath": "yogaverse-model-asanas-beach/warrior-iii-virabhadrasana-c.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/warrior-iii-virabhadrasana-c.webp",
    "storagePath": "yogaverse-model-asanas-beach/warrior-iii-virabhadrasana-c.webp",
    "description": "Traditional balancing yoga posture (Virabhadrasana III) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Warrior III.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "warrior-iii-virabhadrasana-c-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "warrior-iii-virabhadrasana-c.standing.leg",
      "warrior-iii-virabhadrasana-c.shoulder.alignment"
    ],
    "isPremium": true,
    "orderIndex": 160,
    "aliases": [
      "warrior-iii",
      "virabhadrasana-iii",
      "virabhadrasana-3"
    ],
    "rules": [
      {
        "id": "warrior-iii-virabhadrasana-c.standing.leg",
        "name": "Standing Leg Stability",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "tolerance": 10,
        "weight": 2,
        "severity": "high",
        "feedback": "Firm your standing leg and root down through the foot."
      },
      {
        "id": "warrior-iii-virabhadrasana-c.shoulder.alignment",
        "name": "Shoulder Level",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders even and focus your gaze on a steady point."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "waterfall-supta-dandasana",
    "slug": "waterfall-supta-dandasana",
    "displayName": "Waterfall",
    "name": "Waterfall",
    "sanskritName": "Supta Dandasana",
    "category": "standing",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/waterfall-supta-dandasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/waterfall-supta-dandasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/waterfall-supta-dandasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/waterfall-supta-dandasana.webp",
    "description": "Traditional standing yoga posture (Supta Dandasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Waterfall.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "waterfall-supta-dandasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "waterfall-supta-dandasana.shoulder.level",
      "waterfall-supta-dandasana.spine.vertical",
      "waterfall-supta-dandasana.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 161,
    "aliases": [],
    "rules": [
      {
        "id": "waterfall-supta-dandasana.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "waterfall-supta-dandasana.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "waterfall-supta-dandasana.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "wheel-urdhva-dhanurasana",
    "slug": "wheel-urdhva-dhanurasana",
    "displayName": "Wheel Pose",
    "name": "Wheel Pose",
    "sanskritName": "Urdhva Dhanurasana",
    "category": "backbend",
    "difficulty": "advanced",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/wheel-urdhva-dhanurasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/wheel-urdhva-dhanurasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/wheel-urdhva-dhanurasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/wheel-urdhva-dhanurasana.webp",
    "description": "Traditional backbend yoga posture (Urdhva Dhanurasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Wheel Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "wheel-urdhva-dhanurasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "wheel-urdhva-dhanurasana.chest.opening",
      "wheel-urdhva-dhanurasana.arm.extension"
    ],
    "isPremium": true,
    "orderIndex": 162,
    "aliases": [],
    "rules": [
      {
        "id": "wheel-urdhva-dhanurasana.chest.opening",
        "name": "Chest Opening",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.05,
        "weight": 1,
        "severity": "medium",
        "feedback": "Broaden across your collarbones and open your chest."
      },
      {
        "id": "wheel-urdhva-dhanurasana.arm.extension",
        "name": "Arm Support",
        "metric": "angle",
        "points": [
          11,
          13,
          15
        ],
        "comparison": "between",
        "min": 140,
        "max": 180,
        "tolerance": 15,
        "weight": 1,
        "severity": "medium",
        "feedback": "Engage arms to support gentle spinal arch."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      13,
      15
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "wide-angle-seated-forward-bend-upavistha-konasana",
    "slug": "wide-angle-seated-forward-bend-upavistha-konasana",
    "displayName": "Wide Angle Seated Forward Bend Upavistha",
    "name": "Wide Angle Seated Forward Bend Upavistha",
    "sanskritName": "Konasana",
    "category": "seated",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/wide-angle-seated-forward-bend-upavistha-konasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/wide-angle-seated-forward-bend-upavistha-konasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/wide-angle-seated-forward-bend-upavistha-konasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/wide-angle-seated-forward-bend-upavistha-konasana.webp",
    "description": "Traditional seated yoga posture (Konasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Wide Angle Seated Forward Bend Upavistha.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "wide-angle-seated-forward-bend-upavistha-konasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "wide-angle-seated-forward-bend-upavistha-konasana.spine.erect",
      "wide-angle-seated-forward-bend-upavistha-konasana.shoulder.relaxation"
    ],
    "isPremium": true,
    "orderIndex": 163,
    "aliases": [],
    "rules": [
      {
        "id": "wide-angle-seated-forward-bend-upavistha-konasana.spine.erect",
        "name": "Spine Length",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.1,
        "tolerance": 0.08,
        "weight": 1,
        "severity": "medium",
        "feedback": "Sit tall with a straight, elongated spine."
      },
      {
        "id": "wide-angle-seated-forward-bend-upavistha-konasana.shoulder.relaxation",
        "name": "Relaxed Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.05,
        "weight": 1,
        "severity": "low",
        "feedback": "Relax shoulders away from your ears."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "wide-legged-forward-bend-i-prasarita-padottanasana-a",
    "slug": "wide-legged-forward-bend-i-prasarita-padottanasana-a",
    "displayName": "Wide Legged Forward Bend I",
    "name": "Wide Legged Forward Bend I",
    "sanskritName": "Prasarita Padottanasana A",
    "category": "forward_bend",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/wide-legged-forward-bend-i-prasarita-padottanasana-a.webp",
      "storagePath": "yogaverse-model-asanas-beach/wide-legged-forward-bend-i-prasarita-padottanasana-a.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/wide-legged-forward-bend-i-prasarita-padottanasana-a.webp",
    "storagePath": "yogaverse-model-asanas-beach/wide-legged-forward-bend-i-prasarita-padottanasana-a.webp",
    "description": "Traditional forward_bend yoga posture (Prasarita Padottanasana A) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Wide Legged Forward Bend I.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "wide-legged-forward-bend-i-prasarita-padottanasana-a-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "wide-legged-forward-bend-i-prasarita-padottanasana-a.body.symmetry"
    ],
    "isPremium": true,
    "orderIndex": 164,
    "aliases": [],
    "rules": [
      {
        "id": "wide-legged-forward-bend-i-prasarita-padottanasana-a.body.symmetry",
        "name": "Symmetric Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "low",
        "feedback": "Relax deeply and breathe steadily into the posture."
      }
    ],
    "requiredLandmarks": [
      11,
      12
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "wide-legged-forward-bend-ii-prasarita-padottanasana-b",
    "slug": "wide-legged-forward-bend-ii-prasarita-padottanasana-b",
    "displayName": "Wide Legged Forward Bend II",
    "name": "Wide Legged Forward Bend II",
    "sanskritName": "Prasarita Padottanasana B",
    "category": "forward_bend",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/wide-legged-forward-bend-ii-prasarita-padottanasana-b.webp",
      "storagePath": "yogaverse-model-asanas-beach/wide-legged-forward-bend-ii-prasarita-padottanasana-b.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/wide-legged-forward-bend-ii-prasarita-padottanasana-b.webp",
    "storagePath": "yogaverse-model-asanas-beach/wide-legged-forward-bend-ii-prasarita-padottanasana-b.webp",
    "description": "Traditional forward_bend yoga posture (Prasarita Padottanasana B) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Wide Legged Forward Bend II.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "wide-legged-forward-bend-ii-prasarita-padottanasana-b-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "wide-legged-forward-bend-ii-prasarita-padottanasana-b.body.symmetry"
    ],
    "isPremium": true,
    "orderIndex": 165,
    "aliases": [],
    "rules": [
      {
        "id": "wide-legged-forward-bend-ii-prasarita-padottanasana-b.body.symmetry",
        "name": "Symmetric Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "low",
        "feedback": "Relax deeply and breathe steadily into the posture."
      }
    ],
    "requiredLandmarks": [
      11,
      12
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "wide-legged-forward-bend-iii-prasarita-padottanasana-c",
    "slug": "wide-legged-forward-bend-iii-prasarita-padottanasana-c",
    "displayName": "Wide Legged Forward Bend III",
    "name": "Wide Legged Forward Bend III",
    "sanskritName": "Prasarita Padottanasana C",
    "category": "forward_bend",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/wide-legged-forward-bend-iii-prasarita-padottanasana-c.webp",
      "storagePath": "yogaverse-model-asanas-beach/wide-legged-forward-bend-iii-prasarita-padottanasana-c.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/wide-legged-forward-bend-iii-prasarita-padottanasana-c.webp",
    "storagePath": "yogaverse-model-asanas-beach/wide-legged-forward-bend-iii-prasarita-padottanasana-c.webp",
    "description": "Traditional forward_bend yoga posture (Prasarita Padottanasana C) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Wide Legged Forward Bend III.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "wide-legged-forward-bend-iii-prasarita-padottanasana-c-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "wide-legged-forward-bend-iii-prasarita-padottanasana-c.body.symmetry"
    ],
    "isPremium": true,
    "orderIndex": 166,
    "aliases": [],
    "rules": [
      {
        "id": "wide-legged-forward-bend-iii-prasarita-padottanasana-c.body.symmetry",
        "name": "Symmetric Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "low",
        "feedback": "Relax deeply and breathe steadily into the posture."
      }
    ],
    "requiredLandmarks": [
      11,
      12
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "wide-legged-forward-bend-iv-prasarita-padottanasana-d",
    "slug": "wide-legged-forward-bend-iv-prasarita-padottanasana-d",
    "displayName": "Wide Legged Forward Bend Iv",
    "name": "Wide Legged Forward Bend Iv",
    "sanskritName": "Prasarita Padottanasana D",
    "category": "forward_bend",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/wide-legged-forward-bend-iv-prasarita-padottanasana-d.webp",
      "storagePath": "yogaverse-model-asanas-beach/wide-legged-forward-bend-iv-prasarita-padottanasana-d.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/wide-legged-forward-bend-iv-prasarita-padottanasana-d.webp",
    "storagePath": "yogaverse-model-asanas-beach/wide-legged-forward-bend-iv-prasarita-padottanasana-d.webp",
    "description": "Traditional forward_bend yoga posture (Prasarita Padottanasana D) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Wide Legged Forward Bend Iv.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "wide-legged-forward-bend-iv-prasarita-padottanasana-d-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "wide-legged-forward-bend-iv-prasarita-padottanasana-d.body.symmetry"
    ],
    "isPremium": true,
    "orderIndex": 167,
    "aliases": [],
    "rules": [
      {
        "id": "wide-legged-forward-bend-iv-prasarita-padottanasana-d.body.symmetry",
        "name": "Symmetric Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "low",
        "feedback": "Relax deeply and breathe steadily into the posture."
      }
    ],
    "requiredLandmarks": [
      11,
      12
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "wide-splits-samakonasana",
    "slug": "wide-splits-samakonasana",
    "displayName": "Wide Splits",
    "name": "Wide Splits",
    "sanskritName": "Samakonasana",
    "category": "standing",
    "difficulty": "advanced",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/wide-splits-samakonasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/wide-splits-samakonasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/wide-splits-samakonasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/wide-splits-samakonasana.webp",
    "description": "Traditional standing yoga posture (Samakonasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Wide Splits.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "wide-splits-samakonasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "wide-splits-samakonasana.shoulder.level",
      "wide-splits-samakonasana.spine.vertical",
      "wide-splits-samakonasana.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 168,
    "aliases": [],
    "rules": [
      {
        "id": "wide-splits-samakonasana.shoulder.level",
        "name": "Shoulder Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.05,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Keep shoulders level and relaxed."
      },
      {
        "id": "wide-splits-samakonasana.spine.vertical",
        "name": "Spinal Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "medium",
        "feedback": "Lengthen your spine and maintain upright alignment."
      },
      {
        "id": "wide-splits-samakonasana.hip.level",
        "name": "Hip Balance",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.04,
        "weight": 1,
        "severity": "medium",
        "feedback": "Distribute weight evenly across hips."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "wild-thing-chamatkarasana",
    "slug": "wild-thing-chamatkarasana",
    "displayName": "Wild Thing",
    "name": "Wild Thing",
    "sanskritName": "Camatkarasana",
    "category": "backbend",
    "difficulty": "intermediate",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/wild-thing-chamatkarasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/wild-thing-chamatkarasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/wild-thing-chamatkarasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/wild-thing-chamatkarasana.webp",
    "description": "Traditional backbend yoga posture (Camatkarasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Wild Thing.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "wild-thing-chamatkarasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "wild-thing-chamatkarasana.chest.opening",
      "wild-thing-chamatkarasana.arm.extension"
    ],
    "isPremium": true,
    "orderIndex": 169,
    "aliases": [],
    "rules": [
      {
        "id": "wild-thing-chamatkarasana.chest.opening",
        "name": "Chest Opening",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.06,
        "tolerance": 0.05,
        "weight": 1,
        "severity": "medium",
        "feedback": "Broaden across your collarbones and open your chest."
      },
      {
        "id": "wild-thing-chamatkarasana.arm.extension",
        "name": "Arm Support",
        "metric": "angle",
        "points": [
          11,
          13,
          15
        ],
        "comparison": "between",
        "min": 140,
        "max": 180,
        "tolerance": 15,
        "weight": 1,
        "severity": "medium",
        "feedback": "Engage arms to support gentle spinal arch."
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      13,
      15
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  },
  {
    "id": "wind-removing-pavanamuktasana",
    "slug": "wind-removing-pavanamuktasana",
    "displayName": "Wind-Relieving Pose",
    "name": "Wind-Relieving Pose",
    "sanskritName": "Pavanamuktasana",
    "category": "restorative",
    "difficulty": "beginner",
    "asset": {
      "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/wind-removing-pavanamuktasana.webp",
      "storagePath": "yogaverse-model-asanas-beach/wind-removing-pavanamuktasana.webp"
    },
    "imageUrl": "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach/wind-removing-pavanamuktasana.webp",
    "storagePath": "yogaverse-model-asanas-beach/wind-removing-pavanamuktasana.webp",
    "description": "Traditional restorative yoga posture (Pavanamuktasana) promoting balance, strength, and vitality.",
    "benefits": [
      "Improves alignment and spatial awareness",
      "Promotes strength, flexibility, and mind-body balance",
      "Cultivates steady breathing and mindful concentration"
    ],
    "instructions": [
      "Begin by preparing your foundation for Wind-Relieving Pose.",
      "Engage your breath and align your posture smoothly.",
      "Hold steady with calm concentration and relaxed shoulders."
    ],
    "cues": [
      {
        "id": "wind-removing-pavanamuktasana-c1",
        "jointOrBodyPart": "Core / Spine",
        "cue": "Lengthen through the crown of your head",
        "tip": "Maintain steady rhythmic breathing."
      }
    ],
    "targetHoldSeconds": 5,
    "ruleIds": [
      "wind-removing-pavanamuktasana.body.symmetry"
    ],
    "isPremium": true,
    "orderIndex": 170,
    "aliases": [],
    "rules": [
      {
        "id": "wind-removing-pavanamuktasana.body.symmetry",
        "name": "Symmetric Balance",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 1,
        "severity": "low",
        "feedback": "Relax deeply and breathe steadily into the posture."
      }
    ],
    "requiredLandmarks": [
      11,
      12
    ],
    "validation": {
      "status": "draft",
      "version": "1.0.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  }
];
