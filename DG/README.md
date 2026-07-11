# Digital Curator – AI‑Powered Knowledge Wiki

A personal knowledge management system with AI‑generated summaries, semantic search, and graph visualisation.

## Tech Stack
- **Frontend**: React, TypeScript, Vite, Tailwind CSS, Supabase Auth
- **Backend**: FastAPI, Groq (Llama 3.3), Sentence‑Transformers
- **Database**: Supabase (PostgreSQL + pgvector)

## Setup

### 1. Supabase
- Create a project.
- Run `supabase/schema.sql` in the SQL Editor.
- Enable Google OAuth (or email/password) in Authentication → Providers.

### 2. Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env       # fill in your keys
python -m uvicorn app:app --reload --port 8000