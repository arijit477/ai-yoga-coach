from typing import List, Dict, Any, Optional
from .geometry import calculate_angle, horizontal_deviation, vertical_deviation, calculate_distance_2d

def evaluate_rule(rule: Dict[str, Any], landmarks: List[Any]) -> Dict[str, Any]:
    points = rule.get("points", [])
    if len(points) == 0 or len(landmarks) < 33:
        return {"passed": False, "score": 0, "ignored": True}
        
    for p in points:
        lm = landmarks[p]
        if not lm or getattr(lm, "visibility", 1) < 0.25:
            return {"passed": False, "score": 0, "ignored": True}
            
    metric = rule.get("metric")
    value = None
    
    if metric == "angle" and len(points) == 3:
        value = calculate_angle(landmarks[points[0]], landmarks[points[1]], landmarks[points[2]])
    elif metric == "horizontal_alignment" and len(points) == 2:
        value = horizontal_deviation(landmarks[points[0]], landmarks[points[1]])
    elif metric == "vertical_alignment" and len(points) == 2:
        value = vertical_deviation(landmarks[points[0]], landmarks[points[1]])
        
    if value is None:
        return {"passed": False, "score": 0, "ignored": True}
        
    comparison = rule.get("comparison")
    passed = False
    
    if comparison == "between":
        min_v = rule.get("min", float("-inf"))
        max_v = rule.get("max", float("inf"))
        passed = min_v <= value <= max_v
    elif comparison == "less_than":
        passed = value <= rule.get("target", 0)
    elif comparison == "greater_than":
        passed = value >= rule.get("target", 0)
        
    if passed:
        return {"passed": True, "score": 100}
        
    # Calculate score based on difference
    score = 0
    if comparison == "between":
        rng = rule.get("max", 0) - rule.get("min", 0)
        if rng > 0:
            if value < rule.get("min", 0):
                score = max(0, int(100 - ((rule.get("min", 0) - value) / rng) * 100))
            else:
                score = max(0, int(100 - ((value - rule.get("max", 0)) / rng) * 100))
    elif rule.get("target") is not None:
        diff = abs(value - rule.get("target", 0))
        tol = rule.get("tolerance", 0.05)
        if tol > 0:
            score = max(0, int(100 - (diff / tol) * 100))
            
    issue = {
        "ruleId": rule["id"],
        "ruleName": rule["name"],
        "severity": rule["severity"],
        "metric": metric,
        "currentValue": round(value, 1) if isinstance(value, float) else value,
        "feedback": rule.get("feedback", ""),
        "min": rule.get("min"),
        "max": rule.get("max"),
        "targetValue": rule.get("target"),
        "targetMin": rule.get("min"),
        "targetMax": rule.get("max"),
        "joint": rule.get("joint", rule["name"])
    }
    
    return {"passed": False, "score": score, "issue": issue}
    
def evaluate_pose(asana_id: str, rules: List[Dict[str, Any]], landmarks: List[Any]) -> Dict[str, Any]:
    import time
    if not rules:
        return {
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
            "evaluatedAt": int(time.time() * 1000)
        }
        
    total_weight = 0
    total_score = 0
    issues = []
    
    for rule in rules:
        res = evaluate_rule(rule, landmarks)
        if res.get("ignored"):
            continue
            
        w = rule.get("weight", 1)
        total_weight += w
        total_score += res["score"] * w
        
        if not res["passed"] and "issue" in res:
            issues.append(res["issue"])
            
    final_score = int(total_score / total_weight) if total_weight > 0 else 0
    primary_issue = issues[0] if len(issues) > 0 else None
    secondary_issues = issues[1:] if len(issues) > 1 else []

    return {
        "asanaId": asana_id,
        "score": final_score,
        "rawScore": final_score,
        "stableScore": final_score,
        "displayedScore": final_score,
        "isValid": True,
        "issues": issues,
        "primaryIssue": primary_issue,
        "secondaryIssues": secondary_issues,
        "resolvedIssues": [],
        "scoreTrend": "stable",
        "stability": 100,
        "holdProgress": 0,
        "completionEligible": False,
        "activeRules": len(rules),
        "evaluatedAt": int(time.time() * 1000)
    }

