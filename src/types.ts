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

// NEW: Course related types
export interface Course {
  id: string;
  title: string;
  icon: string;
  description: string;
  category: 'programming' | 'development' | 'devops' | 'projects' | 'mentorship';
  isComingSoon: boolean;
  enrolledCount?: number;
  lessons?: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  isCompleted?: boolean;
  videoUrl?: string;
  content?: string;
}

// NEW: Mock test related types
export interface MockTest {
  id: string;
  title: string;
  type: 'demo' | 'premium' | 'ai' | 'technical' | 'aptitude';
  description: string;
  isComingSoon: boolean;
  duration: number;
  questions?: number;
  price?: number;
}

// NEW: User progress tracking
export interface UserProgress {
  userId: string;
  courseId: string;
  lessonId: string;
  isCompleted: boolean;
  completedAt?: string;
  progressPercentage: number;
}

// NEW: Course enrollment
export interface CourseEnrollment {
  userId: string;
  courseId: string;
  enrolledAt: string;
  status: 'active' | 'completed' | 'dropped';
  lastAccessedAt?: string;
}