from pydantic import BaseModel
from typing import List, Optional

class NoteCreate(BaseModel):
    title: str
    content: str
    tags: Optional[List[str]] = []
    category: Optional[str] = None

class NoteUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    tags: Optional[List[str]] = None
    category: Optional[str] = None
    summary: Optional[str] = None

class NoteOut(BaseModel):
    id: int
    title: str
    content: str
    summary: Optional[str] = None
    tags: List[str]
    category: Optional[str] = None
    created_at: str