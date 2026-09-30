import logging
import os
from typing import Optional
from dotenv import load_dotenv
from supabase import Client, create_client

load_dotenv()

logger = logging.getLogger("supabase")

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

supabase: Optional[Client] = None

if SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY:
    try:
        supabase = create_client(
            SUPABASE_URL,
            SUPABASE_SERVICE_ROLE_KEY,
        )
    except Exception as e:
        logger.error(f"Failed to initialize Supabase client: {e}")
else:
    logger.warning(
        "[Supabase] SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not configured in backend/.env. "
        "Storage and database operations will be unavailable until credentials are provided."
    )


def get_supabase_client() -> Client:
    if supabase is None:
        raise RuntimeError(
            "Supabase client is not configured. Please set SUPABASE_URL and "
            "SUPABASE_SERVICE_ROLE_KEY in backend/.env"
        )
    return supabase