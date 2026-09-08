import os
from pathlib import Path

from app.core.supabase import supabase


BUCKET_NAME = os.getenv("SUPABASE_ASANA_BUCKET", "asana-images")


def get_public_image_url(file_path: str) -> str:
    response = supabase.storage \
        .from_(BUCKET_NAME) \
        .get_public_url(file_path)

    return response


def upload_asana_image(
    file_content: bytes,
    file_path: str,
    content_type: str,
) -> str:

    supabase.storage \
        .from_(BUCKET_NAME) \
        .upload(
            path=file_path,
            file=file_content,
            file_options={
                "content-type": content_type,
                "cache-control": "3600",
                "upsert": "false",
            },
        )

    return get_public_image_url(file_path)