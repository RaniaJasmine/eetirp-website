import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { motion, AnimatePresence } from 'motion/react'
import { 
  Menu, Search, Plus, Home, BookOpen, Share2, Sparkles, Calendar,
  Layers, Settings, ChevronRight, User, LogOut, Bell, MoreVertical,
  Sun, Moon, Library as LibraryIcon, ArrowLeft, Edit2, Trash2
} from 'lucide-react'
import { cn } from './utils'
import RichTextEditor from './components/RichTextEditor'

// ---------- Types ----------
type View = 'dashboard' | 'library' | 'graph' | 'note'

interface Note {
  id: string
  title: string
  content: string
  tags: string[]
  category: string
  summary?: string
  created_at: string
}

// ---------- Helper: strip HTML for preview ----------
function stripHtml(html: string) {
  if (!html) return ''
  const tmp = document.createElement('div')
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText || ''
}

// ---------- Supabase & API ----------
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
const API_URL = import.meta.env.VITE_API_URL

// ---------- UI Components (from your design) ----------
const SidebarItem = ({ icon: Icon, label, active = false, onClick }: { icon: any, label: string, active?: boolean, onClick: () => void }) => (
  <button onClick={onClick} className={`relative w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${active ? 'bg-surface-container-high text-primary font-medium' : 'text-on-surface-variant hover:bg-surface-container-low'}`}>
    <Icon size={20} className={active ? 'text-primary' : 'text-outline'} />
    <span className="font-serif text-lg">{label}</span>
    {active && <motion.div layoutId="active-pill" className="absolute left-0 w-1 h-6 bg-secondary rounded-full" />}
  </button>
)

const NavButton = ({ icon: Icon, label, active = false, onClick }: { icon: any, label: string, active?: boolean, onClick: () => void }) => (
  <button onClick={onClick} className={`flex flex-col items-center justify-center gap-1 transition-all flex-1 py-1 ${active ? 'text-primary' : 'text-outline'}`}>
    <Icon size={24} strokeWidth={active ? 2.5 : 2} />
    <span className="text-[10px] uppercase font-bold tracking-widest">{label}</span>
  </button>
)

const Tag = ({ label, secondary = false }: { label: string, secondary?: boolean }) => (
  <button className={`px-4 py-1.5 rounded-full text-[12px] font-bold tracking-wider transition-all hover:scale-105 active:scale-95 ${secondary ? 'bg-secondary text-surface shadow-sm' : 'bg-surface-container text-on-surface-variant'}`}>
    {label}
  </button>
)

const NoteCard = ({ note, onClick }: { note: Note; onClick: () => void }) => (
  <motion.div whileHover={{ y: -4 }} className="card-premium group p-8 cursor-pointer" onClick={onClick}>
    <div className="flex justify-between items-start mb-4">
      <div className="space-y-1">
        <h4 className="font-serif text-2xl text-primary group-hover:text-secondary transition-colors leading-tight">{note.title}</h4>
        <div className="flex items-center gap-2 text-xs italic text-outline font-serif">
          <Calendar size={12} />
          <span>{new Date(note.created_at).toLocaleDateString()}</span>
        </div>
      </div>
      <button className="p-2 text-outline hover:text-primary transition-colors opacity-0 group-hover:opacity-100">
        <MoreVertical size={16} />
      </button>
    </div>
    <p className="text-on-surface-variant text-body-md leading-relaxed line-clamp-3 mb-6 font-serif opacity-80 group-hover:opacity-100 transition-opacity">
      {stripHtml(note.content)}
    </p>
    <div className="flex flex-wrap gap-2">
      {note.tags?.map(tag => (
        <span key={tag} className="text-[10px] uppercase font-bold tracking-tighter bg-surface-container-low border border-outline-variant/30 px-3 py-1 rounded-md text-outline">
          {tag}
        </span>
      ))}
    </div>
  </motion.div>
)

const ProfileDropdown = ({ isLoggedIn, onToggle, theme, onThemeChange }: { 
  isLoggedIn: boolean; onToggle: () => void; theme: string; onThemeChange: (t: 'light' | 'dark' | 'reading') => void 
}) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="w-10 h-10 rounded-full border border-outline-variant overflow-hidden flex items-center justify-center hover:bg-surface-container-low transition-colors">
        {isLoggedIn ? (
          <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Curator" alt="Avatar" className="w-full h-full object-cover" />
        ) : (
          <User size={20} className="text-outline" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} className="absolute right-0 mt-2 w-64 bg-surface border border-outline-variant shadow-elevated rounded-2xl z-50 overflow-hidden">
              <div className="p-4 border-b border-outline-variant bg-surface-container-low/50">
                <p className="text-xs font-bold uppercase tracking-widest text-outline mb-1">Account</p>
                <p className="font-serif text-primary text-lg truncate">Curator</p>
              </div>
              <div className="p-4 border-b border-outline-variant">
                <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-3">Appearance</p>
                <div className="grid grid-cols-3 gap-1">
                  {['light', 'dark', 'reading'].map((t) => (
                    <button key={t} onClick={() => onThemeChange(t as any)} className={`py-2 text-[10px] font-bold rounded-lg border transition-all ${theme === t ? 'bg-primary text-surface border-primary' : 'bg-surface-container-low text-outline border-outline-variant/30'}`}>
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-2">
                <button className="w-full flex items-center gap-3 px-3 py-2 text-on-surface hover:bg-surface-container-low rounded-xl transition-colors text-sm font-serif">
                  <User size={16} /> Profile Settings
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2 text-on-surface hover:bg-surface-container-low rounded-xl transition-colors text-sm font-serif">
                  <Bell size={16} /> Notifications
                </button>
              </div>
              <div className="p-2 border-t border-outline-variant">
                <button onClick={onToggle} className="w-full flex items-center gap-3 px-3 py-2 text-tertiary hover:bg-tertiary/5 rounded-xl transition-colors text-sm font-medium font-serif">
                  <LogOut size={16} /> Sign Out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

// ---------- Main App Component ----------
export default function App() {
  // ---------- State (from existing backend) ----------
  const [activeTab, setActiveTab] = useState<View>('dashboard')
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Note[]>([])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [theme, setTheme] = useState<'light' | 'dark' | 'reading'>('light')
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newContent, setNewContent] = useState('')
  const [newTags, setNewTags] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editTitle, setEditTitle] = useState('')
  const [editContent, setEditContent] = useState('')
  const [editTags, setEditTags] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  // ---------- Effect: apply theme to root element ----------
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // ---------- Data fetching ----------
  const fetchNotes = async () => {
    if (!session) return
    try {
      const res = await fetch(`${API_URL}/notes`, {
        headers: { Authorization: `Bearer ${session.access_token}` }
      })
      if (res.ok) {
        const data = await res.json()
        setNotes(data)
      } else {
        console.error('Failed to fetch notes:', res.status)
      }
    } catch (error) {
      console.error('Error fetching notes:', error)
    }
    setLoading(false)
  }

  const createNote = async () => {
    if (!newTitle.trim() || !newContent.trim()) {
      alert('Please fill in title and content')
      return
    }
    setIsCreating(true)
    try {
      const res = await fetch(`${API_URL}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`
        },
        body: JSON.stringify({
          title: newTitle.trim(),
          content: newContent.trim(),
          tags: newTags.split(',').map(t => t.trim()).filter(t => t),
          category: 'General'
        })
      })
      if (res.ok) {
        setNewTitle('')
        setNewContent('')
        setNewTags('')
        setIsModalOpen(false)
        fetchNotes()
      } else {
        const error = await res.text()
        alert(`Failed to create note: ${error}`)
      }
    } catch (error) {
      console.error('Error creating note:', error)
      alert('Failed to create note. Check that backend is running.')
    } finally {
      setIsCreating(false)
    }
  }

  const deleteNote = async () => {
    if (!selectedNote) return
    if (!confirm('Delete this note? This action cannot be undone.')) return
    try {
      const res = await fetch(`${API_URL}/notes/${selectedNote.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${session.access_token}` }
      })
      if (res.ok) {
        setSelectedNote(null)
        setActiveTab('library')
        fetchNotes()
      } else {
        const error = await res.text()
        alert(`Failed to delete note: ${error}`)
      }
    } catch (error) {
      console.error('Error deleting note:', error)
      alert('Failed to delete note.')
    }
  }

  const openEditModal = () => {
    if (selectedNote) {
      setEditTitle(selectedNote.title)
      setEditContent(selectedNote.content)
      setEditTags(selectedNote.tags?.join(', ') || '')
      setIsEditModalOpen(true)
    }
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      return
    }
    const res = await fetch(`${API_URL}/search?query=${encodeURIComponent(searchQuery)}&limit=10`, {
      headers: { Authorization: `Bearer ${session?.access_token}` }
    })
    if (res.ok) {
      const data = await res.json()
      setSearchResults(data)
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setSession(null)
    setNotes([])
  }

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' })
    if (error) console.error(error)
  }

  const handleEmailAuth = async () => {
    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) alert(error.message)
    } else {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) alert(error.message)
      else alert('Check your email for confirmation!')
    }
  }

  // ---------- Auth effect ----------
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session) fetchNotes()
      else setLoading(false)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session) fetchNotes()
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  // Animation effect for login screen
  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  // ---------- Login Screen (unchanged from your working version) ----------
  if (!session) {
    return (
      <div className="relative min-h-screen">
        <div className="hidden md:block fixed inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('/assets/desktop-bg.jpg')` }} />
        <div className="block md:hidden fixed inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('/assets/mobile-bg.jpg')` }} />
        <div className="fixed inset-0 bg-black/40" />
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <div className="w-full max-w-md text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 30 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-10"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-serif font-semibold text-white tracking-tight">Digital Curator</h1>
              <p className="text-white/70 mt-2 font-serif italic">Your AI‑powered knowledge wiki</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-5"
            >
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: showContent ? 1 : 0, x: showContent ? 0 : -20 }} transition={{ duration: 0.5, delay: 0.3 }}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-5 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:border-white/50 text-white placeholder-white/50 transition-colors font-sans" />
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: showContent ? 1 : 0, x: showContent ? 0 : -20 }} transition={{ duration: 0.5, delay: 0.4 }}>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-5 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:border-white/50 text-white placeholder-white/50 transition-colors font-sans" />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }} transition={{ duration: 0.5, delay: 0.5 }}>
                <button onClick={handleEmailAuth} className="w-full bg-white text-gray-900 py-3 rounded-xl font-semibold hover:bg-white/90 transition-all duration-300 transform hover:scale-[1.02] shadow-lg">
                  {isLogin ? 'Sign In' : 'Create Account'}
                </button>
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: showContent ? 1 : 0 }} transition={{ duration: 0.5, delay: 0.6 }} className="relative my-8">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/20"></div></div>
                <div className="relative flex justify-center text-sm"><span className="px-3 bg-transparent text-white/50 font-sans">or</span></div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }} transition={{ duration: 0.5, delay: 0.7 }}>
                <button onClick={signInWithGoogle} className="w-full flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 py-3 rounded-xl hover:bg-white/20 transition-all duration-300 text-white font-sans">
                  <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" /> Continue with Google
                </button>
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: showContent ? 1 : 0 }} transition={{ duration: 0.5, delay: 0.8 }}>
                <p className="text-center text-sm text-white/70 mt-6 font-sans">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button onClick={() => setIsLogin(!isLogin)} className="text-white font-semibold hover:underline transition-all">
                    {isLogin ? 'Sign Up' : 'Sign In'}
                  </button>
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  // ---------- Main App (New UI) ----------
  const displayNotes = searchQuery ? searchResults : notes
  const recentNotes = notes.slice(0, 3)

  return (
    <div className="min-h-screen bg-surface selection:bg-surface-container-high relative transition-colors duration-700">
      {/* Top App Bar */}
      <header className="fixed top-0 left-0 right-0 z-[60] h-20 bg-surface/80 backdrop-blur-md border-b border-outline-variant/30 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 -ml-2 hover:bg-surface-container-low rounded-full hidden md:block transition-colors">
            <Menu size={24} className="text-primary" />
          </button>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 -ml-2 hover:bg-surface-container-low rounded-full md:hidden">
            <Menu size={24} className="text-primary" />
          </button>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold italic text-primary tracking-tight font-serif leading-none">Digital Curator</h1>
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-outline mt-1 hidden sm:block">Archive v2.0.4</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => {
            const modes: ('light'|'dark'|'reading')[] = ['light','dark','reading']
            const next = (modes.indexOf(theme) + 1) % modes.length
            setTheme(modes[next])
          }} className="p-2 hover:bg-surface-container-low rounded-full transition-colors text-primary">
            {theme === 'light' && <Moon size={22} />}
            {theme === 'dark' && <LibraryIcon size={22} />}
            {theme === 'reading' && <Sun size={22} />}
          </button>
          <div className="hidden sm:flex items-center bg-surface-container-low rounded-full px-4 py-2 border border-outline-variant focus-within:border-primary transition-all group">
            <Search size={18} className="text-outline group-focus-within:text-primary" />
            <input type="text" placeholder="Search archives..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSearch()} className="bg-transparent border-none focus:ring-0 text-sm font-serif placeholder:text-outline/60 w-32 md:w-64" />
          </div>
          <button className="p-2 sm:hidden hover:bg-surface-container-low rounded-full"><Search size={22} className="text-primary" /></button>
          <ProfileDropdown isLoggedIn={!!session} onToggle={signOut} theme={theme} onThemeChange={setTheme} />
        </div>
      </header>

      {/* Sidebar Drawer (Desktop) */}
      <AnimatePresence initial={false}>
        {isSidebarOpen && (
          <motion.aside initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed left-0 top-0 bottom-0 z-50 w-64 bg-surface px-6 pt-24 hidden md:flex flex-col gap-8 border-r border-outline-variant/30">
            <div>
              <h3 className="text-label-caps text-outline px-4 mb-4 uppercase tracking-widest text-[10px]">Archives</h3>
              <nav className="space-y-1">
                <SidebarItem icon={Home} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => { setActiveTab('dashboard'); setSelectedNote(null) }} />
                <SidebarItem icon={BookOpen} label="Library" active={activeTab === 'library'} onClick={() => { setActiveTab('library'); setSelectedNote(null) }} />
                <SidebarItem icon={Share2} label="AI Graph" active={activeTab === 'graph'} onClick={() => setActiveTab('graph')} />
              </nav>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className={`pt-24 pb-32 px-6 flex justify-center transition-all duration-500 ${isSidebarOpen ? 'md:ml-64' : 'ml-0'}`}>
        <div className="w-full max-w-[720px] flex flex-col gap-stack-lg py-8">
          {activeTab === 'dashboard' && (
            <>
              <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-stack-sm">
                <div className="flex items-center gap-2 text-secondary text-sm font-bold tracking-widest uppercase">
                  <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" /> System Online
                </div>
                <h2 className="text-6xl md:text-5xl font-bold text-primary leading-tight font-serif tracking-tight">Knowledge Hub</h2>
                <p className="text-xl md:text-2xl text-on-surface-variant font-serif opacity-80 max-w-lg">
                  Welcome back, Curator. {notes.length} notes in your garden.
                </p>
              </motion.section>
              <motion.section initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="relative overflow-hidden bg-secondary/[0.03] border border-secondary/20 p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center md:items-start gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0 group-hover:scale-110 transition-transform">
                  <Sparkles size={28} fill="currentColor" />
                </div>
                <div className="text-center md:text-left">
                  <h4 className="text-label-caps text-secondary uppercase mb-2 tracking-[0.2em] text-[10px]">Curator Assistant</h4>
                  <p className="text-on-surface text-lg text-body-lg font-serif italic">
                    AI has analyzed your notes. Try semantic search to discover hidden connections.
                  </p>
                </div>
              </motion.section>
              <section className="flex flex-col gap-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-h3 text-primary">Recent Notes</h3>
                </div>
                <div className="flex flex-col gap-6">
                  {recentNotes.map((note, idx) => (
                    <motion.div key={note.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * idx }}>
                      <NoteCard note={note} onClick={() => { setSelectedNote(note); setActiveTab('note'); }} />
                    </motion.div>
                  ))}
                </div>
              </section>
            </>
          )}

          {activeTab === 'library' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-12">
              <div className="space-y-2">
                <h2 className="text-4xl font-semibold tracking-tight text-primary">Library</h2>
                <p className="text-lg text-on-surface-variant font-medium opacity-70">All your notes. AI‑powered search.</p>
              </div>
              <div className="relative">
                <input type="text" placeholder="Search archives..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSearch()} className="w-full bg-transparent border-b border-outline-variant/60 py-4 font-serif text-xl outline-none focus:border-primary transition-colors placeholder:text-outline/40" />
                <Search className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-outline cursor-pointer" onClick={handleSearch} />
              </div>
              {searchQuery && searchResults.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-primary">Search Results</h3>
                  {searchResults.map(note => (
                    <div key={note.id} onClick={() => { setSelectedNote(note); setActiveTab('note'); }} className="border border-outline-variant/30 p-6 rounded-2xl hover:border-secondary cursor-pointer transition-all">
                      <h4 className="text-xl font-semibold text-primary">{note.title}</h4>
                      <p className="text-on-surface-variant/80 line-clamp-2">{stripHtml(note.content)}</p>
                    </div>
                  ))}
                </div>
              )}
              <div className="grid gap-6">
                {notes.map(note => (
                  <article key={note.id} onClick={() => { setSelectedNote(note); setActiveTab('note'); }} className="group bg-surface border border-outline-variant/30 p-6 rounded-2xl hover:border-secondary transition-all duration-300 cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-serif font-medium text-primary group-hover:italic transition-all duration-300">{note.title}</h3>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-outline opacity-60 ml-4 text-right">{new Date(note.created_at).toLocaleDateString()}</span>
                    </div>
                    <p className="text-on-surface-variant/80 line-clamp-2 leading-relaxed mb-6">{stripHtml(note.content)}</p>
                    <div className="flex items-center gap-3">
                      {note.tags?.map(tag => (
                        <span key={tag} className="text-[9px] font-bold uppercase tracking-widest bg-secondary/10 text-secondary px-2 py-0.5 rounded-full">#{tag.toLowerCase()}</span>
                      ))}
                      <div className="ml-auto flex items-center gap-2 opacity-30 text-secondary">
                        <Sparkles className="w-3 h-3" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">AI Synced</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'graph' && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} className="space-y-12">
              <div className="flex justify-between items-end">
                <div className="space-y-2">
                  <h2 className="text-4xl font-semibold tracking-tight text-primary">Neural Network</h2>
                  <p className="text-on-surface-variant font-serif italic text-lg opacity-70">Mapping connections across your notes.</p>
                </div>
                <button className="bg-primary text-bone px-4 py-2 rounded-xl flex items-center gap-2 font-bold tracking-tight text-sm hover:bg-primary/90 transition-colors">
                  <Plus className="w-4 h-4" /> New Link
                </button>
              </div>
              <div className="relative w-full aspect-video bg-surface-container-low/40 rounded-[2rem] border border-outline-variant/30 archival-grid overflow-hidden group">
                <div className="absolute top-6 right-6 flex flex-col gap-2 z-10">
                  <button className="bg-white/80 backdrop-blur-sm p-3 rounded-2xl shadow-sm hover:shadow-md transition-all"><Search className="w-5 h-5 text-primary" /></button>
                  <button className="bg-white/80 backdrop-blur-sm p-3 rounded-2xl shadow-sm hover:shadow-md transition-all"><Plus className="w-5 h-5 text-primary" /></button>
                </div>
                <svg className="w-full h-full p-12" viewBox="0 0 1000 500">
                  <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                    <line x1="200" y1="150" x2="400" y2="250" stroke="currentColor" className="text-outline/40" strokeWidth="1.5" />
                    <line x1="400" y1="250" x2="600" y2="150" stroke="currentColor" className="text-outline/40" strokeWidth="1.5" />
                    <line x1="400" y1="250" x2="450" y2="400" stroke="currentColor" className="text-outline/40" strokeWidth="1.5" />
                    <line x1="600" y1="150" x2="750" y2="300" stroke="currentColor" className="text-outline/40" strokeWidth="1.5" />
                    <line x1="200" y1="150" x2="450" y2="400" stroke="currentColor" className="text-secondary/60" strokeWidth="2" strokeDasharray="6,4" />
                    <circle cx="200" cy="150" r="8" fill="currentColor" className="text-primary hover:text-secondary transition-colors cursor-pointer" />
                    <circle cx="400" cy="250" r="14" fill="currentColor" className="text-primary hover:text-secondary transition-colors cursor-pointer" />
                    <circle cx="600" cy="150" r="10" fill="currentColor" className="text-primary hover:text-secondary transition-colors cursor-pointer" />
                    <circle cx="450" cy="400" r="12" fill="currentColor" className="text-primary hover:text-secondary transition-colors cursor-pointer" />
                    <circle cx="750" cy="300" r="8" fill="currentColor" className="text-primary hover:text-secondary transition-colors cursor-pointer" />
                    <g className="text-[12px] font-bold tracking-tight fill-primary pointer-events-none">
                      <text x="215" y="155">Botanical Studies</text>
                      <text x="420" y="255">Nature Archive</text>
                      <text x="615" y="155">Deep Ecology</text>
                      <text x="465" y="405">Climate Models</text>
                      <text x="765" y="305">Soil Health</text>
                    </g>
                  </motion.g>
                </svg>
                <div className="absolute bottom-6 left-6 bg-white/60 backdrop-blur-md p-4 rounded-2xl border border-outline-variant/10">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 bg-primary rounded-full" /><span className="text-[10px] font-bold uppercase tracking-widest text-primary">Active Nodes</span></div>
                    <div className="flex items-center gap-2"><div className="w-2.5 h-0.5 border-t-2 border-dashed border-secondary" /><span className="text-[10px] font-bold uppercase tracking-widest text-primary">AI Recommendation</span></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'note' && selectedNote && (
            <motion.div key="note-detail" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-12">
              <div className="flex items-center justify-between gap-2 text-[10px] font-bold uppercase tracking-widest text-outline">
                <div className="flex items-center gap-2">
                  <button onClick={() => setActiveTab('library')} className="flex items-center gap-1 hover:text-primary transition-colors"><ArrowLeft className="w-3 h-3" /> Back</button>
                  <ChevronRight className="w-3 h-3" />
                  <span>{selectedNote.category || 'Uncategorized'}</span>
                  <span className="mx-2 opacity-20 text-primary">•</span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={openEditModal} className="p-1 rounded-full hover:bg-surface-container-low transition-colors" title="Edit note">
                    <Edit2 className="w-4 h-4 text-outline hover:text-primary" />
                  </button>
                  <button onClick={deleteNote} className="p-1 rounded-full hover:bg-surface-container-low transition-colors" title="Delete note">
                    <Trash2 className="w-4 h-4 text-outline hover:text-red-500" />
                  </button>
                </div>
              </div>
              <h1 className="text-5xl font-semibold tracking-tight text-primary leading-tight">{selectedNote.title}</h1>
              {selectedNote.summary && (
                <section className="bg-secondary/5 border-l-4 border-secondary p-8 rounded-r-3xl space-y-4 shadow-sm">
                  <div className="flex items-center gap-2 text-secondary"><Sparkles className="w-5 h-5 fill-secondary" /><span className="text-[11px] font-bold uppercase tracking-widest">AI Synthesis</span></div>
                  <p className="font-serif italic text-lg leading-relaxed text-on-surface-variant">{selectedNote.summary}</p>
                </section>
              )}
              <div className="flex flex-wrap gap-2">
                {selectedNote.tags?.map(tag => <span key={tag} className="bg-secondary text-surface px-4 py-1 rounded-full text-[11px] font-bold tracking-tight uppercase">{tag}</span>)}
              </div>
              <article className="markdown-body text-xl text-on-surface/90 prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: selectedNote.content }} />
            </motion.div>
          )}
        </div>
      </main>

      {/* Floating Action Button (Create Note) */}
      {activeTab !== 'note' && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-28 right-8 md:bottom-12 md:right-12 w-16 h-16 bg-primary text-surface rounded-3xl flex items-center justify-center shadow-elevated z-50 hover:bg-stone-800 transition-all group"
        >
          <Plus size={32} className="group-hover:text-secondary transition-colors" />
        </motion.button>
      )}

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[60] px-6 pb-8 pt-4 bg-surface/80 backdrop-blur-xl border-t border-outline-variant/30 flex justify-around items-center h-24">
        <NavButton icon={Home} label="Home" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
        <NavButton icon={BookOpen} label="Notes" active={activeTab === 'library'} onClick={() => setActiveTab('library')} />
        <NavButton icon={Share2} label="Graph" active={activeTab === 'graph'} onClick={() => setActiveTab('graph')} />
        <NavButton icon={Sparkles} label="AI" active={false} onClick={() => alert('AI features coming soon')} />
      </nav>

      {/* Create Note Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-surface rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl border border-outline-variant/30">
            <div className="flex justify-between items-center p-5 border-b border-outline-variant/20 sticky top-0 bg-surface z-10">
              <h2 className="text-xl font-serif font-semibold text-primary">Create New Note</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-full hover:bg-surface-container-low transition-colors">
                <ArrowLeft className="w-5 h-5 text-on-surface-variant" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Title</label>
                <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Note title..." className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant/40 rounded-xl focus:outline-none focus:border-primary transition-colors" autoFocus />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Content</label>
                <RichTextEditor content={newContent} onChange={setNewContent} placeholder="Write your thoughts here..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Tags (comma separated)</label>
                <input type="text" value={newTags} onChange={(e) => setNewTags(e.target.value)} placeholder="philosophy, AI, notes" className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant/40 rounded-xl focus:outline-none focus:border-primary transition-colors" />
              </div>
            </div>
            <div className="flex justify-end gap-3 p-5 border-t border-outline-variant/20 sticky bottom-0 bg-surface">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-low transition-colors">Cancel</button>
              <button onClick={createNote} disabled={isCreating} className="px-5 py-2 rounded-xl bg-primary text-on-primary font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                {isCreating ? 'Creating...' : 'Create Note'}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Edit Modal (Placeholder – same as create modal but with existing data) */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-surface rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl border border-outline-variant/30 p-5">
            <h2 className="text-xl font-serif font-semibold text-primary mb-4">Edit Note (Coming Soon)</h2>
            <button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 rounded-xl bg-primary text-white">Close</button>
          </div>
        </div>
      )}
    </div>
  )
}