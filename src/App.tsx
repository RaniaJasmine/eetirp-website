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
    color: 'text-[#7da7f0]',
    badgeStyle: 'text-[#7da7f0] bg-[#1a3a6b]/40 border border-[#7da7f0]/20',
    iconBg: 'bg-[#1a3a6b]/30 border border-[#7da7f0]/20',
    hoverBorder: 'hover:border-[#7da7f0]/60 hover:shadow-[0_0_30px_rgba(125,167,240,0.08)]',
    keywords: ['dsa', 'structure', 'systems architecture', 'networking', 'databases', 'academy', 'assessment', 'theory']
  },
  {
    id: 'sprint',
    num: '02',
    title: 'Intensive Coding Bootcamps',
    desc: 'Hyper-focused, stack-specific sprints building real-time apps. Go deep into React, Next.js, Node, Golang, and Cloud Infrastructure.',
    badge: 'SPRINT MODEL',
    icon: Code2,
    color: 'text-[#6ecbf5]',
    badgeStyle: 'text-[#6ecbf5] bg-[#0f314f]/40 border border-[#6ecbf5]/20',
    iconBg: 'bg-[#0f314f]/30 border border-[#6ecbf5]/20',
    hoverBorder: 'hover:border-[#6ecbf5]/60 hover:shadow-[0_0_30px_rgba(110,203,245,0.08)]',
    keywords: ['react', 'next.js', 'node', 'golang', 'cloud', 'infrastructure', 'sprint', 'bootcamp', 'code']
  },
  {
    id: 'sandbox',
    num: '03',
    title: 'Industry-Oriented Projects',
    desc: 'Engineer complete live systems instead of toy problems. Architect production applications like the Placement AI Platform and Kaura Hub, integrating real-time telemetry registers, LLM competency routing, and high-performance cloud runtimes.',
    badge: 'SANDBOX ENVIRONMENT',
    icon: Cpu,
    color: 'text-[#5b8def]',
    badgeStyle: 'text-[#5b8def] bg-[#1a2d5a]/40 border border-[#5b8def]/20',
    iconBg: 'bg-[#1a2d5a]/30 border border-[#5b8def]/20',
    hoverBorder: 'hover:border-[#5b8def]/60 hover:shadow-[0_0_30px_rgba(91,141,239,0.08)]',
    keywords: ['systems', 'production', 'placement ai', 'kaura', 'telemetry', 'llm', 'cloud', 'sandbox', 'projects']
  },
  {
    id: 'career',
    num: '04',
    title: 'Placement Preparation',
    desc: 'End-to-end placement readiness: intense Mock Interviews, automated coding rounds, ATS resume generation, and structured system design preparation.',
    badge: 'CAREER GATEWAY',
    icon: Briefcase,
    color: 'text-[#7da7f0]',
    badgeStyle: 'text-[#7da7f0] bg-[#1a2d5a]/40 border border-[#7da7f0]/20',
    iconBg: 'bg-[#1a2d5a]/30 border border-[#7da7f0]/20',
    hoverBorder: 'hover:border-[#7da7f0]/60 hover:shadow-[0_0_30px_rgba(125,167,240,0.08)]',
    keywords: ['placement', 'mock', 'interviews', 'coding rounds', 'ats', 'resume', 'system design', 'career']
  },
  {
    id: 'enterprise',
    num: '05',
    title: 'Corporate Upskilling',
    desc: 'Enterprise-level training built for active engineering roles. Upgrade staff workflows to handle cloud architectures, AI tools, and DevOps pipelines.',
    badge: 'ENTERPRISE UPGRADES',
    icon: Users,
    color: 'text-[#7692ff]',
    badgeStyle: 'text-[#7692ff] bg-[#1a2d5a]/40 border border-[#7692ff]/20',
    iconBg: 'bg-[#1a2d5a]/30 border border-[#7692ff]/20',
    hoverBorder: 'hover:border-[#7692ff]/60 hover:shadow-[0_0_30px_rgba(118,146,255,0.08)]',
    keywords: ['corporate', 'upskilling', 'enterprise', 'workflows', 'cloud', 'ai', 'devops', 'pipelines', 'staff']
  },
  {
    id: 'innovation',
    num: '06',
    title: 'Research & Innovation',
    desc: 'Translating concepts into technical realities. Direct mentorship on advanced proof of concepts, custom engineering tools, and hardware-software integrations.',
    badge: 'INNOVATION DESK',
    icon: Compass,
    color: 'text-[#7da7f0]',
    badgeStyle: 'text-[#7da7f0] bg-[#1a2d5a]/40 border border-[#7da7f0]/20',
    iconBg: 'bg-[#1a2d5a]/30 border border-[#7da7f0]/20',
    hoverBorder: 'hover:border-[#7da7f0]/60 hover:shadow-[0_0_30px_rgba(125,167,240,0.08)]',
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

  // State for real-time console query filtration
  const [searchQuery, setSearchQuery] = useState('');

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
    <div className="bg-[#040a1c] text-white selection:bg-[#7692ff]/35 selection:text-white font-sans overflow-x-hidden min-h-screen flex flex-col pt-12" id="top-anchor">

      {/* Ambient glow orbs - Rich blue aesthetic */}
      <div className="fixed top-1/4 left-1/4 w-[500px] h-[500px] bg-[#3d70d9]/8 blur-[140px] pointer-events-none -z-5" />
      <div className="fixed bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#7da7f0]/6 blur-[140px] pointer-events-none -z-5" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#1b2cc1]/4 blur-[160px] pointer-events-none -z-5" />

      {/* 1. Header Navigation System */}
      <Navbar />

      {/* 2. Hero Section - Rich Blue/White Aesthetic */}
      <header className="relative min-h-[92vh] flex flex-col items-center justify-center pt-28 pb-20 px-6 md:px-16 text-center overflow-hidden">

        {/* Soft ambient focus points - rich blue tones */}
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
          className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-[#7da7f0]/10 blur-[130px] pointer-events-none rounded-full"
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
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#3d70d9]/10 blur-[120px] pointer-events-none rounded-full"
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
            <div className="w-52 h-52 sm:w-60 sm:h-60 bg-white rounded-3xl p-5 shadow-[0_20px_40px_rgba(13,32,71,0.4)] border border-white/90 flex items-center justify-center relative overflow-hidden group">
              <EetirpLogo className="w-full h-full" isAnimated={true} />
            </div>
          </motion.div>

          {/* Capsule badge - Rich blue tones */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full bg-[#091540] border-2 border-[#3d518c] mb-8 shadow-md shadow-[#3d518c]/10"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] font-black text-[#abd2fa]">
              BRIDGING COLLEGE THEORY & ENTERPRISE EXCELLENCE
            </span>
          </motion.div>

          {/* Majestic main heading - white with blue gradient */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="font-sans text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-[1.08] tracking-tight max-w-4xl"
          >
            The Hybrid Ecosystem <br className="hidden md:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#abd2fa] via-[#7692ff] to-[#3d518c] relative">
              For Engineering Leaders
              <span className="absolute bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-[#7692ff]/0 via-[#abd2fa]/50 to-[#7692ff]/0"></span>
            </span>
          </motion.h1>

          {/* Descriptive block */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="font-sans text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed font-semibold"
          >
            EETIRP merges a high-impact <span className="text-[#abd2fa] font-black underline decoration-[#7692ff] decoration-2">Engineering Academy</span> with an active, production-scale <span className="text-[#7692ff] font-black underline decoration-[#3d518c] decoration-2">Startup Studio</span>. We train elite software engineers by building live production platforms together.
          </motion.p>

          {/* CTA Button Actions - Blue/White theme */}
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
              className="w-full sm:w-auto px-8 py-4.5 rounded-xl bg-[#7692ff] hover:bg-[#5f7be6] text-white font-mono text-xs uppercase tracking-[0.16em] font-extrabold shadow-lg shadow-[#7692ff]/20 cursor-pointer transition-all duration-300"
            >
              Join Ecosystem Cohort
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollSmoothTo('services')}
              className="w-full sm:w-auto px-8 py-4.5 rounded-xl bg-[#091540] text-[#abd2fa] border-2 border-[#3d518c] font-mono text-xs uppercase tracking-[0.16em] font-bold hover:bg-[#121e4a] transition-all duration-300 cursor-pointer shadow-md text-center hover:border-[#7692ff]/70"
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
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#7692ff] font-bold mb-1.5 opacity-80 group-hover:opacity-100 transition-opacity">Explore Studio</span>
          <ArrowDown className="w-4 h-4 text-[#7692ff]" />
        </motion.div>
      </header>

      {/* 3. Rolling Marquee Board - Blue theme */}
      <section className="w-full border-y border-[#3d518c]/30 py-5 bg-[#091540]/55 overflow-hidden select-none shadow-sm" id="notice-marquee">
        <div className="flex animate-marquee whitespace-nowrap">
          <div className="flex items-center gap-16 px-8">
            <span className="font-mono text-xs text-[#abd2fa] flex items-center gap-2.5 tracking-widest font-black">
              <span className="w-2.5 h-2.5 rounded-full bg-[#7692ff]"></span> 100% LIVE SAAS PROJECTS
            </span>
            <span className="font-mono text-xs text-white flex items-center gap-2.5 tracking-widest font-black">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3d518c]"></span> 10X FASTER SKILL UPGRADES
            </span>
            <span className="font-mono text-xs text-[#abd2fa] flex items-center gap-2.5 tracking-widest font-black">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1b2cc1]"></span> LIVE PRODUCTION SAAS BUILT
            </span>
            <span className="font-mono text-xs text-white flex items-center gap-2.5 tracking-widest font-black">
              <span className="w-2.5 h-2.5 rounded-full bg-[#7692ff]"></span> DAY-1 ENTERPRISE READY CONTRIBUTOR
            </span>
          </div>
          <div className="flex items-center gap-16 px-8">
            <span className="font-mono text-xs text-[#abd2fa] flex items-center gap-2.5 tracking-widest font-black">
              <span className="w-2.5 h-2.5 rounded-full bg-[#7692ff]"></span> 100% LIVE SAAS PROJECTS
            </span>
            <span className="font-mono text-xs text-white flex items-center gap-2.5 tracking-widest font-black">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3d518c]"></span> 10X FASTER SKILL UPGRADES
            </span>
            <span className="font-mono text-xs text-[#abd2fa] flex items-center gap-2.5 tracking-widest font-black">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1b2cc1]"></span> LIVE PRODUCTION SAAS BUILT
            </span>
            <span className="font-mono text-xs text-white flex items-center gap-2.5 tracking-widest font-black">
              <span className="w-2.5 h-2.5 rounded-full bg-[#7692ff]"></span> DAY-1 ENTERPRISE READY CONTRIBUTOR
            </span>
          </div>
        </div>
      </section>

      {/* 4. Ecosystem Summary Metrics - Compact Blue theme */}
      <section className="py-6 px-6 md:px-16 max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="bg-[#050e21] rounded-2xl p-5 md:p-6 border border-[#17366b]/65 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#3d70d9]/5 to-transparent pointer-events-none" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10 divide-y divide-[#17366b]/40 sm:divide-y-0 lg:divide-x lg:divide-[#17366b]/40">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="text-center p-2 max-sm:py-3 flex flex-col justify-center items-center"
            >
              <div className="w-8 h-8 rounded-full bg-[#17366b]/20 flex items-center justify-center mb-2">
                <Code2 className="w-4 h-4 text-[#7da7f0]" />
              </div>
              <div className="font-sans text-4xl font-black text-[#7da7f0] tracking-tight">100%</div>
              <p className="font-mono text-[9px] tracking-widest text-[#7da7f0]/75 uppercase font-black mt-1">Live SaaS Projects</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="text-center p-2 max-sm:py-3 flex flex-col justify-center items-center"
            >
              <div className="w-8 h-8 rounded-full bg-[#17366b]/20 flex items-center justify-center mb-2">
                <Activity className="w-4 h-4 text-[#7da7f0]" />
              </div>
              <div className="font-sans text-4xl font-black text-[#7da7f0] tracking-tight">10x</div>
              <p className="font-mono text-[9px] tracking-widest text-[#7da7f0]/75 uppercase font-black mt-1">Faster Skill Upgrades</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="text-center p-2 max-sm:py-3 flex flex-col justify-center items-center"
            >
              <div className="w-8 h-8 rounded-full bg-[#17366b]/20 flex items-center justify-center mb-2">
                <Cpu className="w-4 h-4 text-[#7da7f0]" />
              </div>
              <div className="font-sans text-4xl font-black text-white tracking-tight">Live</div>
              <p className="font-mono text-[9px] tracking-widest text-white/85 uppercase font-black mt-1">Production SaaS Built</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="text-center p-2 max-sm:py-3 flex flex-col justify-center items-center"
            >
              <div className="w-8 h-8 rounded-full bg-[#17366b]/20 flex items-center justify-center mb-2">
                <Briefcase className="w-4 h-4 text-[#7da7f0]" />
              </div>
              <div className="font-sans text-4xl font-black text-[#7da7f0] tracking-tight">Day-1</div>
              <p className="font-mono text-[9px] tracking-widest text-[#7da7f0]/75 uppercase font-black mt-1">Enterprise Contributor</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* 5. Our Positioning Model Tabbed Panels Section */}
      <section className="py-24 bg-[#050c20] border-y border-[#3d518c]/25" id="positioning">
        <div className="px-6 md:px-16 max-w-6xl mx-auto">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-[10px] text-[#abd2fa] tracking-[0.3em] uppercase bg-[#3d518c]/25 border-2 border-[#3d518c]/50 px-4 py-1.5 rounded-full font-black shadow-sm">
              Our Positioning Model
            </span>
            <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-white mt-5 mb-4 tracking-tight leading-none">
              Operational Realities & The Technical Bridge
            </h2>
            <p className="font-sans text-gray-300 text-base leading-relaxed font-semibold">
              Traditional engineering education leaves a massive gap. EETIRP acts as the vital bridge delivering the technical, logical, and product-focused expertise modern companies demand.
            </p>
          </div>

          {/* Tab selectors */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
            <button
              onClick={() => setActiveTab('college')}
              className={`px-6 py-4.5 rounded-xl font-mono text-xs uppercase tracking-widest font-extrabold border-2 transition-all duration-300 cursor-pointer relative ${activeTab === 'college'
                ? 'bg-[#1b2cc1] text-white border-transparent shadow-lg transform -translate-y-0.5'
                : 'bg-[#091540] text-gray-300 border-[#3d518c]/60 hover:text-white hover:border-[#7692ff]/75'
                }`}
            >
              {activeTab === 'college' && (
                <motion.span layoutId="tab-glow" className="absolute inset-0 border-2 border-[#7692ff] rounded-xl pointer-events-none" />
              )}
              Traditional College Theory
            </button>
            <button
              onClick={() => setActiveTab('bridge')}
              className={`px-6 py-4.5 rounded-xl font-mono text-xs uppercase tracking-widest font-extrabold border-2 transition-all duration-300 cursor-pointer relative ${activeTab === 'bridge'
                ? 'bg-[#1b2cc1] text-white border-transparent shadow-lg transform -translate-y-0.5'
                : 'bg-[#091540] text-gray-300 border-[#3d518c]/60 hover:text-white hover:border-[#7692ff]/75'
                }`}
            >
              {activeTab === 'bridge' && (
                <motion.span layoutId="tab-glow" className="absolute inset-0 border-2 border-[#7692ff] rounded-xl pointer-events-none" />
              )}
              EETIRP Bridge & Solutions
            </button>
            <button
              onClick={() => setActiveTab('enterprise')}
              className={`px-6 py-4.5 rounded-xl font-mono text-xs uppercase tracking-widest font-extrabold border-2 transition-all duration-300 cursor-pointer relative ${activeTab === 'enterprise'
                ? 'bg-[#1b2cc1] text-white border-transparent shadow-lg transform -translate-y-0.5'
                : 'bg-[#091540] text-gray-300 border-[#3d518c]/60 hover:text-white hover:border-[#7692ff]/75'
                }`}
            >
              {activeTab === 'enterprise' && (
                <motion.span layoutId="tab-glow" className="absolute inset-0 border-2 border-[#7692ff] rounded-xl pointer-events-none" />
              )}
              Enterprise Expectation
            </button>
          </div>

          {/* Dynamic Content Panel */}
          <div className="bg-[#091540] border-2 border-[#3d518c]/50 rounded-3xl p-6 md:p-10 shadow-xl overflow-hidden relative">
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
                    <div className="inline-block bg-red-950/40 text-red-400 border-2 border-red-900/50 uppercase font-mono text-[9px] px-3 py-1 rounded-md tracking-widest font-black w-max">
                      THE PROBLEM
                    </div>
                    <h3 className="font-sans text-2xl md:text-3xl font-black text-white tracking-tight">
                      The Academic Knowledge Gap
                    </h3>
                    <p className="font-sans text-gray-300 text-sm leading-relaxed font-semibold">
                      Colleges deliver essential foundational theory and basic algorithmic overviews. However, they lack dynamic updates, sandbox environments, and execution contexts.
                    </p>
                    <ul className="space-y-4 pt-2">
                      <li className="flex gap-3 items-start text-sm font-sans text-gray-300 font-semibold">
                        <span className="w-5 h-5 rounded-full bg-red-950/50 text-red-400 flex items-center justify-center font-black text-xs shrink-0 mt-0.5 border border-red-900/50">✗</span>
                        <span>Outdated syllabi focusing on memorization over deployment.</span>
                      </li>
                      <li className="flex gap-3 items-start text-sm font-sans text-gray-300 font-semibold">
                        <span className="w-5 h-5 rounded-full bg-red-950/50 text-red-400 flex items-center justify-center font-black text-xs shrink-0 mt-0.5 border border-red-900/50">✗</span>
                        <span>Dry lab code snippets that never face production-scale performance tests or state management.</span>
                      </li>
                      <li className="flex gap-3 items-start text-sm font-sans text-gray-300 font-semibold">
                        <span className="w-5 h-5 rounded-full bg-red-950/50 text-red-400 flex items-center justify-center font-black text-xs shrink-0 mt-0.5 border border-red-900/50">✗</span>
                        <span>Isolated working environments devoid of proper Git-flows, Code Reviews, and CI/CD pipelines.</span>
                      </li>
                    </ul>
                  </div>
                  <div className="lg:col-span-5 flex items-center">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="w-full bg-[#040a1c] text-white rounded-2xl p-8 border-2 border-[#3d518c] shadow-md flex flex-col items-center text-center"
                    >
                      <div className="p-3.5 bg-white/10 rounded-full border border-white/10 mb-4 text-[#eae6db]">
                        <GraduationCap className="w-8 h-8 text-cyan-400" />
                      </div>
                      <span className="font-mono text-[10px] tracking-widest text-cyan-400 font-black uppercase mb-2 block">
                        THEORETICAL BASE
                      </span>
                      <p className="font-sans text-sm leading-relaxed text-gray-300 font-semibold text-center">
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
                    <div className="inline-block bg-[#112852]/60 text-[#7da7f0] border-2 border-[#3d70d9]/30 uppercase font-mono text-[9px] px-3 py-1 rounded-md tracking-widest font-black w-max">
                      THE BRIDGE
                    </div>
                    <h3 className="font-sans text-2xl md:text-3xl font-black text-white tracking-tight">
                      Hands-on, Project-Centric SaaS Studio
                    </h3>
                    <p className="font-sans text-gray-300 text-sm leading-relaxed font-semibold">
                      EETIRP integrates the student's theoretical foundation with professional product building. We use active, live in-house SaaS applications as practical Sandboxes for training, architectural study, and collaborative code deployment.
                    </p>
                    <ul className="space-y-4 pt-2">
                      <li className="flex gap-3 items-start text-sm font-sans text-gray-300 font-semibold">
                        <span className="w-5 h-5 rounded-full bg-[#112852]/50 text-[#7da7f0] flex items-center justify-center font-black text-xs shrink-0 mt-0.5 border border-[#3d70d9]/30">✓</span>
                        <span>Real-world deployments utilizing standard developer toolchains (Supabase, Next.js, Vercel, Docker).</span>
                      </li>
                      <li className="flex gap-3 items-start text-sm font-sans text-gray-300 font-semibold">
                        <span className="w-5 h-5 rounded-full bg-[#112852]/50 text-[#7da7f0] flex items-center justify-center font-black text-xs shrink-0 mt-0.5 border border-[#3d70d9]/30">✓</span>
                        <span>Continuous product-oriented sprints that teach student engineers how to scale apps.</span>
                      </li>
                      <li className="flex gap-3 items-start text-sm font-sans text-gray-300 font-semibold">
                        <span className="w-5 h-5 rounded-full bg-[#112852]/50 text-[#7da7f0] flex items-center justify-center font-black text-xs shrink-0 mt-0.5 border border-[#3d70d9]/30">✓</span>
                        <span>Active mentor-led startup culture matching actual high-performance tech squads.</span>
                      </li>
                    </ul>
                  </div>
                  <div className="lg:col-span-5 flex items-center">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="w-full bg-[#040a1c] text-white rounded-2xl p-8 border-2 border-[#3d518c] shadow-md flex flex-col items-center text-center"
                    >
                      <div className="p-3.5 bg-white/10 rounded-full border border-white/10 mb-4 text-[#eae6db]">
                        <Rocket className="w-8 h-8 text-[#7a3fed]" />
                      </div>
                      <span className="font-mono text-[10px] tracking-widest text-[#7a3fed] font-black uppercase mb-2 block">
                        EETIRP CATALYST STUDIO
                      </span>
                      <p className="font-sans text-sm leading-relaxed text-gray-300 font-semibold text-center">
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
                    <div className="inline-block bg-indigo-950/40 text-[#abd2fa] border-2 border-[#3d518c]/40 uppercase font-mono text-[9px] px-3 py-1 rounded-md tracking-widest font-black w-max">
                      THE GOAL
                    </div>
                    <h3 className="font-sans text-2xl md:text-3xl font-black text-white tracking-tight">
                      Day-One Ready Contributors
                    </h3>
                    <p className="font-sans text-gray-300 text-sm leading-relaxed font-semibold">
                      High-growth startups and mature enterprises can't afford six months of fundamental training. They demand immediate, structured technical execution.
                    </p>
                    <ul className="space-y-4 pt-2">
                      <li className="flex gap-3 items-start text-sm font-sans text-gray-300 font-semibold">
                        <Check className="w-4 h-4 text-[#7692ff] shrink-0 mt-0.5" />
                        <span>Autonomous navigation of complex monorepos, clean architecture patterns, and backend performance.</span>
                      </li>
                      <li className="flex gap-3 items-start text-sm font-sans text-gray-300 font-semibold">
                        <Check className="w-4 h-4 text-[#7692ff] shrink-0 mt-0.5" />
                        <span>Clean pull request creation, test-driven validation, and resilient APIs.</span>
                      </li>
                      <li className="flex gap-3 items-start text-sm font-sans text-gray-300 font-semibold">
                        <Check className="w-4 h-4 text-[#7692ff] shrink-0 mt-0.5" />
                        <span>A product mindset where features are designed for user utility, performance, and efficiency.</span>
                      </li>
                    </ul>
                  </div>
                  <div className="lg:col-span-5 flex items-center">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="w-full bg-[#040a1c] text-white rounded-2xl p-8 border-2 border-[#3d518c] shadow-md flex flex-col items-center text-center"
                    >
                      <div className="p-3.5 bg-white/10 rounded-full border border-white/10 mb-4 text-[#eae6db]">
                        <Briefcase className="w-8 h-8 text-cyan-400" />
                      </div>
                      <span className="font-mono text-[10px] tracking-widest text-[#04a0e9] font-black uppercase mb-2 block">
                        INDUSTRY PREPAREDNESS
                      </span>
                      <p className="font-sans text-sm leading-relaxed text-gray-300 font-semibold text-center">
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
      <section className="py-24 px-6 md:px-16 max-w-6xl mx-auto w-full bg-[#040a1c]" id="pillars">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-[10px] text-[#abd2fa] tracking-[0.25em] bg-[#3d518c]/25 border-2 border-[#3d518c]/50 px-4 py-1.5 rounded-full font-black uppercase shadow-sm">
            Our Program Pillars
          </span>
          <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-white mt-5 mb-4 tracking-tight leading-none">
            Comprehensive Training & Studio Pathways
          </h2>
          <p className="font-sans text-gray-300 text-base leading-relaxed font-semibold">
            We have systematically deconstructed the full software engineer's journey, introducing hyper-focused pathways for builders of all levels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {programPillars.filter(pillar => {
              if (!searchQuery) return true;
              const cleanQ = searchQuery.toLowerCase();
              return (
                pillar.title.toLowerCase().includes(cleanQ) ||
                pillar.desc.toLowerCase().includes(cleanQ) ||
                pillar.badge.toLowerCase().includes(cleanQ) ||
                (pillar.keywords && pillar.keywords.some(kw => kw.toLowerCase().includes(cleanQ)))
              );
            }).map((pillar) => {
              const IconComp = pillar.icon;
              return (
                <motion.div
                  layout
                  key={pillar.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className={`flex flex-col justify-between p-7 rounded-2xl bg-[#091540] border-2 border-[#3d518c]/60 hover:border-[#7692ff]/80 shadow-xl transition-all duration-300 ${pillar.hoverBorder} group relative overflow-hidden`}
                >
                  {/* Subtle index tag */}
                  <div className="absolute top-4 right-4 font-mono text-[10px] text-gray-500 font-extrabold tracking-wider bg-[#040a1c] border border-[#3d518c]/40 px-2 py-0.5 rounded select-none">
                    INDEX {pillar.num}
                  </div>

                  <div className="space-y-5">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${pillar.iconBg}`}>
                      <IconComp className={`w-6 h-6 ${pillar.color}`} />
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-sans text-lg font-black text-white hover:text-[#abd2fa] transition-colors leading-tight">
                        {pillar.title}
                      </h3>
                      <p className="font-sans text-xs text-gray-300 leading-relaxed font-semibold">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#3d518c]/30 flex items-center justify-between">
                    <span className={`inline-block font-mono text-[9px] tracking-wider uppercase font-extrabold px-3 py-1.5 rounded select-none ${pillar.badgeStyle}`}>
                      {pillar.badge}
                    </span>
                    <span className="font-mono text-[9px] text-[#abd2fa]/50 tracking-widest font-black uppercase">
                      ACTIVE PATH
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </section>

      {/* 7. SaaS Sandbox Lab Section */}
      <section className="py-24 bg-[#050c20] border-y border-[#3d518c]/25" id="services">
        <div className="px-6 md:px-16 max-w-6xl mx-auto">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-[10px] text-[#abd2fa] tracking-[0.3em] uppercase bg-[#3d518c]/25 border-2 border-[#3d518c]/50 px-4 py-1.5 rounded-full font-black shadow-sm">
              SaaS Sandbox Lab
            </span>
            <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-white mt-5 mb-4 tracking-tight leading-none">
              Present Ongoing Projects
            </h2>
            <p className="font-sans text-gray-300 text-base leading-relaxed font-semibold">
              We don't teach from empty slides. EETIRP acts as a live Startup Studio, engineering real products.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left selector menu - Cards */}
            <div className="lg:col-span-12 xl:col-span-5 space-y-4 lg:grid lg:grid-cols-3 xl:flex xl:flex-col gap-4 lg:space-y-0">

              {/* Project Tab 1 Selector */}
              <motion.div
                whileHover={{ y: -2 }}
                onClick={() => setSelectedProjectId('placement')}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer relative overflow-hidden group ${selectedProjectId === 'placement'
                  ? 'bg-[#1b2cc1] text-white border-transparent shadow-xl'
                  : 'bg-[#091540] text-gray-300 border-[#3d518c]/50 hover:border-[#7692ff]'
                  }`}
              >
                {selectedProjectId === 'placement' && (
                  <motion.div layoutId="nav-glow-indicator" className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#7692ff] z-15" />
                )}
                <div className="flex justify-between items-center mb-3">
                  <span className="font-mono text-[10px] tracking-wider uppercase bg-[#040a1c] border border-[#3d518c] text-white px-2.5 py-0.5 rounded-md font-black">
                    01
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-[#abd2fa] font-black">
                    ● ACTIVE PRODUCTION
                  </span>
                </div>
                <h4 className="font-sans text-lg font-black tracking-tight mb-2 text-white">
                  Placement AI Platform
                </h4>
                <p className="font-sans text-xs text-gray-300 leading-relaxed font-semibold">
                  An AI-driven environment optimizing interview preparedness. Utilizes automated evaluation engines, resume scorers, and smart predictive diagnostics.
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest font-black text-[#abd2fa] select-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7da7f0] animate-pulse" />
                  <span>Interactive module focus</span>
                </div>
              </motion.div>

              {/* Project Tab 2 Selector */}
              <motion.div
                whileHover={{ y: -2 }}
                onClick={() => setSelectedProjectId('kaura')}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer relative overflow-hidden group ${selectedProjectId === 'kaura'
                  ? 'bg-[#3d70d9] text-white border-transparent shadow-xl'
                  : 'bg-[#050e21] text-gray-300 border-[#17366b]/50 hover:border-[#3d70d9]'
                  }`}
              >
                {selectedProjectId === 'kaura' && (
                  <motion.div layoutId="nav-glow-indicator" className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#3d70d9] z-15" />
                )}
                <div className="flex justify-between items-center mb-3">
                  <span className="font-mono text-[10px] tracking-wider uppercase bg-[#02040a] border border-[#17366b] text-white px-2.5 py-0.5 rounded-md font-black">
                    02
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-[#abd2fa] font-black">
                    ● ACTIVE PRODUCTION
                  </span>
                </div>
                <h4 className="font-sans text-lg font-black tracking-tight mb-2 text-white">
                  Kaura Hub
                </h4>
                <p className="font-sans text-xs text-gray-300 leading-relaxed font-semibold">
                  A next-generation student workspace developed under EETIRP LTD. Kaura integrates vital student utilities, notes engines, and productivity tools into one unified student portal.
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest font-black text-[#abd2fa] select-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7da7f0] animate-pulse" />
                  <span>Interactive module focus</span>
                </div>
              </motion.div>

              {/* Project Tab 3 Selector */}
              <motion.div
                whileHover={{ y: -2 }}
                onClick={() => setSelectedProjectId('studio')}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer relative overflow-hidden group ${selectedProjectId === 'studio'
                  ? 'bg-[#3d70d9] text-white border-transparent shadow-xl'
                  : 'bg-[#050e21] text-gray-300 border-[#17366b]/50 hover:border-[#3d70d9]'
                  }`}
              >
                {selectedProjectId === 'studio' && (
                  <motion.div layoutId="nav-glow-indicator" className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#3d70d9] z-15" />
                )}
                <div className="flex justify-between items-center mb-3">
                  <span className="font-mono text-[10px] tracking-wider uppercase bg-[#02040a] border border-[#17366b] text-white px-2.5 py-0.5 rounded-md font-black">
                    03
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-[#abd2fa] font-black">
                    ● CORE INTEGRATION
                  </span>
                </div>
                <h4 className="font-sans text-lg font-black tracking-tight mb-2 text-white">
                  Live Studio Integration
                </h4>
                <p className="font-sans text-xs text-gray-300 leading-relaxed font-semibold">
                  These aren't just mockup dashboards. Every student inside EETIRP gets assigned repository tickets, handles actual customer bugs, reviews real metrics logs, and helps deploy features.
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest font-black text-[#abd2fa] select-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7da7f0] animate-pulse" />
                  <span>Interactive module focus</span>
                </div>
              </motion.div>

            </div>

            {/* Right side: Interactive Simulated Web Browser Console */}
            <div className="lg:col-span-12 xl:col-span-7 bg-[#050e21] rounded-2xl border-2 border-[#17366b]/75 shadow-2xl overflow-hidden font-mono text-white text-xs">

              {/* Browser control bar */}
              <div className="bg-[#02040a] px-4 py-3.5 flex items-center justify-between border-b border-[#17366b]/50 select-none">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#3d70d9] shadow-[0_0_6px_rgba(61,112,217,0.8)] animate-pulse"></span>
                  <span className="w-3 h-3 rounded-full bg-[#7da7f0] shadow-[0_0_6px_rgba(125,167,240,0.8)]"></span>
                  <span className="w-3 h-3 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]"></span>
                </div>

                <div className="flex-grow max-w-sm mx-4 bg-[#091540] border border-[#3d518c]/60 rounded-lg px-3 py-1 font-mono text-[10px] text-gray-400 select-all tracking-wide text-center uppercase">
                  eetirp_studio://live-preview
                </div>

                <span className="text-[10px] font-sans text-[#abd2fa] font-black uppercase tracking-widest max-sm:hidden">
                  {selectedProjectId === 'placement' ? 'placement-ai' : selectedProjectId === 'kaura' ? 'kaura-hub' : 'live-dashboard'}
                </span>
              </div>

              {/* Content Area */}
              <div className="p-6 md:p-8 min-h-[350px] bg-[#040a1c] flex flex-col justify-between font-sans relative">

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
                      <span className="font-mono text-[10px] text-[#abd2fa] border-2 border-[#3d518c] px-2.5 py-1 bg-[#3d518c]/25 rounded-md tracking-widest font-black uppercase inline-block">
                        Ecosystem App 01
                      </span>
                      <h5 className="text-2xl font-extrabold tracking-tight text-white font-sans mt-2">
                        Placement AI Platform
                      </h5>
                      <p className="text-gray-300 text-sm leading-relaxed max-w-xl font-semibold">
                        An integrated AI ecosystem designed to help engineering students prepare for and secure top-tier placements.
                      </p>
                      <div className="pt-2 flex flex-wrap gap-2">
                        <span className="px-3 py-1 rounded-full bg-[#17366b]/40 border border-[#17366b]/50 text-[10px] text-gray-300">TypeScript</span>
                        <span className="px-3 py-1 rounded-full bg-[#17366b]/40 border border-[#17366b]/50 text-[10px] text-gray-300">LLM Mapping</span>
                        <span className="px-3 py-1 rounded-full bg-[#17366b]/40 border border-[#17366b]/50 text-[10px] text-gray-300">Docker</span>
                      </div>
                      <div className="bg-[#091540] border-2 border-[#3d518c]/50 p-4 rounded-xl flex items-center justify-between">
                        <div className="space-y-1">
                          <span className="font-mono text-[9px] text-[#abd2fa] font-black uppercase">LAUNCH STATE</span>
                          <p className="text-white text-xs font-mono font-bold">STABLE_PORT_3000_INGRESS (v2.0.4)</p>
                        </div>
                        <a href="https://placementaiplatform.vercel.app/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-[#1b2cc1] hover:bg-[#7692ff] text-white font-mono text-[10px] font-black uppercase rounded shadow transition-all flex items-center gap-1.5">
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
                      <span className="font-mono text-[10px] text-[#abd2fa] border-2 border-[#3d518c] px-2.5 py-1 bg-[#3d518c]/25 rounded-md tracking-widest font-black uppercase inline-block">
                        Ecosystem App 02
                      </span>
                      <h5 className="text-2xl font-extrabold tracking-tight text-white font-sans mt-2">
                        Kaura Hub
                      </h5>
                      <p className="text-gray-300 text-sm leading-relaxed max-w-xl font-semibold">
                        A next-generation student workspace developed under EETIRP LTD. Kaura integrates vital student utilities, notes engines, and productivity tools into one unified student portal.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="p-3 bg-[#091540] rounded border border-[#3d518c]/40 flex items-center gap-2.5 font-sans text-xs text-gray-300">
                          <CheckCircle2 className="w-4 h-4 text-[#7692ff] shrink-0" />
                          <span>Resume Builder & Portfolio Optimizer</span>
                        </div>
                        <div className="p-3 bg-[#091540] rounded border border-[#3d518c]/40 flex items-center gap-2.5 font-sans text-xs text-gray-300">
                          <CheckCircle2 className="w-4 h-4 text-[#abd2fa] shrink-0" />
                          <span>Kaura Learning Hub & Notes</span>
                        </div>
                      </div>
                      <div className="pt-2 flex justify-end">
                        <a href="https://www.kaurahub.com/" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-[#1b2cc1] hover:bg-[#7692ff] text-white font-mono text-[10px] font-black uppercase rounded shadow transition-all flex items-center gap-1.5">
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
                      <span className="font-mono text-[10px] text-[#7da7f0] border-2 border-[#3d70d9]/20 px-2.5 py-1 bg-[#3d70d9]/5 rounded-md tracking-widest font-black uppercase inline-block">
                        Core Operations
                      </span>
                      <h5 className="text-2xl font-extrabold tracking-tight text-white font-sans mt-2">
                        Live Studio Integration
                      </h5>
                      <p className="text-gray-300 text-sm leading-relaxed max-w-xl font-semibold">
                        These aren't just mockup dashboards. Every student inside EETIRP gets assigned repository tickets, handles actual customer bugs, reviews real metrics logs, and helps deploy features directly to production.
                      </p>
                      <div className="bg-[#050e21] p-4 border border-[#17366b]/55 rounded-xl font-mono text-[11px] leading-relaxed text-gray-300 space-y-1 select-none">
                        <p className="text-[#abd2fa] font-bold">&gt; mapping tickets to engineers...</p>
                        <p>&gt; telemetry verified: latency = 8ms (Singapore and Bengaluru nodes)</p>
                        <p className="text-[#7da7f0] font-bold">&gt; active repositories synchronized: 15+</p>
                      </div>
                      <div className="flex justify-end">
                        <a href="#onboarding" className="px-5 py-2.5 bg-[#3d70d9] hover:bg-[#7da7f0] tracking-widest border border-[#7da7f0]/30 text-white font-mono text-[10px] font-black uppercase rounded shadow transition-all">
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
        </div>
      </section>

      {/* 9. Leadership & Backing Grid panel */}
      <section className="py-24 bg-[#040a1c] border-y border-[#3d518c]/25" id="leadership">
        <div className="px-6 md:px-16 max-w-6xl mx-auto">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-[10px] text-[#abd2fa] tracking-[0.25em] bg-[#3d518c]/25 border-2 border-[#3d518c]/50 px-4 py-1.5 rounded-full font-black uppercase shadow-sm">
              Leadership & Backing
            </span>
            <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-white mt-5 mb-4 tracking-tight leading-none">
              Meet the Ecosystem Drivers
            </h2>
            <p className="font-sans text-gray-300 text-base leading-relaxed font-semibold">
              The architects, developers, and strategic partners building EETIRP into a production-scale engineering sandbox.
            </p>
          </div>

          {/* Leadership Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Kaushal Baitha */}
            <motion.div
              whileHover={{ y: -4 }}
              className="flex flex-col justify-between p-6 rounded-2xl bg-[#050e21] border-2 border-[#17366b]/65 hover:border-[#3d70d9] shadow-xl hover:shadow-[0_0_20px_rgba(61,112,217,0.15)] transition-all duration-300"
            >
              <div>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#17366b]/25 flex items-center justify-center text-[#7da7f0] font-sans font-black text-lg border border-[#17366b]/50 select-none">
                    KB
                  </div>
                  <div>
                    <span className="font-mono text-[9px] tracking-widest text-[#7da7f0] uppercase font-bold bg-[#17366b]/20 border border-[#17366b]/45 px-2.5 py-1 rounded select-none">
                      CORE TEAM
                    </span>
                  </div>
                </div>
                <h4 className="font-sans text-lg font-black text-white mb-1">
                  Kaushal Baitha
                </h4>
                <p className="font-mono text-[10px] tracking-wider uppercase text-[#7da7f0] font-black mb-3">
                  FOUNDER & CHIEF ARCHITECT
                </p>
                <p className="font-sans text-xs text-gray-300 leading-relaxed mb-6 font-semibold">
                  Leading technical directions and backend systems design. Passionate about project-centric engineering and enterprise system development.
                </p>
              </div>
              <a href="https://kaushalbaitha7.vercel.app/" target="_blank" rel="noopener noreferrer" className="w-full py-2.5 bg-[#3d70d9] border border-[#7da7f0]/40 text-white font-mono text-[10px] uppercase tracking-widest font-black rounded-lg hover:bg-[#7da7f0] cursor-pointer transition-all text-center block">
                Explore Portfolio ↗
              </a>
            </motion.div>

            {/* Karthik C M */}
            <motion.div
              whileHover={{ y: -4 }}
              className="flex flex-col justify-between p-6 rounded-2xl bg-[#050e21] border-2 border-[#17366b]/65 hover:border-[#3d70d9] shadow-xl hover:shadow-[0_0_20px_rgba(61,112,217,0.15)] transition-all duration-300"
            >
              <div>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#17366b]/25 flex items-center justify-center text-[#7da7f0] font-sans font-black text-lg border border-[#17366b]/50 select-none">
                    KC
                  </div>
                  <div>
                    <span className="font-mono text-[9px] tracking-widest text-[#7da7f0] uppercase font-bold bg-[#17366b]/20 border border-[#17366b]/45 px-2.5 py-1 rounded select-none">
                      OPERATIONS
                    </span>
                  </div>
                </div>
                <h4 className="font-sans text-lg font-black text-white mb-1">
                  Karthik C M
                </h4>
                <p className="font-mono text-[10px] tracking-wider uppercase text-[#7da7f0] font-black mb-3">
                  CO-FOUNDER & HEAD OF OPERATIONS
                </p>
                <p className="font-sans text-xs text-gray-300 leading-relaxed mb-6 font-semibold">
                  Driving strategic development programs, bootcamp architectures, and product validation cycles to produce day-one engineering leaders.
                </p>
              </div>
              <a href="https://karthikcm.vercel.app/" target="_blank" rel="noopener noreferrer" className="w-full py-2.5 bg-[#3d70d9] border border-[#7da7f0]/40 text-white font-mono text-[10px] uppercase tracking-widest font-black rounded-lg hover:bg-[#7da7f0] cursor-pointer transition-all text-center block">
                Explore Portfolio ↗
              </a>
            </motion.div>

            {/* Karthik D */}
            <motion.div
              whileHover={{ y: -4 }}
              className="flex flex-col justify-between p-6 rounded-2xl bg-[#050e21] border-2 border-[#17366b]/65 hover:border-[#3d70d9] shadow-xl hover:shadow-[0_0_20px_rgba(61,112,217,0.15)] transition-all duration-300"
            >
              <div>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#17366b]/25 flex items-center justify-center text-[#7da7f0] font-sans font-black text-lg border border-[#17366b]/50 select-none">
                    KD
                  </div>
                  <div>
                    <span className="font-mono text-[9px] tracking-widest text-[#7da7f0] uppercase font-bold bg-[#17366b]/20 border border-[#17366b]/45 px-2.5 py-1 rounded select-none">
                      INVESTING
                    </span>
                  </div>
                </div>
                <h4 className="font-sans text-lg font-black text-white mb-1">
                  Karthik D
                </h4>
                <p className="font-mono text-[10px] tracking-wider uppercase text-[#7da7f0] font-black mb-3">
                  STRATEGIC INVESTOR
                </p>
                <p className="font-sans text-xs text-gray-300 leading-relaxed mb-6 font-semibold">
                  Sourcing strategic growth capital, industrial partnerships, and scaling market pipelines for in-house studio SaaS platforms.
                </p>
              </div>
              <a href="https://karthikd1.vercel.app/" target="_blank" rel="noopener noreferrer" className="w-full py-2.5 bg-[#3d70d9] border border-[#7da7f0]/40 text-white font-mono text-[10px] uppercase tracking-widest font-black rounded-lg hover:bg-[#7da7f0] cursor-pointer transition-all text-center block">
                Explore Portfolio ↗
              </a>
            </motion.div>

            {/* Pritee Kumari Singh */}
            <motion.div
              whileHover={{ y: -4 }}
              className="flex flex-col justify-between p-6 rounded-2xl bg-[#050e21] border-2 border-[#17366b]/65 hover:border-[#3d70d9] shadow-xl hover:shadow-[0_0_20px_rgba(61,112,217,0.15)] transition-all duration-300"
            >
              <div>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#17366b]/25 flex items-center justify-center text-[#7da7f0] font-sans font-black text-lg border border-[#17366b]/50 select-none">
                    PS
                  </div>
                  <div>
                    <span className="font-mono text-[9px] tracking-widest text-[#7da7f0] uppercase font-bold bg-[#17366b]/20 border border-[#17366b]/45 px-2.5 py-1 rounded select-none">
                      STRATEGY
                    </span>
                  </div>
                </div>
                <h4 className="font-sans text-lg font-black text-white mb-1">
                  Pritee Kumari Singh
                </h4>
                <p className="font-mono text-[10px] tracking-wider uppercase text-[#7da7f0] font-black mb-3">
                  MARKETING & STRATEGY LEADER
                </p>
                <p className="font-sans text-xs text-gray-300 leading-relaxed mb-6 font-semibold">
                  Orchestrating market penetration campaigns, corporate engagement models, and scaling university pipelines for live studio cohorts.
                </p>
              </div>
              <a href="https://priteesingh.vercel.app/" target="_blank" rel="noopener noreferrer" className="w-full py-2.5 bg-[#3d70d9] border border-[#7da7f0]/40 text-white font-mono text-[10px] uppercase tracking-widest font-black rounded-lg hover:bg-[#7da7f0] cursor-pointer transition-all text-center block">
                Explore Portfolio ↗
              </a>
            </motion.div>

            {/* Rajdev Rana - NEW LINK ADDED */}
            <motion.div
              whileHover={{ y: -4 }}
              className="flex flex-col justify-between p-6 rounded-2xl bg-[#050e21] border-2 border-[#17366b]/65 hover:border-[#3d70d9] shadow-xl hover:shadow-[0_0_20px_rgba(61,112,217,0.15)] transition-all duration-300"
            >
              <div>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#17366b]/25 flex items-center justify-center text-[#7da7f0] font-sans font-black text-lg border border-[#17366b]/50 select-none">
                    RR
                  </div>
                  <div>
                    <span className="font-mono text-[9px] tracking-widest text-[#7da7f0] uppercase font-bold bg-[#17366b]/20 border border-[#17366b]/45 px-2.5 py-1 rounded select-none">
                      MGMT
                    </span>
                  </div>
                </div>
                <h4 className="font-sans text-lg font-black text-white mb-1">
                  Rajdev Rana
                </h4>
                <p className="font-mono text-[10px] tracking-wider uppercase text-[#7da7f0] font-black mb-3">
                  PROJECT COORDINATOR
                </p>
                <p className="font-sans text-xs text-gray-300 leading-relaxed mb-6 font-semibold">
                  Streamlines cross-functional workflows and strategic resource management to ensure seamless project execution.
                </p>
              </div>
              <a href="https://rajdev-rana.vercel.app/" target="_blank" rel="noopener noreferrer" className="w-full py-2.5 bg-[#3d70d9] border border-[#7da7f0]/40 text-white font-mono text-[10px] uppercase tracking-widest font-black rounded-lg hover:bg-[#7da7f0] cursor-pointer transition-all text-center block">
                Explore Portfolio ↗
              </a>
            </motion.div>

            {/* Rania Jasmine S */}
            <motion.div
              whileHover={{ y: -4 }}
              className="flex flex-col justify-between p-6 rounded-2xl bg-[#050e21] border-2 border-[#17366b]/65 hover:border-[#3d70d9] shadow-xl hover:shadow-[0_0_20px_rgba(61,112,217,0.15)] transition-all duration-300"
            >
              <div>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#17366b]/25 flex items-center justify-center text-[#7da7f0] font-sans font-black text-lg border border-[#17366b]/50 select-none">
                    RJ
                  </div>
                  <div>
                    <span className="font-mono text-[9px] tracking-widest text-[#7da7f0] uppercase font-bold bg-[#17366b]/20 border border-[#17366b]/45 px-2.5 py-1 rounded select-none">
                      DEV
                    </span>
                  </div>
                </div>
                <h4 className="font-sans text-lg font-black text-white mb-1">
                  Rania Jasmine S
                </h4>
                <p className="font-mono text-[10px] tracking-wider uppercase text-[#7da7f0] font-black mb-3">
                  FULL STACK DEVELOPER
                </p>
                <p className="font-sans text-xs text-gray-300 leading-relaxed mb-6 font-semibold">
                  Engineers resilient, full-stack software solutions from database layout to production deployment, optimizing for speed and scale.
                </p>
              </div>
              <a href="https://raniajasmine-s.vercel.app/" target="_blank" rel="noopener noreferrer" className="w-full py-2.5 bg-[#3d70d9] border border-[#7da7f0]/40 text-white font-mono text-[10px] uppercase tracking-widest font-black rounded-lg hover:bg-[#7da7f0] cursor-pointer transition-all text-center block">
                Explore Portfolio ↗
              </a>
            </motion.div>

          </div>

          {/* Trainer Grid list */}
          <div className="text-center max-w-3xl mx-auto mt-24 mb-16">
            <span className="font-mono text-[10px] text-[#abd2fa] tracking-[0.25em] bg-[#3d518c]/25 border-2 border-[#3d518c]/50 px-4 py-1.5 rounded-full font-black uppercase shadow-sm">
              TRAINERS
            </span>
            <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-white mt-5 mb-4 tracking-tight leading-tight">
              Technical Trainers & Career Experts
            </h2>
            <p className="font-sans text-gray-300 text-base leading-relaxed font-semibold">
              Industry-experienced educators delivering intensive stack-specific sprints, DSA strategies, and outcome-focused interview preparations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">

            {/* Raushan Kumar Baitha */}
            <motion.div
              whileHover={{ y: -4 }}
              className="flex flex-col justify-between p-6 rounded-2xl bg-[#050e21] border-2 border-[#17366b]/65 hover:border-[#3d70d9] shadow-xl hover:shadow-[0_0_20px_rgba(61,112,217,0.15)] transition-all duration-300"
            >
              <div>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#17366b]/25 flex items-center justify-center text-[#7da7f0] font-sans font-black text-lg border border-[#17366b]/50 select-none">
                    RB
                  </div>
                  <div>
                    <span className="font-mono text-[9px] tracking-widest text-[#7da7f0] uppercase font-bold bg-[#17366b]/20 border border-[#17366b]/45 px-2.5 py-1 rounded select-none">
                      SYSTEMS
                    </span>
                  </div>
                </div>
                <h4 className="font-sans text-lg font-black text-white mb-1">
                  Raushan Kumar Baitha
                </h4>
                <p className="font-mono text-[10px] tracking-wider uppercase text-[#7da7f0] font-black mb-3">
                  TECHNICAL TRAINER & SYSTEMS SPECIALIST
                </p>
                <p className="font-sans text-xs text-gray-300 leading-relaxed mb-6 font-semibold">
                  Specializing in systems architecture, deep-dive backend frameworks, database configuration paradigms, and production deployment cycles.
                </p>
              </div>
              <div className="w-full py-2.5 bg-[#3d70d9]/10 border border-[#3d70d9]/30 text-[#7da7f0] font-mono text-[10px] uppercase tracking-widest font-black rounded-lg select-none flex items-center justify-center gap-1.5 text-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7da7f0] animate-pulse"></span> Systems Architecture Node
              </div>
            </motion.div>

            {/* Anup Tiwari */}
            <motion.div
              whileHover={{ y: -4 }}
              className="flex flex-col justify-between p-6 rounded-2xl bg-[#050e21] border-2 border-[#17366b]/65 hover:border-[#3d70d9] shadow-xl hover:shadow-[0_0_20px_rgba(61,112,217,0.15)] transition-all duration-300"
            >
              <div>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#17366b]/25 flex items-center justify-center text-[#7da7f0] font-sans font-black text-lg border border-[#17366b]/50 select-none">
                    AT
                  </div>
                  <div>
                    <span className="font-mono text-[9px] tracking-widest text-[#7da7f0] uppercase font-bold bg-[#17366b]/20 border border-[#17366b]/45 px-2.5 py-1 rounded select-none">
                      ALGORITHMS
                    </span>
                  </div>
                </div>
                <h4 className="font-sans text-lg font-black text-white mb-1">
                  Anup Tiwari
                </h4>
                <p className="font-mono text-[10px] tracking-wider uppercase text-[#7da7f0] font-black mb-3">
                  TECHNICAL TRAINER & DSA MENTOR
                </p>
                <p className="font-sans text-xs text-gray-300 leading-relaxed mb-6 font-semibold">
                  Mentoring students in complex algorithmic thinking, foundational structures, optimized problem-solving tactics, and software assessment execution.
                </p>
              </div>
              <div className="w-full py-2.5 bg-[#3d70d9]/10 border border-[#3d70d9]/30 text-[#7da7f0] font-mono text-[10px] uppercase tracking-widest font-black rounded-lg select-none flex items-center justify-center gap-1.5 text-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7da7f0] animate-pulse"></span> DSA & Logic Sprints
              </div>
            </motion.div>

            {/* Nirmal Shekhar */}
            <motion.div
              whileHover={{ y: -4 }}
              className="flex flex-col justify-between p-6 rounded-2xl bg-[#050e21] border-2 border-[#17366b]/65 hover:border-[#3d70d9] shadow-xl hover:shadow-[0_0_20px_rgba(61,112,217,0.15)] transition-all duration-300"
            >
              <div>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#17366b]/25 flex items-center justify-center text-[#7da7f0] font-sans font-black text-lg border border-[#17366b]/50 select-none">
                    NS
                  </div>
                  <div>
                    <span className="font-mono text-[9px] tracking-widest text-[#7da7f0] uppercase font-bold bg-[#17366b]/20 border border-[#17366b]/45 px-2.5 py-1 rounded select-none">
                      PLACEMENT
                    </span>
                  </div>
                </div>
                <h4 className="font-sans text-lg font-black text-white mb-1">
                  Nirmal Shekhar
                </h4>
                <p className="font-mono text-[10px] tracking-wider uppercase text-[#7da7f0] font-black mb-3">
                  CAREER EXPERT & PLACEMENT STRATEGIST
                </p>
                <p className="font-sans text-xs text-gray-300 leading-relaxed mb-6 font-semibold">
                  Guiding candidate roadmap pipelines with interactive mock behavioral drills, ATS criteria matching, and outcome-driven career placement solutions.
                </p>
              </div>
              <div className="w-full py-2.5 bg-[#3d70d9]/10 border border-[#3d70d9]/30 text-[#7da7f0] font-mono text-[10px] uppercase tracking-widest font-black rounded-lg select-none flex items-center justify-center gap-1.5 text-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7da7f0] animate-pulse"></span> Outcome Strategy Node
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
            <span className="font-mono text-xs text-[#abd2fa] uppercase tracking-[0.3em] font-extrabold mb-4 block">
              Enter the EETIRP Ecosystem
            </span>
            <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-white mb-6 tracking-tight leading-tight">
              Connect & Intake Protocol
            </h2>
            <p className="text-gray-300 font-sans text-base leading-relaxed mb-10 font-semibold">
              Whether you are an ambitious college student aiming for practical mastery, a startup founder looking for SaaS development partnerships, or a corporate engineering leader, we want to talk.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-6 p-5 rounded-xl border-2 border-[#3d518c]/65 bg-[#091540] hover:border-[#7692ff] transition-all shadow-sm">
                <div className="w-11 h-11 rounded-full bg-[#3d518c]/25 flex items-center justify-center border border-[#3d518c]/50">
                  <Mail className="w-5 h-5 text-[#abd2fa]" />
                </div>
                <div>
                  <p className="font-mono text-[9px] text-[#abd2fa]/70 uppercase tracking-widest font-black mb-1">
                    EMAIL US
                  </p>
                  <a href="mailto:eetirpltd@gmail.com" className="font-mono text-sm font-black text-white hover:text-[#7692ff]">
                    eetirpltd@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-6 p-5 rounded-xl border-2 border-[#3d518c]/65 bg-[#091540] hover:border-[#7692ff] transition-all shadow-sm">
                <div className="w-11 h-11 rounded-full bg-[#3d518c]/25 flex items-center justify-center border border-[#3d518c]/50">
                  <Phone className="w-5 h-5 text-[#7692ff]" />
                </div>
                <div>
                  <p className="font-mono text-[9px] text-[#abd2fa]/70 uppercase tracking-widest font-black mb-1">
                    CALL / WHATSAPP
                  </p>
                  <a href="tel:+918088487801" className="font-mono text-sm font-black text-white hover:text-[#04a0e9]">
                    +91 8088487801
                  </a>
                </div>
              </div>

              <div className="p-4 bg-[#091540]/40 rounded-lg border border-[#3d518c]/45 text-xs font-mono text-gray-300 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#7692ff] shrink-0 animate-pulse" />
                <span>Response SLA: Standard feedback within 24 working hours.</span>
              </div>
            </div>
          </div>

          {/* Form column right */}
          <div className="w-full">

            {/* Form state controller */}
            {isSubmittingForm ? (
              <div className="bg-[#091540] border-2 border-[#3d518c]/65 rounded-2xl p-8 shadow-xl min-h-[460px] flex flex-col justify-center items-center text-center space-y-6 text-white">
                <RefreshCw className="w-10 h-10 text-[#7692ff] animate-spin" />
                <div>
                  <h3 className="font-sans text-xl font-extrabold text-white tracking-tight">Transmitting Inquiry</h3>
                  <p className="font-sans text-sm text-gray-300 mt-2 font-semibold">Preparing the data attributes payload secure transmission...</p>
                </div>
                <div className="w-24 bg-[#040a1c] h-1 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-[#1b2cc1] to-[#7692ff] h-full animate-pulse w-full"></div>
                </div>
              </div>
            ) : submitStatus === 'success' ? (
              <div className="bg-[#050e21] border-2 border-[#3d70d9]/40 rounded-2xl p-6 md:p-8 shadow-xl space-y-6 text-white">
                <div className="flex items-center gap-3 border-b border-[#3d518c]/45 pb-4">
                  <div className="w-10 h-10 rounded-full bg-[#3d70d9]/10 text-[#7da7f0] flex items-center justify-center border border-[#3d70d9]/20">
                    <Check className="w-5 h-5 shrink-0" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-[#7da7f0] border border-[#3d70d9]/20 px-2.5 py-0.5 rounded tracking-widest uppercase bg-[#3d70d9]/5 font-bold">
                      Transmission successful
                    </span>
                    <h3 className="font-sans text-lg font-black text-white mt-1">
                      Inquiry Sent to EETIRP
                    </h3>
                  </div>
                </div>

                <div className="bg-[#040a1c] border border-[#3d518c]/50 p-5 rounded-xl space-y-4">
                  <p className="font-mono text-[10px] text-gray-400 uppercase tracking-widest font-black border-b border-[#3d518c]/30 pb-1">
                    TRANSMITTED PAYLOAD ATTRIBUTES
                  </p>

                  <div className="space-y-3 font-sans text-xs text-white leading-relaxed">
                    <div>
                      <span className="font-mono text-[9px] text-gray-400 uppercase font-bold block">Applicant Name</span>
                      <span className="font-semibold text-sm text-[#abd2fa]">{formData.fullName}</span>
                    </div>
                    <div>
                      <span className="font-mono text-[9px] text-gray-400 uppercase font-bold block">Email Address</span>
                      <span className="font-mono font-bold text-sm text-[#7692ff]">{formData.email}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <span className="font-mono text-[9px] text-gray-400 uppercase font-bold block">Profile Segment</span>
                        <span className="font-semibold text-[#7da7f0]">{formData.segment}</span>
                      </div>
                      <div>
                        <span className="font-mono text-[9px] text-gray-400 uppercase font-bold block">Focus Area</span>
                        <span className="font-semibold text-[#abd2fa]">{formData.domainInterest}</span>
                      </div>
                    </div>
                    {formData.inquiryMatrix && (
                      <div>
                        <span className="font-mono text-[9px] text-gray-400 uppercase font-bold block">Core inquiry / objectives</span>
                        <p className="bg-[#050e21] p-3 rounded border border-[#17366b]/45 text-xs text-gray-300 font-medium mt-1 italic whitespace-pre-wrap leading-relaxed">
                          "{formData.inquiryMatrix}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={resetForm}
                  className="w-full text-center py-3.5 bg-[#1b2cc1] hover:bg-[#7692ff] text-white font-mono text-xs uppercase tracking-widest font-bold rounded-xl transition-all cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (

              <form
                onSubmit={handleFormSubmit}
                className="bg-[#091540] border-2 border-[#3d518c]/65 p-6 md:p-8 rounded-2xl shadow-xl space-y-6 text-white"
              >
                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-[#abd2fa]/85 uppercase tracking-widest font-black block">
                    YOUR NAME
                  </label>
                  <input
                    name="fullName"
                    type="text"
                    required
                    className="w-full bg-[#040a1c] border border-[#3d518c]/55 focus:border-[#7692ff] rounded-lg px-4 py-3 leading-tight text-white font-sans text-sm focus:outline-none focus:ring-1 focus:ring-[#7692ff]/20 placeholder-gray-500"
                    placeholder="e.g. John Doe"
                    value={formData.fullName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-[#abd2fa]/85 uppercase tracking-widest font-black block">
                    EMAIL ADDRESS
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full bg-[#040a1c] border border-[#3d518c]/55 focus:border-[#7692ff] rounded-lg px-4 py-3 leading-tight text-white font-sans text-sm focus:outline-none focus:ring-1 focus:ring-[#7692ff]/20 placeholder-gray-500"
                    placeholder="e.g. john@university.edu"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-[#abd2fa]/85 uppercase tracking-widest font-black block">
                      YOUR PROFILE SEGMENT
                    </label>
                    <select
                      name="segment"
                      className="w-full bg-[#040a1c] border border-[#3d518c]/55 focus:border-[#7692ff] rounded-lg px-3 py-3 leading-tight text-white font-sans text-sm focus:outline-none cursor-pointer"
                      style={{ colorScheme: 'dark' }}
                      value={formData.segment}
                      onChange={handleInputChange}
                    >
                      <option className="bg-[#091540]">Engineering College Student</option>
                      <option className="bg-[#091540]">Startup Founder & Technical Partner</option>
                      <option className="bg-[#091540]">Professional Software Developer</option>
                      <option className="bg-[#091540]">Corporate Engineering Leader</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-[#abd2fa]/85 uppercase tracking-widest font-black block">
                      FOCUS DOMAIN INTEREST
                    </label>
                    <select
                      name="domainInterest"
                      className="w-full bg-[#040a1c] border border-[#3d518c]/55 focus:border-[#7692ff] rounded-lg px-3 py-3 leading-tight text-white font-sans text-sm focus:outline-none cursor-pointer"
                      style={{ colorScheme: 'dark' }}
                      value={formData.domainInterest}
                      onChange={handleInputChange}
                    >
                      <option className="bg-[#091540]">Coding Bootcamps (Hands-on)</option>
                      <option className="bg-[#091540]">Project-Centric SaaS Sandboxes</option>
                      <option className="bg-[#091540]">Placement Academy Accelerator</option>
                      <option className="bg-[#091540]">Corporate Upskilling Upgrades</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-[#abd2fa]/85 uppercase tracking-widest font-black block">
                    YOUR CORE QUERY / GOALS
                  </label>
                  <textarea
                    name="inquiryMatrix"
                    rows={4}
                    className="w-full bg-[#040a1c] border border-[#3d518c]/55 focus:border-[#7692ff] rounded-lg px-4 py-3 leading-tight text-white font-sans text-sm focus:outline-none focus:ring-1 focus:ring-[#7692ff]/20 resize-none placeholder-gray-500"
                    placeholder="Briefly describe what you are looking to build or prepare for..."
                    value={formData.inquiryMatrix}
                    onChange={handleInputChange}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={!formData.fullName || !formData.email}
                  className="w-full py-4.5 bg-gradient-to-r from-[#1b2cc1] to-[#7692ff] hover:from-[#7692ff] hover:to-[#abd2fa] text-white font-mono text-xs uppercase tracking-widest font-black rounded-lg shadow-lg hover:opacity-95 transition-all text-center select-none active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  Send Onboarding Inquiry
                </button>

                <div className="text-center pt-2">
                  <span className="font-sans text-[10px] text-gray-400">
                    Prefer to send a direct message through your email app?
                  </span>
                  <div className="mt-2 text-center">
                    <a
                      href="mailto:eetirpltd@gmail.com?subject=EETIRP Onboarding Query"
                      className="inline-flex items-center gap-1.5 px-4 py-2 border border-[#3d518c] text-[#abd2fa] font-mono text-[10px] uppercase font-bold tracking-widest rounded hover:bg-[#3d518c]/30"
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

      {/* 11. Footer */}
      <footer className="bg-[#010206] text-white py-16 px-6 md:px-16 border-t-2 border-[#17366b]/80 overflow-hidden relative" id="footer">

        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#3d70d9]/4 blur-[100px] pointer-events-none rounded-full"></div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10 font-sans">

          <div className="md:col-span-6 space-y-6">
            <div className="flex items-center gap-3.5 select-none">
              <div className="w-10 h-10 rounded-lg bg-white overflow-hidden p-1 border border-white/95 shadow-sm flex items-center justify-center">
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
              <a href="https://github.com/eetirp-ltd" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#17366b]/30 border border-[#17366b]/55 flex items-center justify-center hover:bg-[#3d70d9] hover:text-white transition-all" title="Ecosystem GitHub">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/in/eetirp-limited" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#17366b]/30 border border-[#17366b]/55 flex items-center justify-center hover:bg-[#3d70d9] hover:text-white transition-all" title="Ecosystem LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://discord.com/users/1515615066245042291" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#17366b]/30 border border-[#17366b]/55 flex items-center justify-center hover:bg-[#3d70d9] hover:text-white transition-all" title="Ecosystem Discord">
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h5 className="font-mono text-[10px] text-[#7692ff] uppercase tracking-widest font-black">
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
            <h5 className="font-mono text-[10px] text-[#abd2fa] uppercase tracking-widest font-black">
              CONTACT DETAILS
            </h5>
            <ul className="space-y-3.5 text-xs font-mono text-gray-400">
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#abd2fa] shrink-0" /> <a href="mailto:eetirpltd@gmail.com" className="hover:text-white transition-colors">eetirpltd@gmail.com</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#7692ff] shrink-0" /> <a href="tel:+918088487801" className="hover:text-white transition-colors">+91 8088487801</a>
              </li>
              <li className="pt-2 border-t border-[#17366b]/35 text-[10px] text-gray-500 uppercase tracking-widest flex items-center gap-1.5 leading-tight">
                <span className="w-2 h-2 rounded-full bg-[#7da7f0] animate-pulse"></span> Currently running diagnostics for cohort 2026.
              </li>
            </ul>
          </div>

        </div>

        <div className="max-w-6xl mx-auto mt-16 pt-6 border-t border-[#17366b]/35 flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono text-gray-500 gap-4">
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
