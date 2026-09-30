"""
Seed Supabase 'asanas' table with all 170 yoga poses from allAsanasCatalog.ts
Usage:
    cd backend
    .venv\\Scripts\\python ..\\scripts\\seed_supabase.py
"""

import json
import os
import re
import sys
from pathlib import Path
from dotenv import load_dotenv

ROOT_DIR = Path(__file__).resolve().parent.parent
BACKEND_ENV = ROOT_DIR / "backend" / ".env"
FRONTEND_ENV = ROOT_DIR / "frontend" / ".env"

load_dotenv(BACKEND_ENV)
load_dotenv(FRONTEND_ENV)

supabase_url = os.getenv("SUPABASE_URL") or os.getenv("VITE_SUPABASE_URL")
service_role_key = (
    os.getenv("SUPABASE_SERVICE_ROLE_KEY")
    or os.getenv("VITE_SUPABASE_PUBLISHABLE_KEY")
    or os.getenv("VITE_SUPABASE_ANON_KEY")
)

if not supabase_url or not service_role_key:
    print("[ERROR] Missing Supabase credentials in backend/.env or frontend/.env")
    print("Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.")
    sys.exit(1)

try:
    from supabase import create_client, Client
except ImportError:
    print("[ERROR] 'supabase' python package not installed.")
    sys.exit(1)

catalog_file = ROOT_DIR / "frontend" / "src" / "features" / "ai-coach" / "data" / "allAsanasCatalog.ts"
if not catalog_file.exists():
    print(f"[ERROR] Catalog file not found at {catalog_file}")
    sys.exit(1)

content = catalog_file.read_text(encoding="utf-8")
json_match = re.search(r"export const ALL_ASANAS_CATALOG:\s*AsanaDefinition\[\]\s*=\s*(\[[\s\S]*?\]);\s*$", content)
if not json_match:
    print("[ERROR] Could not parse ALL_ASANAS_CATALOG JSON from TypeScript file.")
    sys.exit(1)

try:
    asanas = json.loads(json_match.group(1))
except Exception as e:
    print(f"[ERROR] Failed parsing catalog JSON: {e}")
    sys.exit(1)

print(f"Loaded {len(asanas)} asanas from catalog.")

client: Client = create_client(supabase_url, service_role_key)

print(f"Connecting to Supabase at: {supabase_url}")

# Batch upsert in chunks of 25
chunk_size = 25
success_count = 0

for i in range(0, len(asanas), chunk_size):
    chunk = asanas[i : i + chunk_size]
    batch_rows = []
    for a in chunk:
        row = {
            "id": a["id"],
            "slug": a.get("slug", a["id"]),
            "name": a.get("name", a.get("displayName", a["id"])),
            "sanskrit_name": a.get("sanskritName"),
            "category": a.get("category"),
            "difficulty": a.get("difficulty"),
            "storage_path": a.get("storagePath"),
            "image_url": a.get("imageUrl"),
            "video_url": a.get("videoUrl"),
            "description": a.get("description"),
            "benefits": a.get("benefits", []),
            "instructions": a.get("instructions", []),
            "cues": a.get("cues", []),
            "rules": a.get("rules", []),
            "target_hold_seconds": a.get("targetHoldSeconds", 5),
            "rule_ids": a.get("ruleIds", []),
            "is_premium": a.get("isPremium", False),
            "order_index": a.get("orderIndex", 0),
        }
        batch_rows.append(row)

    try:
        res = client.table("asanas").upsert(batch_rows).execute()
        success_count += len(batch_rows)
        print(f"  Processed {min(i + chunk_size, len(asanas))}/{len(asanas)} asanas...")
    except Exception as exc:
        print(f"  [ERROR] Batch {i} to {i + chunk_size} failed: {exc}")

print(f"\n[DONE] Successfully seeded {success_count}/{len(asanas)} asanas into Supabase!")
