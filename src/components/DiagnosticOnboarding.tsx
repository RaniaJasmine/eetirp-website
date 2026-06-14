import { useState, useEffect, ChangeEvent } from 'react';
import { Mail, Phone, ShieldCheck, HeartPulse, RefreshCw, LogOut, CheckCircle2, Award, Compass, ArrowRight } from 'lucide-react';
import { OnboardingDiagnostic } from '../types';

export default function DiagnosticOnboarding() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    segment: 'Core Engineering Student',
    inquiryMatrix: '',
  });

  const [activeSession, setActiveSession] = useState<OnboardingDiagnostic | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [diagnosticsLog, setDiagnosticsLog] = useState<string[]>([]);
  const [percent, setPercent] = useState(0);

  // Load existing session from localStorage if any
  useEffect(() => {
    const saved = localStorage.getItem('eetirp_diagnostic_onboarding');
    if (saved) {
      try {
        setActiveSession(JSON.parse(saved));
      } catch {
        localStorage.removeItem('eetirp_diagnostic_onboarding');
      }
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const executeDiagnosticsOnboarding = () => {
    if (!formData.fullName || !formData.email) return;

    setIsSubmitting(true);
    setPercent(0);
    setDiagnosticsLog(['Awaiting physical terminal layer coupling...']);

    const steps = [
      'Authenticating electronic mail domain key signature...',
      'Mapping designated sector coordinates to database indices...',
      'Analyzing suitability metrics aligned with EETIRP syllabus...',
      'Pre-allocating core container environments for micro-labs...',
      'Generating unique secure transmission token...',
    ];

    let current = 0;
    const interval = setInterval(() => {
      if (current < steps.length) {
        setDiagnosticsLog((prev) => [...prev, steps[current]]);
        setPercent((prev) => prev + 20);
        current++;
      } else {
        clearInterval(interval);

        // Calculate a simulated high-fidelity suitability score based on input
        const randomScore = Math.floor(Math.random() * 15) + 81; // 81 to 95%
        let indexCode = 'HIGH-ADAPTIVE';
        if (formData.segment === 'Tech Architect') indexCode = 'CORE-INFRASTRUCTURE';
        if (formData.segment === 'Enterprise Partner') indexCode = 'ORGANIZATIONAL-INTEGRATOR';

        const diagnosticId = `EETIRP-TX-${Math.floor(Math.random() * 900000 + 100000)}`;

        const newSession: OnboardingDiagnostic = {
          id: diagnosticId,
          fullName: formData.fullName,
          email: formData.email,
          segment: formData.segment,
          inquiryMatrix: formData.inquiryMatrix || 'No inquiry specifics provided.',
          timestamp: new Date().toLocaleDateString(),
          suitabilityScore: randomScore,
          suitabilityIndex: indexCode,
          status: 'COMPLETED',
          diagnosticsLog: [...steps, `SUITABILITY INDEX ESTABLISHED: ${indexCode} (${randomScore}% match)`],
        };

        localStorage.setItem('eetirp_diagnostic_onboarding', JSON.stringify(newSession));

        // Dispatch custom event to notify any interested components
        window.dispatchEvent(new Event('storage'));

        setTimeout(() => {
          setActiveSession(newSession);
          setIsSubmitting(false);
          setPercent(0);
          setDiagnosticsLog([]);
        }, 1500);
      }
    }, 1200);
  };

  const terminateSession = () => {
    if (window.confirm('Wipe local studio credentials and return to transmission mode?')) {
      localStorage.removeItem('eetirp_diagnostic_onboarding');
      setActiveSession(null);
      setFormData({
        fullName: '',
        email: '',
        segment: 'Core Engineering Student',
        inquiryMatrix: '',
      });
      window.dispatchEvent(new Event('storage'));
    }
  };

  return (
    <section className="py-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto" id="onboarding">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left Side: Instructions / Onboarding Detail */}
        <div>
          <span className="font-mono text-xs text-secondary uppercase tracking-[0.3em] mb-4 block">
            Transmission Protocol
          </span>
          <h2 className="font-sans text-3xl md:text-4xl font-semibold text-primary mb-8 tracking-tight leading-[1.2]">
            Initialize Onboarding Diagnostics
          </h2>
          <p className="text-on-surface-variant font-sans text-base leading-relaxed mb-8">
            Complete the form fields to trigger our system compatibility assessment kernel.
            This process indexes background logic profiles against our active production software repositories.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-xl border border-outline/10 bg-surface/50">
              <Mail className="w-5 h-5 text-secondary" />
              <div>
                <p className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider">Ecosystem Routing Node</p>
                <a href="mailto:eetirpltd@gmail.com" className="font-mono text-sm font-semibold text-primary hover:text-secondary">
                  eetirpltd@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl border border-outline/10 bg-surface/50">
              <Phone className="w-5 h-5 text-secondary" />
              <div>
                <p className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider">Direct Telecom Infrastructure</p>
                <a href="tel:+918088487801" className="font-mono text-sm font-semibold text-primary hover:text-secondary">
                  +91 8088487801
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Shell Form / Dashboard takeover */}
        <div className="w-full bg-surface border border-outline/10 p-6 md:p-8 rounded-2xl shadow-xl min-h-[400px] flex flex-col justify-between">
          {isSubmitting ? (
            <div className="flex-grow flex flex-col items-center justify-center space-y-6 py-12">
              <RefreshCw className="w-8 h-8 text-secondary animate-spin" />
              <div className="text-center space-y-2 max-w-sm">
                <p className="font-mono text-xs text-secondary font-bold uppercase tracking-widest">
                  Executing compilation matrix ({percent}%)
                </p>
                <div className="w-full bg-outline/10 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-secondary h-full transition-all duration-500 ease-out"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <div className="font-mono text-[10px] text-on-surface-variant bg-surface-variant/30 p-3 rounded border border-outline/5 text-left h-24 overflow-y-auto space-y-1 mt-4">
                  {diagnosticsLog.map((log, idx) => (
                    <p key={idx} className="truncate">&gt; {log}</p>
                  ))}
                </div>
              </div>
            </div>
          ) : activeSession ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-outline/10 pb-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  <span className="font-mono text-xs font-bold text-emerald-500 uppercase tracking-wider">
                    Diagnostic Session Verified
                  </span>
                </div>
                <span className="font-mono text-[10px] text-on-surface-variant">{activeSession.id}</span>
              </div>

              <div className="space-y-4 font-sans text-sm">
                <div className="grid grid-cols-2 gap-4 bg-surface-variant/20 p-4 rounded-xl border border-outline/5">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-on-surface-variant block">Subject Name</span>
                    <span className="font-medium text-primary">{activeSession.fullName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-on-surface-variant block">Assigned Index</span>
                    <span className="font-mono text-xs font-bold text-secondary">{activeSession.suitabilityIndex}</span>
                  </div>
                </div>

                <div className="bg-surface-variant/40 p-4 rounded-xl border border-outline/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-on-surface-variant">Syllabus Matching Core Metric</span>
                    <span className="font-mono text-xs font-bold text-emerald-500">{activeSession.suitabilityScore}% Match</span>
                  </div>
                  <div className="w-full bg-outline/10 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full" style={{ width: `${activeSession.suitabilityScore}%` }} />
                  </div>
                </div>

                <p className="text-xs text-on-surface-variant leading-relaxed bg-surface-variant/10 p-3 rounded border border-outline/5">
                  Your tracking token is now securely persistent within the workspace domain sandbox.
                  EETIRP operational leaders use this diagnostic profile to coordinate structural sandbox privileges.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => window.location.href = '#services'}
                  className="flex-grow py-3 px-4 bg-primary text-on-primary font-mono text-xs uppercase font-bold tracking-wider rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Access Repositories Sandbox</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={terminateSession}
                  className="py-3 px-4 border border-outline/20 text-on-surface-variant hover:text-error font-mono text-xs uppercase font-bold rounded-xl hover:bg-error/5 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Wipe</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-between h-full space-y-6">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider font-bold block">
                    Identity Core Label
                  </label>
                  <input
                    name="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Kaushal Baitha"
                    className="w-full bg-surface-variant/40 border border-outline/10 focus:border-secondary rounded-xl px-4 py-3 text-primary font-sans text-sm focus:outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider font-bold block">
                    Communication Network Node Address
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@domain.com"
                    className="w-full bg-surface-variant/40 border border-outline/10 focus:border-secondary rounded-xl px-4 py-3 text-primary font-sans text-sm focus:outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider font-bold block">
                    Operational Ecosystem Classification
                  </label>
                  <select
                    name="segment"
                    value={formData.segment}
                    onChange={handleChange}
                    className="w-full bg-surface-variant/40 border border-outline/10 focus:border-secondary rounded-xl px-3 py-3 text-primary font-sans text-sm focus:outline-none cursor-pointer transition-all"
                  >
                    <option value="Core Engineering Student">Core Engineering Student</option>
                    <option value="Tech Architect">Tech Architect</option>
                    <option value="Enterprise Partner">Enterprise Partner</option>
                    <option value="Product Strategy Lead">Product Strategy Lead</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider font-bold block">
                    Structural Focus Bounds / Notes (Optional)
                  </label>
                  <textarea
                    name="inquiryMatrix"
                    value={formData.inquiryMatrix}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Define core system frameworks or specialized engineering expectations..."
                    className="w-full bg-surface-variant/40 border border-outline/10 focus:border-secondary rounded-xl px-4 py-3 text-primary font-sans text-sm focus:outline-none transition-all resize-none"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={executeDiagnosticsOnboarding}
                disabled={!formData.fullName || !formData.email}
                className="w-full py-4 bg-secondary text-on-secondary font-mono text-xs uppercase tracking-widest font-bold rounded-xl shadow-md hover:opacity-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-[0.99] cursor-pointer"
              >
                Launch Telemetry Evaluation Run
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}