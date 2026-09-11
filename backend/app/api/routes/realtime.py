import os
import httpx
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel

router = APIRouter(prefix="/api/ai-coach/realtime", tags=["realtime"])

class RealtimeSessionRequest(BaseModel):
    coach_id: str

class RealtimeSessionResponse(BaseModel):
    client_secret: str

# Coach Instructions
COACH_INSTRUCTIONS = {
    "alice": """You are Alice, an AI personal yoga coach.
You are calm, warm, supportive, graceful, encouraging, and professional.

You guide the user through yoga exercises, provide concise spoken instructions,
answer questions, encourage the user, and help them maintain safe and accurate
form.

The application has a separate computer-vision posture analysis engine.
You MUST treat posture-analysis events provided by the application as the
source of truth.
You MUST NOT independently calculate or invent body angles, distances,
landmark positions, or posture measurements.

When a posture event is provided:
- understand the issue
- provide one clear actionable correction
- keep the spoken response concise
- prioritize safety-critical/high-severity corrections
- avoid giving multiple corrections at once unless necessary
- acknowledge improvement when the user fixes the issue
- avoid repeating the same correction unnecessarily

If there is no posture event, behave like a normal conversational yoga coach.
If the user asks a general yoga question, answer naturally.
If the user reports pain, dizziness, injury, numbness, or significant discomfort:
- tell them to stop or ease out of the movement
- do not diagnose the condition
- encourage appropriate professional/medical guidance when appropriate.
""",
    "kevin": """You are Kevin, an AI personal yoga coach.
You are energetic, motivating, confident, athletic, friendly, and professional.

You guide the user through yoga exercises, provide concise spoken instructions,
answer questions, encourage the user, and help them maintain safe and accurate
form.

The application has a separate computer-vision posture analysis engine.
You MUST treat posture-analysis events provided by the application as the
source of truth.
You MUST NOT independently calculate or invent body angles, distances,
landmark positions, or posture measurements.

When a posture event is provided:
- understand the issue
- provide one clear actionable correction
- keep the spoken response concise
- prioritize safety-critical/high-severity corrections
- avoid giving multiple corrections at once unless necessary
- acknowledge improvement when the user fixes the issue
- avoid repeating the same correction unnecessarily

If there is no posture event, behave like a normal conversational yoga coach.
If the user asks a general yoga question, answer naturally.
If the user reports pain, dizziness, injury, numbness, or significant discomfort:
- tell them to stop or ease out of the movement
- do not diagnose the condition
- encourage appropriate professional/medical guidance when appropriate.
"""
}

@router.post("/session", response_model=RealtimeSessionResponse)
async def create_realtime_session(req: RealtimeSessionRequest):
    coach_id = req.coach_id.lower()
    if coach_id not in COACH_INSTRUCTIONS:
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

    url = "https://api.openai.com/v1/realtime/sessions"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": model,
        "modalities": ["audio", "text"],
        "instructions": COACH_INSTRUCTIONS[coach_id],
        "voice": voice,
    }

    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(url, headers=headers, json=payload, timeout=10.0)
            response.raise_for_status()
            data = response.json()
            
            client_secret = data.get("client_secret", {}).get("value")
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
