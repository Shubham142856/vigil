import React, { useState } from 'react';
import { X, Check, Copy, Terminal, Zap, Shield, ArrowRight } from 'lucide-react';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAegisMode?: boolean;
}

export const GetStartedModal: React.FC<GetStartedModalProps> = ({
  isOpen,
  onClose,
  isAegisMode = true,
}) => {
  if (!isOpen) return null;

  const [framework, setFramework] = useState<'python' | 'node' | 'curl'>('python');
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const codeSnippets: Record<string, string> = {
    python: `# pip install vigil-security
from vigil import SecurityAudit, ASTEngine

audit = SecurityAudit(api_key="vigil_live_sec_...")
findings = audit.analyze_repo(
    repo_url="https://github.com/org/repo",
    prove_exploitability=True,
    verify_patch=True
)

for finding in findings:
    print(f"[!] {finding.cwe_id}: {finding.proof_status}")
    print(finding.verified_diff)`,
    node: `// npm i @vigil-security/sdk
import { VigilClient } from '@vigil-security/sdk';

const vigil = new VigilClient({ apiKey: process.env.VIGIL_KEY });
const result = await vigil.audit.proveVulnerability({
  codeSnippet: userInputCode,
  engine: 'ast-multiagent-hybrid'
});

console.log(result.evidenceReport);`,
    curl: `curl -X POST https://api.vigil.security/v1/audit \\
  -H "Authorization: Bearer vigil_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{"target": "git@github.com:org/repo.git", "mode": "prove"}'`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[framework]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#09090b] border border-white/15 rounded-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <h2 className="text-sm font-semibold tracking-wide text-white uppercase font-mono">
              Get Started with Vigil Security
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

        {/* Content */}
        <div className="p-6 space-y-5">
          {submitted ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mx-auto text-white">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-white">API Access Initialized</h3>
              <p className="text-sm text-white/60 max-w-sm mx-auto">
                We have registered your workspace for early access. Use the sample code below to verify your webhook or SDK integration.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter engineering email for API credentials..."
                className="flex-1 bg-black border border-white/20 rounded-full px-4 py-2.5 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-white transition-colors"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-white/90 transition-all cursor-pointer whitespace-nowrap"
              >
                Claim Sandbox Key
              </button>
            </form>
          )}

          {/* Language Selector */}
          <div>
            <div className="flex items-center justify-between pb-2">
              <div className="flex items-center gap-1.5 text-xs text-white/50 font-mono uppercase tracking-wider">
                <Terminal className="w-3.5 h-3.5" />
                <span>Quickstart SDK</span>
              </div>
              <div className="flex rounded-md bg-white/5 p-0.5 border border-white/10 text-[11px] font-mono">
                <button
                  onClick={() => setFramework('python')}
                  className={`px-3 py-1 rounded transition-colors ${
                    framework === 'python' ? 'bg-white text-black font-semibold' : 'text-white/60 hover:text-white'
                  }`}
                >
                  Python
                </button>
                <button
                  onClick={() => setFramework('node')}
                  className={`px-3 py-1 rounded transition-colors ${
                    framework === 'node' ? 'bg-white text-black font-semibold' : 'text-white/60 hover:text-white'
                  }`}
                >
                  TypeScript
                </button>
                <button
                  onClick={() => setFramework('curl')}
                  className={`px-3 py-1 rounded transition-colors ${
                    framework === 'curl' ? 'bg-white text-black font-semibold' : 'text-white/60 hover:text-white'
                  }`}
                >
                  cURL
                </button>
              </div>
            </div>

            <div className="relative rounded-lg bg-black border border-white/15 overflow-hidden">
              <pre className="p-4 font-mono text-xs text-white/80 overflow-x-auto leading-relaxed max-h-56">
                <code>{codeSnippets[framework]}</code>
              </pre>
              <button
                onClick={handleCopy}
                className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 border border-white/10 text-[10px] font-mono text-white transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-white/10 bg-black/50 flex items-center justify-between text-xs text-white/40">
          <span>Production Ready • End-to-end Encrypted • SOC2 Type II Compliant</span>
          <button
            onClick={onClose}
            className="text-white hover:text-white/80 font-medium tracking-wide transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
