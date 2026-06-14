import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, CheckCircle2, ExternalLink } from 'lucide-react';

interface SaasLabsProps {
  selectedProjectId: 'placement' | 'kaura' | 'studio';
  setSelectedProjectId: (id: 'placement' | 'kaura' | 'studio') => void;
}

export default function SaasLabs({ selectedProjectId, setSelectedProjectId }: SaasLabsProps) {
  return (
    <section className="py-24 bg-white border-y border-[#00132e]/5 relative block" id="services">
      <div className="px-6 md:px-16 max-w-6xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-[10px] text-[#04a0e9] tracking-[0.3em] uppercase bg-[#04a0e9]/10 border-2 border-[#04a0e9]/20 px-4 py-1.5 rounded-full font-black shadow-sm">
            SaaS Sandbox Lab
          </span>
          <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-[#00132e] mt-5 mb-4 tracking-tight leading-none">
            Present Ongoing Projects
          </h2>
          <p className="font-sans text-[#475569] text-base leading-relaxed font-semibold">
            We don't teach from empty slides. EETIRP acts as a live Startup Studio, engineering real products.
          </p>
        </div>

        {/* Project Selection Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <button
            onClick={() => setSelectedProjectId('placement')}
            className={`p-6 text-left rounded-lg border transition-all cursor-pointer ${selectedProjectId === 'placement'
              ? 'border-[#04a0e9] bg-[#04a0e9]/5 shadow-sm'
              : 'border-gray-200 hover:border-gray-300 bg-gray-50/50'
              }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[9px] uppercase tracking-widest text-gray-400">Project 01</span>
              <span className={`w-2 h-2 rounded-full ${selectedProjectId === 'placement' ? 'bg-[#04a0e9]' : 'bg-gray-300'}`}></span>
            </div>
            <h3 className="font-sans font-bold text-gray-900 text-lg mb-1">Placement AI Platform</h3>
            <p className="font-sans text-xs text-gray-500">Mapping deep competencies to modern engineering tracks.</p>
          </button>

          <button
            onClick={() => setSelectedProjectId('kaura')}
            className={`p-6 text-left rounded-lg border transition-all cursor-pointer ${selectedProjectId === 'kaura'
              ? 'border-[#04a0e9] bg-[#04a0e9]/5 shadow-sm'
              : 'border-gray-200 hover:border-gray-300 bg-gray-50/50'
              }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[9px] uppercase tracking-widest text-gray-400">Project 02</span>
              <span className={`w-2 h-2 rounded-full ${selectedProjectId === 'kaura' ? 'bg-[#04a0e9]' : 'bg-gray-300'}`}></span>
            </div>
            <h3 className="font-sans font-bold text-gray-900 text-lg mb-1">Kaura Hub</h3>
            <p className="font-sans text-xs text-gray-500">Industrial telemetry monitoring and integration server layer.</p>
          </button>

          <button
            onClick={() => setSelectedProjectId('studio')}
            className={`p-6 text-left rounded-lg border transition-all cursor-pointer ${selectedProjectId === 'studio'
              ? 'border-[#04a0e9] bg-[#04a0e9]/5 shadow-sm'
              : 'border-gray-200 hover:border-gray-300 bg-gray-50/50'
              }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[9px] uppercase tracking-widest text-gray-400">Project 03</span>
              <span className={`w-2 h-2 rounded-full ${selectedProjectId === 'studio' ? 'bg-[#04a0e9]' : 'bg-gray-300'}`}></span>
            </div>
            <h3 className="font-sans font-bold text-gray-900 text-lg mb-1">EETIRP Compiler</h3>
            <p className="font-sans text-xs text-gray-500">Automated sandbox testing pipelines for incoming software stacks.</p>
          </button>
        </div>

        {/* Sandbox Core Screen Terminal Context Layout */}
        <AnimatePresence mode="wait">
          {selectedProjectId && (
            <motion.div
              key={selectedProjectId}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#00132e] text-white p-6 md:p-8 rounded-xl shadow-2xl relative border border-white/5 overflow-hidden min-h-[340px] flex flex-col justify-between"
            >
              {/* Added absolute pointer-events-none fix to ambient layer here */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#04a0e9]/5 to-transparent pointer-events-none"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                    <span className="ml-2 font-mono text-xs text-gray-400">sandbox_environment_active.sh</span>
                  </div>
                  <span className="font-mono text-[10px] bg-white/10 px-2.5 py-1 rounded text-[#04a0e9] font-bold">
                    {selectedProjectId === 'placement' && 'ACCELERATOR v2.0.4'}
                    {selectedProjectId === 'kaura' && 'TELEMETRY v4.1.0'}
                    {selectedProjectId === 'studio' && 'COMPILER v1.0.0'}
                  </span>
                </div>

                {selectedProjectId === 'placement' && (
                  <div className="space-y-4">
                    <h4 className="font-sans font-extrabold text-xl text-white">Placement AI Competency Platform</h4>
                    <p className="font-sans text-sm text-gray-300 max-w-3xl leading-relaxed">
                      An intelligent engineering-centric placement acceleration engine mapping deep mechanical, electrical, and computer science competencies directly to modern tech roles.
                    </p>
                    <div className="pt-2 flex flex-wrap gap-2">
                      {['TypeScript Modules', 'LLM Mapping', 'Docker Containers', 'Classical Statics'].map((tag, idx) => (
                        <span key={idx} className="font-mono text-[10px] bg-white/5 border border-white/10 px-2.5 py-1 rounded text-gray-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedProjectId === 'kaura' && (
                  <div className="space-y-4">
                    <h4 className="font-sans font-extrabold text-xl text-white">Kaura Hub Matrix</h4>
                    <p className="font-sans text-sm text-gray-300 max-w-3xl leading-relaxed">
                      Our active production telemetry core, engineered to route classical telemetry signals directly to modern cloud monitoring backends via rapid microservices.
                    </p>
                    <div className="pt-2 flex flex-wrap gap-2">
                      {['Telemetry Routing', 'Go-Lang Engine', 'InfluxDB Store', 'Signal Isolation'].map((tag, idx) => (
                        <span key={idx} className="font-mono text-[10px] bg-white/5 border border-white/10 px-2.5 py-1 rounded text-gray-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedProjectId === 'studio' && (
                  <div className="space-y-4">
                    <h4 className="font-sans font-extrabold text-xl text-white">EETIRP High-Tier Sandbox Compiler</h4>
                    <p className="font-sans text-sm text-gray-300 max-w-3xl leading-relaxed">
                      Strict asynchronous verification pipeline validating code structure models, Suppabase schemas, and software pipeline runtimes automatically before integration deployments.
                    </p>
                    <div className="pt-2 flex flex-wrap gap-2">
                      {['Lint Testing', 'Supabase Schemas', 'Asynchronous Validations', 'Trunk Deployment'].map((tag, idx) => (
                        <span key={idx} className="font-mono text-[10px] bg-white/5 border border-white/10 px-2.5 py-1 rounded text-gray-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative z-10">
                <div className="flex items-center gap-2 font-mono text-[10px] text-gray-400 select-none">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#04a0e9] shadow-[0_0_8px_#04a0e9] animate-pulse"></span>
                  <span>
                    {selectedProjectId === 'placement' && 'placement-ai-server: listening on port :3000 (15s ago)'}
                    {selectedProjectId === 'kaura' && 'kaurahub-main server: listening on port :443 (4m ago)'}
                    {selectedProjectId === 'studio' && 'eetirp-compiler: connection established on secure telemetry pipe'}
                  </span>
                </div>
                <div className="flex justify-end gap-3">
                  <a
                    href={selectedProjectId === 'placement' ? 'https://placementaiplatform.vercel.app/' : selectedProjectId === 'kaura' ? 'https://www.kaurahub.com/' : '#onboarding'}
                    target={selectedProjectId !== 'studio' ? '_blank' : '_self'}
                    rel={selectedProjectId !== 'studio' ? 'noopener noreferrer' : ''}
                    className="px-5 py-2.5 bg-gradient-to-r from-[#7a3fed] to-[#04a0e9] text-white font-mono text-[10px] font-black uppercase rounded shadow hover:opacity-90 transition-all flex items-center gap-1.5 relative z-20 cursor-pointer"
                  >
                    {selectedProjectId !== 'studio' ? 'Launch Platform ↗' : 'Request Sandbox Access →'}
                    {selectedProjectId !== 'studio' && <ExternalLink className="w-3 h-3" />}
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}