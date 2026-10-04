import os
import httpx
from dotenv import load_dotenv

load_dotenv()

key = os.getenv("OPENAI_API_KEY")

print("KEY_EXISTS =", bool(key))
print("KEY_LENGTH =", len(key.strip()) if key else 0)

headers = {
    "Authorization": f"Bearer {key.strip()}" if key else "",
    "Content-Type": "application/json",
}

payload = {
    "session": {
        "type": "realtime",
        "model": os.getenv("OPENAI_REALTIME_MODEL", "gpt-realtime-2.1-mini"),
        "audio": {
            "output": {
                "voice": "sage"
            }
        }
    }
}

try:
    response = httpx.post(
        "https://api.openai.com/v1/realtime/client_secrets",
        headers=headers,
        json=payload,
        timeout=20,
    )

    print("STATUS =", response.status_code)
    print("RESPONSE =")
    print(response.text[:1000])

except Exception as e:
    print("REQUEST_ERROR =", repr(e))
