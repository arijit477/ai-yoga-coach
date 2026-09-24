import math
from typing import Optional

def magnitude(x: float, y: float, z: float) -> float:
    return math.sqrt(x**2 + y**2 + z**2)

def calculate_angle(a, b, c) -> Optional[float]:
    """Calculate 3D angle ABC in degrees (0-180)."""
    if not all((a, b, c)): return None
    ba_x = a.x - b.x
    ba_y = a.y - b.y
    ba_z = getattr(a, "z", 0) - getattr(b, "z", 0)
    bc_x = c.x - b.x
    bc_y = c.y - b.y
    bc_z = getattr(c, "z", 0) - getattr(b, "z", 0)
    
    mag_ba = magnitude(ba_x, ba_y, ba_z)
    mag_bc = magnitude(bc_x, bc_y, bc_z)
    if mag_ba < 1e-8 or mag_bc < 1e-8: return None
        
    dot = ba_x * bc_x + ba_y * bc_y + ba_z * bc_z
    cosine = dot / (mag_ba * mag_bc)
    clamped_cosine = max(-1.0, min(1.0, cosine))
    return math.acos(clamped_cosine) * (180.0 / math.pi)

def horizontal_deviation(a, b) -> Optional[float]:
    if not a or not b: return None
    return abs(a.y - b.y)

def vertical_deviation(a, b) -> Optional[float]:
    if not a or not b: return None
    return abs(a.x - b.x)

def calculate_distance_2d(a, b) -> Optional[float]:
    if not a or not b: return None
    return math.sqrt((a.x - b.x)**2 + (a.y - b.y)**2)
