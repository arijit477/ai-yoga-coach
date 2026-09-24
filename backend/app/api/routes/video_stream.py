from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from typing import Dict, Any
import json
from app.services.pose_analysis.pipeline import process_frame

router = APIRouter(prefix="/api/ai-coach/video", tags=["video"])

@router.websocket("/stream")
async def video_stream(websocket: WebSocket):
    await websocket.accept()
    
    try:
        while True:
            # Receive frame data and current asana from client
            data = await websocket.receive_text()
            payload = json.loads(data)
            
            frame_data = payload.get("frame")
            asana_id = payload.get("asanaId", "warrior-ii")
            
            if not frame_data:
                await websocket.send_json({"error": "No frame data"})
                continue
                
            # Process the frame
            result = process_frame(frame_data, asana_id)
            
            # Send results back
            await websocket.send_json(result)
            
    except WebSocketDisconnect:
        print("Client disconnected from video stream")
    except Exception as e:
        print(f"Error in video stream: {e}")
        try:
            await websocket.send_json({"error": str(e)})
        except:
            pass
