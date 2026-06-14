import { useState, useEffect } from 'react';
import { Menu, X, Terminal, Monitor, Compass, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasActiveToken, setHasActiveToken] = useState(false);

  // Custom rotating notices/articles array for the rectangular slideshow frame
  const notices = [
    { text: "COHORT 2026: Systems & Advanced Web Engineering tracks are now open.", badge: "COHORT", color: "text-[#bfd3e6] border-[#1f3a5f]/40 bg-[#1f3a5f]/40" },
    { text: "SAAS LABS: Launch and run automated telemetry diagnostics via sandbox.", badge: "SANDBOX", color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" },
    { text: "INCUBATOR: Roster is currently at 92% active capacity this cycle.", badge: "NEWS", color: "text-amber-400 border-amber-500/20 bg-amber-500/10" },
    { text: "INTEGRATION: Interactive diagnostic Git callback tokens verified.", badge: "SECURITY", color: "text-[#04a0e9] border-[#04a0e9]/20 bg-[#04a0e9]/5" },
  ];

  const [currentNotice, setCurrentNotice] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const checkActiveSession = () => {
      setHasActiveToken(!!localStorage.getItem('eetirp_diagnostic_onboarding'));
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('storage', checkActiveSession);

    // Check initially
    checkActiveSession();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', checkActiveSession);
    };
  }, []);

  // Interval timer for notices - paused on hover!
  useEffect(() => {
    if (isHovered) return;
    const interval = setTimeout(() => {
      setCurrentNotice((prev) => (prev + 1) % notices.length);
    }, 2800);
    return () => clearTimeout(interval);
  }, [isHovered, currentNotice, notices.length]);

  const logoUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0Tb6eZNPswTOWvOMp-_Cr62CASvc3c1--t-f0c7jsDTf3DDa7VXGVV11ESxGD_HPDFE6RpScmJ370lwrrXmeazaZQYIj8m7hn0bJnYSqk3_XU5Dcss9V5eW-P-xrSNI2qfpfd9ie5Xo4uoeJkjFjwkdZpiCEgEQwCCuNfJ2qP6w02tLoQGSCGsEMAaHgvSpakzfOeNKfmFZIVxuo120cSRST7WO0Yiycj1foar3k9F_g1CBYb24k1YjOVtZMW5K-7OamqD3AzPLU';

  const scrollSmoothTo = (elementId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* 
        Standalone Frozen Corporate Logo Widget in top-left corner.
        Separated from the headers, frozen, decorated with modern dashboard viewport brackets,
        and featuring a real-time system state telemetry node.
      */}
      <div
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed top-4 left-4 sm:top-5 sm:left-6 lg:top-6 lg:left-8 z-[120] flex items-center gap-3.5 group cursor-pointer select-none bg-[#030d1a]/95 backdrop-blur-md border border-[#1f3a5f]/80 px-4 py-3 rounded-2xl shadow-xl hover:scale-[1.02] hover:border-[#bfd3e6]/90 hover:shadow-[0_0_20px_rgba(191,211,230,0.08)] transition-all duration-300"
      >
        {/* Decorative cyber corner brackets */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#bfd3e6]/40 rounded-tl-xl group-hover:border-[#bfd3e6]/90 transition-colors" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#bfd3e6]/40 rounded-br-xl group-hover:border-[#bfd3e6]/90 transition-colors" />

        <div className="w-10 h-10 rounded-xl overflow-hidden border border-[#bfd3e6]/25 flex items-center justify-center p-1 bg-white shadow-md shrink-0 relative">
          <img
            alt="EETIRP Logo"
            className="w-full h-full object-contain rounded-sm transition-transform duration-500 group-hover:rotate-[360deg] group-hover:scale-105"
            referrerPolicy="no-referrer"
            src={logoUrl}
          />
          <div className="absolute inset-0 bg-[#7a3fed]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>

        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span className="font-sans text-sm font-black tracking-widest text-white group-hover:text-[#bfd3e6] transition-colors uppercase">
              EETIRP
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" title="System Live" />
          </div>
          <span className="font-mono text-[8px] tracking-[0.22em] text-[#6f8faf] font-extrabold uppercase mt-1 leading-none flex items-center gap-1">
            <span>Hybrid Tech Studio</span>
          </span>
        </div>
      </div>

      {/* 
        Floating Header Bar - Aligned separately on the right side on desktop
        to enable an asymmetrical and unique visual rhythm, shifting down on mobile 
        to perfectly offset from the frozen logo.
      */}
      <nav className="fixed top-0 inset-x-0 lg:left-[290px] xl:left-[315px] z-[100] p-4 sm:p-5 lg:pr-8 xl:pr-12 transition-all duration-300 max-lg:pt-[84px]">
        <div
          className={`mx-auto max-w-full rounded-2xl bg-[#0b1f3b]/95 backdrop-blur-md border transition-all duration-500 ${scrolled || mobileMenuOpen
              ? 'py-3 px-5 sm:px-6 md:px-8 shadow-2xl border-[#1f3a5f]'
              : 'py-4 px-6 md:px-10 shadow-lg border-[#1f3a5f]/40'
            }`}
        >
          <div className="flex items-center justify-between gap-4">

            {/* Automatic sliding rectangle notice / article box with active timing track */}
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="h-11 max-w-[240px] sm:max-w-sm w-full bg-[#000d1f]/70 border border-[#1f3a5f]/55 hover:border-[#7a3fed]/50 hover:bg-[#000d1f]/90 px-3.5 py-2.5 rounded-xl flex flex-col justify-center select-none overflow-hidden cursor-help relative transition-all duration-300 shadow-inner group"
              title="Interactive Notice Ticker - Hover to hold and review"
            >
              <div className="flex items-center gap-2 w-full">
                <span className={`text-[8px] font-mono font-black tracking-wider uppercase px-2 py-0.5 rounded border shrink-0 transition-colors duration-300 ${notices[currentNotice].color}`}>
                  {isHovered ? 'PAUSED' : notices[currentNotice].badge}
                </span>

                <div className="overflow-hidden relative w-full h-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentNotice}
                      initial={{ y: 12, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -12, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                      className="absolute inset-y-0 left-0 w-full font-mono text-[9px] leading-tight text-gray-200 tracking-wide font-bold truncate flex items-center"
                    >
                      {notices[currentNotice].text}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Infinite fluid timeline loop underlay loading indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1f3a5f]/30">
                <motion.div
                  key={`${currentNotice}-${isHovered}`}
                  initial={{ width: "0%" }}
                  animate={{ width: isHovered ? "100%" : "100%" }}
                  transition={{
                    duration: isHovered ? 0 : 2.8,
                    ease: "linear"
                  }}
                  className={`h-full ${isHovered ? 'bg-[#7a3fed]/40' : 'bg-gradient-to-r from-[#7a3fed] to-[#04a0e9]'}`}
                />
              </div>
            </div>

            {/* Desktop Navigation links */}
            <div className="hidden xl:flex items-center gap-8 shrink-0">
              <button
                onClick={() => scrollSmoothTo('positioning')}
                className="font-mono text-[11px] text-[#bfd3e6] hover:text-white transition-all uppercase tracking-[0.12em] font-bold cursor-pointer"
              >
                Our Positioning
              </button>
              <button
                onClick={() => scrollSmoothTo('services')}
                className="font-mono text-[11px] text-[#bfd3e6] hover:text-white transition-all uppercase tracking-[0.12em] font-bold cursor-pointer"
              >
                What We Do
              </button>
              <button
                onClick={() => scrollSmoothTo('leadership')}
                className="font-mono text-[11px] text-[#bfd3e6] hover:text-white transition-all uppercase tracking-[0.12em] font-bold cursor-pointer"
              >
                Leadership
              </button>
            </div>

            {/* Nav Actions */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => scrollSmoothTo('onboarding')}
                className="px-5 py-2.5 rounded bg-gradient-to-r from-[#1f3a5f] to-[#6f8faf]/80 text-white font-mono text-[11px] uppercase tracking-[0.12em] font-bold hover:opacity-95 hover:shadow-md transition-all active:scale-[0.98] cursor-pointer max-sm:hidden shadow-sm"
              >
                {hasActiveToken ? 'Open Active Cohort' : 'Join Ecosystem'}
              </button>

              {/* Mobile Burger Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 border border-[#1f3a5f] bg-[#1f3a5f] rounded-md text-white hover:bg-[#0b1f3b] transition-colors cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* MOBILE DRAWER OVERLAY - Beautifully nested in the floating taskbar */}
          {mobileMenuOpen && (
            <div className="mt-4 pt-6 border-t border-[#1f3a5f]/40 flex flex-col gap-6 xl:hidden animate-fade-in">
              <div className="flex flex-col gap-3 text-left">
                <button
                  onClick={() => scrollSmoothTo('positioning')}
                  className="font-mono text-xs text-[#bfd3e6] hover:text-white transition-all uppercase tracking-widest text-left py-3 border-b border-[#1f3a5f]/20 flex items-center justify-between"
                >
                  <span>Our Positioning</span> <Compass className="w-4 h-4 text-[#bfd3e6]" />
                </button>

                <button
                  onClick={() => scrollSmoothTo('services')}
                  className="font-mono text-xs text-[#bfd3e6] hover:text-white transition-all uppercase tracking-widest text-left py-3 border-b border-[#1f3a5f]/20 flex items-center justify-between"
                >
                  <span>What We Do</span> <Monitor className="w-4 h-4 text-[#bfd3e6]" />
                </button>

                <button
                  onClick={() => scrollSmoothTo('leadership')}
                  className="font-mono text-xs text-[#bfd3e6] hover:text-white transition-all uppercase tracking-widest text-left py-3 border-b border-[#1f3a5f]/20 flex items-center justify-between"
                >
                  <span>Leadership & Experts</span> <Send className="w-4 h-4 text-[#bfd3e6]" />
                </button>
              </div>

              <div className="pt-2 pb-2">
                <button
                  onClick={() => scrollSmoothTo('onboarding')}
                  className="w-full py-3.5 text-center bg-gradient-to-r from-[#1f3a5f] to-[#6f8faf]/85 text-white font-mono text-xs uppercase tracking-widest font-bold rounded-lg shadow-md cursor-pointer"
                >
                  {hasActiveToken ? 'Open Candidate Portal' : 'Join Ecosystem'}
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
