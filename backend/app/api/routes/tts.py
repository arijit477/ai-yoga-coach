from fastapi import APIRouter, HTTPException, status, Response
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import os
import httpx

router = APIRouter(prefix="/api/ai-coach/tts", tags=["tts"])

class TTSRequest(BaseModel):
    text: str
    coach_id: str = "alice"

def get_elevenlabs_config(coach_id: str):
    api_key = os.getenv("ELEVENLABS_API_KEY")
    if not api_key:
        return None, None, None
    if coach_id == "kevin":
        voice_id = os.getenv("ELEVENLABS_KEVIN_VOICE_ID", "JBFqnCBsd6RMkjVDRZzb")
    else:
        voice_id = os.getenv("ELEVENLABS_ALICE_VOICE_ID", "UPeqT2SXIhFkIpqF9UQW")
    model_id = os.getenv("ELEVENLABS_MODEL_ID", "eleven_flash_v2_5")
    return api_key, voice_id, model_id

def get_openai_config(coach_id: str):
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        return None, None
    voice = "nova" if coach_id != "kevin" else "onyx"
    return api_key, voice


@router.post("")
async def generate_tts(req: TTSRequest):
    text = req.text.strip()
    coach_id = req.coach_id.lower()
    
    if not text:
        raise HTTPException(status_code=400, detail="Text is required")
        
    el_key, voice_id, model_id = get_elevenlabs_config(coach_id)
    openai_key, openai_voice = get_openai_config(coach_id)

    if not el_key and not openai_key:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Neither ELEVENLABS_API_KEY nor OPENAI_API_KEY is configured."
        )

    async with httpx.AsyncClient(timeout=15.0) as client:
        # Try ElevenLabs first if key is present
        if el_key:
            try:
                url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}"
                headers = {
                    "xi-api-key": el_key,
                    "Content-Type": "application/json",
                    "Accept": "audio/mpeg"
                }
                payload = {
                    "text": text,
                    "model_id": model_id,
                    "voice_settings": {"stability": 0.5, "similarity_boost": 0.75}
                }
                response = await client.post(url, json=payload, headers=headers)
                if response.status_code == 200:
                    return Response(content=response.content, media_type="audio/mpeg")
                print(f"ElevenLabs error ({response.status_code}): {response.text}")
            except Exception as e:
                print(f"ElevenLabs request exception: {e}")

        # Fallback to OpenAI TTS
        if openai_key:
            try:
                openai_url = "https://api.openai.com/v1/audio/speech"
                openai_headers = {
                    "Authorization": f"Bearer {openai_key}",
                    "Content-Type": "application/json"
                }
                openai_payload = {
                    "model": "tts-1",
                    "input": text,
                    "voice": openai_voice
                }
                fb_response = await client.post(openai_url, json=openai_payload, headers=openai_headers)
                if fb_response.status_code == 200:
                    return Response(content=fb_response.content, media_type="audio/mpeg")
                print(f"OpenAI TTS error ({fb_response.status_code}): {fb_response.text}")
            except Exception as e:
                print(f"OpenAI TTS request exception: {e}")

    raise HTTPException(status_code=500, detail="All TTS providers failed to generate audio.")


@router.get("")
async def generate_tts_get(text: str, coach_id: str = "alice"):
    text = text.strip()
    coach_id = coach_id.lower()
    
    if not text:
        raise HTTPException(status_code=400, detail="Text is required")
        
    el_key, voice_id, model_id = get_elevenlabs_config(coach_id)
    openai_key, openai_voice = get_openai_config(coach_id)

    if not el_key and not openai_key:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Neither ELEVENLABS_API_KEY nor OPENAI_API_KEY is configured."
        )

    async def stream_generator():
        async with httpx.AsyncClient(timeout=20.0) as client:
            # 1. Try ElevenLabs streaming if key is present
            if el_key:
                try:
                    url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}/stream"
                    headers = {
                        "xi-api-key": el_key,
                        "Content-Type": "application/json",
                        "Accept": "audio/mpeg"
                    }
                    payload = {
                        "text": text,
                        "model_id": model_id,
                        "voice_settings": {"stability": 0.5, "similarity_boost": 0.75}
                    }
                    async with client.stream("POST", url, json=payload, headers=headers) as response:
                        if response.status_code == 200:
                            async for chunk in response.aiter_bytes():
                                yield chunk
                            return
                        print(f"ElevenLabs stream error ({response.status_code})")
                except Exception as e:
                    print(f"ElevenLabs streaming exception: {e}")

            # 2. Fallback to OpenAI streaming
            if openai_key:
                try:
                    openai_url = "https://api.openai.com/v1/audio/speech"
                    openai_headers = {
                        "Authorization": f"Bearer {openai_key}",
                        "Content-Type": "application/json"
                    }
                    openai_payload = {
                        "model": "tts-1",
                        "input": text,
                        "voice": openai_voice
                    }
                    async with client.stream("POST", openai_url, json=openai_payload, headers=openai_headers) as fb_response:
                        if fb_response.status_code == 200:
                            async for chunk in fb_response.aiter_bytes():
                                yield chunk
                            return
                        err_body = await fb_response.aread()
                        print(f"OpenAI TTS stream error ({fb_response.status_code}): {err_body.decode('utf-8', errors='ignore')}")
                except Exception as e:
                    print(f"OpenAI streaming exception: {e}")

    return StreamingResponse(stream_generator(), media_type="audio/mpeg")
