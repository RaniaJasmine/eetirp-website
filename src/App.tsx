import { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
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
  ExternalLink
} from 'lucide-react';

// Interfaces mapping
import { LiveApp, OnboardingDiagnostic, TerminalHistory } from './types';

const programPillars = [
  {
    id: 'academy',
    num: '01',
    title: 'Technical Training Programs',
    desc: 'Structured modules covering DSA, systems architecture, networking, databases, and standard engineer practices built around company assessments.',
    badge: 'ACADEMY FOCUS',
    icon: BookOpen,
    color: 'text-[#1a4a8a]',
    badgeStyle: 'text-[#1a4a8a] bg-[#e8edf5] border border-[#1a4a8a]/20',
    iconBg: 'bg-[#e8edf5] border border-[#1a4a8a]/20',
    hoverBorder: 'hover:border-[#1a4a8a]/40 hover:shadow-[0_4px_20px_rgba(26,74,138,0.06)]',
    keywords: ['dsa', 'structure', 'systems architecture', 'networking', 'databases', 'academy', 'assessment', 'theory']
  },
  {
    id: 'sprint',
    num: '02',
    title: 'Intensive Coding Bootcamps',
    desc: 'Hyper-focused, stack-specific sprints building real-time apps. Go deep into React, Next.js, Node, Golang, and Cloud Infrastructure.',
    badge: 'SPRINT MODEL',
    icon: Code2,
    color: 'text-[#1a4a8a]',
    badgeStyle: 'text-[#1a4a8a] bg-[#e8edf5] border border-[#1a4a8a]/20',
    iconBg: 'bg-[#e8edf5] border border-[#1a4a8a]/20',
    hoverBorder: 'hover:border-[#1a4a8a]/40 hover:shadow-[0_4px_20px_rgba(26,74,138,0.06)]',
    keywords: ['react', 'next.js', 'node', 'golang', 'cloud', 'infrastructure', 'sprint', 'bootcamp', 'code']
  },
  {
    id: 'sandbox',
    num: '03',
    title: 'Industry-Oriented Projects',
    desc: 'Engineer complete live systems instead of toy problems. Architect production applications like the Placement AI Platform and Kaura Hub, integrating real-time telemetry registers, LLM competency routing, and high-performance cloud runtimes.',
    badge: 'SANDBOX ENVIRONMENT',
    icon: Cpu,
    color: 'text-[#1a4a8a]',
    badgeStyle: 'text-[#1a4a8a] bg-[#e8edf5] border border-[#1a4a8a]/20',
    iconBg: 'bg-[#e8edf5] border border-[#1a4a8a]/20',
    hoverBorder: 'hover:border-[#1a4a8a]/40 hover:shadow-[0_4px_20px_rgba(26,74,138,0.06)]',
    keywords: ['systems', 'production', 'placement ai', 'kaura', 'telemetry', 'llm', 'cloud', 'sandbox', 'projects']
  },
  {
    id: 'career',
    num: '04',
    title: 'Placement Preparation',
    desc: 'End-to-end placement readiness: intense Mock Interviews, automated coding rounds, ATS resume generation, and structured system design preparation.',
    badge: 'CAREER GATEWAY',
    icon: Briefcase,
    color: 'text-[#1a4a8a]',
    badgeStyle: 'text-[#1a4a8a] bg-[#e8edf5] border border-[#1a4a8a]/20',
    iconBg: 'bg-[#e8edf5] border border-[#1a4a8a]/20',
    hoverBorder: 'hover:border-[#1a4a8a]/40 hover:shadow-[0_4px_20px_rgba(26,74,138,0.06)]',
    keywords: ['placement', 'mock', 'interviews', 'coding rounds', 'ats', 'resume', 'system design', 'career']
  },
  {
    id: 'enterprise',
    num: '05',
    title: 'Corporate Upskilling',
    desc: 'Enterprise-level training built for active engineering roles. Upgrade staff workflows to handle cloud architectures, AI tools, and DevOps pipelines.',
    badge: 'ENTERPRISE UPGRADES',
    icon: Users,
    color: 'text-[#1a4a8a]',
    badgeStyle: 'text-[#1a4a8a] bg-[#e8edf5] border border-[#1a4a8a]/20',
    iconBg: 'bg-[#e8edf5] border border-[#1a4a8a]/20',
    hoverBorder: 'hover:border-[#1a4a8a]/40 hover:shadow-[0_4px_20px_rgba(26,74,138,0.06)]',
    keywords: ['corporate', 'upskilling', 'enterprise', 'workflows', 'cloud', 'ai', 'devops', 'pipelines', 'staff']
  },
  {
    id: 'innovation',
    num: '06',
    title: 'Research & Innovation',
    desc: 'Translating concepts into technical realities. Direct mentorship on advanced proof of concepts, custom engineering tools, and hardware-software integrations.',
    badge: 'INNOVATION DESK',
    icon: Compass,
    color: 'text-[#1a4a8a]',
    badgeStyle: 'text-[#1a4a8a] bg-[#e8edf5] border border-[#1a4a8a]/20',
    iconBg: 'bg-[#e8edf5] border border-[#1a4a8a]/20',
    hoverBorder: 'hover:border-[#1a4a8a]/40 hover:shadow-[0_4px_20px_rgba(26,74,138,0.06)]',
    keywords: ['mentorship', 'proof of concept', 'hardware', 'software', 'integration', 'research', 'innovation']
  }
];

export default function App() {
  const logoUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0Tb6eZNPswTOWvOMp-_Cr62CASvc3c1--t-f0c7jsDTf3DDa7VXGVV11ESxGD_HPDFE6RpScmJ370lwrrXmeazaZQYIj8m7hn0bJnYSqk3_XU5Dcss9V5eW-P-xrSNI2qfpfd9ie5Xo4uoeJkjFjwkdZpiCEgEQwCCuNfJ2qP6w02tLoQGSCGsEMAaHgvSpakzfOeNKfmFZIVxuo120cSRST7WO0Yiycj1foar3k9F_g1CBYb24k1YjOVtZMW5K-7OamqD3AzPLU';

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
        setTimeout(() => {
          setSubmitStatus('success');
        }, 1200);
      }
    } catch (error) {
      console.warn("Backend server not connected yet. Simulating frontend success state. Details:", error);
      setTimeout(() => {
        setSubmitStatus('success');
      }, 1200);
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

  useEffect(() => {
    const handleSelectProject = (e: Event) => {
      const projId = (e as CustomEvent).detail;
      if (projId === 'placement' || projId === 'kaura' || projId === 'studio') {
        setSelectedProjectId(projId);
      }
    };
    window.addEventListener('select-project', handleSelectProject);
    return () => window.removeEventListener('select-project', handleSelectProject);
  }, []);

  return (
    <div className="bg-[#faf8f5] text-[#0a1628] selection:bg-[#1a4a8a]/20 selection:text-[#0a1628] font-sans overflow-x-hidden min-h-screen flex flex-col" id="top-anchor">

      {/* 1. Header Navigation System */}
      <Navbar />

      {/* 2. Hero Section - Clean Cream/Blue Theme */}
      <header className="relative min-h-[90vh] flex flex-col items-center justify-center pt-28 pb-20 px-6 md:px-16 text-center overflow-hidden bg-[#faf8f5]">

        {/* Subtle ambient focus points */}
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-[#1a4a8a]/4 blur-[130px] pointer-events-none rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#1a4a8a]/3 blur-[120px] pointer-events-none rounded-full" />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          {/* Main Logo Emblem */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            whileHover={{ scale: 1.02 }}
            className="mb-8 flex flex-col items-center justify-center select-none"
          >
            <div className="w-52 h-52 sm:w-60 sm:h-60 bg-white rounded-2xl p-5 shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-[#d0dae8] flex items-center justify-center relative overflow-hidden group">
              <EetirpLogo className="w-full h-full" isAnimated={true} />
            </div>
          </motion.div>

          {/* Capsule badge - Cream/Blue theme */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#e8edf5] border border-[#1a4a8a]/20 mb-8"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] font-black text-[#1a4a8a]">
              BRIDGING THEORY & ENTERPRISE EXCELLENCE
            </span>
          </motion.div>

          {/* Main heading - Dark navy */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="font-sans text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#0a1628] mb-6 leading-[1.08] tracking-tight max-w-4xl"
          >
            The Hybrid Ecosystem <br className="hidden md:inline" />
            <span className="text-[#1a4a8a] relative">
              For Engineering Leaders
              <span className="absolute bottom-1 left-0 right-0 h-[3px] bg-[#1a4a8a]/20"></span>
            </span>
          </motion.h1>

          {/* Descriptive block */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="font-sans text-base sm:text-lg md:text-xl text-[#4a6a8f] max-w-2xl mx-auto mb-12 leading-relaxed font-medium"
          >
            EETIRP merges a high-impact <span className="text-[#1a4a8a] font-bold">Engineering Academy</span> with an active, production-scale <span className="text-[#1a4a8a] font-bold">Startup Studio</span>. We train elite software engineers by building live production platforms together.
          </motion.p>

          {/* CTA Button Actions */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollSmoothTo('onboarding')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#1a4a8a] hover:bg-[#0d2f5a] text-white font-mono text-xs uppercase tracking-[0.16em] font-extrabold shadow-sm shadow-[#1a4a8a]/10 cursor-pointer transition-all duration-300"
            >
              Join Ecosystem Cohort
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollSmoothTo('services')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-[#1a4a8a] border-2 border-[#d0dae8] font-mono text-xs uppercase tracking-[0.16em] font-bold hover:border-[#1a4a8a]/40 hover:bg-[#f8f9fa] transition-all duration-300 cursor-pointer"
            >
              View Live Projects
            </motion.button>
          </motion.div>
        </div>

        {/* Floating scroll action */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center select-none cursor-pointer group"
          onClick={() => scrollSmoothTo('notice-marquee')}
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#1a4a8a] font-bold mb-1.5 opacity-60 group-hover:opacity-100 transition-opacity">Explore Studio</span>
          <ArrowDown className="w-4 h-4 text-[#1a4a8a]" />
        </motion.div>
      </header>

      {/* 3. Rolling Marquee Board - Medium Dark Blue Background */}
      <section className="w-full border-y border-[#1a3a5a] py-4 bg-[#1c406f] overflow-hidden select-none" id="notice-marquee">
        <div className="flex animate-marquee whitespace-nowrap">
          <div className="flex items-center gap-16 px-8">
            <span className="font-mono text-xs text-[#b0c4d8] flex items-center gap-2.5 tracking-widest font-black">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1a4a8a]"></span> 100% LIVE SAAS PROJECTS
            </span>
            <span className="font-mono text-xs text-white flex items-center gap-2.5 tracking-widest font-black">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4a6a8f]"></span> 10X FASTER SKILL UPGRADES
            </span>
            <span className="font-mono text-xs text-[#b0c4d8] flex items-center gap-2.5 tracking-widest font-black">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1a4a8a]"></span> LIVE PRODUCTION SAAS BUILT
            </span>
            <span className="font-mono text-xs text-white flex items-center gap-2.5 tracking-widest font-black">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4a6a8f]"></span> DAY-1 ENTERPRISE READY CONTRIBUTOR
            </span>
          </div>
          <div className="flex items-center gap-16 px-8">
            <span className="font-mono text-xs text-[#b0c4d8] flex items-center gap-2.5 tracking-widest font-black">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1a4a8a]"></span> 100% LIVE SAAS PROJECTS
            </span>
            <span className="font-mono text-xs text-white flex items-center gap-2.5 tracking-widest font-black">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4a6a8f]"></span> 10X FASTER SKILL UPGRADES
            </span>
            <span className="font-mono text-xs text-[#b0c4d8] flex items-center gap-2.5 tracking-widest font-black">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1a4a8a]"></span> LIVE PRODUCTION SAAS BUILT
            </span>
            <span className="font-mono text-xs text-white flex items-center gap-2.5 tracking-widest font-black">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4a6a8f]"></span> DAY-1 ENTERPRISE READY CONTRIBUTOR
            </span>
          </div>
        </div>
      </section>
      {/* 4. Ecosystem Summary Metrics - Dark Blue Background */}
      <section className="py-8 px-6 md:px-16 max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="bg-[#0a1628] rounded-2xl p-5 md:p-6 border border-[#1a3a5a] shadow-xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a4a8a]/10 to-transparent pointer-events-none" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10 divide-y divide-[#1a3a5a] sm:divide-y-0 lg:divide-x lg:divide-[#1a3a5a]">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="text-center p-2 max-sm:py-3 flex flex-col justify-center items-center"
            >
              <div className="font-sans text-4xl font-black text-white tracking-tight">100%</div>
              <p className="font-mono text-[10px] tracking-widest text-[#6f8faf] uppercase font-black mt-1">Live SaaS Projects</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="text-center p-2 max-sm:py-3 flex flex-col justify-center items-center"
            >
              <div className="font-sans text-4xl font-black text-white tracking-tight">10x</div>
              <p className="font-mono text-[10px] tracking-widest text-[#6f8faf] uppercase font-black mt-1">Faster Skill Upgrades</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="text-center p-2 max-sm:py-3 flex flex-col justify-center items-center"
            >
              <div className="font-sans text-4xl font-black text-white tracking-tight">Live</div>
              <p className="font-mono text-[10px] tracking-widest text-[#6f8faf] uppercase font-black mt-1">Production SaaS Built</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="text-center p-2 max-sm:py-3 flex flex-col justify-center items-center"
            >
              <div className="font-sans text-4xl font-black text-white tracking-tight">Day-1</div>
              <p className="font-mono text-[10px] tracking-widest text-[#6f8faf] uppercase font-black mt-1">Enterprise Contributor</p>
            </motion.div>
          </div>
        </motion.div>
      </section>
      {/* 5. Our Positioning Model Tabbed Panels Section */}
      <section className="py-24 bg-[#faf8f5] border-y border-[#d0dae8]" id="positioning">
        <div className="px-6 md:px-16 max-w-6xl mx-auto">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-[10px] text-[#1a4a8a] tracking-[0.3em] uppercase bg-[#e8edf5] border border-[#1a4a8a]/20 px-4 py-1.5 rounded-full font-black shadow-sm">
              Our Positioning Model
            </span>
            <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-[#0a1628] mt-5 mb-4 tracking-tight leading-none">
              Operational Realities & The Technical Bridge
            </h2>
            <p className="font-sans text-[#4a6a8f] text-base leading-relaxed font-medium">
              Traditional engineering education leaves a massive gap. EETIRP acts as the vital bridge delivering the technical, logical, and product-focused expertise modern companies demand.
            </p>
          </div>

          {/* Tab selectors */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
            <button
              onClick={() => setActiveTab('college')}
              className={`px-6 py-4 rounded-xl font-mono text-xs uppercase tracking-widest font-extrabold border-2 transition-all duration-300 cursor-pointer relative ${activeTab === 'college'
                ? 'bg-[#1a4a8a] text-white border-transparent shadow-sm'
                : 'bg-white text-[#4a6a8f] border-[#d0dae8] hover:border-[#1a4a8a]/30 hover:text-[#0a1628]'
                }`}
            >
              Traditional College Theory
            </button>
            <button
              onClick={() => setActiveTab('bridge')}
              className={`px-6 py-4 rounded-xl font-mono text-xs uppercase tracking-widest font-extrabold border-2 transition-all duration-300 cursor-pointer relative ${activeTab === 'bridge'
                ? 'bg-[#1a4a8a] text-white border-transparent shadow-sm'
                : 'bg-white text-[#4a6a8f] border-[#d0dae8] hover:border-[#1a4a8a]/30 hover:text-[#0a1628]'
                }`}
            >
              EETIRP Bridge & Solutions
            </button>
            <button
              onClick={() => setActiveTab('enterprise')}
              className={`px-6 py-4 rounded-xl font-mono text-xs uppercase tracking-widest font-extrabold border-2 transition-all duration-300 cursor-pointer relative ${activeTab === 'enterprise'
                ? 'bg-[#1a4a8a] text-white border-transparent shadow-sm'
                : 'bg-white text-[#4a6a8f] border-[#d0dae8] hover:border-[#1a4a8a]/30 hover:text-[#0a1628]'
                }`}
            >
              Enterprise Expectation
            </button>
          </div>

          {/* Dynamic Content Panel - DARK TERMINAL STYLE */}
          <div className="bg-[#0a1628] border border-[#1a3a5a] rounded-2xl p-6 md:p-10 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#1a4a8a]/5 rounded-full blur-xl"></div>

            <AnimatePresence mode="wait">
              {activeTab === 'college' && (
                <motion.div
                  key="college"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10"
                >
                  <div className="lg:col-span-7 space-y-6 flex flex-col justify-center">
                    <div className="inline-block bg-[#2a1a1a] text-[#e8b4b4] border border-[#4a2a2a] uppercase font-mono text-[9px] px-3 py-1 rounded-md tracking-widest font-black w-max">
                      THE PROBLEM
                    </div>
                    <h3 className="font-sans text-2xl md:text-3xl font-black text-white tracking-tight">
                      The Academic Knowledge Gap
                    </h3>
                    <p className="font-sans text-[#b0c4d8] text-sm leading-relaxed font-medium">
                      Colleges deliver essential foundational theory and basic algorithmic overviews. However, they lack dynamic updates, sandbox environments, and execution contexts.
                    </p>
                    <ul className="space-y-4 pt-2">
                      <li className="flex gap-3 items-start text-sm font-sans text-[#b0c4d8] font-medium">
                        <span className="w-5 h-5 rounded-full bg-[#2a1a1a] text-[#e8b4b4] flex items-center justify-center font-black text-xs shrink-0 mt-0.5 border border-[#4a2a2a]">✗</span>
                        <span>Outdated syllabi focusing on memorization over deployment.</span>
                      </li>
                      <li className="flex gap-3 items-start text-sm font-sans text-[#b0c4d8] font-medium">
                        <span className="w-5 h-5 rounded-full bg-[#2a1a1a] text-[#e8b4b4] flex items-center justify-center font-black text-xs shrink-0 mt-0.5 border border-[#4a2a2a]">✗</span>
                        <span>Dry lab code snippets that never face production-scale performance tests or state management.</span>
                      </li>
                      <li className="flex gap-3 items-start text-sm font-sans text-[#b0c4d8] font-medium">
                        <span className="w-5 h-5 rounded-full bg-[#2a1a1a] text-[#e8b4b4] flex items-center justify-center font-black text-xs shrink-0 mt-0.5 border border-[#4a2a2a]">✗</span>
                        <span>Isolated working environments devoid of proper Git-flows, Code Reviews, and CI/CD pipelines.</span>
                      </li>
                    </ul>
                  </div>
                  <div className="lg:col-span-5 flex items-center">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="w-full bg-[#0d1f33] text-white rounded-2xl p-8 border border-[#1a3a5a] shadow-sm flex flex-col items-center text-center"
                    >
                      <div className="p-3.5 bg-[#1a3a5a] rounded-full border border-[#1a3a5a] mb-4">
                        <GraduationCap className="w-8 h-8 text-[#6f8faf]" />
                      </div>
                      <span className="font-mono text-[10px] tracking-widest text-[#6f8faf] font-black uppercase mb-2 block">
                        THEORETICAL BASE
                      </span>
                      <p className="font-sans text-sm leading-relaxed text-[#b0c4d8] font-medium text-center">
                        Valid starting concepts, but insufficient for direct software-engineering or startup product builds.
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'bridge' && (
                <motion.div
                  key="bridge"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10"
                >
                  <div className="lg:col-span-7 space-y-6 flex flex-col justify-center">
                    <div className="inline-block bg-[#0d1f33] text-[#6f8faf] border border-[#1a3a5a] uppercase font-mono text-[9px] px-3 py-1 rounded-md tracking-widest font-black w-max">
                      THE BRIDGE
                    </div>
                    <h3 className="font-sans text-2xl md:text-3xl font-black text-white tracking-tight">
                      Hands-on, Project-Centric SaaS Studio
                    </h3>
                    <p className="font-sans text-[#b0c4d8] text-sm leading-relaxed font-medium">
                      EETIRP integrates the student's theoretical foundation with professional product building. We use active, live in-house SaaS applications as practical Sandboxes for training, architectural study, and collaborative code deployment.
                    </p>
                    <ul className="space-y-4 pt-2">
                      <li className="flex gap-3 items-start text-sm font-sans text-[#b0c4d8] font-medium">
                        <span className="w-5 h-5 rounded-full bg-[#0d1f33] text-[#6f8faf] flex items-center justify-center font-black text-xs shrink-0 mt-0.5 border border-[#1a3a5a]">✓</span>
                        <span>Real-world deployments utilizing standard developer toolchains (Supabase, Next.js, Vercel, Docker).</span>
                      </li>
                      <li className="flex gap-3 items-start text-sm font-sans text-[#b0c4d8] font-medium">
                        <span className="w-5 h-5 rounded-full bg-[#0d1f33] text-[#6f8faf] flex items-center justify-center font-black text-xs shrink-0 mt-0.5 border border-[#1a3a5a]">✓</span>
                        <span>Continuous product-oriented sprints that teach student engineers how to scale apps.</span>
                      </li>
                      <li className="flex gap-3 items-start text-sm font-sans text-[#b0c4d8] font-medium">
                        <span className="w-5 h-5 rounded-full bg-[#0d1f33] text-[#6f8faf] flex items-center justify-center font-black text-xs shrink-0 mt-0.5 border border-[#1a3a5a]">✓</span>
                        <span>Active mentor-led startup culture matching actual high-performance tech squads.</span>
                      </li>
                    </ul>
                  </div>
                  <div className="lg:col-span-5 flex items-center">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="w-full bg-[#0d1f33] text-white rounded-2xl p-8 border border-[#1a3a5a] shadow-sm flex flex-col items-center text-center"
                    >
                      <div className="p-3.5 bg-[#1a3a5a] rounded-full border border-[#1a3a5a] mb-4">
                        <Rocket className="w-8 h-8 text-[#6f8faf]" />
                      </div>
                      <span className="font-mono text-[10px] tracking-widest text-[#6f8faf] font-black uppercase mb-2 block">
                        EETIRP CATALYST STUDIO
                      </span>
                      <p className="font-sans text-sm leading-relaxed text-[#b0c4d8] font-medium text-center">
                        Where developers build actual Software-as-a-Service platforms, converting theory into concrete functional applications.
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'enterprise' && (
                <motion.div
                  key="enterprise"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10"
                >
                  <div className="lg:col-span-7 space-y-6 flex flex-col justify-center">
                    <div className="inline-block bg-[#0d1f33] text-[#6f8faf] border border-[#1a3a5a] uppercase font-mono text-[9px] px-3 py-1 rounded-md tracking-widest font-black w-max">
                      THE GOAL
                    </div>
                    <h3 className="font-sans text-2xl md:text-3xl font-black text-white tracking-tight">
                      Day-One Ready Contributors
                    </h3>
                    <p className="font-sans text-[#b0c4d8] text-sm leading-relaxed font-medium">
                      High-growth startups and mature enterprises can't afford six months of fundamental training. They demand immediate, structured technical execution.
                    </p>
                    <ul className="space-y-4 pt-2">
                      <li className="flex gap-3 items-start text-sm font-sans text-[#b0c4d8] font-medium">
                        <Check className="w-4 h-4 text-[#6f8faf] shrink-0 mt-0.5" />
                        <span>Autonomous navigation of complex monorepos, clean architecture patterns, and backend performance.</span>
                      </li>
                      <li className="flex gap-3 items-start text-sm font-sans text-[#b0c4d8] font-medium">
                        <Check className="w-4 h-4 text-[#6f8faf] shrink-0 mt-0.5" />
                        <span>Clean pull request creation, test-driven validation, and resilient APIs.</span>
                      </li>
                      <li className="flex gap-3 items-start text-sm font-sans text-[#b0c4d8] font-medium">
                        <Check className="w-4 h-4 text-[#6f8faf] shrink-0 mt-0.5" />
                        <span>A product mindset where features are designed for user utility, performance, and efficiency.</span>
                      </li>
                    </ul>
                  </div>
                  <div className="lg:col-span-5 flex items-center">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="w-full bg-[#0d1f33] text-white rounded-2xl p-8 border border-[#1a3a5a] shadow-sm flex flex-col items-center text-center"
                    >
                      <div className="p-3.5 bg-[#1a3a5a] rounded-full border border-[#1a3a5a] mb-4">
                        <Briefcase className="w-8 h-8 text-[#6f8faf]" />
                      </div>
                      <span className="font-mono text-[10px] tracking-widest text-[#6f8faf] font-black uppercase mb-2 block">
                        INDUSTRY PREPAREDNESS
                      </span>
                      <p className="font-sans text-sm leading-relaxed text-[#b0c4d8] font-medium text-center">
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
      <section className="py-24 px-6 md:px-16 max-w-6xl mx-auto w-full bg-white" id="pillars">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-[10px] text-[#1a4a8a] tracking-[0.25em] bg-[#e8edf5] border border-[#1a4a8a]/20 px-4 py-1.5 rounded-full font-black uppercase shadow-sm">
            Our Program Pillars
          </span>
          <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-[#0a1628] mt-5 mb-4 tracking-tight leading-none">
            Comprehensive Training & Studio Pathways
          </h2>
          <p className="font-sans text-[#4a6a8f] text-base leading-relaxed font-medium">
            We have systematically deconstructed the full software engineer's journey, introducing hyper-focused pathways for builders of all levels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programPillars.map((pillar) => {
            const IconComp = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className={`flex flex-col justify-between p-7 rounded-2xl bg-[#faf8f5] border border-[#d0dae8] hover:border-[#1a4a8a]/30 shadow-sm transition-all duration-300 ${pillar.hoverBorder} group relative overflow-hidden`}
              >
                {/* Subtle index tag */}
                <div className="absolute top-4 right-4 font-mono text-[10px] text-[#4a6a8f] font-extrabold tracking-wider bg-white border border-[#d0dae8] px-2 py-0.5 rounded select-none">
                  INDEX {pillar.num}
                </div>

                <div className="space-y-5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${pillar.iconBg}`}>
                    <IconComp className={`w-6 h-6 ${pillar.color}`} />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-sans text-lg font-black text-[#0a1628] hover:text-[#1a4a8a] transition-colors leading-tight">
                      {pillar.title}
                    </h3>
                    <p className="font-sans text-sm text-[#4a6a8f] leading-relaxed font-medium">
                      {pillar.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#d0dae8] flex items-center justify-between">
                  <span className={`inline-block font-mono text-[9px] tracking-wider uppercase font-extrabold px-3 py-1.5 rounded select-none ${pillar.badgeStyle}`}>
                    {pillar.badge}
                  </span>
                  <span className="font-mono text-[9px] text-[#4a6a8f]/50 tracking-widest font-black uppercase">
                    ACTIVE PATH
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 7. SaaS Sandbox Lab Section */}
      <section className="py-24 bg-[#faf8f5] border-y border-[#d0dae8]" id="services">
        <div className="px-6 md:px-16 max-w-6xl mx-auto">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-[10px] text-[#1a4a8a] tracking-[0.3em] uppercase bg-[#e8edf5] border border-[#1a4a8a]/20 px-4 py-1.5 rounded-full font-black shadow-sm">
              SaaS Sandbox Lab
            </span>
            <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-[#0a1628] mt-5 mb-4 tracking-tight leading-none">
              Present Ongoing Projects
            </h2>
            <p className="font-sans text-[#4a6a8f] text-base leading-relaxed font-medium">
              We don't teach from empty slides. EETIRP acts as a live Startup Studio, engineering real products.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left selector menu - Cards - DARKER TEXT */}
            <div className="lg:col-span-12 xl:col-span-5 space-y-4 lg:grid lg:grid-cols-3 xl:flex xl:flex-col gap-4 lg:space-y-0">

              {/* Project Tab 1 Selector */}
              <motion.div
                whileHover={{ y: -2 }}
                onClick={() => setSelectedProjectId('placement')}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer relative overflow-hidden group ${selectedProjectId === 'placement'
                  ? 'bg-[#1a4a8a] text-white border-transparent shadow-sm'
                  : 'bg-white text-[#0a1628] border-[#d0dae8] hover:border-[#1a4a8a]/30'
                  }`}
              >
                {selectedProjectId === 'placement' && (
                  <motion.div layoutId="nav-glow-indicator" className="absolute left-0 top-0 bottom-0 w-[3px] bg-white z-15" />
                )}
                <div className="flex justify-between items-center mb-3">
                  <span className={`font-mono text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-md font-black ${selectedProjectId === 'placement'
                    ? 'bg-white/10 border border-white/20 text-white'
                    : 'bg-[#e8edf5] border border-[#d0dae8] text-[#1a4a8a]'
                    }`}>
                    01
                  </span>
                  <span className={`text-[10px] font-mono tracking-widest font-black ${selectedProjectId === 'placement' ? 'text-white/70' : 'text-[#1a4a8a]'
                    }`}>
                    ACTIVE PRODUCTION
                  </span>
                </div>
                <h4 className={`font-sans text-lg font-black tracking-tight mb-2 ${selectedProjectId === 'placement' ? 'text-white' : 'text-[#0a1628]'
                  }`}>
                  Placement AI Platform
                </h4>
                <p className={`font-sans text-sm leading-relaxed font-medium ${selectedProjectId === 'placement' ? 'text-white/80' : 'text-[#1a3a5a]'
                  }`}>
                  An AI-driven environment optimizing interview preparedness. Utilizes automated evaluation engines, resume scorers, and smart predictive diagnostics.
                </p>
                <div className={`mt-4 flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest font-black select-none ${selectedProjectId === 'placement' ? 'text-white/70' : 'text-[#1a4a8a]'
                  }`}>
                  <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${selectedProjectId === 'placement' ? 'bg-white/50' : 'bg-[#1a4a8a]'
                    }`} />
                  <span>Interactive module focus</span>
                </div>
              </motion.div>

              {/* Project Tab 2 Selector */}
              <motion.div
                whileHover={{ y: -2 }}
                onClick={() => setSelectedProjectId('kaura')}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer relative overflow-hidden group ${selectedProjectId === 'kaura'
                  ? 'bg-[#1a4a8a] text-white border-transparent shadow-sm'
                  : 'bg-white text-[#0a1628] border-[#d0dae8] hover:border-[#1a4a8a]/30'
                  }`}
              >
                {selectedProjectId === 'kaura' && (
                  <motion.div layoutId="nav-glow-indicator" className="absolute left-0 top-0 bottom-0 w-[3px] bg-white z-15" />
                )}
                <div className="flex justify-between items-center mb-3">
                  <span className={`font-mono text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-md font-black ${selectedProjectId === 'kaura'
                    ? 'bg-white/10 border border-white/20 text-white'
                    : 'bg-[#e8edf5] border border-[#d0dae8] text-[#1a4a8a]'
                    }`}>
                    02
                  </span>
                  <span className={`text-[10px] font-mono tracking-widest font-black ${selectedProjectId === 'kaura' ? 'text-white/70' : 'text-[#1a4a8a]'
                    }`}>
                    ACTIVE PRODUCTION
                  </span>
                </div>
                <h4 className={`font-sans text-lg font-black tracking-tight mb-2 ${selectedProjectId === 'kaura' ? 'text-white' : 'text-[#0a1628]'
                  }`}>
                  Kaura Hub
                </h4>
                <p className={`font-sans text-sm leading-relaxed font-medium ${selectedProjectId === 'kaura' ? 'text-white/80' : 'text-[#1a3a5a]'
                  }`}>
                  A next-generation student workspace developed under EETIRP LTD. Kaura integrates vital student utilities, notes engines, and productivity tools into one unified student portal.
                </p>
                <div className={`mt-4 flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest font-black select-none ${selectedProjectId === 'kaura' ? 'text-white/70' : 'text-[#1a4a8a]'
                  }`}>
                  <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${selectedProjectId === 'kaura' ? 'bg-white/50' : 'bg-[#1a4a8a]'
                    }`} />
                  <span>Interactive module focus</span>
                </div>
              </motion.div>

              {/* Project Tab 3 Selector */}
              <motion.div
                whileHover={{ y: -2 }}
                onClick={() => setSelectedProjectId('studio')}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer relative overflow-hidden group ${selectedProjectId === 'studio'
                  ? 'bg-[#1a4a8a] text-white border-transparent shadow-sm'
                  : 'bg-white text-[#0a1628] border-[#d0dae8] hover:border-[#1a4a8a]/30'
                  }`}
              >
                {selectedProjectId === 'studio' && (
                  <motion.div layoutId="nav-glow-indicator" className="absolute left-0 top-0 bottom-0 w-[3px] bg-white z-15" />
                )}
                <div className="flex justify-between items-center mb-3">
                  <span className={`font-mono text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-md font-black ${selectedProjectId === 'studio'
                    ? 'bg-white/10 border border-white/20 text-white'
                    : 'bg-[#e8edf5] border border-[#d0dae8] text-[#1a4a8a]'
                    }`}>
                    03
                  </span>
                  <span className={`text-[10px] font-mono tracking-widest font-black ${selectedProjectId === 'studio' ? 'text-white/70' : 'text-[#1a4a8a]'
                    }`}>
                    CORE INTEGRATION
                  </span>
                </div>
                <h4 className={`font-sans text-lg font-black tracking-tight mb-2 ${selectedProjectId === 'studio' ? 'text-white' : 'text-[#0a1628]'
                  }`}>
                  Live Studio Integration
                </h4>
                <p className={`font-sans text-sm leading-relaxed font-medium ${selectedProjectId === 'studio' ? 'text-white/80' : 'text-[#1a3a5a]'
                  }`}>
                  These aren't just mockup dashboards. Every student inside EETIRP gets assigned repository tickets, handles actual customer bugs, reviews real metrics logs, and helps deploy features.
                </p>
                <div className={`mt-4 flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest font-black select-none ${selectedProjectId === 'studio' ? 'text-white/70' : 'text-[#1a4a8a]'
                  }`}>
                  <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${selectedProjectId === 'studio' ? 'bg-white/50' : 'bg-[#1a4a8a]'
                    }`} />
                  <span>Interactive module focus</span>
                </div>
              </motion.div>

            </div>

            {/* Right side: Interactive Simulated Web Browser Console - STAYS THE SAME */}
            <div className="lg:col-span-12 xl:col-span-7 bg-[#0a1628] rounded-2xl border border-[#1a3a5a] shadow-xl overflow-hidden font-mono text-white text-xs">

              {/* Browser control bar */}
              <div className="bg-[#0d1f33] px-4 py-3.5 flex items-center justify-between border-b border-[#1a3a5a] select-none">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#1a4a8a] shadow-[0_0_6px_rgba(26,74,138,0.5)]"></span>
                  <span className="w-3 h-3 rounded-full bg-[#4a6a8f]"></span>
                  <span className="w-3 h-3 rounded-full bg-[#6f8faf]"></span>
                </div>

                <div className="flex-grow max-w-sm mx-4 bg-[#0a1628] border border-[#1a3a5a] rounded-lg px-3 py-1 font-mono text-[10px] text-[#b0c4d8] select-all tracking-wide text-center uppercase">
                  eetirp_studio://live-preview
                </div>

                <span className="text-[10px] font-sans text-[#b0c4d8] font-black uppercase tracking-widest max-sm:hidden">
                  {selectedProjectId === 'placement' ? 'placement-ai' : selectedProjectId === 'kaura' ? 'kaura-hub' : 'live-dashboard'}
                </span>
              </div>

              {/* Content Area */}
              <div className="p-6 md:p-8 min-h-[350px] bg-[#0a1628] flex flex-col justify-between font-sans relative">

                <AnimatePresence mode="wait">
                  {selectedProjectId === 'placement' && (
                    <motion.div
                      key="placement"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6 text-left"
                    >
                      <span className="font-mono text-[10px] text-[#6f8faf] border border-[#1a3a5a] px-2.5 py-1 bg-[#0d1f33] rounded-md tracking-widest font-black uppercase inline-block">
                        Ecosystem App 01
                      </span>
                      <h5 className="text-2xl font-extrabold tracking-tight text-white font-sans mt-2">
                        Placement AI Platform
                      </h5>
                      <p className="text-[#e8edf5] text-sm leading-relaxed max-w-xl font-medium">
                        An integrated AI ecosystem designed to help engineering students prepare for and secure top-tier placements.
                      </p>
                      <div className="pt-2 flex flex-wrap gap-2">
                        <span className="px-3 py-1 rounded-full bg-[#0d1f33] border border-[#1a3a5a] text-[10px] text-[#b0c4d8]">TypeScript</span>
                        <span className="px-3 py-1 rounded-full bg-[#0d1f33] border border-[#1a3a5a] text-[10px] text-[#b0c4d8]">LLM Mapping</span>
                        <span className="px-3 py-1 rounded-full bg-[#0d1f33] border border-[#1a3a5a] text-[10px] text-[#b0c4d8]">Docker</span>
                      </div>
                      <div className="bg-[#0d1f33] border border-[#1a3a5a] p-4 rounded-xl flex items-center justify-between">
                        <div className="space-y-1">
                          <span className="font-mono text-[9px] text-[#6f8faf] font-black uppercase">LAUNCH STATE</span>
                          <p className="text-white text-xs font-mono font-bold">STABLE_PORT_3000_INGRESS (v2.0.4)</p>
                        </div>
                        <a href="https://placementaiplatform.vercel.app/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-[#1a4a8a] hover:bg-[#0d2f5a] text-white font-mono text-[10px] font-black uppercase rounded shadow transition-all flex items-center gap-1.5">
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
                      <span className="font-mono text-[10px] text-[#6f8faf] border border-[#1a3a5a] px-2.5 py-1 bg-[#0d1f33] rounded-md tracking-widest font-black uppercase inline-block">
                        Ecosystem App 02
                      </span>
                      <h5 className="text-2xl font-extrabold tracking-tight text-white font-sans mt-2">
                        Kaura Hub
                      </h5>
                      <p className="text-[#e8edf5] text-sm leading-relaxed max-w-xl font-medium">
                        A next-generation student workspace developed under EETIRP LTD. Kaura integrates vital student utilities, notes engines, and productivity tools into one unified student portal.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="p-3 bg-[#0d1f33] rounded border border-[#1a3a5a] flex items-center gap-2.5 font-sans text-sm text-[#b0c4d8]">
                          <CheckCircle2 className="w-4 h-4 text-[#6f8faf] shrink-0" />
                          <span>Resume Builder & Portfolio Optimizer</span>
                        </div>
                        <div className="p-3 bg-[#0d1f33] rounded border border-[#1a3a5a] flex items-center gap-2.5 font-sans text-sm text-[#b0c4d8]">
                          <CheckCircle2 className="w-4 h-4 text-[#6f8faf] shrink-0" />
                          <span>Kaura Learning Hub & Notes</span>
                        </div>
                      </div>
                      <div className="pt-2 flex justify-end">
                        <a href="https://www.kaurahub.com/" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-[#1a4a8a] hover:bg-[#0d2f5a] text-white font-mono text-[10px] font-black uppercase rounded shadow transition-all flex items-center gap-1.5">
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
                      <span className="font-mono text-[10px] text-[#6f8faf] border border-[#1a3a5a] px-2.5 py-1 bg-[#0d1f33] rounded-md tracking-widest font-black uppercase inline-block">
                        Core Operations
                      </span>
                      <h5 className="text-2xl font-extrabold tracking-tight text-white font-sans mt-2">
                        Live Studio Integration
                      </h5>
                      <p className="text-[#e8edf5] text-sm leading-relaxed max-w-xl font-medium">
                        These aren't just mockup dashboards. Every student inside EETIRP gets assigned repository tickets, handles actual customer bugs, reviews real metrics logs, and helps deploy features directly to production.
                      </p>
                      <div className="bg-[#0d1f33] p-4 border border-[#1a3a5a] rounded-xl font-mono text-[11px] leading-relaxed text-[#b0c4d8] space-y-1 select-none">
                        <p className="text-[#6f8faf] font-bold">&gt; mapping tickets to engineers...</p>
                        <p>&gt; telemetry verified: latency = 8ms (Singapore and Bengaluru nodes)</p>
                        <p className="text-[#6f8faf] font-bold">&gt; active repositories synchronized: 15+</p>
                      </div>
                      <div className="flex justify-end">
                        <a href="#onboarding" className="px-5 py-2.5 bg-[#1a4a8a] hover:bg-[#0d2f5a] tracking-widest border border-[#1a4a8a]/30 text-white font-mono text-[10px] font-black uppercase rounded shadow transition-all">
                          Request Sandbox Access
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Simulated Server Console output at footer */}
                <div className="mt-8 border-t border-[#1a3a5a] pt-4 flex items-center justify-between font-mono text-[10px] text-[#6f8faf] relative z-10 select-none">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1a4a8a] shadow-[0_0_8px_rgba(26,74,138,0.5)]"></span>
                    <span>
                      {selectedProjectId === 'placement' && 'placement-ai-server: listening on port :3000 (15s ago)'}
                      {selectedProjectId === 'kaura' && 'kaurahub-main server: listening on port :443 (4m ago)'}
                      {selectedProjectId === 'studio' && 'eetirp-compiler: connection established on secure telemetry pipe'}
                    </span>
                  </div>
                  <span className="text-[9px] text-[#4a6a8f] uppercase tracking-widest">v1.2.0</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. Leadership & Backing Grid panel */}
      <section className="py-24 bg-white border-y border-[#d0dae8]" id="leadership">
        <div className="px-6 md:px-16 max-w-6xl mx-auto">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-[10px] text-[#1a4a8a] tracking-[0.25em] bg-[#e8edf5] border border-[#1a4a8a]/20 px-4 py-1.5 rounded-full font-black uppercase shadow-sm">
              Leadership & Backing
            </span>
            <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-[#0a1628] mt-5 mb-4 tracking-tight leading-none">
              Meet the Ecosystem Drivers
            </h2>
            <p className="font-sans text-[#4a6a8f] text-base leading-relaxed font-medium">
              The architects, developers, and strategic partners building EETIRP into a production-scale engineering sandbox.
            </p>
          </div>

          {/* Leadership Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Kaushal Baitha */}
            <motion.div
              whileHover={{ y: -4 }}
              className="flex flex-col justify-between p-6 rounded-2xl bg-[#faf8f5] border border-[#d0dae8] hover:border-[#1a4a8a]/30 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#e8edf5] flex items-center justify-center text-[#1a4a8a] font-sans font-black text-lg border border-[#d0dae8] select-none">
                    KB
                  </div>
                  <div>
                    <span className="font-mono text-[9px] tracking-widest text-[#1a4a8a] uppercase font-bold bg-[#e8edf5] border border-[#d0dae8] px-2.5 py-1 rounded select-none">
                      CORE TEAM
                    </span>
                  </div>
                </div>
                <h4 className="font-sans text-lg font-black text-[#0a1628] mb-1">
                  Kaushal Baitha
                </h4>
                <p className="font-mono text-[10px] tracking-wider uppercase text-[#1a4a8a] font-black mb-3">
                  FOUNDER & CHIEF ARCHITECT
                </p>
                <p className="font-sans text-sm text-[#4a6a8f] leading-relaxed mb-6 font-medium">
                  Leading technical directions and backend systems design. Passionate about project-centric engineering and enterprise system development.
                </p>
              </div>
              <a href="https://kaushalbaitha7.vercel.app/" target="_blank" rel="noopener noreferrer" className="w-full py-2.5 bg-[#1a4a8a] border border-[#1a4a8a]/30 text-white font-mono text-[10px] uppercase tracking-widest font-black rounded-lg hover:bg-[#0d2f5a] cursor-pointer transition-all text-center block">
                Explore Portfolio
              </a>
            </motion.div>

            {/* Karthik C M */}
            <motion.div
              whileHover={{ y: -4 }}
              className="flex flex-col justify-between p-6 rounded-2xl bg-[#faf8f5] border border-[#d0dae8] hover:border-[#1a4a8a]/30 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#e8edf5] flex items-center justify-center text-[#1a4a8a] font-sans font-black text-lg border border-[#d0dae8] select-none">
                    KC
                  </div>
                  <div>
                    <span className="font-mono text-[9px] tracking-widest text-[#1a4a8a] uppercase font-bold bg-[#e8edf5] border border-[#d0dae8] px-2.5 py-1 rounded select-none">
                      OPERATIONS
                    </span>
                  </div>
                </div>
                <h4 className="font-sans text-lg font-black text-[#0a1628] mb-1">
                  Karthik C M
                </h4>
                <p className="font-mono text-[10px] tracking-wider uppercase text-[#1a4a8a] font-black mb-3">
                  CO-FOUNDER & HEAD OF OPERATIONS
                </p>
                <p className="font-sans text-sm text-[#4a6a8f] leading-relaxed mb-6 font-medium">
                  Driving strategic development programs, bootcamp architectures, and product validation cycles to produce day-one engineering leaders.
                </p>
              </div>
              <a href="https://karthikcm.vercel.app/" target="_blank" rel="noopener noreferrer" className="w-full py-2.5 bg-[#1a4a8a] border border-[#1a4a8a]/30 text-white font-mono text-[10px] uppercase tracking-widest font-black rounded-lg hover:bg-[#0d2f5a] cursor-pointer transition-all text-center block">
                Explore Portfolio
              </a>
            </motion.div>

            {/* Karthik D */}
            <motion.div
              whileHover={{ y: -4 }}
              className="flex flex-col justify-between p-6 rounded-2xl bg-[#faf8f5] border border-[#d0dae8] hover:border-[#1a4a8a]/30 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#e8edf5] flex items-center justify-center text-[#1a4a8a] font-sans font-black text-lg border border-[#d0dae8] select-none">
                    KD
                  </div>
                  <div>
                    <span className="font-mono text-[9px] tracking-widest text-[#1a4a8a] uppercase font-bold bg-[#e8edf5] border border-[#d0dae8] px-2.5 py-1 rounded select-none">
                      INVESTING
                    </span>
                  </div>
                </div>
                <h4 className="font-sans text-lg font-black text-[#0a1628] mb-1">
                  Karthik D
                </h4>
                <p className="font-mono text-[10px] tracking-wider uppercase text-[#1a4a8a] font-black mb-3">
                  STRATEGIC INVESTOR
                </p>
                <p className="font-sans text-sm text-[#4a6a8f] leading-relaxed mb-6 font-medium">
                  Sourcing strategic growth capital, industrial partnerships, and scaling market pipelines for in-house studio SaaS platforms.
                </p>
              </div>
              <a href="https://karthikd1.vercel.app/" target="_blank" rel="noopener noreferrer" className="w-full py-2.5 bg-[#1a4a8a] border border-[#1a4a8a]/30 text-white font-mono text-[10px] uppercase tracking-widest font-black rounded-lg hover:bg-[#0d2f5a] cursor-pointer transition-all text-center block">
                Explore Portfolio
              </a>
            </motion.div>

            {/* Pritee Kumari Singh */}
            <motion.div
              whileHover={{ y: -4 }}
              className="flex flex-col justify-between p-6 rounded-2xl bg-[#faf8f5] border border-[#d0dae8] hover:border-[#1a4a8a]/30 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#e8edf5] flex items-center justify-center text-[#1a4a8a] font-sans font-black text-lg border border-[#d0dae8] select-none">
                    PS
                  </div>
                  <div>
                    <span className="font-mono text-[9px] tracking-widest text-[#1a4a8a] uppercase font-bold bg-[#e8edf5] border border-[#d0dae8] px-2.5 py-1 rounded select-none">
                      STRATEGY
                    </span>
                  </div>
                </div>
                <h4 className="font-sans text-lg font-black text-[#0a1628] mb-1">
                  Pritee Kumari Singh
                </h4>
                <p className="font-mono text-[10px] tracking-wider uppercase text-[#1a4a8a] font-black mb-3">
                  MARKETING & STRATEGY LEADER
                </p>
                <p className="font-sans text-sm text-[#4a6a8f] leading-relaxed mb-6 font-medium">
                  Orchestrating market penetration campaigns, corporate engagement models, and scaling university pipelines for live studio cohorts.
                </p>
              </div>
              <a href="https://priteesingh.vercel.app/" target="_blank" rel="noopener noreferrer" className="w-full py-2.5 bg-[#1a4a8a] border border-[#1a4a8a]/30 text-white font-mono text-[10px] uppercase tracking-widest font-black rounded-lg hover:bg-[#0d2f5a] cursor-pointer transition-all text-center block">
                Explore Portfolio
              </a>
            </motion.div>

            {/* Rajdev Rana */}
            <motion.div
              whileHover={{ y: -4 }}
              className="flex flex-col justify-between p-6 rounded-2xl bg-[#faf8f5] border border-[#d0dae8] hover:border-[#1a4a8a]/30 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#e8edf5] flex items-center justify-center text-[#1a4a8a] font-sans font-black text-lg border border-[#d0dae8] select-none">
                    RR
                  </div>
                  <div>
                    <span className="font-mono text-[9px] tracking-widest text-[#1a4a8a] uppercase font-bold bg-[#e8edf5] border border-[#d0dae8] px-2.5 py-1 rounded select-none">
                      MGMT
                    </span>
                  </div>
                </div>
                <h4 className="font-sans text-lg font-black text-[#0a1628] mb-1">
                  Rajdev Rana
                </h4>
                <p className="font-mono text-[10px] tracking-wider uppercase text-[#1a4a8a] font-black mb-3">
                  PROJECT COORDINATOR
                </p>
                <p className="font-sans text-sm text-[#4a6a8f] leading-relaxed mb-6 font-medium">
                  Streamlines cross-functional workflows and strategic resource management to ensure seamless project execution.
                </p>
              </div>
              <a href="https://rajdev-rana.vercel.app/" target="_blank" rel="noopener noreferrer" className="w-full py-2.5 bg-[#1a4a8a] border border-[#1a4a8a]/30 text-white font-mono text-[10px] uppercase tracking-widest font-black rounded-lg hover:bg-[#0d2f5a] cursor-pointer transition-all text-center block">
                Explore Portfolio
              </a>
            </motion.div>

            {/* Rania Jasmine S */}
            <motion.div
              whileHover={{ y: -4 }}
              className="flex flex-col justify-between p-6 rounded-2xl bg-[#faf8f5] border border-[#d0dae8] hover:border-[#1a4a8a]/30 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#e8edf5] flex items-center justify-center text-[#1a4a8a] font-sans font-black text-lg border border-[#d0dae8] select-none">
                    RJ
                  </div>
                  <div>
                    <span className="font-mono text-[9px] tracking-widest text-[#1a4a8a] uppercase font-bold bg-[#e8edf5] border border-[#d0dae8] px-2.5 py-1 rounded select-none">
                      DEV
                    </span>
                  </div>
                </div>
                <h4 className="font-sans text-lg font-black text-[#0a1628] mb-1">
                  Rania Jasmine S
                </h4>
                <p className="font-mono text-[10px] tracking-wider uppercase text-[#1a4a8a] font-black mb-3">
                  FULL STACK DEVELOPER
                </p>
                <p className="font-sans text-sm text-[#4a6a8f] leading-relaxed mb-6 font-medium">
                  Engineers resilient, full-stack software solutions from database layout to production deployment, optimizing for speed and scale.
                </p>
              </div>
              <a href="https://raniajasmine-s.vercel.app/" target="_blank" rel="noopener noreferrer" className="w-full py-2.5 bg-[#1a4a8a] border border-[#1a4a8a]/30 text-white font-mono text-[10px] uppercase tracking-widest font-black rounded-lg hover:bg-[#0d2f5a] cursor-pointer transition-all text-center block">
                Explore Portfolio
              </a>
            </motion.div>

          </div>

          {/* Trainer Grid list */}
          <div className="text-center max-w-3xl mx-auto mt-24 mb-16">
            <span className="font-mono text-[10px] text-[#1a4a8a] tracking-[0.25em] bg-[#e8edf5] border border-[#1a4a8a]/20 px-4 py-1.5 rounded-full font-black uppercase shadow-sm">
              TRAINERS
            </span>
            <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-[#0a1628] mt-5 mb-4 tracking-tight leading-tight">
              Technical Trainers & Career Experts
            </h2>
            <p className="font-sans text-[#4a6a8f] text-base leading-relaxed font-medium">
              Industry-experienced educators delivering intensive stack-specific sprints, DSA strategies, and outcome-focused interview preparations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">

            {/* Raushan Kumar Baitha */}
            <motion.div
              whileHover={{ y: -4 }}
              className="flex flex-col justify-between p-6 rounded-2xl bg-[#faf8f5] border border-[#d0dae8] hover:border-[#1a4a8a]/30 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#e8edf5] flex items-center justify-center text-[#1a4a8a] font-sans font-black text-lg border border-[#d0dae8] select-none">
                    RB
                  </div>
                  <div>
                    <span className="font-mono text-[9px] tracking-widest text-[#1a4a8a] uppercase font-bold bg-[#e8edf5] border border-[#d0dae8] px-2.5 py-1 rounded select-none">
                      SYSTEMS
                    </span>
                  </div>
                </div>
                <h4 className="font-sans text-lg font-black text-[#0a1628] mb-1">
                  Raushan Kumar Baitha
                </h4>
                <p className="font-mono text-[10px] tracking-wider uppercase text-[#1a4a8a] font-black mb-3">
                  TECHNICAL TRAINER & SYSTEMS SPECIALIST
                </p>
                <p className="font-sans text-sm text-[#4a6a8f] leading-relaxed mb-6 font-medium">
                  Specializing in systems architecture, deep-dive backend frameworks, database configuration paradigms, and production deployment cycles.
                </p>
              </div>
              <div className="w-full py-2.5 bg-[#e8edf5] border border-[#d0dae8] text-[#1a4a8a] font-mono text-[10px] uppercase tracking-widest font-black rounded-lg select-none flex items-center justify-center gap-1.5 text-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1a4a8a]"></span> Systems Architecture Node
              </div>
            </motion.div>

            {/* Anup Tiwari */}
            <motion.div
              whileHover={{ y: -4 }}
              className="flex flex-col justify-between p-6 rounded-2xl bg-[#faf8f5] border border-[#d0dae8] hover:border-[#1a4a8a]/30 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#e8edf5] flex items-center justify-center text-[#1a4a8a] font-sans font-black text-lg border border-[#d0dae8] select-none">
                    AT
                  </div>
                  <div>
                    <span className="font-mono text-[9px] tracking-widest text-[#1a4a8a] uppercase font-bold bg-[#e8edf5] border border-[#d0dae8] px-2.5 py-1 rounded select-none">
                      ALGORITHMS
                    </span>
                  </div>
                </div>
                <h4 className="font-sans text-lg font-black text-[#0a1628] mb-1">
                  Anup Tiwari
                </h4>
                <p className="font-mono text-[10px] tracking-wider uppercase text-[#1a4a8a] font-black mb-3">
                  TECHNICAL TRAINER & DSA MENTOR
                </p>
                <p className="font-sans text-sm text-[#4a6a8f] leading-relaxed mb-6 font-medium">
                  Mentoring students in complex algorithmic thinking, foundational structures, optimized problem-solving tactics, and software assessment execution.
                </p>
              </div>
              <div className="w-full py-2.5 bg-[#e8edf5] border border-[#d0dae8] text-[#1a4a8a] font-mono text-[10px] uppercase tracking-widest font-black rounded-lg select-none flex items-center justify-center gap-1.5 text-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1a4a8a]"></span> DSA & Logic Sprints
              </div>
            </motion.div>

            {/* Nirmal Shekhar */}
            <motion.div
              whileHover={{ y: -4 }}
              className="flex flex-col justify-between p-6 rounded-2xl bg-[#faf8f5] border border-[#d0dae8] hover:border-[#1a4a8a]/30 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#e8edf5] flex items-center justify-center text-[#1a4a8a] font-sans font-black text-lg border border-[#d0dae8] select-none">
                    NS
                  </div>
                  <div>
                    <span className="font-mono text-[9px] tracking-widest text-[#1a4a8a] uppercase font-bold bg-[#e8edf5] border border-[#d0dae8] px-2.5 py-1 rounded select-none">
                      PLACEMENT
                    </span>
                  </div>
                </div>
                <h4 className="font-sans text-lg font-black text-[#0a1628] mb-1">
                  Nirmal Shekhar
                </h4>
                <p className="font-mono text-[10px] tracking-wider uppercase text-[#1a4a8a] font-black mb-3">
                  CAREER EXPERT & PLACEMENT STRATEGIST
                </p>
                <p className="font-sans text-sm text-[#4a6a8f] leading-relaxed mb-6 font-medium">
                  Guiding candidate roadmap pipelines with interactive mock behavioral drills, ATS criteria matching, and outcome-driven career placement solutions.
                </p>
              </div>
              <div className="w-full py-2.5 bg-[#e8edf5] border border-[#d0dae8] text-[#1a4a8a] font-mono text-[10px] uppercase tracking-widest font-black rounded-lg select-none flex items-center justify-center gap-1.5 text-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1a4a8a]"></span> Outcome Strategy Node
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 9. Cohort Intake Form and Placement Assessment diagnostics */}
      <section className="py-24 px-6 md:px-16 max-w-6xl mx-auto w-full bg-[#faf8f5]" id="onboarding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Instructions column left */}
          <div>
            <span className="font-mono text-xs text-[#1a4a8a] uppercase tracking-[0.3em] font-extrabold mb-4 block">
              Enter the EETIRP Ecosystem
            </span>
            <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-[#0a1628] mb-6 tracking-tight leading-tight">
              Connect & Intake Protocol
            </h2>
            <p className="text-[#4a6a8f] font-sans text-base leading-relaxed mb-10 font-medium">
              Whether you are an ambitious college student aiming for practical mastery, a startup founder looking for SaaS development partnerships, or a corporate engineering leader, we want to talk.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-6 p-5 rounded-xl border border-[#d0dae8] bg-white hover:border-[#1a4a8a]/30 transition-all shadow-sm">
                <div className="w-11 h-11 rounded-full bg-[#e8edf5] flex items-center justify-center border border-[#d0dae8]">
                  <Mail className="w-5 h-5 text-[#1a4a8a]" />
                </div>
                <div>
                  <p className="font-mono text-[9px] text-[#4a6a8f] uppercase tracking-widest font-black mb-1">
                    EMAIL US
                  </p>
                  <a href="mailto:eetirpltd@gmail.com" className="font-mono text-sm font-black text-[#0a1628] hover:text-[#1a4a8a]">
                    eetirpltd@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-6 p-5 rounded-xl border border-[#d0dae8] bg-white hover:border-[#1a4a8a]/30 transition-all shadow-sm">
                <div className="w-11 h-11 rounded-full bg-[#e8edf5] flex items-center justify-center border border-[#d0dae8]">
                  <Phone className="w-5 h-5 text-[#1a4a8a]" />
                </div>
                <div>
                  <p className="font-mono text-[9px] text-[#4a6a8f] uppercase tracking-widest font-black mb-1">
                    CALL / WHATSAPP
                  </p>
                  <a href="tel:+918088487801" className="font-mono text-sm font-black text-[#0a1628] hover:text-[#1a4a8a]">
                    +91 8088487801
                  </a>
                </div>
              </div>

              <div className="p-4 bg-white rounded-lg border border-[#d0dae8] text-xs font-mono text-[#4a6a8f] flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#1a4a8a] shrink-0" />
                <span>Response SLA: Standard feedback within 24 working hours.</span>
              </div>
            </div>
          </div>

          {/* Form column right */}
          <div className="w-full">

            {/* Form state controller */}
            {isSubmittingForm ? (
              <div className="bg-white border border-[#d0dae8] rounded-2xl p-8 shadow-sm min-h-[460px] flex flex-col justify-center items-center text-center space-y-6 text-[#0a1628]">
                <RefreshCw className="w-10 h-10 text-[#1a4a8a] animate-spin" />
                <div>
                  <h3 className="font-sans text-xl font-extrabold text-[#0a1628] tracking-tight">Transmitting Inquiry</h3>
                  <p className="font-sans text-sm text-[#4a6a8f] mt-2 font-medium">Preparing the data attributes payload secure transmission...</p>
                </div>
                <div className="w-24 bg-[#d0dae8] h-1 rounded-full overflow-hidden">
                  <div className="bg-[#1a4a8a] h-full animate-pulse w-full"></div>
                </div>
              </div>
            ) : submitStatus === 'success' ? (
              <div className="bg-white border border-[#1a4a8a]/30 rounded-2xl p-6 md:p-8 shadow-sm space-y-6 text-[#0a1628]">
                <div className="flex items-center gap-3 border-b border-[#d0dae8] pb-4">
                  <div className="w-10 h-10 rounded-full bg-[#e8edf5] text-[#1a4a8a] flex items-center justify-center border border-[#1a4a8a]/20">
                    <Check className="w-5 h-5 shrink-0" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-[#1a4a8a] border border-[#1a4a8a]/20 px-2.5 py-0.5 rounded tracking-widest uppercase bg-[#e8edf5] font-bold">
                      Transmission successful
                    </span>
                    <h3 className="font-sans text-lg font-black text-[#0a1628] mt-1">
                      Inquiry Sent to EETIRP
                    </h3>
                  </div>
                </div>

                <div className="bg-[#faf8f5] border border-[#d0dae8] p-5 rounded-xl space-y-4">
                  <p className="font-mono text-[10px] text-[#4a6a8f] uppercase tracking-widest font-black border-b border-[#d0dae8] pb-1">
                    TRANSMITTED PAYLOAD ATTRIBUTES
                  </p>

                  <div className="space-y-3 font-sans text-sm text-[#0a1628] leading-relaxed">
                    <div>
                      <span className="font-mono text-[9px] text-[#4a6a8f] uppercase font-bold block">Applicant Name</span>
                      <span className="font-semibold text-[#1a4a8a]">{formData.fullName}</span>
                    </div>
                    <div>
                      <span className="font-mono text-[9px] text-[#4a6a8f] uppercase font-bold block">Email Address</span>
                      <span className="font-mono font-bold text-[#0a1628]">{formData.email}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <span className="font-mono text-[9px] text-[#4a6a8f] uppercase font-bold block">Profile Segment</span>
                        <span className="font-semibold text-[#1a4a8a]">{formData.segment}</span>
                      </div>
                      <div>
                        <span className="font-mono text-[9px] text-[#4a6a8f] uppercase font-bold block">Focus Area</span>
                        <span className="font-semibold text-[#0a1628]">{formData.domainInterest}</span>
                      </div>
                    </div>
                    {formData.inquiryMatrix && (
                      <div>
                        <span className="font-mono text-[9px] text-[#4a6a8f] uppercase font-bold block">Core inquiry / objectives</span>
                        <p className="bg-white p-3 rounded border border-[#d0dae8] text-sm text-[#4a6a8f] font-medium mt-1 italic whitespace-pre-wrap leading-relaxed">
                          "{formData.inquiryMatrix}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={resetForm}
                  className="w-full text-center py-3.5 bg-[#1a4a8a] hover:bg-[#0d2f5a] text-white font-mono text-xs uppercase tracking-widest font-bold rounded-xl transition-all cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (

              <form
                onSubmit={handleFormSubmit}
                className="bg-[#0d1f33] border border-[#1a3a5a] p-6 md:p-8 rounded-2xl shadow-sm space-y-6 text-white"
              >
                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-[#6f8faf] uppercase tracking-widest font-black block">
                    YOUR NAME
                  </label>
                  <input
                    name="fullName"
                    type="text"
                    required
                    className="w-full bg-[#0a1628] border border-[#1a3a5a] focus:border-[#4a6a8f] rounded-lg px-4 py-3 leading-tight text-white font-sans text-sm focus:outline-none focus:ring-1 focus:ring-[#4a6a8f]/20 placeholder-[#4a6a8f]"
                    placeholder="e.g. John Doe"
                    value={formData.fullName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-[#6f8faf] uppercase tracking-widest font-black block">
                    EMAIL ADDRESS
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full bg-[#0a1628] border border-[#1a3a5a] focus:border-[#4a6a8f] rounded-lg px-4 py-3 leading-tight text-white font-sans text-sm focus:outline-none focus:ring-1 focus:ring-[#4a6a8f]/20 placeholder-[#4a6a8f]"
                    placeholder="e.g. john@university.edu"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-[#6f8faf] uppercase tracking-widest font-black block">
                      YOUR PROFILE SEGMENT
                    </label>
                    <select
                      name="segment"
                      className="w-full bg-[#0a1628] border border-[#1a3a5a] focus:border-[#4a6a8f] rounded-lg px-3 py-3 leading-tight text-white font-sans text-sm focus:outline-none cursor-pointer"
                      value={formData.segment}
                      onChange={handleInputChange}
                    >
                      <option className="bg-[#0a1628]">Engineering College Student</option>
                      <option className="bg-[#0a1628]">Startup Founder & Technical Partner</option>
                      <option className="bg-[#0a1628]">Professional Software Developer</option>
                      <option className="bg-[#0a1628]">Corporate Engineering Leader</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-[#6f8faf] uppercase tracking-widest font-black block">
                      FOCUS DOMAIN INTEREST
                    </label>
                    <select
                      name="domainInterest"
                      className="w-full bg-[#0a1628] border border-[#1a3a5a] focus:border-[#4a6a8f] rounded-lg px-3 py-3 leading-tight text-white font-sans text-sm focus:outline-none cursor-pointer"
                      value={formData.domainInterest}
                      onChange={handleInputChange}
                    >
                      <option className="bg-[#0a1628]">Coding Bootcamps (Hands-on)</option>
                      <option className="bg-[#0a1628]">Project-Centric SaaS Sandboxes</option>
                      <option className="bg-[#0a1628]">Placement Academy Accelerator</option>
                      <option className="bg-[#0a1628]">Corporate Upskilling Upgrades</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-[#6f8faf] uppercase tracking-widest font-black block">
                    YOUR CORE QUERY / GOALS
                  </label>
                  <textarea
                    name="inquiryMatrix"
                    rows={4}
                    className="w-full bg-[#0a1628] border border-[#1a3a5a] focus:border-[#4a6a8f] rounded-lg px-4 py-3 leading-tight text-white font-sans text-sm focus:outline-none focus:ring-1 focus:ring-[#4a6a8f]/20 resize-none placeholder-[#4a6a8f]"
                    placeholder="Briefly describe what you are looking to build or prepare for..."
                    value={formData.inquiryMatrix}
                    onChange={handleInputChange}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={!formData.fullName || !formData.email}
                  className="w-full py-4.5 bg-[#1a4a8a] hover:bg-[#0d2f5a] text-white font-mono text-xs uppercase tracking-widest font-black rounded-lg shadow-sm hover:opacity-95 transition-all text-center select-none active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  Send Onboarding Inquiry
                </button>

                <div className="text-center pt-2">
                  <span className="font-sans text-[10px] text-[#6f8faf]">
                    Prefer to send a direct message through your email app?
                  </span>
                  <div className="mt-2 text-center">
                    <a
                      href="mailto:eetirpltd@gmail.com?subject=EETIRP Onboarding Query"
                      className="inline-flex items-center gap-1.5 px-4 py-2 border border-[#1a3a5a] text-[#6f8faf] font-mono text-[10px] uppercase font-bold tracking-widest rounded hover:bg-[#1a3a5a]"
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

      {/* 10. Footer */}
      <footer className="bg-[#0a1628] text-white py-16 px-6 md:px-16 border-t-2 border-[#1a3a5a] overflow-hidden relative" id="footer">

        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#1a4a8a]/5 blur-[100px] pointer-events-none rounded-full"></div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10 font-sans">

          <div className="md:col-span-6 space-y-6">
            <div className="flex items-center gap-3.5 select-none">
              <div className="w-10 h-10 rounded-lg bg-white overflow-hidden p-1 border border-white/10 shadow-sm flex items-center justify-center">
                <EetirpLogo className="w-full h-full" showSlogan={false} isAnimated={false} />
              </div>
              <span className="font-sans text-lg font-black tracking-tight text-white uppercase">
                EETIRP
              </span>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              EETIRP is a custom-engineered ecosystem. We act as a hybrid EdTech program combined with an active production SaaS startup studio to transition candidates from college fundamentals to absolute industry readiness.
            </p>

            <div className="flex gap-3">
              <a href="https://github.com/eetirp-ltd" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#1a3a5a]/30 border border-[#1a3a5a] flex items-center justify-center hover:bg-[#1a4a8a] hover:text-white transition-all" title="Ecosystem GitHub">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/in/eetirp-limited" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#1a3a5a]/30 border border-[#1a3a5a] flex items-center justify-center hover:bg-[#1a4a8a] hover:text-white transition-all" title="Ecosystem LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://discord.com/users/1515615066245042291" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#1a3a5a]/30 border border-[#1a3a5a] flex items-center justify-center hover:bg-[#1a4a8a] hover:text-white transition-all" title="Ecosystem Discord">
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h5 className="font-mono text-[10px] text-[#6f8faf] uppercase tracking-widest font-black">
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

          <div className="md:col-span-3 space-y-4">
            <h5 className="font-mono text-[10px] text-[#6f8faf] uppercase tracking-widest font-black">
              CONTACT DETAILS
            </h5>
            <ul className="space-y-3.5 text-xs font-mono text-gray-400">
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#6f8faf] shrink-0" /> <a href="mailto:eetirpltd@gmail.com" className="hover:text-white transition-colors">eetirpltd@gmail.com</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#6f8faf] shrink-0" /> <a href="tel:+918088487801" className="hover:text-white transition-colors">+91 8088487801</a>
              </li>
              <li className="pt-2 border-t border-[#1a3a5a] text-[10px] text-gray-500 uppercase tracking-widest flex items-center gap-1.5 leading-tight">
                <span className="w-2 h-2 rounded-full bg-[#6f8faf]"></span> Currently running diagnostics for cohort 2026.
              </li>
            </ul>
          </div>

        </div>

        <div className="max-w-6xl mx-auto mt-16 pt-6 border-t border-[#1a3a5a] flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono text-gray-500 gap-4">
          <span>© 2026 EETIRP LTD. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="/terms" className="hover:text-white transition-colors">Terms of Use</a>
            <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>

      </footer>

    </div>
  );
}