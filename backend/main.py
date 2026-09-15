"""
Entrypoint shim for deployment platforms that run `uvicorn main:app`.
Redirects to the FastAPI app defined in `app.main`.
"""
from app.main import app

__all__ = ["app"]
