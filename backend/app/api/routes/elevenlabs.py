import os
import asyncio
import json
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
import websockets

router = APIRouter(prefix="/api/ai-coach/voice", tags=["voice"])

@router.websocket("/stream")
async def voice_stream(websocket: WebSocket, coach_id: str = "alice"):
    await websocket.accept()

    api_key = os.getenv("ELEVENLABS_API_KEY")
    if not api_key:
        print("[ElevenLabs Proxy] Error: ELEVENLABS_API_KEY not set")
        await websocket.close(code=1011, reason="ELEVENLABS_API_KEY not set")
        return

    model_id = os.getenv("ELEVENLABS_MODEL_ID", "eleven_flash_v2_5")

    # Determine voice ID based on coach
    if coach_id.lower() == "kevin":
        voice_id = os.getenv("ELEVENLABS_KEVIN_VOICE_ID", "pNInz6obbfDQGcgMyIGC")
    else:
        voice_id = os.getenv("ELEVENLABS_ALICE_VOICE_ID", "21m00Tcm4TlvDq8ikWAM")

    elevenlabs_ws_url = f"wss://api.elevenlabs.io/v1/text-to-speech/{voice_id}/stream-input?model_id={model_id}&output_format=pcm_16000"

    try:
        async with websockets.connect(
            elevenlabs_ws_url,
            additional_headers={"xi-api-key": api_key}
        ) as el_ws:
            
            # Send initial configuration
            init_msg = {
                "text": " ",
                "voice_settings": {
                    "stability": 0.5,
                    "similarity_boost": 0.8
                },
                "generation_config": {
                    "chunk_length_schedule": [50]
                }
            }
            await el_ws.send(json.dumps(init_msg))

            # Task to forward text from Frontend -> ElevenLabs
            async def forward_to_el():
                try:
                    while True:
                        data = await websocket.receive_text()
                        msg = json.loads(data)
                        
                        if msg.get("type") == "text":
                            # Stream text chunk
                            await el_ws.send(json.dumps({
                                "text": msg.get("text", "") + " "
                            }))
                        elif msg.get("type") == "flush":
                            # Flush the stream
                            await el_ws.send(json.dumps({
                                "text": "",
                                "flush": True
                            }))
                        elif msg.get("type") == "close":
                            # Close the stream
                            await el_ws.send(json.dumps({
                                "text": ""
                            }))
                            break
                except WebSocketDisconnect:
                    print("[ElevenLabs Proxy] Frontend disconnected")
                except Exception as e:
                    print(f"[ElevenLabs Proxy] Error forwarding to ElevenLabs: {e}")

            # Task to forward audio from ElevenLabs -> Frontend
            async def forward_to_frontend():
                try:
                    while True:
                        response_str = await el_ws.recv()
                        response = json.loads(response_str)
                        
                        if response.get("audio"):
                            # Forward base64 audio to frontend
                            await websocket.send_json({
                                "type": "audio",
                                "audio": response["audio"],
                                "isFinal": response.get("isFinal", False)
                            })
                            
                        if response.get("isFinal"):
                            # This stream is finished
                            pass
                except websockets.exceptions.ConnectionClosed:
                    print("[ElevenLabs Proxy] ElevenLabs connection closed")
                except Exception as e:
                    print(f"[ElevenLabs Proxy] Error forwarding to Frontend: {e}")

            # Run both tasks concurrently
            await asyncio.gather(
                forward_to_el(),
                forward_to_frontend(),
                return_exceptions=True
            )

    except Exception as e:
        print(f"[ElevenLabs Proxy] Connection error: {e}")
        try:
            await websocket.close(code=1011, reason="ElevenLabs Connection Error")
        except:
            pass
