from fastapi import APIRouter, File, Form, HTTPException, UploadFile

from app.services.storage_service import upload_asana_image


router = APIRouter(
    prefix="/api/asanas",
    tags=["Asanas"],
)


@router.post("/upload-image")
async def upload_asana_image_endpoint(
    asana_slug: str = Form(...),
    file: UploadFile = File(...),
):
    if not file.content_type:
        raise HTTPException(
            status_code=400,
            detail="File content type is missing.",
        )

    allowed_types = {
        "image/jpeg",
        "image/png",
        "image/webp",
    }

    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail="Only JPEG, PNG and WebP images are supported.",
        )

    file_extension = file.filename.split(".")[-1].lower()

    storage_path = (
        f"{asana_slug}/reference.{file_extension}"
    )

    file_content = await file.read()

    try:
        public_url = upload_asana_image(
            file_content=file_content,
            file_path=storage_path,
            content_type=file.content_type,
        )

        return {
            "success": True,
            "asana_slug": asana_slug,
            "storage_path": storage_path,
            "image_url": public_url,
        }

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to upload image: {str(exc)}",
        )