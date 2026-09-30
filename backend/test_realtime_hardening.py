import os
import unittest
from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock

# Set test environment
os.environ["OPENAI_API_KEY"] = "test-sk-key"
os.environ["REALTIME_RATE_LIMIT_PER_MINUTE"] = "3"
os.environ["REALTIME_REQUIRE_AUTH"] = "false"

from app.main import app
from app.api.routes.realtime import session_rate_limiter

class TestRealtimeHardening(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)
        session_rate_limiter.reset()

    def test_invalid_coach_id(self):
        response = self.client.post(
            "/api/ai-coach/realtime/session",
            json={"coach_id": "invalid_coach"}
        )
        self.assertEqual(response.status_code, 400)
        self.assertIn("Invalid coach_id", response.json()["detail"])

    def test_rate_limiting(self):
        # We configured limit = 3 per minute
        with patch("httpx.AsyncClient.post") as mock_post:
            mock_response = MagicMock()
            mock_response.status_code = 200
            mock_response.json.return_value = {"value": "ek_test_secret_123"}
            mock_response.raise_for_status = MagicMock()
            mock_post.return_value = mock_response

            # 1st request -> ok
            r1 = self.client.post("/api/ai-coach/realtime/session", json={"coach_id": "alice"})
            self.assertEqual(r1.status_code, 200)
            self.assertEqual(r1.json()["client_secret"], "ek_test_secret_123")

            # 2nd request -> ok
            r2 = self.client.post("/api/ai-coach/realtime/session", json={"coach_id": "kevin"})
            self.assertEqual(r2.status_code, 200)

            # 3rd request -> ok
            r3 = self.client.post("/api/ai-coach/realtime/session", json={"coach_id": "alice"})
            self.assertEqual(r3.status_code, 200)

            # 4th request -> 429 Rate Limit Exceeded
            r4 = self.client.post("/api/ai-coach/realtime/session", json={"coach_id": "alice"})
            self.assertEqual(r4.status_code, 429)
            self.assertIn("Rate limit exceeded", r4.json()["detail"])
            self.assertIn("retry-after", r4.headers)

    def test_missing_api_key(self):
        with patch.dict(os.environ, {"OPENAI_API_KEY": ""}):
            session_rate_limiter.reset()
            response = self.client.post(
                "/api/ai-coach/realtime/session",
                json={"coach_id": "alice"}
            )
            self.assertEqual(response.status_code, 500)
            self.assertNotIn("sk-", response.text)
            self.assertIn("Voice service is temporarily unavailable", response.json()["detail"])

    def test_upstream_error_handling(self):
        import httpx
        with patch("httpx.AsyncClient.post") as mock_post:
            session_rate_limiter.reset()
            req = httpx.Request("POST", "https://api.openai.com/v1/realtime/client_secrets")
            resp = httpx.Response(status_code=500, request=req, text="Upstream Internal Error")
            mock_post.side_effect = httpx.HTTPStatusError("Upstream Error", request=req, response=resp)

            response = self.client.post(
                "/api/ai-coach/realtime/session",
                json={"coach_id": "alice"}
            )
            self.assertEqual(response.status_code, 502)
            self.assertIn("Upstream voice provider error", response.json()["detail"])

    def test_auth_requirement_toggle(self):
        with patch.dict(os.environ, {"REALTIME_REQUIRE_AUTH": "true"}):
            session_rate_limiter.reset()
            # Request without bearer token should fail with 401
            response = self.client.post(
                "/api/ai-coach/realtime/session",
                json={"coach_id": "alice"}
            )
            self.assertEqual(response.status_code, 401)
            self.assertIn("Authentication required", response.json()["detail"])

if __name__ == "__main__":
    unittest.main()
