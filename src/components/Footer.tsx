import React from 'react';
import { Github, Linkedin, MessageSquare, Mail, Phone } from 'lucide-react';

export default function Footer({ scrollSmoothTo }: { scrollSmoothTo: (id: string) => void }) {
  const logoUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0Tb6eZNPswTOWvOMp-_Cr62CASvc3c1--t-f0c7jsDTf3DDa7VXGVV11ESxGD_HPDFE6RpScmJ370lwrrXmeazaZQYIj8m7hn0bJnYSqk3_XU5Dcss9V5eW-P-xrSNI2qfpfd9ie5Xo4uoeJkjFjwkdZpiCEgEQwCCuNfJ2qP6w02tLoQGSCGsEMAaHgvSpakzfOeNKfmFZIVxuo120cSRST7WO0Yiycj1foar3k9F_g1CBYb24k1YjOVtZMW5K-7OamqD3AzPLU';

  return (
    <footer className="bg-[#00132e] text-white py-20 px-6 md:px-16 border-t border-[#00132e]/20 overflow-hidden relative block z-30" id="footer">
      {/* Absolute ambient filter MUST contain pointer-events-none so it doesn't block layout click targets */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#04a0e9]/5 blur-[120px] pointer-events-none rounded-full"></div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        {/* Brand Column */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-white/5 border border-white/10 p-1 flex items-center justify-center">
              <img src={logoUrl} alt="EETIRP" className="w-full h-full object-contain" />
            </div>
            <span className="font-sans font-black tracking-tighter text-xl">
              EETIRP<span className="text-[#04a0e9]">.</span>
            </span>
          </div>
          <p className="font-sans text-xs text-gray-400 leading-relaxed font-medium">
            Operating at the intersection of classical engineering frameworks and cloud-scale software architectures.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a href="https://github.com/eetirp-ltd" target="_blank" rel="noreferrer" className="p-2 bg-white/5 rounded border border-white/5 text-gray-400 hover:text-white hover:border-[#04a0e9] transition-all cursor-pointer relative z-20">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://www.linkedin.com/in/eetirp-limited" target="_blank" rel="noreferrer" className="p-2 bg-white/5 rounded border border-white/5 text-gray-400 hover:text-white hover:border-[#04a0e9] transition-all cursor-pointer relative z-20">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="https://discord.com/users/1515615066245042291" target="_blank" rel="noreferrer" className="p-2 bg-white/5 rounded border border-white/5 text-gray-400 hover:text-white hover:border-[#04a0e9] transition-all cursor-pointer relative z-20">
              <MessageSquare className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="space-y-4">
          <h5 className="font-mono text-[10px] text-[#04a0e9] tracking-[0.25em] font-black uppercase">
            NAVIGATION
          </h5>
          <ul className="space-y-2.5 font-sans text-sm font-semibold text-gray-400">
            <li>
              <button onClick={() => scrollSmoothTo('hero')} className="hover:text-white transition-colors cursor-pointer text-left relative z-20">
                Mainframe Top
              </button>
            </li>
            <li>
              <button onClick={() => scrollSmoothTo('services')} className="hover:text-white transition-colors cursor-pointer text-left relative z-20">
                SaaS Sandbox Lab
              </button>
            </li>
            <li>
              <button onClick={() => scrollSmoothTo('onboarding')} className="hover:text-white transition-colors cursor-pointer text-left relative z-20">
                Diagnostics Intake
              </button>
            </li>
          </ul>
        </div>

        {/* Workspace Locations Column */}
        <div className="space-y-4">
          <h5 className="font-mono text-[10px] text-[#04a0e9] tracking-[0.25em] font-black uppercase">
            WORKSPACE COORDS
          </h5>
          <p className="font-sans text-xs text-gray-400 leading-relaxed font-medium">
            Tech Studio Operations,<br />
            Bengaluru, Karnataka, India
          </p>
          <div className="pt-2 flex items-center gap-2 text-[10px] font-mono text-[#04a0e9] font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981]"></span>
            <span>NODE_BENGALURU_ACTIVE</span>
          </div>
        </div>

        {/* Contact Details Column */}
        <div className="space-y-4">
          <h5 className="font-mono text-[10px] text-[#04a0e9] tracking-[0.25em] font-black uppercase">
            CONTACT DETAILS
          </h5>
          <ul className="space-y-3.5 text-xs font-mono text-gray-400">
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#7a3fed] shrink-0" />
              <a href="mailto:eetirpltd@gmail.com" className="hover:text-white transition-colors relative z-20 cursor-pointer">
                eetirpltd@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#04a0e9] shrink-0" />
              <a href="tel:+918088487801" className="hover:text-white transition-colors relative z-20 cursor-pointer">
                +91 8088487801
              </a>
            </li>
            <li className="pt-3 border-t border-white/5 text-[10px] text-gray-500 uppercase tracking-widest flex items-center gap-1.5 leading-tight">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
              <span>Running diagnostics for cohort 2026.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Global Copyright Section */}
      <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono text-gray-500 gap-4 relative z-10">
        <span>© 2026 EETIRP LTD. All rights reserved.</span>
        <div className="flex items-center gap-6">
          <span className="text-gray-6xl text-[9px] uppercase tracking-widest">CLASSIFIED SECURITY LAYER V3</span>
        </div>
      </div>
    </footer>
  );
}