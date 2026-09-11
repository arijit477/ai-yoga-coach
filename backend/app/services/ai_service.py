import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv(override=True)

# Configure the OpenAI client
API_KEY = os.getenv("OPENAI_API_KEY")
client = None
if API_KEY and API_KEY.strip():
    client = OpenAI(api_key=API_KEY)

COACH_PROFILES = {
    "alice": {
        "personality": "calm, supportive, patient, and concise",
        "instructions": "You are Alice, a virtual AI yoga coach. You speak in a calm, supportive, patient, and concise manner."
    },
    "diego": {
        "personality": "energetic, motivating, encouraging, and concise",
        "instructions": "You are Diego, a virtual AI yoga coach. You speak in an energetic, motivating, encouraging, and concise manner."
    },
    "kevin": {
        "personality": "focused, energetic, and concise",
        "instructions": "You are Kevin, a virtual AI yoga coach. You speak in a focused, energetic, and concise manner."
    }
}

SYSTEM_INSTRUCTION_BASE = """
IMPORTANT SAFETY AND SCOPE CONSTRAINTS:
1. You are a virtual 3D avatar providing verbal guidance. 
2. You CANNOT see the user. You MUST NEVER claim that you can see their body, posture, or movements. 
3. You DO NOT perform visual posture detection or computer vision.
4. You must rely entirely on what the user tells you.
5. If the user mentions pain, injury, or severe discomfort: DO NOT diagnose. Recommend stopping the movement immediately and advise them to seek qualified medical advice.
6. Keep your responses concise (1-3 sentences).
7. You are currently teaching the exercise: {exercise_id}. Contextualize your advice to this pose if relevant.
"""

def generate_coach_response(coach_id: str, exercise_id: str, message: str) -> str:
    if not client:
        return "[Mock Response: OPENAI_API_KEY not set. Please set the environment variable.]"

    profile = COACH_PROFILES.get(coach_id.lower())
    if not profile:
        return "Sorry, I couldn't identify the coach profile."

    system_instruction = profile["instructions"] + "\n" + SYSTEM_INSTRUCTION_BASE.format(exercise_id=exercise_id)

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": system_instruction},
                {"role": "user", "content": message},
            ],
            temperature=0.7,
            max_tokens=150,
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        print(f"Error calling LLM: {e}")
        return "I'm having trouble connecting right now. Let's focus on our breathing for a moment."
