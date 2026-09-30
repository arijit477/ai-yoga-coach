"""
Supabase Configuration & Health Checker
Run this script to verify your Supabase credentials, database schema, and storage buckets.
Usage:
    cd backend
    .venv\\Scripts\\python ..\\scripts\\check_supabase.py
"""

import os
import sys
from pathlib import Path
from dotenv import load_dotenv

# Base paths
ROOT_DIR = Path(__file__).resolve().parent.parent
BACKEND_ENV = ROOT_DIR / "backend" / ".env"
FRONTEND_ENV = ROOT_DIR / "frontend" / ".env"

# Load backend env
load_dotenv(BACKEND_ENV)

supabase_url = os.getenv("SUPABASE_URL") or os.getenv("VITE_SUPABASE_URL")
service_role_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
anon_key = os.getenv("VITE_SUPABASE_PUBLISHABLE_KEY") or os.getenv("VITE_SUPABASE_ANON_KEY")

print("=" * 60)
print("       AI YOGA COACH - SUPABASE CONFIGURATION CHECK")
print("=" * 60)

print(f"Backend .env path : {BACKEND_ENV} (exists: {BACKEND_ENV.exists()})")
print(f"Frontend .env path: {FRONTEND_ENV} (exists: {FRONTEND_ENV.exists()})")
print(f"Supabase URL      : {supabase_url or 'NOT SET'}")
print(f"Service Role Key  : {'SET (' + service_role_key[:8] + '...)' if service_role_key else 'NOT SET'}")
print(f"Anon Key          : {'SET (' + anon_key[:8] + '...)' if anon_key else 'NOT SET'}")
print("-" * 60)

if not supabase_url:
    print("\n[ERROR] SUPABASE_URL is missing!")
    print("Please set SUPABASE_URL in backend/.env and VITE_SUPABASE_URL in frontend/.env.")
    sys.exit(1)

# Check credentials
active_key = service_role_key or anon_key
if not active_key:
    print("\n[ERROR] Neither SUPABASE_SERVICE_ROLE_KEY nor anon key is set.")
    print("Please configure your keys in backend/.env and frontend/.env.")
    sys.exit(1)

try:
    from supabase import create_client, Client
except ImportError:
    print("\n[ERROR] The 'supabase' python package is not installed in the current environment.")
    sys.exit(1)

try:
    client: Client = create_client(supabase_url, active_key)
    print("[SUCCESS] Initialized Supabase client.")
except Exception as e:
    print(f"\n[ERROR] Failed to initialize Supabase client: {e}")
    sys.exit(1)

# 1. Test database table 'asanas'
print("\n1. Testing 'asanas' table in database...")
try:
    response = client.table("asanas").select("id", count="exact").limit(5).execute()
    count = response.count if hasattr(response, "count") and response.count is not None else len(response.data)
    print(f"   [SUCCESS] 'asanas' table exists! Row count: {count}")
    if count == 0:
        print("   [INFO] Table is empty. You can run the seed script to populate asanas.")
    else:
        sample_ids = [r.get("id") for r in response.data[:3]]
        print(f"   Sample pose IDs: {sample_ids}")
except Exception as e:
    print(f"   [WARNING] Could not query 'asanas' table: {e}")
    print("   -> Did you run the SQL migration? Check database/setup_supabase.sql")

# 2. Test storage bucket 'asana-images'
print("\n2. Testing 'asana-images' storage bucket...")
try:
    bucket_name = os.getenv("SUPABASE_ASANA_BUCKET", "asana-images")
    files = client.storage.from_(bucket_name).list(path="", options={"limit": 5})
    print(f"   [SUCCESS] Storage bucket '{bucket_name}' accessible! Items found in root: {len(files)}")
except Exception as e:
    print(f"   [WARNING] Could not access storage bucket: {e}")
    print("   -> Ensure 'asana-images' bucket is created and marked Public in Supabase.")

print("\n" + "=" * 60)
print("Configuration check complete.")
print("=" * 60)
