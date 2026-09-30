from fastapi import APIRouter
from app.core.supabase import get_supabase_client

router = APIRouter(
    prefix="/api/asanas",
    tags=["Asanas"],
)


@router.get("/assets")
def get_asana_assets():
    try:
        client = get_supabase_client()
        result = (
            client
            .storage
            .from_("asana-images")
            .list("yogaverse-model-asanas")
        )

        return {
            "success": True,
            "files": result,
        }

    except Exception as exc:
        print("SUPABASE STORAGE ERROR:", repr(exc))

        return {
            "success": False,
            "error": str(exc),
        }