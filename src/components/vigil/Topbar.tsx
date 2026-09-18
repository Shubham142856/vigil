import React from 'react';
import { ShieldCheck, Plus, Key, ArrowLeft } from 'lucide-react';
import { User, Review } from '../../types/vigil';
import { VigilTab } from './Sidebar';

interface TopbarProps {
  activeTab: VigilTab;
  user: User;
  onNewReview: () => void;
  activeReview?: Review;
  onBackToOverview?: () => void;
  onBackToSite?: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  activeTab,
  user,
  onNewReview,
  activeReview,
  onBackToOverview,
  onBackToSite,
}) => {
  const tabTitles: Record<VigilTab, string> = {
    dashboard: 'Review Dashboard',
    workspace: activeReview ? `Review: ${activeReview.title}` : 'Review Workspace',
    new_review: 'Submit Code for Review',
    reports: 'Compliance & Audit Reports',
    evaluation: 'Evaluation & Benchmarks',
    github: 'GitHub CI/CD Integration',
    patches: 'Patch Sandbox Validation',
    agents: 'Multi-Agent Orchestration',
    settings: 'Organization Policies & Retention',
  };

  return (
    <header className="h-14 bg-black border-b border-white/10 px-6 flex items-center justify-between shrink-0 select-none text-white/90">
      {/* Breadcrumb / Title */}
      <div className="flex items-center gap-3">
        {onBackToSite && (
          <button
            onClick={onBackToSite}
            className="flex items-center gap-1.5 text-xs text-white/80 hover:text-white bg-white/10 hover:bg-white/15 px-2.5 py-1 rounded-full border border-white/20 transition-colors cursor-pointer mr-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Site</span>
          </button>
        )}
        {onBackToOverview && (
          <button
            onClick={onBackToOverview}
            className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors cursor-pointer mr-2 pr-3 border-r border-white/10"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Overview</span>
          </button>
        )}
        <div className="flex items-center gap-2 text-xs font-mono text-white/50">
          <span className="text-white/40">Vigil Security</span>
          <span>/</span>
          <span className="text-white font-medium">{tabTitles[activeTab]}</span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* JWT Tenant Pill */}
        <div
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/15 bg-white/[0.04] text-[11px] font-mono text-white/70"
          title="Tenant claims derived cryptographically from verified JWT"
        >
          <Key className="w-3 h-3 text-white/60" />
          <span className="truncate max-w-[160px]">{user.tenant.id}</span>
        </div>

        {/* Global Zero Execution Badge */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[11px] font-mono">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Zero Execution Sandbox</span>
        </div>

        {activeTab !== 'new_review' && (
          <button
            onClick={onNewReview}
            className="px-3 py-1.5 bg-white hover:bg-white/90 text-black rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 text-black" />
            <span>New Review</span>
          </button>
        )}
      </div>
    </header>
  );
};
