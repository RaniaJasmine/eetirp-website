export interface LiveApp {
  id: string;
  name: string;
  codename: string;
  category: string;
  status: 'STABLE' | 'DEGRADED' | 'MAINTENANCE' | 'BUILDING';
  version: string;
  listeningPort: number;
  terminalLogs: string[];
  description: string;
  stats: {
    cpu: number;
    memory: string;
    requestCount: number;
    latency: number;
  };
  competencies: string[];
}

export interface OnboardingDiagnostic {
  id: string;
  fullName: string;
  email: string;
  segment: string;
  inquiryMatrix: string;
  timestamp: string;
  suitabilityScore: number;
  suitabilityIndex: string;
  status: 'EVALUATED' | 'ALLOCATED' | 'COMPILING' | 'COMPLETED';
  diagnosticsLog: string[];
}

export interface TerminalHistory {
  command: string;
  output: string;
  timestamp: string;
  type: 'input' | 'output' | 'error' | 'success' | 'system';
}
