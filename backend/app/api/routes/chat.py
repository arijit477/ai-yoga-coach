from fastapi import APIRouter, HTTPException
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.ai_service import generate_coach_response

router = APIRouter()

@router.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    try:
        response_message = generate_coach_response(
            coach_id=request.coach_id,
            exercise_id=request.exercise_id,
            message=request.message
        )
        return ChatResponse(
            coach_id=request.coach_id,
            message=response_message
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail="An error occurred while generating the response")
