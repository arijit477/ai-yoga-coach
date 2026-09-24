import cv2
import mediapipe as mp
import numpy as np
import base64
from typing import Dict, Any, Tuple, List
from .rules import get_asana_rules
from .evaluator import evaluate_pose
from .posture import analyze_posture

import warnings
warnings.filterwarnings("ignore", category=UserWarning, module="google.protobuf.symbol_database")

mp_pose = mp.solutions.pose
pose = mp_pose.Pose(
    static_image_mode=False,
    model_complexity=1,
    enable_segmentation=False,
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5
)

def decode_image(base64_string: str) -> np.ndarray:
    if "," in base64_string:
        base64_string = base64_string.split(",")[1]
    img_data = base64.b64decode(base64_string)
    nparr = np.frombuffer(img_data, np.uint8)
    return cv2.imdecode(nparr, cv2.IMREAD_COLOR)

def check_image_quality(image: np.ndarray) -> Dict[str, Any]:
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    brightness = np.mean(gray)
    blur = cv2.Laplacian(gray, cv2.CV_64F).var()
    
    lighting_status = "good"
    if brightness < 40:
        lighting_status = "too_dark"
    elif brightness > 220:
        lighting_status = "too_bright"
        
    blur_status = "good"
    if blur < 50:
        blur_status = "blurry"
        
    return {
        "brightness": brightness,
        "lighting": lighting_status,
        "blur": blur,
        "blur_status": blur_status
    }

def serialize_landmarks(landmark_list) -> List[Dict[str, float]]:
    if not landmark_list:
        return []
    res = []
    for lm in landmark_list.landmark:
        pt = {"x": lm.x, "y": lm.y, "z": lm.z}
        if hasattr(lm, 'visibility'):
            pt["visibility"] = lm.visibility
        if hasattr(lm, 'presence'):
            pt["presence"] = lm.presence
        res.append(pt)
    return res

def process_frame(frame_data: str, asana_id: str) -> Dict[str, Any]:
    image = decode_image(frame_data)
    quality = check_image_quality(image)
    
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    results = pose.process(image_rgb)
    
    if not results.pose_landmarks:
        return {
            "has_person": False,
            "quality": quality,
            "evaluation": {
                "asanaId": asana_id,
                "score": 0,
                "rawScore": 0,
                "stableScore": 0,
                "displayedScore": 0,
                "isValid": False,
                "issues": [],
                "primaryIssue": None,
                "secondaryIssues": [],
                "resolvedIssues": [],
                "scoreTrend": "stable",
                "stability": 0,
                "holdProgress": 0,
                "completionEligible": False,
                "activeRules": 0,
                "evaluatedAt": 0
            },
            "posture": [],
            "landmarks": [],
            "worldLandmarks": []
        }
        
    landmarks_data = results.pose_landmarks.landmark
    rules = get_asana_rules(asana_id)
    evaluation = evaluate_pose(asana_id, rules, landmarks_data)
    posture = analyze_posture(landmarks_data)
    
    return {
        "has_person": True,
        "quality": quality,
        "evaluation": evaluation,
        "posture": posture,
        "landmarks": serialize_landmarks(results.pose_landmarks),
        "worldLandmarks": serialize_landmarks(results.pose_world_landmarks)
    }
