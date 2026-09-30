# OpenAI Realtime Session Hardening & Migration

**Repository:** [ai-yoga-coach](https://github.com/arijit477/ai-yoga-coach)  
**Date:** 2026-09-30  
**Phase:** Phase 2 — Harden the Existing OpenAI Realtime Session Architecture  

---

## Before

Prior to Phase 2 hardening, the voice session initialization mechanism functioned as follows:
- **Endpoint:** `POST /api/ai-coach/realtime/session` accepting `{ coach_id: "alice" | "kevin" }`.
- **Security Gaps:**
  - The endpoint was completely unauthenticated and had no rate limiting or abuse controls, allowing unbounded generation of OpenAI ephemeral tokens.
  - CORS in `backend/app/main.py` was hardcoded to wildcard `allow_origins=["*"]`.
  - Configuration parameters (model, voice names, timeouts) were hardcoded or scattered without centralized environment variable overrides.
  - Missing or misconfigured `OPENAI_API_KEY` or upstream errors produced unhandled or generic 500 exceptions.

---

## After

The OpenAI Realtime session architecture retains the direct client-to-OpenAI WebRTC transport while significantly hardening the backend initialization pipeline:

```
┌─────────────────────────────────────────────────────────────┐
│ 1. React Client (useRealtimeVoice / RealtimeVoiceAgent)      │
└──────────────────────────────┬──────────────────────────────┘
                               │ POST /api/ai-coach/realtime/session
                               │ { coach_id: "alice" | "kevin" }
                               │ [Optional Header: Authorization: Bearer <JWT>]
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. FastAPI Session Endpoint (routes/realtime.py)            │
│    ├── A. Coach ID Validation ('alice' / 'kevin')           │
│    ├── B. Sliding-Window Rate Limiter (e.g. 10/min/IP)      │
│    ├── C. Auth Verification (Optional / Enforceable)        │
│    └── D. Safe Env Resolution (Models, Voices, Timeouts)    │
└──────────────────────────────┬──────────────────────────────┘
                               │ POST https://api.openai.com/v1/realtime/client_secrets
                               │ Authorization: Bearer <OPENAI_API_KEY> (Server-Side)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. OpenAI Realtime API Gateway                              │
│    └── Returns ephemeral client_secret (scoped token)       │
└──────────────────────────────┬──────────────────────────────┘
                               │ { client_secret: "ek_..." }
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. React Client WebRTC Handshake                            │
│    └── POST https://api.openai.com/v1/realtime/calls        │
│        (SDP Offer + Bearer <client_secret>)                 │
└─────────────────────────────────────────────────────────────┘
```

---

## Authentication

- **Implementation:** The endpoint integrates `get_optional_user` dependency in [`realtime.py`](file:///c:/Users/prabi/OneDrive/Desktop/arijit/ai-yoga-coach/backend/app/api/routes/realtime.py).
- **Behavior:**
  - **Development / Guest Mode (Default `REALTIME_REQUIRE_AUTH=false`):** Allows practice sessions without forced login while still tracking rate limits per client IP (`ip:<client_ip>`).
  - **Authenticated Sessions:** If an `Authorization: Bearer <supabase_jwt>` header is provided, the token is verified against Supabase Auth, extracting `user.id` for user-scoped rate limiting (`user:<user_id>`).
  - **Enforced Mode (`REALTIME_REQUIRE_AUTH=true`):** Requests without a valid Supabase bearer token immediately receive `HTTP 401 Unauthorized`.

---

## Rate Limiting

- **Algorithm:** In-memory, thread-safe **Sliding-Window Rate Limiter** (`SlidingWindowRateLimiter`).
- **Default Limit:** `10` session creations per client identifier (IP or User ID) per 60-second rolling window (configurable via `REALTIME_RATE_LIMIT_PER_MINUTE`).
- **Response on Exceeded Limit:**
  - **Status Code:** `HTTP 429 Too Many Requests`.
  - **Headers:** `Retry-After: <seconds_until_oldest_request_expires>`.
  - **JSON Body:** `{"detail": "Rate limit exceeded. Too many voice session requests. Please wait a moment before trying again."}`.

---

## Configuration

All Realtime parameters are centrally managed via environment variables with production defaults:

| Variable | Default | Purpose |
| :--- | :--- | :--- |
| `OPENAI_API_KEY` | *(Required on Backend)* | Server-side OpenAI API secret key |
| `OPENAI_REALTIME_MODEL` | `gpt-realtime-2.1-mini` | OpenAI Realtime model ID |
| `OPENAI_REALTIME_VOICE_ALICE` | `sage` | Realtime voice assigned to Coach Alice |
| `OPENAI_REALTIME_VOICE_KEVIN` | `ash` | Realtime voice assigned to Coach Kevin |
| `REALTIME_SESSION_TIMEOUT_SECONDS` | `20.0` | Upstream HTTP timeout for session secret minting |
| `REALTIME_RATE_LIMIT_PER_MINUTE` | `10` | Maximum session creations per IP/user per minute |
| `REALTIME_REQUIRE_AUTH` | `false` | Whether to strictly require Supabase authentication |
| `FRONTEND_URL` | `http://localhost:5173` | Primary frontend origin for CORS |
| `ALLOWED_ORIGINS` | `http://localhost:5173,http://127.0.0.1:5173,http://localhost:3000` | Comma-separated CORS allowed origins |
| `CORS_ALLOW_ALL` | `false` | Development flag to allow all origins if explicitly set to `true` |

---

## Security

> [!IMPORTANT]
> **The permanent OpenAI API key remains server-side.**  
> It is strictly read from `backend/.env` and never transmitted across network responses, bundled into the frontend Vite distribution, or printed in logs or error traces.

- **Ephemeral Token Scope:** The frontend receives solely a short-lived `client_secret` usable exclusively for WebRTC signaling at `/v1/realtime/calls`.
- **CORS Hardening:** FastAPI `CORSMiddleware` in [`main.py`](file:///c:/Users/prabi/OneDrive/Desktop/arijit/ai-yoga-coach/backend/app/main.py) restricts origin headers to authorized URLs rather than universal wildcard access.
- **Sanitized Errors:** Upstream OpenAI error messages and internal exception traces are sanitized before sending responses to the client (returning clean HTTP 400, 401, 429, 500, or 502 status codes).

---

## Testing

The following test suites and validations were executed:

1. **Backend Unit Tests ([`test_realtime_hardening.py`](file:///c:/Users/prabi/OneDrive/Desktop/arijit/ai-yoga-coach/backend/test_realtime_hardening.py)):**
   - `test_invalid_coach_id`: Verifies rejection of invalid coach IDs with `HTTP 400`.
   - `test_rate_limiting`: Verifies 3 allowed session creations followed by `HTTP 429` with `Retry-After` header on the 4th request within the rolling window.
   - `test_missing_api_key`: Verifies clean `HTTP 500` error response without secret leakage when `OPENAI_API_KEY` is absent.
   - `test_upstream_error_handling`: Verifies upstream OpenAI errors are mapped to `HTTP 502 Bad Gateway`.
   - `test_auth_requirement_toggle`: Verifies `HTTP 401 Unauthorized` when `REALTIME_REQUIRE_AUTH=true` without bearer tokens.
   - **Result:** `5/5 tests PASSED (0.98s)`.

2. **Backend Application Initialization:**
   - Successfully loaded FastAPI application and confirmed all 13 routes are registered.

3. **Frontend Production Build:**
   - Ran `npm.cmd run build` (`tsc -b && vite build`).
   - **Result:** Successfully compiled 1,917 modules into `dist/` with 0 TypeScript or build errors.

4. **Secret Scanning:**
   - Verified that no permanent OpenAI API credentials exist in client bundles, public assets, or frontend `.env.example`.
