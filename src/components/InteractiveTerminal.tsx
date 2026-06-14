import { useState, useRef, useEffect } from 'react';
import { Terminal, ChevronRight, Play, RefreshCw, Layers } from 'lucide-react';
import { TerminalHistory } from '../types';

export default function InteractiveTerminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalHistory[]>([
    {
      command: 'system init',
      output: 'EETIRP Core Telemetry Layer v3.1.2 initialized.\nConnecting classical-mechanical-and-electrical compilers -> CLOUD_READY...',
      timestamp: new Date().toLocaleTimeString(),
      type: 'system',
    },
    {
      command: 'status',
      output: 'MAIN_PORTAL: LIVE\nPLACEMENT_AI_AGENT: OK [listening:3000]\nKAURA_HUB_TELEMETRY: COMPLIANT [listening:443]\nENGINEERING_COHORT_READY: TRUE',
      timestamp: new Date().toLocaleTimeString(),
      type: 'success',
    },
  ]);
  
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    let output = '';
    let type: TerminalHistory['type'] = 'output';

    switch (trimmed) {
      case 'help':
        output = `Available Transmission Codes:\n  • status      - Query core mainframe telemetry values\n  • apps        - List distributed SaaS application matrices\n  • cohorts     - Inspect next-gen tech cohort syllabus tracks\n  • diagnostics - Retrieve local onboarding credential tokens\n  • clear       - Flush active terminal buffer memory\n  • sysinfo     - Print host architecture and geographic node`;
        break;
      case 'status':
        output = `SYSTEM RUNTIME REPORT:\n----------------------\n  • Core Nodes  : 3/3 active\n  • Latency     : 14ms (via Bengaluru-Primary)\n  • Sync Mode   : 100% Git-Driven\n  • Docker Env  : compliant\n  • Security    : SSL/TSL active\n  • Status Code : 200 OK (STABLE)`;
        type = 'success';
        break;
      case 'apps':
        output = `SAAS LAB ECOSYSTEM APP MAP:\n----------------------------\n[01] Placement AI Platform (Port:3000)\n     - Competency analysis & adaptive skill path mapper.\n     - Status: ACCELERATED\n\n[02] Kaura Hub (Port:443)\n     - Hardware-software telemetry & distributed firmware controller\n     - Status: ACTIVE PRODUCTION`;
        type = 'system';
        break;
      case 'cohorts':
        output = `COHORT ENGINEERING SYLLABUS SYNOPSIS:\n-------------------------------------\n  Phase 1: Classical Solid Mechanics & Electrical Micro-nets (1-4w)\n  Phase 2: High-Throughout Rust & TypeScript API Pipeline (5-8w)\n  Phase 3: Telemetry orchestration & cloud-native Docker container environments (9-12w)`;
        break;
      case 'diagnostics':
        const saved = localStorage.getItem('eetirp_diagnostic_onboarding');
        if (saved) {
          try {
            const data = JSON.parse(saved);
            output = `SECURE TOKEN MATCHED:\n---------------------\n  • ID: ${data.id}\n  • Candidate: ${data.fullName}\n  • Corporate: ${data.email}\n  • Segment: ${data.segment}\n  • Suitability Index: ${data.suitabilityIndex} (${data.suitabilityScore}% Match)\n  • Status: COHORT_RESOURCE_ALLOCATED`;
            type = 'success';
          } catch {
            output = 'NO ACTIVE ONBOARDING RECORD FOUND.\nPlease utilize the transmission protocol intake form below to establish initial parameters.';
            type = 'error';
          }
        } else {
          output = 'NO ACTIVE ONBOARDING RECORD FOUND.\nPlease utilize the transmission protocol intake form below to establish initial parameters.';
          type = 'error';
        }
        break;
      case 'sysinfo':
        output = `HOST ARTIFACT:\n  • Platform  : Cloud Run Instance\n  • Core Engine: placement-engine-v2\n  • Target      : Node-VM v18\n  • Region      : Bengaluru Tech Studio Operations`;
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      default:
        output = `COMMAND NOT RECOGNIZED: "${trimmed}".\nType "help" to transmit authentic parameters.`;
        type = 'error';
    }

    setHistory((prev) => [
      ...prev,
      {
        command: cmd,
        output,
        timestamp: new Date().toLocaleTimeString(),
        type,
      },
    ]);
    setInput('');
  };

  const handleQuickAction = (cmd: string) => {
    handleCommand(cmd);
  };

  return (
    <div className="glass-surface rounded-xl border border-white/10 overflow-hidden w-full" id="interactive-terminal">
      {/* Title Bar */}
      <div className="bg-surface-container-lowest px-4 py-3 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-secondary" />
          <span className="font-mono text-xs text-on-surface-variant font-medium tracking-wider uppercase">
            EETIRP Interactive Telemetry Shell
          </span>
        </div>
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/20"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-500/20"></span>
          <span className="w-3 h-3 rounded-full bg-green-500/20"></span>
        </div>
      </div>

      {/* Terminal Main Screen */}
      <div className="p-4 md:p-6 bg-[#000d1f] font-mono text-xs h-[280px] overflow-y-auto leading-relaxed text-secondary/90">
        <div className="space-y-4">
          {history.map((log, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-status-indicator text-secondary shrink-0 mt-0.5" />
                <span className="text-primary font-bold">{log.command}</span>
                <span className="text-[10px] text-on-surface-variant/40 ml-auto">{log.timestamp}</span>
              </div>
              <div className="pl-6 whitespace-pre-line text-on-surface-variant">
                {log.type === 'error' && (
                  <span className="text-red-400 font-medium">{log.output}</span>
                )}
                {log.type === 'success' && (
                  <span className="text-green-400 font-medium">{log.output}</span>
                )}
                {log.type === 'system' && (
                  <span className="text-secondary font-medium">{log.output}</span>
                )}
                {log.type === 'output' && (
                  <span className="text-on-surface-variant">{log.output}</span>
                )}
              </div>
            </div>
          ))}
          <div ref={terminalEndRef}></div>
        </div>
      </div>

      {/* Input / controls */}
      <div className="border-t border-white/5 p-3 bg-surface-container-lowest flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCommand(input);
          }}
          className="flex-grow flex items-center relative"
        >
          <ChevronRight className="w-4 h-4 text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            className="w-full bg-[#000d1f] rounded border border-white/5 pl-9 pr-4 py-2 font-mono text-xs text-primary focus:outline-none focus:border-secondary/40 focus:ring-1 focus:ring-secondary/20 placeholder:text-on-surface-variant/30"
            placeholder="Type 'help', 'status', 'apps' or 'diagnostics'..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-secondary transition-colors"
          >
            <Play className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Quick action chips */}
        <div className="flex flex-wrap gap-2 items-center">
          <button
            onClick={() => handleQuickAction('status')}
            className="px-2.5 py-1 rounded bg-surface-container-high border border-white/5 text-[10px] font-mono text-secondary hover:border-secondary/50 transition-all flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" /> status
          </button>
          <button
            onClick={() => handleQuickAction('apps')}
            className="px-2.5 py-1 rounded bg-surface-container-high border border-white/5 text-[10px] font-mono text-secondary hover:border-secondary/50 transition-all flex items-center gap-1 cursor-pointer"
          >
            <Layers className="w-3 h-3" /> apps
          </button>
          <button
            onClick={() => handleQuickAction('cohorts')}
            className="px-2.5 py-1 rounded bg-surface-container-high border border-white/5 text-[10px] font-mono text-secondary hover:border-secondary/50 transition-all flex items-center gap-1 cursor-pointer"
          >
            Syllabus
          </button>
          <button
            onClick={() => handleQuickAction('diagnostics')}
            className="px-2.5 py-1 rounded bg-surface-container-high border border-white/5 text-[10px] font-mono text-green-400 border-green-500/20 hover:border-green-400 transition-all flex items-center gap-1 cursor-pointer"
          >
            Diagnostics
          </button>
        </div>
      </div>
    </div>
  );
}
