
import os

from dotenv import load_dotenv
from openai import OpenAI

# Load API credentials and model settings from backend/.env
load_dotenv()

API_KEY = os.getenv("NEBIUS_API_KEY")
MODEL = os.getenv("NEBIUS_MODEL")

if not API_KEY or not MODEL:
    raise RuntimeError(
        "Missing NEBIUS_API_KEY or NEBIUS_MODEL in backend/.env"
    )

client = OpenAI(
    base_url="https://api.tokenfactory.nebius.com/v1/",
    api_key=API_KEY,
)


def ask_nebius(prompt: str) -> str:
    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {
                "role": "system",
                "content": (
                    "You are Research2Build AI, an assistant that "
                    "turns machine learning research into reproducible "
                    "experiments."
                ),
            },
            {"role": "user", "content": prompt},
        ],
        temperature=0.2,
    )

    return response.choices[0].message.content or ""
