import os
from dotenv import load_dotenv
load_dotenv(override=True)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import chat
from app.api.routes.asanas import router as asana_router
from app.api.routes import realtime

app = FastAPI(title="AI Yoga Coach API", version="0.1.0")

# Setup CORS with configurable origins
frontend_url = os.getenv("FRONTEND_URL", "").strip()
custom_origins = os.getenv("ALLOWED_ORIGINS", "")

default_origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://ai-yoga-coach-zeta.vercel.app",
    "https://ai-yoga-coach-br648scpx-arijits-projects-f22bee41.vercel.app",
]

if frontend_url:
    default_origins.append(frontend_url)

if custom_origins.strip():
    custom_list = [o.strip() for o in custom_origins.split(",") if o.strip()]
    allowed_origins = default_origins + custom_list
else:
    allowed_origins = default_origins

# Deduplicate
allowed_origins = list(dict.fromkeys(allowed_origins))

# Allow wildcard override for development testing if explicitly configured
if os.getenv("CORS_ALLOW_ALL", "false").lower() in ("true", "1"):
    allowed_origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_origin_regex=r"https://ai-yoga-coach.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router, prefix="/api")
app.include_router(asana_router)
app.include_router(realtime.router)

@app.get("/api/health")
async def health_check():
    return {"status": "ok", "message": "AI Yoga Coach backend is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
