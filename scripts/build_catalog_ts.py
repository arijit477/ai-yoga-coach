import json
import os

with open('normalized_asanas_inventory.json', 'r', encoding='utf-8') as f:
    asanas = json.load(f)

# Base Supabase Storage URL
SUPABASE_STORAGE_URL = "https://gelmugbsyhgcluqigrad.supabase.co/storage/v1/object/public/asana-images/yogaverse-model-asanas-beach"
STORAGE_PREFIX = "yogaverse-model-asanas-beach"

# Known aliases map
ALIASES_MAP = {
    "mountain-tadasana": ["mountain-pose", "tadasana", "step-1-pranamasana-namaskar", "step-12-mountain-tadasana"],
    "tree-vrksasana": ["tree-pose", "vrksasana", "tree"],
    "warrior-ii-virabhadrasana-ii": ["warrior-ii", "virabhadrasana-ii", "virabhadrasana-2"],
    "warrior-i-virabhadrasana-a": ["warrior-i", "virabhadrasana-i", "virabhadrasana-1"],
    "warrior-iii-virabhadrasana-c": ["warrior-iii", "virabhadrasana-iii", "virabhadrasana-3"],
    "cobra-bhujangasana": ["cobra-pose", "bhujangasana", "step-7-cobra-bhujangasana"],
    "childs-pose-balasana": ["childs-pose", "balasana", "child-pose"],
    "boat-navasana": ["boat-pose", "navasana"],
    "chair-utkatasana": ["chair-pose", "utkatasana"],
    "downward-dog-adho-mukha-svanasana": ["downward-dog", "downward-facing-dog", "adho-mukha-svanasana", "step-5-downward-dog-adho-mukha-svanasana", "step-8-downward-dog-adho-mukha-svanasana"],
    "plank-phalakasana": ["plank", "phalakasana"],
    "triangle-trikonasana": ["triangle-pose", "trikonasana"],
    "bridge-setu-bandha-sarvangasana": ["bridge-pose", "setu-bandhasana", "setu-bandha-sarvangasana"],
    "corpse-savasana": ["corpse-pose", "savasana", "shavasana"],
    "easy-sukhasana": ["easy-pose", "sukhasana"],
    "hero-virasana": ["hero-pose", "virasana"],
    "lotus-padmasana": ["lotus-pose", "padmasana"],
    "standing-forward-bend-uttanasana": ["standing-forward-bend", "uttanasana", "step-3-forward-fold-padahastasana", "step-10-standing-forward-bend-padahastasana"],
    "half-moon-ardha-chandrasana": ["half-moon", "ardha-chandrasana"],
    "extended-side-angle-utthita-parshvakonasana": ["extended-side-angle", "utthita-parshvakonasana"],
    "side-plank-vasishthasana": ["side-plank", "vasishthasana"],
    "upward-facing-dog-urdhva-mukha-shvanasana": ["upward-facing-dog", "upward-dog", "urdhva-mukha-shvanasana"],
    "four-limbed-staff-chaturanga": ["low-push-up-chaturanga-dandasana", "chaturanga-dandasana", "chaturanga"],
    "low-push-up-chaturanga-dandasana": ["chaturanga-dandasana", "chaturanga", "four-limbed-staff"],
    "lunge-runner": ["step-4-low-lunge-ashwa-sanchalanasana", "step-9-low-lunge-ashwa-sanchalanasana", "ashwa-sanchalanasana"],
    "crescent-lunge-on-knee-anjaneyasana": ["anjaneyasana", "low-lunge"],
    "eight-point-ashtangasana": ["step-6-eight-limbed-ashtanga-namaskara", "ashtangasana", "ashtanga-namaskara"],
}

# Free beginners asana IDs
FREE_ASANA_IDS = [
    "warrior-ii-virabhadrasana-ii",
    "mountain-tadasana",
    "tree-vrksasana",
    "cobra-bhujangasana",
    "childs-pose-balasana",
    "chair-utkatasana",
    "boat-navasana",
    "downward-dog-adho-mukha-svanasana",
    "bridge-setu-bandha-sarvangasana",
    "triangle-trikonasana"
]

def generate_draft_rules_for_category(asana_id, category, display_name):
    # Rule templates tailored to category with stable rule IDs
    if category == "standing":
        return [
            {
                "id": f"{asana_id}.shoulder.level",
                "name": "Shoulder Balance",
                "metric": "horizontal_alignment",
                "points": [11, 12],
                "comparison": "less_than",
                "target": 0.05,
                "tolerance": 0.04,
                "weight": 1,
                "severity": "medium",
                "feedback": "Keep shoulders level and relaxed."
            },
            {
                "id": f"{asana_id}.spine.vertical",
                "name": "Spinal Alignment",
                "metric": "vertical_alignment",
                "points": [11, 23],
                "comparison": "less_than",
                "target": 0.08,
                "tolerance": 0.06,
                "weight": 1,
                "severity": "medium",
                "feedback": "Lengthen your spine and maintain upright alignment."
            },
            {
                "id": f"{asana_id}.hip.level",
                "name": "Hip Balance",
                "metric": "horizontal_alignment",
                "points": [23, 24],
                "comparison": "less_than",
                "target": 0.06,
                "tolerance": 0.04,
                "weight": 1,
                "severity": "medium",
                "feedback": "Distribute weight evenly across hips."
            }
        ]
    elif category == "balancing":
        return [
            {
                "id": f"{asana_id}.standing.leg",
                "name": "Standing Leg Stability",
                "metric": "angle",
                "points": [23, 25, 27],
                "comparison": "between",
                "min": 160,
                "max": 180,
                "tolerance": 10,
                "weight": 2,
                "severity": "high",
                "feedback": "Firm your standing leg and root down through the foot."
            },
            {
                "id": f"{asana_id}.shoulder.alignment",
                "name": "Shoulder Level",
                "metric": "horizontal_alignment",
                "points": [11, 12],
                "comparison": "less_than",
                "target": 0.06,
                "tolerance": 0.04,
                "weight": 1,
                "severity": "medium",
                "feedback": "Keep shoulders even and focus your gaze on a steady point."
            }
        ]
    elif category == "seated":
        return [
            {
                "id": f"{asana_id}.spine.erect",
                "name": "Spine Length",
                "metric": "vertical_alignment",
                "points": [11, 23],
                "comparison": "less_than",
                "target": 0.10,
                "tolerance": 0.08,
                "weight": 1,
                "severity": "medium",
                "feedback": "Sit tall with a straight, elongated spine."
            },
            {
                "id": f"{asana_id}.shoulder.relaxation",
                "name": "Relaxed Shoulders",
                "metric": "horizontal_alignment",
                "points": [11, 12],
                "comparison": "less_than",
                "target": 0.06,
                "tolerance": 0.05,
                "weight": 1,
                "severity": "low",
                "feedback": "Relax shoulders away from your ears."
            }
        ]
    elif category == "backbend":
        return [
            {
                "id": f"{asana_id}.chest.opening",
                "name": "Chest Opening",
                "metric": "horizontal_alignment",
                "points": [11, 12],
                "comparison": "less_than",
                "target": 0.06,
                "tolerance": 0.05,
                "weight": 1,
                "severity": "medium",
                "feedback": "Broaden across your collarbones and open your chest."
            },
            {
                "id": f"{asana_id}.arm.extension",
                "name": "Arm Support",
                "metric": "angle",
                "points": [11, 13, 15],
                "comparison": "between",
                "min": 140,
                "max": 180,
                "tolerance": 15,
                "weight": 1,
                "severity": "medium",
                "feedback": "Engage arms to support gentle spinal arch."
            }
        ]
    elif category == "core":
        return [
            {
                "id": f"{asana_id}.core.alignment",
                "name": "Torso Line",
                "metric": "angle",
                "points": [11, 23, 25],
                "comparison": "between",
                "min": 150,
                "max": 180,
                "tolerance": 15,
                "weight": 2,
                "severity": "high",
                "feedback": "Engage abdominal muscles to maintain straight body line."
            },
            {
                "id": f"{asana_id}.shoulder.stability",
                "name": "Shoulder Stability",
                "metric": "horizontal_alignment",
                "points": [11, 12],
                "comparison": "less_than",
                "target": 0.06,
                "tolerance": 0.04,
                "weight": 1,
                "severity": "medium",
                "feedback": "Press through hands and keep shoulder girdle firm."
            }
        ]
    elif category == "inversion":
        return [
            {
                "id": f"{asana_id}.inversion.line",
                "name": "Vertical Line",
                "metric": "vertical_alignment",
                "points": [23, 27],
                "comparison": "less_than",
                "target": 0.12,
                "tolerance": 0.08,
                "weight": 2,
                "severity": "high",
                "feedback": "Stack hips and legs vertically with smooth control."
            },
            {
                "id": f"{asana_id}.shoulder.base",
                "name": "Shoulder Base",
                "metric": "horizontal_alignment",
                "points": [11, 12],
                "comparison": "less_than",
                "target": 0.06,
                "tolerance": 0.04,
                "weight": 1,
                "severity": "high",
                "isSafety": True,
                "feedback": "Maintain broad shoulder foundation without compressing neck."
            }
        ]
    else: # restorative / forward_bend / default
        return [
            {
                "id": f"{asana_id}.body.symmetry",
                "name": "Symmetric Balance",
                "metric": "horizontal_alignment",
                "points": [11, 12],
                "comparison": "less_than",
                "target": 0.08,
                "tolerance": 0.06,
                "weight": 1,
                "severity": "low",
                "feedback": "Relax deeply and breathe steadily into the posture."
            }
        ]

output_asanas = []

for idx, item in enumerate(asanas):
    a_id = item["id"]
    display_name = item["displayName"]
    sanskrit_name = item["sanskritName"]
    category = item["category"]
    difficulty = item["difficulty"]
    filename = item["filename"]
    
    aliases = ALIASES_MAP.get(a_id, [])
    is_free = a_id in FREE_ASANA_IDS
    
    # Specific production validated rules for top poses
    if a_id == "warrior-ii-virabhadrasana-ii":
        validation_status = "production"
        expert_reviewed = True
        rules = [
            {
                "id": "warrior-ii-left-elbow-straight",
                "name": "Left Arm Extension",
                "metric": "angle",
                "points": [11, 13, 15],
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
                "points": [12, 14, 16],
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
                "points": [23, 25, 27],
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
                "points": [24, 26, 28],
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
                "points": [11, 12],
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
                "points": [23, 24],
                "comparison": "less_than",
                "target": 0.08,
                "tolerance": 0.06,
                "weight": 1,
                "severity": "medium",
                "feedback": "Keep hips open and stable — square them toward the side of the room."
            }
        ]
    elif a_id == "mountain-tadasana":
        validation_status = "production"
        expert_reviewed = True
        rules = [
            {
                "id": "tadasana-shoulder-level",
                "name": "Shoulder Alignment",
                "metric": "horizontal_alignment",
                "points": [11, 12],
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
                "points": [23, 24],
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
                "points": [23, 25, 27],
                "comparison": "between",
                "min": 160,
                "max": 180,
                "weight": 1,
                "severity": "low",
                "feedback": "Stand tall with both legs fully straight."
            }
        ]
    elif a_id == "tree-vrksasana":
        validation_status = "production"
        expert_reviewed = True
        rules = [
            {
                "id": "tree-standing-leg-straight",
                "name": "Standing Leg Straight",
                "metric": "angle",
                "points": [23, 25, 27],
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
                "points": [11, 12],
                "comparison": "less_than",
                "target": 0.06,
                "tolerance": 0.04,
                "weight": 1,
                "severity": "medium",
                "feedback": "Keep both shoulders level and open across the chest."
            }
        ]
    elif a_id == "cobra-bhujangasana":
        validation_status = "validated"
        expert_reviewed = True
        rules = [
            {
                "id": "cobra-shoulder-level",
                "name": "Shoulder Level",
                "metric": "horizontal_alignment",
                "points": [11, 12],
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
                "points": [11, 13, 15],
                "comparison": "between",
                "min": 90,
                "max": 160,
                "weight": 1,
                "severity": "medium",
                "feedback": "Keep a soft bend in your elbows hugged close to your ribs."
            }
        ]
    elif a_id == "childs-pose-balasana":
        validation_status = "validated"
        expert_reviewed = True
        rules = [
            {
                "id": "childs-pose-symmetry",
                "name": "Shoulder Alignment",
                "metric": "horizontal_alignment",
                "points": [11, 12],
                "comparison": "less_than",
                "target": 0.08,
                "tolerance": 0.06,
                "weight": 1,
                "severity": "low",
                "feedback": "Rest deeply and extend arms evenly along the mat."
            }
        ]
    else:
        validation_status = "draft"
        expert_reviewed = False
        rules = generate_draft_rules_for_category(a_id, category, display_name)
        
    # Derive required landmarks
    req_lms = set()
    for r in rules:
        for p in r.get("points", []):
            req_lms.add(p)
    required_landmarks = sorted(list(req_lms))

    output_asanas.append({
        "id": a_id,
        "slug": a_id,
        "displayName": display_name,
        "name": display_name,
        "sanskritName": sanskrit_name,
        "category": category,
        "difficulty": difficulty,
        "asset": {
            "imageUrl": f"{SUPABASE_STORAGE_URL}/{filename}",
            "storagePath": f"{STORAGE_PREFIX}/{filename}"
        },
        "imageUrl": f"{SUPABASE_STORAGE_URL}/{filename}",
        "storagePath": f"{STORAGE_PREFIX}/{filename}",
        "description": f"Traditional {category} yoga posture ({sanskrit_name or display_name}) promoting balance, strength, and vitality.",
        "benefits": [
            "Improves alignment and spatial awareness",
            "Promotes strength, flexibility, and mind-body balance",
            "Cultivates steady breathing and mindful concentration"
        ],
        "instructions": [
            f"Begin by preparing your foundation for {display_name}.",
            "Engage your breath and align your posture smoothly.",
            "Hold steady with calm concentration and relaxed shoulders."
        ],
        "cues": [
            {
                "id": f"{a_id}-c1",
                "jointOrBodyPart": "Core / Spine",
                "cue": "Lengthen through the crown of your head",
                "tip": "Maintain steady rhythmic breathing."
            }
        ],
        "targetHoldSeconds": 5,
        "ruleIds": [r["id"] for r in rules],
        "isPremium": not is_free,
        "orderIndex": idx + 1,
        "aliases": aliases,
        "rules": rules,
        "requiredLandmarks": required_landmarks,
        "validation": {
            "status": validation_status,
            "version": "1.0.0",
            "sampleCount": 20 if validation_status != "draft" else 0,
            "expertReviewed": expert_reviewed
        }
    })

# Write TypeScript catalog file
ts_code = f'''// AUTO-GENERATED AUTHORITATIVE ASANA CATALOG DERIVED FROM SUPABASE ASSET INVENTORY
// Source of truth: Supabase bucket 'asana-images' / folder 'yogaverse-model-asanas-beach'
// Total Assets: {len(output_asanas)}

import type {{ AsanaDefinition }} from "../types/asana-definition";

export const ALL_ASANAS_CATALOG: AsanaDefinition[] = {json.dumps(output_asanas, indent=2)};
'''

with open("frontend/src/features/ai-coach/data/allAsanasCatalog.ts", "w", encoding="utf-8") as out:
    out.write(ts_code)

print(f"Successfully generated allAsanasCatalog.ts with {len(output_asanas)} asanas.")
