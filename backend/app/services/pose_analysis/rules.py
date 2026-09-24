from typing import List, Dict, Any

ASANA_RULES_CATALOG: Dict[str, List[Dict[str, Any]]] = {
    "warrior-ii": [
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
            "feedback": "Extend your left arm straight out to the side."
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
            "feedback": "Extend your right arm straight out to the side."
        },
        {
            "id": "warrior-ii-left-shoulder-abduction",
            "name": "Left Shoulder Lift",
            "metric": "angle",
            "points": [13, 11, 23],
            "comparison": "between",
            "min": 75,
            "max": 115,
            "weight": 2,
            "severity": "high",
            "feedback": "Lift your left arm to shoulder height."
        },
        {
            "id": "warrior-ii-right-shoulder-abduction",
            "name": "Right Shoulder Lift",
            "metric": "angle",
            "points": [14, 12, 24],
            "comparison": "between",
            "min": 75,
            "max": 115,
            "weight": 2,
            "severity": "high",
            "feedback": "Lift your right arm to shoulder height."
        },
        {
            "id": "warrior-ii-left-knee-angle",
            "name": "Front Knee Bend",
            "metric": "angle",
            "points": [23, 25, 27],
            "comparison": "between",
            "min": 75,
            "max": 125,
            "weight": 3,
            "severity": "high",
            "feedback": "Bend your front knee toward 90 degrees."
        },
        {
            "id": "warrior-ii-right-knee-straight",
            "name": "Back Leg Straight",
            "metric": "angle",
            "points": [24, 26, 28],
            "comparison": "between",
            "min": 155,
            "max": 180,
            "weight": 2,
            "severity": "high",
            "feedback": "Keep your back leg straight."
        },
        {
            "id": "warrior-ii-shoulder-alignment",
            "name": "Shoulder Level",
            "metric": "horizontal_alignment",
            "points": [11, 12],
            "comparison": "less_than",
            "target": 0.05,
            "tolerance": 0.04,
            "weight": 1,
            "severity": "medium",
            "feedback": "Keep shoulders level."
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
            "feedback": "Keep hips stable."
        },
        {
            "id": "warrior-ii-torso-upright",
            "name": "Torso Upright",
            "metric": "vertical_alignment",
            "points": [11, 23],
            "comparison": "less_than",
            "target": 0.08,
            "tolerance": 0.06,
            "weight": 1,
            "severity": "medium",
            "feedback": "Keep your torso tall and upright."
        },
    ],
    "tadasana": [
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
            "feedback": "Keep shoulders level."
        }
    ],
    "t-pose": [
        {
            "id": "t-pose-left-elbow-straight",
            "name": "Left Arm Straight",
            "metric": "angle",
            "points": [11, 13, 15],
            "comparison": "between",
            "min": 155,
            "max": 180,
            "weight": 2,
            "severity": "high",
            "feedback": "Extend left arm fully straight."
        },
        {
            "id": "t-pose-right-elbow-straight",
            "name": "Right Arm Straight",
            "metric": "angle",
            "points": [12, 14, 16],
            "comparison": "between",
            "min": 155,
            "max": 180,
            "weight": 2,
            "severity": "high",
            "feedback": "Extend right arm fully straight."
        },
        {
            "id": "t-pose-left-shoulder-abduction",
            "name": "Left Arm at Shoulder Height",
            "metric": "angle",
            "points": [13, 11, 23],
            "comparison": "between",
            "min": 75,
            "max": 115,
            "weight": 2,
            "severity": "high",
            "feedback": "Raise left arm to shoulder height."
        },
        {
            "id": "t-pose-right-shoulder-abduction",
            "name": "Right Arm at Shoulder Height",
            "metric": "angle",
            "points": [14, 12, 24],
            "comparison": "between",
            "min": 75,
            "max": 115,
            "weight": 2,
            "severity": "high",
            "feedback": "Raise right arm to shoulder height."
        }
    ]
}

import json
from pathlib import Path

# Load extended rules catalog
_catalog_path = Path(__file__).parent / "rules_catalog.json"
if _catalog_path.exists():
    try:
        with open(_catalog_path, "r", encoding="utf-8") as _f:
            _loaded = json.load(_f)
            for _k, _v in _loaded.items():
                if _k != "points" and (_k not in ASANA_RULES_CATALOG or not ASANA_RULES_CATALOG[_k]):
                    ASANA_RULES_CATALOG[_k] = _v
    except Exception as _e:
        print("Warning loading rules_catalog.json:", _e)

def get_asana_rules(asana_id: str) -> List[Dict[str, Any]]:
    return ASANA_RULES_CATALOG.get(asana_id, [])
