import { useState } from 'react';
import { GitPullRequest, ArrowRight, X, Clock, Eye, Star, Share2, Layers, Check, GitFork, Users } from 'lucide-react';

interface MetricDetail {
  id: string;
  title: string;
  value: string;
  subtitle: string;
  description: string;
}

export default function EcosystemInsights() {
  const [activeModalId, setActiveModalId] = useState<string | null>(null);

  const metrics: MetricDetail[] = [
    {
      id: 'metric-repos',
      title: 'Production Repositories',
      value: '15+',
      subtitle: 'PRODUCTION REPOSITORIES',
      description: 'Host classical, mechanical, and heavy-tier client-to-cloud software pipelines vetted fully through automatic compiler lint matrices.',
    },
    {
      id: 'metric-sprint',
      title: 'Hackathon Turnaround',
      value: '48-Hr',
      subtitle: 'HACKATHON TURNAROUND',
      description: 'Our signature rapid prototyping window translating industrial telemetry requests into deployed, containerized Docker micro-services.',
    },
    {
      id: 'metric-git',
      title: 'Git-Driven Collaboration',
      value: '100%',
      subtitle: 'GIT-DRIVEN COLLABORATION',
      description: 'Strict asynchronous commits, peer review validation criteria, and trunk-based deployment models ensuring enterprise-ready standards.',
    },
  ];

  // Mock repositories list
  const mockRepos = [
    { name: 'placement-acceleration-ai', lang: 'TypeScript', stars: 104, forks: 24, size: '4.2 MB' },
    { name: 'kaura-hardware-telemetry', lang: 'Rust', stars: 212, forks: 48, size: '12.8 MB' },
    { name: 'eetirp-core-compiler', lang: 'C++', stars: 310, forks: 92, size: '36.5 MB' },
    { name: 'incubator-deployment-agent', lang: 'Go', stars: 45, forks: 8, size: '2.4 MB' },
  ];

  // Mock branches
  const mockBranches = [
    { name: 'main', status: 'deploying', commit: 'f9a2b1c', message: 'Merge pull request #114 from core/telemetry' },
    { name: 'staging', status: 'stable', commit: '3c8e4a1', message: 'Release beta candidate-4' },
    { name: 'feature/competency-mapper', status: 'reviewing', commit: '6b2d10c', message: 'Map classical electrical categories to computer systems' },
    { name: 'feature/hardware-layers', status: 'building', commit: '810fa22', message: 'Initialize interface definitions for IoT gateway sync' },
  ];

  return (
    <section className="py-24 bg-surface-container-low border-y border-white/5 relative overflow-hidden" id="positioning">
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#a9caec_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-sans text-3xl md:text-4xl font-semibold text-primary mb-2 tracking-tight">
            Engineered for Excellence
          </h2>
          <p className="font-mono text-xs text-on-surface-variant tracking-[0.2em] uppercase">
            Our Framework Metrics
          </p>
        </div>

        {/* Triple grid cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {metrics.map((m) => (
            <div
              key={m.id}
              onClick={() => setActiveModalId(m.id)}
              className="text-center group cursor-pointer"
            >
              <div className="font-sans text-5xl md:text-6xl font-bold text-primary mb-4 group-hover:scale-105 group-hover:text-secondary group-hover:drop-shadow-[0_0_15px_rgba(169,202,236,0.3)] transition-all duration-500 font-display-lg select-none">
                {m.value}
              </div>
              <p className="font-mono text-xs text-secondary uppercase tracking-widest font-medium group-hover:text-primary transition-colors">
                {m.title}
              </p>
              <p className="font-sans text-[13px] text-on-surface-variant/70 mt-3 max-w-xs mx-auto leading-relaxed">
                {m.description}
              </p>
              <div className="w-12 h-0.5 bg-secondary mx-auto mt-6 rounded-full opacity-30 group-hover:opacity-100 group-hover:w-20 transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>

      {/* METRIC DETAILS DRAWER / OVERLAY */}
      {activeModalId && (
        <div className="fixed inset-0 bg-[#000d1f]/80 backdrop-blur-md z-[200] flex items-center justify-center p-4">
          <div className="glass-surface w-full max-w-lg rounded-xl border border-secondary/20 p-6 md:p-8 relative max-h-[85vh] overflow-y-auto">
            {/* Close Toggle */}
            <button
              onClick={() => setActiveModalId(null)}
              className="absolute top-4 right-4 p-2 text-on-surface-variant hover:text-primary transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Repositories insight */}
            {activeModalId === 'metric-repos' && (
              <div className="space-y-6">
                <div>
                  <span className="font-mono text-[10px] text-secondary tracking-widest uppercase">
                    Ecosystem Insight
                  </span>
                  <h3 className="font-sans text-2xl font-bold text-primary mt-1">
                    15+ Production Repositories
                  </h3>
                  <p className="text-on-surface-variant font-sans text-sm mt-2">
                    Check out a live index of our standard developer environments currently synchronized in our private studio cloud cluster:
                  </p>
                </div>

                <div className="space-y-3">
                  {mockRepos.map((repo, i) => (
                    <div key={i} className="bg-[#000d1f] p-4 rounded border border-white/5 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-xs text-primary font-bold hover:text-secondary transition-colors cursor-pointer flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-secondary" />
                          {repo.name}
                        </span>
                        <span className="px-2 py-0.5 bg-surface-container rounded text-[9px] font-mono text-on-surface-variant">
                          {repo.size}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-[10px] font-mono text-on-surface-variant/60">
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-secondary"></span>
                          {repo.lang}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-400" />
                          {repo.stars}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork className="w-3 h-3" />
                          {repo.forks}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <a
                    href="#onboarding"
                    onClick={() => setActiveModalId(null)}
                    className="w-full py-4 text-center bg-[#00214d] hover:bg-secondary hover:text-background text-primary font-mono text-xs uppercase tracking-widest rounded flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    Request Repository Access Key <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            )}

            {/* Turnaround Insight */}
            {activeModalId === 'metric-sprint' && (
              <div className="space-y-6">
                <div>
                  <span className="font-mono text-[10px] text-secondary tracking-widest uppercase">
                    Ecosystem Insight
                  </span>
                  <h3 className="font-sans text-2xl font-bold text-primary mt-1">
                    48-Hr Speed Runway Code
                  </h3>
                  <p className="text-on-surface-variant font-sans text-sm mt-3 leading-relaxed">
                    How EETIRP studio launches stable production networks inside a single 48-Hour cycle:
                  </p>
                </div>

                {/* Steps layout */}
                <div className="space-y-5 relative pl-4 border-l border-white/10 ml-2">
                  <div className="relative">
                    <span className="absolute -left-[25px] top-0.5 w-[11px] h-[11px] rounded-full bg-secondary border-2 border-background"></span>
                    <p className="font-mono text-[11px] text-secondary">HOURS 00 - 12: CORE COUT MATRIX</p>
                    <p className="font-sans text-xs text-on-surface-variant mt-1">
                      Assess requirements, map physical equations, and draft interface schemas in TypeScript.
                    </p>
                  </div>

                  <div className="relative">
                    <span className="absolute -left-[25px] top-0.5 w-[11px] h-[11px] rounded-full bg-secondary border-2 border-background"></span>
                    <p className="font-mono text-[11px] text-secondary">HOURS 12 - 32: DOCKER PIPELINE AND TEST</p>
                    <p className="font-sans text-xs text-on-surface-variant mt-1">
                      Spin up Express / Nest routing nodes, link persistent key-value caching layers, and automate unit coverage tests.
                    </p>
                  </div>

                  <div className="relative">
                    <span className="absolute -left-[25px] top-0.5 w-[11px] h-[11px] rounded-full bg-green-400 border-2 border-background animate-pulse"></span>
                    <p className="font-mono text-[11px] text-green-400">HOURS 32 - 48: CLOUD RUN CLUSTER RELEASE</p>
                    <p className="font-sans text-xs text-on-surface-variant mt-1">
                      Bundle static assets via esbuild, isolate production node environments, configure strict cross-origin safety rules, and deploy.
                    </p>
                  </div>
                </div>

                <div className="bg-[#00214d]/40 p-4 border border-secondary/20 rounded flex items-start gap-3">
                  <Clock className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                  <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                    Our strict methodology guarantees that all modules built during hackathons match real industry benchmarks with no placeholder code allowed.
                  </p>
                </div>
              </div>
            )}

            {/* Git-Driven insight */}
            {activeModalId === 'metric-git' && (
              <div className="space-y-6">
                <div>
                  <span className="font-mono text-[10px] text-secondary tracking-widest uppercase">
                    Ecosystem Insight
                  </span>
                  <h3 className="font-sans text-2xl font-bold text-primary mt-1">
                    Trunk-Based Commit Logs
                  </h3>
                  <p className="text-on-surface-variant font-sans text-sm mt-2">
                    Check out the live simulated synchronization records of our distributed studio branches as feature code is integrated:
                  </p>
                </div>

                <div className="space-y-3">
                  {mockBranches.map((branch, i) => (
                    <div key={i} className="bg-[#000d1f] p-4 rounded border border-white/5 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-xs text-primary font-bold flex items-center gap-1.5">
                          <GitPullRequest className="w-3.5 h-3.5 text-secondary" />
                          {branch.name}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[8px] font-mono uppercase font-bold ${branch.status === 'deploying'
                              ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 animate-pulse'
                              : branch.status === 'stable'
                                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                : branch.status === 'reviewing'
                                  ? 'bg-secondary/10 text-secondary border border-secondary/20'
                                  : 'bg-on-surface-variant/10 text-on-surface-variant border border-white/5'
                            }`}
                        >
                          {branch.status}
                        </span>
                      </div>
                      <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                        {branch.message}
                      </p>
                      <div className="flex items-center gap-2 font-mono text-[10px] text-on-surface-variant/40">
                        <span>Commit: {branch.commit}</span>
                        <span>•</span>
                        <span>Peer Approved</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setActiveModalId(null)}
                    className="w-full py-4 text-center bg-primary hover:bg-secondary hover:text-background text-background font-mono text-xs uppercase tracking-widest rounded flex items-center justify-center gap-2 transition-colors cursor-pointer font-bold"
                  >
                    Return to Mainframe <Check className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}