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
      "archers-akarna-dhanurasana.bow.arc",
      "archers-akarna-dhanurasana.knees.bent",
      "archers-akarna-dhanurasana.chest.centered"
    ],
    "isPremium": true,
    "orderIndex": 1,
    "aliases": [],
    "rules": [
      {
        "id": "archers-akarna-dhanurasana.bow.arc",
        "name": "Torso & Leg Bow Arc",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 100,
        "max": 150,
        "target": 125,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Kick feet into hands to lift chest and thighs off mat.",
        "isSafety": true
      },
      {
        "id": "archers-akarna-dhanurasana.knees.bent",
        "name": "Knees Flexed",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 45,
        "max": 95,
        "target": 70,
        "tolerance": 25,
        "weight": 3,
        "severity": "high",
        "feedback": "Hold ankles firmly with knees hip-width apart.",
        "isSafety": false
      },
      {
        "id": "archers-akarna-dhanurasana.chest.centered",
        "name": "Chest Balanced",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.09,
        "tolerance": 0.07,
        "weight": 2,
        "severity": "medium",
        "feedback": "Lift evenly through both shoulders.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "banana-supta-nitambasana.body.supine_line",
      "banana-supta-nitambasana.shoulders.grounded",
      "banana-supta-nitambasana.hips.grounded"
    ],
    "isPremium": true,
    "orderIndex": 2,
    "aliases": [],
    "rules": [
      {
        "id": "banana-supta-nitambasana.body.supine_line",
        "name": "Supine Alignment",
        "metric": "angle",
        "points": [
          11,
          23,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "target": 175,
        "tolerance": 15,
        "weight": 3,
        "severity": "medium",
        "feedback": "Rest fully flat and symmetrical on the floor.",
        "isSafety": false
      },
      {
        "id": "banana-supta-nitambasana.shoulders.grounded",
        "name": "Shoulders Relaxed & Grounded",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "medium",
        "feedback": "Let shoulders melt into the earth.",
        "isSafety": false
      },
      {
        "id": "banana-supta-nitambasana.hips.grounded",
        "name": "Hips Grounded Evenly",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "low",
        "feedback": "Release pelvis with balanced symmetry.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "big-toe-padangushthasana.knee.straight",
      "big-toe-padangushthasana.hip.alignment",
      "big-toe-padangushthasana.spine.erect",
      "big-toe-padangushthasana.shoulders.level"
    ],
    "isPremium": true,
    "orderIndex": 3,
    "aliases": [],
    "rules": [
      {
        "id": "big-toe-padangushthasana.knee.straight",
        "name": "Legs Straight and Strong",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 2,
        "severity": "medium",
        "feedback": "Engage thighs and straighten knees without hyperextending.",
        "isSafety": false
      },
      {
        "id": "big-toe-padangushthasana.hip.alignment",
        "name": "Hips Over Ankles",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 2,
        "severity": "medium",
        "feedback": "Stack hips over ankles and shoulders over hips.",
        "isSafety": false
      },
      {
        "id": "big-toe-padangushthasana.spine.erect",
        "name": "Vertical Spine",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "medium",
        "feedback": "Stand tall with elongated spine and open collarbones.",
        "isSafety": false
      },
      {
        "id": "big-toe-padangushthasana.shoulders.level",
        "name": "Level Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "medium",
        "feedback": "Relax shoulders evenly away from ears.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "bird-of-paradise-svarga-dvijasana.standing_knee.straight",
      "bird-of-paradise-svarga-dvijasana.lifted_hip.flexion",
      "bird-of-paradise-svarga-dvijasana.spine.balance"
    ],
    "isPremium": true,
    "orderIndex": 4,
    "aliases": [],
    "rules": [
      {
        "id": "bird-of-paradise-svarga-dvijasana.standing_knee.straight",
        "name": "Standing Leg Strong",
        "metric": "angle",
        "points": [
          24,
          26,
          28
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 4,
        "severity": "high",
        "feedback": "Keep standing leg straight and stable.",
        "isSafety": true
      },
      {
        "id": "bird-of-paradise-svarga-dvijasana.lifted_hip.flexion",
        "name": "Lifted Leg Elevated",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 80,
        "max": 140,
        "target": 110,
        "tolerance": 30,
        "weight": 3,
        "severity": "high",
        "feedback": "Maintain high lifted leg position.",
        "isSafety": false
      },
      {
        "id": "bird-of-paradise-svarga-dvijasana.spine.balance",
        "name": "Vertical Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.09,
        "tolerance": 0.07,
        "weight": 2,
        "severity": "medium",
        "feedback": "Keep your torso tall and centered.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      23,
      24,
      25,
      26,
      28
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "boat-navasana.v_sit.angle",
      "boat-navasana.knees.extension",
      "boat-navasana.arms.parallel",
      "boat-navasana.chest.lift"
    ],
    "isPremium": false,
    "orderIndex": 5,
    "aliases": [
      "boat-pose",
      "navasana"
    ],
    "rules": [
      {
        "id": "boat-navasana.v_sit.angle",
        "name": "V-Sit Body Angle",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 45,
        "max": 85,
        "target": 65,
        "tolerance": 20,
        "weight": 4,
        "severity": "high",
        "feedback": "Balance on sit bones with torso and thighs forming a V.",
        "isSafety": true
      },
      {
        "id": "boat-navasana.knees.extension",
        "name": "Leg Extension",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 150,
        "max": 180,
        "target": 170,
        "tolerance": 20,
        "weight": 3,
        "severity": "high",
        "feedback": "Extend legs straight or parallel to the floor.",
        "isSafety": false
      },
      {
        "id": "boat-navasana.arms.parallel",
        "name": "Arms Reaching Forward",
        "metric": "angle",
        "points": [
          13,
          11,
          23
        ],
        "comparison": "between",
        "min": 70,
        "max": 110,
        "target": 90,
        "tolerance": 20,
        "weight": 2,
        "severity": "medium",
        "feedback": "Reach arms forward parallel to the mat.",
        "isSafety": false
      },
      {
        "id": "boat-navasana.chest.lift",
        "name": "Open Chest",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.09,
        "tolerance": 0.07,
        "weight": 2,
        "severity": "medium",
        "feedback": "Keep spine long and chest proud.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      13,
      23,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "bound-angle-baddha-konasana.knees.open",
      "bound-angle-baddha-konasana.feet.together",
      "bound-angle-baddha-konasana.spine.tall"
    ],
    "isPremium": true,
    "orderIndex": 6,
    "aliases": [],
    "rules": [
      {
        "id": "bound-angle-baddha-konasana.knees.open",
        "name": "Knees Open Wide",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 20,
        "max": 70,
        "target": 45,
        "tolerance": 25,
        "weight": 2,
        "severity": "medium",
        "feedback": "Let knees relax open toward the floor.",
        "isSafety": false
      },
      {
        "id": "bound-angle-baddha-konasana.feet.together",
        "name": "Soles of Feet Pressed",
        "metric": "distance",
        "points": [
          27,
          28
        ],
        "comparison": "less_than",
        "target": 0.12,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Bring soles of feet together near pelvis.",
        "isSafety": false
      },
      {
        "id": "bound-angle-baddha-konasana.spine.tall",
        "name": "Tall Seated Spine",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Sit upright with lengthened spine.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      23,
      25,
      27,
      28
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "bow-dhanurasana.bow.arc",
      "bow-dhanurasana.knees.bent",
      "bow-dhanurasana.chest.centered"
    ],
    "isPremium": true,
    "orderIndex": 7,
    "aliases": [],
    "rules": [
      {
        "id": "bow-dhanurasana.bow.arc",
        "name": "Torso & Leg Bow Arc",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 100,
        "max": 150,
        "target": 125,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Kick feet into hands to lift chest and thighs off mat.",
        "isSafety": true
      },
      {
        "id": "bow-dhanurasana.knees.bent",
        "name": "Knees Flexed",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 45,
        "max": 95,
        "target": 70,
        "tolerance": 25,
        "weight": 3,
        "severity": "high",
        "feedback": "Hold ankles firmly with knees hip-width apart.",
        "isSafety": false
      },
      {
        "id": "bow-dhanurasana.chest.centered",
        "name": "Chest Balanced",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.09,
        "tolerance": 0.07,
        "weight": 2,
        "severity": "medium",
        "feedback": "Lift evenly through both shoulders.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "box-chakravakasana.body.supine_line",
      "box-chakravakasana.shoulders.grounded",
      "box-chakravakasana.hips.grounded"
    ],
    "isPremium": true,
    "orderIndex": 8,
    "aliases": [],
    "rules": [
      {
        "id": "box-chakravakasana.body.supine_line",
        "name": "Supine Alignment",
        "metric": "angle",
        "points": [
          11,
          23,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "target": 175,
        "tolerance": 15,
        "weight": 3,
        "severity": "medium",
        "feedback": "Rest fully flat and symmetrical on the floor.",
        "isSafety": false
      },
      {
        "id": "box-chakravakasana.shoulders.grounded",
        "name": "Shoulders Relaxed & Grounded",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "medium",
        "feedback": "Let shoulders melt into the earth.",
        "isSafety": false
      },
      {
        "id": "box-chakravakasana.hips.grounded",
        "name": "Hips Grounded Evenly",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "low",
        "feedback": "Release pelvis with balanced symmetry.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "bridge-setu-bandha-sarvangasana.hips.lift",
      "bridge-setu-bandha-sarvangasana.knees.parallel",
      "bridge-setu-bandha-sarvangasana.pelvis.level"
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
        "id": "bridge-setu-bandha-sarvangasana.hips.lift",
        "name": "Hips Lifted High",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 147,
        "max": 180,
        "target": 165,
        "tolerance": 18,
        "weight": 4,
        "severity": "high",
        "feedback": "Lift hips high into strong straight bridge line.",
        "isSafety": true
      },
      {
        "id": "bridge-setu-bandha-sarvangasana.knees.parallel",
        "name": "Knees at 90°",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 70,
        "max": 110,
        "target": 90,
        "tolerance": 20,
        "weight": 3,
        "severity": "high",
        "feedback": "Keep knees stacked directly above ankles.",
        "isSafety": false
      },
      {
        "id": "bridge-setu-bandha-sarvangasana.pelvis.level",
        "name": "Level Pelvis",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Keep both hip points at equal height.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      23,
      24,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "butterfly.knees.open",
      "butterfly.feet.together",
      "butterfly.spine.tall"
    ],
    "isPremium": true,
    "orderIndex": 10,
    "aliases": [],
    "rules": [
      {
        "id": "butterfly.knees.open",
        "name": "Knees Open Wide",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 20,
        "max": 70,
        "target": 45,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Let knees relax open toward the floor.",
        "isSafety": true
      },
      {
        "id": "butterfly.feet.together",
        "name": "Soles of Feet Pressed",
        "metric": "distance",
        "points": [
          27,
          28
        ],
        "comparison": "less_than",
        "target": 0.12,
        "tolerance": 0.06,
        "weight": 3,
        "severity": "high",
        "feedback": "Bring soles of feet together near pelvis."
      },
      {
        "id": "butterfly.spine.tall",
        "name": "Tall Seated Spine",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Sit upright with lengthened spine.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      23,
      25,
      27,
      28
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "camel-ustrasana.chest.arch",
      "camel-ustrasana.hips.forward",
      "camel-ustrasana.knees.grounded"
    ],
    "isPremium": true,
    "orderIndex": 11,
    "aliases": [],
    "rules": [
      {
        "id": "camel-ustrasana.chest.arch",
        "name": "Chest Heart Open",
        "metric": "angle",
        "points": [
          0,
          11,
          23
        ],
        "comparison": "between",
        "min": 105,
        "max": 155,
        "target": 130,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Lift chest upward toward ceiling in smooth arch.",
        "isSafety": true
      },
      {
        "id": "camel-ustrasana.hips.forward",
        "name": "Hips Over Knees",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 157,
        "max": 180,
        "target": 175,
        "tolerance": 18,
        "weight": 3,
        "severity": "high",
        "feedback": "Push hips forward so thighs stay vertical.",
        "isSafety": false
      },
      {
        "id": "camel-ustrasana.knees.grounded",
        "name": "Knees 90° to Floor",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 70,
        "max": 110,
        "target": 90,
        "tolerance": 20,
        "weight": 2,
        "severity": "medium",
        "feedback": "Keep knees hip-width apart firmly grounded.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      0,
      11,
      23,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "cat-marjariasana.body.supine_line",
      "cat-marjariasana.shoulders.grounded",
      "cat-marjariasana.hips.grounded"
    ],
    "isPremium": true,
    "orderIndex": 12,
    "aliases": [],
    "rules": [
      {
        "id": "cat-marjariasana.body.supine_line",
        "name": "Supine Alignment",
        "metric": "angle",
        "points": [
          11,
          23,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "target": 175,
        "tolerance": 15,
        "weight": 3,
        "severity": "medium",
        "feedback": "Rest fully flat and symmetrical on the floor.",
        "isSafety": false
      },
      {
        "id": "cat-marjariasana.shoulders.grounded",
        "name": "Shoulders Relaxed & Grounded",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "medium",
        "feedback": "Let shoulders melt into the earth.",
        "isSafety": false
      },
      {
        "id": "cat-marjariasana.hips.grounded",
        "name": "Hips Grounded Evenly",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "low",
        "feedback": "Release pelvis with balanced symmetry.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "caterpillar.hip.deep_fold",
      "caterpillar.knee.straight",
      "caterpillar.spine.elongation",
      "caterpillar.pelvis.tilt"
    ],
    "isPremium": true,
    "orderIndex": 13,
    "aliases": [],
    "rules": [
      {
        "id": "caterpillar.hip.deep_fold",
        "name": "Deep Hip Flexion",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 30,
        "max": 80,
        "target": 55,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Fold deeply from the hips rather than rounding the back.",
        "isSafety": true
      },
      {
        "id": "caterpillar.knee.straight",
        "name": "Legs Straight",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "target": 175,
        "tolerance": 15,
        "weight": 3,
        "severity": "high",
        "feedback": "Keep knees straight or with gentle microbend.",
        "isSafety": false
      },
      {
        "id": "caterpillar.spine.elongation",
        "name": "Elongated Spine",
        "metric": "angle",
        "points": [
          0,
          11,
          23
        ],
        "comparison": "between",
        "min": 135,
        "max": 180,
        "target": 160,
        "tolerance": 25,
        "weight": 2,
        "severity": "medium",
        "feedback": "Reach crown of head toward toes with open chest.",
        "isSafety": false
      },
      {
        "id": "caterpillar.pelvis.tilt",
        "name": "Pelvic Anterior Tilt",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "low",
        "feedback": "Keep pelvis square and balanced.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      0,
      11,
      23,
      24,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "chair-utkatasana.knees.bend",
      "chair-utkatasana.torso.incline",
      "chair-utkatasana.arms.reach",
      "chair-utkatasana.knees.level"
    ],
    "isPremium": false,
    "orderIndex": 14,
    "aliases": [
      "chair-pose",
      "utkatasana"
    ],
    "rules": [
      {
        "id": "chair-utkatasana.knees.bend",
        "name": "Knees Deep Bend (100°)",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 80,
        "max": 120,
        "target": 100,
        "tolerance": 20,
        "weight": 2,
        "severity": "medium",
        "feedback": "Sink hips back as if sitting into a deep chair.",
        "isSafety": false
      },
      {
        "id": "chair-utkatasana.torso.incline",
        "name": "Torso Extended Forward",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 95,
        "max": 135,
        "target": 115,
        "tolerance": 20,
        "weight": 2,
        "severity": "medium",
        "feedback": "Keep chest lifted and spine long on diagonal.",
        "isSafety": false
      },
      {
        "id": "chair-utkatasana.arms.reach",
        "name": "Arms Raised Overhead",
        "metric": "angle",
        "points": [
          11,
          13,
          15
        ],
        "comparison": "between",
        "min": 145,
        "max": 180,
        "target": 165,
        "tolerance": 20,
        "weight": 2,
        "severity": "medium",
        "feedback": "Extend arms alongside ears.",
        "isSafety": false
      },
      {
        "id": "chair-utkatasana.knees.level",
        "name": "Knees Symmetrical",
        "metric": "horizontal_alignment",
        "points": [
          25,
          26
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Keep knees tracking parallel without caving.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      13,
      15,
      23,
      25,
      26,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "childs-pose-balasana.body.supine_line",
      "childs-pose-balasana.shoulders.grounded",
      "childs-pose-balasana.hips.grounded"
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
        "id": "childs-pose-balasana.body.supine_line",
        "name": "Supine Alignment",
        "metric": "angle",
        "points": [
          11,
          23,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "target": 175,
        "tolerance": 15,
        "weight": 3,
        "severity": "medium",
        "feedback": "Rest fully flat and symmetrical on the floor.",
        "isSafety": false
      },
      {
        "id": "childs-pose-balasana.shoulders.grounded",
        "name": "Shoulders Relaxed & Grounded",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "medium",
        "feedback": "Let shoulders melt into the earth.",
        "isSafety": false
      },
      {
        "id": "childs-pose-balasana.hips.grounded",
        "name": "Hips Grounded Evenly",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "low",
        "feedback": "Release pelvis with balanced symmetry.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
      "sampleCount": 0,
      "expertReviewed": false
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
      "chin-stand-ganda-bherundasana.body.vertical_line",
      "chin-stand-ganda-bherundasana.core.stability",
      "chin-stand-ganda-bherundasana.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 16,
    "aliases": [],
    "rules": [
      {
        "id": "chin-stand-ganda-bherundasana.body.vertical_line",
        "name": "Inverted Vertical Line",
        "metric": "angle",
        "points": [
          11,
          23,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "target": 175,
        "tolerance": 15,
        "weight": 4,
        "severity": "high",
        "feedback": "Align legs, hips, and shoulders in a single vertical line.",
        "isSafety": true
      },
      {
        "id": "chin-stand-ganda-bherundasana.core.stability",
        "name": "Core Engagement",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Engage core to maintain stable vertical axis.",
        "isSafety": false
      },
      {
        "id": "chin-stand-ganda-bherundasana.hip.level",
        "name": "Level Inverted Hips",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Keep pelvis level without tilting.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      23,
      24,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "cobra-bhujangasana.chest.lift",
      "cobra-bhujangasana.elbows.tuck",
      "cobra-bhujangasana.legs.grounded",
      "cobra-bhujangasana.shoulders.level"
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
        "id": "cobra-bhujangasana.chest.lift",
        "name": "Chest Elevation",
        "metric": "angle",
        "points": [
          0,
          11,
          23
        ],
        "comparison": "between",
        "min": 115,
        "max": 165,
        "target": 140,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Lift chest smoothly using back muscles without forcing.",
        "isSafety": true
      },
      {
        "id": "cobra-bhujangasana.elbows.tuck",
        "name": "Elbows Bent and Tucked",
        "metric": "angle",
        "points": [
          11,
          13,
          15
        ],
        "comparison": "between",
        "min": 95,
        "max": 145,
        "target": 120,
        "tolerance": 25,
        "weight": 3,
        "severity": "high",
        "feedback": "Keep elbows close to your ribs with soft bend.",
        "isSafety": false
      },
      {
        "id": "cobra-bhujangasana.legs.grounded",
        "name": "Legs Extended & Grounded",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 2,
        "severity": "medium",
        "feedback": "Press tops of feet and thighs firmly into mat.",
        "isSafety": false
      },
      {
        "id": "cobra-bhujangasana.shoulders.level",
        "name": "Shoulders Down and Level",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "low",
        "feedback": "Roll shoulders back and away from ears.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      0,
      11,
      12,
      13,
      15,
      23,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
      "sampleCount": 0,
      "expertReviewed": false
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
      "corpse-savasana.body.supine_line",
      "corpse-savasana.shoulders.grounded",
      "corpse-savasana.hips.grounded"
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
        "id": "corpse-savasana.body.supine_line",
        "name": "Supine Alignment",
        "metric": "angle",
        "points": [
          11,
          23,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "target": 175,
        "tolerance": 15,
        "weight": 3,
        "severity": "medium",
        "feedback": "Rest fully flat and symmetrical on the floor.",
        "isSafety": false
      },
      {
        "id": "corpse-savasana.shoulders.grounded",
        "name": "Shoulders Relaxed & Grounded",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "medium",
        "feedback": "Let shoulders melt into the earth.",
        "isSafety": false
      },
      {
        "id": "corpse-savasana.hips.grounded",
        "name": "Hips Grounded Evenly",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "low",
        "feedback": "Release pelvis with balanced symmetry.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "cow-bitilasana.body.supine_line",
      "cow-bitilasana.shoulders.grounded",
      "cow-bitilasana.hips.grounded"
    ],
    "isPremium": true,
    "orderIndex": 19,
    "aliases": [],
    "rules": [
      {
        "id": "cow-bitilasana.body.supine_line",
        "name": "Supine Alignment",
        "metric": "angle",
        "points": [
          11,
          23,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "target": 175,
        "tolerance": 15,
        "weight": 3,
        "severity": "medium",
        "feedback": "Rest fully flat and symmetrical on the floor.",
        "isSafety": false
      },
      {
        "id": "cow-bitilasana.shoulders.grounded",
        "name": "Shoulders Relaxed & Grounded",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "medium",
        "feedback": "Let shoulders melt into the earth.",
        "isSafety": false
      },
      {
        "id": "cow-bitilasana.hips.grounded",
        "name": "Hips Grounded Evenly",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "low",
        "feedback": "Release pelvis with balanced symmetry.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "cow-face-gomukhasana.hip.flexion",
      "cow-face-gomukhasana.knee.fold",
      "cow-face-gomukhasana.spine.erect",
      "cow-face-gomukhasana.shoulder.relaxation"
    ],
    "isPremium": true,
    "orderIndex": 20,
    "aliases": [],
    "rules": [
      {
        "id": "cow-face-gomukhasana.hip.flexion",
        "name": "Seated Hip Grounding",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 65,
        "max": 105,
        "target": 85,
        "tolerance": 20,
        "weight": 4,
        "severity": "high",
        "feedback": "Root both sit bones evenly into the mat.",
        "isSafety": true
      },
      {
        "id": "cow-face-gomukhasana.knee.fold",
        "name": "Knee Fold Comfort",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 25,
        "max": 85,
        "target": 55,
        "tolerance": 30,
        "weight": 3,
        "severity": "medium",
        "feedback": "Fold legs comfortably in steady seated base.",
        "isSafety": false
      },
      {
        "id": "cow-face-gomukhasana.spine.erect",
        "name": "Spine Length",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 3,
        "severity": "high",
        "feedback": "Sit tall with a straight, elongated spine.",
        "isSafety": false
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
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "low",
        "feedback": "Relax shoulders away from your ears.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "crane-bakasana.elbow.shelf",
      "crane-bakasana.knee.tuck",
      "crane-bakasana.feet.lifted",
      "crane-bakasana.shoulders.stable"
    ],
    "isPremium": true,
    "orderIndex": 21,
    "aliases": [],
    "rules": [
      {
        "id": "crane-bakasana.elbow.shelf",
        "name": "Elbow Support Angle",
        "metric": "angle",
        "points": [
          11,
          13,
          15
        ],
        "comparison": "between",
        "min": 70,
        "max": 120,
        "target": 95,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Bend elbows into a strong supportive shelf (90°).",
        "isSafety": true
      },
      {
        "id": "crane-bakasana.knee.tuck",
        "name": "Knees Tucked High",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 35,
        "max": 85,
        "target": 60,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Draw knees high onto the backs of your upper arms.",
        "isSafety": true
      },
      {
        "id": "crane-bakasana.feet.lifted",
        "name": "Feet Lifted Off Ground",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 40,
        "max": 90,
        "target": 65,
        "tolerance": 25,
        "weight": 3,
        "severity": "medium",
        "feedback": "Lift toes and feet off the mat with core strength.",
        "isSafety": false
      },
      {
        "id": "crane-bakasana.shoulders.stable",
        "name": "Shoulder Stability",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Distribute weight evenly across both arms.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      13,
      15,
      23,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "crescent-lunge-ashta-chandrasana.front_knee.angle",
      "crescent-lunge-ashta-chandrasana.back_knee.straight",
      "crescent-lunge-ashta-chandrasana.arms.parallel",
      "crescent-lunge-ashta-chandrasana.torso.vertical"
    ],
    "isPremium": true,
    "orderIndex": 22,
    "aliases": [],
    "rules": [
      {
        "id": "crescent-lunge-ashta-chandrasana.front_knee.angle",
        "name": "Front Knee 90°",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 75,
        "max": 105,
        "target": 90,
        "tolerance": 15,
        "weight": 4,
        "severity": "high",
        "feedback": "Bend your front knee over your ankle at 90°.",
        "isSafety": true
      },
      {
        "id": "crescent-lunge-ashta-chandrasana.back_knee.straight",
        "name": "Back Leg Straight",
        "metric": "angle",
        "points": [
          24,
          26,
          28
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Straighten and ground through your back leg.",
        "isSafety": false
      },
      {
        "id": "crescent-lunge-ashta-chandrasana.arms.parallel",
        "name": "Arms Parallel to Floor",
        "metric": "angle",
        "points": [
          13,
          11,
          12
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "target": 175,
        "tolerance": 15,
        "weight": 3,
        "severity": "medium",
        "feedback": "Extend arms parallel to the ground.",
        "isSafety": false
      },
      {
        "id": "crescent-lunge-ashta-chandrasana.torso.vertical",
        "name": "Torso Centered",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Keep your torso upright without leaning forward.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      13,
      23,
      24,
      25,
      26,
      27,
      28
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "crescent-lunge-on-knee-anjaneyasana.front_knee.angle",
      "crescent-lunge-on-knee-anjaneyasana.back_knee.straight",
      "crescent-lunge-on-knee-anjaneyasana.arms.parallel",
      "crescent-lunge-on-knee-anjaneyasana.torso.vertical"
    ],
    "isPremium": true,
    "orderIndex": 23,
    "aliases": [
      "anjaneyasana",
      "low-lunge"
    ],
    "rules": [
      {
        "id": "crescent-lunge-on-knee-anjaneyasana.front_knee.angle",
        "name": "Front Knee 90°",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 75,
        "max": 105,
        "target": 90,
        "tolerance": 15,
        "weight": 4,
        "severity": "high",
        "feedback": "Bend your front knee over your ankle at 90°.",
        "isSafety": true
      },
      {
        "id": "crescent-lunge-on-knee-anjaneyasana.back_knee.straight",
        "name": "Back Leg Straight",
        "metric": "angle",
        "points": [
          24,
          26,
          28
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Straighten and ground through your back leg.",
        "isSafety": false
      },
      {
        "id": "crescent-lunge-on-knee-anjaneyasana.arms.parallel",
        "name": "Arms Parallel to Floor",
        "metric": "angle",
        "points": [
          13,
          11,
          12
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "target": 175,
        "tolerance": 15,
        "weight": 3,
        "severity": "medium",
        "feedback": "Extend arms parallel to the ground.",
        "isSafety": false
      },
      {
        "id": "crescent-lunge-on-knee-anjaneyasana.torso.vertical",
        "name": "Torso Centered",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Keep your torso upright without leaning forward.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      13,
      23,
      24,
      25,
      26,
      27,
      28
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "crescent-moon-ardha-chandrasana.front_knee.angle",
      "crescent-moon-ardha-chandrasana.back_knee.straight",
      "crescent-moon-ardha-chandrasana.arms.parallel",
      "crescent-moon-ardha-chandrasana.torso.vertical"
    ],
    "isPremium": true,
    "orderIndex": 24,
    "aliases": [],
    "rules": [
      {
        "id": "crescent-moon-ardha-chandrasana.front_knee.angle",
        "name": "Front Knee 90°",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 75,
        "max": 105,
        "target": 90,
        "tolerance": 15,
        "weight": 4,
        "severity": "high",
        "feedback": "Bend your front knee over your ankle at 90°.",
        "isSafety": true
      },
      {
        "id": "crescent-moon-ardha-chandrasana.back_knee.straight",
        "name": "Back Leg Straight",
        "metric": "angle",
        "points": [
          24,
          26,
          28
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Straighten and ground through your back leg.",
        "isSafety": false
      },
      {
        "id": "crescent-moon-ardha-chandrasana.arms.parallel",
        "name": "Arms Parallel to Floor",
        "metric": "angle",
        "points": [
          13,
          11,
          12
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "target": 175,
        "tolerance": 15,
        "weight": 3,
        "severity": "medium",
        "feedback": "Extend arms parallel to the ground.",
        "isSafety": false
      },
      {
        "id": "crescent-moon-ardha-chandrasana.torso.vertical",
        "name": "Torso Centered",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Keep your torso upright without leaning forward.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      13,
      23,
      24,
      25,
      26,
      27,
      28
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "crooked-monkey.hip.flexion",
      "crooked-monkey.knee.fold",
      "crooked-monkey.spine.erect",
      "crooked-monkey.shoulder.relaxation"
    ],
    "isPremium": true,
    "orderIndex": 25,
    "aliases": [],
    "rules": [
      {
        "id": "crooked-monkey.hip.flexion",
        "name": "Seated Hip Grounding",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 65,
        "max": 105,
        "target": 85,
        "tolerance": 20,
        "weight": 4,
        "severity": "high",
        "feedback": "Root both sit bones evenly into the mat.",
        "isSafety": true
      },
      {
        "id": "crooked-monkey.knee.fold",
        "name": "Knee Fold Comfort",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 25,
        "max": 85,
        "target": 55,
        "tolerance": 30,
        "weight": 3,
        "severity": "medium",
        "feedback": "Fold legs comfortably in steady seated base.",
        "isSafety": false
      },
      {
        "id": "crooked-monkey.spine.erect",
        "name": "Spine Length",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 3,
        "severity": "high",
        "feedback": "Sit tall with a straight, elongated spine.",
        "isSafety": false
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
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "low",
        "feedback": "Relax shoulders away from your ears.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "crow-kakasana.elbow.shelf",
      "crow-kakasana.knee.tuck",
      "crow-kakasana.feet.lifted",
      "crow-kakasana.shoulders.stable"
    ],
    "isPremium": true,
    "orderIndex": 26,
    "aliases": [],
    "rules": [
      {
        "id": "crow-kakasana.elbow.shelf",
        "name": "Elbow Support Angle",
        "metric": "angle",
        "points": [
          11,
          13,
          15
        ],
        "comparison": "between",
        "min": 70,
        "max": 120,
        "target": 95,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Bend elbows into a strong supportive shelf (90°).",
        "isSafety": true
      },
      {
        "id": "crow-kakasana.knee.tuck",
        "name": "Knees Tucked High",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 35,
        "max": 85,
        "target": 60,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Draw knees high onto the backs of your upper arms.",
        "isSafety": true
      },
      {
        "id": "crow-kakasana.feet.lifted",
        "name": "Feet Lifted Off Ground",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 40,
        "max": 90,
        "target": 65,
        "tolerance": 25,
        "weight": 3,
        "severity": "medium",
        "feedback": "Lift toes and feet off the mat with core strength.",
        "isSafety": false
      },
      {
        "id": "crow-kakasana.shoulders.stable",
        "name": "Shoulder Stability",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Distribute weight evenly across both arms.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      13,
      15,
      23,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "dancer-natarajasana.standing_knee.straight",
      "dancer-natarajasana.lifted_knee.arch",
      "dancer-natarajasana.torso.counterbalance",
      "dancer-natarajasana.hip.square"
    ],
    "isPremium": true,
    "orderIndex": 27,
    "aliases": [],
    "rules": [
      {
        "id": "dancer-natarajasana.standing_knee.straight",
        "name": "Standing Leg Stable",
        "metric": "angle",
        "points": [
          24,
          26,
          28
        ],
        "comparison": "between",
        "min": 155,
        "max": 180,
        "target": 170,
        "tolerance": 15,
        "weight": 4,
        "severity": "high",
        "feedback": "Root firmly through your straight standing leg.",
        "isSafety": true
      },
      {
        "id": "dancer-natarajasana.lifted_knee.arch",
        "name": "Lifted Leg Arch",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 50,
        "max": 100,
        "target": 75,
        "tolerance": 25,
        "weight": 3,
        "severity": "high",
        "feedback": "Kick lifted foot upward and back into your hand.",
        "isSafety": false
      },
      {
        "id": "dancer-natarajasana.torso.counterbalance",
        "name": "Torso Hinge",
        "metric": "angle",
        "points": [
          11,
          23,
          26
        ],
        "comparison": "between",
        "min": 110,
        "max": 160,
        "target": 135,
        "tolerance": 25,
        "weight": 2,
        "severity": "medium",
        "feedback": "Hinge forward from the hip as you lift the back leg.",
        "isSafety": false
      },
      {
        "id": "dancer-natarajasana.hip.square",
        "name": "Square Hips",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.1,
        "tolerance": 0.08,
        "weight": 2,
        "severity": "low",
        "feedback": "Keep hips facing forward as you lift.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      23,
      24,
      25,
      26,
      27,
      28
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "deaf-mans-karna-pidasana.body.vertical_line",
      "deaf-mans-karna-pidasana.core.stability",
      "deaf-mans-karna-pidasana.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 28,
    "aliases": [],
    "rules": [
      {
        "id": "deaf-mans-karna-pidasana.body.vertical_line",
        "name": "Inverted Vertical Line",
        "metric": "angle",
        "points": [
          11,
          23,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "target": 175,
        "tolerance": 15,
        "weight": 4,
        "severity": "high",
        "feedback": "Align legs, hips, and shoulders in a single vertical line.",
        "isSafety": true
      },
      {
        "id": "deaf-mans-karna-pidasana.core.stability",
        "name": "Core Engagement",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Engage core to maintain stable vertical axis.",
        "isSafety": false
      },
      {
        "id": "deaf-mans-karna-pidasana.hip.level",
        "name": "Level Inverted Hips",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Keep pelvis level without tilting.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      23,
      24,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "dolphin-shishumarasana.hip.inverted_v",
      "dolphin-shishumarasana.arms.extension",
      "dolphin-shishumarasana.legs.straight",
      "dolphin-shishumarasana.spine.line"
    ],
    "isPremium": true,
    "orderIndex": 29,
    "aliases": [],
    "rules": [
      {
        "id": "dolphin-shishumarasana.hip.inverted_v",
        "name": "Inverted V Apex",
        "metric": "angle",
        "points": [
          11,
          23,
          27
        ],
        "comparison": "between",
        "min": 55,
        "max": 95,
        "target": 75,
        "tolerance": 20,
        "weight": 4,
        "severity": "high",
        "feedback": "Press hips high and back to form an inverted V shape.",
        "isSafety": true
      },
      {
        "id": "dolphin-shishumarasana.arms.extension",
        "name": "Arms Fully Extended",
        "metric": "angle",
        "points": [
          15,
          13,
          11
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "target": 175,
        "tolerance": 15,
        "weight": 3,
        "severity": "high",
        "feedback": "Press ground away through straight arms.",
        "isSafety": false
      },
      {
        "id": "dolphin-shishumarasana.legs.straight",
        "name": "Legs Straight",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "target": 175,
        "tolerance": 15,
        "weight": 3,
        "severity": "medium",
        "feedback": "Lengthen hamstrings and reach heels toward floor.",
        "isSafety": false
      },
      {
        "id": "dolphin-shishumarasana.spine.line",
        "name": "Straight Spine Line",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.12,
        "tolerance": 0.08,
        "weight": 2,
        "severity": "low",
        "feedback": "Keep spine in one straight diagonal line.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      13,
      15,
      23,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "downward-dog-adho-mukha-svanasana.hip.inverted_v",
      "downward-dog-adho-mukha-svanasana.arms.extension",
      "downward-dog-adho-mukha-svanasana.legs.straight",
      "downward-dog-adho-mukha-svanasana.spine.line"
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
        "id": "downward-dog-adho-mukha-svanasana.hip.inverted_v",
        "name": "Inverted V Apex",
        "metric": "angle",
        "points": [
          11,
          23,
          27
        ],
        "comparison": "between",
        "min": 55,
        "max": 95,
        "target": 75,
        "tolerance": 20,
        "weight": 4,
        "severity": "high",
        "feedback": "Press hips high and back to form an inverted V shape.",
        "isSafety": true
      },
      {
        "id": "downward-dog-adho-mukha-svanasana.arms.extension",
        "name": "Arms Fully Extended",
        "metric": "angle",
        "points": [
          15,
          13,
          11
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "target": 175,
        "tolerance": 15,
        "weight": 3,
        "severity": "high",
        "feedback": "Press ground away through straight arms.",
        "isSafety": false
      },
      {
        "id": "downward-dog-adho-mukha-svanasana.legs.straight",
        "name": "Legs Straight",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "target": 175,
        "tolerance": 15,
        "weight": 3,
        "severity": "medium",
        "feedback": "Lengthen hamstrings and reach heels toward floor.",
        "isSafety": false
      },
      {
        "id": "downward-dog-adho-mukha-svanasana.spine.line",
        "name": "Straight Spine Line",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.12,
        "tolerance": 0.08,
        "weight": 2,
        "severity": "low",
        "feedback": "Keep spine in one straight diagonal line.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      13,
      15,
      23,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "eagle-garudasana.standing_knee.bend",
      "eagle-garudasana.elbows.crossed",
      "eagle-garudasana.spine.vertical"
    ],
    "isPremium": true,
    "orderIndex": 31,
    "aliases": [],
    "rules": [
      {
        "id": "eagle-garudasana.standing_knee.bend",
        "name": "Supporting Knee Bend",
        "metric": "angle",
        "points": [
          24,
          26,
          28
        ],
        "comparison": "between",
        "min": 100,
        "max": 140,
        "target": 120,
        "tolerance": 20,
        "weight": 4,
        "severity": "high",
        "feedback": "Sink hips low with bent standing knee.",
        "isSafety": true
      },
      {
        "id": "eagle-garudasana.elbows.crossed",
        "name": "Elbows Bound",
        "metric": "angle",
        "points": [
          11,
          13,
          15
        ],
        "comparison": "between",
        "min": 65,
        "max": 115,
        "target": 90,
        "tolerance": 25,
        "weight": 3,
        "severity": "medium",
        "feedback": "Cross and wrap arms with elbows at shoulder height.",
        "isSafety": false
      },
      {
        "id": "eagle-garudasana.spine.vertical",
        "name": "Upright Torso",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Keep spine vertical and shoulders stacked over hips.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      13,
      15,
      23,
      24,
      26,
      28
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "easy-sukhasana.hip.flexion",
      "easy-sukhasana.knee.fold",
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
        "id": "easy-sukhasana.hip.flexion",
        "name": "Seated Hip Grounding",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 65,
        "max": 105,
        "target": 85,
        "tolerance": 20,
        "weight": 4,
        "severity": "high",
        "feedback": "Root both sit bones evenly into the mat.",
        "isSafety": true
      },
      {
        "id": "easy-sukhasana.knee.fold",
        "name": "Knee Fold Comfort",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 25,
        "max": 85,
        "target": 55,
        "tolerance": 30,
        "weight": 3,
        "severity": "medium",
        "feedback": "Fold legs comfortably in steady seated base.",
        "isSafety": false
      },
      {
        "id": "easy-sukhasana.spine.erect",
        "name": "Spine Length",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 3,
        "severity": "high",
        "feedback": "Sit tall with a straight, elongated spine.",
        "isSafety": false
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
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "low",
        "feedback": "Relax shoulders away from your ears.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "eight-angle-ashtavakrasana.elbow.shelf",
      "eight-angle-ashtavakrasana.knee.tuck",
      "eight-angle-ashtavakrasana.feet.lifted",
      "eight-angle-ashtavakrasana.shoulders.stable"
    ],
    "isPremium": true,
    "orderIndex": 33,
    "aliases": [],
    "rules": [
      {
        "id": "eight-angle-ashtavakrasana.elbow.shelf",
        "name": "Elbow Support Angle",
        "metric": "angle",
        "points": [
          11,
          13,
          15
        ],
        "comparison": "between",
        "min": 70,
        "max": 120,
        "target": 95,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Bend elbows into a strong supportive shelf (90°).",
        "isSafety": true
      },
      {
        "id": "eight-angle-ashtavakrasana.knee.tuck",
        "name": "Knees Tucked High",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 35,
        "max": 85,
        "target": 60,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Draw knees high onto the backs of your upper arms.",
        "isSafety": true
      },
      {
        "id": "eight-angle-ashtavakrasana.feet.lifted",
        "name": "Feet Lifted Off Ground",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 40,
        "max": 90,
        "target": 65,
        "tolerance": 25,
        "weight": 3,
        "severity": "medium",
        "feedback": "Lift toes and feet off the mat with core strength.",
        "isSafety": false
      },
      {
        "id": "eight-angle-ashtavakrasana.shoulders.stable",
        "name": "Shoulder Stability",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Distribute weight evenly across both arms.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      13,
      15,
      23,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "eight-point-ashtangasana.plank.line",
      "eight-point-ashtangasana.arms.stacked",
      "eight-point-ashtangasana.knees.straight",
      "eight-point-ashtangasana.hips.level"
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
        "id": "eight-point-ashtangasana.plank.line",
        "name": "Straight Plank Line",
        "metric": "angle",
        "points": [
          11,
          23,
          27
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 4,
        "severity": "high",
        "feedback": "Keep body in one straight line without sagging hips.",
        "isSafety": true
      },
      {
        "id": "eight-point-ashtangasana.arms.stacked",
        "name": "Arms Perpendicular",
        "metric": "angle",
        "points": [
          23,
          11,
          13
        ],
        "comparison": "between",
        "min": 75,
        "max": 105,
        "target": 90,
        "tolerance": 15,
        "weight": 3,
        "severity": "high",
        "feedback": "Stack shoulders directly over wrists.",
        "isSafety": false
      },
      {
        "id": "eight-point-ashtangasana.knees.straight",
        "name": "Legs Extended",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 2,
        "severity": "medium",
        "feedback": "Engage quads and press heels back.",
        "isSafety": false
      },
      {
        "id": "eight-point-ashtangasana.hips.level",
        "name": "Level Hips",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Prevent hips from twisting or dropping.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      13,
      23,
      24,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "elbow-balance-shayanasana.bow.arc",
      "elbow-balance-shayanasana.knees.bent",
      "elbow-balance-shayanasana.chest.centered"
    ],
    "isPremium": true,
    "orderIndex": 35,
    "aliases": [],
    "rules": [
      {
        "id": "elbow-balance-shayanasana.bow.arc",
        "name": "Torso & Leg Bow Arc",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 100,
        "max": 150,
        "target": 125,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Kick feet into hands to lift chest and thighs off mat.",
        "isSafety": true
      },
      {
        "id": "elbow-balance-shayanasana.knees.bent",
        "name": "Knees Flexed",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 45,
        "max": 95,
        "target": 70,
        "tolerance": 25,
        "weight": 3,
        "severity": "high",
        "feedback": "Hold ankles firmly with knees hip-width apart.",
        "isSafety": false
      },
      {
        "id": "elbow-balance-shayanasana.chest.centered",
        "name": "Chest Balanced",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.09,
        "tolerance": 0.07,
        "weight": 2,
        "severity": "medium",
        "feedback": "Lift evenly through both shoulders.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "elephant-trunk-eka-hasta-bhujasana.standing_knee.straight",
      "elephant-trunk-eka-hasta-bhujasana.lifted_hip.flexion",
      "elephant-trunk-eka-hasta-bhujasana.spine.balance"
    ],
    "isPremium": true,
    "orderIndex": 36,
    "aliases": [],
    "rules": [
      {
        "id": "elephant-trunk-eka-hasta-bhujasana.standing_knee.straight",
        "name": "Standing Leg Strong",
        "metric": "angle",
        "points": [
          24,
          26,
          28
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 4,
        "severity": "high",
        "feedback": "Keep standing leg straight and stable.",
        "isSafety": true
      },
      {
        "id": "elephant-trunk-eka-hasta-bhujasana.lifted_hip.flexion",
        "name": "Lifted Leg Elevated",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 80,
        "max": 140,
        "target": 110,
        "tolerance": 30,
        "weight": 3,
        "severity": "high",
        "feedback": "Maintain high lifted leg position.",
        "isSafety": false
      },
      {
        "id": "elephant-trunk-eka-hasta-bhujasana.spine.balance",
        "name": "Vertical Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.09,
        "tolerance": 0.07,
        "weight": 2,
        "severity": "medium",
        "feedback": "Keep your torso tall and centered.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      23,
      24,
      25,
      26,
      28
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "embryo-in-womb-garbha-pindasana.knee.straight",
      "embryo-in-womb-garbha-pindasana.hip.alignment",
      "embryo-in-womb-garbha-pindasana.spine.erect",
      "embryo-in-womb-garbha-pindasana.shoulders.level"
    ],
    "isPremium": true,
    "orderIndex": 37,
    "aliases": [],
    "rules": [
      {
        "id": "embryo-in-womb-garbha-pindasana.knee.straight",
        "name": "Legs Straight and Strong",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 4,
        "severity": "high",
        "feedback": "Engage thighs and straighten knees without hyperextending.",
        "isSafety": true
      },
      {
        "id": "embryo-in-womb-garbha-pindasana.hip.alignment",
        "name": "Hips Over Ankles",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Stack hips over ankles and shoulders over hips.",
        "isSafety": false
      },
      {
        "id": "embryo-in-womb-garbha-pindasana.spine.erect",
        "name": "Vertical Spine",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 3,
        "severity": "medium",
        "feedback": "Stand tall with elongated spine and open collarbones.",
        "isSafety": false
      },
      {
        "id": "embryo-in-womb-garbha-pindasana.shoulders.level",
        "name": "Level Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "low",
        "feedback": "Relax shoulders evenly away from ears.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "embryo-pindasana.knee.straight",
      "embryo-pindasana.hip.alignment",
      "embryo-pindasana.spine.erect",
      "embryo-pindasana.shoulders.level"
    ],
    "isPremium": true,
    "orderIndex": 38,
    "aliases": [],
    "rules": [
      {
        "id": "embryo-pindasana.knee.straight",
        "name": "Legs Straight and Strong",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 4,
        "severity": "high",
        "feedback": "Engage thighs and straighten knees without hyperextending.",
        "isSafety": true
      },
      {
        "id": "embryo-pindasana.hip.alignment",
        "name": "Hips Over Ankles",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Stack hips over ankles and shoulders over hips.",
        "isSafety": false
      },
      {
        "id": "embryo-pindasana.spine.erect",
        "name": "Vertical Spine",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 3,
        "severity": "medium",
        "feedback": "Stand tall with elongated spine and open collarbones.",
        "isSafety": false
      },
      {
        "id": "embryo-pindasana.shoulders.level",
        "name": "Level Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "low",
        "feedback": "Relax shoulders evenly away from ears.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "extended-puppy-uttana-shishosana.body.supine_line",
      "extended-puppy-uttana-shishosana.shoulders.grounded",
      "extended-puppy-uttana-shishosana.hips.grounded"
    ],
    "isPremium": true,
    "orderIndex": 39,
    "aliases": [],
    "rules": [
      {
        "id": "extended-puppy-uttana-shishosana.body.supine_line",
        "name": "Supine Alignment",
        "metric": "angle",
        "points": [
          11,
          23,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "target": 175,
        "tolerance": 15,
        "weight": 3,
        "severity": "medium",
        "feedback": "Rest fully flat and symmetrical on the floor.",
        "isSafety": false
      },
      {
        "id": "extended-puppy-uttana-shishosana.shoulders.grounded",
        "name": "Shoulders Relaxed & Grounded",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "medium",
        "feedback": "Let shoulders melt into the earth.",
        "isSafety": false
      },
      {
        "id": "extended-puppy-uttana-shishosana.hips.grounded",
        "name": "Hips Grounded Evenly",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "low",
        "feedback": "Release pelvis with balanced symmetry.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "extended-side-angle-utthita-parshvakonasana.front_knee.bend",
      "extended-side-angle-utthita-parshvakonasana.back_knee.straight",
      "extended-side-angle-utthita-parshvakonasana.side_body.diagonal"
    ],
    "isPremium": true,
    "orderIndex": 40,
    "aliases": [
      "extended-side-angle",
      "utthita-parshvakonasana"
    ],
    "rules": [
      {
        "id": "extended-side-angle-utthita-parshvakonasana.front_knee.bend",
        "name": "Front Knee 90°",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 75,
        "max": 105,
        "target": 90,
        "tolerance": 15,
        "weight": 4,
        "severity": "high",
        "feedback": "Bend front knee at 90° over ankle.",
        "isSafety": true
      },
      {
        "id": "extended-side-angle-utthita-parshvakonasana.back_knee.straight",
        "name": "Back Leg Straight",
        "metric": "angle",
        "points": [
          24,
          26,
          28
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Keep back leg straight with outer foot grounded.",
        "isSafety": false
      },
      {
        "id": "extended-side-angle-utthita-parshvakonasana.side_body.diagonal",
        "name": "Long Diagonal Line",
        "metric": "angle",
        "points": [
          15,
          11,
          28
        ],
        "comparison": "between",
        "min": 150,
        "max": 180,
        "target": 170,
        "tolerance": 20,
        "weight": 3,
        "severity": "medium",
        "feedback": "Create a straight diagonal line from hand to back foot.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      15,
      23,
      24,
      25,
      26,
      27,
      28
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "extended-standing-hand-to-big-toe-utthita-hasta-padangushthasana-b.knee.straight",
      "extended-standing-hand-to-big-toe-utthita-hasta-padangushthasana-b.hip.alignment",
      "extended-standing-hand-to-big-toe-utthita-hasta-padangushthasana-b.spine.erect",
      "extended-standing-hand-to-big-toe-utthita-hasta-padangushthasana-b.shoulders.level"
    ],
    "isPremium": true,
    "orderIndex": 41,
    "aliases": [],
    "rules": [
      {
        "id": "extended-standing-hand-to-big-toe-utthita-hasta-padangushthasana-b.knee.straight",
        "name": "Legs Straight and Strong",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 4,
        "severity": "high",
        "feedback": "Engage thighs and straighten knees without hyperextending.",
        "isSafety": true
      },
      {
        "id": "extended-standing-hand-to-big-toe-utthita-hasta-padangushthasana-b.hip.alignment",
        "name": "Hips Over Ankles",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Stack hips over ankles and shoulders over hips.",
        "isSafety": false
      },
      {
        "id": "extended-standing-hand-to-big-toe-utthita-hasta-padangushthasana-b.spine.erect",
        "name": "Vertical Spine",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 3,
        "severity": "medium",
        "feedback": "Stand tall with elongated spine and open collarbones.",
        "isSafety": false
      },
      {
        "id": "extended-standing-hand-to-big-toe-utthita-hasta-padangushthasana-b.shoulders.level",
        "name": "Level Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "low",
        "feedback": "Relax shoulders evenly away from ears.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "extended-supine-hand-to-big-toe-supta-padangushthasana-b.body.supine_line",
      "extended-supine-hand-to-big-toe-supta-padangushthasana-b.shoulders.grounded",
      "extended-supine-hand-to-big-toe-supta-padangushthasana-b.hips.grounded"
    ],
    "isPremium": true,
    "orderIndex": 42,
    "aliases": [],
    "rules": [
      {
        "id": "extended-supine-hand-to-big-toe-supta-padangushthasana-b.body.supine_line",
        "name": "Supine Alignment",
        "metric": "angle",
        "points": [
          11,
          23,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "target": 175,
        "tolerance": 15,
        "weight": 3,
        "severity": "medium",
        "feedback": "Rest fully flat and symmetrical on the floor.",
        "isSafety": false
      },
      {
        "id": "extended-supine-hand-to-big-toe-supta-padangushthasana-b.shoulders.grounded",
        "name": "Shoulders Relaxed & Grounded",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "medium",
        "feedback": "Let shoulders melt into the earth.",
        "isSafety": false
      },
      {
        "id": "extended-supine-hand-to-big-toe-supta-padangushthasana-b.hips.grounded",
        "name": "Hips Grounded Evenly",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "low",
        "feedback": "Release pelvis with balanced symmetry.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "fire-log-agnistambhasana.hip.flexion",
      "fire-log-agnistambhasana.knee.fold",
      "fire-log-agnistambhasana.spine.erect",
      "fire-log-agnistambhasana.shoulder.relaxation"
    ],
    "isPremium": true,
    "orderIndex": 43,
    "aliases": [],
    "rules": [
      {
        "id": "fire-log-agnistambhasana.hip.flexion",
        "name": "Seated Hip Grounding",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 65,
        "max": 105,
        "target": 85,
        "tolerance": 20,
        "weight": 4,
        "severity": "high",
        "feedback": "Root both sit bones evenly into the mat.",
        "isSafety": true
      },
      {
        "id": "fire-log-agnistambhasana.knee.fold",
        "name": "Knee Fold Comfort",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 25,
        "max": 85,
        "target": 55,
        "tolerance": 30,
        "weight": 3,
        "severity": "medium",
        "feedback": "Fold legs comfortably in steady seated base.",
        "isSafety": false
      },
      {
        "id": "fire-log-agnistambhasana.spine.erect",
        "name": "Spine Length",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 3,
        "severity": "high",
        "feedback": "Sit tall with a straight, elongated spine.",
        "isSafety": false
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
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "low",
        "feedback": "Relax shoulders away from your ears.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "firefly-i-tittibhasana-a.elbow.shelf",
      "firefly-i-tittibhasana-a.knee.tuck",
      "firefly-i-tittibhasana-a.feet.lifted",
      "firefly-i-tittibhasana-a.shoulders.stable"
    ],
    "isPremium": true,
    "orderIndex": 44,
    "aliases": [],
    "rules": [
      {
        "id": "firefly-i-tittibhasana-a.elbow.shelf",
        "name": "Elbow Support Angle",
        "metric": "angle",
        "points": [
          11,
          13,
          15
        ],
        "comparison": "between",
        "min": 70,
        "max": 120,
        "target": 95,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Bend elbows into a strong supportive shelf (90°).",
        "isSafety": true
      },
      {
        "id": "firefly-i-tittibhasana-a.knee.tuck",
        "name": "Knees Tucked High",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 35,
        "max": 85,
        "target": 60,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Draw knees high onto the backs of your upper arms.",
        "isSafety": true
      },
      {
        "id": "firefly-i-tittibhasana-a.feet.lifted",
        "name": "Feet Lifted Off Ground",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 40,
        "max": 90,
        "target": 65,
        "tolerance": 25,
        "weight": 3,
        "severity": "medium",
        "feedback": "Lift toes and feet off the mat with core strength.",
        "isSafety": false
      },
      {
        "id": "firefly-i-tittibhasana-a.shoulders.stable",
        "name": "Shoulder Stability",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Distribute weight evenly across both arms.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      13,
      15,
      23,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "firefly-ii-tittibhasana-b.elbow.shelf",
      "firefly-ii-tittibhasana-b.knee.tuck",
      "firefly-ii-tittibhasana-b.feet.lifted",
      "firefly-ii-tittibhasana-b.shoulders.stable"
    ],
    "isPremium": true,
    "orderIndex": 45,
    "aliases": [],
    "rules": [
      {
        "id": "firefly-ii-tittibhasana-b.elbow.shelf",
        "name": "Elbow Support Angle",
        "metric": "angle",
        "points": [
          11,
          13,
          15
        ],
        "comparison": "between",
        "min": 70,
        "max": 120,
        "target": 95,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Bend elbows into a strong supportive shelf (90°).",
        "isSafety": true
      },
      {
        "id": "firefly-ii-tittibhasana-b.knee.tuck",
        "name": "Knees Tucked High",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 35,
        "max": 85,
        "target": 60,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Draw knees high onto the backs of your upper arms.",
        "isSafety": true
      },
      {
        "id": "firefly-ii-tittibhasana-b.feet.lifted",
        "name": "Feet Lifted Off Ground",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 40,
        "max": 90,
        "target": 65,
        "tolerance": 25,
        "weight": 3,
        "severity": "medium",
        "feedback": "Lift toes and feet off the mat with core strength.",
        "isSafety": false
      },
      {
        "id": "firefly-ii-tittibhasana-b.shoulders.stable",
        "name": "Shoulder Stability",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Distribute weight evenly across both arms.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      13,
      15,
      23,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "firefly-iii-tittibhasana-c.elbow.shelf",
      "firefly-iii-tittibhasana-c.knee.tuck",
      "firefly-iii-tittibhasana-c.feet.lifted",
      "firefly-iii-tittibhasana-c.shoulders.stable"
    ],
    "isPremium": true,
    "orderIndex": 46,
    "aliases": [],
    "rules": [
      {
        "id": "firefly-iii-tittibhasana-c.elbow.shelf",
        "name": "Elbow Support Angle",
        "metric": "angle",
        "points": [
          11,
          13,
          15
        ],
        "comparison": "between",
        "min": 70,
        "max": 120,
        "target": 95,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Bend elbows into a strong supportive shelf (90°).",
        "isSafety": true
      },
      {
        "id": "firefly-iii-tittibhasana-c.knee.tuck",
        "name": "Knees Tucked High",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 35,
        "max": 85,
        "target": 60,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Draw knees high onto the backs of your upper arms.",
        "isSafety": true
      },
      {
        "id": "firefly-iii-tittibhasana-c.feet.lifted",
        "name": "Feet Lifted Off Ground",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 40,
        "max": 90,
        "target": 65,
        "tolerance": 25,
        "weight": 3,
        "severity": "medium",
        "feedback": "Lift toes and feet off the mat with core strength.",
        "isSafety": false
      },
      {
        "id": "firefly-iii-tittibhasana-c.shoulders.stable",
        "name": "Shoulder Stability",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Distribute weight evenly across both arms.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      13,
      15,
      23,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "fish-matsyasana.spine.backbend_arch",
      "fish-matsyasana.chest.opening",
      "fish-matsyasana.shoulder.symmetry"
    ],
    "isPremium": true,
    "orderIndex": 47,
    "aliases": [],
    "rules": [
      {
        "id": "fish-matsyasana.spine.backbend_arch",
        "name": "Spine Arch Extension",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 120,
        "max": 170,
        "target": 145,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Arch smoothly through the entire spine.",
        "isSafety": true
      },
      {
        "id": "fish-matsyasana.chest.opening",
        "name": "Chest Expansion",
        "metric": "angle",
        "points": [
          0,
          11,
          23
        ],
        "comparison": "between",
        "min": 110,
        "max": 160,
        "target": 135,
        "tolerance": 25,
        "weight": 3,
        "severity": "high",
        "feedback": "Expand chest and broaden collarbones.",
        "isSafety": false
      },
      {
        "id": "fish-matsyasana.shoulder.symmetry",
        "name": "Symmetrical Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Keep shoulders even and relaxed.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      0,
      11,
      12,
      23,
      25
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "floating-stick-brahmacharyasana.knee.straight",
      "floating-stick-brahmacharyasana.hip.alignment",
      "floating-stick-brahmacharyasana.spine.erect",
      "floating-stick-brahmacharyasana.shoulders.level"
    ],
    "isPremium": true,
    "orderIndex": 48,
    "aliases": [],
    "rules": [
      {
        "id": "floating-stick-brahmacharyasana.knee.straight",
        "name": "Legs Straight and Strong",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 4,
        "severity": "high",
        "feedback": "Engage thighs and straighten knees without hyperextending.",
        "isSafety": true
      },
      {
        "id": "floating-stick-brahmacharyasana.hip.alignment",
        "name": "Hips Over Ankles",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Stack hips over ankles and shoulders over hips.",
        "isSafety": false
      },
      {
        "id": "floating-stick-brahmacharyasana.spine.erect",
        "name": "Vertical Spine",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 3,
        "severity": "medium",
        "feedback": "Stand tall with elongated spine and open collarbones.",
        "isSafety": false
      },
      {
        "id": "floating-stick-brahmacharyasana.shoulders.level",
        "name": "Level Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "low",
        "feedback": "Relax shoulders evenly away from ears.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "flying-lizard.elbow.shelf",
      "flying-lizard.knee.tuck",
      "flying-lizard.feet.lifted",
      "flying-lizard.shoulders.stable"
    ],
    "isPremium": true,
    "orderIndex": 49,
    "aliases": [],
    "rules": [
      {
        "id": "flying-lizard.elbow.shelf",
        "name": "Elbow Support Angle",
        "metric": "angle",
        "points": [
          11,
          13,
          15
        ],
        "comparison": "between",
        "min": 70,
        "max": 120,
        "target": 95,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Bend elbows into a strong supportive shelf (90°).",
        "isSafety": true
      },
      {
        "id": "flying-lizard.knee.tuck",
        "name": "Knees Tucked High",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 35,
        "max": 85,
        "target": 60,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Draw knees high onto the backs of your upper arms.",
        "isSafety": true
      },
      {
        "id": "flying-lizard.feet.lifted",
        "name": "Feet Lifted Off Ground",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 40,
        "max": 90,
        "target": 65,
        "tolerance": 25,
        "weight": 3,
        "severity": "medium",
        "feedback": "Lift toes and feet off the mat with core strength.",
        "isSafety": false
      },
      {
        "id": "flying-lizard.shoulders.stable",
        "name": "Shoulder Stability",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Distribute weight evenly across both arms.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      13,
      15,
      23,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "flying-man-eka-pada-koundinyasana.elbow.shelf",
      "flying-man-eka-pada-koundinyasana.knee.tuck",
      "flying-man-eka-pada-koundinyasana.feet.lifted",
      "flying-man-eka-pada-koundinyasana.shoulders.stable"
    ],
    "isPremium": true,
    "orderIndex": 50,
    "aliases": [],
    "rules": [
      {
        "id": "flying-man-eka-pada-koundinyasana.elbow.shelf",
        "name": "Elbow Support Angle",
        "metric": "angle",
        "points": [
          11,
          13,
          15
        ],
        "comparison": "between",
        "min": 70,
        "max": 120,
        "target": 95,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Bend elbows into a strong supportive shelf (90°).",
        "isSafety": true
      },
      {
        "id": "flying-man-eka-pada-koundinyasana.knee.tuck",
        "name": "Knees Tucked High",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 35,
        "max": 85,
        "target": 60,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Draw knees high onto the backs of your upper arms.",
        "isSafety": true
      },
      {
        "id": "flying-man-eka-pada-koundinyasana.feet.lifted",
        "name": "Feet Lifted Off Ground",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 40,
        "max": 90,
        "target": 65,
        "tolerance": 25,
        "weight": 3,
        "severity": "medium",
        "feedback": "Lift toes and feet off the mat with core strength.",
        "isSafety": false
      },
      {
        "id": "flying-man-eka-pada-koundinyasana.shoulders.stable",
        "name": "Shoulder Stability",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Distribute weight evenly across both arms.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      13,
      15,
      23,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "flying-pigeon-eka-pada-galavasana.elbow.shelf",
      "flying-pigeon-eka-pada-galavasana.knee.tuck",
      "flying-pigeon-eka-pada-galavasana.feet.lifted",
      "flying-pigeon-eka-pada-galavasana.shoulders.stable"
    ],
    "isPremium": true,
    "orderIndex": 51,
    "aliases": [],
    "rules": [
      {
        "id": "flying-pigeon-eka-pada-galavasana.elbow.shelf",
        "name": "Elbow Support Angle",
        "metric": "angle",
        "points": [
          11,
          13,
          15
        ],
        "comparison": "between",
        "min": 70,
        "max": 120,
        "target": 95,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Bend elbows into a strong supportive shelf (90°).",
        "isSafety": true
      },
      {
        "id": "flying-pigeon-eka-pada-galavasana.knee.tuck",
        "name": "Knees Tucked High",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 35,
        "max": 85,
        "target": 60,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Draw knees high onto the backs of your upper arms.",
        "isSafety": true
      },
      {
        "id": "flying-pigeon-eka-pada-galavasana.feet.lifted",
        "name": "Feet Lifted Off Ground",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 40,
        "max": 90,
        "target": 65,
        "tolerance": 25,
        "weight": 3,
        "severity": "medium",
        "feedback": "Lift toes and feet off the mat with core strength.",
        "isSafety": false
      },
      {
        "id": "flying-pigeon-eka-pada-galavasana.shoulders.stable",
        "name": "Shoulder Stability",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Distribute weight evenly across both arms.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      13,
      15,
      23,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "forearm-balance-pincha-mayurasana.body.vertical_line",
      "forearm-balance-pincha-mayurasana.core.stability",
      "forearm-balance-pincha-mayurasana.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 52,
    "aliases": [],
    "rules": [
      {
        "id": "forearm-balance-pincha-mayurasana.body.vertical_line",
        "name": "Inverted Vertical Line",
        "metric": "angle",
        "points": [
          11,
          23,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "target": 175,
        "tolerance": 15,
        "weight": 4,
        "severity": "high",
        "feedback": "Align legs, hips, and shoulders in a single vertical line.",
        "isSafety": true
      },
      {
        "id": "forearm-balance-pincha-mayurasana.core.stability",
        "name": "Core Engagement",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Engage core to maintain stable vertical axis.",
        "isSafety": false
      },
      {
        "id": "forearm-balance-pincha-mayurasana.hip.level",
        "name": "Level Inverted Hips",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Keep pelvis level without tilting.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      23,
      24,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "frog-bhekasana.spine.backbend_arch",
      "frog-bhekasana.chest.opening",
      "frog-bhekasana.shoulder.symmetry"
    ],
    "isPremium": true,
    "orderIndex": 53,
    "aliases": [],
    "rules": [
      {
        "id": "frog-bhekasana.spine.backbend_arch",
        "name": "Spine Arch Extension",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 120,
        "max": 170,
        "target": 145,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Arch smoothly through the entire spine.",
        "isSafety": true
      },
      {
        "id": "frog-bhekasana.chest.opening",
        "name": "Chest Expansion",
        "metric": "angle",
        "points": [
          0,
          11,
          23
        ],
        "comparison": "between",
        "min": 110,
        "max": 160,
        "target": 135,
        "tolerance": 25,
        "weight": 3,
        "severity": "high",
        "feedback": "Expand chest and broaden collarbones.",
        "isSafety": false
      },
      {
        "id": "frog-bhekasana.shoulder.symmetry",
        "name": "Symmetrical Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Keep shoulders even and relaxed.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      0,
      11,
      12,
      23,
      25
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "front-splits-hanumanasana.hip.flexion",
      "front-splits-hanumanasana.knee.fold",
      "front-splits-hanumanasana.spine.erect",
      "front-splits-hanumanasana.shoulder.relaxation"
    ],
    "isPremium": true,
    "orderIndex": 54,
    "aliases": [],
    "rules": [
      {
        "id": "front-splits-hanumanasana.hip.flexion",
        "name": "Seated Hip Grounding",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 65,
        "max": 105,
        "target": 85,
        "tolerance": 20,
        "weight": 4,
        "severity": "high",
        "feedback": "Root both sit bones evenly into the mat.",
        "isSafety": true
      },
      {
        "id": "front-splits-hanumanasana.knee.fold",
        "name": "Knee Fold Comfort",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 25,
        "max": 85,
        "target": 55,
        "tolerance": 30,
        "weight": 3,
        "severity": "medium",
        "feedback": "Fold legs comfortably in steady seated base.",
        "isSafety": false
      },
      {
        "id": "front-splits-hanumanasana.spine.erect",
        "name": "Spine Length",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 3,
        "severity": "high",
        "feedback": "Sit tall with a straight, elongated spine.",
        "isSafety": false
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
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "low",
        "feedback": "Relax shoulders away from your ears.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "garland-malasana.knee.straight",
      "garland-malasana.hip.alignment",
      "garland-malasana.spine.erect",
      "garland-malasana.shoulders.level"
    ],
    "isPremium": true,
    "orderIndex": 55,
    "aliases": [],
    "rules": [
      {
        "id": "garland-malasana.knee.straight",
        "name": "Legs Straight and Strong",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 4,
        "severity": "high",
        "feedback": "Engage thighs and straighten knees without hyperextending.",
        "isSafety": true
      },
      {
        "id": "garland-malasana.hip.alignment",
        "name": "Hips Over Ankles",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Stack hips over ankles and shoulders over hips.",
        "isSafety": false
      },
      {
        "id": "garland-malasana.spine.erect",
        "name": "Vertical Spine",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 3,
        "severity": "medium",
        "feedback": "Stand tall with elongated spine and open collarbones.",
        "isSafety": false
      },
      {
        "id": "garland-malasana.shoulders.level",
        "name": "Level Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "low",
        "feedback": "Relax shoulders evenly away from ears.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "gate-parighasana.hips.table_angle",
      "gate-parighasana.shoulders.table_angle",
      "gate-parighasana.spine.neutral"
    ],
    "isPremium": true,
    "orderIndex": 56,
    "aliases": [],
    "rules": [
      {
        "id": "gate-parighasana.hips.table_angle",
        "name": "Hips Over Knees (90°)",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 72,
        "max": 108,
        "target": 90,
        "tolerance": 18,
        "weight": 4,
        "severity": "high",
        "feedback": "Stack hips directly over knees.",
        "isSafety": true
      },
      {
        "id": "gate-parighasana.shoulders.table_angle",
        "name": "Shoulders Over Wrists (90°)",
        "metric": "angle",
        "points": [
          23,
          11,
          15
        ],
        "comparison": "between",
        "min": 72,
        "max": 108,
        "target": 90,
        "tolerance": 18,
        "weight": 3,
        "severity": "high",
        "feedback": "Stack shoulders directly over hands/wrists.",
        "isSafety": false
      },
      {
        "id": "gate-parighasana.spine.neutral",
        "name": "Neutral Spine",
        "metric": "horizontal_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.09,
        "tolerance": 0.07,
        "weight": 2,
        "severity": "medium",
        "feedback": "Keep back flat and neck aligned with spine.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      15,
      23,
      25
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "goddess-utkata-konasana.knee.straight",
      "goddess-utkata-konasana.hip.alignment",
      "goddess-utkata-konasana.spine.erect",
      "goddess-utkata-konasana.shoulders.level"
    ],
    "isPremium": true,
    "orderIndex": 57,
    "aliases": [],
    "rules": [
      {
        "id": "goddess-utkata-konasana.knee.straight",
        "name": "Legs Straight and Strong",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 4,
        "severity": "high",
        "feedback": "Engage thighs and straighten knees without hyperextending.",
        "isSafety": true
      },
      {
        "id": "goddess-utkata-konasana.hip.alignment",
        "name": "Hips Over Ankles",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Stack hips over ankles and shoulders over hips.",
        "isSafety": false
      },
      {
        "id": "goddess-utkata-konasana.spine.erect",
        "name": "Vertical Spine",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 3,
        "severity": "medium",
        "feedback": "Stand tall with elongated spine and open collarbones.",
        "isSafety": false
      },
      {
        "id": "goddess-utkata-konasana.shoulders.level",
        "name": "Level Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "low",
        "feedback": "Relax shoulders evenly away from ears.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "gorilla-pada-hastasana.knee.straight",
      "gorilla-pada-hastasana.hip.alignment",
      "gorilla-pada-hastasana.spine.erect",
      "gorilla-pada-hastasana.shoulders.level"
    ],
    "isPremium": true,
    "orderIndex": 58,
    "aliases": [],
    "rules": [
      {
        "id": "gorilla-pada-hastasana.knee.straight",
        "name": "Legs Straight and Strong",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 4,
        "severity": "high",
        "feedback": "Engage thighs and straighten knees without hyperextending.",
        "isSafety": true
      },
      {
        "id": "gorilla-pada-hastasana.hip.alignment",
        "name": "Hips Over Ankles",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Stack hips over ankles and shoulders over hips.",
        "isSafety": false
      },
      {
        "id": "gorilla-pada-hastasana.spine.erect",
        "name": "Vertical Spine",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 3,
        "severity": "medium",
        "feedback": "Stand tall with elongated spine and open collarbones.",
        "isSafety": false
      },
      {
        "id": "gorilla-pada-hastasana.shoulders.level",
        "name": "Level Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "low",
        "feedback": "Relax shoulders evenly away from ears.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "grasshopper-maksikanagasana.knee.straight",
      "grasshopper-maksikanagasana.hip.alignment",
      "grasshopper-maksikanagasana.spine.erect",
      "grasshopper-maksikanagasana.shoulders.level"
    ],
    "isPremium": true,
    "orderIndex": 59,
    "aliases": [],
    "rules": [
      {
        "id": "grasshopper-maksikanagasana.knee.straight",
        "name": "Legs Straight and Strong",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 4,
        "severity": "high",
        "feedback": "Engage thighs and straighten knees without hyperextending.",
        "isSafety": true
      },
      {
        "id": "grasshopper-maksikanagasana.hip.alignment",
        "name": "Hips Over Ankles",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Stack hips over ankles and shoulders over hips.",
        "isSafety": false
      },
      {
        "id": "grasshopper-maksikanagasana.spine.erect",
        "name": "Vertical Spine",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 3,
        "severity": "medium",
        "feedback": "Stand tall with elongated spine and open collarbones.",
        "isSafety": false
      },
      {
        "id": "grasshopper-maksikanagasana.shoulders.level",
        "name": "Level Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "low",
        "feedback": "Relax shoulders evenly away from ears.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "half-bow-ardha-dhanurasana.bow.arc",
      "half-bow-ardha-dhanurasana.knees.bent",
      "half-bow-ardha-dhanurasana.chest.centered"
    ],
    "isPremium": true,
    "orderIndex": 60,
    "aliases": [],
    "rules": [
      {
        "id": "half-bow-ardha-dhanurasana.bow.arc",
        "name": "Torso & Leg Bow Arc",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 100,
        "max": 150,
        "target": 125,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Kick feet into hands to lift chest and thighs off mat.",
        "isSafety": true
      },
      {
        "id": "half-bow-ardha-dhanurasana.knees.bent",
        "name": "Knees Flexed",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 45,
        "max": 95,
        "target": 70,
        "tolerance": 25,
        "weight": 3,
        "severity": "high",
        "feedback": "Hold ankles firmly with knees hip-width apart.",
        "isSafety": false
      },
      {
        "id": "half-bow-ardha-dhanurasana.chest.centered",
        "name": "Chest Balanced",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.09,
        "tolerance": 0.07,
        "weight": 2,
        "severity": "medium",
        "feedback": "Lift evenly through both shoulders.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "half-moon-ardha-chandrasana.standing_knee.straight",
      "half-moon-ardha-chandrasana.lifted_hip.flexion",
      "half-moon-ardha-chandrasana.spine.balance"
    ],
    "isPremium": true,
    "orderIndex": 61,
    "aliases": [
      "half-moon",
      "ardha-chandrasana"
    ],
    "rules": [
      {
        "id": "half-moon-ardha-chandrasana.standing_knee.straight",
        "name": "Standing Leg Strong",
        "metric": "angle",
        "points": [
          24,
          26,
          28
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 4,
        "severity": "high",
        "feedback": "Keep standing leg straight and stable.",
        "isSafety": true
      },
      {
        "id": "half-moon-ardha-chandrasana.lifted_hip.flexion",
        "name": "Lifted Leg Elevated",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 80,
        "max": 140,
        "target": 110,
        "tolerance": 30,
        "weight": 3,
        "severity": "high",
        "feedback": "Maintain high lifted leg position.",
        "isSafety": false
      },
      {
        "id": "half-moon-ardha-chandrasana.spine.balance",
        "name": "Vertical Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.09,
        "tolerance": 0.07,
        "weight": 2,
        "severity": "medium",
        "feedback": "Keep your torso tall and centered.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      23,
      24,
      25,
      26,
      28
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "half-pigeon-ardha-kapotasana.hip.flexion",
      "half-pigeon-ardha-kapotasana.knee.fold",
      "half-pigeon-ardha-kapotasana.spine.erect",
      "half-pigeon-ardha-kapotasana.shoulder.relaxation"
    ],
    "isPremium": true,
    "orderIndex": 62,
    "aliases": [],
    "rules": [
      {
        "id": "half-pigeon-ardha-kapotasana.hip.flexion",
        "name": "Seated Hip Grounding",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 65,
        "max": 105,
        "target": 85,
        "tolerance": 20,
        "weight": 4,
        "severity": "high",
        "feedback": "Root both sit bones evenly into the mat.",
        "isSafety": true
      },
      {
        "id": "half-pigeon-ardha-kapotasana.knee.fold",
        "name": "Knee Fold Comfort",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 25,
        "max": 85,
        "target": 55,
        "tolerance": 30,
        "weight": 3,
        "severity": "medium",
        "feedback": "Fold legs comfortably in steady seated base.",
        "isSafety": false
      },
      {
        "id": "half-pigeon-ardha-kapotasana.spine.erect",
        "name": "Spine Length",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 3,
        "severity": "high",
        "feedback": "Sit tall with a straight, elongated spine.",
        "isSafety": false
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
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "low",
        "feedback": "Relax shoulders away from your ears.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "handstand-adho-mukha-vrksasana.body.vertical_line",
      "handstand-adho-mukha-vrksasana.core.stability",
      "handstand-adho-mukha-vrksasana.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 63,
    "aliases": [],
    "rules": [
      {
        "id": "handstand-adho-mukha-vrksasana.body.vertical_line",
        "name": "Inverted Vertical Line",
        "metric": "angle",
        "points": [
          11,
          23,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "target": 175,
        "tolerance": 15,
        "weight": 4,
        "severity": "high",
        "feedback": "Align legs, hips, and shoulders in a single vertical line.",
        "isSafety": true
      },
      {
        "id": "handstand-adho-mukha-vrksasana.core.stability",
        "name": "Core Engagement",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Engage core to maintain stable vertical axis.",
        "isSafety": false
      },
      {
        "id": "handstand-adho-mukha-vrksasana.hip.level",
        "name": "Level Inverted Hips",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Keep pelvis level without tilting.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      23,
      24,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "happy-baby-ananda-balasana.knees.90",
      "happy-baby-ananda-balasana.knees.flexion",
      "happy-baby-ananda-balasana.sacrum.grounded"
    ],
    "isPremium": true,
    "orderIndex": 64,
    "aliases": [],
    "rules": [
      {
        "id": "happy-baby-ananda-balasana.knees.90",
        "name": "Knees 90° to Torso",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 70,
        "max": 110,
        "target": 90,
        "tolerance": 20,
        "weight": 4,
        "severity": "high",
        "feedback": "Draw knees toward armpits with shins perpendicular to floor.",
        "isSafety": true
      },
      {
        "id": "happy-baby-ananda-balasana.knees.flexion",
        "name": "Knee Bend 90°",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 70,
        "max": 110,
        "target": 90,
        "tolerance": 20,
        "weight": 3,
        "severity": "high",
        "feedback": "Hold soles of feet with ankles stacked above knees.",
        "isSafety": false
      },
      {
        "id": "happy-baby-ananda-balasana.sacrum.grounded",
        "name": "Sacrum Flat on Floor",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Keep your tailbone and head grounded on the mat.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      23,
      24,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "head-to-knee-janu-sirsasana.body.vertical_line",
      "head-to-knee-janu-sirsasana.core.stability",
      "head-to-knee-janu-sirsasana.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 65,
    "aliases": [],
    "rules": [
      {
        "id": "head-to-knee-janu-sirsasana.body.vertical_line",
        "name": "Inverted Vertical Line",
        "metric": "angle",
        "points": [
          11,
          23,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "target": 175,
        "tolerance": 15,
        "weight": 4,
        "severity": "high",
        "feedback": "Align legs, hips, and shoulders in a single vertical line.",
        "isSafety": true
      },
      {
        "id": "head-to-knee-janu-sirsasana.core.stability",
        "name": "Core Engagement",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Engage core to maintain stable vertical axis.",
        "isSafety": false
      },
      {
        "id": "head-to-knee-janu-sirsasana.hip.level",
        "name": "Level Inverted Hips",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Keep pelvis level without tilting.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      23,
      24,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "headstand-sirsasana.body.vertical_line",
      "headstand-sirsasana.core.stability",
      "headstand-sirsasana.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 66,
    "aliases": [],
    "rules": [
      {
        "id": "headstand-sirsasana.body.vertical_line",
        "name": "Inverted Vertical Line",
        "metric": "angle",
        "points": [
          11,
          23,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "target": 175,
        "tolerance": 15,
        "weight": 4,
        "severity": "high",
        "feedback": "Align legs, hips, and shoulders in a single vertical line.",
        "isSafety": true
      },
      {
        "id": "headstand-sirsasana.core.stability",
        "name": "Core Engagement",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Engage core to maintain stable vertical axis.",
        "isSafety": false
      },
      {
        "id": "headstand-sirsasana.hip.level",
        "name": "Level Inverted Hips",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Keep pelvis level without tilting.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      23,
      24,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "hero-virasana.hip.flexion",
      "hero-virasana.knee.fold",
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
        "id": "hero-virasana.hip.flexion",
        "name": "Seated Hip Grounding",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 65,
        "max": 105,
        "target": 85,
        "tolerance": 20,
        "weight": 4,
        "severity": "high",
        "feedback": "Root both sit bones evenly into the mat.",
        "isSafety": true
      },
      {
        "id": "hero-virasana.knee.fold",
        "name": "Knee Fold Comfort",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 25,
        "max": 85,
        "target": 55,
        "tolerance": 30,
        "weight": 3,
        "severity": "medium",
        "feedback": "Fold legs comfortably in steady seated base.",
        "isSafety": false
      },
      {
        "id": "hero-virasana.spine.erect",
        "name": "Spine Length",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 3,
        "severity": "high",
        "feedback": "Sit tall with a straight, elongated spine.",
        "isSafety": false
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
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "low",
        "feedback": "Relax shoulders away from your ears.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "heron-kraunchasana.hip.flexion",
      "heron-kraunchasana.knee.fold",
      "heron-kraunchasana.spine.erect",
      "heron-kraunchasana.shoulder.relaxation"
    ],
    "isPremium": true,
    "orderIndex": 68,
    "aliases": [],
    "rules": [
      {
        "id": "heron-kraunchasana.hip.flexion",
        "name": "Seated Hip Grounding",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 65,
        "max": 105,
        "target": 85,
        "tolerance": 20,
        "weight": 4,
        "severity": "high",
        "feedback": "Root both sit bones evenly into the mat.",
        "isSafety": true
      },
      {
        "id": "heron-kraunchasana.knee.fold",
        "name": "Knee Fold Comfort",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 25,
        "max": 85,
        "target": 55,
        "tolerance": 30,
        "weight": 3,
        "severity": "medium",
        "feedback": "Fold legs comfortably in steady seated base.",
        "isSafety": false
      },
      {
        "id": "heron-kraunchasana.spine.erect",
        "name": "Spine Length",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 3,
        "severity": "high",
        "feedback": "Sit tall with a straight, elongated spine.",
        "isSafety": false
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
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "low",
        "feedback": "Relax shoulders away from your ears.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "himalayan-duck-karandavasana.knee.straight",
      "himalayan-duck-karandavasana.hip.alignment",
      "himalayan-duck-karandavasana.spine.erect",
      "himalayan-duck-karandavasana.shoulders.level"
    ],
    "isPremium": true,
    "orderIndex": 69,
    "aliases": [],
    "rules": [
      {
        "id": "himalayan-duck-karandavasana.knee.straight",
        "name": "Legs Straight and Strong",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 4,
        "severity": "high",
        "feedback": "Engage thighs and straighten knees without hyperextending.",
        "isSafety": true
      },
      {
        "id": "himalayan-duck-karandavasana.hip.alignment",
        "name": "Hips Over Ankles",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Stack hips over ankles and shoulders over hips.",
        "isSafety": false
      },
      {
        "id": "himalayan-duck-karandavasana.spine.erect",
        "name": "Vertical Spine",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 3,
        "severity": "medium",
        "feedback": "Stand tall with elongated spine and open collarbones.",
        "isSafety": false
      },
      {
        "id": "himalayan-duck-karandavasana.shoulders.level",
        "name": "Level Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "low",
        "feedback": "Relax shoulders evenly away from ears.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "horse-vatayanasana.knee.straight",
      "horse-vatayanasana.hip.alignment",
      "horse-vatayanasana.spine.erect",
      "horse-vatayanasana.shoulders.level"
    ],
    "isPremium": true,
    "orderIndex": 70,
    "aliases": [],
    "rules": [
      {
        "id": "horse-vatayanasana.knee.straight",
        "name": "Legs Straight and Strong",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 4,
        "severity": "high",
        "feedback": "Engage thighs and straighten knees without hyperextending.",
        "isSafety": true
      },
      {
        "id": "horse-vatayanasana.hip.alignment",
        "name": "Hips Over Ankles",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Stack hips over ankles and shoulders over hips.",
        "isSafety": false
      },
      {
        "id": "horse-vatayanasana.spine.erect",
        "name": "Vertical Spine",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 3,
        "severity": "medium",
        "feedback": "Stand tall with elongated spine and open collarbones.",
        "isSafety": false
      },
      {
        "id": "horse-vatayanasana.shoulders.level",
        "name": "Level Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "low",
        "feedback": "Relax shoulders evenly away from ears.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "humble-flamingo.knee.straight",
      "humble-flamingo.hip.alignment",
      "humble-flamingo.spine.erect",
      "humble-flamingo.shoulders.level"
    ],
    "isPremium": true,
    "orderIndex": 71,
    "aliases": [],
    "rules": [
      {
        "id": "humble-flamingo.knee.straight",
        "name": "Legs Straight and Strong",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 4,
        "severity": "high",
        "feedback": "Engage thighs and straighten knees without hyperextending.",
        "isSafety": true
      },
      {
        "id": "humble-flamingo.hip.alignment",
        "name": "Hips Over Ankles",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Stack hips over ankles and shoulders over hips.",
        "isSafety": false
      },
      {
        "id": "humble-flamingo.spine.erect",
        "name": "Vertical Spine",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 3,
        "severity": "medium",
        "feedback": "Stand tall with elongated spine and open collarbones.",
        "isSafety": false
      },
      {
        "id": "humble-flamingo.shoulders.level",
        "name": "Level Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "low",
        "feedback": "Relax shoulders evenly away from ears.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "inverted-staff-dvi-pada-viparita-dandasana.torso_legs.90",
      "inverted-staff-dvi-pada-viparita-dandasana.knees.straight",
      "inverted-staff-dvi-pada-viparita-dandasana.spine.vertical"
    ],
    "isPremium": true,
    "orderIndex": 72,
    "aliases": [],
    "rules": [
      {
        "id": "inverted-staff-dvi-pada-viparita-dandasana.torso_legs.90",
        "name": "90° L-Sit Angle",
        "metric": "angle",
        "points": [
          11,
          23,
          27
        ],
        "comparison": "between",
        "min": 75,
        "max": 105,
        "target": 90,
        "tolerance": 15,
        "weight": 4,
        "severity": "high",
        "feedback": "Sit at a precise 90° angle with torso upright and legs straight.",
        "isSafety": true
      },
      {
        "id": "inverted-staff-dvi-pada-viparita-dandasana.knees.straight",
        "name": "Legs Fully Grounded",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 165,
        "max": 180,
        "target": 175,
        "tolerance": 10,
        "weight": 3,
        "severity": "high",
        "feedback": "Press backs of knees and thighs flat to floor.",
        "isSafety": false
      },
      {
        "id": "inverted-staff-dvi-pada-viparita-dandasana.spine.vertical",
        "name": "Vertical Spine",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 3,
        "severity": "medium",
        "feedback": "Lengthen spine tall out of pelvis.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      23,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "king-pigeon-eka-pada-rajakapotasana.spine.backbend_arch",
      "king-pigeon-eka-pada-rajakapotasana.chest.opening",
      "king-pigeon-eka-pada-rajakapotasana.shoulder.symmetry"
    ],
    "isPremium": true,
    "orderIndex": 73,
    "aliases": [],
    "rules": [
      {
        "id": "king-pigeon-eka-pada-rajakapotasana.spine.backbend_arch",
        "name": "Spine Arch Extension",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 120,
        "max": 170,
        "target": 145,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Arch smoothly through the entire spine.",
        "isSafety": true
      },
      {
        "id": "king-pigeon-eka-pada-rajakapotasana.chest.opening",
        "name": "Chest Expansion",
        "metric": "angle",
        "points": [
          0,
          11,
          23
        ],
        "comparison": "between",
        "min": 110,
        "max": 160,
        "target": 135,
        "tolerance": 25,
        "weight": 3,
        "severity": "high",
        "feedback": "Expand chest and broaden collarbones.",
        "isSafety": false
      },
      {
        "id": "king-pigeon-eka-pada-rajakapotasana.shoulder.symmetry",
        "name": "Symmetrical Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Keep shoulders even and relaxed.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      0,
      11,
      12,
      23,
      25
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "legs-up-the-wall-viparita-karani.body.vertical_line",
      "legs-up-the-wall-viparita-karani.core.stability",
      "legs-up-the-wall-viparita-karani.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 74,
    "aliases": [],
    "rules": [
      {
        "id": "legs-up-the-wall-viparita-karani.body.vertical_line",
        "name": "Inverted Vertical Line",
        "metric": "angle",
        "points": [
          11,
          23,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "target": 175,
        "tolerance": 15,
        "weight": 4,
        "severity": "high",
        "feedback": "Align legs, hips, and shoulders in a single vertical line.",
        "isSafety": true
      },
      {
        "id": "legs-up-the-wall-viparita-karani.core.stability",
        "name": "Core Engagement",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Engage core to maintain stable vertical axis.",
        "isSafety": false
      },
      {
        "id": "legs-up-the-wall-viparita-karani.hip.level",
        "name": "Level Inverted Hips",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Keep pelvis level without tilting.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      23,
      24,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "little-thunderbolt-laghu-vajrasana.hips.table_angle",
      "little-thunderbolt-laghu-vajrasana.shoulders.table_angle",
      "little-thunderbolt-laghu-vajrasana.spine.neutral"
    ],
    "isPremium": true,
    "orderIndex": 75,
    "aliases": [],
    "rules": [
      {
        "id": "little-thunderbolt-laghu-vajrasana.hips.table_angle",
        "name": "Hips Over Knees (90°)",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 72,
        "max": 108,
        "target": 90,
        "tolerance": 18,
        "weight": 4,
        "severity": "high",
        "feedback": "Stack hips directly over knees.",
        "isSafety": true
      },
      {
        "id": "little-thunderbolt-laghu-vajrasana.shoulders.table_angle",
        "name": "Shoulders Over Wrists (90°)",
        "metric": "angle",
        "points": [
          23,
          11,
          15
        ],
        "comparison": "between",
        "min": 72,
        "max": 108,
        "target": 90,
        "tolerance": 18,
        "weight": 3,
        "severity": "high",
        "feedback": "Stack shoulders directly over hands/wrists.",
        "isSafety": false
      },
      {
        "id": "little-thunderbolt-laghu-vajrasana.spine.neutral",
        "name": "Neutral Spine",
        "metric": "horizontal_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.09,
        "tolerance": 0.07,
        "weight": 2,
        "severity": "medium",
        "feedback": "Keep back flat and neck aligned with spine.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      15,
      23,
      25
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "lizard-uttana-pristhasana.knee.straight",
      "lizard-uttana-pristhasana.hip.alignment",
      "lizard-uttana-pristhasana.spine.erect",
      "lizard-uttana-pristhasana.shoulders.level"
    ],
    "isPremium": true,
    "orderIndex": 76,
    "aliases": [],
    "rules": [
      {
        "id": "lizard-uttana-pristhasana.knee.straight",
        "name": "Legs Straight and Strong",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 4,
        "severity": "high",
        "feedback": "Engage thighs and straighten knees without hyperextending.",
        "isSafety": true
      },
      {
        "id": "lizard-uttana-pristhasana.hip.alignment",
        "name": "Hips Over Ankles",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Stack hips over ankles and shoulders over hips.",
        "isSafety": false
      },
      {
        "id": "lizard-uttana-pristhasana.spine.erect",
        "name": "Vertical Spine",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 3,
        "severity": "medium",
        "feedback": "Stand tall with elongated spine and open collarbones.",
        "isSafety": false
      },
      {
        "id": "lizard-uttana-pristhasana.shoulders.level",
        "name": "Level Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "low",
        "feedback": "Relax shoulders evenly away from ears.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "locust-i-shalabhasana-a.spine.backbend_arch",
      "locust-i-shalabhasana-a.chest.opening",
      "locust-i-shalabhasana-a.shoulder.symmetry"
    ],
    "isPremium": true,
    "orderIndex": 77,
    "aliases": [],
    "rules": [
      {
        "id": "locust-i-shalabhasana-a.spine.backbend_arch",
        "name": "Spine Arch Extension",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 120,
        "max": 170,
        "target": 145,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Arch smoothly through the entire spine.",
        "isSafety": true
      },
      {
        "id": "locust-i-shalabhasana-a.chest.opening",
        "name": "Chest Expansion",
        "metric": "angle",
        "points": [
          0,
          11,
          23
        ],
        "comparison": "between",
        "min": 110,
        "max": 160,
        "target": 135,
        "tolerance": 25,
        "weight": 3,
        "severity": "high",
        "feedback": "Expand chest and broaden collarbones.",
        "isSafety": false
      },
      {
        "id": "locust-i-shalabhasana-a.shoulder.symmetry",
        "name": "Symmetrical Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Keep shoulders even and relaxed.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      0,
      11,
      12,
      23,
      25
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "locust-ii-shalabhasana-b.spine.backbend_arch",
      "locust-ii-shalabhasana-b.chest.opening",
      "locust-ii-shalabhasana-b.shoulder.symmetry"
    ],
    "isPremium": true,
    "orderIndex": 78,
    "aliases": [],
    "rules": [
      {
        "id": "locust-ii-shalabhasana-b.spine.backbend_arch",
        "name": "Spine Arch Extension",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 120,
        "max": 170,
        "target": 145,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Arch smoothly through the entire spine.",
        "isSafety": true
      },
      {
        "id": "locust-ii-shalabhasana-b.chest.opening",
        "name": "Chest Expansion",
        "metric": "angle",
        "points": [
          0,
          11,
          23
        ],
        "comparison": "between",
        "min": 110,
        "max": 160,
        "target": 135,
        "tolerance": 25,
        "weight": 3,
        "severity": "high",
        "feedback": "Expand chest and broaden collarbones.",
        "isSafety": false
      },
      {
        "id": "locust-ii-shalabhasana-b.shoulder.symmetry",
        "name": "Symmetrical Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Keep shoulders even and relaxed.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      0,
      11,
      12,
      23,
      25
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "locust-iii-shalabhasana-c.spine.backbend_arch",
      "locust-iii-shalabhasana-c.chest.opening",
      "locust-iii-shalabhasana-c.shoulder.symmetry"
    ],
    "isPremium": true,
    "orderIndex": 79,
    "aliases": [],
    "rules": [
      {
        "id": "locust-iii-shalabhasana-c.spine.backbend_arch",
        "name": "Spine Arch Extension",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 120,
        "max": 170,
        "target": 145,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Arch smoothly through the entire spine.",
        "isSafety": true
      },
      {
        "id": "locust-iii-shalabhasana-c.chest.opening",
        "name": "Chest Expansion",
        "metric": "angle",
        "points": [
          0,
          11,
          23
        ],
        "comparison": "between",
        "min": 110,
        "max": 160,
        "target": 135,
        "tolerance": 25,
        "weight": 3,
        "severity": "high",
        "feedback": "Expand chest and broaden collarbones.",
        "isSafety": false
      },
      {
        "id": "locust-iii-shalabhasana-c.shoulder.symmetry",
        "name": "Symmetrical Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Keep shoulders even and relaxed.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      0,
      11,
      12,
      23,
      25
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "lord-of-the-fishes-paripurna-matsyendrasana.spine.backbend_arch",
      "lord-of-the-fishes-paripurna-matsyendrasana.chest.opening",
      "lord-of-the-fishes-paripurna-matsyendrasana.shoulder.symmetry"
    ],
    "isPremium": true,
    "orderIndex": 80,
    "aliases": [],
    "rules": [
      {
        "id": "lord-of-the-fishes-paripurna-matsyendrasana.spine.backbend_arch",
        "name": "Spine Arch Extension",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 120,
        "max": 170,
        "target": 145,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Arch smoothly through the entire spine.",
        "isSafety": true
      },
      {
        "id": "lord-of-the-fishes-paripurna-matsyendrasana.chest.opening",
        "name": "Chest Expansion",
        "metric": "angle",
        "points": [
          0,
          11,
          23
        ],
        "comparison": "between",
        "min": 110,
        "max": 160,
        "target": 135,
        "tolerance": 25,
        "weight": 3,
        "severity": "high",
        "feedback": "Expand chest and broaden collarbones.",
        "isSafety": false
      },
      {
        "id": "lord-of-the-fishes-paripurna-matsyendrasana.shoulder.symmetry",
        "name": "Symmetrical Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Keep shoulders even and relaxed.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      0,
      11,
      12,
      23,
      25
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "lotus-padmasana.hip.flexion",
      "lotus-padmasana.knee.fold",
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
        "id": "lotus-padmasana.hip.flexion",
        "name": "Seated Hip Grounding",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 65,
        "max": 105,
        "target": 85,
        "tolerance": 20,
        "weight": 4,
        "severity": "high",
        "feedback": "Root both sit bones evenly into the mat.",
        "isSafety": true
      },
      {
        "id": "lotus-padmasana.knee.fold",
        "name": "Knee Fold Comfort",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 25,
        "max": 85,
        "target": 55,
        "tolerance": 30,
        "weight": 3,
        "severity": "medium",
        "feedback": "Fold legs comfortably in steady seated base.",
        "isSafety": false
      },
      {
        "id": "lotus-padmasana.spine.erect",
        "name": "Spine Length",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 3,
        "severity": "high",
        "feedback": "Sit tall with a straight, elongated spine.",
        "isSafety": false
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
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "low",
        "feedback": "Relax shoulders away from your ears.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "low-push-up-chaturanga-dandasana.elbows.90",
      "low-push-up-chaturanga-dandasana.plank.straight",
      "low-push-up-chaturanga-dandasana.shoulders.level"
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
        "id": "low-push-up-chaturanga-dandasana.elbows.90",
        "name": "Elbows at 90°",
        "metric": "angle",
        "points": [
          11,
          13,
          15
        ],
        "comparison": "between",
        "min": 75,
        "max": 105,
        "target": 90,
        "tolerance": 15,
        "weight": 4,
        "severity": "high",
        "feedback": "Lower until elbows are bent at a precise 90° angle.",
        "isSafety": true
      },
      {
        "id": "low-push-up-chaturanga-dandasana.plank.straight",
        "name": "Straight Body Line",
        "metric": "angle",
        "points": [
          11,
          23,
          27
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 4,
        "severity": "high",
        "feedback": "Maintain single straight line from crown to heels.",
        "isSafety": true
      },
      {
        "id": "low-push-up-chaturanga-dandasana.shoulders.level",
        "name": "Level Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Keep shoulders level and collarbones broad.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      13,
      15,
      23,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "lunge-runner.front_knee.angle",
      "lunge-runner.back_knee.straight",
      "lunge-runner.arms.parallel",
      "lunge-runner.torso.vertical"
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
        "id": "lunge-runner.front_knee.angle",
        "name": "Front Knee 90°",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 75,
        "max": 105,
        "target": 90,
        "tolerance": 15,
        "weight": 4,
        "severity": "high",
        "feedback": "Bend your front knee over your ankle at 90°.",
        "isSafety": true
      },
      {
        "id": "lunge-runner.back_knee.straight",
        "name": "Back Leg Straight",
        "metric": "angle",
        "points": [
          24,
          26,
          28
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Straighten and ground through your back leg.",
        "isSafety": false
      },
      {
        "id": "lunge-runner.arms.parallel",
        "name": "Arms Parallel to Floor",
        "metric": "angle",
        "points": [
          13,
          11,
          12
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "target": 175,
        "tolerance": 15,
        "weight": 3,
        "severity": "medium",
        "feedback": "Extend arms parallel to the ground.",
        "isSafety": false
      },
      {
        "id": "lunge-runner.torso.vertical",
        "name": "Torso Centered",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Keep your torso upright without leaning forward.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      13,
      23,
      24,
      25,
      26,
      27,
      28
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "moon-bird-eka-pada-shirshasana-c.knee.straight",
      "moon-bird-eka-pada-shirshasana-c.hip.alignment",
      "moon-bird-eka-pada-shirshasana-c.spine.erect",
      "moon-bird-eka-pada-shirshasana-c.shoulders.level"
    ],
    "isPremium": true,
    "orderIndex": 84,
    "aliases": [],
    "rules": [
      {
        "id": "moon-bird-eka-pada-shirshasana-c.knee.straight",
        "name": "Legs Straight and Strong",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 4,
        "severity": "high",
        "feedback": "Engage thighs and straighten knees without hyperextending.",
        "isSafety": true
      },
      {
        "id": "moon-bird-eka-pada-shirshasana-c.hip.alignment",
        "name": "Hips Over Ankles",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Stack hips over ankles and shoulders over hips.",
        "isSafety": false
      },
      {
        "id": "moon-bird-eka-pada-shirshasana-c.spine.erect",
        "name": "Vertical Spine",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 3,
        "severity": "medium",
        "feedback": "Stand tall with elongated spine and open collarbones.",
        "isSafety": false
      },
      {
        "id": "moon-bird-eka-pada-shirshasana-c.shoulders.level",
        "name": "Level Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "low",
        "feedback": "Relax shoulders evenly away from ears.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "mountain-tadasana.knee.straight",
      "mountain-tadasana.hip.alignment",
      "mountain-tadasana.spine.erect",
      "mountain-tadasana.shoulders.level"
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
        "id": "mountain-tadasana.knee.straight",
        "name": "Legs Straight and Strong",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 4,
        "severity": "high",
        "feedback": "Engage thighs and straighten knees without hyperextending.",
        "isSafety": true
      },
      {
        "id": "mountain-tadasana.hip.alignment",
        "name": "Hips Over Ankles",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Stack hips over ankles and shoulders over hips.",
        "isSafety": false
      },
      {
        "id": "mountain-tadasana.spine.erect",
        "name": "Vertical Spine",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 3,
        "severity": "medium",
        "feedback": "Stand tall with elongated spine and open collarbones.",
        "isSafety": false
      },
      {
        "id": "mountain-tadasana.shoulders.level",
        "name": "Level Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "low",
        "feedback": "Relax shoulders evenly away from ears.",
        "isSafety": false
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
      "version": "1.2.0",
      "sampleCount": 50,
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
      "noose-pashasana.knee.straight",
      "noose-pashasana.hip.alignment",
      "noose-pashasana.spine.erect",
      "noose-pashasana.shoulders.level"
    ],
    "isPremium": true,
    "orderIndex": 86,
    "aliases": [],
    "rules": [
      {
        "id": "noose-pashasana.knee.straight",
        "name": "Legs Straight and Strong",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 4,
        "severity": "high",
        "feedback": "Engage thighs and straighten knees without hyperextending.",
        "isSafety": true
      },
      {
        "id": "noose-pashasana.hip.alignment",
        "name": "Hips Over Ankles",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Stack hips over ankles and shoulders over hips.",
        "isSafety": false
      },
      {
        "id": "noose-pashasana.spine.erect",
        "name": "Vertical Spine",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 3,
        "severity": "medium",
        "feedback": "Stand tall with elongated spine and open collarbones.",
        "isSafety": false
      },
      {
        "id": "noose-pashasana.shoulders.level",
        "name": "Level Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "low",
        "feedback": "Relax shoulders evenly away from ears.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "one-leg-behind-the-head-i-eka-pada-shirshasana-a.knee.straight",
      "one-leg-behind-the-head-i-eka-pada-shirshasana-a.hip.alignment",
      "one-leg-behind-the-head-i-eka-pada-shirshasana-a.spine.erect",
      "one-leg-behind-the-head-i-eka-pada-shirshasana-a.shoulders.level"
    ],
    "isPremium": true,
    "orderIndex": 87,
    "aliases": [],
    "rules": [
      {
        "id": "one-leg-behind-the-head-i-eka-pada-shirshasana-a.knee.straight",
        "name": "Legs Straight and Strong",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 4,
        "severity": "high",
        "feedback": "Engage thighs and straighten knees without hyperextending.",
        "isSafety": true
      },
      {
        "id": "one-leg-behind-the-head-i-eka-pada-shirshasana-a.hip.alignment",
        "name": "Hips Over Ankles",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Stack hips over ankles and shoulders over hips.",
        "isSafety": false
      },
      {
        "id": "one-leg-behind-the-head-i-eka-pada-shirshasana-a.spine.erect",
        "name": "Vertical Spine",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 3,
        "severity": "medium",
        "feedback": "Stand tall with elongated spine and open collarbones.",
        "isSafety": false
      },
      {
        "id": "one-leg-behind-the-head-i-eka-pada-shirshasana-a.shoulders.level",
        "name": "Level Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "low",
        "feedback": "Relax shoulders evenly away from ears.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "one-leg-behind-the-head-ii-eka-pada-shirshasana-b.knee.straight",
      "one-leg-behind-the-head-ii-eka-pada-shirshasana-b.hip.alignment",
      "one-leg-behind-the-head-ii-eka-pada-shirshasana-b.spine.erect",
      "one-leg-behind-the-head-ii-eka-pada-shirshasana-b.shoulders.level"
    ],
    "isPremium": true,
    "orderIndex": 88,
    "aliases": [],
    "rules": [
      {
        "id": "one-leg-behind-the-head-ii-eka-pada-shirshasana-b.knee.straight",
        "name": "Legs Straight and Strong",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 4,
        "severity": "high",
        "feedback": "Engage thighs and straighten knees without hyperextending.",
        "isSafety": true
      },
      {
        "id": "one-leg-behind-the-head-ii-eka-pada-shirshasana-b.hip.alignment",
        "name": "Hips Over Ankles",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Stack hips over ankles and shoulders over hips.",
        "isSafety": false
      },
      {
        "id": "one-leg-behind-the-head-ii-eka-pada-shirshasana-b.spine.erect",
        "name": "Vertical Spine",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 3,
        "severity": "medium",
        "feedback": "Stand tall with elongated spine and open collarbones.",
        "isSafety": false
      },
      {
        "id": "one-leg-behind-the-head-ii-eka-pada-shirshasana-b.shoulders.level",
        "name": "Level Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "low",
        "feedback": "Relax shoulders evenly away from ears.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "peacock-mayurasana.elbow.shelf",
      "peacock-mayurasana.knee.tuck",
      "peacock-mayurasana.feet.lifted",
      "peacock-mayurasana.shoulders.stable"
    ],
    "isPremium": true,
    "orderIndex": 89,
    "aliases": [],
    "rules": [
      {
        "id": "peacock-mayurasana.elbow.shelf",
        "name": "Elbow Support Angle",
        "metric": "angle",
        "points": [
          11,
          13,
          15
        ],
        "comparison": "between",
        "min": 70,
        "max": 120,
        "target": 95,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Bend elbows into a strong supportive shelf (90°).",
        "isSafety": true
      },
      {
        "id": "peacock-mayurasana.knee.tuck",
        "name": "Knees Tucked High",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 35,
        "max": 85,
        "target": 60,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Draw knees high onto the backs of your upper arms.",
        "isSafety": true
      },
      {
        "id": "peacock-mayurasana.feet.lifted",
        "name": "Feet Lifted Off Ground",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 40,
        "max": 90,
        "target": 65,
        "tolerance": 25,
        "weight": 3,
        "severity": "medium",
        "feedback": "Lift toes and feet off the mat with core strength.",
        "isSafety": false
      },
      {
        "id": "peacock-mayurasana.shoulders.stable",
        "name": "Shoulder Stability",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Distribute weight evenly across both arms.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      13,
      15,
      23,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "pendant-lolasana.elbow.shelf",
      "pendant-lolasana.knee.tuck",
      "pendant-lolasana.feet.lifted",
      "pendant-lolasana.shoulders.stable"
    ],
    "isPremium": true,
    "orderIndex": 90,
    "aliases": [],
    "rules": [
      {
        "id": "pendant-lolasana.elbow.shelf",
        "name": "Elbow Support Angle",
        "metric": "angle",
        "points": [
          11,
          13,
          15
        ],
        "comparison": "between",
        "min": 70,
        "max": 120,
        "target": 95,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Bend elbows into a strong supportive shelf (90°).",
        "isSafety": true
      },
      {
        "id": "pendant-lolasana.knee.tuck",
        "name": "Knees Tucked High",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 35,
        "max": 85,
        "target": 60,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Draw knees high onto the backs of your upper arms.",
        "isSafety": true
      },
      {
        "id": "pendant-lolasana.feet.lifted",
        "name": "Feet Lifted Off Ground",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 40,
        "max": 90,
        "target": 65,
        "tolerance": 25,
        "weight": 3,
        "severity": "medium",
        "feedback": "Lift toes and feet off the mat with core strength.",
        "isSafety": false
      },
      {
        "id": "pendant-lolasana.shoulders.stable",
        "name": "Shoulder Stability",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Distribute weight evenly across both arms.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      13,
      15,
      23,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "pigeon-kapotasana.spine.backbend_arch",
      "pigeon-kapotasana.chest.opening",
      "pigeon-kapotasana.shoulder.symmetry"
    ],
    "isPremium": true,
    "orderIndex": 91,
    "aliases": [],
    "rules": [
      {
        "id": "pigeon-kapotasana.spine.backbend_arch",
        "name": "Spine Arch Extension",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 120,
        "max": 170,
        "target": 145,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Arch smoothly through the entire spine.",
        "isSafety": true
      },
      {
        "id": "pigeon-kapotasana.chest.opening",
        "name": "Chest Expansion",
        "metric": "angle",
        "points": [
          0,
          11,
          23
        ],
        "comparison": "between",
        "min": 110,
        "max": 160,
        "target": 135,
        "tolerance": 25,
        "weight": 3,
        "severity": "high",
        "feedback": "Expand chest and broaden collarbones.",
        "isSafety": false
      },
      {
        "id": "pigeon-kapotasana.shoulder.symmetry",
        "name": "Symmetrical Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Keep shoulders even and relaxed.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      0,
      11,
      12,
      23,
      25
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "plank-phalakasana.plank.line",
      "plank-phalakasana.arms.stacked",
      "plank-phalakasana.knees.straight",
      "plank-phalakasana.hips.level"
    ],
    "isPremium": true,
    "orderIndex": 92,
    "aliases": [
      "plank",
      "phalakasana"
    ],
    "rules": [
      {
        "id": "plank-phalakasana.plank.line",
        "name": "Straight Plank Line",
        "metric": "angle",
        "points": [
          11,
          23,
          27
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 4,
        "severity": "high",
        "feedback": "Keep body in one straight line without sagging hips.",
        "isSafety": true
      },
      {
        "id": "plank-phalakasana.arms.stacked",
        "name": "Arms Perpendicular",
        "metric": "angle",
        "points": [
          23,
          11,
          13
        ],
        "comparison": "between",
        "min": 75,
        "max": 105,
        "target": 90,
        "tolerance": 15,
        "weight": 3,
        "severity": "high",
        "feedback": "Stack shoulders directly over wrists.",
        "isSafety": false
      },
      {
        "id": "plank-phalakasana.knees.straight",
        "name": "Legs Extended",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 2,
        "severity": "medium",
        "feedback": "Engage quads and press heels back.",
        "isSafety": false
      },
      {
        "id": "plank-phalakasana.hips.level",
        "name": "Level Hips",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Prevent hips from twisting or dropping.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      13,
      23,
      24,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "plow-halasana.body.vertical_line",
      "plow-halasana.core.stability",
      "plow-halasana.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 93,
    "aliases": [],
    "rules": [
      {
        "id": "plow-halasana.body.vertical_line",
        "name": "Inverted Vertical Line",
        "metric": "angle",
        "points": [
          11,
          23,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "target": 175,
        "tolerance": 15,
        "weight": 4,
        "severity": "high",
        "feedback": "Align legs, hips, and shoulders in a single vertical line.",
        "isSafety": true
      },
      {
        "id": "plow-halasana.core.stability",
        "name": "Core Engagement",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Engage core to maintain stable vertical axis.",
        "isSafety": false
      },
      {
        "id": "plow-halasana.hip.level",
        "name": "Level Inverted Hips",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Keep pelvis level without tilting.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      23,
      24,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "pyramid-parshvottanasana.knee.straight",
      "pyramid-parshvottanasana.hip.alignment",
      "pyramid-parshvottanasana.spine.erect",
      "pyramid-parshvottanasana.shoulders.level"
    ],
    "isPremium": true,
    "orderIndex": 94,
    "aliases": [],
    "rules": [
      {
        "id": "pyramid-parshvottanasana.knee.straight",
        "name": "Legs Straight and Strong",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 4,
        "severity": "high",
        "feedback": "Engage thighs and straighten knees without hyperextending.",
        "isSafety": true
      },
      {
        "id": "pyramid-parshvottanasana.hip.alignment",
        "name": "Hips Over Ankles",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Stack hips over ankles and shoulders over hips.",
        "isSafety": false
      },
      {
        "id": "pyramid-parshvottanasana.spine.erect",
        "name": "Vertical Spine",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 3,
        "severity": "medium",
        "feedback": "Stand tall with elongated spine and open collarbones.",
        "isSafety": false
      },
      {
        "id": "pyramid-parshvottanasana.shoulders.level",
        "name": "Level Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "low",
        "feedback": "Relax shoulders evenly away from ears.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "rabbit-shashankasana.body.supine_line",
      "rabbit-shashankasana.shoulders.grounded",
      "rabbit-shashankasana.hips.grounded"
    ],
    "isPremium": true,
    "orderIndex": 95,
    "aliases": [],
    "rules": [
      {
        "id": "rabbit-shashankasana.body.supine_line",
        "name": "Supine Alignment",
        "metric": "angle",
        "points": [
          11,
          23,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "target": 175,
        "tolerance": 15,
        "weight": 3,
        "severity": "medium",
        "feedback": "Rest fully flat and symmetrical on the floor.",
        "isSafety": false
      },
      {
        "id": "rabbit-shashankasana.shoulders.grounded",
        "name": "Shoulders Relaxed & Grounded",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "medium",
        "feedback": "Let shoulders melt into the earth.",
        "isSafety": false
      },
      {
        "id": "rabbit-shashankasana.hips.grounded",
        "name": "Hips Grounded Evenly",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "low",
        "feedback": "Release pelvis with balanced symmetry.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "reclined-bound-angle-supta-baddha-konasana.body.supine_line",
      "reclined-bound-angle-supta-baddha-konasana.shoulders.grounded",
      "reclined-bound-angle-supta-baddha-konasana.hips.grounded"
    ],
    "isPremium": true,
    "orderIndex": 96,
    "aliases": [],
    "rules": [
      {
        "id": "reclined-bound-angle-supta-baddha-konasana.body.supine_line",
        "name": "Supine Alignment",
        "metric": "angle",
        "points": [
          11,
          23,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "target": 175,
        "tolerance": 15,
        "weight": 3,
        "severity": "medium",
        "feedback": "Rest fully flat and symmetrical on the floor.",
        "isSafety": false
      },
      {
        "id": "reclined-bound-angle-supta-baddha-konasana.shoulders.grounded",
        "name": "Shoulders Relaxed & Grounded",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "medium",
        "feedback": "Let shoulders melt into the earth.",
        "isSafety": false
      },
      {
        "id": "reclined-bound-angle-supta-baddha-konasana.hips.grounded",
        "name": "Hips Grounded Evenly",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "low",
        "feedback": "Release pelvis with balanced symmetry.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "reverse-corpse-advasana.body.supine_line",
      "reverse-corpse-advasana.shoulders.grounded",
      "reverse-corpse-advasana.hips.grounded"
    ],
    "isPremium": true,
    "orderIndex": 97,
    "aliases": [],
    "rules": [
      {
        "id": "reverse-corpse-advasana.body.supine_line",
        "name": "Supine Alignment",
        "metric": "angle",
        "points": [
          11,
          23,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "target": 175,
        "tolerance": 15,
        "weight": 3,
        "severity": "medium",
        "feedback": "Rest fully flat and symmetrical on the floor.",
        "isSafety": false
      },
      {
        "id": "reverse-corpse-advasana.shoulders.grounded",
        "name": "Shoulders Relaxed & Grounded",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "medium",
        "feedback": "Let shoulders melt into the earth.",
        "isSafety": false
      },
      {
        "id": "reverse-corpse-advasana.hips.grounded",
        "name": "Hips Grounded Evenly",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "low",
        "feedback": "Release pelvis with balanced symmetry.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "revolved-bird-of-paradise-parivritta-svarga-dvijasana.standing_knee.straight",
      "revolved-bird-of-paradise-parivritta-svarga-dvijasana.lifted_hip.flexion",
      "revolved-bird-of-paradise-parivritta-svarga-dvijasana.spine.balance"
    ],
    "isPremium": true,
    "orderIndex": 98,
    "aliases": [],
    "rules": [
      {
        "id": "revolved-bird-of-paradise-parivritta-svarga-dvijasana.standing_knee.straight",
        "name": "Standing Leg Strong",
        "metric": "angle",
        "points": [
          24,
          26,
          28
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 4,
        "severity": "high",
        "feedback": "Keep standing leg straight and stable.",
        "isSafety": true
      },
      {
        "id": "revolved-bird-of-paradise-parivritta-svarga-dvijasana.lifted_hip.flexion",
        "name": "Lifted Leg Elevated",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 80,
        "max": 140,
        "target": 110,
        "tolerance": 30,
        "weight": 3,
        "severity": "high",
        "feedback": "Maintain high lifted leg position.",
        "isSafety": false
      },
      {
        "id": "revolved-bird-of-paradise-parivritta-svarga-dvijasana.spine.balance",
        "name": "Vertical Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.09,
        "tolerance": 0.07,
        "weight": 2,
        "severity": "medium",
        "feedback": "Keep your torso tall and centered.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      23,
      24,
      25,
      26,
      28
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "revolved-chair-parivrtta-utkatasana.knees.bend",
      "revolved-chair-parivrtta-utkatasana.torso.incline",
      "revolved-chair-parivrtta-utkatasana.arms.reach",
      "revolved-chair-parivrtta-utkatasana.knees.level"
    ],
    "isPremium": true,
    "orderIndex": 99,
    "aliases": [],
    "rules": [
      {
        "id": "revolved-chair-parivrtta-utkatasana.knees.bend",
        "name": "Knees Deep Bend (100°)",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 80,
        "max": 120,
        "target": 100,
        "tolerance": 20,
        "weight": 4,
        "severity": "high",
        "feedback": "Sink hips back as if sitting into a deep chair.",
        "isSafety": true
      },
      {
        "id": "revolved-chair-parivrtta-utkatasana.torso.incline",
        "name": "Torso Extended Forward",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 95,
        "max": 135,
        "target": 115,
        "tolerance": 20,
        "weight": 3,
        "severity": "high",
        "feedback": "Keep chest lifted and spine long on diagonal.",
        "isSafety": false
      },
      {
        "id": "revolved-chair-parivrtta-utkatasana.arms.reach",
        "name": "Arms Raised Overhead",
        "metric": "angle",
        "points": [
          23,
          11,
          13
        ],
        "comparison": "between",
        "min": 145,
        "max": 180,
        "target": 165,
        "tolerance": 20,
        "weight": 2,
        "severity": "medium",
        "feedback": "Extend arms alongside ears.",
        "isSafety": false
      },
      {
        "id": "revolved-chair-parivrtta-utkatasana.knees.level",
        "name": "Knees Symmetrical",
        "metric": "horizontal_alignment",
        "points": [
          25,
          26
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Keep knees tracking parallel without caving.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      13,
      23,
      25,
      26,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "revolved-flying-man-parivritta-eka-pada-koundinyasana.elbow.shelf",
      "revolved-flying-man-parivritta-eka-pada-koundinyasana.knee.tuck",
      "revolved-flying-man-parivritta-eka-pada-koundinyasana.feet.lifted",
      "revolved-flying-man-parivritta-eka-pada-koundinyasana.shoulders.stable"
    ],
    "isPremium": true,
    "orderIndex": 100,
    "aliases": [],
    "rules": [
      {
        "id": "revolved-flying-man-parivritta-eka-pada-koundinyasana.elbow.shelf",
        "name": "Elbow Support Angle",
        "metric": "angle",
        "points": [
          11,
          13,
          15
        ],
        "comparison": "between",
        "min": 70,
        "max": 120,
        "target": 95,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Bend elbows into a strong supportive shelf (90°).",
        "isSafety": true
      },
      {
        "id": "revolved-flying-man-parivritta-eka-pada-koundinyasana.knee.tuck",
        "name": "Knees Tucked High",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 35,
        "max": 85,
        "target": 60,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Draw knees high onto the backs of your upper arms.",
        "isSafety": true
      },
      {
        "id": "revolved-flying-man-parivritta-eka-pada-koundinyasana.feet.lifted",
        "name": "Feet Lifted Off Ground",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 40,
        "max": 90,
        "target": 65,
        "tolerance": 25,
        "weight": 3,
        "severity": "medium",
        "feedback": "Lift toes and feet off the mat with core strength.",
        "isSafety": false
      },
      {
        "id": "revolved-flying-man-parivritta-eka-pada-koundinyasana.shoulders.stable",
        "name": "Shoulder Stability",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Distribute weight evenly across both arms.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      13,
      15,
      23,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "revolved-half-moon-parivritta-ardha-chandrasana.standing_knee.straight",
      "revolved-half-moon-parivritta-ardha-chandrasana.lifted_hip.flexion",
      "revolved-half-moon-parivritta-ardha-chandrasana.spine.balance"
    ],
    "isPremium": true,
    "orderIndex": 101,
    "aliases": [],
    "rules": [
      {
        "id": "revolved-half-moon-parivritta-ardha-chandrasana.standing_knee.straight",
        "name": "Standing Leg Strong",
        "metric": "angle",
        "points": [
          24,
          26,
          28
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 4,
        "severity": "high",
        "feedback": "Keep standing leg straight and stable.",
        "isSafety": true
      },
      {
        "id": "revolved-half-moon-parivritta-ardha-chandrasana.lifted_hip.flexion",
        "name": "Lifted Leg Elevated",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 80,
        "max": 140,
        "target": 110,
        "tolerance": 30,
        "weight": 3,
        "severity": "high",
        "feedback": "Maintain high lifted leg position.",
        "isSafety": false
      },
      {
        "id": "revolved-half-moon-parivritta-ardha-chandrasana.spine.balance",
        "name": "Vertical Alignment",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.09,
        "tolerance": 0.07,
        "weight": 2,
        "severity": "medium",
        "feedback": "Keep your torso tall and centered.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      23,
      24,
      25,
      26,
      28
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "revolved-seated-hand-to-big-toe-upavishta-parivritta-hasta-padangushthasana.hip.flexion",
      "revolved-seated-hand-to-big-toe-upavishta-parivritta-hasta-padangushthasana.knee.fold",
      "revolved-seated-hand-to-big-toe-upavishta-parivritta-hasta-padangushthasana.spine.erect",
      "revolved-seated-hand-to-big-toe-upavishta-parivritta-hasta-padangushthasana.shoulder.relaxation"
    ],
    "isPremium": true,
    "orderIndex": 102,
    "aliases": [],
    "rules": [
      {
        "id": "revolved-seated-hand-to-big-toe-upavishta-parivritta-hasta-padangushthasana.hip.flexion",
        "name": "Seated Hip Grounding",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 65,
        "max": 105,
        "target": 85,
        "tolerance": 20,
        "weight": 4,
        "severity": "high",
        "feedback": "Root both sit bones evenly into the mat.",
        "isSafety": true
      },
      {
        "id": "revolved-seated-hand-to-big-toe-upavishta-parivritta-hasta-padangushthasana.knee.fold",
        "name": "Knee Fold Comfort",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 25,
        "max": 85,
        "target": 55,
        "tolerance": 30,
        "weight": 3,
        "severity": "medium",
        "feedback": "Fold legs comfortably in steady seated base.",
        "isSafety": false
      },
      {
        "id": "revolved-seated-hand-to-big-toe-upavishta-parivritta-hasta-padangushthasana.spine.erect",
        "name": "Spine Length",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 3,
        "severity": "high",
        "feedback": "Sit tall with a straight, elongated spine.",
        "isSafety": false
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
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "low",
        "feedback": "Relax shoulders away from your ears.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "revolved-standing-hand-to-big-toe-parivritta-hasta-padangushthasana.knee.straight",
      "revolved-standing-hand-to-big-toe-parivritta-hasta-padangushthasana.hip.alignment",
      "revolved-standing-hand-to-big-toe-parivritta-hasta-padangushthasana.spine.erect",
      "revolved-standing-hand-to-big-toe-parivritta-hasta-padangushthasana.shoulders.level"
    ],
    "isPremium": true,
    "orderIndex": 103,
    "aliases": [],
    "rules": [
      {
        "id": "revolved-standing-hand-to-big-toe-parivritta-hasta-padangushthasana.knee.straight",
        "name": "Legs Straight and Strong",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 4,
        "severity": "high",
        "feedback": "Engage thighs and straighten knees without hyperextending.",
        "isSafety": true
      },
      {
        "id": "revolved-standing-hand-to-big-toe-parivritta-hasta-padangushthasana.hip.alignment",
        "name": "Hips Over Ankles",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Stack hips over ankles and shoulders over hips.",
        "isSafety": false
      },
      {
        "id": "revolved-standing-hand-to-big-toe-parivritta-hasta-padangushthasana.spine.erect",
        "name": "Vertical Spine",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 3,
        "severity": "medium",
        "feedback": "Stand tall with elongated spine and open collarbones.",
        "isSafety": false
      },
      {
        "id": "revolved-standing-hand-to-big-toe-parivritta-hasta-padangushthasana.shoulders.level",
        "name": "Level Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "low",
        "feedback": "Relax shoulders evenly away from ears.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "revolved-triangle-parivritta-trikonasana.front_knee.straight",
      "revolved-triangle-parivritta-trikonasana.back_knee.straight",
      "revolved-triangle-parivritta-trikonasana.arms.vertical_line",
      "revolved-triangle-parivritta-trikonasana.hip.lateral_hinge"
    ],
    "isPremium": true,
    "orderIndex": 104,
    "aliases": [],
    "rules": [
      {
        "id": "revolved-triangle-parivritta-trikonasana.front_knee.straight",
        "name": "Front Leg Straight",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 4,
        "severity": "high",
        "feedback": "Keep both legs straight and quad engaged.",
        "isSafety": true
      },
      {
        "id": "revolved-triangle-parivritta-trikonasana.back_knee.straight",
        "name": "Back Leg Straight",
        "metric": "angle",
        "points": [
          24,
          26,
          28
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Anchor firmly through straight back leg.",
        "isSafety": false
      },
      {
        "id": "revolved-triangle-parivritta-trikonasana.arms.vertical_line",
        "name": "Arms in Straight Line",
        "metric": "angle",
        "points": [
          15,
          11,
          16
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "target": 175,
        "tolerance": 15,
        "weight": 3,
        "severity": "medium",
        "feedback": "Extend arms vertically in a single line.",
        "isSafety": false
      },
      {
        "id": "revolved-triangle-parivritta-trikonasana.hip.lateral_hinge",
        "name": "Side Lateral Hinge",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 95,
        "max": 145,
        "target": 120,
        "tolerance": 25,
        "weight": 2,
        "severity": "medium",
        "feedback": "Hinge directly sideways over your front leg.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
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
      "status": "draft",
      "version": "1.2.0",
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
      "rock-the-baby.knee.straight",
      "rock-the-baby.hip.alignment",
      "rock-the-baby.spine.erect",
      "rock-the-baby.shoulders.level"
    ],
    "isPremium": true,
    "orderIndex": 105,
    "aliases": [],
    "rules": [
      {
        "id": "rock-the-baby.knee.straight",
        "name": "Legs Straight and Strong",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 4,
        "severity": "high",
        "feedback": "Engage thighs and straighten knees without hyperextending.",
        "isSafety": true
      },
      {
        "id": "rock-the-baby.hip.alignment",
        "name": "Hips Over Ankles",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Stack hips over ankles and shoulders over hips.",
        "isSafety": false
      },
      {
        "id": "rock-the-baby.spine.erect",
        "name": "Vertical Spine",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 3,
        "severity": "medium",
        "feedback": "Stand tall with elongated spine and open collarbones.",
        "isSafety": false
      },
      {
        "id": "rock-the-baby.shoulders.level",
        "name": "Level Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "low",
        "feedback": "Relax shoulders evenly away from ears.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "rooster-kukkutasana.knee.straight",
      "rooster-kukkutasana.hip.alignment",
      "rooster-kukkutasana.spine.erect",
      "rooster-kukkutasana.shoulders.level"
    ],
    "isPremium": true,
    "orderIndex": 106,
    "aliases": [],
    "rules": [
      {
        "id": "rooster-kukkutasana.knee.straight",
        "name": "Legs Straight and Strong",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 4,
        "severity": "high",
        "feedback": "Engage thighs and straighten knees without hyperextending.",
        "isSafety": true
      },
      {
        "id": "rooster-kukkutasana.hip.alignment",
        "name": "Hips Over Ankles",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Stack hips over ankles and shoulders over hips.",
        "isSafety": false
      },
      {
        "id": "rooster-kukkutasana.spine.erect",
        "name": "Vertical Spine",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 3,
        "severity": "medium",
        "feedback": "Stand tall with elongated spine and open collarbones.",
        "isSafety": false
      },
      {
        "id": "rooster-kukkutasana.shoulders.level",
        "name": "Level Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "low",
        "feedback": "Relax shoulders evenly away from ears.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "sage-bharadvajas-twist-bharadvajasana.knee.straight",
      "sage-bharadvajas-twist-bharadvajasana.hip.alignment",
      "sage-bharadvajas-twist-bharadvajasana.spine.erect",
      "sage-bharadvajas-twist-bharadvajasana.shoulders.level"
    ],
    "isPremium": true,
    "orderIndex": 107,
    "aliases": [],
    "rules": [
      {
        "id": "sage-bharadvajas-twist-bharadvajasana.knee.straight",
        "name": "Legs Straight and Strong",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 4,
        "severity": "high",
        "feedback": "Engage thighs and straighten knees without hyperextending.",
        "isSafety": true
      },
      {
        "id": "sage-bharadvajas-twist-bharadvajasana.hip.alignment",
        "name": "Hips Over Ankles",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Stack hips over ankles and shoulders over hips.",
        "isSafety": false
      },
      {
        "id": "sage-bharadvajas-twist-bharadvajasana.spine.erect",
        "name": "Vertical Spine",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 3,
        "severity": "medium",
        "feedback": "Stand tall with elongated spine and open collarbones.",
        "isSafety": false
      },
      {
        "id": "sage-bharadvajas-twist-bharadvajasana.shoulders.level",
        "name": "Level Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "low",
        "feedback": "Relax shoulders evenly away from ears.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "sage-gherandas-gherandasana.knee.straight",
      "sage-gherandas-gherandasana.hip.alignment",
      "sage-gherandas-gherandasana.spine.erect",
      "sage-gherandas-gherandasana.shoulders.level"
    ],
    "isPremium": true,
    "orderIndex": 108,
    "aliases": [],
    "rules": [
      {
        "id": "sage-gherandas-gherandasana.knee.straight",
        "name": "Legs Straight and Strong",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 4,
        "severity": "high",
        "feedback": "Engage thighs and straighten knees without hyperextending.",
        "isSafety": true
      },
      {
        "id": "sage-gherandas-gherandasana.hip.alignment",
        "name": "Hips Over Ankles",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Stack hips over ankles and shoulders over hips.",
        "isSafety": false
      },
      {
        "id": "sage-gherandas-gherandasana.spine.erect",
        "name": "Vertical Spine",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 3,
        "severity": "medium",
        "feedback": "Stand tall with elongated spine and open collarbones.",
        "isSafety": false
      },
      {
        "id": "sage-gherandas-gherandasana.shoulders.level",
        "name": "Level Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "low",
        "feedback": "Relax shoulders evenly away from ears.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "sage-marichis-i-marichyasana-a.hip.flexion",
      "sage-marichis-i-marichyasana-a.knee.fold",
      "sage-marichis-i-marichyasana-a.spine.erect",
      "sage-marichis-i-marichyasana-a.shoulder.relaxation"
    ],
    "isPremium": true,
    "orderIndex": 109,
    "aliases": [],
    "rules": [
      {
        "id": "sage-marichis-i-marichyasana-a.hip.flexion",
        "name": "Seated Hip Grounding",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 65,
        "max": 105,
        "target": 85,
        "tolerance": 20,
        "weight": 4,
        "severity": "high",
        "feedback": "Root both sit bones evenly into the mat.",
        "isSafety": true
      },
      {
        "id": "sage-marichis-i-marichyasana-a.knee.fold",
        "name": "Knee Fold Comfort",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 25,
        "max": 85,
        "target": 55,
        "tolerance": 30,
        "weight": 3,
        "severity": "medium",
        "feedback": "Fold legs comfortably in steady seated base.",
        "isSafety": false
      },
      {
        "id": "sage-marichis-i-marichyasana-a.spine.erect",
        "name": "Spine Length",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 3,
        "severity": "high",
        "feedback": "Sit tall with a straight, elongated spine.",
        "isSafety": false
      },
      {
        "id": "sage-marichis-i-marichyasana-a.shoulder.relaxation",
        "name": "Relaxed Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "low",
        "feedback": "Relax shoulders away from your ears.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "sage-marichis-ii-marichyasana-b.hip.flexion",
      "sage-marichis-ii-marichyasana-b.knee.fold",
      "sage-marichis-ii-marichyasana-b.spine.erect",
      "sage-marichis-ii-marichyasana-b.shoulder.relaxation"
    ],
    "isPremium": true,
    "orderIndex": 110,
    "aliases": [],
    "rules": [
      {
        "id": "sage-marichis-ii-marichyasana-b.hip.flexion",
        "name": "Seated Hip Grounding",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 65,
        "max": 105,
        "target": 85,
        "tolerance": 20,
        "weight": 4,
        "severity": "high",
        "feedback": "Root both sit bones evenly into the mat.",
        "isSafety": true
      },
      {
        "id": "sage-marichis-ii-marichyasana-b.knee.fold",
        "name": "Knee Fold Comfort",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 25,
        "max": 85,
        "target": 55,
        "tolerance": 30,
        "weight": 3,
        "severity": "medium",
        "feedback": "Fold legs comfortably in steady seated base.",
        "isSafety": false
      },
      {
        "id": "sage-marichis-ii-marichyasana-b.spine.erect",
        "name": "Spine Length",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 3,
        "severity": "high",
        "feedback": "Sit tall with a straight, elongated spine.",
        "isSafety": false
      },
      {
        "id": "sage-marichis-ii-marichyasana-b.shoulder.relaxation",
        "name": "Relaxed Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "low",
        "feedback": "Relax shoulders away from your ears.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "sage-marichis-iii-marichyasana-c.hip.flexion",
      "sage-marichis-iii-marichyasana-c.knee.fold",
      "sage-marichis-iii-marichyasana-c.spine.erect",
      "sage-marichis-iii-marichyasana-c.shoulder.relaxation"
    ],
    "isPremium": true,
    "orderIndex": 111,
    "aliases": [],
    "rules": [
      {
        "id": "sage-marichis-iii-marichyasana-c.hip.flexion",
        "name": "Seated Hip Grounding",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 65,
        "max": 105,
        "target": 85,
        "tolerance": 20,
        "weight": 4,
        "severity": "high",
        "feedback": "Root both sit bones evenly into the mat.",
        "isSafety": true
      },
      {
        "id": "sage-marichis-iii-marichyasana-c.knee.fold",
        "name": "Knee Fold Comfort",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 25,
        "max": 85,
        "target": 55,
        "tolerance": 30,
        "weight": 3,
        "severity": "medium",
        "feedback": "Fold legs comfortably in steady seated base.",
        "isSafety": false
      },
      {
        "id": "sage-marichis-iii-marichyasana-c.spine.erect",
        "name": "Spine Length",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 3,
        "severity": "high",
        "feedback": "Sit tall with a straight, elongated spine.",
        "isSafety": false
      },
      {
        "id": "sage-marichis-iii-marichyasana-c.shoulder.relaxation",
        "name": "Relaxed Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "low",
        "feedback": "Relax shoulders away from your ears.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "sage-marichis-iv-marichyasana-d.hip.flexion",
      "sage-marichis-iv-marichyasana-d.knee.fold",
      "sage-marichis-iv-marichyasana-d.spine.erect",
      "sage-marichis-iv-marichyasana-d.shoulder.relaxation"
    ],
    "isPremium": true,
    "orderIndex": 112,
    "aliases": [],
    "rules": [
      {
        "id": "sage-marichis-iv-marichyasana-d.hip.flexion",
        "name": "Seated Hip Grounding",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 65,
        "max": 105,
        "target": 85,
        "tolerance": 20,
        "weight": 4,
        "severity": "high",
        "feedback": "Root both sit bones evenly into the mat.",
        "isSafety": true
      },
      {
        "id": "sage-marichis-iv-marichyasana-d.knee.fold",
        "name": "Knee Fold Comfort",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 25,
        "max": 85,
        "target": 55,
        "tolerance": 30,
        "weight": 3,
        "severity": "medium",
        "feedback": "Fold legs comfortably in steady seated base.",
        "isSafety": false
      },
      {
        "id": "sage-marichis-iv-marichyasana-d.spine.erect",
        "name": "Spine Length",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 3,
        "severity": "high",
        "feedback": "Sit tall with a straight, elongated spine.",
        "isSafety": false
      },
      {
        "id": "sage-marichis-iv-marichyasana-d.shoulder.relaxation",
        "name": "Relaxed Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "low",
        "feedback": "Relax shoulders away from your ears.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "sage-visvamitras-vishvamitrasana.knee.straight",
      "sage-visvamitras-vishvamitrasana.hip.alignment",
      "sage-visvamitras-vishvamitrasana.spine.erect",
      "sage-visvamitras-vishvamitrasana.shoulders.level"
    ],
    "isPremium": true,
    "orderIndex": 113,
    "aliases": [],
    "rules": [
      {
        "id": "sage-visvamitras-vishvamitrasana.knee.straight",
        "name": "Legs Straight and Strong",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 4,
        "severity": "high",
        "feedback": "Engage thighs and straighten knees without hyperextending.",
        "isSafety": true
      },
      {
        "id": "sage-visvamitras-vishvamitrasana.hip.alignment",
        "name": "Hips Over Ankles",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Stack hips over ankles and shoulders over hips.",
        "isSafety": false
      },
      {
        "id": "sage-visvamitras-vishvamitrasana.spine.erect",
        "name": "Vertical Spine",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 3,
        "severity": "medium",
        "feedback": "Stand tall with elongated spine and open collarbones.",
        "isSafety": false
      },
      {
        "id": "sage-visvamitras-vishvamitrasana.shoulders.level",
        "name": "Level Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "low",
        "feedback": "Relax shoulders evenly away from ears.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "scale-tolasana.elbow.shelf",
      "scale-tolasana.knee.tuck",
      "scale-tolasana.feet.lifted",
      "scale-tolasana.shoulders.stable"
    ],
    "isPremium": true,
    "orderIndex": 114,
    "aliases": [],
    "rules": [
      {
        "id": "scale-tolasana.elbow.shelf",
        "name": "Elbow Support Angle",
        "metric": "angle",
        "points": [
          11,
          13,
          15
        ],
        "comparison": "between",
        "min": 70,
        "max": 120,
        "target": 95,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Bend elbows into a strong supportive shelf (90°).",
        "isSafety": true
      },
      {
        "id": "scale-tolasana.knee.tuck",
        "name": "Knees Tucked High",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 35,
        "max": 85,
        "target": 60,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Draw knees high onto the backs of your upper arms.",
        "isSafety": true
      },
      {
        "id": "scale-tolasana.feet.lifted",
        "name": "Feet Lifted Off Ground",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 40,
        "max": 90,
        "target": 65,
        "tolerance": 25,
        "weight": 3,
        "severity": "medium",
        "feedback": "Lift toes and feet off the mat with core strength.",
        "isSafety": false
      },
      {
        "id": "scale-tolasana.shoulders.stable",
        "name": "Shoulder Stability",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Distribute weight evenly across both arms.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      13,
      15,
      23,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "scorpion-vrischikasana-a.body.vertical_line",
      "scorpion-vrischikasana-a.core.stability",
      "scorpion-vrischikasana-a.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 115,
    "aliases": [],
    "rules": [
      {
        "id": "scorpion-vrischikasana-a.body.vertical_line",
        "name": "Inverted Vertical Line",
        "metric": "angle",
        "points": [
          11,
          23,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "target": 175,
        "tolerance": 15,
        "weight": 4,
        "severity": "high",
        "feedback": "Align legs, hips, and shoulders in a single vertical line.",
        "isSafety": true
      },
      {
        "id": "scorpion-vrischikasana-a.core.stability",
        "name": "Core Engagement",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Engage core to maintain stable vertical axis.",
        "isSafety": false
      },
      {
        "id": "scorpion-vrischikasana-a.hip.level",
        "name": "Level Inverted Hips",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Keep pelvis level without tilting.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      23,
      24,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "seated-forward-fold-paschimottanasana.hip.deep_fold",
      "seated-forward-fold-paschimottanasana.knee.straight",
      "seated-forward-fold-paschimottanasana.spine.elongation",
      "seated-forward-fold-paschimottanasana.pelvis.tilt"
    ],
    "isPremium": true,
    "orderIndex": 116,
    "aliases": [],
    "rules": [
      {
        "id": "seated-forward-fold-paschimottanasana.hip.deep_fold",
        "name": "Deep Hip Flexion",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 30,
        "max": 80,
        "target": 55,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Fold deeply from the hips rather than rounding the back.",
        "isSafety": true
      },
      {
        "id": "seated-forward-fold-paschimottanasana.knee.straight",
        "name": "Legs Straight",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "target": 175,
        "tolerance": 15,
        "weight": 3,
        "severity": "high",
        "feedback": "Keep knees straight or with gentle microbend.",
        "isSafety": false
      },
      {
        "id": "seated-forward-fold-paschimottanasana.spine.elongation",
        "name": "Elongated Spine",
        "metric": "angle",
        "points": [
          0,
          11,
          23
        ],
        "comparison": "between",
        "min": 135,
        "max": 180,
        "target": 160,
        "tolerance": 25,
        "weight": 2,
        "severity": "medium",
        "feedback": "Reach crown of head toward toes with open chest.",
        "isSafety": false
      },
      {
        "id": "seated-forward-fold-paschimottanasana.pelvis.tilt",
        "name": "Pelvic Anterior Tilt",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "low",
        "feedback": "Keep pelvis square and balanced.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      0,
      11,
      23,
      24,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "seated-gate-parighasana.hip.flexion",
      "seated-gate-parighasana.knee.fold",
      "seated-gate-parighasana.spine.erect",
      "seated-gate-parighasana.shoulder.relaxation"
    ],
    "isPremium": true,
    "orderIndex": 117,
    "aliases": [],
    "rules": [
      {
        "id": "seated-gate-parighasana.hip.flexion",
        "name": "Seated Hip Grounding",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 65,
        "max": 105,
        "target": 85,
        "tolerance": 20,
        "weight": 4,
        "severity": "high",
        "feedback": "Root both sit bones evenly into the mat.",
        "isSafety": true
      },
      {
        "id": "seated-gate-parighasana.knee.fold",
        "name": "Knee Fold Comfort",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 25,
        "max": 85,
        "target": 55,
        "tolerance": 30,
        "weight": 3,
        "severity": "medium",
        "feedback": "Fold legs comfortably in steady seated base.",
        "isSafety": false
      },
      {
        "id": "seated-gate-parighasana.spine.erect",
        "name": "Spine Length",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 3,
        "severity": "high",
        "feedback": "Sit tall with a straight, elongated spine.",
        "isSafety": false
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
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "low",
        "feedback": "Relax shoulders away from your ears.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "seated-half-bound-lotus-forward-bend-ardha-baddha-padma-paschimottanasana.hip.deep_fold",
      "seated-half-bound-lotus-forward-bend-ardha-baddha-padma-paschimottanasana.knee.straight",
      "seated-half-bound-lotus-forward-bend-ardha-baddha-padma-paschimottanasana.spine.elongation",
      "seated-half-bound-lotus-forward-bend-ardha-baddha-padma-paschimottanasana.pelvis.tilt"
    ],
    "isPremium": true,
    "orderIndex": 118,
    "aliases": [],
    "rules": [
      {
        "id": "seated-half-bound-lotus-forward-bend-ardha-baddha-padma-paschimottanasana.hip.deep_fold",
        "name": "Deep Hip Flexion",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 30,
        "max": 80,
        "target": 55,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Fold deeply from the hips rather than rounding the back.",
        "isSafety": true
      },
      {
        "id": "seated-half-bound-lotus-forward-bend-ardha-baddha-padma-paschimottanasana.knee.straight",
        "name": "Legs Straight",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "target": 175,
        "tolerance": 15,
        "weight": 3,
        "severity": "high",
        "feedback": "Keep knees straight or with gentle microbend.",
        "isSafety": false
      },
      {
        "id": "seated-half-bound-lotus-forward-bend-ardha-baddha-padma-paschimottanasana.spine.elongation",
        "name": "Elongated Spine",
        "metric": "angle",
        "points": [
          0,
          11,
          23
        ],
        "comparison": "between",
        "min": 135,
        "max": 180,
        "target": 160,
        "tolerance": 25,
        "weight": 2,
        "severity": "medium",
        "feedback": "Reach crown of head toward toes with open chest.",
        "isSafety": false
      },
      {
        "id": "seated-half-bound-lotus-forward-bend-ardha-baddha-padma-paschimottanasana.pelvis.tilt",
        "name": "Pelvic Anterior Tilt",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "low",
        "feedback": "Keep pelvis square and balanced.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      0,
      11,
      23,
      24,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "seated-three-limbed-forward-bend-trianga-mukha-eka-pada-paschimottanasana.hip.deep_fold",
      "seated-three-limbed-forward-bend-trianga-mukha-eka-pada-paschimottanasana.knee.straight",
      "seated-three-limbed-forward-bend-trianga-mukha-eka-pada-paschimottanasana.spine.elongation",
      "seated-three-limbed-forward-bend-trianga-mukha-eka-pada-paschimottanasana.pelvis.tilt"
    ],
    "isPremium": true,
    "orderIndex": 119,
    "aliases": [],
    "rules": [
      {
        "id": "seated-three-limbed-forward-bend-trianga-mukha-eka-pada-paschimottanasana.hip.deep_fold",
        "name": "Deep Hip Flexion",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 30,
        "max": 80,
        "target": 55,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Fold deeply from the hips rather than rounding the back.",
        "isSafety": true
      },
      {
        "id": "seated-three-limbed-forward-bend-trianga-mukha-eka-pada-paschimottanasana.knee.straight",
        "name": "Legs Straight",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "target": 175,
        "tolerance": 15,
        "weight": 3,
        "severity": "high",
        "feedback": "Keep knees straight or with gentle microbend.",
        "isSafety": false
      },
      {
        "id": "seated-three-limbed-forward-bend-trianga-mukha-eka-pada-paschimottanasana.spine.elongation",
        "name": "Elongated Spine",
        "metric": "angle",
        "points": [
          0,
          11,
          23
        ],
        "comparison": "between",
        "min": 135,
        "max": 180,
        "target": 160,
        "tolerance": 25,
        "weight": 2,
        "severity": "medium",
        "feedback": "Reach crown of head toward toes with open chest.",
        "isSafety": false
      },
      {
        "id": "seated-three-limbed-forward-bend-trianga-mukha-eka-pada-paschimottanasana.pelvis.tilt",
        "name": "Pelvic Anterior Tilt",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "low",
        "feedback": "Keep pelvis square and balanced.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      0,
      11,
      23,
      24,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "seated-twist-ardha-matsyendrasana.hip.flexion",
      "seated-twist-ardha-matsyendrasana.knee.fold",
      "seated-twist-ardha-matsyendrasana.spine.erect",
      "seated-twist-ardha-matsyendrasana.shoulder.relaxation"
    ],
    "isPremium": true,
    "orderIndex": 120,
    "aliases": [],
    "rules": [
      {
        "id": "seated-twist-ardha-matsyendrasana.hip.flexion",
        "name": "Seated Hip Grounding",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 65,
        "max": 105,
        "target": 85,
        "tolerance": 20,
        "weight": 4,
        "severity": "high",
        "feedback": "Root both sit bones evenly into the mat.",
        "isSafety": true
      },
      {
        "id": "seated-twist-ardha-matsyendrasana.knee.fold",
        "name": "Knee Fold Comfort",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 25,
        "max": 85,
        "target": 55,
        "tolerance": 30,
        "weight": 3,
        "severity": "medium",
        "feedback": "Fold legs comfortably in steady seated base.",
        "isSafety": false
      },
      {
        "id": "seated-twist-ardha-matsyendrasana.spine.erect",
        "name": "Spine Length",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 3,
        "severity": "high",
        "feedback": "Sit tall with a straight, elongated spine.",
        "isSafety": false
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
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "low",
        "feedback": "Relax shoulders away from your ears.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "shiva-squat.knee.straight",
      "shiva-squat.hip.alignment",
      "shiva-squat.spine.erect",
      "shiva-squat.shoulders.level"
    ],
    "isPremium": true,
    "orderIndex": 121,
    "aliases": [],
    "rules": [
      {
        "id": "shiva-squat.knee.straight",
        "name": "Legs Straight and Strong",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 4,
        "severity": "high",
        "feedback": "Engage thighs and straighten knees without hyperextending.",
        "isSafety": true
      },
      {
        "id": "shiva-squat.hip.alignment",
        "name": "Hips Over Ankles",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Stack hips over ankles and shoulders over hips.",
        "isSafety": false
      },
      {
        "id": "shiva-squat.spine.erect",
        "name": "Vertical Spine",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 3,
        "severity": "medium",
        "feedback": "Stand tall with elongated spine and open collarbones.",
        "isSafety": false
      },
      {
        "id": "shiva-squat.shoulders.level",
        "name": "Level Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "low",
        "feedback": "Relax shoulders evenly away from ears.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "shoelace.hip.flexion",
      "shoelace.knee.fold",
      "shoelace.spine.erect",
      "shoelace.shoulder.relaxation"
    ],
    "isPremium": true,
    "orderIndex": 122,
    "aliases": [],
    "rules": [
      {
        "id": "shoelace.hip.flexion",
        "name": "Seated Hip Grounding",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 65,
        "max": 105,
        "target": 85,
        "tolerance": 20,
        "weight": 4,
        "severity": "high",
        "feedback": "Root both sit bones evenly into the mat.",
        "isSafety": true
      },
      {
        "id": "shoelace.knee.fold",
        "name": "Knee Fold Comfort",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 25,
        "max": 85,
        "target": 55,
        "tolerance": 30,
        "weight": 3,
        "severity": "medium",
        "feedback": "Fold legs comfortably in steady seated base.",
        "isSafety": false
      },
      {
        "id": "shoelace.spine.erect",
        "name": "Spine Length",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 3,
        "severity": "high",
        "feedback": "Sit tall with a straight, elongated spine.",
        "isSafety": false
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
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "low",
        "feedback": "Relax shoulders away from your ears.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "shoulder-pressing-bhuja-pidasana.elbow.shelf",
      "shoulder-pressing-bhuja-pidasana.knee.tuck",
      "shoulder-pressing-bhuja-pidasana.feet.lifted",
      "shoulder-pressing-bhuja-pidasana.shoulders.stable"
    ],
    "isPremium": true,
    "orderIndex": 123,
    "aliases": [],
    "rules": [
      {
        "id": "shoulder-pressing-bhuja-pidasana.elbow.shelf",
        "name": "Elbow Support Angle",
        "metric": "angle",
        "points": [
          11,
          13,
          15
        ],
        "comparison": "between",
        "min": 70,
        "max": 120,
        "target": 95,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Bend elbows into a strong supportive shelf (90°).",
        "isSafety": true
      },
      {
        "id": "shoulder-pressing-bhuja-pidasana.knee.tuck",
        "name": "Knees Tucked High",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 35,
        "max": 85,
        "target": 60,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Draw knees high onto the backs of your upper arms.",
        "isSafety": true
      },
      {
        "id": "shoulder-pressing-bhuja-pidasana.feet.lifted",
        "name": "Feet Lifted Off Ground",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 40,
        "max": 90,
        "target": 65,
        "tolerance": 25,
        "weight": 3,
        "severity": "medium",
        "feedback": "Lift toes and feet off the mat with core strength.",
        "isSafety": false
      },
      {
        "id": "shoulder-pressing-bhuja-pidasana.shoulders.stable",
        "name": "Shoulder Stability",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Distribute weight evenly across both arms.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      13,
      15,
      23,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "shoulder-stand-with-lotus-legs-urdhva-padmasana.hip.flexion",
      "shoulder-stand-with-lotus-legs-urdhva-padmasana.knee.fold",
      "shoulder-stand-with-lotus-legs-urdhva-padmasana.spine.erect",
      "shoulder-stand-with-lotus-legs-urdhva-padmasana.shoulder.relaxation"
    ],
    "isPremium": true,
    "orderIndex": 124,
    "aliases": [],
    "rules": [
      {
        "id": "shoulder-stand-with-lotus-legs-urdhva-padmasana.hip.flexion",
        "name": "Seated Hip Grounding",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 65,
        "max": 105,
        "target": 85,
        "tolerance": 20,
        "weight": 4,
        "severity": "high",
        "feedback": "Root both sit bones evenly into the mat.",
        "isSafety": true
      },
      {
        "id": "shoulder-stand-with-lotus-legs-urdhva-padmasana.knee.fold",
        "name": "Knee Fold Comfort",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 25,
        "max": 85,
        "target": 55,
        "tolerance": 30,
        "weight": 3,
        "severity": "medium",
        "feedback": "Fold legs comfortably in steady seated base.",
        "isSafety": false
      },
      {
        "id": "shoulder-stand-with-lotus-legs-urdhva-padmasana.spine.erect",
        "name": "Spine Length",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 3,
        "severity": "high",
        "feedback": "Sit tall with a straight, elongated spine.",
        "isSafety": false
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
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "low",
        "feedback": "Relax shoulders away from your ears.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "shoulderstand-sarvangasana.body.vertical_line",
      "shoulderstand-sarvangasana.core.stability",
      "shoulderstand-sarvangasana.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 125,
    "aliases": [],
    "rules": [
      {
        "id": "shoulderstand-sarvangasana.body.vertical_line",
        "name": "Inverted Vertical Line",
        "metric": "angle",
        "points": [
          11,
          23,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "target": 175,
        "tolerance": 15,
        "weight": 4,
        "severity": "high",
        "feedback": "Align legs, hips, and shoulders in a single vertical line.",
        "isSafety": true
      },
      {
        "id": "shoulderstand-sarvangasana.core.stability",
        "name": "Core Engagement",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Engage core to maintain stable vertical axis.",
        "isSafety": false
      },
      {
        "id": "shoulderstand-sarvangasana.hip.level",
        "name": "Level Inverted Hips",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Keep pelvis level without tilting.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      23,
      24,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "side-crow-parsva-bakasana.elbow.shelf",
      "side-crow-parsva-bakasana.knee.tuck",
      "side-crow-parsva-bakasana.feet.lifted",
      "side-crow-parsva-bakasana.shoulders.stable"
    ],
    "isPremium": true,
    "orderIndex": 126,
    "aliases": [],
    "rules": [
      {
        "id": "side-crow-parsva-bakasana.elbow.shelf",
        "name": "Elbow Support Angle",
        "metric": "angle",
        "points": [
          11,
          13,
          15
        ],
        "comparison": "between",
        "min": 70,
        "max": 120,
        "target": 95,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Bend elbows into a strong supportive shelf (90°).",
        "isSafety": true
      },
      {
        "id": "side-crow-parsva-bakasana.knee.tuck",
        "name": "Knees Tucked High",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 35,
        "max": 85,
        "target": 60,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Draw knees high onto the backs of your upper arms.",
        "isSafety": true
      },
      {
        "id": "side-crow-parsva-bakasana.feet.lifted",
        "name": "Feet Lifted Off Ground",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 40,
        "max": 90,
        "target": 65,
        "tolerance": 25,
        "weight": 3,
        "severity": "medium",
        "feedback": "Lift toes and feet off the mat with core strength.",
        "isSafety": false
      },
      {
        "id": "side-crow-parsva-bakasana.shoulders.stable",
        "name": "Shoulder Stability",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Distribute weight evenly across both arms.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      13,
      15,
      23,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "side-lunge-skandasana.front_knee.angle",
      "side-lunge-skandasana.back_knee.straight",
      "side-lunge-skandasana.arms.parallel",
      "side-lunge-skandasana.torso.vertical"
    ],
    "isPremium": true,
    "orderIndex": 127,
    "aliases": [],
    "rules": [
      {
        "id": "side-lunge-skandasana.front_knee.angle",
        "name": "Front Knee 90°",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 75,
        "max": 105,
        "target": 90,
        "tolerance": 15,
        "weight": 4,
        "severity": "high",
        "feedback": "Bend your front knee over your ankle at 90°.",
        "isSafety": true
      },
      {
        "id": "side-lunge-skandasana.back_knee.straight",
        "name": "Back Leg Straight",
        "metric": "angle",
        "points": [
          24,
          26,
          28
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Straighten and ground through your back leg.",
        "isSafety": false
      },
      {
        "id": "side-lunge-skandasana.arms.parallel",
        "name": "Arms Parallel to Floor",
        "metric": "angle",
        "points": [
          13,
          11,
          12
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "target": 175,
        "tolerance": 15,
        "weight": 3,
        "severity": "medium",
        "feedback": "Extend arms parallel to the ground.",
        "isSafety": false
      },
      {
        "id": "side-lunge-skandasana.torso.vertical",
        "name": "Torso Centered",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Keep your torso upright without leaning forward.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      13,
      23,
      24,
      25,
      26,
      27,
      28
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "side-plank-vasishthasana.plank.line",
      "side-plank-vasishthasana.arms.stacked",
      "side-plank-vasishthasana.knees.straight",
      "side-plank-vasishthasana.hips.level"
    ],
    "isPremium": true,
    "orderIndex": 128,
    "aliases": [
      "side-plank",
      "vasishthasana"
    ],
    "rules": [
      {
        "id": "side-plank-vasishthasana.plank.line",
        "name": "Straight Plank Line",
        "metric": "angle",
        "points": [
          11,
          23,
          27
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 4,
        "severity": "high",
        "feedback": "Keep body in one straight line without sagging hips.",
        "isSafety": true
      },
      {
        "id": "side-plank-vasishthasana.arms.stacked",
        "name": "Arms Perpendicular",
        "metric": "angle",
        "points": [
          23,
          11,
          13
        ],
        "comparison": "between",
        "min": 75,
        "max": 105,
        "target": 90,
        "tolerance": 15,
        "weight": 3,
        "severity": "high",
        "feedback": "Stack shoulders directly over wrists.",
        "isSafety": false
      },
      {
        "id": "side-plank-vasishthasana.knees.straight",
        "name": "Legs Extended",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 2,
        "severity": "medium",
        "feedback": "Engage quads and press heels back.",
        "isSafety": false
      },
      {
        "id": "side-plank-vasishthasana.hips.level",
        "name": "Level Hips",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Prevent hips from twisting or dropping.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      13,
      23,
      24,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "sleeping-yogi-yoga-nidrasana.knee.straight",
      "sleeping-yogi-yoga-nidrasana.hip.alignment",
      "sleeping-yogi-yoga-nidrasana.spine.erect",
      "sleeping-yogi-yoga-nidrasana.shoulders.level"
    ],
    "isPremium": true,
    "orderIndex": 129,
    "aliases": [],
    "rules": [
      {
        "id": "sleeping-yogi-yoga-nidrasana.knee.straight",
        "name": "Legs Straight and Strong",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 4,
        "severity": "high",
        "feedback": "Engage thighs and straighten knees without hyperextending.",
        "isSafety": true
      },
      {
        "id": "sleeping-yogi-yoga-nidrasana.hip.alignment",
        "name": "Hips Over Ankles",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Stack hips over ankles and shoulders over hips.",
        "isSafety": false
      },
      {
        "id": "sleeping-yogi-yoga-nidrasana.spine.erect",
        "name": "Vertical Spine",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 3,
        "severity": "medium",
        "feedback": "Stand tall with elongated spine and open collarbones.",
        "isSafety": false
      },
      {
        "id": "sleeping-yogi-yoga-nidrasana.shoulders.level",
        "name": "Level Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "low",
        "feedback": "Relax shoulders evenly away from ears.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "snake-sarpasana.knee.straight",
      "snake-sarpasana.hip.alignment",
      "snake-sarpasana.spine.erect",
      "snake-sarpasana.shoulders.level"
    ],
    "isPremium": true,
    "orderIndex": 130,
    "aliases": [],
    "rules": [
      {
        "id": "snake-sarpasana.knee.straight",
        "name": "Legs Straight and Strong",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 4,
        "severity": "high",
        "feedback": "Engage thighs and straighten knees without hyperextending.",
        "isSafety": true
      },
      {
        "id": "snake-sarpasana.hip.alignment",
        "name": "Hips Over Ankles",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Stack hips over ankles and shoulders over hips.",
        "isSafety": false
      },
      {
        "id": "snake-sarpasana.spine.erect",
        "name": "Vertical Spine",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 3,
        "severity": "medium",
        "feedback": "Stand tall with elongated spine and open collarbones.",
        "isSafety": false
      },
      {
        "id": "snake-sarpasana.shoulders.level",
        "name": "Level Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "low",
        "feedback": "Relax shoulders evenly away from ears.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "sphinx-salamba-bhujangasana.chest.lift",
      "sphinx-salamba-bhujangasana.elbows.tuck",
      "sphinx-salamba-bhujangasana.legs.grounded",
      "sphinx-salamba-bhujangasana.shoulders.level"
    ],
    "isPremium": true,
    "orderIndex": 131,
    "aliases": [],
    "rules": [
      {
        "id": "sphinx-salamba-bhujangasana.chest.lift",
        "name": "Chest Elevation",
        "metric": "angle",
        "points": [
          0,
          11,
          23
        ],
        "comparison": "between",
        "min": 115,
        "max": 165,
        "target": 140,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Lift chest smoothly using back muscles without forcing.",
        "isSafety": true
      },
      {
        "id": "sphinx-salamba-bhujangasana.elbows.tuck",
        "name": "Elbows Bent and Tucked",
        "metric": "angle",
        "points": [
          11,
          13,
          15
        ],
        "comparison": "between",
        "min": 95,
        "max": 145,
        "target": 120,
        "tolerance": 25,
        "weight": 3,
        "severity": "high",
        "feedback": "Keep elbows close to your ribs with soft bend.",
        "isSafety": false
      },
      {
        "id": "sphinx-salamba-bhujangasana.legs.grounded",
        "name": "Legs Extended & Grounded",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 2,
        "severity": "medium",
        "feedback": "Press tops of feet and thighs firmly into mat.",
        "isSafety": false
      },
      {
        "id": "sphinx-salamba-bhujangasana.shoulders.level",
        "name": "Shoulders Down and Level",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "low",
        "feedback": "Roll shoulders back and away from ears.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      0,
      11,
      12,
      13,
      15,
      23,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "staff-dandasana.torso_legs.90",
      "staff-dandasana.knees.straight",
      "staff-dandasana.spine.vertical"
    ],
    "isPremium": true,
    "orderIndex": 132,
    "aliases": [],
    "rules": [
      {
        "id": "staff-dandasana.torso_legs.90",
        "name": "90° L-Sit Angle",
        "metric": "angle",
        "points": [
          11,
          23,
          27
        ],
        "comparison": "between",
        "min": 75,
        "max": 105,
        "target": 90,
        "tolerance": 15,
        "weight": 4,
        "severity": "high",
        "feedback": "Sit at a precise 90° angle with torso upright and legs straight.",
        "isSafety": true
      },
      {
        "id": "staff-dandasana.knees.straight",
        "name": "Legs Fully Grounded",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 165,
        "max": 180,
        "target": 175,
        "tolerance": 10,
        "weight": 3,
        "severity": "high",
        "feedback": "Press backs of knees and thighs flat to floor.",
        "isSafety": false
      },
      {
        "id": "staff-dandasana.spine.vertical",
        "name": "Vertical Spine",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 3,
        "severity": "medium",
        "feedback": "Lengthen spine tall out of pelvis.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      23,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "standing-bow-dandayamana-dhanurasana.bow.arc",
      "standing-bow-dandayamana-dhanurasana.knees.bent",
      "standing-bow-dandayamana-dhanurasana.chest.centered"
    ],
    "isPremium": true,
    "orderIndex": 133,
    "aliases": [],
    "rules": [
      {
        "id": "standing-bow-dandayamana-dhanurasana.bow.arc",
        "name": "Torso & Leg Bow Arc",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 100,
        "max": 150,
        "target": 125,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Kick feet into hands to lift chest and thighs off mat.",
        "isSafety": true
      },
      {
        "id": "standing-bow-dandayamana-dhanurasana.knees.bent",
        "name": "Knees Flexed",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 45,
        "max": 95,
        "target": 70,
        "tolerance": 25,
        "weight": 3,
        "severity": "high",
        "feedback": "Hold ankles firmly with knees hip-width apart.",
        "isSafety": false
      },
      {
        "id": "standing-bow-dandayamana-dhanurasana.chest.centered",
        "name": "Chest Balanced",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.09,
        "tolerance": 0.07,
        "weight": 2,
        "severity": "medium",
        "feedback": "Lift evenly through both shoulders.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "standing-foot-to-head-trivikramasana-a.knee.straight",
      "standing-foot-to-head-trivikramasana-a.hip.alignment",
      "standing-foot-to-head-trivikramasana-a.spine.erect",
      "standing-foot-to-head-trivikramasana-a.shoulders.level"
    ],
    "isPremium": true,
    "orderIndex": 134,
    "aliases": [],
    "rules": [
      {
        "id": "standing-foot-to-head-trivikramasana-a.knee.straight",
        "name": "Legs Straight and Strong",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 4,
        "severity": "high",
        "feedback": "Engage thighs and straighten knees without hyperextending.",
        "isSafety": true
      },
      {
        "id": "standing-foot-to-head-trivikramasana-a.hip.alignment",
        "name": "Hips Over Ankles",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Stack hips over ankles and shoulders over hips.",
        "isSafety": false
      },
      {
        "id": "standing-foot-to-head-trivikramasana-a.spine.erect",
        "name": "Vertical Spine",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 3,
        "severity": "medium",
        "feedback": "Stand tall with elongated spine and open collarbones.",
        "isSafety": false
      },
      {
        "id": "standing-foot-to-head-trivikramasana-a.shoulders.level",
        "name": "Level Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "low",
        "feedback": "Relax shoulders evenly away from ears.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "standing-forward-bend-uttanasana.hip.deep_fold",
      "standing-forward-bend-uttanasana.knee.straight",
      "standing-forward-bend-uttanasana.spine.elongation",
      "standing-forward-bend-uttanasana.pelvis.tilt"
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
        "id": "standing-forward-bend-uttanasana.hip.deep_fold",
        "name": "Deep Hip Flexion",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 30,
        "max": 80,
        "target": 55,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Fold deeply from the hips rather than rounding the back.",
        "isSafety": true
      },
      {
        "id": "standing-forward-bend-uttanasana.knee.straight",
        "name": "Legs Straight",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "target": 175,
        "tolerance": 15,
        "weight": 3,
        "severity": "high",
        "feedback": "Keep knees straight or with gentle microbend.",
        "isSafety": false
      },
      {
        "id": "standing-forward-bend-uttanasana.spine.elongation",
        "name": "Elongated Spine",
        "metric": "angle",
        "points": [
          0,
          11,
          23
        ],
        "comparison": "between",
        "min": 135,
        "max": 180,
        "target": 160,
        "tolerance": 25,
        "weight": 2,
        "severity": "medium",
        "feedback": "Reach crown of head toward toes with open chest.",
        "isSafety": false
      },
      {
        "id": "standing-forward-bend-uttanasana.pelvis.tilt",
        "name": "Pelvic Anterior Tilt",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "low",
        "feedback": "Keep pelvis square and balanced.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      0,
      11,
      23,
      24,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "standing-half-bound-lotus-forward-bend-ardha-baddha-padmottanasana.hip.deep_fold",
      "standing-half-bound-lotus-forward-bend-ardha-baddha-padmottanasana.knee.straight",
      "standing-half-bound-lotus-forward-bend-ardha-baddha-padmottanasana.spine.elongation",
      "standing-half-bound-lotus-forward-bend-ardha-baddha-padmottanasana.pelvis.tilt"
    ],
    "isPremium": true,
    "orderIndex": 136,
    "aliases": [],
    "rules": [
      {
        "id": "standing-half-bound-lotus-forward-bend-ardha-baddha-padmottanasana.hip.deep_fold",
        "name": "Deep Hip Flexion",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 30,
        "max": 80,
        "target": 55,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Fold deeply from the hips rather than rounding the back.",
        "isSafety": true
      },
      {
        "id": "standing-half-bound-lotus-forward-bend-ardha-baddha-padmottanasana.knee.straight",
        "name": "Legs Straight",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "target": 175,
        "tolerance": 15,
        "weight": 3,
        "severity": "high",
        "feedback": "Keep knees straight or with gentle microbend.",
        "isSafety": false
      },
      {
        "id": "standing-half-bound-lotus-forward-bend-ardha-baddha-padmottanasana.spine.elongation",
        "name": "Elongated Spine",
        "metric": "angle",
        "points": [
          0,
          11,
          23
        ],
        "comparison": "between",
        "min": 135,
        "max": 180,
        "target": 160,
        "tolerance": 25,
        "weight": 2,
        "severity": "medium",
        "feedback": "Reach crown of head toward toes with open chest.",
        "isSafety": false
      },
      {
        "id": "standing-half-bound-lotus-forward-bend-ardha-baddha-padmottanasana.pelvis.tilt",
        "name": "Pelvic Anterior Tilt",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "low",
        "feedback": "Keep pelvis square and balanced.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      0,
      11,
      23,
      24,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "standing-hand-to-big-toe-utthita-hasta-padangushthasana-a.knee.straight",
      "standing-hand-to-big-toe-utthita-hasta-padangushthasana-a.hip.alignment",
      "standing-hand-to-big-toe-utthita-hasta-padangushthasana-a.spine.erect",
      "standing-hand-to-big-toe-utthita-hasta-padangushthasana-a.shoulders.level"
    ],
    "isPremium": true,
    "orderIndex": 137,
    "aliases": [],
    "rules": [
      {
        "id": "standing-hand-to-big-toe-utthita-hasta-padangushthasana-a.knee.straight",
        "name": "Legs Straight and Strong",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 4,
        "severity": "high",
        "feedback": "Engage thighs and straighten knees without hyperextending.",
        "isSafety": true
      },
      {
        "id": "standing-hand-to-big-toe-utthita-hasta-padangushthasana-a.hip.alignment",
        "name": "Hips Over Ankles",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Stack hips over ankles and shoulders over hips.",
        "isSafety": false
      },
      {
        "id": "standing-hand-to-big-toe-utthita-hasta-padangushthasana-a.spine.erect",
        "name": "Vertical Spine",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 3,
        "severity": "medium",
        "feedback": "Stand tall with elongated spine and open collarbones.",
        "isSafety": false
      },
      {
        "id": "standing-hand-to-big-toe-utthita-hasta-padangushthasana-a.shoulders.level",
        "name": "Level Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "low",
        "feedback": "Relax shoulders evenly away from ears.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "standing-leg-behind-head-durvasasana.knee.straight",
      "standing-leg-behind-head-durvasasana.hip.alignment",
      "standing-leg-behind-head-durvasasana.spine.erect",
      "standing-leg-behind-head-durvasasana.shoulders.level"
    ],
    "isPremium": true,
    "orderIndex": 138,
    "aliases": [],
    "rules": [
      {
        "id": "standing-leg-behind-head-durvasasana.knee.straight",
        "name": "Legs Straight and Strong",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 4,
        "severity": "high",
        "feedback": "Engage thighs and straighten knees without hyperextending.",
        "isSafety": true
      },
      {
        "id": "standing-leg-behind-head-durvasasana.hip.alignment",
        "name": "Hips Over Ankles",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Stack hips over ankles and shoulders over hips.",
        "isSafety": false
      },
      {
        "id": "standing-leg-behind-head-durvasasana.spine.erect",
        "name": "Vertical Spine",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 3,
        "severity": "medium",
        "feedback": "Stand tall with elongated spine and open collarbones.",
        "isSafety": false
      },
      {
        "id": "standing-leg-behind-head-durvasasana.shoulders.level",
        "name": "Level Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "low",
        "feedback": "Relax shoulders evenly away from ears.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "standing-leg-behind-head-forward-bend-richikasana.hip.deep_fold",
      "standing-leg-behind-head-forward-bend-richikasana.knee.straight",
      "standing-leg-behind-head-forward-bend-richikasana.spine.elongation",
      "standing-leg-behind-head-forward-bend-richikasana.pelvis.tilt"
    ],
    "isPremium": true,
    "orderIndex": 139,
    "aliases": [],
    "rules": [
      {
        "id": "standing-leg-behind-head-forward-bend-richikasana.hip.deep_fold",
        "name": "Deep Hip Flexion",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 30,
        "max": 80,
        "target": 55,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Fold deeply from the hips rather than rounding the back.",
        "isSafety": true
      },
      {
        "id": "standing-leg-behind-head-forward-bend-richikasana.knee.straight",
        "name": "Legs Straight",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "target": 175,
        "tolerance": 15,
        "weight": 3,
        "severity": "high",
        "feedback": "Keep knees straight or with gentle microbend.",
        "isSafety": false
      },
      {
        "id": "standing-leg-behind-head-forward-bend-richikasana.spine.elongation",
        "name": "Elongated Spine",
        "metric": "angle",
        "points": [
          0,
          11,
          23
        ],
        "comparison": "between",
        "min": 135,
        "max": 180,
        "target": 160,
        "tolerance": 25,
        "weight": 2,
        "severity": "medium",
        "feedback": "Reach crown of head toward toes with open chest.",
        "isSafety": false
      },
      {
        "id": "standing-leg-behind-head-forward-bend-richikasana.pelvis.tilt",
        "name": "Pelvic Anterior Tilt",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "low",
        "feedback": "Keep pelvis square and balanced.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      0,
      11,
      23,
      24,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "standing-splits-urdhva-prasarita-eka-padasana.hip.deep_fold",
      "standing-splits-urdhva-prasarita-eka-padasana.knee.straight",
      "standing-splits-urdhva-prasarita-eka-padasana.spine.elongation",
      "standing-splits-urdhva-prasarita-eka-padasana.pelvis.tilt"
    ],
    "isPremium": true,
    "orderIndex": 140,
    "aliases": [],
    "rules": [
      {
        "id": "standing-splits-urdhva-prasarita-eka-padasana.hip.deep_fold",
        "name": "Deep Hip Flexion",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 30,
        "max": 80,
        "target": 55,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Fold deeply from the hips rather than rounding the back.",
        "isSafety": true
      },
      {
        "id": "standing-splits-urdhva-prasarita-eka-padasana.knee.straight",
        "name": "Legs Straight",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "target": 175,
        "tolerance": 15,
        "weight": 3,
        "severity": "high",
        "feedback": "Keep knees straight or with gentle microbend.",
        "isSafety": false
      },
      {
        "id": "standing-splits-urdhva-prasarita-eka-padasana.spine.elongation",
        "name": "Elongated Spine",
        "metric": "angle",
        "points": [
          0,
          11,
          23
        ],
        "comparison": "between",
        "min": 135,
        "max": 180,
        "target": 160,
        "tolerance": 25,
        "weight": 2,
        "severity": "medium",
        "feedback": "Reach crown of head toward toes with open chest.",
        "isSafety": false
      },
      {
        "id": "standing-splits-urdhva-prasarita-eka-padasana.pelvis.tilt",
        "name": "Pelvic Anterior Tilt",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "low",
        "feedback": "Keep pelvis square and balanced.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      0,
      11,
      23,
      24,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "star-utthita-tadasana.knee.straight",
      "star-utthita-tadasana.hip.alignment",
      "star-utthita-tadasana.spine.erect",
      "star-utthita-tadasana.shoulders.level"
    ],
    "isPremium": true,
    "orderIndex": 141,
    "aliases": [],
    "rules": [
      {
        "id": "star-utthita-tadasana.knee.straight",
        "name": "Legs Straight and Strong",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 4,
        "severity": "high",
        "feedback": "Engage thighs and straighten knees without hyperextending.",
        "isSafety": true
      },
      {
        "id": "star-utthita-tadasana.hip.alignment",
        "name": "Hips Over Ankles",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Stack hips over ankles and shoulders over hips.",
        "isSafety": false
      },
      {
        "id": "star-utthita-tadasana.spine.erect",
        "name": "Vertical Spine",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 3,
        "severity": "medium",
        "feedback": "Stand tall with elongated spine and open collarbones.",
        "isSafety": false
      },
      {
        "id": "star-utthita-tadasana.shoulders.level",
        "name": "Level Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "low",
        "feedback": "Relax shoulders evenly away from ears.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "supine-angle-supta-konasana.body.supine_line",
      "supine-angle-supta-konasana.shoulders.grounded",
      "supine-angle-supta-konasana.hips.grounded"
    ],
    "isPremium": true,
    "orderIndex": 142,
    "aliases": [],
    "rules": [
      {
        "id": "supine-angle-supta-konasana.body.supine_line",
        "name": "Supine Alignment",
        "metric": "angle",
        "points": [
          11,
          23,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "target": 175,
        "tolerance": 15,
        "weight": 3,
        "severity": "medium",
        "feedback": "Rest fully flat and symmetrical on the floor.",
        "isSafety": false
      },
      {
        "id": "supine-angle-supta-konasana.shoulders.grounded",
        "name": "Shoulders Relaxed & Grounded",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "medium",
        "feedback": "Let shoulders melt into the earth.",
        "isSafety": false
      },
      {
        "id": "supine-angle-supta-konasana.hips.grounded",
        "name": "Hips Grounded Evenly",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "low",
        "feedback": "Release pelvis with balanced symmetry.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "supine-foot-to-head-supta-trivikramasana.body.supine_line",
      "supine-foot-to-head-supta-trivikramasana.shoulders.grounded",
      "supine-foot-to-head-supta-trivikramasana.hips.grounded"
    ],
    "isPremium": true,
    "orderIndex": 143,
    "aliases": [],
    "rules": [
      {
        "id": "supine-foot-to-head-supta-trivikramasana.body.supine_line",
        "name": "Supine Alignment",
        "metric": "angle",
        "points": [
          11,
          23,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "target": 175,
        "tolerance": 15,
        "weight": 3,
        "severity": "medium",
        "feedback": "Rest fully flat and symmetrical on the floor.",
        "isSafety": false
      },
      {
        "id": "supine-foot-to-head-supta-trivikramasana.shoulders.grounded",
        "name": "Shoulders Relaxed & Grounded",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "medium",
        "feedback": "Let shoulders melt into the earth.",
        "isSafety": false
      },
      {
        "id": "supine-foot-to-head-supta-trivikramasana.hips.grounded",
        "name": "Hips Grounded Evenly",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "low",
        "feedback": "Release pelvis with balanced symmetry.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "supine-hand-to-big-toe-supta-padangushthasana-a.body.supine_line",
      "supine-hand-to-big-toe-supta-padangushthasana-a.shoulders.grounded",
      "supine-hand-to-big-toe-supta-padangushthasana-a.hips.grounded"
    ],
    "isPremium": true,
    "orderIndex": 144,
    "aliases": [],
    "rules": [
      {
        "id": "supine-hand-to-big-toe-supta-padangushthasana-a.body.supine_line",
        "name": "Supine Alignment",
        "metric": "angle",
        "points": [
          11,
          23,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "target": 175,
        "tolerance": 15,
        "weight": 3,
        "severity": "medium",
        "feedback": "Rest fully flat and symmetrical on the floor.",
        "isSafety": false
      },
      {
        "id": "supine-hand-to-big-toe-supta-padangushthasana-a.shoulders.grounded",
        "name": "Shoulders Relaxed & Grounded",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "medium",
        "feedback": "Let shoulders melt into the earth.",
        "isSafety": false
      },
      {
        "id": "supine-hand-to-big-toe-supta-padangushthasana-a.hips.grounded",
        "name": "Hips Grounded Evenly",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "low",
        "feedback": "Release pelvis with balanced symmetry.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "supine-straddle-supta-samakonasana.body.supine_line",
      "supine-straddle-supta-samakonasana.shoulders.grounded",
      "supine-straddle-supta-samakonasana.hips.grounded"
    ],
    "isPremium": true,
    "orderIndex": 145,
    "aliases": [],
    "rules": [
      {
        "id": "supine-straddle-supta-samakonasana.body.supine_line",
        "name": "Supine Alignment",
        "metric": "angle",
        "points": [
          11,
          23,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "target": 175,
        "tolerance": 15,
        "weight": 3,
        "severity": "medium",
        "feedback": "Rest fully flat and symmetrical on the floor.",
        "isSafety": false
      },
      {
        "id": "supine-straddle-supta-samakonasana.shoulders.grounded",
        "name": "Shoulders Relaxed & Grounded",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "medium",
        "feedback": "Let shoulders melt into the earth.",
        "isSafety": false
      },
      {
        "id": "supine-straddle-supta-samakonasana.hips.grounded",
        "name": "Hips Grounded Evenly",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "low",
        "feedback": "Release pelvis with balanced symmetry.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "supine-twist-supta-matsyendrasana.body.supine_line",
      "supine-twist-supta-matsyendrasana.shoulders.grounded",
      "supine-twist-supta-matsyendrasana.hips.grounded"
    ],
    "isPremium": true,
    "orderIndex": 146,
    "aliases": [],
    "rules": [
      {
        "id": "supine-twist-supta-matsyendrasana.body.supine_line",
        "name": "Supine Alignment",
        "metric": "angle",
        "points": [
          11,
          23,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "target": 175,
        "tolerance": 15,
        "weight": 3,
        "severity": "medium",
        "feedback": "Rest fully flat and symmetrical on the floor.",
        "isSafety": false
      },
      {
        "id": "supine-twist-supta-matsyendrasana.shoulders.grounded",
        "name": "Shoulders Relaxed & Grounded",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "medium",
        "feedback": "Let shoulders melt into the earth.",
        "isSafety": false
      },
      {
        "id": "supine-twist-supta-matsyendrasana.hips.grounded",
        "name": "Hips Grounded Evenly",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "low",
        "feedback": "Release pelvis with balanced symmetry.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "thunderbolt-vajrasana.hip.flexion",
      "thunderbolt-vajrasana.knee.fold",
      "thunderbolt-vajrasana.spine.erect",
      "thunderbolt-vajrasana.shoulder.relaxation"
    ],
    "isPremium": true,
    "orderIndex": 147,
    "aliases": [],
    "rules": [
      {
        "id": "thunderbolt-vajrasana.hip.flexion",
        "name": "Seated Hip Grounding",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 65,
        "max": 105,
        "target": 85,
        "tolerance": 20,
        "weight": 4,
        "severity": "high",
        "feedback": "Root both sit bones evenly into the mat.",
        "isSafety": true
      },
      {
        "id": "thunderbolt-vajrasana.knee.fold",
        "name": "Knee Fold Comfort",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 25,
        "max": 85,
        "target": 55,
        "tolerance": 30,
        "weight": 3,
        "severity": "medium",
        "feedback": "Fold legs comfortably in steady seated base.",
        "isSafety": false
      },
      {
        "id": "thunderbolt-vajrasana.spine.erect",
        "name": "Spine Length",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 3,
        "severity": "high",
        "feedback": "Sit tall with a straight, elongated spine.",
        "isSafety": false
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
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "low",
        "feedback": "Relax shoulders away from your ears.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "tiger-vyaghrasana.knee.straight",
      "tiger-vyaghrasana.hip.alignment",
      "tiger-vyaghrasana.spine.erect",
      "tiger-vyaghrasana.shoulders.level"
    ],
    "isPremium": true,
    "orderIndex": 148,
    "aliases": [],
    "rules": [
      {
        "id": "tiger-vyaghrasana.knee.straight",
        "name": "Legs Straight and Strong",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 4,
        "severity": "high",
        "feedback": "Engage thighs and straighten knees without hyperextending.",
        "isSafety": true
      },
      {
        "id": "tiger-vyaghrasana.hip.alignment",
        "name": "Hips Over Ankles",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Stack hips over ankles and shoulders over hips.",
        "isSafety": false
      },
      {
        "id": "tiger-vyaghrasana.spine.erect",
        "name": "Vertical Spine",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 3,
        "severity": "medium",
        "feedback": "Stand tall with elongated spine and open collarbones.",
        "isSafety": false
      },
      {
        "id": "tiger-vyaghrasana.shoulders.level",
        "name": "Level Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "low",
        "feedback": "Relax shoulders evenly away from ears.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "toe-stand-padangushthasana.knee.straight",
      "toe-stand-padangushthasana.hip.alignment",
      "toe-stand-padangushthasana.spine.erect",
      "toe-stand-padangushthasana.shoulders.level"
    ],
    "isPremium": true,
    "orderIndex": 149,
    "aliases": [],
    "rules": [
      {
        "id": "toe-stand-padangushthasana.knee.straight",
        "name": "Legs Straight and Strong",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 4,
        "severity": "high",
        "feedback": "Engage thighs and straighten knees without hyperextending.",
        "isSafety": true
      },
      {
        "id": "toe-stand-padangushthasana.hip.alignment",
        "name": "Hips Over Ankles",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Stack hips over ankles and shoulders over hips.",
        "isSafety": false
      },
      {
        "id": "toe-stand-padangushthasana.spine.erect",
        "name": "Vertical Spine",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 3,
        "severity": "medium",
        "feedback": "Stand tall with elongated spine and open collarbones.",
        "isSafety": false
      },
      {
        "id": "toe-stand-padangushthasana.shoulders.level",
        "name": "Level Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "low",
        "feedback": "Relax shoulders evenly away from ears.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "tortoise-kurmasana.knee.straight",
      "tortoise-kurmasana.hip.alignment",
      "tortoise-kurmasana.spine.erect",
      "tortoise-kurmasana.shoulders.level"
    ],
    "isPremium": true,
    "orderIndex": 150,
    "aliases": [],
    "rules": [
      {
        "id": "tortoise-kurmasana.knee.straight",
        "name": "Legs Straight and Strong",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 4,
        "severity": "high",
        "feedback": "Engage thighs and straighten knees without hyperextending.",
        "isSafety": true
      },
      {
        "id": "tortoise-kurmasana.hip.alignment",
        "name": "Hips Over Ankles",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Stack hips over ankles and shoulders over hips.",
        "isSafety": false
      },
      {
        "id": "tortoise-kurmasana.spine.erect",
        "name": "Vertical Spine",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 3,
        "severity": "medium",
        "feedback": "Stand tall with elongated spine and open collarbones.",
        "isSafety": false
      },
      {
        "id": "tortoise-kurmasana.shoulders.level",
        "name": "Level Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "low",
        "feedback": "Relax shoulders evenly away from ears.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "tree-vrksasana.standing_knee.straight",
      "tree-vrksasana.bent_knee.abduction",
      "tree-vrksasana.foot_to_thigh",
      "tree-vrksasana.spine.upright"
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
        "id": "tree-vrksasana.standing_knee.straight",
        "name": "Standing Leg Straight",
        "metric": "angle",
        "points": [
          24,
          26,
          28
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 4,
        "severity": "high",
        "feedback": "Keep standing leg straight and firmly grounded.",
        "isSafety": true
      },
      {
        "id": "tree-vrksasana.bent_knee.abduction",
        "name": "Bent Knee Open",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 35,
        "max": 75,
        "target": 55,
        "tolerance": 20,
        "weight": 3,
        "severity": "high",
        "feedback": "Turn your bent knee outward to open the hip.",
        "isSafety": false
      },
      {
        "id": "tree-vrksasana.foot_to_thigh",
        "name": "Foot Grounded on Thigh",
        "metric": "distance",
        "points": [
          27,
          26
        ],
        "comparison": "less_than",
        "target": 0.16,
        "tolerance": 0.08,
        "weight": 3,
        "severity": "medium",
        "feedback": "Place sole of foot firmly against inner thigh or calf."
      },
      {
        "id": "tree-vrksasana.spine.upright",
        "name": "Upright Spine",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Lengthen your spine tall through the crown of your head.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      23,
      24,
      25,
      26,
      27,
      28
    ],
    "validation": {
      "status": "production",
      "version": "1.2.0",
      "sampleCount": 50,
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
      "triangle-trikonasana.front_knee.straight",
      "triangle-trikonasana.back_knee.straight",
      "triangle-trikonasana.arms.vertical_line",
      "triangle-trikonasana.hip.lateral_hinge"
    ],
    "isPremium": false,
    "orderIndex": 152,
    "aliases": [
      "triangle-pose",
      "trikonasana"
    ],
    "rules": [
      {
        "id": "triangle-trikonasana.front_knee.straight",
        "name": "Front Leg Straight",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 4,
        "severity": "high",
        "feedback": "Keep both legs straight and quad engaged.",
        "isSafety": true
      },
      {
        "id": "triangle-trikonasana.back_knee.straight",
        "name": "Back Leg Straight",
        "metric": "angle",
        "points": [
          24,
          26,
          28
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Anchor firmly through straight back leg.",
        "isSafety": false
      },
      {
        "id": "triangle-trikonasana.arms.vertical_line",
        "name": "Arms in Straight Line",
        "metric": "angle",
        "points": [
          15,
          11,
          16
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "target": 175,
        "tolerance": 15,
        "weight": 3,
        "severity": "medium",
        "feedback": "Extend arms vertically in a single line.",
        "isSafety": false
      },
      {
        "id": "triangle-trikonasana.hip.lateral_hinge",
        "name": "Side Lateral Hinge",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 95,
        "max": 145,
        "target": 120,
        "tolerance": 25,
        "weight": 2,
        "severity": "medium",
        "feedback": "Hinge directly sideways over your front leg.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
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
      "status": "draft",
      "version": "1.2.0",
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
      "tripod-headstand-mukta-hasta-shirshasana-a.body.vertical_line",
      "tripod-headstand-mukta-hasta-shirshasana-a.core.stability",
      "tripod-headstand-mukta-hasta-shirshasana-a.hip.level"
    ],
    "isPremium": true,
    "orderIndex": 153,
    "aliases": [],
    "rules": [
      {
        "id": "tripod-headstand-mukta-hasta-shirshasana-a.body.vertical_line",
        "name": "Inverted Vertical Line",
        "metric": "angle",
        "points": [
          11,
          23,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "target": 175,
        "tolerance": 15,
        "weight": 4,
        "severity": "high",
        "feedback": "Align legs, hips, and shoulders in a single vertical line.",
        "isSafety": true
      },
      {
        "id": "tripod-headstand-mukta-hasta-shirshasana-a.core.stability",
        "name": "Core Engagement",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Engage core to maintain stable vertical axis.",
        "isSafety": false
      },
      {
        "id": "tripod-headstand-mukta-hasta-shirshasana-a.hip.level",
        "name": "Level Inverted Hips",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Keep pelvis level without tilting.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      23,
      24,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "two-legs-behind-the-head-i-dvi-pada-shirshasana-a.knee.straight",
      "two-legs-behind-the-head-i-dvi-pada-shirshasana-a.hip.alignment",
      "two-legs-behind-the-head-i-dvi-pada-shirshasana-a.spine.erect",
      "two-legs-behind-the-head-i-dvi-pada-shirshasana-a.shoulders.level"
    ],
    "isPremium": true,
    "orderIndex": 154,
    "aliases": [],
    "rules": [
      {
        "id": "two-legs-behind-the-head-i-dvi-pada-shirshasana-a.knee.straight",
        "name": "Legs Straight and Strong",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 4,
        "severity": "high",
        "feedback": "Engage thighs and straighten knees without hyperextending.",
        "isSafety": true
      },
      {
        "id": "two-legs-behind-the-head-i-dvi-pada-shirshasana-a.hip.alignment",
        "name": "Hips Over Ankles",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Stack hips over ankles and shoulders over hips.",
        "isSafety": false
      },
      {
        "id": "two-legs-behind-the-head-i-dvi-pada-shirshasana-a.spine.erect",
        "name": "Vertical Spine",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 3,
        "severity": "medium",
        "feedback": "Stand tall with elongated spine and open collarbones.",
        "isSafety": false
      },
      {
        "id": "two-legs-behind-the-head-i-dvi-pada-shirshasana-a.shoulders.level",
        "name": "Level Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "low",
        "feedback": "Relax shoulders evenly away from ears.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "two-legs-behind-the-head-ii-dvi-pada-shirshasana-b.knee.straight",
      "two-legs-behind-the-head-ii-dvi-pada-shirshasana-b.hip.alignment",
      "two-legs-behind-the-head-ii-dvi-pada-shirshasana-b.spine.erect",
      "two-legs-behind-the-head-ii-dvi-pada-shirshasana-b.shoulders.level"
    ],
    "isPremium": true,
    "orderIndex": 155,
    "aliases": [],
    "rules": [
      {
        "id": "two-legs-behind-the-head-ii-dvi-pada-shirshasana-b.knee.straight",
        "name": "Legs Straight and Strong",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 4,
        "severity": "high",
        "feedback": "Engage thighs and straighten knees without hyperextending.",
        "isSafety": true
      },
      {
        "id": "two-legs-behind-the-head-ii-dvi-pada-shirshasana-b.hip.alignment",
        "name": "Hips Over Ankles",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Stack hips over ankles and shoulders over hips.",
        "isSafety": false
      },
      {
        "id": "two-legs-behind-the-head-ii-dvi-pada-shirshasana-b.spine.erect",
        "name": "Vertical Spine",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 3,
        "severity": "medium",
        "feedback": "Stand tall with elongated spine and open collarbones.",
        "isSafety": false
      },
      {
        "id": "two-legs-behind-the-head-ii-dvi-pada-shirshasana-b.shoulders.level",
        "name": "Level Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "low",
        "feedback": "Relax shoulders evenly away from ears.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "upward-facing-dog-urdhva-mukha-shvanasana.spine.backbend_arch",
      "upward-facing-dog-urdhva-mukha-shvanasana.chest.opening",
      "upward-facing-dog-urdhva-mukha-shvanasana.shoulder.symmetry"
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
        "id": "upward-facing-dog-urdhva-mukha-shvanasana.spine.backbend_arch",
        "name": "Spine Arch Extension",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 120,
        "max": 170,
        "target": 145,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Arch smoothly through the entire spine.",
        "isSafety": true
      },
      {
        "id": "upward-facing-dog-urdhva-mukha-shvanasana.chest.opening",
        "name": "Chest Expansion",
        "metric": "angle",
        "points": [
          0,
          11,
          23
        ],
        "comparison": "between",
        "min": 110,
        "max": 160,
        "target": 135,
        "tolerance": 25,
        "weight": 3,
        "severity": "high",
        "feedback": "Expand chest and broaden collarbones.",
        "isSafety": false
      },
      {
        "id": "upward-facing-dog-urdhva-mukha-shvanasana.shoulder.symmetry",
        "name": "Symmetrical Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Keep shoulders even and relaxed.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      0,
      11,
      12,
      23,
      25
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "upward-plank-purvottanasana.plank.line",
      "upward-plank-purvottanasana.arms.stacked",
      "upward-plank-purvottanasana.knees.straight",
      "upward-plank-purvottanasana.hips.level"
    ],
    "isPremium": true,
    "orderIndex": 157,
    "aliases": [],
    "rules": [
      {
        "id": "upward-plank-purvottanasana.plank.line",
        "name": "Straight Plank Line",
        "metric": "angle",
        "points": [
          11,
          23,
          27
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 4,
        "severity": "high",
        "feedback": "Keep body in one straight line without sagging hips.",
        "isSafety": true
      },
      {
        "id": "upward-plank-purvottanasana.arms.stacked",
        "name": "Arms Perpendicular",
        "metric": "angle",
        "points": [
          23,
          11,
          13
        ],
        "comparison": "between",
        "min": 75,
        "max": 105,
        "target": 90,
        "tolerance": 15,
        "weight": 3,
        "severity": "high",
        "feedback": "Stack shoulders directly over wrists.",
        "isSafety": false
      },
      {
        "id": "upward-plank-purvottanasana.knees.straight",
        "name": "Legs Extended",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 2,
        "severity": "medium",
        "feedback": "Engage quads and press heels back.",
        "isSafety": false
      },
      {
        "id": "upward-plank-purvottanasana.hips.level",
        "name": "Level Hips",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Prevent hips from twisting or dropping.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      13,
      23,
      24,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "warrior-i-virabhadrasana-a.front_knee.angle",
      "warrior-i-virabhadrasana-a.back_knee.straight",
      "warrior-i-virabhadrasana-a.arms.overhead",
      "warrior-i-virabhadrasana-a.torso.upright"
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
        "id": "warrior-i-virabhadrasana-a.front_knee.angle",
        "name": "Front Knee 90°",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 75,
        "max": 105,
        "target": 90,
        "tolerance": 15,
        "weight": 4,
        "severity": "high",
        "feedback": "Bend your front knee directly over your ankle at 90°.",
        "isSafety": true
      },
      {
        "id": "warrior-i-virabhadrasana-a.back_knee.straight",
        "name": "Back Leg Straight",
        "metric": "angle",
        "points": [
          24,
          26,
          28
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Keep your back leg straight with your heel grounded.",
        "isSafety": false
      },
      {
        "id": "warrior-i-virabhadrasana-a.arms.overhead",
        "name": "Arms Raised Overhead",
        "metric": "angle",
        "points": [
          23,
          11,
          13
        ],
        "comparison": "between",
        "min": 155,
        "max": 180,
        "target": 170,
        "tolerance": 15,
        "weight": 2,
        "severity": "medium",
        "feedback": "Extend both arms straight overhead.",
        "isSafety": false
      },
      {
        "id": "warrior-i-virabhadrasana-a.torso.upright",
        "name": "Upright Spine",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Lift your torso tall out of your hips.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      13,
      23,
      24,
      25,
      26,
      27,
      28
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
        "feedback": "Extend your left arm straight out to the side — reach through your fingertips."
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
        "feedback": "Extend your right arm straight out to the side — reach through your fingertips."
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
        "feedback": "Bend your front knee toward 90 degrees — stack it directly over your ankle."
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
        "feedback": "Keep your back leg straight — press through the outer edge of your foot."
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
        "feedback": "Keep hips open and stable — square them toward the side of the room."
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
      "version": "1.2.0",
      "sampleCount": 50,
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
      "warrior-iii-virabhadrasana-c.standing_knee.straight",
      "warrior-iii-virabhadrasana-c.lifted_hip.extension",
      "warrior-iii-virabhadrasana-c.torso.horizontal",
      "warrior-iii-virabhadrasana-c.hip.level"
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
        "id": "warrior-iii-virabhadrasana-c.standing_knee.straight",
        "name": "Standing Leg Straight",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Keep your standing leg strong with a straight knee.",
        "isSafety": true
      },
      {
        "id": "warrior-iii-virabhadrasana-c.lifted_hip.extension",
        "name": "Lifted Leg Parallel",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "target": 175,
        "tolerance": 15,
        "weight": 3,
        "severity": "high",
        "feedback": "Extend your lifted leg straight back in line with your spine.",
        "isSafety": false
      },
      {
        "id": "warrior-iii-virabhadrasana-c.torso.horizontal",
        "name": "Torso Horizontal",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "target": 175,
        "tolerance": 15,
        "weight": 2,
        "severity": "medium",
        "feedback": "Keep your torso and lifted leg parallel to the ground.",
        "isSafety": false
      },
      {
        "id": "warrior-iii-virabhadrasana-c.hip.level",
        "name": "Level Hips",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Square your hips toward the floor.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      23,
      24,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "waterfall-supta-dandasana.body.supine_line",
      "waterfall-supta-dandasana.shoulders.grounded",
      "waterfall-supta-dandasana.hips.grounded"
    ],
    "isPremium": true,
    "orderIndex": 161,
    "aliases": [],
    "rules": [
      {
        "id": "waterfall-supta-dandasana.body.supine_line",
        "name": "Supine Alignment",
        "metric": "angle",
        "points": [
          11,
          23,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "target": 175,
        "tolerance": 15,
        "weight": 3,
        "severity": "medium",
        "feedback": "Rest fully flat and symmetrical on the floor.",
        "isSafety": false
      },
      {
        "id": "waterfall-supta-dandasana.shoulders.grounded",
        "name": "Shoulders Relaxed & Grounded",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "medium",
        "feedback": "Let shoulders melt into the earth.",
        "isSafety": false
      },
      {
        "id": "waterfall-supta-dandasana.hips.grounded",
        "name": "Hips Grounded Evenly",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "low",
        "feedback": "Release pelvis with balanced symmetry.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "wheel-urdhva-dhanurasana.bow.arc",
      "wheel-urdhva-dhanurasana.knees.bent",
      "wheel-urdhva-dhanurasana.chest.centered"
    ],
    "isPremium": true,
    "orderIndex": 162,
    "aliases": [],
    "rules": [
      {
        "id": "wheel-urdhva-dhanurasana.bow.arc",
        "name": "Torso & Leg Bow Arc",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 100,
        "max": 150,
        "target": 125,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Kick feet into hands to lift chest and thighs off mat.",
        "isSafety": true
      },
      {
        "id": "wheel-urdhva-dhanurasana.knees.bent",
        "name": "Knees Flexed",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 45,
        "max": 95,
        "target": 70,
        "tolerance": 25,
        "weight": 3,
        "severity": "high",
        "feedback": "Hold ankles firmly with knees hip-width apart.",
        "isSafety": false
      },
      {
        "id": "wheel-urdhva-dhanurasana.chest.centered",
        "name": "Chest Balanced",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.09,
        "tolerance": 0.07,
        "weight": 2,
        "severity": "medium",
        "feedback": "Lift evenly through both shoulders.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "wide-angle-seated-forward-bend-upavistha-konasana.hip.deep_fold",
      "wide-angle-seated-forward-bend-upavistha-konasana.knee.straight",
      "wide-angle-seated-forward-bend-upavistha-konasana.spine.elongation",
      "wide-angle-seated-forward-bend-upavistha-konasana.pelvis.tilt"
    ],
    "isPremium": true,
    "orderIndex": 163,
    "aliases": [],
    "rules": [
      {
        "id": "wide-angle-seated-forward-bend-upavistha-konasana.hip.deep_fold",
        "name": "Deep Hip Flexion",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 30,
        "max": 80,
        "target": 55,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Fold deeply from the hips rather than rounding the back.",
        "isSafety": true
      },
      {
        "id": "wide-angle-seated-forward-bend-upavistha-konasana.knee.straight",
        "name": "Legs Straight",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "target": 175,
        "tolerance": 15,
        "weight": 3,
        "severity": "high",
        "feedback": "Keep knees straight or with gentle microbend.",
        "isSafety": false
      },
      {
        "id": "wide-angle-seated-forward-bend-upavistha-konasana.spine.elongation",
        "name": "Elongated Spine",
        "metric": "angle",
        "points": [
          0,
          11,
          23
        ],
        "comparison": "between",
        "min": 135,
        "max": 180,
        "target": 160,
        "tolerance": 25,
        "weight": 2,
        "severity": "medium",
        "feedback": "Reach crown of head toward toes with open chest.",
        "isSafety": false
      },
      {
        "id": "wide-angle-seated-forward-bend-upavistha-konasana.pelvis.tilt",
        "name": "Pelvic Anterior Tilt",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "low",
        "feedback": "Keep pelvis square and balanced.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      0,
      11,
      23,
      24,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "wide-legged-forward-bend-i-prasarita-padottanasana-a.hip.deep_fold",
      "wide-legged-forward-bend-i-prasarita-padottanasana-a.knee.straight",
      "wide-legged-forward-bend-i-prasarita-padottanasana-a.spine.elongation",
      "wide-legged-forward-bend-i-prasarita-padottanasana-a.pelvis.tilt"
    ],
    "isPremium": true,
    "orderIndex": 164,
    "aliases": [],
    "rules": [
      {
        "id": "wide-legged-forward-bend-i-prasarita-padottanasana-a.hip.deep_fold",
        "name": "Deep Hip Flexion",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 30,
        "max": 80,
        "target": 55,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Fold deeply from the hips rather than rounding the back.",
        "isSafety": true
      },
      {
        "id": "wide-legged-forward-bend-i-prasarita-padottanasana-a.knee.straight",
        "name": "Legs Straight",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "target": 175,
        "tolerance": 15,
        "weight": 3,
        "severity": "high",
        "feedback": "Keep knees straight or with gentle microbend.",
        "isSafety": false
      },
      {
        "id": "wide-legged-forward-bend-i-prasarita-padottanasana-a.spine.elongation",
        "name": "Elongated Spine",
        "metric": "angle",
        "points": [
          0,
          11,
          23
        ],
        "comparison": "between",
        "min": 135,
        "max": 180,
        "target": 160,
        "tolerance": 25,
        "weight": 2,
        "severity": "medium",
        "feedback": "Reach crown of head toward toes with open chest.",
        "isSafety": false
      },
      {
        "id": "wide-legged-forward-bend-i-prasarita-padottanasana-a.pelvis.tilt",
        "name": "Pelvic Anterior Tilt",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "low",
        "feedback": "Keep pelvis square and balanced.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      0,
      11,
      23,
      24,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "wide-legged-forward-bend-ii-prasarita-padottanasana-b.hip.deep_fold",
      "wide-legged-forward-bend-ii-prasarita-padottanasana-b.knee.straight",
      "wide-legged-forward-bend-ii-prasarita-padottanasana-b.spine.elongation",
      "wide-legged-forward-bend-ii-prasarita-padottanasana-b.pelvis.tilt"
    ],
    "isPremium": true,
    "orderIndex": 165,
    "aliases": [],
    "rules": [
      {
        "id": "wide-legged-forward-bend-ii-prasarita-padottanasana-b.hip.deep_fold",
        "name": "Deep Hip Flexion",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 30,
        "max": 80,
        "target": 55,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Fold deeply from the hips rather than rounding the back.",
        "isSafety": true
      },
      {
        "id": "wide-legged-forward-bend-ii-prasarita-padottanasana-b.knee.straight",
        "name": "Legs Straight",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "target": 175,
        "tolerance": 15,
        "weight": 3,
        "severity": "high",
        "feedback": "Keep knees straight or with gentle microbend.",
        "isSafety": false
      },
      {
        "id": "wide-legged-forward-bend-ii-prasarita-padottanasana-b.spine.elongation",
        "name": "Elongated Spine",
        "metric": "angle",
        "points": [
          0,
          11,
          23
        ],
        "comparison": "between",
        "min": 135,
        "max": 180,
        "target": 160,
        "tolerance": 25,
        "weight": 2,
        "severity": "medium",
        "feedback": "Reach crown of head toward toes with open chest.",
        "isSafety": false
      },
      {
        "id": "wide-legged-forward-bend-ii-prasarita-padottanasana-b.pelvis.tilt",
        "name": "Pelvic Anterior Tilt",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "low",
        "feedback": "Keep pelvis square and balanced.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      0,
      11,
      23,
      24,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "wide-legged-forward-bend-iii-prasarita-padottanasana-c.hip.deep_fold",
      "wide-legged-forward-bend-iii-prasarita-padottanasana-c.knee.straight",
      "wide-legged-forward-bend-iii-prasarita-padottanasana-c.spine.elongation",
      "wide-legged-forward-bend-iii-prasarita-padottanasana-c.pelvis.tilt"
    ],
    "isPremium": true,
    "orderIndex": 166,
    "aliases": [],
    "rules": [
      {
        "id": "wide-legged-forward-bend-iii-prasarita-padottanasana-c.hip.deep_fold",
        "name": "Deep Hip Flexion",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 30,
        "max": 80,
        "target": 55,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Fold deeply from the hips rather than rounding the back.",
        "isSafety": true
      },
      {
        "id": "wide-legged-forward-bend-iii-prasarita-padottanasana-c.knee.straight",
        "name": "Legs Straight",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "target": 175,
        "tolerance": 15,
        "weight": 3,
        "severity": "high",
        "feedback": "Keep knees straight or with gentle microbend.",
        "isSafety": false
      },
      {
        "id": "wide-legged-forward-bend-iii-prasarita-padottanasana-c.spine.elongation",
        "name": "Elongated Spine",
        "metric": "angle",
        "points": [
          0,
          11,
          23
        ],
        "comparison": "between",
        "min": 135,
        "max": 180,
        "target": 160,
        "tolerance": 25,
        "weight": 2,
        "severity": "medium",
        "feedback": "Reach crown of head toward toes with open chest.",
        "isSafety": false
      },
      {
        "id": "wide-legged-forward-bend-iii-prasarita-padottanasana-c.pelvis.tilt",
        "name": "Pelvic Anterior Tilt",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "low",
        "feedback": "Keep pelvis square and balanced.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      0,
      11,
      23,
      24,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "wide-legged-forward-bend-iv-prasarita-padottanasana-d.hip.deep_fold",
      "wide-legged-forward-bend-iv-prasarita-padottanasana-d.knee.straight",
      "wide-legged-forward-bend-iv-prasarita-padottanasana-d.spine.elongation",
      "wide-legged-forward-bend-iv-prasarita-padottanasana-d.pelvis.tilt"
    ],
    "isPremium": true,
    "orderIndex": 167,
    "aliases": [],
    "rules": [
      {
        "id": "wide-legged-forward-bend-iv-prasarita-padottanasana-d.hip.deep_fold",
        "name": "Deep Hip Flexion",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 30,
        "max": 80,
        "target": 55,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Fold deeply from the hips rather than rounding the back.",
        "isSafety": true
      },
      {
        "id": "wide-legged-forward-bend-iv-prasarita-padottanasana-d.knee.straight",
        "name": "Legs Straight",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "target": 175,
        "tolerance": 15,
        "weight": 3,
        "severity": "high",
        "feedback": "Keep knees straight or with gentle microbend.",
        "isSafety": false
      },
      {
        "id": "wide-legged-forward-bend-iv-prasarita-padottanasana-d.spine.elongation",
        "name": "Elongated Spine",
        "metric": "angle",
        "points": [
          0,
          11,
          23
        ],
        "comparison": "between",
        "min": 135,
        "max": 180,
        "target": 160,
        "tolerance": 25,
        "weight": 2,
        "severity": "medium",
        "feedback": "Reach crown of head toward toes with open chest.",
        "isSafety": false
      },
      {
        "id": "wide-legged-forward-bend-iv-prasarita-padottanasana-d.pelvis.tilt",
        "name": "Pelvic Anterior Tilt",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "low",
        "feedback": "Keep pelvis square and balanced.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      0,
      11,
      23,
      24,
      25,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "wide-splits-samakonasana.knee.straight",
      "wide-splits-samakonasana.hip.alignment",
      "wide-splits-samakonasana.spine.erect",
      "wide-splits-samakonasana.shoulders.level"
    ],
    "isPremium": true,
    "orderIndex": 168,
    "aliases": [],
    "rules": [
      {
        "id": "wide-splits-samakonasana.knee.straight",
        "name": "Legs Straight and Strong",
        "metric": "angle",
        "points": [
          23,
          25,
          27
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 4,
        "severity": "high",
        "feedback": "Engage thighs and straighten knees without hyperextending.",
        "isSafety": true
      },
      {
        "id": "wide-splits-samakonasana.hip.alignment",
        "name": "Hips Over Ankles",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 163,
        "max": 180,
        "target": 175,
        "tolerance": 12,
        "weight": 3,
        "severity": "high",
        "feedback": "Stack hips over ankles and shoulders over hips.",
        "isSafety": false
      },
      {
        "id": "wide-splits-samakonasana.spine.erect",
        "name": "Vertical Spine",
        "metric": "vertical_alignment",
        "points": [
          11,
          23
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 3,
        "severity": "medium",
        "feedback": "Stand tall with elongated spine and open collarbones.",
        "isSafety": false
      },
      {
        "id": "wide-splits-samakonasana.shoulders.level",
        "name": "Level Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "low",
        "feedback": "Relax shoulders evenly away from ears.",
        "isSafety": false
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
      "version": "1.2.0",
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
      "wild-thing-chamatkarasana.spine.backbend_arch",
      "wild-thing-chamatkarasana.chest.opening",
      "wild-thing-chamatkarasana.shoulder.symmetry"
    ],
    "isPremium": true,
    "orderIndex": 169,
    "aliases": [],
    "rules": [
      {
        "id": "wild-thing-chamatkarasana.spine.backbend_arch",
        "name": "Spine Arch Extension",
        "metric": "angle",
        "points": [
          11,
          23,
          25
        ],
        "comparison": "between",
        "min": 120,
        "max": 170,
        "target": 145,
        "tolerance": 25,
        "weight": 4,
        "severity": "high",
        "feedback": "Arch smoothly through the entire spine.",
        "isSafety": true
      },
      {
        "id": "wild-thing-chamatkarasana.chest.opening",
        "name": "Chest Expansion",
        "metric": "angle",
        "points": [
          0,
          11,
          23
        ],
        "comparison": "between",
        "min": 110,
        "max": 160,
        "target": 135,
        "tolerance": 25,
        "weight": 3,
        "severity": "high",
        "feedback": "Expand chest and broaden collarbones.",
        "isSafety": false
      },
      {
        "id": "wild-thing-chamatkarasana.shoulder.symmetry",
        "name": "Symmetrical Shoulders",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.08,
        "tolerance": 0.06,
        "weight": 2,
        "severity": "medium",
        "feedback": "Keep shoulders even and relaxed.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      0,
      11,
      12,
      23,
      25
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
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
      "wind-removing-pavanamuktasana.body.supine_line",
      "wind-removing-pavanamuktasana.shoulders.grounded",
      "wind-removing-pavanamuktasana.hips.grounded"
    ],
    "isPremium": true,
    "orderIndex": 170,
    "aliases": [],
    "rules": [
      {
        "id": "wind-removing-pavanamuktasana.body.supine_line",
        "name": "Supine Alignment",
        "metric": "angle",
        "points": [
          11,
          23,
          27
        ],
        "comparison": "between",
        "min": 160,
        "max": 180,
        "target": 175,
        "tolerance": 15,
        "weight": 3,
        "severity": "medium",
        "feedback": "Rest fully flat and symmetrical on the floor.",
        "isSafety": false
      },
      {
        "id": "wind-removing-pavanamuktasana.shoulders.grounded",
        "name": "Shoulders Relaxed & Grounded",
        "metric": "horizontal_alignment",
        "points": [
          11,
          12
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "medium",
        "feedback": "Let shoulders melt into the earth.",
        "isSafety": false
      },
      {
        "id": "wind-removing-pavanamuktasana.hips.grounded",
        "name": "Hips Grounded Evenly",
        "metric": "horizontal_alignment",
        "points": [
          23,
          24
        ],
        "comparison": "less_than",
        "target": 0.07,
        "tolerance": 0.05,
        "weight": 2,
        "severity": "low",
        "feedback": "Release pelvis with balanced symmetry.",
        "isSafety": false
      }
    ],
    "requiredLandmarks": [
      11,
      12,
      23,
      24,
      27
    ],
    "validation": {
      "status": "draft",
      "version": "1.2.0",
      "sampleCount": 0,
      "expertReviewed": false
    }
  }
];
