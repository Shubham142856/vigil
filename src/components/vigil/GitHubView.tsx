import React, { useState } from 'react';
import {
  Github,
  GitPullRequest,
  CheckCircle2,
  Shield,
  Plus,
} from 'lucide-react';
import { GitHubRepo } from '../../types/vigil';

interface GitHubViewProps {
  repos: GitHubRepo[];
  onSyncRepo?: (repoId: string) => void;
}

export const GitHubView: React.FC<GitHubViewProps> = ({ repos, onSyncRepo }) => {
  const [repoList, setRepoList] = useState(repos);

  const toggleGate = (repoId: string) => {
    setRepoList((prev) =>
      prev.map((r) => (r.id === repoId ? { ...r, automatedPRGate: !r.automatedPRGate } : r))
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col gap-6 text-white select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Github className="w-5 h-5 text-white/80" />
            <span>GitHub CI/CD Integration</span>
          </h1>
          <p className="text-xs text-white/50 mt-1">
            Automated PR review gates, repository scope policies, and branch protection webhooks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Opening GitHub App authorization window...')}
            className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white rounded-full text-xs font-semibold flex items-center gap-2 border border-white/20 cursor-pointer transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Install GitHub App</span>
          </button>
        </div>
      </div>

      {/* Repositories Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {repoList.map((repo) => (
          <div
            key={repo.id}
            className="p-5 rounded-xl border border-white/10 bg-white/[0.03] flex flex-col justify-between gap-4 hover:border-white/20 transition-colors"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-white/50 truncate">{repo.defaultBranch}</span>
                <span
                  className={`text-[11px] font-mono px-2 py-0.5 rounded-full border ${
                    repo.lastReviewStatus === 'clean'
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                      : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                  }`}
                >
                  {repo.lastReviewStatus === 'clean' ? 'Passed Gate' : 'Pending Action'}
                </span>
              </div>

              <h3 className="text-sm font-semibold text-white font-mono break-all">
                {repo.fullName}
              </h3>

              <div className="flex items-center gap-1.5 text-xs text-white/50 font-mono mt-1">
                <Shield className="w-3.5 h-3.5 text-white/70" />
                <span>Scope: {repo.policyScope}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-3 border-t border-white/10">
              <div className="flex items-center justify-between text-xs text-white/80">
                <span>Active PR Reviews:</span>
                <span className="font-mono text-white font-bold">{repo.pullRequestsCount}</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-white/50">Block Merge on Critical:</span>
                <button
                  onClick={() => toggleGate(repo.id)}
                  className={`px-2.5 py-1 rounded-full text-xs font-mono font-medium transition-colors cursor-pointer ${
                    repo.automatedPRGate
                      ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                      : 'bg-white/5 text-white/40 border border-white/10'
                  }`}
                >
                  {repo.automatedPRGate ? 'Enforced' : 'Off'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
