import { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react';
import Navbar from './components/Navbar';
import React from 'react';
import EetirpLogo from './components/EetirpLogo';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowDown,
  Cpu,
  ChevronRight,
  HelpCircle,
  Layers,
  Check,
  X,
  Briefcase,
  GraduationCap,
  Terminal,
  Play,
  RefreshCw,
  LogOut,
  CheckCircle2,
  Award,
  Compass,
  ArrowRight,
  Sparkles,
  BookOpen,
  Code2,
  HardDrive,
  Mail,
  Phone,
  Rocket,
  Shield,
  Activity,
  Github,
  Linkedin,
  MessageSquare,
  Users,
  Megaphone,
  ExternalLink
} from 'lucide-react';

// Interfaces mapping
import { LiveApp, OnboardingDiagnostic, TerminalHistory } from './types';

export default function App() {
  const logoUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0Tb6eZNPswTOWvOMp-_Cr62CASvc3c1--t-f0c7jsDTf3DDa7VXGVV11ESxGD_HPDFE6RpScmJ370lwrrXmeazaZQYIj8m7hn0bJnYSqk3_XU5Dcss9V5eW-P-xrSNI2qfpfd9ie5Xo4uoeJkjFjwkdZpiCEgEQwCCuNfJ2qP6w02tLoQGSCGsEMAaHgvSpakzfOeNKfmFZIVxuo120cSRST7WO0Yiycj1foar3k9F_g1CBYb24k1YjOVtZMW5K-7OamqD3AzPLU';

  const [introActive, setIntroActive] = useState(true);
  const [introPhase, setIntroPhase] = useState<'logo' | 'words'>('logo');

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setIntroPhase('words');
    }, 2000);

    const timer2 = setTimeout(() => {
      setIntroActive(false);
      // Ensure the page is at the absolute top when the preloader starts showing the main site
      window.scrollTo(0, 0);
    }, 5500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const scrollSmoothTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // State for Positioning tabs
  const [activeTab, setActiveTab] = useState<'college' | 'bridge' | 'enterprise'>('college');

  // State for SaaS Labs interactive simulator
  const [selectedProjectId, setSelectedProjectId] = useState<'placement' | 'kaura' | 'studio'>('placement');

  // State for Terminal Shell Interactive Widget
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<TerminalHistory[]>([
    { command: 'system --status', result: 'EETIRP Catalyst Platform initialized. Core systems listening.', type: 'success' },
    { command: 'help', result: 'Available variables: help, clear, apps --list, status --telemetry, diagnostics --init', type: 'info' }
  ]);
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalBottomRef.current) {
      terminalBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalHistory]);

  const handleTerminalSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cleanCommand = terminalInput.trim().toLowerCase();
    if (!cleanCommand) return;

    let outputResult = '';
    let outputType: 'success' | 'error' | 'info' = 'info';

    switch (cleanCommand) {
      case 'help':
        outputResult = 'Available variables: help, clear, apps --list, status --telemetry, diagnostics --init';
        outputType = 'info';
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      case 'apps --list':
        outputResult = '01. Placement AI Platform (v2.0.4) -> Port 3000 Stable\n02. Kaura Hub Portal (v1.1.0) -> Port 443 Sync Active\n03. Live Production Telemetry Mesh -> Global Nodes Active';
        outputType = 'success';
        break;
      case 'status --telemetry':
        outputResult = 'LATENCY: 8ms | REGION: Singapore/Bengaluru Nodes | ACTIVE BRANCHES: 15+ Main Repos';
        outputType = 'success';
        break;
      case 'diagnostics --init':
        outputResult = 'Running automated onboarding test rules... SUCCESS. Candidate Day-1 deployment index score calculated at 94.2%. Output metrics ready.';
        outputType = 'success';
        break;
      default:
        outputResult = `Command error: "${terminalInput}" is unsupported by core telemetry kernel. Type "help" for active operational rules.`;
        outputType = 'error';
        break;
    }

    setTerminalHistory((prev) => [...prev, { command: terminalInput, result: outputResult, type: outputType }]);
    setTerminalInput('');
  };

  // State for onboarding contact form
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    segment: 'Engineering College Student',
    domainInterest: 'Coding Bootcamps (Hands-on)',
    inquiryMatrix: '',
  });
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) return;

    setIsSubmittingForm(true);
    setSubmitStatus('idle');

    try {
      // Prepared for manual backend email sending integration
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error("Backend error context details:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmittingForm(false);
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      segment: 'Engineering College Student',
      domainInterest: 'Coding Bootcamps (Hands-on)',
      inquiryMatrix: '',
    });
    setSubmitStatus('idle');
  };

  return (
    <div className="bg-[#f4f1ea] text-[#0b1f3b] selection:bg-[#bfd3e6]/50 selection:text-[#0b1f3b] font-sans overflow-x-hidden min-h-screen flex flex-col pt-12" id="top-anchor">

      {/* 0. Preloader Splash Sequence */}
      <AnimatePresence>
        {introActive && (
          <motion.div
            key="preloader-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
            className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#f4f1ea] select-none text-[#0b1f3b]"
          >
            {introPhase === 'logo' ? (
              <motion.div
                key="logo-reveal-stage"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.4 } }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center justify-center text-center p-6"
              >
                <div className="w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center select-none">
                  <EetirpLogo className="w-full h-full" isAnimated={true} showSlogan={false} />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="words-reveal-stage"
                initial={{ opacity: 1 }}
                className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-14 font-sans text-4xl sm:text-5xl md:text-6xl font-black uppercase text-[#0b1f3b] tracking-tight px-6"
              >
                <motion.span
                  initial={{ x: -250, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 70 }}
                  className="relative px-3 py-1.5 border-b-4 border-[#1f3a5f]"
                >
                  INNOVATE
                </motion.span>

                <motion.span
                  initial={{ x: 250, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.0, type: "spring", stiffness: 70 }}
                  className="relative px-3 py-1.5 border-b-4 border-[#6f8faf]"
                >
                  INTEGRATE
                </motion.span>

                <motion.span
                  initial={{ x: -250, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.8, type: "spring", stiffness: 70 }}
                  className="relative px-3 py-1.5 border-b-4 border-[#bfd3e6] text-[#1f3a5f]"
                >
                  ELEVATE
                </motion.span>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Header Navigation System */}
      <Navbar />

      {/* 2. Hero Section - Sleek & Clean Backdrop */}
      <header className="relative min-h-[92vh] flex flex-col items-center justify-center pt-28 pb-20 px-6 md:px-16 text-center overflow-hidden">

        {/* Soft ambient focus points in line with our brand colors */}
        <motion.div
          animate={{
            scale: [1, 1.15, 0.95, 1],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-[#bfd3e6]/20 blur-[130px] pointer-events-none rounded-full"
        />
        <motion.div
          animate={{
            scale: [1, 0.9, 1.15, 1],
            rotate: [360, 270, 180, 90, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#6f8faf]/15 blur-[120px] pointer-events-none rounded-full"
        />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          {/* Main Logo Emblem - Seamless & High-Quality Scale */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            whileHover={{ scale: 1.05 }}
            className="mb-8 flex flex-col items-center justify-center select-none"
          >
            <div className="w-52 h-52 sm:w-60 sm:h-60 flex items-center justify-center">
              <EetirpLogo className="w-full h-full" isAnimated={true} />
            </div>
          </motion.div>

          {/* Capsule badge - Clean state without blinker */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full bg-[#0b1f3b] border-2 border-[#1f3a5f] mb-8 shadow-md"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] font-black text-white">
              BRIDGING COLLEGE THEORY & ENTERPRISE EXCELLENCE
            </span>
          </motion.div>

          {/* Majestic main heading with gradient effects */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="font-sans text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#0b1f3b] mb-6 leading-[1.08] tracking-tight max-w-4xl"
          >
            The Hybrid Ecosystem <br className="hidden md:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0b1f3b] via-[#1f3a5f] to-[#6f8faf] relative">
              For Engineering Leaders
              <span className="absolute bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-[#1f3a5f]/0 via-[#bfd3e6]/50 to-[#1f3a5f]/0"></span>
            </span>
          </motion.h1>

          {/* Descriptive block */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="font-sans text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed font-semibold"
          >
            EETIRP merges a high-impact <span className="text-[#0b1f3b] font-black underline decoration-[#bfd3e6] decoration-2">Engineering Academy</span> with an active, production-scale <span className="text-[#0b1f3b] font-black underline decoration-[#1f3a5f] decoration-2">Startup Studio</span>. We train elite software engineers by building live production platforms together.
          </motion.p>

          {/* CTA Button Actions - Animated button tracks */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto"
          >
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollSmoothTo('onboarding')}
              className="w-full sm:w-auto px-8 py-4.5 rounded-xl bg-[#1f3a5f] hover:bg-[#11223b] text-white font-mono text-xs uppercase tracking-[0.16em] font-extrabold shadow-lg cursor-pointer transition-all duration-300"
            >
              Join Ecosystem Cohort
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollSmoothTo('services')}
              className="w-full sm:w-auto px-8 py-4.5 rounded-xl bg-[#0b1f3b] text-white border-2 border-[#bfd3e6]/30 font-mono text-xs uppercase tracking-[0.16em] font-bold hover:bg-[#112440] transition-all duration-300 cursor-pointer shadow-md text-center"
            >
              View Live Projects →
            </motion.button>
          </motion.div>
        </div>

        {/* Floating scroll action down anchor */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center select-none cursor-pointer group"
          onClick={() => scrollSmoothTo('notice-marquee')}
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#1f3a5f] font-bold mb-1.5 opacity-80 group-hover:opacity-100 transition-opacity">Explore Studio</span>
          <ArrowDown className="w-4 h-4 text-[#1f3a5f] group-hover:text-[#6f8faf] transition-colors" />
        </motion.div>
      </header>

      {/* 3. Rolling Marquee Board from screens */}
      <section className="w-full border-y border-[#0b1f3b]/10 py-5 bg-white overflow-hidden select-none shadow-sm" id="notice-marquee">
        <div className="flex animate-marquee whitespace-nowrap">
          <div className="flex items-center gap-16 px-8">
            <span className="font-mono text-xs text-[#0b1f3b] flex items-center gap-2.5 tracking-widest font-black">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1f3a5f]"></span> 100% LIVE SAAS PROJECTS
            </span>
            <span className="font-mono text-xs text-[#0b1f3b] flex items-center gap-2.5 tracking-widest font-black">
              <span className="w-2.5 h-2.5 rounded-full bg-[#6f8faf]"></span> 10X FASTER SKILL UPGRADES
            </span>
            <span className="font-mono text-xs text-[#0b1f3b] flex items-center gap-2.5 tracking-widest font-black">
              <span className="w-2.5 h-2.5 rounded-full bg-[#bfd3e6]"></span> LIVE PRODUCTION SAAS BUILT
            </span>
            <span className="font-mono text-xs text-[#0b1f3b] flex items-center gap-2.5 tracking-widest font-black">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1f3a5f]"></span> DAY-1 ENTERPRISE READY CONTRIBUTOR
            </span>
          </div>
          <div className="flex items-center gap-16 px-8">
            <span className="font-mono text-xs text-[#0b1f3b] flex items-center gap-2.5 tracking-widest font-black">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1f3a5f]"></span> 100% LIVE SAAS PROJECTS
            </span>
            <span className="font-mono text-xs text-[#0b1f3b] flex items-center gap-2.5 tracking-widest font-black">
              <span className="w-2.5 h-2.5 rounded-full bg-[#6f8faf]"></span> 10X FASTER SKILL UPGRADES
            </span>
            <span className="font-mono text-xs text-[#0b1f3b] flex items-center gap-2.5 tracking-widest font-black">
              <span className="w-2.5 h-2.5 rounded-full bg-[#bfd3e6]"></span> LIVE PRODUCTION SAAS BUILT
            </span>
            <span className="font-mono text-xs text-[#0b1f3b] flex items-center gap-2.5 tracking-widest font-black">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1f3a5f]"></span> DAY-1 ENTERPRISE READY CONTRIBUTOR
            </span>
          </div>
        </div>
      </section>

      {/* 4. Ecosystem Summary Metrics from screens */}
      <section className="py-14 px-6 md:px-16 max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-[#0b1f3b] to-[#1f3a5f] text-white rounded-3xl p-8 md:p-12 border-2 border-[#bfd3e6]/20 shadow-2xl relative overflow-hidden"
        >

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10 divide-y divide-white/10 sm:divide-y-0 lg:divide-x lg:divide-white/10">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center p-4 max-sm:py-6 flex flex-col justify-center items-center"
            >
              <div className="w-10 h-10 rounded-full bg-[#bfd3e6]/20 flex items-center justify-center mb-3">
                <Code2 className="w-5 h-5 text-[#bfd3e6]" />
              </div>
              <div className="font-sans text-5xl font-black text-[#bfd3e6] tracking-tight">100%</div>
              <p className="font-mono text-[10px] tracking-widest text-[#eae6db]/90 uppercase font-black mt-2">Live SaaS Projects</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center p-4 max-sm:py-6 flex flex-col justify-center items-center"
            >
              <div className="w-10 h-10 rounded-full bg-[#bfd3e6]/20 flex items-center justify-center mb-3">
                <Sparkles className="w-5 h-5 text-[#bfd3e6]" />
              </div>
              <div className="font-sans text-5xl font-black text-[#bfd3e6] tracking-tight">10x</div>
              <p className="font-mono text-[10px] tracking-widest text-[#eae6db]/90 uppercase font-black mt-2">Faster Skill Upgrades</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center p-4 max-sm:py-6 flex flex-col justify-center items-center"
            >
              <div className="w-10 h-10 rounded-full bg-[#6f8faf]/20 flex items-center justify-center mb-3">
                <Cpu className="w-5 h-5 text-[#6f8faf]" />
              </div>
              <div className="font-sans text-5xl font-black text-[#6f8faf] tracking-tight">Live</div>
              <p className="font-mono text-[10px] tracking-widest text-[#eae6db]/90 uppercase font-black mt-2">Production SaaS Built</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center p-4 max-sm:py-6 flex flex-col justify-center items-center"
            >
              <div className="w-10 h-10 rounded-full bg-[#bfd3e6]/20 flex items-center justify-center mb-3">
                <Briefcase className="w-5 h-5 text-[#bfd3e6]" />
              </div>
              <div className="font-sans text-5xl font-black text-[#bfd3e6] tracking-tight">Day-1</div>
              <p className="font-mono text-[10px] tracking-widest text-[#eae6db]/90 uppercase font-black mt-2">Enterprise Contributor</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* 5. Our Positioning Model Tabbed Panels Section */}
      <section className="py-24 bg-white border-y border-[#0b1f3b]/5" id="positioning">
        <div className="px-6 md:px-16 max-w-6xl mx-auto">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-[10px] text-[#1f3a5f] tracking-[0.3em] uppercase bg-[#bfd3e6]/30 border-2 border-[#bfd3e6]/40 px-4 py-1.5 rounded-full font-black shadow-sm">
              Our Positioning Model
            </span>
            <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-[#0b1f3b] mt-5 mb-4 tracking-tight leading-none">
              Operational Realities & The Technical Bridge
            </h2>
            <p className="font-sans text-[#475569] text-base leading-relaxed font-semibold">
              Traditional engineering education leaves a massive gap. EETIRP acts as the vital bridge delivering the technical, logical, and product-focused expertise modern companies demand.
            </p>
          </div>

          {/* Tab selectors */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
            <button
              onClick={() => setActiveTab('college')}
              className={`px-6 py-4.5 rounded-xl font-mono text-xs uppercase tracking-widest font-extrabold border-2 transition-all duration-300 cursor-pointer relative ${activeTab === 'college'
                ? 'bg-[#00132e] text-white border-transparent shadow-lg transform -translate-y-0.5'
                : 'bg-[#f4f1ea] text-[#475569] border-[#00132e]/10 hover:text-[#00132e] hover:border-[#7a3fed]/30'
                }`}
            >
              {activeTab === 'college' && (
                <motion.span layoutId="tab-glow" className="absolute inset-0 border-2 border-[#7a3fed] rounded-xl pointer-events-none" />
              )}
              Traditional College Theory
            </button>
            <button
              onClick={() => setActiveTab('bridge')}
              className={`px-6 py-4.5 rounded-xl font-mono text-xs uppercase tracking-widest font-extrabold border-2 transition-all duration-300 cursor-pointer relative ${activeTab === 'bridge'
                ? 'bg-[#00132e] text-white border-transparent shadow-lg transform -translate-y-0.5'
                : 'bg-[#f4f1ea] text-[#475569] border-[#00132e]/10 hover:text-[#00132e] hover:border-[#7a3fed]/30'
                }`}
            >
              {activeTab === 'bridge' && (
                <motion.span layoutId="tab-glow" className="absolute inset-0 border-2 border-[#7a3fed] rounded-xl pointer-events-none" />
              )}
              EETIRP Bridge & Solutions
            </button>
            <button
              onClick={() => setActiveTab('enterprise')}
              className={`px-6 py-4.5 rounded-xl font-mono text-xs uppercase tracking-widest font-extrabold border-2 transition-all duration-300 cursor-pointer relative ${activeTab === 'enterprise'
                ? 'bg-[#00132e] text-white border-transparent shadow-lg transform -translate-y-0.5'
                : 'bg-[#f4f1ea] text-[#475569] border-[#00132e]/10 hover:text-[#00132e] hover:border-[#7a3fed]/30'
                }`}
            >
              {activeTab === 'enterprise' && (
                <motion.span layoutId="tab-glow" className="absolute inset-0 border-2 border-[#7a3fed] rounded-xl pointer-events-none" />
              )}
              Enterprise Expectation
            </button>
          </div>

          {/* Dynamic Content Panel */}
          <div className="bg-[#f4f1ea] border-2 border-[#7a3fed]/20 rounded-3xl p-6 md:p-10 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#7a3fed]/5 to-transparent rounded-full blur-xl"></div>

            <AnimatePresence mode="wait">
              {activeTab === 'college' && (
                <motion.div
                  key="college"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10"
                >
                  <div className="lg:col-span-7 space-y-6 flex flex-col justify-center">
                    <div className="inline-block bg-red-100 text-red-700 border-2 border-red-200 uppercase font-mono text-[9px] px-3 py-1 rounded-md tracking-widest font-black w-max">
                      THE PROBLEM
                    </div>
                    <h3 className="font-sans text-2xl md:text-3xl font-black text-[#00132e] tracking-tight">
                      The Academic Knowledge Gap
                    </h3>
                    <p className="font-sans text-[#475569] text-sm leading-relaxed font-semibold">
                      Colleges deliver essential foundational theory and basic algorithmic overviews. However, they lack dynamic updates, sandbox environments, and execution contexts.
                    </p>
                    <ul className="space-y-4 pt-2">
                      <li className="flex gap-3 items-start text-sm font-sans text-[#1f3241] font-semibold">
                        <span className="w-5 h-5 rounded-full bg-red-200 text-red-700 flex items-center justify-center font-black text-xs shrink-0 mt-0.5 border border-red-300">✗</span>
                        <span>Outdated syllabi focusing on memorization over deployment.</span>
                      </li>
                      <li className="flex gap-3 items-start text-sm font-sans text-[#1f3241] font-semibold">
                        <span className="w-5 h-5 rounded-full bg-red-200 text-red-700 flex items-center justify-center font-black text-xs shrink-0 mt-0.5 border border-red-300">✗</span>
                        <span>Dry lab code snippets that never face production-scale performance tests or state management.</span>
                      </li>
                      <li className="flex gap-3 items-start text-sm font-sans text-[#1f3241] font-semibold">
                        <span className="w-5 h-5 rounded-full bg-red-200 text-red-700 flex items-center justify-center font-black text-xs shrink-0 mt-0.5 border border-red-300">✗</span>
                        <span>Isolated working environments devoid of proper Git-flows, Code Reviews, and CI/CD pipelines.</span>
                      </li>
                    </ul>
                  </div>
                  <div className="lg:col-span-5 flex items-center">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="w-full bg-[#00132e] text-white rounded-2xl p-8 border-2 border-[#7a3fed]/30 shadow-md flex flex-col items-center text-center"
                    >
                      <div className="p-3.5 bg-[#ffffff]/10 rounded-full border border-white/10 mb-4 text-[#eae6db]">
                        <GraduationCap className="w-8 h-8 text-[#04a0e9]" />
                      </div>
                      <span className="font-mono text-[10px] tracking-widest text-[#04a0e9] font-black uppercase mb-2 block">
                        THEORETICAL BASE
                      </span>
                      <p className="font-sans text-sm leading-relaxed text-[#eae6db]/90 font-semibold text-center">
                        Valid starting concepts, but insufficient for direct software-engineering or startup product builds.
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'bridge' && (
                <motion.div
                  key="bridge"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10"
                >
                  <div className="lg:col-span-7 space-y-6 flex flex-col justify-center">
                    <div className="inline-block bg-green-150 text-green-800 border-2 border-green-300 uppercase font-mono text-[9px] px-3 py-1 rounded-md tracking-widest font-black w-max">
                      THE BRIDGE
                    </div>
                    <h3 className="font-sans text-2xl md:text-3xl font-black text-[#00132e] tracking-tight">
                      Hands-on, Project-Centric SaaS Studio
                    </h3>
                    <p className="font-sans text-[#475569] text-sm leading-relaxed font-semibold">
                      EETIRP integrates the student's theoretical foundation with professional product building. We use active, live in-house SaaS applications as practical Sandboxes for training, architectural study, and collaborative code deployment.
                    </p>
                    <ul className="space-y-4 pt-2">
                      <li className="flex gap-3 items-start text-sm font-sans text-[#1f3241] font-semibold">
                        <span className="w-5 h-5 rounded-full bg-emerald-250 text-emerald-800 flex items-center justify-center font-black text-xs shrink-0 mt-0.5 border border-emerald-350">✓</span>
                        <span>Real-world deployments utilizing standard developer toolchains (Supabase, Next.js, Vercel, Docker).</span>
                      </li>
                      <li className="flex gap-3 items-start text-sm font-sans text-[#1f3241] font-semibold">
                        <span className="w-5 h-5 rounded-full bg-emerald-250 text-emerald-800 flex items-center justify-center font-black text-xs shrink-0 mt-0.5 border border-emerald-350">✓</span>
                        <span>Continuous product-oriented sprints that teach student engineers how to scale apps.</span>
                      </li>
                      <li className="flex gap-3 items-start text-sm font-sans text-[#1f3241] font-semibold">
                        <span className="w-5 h-5 rounded-full bg-emerald-250 text-emerald-800 flex items-center justify-center font-black text-xs shrink-0 mt-0.5 border border-emerald-350">✓</span>
                        <span>Active mentor-led startup culture matching actual high-performance tech squads.</span>
                      </li>
                    </ul>
                  </div>
                  <div className="lg:col-span-5 flex items-center">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="w-full bg-[#00132e] text-white rounded-2xl p-8 border-2 border-[#7a3fed]/30 shadow-md flex flex-col items-center text-center"
                    >
                      <div className="p-3.5 bg-[#ffffff]/10 rounded-full border border-white/10 mb-4 text-[#eae6db]">
                        <Rocket className="w-8 h-8 text-[#7a3fed]" />
                      </div>
                      <span className="font-mono text-[10px] tracking-widest text-[#7a3fed] font-black uppercase mb-2 block">
                        EETIRP CATALYST STUDIO
                      </span>
                      <p className="font-sans text-sm leading-relaxed text-[#eae6db]/90 font-semibold text-center">
                        Where developers build actual Software-as-a-Service platforms, converting theory into concrete functional applications.
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'enterprise' && (
                <motion.div
                  key="enterprise"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10"
                >
                  <div className="lg:col-span-7 space-y-6 flex flex-col justify-center">
                    <div className="inline-block bg-blue-100 text-blue-800 border-2 border-blue-200 uppercase font-mono text-[9px] px-3 py-1 rounded-md tracking-widest font-black w-max">
                      THE GOAL
                    </div>
                    <h3 className="font-sans text-2xl md:text-3xl font-black text-[#00132e] tracking-tight">
                      Day-One Ready Contributors
                    </h3>
                    <p className="font-sans text-[#475569] text-sm leading-relaxed font-semibold">
                      High-growth startups and mature enterprises can't afford six months of fundamental training. They demand immediate, structured technical execution.
                    </p>
                    <ul className="space-y-4 pt-2">
                      <li className="flex gap-3 items-start text-sm font-sans text-[#1f3241] font-semibold">
                        <Check className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                        <span>Autonomous navigation of complex monorepos, clean architecture patterns, and backend performance.</span>
                      </li>
                      <li className="flex gap-3 items-start text-sm font-sans text-[#1f3241] font-semibold">
                        <Check className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                        <span>Clean pull request creation, test-driven validation, and resilient APIs.</span>
                      </li>
                      <li className="flex gap-3 items-start text-sm font-sans text-[#1f3241] font-semibold">
                        <Check className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                        <span>A product mindset where features are designed for user utility, performance, and efficiency.</span>
                      </li>
                    </ul>
                  </div>
                  <div className="lg:col-span-5 flex items-center">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="w-full bg-[#00132e] text-white rounded-2xl p-8 border-2 border-[#7a3fed]/30 shadow-md flex flex-col items-center text-center"
                    >
                      <div className="p-3.5 bg-[#ffffff]/10 rounded-full border border-white/10 mb-4 text-[#eae6db]">
                        <Briefcase className="w-8 h-8 text-[#04a0e9]" />
                      </div>
                      <span className="font-mono text-[10px] tracking-widest text-[#04a0e9] font-black uppercase mb-2 block">
                        INDUSTRY PREPAREDNESS
                      </span>
                      <p className="font-sans text-sm leading-relaxed text-[#eae6db]/90 font-semibold text-center">
                        Ensuring you cross the finish line directly ready to lead features on real-world enterprise systems.
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 6. Program Pillars Grid layout */}
      <section className="py-24 px-6 md:px-16 max-w-6xl mx-auto w-full" id="pillars">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-[10px] text-[#7a3fed] tracking-[0.25em] bg-[#7a3fed]/10 border-2 border-[#7a3fed]/20 px-4 py-1.5 rounded-full font-black uppercase shadow-sm">
            Our Program Pillars
          </span>
          <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-[#00132e] mt-4 mb-4 tracking-tight leading-none">
            Comprehensive Training & Studio Pathways
          </h2>
          <p className="font-sans text-[#475569] text-base leading-relaxed font-semibold">
            We have systematically deconstructed the full software engineer's journey, introducing hyper-focused pathways for builders of all levels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">

          {/* Pillar 1 */}
          <motion.div
            whileHover={{ y: -4 }}
            className="flex flex-col justify-between group p-6 rounded-2xl hover:bg-[#0b1f3b]/5 transition-all duration-300"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#7a3fed]/10 flex items-center justify-center text-[#7a3fed] mb-5 border border-[#7a3fed]/20">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-sans text-lg font-black text-[#00132e] mb-3">
                Technical Training Programs
              </h3>
              <p className="font-sans text-xs text-[#475569] leading-relaxed mb-6 font-semibold">
                Structured modules covering DSA, systems architecture, networking, databases, and standard engineer practices built around company assessments.
              </p>
            </div>
            <span className="font-mono text-[10px] tracking-widest text-[#7a3fed] uppercase font-extrabold group-hover:underline">
              ACADEMY FOCUS →
            </span>
          </motion.div>

          {/* Pillar 2 */}
          <motion.div
            whileHover={{ y: -4 }}
            className="flex flex-col justify-between group p-6 rounded-2xl hover:bg-[#0b1f3b]/5 transition-all duration-300"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#04a0e9]/10 flex items-center justify-center text-[#04a0e9] mb-5 border border-[#04a0e9]/20">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="font-sans text-lg font-black text-[#00132e] mb-3">
                Intensive Coding Bootcamps
              </h3>
              <p className="font-sans text-xs text-[#475569] leading-relaxed mb-6 font-semibold">
                Hyper-focused, stack-specific sprints building real-time apps. Go deep into React, Next.js, Node, Golang, and Cloud Infrastructure.
              </p>
            </div>
            <span className="font-mono text-[10px] tracking-widest text-[#04a0e9] uppercase font-extrabold group-hover:underline">
              SPRINT MODEL →
            </span>
          </motion.div>

          {/* Pillar 3 */}
          <motion.div
            whileHover={{ y: -4 }}
            className="flex flex-col justify-between group p-6 rounded-2xl hover:bg-[#0b1f3b]/5 transition-all duration-300"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-700 mb-5 border border-green-200">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="font-sans text-lg font-black text-[#00132e] mb-3">
                Industry-Oriented Projects
              </h3>
              <p className="font-sans text-xs text-[#475569] leading-relaxed mb-6 font-semibold">
                Ditch academic toy problems. Solve actual system bottlenecks, integrate real-world APIs, design DB schemas, and debug live production apps.
              </p>
            </div>
            <span className="font-mono text-[10px] tracking-widest text-green-700 uppercase font-extrabold group-hover:underline">
              SANDBOX ENVIRONMENT →
            </span>
          </motion.div>

          {/* Pillar 4 */}
          <motion.div
            whileHover={{ y: -4 }}
            className="flex flex-col justify-between group p-6 rounded-2xl hover:bg-[#0b1f3b]/5 transition-all duration-300"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700 mb-5 border border-purple-200">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="font-sans text-lg font-black text-[#00132e] mb-3">
                Placement Preparation
              </h3>
              <p className="font-sans text-xs text-[#475569] leading-relaxed mb-6 font-semibold">
                End-to-end placement readiness: intense Mock Interviews, automated coding rounds, ATS resume generation, and structured system design preparation.
              </p>
            </div>
            <span className="font-mono text-[10px] tracking-widest text-purple-700 uppercase font-extrabold group-hover:underline">
              CAREER GATEWAY →
            </span>
          </motion.div>

          {/* Pillar 5 */}
          <motion.div
            whileHover={{ y: -4 }}
            className="flex flex-col justify-between group p-6 rounded-2xl hover:bg-[#0b1f3b]/5 transition-all duration-300"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-700 mb-5 border border-orange-200">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-sans text-lg font-black text-[#00132e] mb-3">
                Corporate Upskilling
              </h3>
              <p className="font-sans text-xs text-[#475569] leading-relaxed mb-6 font-semibold">
                Enterprise-level training built for active engineering roles. Upgrade staff workflows to handle cloud architectures, AI tools, and DevOps pipelines.
              </p>
            </div>
            <span className="font-mono text-[10px] tracking-widest text-orange-700 uppercase font-extrabold group-hover:underline">
              ENTERPRISE UPGRADES →
            </span>
          </motion.div>

          {/* Pillar 6 */}
          <motion.div
            whileHover={{ y: -4 }}
            className="flex flex-col justify-between group p-6 rounded-2xl hover:bg-[#0b1f3b]/5 transition-all duration-300"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 mb-5 border border-blue-200">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-sans text-lg font-black text-[#00132e] mb-3">
                Research & Innovation
              </h3>
              <p className="font-sans text-xs text-[#475569] leading-relaxed mb-6 font-semibold">
                Translating concepts into technical realities. Direct mentorship on advanced proof of concepts, custom engineering tools, and hardware-software integrations.
              </p>
            </div>
            <span className="font-mono text-[10px] tracking-widest text-blue-700 uppercase font-extrabold group-hover:underline">
              INNOVATION DESK →
            </span>
          </motion.div>

        </div>
      </section>

      {/* 7. Present Ongoing Projects Tracker with Web Browser Simulated Display */}
      <section className="py-24 bg-white border-y border-[#00132e]/5" id="services">
        <div className="px-6 md:px-16 max-w-6xl mx-auto">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-[10px] text-[#04a0e9] tracking-[0.3em] uppercase bg-[#04a0e9]/10 border-2 border-[#04a0e9]/20 px-4 py-1.5 rounded-full font-black shadow-sm">
              SaaS Sandbox Lab
            </span>
            <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-[#00132e] mt-5 mb-4 tracking-tight leading-none">
              Present Ongoing Projects
            </h2>
            <p className="font-sans text-[#475569] text-base leading-relaxed font-semibold">
              We don't teach from empty slides. EETIRP acts as a live Startup Studio, engineering real products. These platforms serve as live production ecosystems where our student-engineers write code, monitor databases, and deploy production upgrades.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left selector menu - Cards */}
            <div className="lg:col-span-5 space-y-4">

              {/* Project Tab 1 Selector */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedProjectId('placement')}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer relative overflow-hidden group ${selectedProjectId === 'placement'
                  ? 'bg-[#00132e] text-white border-transparent shadow-xl'
                  : 'bg-[#f4f1ea] text-[#00132e] border-[#00132e]/10 hover:border-[#7a3fed]/40'
                  }`}
              >
                {selectedProjectId === 'placement' && (
                  <motion.div layoutId="nav-glow-indicator" className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#7a3fed] z-15" />
                )}
                <div className="flex justify-between items-center mb-3">
                  <span className="font-mono text-[10px] tracking-wider uppercase bg-[#7a3fed] text-white px-2.5 py-0.5 rounded-md font-black">
                    01
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-[#04a0e9] font-black">
                    ● ACTIVE PRODUCTION
                  </span>
                </div>
                <h4 className="font-sans text-lg font-black tracking-tight mb-2">
                  Placement AI Platform
                </h4>
                <p className={`font-sans text-xs ${selectedProjectId === 'placement' ? 'text-gray-300' : 'text-[#475569]'} leading-relaxed font-semibold`}>
                  An AI-driven environment optimizing interview preparedness. Utilizes automated evaluation engines, resume scorers, and smart predictive diagnostics.
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest font-black text-[#04a0e9] group-hover:translate-x-1 transition-transform">
                  <span>Explore detailed specs</span> <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>

              {/* Project Tab 2 Selector */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedProjectId('kaura')}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer relative overflow-hidden group ${selectedProjectId === 'kaura'
                  ? 'bg-[#00132e] text-white border-transparent shadow-xl'
                  : 'bg-[#f4f1ea] text-[#00132e] border-[#00132e]/10 hover:border-[#04a0e9]/40'
                  }`}
              >
                {selectedProjectId === 'kaura' && (
                  <motion.div layoutId="nav-glow-indicator" className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#04a0e9] z-15" />
                )}
                <div className="flex justify-between items-center mb-3">
                  <span className="font-mono text-[10px] tracking-wider uppercase bg-[#04a0e9] text-white px-2.5 py-0.5 rounded-md font-black">
                    02
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-[#04a0e9] font-black">
                    ● ACTIVE PRODUCTION
                  </span>
                </div>
                <h4 className="font-sans text-lg font-black tracking-tight mb-2">
                  Kaura Hub
                </h4>
                <p className={`font-sans text-xs ${selectedProjectId === 'kaura' ? 'text-gray-300' : 'text-[#475569]'} leading-relaxed font-semibold`}>
                  A next-generation student workspace developed under EETIRP LTD. Kaura integrates vital student utilities, notes engines, and productivity tools into one unified student portal.
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest font-black text-[#04a0e9] group-hover:translate-x-1 transition-transform">
                  <span>Explore detailed specs</span> <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>

              {/* Project Tab 3 Selector */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedProjectId('studio')}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer relative overflow-hidden group ${selectedProjectId === 'studio'
                  ? 'bg-[#00132e] text-white border-transparent shadow-xl'
                  : 'bg-[#f4f1ea] text-[#00132e] border-[#00132e]/10 hover:border-[#7a3fed]/40'
                  }`}
              >
                {selectedProjectId === 'studio' && (
                  <motion.div layoutId="nav-glow-indicator" className="absolute left-0 top-0 bottom-0 w-[4px] bg-green-500 z-15" />
                )}
                <div className="flex justify-between items-center mb-3">
                  <span className="font-mono text-[10px] tracking-wider uppercase bg-green-600 text-white px-2.5 py-0.5 rounded-md font-black">
                    03
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-[#04a0e9] font-black">
                    ● CORE INTEGRATION
                  </span>
                </div>
                <h4 className="font-sans text-lg font-black tracking-tight mb-2">
                  Live Studio Integration
                </h4>
                <p className={`font-sans text-xs ${selectedProjectId === 'studio' ? 'text-gray-300' : 'text-[#475569]'} leading-relaxed font-semibold`}>
                  These aren't just mockup dashboards. Every student inside EETIRP gets assigned repository tickets, handles actual customer bugs, reviews real metrics logs, and helps deploy features.
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest font-black text-[#04a0e9] group-hover:translate-x-1 transition-transform">
                  <span>Explore detailed specs</span> <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>

            </div>

            {/* Right side: Interactive Simulated Web Browser Console as shown in screenshots */}
            <div className="lg:col-span-7 bg-[#00132e] rounded-2xl border-2 border-[#7a3fed]/30 shadow-2xl overflow-hidden font-mono text-white text-xs">

              {/* Browser control bar */}
              <div className="bg-[#000e25] px-4 py-3.5 flex items-center justify-between border-b border-white/10 select-none">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.8)]"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_6px_rgba(234,179,8,0.8)]"></span>
                  <span className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.8)]"></span>
                </div>

                {/* Simulated URL input */}
                <div className="flex-grow max-w-sm mx-4 bg-[#00132e] border border-white/10 rounded-lg px-3 py-1 font-mono text-[10px] text-gray-400 select-all tracking-wide text-center">
                  eetirp_studio://live-preview
                </div>

                <span className="text-[10px] font-sans text-[#04a0e9] font-black uppercase tracking-widest max-sm:hidden">
                  {selectedProjectId === 'placement' ? 'placement-ai' : selectedProjectId === 'kaura' ? 'kaura-hub' : 'live-dashboard'}
                </span>
              </div>

              {/* Simulated browser content window */}
              <div className="p-6 md:p-8 min-h-[350px] bg-[#00132e] flex flex-col justify-between font-sans relative">

                <AnimatePresence mode="wait">
                  {/* Active Project display details */}
                  {selectedProjectId === 'placement' && (
                    <motion.div
                      key="placement"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6 text-left"
                    >
                      <span className="font-mono text-[10px] text-[#7a3fed] border-2 border-[#7a3fed]/40 px-2.5 py-1 bg-[#7a3fed]/15 rounded-md tracking-widest font-black uppercase inline-block">
                        Ecosystem App 01
                      </span>
                      <h5 className="text-2xl font-extrabold tracking-tight text-white font-sans mt-2">
                        Placement AI Platform
                      </h5>

                      <p className="text-gray-300 text-sm leading-relaxed max-w-xl font-semibold">
                        An integrated AI ecosystem designed to help engineering students prepare for and secure top-tier placements. The platform uses tailored LLM workflows to run predictive simulations on standard software assessments.
                      </p>

                      <div className="bg-[#000e25]/50 border-2 border-[#7a3fed]/20 p-4 rounded-xl flex items-center justify-between">
                        <div className="space-y-1">
                          <span className="font-mono text-[9px] text-[#04a0e9] font-black uppercase">LAUNCH STATE</span>
                          <p className="text-white text-xs font-mono font-bold">PORT_3000_LISTENING (STABLE v2.0.4)</p>
                        </div>
                        <a
                          href="https://placementaiplatform.vercel.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-[#7a3fed] border border-white/10 text-white font-mono text-[10px] font-black uppercase rounded shadow hover:opacity-90 transition-all flex items-center gap-1.5"
                        >
                          Launch Platform ↗ <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </motion.div>
                  )}

                  {selectedProjectId === 'kaura' && (
                    <motion.div
                      key="kaura"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6 text-left"
                    >
                      <span className="font-mono text-[10px] text-[#04a0e9] border-2 border-[#04a0e9]/40 px-2.5 py-1 bg-[#04a0e9]/15 rounded-md tracking-widest font-black uppercase inline-block">
                        Ecosystem App 02
                      </span>
                      <h5 className="text-2xl font-extrabold tracking-tight text-white font-sans mt-2">
                        Kaura Hub
                      </h5>

                      <p className="text-gray-300 text-sm leading-relaxed max-w-xl font-semibold">
                        A next-generation student workspace developed under EETIRP LTD. Kaura integrates vital student utilities, notes engines, and productivity tools into one unified student portal.
                      </p>

                      <p className="font-mono text-[10px] text-gray-450 font-bold uppercase tracking-wider mb-2">
                        CORE MODULES & TOOLS IN PRODUCTION:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="p-3 bg-[#000e25]/50 rounded border border-white/5 flex items-center gap-2.5 font-sans text-xs text-gray-300">
                          <CheckCircle2 className="w-4 h-4 text-[#7a3fed] shrink-0" />
                          <span>Resume Builder & Portfolio Optimizer</span>
                        </div>
                        <div className="p-3 bg-[#000e25]/50 rounded border border-white/5 flex items-center gap-2.5 font-sans text-xs text-gray-300">
                          <CheckCircle2 className="w-4 h-4 text-[#04a0e9] shrink-0" />
                          <span>Kaura Learning Hub & Notes</span>
                        </div>
                        <div className="p-3 bg-[#000e25]/50 rounded border border-white/5 flex items-center gap-2.5 font-sans text-xs text-gray-300">
                          <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                          <span>Engineering Utilities & Schedule</span>
                        </div>
                        <div className="p-3 bg-[#000e25]/50 rounded border border-white/5 flex items-center gap-2.5 font-sans text-xs text-gray-300">
                          <CheckCircle2 className="w-4 h-4 text-[#7a3fed] shrink-0" />
                          <span>Aptitude Training & Prep Trackers</span>
                        </div>
                      </div>

                      <div className="pt-2 flex justify-end">
                        <a
                          href="https://www.kaurahub.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-2.5 bg-gradient-to-r from-[#7a3fed] to-[#04a0e9] text-white font-mono text-[10px] font-black uppercase rounded shadow hover:opacity-90 transition-all flex items-center gap-1.5"
                        >
                          Launch Platform ↗ <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </motion.div>
                  )}

                  {selectedProjectId === 'studio' && (
                    <motion.div
                      key="studio"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6 text-left"
                    >
                      <span className="font-mono text-[10px] text-green-400 border-2 border-green-500/20 px-2.5 py-1 bg-green-500/5 rounded-md tracking-widest font-black uppercase inline-block">
                        Core Operations
                      </span>
                      <h5 className="text-2xl font-extrabold tracking-tight text-white font-sans mt-2">
                        Live Studio Integration
                      </h5>

                      <p className="text-gray-300 text-sm leading-relaxed max-w-xl font-semibold">
                        These aren't just mockup dashboards. Every student inside EETIRP gets assigned repository tickets, handles actual customer bugs, reviews real metrics logs, and helps deploy features directly to production.
                      </p>

                      <div className="bg-[#000e25]/40 p-4 border border-white/5 rounded-xl font-mono text-[11px] leading-relaxed text-gray-300 space-y-1 select-none">
                        <p className="text-emerald-400 font-bold">&gt; mapping tickets to engineers...</p>
                        <p>&gt; telemetry verified: latency = 8ms (Singapore and Bengaluru nodes)</p>
                        <p className="text-[#04a0e9] font-bold">&gt; active repositories synchronized: 15+</p>
                      </div>

                      <div className="flex justify-end">
                        <a href="#onboarding" className="px-5 py-2.5 bg-[#000e25] tracking-widest border border-white/10 text-white font-mono text-[10px] font-black uppercase rounded shadow hover:bg-[#00132e] transition-all">
                          Request Sandbox Access ↗
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Simulated Server Console output at footer */}
                <div className="mt-8 border-t border-white/10 pt-4 flex items-center justify-between font-mono text-[10px] text-gray-400 relative z-10 select-none">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#04a0e9] shadow-[0_0_8px_#04a0e9] animate-ping"></span>
                    <span>
                      {selectedProjectId === 'placement' && 'placement-ai-server: listening on port :3000 (15s ago)'}
                      {selectedProjectId === 'kaura' && 'kaurahub-main server: listening on port :443 (4m ago)'}
                      {selectedProjectId === 'studio' && 'eetirp-compiler: connection established on secure telemetry pipe'}
                    </span>
                  </div>
                  <span className="text-[9px] text-gray-500 uppercase tracking-widest">v1.2.0</span>
                </div>

              </div>
            </div>

          </div>

          {/* New Eetirp Terminal Simulator Interactive Widget addition */}
          <div className="mt-12 bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl p-6 font-mono text-xs text-slate-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4 select-none">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#04a0e9]" />
                <span className="font-bold tracking-tight text-sm text-slate-400">eetirp_kernel_shell.sh</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Live Telemetry Session
              </div>
            </div>

            <div className="space-y-3.5 max-h-64 overflow-y-auto mb-4 pr-2 scrollbar-thin scrollbar-thumb-slate-800">
              {terminalHistory.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center gap-2 text-[#7a3fed] font-bold">
                    <span>$</span>
                    <span className="text-slate-300">{item.command}</span>
                  </div>
                  <div className={`whitespace-pre-wrap pl-4 leading-relaxed font-semibold ${item.type === 'success' ? 'text-emerald-400' : item.type === 'error' ? 'text-rose-400' : 'text-slate-400'
                    }`}>
                    {item.result}
                  </div>
                </div>
              ))}
              <div ref={terminalBottomRef} />
            </div>

            <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 border-t border-slate-900 pt-3">
              <span className="text-[#04a0e9] font-black select-none">$</span>
              <input
                type="text"
                className="flex-grow bg-transparent border-none outline-none focus:ring-0 text-slate-200 placeholder-slate-700 font-mono tracking-wide"
                placeholder="Type 'help', 'apps --list', or 'status --telemetry'..."
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
              />
              <input type="submit" className="hidden" />
              <button
                type="submit"
                className="px-3 py-1 bg-slate-900 border border-slate-800 text-slate-400 rounded hover:text-[#04a0e9] hover:border-[#04a0e9]/30 transition-all font-mono text-[10px] uppercase font-bold"
              >
                Execute
              </button>
            </form>
          </div>

        </div>
      </section>



      {/* 9. Leadership & Backing Grid panel */}
      <section className="py-24 bg-[#eae6db]/20 border-y border-[#00132e]/10" id="leadership">
        <div className="px-6 md:px-16 max-w-6xl mx-auto">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-[10px] text-[#7a3fed] tracking-[0.25em] bg-[#7a3fed]/10 border-2 border-[#7a3fed]/20 px-4 py-1.5 rounded-full font-black uppercase shadow-sm">
              Leadership & Backing
            </span>
            <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-[#00132e] mt-4 mb-4 tracking-tight leading-none">
              Meet the Ecosystem Drivers
            </h2>
            <p className="font-sans text-[#475569] text-base leading-relaxed font-semibold">
              The architects, developers, and strategic partners building EETIRP into a production-scale engineering sandbox.
            </p>
          </div>

          {/* Leadership Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Kaushal Baitha */}
            <motion.div
              whileHover={{ y: -4 }}
              className="flex flex-col justify-between p-6 rounded-2xl hover:bg-[#0b1f3b]/5 transition-all duration-300"
            >
              <div>
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#7a3fed] to-indigo-600 flex items-center justify-center text-white font-black text-xl mb-4 border-2 border-white/20 shadow-md">
                  KB
                  <span className="absolute -top-1.5 -right-1.5 bg-[#7a3fed] text-white text-[8px] font-mono tracking-wider font-extrabold uppercase px-1.5 py-0.5 rounded-full select-none shadow">CORE</span>
                </div>
                <div className="font-sans text-lg font-black text-[#00132e] mb-1">
                  Kaushal Baitha
                </div>
                <p className="font-mono text-[10px] tracking-wider uppercase text-[#7a3fed] font-black mb-3">
                  FOUNDER & CHIEF ARCHITECT
                </p>
                <p className="font-sans text-xs text-[#475569] leading-relaxed mb-6 font-semibold">
                  Leading technical directions and backend systems design. Passionate about project-centric engineering and enterprise system development.
                </p>
              </div>
              <a
                href="https://kaushalbaitha7.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-white border-2 border-[#00132e]/10 text-[#00132e] font-mono text-[10px] uppercase tracking-widest font-black rounded-lg hover:border-[#7a3fed] hover:text-[#7a3fed] cursor-pointer transition-all text-center block"
              >
                Explore Portfolio ↗
              </a>
            </motion.div>

            {/* Karthik C M */}
            <motion.div
              whileHover={{ y: -4 }}
              className="flex flex-col justify-between p-6 rounded-2xl hover:bg-[#0b1f3b]/5 transition-all duration-300"
            >
              <div>
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#04a0e9] to-cyan-600 flex items-center justify-center text-white font-black text-xl mb-4 border-2 border-white/20 shadow-md">
                  KC
                  <span className="absolute -top-1 -right-1 bg-[#00132e] text-white text-[9px] px-1 rounded-full font-mono font-black">&lt;/&gt;</span>
                </div>
                <div className="font-sans text-lg font-black text-[#00132e] mb-1">
                  Karthik C M
                </div>
                <p className="font-mono text-[10px] tracking-wider uppercase text-[#04a0e9] font-black mb-3">
                  CO-FOUNDER & HEAD OF OPERATIONS
                </p>
                <p className="font-sans text-xs text-[#475569] leading-relaxed mb-6 font-semibold">
                  Driving strategic development programs, bootcamp architectures, and product validation cycles to produce day-one engineering leaders.
                </p>
              </div>
              <a
                href="https://karthikcm.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-white border-2 border-[#00132e]/10 text-[#00132e] font-mono text-[10px] uppercase tracking-widest font-black rounded-lg hover:border-[#04a0e9] hover:text-[#04a0e9] cursor-pointer transition-all text-center block"
              >
                Explore Portfolio ↗
              </a>
            </motion.div>

            {/* Karthik D */}
            <motion.div
              whileHover={{ y: -4 }}
              className="flex flex-col justify-between p-6 rounded-2xl hover:bg-[#0b1f3b]/5 transition-all duration-300"
            >
              <div>
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-green-600 flex items-center justify-center text-white font-black text-xl mb-4 border-2 border-white/20 shadow-md">
                  KD
                  <span className="absolute -top-1.5 -right-1.5 bg-emerald-600 text-white text-[8px] font-mono tracking-wider font-extrabold uppercase px-1.5 py-0.5 rounded-full select-none shadow">PARTNER</span>
                </div>
                <div className="font-sans text-lg font-black text-[#00132e] mb-1">
                  Karthik D
                </div>
                <p className="font-mono text-[10px] tracking-wider uppercase text-emerald-600 font-black mb-3">
                  STRATEGIC INVESTOR
                </p>
                <p className="font-sans text-xs text-[#475569] leading-relaxed mb-6 font-semibold">
                  Sourcing strategic growth capital, industrial partnerships, and scaling market pipelines for in-house studio SaaS platforms.
                </p>
              </div>
              <a
                href="https://karthikd1.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-white border-2 border-[#00132e]/10 text-[#00132e] font-mono text-[10px] uppercase tracking-widest font-black rounded-lg hover:border-emerald-500 hover:text-emerald-600 cursor-pointer transition-all text-center block"
              >
                Explore Portfolio ↗
              </a>
            </motion.div>

            {/* Pritee Kumari Singh */}
            <motion.div
              whileHover={{ y: -4 }}
              className="flex flex-col justify-between p-6 rounded-2xl hover:bg-[#0b1f3b]/5 transition-all duration-300"
            >
              <div>
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white font-black text-xl mb-4 border-2 border-white/20 shadow-md">
                  PS
                  <span className="absolute -top-1.5 -right-1.5 bg-amber-600 text-white text-[8px] font-mono tracking-wider font-extrabold uppercase px-1.5 py-0.5 rounded-full select-none shadow">LEAD</span>
                </div>
                <div className="font-sans text-lg font-black text-[#00132e] mb-1">
                  Pritee Kumari Singh
                </div>
                <p className="font-mono text-[10px] tracking-wider uppercase text-amber-600 font-black mb-3">
                  MARKETING & STRATEGY LEADER
                </p>
                <p className="font-sans text-xs text-[#475569] leading-relaxed mb-6 font-semibold">
                  Orchestrating market penetration campaigns, corporate engagement models, and scaling university pipelines for live studio cohorts.
                </p>
              </div>
              <a
                href="https://priteesingh.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-white border-2 border-[#00132e]/10 text-[#00132e] font-mono text-[10px] uppercase tracking-widest font-black rounded-lg hover:border-amber-500 hover:text-amber-600 cursor-pointer transition-all text-center block"
              >
                Explore Portfolio ↗
              </a>
            </motion.div>

            {/* Rajdev Rana */}
            <motion.div
              whileHover={{ y: -4 }}
              className="flex flex-col justify-between p-6 rounded-2xl hover:bg-[#0b1f3b]/5 transition-all duration-300"
            >
              <div>
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-sky-600 flex items-center justify-center text-white font-black text-xl mb-4 border-2 border-white/20 shadow-md">
                  RR
                  <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white text-[8px] font-mono tracking-wider font-extrabold uppercase px-1.5 py-0.5 rounded-full select-none shadow">MGMT</span>
                </div>
                <div className="font-sans text-lg font-black text-[#00132e] mb-1">
                  Rajdev Rana
                </div>
                <p className="font-mono text-[10px] tracking-wider uppercase text-blue-650 font-black mb-3">
                  PROJECT COORDINATOR
                </p>
                <p className="font-sans text-xs text-[#475569] leading-relaxed mb-6 font-semibold">
                  Streamlines cross-functional workflows and strategic resource management to ensure seamless project execution.
                </p>
              </div>
              <a
                href="#onboarding"
                className="w-full py-2.5 bg-white border-2 border-blue-500/20 text-blue-600 font-mono text-[10px] uppercase tracking-widest font-black rounded-lg hover:bg-neutral-50 cursor-pointer transition-all flex items-center justify-center gap-1"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span> Ecosystem Project Operations
              </a>
            </motion.div>

            {/* Rania Jasmine S */}
            <motion.div
              whileHover={{ y: -4 }}
              className="flex flex-col justify-between p-6 rounded-2xl hover:bg-[#0b1f3b]/5 transition-all duration-300"
            >
              <div>
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-600 flex items-center justify-center text-white font-black text-xl mb-4 border-2 border-white/20 shadow-md">
                  RJ
                  <span className="absolute -top-1.5 -right-1.5 bg-purple-600 text-white text-[8px] font-mono tracking-wider font-extrabold uppercase px-1.5 py-0.5 rounded-full select-none shadow">DEV</span>
                </div>
                <div className="font-sans text-lg font-black text-[#00132e] mb-1">
                  Rania Jasmine S
                </div>
                <p className="font-mono text-[10px] tracking-wider uppercase text-purple-600 font-black mb-3">
                  FULL STACK DEVELOPER
                </p>
                <p className="font-sans text-xs text-[#475569] leading-relaxed mb-6 font-semibold">
                  Engineers resilient, full-stack software solutions from database layout to production deployment, optimizing for speed and scale.
                </p>
              </div>
              <a
                href="https://raniajasmine-s.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-white border-2 border-[#00132e]/10 text-[#00132e] font-mono text-[10px] uppercase tracking-widest font-black rounded-lg hover:border-purple-500 hover:text-purple-600 cursor-pointer transition-all text-center block"
              >
                Explore Portfolio ↗
              </a>
            </motion.div>

          </div>

          {/* Trainer Grid list as shown in screenshots */}
          <div className="text-center max-w-3xl mx-auto mt-24 mb-16">
            <span className="font-mono text-[10px] text-[#04a0e9] tracking-[0.25em] bg-[#04a0e9]/15 border-2 border-[#04a0e9]/20 px-4 py-1.5 rounded-full font-black uppercase shadow-sm">
              TRAINERS
            </span>
            <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-[#00132e] mt-4 mb-4 tracking-tight leading-tight">
              Technical Trainers & Career Experts
            </h2>
            <p className="font-sans text-[#475569] text-base leading-relaxed font-semibold">
              Industry-experienced educators delivering intensive stack-specific sprints, DSA strategies, and outcome-focused interview preparations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">

            {/* Raushan Kumar Baitha */}
            <motion.div
              whileHover={{ y: -4 }}
              className="flex flex-col justify-between p-6 rounded-2xl hover:bg-[#0b1f3b]/5 transition-all duration-300"
            >
              <div>
                <span className="font-mono text-[9px] tracking-widest text-[#7a3fed] bg-[#7a3fed]/10 border border-[#7a3fed]/20 px-2.5 py-0.5 rounded uppercase font-black mb-4 inline-block">SYSTEMS</span>
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#7a3fed] to-indigo-600 flex items-center justify-center text-white font-black text-xl mb-4 border-2 border-white/20 shadow-sm">
                  RB
                </div>
                <div className="font-sans text-lg font-black text-[#00132e] mb-1">
                  Raushan Kumar Baitha
                </div>
                <p className="font-mono text-[10px] tracking-wider uppercase text-[#7a3fed] font-black mb-3">
                  DSA SPECIALIST
                </p>
                <p className="font-sans text-xs text-[#475569] leading-relaxed mb-6 font-semibold">
                  Empowering developers to master algorithmic problem-solving and ace rigorous technical interviews.
                </p>
              </div>
              <div className="w-full py-2 bg-[#0b1f3b]/5 border border-[#00132e]/10 text-[#00132e] font-mono text-[10px] uppercase tracking-widest font-black rounded text-center select-none flex items-center justify-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7a3fed] animate-pulse"></span> Systems Architecture Node
              </div>
            </motion.div>

            {/* Nirmal Shekhar */}
            <motion.div
              whileHover={{ y: -4 }}
              className="flex flex-col justify-between p-6 rounded-2xl hover:bg-[#0b1f3b]/5 transition-all duration-300"
            >
              <div>
                <span className="font-mono text-[9px] tracking-widest text-[#4ea04e] bg-emerald-100/30 border border-green-500/10 px-2.5 py-0.5 rounded uppercase font-black mb-4 inline-block">PLACEMENT</span>
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-indigo-600 flex items-center justify-center text-white font-black text-xl mb-4 border-2 border-white/20 shadow-sm">
                  NS
                </div>
                <div className="font-sans text-lg font-black text-[#00132e] mb-1">
                  Nirmal Shekhar
                </div>
                <p className="font-mono text-[10px] tracking-wider uppercase text-emerald-600 font-black mb-3">
                  DSA AND JAVA EXPERTISE
                </p>
                <p className="font-sans text-xs text-[#475569] leading-relaxed mb-6 font-semibold">
                  Bridging foundational core Java principles with complex data structure implementations for robust software design.
                </p>
              </div>
              <div className="w-full py-2 bg-[#0b1f3b]/5 border border-[#00132e]/10 text-[#00132e] font-mono text-[10px] uppercase tracking-widest font-black rounded text-center select-none flex items-center justify-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Outcome Strategy Node
              </div>
            </motion.div>

            {/* Anup Kumar Tiwari */}
            <motion.div
              whileHover={{ y: -4 }}
              className="flex flex-col justify-between p-6 rounded-2xl hover:bg-[#0b1f3b]/5 transition-all duration-300"
            >
              <div>
                <span className="font-mono text-[9px] tracking-widest text-[#04a0e9] bg-[#04a0e9]/10 border border-[#04a0e9]/20 px-2.5 py-0.5 rounded uppercase font-black mb-4 inline-block">ALGORITHMS</span>
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#04a0e9] to-indigo-600 flex items-center justify-center text-white font-black text-xl mb-4 border-2 border-white/20 shadow-sm">
                  AT
                </div>
                <div className="font-sans text-lg font-black text-[#00132e] mb-1">
                  Anup Kumar Tiwari
                </div>
                <p className="font-mono text-[10px] tracking-wider uppercase text-[#04a0e9] font-black mb-3">
                  DSA AND FULL STACK DEVELOPER
                </p>
                <p className="font-sans text-xs text-[#475569] leading-relaxed mb-6 font-semibold">
                  A versatile engineer specializing in scalable full-stack architectures and optimized algorithmic workflows.
                </p>
              </div>
              <div className="w-full py-2 bg-[#0b1f3b]/5 border border-[#00132e]/10 text-[#00132e] font-mono text-[10px] uppercase tracking-widest font-black rounded text-center select-none flex items-center justify-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#04a0e9] animate-pulse"></span> DSA & Logic Sprints
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 10. Cohort Intake Form and Placement Assessment diagnostics */}
      <section className="py-24 px-6 md:px-16 max-w-6xl mx-auto w-full" id="onboarding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Instructions column left */}
          <div>
            <span className="font-mono text-xs text-[#7a3fed] uppercase tracking-[0.3em] font-extrabold mb-4 block">
              Enter the EETIRP Ecosystem
            </span>
            <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-[#00132e] mb-6 tracking-tight leading-tight">
              Connect & Intake Protocol
            </h2>
            <p className="text-[#475569] font-sans text-base leading-relaxed mb-10 font-bold">
              Whether you are an ambitious college student aiming for practical mastery, a startup founder looking for SaaS development partnerships, or a corporate engineering leader, we want to talk.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-6 p-5 rounded-xl border border-[#00132e]/10 bg-white/40 hover:bg-white/80 transition-all shadow-sm">
                <div className="w-11 h-11 rounded-full bg-[#7a3fed]/10 flex items-center justify-center border border-[#7a3fed]/20">
                  <Mail className="w-5 h-5 text-[#7a3fed]" />
                </div>
                <div>
                  <p className="font-mono text-[9px] text-[#475569] uppercase tracking-widest font-black mb-1">
                    EMAIL US
                  </p>
                  <a href="mailto:eetirpltd@gmail.com" className="font-mono text-sm font-black text-[#00132e] hover:text-[#7a3fed]">
                    eetirpltd@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-6 p-5 rounded-xl border border-[#00132e]/10 bg-white/40 hover:bg-white/80 transition-all shadow-sm">
                <div className="w-11 h-11 rounded-full bg-[#04a0e9]/10 flex items-center justify-center border border-[#04a0e9]/20">
                  <Phone className="w-5 h-5 text-[#04a0e9]" />
                </div>
                <div>
                  <p className="font-mono text-[9px] text-[#475569] uppercase tracking-widest font-black mb-1">
                    CALL / WHATSAPP
                  </p>
                  <a href="tel:+918088487801" className="font-mono text-sm font-black text-[#00132e] hover:text-[#04a0e9]">
                    +91 8088487801
                  </a>
                </div>
              </div>

              <div className="p-4 bg-[#eae6db]/30 rounded-lg border border-[#00132e]/10 text-xs font-mono text-[#475569] flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#7a3fed] shrink-0" />
                <span>Response SLA: Standard feedback within 24 working hours.</span>
              </div>
            </div>
          </div>

          {/* Form column right with simulated diagnostics takeover */}
          <div className="w-full">

            {/* Form state controller */}
            {isSubmittingForm ? (
              <div className="bg-white border border-[#00132e]/10 rounded-2xl p-8 shadow-xl min-h-[460px] flex flex-col justify-center items-center text-center space-y-6">
                <RefreshCw className="w-10 h-10 text-[#7a3fed] animate-spin" />
                <div>
                  <h3 className="font-sans text-xl font-extrabold text-[#00132e] tracking-tight">Transmitting Inquiry</h3>
                  <p className="font-sans text-sm text-[#475569] mt-2 font-semibold">Preparing the data attributes payload secure transmission...</p>
                </div>
                <div className="w-24 bg-gray-100 h-1 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-[#7a3fed] to-[#04a0e9] h-full animate-pulse w-full"></div>
                </div>
              </div>
            ) : submitStatus === 'success' ? (
              <div className="bg-white border-2 border-[#4ea04e]/20 rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
                <div className="flex items-center gap-3 border-b border-[#00132e]/10 pb-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                    <Check className="w-5 h-5 shrink-0" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-emerald-600 border border-emerald-500/20 px-2.5 py-0.5 rounded tracking-widest uppercase bg-emerald-500/10 font-bold">
                      Transmission successful
                    </span>
                    <h3 className="font-sans text-lg font-black text-[#00132e] mt-1">
                      Inquiry Sent to EETIRP
                    </h3>
                  </div>
                </div>

                <div className="bg-[#f4f1ea] border border-[#00132e]/10 p-5 rounded-xl space-y-4">
                  <p className="font-mono text-[10px] text-[#475569] uppercase tracking-widest font-black border-b border-[#00132e]/5 pb-1">
                    TRANSMITTED PAYLOAD ATTRIBUTES
                  </p>

                  <div className="space-y-3 font-sans text-xs text-[#00132e] leading-relaxed">
                    <div>
                      <span className="font-mono text-[9px] text-[#475569] uppercase font-bold block">Applicant Name</span>
                      <span className="font-semibold text-sm">{formData.fullName}</span>
                    </div>
                    <div>
                      <span className="font-mono text-[9px] text-[#475569] uppercase font-bold block">Email Address</span>
                      <span className="font-mono font-bold text-sm text-[#7a3fed]">{formData.email}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <span className="font-mono text-[9px] text-[#475569] uppercase font-bold block">Profile Segment</span>
                        <span className="font-semibold">{formData.segment}</span>
                      </div>
                      <div>
                        <span className="font-mono text-[9px] text-[#475569] uppercase font-bold block">Focus Area</span>
                        <span className="font-semibold">{formData.domainInterest}</span>
                      </div>
                    </div>
                    {formData.inquiryMatrix && (
                      <div>
                        <span className="font-mono text-[9px] text-[#475569] uppercase font-bold block">Core inquiry / objectives</span>
                        <p className="bg-white/50 p-3 rounded border border-[#00132e]/5 text-xs text-[#475569] font-medium mt-1 italic whitespace-pre-wrap leading-relaxed">
                          "{formData.inquiryMatrix}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-3.5 bg-indigo-50 border border-indigo-100 rounded-lg text-xs leading-relaxed text-indigo-950 font-sans">
                  <p className="font-bold mb-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse"></span> Prepared for Backend Integration:
                  </p>
                  <p className="text-gray-600 text-[11px]">
                    This form has successfully triggered a static POST endpoint simulated request to <code className="font-mono bg-white px-1 py-0.5 border border-indigo-100 rounded">/api/onboarding</code>. You can easily plug in your manual web server form action when you implement your custom backend solution!
                  </p>
                </div>

                <button
                  onClick={resetForm}
                  className="w-full text-center py-3.5 bg-[#00132e] text-white font-mono text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-[#0c203c] transition-all cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : submitStatus === 'error' ? (
              <div className="bg-white border-2 border-red-200 rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
                <div className="flex items-center gap-3 border-b border-[#00132e]/10 pb-4">
                  <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center border border-red-100">
                    <X className="w-5 h-5 shrink-0" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-red-600 border border-red-500/20 px-2.5 py-0.5 rounded tracking-widest uppercase bg-red-500/10 font-bold">
                      Transmission Failed
                    </span>
                    <h3 className="font-sans text-lg font-black text-[#00132e] mt-1">
                      Submission Error
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-[#475569] font-sans">
                  The system encountered an error connecting to the API route. Please ensure your backend server is up and listening.
                </p>
                <button
                  onClick={resetForm}
                  className="w-full text-center py-3.5 bg-[#00132e] text-white font-mono text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-[#0c203c] transition-all cursor-pointer"
                >
                  Try Again
                </button>
              </div>
            ) : (

              /* Direct intake form screen as shown in screenshots with active onSubmit callback */
              <form
                onSubmit={handleFormSubmit}
                className="bg-white border border-[#00132e]/10 p-6 md:p-8 rounded-2xl shadow-xl space-y-6"
              >
                {/* Your name input */}
                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-[#475569] uppercase tracking-widest font-black block">
                    YOUR NAME
                  </label>
                  <input
                    name="fullName"
                    type="text"
                    required
                    className="w-full bg-[#f4f1ea] border border-[#00132e]/10 focus:border-[#7a3fed] rounded-lg px-4 py-3 leading-tight text-[#00132e] font-sans text-sm focus:outline-none focus:ring-1 focus:ring-[#7a3fed]/20"
                    placeholder="e.g. John Doe"
                    value={formData.fullName}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Email address input */}
                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-[#475569] uppercase tracking-widest font-black block">
                    EMAIL ADDRESS
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full bg-[#f4f1ea] border border-[#00132e]/10 focus:border-[#7a3fed] rounded-lg px-4 py-3 leading-tight text-[#00132e] font-sans text-sm focus:outline-none focus:ring-1 focus:ring-[#7a3fed]/20"
                    placeholder="e.g. john@university.edu"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Profile section segment selector */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-[#475569] uppercase tracking-widest font-black block">
                      YOUR PROFILE SEGMENT
                    </label>
                    <select
                      name="segment"
                      className="w-full bg-[#f4f1ea] border border-[#00132e]/10 focus:border-[#7a3fed] rounded-lg px-3 py-3 leading-tight text-[#00132e] font-sans text-sm focus:outline-none cursor-pointer"
                      value={formData.segment}
                      onChange={handleInputChange}
                    >
                      <option>Engineering College Student</option>
                      <option>Startup Founder & Technical Partner</option>
                      <option>Professional Software Developer</option>
                      <option>Corporate Engineering Leader</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-[#475569] uppercase tracking-widest font-black block">
                      FOCUS DOMAIN INTEREST
                    </label>
                    <select
                      name="domainInterest"
                      className="w-full bg-[#f4f1ea] border border-[#00132e]/10 focus:border-[#7a3fed] rounded-lg px-3 py-3 leading-tight text-[#00132e] font-sans text-sm focus:outline-none cursor-pointer"
                      value={formData.domainInterest}
                      onChange={handleInputChange}
                    >
                      <option>Coding Bootcamps (Hands-on)</option>
                      <option>Project-Centric SaaS Sandboxes</option>
                      <option>Placement Academy Accelerator</option>
                      <option>Corporate Upskilling Upgrades</option>
                    </select>
                  </div>
                </div>

                {/* Query objectives text */}
                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-[#475569] uppercase tracking-widest font-black block">
                    YOUR CORE QUERY / GOALS
                  </label>
                  <textarea
                    name="inquiryMatrix"
                    rows={4}
                    className="w-full bg-[#f4f1ea] border border-[#00132e]/10 focus:border-[#7a3fed] rounded-lg px-4 py-3 leading-tight text-[#00132e] font-sans text-sm focus:outline-none focus:ring-1 focus:ring-[#7a3fed]/20 resize-none"
                    placeholder="Briefly describe what you are looking to build or prepare for..."
                    value={formData.inquiryMatrix}
                    onChange={handleInputChange}
                  ></textarea>
                </div>

                {/* Submission CTA trigger */}
                <button
                  type="submit"
                  disabled={!formData.fullName || !formData.email}
                  className="w-full py-4.5 bg-gradient-to-r from-[#7a3fed] to-[#04a0e9] text-white font-mono text-xs uppercase tracking-widest font-black rounded-lg shadow-lg hover:opacity-95 transition-all text-center select-none active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  Send Onboarding Inquiry
                </button>

                {/* Direct email click action helper */}
                <div className="text-center pt-2">
                  <span className="font-sans text-[10px] text-[#475569]">
                    Prefer to send a direct message through your email app?
                  </span>
                  <div className="mt-2 text-center">
                    <a
                      href="mailto:eetirpltd@gmail.com?subject=EETIRP Onboarding Query"
                      className="inline-flex items-center gap-1.5 px-4 py-2 border border-[#7a3fed]/20 text-[#7a3fed] font-mono text-[10px] uppercase font-bold tracking-widest rounded hover:bg-[#7a3fed]/5"
                    >
                      <Mail className="w-3.5 h-3.5" /> Click here to send direct Email
                    </a>
                  </div>
                </div>

              </form>
            )}
          </div>

        </div>
      </section>

      {/* 11. Custom light-theme Footer from screens */}
      <footer className="bg-[#00132e] text-white py-16 px-6 md:px-16 border-t border-[#00132e]/20 overflow-hidden relative" id="footer">

        {/* Soft cyan footer focus point */}
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#04a0e9]/5 blur-[100px] pointer-events-none rounded-full"></div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10 font-sans">

          {/* Brand block left scale */}
          <div className="md:col-span-6 space-y-6">
            <div className="flex items-center gap-3.5 select-none">
              <div className="w-10 h-10 rounded-lg bg-white overflow-hidden p-1 border border-white/10 shadow-sm flex items-center justify-center">
                <img
                  alt="EETIRP Logo"
                  className="w-full h-full object-contain"
                  src={logoUrl}
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-sans text-lg font-black tracking-tight text-white uppercase">
                EETIRP
              </span>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              EETIRP is a custom-engineered ecosystem. We act as a hybrid EdTech program combined with an active production SaaS startup studio to transition candidates from college fundamentals to absolute industry readiness.
            </p>

            {/* Social handles links - UPDATED with LIVE URLs */}
            <div className="flex gap-3">
              <a href="https://github.com/eetirp-ltd" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-white/15 flex items-center justify-center hover:bg-white/10 hover:text-[#04a0e9] transition-all" title="Ecosystem GitHub">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/in/eetirp-limited" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-white/15 flex items-center justify-center hover:bg-white/10 hover:text-[#04a0e9] transition-all" title="Ecosystem LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://discord.com/users/1515615066245042291" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-white/15 flex items-center justify-center hover:bg-white/10 hover:text-[#04a0e9] transition-all" title="Ecosystem Discord">
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links columns */}
          <div className="md:col-span-3 space-y-4">
            <h5 className="font-mono text-[10px] text-[#04a0e9] uppercase tracking-widest font-black">
              QUICK LINKS
            </h5>
            <ul className="space-y-2.5 text-xs font-mono text-gray-400">
              <li>
                <button onClick={() => scrollSmoothTo('positioning')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Our Positioning
                </button>
              </li>
              <li>
                <button onClick={() => scrollSmoothTo('services')} className="hover:text-white transition-colors cursor-pointer text-left">
                  What We Do
                </button>
              </li>
              <li>
                <button onClick={() => scrollSmoothTo('services')} className="hover:text-white transition-colors cursor-pointer text-left">
                  SaaS Sandbox Lab
                </button>
              </li>
              <li>
                <button onClick={() => scrollSmoothTo('leadership')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Leadership
                </button>
              </li>
              <li>
                <button onClick={() => scrollSmoothTo('onboarding')} className="hover:text-white transition-colors cursor-pointer text-left font-bold text-white">
                  Join Ecosystem
                </button>
              </li>
            </ul>
          </div>

          {/* Contacts details column */}
          <div className="md:col-span-3 space-y-4">
            <h5 className="font-mono text-[10px] text-[#7a3fed] uppercase tracking-widest font-black">
              CONTACT DETAILS
            </h5>
            <ul className="space-y-3.5 text-xs font-mono text-gray-400">
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#7a3fed] shrink-0" /> <a href="mailto:eetirpltd@gmail.com" className="hover:text-white transition-colors">eetirpltd@gmail.com</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#04a0e9] shrink-0" /> <a href="tel:+918088487801" className="hover:text-white transition-colors">+91 8088487801</a>
              </li>
              <li className="pt-2 border-t border-white/5 text-[10px] text-gray-500 uppercase tracking-widest flex items-center gap-1.5 leading-tight">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Currently running diagnostics for cohort 2026. Register to claim a custom syllabus review.
              </li>
            </ul>
          </div>

        </div>

        {/* Global base copyright values */}
        <div className="max-w-6xl mx-auto mt-16 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono text-gray-500 gap-4">
          <span>© 2026 EETIRP LTD. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#onboarding" className="hover:text-white transition-colors">Terms of Use</a>
            <a href="#onboarding" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>

      </footer>

    </div>
  );
}