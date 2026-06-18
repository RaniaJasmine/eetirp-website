import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Home,
  Compass,
  Monitor,
  Layers,
  Users,
  Send,
  LogIn,
  UserPlus,
  LogOut,
  ChevronRight,
  Mail,
  Phone,
  AlertCircle,
  CheckCircle,
  MailCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast, Toaster } from 'react-hot-toast';
import EetirpLogo from './EetirpLogo';
import { supabase } from '../lib/supabase';

// Auth modal states
type AuthMode = 'login' | 'register' | null;

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');

  // Auth form states
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student'
  });

  const sidebarTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Send email notification to company
  const sendEmailNotification = async (name: string, email: string, role: string) => {
    try {
      const response = await fetch('/api/notify-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          role,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        console.warn('Email notification failed, but user registration was successful.');
      }
    } catch (error) {
      console.warn('Email notification error:', error);
    }
  };

  // Check current session on mount
  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setIsLoggedIn(true);
        setUser(session.user);
        localStorage.setItem('eetirp_user', JSON.stringify({
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0],
          role: session.user.user_metadata?.role || 'student'
        }));
        toast.success(`Welcome back, ${session.user.user_metadata?.full_name || session.user.email?.split('@')[0]}! 👋`, {
          duration: 4000,
          position: 'top-center',
          style: {
            background: '#0a1628',
            color: '#fff',
            border: '1px solid #1a3a5a',
          },
        });
      }
    };
    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setIsLoggedIn(true);
        setUser(session.user);
        localStorage.setItem('eetirp_user', JSON.stringify({
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0],
          role: session.user.user_metadata?.role || 'student'
        }));
        setShowConfirmationMessage(false);
      } else {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem('eetirp_user');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Sidebar handlers
  const handleSidebarEnter = () => {
    if (sidebarTimeoutRef.current) {
      clearTimeout(sidebarTimeoutRef.current);
      sidebarTimeoutRef.current = null;
    }
    setSidebarOpen(true);
  };

  const handleSidebarLeave = () => {
    if (!('ontouchstart' in window)) {
      sidebarTimeoutRef.current = setTimeout(() => {
        setSidebarOpen(false);
      }, 300);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Login handler with Supabase
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    setShowConfirmationMessage(false);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      });

      if (error) {
        if (error.message.includes('Email not confirmed')) {
          toast.error('Please confirm your email first! Check your inbox.', {
            duration: 5000,
            position: 'top-center',
            style: {
              background: '#0a1628',
              color: '#fff',
              border: '1px solid #ff4444',
            },
          });
          setError('Please confirm your email address first. Check your inbox for the confirmation link.');
        } else {
          throw error;
        }
        setLoading(false);
        return;
      }

      const userName = data.user.user_metadata?.full_name || data.user.email?.split('@')[0] || 'User';

      toast.success(`🎉 Welcome back, ${userName}!`, {
        duration: 4000,
        position: 'top-center',
        style: {
          background: '#0a1628',
          color: '#fff',
          border: '1px solid #4a6a8f',
        },
        icon: '👋',
      });

      setIsLoggedIn(true);
      setUser(data.user);
      setAuthMode(null);
      setSidebarOpen(false);
      setLoginData({ email: '', password: '' });

      localStorage.setItem('eetirp_user', JSON.stringify({
        id: data.user.id,
        email: data.user.email,
        name: userName,
        role: data.user.user_metadata?.role || 'student'
      }));

    } catch (err: any) {
      toast.error('Login failed. Please check your credentials.', {
        duration: 4000,
        position: 'top-center',
        style: {
          background: '#0a1628',
          color: '#fff',
          border: '1px solid #ff4444',
        },
      });
      setError(err.message || 'Login failed. Please check your credentials.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Register handler with Supabase
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    setShowConfirmationMessage(false);

    if (registerData.password !== registerData.confirmPassword) {
      toast.error('Passwords do not match!', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#0a1628',
          color: '#fff',
          border: '1px solid #ff4444',
        },
      });
      setError('Passwords do not match!');
      setLoading(false);
      return;
    }

    if (registerData.password.length < 6) {
      toast.error('Password must be at least 6 characters long.', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#0a1628',
          color: '#fff',
          border: '1px solid #ff4444',
        },
      });
      setError('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: registerData.email,
        password: registerData.password,
        options: {
          data: {
            full_name: registerData.fullName,
            role: registerData.role,
          },
        },
      });

      if (error) throw error;

      // Store the email for the confirmation message
      setRegisteredEmail(registerData.email);

      // Send email notification to company
      await sendEmailNotification(
        registerData.fullName,
        registerData.email,
        registerData.role
      );

      // Show success toast
      toast.success(`✅ Registration successful, ${registerData.fullName}!`, {
        duration: 4000,
        position: 'top-center',
        style: {
          background: '#0a1628',
          color: '#fff',
          border: '1px solid #4a6a8f',
        },
      });

      toast.loading('📧 Please check your email to confirm your account...', {
        duration: 5000,
        position: 'top-center',
        style: {
          background: '#0a1628',
          color: '#fff',
          border: '1px solid #4a6a8f',
        },
      });

      // Show confirmation message
      setShowConfirmationMessage(true);
      setSuccessMessage(null);

      // Clear form
      setRegisterData({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'student'
      });

    } catch (err: any) {
      toast.error('Registration failed. Please try again.', {
        duration: 4000,
        position: 'top-center',
        style: {
          background: '#0a1628',
          color: '#fff',
          border: '1px solid #ff4444',
        },
      });
      setError(err.message || 'Registration failed. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setIsLoggedIn(false);
      setUser(null);
      localStorage.removeItem('eetirp_user');
      setSidebarOpen(false);

      toast.success('👋 Logged out successfully!', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#0a1628',
          color: '#fff',
          border: '1px solid #4a6a8f',
        },
      });
    } catch (err: any) {
      console.error('Logout error:', err);
      toast.error('Logout failed. Please try again.', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#0a1628',
          color: '#fff',
          border: '1px solid #ff4444',
        },
      });
    }
  };

  // Scroll to contact section
  const scrollToContact = () => {
    const element = document.getElementById('onboarding');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setSidebarOpen(false);
  };

  // Resend confirmation email
  const resendConfirmation = async () => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: registeredEmail,
      });

      if (error) throw error;

      toast.success(`📧 Confirmation email resent to ${registeredEmail}`, {
        duration: 4000,
        position: 'top-center',
        style: {
          background: '#0a1628',
          color: '#fff',
          border: '1px solid #4a6a8f',
        },
      });
      setSuccessMessage(`Confirmation email resent to ${registeredEmail}. Please check your inbox.`);
    } catch (err: any) {
      toast.error('Failed to resend confirmation email.', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#0a1628',
          color: '#fff',
          border: '1px solid #ff4444',
        },
      });
      setError(err.message || 'Failed to resend confirmation email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node) && !(e.target as Element).closest('.sidebar-trigger')) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollSmoothTo = (elementId: string) => {
    setSidebarOpen(false);
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Sidebar navigation items
  const sidebarNavItems = [
    { icon: Home, label: 'Home', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { icon: Compass, label: 'About', action: () => scrollSmoothTo('positioning') },
    { icon: Monitor, label: 'Projects', action: () => scrollSmoothTo('services') },
    { icon: Layers, label: 'Pillars', action: () => scrollSmoothTo('pillars') },
    { icon: Users, label: 'Leadership', action: () => scrollSmoothTo('leadership') },
    { icon: Send, label: 'Join Us', action: () => scrollSmoothTo('onboarding') },
  ];

  const getUserName = () => {
    const stored = localStorage.getItem('eetirp_user');
    if (stored) {
      try {
        const data = JSON.parse(stored);
        return data.name || data.email?.split('@')[0] || 'User';
      } catch {
        return user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
      }
    }
    return user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  };

  const getUserInitial = () => {
    const name = getUserName();
    return name.charAt(0).toUpperCase();
  };

  return (
    <>
      {/* Toaster component for notifications */}
      <Toaster />

      {/* Fixed Logo - Only sidebar trigger remains */}
      <div className="fixed top-4 left-4 sm:top-5 sm:left-6 lg:top-6 lg:left-8 z-[120] flex items-center gap-3 group cursor-pointer select-none bg-[#0a1628]/95 backdrop-blur-md border border-[#1a3a5a] px-4 py-2.5 rounded-2xl shadow-lg hover:shadow-xl hover:border-[#4a6a8f]/50 transition-all duration-300 sidebar-trigger">
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#4a6a8f]/30 rounded-tl-xl group-hover:border-[#6f8faf] transition-colors" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#4a6a8f]/30 rounded-br-xl group-hover:border-[#6f8faf] transition-colors" />

        <div
          className="flex flex-col gap-1.5 cursor-pointer p-1.5 hover:bg-[#1a3a5a] rounded-lg transition-all sidebar-trigger"
          onMouseEnter={handleSidebarEnter}
          onClick={toggleSidebar}
          onTouchStart={toggleSidebar}
        >
          <span className="w-5 h-0.5 bg-[#b0c4d8] rounded-full transition-all"></span>
          <span className="w-5 h-0.5 bg-[#b0c4d8] rounded-full transition-all"></span>
          <span className="w-5 h-0.5 bg-[#b0c4d8] rounded-full transition-all"></span>
        </div>

        <div
          className="flex items-center gap-2.5 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-9 h-9 rounded-xl overflow-hidden border border-[#1a3a5a] flex items-center justify-center p-1 bg-white shadow-sm shrink-0 relative">
            <EetirpLogo className="w-full h-full" showSlogan={false} isAnimated={false} />
          </div>

          <div className="flex flex-col leading-none max-sm:hidden">
            <div className="flex items-center gap-1.5">
              <span className="font-sans text-sm font-black tracking-widest text-white group-hover:text-[#6f8faf] transition-colors uppercase">
                EETIRP
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#4a6a8f] shadow-[0_0_8px_rgba(74,106,143,0.5)]" title="System Live" />
            </div>
            <span className="font-mono text-[8px] tracking-[0.22em] text-[#6f8faf] font-extrabold uppercase mt-1 leading-none">
              Hybrid Tech Studio
            </span>
          </div>
        </div>
      </div>

      {/* Sidebar Navigation - Opens on hover/tap of three lines */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            ref={sidebarRef}
            initial={{ x: -320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -320, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 left-0 w-[280px] sm:w-72 h-full bg-[#0a1628] border-r border-[#1a3a5a] shadow-2xl z-[150] overflow-y-auto"
            onMouseEnter={handleSidebarEnter}
            onMouseLeave={handleSidebarLeave}
          >
            {/* Sidebar Header */}
            <div className="p-4 sm:p-6 border-b border-[#1a3a5a]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white flex items-center justify-center p-1 border border-[#1a3a5a]">
                    <EetirpLogo className="w-full h-full" showSlogan={false} isAnimated={false} />
                  </div>
                  <div>
                    <span className="font-sans text-sm sm:text-base font-black text-white block">EETIRP</span>
                    <span className="font-mono text-[7px] sm:text-[8px] text-[#6f8faf] tracking-widest">STUDIO v2.0</span>
                  </div>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1.5 sm:p-2 hover:bg-[#1a3a5a] rounded-lg transition-all"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-[#6f8faf]" />
                </button>
              </div>

              {/* User Status - Supabase Integrated */}
              {isLoggedIn ? (
                <div className="mt-3 sm:mt-4 p-2.5 sm:p-3 bg-[#1a3a5a] rounded-lg sm:rounded-xl">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#4a6a8f] flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                      {getUserInitial()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-bold text-white truncate">
                        {getUserName()}
                      </p>
                      <p className="text-[10px] sm:text-xs text-[#6f8faf] truncate">
                        {user?.email || 'Student'}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="p-1.5 sm:p-2 hover:bg-[#0d1f33] rounded-lg transition-all"
                      title="Logout"
                    >
                      <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#6f8faf]" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-1.5 sm:gap-2">
                  <button
                    onClick={() => { setAuthMode('login'); setSidebarOpen(false); }}
                    className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-[#4a6a8f] text-white font-mono text-[10px] sm:text-xs font-bold rounded-lg hover:bg-[#6f8faf] transition-all"
                  >
                    <LogIn className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    Login
                  </button>
                  <button
                    onClick={() => { setAuthMode('register'); setSidebarOpen(false); }}
                    className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-[#1a3a5a] border border-[#1a3a5a] text-white font-mono text-[10px] sm:text-xs font-bold rounded-lg hover:border-[#4a6a8f] hover:bg-[#0d1f33] transition-all"
                  >
                    <UserPlus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    Register
                  </button>
                </div>
              )}
            </div>

            {/* Navigation Items */}
            <div className="p-3 sm:p-4 space-y-1">
              <p className="font-mono text-[8px] sm:text-[9px] text-[#6f8faf] uppercase tracking-widest font-black px-2 sm:px-3 py-1 sm:py-2">Main Navigation</p>
              {sidebarNavItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={index}
                    onClick={item.action}
                    className="w-full flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg sm:rounded-xl hover:bg-[#1a3a5a] transition-all group text-left"
                  >
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#6f8faf] group-hover:text-white transition-colors" />
                    <span className="text-xs sm:text-sm font-medium text-[#b0c4d8] group-hover:text-white transition-colors">
                      {item.label}
                    </span>
                    <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#1a3a5a] ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                );
              })}
            </div>

            {/* Contact Button */}
            <div className="border-t border-[#1a3a5a] p-3 sm:p-4 mt-1 sm:mt-2">
              <button
                onClick={scrollToContact}
                className="w-full flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 bg-[#4a6a8f] hover:bg-[#6f8faf] text-white font-mono text-[10px] sm:text-xs uppercase tracking-widest font-bold rounded-lg transition-all"
              >
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Contact Us
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth Modal - Login/Register with Supabase */}
      <AnimatePresence>
        {authMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0a1628]/80 backdrop-blur-sm z-[200] flex items-center justify-center p-3 sm:p-4"
            onClick={() => setAuthMode(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#0a1628] rounded-2xl max-w-md w-full p-4 sm:p-6 md:p-8 shadow-2xl border border-[#1a3a5a] max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#1a3a5a] flex items-center justify-center">
                    {authMode === 'login' ? (
                      <LogIn className="w-4 h-4 sm:w-5 sm:h-5 text-[#6f8faf]" />
                    ) : (
                      <UserPlus className="w-4 h-4 sm:w-5 sm:h-5 text-[#6f8faf]" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-sans text-base sm:text-lg font-black text-white">
                      {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-[#6f8faf] font-medium">
                      {authMode === 'login' ? 'Sign in to your student account' : 'Join the EETIRP ecosystem'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setAuthMode(null);
                    setShowConfirmationMessage(false);
                    setError(null);
                    setSuccessMessage(null);
                  }}
                  className="p-1.5 sm:p-2 hover:bg-[#1a3a5a] rounded-lg transition-all"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-[#6f8faf]" />
                </button>
              </div>

              {/* Error Messages */}
              {error && (
                <div className="mb-4 p-3 bg-red-900/20 border border-red-800/50 rounded-lg flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-red-300">{error}</p>
                </div>
              )}

              {/* Success Messages */}
              {successMessage && (
                <div className="mb-4 p-3 bg-green-900/20 border border-green-800/50 rounded-lg flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-green-300">{successMessage}</p>
                </div>
              )}

              {/* CONFIRMATION MESSAGE - Show after registration */}
              {showConfirmationMessage && (
                <div className="mb-4 p-4 bg-blue-900/20 border border-blue-800/50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <MailCheck className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">Verify Your Email</h4>
                      <p className="text-xs text-blue-300 mb-2">
                        We sent a confirmation link to <span className="font-bold text-white">{registeredEmail}</span>
                      </p>
                      <p className="text-xs text-blue-300/80 mb-3">
                        Please check your inbox and click the link to verify your account.
                        Don't forget to check your spam folder!
                      </p>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={() => {
                            setAuthMode(null);
                            setShowConfirmationMessage(false);
                            toast.success('📧 Confirmation email sent! Check your inbox.', {
                              duration: 3000,
                              position: 'top-center',
                              style: {
                                background: '#0a1628',
                                color: '#fff',
                                border: '1px solid #4a6a8f',
                              },
                            });
                          }}
                          className="px-4 py-2 bg-[#4a6a8f] hover:bg-[#6f8faf] text-white font-mono text-[10px] uppercase tracking-widest font-bold rounded-lg transition-all"
                        >
                          I'll check my email
                        </button>
                        <button
                          onClick={resendConfirmation}
                          disabled={loading}
                          className="px-4 py-2 bg-[#1a3a5a] border border-[#1a3a5a] hover:border-[#4a6a8f] text-white font-mono text-[10px] uppercase tracking-widest font-bold rounded-lg transition-all disabled:opacity-50"
                        >
                          {loading ? 'Sending...' : 'Resend Email'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Login Form */}
              {authMode === 'login' && !showConfirmationMessage && (
                <form onSubmit={handleLogin} className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="font-mono text-[9px] sm:text-[10px] text-[#6f8faf] uppercase tracking-widest font-black block mb-1 sm:mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      className="w-full bg-[#0d1f33] border border-[#1a3a5a] focus:border-[#4a6a8f] rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white font-sans text-sm focus:outline-none focus:ring-1 focus:ring-[#4a6a8f]/20 placeholder-[#4a6a8f]"
                      placeholder="student@university.edu"
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[9px] sm:text-[10px] text-[#6f8faf] uppercase tracking-widest font-black block mb-1 sm:mb-1.5">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      className="w-full bg-[#0d1f33] border border-[#1a3a5a] focus:border-[#4a6a8f] rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white font-sans text-sm focus:outline-none focus:ring-1 focus:ring-[#4a6a8f]/20 placeholder-[#4a6a8f]"
                      placeholder="••••••••"
                      disabled={loading}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 sm:py-3.5 bg-[#4a6a8f] hover:bg-[#6f8faf] text-white font-mono text-[10px] sm:text-xs uppercase tracking-widest font-black rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
                  </button>
                  <p className="text-center text-[10px] sm:text-xs text-[#6f8faf]">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('register');
                        setError(null);
                        setSuccessMessage(null);
                      }}
                      className="text-white font-bold hover:underline"
                    >
                      Register here
                    </button>
                  </p>
                </form>
              )}

              {/* Register Form */}
              {authMode === 'register' && !showConfirmationMessage && (
                <form onSubmit={handleRegister} className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="font-mono text-[9px] sm:text-[10px] text-[#6f8faf] uppercase tracking-widest font-black block mb-1 sm:mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={registerData.fullName}
                      onChange={(e) => setRegisterData({ ...registerData, fullName: e.target.value })}
                      className="w-full bg-[#0d1f33] border border-[#1a3a5a] focus:border-[#4a6a8f] rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white font-sans text-sm focus:outline-none focus:ring-1 focus:ring-[#4a6a8f]/20 placeholder-[#4a6a8f]"
                      placeholder="John Doe"
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[9px] sm:text-[10px] text-[#6f8faf] uppercase tracking-widest font-black block mb-1 sm:mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      className="w-full bg-[#0d1f33] border border-[#1a3a5a] focus:border-[#4a6a8f] rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white font-sans text-sm focus:outline-none focus:ring-1 focus:ring-[#4a6a8f]/20 placeholder-[#4a6a8f]"
                      placeholder="student@university.edu"
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[9px] sm:text-[10px] text-[#6f8faf] uppercase tracking-widest font-black block mb-1 sm:mb-1.5">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      className="w-full bg-[#0d1f33] border border-[#1a3a5a] focus:border-[#4a6a8f] rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white font-sans text-sm focus:outline-none focus:ring-1 focus:ring-[#4a6a8f]/20 placeholder-[#4a6a8f]"
                      placeholder="Min 6 characters"
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[9px] sm:text-[10px] text-[#6f8faf] uppercase tracking-widest font-black block mb-1 sm:mb-1.5">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      required
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                      className="w-full bg-[#0d1f33] border border-[#1a3a5a] focus:border-[#4a6a8f] rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white font-sans text-sm focus:outline-none focus:ring-1 focus:ring-[#4a6a8f]/20 placeholder-[#4a6a8f]"
                      placeholder="••••••••"
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[9px] sm:text-[10px] text-[#6f8faf] uppercase tracking-widest font-black block mb-1 sm:mb-1.5">
                      I am a
                    </label>
                    <select
                      value={registerData.role}
                      onChange={(e) => setRegisterData({ ...registerData, role: e.target.value })}
                      className="w-full bg-[#0d1f33] border border-[#1a3a5a] focus:border-[#4a6a8f] rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white font-sans text-sm focus:outline-none"
                      disabled={loading}
                    >
                      <option className="bg-[#0a1628]" value="student">Student</option>
                      <option className="bg-[#0a1628]" value="professional">Professional</option>
                      <option className="bg-[#0a1628]" value="startup">Startup Founder</option>
                      <option className="bg-[#0a1628]" value="corporate">Corporate Partner</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 sm:py-3.5 bg-[#4a6a8f] hover:bg-[#6f8faf] text-white font-mono text-[10px] sm:text-xs uppercase tracking-widest font-black rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Creating account...' : 'Create Account'}
                  </button>
                  <p className="text-center text-[10px] sm:text-xs text-[#6f8faf]">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('login');
                        setError(null);
                        setSuccessMessage(null);
                      }}
                      className="text-white font-bold hover:underline"
                    >
                      Sign in here
                    </button>
                  </p>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}