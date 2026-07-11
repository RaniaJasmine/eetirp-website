import { supabase } from './supabase';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

async function getAuthToken() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error('Not authenticated');
  return session.access_token;
}

async function request(endpoint: string, options: RequestInit = {}) {
  const token = await getAuthToken();
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export const api = {
  getNotes: () => request('/notes'),
  getNote: (id: number) => request(`/notes/${id}`),
  createNote: (data: any) => request('/notes', { method: 'POST', body: JSON.stringify(data) }),
  updateNote: (id: number, data: any) => request(`/notes/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteNote: (id: number) => request(`/notes/${id}`, { method: 'DELETE' }),
  search: (query: string) => request(`/search?query=${encodeURIComponent(query)}`),
};