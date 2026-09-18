export type Severity = 'critical' | 'high' | 'medium' | 'low' | 'info';
export type FindingSource = 'rule' | 'tool' | 'llm';
export type FindingStatus = 'open' | 'accepted' | 'false_positive' | 'fixed';
export type ReviewStatus =
  | 'queued'
  | 'parsing'
  | 'parsing_ast'
  | 'baseline_rules'
  | 'running_static_rules'
  | 'llm_security'
  | 'running_llm_reasoners'
  | 'llm_quality'
  | 'triage'
  | 'triaging_findings'
  | 'complete'
  | 'completed'
  | 'failed';

export interface Tenant {
  id: string;
  name: string;
  plan: 'Team' | 'Enterprise';
  region: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  tenant: Tenant;
  role: 'Security Engineer' | 'Lead Reviewer' | 'Compliance Officer';
}

export interface BudgetStats {
  tokensUsed: number;
  tokenLimit: number;
  costUsed: number;
  costLimit: number;
  iterations: number;
  iterationLimit: number;
}

export interface Review {
  id: string;
  runId: string;
  title: string;
  language: 'python' | 'javascript' | 'typescript';
  status: ReviewStatus;
  createdAt: string;
  completedAt?: string;
  fileCount: number;
  totalFindings: number;
  severityCounts: Record<Severity, number>;
  budget: BudgetStats;
  deadlineAt?: string;
  legalHold: boolean;
  code: string;
  fileName: string;
  policyProfile: 'Default Policy' | 'Strict OWASP & CWE' | 'Custom Enterprise Guard';
}

export interface Finding {
  id: string;
  reviewId: string;
  fingerprint: string;
  severity: Severity;
  source: FindingSource;
  category: string;
  title: string;
  description: string;
  file: string;
  line: number;
  endLine?: number;
  column?: number;
  codeSnippet: string;
  confidence: number;
  cwe?: string;
  ruleId?: string;
  toolName?: string;
  evidence?: string;
  suggestedFix?: string;
  diffPatch?: {
    original: string[];
    replacement: string[];
  };
  status: FindingStatus;
  userFeedback?: Feedback;
}

export interface Feedback {
  findingId: string;
  helpful: boolean;
  type?: 'helpful' | 'not_helpful' | 'false_positive' | 'incorrect_patch';
  reason?: 'false_positive' | 'not_actionable' | 'duplicate' | 'wrong_severity' | 'other';
  comment?: string;
  submittedAt: string;
}

export interface Report {
  id: string;
  reviewId: string;
  reviewTitle: string;
  formats: ('json' | 'html' | 'pdf')[];
  executiveSummary: string;
  summary?: string;
  createdAt: string;
  generatedAt?: string;
  complianceScore: number;
  threatLevel: 'Low' | 'Moderate' | 'Elevated' | 'Critical';
  adaptersUsed: string[];
  criticalCount?: number;
  highCount?: number;
  remediatedCount?: number;
  ruleCoverage?: string[];
}

export interface EvaluationRun {
  id: string;
  name?: string;
  corpusVersion: string;
  precision: number;
  recall: number;
  f1: number;
  falsePositives: number;
  falseNegatives: number;
  adapterCoverage: Record<string, number>;
  createdAt: string;
  testedAt?: string;
  status: 'passed' | 'review_required';
  metrics?: {
    precision: number;
    recall: number;
    f1: number;
    falsePositiveRate: number;
  };
  corporaBreakdown?: {
    corpus: string;
    sampleCount: number;
    precision: number;
    recall: number;
    f1: number;
  }[];
}

export interface GitHubRepo {
  id: string;
  fullName: string;
  defaultBranch: string;
  policyScope: string;
  lastReviewStatus: 'clean' | 'findings_pending' | 'blocked';
  pullRequestsCount: number;
  automatedPRGate: boolean;
}

export interface PatchCandidate {
  id: string;
  reviewId: string;
  findingId: string;
  title: string;
  diff: string;
  status: 'pending' | 'running' | 'passed' | 'failed' | 'applied' | 'tested';
  sandbox?: {
    cpu: number;
    memory: number;
    networkEgress: number;
    logs: string;
    isolationType: 'gVisor MicroVM' | 'Firecracker Sandboxed Container';
  };
}

export interface AgentRun {
  id: string;
  type: 'triage' | 'dependency' | 'dataflow' | 'testing' | 'report';
  name: string;
  status: 'queued' | 'running' | 'complete' | 'failed' | 'active' | 'idle';
  startedAt: string;
  completedAt?: string;
  cost: number;
  latencyMs: number;
  decisionExplanation: string;
}
