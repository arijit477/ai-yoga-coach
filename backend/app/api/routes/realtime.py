import os
import time
import logging
from collections import defaultdict
from typing import Optional, Tuple, Dict, List
import httpx
from fastapi import APIRouter, HTTPException, status, Request, Header, Depends
from pydantic import BaseModel
from app.core.supabase import supabase

logger = logging.getLogger("ai_coach.realtime")

router = APIRouter(prefix="/api/ai-coach/realtime", tags=["realtime"])

# ── RATE LIMITER (SLIDING WINDOW) ─────────────────────────────────────────────
class SlidingWindowRateLimiter:
    def __init__(self, limit_per_minute: int = 10, window_seconds: int = 60):
        self.limit_per_minute = limit_per_minute
        self.window_seconds = window_seconds
        self.requests: Dict[str, List[float]] = defaultdict(list)

    def is_allowed(self, client_id: str) -> Tuple[bool, int]:
        now = time.time()
        window_start = now - self.window_seconds
        
        # Purge timestamps outside the active window
        timestamps = [t for t in self.requests[client_id] if t > window_start]
        self.requests[client_id] = timestamps

        if len(timestamps) >= self.limit_per_minute:
            oldest = timestamps[0]
            retry_after = max(1, int(oldest + self.window_seconds - now))
            return False, retry_after

        self.requests[client_id].append(now)
        return True, 0

    def reset(self):
        self.requests.clear()

def get_rate_limiter() -> SlidingWindowRateLimiter:
    limit = int(os.getenv("REALTIME_RATE_LIMIT_PER_MINUTE", "10"))
    return SlidingWindowRateLimiter(limit_per_minute=limit, window_seconds=60)

session_rate_limiter = get_rate_limiter()

# ── AUTHENTICATION HELPER ─────────────────────────────────────────────────────
async def get_optional_user(
    authorization: Optional[str] = Header(None, alias="Authorization")
) -> Optional[str]:
    """
    Validates optional Bearer token via Supabase Auth if provided.
    If REALTIME_REQUIRE_AUTH is true, requests without a valid token will be rejected.
    """
    require_auth = os.getenv("REALTIME_REQUIRE_AUTH", "false").lower() in ("true", "1")
    
    user_id = None
    if authorization and authorization.startswith("Bearer "):
        token = authorization.split(" ", 1)[1].strip()
        if supabase:
            try:
                user_resp = supabase.auth.get_user(token)
                if user_resp and user_resp.user:
                    user_id = user_resp.user.id
            except Exception as e:
                logger.warning(f"Failed to verify Supabase bearer token: {e}")
                if require_auth:
                    raise HTTPException(
                        status_code=status.HTTP_401_UNAUTHORIZED,
                        detail="Invalid authentication token."
                    )
        elif require_auth:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Authentication is required but Supabase is not configured on the server."
            )

    if require_auth and not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required to initialize a voice session."
        )

    return user_id

def get_client_identifier(request: Request, user_id: Optional[str] = None) -> str:
    if user_id:
        return f"user:{user_id}"
    
    # Extract client IP safely (supporting reverse proxy X-Forwarded-For if available)
    forwarded_for = request.headers.get("x-forwarded-for")
    if forwarded_for:
        client_ip = forwarded_for.split(",")[0].strip()
    else:
        client_ip = request.client.host if request.client else "unknown"
    return f"ip:{client_ip}"

# ── REQUEST & RESPONSE SCHEMAS ────────────────────────────────────────────────
class RealtimeSessionRequest(BaseModel):
    coach_id: str

class RealtimeSessionResponse(BaseModel):
    client_secret: str

# ── SYSTEM PROMPTS & PERSONAS ─────────────────────────────────────────────────
YOGAVERSE_SYSTEM_PROMPT = """You are the live AI Yoga Coach for YogaVerse.

You are NOT a generic AI voice assistant. You are an expert, compassionate, and attentive personal yoga instructor practicing right beside the user.

YOUR CORE PHILOSOPHY & BEHAVIOR:
- **Calm & Grounded Presence**: Speak with an unhurried, peaceful, and warm tone.
- **Space & Breath**: Never rush or chatter continuously. Yoga requires stillness and breath awareness.
- **Kinesthetic Guidance**: Use intuitive physical sensation cues rather than dry mechanical numbers (e.g., "draw your navel in and soften your shoulders" instead of "angle is 85 degrees").
- **Foundation First**: Correct posture starting from the ground up: feet & hips first, spine second, arms & gaze last.
- **One Cue at a Time**: Keep spoken corrections concise (under 12 words) so the practitioner can adjust without mental overload.
- **Immediate Micro-Validation**: When the practitioner adjusts their form into alignment, provide a brief, warm affirmation ("That's it, hold steady there", "Lovely adjustment", "Breathe into that stretch").
- **Silence & Hold**: When the user is in good alignment, allow peaceful silence for them to hold the pose and breathe.

STRUCTURED CONTEXT & AUTHORITY:
YogaVerse's computer vision engine is the ground truth. Never invent joint angles or state.
You receive structured events regarding:
- Camera visibility (out of frame, partial body, ready)
- Active Asana & Step
- Posture score, stability, and primary joint issues
- Hold countdown & completion

COACHING SCENARIOS:

1. CAMERA & READINESS:
- If camera is off/blocked: "Please enable your camera so I can guide you safely."
- If out of frame: "Take a step back so I can see your full body."
- If partial body: "Step back a little further so your hands and feet are in view."
- Do not repeat camera warnings if the user is already moving.

2. POSE GUIDANCE & CORRECTIONS:
- On Pose Start: Give a warm, grounding entry cue (e.g., "Let's step into Warrior Two. Ground down through both feet, arms open wide.").
- On Posture Issue: Give a direct, actionable cue (e.g., "Sink your front knee a little deeper, stacking it over your ankle.").
- On Improvement: Confirm immediately: "Yes, right there.", "Much better alignment.", "Keep that lift in your chest."
- On Holding Good Form: Guide the breath: "Steady breath in... and exhale to settle in.", "Gaze over your front fingertips, breathing smoothly."

3. COMPLETION & TRANSITIONS:
- When YogaVerse signals pose completion: Celebrate naturally with warmth ("Beautiful hold. Release the posture with ease.").

4. SAFETY:
- If user mentions pain or dizziness: Prioritize safety immediately ("Please ease out of the pose gently and rest in Child's Pose.").

VOICE & PROSODY STYLE:
- Tone: Serene, warm, encouraging, articulate contemporary natural British English.
- Rhythm: Slower, rhythmic pacing (130-140 wpm) with natural breath pauses.
- Avoid sounding robotic, hyperactive, corporate, or like a navigation system.

STRICT NON-CONVERSATIONAL CONSTRAINTS:
- NEVER ask questions to the practitioner or invite verbal responses (the practitioner is actively exercising).
- Keep each spoken response concise (5-14 words max).
- Deliver physical alignment instructions directly without greetings, filler phrases, or robotic meta-commentary.
"""

def build_coach_instructions(coach_id: str) -> str:
    if coach_id == "alice":
        persona = (
            "You are Coach Alice. Your persona is calm, mindful, graceful, patient, and deeply supportive. "
            "You focus on gentle breath awareness, smooth alignment, and soothing reassurance."
        )
    else:
        persona = (
            "You are Coach Kevin. Your persona is confident, grounded, encouraging, athletic, and focused. "
            "You emphasize steady foundation, core stability, strength, and uplifting motivation."
        )
        
    return f"{persona}\n\n{YOGAVERSE_SYSTEM_PROMPT}"


# ── SESSION ENDPOINT ──────────────────────────────────────────────────────────
@router.post("/session", response_model=RealtimeSessionResponse)
async def create_realtime_session(
    req: RealtimeSessionRequest,
    request: Request,
    user_id: Optional[str] = Depends(get_optional_user)
):
    # 1. Validate Coach ID
    coach_id = req.coach_id.lower().strip()
    if coach_id not in ("alice", "kevin"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid coach_id: '{req.coach_id}'. Allowed coaches: 'alice', 'kevin'."
        )

    # 2. Enforce Rate Limiting
    client_identifier = get_client_identifier(request, user_id)
    allowed, retry_after = session_rate_limiter.is_allowed(client_identifier)
    if not allowed:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Rate limit exceeded. Too many voice session requests. Please wait a moment before trying again.",
            headers={"Retry-After": str(retry_after)}
        )

    # 3. Check Server-Side OpenAI Credentials
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key or not api_key.strip():
        logger.error("OPENAI_API_KEY environment variable is not configured on the backend.")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Voice service is temporarily unavailable. Server configuration error."
        )

    # 4. Centralized Configuration
    model = os.getenv("OPENAI_REALTIME_MODEL", "gpt-realtime-2.1-mini")
    if coach_id == "kevin":
        voice = os.getenv("OPENAI_REALTIME_VOICE_KEVIN", "ash")
    else:
        voice = os.getenv("OPENAI_REALTIME_VOICE_ALICE", "sage")
    
    timeout_seconds = float(os.getenv("REALTIME_SESSION_TIMEOUT_SECONDS", "20.0"))

    # 5. Call OpenAI Realtime Client Secrets Endpoint
    url = "https://api.openai.com/v1/realtime/client_secrets"
    headers = {
        "Authorization": f"Bearer {api_key.strip()}",
        "Content-Type": "application/json"
    }

    payload = {
        "session": {
            "type": "realtime",
            "model": model,
            "instructions": build_coach_instructions(coach_id),
            "audio": {
                "output": {
                    "voice": voice
                }
            }
        }
    }

    async with httpx.AsyncClient(timeout=timeout_seconds) as client:
        try:
            response = await client.post(url, headers=headers, json=payload)
            response.raise_for_status()
            data = response.json()
            
            client_secret = data.get("value") or (
                data.get("client_secret", {}).get("value")
                if isinstance(data.get("client_secret"), dict)
                else data.get("client_secret")
            )
            if not client_secret:
                logger.error(f"OpenAI did not return a valid client_secret: {data}")
                raise ValueError("No client_secret returned from upstream provider.")
            
            return RealtimeSessionResponse(client_secret=client_secret)

        except httpx.HTTPStatusError as e:
            logger.error(f"Upstream OpenAI API error ({e.response.status_code}): {e.response.text}")
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail=f"Upstream voice provider error (HTTP {e.response.status_code})."
            )
        except Exception as e:
            logger.error(f"Failed to create realtime session: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to initialize secure voice session."
            )
