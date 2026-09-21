from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.ai_service import generate_coach_response

router = APIRouter()

class AsanaScore(BaseModel):
    name: str
    score: int

class SessionSummaryRequest(BaseModel):
    asanas: List[AsanaScore]

class SessionSummaryResponse(BaseModel):
    summary: str

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

@router.post("/chat/summary", response_model=SessionSummaryResponse)
async def chat_summary_endpoint(request: SessionSummaryRequest):
    try:
        if not request.asanas:
            return SessionSummaryResponse(summary="You didn't complete any poses, but showing up is half the battle! Keep trying.")
        
        avg_score = sum(a.score for a in request.asanas) / len(request.asanas)
        best_asana = max(request.asanas, key=lambda a: a.score)
        
        # In a real app we would call OpenAI, but we can generate a simple one here.
        if avg_score >= 80:
            summary = f"Phenomenal session! Your alignment was incredibly solid with an average score of {avg_score:.0f}%. You particularly excelled at {best_asana.name} ({best_asana.score}%). Keep up this beautiful practice!"
        elif avg_score >= 60:
            summary = f"Great work today! You maintained good form with an average score of {avg_score:.0f}%. Your {best_asana.name} was your strongest pose ({best_asana.score}%). With consistency, your flexibility and balance will continue to grow."
        else:
            summary = f"Good effort showing up to your mat today! Your average score was {avg_score:.0f}%. Your best pose was {best_asana.name}. Focus on your breath and don't push past your limits. You'll see improvement over time!"
            
        return SessionSummaryResponse(summary=summary)
    except Exception as e:
        raise HTTPException(status_code=500, detail="An error occurred while generating the summary")
