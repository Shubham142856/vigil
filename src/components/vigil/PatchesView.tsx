import React, { useState } from 'react';
import {
  GitPullRequest,
  CheckCircle2,
  Terminal,
  Cpu,
  HardDrive,
  Globe,
  Lock,
  Copy,
  Check,
  Send,
} from 'lucide-react';
import { PatchCandidate } from '../../types/vigil';

interface PatchesViewProps {
  patches: PatchCandidate[];
}

export const PatchesView: React.FC<PatchesViewProps> = ({ patches }) => {
  const [selectedPatchId, setSelectedPatchId] = useState(patches[0]?.id);
  const [commentText, setCommentText] = useState(
    '### 🛡️ Vigil Security Patch Verification\n\nIdentified CWE-89 SQL Injection in `src/app.py`. Parameterized bindings have been applied and tested in an isolated micro-sandbox. Memory: 48MB, Network Egress: 0 bytes. Safe for merge.'
  );
  const [isCopied, setIsCopied] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  const selected = patches.find((p) => p.id === selectedPatchId) || patches[0];

  const handleCopyDiff = () => {
    if (selected) {
      navigator.clipboard.writeText(selected.diff);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handlePublishComment = () => {
    setIsPublished(true);
    setTimeout(() => setIsPublished(false), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col gap-6 text-white select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <GitPullRequest className="w-5 h-5 text-emerald-400" />
            <span>Patch Validation & Sandbox Verification</span>
          </h1>
          <p className="text-xs text-white/50 mt-1">
            Automated remediation diffs verified inside gVisor & Firecracker isolated micro-sandboxes.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono">
          <Lock className="w-3.5 h-3.5" />
          <span>Zero Network Egress Enforced</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Patch Candidates List */}
        <div className="flex flex-col gap-3">
          <span className="text-xs font-mono uppercase text-white/50 font-bold">
            Validated Patches ({patches.length})
          </span>

          {patches.map((p) => {
            const isSelected = p.id === selectedPatchId;
            return (
              <div
                key={p.id}
                onClick={() => setSelectedPatchId(p.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col gap-2 ${
                  isSelected
                    ? 'bg-white/10 border-white text-white shadow-md'
                    : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-white/70">#{p.id}</span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Sandbox Verified</span>
                  </span>
                </div>
                <h3 className="text-xs font-semibold text-white">{p.title}</h3>
                <div className="text-[11px] text-white/50 font-mono">Target: {p.findingId}</div>
              </div>
            );
          })}
        </div>

        {/* Right: Telemetry + Unified Diff + PR Composer */}
        {selected && (
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Micro-Sandbox Telemetry */}
            {selected.sandbox && (
              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.03] flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-white">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    <span>Micro-Sandbox Verification Environment</span>
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/15">
                    {selected.sandbox.isolationType}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 font-mono text-xs">
                  <div className="p-2.5 rounded-lg bg-black border border-white/10">
                    <span className="text-white/50 text-[11px] flex items-center gap-1">
                      <Cpu className="w-3 h-3 text-white/70" /> CPU Usage
                    </span>
                    <span className="text-white font-bold mt-1 block">
                      {selected.sandbox.cpu}%
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-black border border-white/10">
                    <span className="text-white/50 text-[11px] flex items-center gap-1">
                      <HardDrive className="w-3 h-3 text-white/70" /> Memory Cap
                    </span>
                    <span className="text-white font-bold mt-1 block">
                      {selected.sandbox.memory} MB
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-black border border-white/10">
                    <span className="text-white/50 text-[11px] flex items-center gap-1">
                      <Globe className="w-3 h-3 text-emerald-400" /> Network Egress
                    </span>
                    <span className="text-emerald-400 font-bold mt-1 block">0 KB (Blocked)</span>
                  </div>
                </div>

                {/* Execution log */}
                <div className="p-3 bg-black rounded-lg border border-white/10 font-mono text-[11.5px] text-white/70 whitespace-pre-line leading-relaxed">
                  {selected.sandbox.logs}
                </div>
              </div>
            )}

            {/* Unified Diff */}
            <div className="p-4 rounded-xl border border-white/10 bg-white/[0.03] flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-white/50 font-bold uppercase">
                  Automated Unified Diff
                </span>
                <button
                  onClick={handleCopyDiff}
                  className="flex items-center gap-1.5 text-xs text-white/70 font-mono hover:text-white cursor-pointer transition-colors"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'Copied' : 'Copy Diff'}</span>
                </button>
              </div>

              <div className="p-3 bg-black rounded-lg border border-white/10 font-mono text-xs whitespace-pre overflow-x-auto text-white/80">
                {selected.diff}
              </div>
            </div>

            {/* PR Comment Composer */}
            <div className="p-4 rounded-xl border border-white/10 bg-white/[0.03] flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white">
                  Pull Request Review Comment Composer
                </span>
                {isPublished && (
                  <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Published to GitHub PR #42
                  </span>
                )}
              </div>

              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={4}
                className="w-full bg-black border border-white/15 rounded-lg p-3 text-xs font-mono text-white/90 focus:outline-none focus:border-white/40"
              />

              <div className="flex justify-end">
                <button
                  onClick={handlePublishComment}
                  className="px-4 py-2 bg-white hover:bg-white/90 text-black rounded-full text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish to GitHub PR</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
