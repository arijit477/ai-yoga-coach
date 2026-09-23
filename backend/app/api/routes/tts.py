from fastapi import APIRouter, HTTPException, status, Response
from pydantic import BaseModel
import os
import httpx

router = APIRouter(prefix="/api/ai-coach/tts", tags=["tts"])

class TTSRequest(BaseModel):
    text: str
    coach_id: str

@router.post("")
async def generate_tts(req: TTSRequest):
    text = req.text.strip()
    coach_id = req.coach_id.lower()
    
    if not text:
        raise HTTPException(status_code=400, detail="Text is required")
        
    api_key = os.getenv("ELEVENLABS_API_KEY")
    if not api_key:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="ELEVENLABS_API_KEY environment variable is missing."
        )
        
    if coach_id == "alice":
        voice_id = os.getenv("ELEVENLABS_ALICE_VOICE_ID", "UPeqT2SXIhFkIpqF9UQW")
    elif coach_id == "kevin":
        voice_id = os.getenv("ELEVENLABS_KEVIN_VOICE_ID", "JBFqnCBsd6RMkjVDRZzb")
    else:
        voice_id = os.getenv("ELEVENLABS_ALICE_VOICE_ID", "UPeqT2SXIhFkIpqF9UQW")
        
    model_id = os.getenv("ELEVENLABS_MODEL_ID", "eleven_flash_v2_5")
    
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}"
    headers = {
        "xi-api-key": api_key,
        "Content-Type": "application/json",
        "Accept": "audio/mpeg"
    }
    payload = {
        "text": text,
        "model_id": model_id,
        "voice_settings": {
            "stability": 0.5,
            "similarity_boost": 0.75
        }
    }
    
    async with httpx.AsyncClient() as client:
        response = await client.post(url, json=payload, headers=headers, timeout=10.0)
        
        if response.status_code != 200:
            print(f"ElevenLabs error ({response.status_code}): {response.text}")
            
            # Fallback to OpenAI TTS if ElevenLabs fails (e.g. 401 Unauthorized)
            openai_key = os.getenv("OPENAI_API_KEY")
            if not openai_key:
                raise HTTPException(status_code=response.status_code, detail="ElevenLabs API error and no OpenAI fallback available.")
                
            print("Falling back to OpenAI TTS...")
            openai_url = "https://api.openai.com/v1/audio/speech"
            openai_headers = {
                "Authorization": f"Bearer {openai_key}",
                "Content-Type": "application/json"
            }
            openai_voice = "nova" if coach_id == "alice" else "onyx"
            openai_payload = {
                "model": "tts-1",
                "input": text,
                "voice": openai_voice
            }
            
            fallback_response = await client.post(openai_url, json=openai_payload, headers=openai_headers, timeout=10.0)
            if fallback_response.status_code != 200:
                print(f"OpenAI TTS fallback error: {fallback_response.text}")
                raise HTTPException(status_code=fallback_response.status_code, detail="Both ElevenLabs and OpenAI TTS failed.")
                
            return Response(content=fallback_response.content, media_type="audio/mpeg")
            
        return Response(content=response.content, media_type="audio/mpeg")
