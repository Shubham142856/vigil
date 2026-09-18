import React, { useState } from 'react';
import {
  ChevronDown,
  Check,
  SlidersHorizontal,
  ArrowUpDown,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  Sparkles,
  Bot,
  Zap,
} from 'lucide-react';

interface DurableAutonomySectionProps {
  onGetStarted?: () => void;
  onRequestDemo?: () => void;
}

export const DurableAutonomySection: React.FC<DurableAutonomySectionProps> = ({
  onGetStarted,
  onRequestDemo,
}) => {
  // Guardrails interactive dropdown state
  const [activeDropdownRow, setActiveDropdownRow] = useState<string | null>('deserialization');
  const [policyValues, setPolicyValues] = useState<Record<string, string>>({
    sqli: 'Block PR',
    cmdi: 'Block PR',
    deserialization: 'Require approval',
    secrets: 'Block PR',
    microvm: 'Enforce',
    sarif: 'Enforce',
  });

  // Active inbox item selection
  const [selectedInboxItem, setSelectedInboxItem] = useState<number | null>(1);

  return (
    <section id="verification" className="relative z-20 w-full bg-black text-white pt-20 pb-32 px-4 sm:px-6 md:px-10 lg:px-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header: Headline on left, descriptive copy on right */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-14 sm:mb-20">
          <div>
            <h2
              className="text-white font-normal tracking-[-0.03em] leading-[1.12]"
              style={{
                fontSize: 'clamp(32px, 4.4vw, 56px)',
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              }}
            >
              <span className="block font-normal">Autonomous verification.</span>
              <span className="block text-white/90 font-normal mt-1">
                Every pull request reviewed with AST certainty.
              </span>
            </h2>
          </div>

          <div className="lg:max-w-md lg:pt-2">
            <p
              className="text-white/60 font-normal leading-[1.65]"
              style={{
                fontSize: 'clamp(14.5px, 1.25vw, 17px)',
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              }}
            >
              Vigil gives security engineering teams deterministic AST taint tracing, multi-agent LLM reasoning, and microVM testbeds built for production CI/CD.
            </p>
          </div>
        </div>

        {/* Outer 4-Module Bento Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          {/* ========================================================================= */}
          {/* CARD 1: Multi-Agent Triage Pipeline (Top-Left) */}
          {/* ========================================================================= */}
          <div className="flex flex-col">
            {/* Visual Preview Container */}
            <div className="relative rounded-2xl border border-white/15 bg-[#0a0a0d] p-5 sm:p-6 shadow-[0_0_50px_rgba(0,0,0,0.7)] overflow-hidden flex flex-col justify-between min-h-[380px]">
              {/* Top specular glow border */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/35 to-transparent" />

              {/* Sub-header inside card */}
              <div className="flex items-center justify-between text-[11px] font-mono select-none mb-6">
                <div className="flex items-center gap-2 text-white/75 font-semibold tracking-wider uppercase">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                  <span>TRIAGE MESH · LIVE</span>
                </div>
                <div className="text-white/40">
                  <span>3 agents · 0 false positives</span>
                </div>
              </div>

              {/* Diagram Area: Nodes & Flow */}
              <div className="relative my-auto py-3">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-2 relative">
                  {/* Node 1: TRIGGER */}
                  <div className="w-full sm:w-[26%] rounded-xl border border-white/10 bg-white/[0.03] p-3 text-center flex flex-col items-center justify-center min-h-[76px]">
                    <span className="text-[9.5px] uppercase tracking-wider text-white/40 font-mono">TRIGGER</span>
                    <span className="text-[13px] font-semibold text-white mt-0.5">PR #482 Open</span>
                    <span className="text-[10px] text-white/40 font-mono mt-0.5">GitHub Action</span>
                  </div>

                  {/* Connecting dashed line 1 */}
                  <div className="hidden sm:flex items-center text-white/30 text-[10px] select-none">
                    · · &gt;
                  </div>

                  {/* Node 2: SHARED CONTEXT */}
                  <div className="w-full sm:w-[30%] rounded-xl border border-white/10 bg-white/[0.03] p-3 text-center flex flex-col items-center justify-center min-h-[76px]">
                    <span className="text-[9.5px] uppercase tracking-wider text-white/40 font-mono">AST TAINT GRAPH</span>
                    <span className="text-[13px] font-semibold text-white mt-0.5">Taint Loaded</span>
                    <span className="text-[10px] text-white/40 font-mono mt-0.5">Python & TS AST</span>
                  </div>

                  {/* Connecting dashed line 2 */}
                  <div className="hidden sm:flex items-center text-white/30 text-[10px] select-none">
                    · · &gt;
                  </div>

                  {/* Node 3: ORCHESTRATOR */}
                  <div className="w-full sm:w-[32%] rounded-xl border border-white/60 bg-black p-3 text-center flex flex-col items-center justify-center min-h-[82px] shadow-[0_0_20px_rgba(255,255,255,0.08)]">
                    <span className="text-[9.5px] uppercase tracking-wider text-white/60 font-mono font-semibold">REASONER</span>
                    <span className="text-[13.5px] font-bold text-white mt-0.5">Triaging Risk</span>
                    <div className="flex items-center gap-1 my-1">
                      <span className="w-1 h-1 rounded-full bg-white/70 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1 h-1 rounded-full bg-white/70 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1 h-1 rounded-full bg-white/70 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    <span className="text-[9.5px] text-white/50 font-mono">evidence verified</span>
                  </div>

                  {/* Fanout lines to Specialized Agents on right */}
                  <div className="w-full sm:w-[30%] flex flex-col gap-2 pt-2 sm:pt-0">
                    {/* Agent 1 */}
                    <div className="flex items-center justify-between px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.02] text-[11.5px]">
                      <span className="text-white/80">Security agent</span>
                      <span className="w-2 h-2 rounded-full bg-rose-400 shadow-[0_0_6px_#f43f5e]" />
                    </div>
                    {/* Agent 2 */}
                    <div className="flex items-center justify-between px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.02] text-[11.5px]">
                      <span className="text-white/80">Quality agent</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                    </div>
                    {/* Agent 3 */}
                    <div className="flex items-center justify-between px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.02] text-[11.5px]">
                      <span className="text-white/80">Patch generator</span>
                      <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Console log feedback line */}
              <div className="mt-4 pt-3 border-t border-white/10 text-[11px] font-mono text-white/50 flex items-center gap-2">
                <span className="text-white/40">&gt;</span>
                <span className="truncate">AST taint proven: CWE-89 raw query in line 46 repaired with parameterized SQL</span>
              </div>

              {/* Bottom statistics row */}
              <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-4 gap-2 text-left">
                <div>
                  <div className="text-[9.5px] uppercase tracking-wider text-white/40 font-mono">PRs AUDITED</div>
                  <div className="text-[14px] sm:text-[15px] font-bold text-white mt-0.5">1,487</div>
                </div>
                <div>
                  <div className="text-[9.5px] uppercase tracking-wider text-white/40 font-mono">PRECISION</div>
                  <div className="text-[14px] sm:text-[15px] font-bold text-white mt-0.5">99.9%</div>
                </div>
                <div>
                  <div className="text-[9.5px] uppercase tracking-wider text-white/40 font-mono">PATCH TIME</div>
                  <div className="text-[14px] sm:text-[15px] font-bold text-white mt-0.5">342ms</div>
                </div>
                <div className="text-right">
                  <div className="text-[9.5px] uppercase tracking-wider text-white/40 font-mono">ISOLATION</div>
                  <div className="text-[12px] sm:text-[13px] font-medium text-emerald-400 mt-1">gVisor VM</div>
                </div>
              </div>
            </div>

            {/* Title & Description below Card */}
            <div className="mt-5">
              <h3 className="text-white text-xl sm:text-2xl font-semibold tracking-tight">
                Multi-Agent Triage Pipeline
              </h3>
              <p className="text-white/60 text-[14px] sm:text-[15px] leading-relaxed mt-2 font-normal">
                Coordinate specialized security and code review agents with shared AST context, exploit validation, and automated patch synthesis.
              </p>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CARD 2: CI/CD & Pipeline Triggers (Top-Right) */}
          {/* ========================================================================= */}
          <div className="flex flex-col">
            {/* Visual Preview Container */}
            <div className="relative rounded-2xl border border-white/15 bg-[#0a0a0d] p-5 sm:p-6 shadow-[0_0_50px_rgba(0,0,0,0.7)] overflow-hidden flex flex-col justify-between min-h-[380px]">
              {/* Top specular glow border */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/35 to-transparent" />

              {/* Header inside card */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <span className="text-white font-bold text-[16px] tracking-tight">Review Pipeline</span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-white/40">NEXT 7 DAYS</span>
                </div>
                <div className="px-2.5 py-1 rounded-full border border-white/20 bg-white/5 text-[10.5px] font-mono text-white/70">
                  12 QUEUED
                </div>
              </div>

              {/* Day of Week Header Grid */}
              <div className="grid grid-cols-7 text-[10.5px] font-mono text-white/40 text-center uppercase tracking-wider pb-2 border-b border-white/10">
                <span>MON</span>
                <span>TUE</span>
                <span>WED</span>
                <span>THU</span>
                <span>FRI</span>
                <span>SAT</span>
                <span>SUN</span>
              </div>

              {/* Schedule Rows */}
              <div className="flex flex-col gap-5 py-4">
                {/* Row 1: PR Security Gate */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-[11.5px]">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">PR Security Gate</span>
                      <span className="text-[10px] font-mono text-white/40">WEBHOOK · REAL-TIME</span>
                    </div>
                    <span className="text-[9.5px] font-mono text-emerald-400 tracking-wider">ACTIVE</span>
                  </div>

                  <div className="h-2 w-full bg-white/[0.04] rounded-full overflow-hidden relative">
                    <div
                      className="absolute top-0 bottom-0 left-0 w-[58%] rounded-full bg-gradient-to-r from-sky-500 via-sky-400 to-sky-200 shadow-[0_0_12px_rgba(56,189,248,0.5)]"
                    />
                  </div>
                </div>

                {/* Row 2: Commit Static Taint Analysis */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-[11.5px]">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">Commit AST Taint Trace</span>
                      <span className="text-[10px] font-mono text-white/40">PUSH EVENT</span>
                    </div>
                    <span className="text-[9.5px] font-mono text-emerald-400 tracking-wider">ACTIVE</span>
                  </div>

                  <div className="h-2 w-full bg-white/[0.04] rounded-full overflow-hidden relative">
                    <div
                      className="absolute top-0 bottom-0 left-[22%] w-[42%] rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-200 shadow-[0_0_12px_rgba(52,211,153,0.5)]"
                    />
                  </div>
                </div>

                {/* Row 3: Nightly CWE Audit */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-[11.5px]">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">Nightly CWE Sweep</span>
                      <span className="text-[10px] font-mono text-white/40">CRON · 02:00</span>
                    </div>
                    <span className="text-[9.5px] font-mono text-purple-400 tracking-wider">SCHEDULED</span>
                  </div>

                  <div className="h-2 w-full bg-white/[0.04] rounded-full overflow-hidden relative">
                    <div
                      className="absolute top-0 bottom-0 left-[48%] w-[38%] rounded-full bg-gradient-to-r from-purple-500 via-indigo-400 to-purple-200 shadow-[0_0_12px_rgba(168,85,247,0.5)]"
                    />
                  </div>
                </div>
              </div>

              {/* Bottom footer row */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/45 select-none">
                <span>GitHub · GitLab · Bitbucket</span>
                <span>&lt;450ms AST evaluation</span>
              </div>
            </div>

            {/* Title & Description below Card */}
            <div className="mt-5">
              <h3 className="text-white text-xl sm:text-2xl font-semibold tracking-tight">
                CI/CD & Pipeline Triggers
              </h3>
              <p className="text-white/60 text-[14px] sm:text-[15px] leading-relaxed mt-2 font-normal">
                Trigger autonomous code reviews on GitHub/GitLab pull requests, commit pushes, or scheduled repository sweeps.
              </p>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CARD 3: Automated Security Policies (Bottom-Left) */}
          {/* ========================================================================= */}
          <div className="flex flex-col">
            {/* Visual Preview Container with Popover Menu */}
            <div className="relative rounded-2xl border border-white/15 bg-[#0a0a0d] p-5 sm:p-6 shadow-[0_0_50px_rgba(0,0,0,0.7)] overflow-visible min-h-[380px] flex flex-col justify-between">
              {/* Top specular glow border */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />

              {/* List of Policies */}
              <div className="flex flex-col gap-2.5 relative">
                {/* Policy 1: SQL Injection */}
                <div className="flex items-center justify-between py-1.5 px-1 border-b border-white/[0.05]">
                  <div>
                    <div className="text-[13px] font-medium text-white">SQL Injection (CWE-89)</div>
                    <div className="text-[11px] text-white/45">Tainted input flowing to database execution</div>
                  </div>
                  <button className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-rose-500/30 bg-rose-500/10 text-[12px] text-rose-300 font-mono">
                    <span>Block PR</span>
                    <ChevronDown className="w-3 h-3 text-rose-300/70" />
                  </button>
                </div>

                {/* Policy 2: Command Injection */}
                <div className="flex items-center justify-between py-1.5 px-1 border-b border-white/[0.05]">
                  <div>
                    <div className="text-[13px] font-medium text-white">Command Injection (CWE-78)</div>
                    <div className="text-[11px] text-white/45">child_process & system exec vulnerabilities</div>
                  </div>
                  <button className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-rose-500/30 bg-rose-500/10 text-[12px] text-rose-300 font-mono">
                    <span>Block PR</span>
                    <ChevronDown className="w-3 h-3 text-rose-300/70" />
                  </button>
                </div>

                {/* Policy 3: Insecure Deserialization (Host for the popover) */}
                <div className="relative flex items-center justify-between py-1.5 px-1 border-b border-white/[0.05]">
                  <div>
                    <div className="text-[13px] font-medium text-white">Insecure Deserialization (CWE-502)</div>
                    <div className="text-[11px] text-white/45">Untrusted pickle or yaml loads</div>
                  </div>
                  <button
                    onClick={() => setActiveDropdownRow(activeDropdownRow === 'deserialization' ? null : 'deserialization')}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-white/30 bg-white/[0.08] text-[12px] text-white font-mono hover:bg-white/15 transition-colors shadow-sm"
                  >
                    <span>{policyValues.deserialization}</span>
                    <ChevronDown className="w-3 h-3 text-white/70" />
                  </button>

                  {/* Floating Action Menu Popover */}
                  {activeDropdownRow === 'deserialization' && (
                    <div className="absolute right-0 top-12 z-30 w-48 rounded-xl border border-white/20 bg-[#121217] p-2 shadow-[0_12px_40px_rgba(0,0,0,0.95)] backdrop-blur-md">
                      <div className="px-2 py-1 text-[11px] font-mono text-white/50 uppercase tracking-wider border-b border-white/10 mb-1">
                        Policy Action
                      </div>
                      <button
                        onClick={() => {
                          setPolicyValues({ ...policyValues, deserialization: 'Monitor only' });
                          setActiveDropdownRow(null);
                        }}
                        className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left text-[12px] text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <span>Monitor only</span>
                      </button>
                      <button
                        onClick={() => {
                          setPolicyValues({ ...policyValues, deserialization: 'Require approval' });
                          setActiveDropdownRow(null);
                        }}
                        className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left text-[12px] text-white bg-white/10 font-medium transition-colors"
                      >
                        <span>Require approval</span>
                        <span className="w-4 h-4 rounded-full bg-emerald-400/20 border border-emerald-400 flex items-center justify-center text-emerald-400">
                          <Check className="w-2.5 h-2.5" />
                        </span>
                      </button>
                      <button
                        onClick={() => {
                          setPolicyValues({ ...policyValues, deserialization: 'Block PR' });
                          setActiveDropdownRow(null);
                        }}
                        className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left text-[12px] text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <span>Block PR</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Policy 4: Secret Leakage */}
                <div className="flex items-center justify-between py-1.5 px-1 border-b border-white/[0.05]">
                  <div>
                    <div className="text-[13px] font-medium text-white">Hardcoded Secrets & API Keys</div>
                    <div className="text-[11px] text-white/45">Shannon entropy and token regex checks</div>
                  </div>
                  <button className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-rose-500/30 bg-rose-500/10 text-[12px] text-rose-300 font-mono">
                    <span>Block PR</span>
                    <ChevronDown className="w-3 h-3 text-rose-300/70" />
                  </button>
                </div>

                {/* Policy 5: MicroVM Verification */}
                <div className="flex items-center justify-between py-1.5 px-1 border-b border-white/[0.05]">
                  <div>
                    <div className="text-[13px] font-medium text-white">MicroVM Sandbox Patch Test</div>
                    <div className="text-[11px] text-white/45">Isolated regression verification before PR merge</div>
                  </div>
                  <button className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-white/15 bg-white/[0.04] text-[12px] text-emerald-400 font-mono hover:bg-white/10 transition-colors">
                    <span>Enforce</span>
                    <ChevronDown className="w-3 h-3 text-white/50" />
                  </button>
                </div>

                {/* Policy 6: SARIF Dossier */}
                <div className="flex items-center justify-between py-1.5 px-1">
                  <div>
                    <div className="text-[13px] font-medium text-white">SARIF Compliance Dossier</div>
                    <div className="text-[11px] text-white/45">Export signed cryptographic security artifact</div>
                  </div>
                  <button className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-white/15 bg-white/[0.04] text-[12px] text-emerald-400 font-mono hover:bg-white/10 transition-colors">
                    <span>Enforce</span>
                    <ChevronDown className="w-3 h-3 text-white/50" />
                  </button>
                </div>
              </div>
            </div>

            {/* Title & Description below Card */}
            <div className="mt-5">
              <h3 className="text-white text-xl sm:text-2xl font-semibold tracking-tight">
                Automated Security Policies
              </h3>
              <p className="text-white/60 text-[14px] sm:text-[15px] leading-relaxed mt-2 font-normal">
                Define deterministic gating rules and compliance barriers that automatically halt insecure pull requests before deployment.
              </p>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CARD 4: Security Findings Inbox (Bottom-Right) */}
          {/* ========================================================================= */}
          <div className="flex flex-col">
            {/* Visual Preview Container */}
            <div className="relative rounded-2xl border border-white/15 bg-[#0a0a0d] p-5 sm:p-6 shadow-[0_0_50px_rgba(0,0,0,0.7)] overflow-hidden flex flex-col justify-between min-h-[380px]">
              {/* Top specular glow border */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/35 to-transparent" />

              {/* Header inside card */}
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold text-[16px] tracking-tight">Findings Inbox</span>
                  <span className="text-white/40 text-xs">···</span>
                </div>
                <div className="flex items-center gap-3 text-white/45">
                  <SlidersHorizontal className="w-3.5 h-3.5 hover:text-white cursor-pointer transition-colors" />
                  <ArrowUpDown className="w-3.5 h-3.5 hover:text-white cursor-pointer transition-colors" />
                </div>
              </div>

              {/* Notification List Items */}
              <div className="flex flex-col gap-2.5">
                {/* Item 1: CWE-89 Patch verified */}
                <div
                  onClick={() => setSelectedInboxItem(1)}
                  className={`flex items-start justify-between p-2.5 rounded-xl border transition-all cursor-pointer ${
                    selectedInboxItem === 1
                      ? 'border-white/30 bg-white/[0.08]'
                      : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border border-black flex items-center justify-center text-black text-[9px] font-bold">
                        ✓
                      </span>
                    </div>

                    <div>
                      <div className="text-[13px] font-medium text-white">CWE-89 Patch verified</div>
                      <div className="text-[11.5px] text-white/50 mt-0.5">api-gateway: Parameterized query patch tested in gVisor</div>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono text-white/40 shrink-0 mt-0.5">8m</span>
                </div>

                {/* Item 2: CWE-502 Deserialization blocked */}
                <div
                  onClick={() => setSelectedInboxItem(2)}
                  className={`flex items-start justify-between p-2.5 rounded-xl border transition-all cursor-pointer ${
                    selectedInboxItem === 2
                      ? 'border-white/30 bg-white/[0.08]'
                      : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-4 h-4 text-amber-400" />
                      <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-400 border border-black flex items-center justify-center text-black text-[9px] font-bold">
                        !
                      </span>
                    </div>

                    <div>
                      <div className="text-[13px] font-medium text-white">CWE-502 Deserialization blocked</div>
                      <div className="text-[11.5px] text-white/50 mt-0.5">auth-service: Untrusted pickle stream halted in PR #479</div>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono text-white/40 shrink-0 mt-0.5">1h</span>
                </div>

                {/* Item 3: Command Injection Sanity Gate */}
                <div
                  onClick={() => setSelectedInboxItem(3)}
                  className={`flex items-start justify-between p-2.5 rounded-xl border transition-all cursor-pointer ${
                    selectedInboxItem === 3
                      ? 'border-white/30 bg-white/[0.08]'
                      : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Zap className="w-4 h-4 text-cyan-400" />
                      <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-cyan-400 border border-black flex items-center justify-center text-black text-[9px] font-bold">
                        ✓
                      </span>
                    </div>

                    <div>
                      <div className="text-[13px] font-medium text-white">MicroVM Regression Gate Passed</div>
                      <div className="text-[11.5px] text-white/50 mt-0.5">worker-node: Child process command args sanitized</div>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono text-white/40 shrink-0 mt-0.5">4h</span>
                </div>

                {/* Item 4: Nightly AST Audit complete */}
                <div
                  onClick={() => setSelectedInboxItem(4)}
                  className={`flex items-start justify-between p-2.5 rounded-xl border transition-all cursor-pointer ${
                    selectedInboxItem === 4
                      ? 'border-white/30 bg-white/[0.08]'
                      : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-purple-400" />
                      <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border border-black flex items-center justify-center text-black text-[9px] font-bold">
                        ✓
                      </span>
                    </div>

                    <div>
                      <div className="text-[13px] font-medium text-white">Full AST Sweep Complete</div>
                      <div className="text-[11.5px] text-white/50 mt-0.5">All 28 microservice repositories clean · SARIF ledger generated</div>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono text-white/40 shrink-0 mt-0.5">1d</span>
                </div>
              </div>
            </div>

            {/* Title & Description below Card */}
            <div className="mt-5">
              <h3 className="text-white text-xl sm:text-2xl font-semibold tracking-tight">
                Security Findings Inbox
              </h3>
              <p className="text-white/60 text-[14px] sm:text-[15px] leading-relaxed mt-2 font-normal">
                Triage verified vulnerabilities, review sandbox-tested patch candidates, and merge automated git diffs with a single click.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
