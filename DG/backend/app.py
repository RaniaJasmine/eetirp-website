import os
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from supabase_client import supabase
from ai.services import get_embedding, generate_summary
from models.notes import NoteCreate, NoteUpdate, NoteOut
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://your-frontend-url.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_current_user(authorization: str = None) -> str:
    if not authorization:
        raise HTTPException(401, "Not authenticated")
    token = authorization.replace("Bearer ", "")
    try:
        user = supabase.auth.get_user(token)
        return user.user.id
    except Exception:
        raise HTTPException(401, "Invalid token")

@app.post("/notes", response_model=NoteOut)
def create_note(note: NoteCreate, user_id: str = Depends(get_current_user)):
    embedding = get_embedding(note.content)
    summary = generate_summary(note.content)
    data = {
        "user_id": user_id,
        "title": note.title,
        "content": note.content,
        "tags": note.tags,
        "category": note.category,
        "embedding": embedding,
        "summary": summary
    }
    result = supabase.table("notes").insert(data).execute()
    return result.data[0]

@app.get("/notes", response_model=list[NoteOut])
def list_notes(user_id: str = Depends(get_current_user)):
    result = supabase.table("notes").select("*").eq("user_id", user_id).order("created_at", desc=True).execute()
    return result.data

@app.get("/notes/{note_id}", response_model=NoteOut)
def get_note(note_id: int, user_id: str = Depends(get_current_user)):
    result = supabase.table("notes").select("*").eq("id", note_id).eq("user_id", user_id).execute()
    if not result.data:
        raise HTTPException(404, "Note not found")
    return result.data[0]

@app.put("/notes/{note_id}")
def update_note(note_id: int, update: NoteUpdate, user_id: str = Depends(get_current_user)):
    payload = update.dict(exclude_unset=True)
    if "content" in payload:
        payload["embedding"] = get_embedding(payload["content"])
        payload["summary"] = generate_summary(payload["content"])
    result = supabase.table("notes").update(payload).eq("id", note_id).eq("user_id", user_id).execute()
    if not result.data:
        raise HTTPException(404, "Note not found")
    return {"message": "updated"}

@app.delete("/notes/{note_id}")
def delete_note(note_id: int, user_id: str = Depends(get_current_user)):
    result = supabase.table("notes").delete().eq("id", note_id).eq("user_id", user_id).execute()
    if not result.data:
        raise HTTPException(404, "Note not found")
    return {"message": "deleted"}

@app.get("/search")
def semantic_search(query: str, user_id: str = Depends(get_current_user), limit: int = 5):
    query_emb = get_embedding(query)
    result = supabase.rpc("match_notes", {
        "query_embedding": query_emb,
        "match_threshold": 0.7,
        "match_count": limit
    }).execute()
    # Filter by user_id because the RPC doesn't automatically filter
    filtered = [row for row in result.data if row.get("user_id") == user_id]
    return filtered