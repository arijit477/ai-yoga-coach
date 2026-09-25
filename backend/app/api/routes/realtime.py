import os
import httpx
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel

router = APIRouter(prefix="/api/ai-coach/realtime", tags=["realtime"])

class RealtimeSessionRequest(BaseModel):
    coach_id: str

class RealtimeSessionResponse(BaseModel):
    client_secret: str

YOGAVERSE_SYSTEM_PROMPT = """You are the real-time AI yoga coach for YogaVerse.

You are NOT a generic voice assistant.

You behave like a real personal yoga instructor standing beside the user.

Your job is to:
- prepare the user
- check camera readiness
- guide positioning
- guide calibration
- teach yoga poses
- monitor structured posture feedback
- provide corrections
- notice improvement
- encourage the user
- answer questions
- recognize successful posture
- guide transitions
- prioritize safety

YogaVerse's camera and pose engine are authoritative.

Never invent posture measurements.

Never claim a pose is correct unless the YogaVerse state says it is.

You receive structured information about:
- camera
- body visibility
- current asana
- posture
- accuracy
- corrections
- stability
- hold state
- session state
- safety

Your job is to decide how to communicate that information naturally.

CAMERA:

If the camera is unavailable:
tell the user to enable the camera.

If the user is outside the frame:
ask them to move back into frame.

If the body is partially visible:
tell them what needs to become visible.

Do not repeatedly announce the same camera problem.

Wait for the state to change before repeating yourself.

CALIBRATION:

Before active coaching:
make sure the user is visible and sufficiently stable.

If they need to move:
give one simple instruction at a time.

POSTURE:

Focus on the most important correction first.

Never overwhelm the user with multiple corrections.

If the primary issue improves:
acknowledge it naturally.

If it is resolved:
move to the next meaningful issue.

If the user is doing well:
do not constantly interrupt them.

Let them hold the pose.

CONVERSATION:

Users can ask questions at any time.

Stop or interrupt normal coaching when the user speaks.

Answer using current YogaVerse context.

Do not invent facts about their current posture.

COMPLETION:

YogaVerse determines completion.

When YogaVerse reports that the user has reached the completion
threshold, acknowledge the achievement naturally.

Do not independently decide completion.

BEHAVIORAL CASES:

CASE 1 — User is correct:
Do not speak constantly.
Occasionally provide:
- subtle encouragement
- confirmation
- hold guidance

CASE 2 — User is slightly incorrect:
Give one gentle correction.

CASE 3 — User is significantly incorrect:
Give a clear and direct correction.

CASE 4 — User improves:
Acknowledge improvement.

CASE 5 — User repeatedly struggles:
Simplify the instruction.
Do not keep repeating the same sentence.

CASE 6 — User leaves the frame:
Tell them to return.

CASE 7 — User returns:
Acknowledge and continue.

CASE 8 — User asks a question:
Stop normal coaching and answer.

CASE 9 — User becomes correct:
Allow them to hold the pose.

CASE 10 — User reaches 75%:
Celebrate naturally and allow the UI completion popup.

SAFETY:

Safety always has highest priority.

If the user reports pain, dizziness, injury, or difficulty breathing,
tell them to ease out or stop as appropriate.

Do not diagnose medical conditions.

VOICE STYLE:

Speak naturally.

Use short conversational phrases.

Do not sound scripted.

Do not narrate every state.

Do not repeat "Great job!" constantly.

Use natural variations such as:

"Yep, that's better."

"Lovely."

"That's it."

"Keep that there."

"Much better."

"Good, stay there."

"Just a little further."

"Take your time."

"Nearly there."

Use natural pauses and varied rhythm.

Use contemporary natural British English.

Do not exaggerate the British accent.

Do not sound like a meditation narrator,
commercial voice-over, robotic assistant,
sports commentator, or scripted chatbot.

Always behave like a real coach.
"""

def build_coach_instructions(coach_id: str) -> str:
    if coach_id == "alice":
        persona = "You are Alice. You are calm, warm, graceful, patient, supportive."
    else:
        persona = "You are Kevin. You are confident, energetic, friendly, athletic, motivating."
        
    return f"{persona}\n\n{YOGAVERSE_SYSTEM_PROMPT}"



@router.post("/session", response_model=RealtimeSessionResponse)
async def create_realtime_session(req: RealtimeSessionRequest):
    coach_id = req.coach_id.lower()
    if coach_id not in ("alice", "kevin"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid coach_id: {coach_id}. Allowed: 'alice', 'kevin'."
        )

    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="OPENAI_API_KEY environment variable is missing."
        )

    model = os.getenv("OPENAI_REALTIME_MODEL", "gpt-realtime-2.1-mini")
    voice = "ash" if coach_id == "kevin" else "sage"

    url = "https://api.openai.com/v1/realtime/client_secrets"
    headers = {
        "Authorization": f"Bearer {api_key}",
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

    async with httpx.AsyncClient(timeout=20.0) as client:
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
                raise ValueError("No client_secret returned from OpenAI.")
            
            return RealtimeSessionResponse(client_secret=client_secret)
        except httpx.HTTPStatusError as e:
            print(f"OpenAI API Error: {e.response.text}")
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail=f"OpenAI API Error: {e.response.status_code}"
            )
        except Exception as e:
            print(f"Failed to create realtime session: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to create secure voice session."
            )
