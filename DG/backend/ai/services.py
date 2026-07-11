import groq
from sentence_transformers import SentenceTransformer
import os

# Hardcode Groq key temporarily
GROQ_API_KEY = "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"
groq_client = groq.Groq(api_key=GROQ_API_KEY)
embedding_model = SentenceTransformer('all-MiniLM-L6-v2')

def get_embedding(text: str) -> list:
    return embedding_model.encode(text).tolist()

def generate_summary(content: str) -> str:
    prompt = f"Summarize the following note in 2 short sentences:\n\n{content}"
    completion = groq_client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3,
        max_tokens=150
    )
    return completion.choices[0].message.content