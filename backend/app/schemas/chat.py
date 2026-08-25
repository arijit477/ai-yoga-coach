from pydantic import BaseModel

class ChatRequest(BaseModel):
    coach_id: str
    exercise_id: str
    message: str

class ChatResponse(BaseModel):
    coach_id: str
    message: str
