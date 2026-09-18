import React from 'react';
import { Clock, ShieldCheck, Zap, Server, Activity, ArrowUpRight, Cpu, Layers } from 'lucide-react';

interface ContentSectionsProps {
  isAegisMode?: boolean;
  onOpenGetStarted: () => void;
  onOpenDemo: () => void;
}

export const ContentSections: React.FC<ContentSectionsProps> = ({
  isAegisMode = true,
  onOpenGetStarted,
  onOpenDemo,
}) => {
  return (
    <div className="relative z-10 w-full bg-black text-white">
      {/* SECOND HERO STATEMENT: "THE VIGIL APPROACH // SECURITY & CODE REVIEW" */}
      <section id="about" className="py-28 md:py-40 px-6 md:px-12 border-t border-white/10 max-w-6xl mx-auto">
        <div className="text-[11px] md:text-xs font-mono tracking-[0.2em] text-white/40 uppercase mb-8">
          THE VIGIL APPROACH // DETERMINISTIC CODE VERIFICATION
        </div>

        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-[-0.05em] leading-[0.96] text-white max-w-4xl">
          Don't just find <br />
          <span className="text-white/80">vulnerabilities.</span>
        </h2>

        <p className="mt-8 text-2xl sm:text-3xl md:text-4xl text-white/50 font-light tracking-tight">
          Prove them.
        </p>

        <p className="mt-6 text-sm sm:text-base md:text-lg text-white/60 max-w-2xl leading-relaxed">
          Traditional SAST generates noisy lists of hypothetical warnings that stall velocity. Vigil couples deterministic AST taint graphs with multi-agent LLM reasoning and regression-safe microVM patches directly in your CI/CD pipeline.
        </p>
      </section>

      {/* CORE CAPABILITIES / FEATURES */}
      <section id="features" className="py-24 px-6 md:px-12 border-t border-white/10 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="text-[11px] font-mono tracking-[0.2em] text-white/40 uppercase mb-3">
              CAPABILITIES
            </div>
            <h3 className="text-3xl sm:text-4xl font-normal tracking-tight text-white">
              Precision Verification Pipeline
            </h3>
          </div>
          <p className="text-sm text-white/50 max-w-md">
            Eliminate false positives with deterministic AST taint graphs, multi-agent security triage, and verified patch diff generation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-xl overflow-hidden">
          <div className="p-8 bg-black hover:bg-[#070709] transition-colors flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-white/40 mb-3">01 // AST TAINT TRACING</div>
              <h4 className="text-lg font-medium text-white mb-2">Symbolic Data-Flow Analysis</h4>
              <p className="text-xs text-white/60 leading-relaxed">
                Traces untrusted user inputs across control boundaries directly to sensitive sinks with AST graph traversal for Python and TypeScript.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/5 text-[11px] font-mono text-white/40">
              Zero False Positives · CWE-89/78/502
            </div>
          </div>

          <div className="p-8 bg-black hover:bg-[#070709] transition-colors flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-white/40 mb-3">02 // MULTI-AGENT REASONING</div>
              <h4 className="text-lg font-medium text-white mb-2">Triaged LLM Verification</h4>
              <p className="text-xs text-white/60 leading-relaxed">
                Specialized security, code quality, and triage agents collaborate with token-bounded reasoning to validate exploitability proofs.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/5 text-[11px] font-mono text-white/40">
              Hermetic Evidence Chains
            </div>
          </div>

          <div className="p-8 bg-black hover:bg-[#070709] transition-colors flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-white/40 mb-3">03 // SANDBOXED REPAIR</div>
              <h4 className="text-lg font-medium text-white mb-2">Automated Fix Verification</h4>
              <p className="text-xs text-white/60 leading-relaxed">
                Synthesizes minimal git diffs and runs regression test suites in isolated gVisor and Firecracker microVMs before PR submission.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/5 text-[11px] font-mono text-white/40">
              MicroVM Isolation & Zero Regression
            </div>
          </div>
        </div>
      </section>

      {/* TELEMETRY / BENCHMARKS / METHODOLOGY */}
      <section id="benchmarks" className="py-24 px-6 md:px-12 border-t border-white/10 max-w-6xl mx-auto">
        <div className="text-[11px] font-mono tracking-[0.2em] text-white/40 uppercase mb-3">
          SECURITY BENCHMARKS
        </div>
        <h3 className="text-3xl sm:text-4xl font-normal tracking-tight text-white mb-12">
          From Static Taint Analysis to Mathematical Proof
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-6 border border-white/10 rounded-lg bg-white/[0.02]">
            <div className="text-3xl md:text-4xl font-mono font-light text-white mb-1">94.2%</div>
            <div className="text-xs text-white/50 uppercase tracking-wider font-mono">
              Ground-Truth Precision
            </div>
          </div>
          <div className="p-6 border border-white/10 rounded-lg bg-white/[0.02]">
            <div className="text-3xl md:text-4xl font-mono font-light text-white mb-1">&lt;450ms</div>
            <div className="text-xs text-white/50 uppercase tracking-wider font-mono">
              Deterministic AST Scan
            </div>
          </div>
          <div className="p-6 border border-white/10 rounded-lg bg-white/[0.02]">
            <div className="text-3xl md:text-4xl font-mono font-light text-white mb-1">100M+</div>
            <div className="text-xs text-white/50 uppercase tracking-wider font-mono">
              Lines Audited Monthly
            </div>
          </div>
          <div className="p-6 border border-white/10 rounded-lg bg-white/[0.02]">
            <div className="text-3xl md:text-4xl font-mono font-light text-white mb-1">0</div>
            <div className="text-xs text-white/50 uppercase tracking-wider font-mono">
              Unverified False Alarms
            </div>
          </div>
        </div>
      </section>

      {/* PRICING PLANS */}
      <section id="pricing" className="py-24 px-6 md:px-12 border-t border-white/10 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-[11px] font-mono tracking-[0.2em] text-white/40 uppercase mb-3">
            PRICING TIERS
          </div>
          <h3 className="text-3xl sm:text-4xl font-normal tracking-tight text-white mb-4">
            Predictable security scaling for engineering teams
          </h3>
          <p className="text-sm text-white/60">
            Deploy in minutes via GitHub Actions, GitLab CI, or self-hosted VPC clusters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Free / Starter */}
          <div className="p-8 border border-white/10 rounded-xl bg-black flex flex-col justify-between hover:border-white/20 transition-all">
            <div>
              <div className="text-xs font-mono text-white/50 uppercase tracking-widest mb-2">Developer</div>
              <div className="text-3xl font-mono font-normal text-white mb-4">
                $0 <span className="text-sm text-white/40 font-sans">/ month</span>
              </div>
              <p className="text-xs text-white/60 mb-6">For individual developers and open-source project maintainers.</p>
              <ul className="space-y-2.5 text-xs text-white/70">
                <li className="flex items-center gap-2">✓ 50 PR security reviews / month</li>
                <li className="flex items-center gap-2">✓ Deterministic AST taint analysis (Python & TS)</li>
                <li className="flex items-center gap-2">✓ Basic automated patch suggestions</li>
                <li className="flex items-center gap-2">✓ GitHub & GitLab webhook integration</li>
              </ul>
            </div>
            <button
              onClick={onOpenGetStarted}
              className="mt-8 w-full py-2.5 rounded-full border border-white/30 text-xs font-semibold uppercase tracking-wider hover:bg-white hover:text-black transition-all cursor-pointer"
            >
              Start Free Audit
            </button>
          </div>

          {/* Team / Pro */}
          <div className="p-8 border border-white/40 rounded-xl bg-white/[0.03] flex flex-col justify-between shadow-2xl relative">
            <div className="absolute -top-3 right-6 px-2.5 py-0.5 rounded-full bg-white text-black text-[10px] font-bold font-mono tracking-wider uppercase">
              Most Popular
            </div>
            <div>
              <div className="text-xs font-mono text-white uppercase tracking-widest mb-2">Security Team</div>
              <div className="text-3xl font-mono font-normal text-white mb-4">
                $149 <span className="text-sm text-white/40 font-sans">/ month</span>
              </div>
              <p className="text-xs text-white/60 mb-6">For fast-moving engineering teams needing automated security gates.</p>
              <ul className="space-y-2.5 text-xs text-white/80">
                <li className="flex items-center gap-2">✓ Unlimited PR and commit security reviews</li>
                <li className="flex items-center gap-2">✓ Multi-agent LLM reasoning & exploit triage</li>
                <li className="flex items-center gap-2">✓ gVisor MicroVM isolated patch verification</li>
                <li className="flex items-center gap-2">✓ Automated PR diff creation with regression tests</li>
                <li className="flex items-center gap-2">✓ SARIF v2.1.0 and NIST compliance exports</li>
              </ul>
            </div>
            <button
              onClick={onOpenGetStarted}
              className="mt-8 w-full py-2.5 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-white/90 transition-all cursor-pointer"
            >
              Get Started »
            </button>
          </div>

          {/* Enterprise */}
          <div className="p-8 border border-white/10 rounded-xl bg-black flex flex-col justify-between hover:border-white/20 transition-all">
            <div>
              <div className="text-xs font-mono text-white/50 uppercase tracking-widest mb-2">Enterprise</div>
              <div className="text-3xl font-mono font-normal text-white mb-4">Custom</div>
              <p className="text-xs text-white/60 mb-6">For regulated organizations requiring VPC isolation and custom LLM tuning.</p>
              <ul className="space-y-2.5 text-xs text-white/70">
                <li className="flex items-center gap-2">✓ Dedicated single-tenant VPC / On-prem deployment</li>
                <li className="flex items-center gap-2">✓ Custom CWE rulesets & proprietary AST parsers</li>
                <li className="flex items-center gap-2">✓ Private LLM tenant routing (Zero data retention)</li>
                <li className="flex items-center gap-2">✓ SOC2 Type II, ISO 27001, & FedRAMP compliance</li>
              </ul>
            </div>
            <button
              onClick={onOpenDemo}
              className="mt-8 w-full py-2.5 rounded-full border border-white/30 text-xs font-semibold uppercase tracking-wider hover:bg-white hover:text-black transition-all cursor-pointer"
            >
              Request Enterprise Demo
            </button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-24 px-6 md:px-12 border-t border-white/10 max-w-6xl mx-auto">
        <div className="text-[11px] font-mono tracking-[0.2em] text-white/40 uppercase mb-3">
          TESTIMONIALS
        </div>
        <h3 className="text-3xl sm:text-4xl font-normal tracking-tight text-white mb-12">
          Trusted by DevSecOps and security engineering leads
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 border border-white/10 rounded-xl bg-white/[0.01]">
            <p className="text-sm md:text-base text-white/80 leading-relaxed font-light mb-6">
              "Legacy SAST tools inundated our team with hundreds of false alarms every sprint. Vigil eliminated 95% of noise by generating concrete exploit proofs and verified patch candidates before engineers even context-switched."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center font-bold text-xs">
                AR
              </div>
              <div>
                <div className="text-xs font-semibold text-white">Alex Rivera</div>
                <div className="text-[11px] text-white/40">Head of Product Security, Acme Systems</div>
              </div>
            </div>
          </div>

          <div className="p-8 border border-white/10 rounded-xl bg-white/[0.01]">
            <p className="text-sm md:text-base text-white/80 leading-relaxed font-light mb-6">
              "The automated sandbox validation using gVisor microVMs gave our compliance team absolute confidence that suggested patches actually solved the vulnerability without breaking production API contracts."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center font-bold text-xs">
                EL
              </div>
              <div>
                <div className="text-xs font-semibold text-white">Elena Lin</div>
                <div className="text-[11px] text-white/40">VP of Security Engineering, Decibel Labs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 md:px-12 border-t border-white/10 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between text-xs text-white/40 gap-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-white tracking-wider">△ VIGIL // AUTONOMOUS CODE REVIEW</span>
          <span>© 2026. Vigil Autonomous Code Verification. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#features" className="hover:text-white transition-colors">Capabilities</a>
          <a href="#execution" className="hover:text-white transition-colors">Pipeline</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <button onClick={onOpenGetStarted} className="text-white hover:underline cursor-pointer">
            Run Security Audit »
          </button>
        </div>
      </footer>
    </div>
  );
};

