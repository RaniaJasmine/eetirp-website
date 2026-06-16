import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  Terminal,
  Monitor,
  Compass,
  Send,
  Search,
  Cpu,
  HardDrive,
  Layers,
  Activity,
  Users,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  Briefcase,
  BookOpen,
  Code2,
  Rocket
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import EetirpLogo from './EetirpLogo';

interface SearchItem {
  title: string;
  category: string;
  desc: string;
  targetId: string;
  projectId?: 'placement' | 'kaura' | 'studio';
  icon: React.ComponentType<any>;
  keywords: string[];
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasActiveToken, setHasActiveToken] = useState(false);

  // Notice ticker
  const notices = [
    { text: "COHORT 2026: Systems & Advanced Web Engineering tracks are now open.", badge: "COHORT", color: "text-[#abd2fa] border-[#17366b]/40 bg-[#17366b]/25" },
    { text: "SAAS LABS: Launch and run automated telemetry diagnostics via sandbox.", badge: "SANDBOX", color: "text-[#7da7f0] border-[#3d70d9]/30 bg-[#3d70d9]/10" },
    { text: "INCUBATOR: Roster is currently at 92% active capacity this cycle.", badge: "NEWS", color: "text-white border-[#7da7f0]/20 bg-[#17366b]/20" },
    { text: "INTEGRATION: Interactive diagnostic Git callback tokens verified.", badge: "SECURITY", color: "text-[#7da7f0] border-[#17366b]/25 bg-[#050e21]/30" },
  ];

  const [currentNotice, setCurrentNotice] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Search items
  const searchItems: SearchItem[] = [
    {
      title: 'Our Positioning Manifesto',
      category: 'Curriculum Strategy',
      desc: 'Our fundamental thesis mapping college theories to engineering teams.',
      targetId: 'positioning',
      icon: Compass,
      keywords: ['positioning', 'manifesto', 'academy', 'academics', 'why us', 'learning', 'corporate', 'thesis']
    },
    {
      title: 'SaaS Sandbox & Live Projects',
      category: 'Operational Labs',
      desc: 'Active production environment with telemetry, systems, and repositories.',
      targetId: 'services',
      icon: Monitor,
      keywords: ['services', 'saas', 'lab', 'diagnose', 'telemetry', 'sandbox', 'apps', 'systems', 'projects']
    },
    {
      title: '6 Key Program Pillars',
      category: 'Methodologies',
      desc: 'Academy, Sprints, Sandbox Telemetry, and Placement Prep Gateway Tracks.',
      targetId: 'pillars',
      icon: Layers,
      keywords: ['pillars', 'curriculum', 'sprint', 'academy', 'career', 'structure', 'bootcamp', 'innovation']
    },
    {
      title: 'Leadership & Ecosystem Drivers',
      category: 'Leadership & Backing',
      desc: 'Tech mentors, enterprise sponsors, and founders driving success.',
      targetId: 'leadership',
      icon: Users,
      keywords: ['leadership', 'advisors', 'experts', 'team', 'backing', 'sponsors', 'mentors']
    },
    {
      title: 'Placement AI Platform',
      category: 'Active Project',
      desc: 'AI-driven engine for predictive assessments and interview prep.',
      targetId: 'services',
      projectId: 'placement',
      icon: Cpu,
      keywords: ['placement', 'ai', 'predictive', 'resume', 'interviews', 'assessments', 'ml', 'scoring']
    },
    {
      title: 'Kaura Hub Portal',
      category: 'Active Project',
      desc: 'Next-gen workspace with notes, portfolio, and student tools.',
      targetId: 'services',
      projectId: 'kaura',
      icon: HardDrive,
      keywords: ['kaura', 'hub', 'notes', 'workspace', 'portfolio', 'builder', 'student']
    },
    {
      title: 'Live Studio Integration',
      category: 'Active Project',
      desc: 'Cloud repository tracking with real-time telemetry and latency.',
      targetId: 'services',
      projectId: 'studio',
      icon: Activity,
      keywords: ['studio', 'integration', 'git', 'operations', 'telemetry', 'real-time', 'cloud', 'latency']
    },
    {
      title: 'Join the Ecosystem',
      category: 'Admission Portal',
      desc: 'Claim your slot for the 2026 cohort and start your journey.',
      targetId: 'onboarding',
      icon: Send,
      keywords: ['onboarding', 'join', 'admission', 'apply', 'cohort', 'form', 'career']
    }
  ];

  const filteredResults = searchQuery.trim() === ''
    ? []
    : searchItems.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.keywords.some(kw => kw.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const checkActiveSession = () => setHasActiveToken(!!localStorage.getItem('eetirp_diagnostic_onboarding'));

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setIsSearchFocused(false);
        searchInputRef.current?.blur();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('storage', checkActiveSession);
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    checkActiveSession();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', checkActiveSession);
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isHovered || isSearchFocused) return;
    const interval = setTimeout(() => {
      setCurrentNotice((prev) => (prev + 1) % notices.length);
    }, 3800);
    return () => clearTimeout(interval);
  }, [isHovered, isSearchFocused, currentNotice, notices.length]);

  const scrollSmoothTo = (elementId: string) => {
    setMobileMenuOpen(false);
    setIsSearchFocused(false);
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleResultClick = (item: SearchItem) => {
    setIsSearchFocused(false);
    setSearchQuery('');
    scrollSmoothTo(item.targetId);
    if (item.projectId) {
      window.dispatchEvent(new CustomEvent('select-project', { detail: item.projectId }));
    }
  };

  return (
    <>
      {/* Fixed Logo - Rich Blue Theme */}
      <div
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setIsSearchFocused(false);
        }}
        className="fixed top-4 left-4 sm:top-5 sm:left-6 lg:top-6 lg:left-8 z-[120] flex items-center gap-3.5 group cursor-pointer select-none bg-[#050c20]/95 backdrop-blur-md border border-[#3d518c]/75 px-4 py-2.5 rounded-2xl shadow-xl hover:scale-[1.02] hover:border-[#7692ff]/85 hover:shadow-[0_0_20px_rgba(118,146,255,0.12)] transition-all duration-300"
      >
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#7692ff]/50 rounded-tl-xl group-hover:border-[#7692ff] transition-colors" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#7692ff]/50 rounded-br-xl group-hover:border-[#7692ff] transition-colors" />

        <div className="w-10 h-10 rounded-xl overflow-hidden border border-[#17366b]/60 flex items-center justify-center p-1 bg-white shadow-xl shrink-0 relative">
          <EetirpLogo className="w-full h-full" showSlogan={false} isAnimated={false} />
          <div className="absolute inset-0 bg-[#3d70d9]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>

        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span className="font-sans text-sm font-black tracking-widest text-[#f5f7fa] group-hover:text-[#7da7f0] transition-colors uppercase">
              EETIRP
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#3d70d9] shadow-[0_0_8px_rgba(61,112,217,0.85)] animate-pulse" title="System Live" />
          </div>
          <span className="font-mono text-[8px] tracking-[0.22em] text-[#abd2fa]/85 font-extrabold uppercase mt-1 leading-none">
            Hybrid Tech Studio
          </span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="fixed top-0 inset-x-0 lg:left-[290px] xl:left-[315px] z-[100] p-4 sm:p-5 lg:pr-8 xl:pr-12 transition-all duration-300 max-lg:pt-[84px]">
        <div
          className={`mx-auto max-w-full rounded-2xl bg-[#09153a]/90 backdrop-blur-md border transition-all duration-500 ${scrolled || mobileMenuOpen || isSearchFocused
              ? 'py-3 px-5 sm:px-6 md:px-8 shadow-2xl border-[#3d518c]'
              : 'py-4 px-6 md:px-10 shadow-lg border-[#3d518c]/40'
            }`}
        >
          <div className="flex items-center justify-between gap-4">

            {/* SEARCH BAR - Main feature */}
            <div
              ref={searchContainerRef}
              className="relative flex-grow max-w-[240px] sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-11"
            >
              <div
                className={`flex items-center h-full w-full bg-[#040a1c]/75 border px-3.5 rounded-xl transition-all duration-300 shadow-inner group ${isSearchFocused
                    ? 'border-[#7692ff] bg-[#040a1c] shadow-[0_0_15px_rgba(118,146,255,0.08)]'
                    : 'border-[#3d518c]/70 hover:border-[#7692ff]/60 hover:bg-[#040a1c]/90'
                  }`}
              >
                <Search className={`w-4 h-4 transition-colors ${isSearchFocused ? 'text-[#7692ff]' : 'text-[#abd2fa]'}`} />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder="Search sections... [Ctrl+K]"
                  className="w-full bg-transparent border-none text-white text-xs font-mono pl-3 pr-2 focus:outline-none placeholder-gray-400 font-semibold"
                />

                {searchQuery && (
                  <button
                    onClick={() => { setSearchQuery(''); searchInputRef.current?.focus(); }}
                    className="p-1 hover:bg-[#3d518c]/30 rounded-full text-gray-400 hover:text-white transition-all"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}

                <div className="hidden sm:flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#3d518c]/30 border border-[#3d518c]/50 text-[9px] font-mono text-gray-400 select-none">
                  <span>⌘</span>
                  <span>K</span>
                </div>
              </div>

              {/* Search Dropdown */}
              <AnimatePresence>
                {isSearchFocused && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-13 left-0 right-0 max-h-[380px] overflow-y-auto bg-[#070f2b]/95 backdrop-blur-xl border border-[#3d518c] rounded-2xl shadow-2xl z-[150] p-4 space-y-3 font-sans text-left"
                  >
                    {searchQuery.trim() === '' ? (
                      <>
                        {/* Live Notice Ticker */}
                        <div className="p-3 bg-[#09153f]/60 rounded-xl border border-[#3d518c]/40">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#7da7f0] animate-pulse" />
                            <span className="text-[9px] font-mono font-black text-[#abd2fa] tracking-wider uppercase">
                              LIVE STATUS
                            </span>
                          </div>
                          <div className="h-6 overflow-hidden relative">
                            <AnimatePresence mode="wait">
                              <motion.p
                                key={currentNotice}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.25 }}
                                className="font-sans text-[11px] font-semibold text-gray-200"
                              >
                                {notices[currentNotice].text}
                              </motion.p>
                            </AnimatePresence>
                          </div>
                          <div className="flex gap-1.5 mt-1.5">
                            {notices.map((_, idx) => (
                              <button
                                key={idx}
                                onClick={() => setCurrentNotice(idx)}
                                className={`w-1.5 h-1.5 rounded-full transition-all ${currentNotice === idx ? 'bg-[#7692ff] w-3' : 'bg-[#3d518c]/70 hover:bg-[#7692ff]/50'
                                  }`}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Quick Links */}
                        <div className="space-y-2">
                          <h6 className="font-mono text-[9px] text-gray-400 tracking-widest font-black uppercase flex items-center gap-1 px-1">
                            <Sparkles className="w-3 h-3 text-[#abd2fa]" /> Quick Access
                          </h6>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {searchItems.slice(0, 4).map((item, idx) => {
                              const IconComponent = item.icon;
                              return (
                                <button
                                  key={idx}
                                  onClick={() => handleResultClick(item)}
                                  className="flex items-center gap-2.5 p-2 px-3 rounded-lg bg-[#091540]/30 hover:bg-[#1b2cc1]/20 border border-[#3d518c]/30 hover:border-[#7692ff]/50 text-left transition-all group"
                                >
                                  <IconComponent className="w-4 h-4 text-[#abd2fa] shrink-0" />
                                  <div>
                                    <p className="text-[11px] font-bold text-white leading-tight font-mono">{item.title}</p>
                                    <p className="text-[9px] text-gray-400 truncate">{item.category}</p>
                                  </div>
                                  <ArrowRight className="w-3 h-3 text-[#3d518c] ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </>
                    ) : (
                      /* Search Results */
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center px-1 mb-2 font-mono text-[9px] text-gray-400 font-bold uppercase tracking-wider">
                          <span>Results</span>
                          <span>{filteredResults.length} matches</span>
                        </div>

                        {filteredResults.length > 0 ? (
                          filteredResults.map((item, index) => {
                            const IconComponent = item.icon;
                            return (
                              <button
                                key={index}
                                onClick={() => handleResultClick(item)}
                                className="w-full flex items-start gap-3 p-2.5 rounded-xl bg-[#091540]/40 hover:bg-[#1b2cc1]/30 border border-[#3d518c]/35 hover:border-[#7692ff]/60 text-left transition-all group"
                              >
                                <div className="w-8 h-8 rounded-lg bg-[#040a1c] border border-[#3d518c]/50 flex items-center justify-center shrink-0 group-hover:border-[#7692ff]/40">
                                  <IconComponent className="w-4 h-4 text-[#abd2fa] group-hover:text-white transition-colors" />
                                </div>
                                <div className="flex-grow min-w-0">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-xs font-bold text-white font-mono truncate">{item.title}</span>
                                    <span className="text-[8px] font-mono text-[#7692ff] tracking-[0.1em] font-black uppercase shrink-0 px-1.5 py-0.5 rounded bg-[#3d518c]/20">
                                      {item.category}
                                    </span>
                                  </div>
                                  <p className="text-[10px] text-gray-400 mt-0.5 line-clamp-1">{item.desc}</p>
                                </div>
                                <ArrowRight className="w-3.5 h-3.5 text-[#3d518c] opacity-0 group-hover:opacity-100 group-hover:text-[#7692ff] transition-all shrink-0 mt-1" />
                              </button>
                            );
                          })
                        ) : (
                          <div className="py-8 text-center text-gray-400 font-mono space-y-2">
                            <Terminal className="w-6 h-6 text-[#3d518c] mx-auto animate-pulse" />
                            <p className="text-[10px] uppercase tracking-widest font-bold">No results found</p>
                            <p className="text-[9px] text-gray-500 font-sans">Try 'Placement', 'Kaura', or 'Pillars'</p>
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center gap-8 shrink-0">
              <button
                onClick={() => scrollSmoothTo('positioning')}
                className="font-mono text-[11px] text-[#abd2fa] hover:text-white transition-all uppercase tracking-[0.12em] font-bold cursor-pointer"
              >
                Positioning
              </button>
              <button
                onClick={() => scrollSmoothTo('services')}
                className="font-mono text-[11px] text-[#abd2fa] hover:text-white transition-all uppercase tracking-[0.12em] font-bold cursor-pointer"
              >
                Projects
              </button>
              <button
                onClick={() => scrollSmoothTo('leadership')}
                className="font-mono text-[11px] text-[#abd2fa] hover:text-white transition-all uppercase tracking-[0.12em] font-bold cursor-pointer"
              >
                Leadership
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => scrollSmoothTo('onboarding')}
                className="px-5 py-2.5 rounded bg-gradient-to-r from-[#3d518c] to-[#7692ff] text-white font-mono text-[11px] uppercase tracking-[0.12em] font-bold hover:opacity-95 hover:shadow-md transition-all active:scale-[0.98] cursor-pointer max-sm:hidden shadow-sm"
              >
                {hasActiveToken ? 'Dashboard' : 'Join'}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 border border-[#3d518c]/70 bg-[#3d518c]/40 rounded-xl text-white hover:bg-[#09153a]/90 transition-colors cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="mt-4 pt-6 border-t border-[#3d518c]/40 flex flex-col gap-6 xl:hidden animate-fade-in">
              <div className="flex flex-col gap-3 text-left">
                <button
                  onClick={() => scrollSmoothTo('positioning')}
                  className="font-mono text-xs text-[#abd2fa] hover:text-white transition-all uppercase tracking-widest text-left py-3 border-b border-[#3d518c]/25 flex items-center justify-between"
                >
                  <span>Our Positioning</span> <Compass className="w-4 h-4 text-[#abd2fa]" />
                </button>
                <button
                  onClick={() => scrollSmoothTo('services')}
                  className="font-mono text-xs text-[#abd2fa] hover:text-white transition-all uppercase tracking-widest text-left py-3 border-b border-[#3d518c]/25 flex items-center justify-between"
                >
                  <span>What We Do</span> <Monitor className="w-4 h-4 text-[#abd2fa]" />
                </button>
                <button
                  onClick={() => scrollSmoothTo('leadership')}
                  className="font-mono text-xs text-[#abd2fa] hover:text-white transition-all uppercase tracking-widest text-left py-3 border-b border-[#3d518c]/25 flex items-center justify-between"
                >
                  <span>Leadership</span> <Users className="w-4 h-4 text-[#abd2fa]" />
                </button>
                <button
                  onClick={() => scrollSmoothTo('onboarding')}
                  className="font-mono text-xs text-[#abd2fa] hover:text-white transition-all uppercase tracking-widest text-left py-3 border-b border-[#3d518c]/25 flex items-center justify-between"
                >
                  <span>Join Ecosystem</span> <Send className="w-4 h-4 text-[#abd2fa]" />
                </button>
              </div>

              <button
                onClick={() => scrollSmoothTo('onboarding')}
                className="w-full py-3.5 text-center bg-gradient-to-r from-[#3d518c] to-[#7692ff]/85 text-white font-mono text-xs uppercase tracking-widest font-bold rounded-lg shadow-md cursor-pointer"
              >
                {hasActiveToken ? 'Open Candidate Portal' : 'Join Ecosystem'}
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}