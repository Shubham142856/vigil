import React, { useState, useEffect } from 'react';
import { X, Play, RefreshCw, CheckCircle2, AlertCircle, Clock, Database, Cpu, Terminal, Shield, ArrowRight } from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAegisMode?: boolean;
  onOpenConsole?: () => void;
}

interface AgentJob {
  id: string;
  name: string;
  trigger: string;
  cadence: string;
  status: 'idle' | 'running' | 'completed' | 'verified';
  agent: string;
  lastRun: string;
  memoryState: Record<string, any>;
}

export const DemoModal: React.FC<DemoModalProps> = ({
  isOpen,
  onClose,
  isAegisMode = true,
  onOpenConsole,
}) => {
  if (!isOpen) return null;

  const [activeJobId, setActiveJobId] = useState<string>('job-1');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([
    '[INIT] Vigil Kernel v2.4 initialized with deterministic AST parser',
    '[SYNC] Connected to distributed taint graph engine (latency: 0.8ms)',
    '[SECURITY] 4 AST taint rules registered with zero false-positive policy',
  ]);

  const jobs: AgentJob[] = isAegisMode
    ? [
        {
          id: 'job-1',
          name: 'AST Data-Flow Taint Analyzer',
          trigger: 'git.push (main)',
          cadence: 'On Commit',
          status: 'verified',
          agent: 'Semgrep-AST Worker 04',
          lastRun: '12s ago',
          memoryState: {
            vulnerability: 'CWE-89 SQL Injection',
            sink: 'db.raw_query(params[:id])',
            exploitProof: 'PROVEN_EXPLOITABLE',
            patchGenerated: true,
          },
        },
        {
          id: 'job-2',
          name: 'Auth Token Leakage Verifier',
          trigger: 'scheduled.scan',
          cadence: 'Hourly',
          status: 'idle',
          agent: 'Secret-Audit Agent',
          lastRun: '44m ago',
          memoryState: {
            endpointsScanned: 142,
            leaksFound: 0,
            status: 'SECURE',
          },
        },
      ]
    : [
        {
          id: 'job-1',
          name: 'Market Intelligence Sentinel',
          trigger: 'cron(*/5 * * * *)',
          cadence: 'Every 5 min',
          status: 'idle',
          agent: 'Claude-3.5 Sonnet Agent',
          lastRun: '2m ago',
          memoryState: {
            session_id: 'vigil-sess-8891a',
            durable_context_size: '42.8 KB',
            pending_events: 0,
            step_checkpoint: 'step_fetch_alpha_vantage',
            confidence: 0.984,
          },
        },
        {
          id: 'job-2',
          name: 'Autonomous GitHub PR Reviewer',
          trigger: 'webhook: github.pull_request',
          cadence: 'Event-driven',
          status: 'completed',
          agent: 'DeepSeek-V3 Coder Agent',
          lastRun: '14s ago',
          memoryState: {
            repo: 'acme-corp/api-gateway',
            pr_number: 412,
            diff_lines: 320,
            review_status: 'LGTM_WITH_NITPICKS',
          },
        },
        {
          id: 'job-3',
          name: 'CRM Multi-System Reconciler',
          trigger: 'cron(0 * * * *)',
          cadence: 'Hourly',
          status: 'idle',
          agent: 'CrewAI Multi-Worker Pool',
          lastRun: '38m ago',
          memoryState: {
            systems: ['HubSpot', 'Stripe', 'BigQuery'],
            synced_entities: 1450,
            drift_detected: false,
          },
        },
      ];

  const activeJob = jobs.find((j) => j.id === activeJobId) || jobs[0];

  const triggerRun = () => {
    if (isRunning) return;
    setIsRunning(true);
    const newLog = `[DISPATCH] Agent ${activeJob.name} invoked via Vigil Trigger`;
    setLogs((prev) => [...prev, newLog]);

    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        `[CONTEXT] Loaded persistent snapshot: ${activeJob.agent} (state verified)`,
      ]);
    }, 600);

    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        `[EXECUTE] Running plan with state barrier locks...`,
        `[HEARTBEAT] Worker heartbeat ok (p99 latency: 14ms)`,
      ]);
    }, 1300);

    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        `[SUCCESS] Run completed cleanly. Context persisted to durable storage.`,
      ]);
      setIsRunning(false);
    }, 2100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#09090b] border border-white/15 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h2 className="text-sm font-semibold tracking-wide text-white uppercase font-mono">
              Vigil Autonomous Code Review Engine Demo
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors p-1 rounded-md hover:bg-white/5"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-white/10 overflow-y-auto">
          {/* Left Column: Scheduled Agents List */}
          <div className="md:col-span-5 p-5 space-y-3 bg-black/40">
            <div className="text-[11px] font-mono uppercase tracking-widest text-white/40 pb-1">
              Active Schedules
            </div>
            <div className="space-y-2">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => setActiveJobId(job.id)}
                  className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                    activeJobId === job.id
                      ? 'bg-white/10 border-white/40 text-white shadow-lg'
                      : 'bg-white/[0.02] border-white/5 text-white/70 hover:bg-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="truncate pr-2">{job.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-white/80">
                      {job.cadence}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-[11px] text-white/40">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>{job.agent}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10">
              <button
                onClick={triggerRun}
                disabled={isRunning}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-white/90 transition-all disabled:opacity-50 cursor-pointer shadow-md"
              >
                {isRunning ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Executing Run...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>Trigger Immediate Run</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Context State & Live Execution Output */}
          <div className="md:col-span-7 p-5 space-y-4 bg-[#0a0a0c]">
            <div>
              <div className="flex items-center justify-between text-xs text-white/50 mb-2">
                <span className="font-mono uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5" />
                  Durable Context State
                </span>
                <span className="text-[10px] text-emerald-400 font-mono">Sync Status: Healthy</span>
              </div>
              <pre className="p-3.5 rounded-lg bg-black border border-white/10 font-mono text-[11px] text-emerald-300/90 overflow-x-auto max-h-40 leading-relaxed">
                {JSON.stringify(activeJob.memoryState, null, 2)}
              </pre>
            </div>

            {/* Live Telemetry Log */}
            <div>
              <div className="flex items-center justify-between text-xs text-white/50 mb-2">
                <span className="font-mono uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  Execution Event Stream
                </span>
                <span className="text-[10px] text-white/40 font-mono">Auto-Scroll ON</span>
              </div>
              <div className="p-3.5 rounded-lg bg-black border border-white/10 font-mono text-[11px] text-white/80 space-y-1.5 max-h-48 overflow-y-auto">
                {logs.map((log, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-white/30 select-none">&gt;</span>
                    <span
                      className={
                        log.includes('[SUCCESS]')
                          ? 'text-emerald-400'
                          : log.includes('[DISPATCH]')
                          ? 'text-sky-300'
                          : 'text-white/70'
                      }
                    >
                      {log}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-white/10 bg-black/60 flex items-center justify-between text-xs text-white/40">
          <span>Deterministic Scheduler Guarantee: 99.999% SLA</span>
          <div className="flex items-center gap-3">
            {onOpenConsole && (
              <button
                onClick={() => {
                  onClose();
                  onOpenConsole();
                }}
                className="px-3 py-1 rounded-full bg-white text-black font-semibold text-xs flex items-center gap-1.5 hover:bg-white/90 transition-colors cursor-pointer"
              >
                <span>Launch Review Console</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="text-white hover:text-white/80 font-medium tracking-wide transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
