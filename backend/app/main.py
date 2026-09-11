from dotenv import load_dotenv
load_dotenv(override=True)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import chat
from app.api.routes.asanas import router as asana_router
from app.api.routes.temp import router as temp_router
from app.api.routes import realtime

app = FastAPI(title="AI Yoga Coach API", version="0.1.0")

# Setup CORS to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this to the frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router, prefix="/api")
app.include_router(asana_router)
app.include_router(temp_router)
app.include_router(realtime.router)


@app.get("/api/health")
async def health_check():
    return {"status": "ok", "message": "AI Yoga Coach backend is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
