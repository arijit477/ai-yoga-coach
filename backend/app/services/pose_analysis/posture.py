from typing import List, Dict, Any, Optional
from .geometry import calculate_angle, calculate_distance_2d

def mid(a, b):
    class Point:
        def __init__(self, x, y, z):
            self.x = x
            self.y = y
            self.z = z
    return Point((a.x + b.x) / 2, (a.y + b.y) / 2, (getattr(a, "z", 0) + getattr(b, "z", 0)) / 2)

def status_from_ratio(ratio: float, warn_thresh: float, crit_thresh: float) -> str:
    if ratio < warn_thresh: return "good"
    if ratio < crit_thresh: return "warning"
    return "critical"

def check_head(landmarks: List[Any]) -> str:
    try:
        nose = landmarks[0]
        l_sh = landmarks[11]
        r_sh = landmarks[12]
        sh_mid = mid(l_sh, r_sh)
        sh_width = calculate_distance_2d(l_sh, r_sh)
        if sh_width < 1e-6: return "unknown"
        lat_ratio = abs(nose.x - sh_mid.x) / sh_width
        return status_from_ratio(lat_ratio, 0.15, 0.30)
    except: return "unknown"

def check_neck(landmarks: List[Any]) -> str:
    try:
        l_ear = landmarks[7]
        r_ear = landmarks[8]
        l_sh = landmarks[11]
        r_sh = landmarks[12]
        ear_mid = mid(l_ear, r_ear)
        sh_mid = mid(l_sh, r_sh)
        sh_width = calculate_distance_2d(l_sh, r_sh)
        if sh_width < 1e-6: return "unknown"
        lat_ratio = abs(ear_mid.x - sh_mid.x) / sh_width
        return status_from_ratio(lat_ratio, 0.12, 0.25)
    except: return "unknown"

def check_shoulders(landmarks: List[Any]) -> str:
    try:
        l_sh = landmarks[11]
        r_sh = landmarks[12]
        height_diff = abs(l_sh.y - r_sh.y)
        sh_width = calculate_distance_2d(l_sh, r_sh)
        if sh_width < 1e-6: return "unknown"
        return status_from_ratio(height_diff / sh_width, 0.08, 0.18)
    except: return "unknown"

def check_left_elbow(landmarks: List[Any]) -> str:
    try:
        l_sh = landmarks[11]
        l_el = landmarks[13]
        l_wr = landmarks[15]
        angle = calculate_angle(l_sh, l_el, l_wr)
        if angle is None: return "unknown"
        if angle >= 150: return "good"
        if angle >= 95: return "warning"
        return "critical"
    except: return "unknown"

def check_spine(landmarks: List[Any]) -> str:
    try:
        l_sh = landmarks[11]
        r_sh = landmarks[12]
        l_hip = landmarks[23]
        r_hip = landmarks[24]
        sh_mid = mid(l_sh, r_sh)
        hip_mid = mid(l_hip, r_hip)
        torso_len = calculate_distance_2d(sh_mid, hip_mid)
        if torso_len < 1e-6: return "unknown"
        lat_delta = abs(sh_mid.x - hip_mid.x)
        return status_from_ratio(lat_delta / torso_len, 0.10, 0.22)
    except: return "unknown"

def check_hips(landmarks: List[Any]) -> str:
    try:
        l_hip = landmarks[23]
        r_hip = landmarks[24]
        height_diff = abs(l_hip.y - r_hip.y)
        hip_width = calculate_distance_2d(l_hip, r_hip)
        if hip_width < 1e-6: return "unknown"
        return status_from_ratio(height_diff / hip_width, 0.08, 0.18)
    except: return "unknown"

def analyze_posture(landmarks: List[Any]) -> List[Dict[str, str]]:
    if not landmarks or len(landmarks) < 33:
        return [
            {"key": "head", "status": "unknown"},
            {"key": "neck", "status": "unknown"},
            {"key": "shoulders", "status": "unknown"},
            {"key": "leftElbow", "status": "unknown"},
            {"key": "spine", "status": "unknown"},
            {"key": "hips", "status": "unknown"}
        ]
        
    return [
        {"key": "head", "status": "good" if getattr(landmarks[0], "visibility", 1) < 0.25 else check_head(landmarks)},
        {"key": "neck", "status": "good" if getattr(landmarks[7], "visibility", 1) < 0.25 else check_neck(landmarks)},
        {"key": "shoulders", "status": check_shoulders(landmarks)},
        {"key": "leftElbow", "status": check_left_elbow(landmarks)},
        {"key": "spine", "status": check_spine(landmarks)},
        {"key": "hips", "status": check_hips(landmarks)}
    ]
