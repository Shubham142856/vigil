import React from 'react';
import {
  ShieldCheck,
  LayoutDashboard,
  FileCode,
  PlusCircle,
  FileText,
  Target,
  Github,
  GitPullRequest,
  Sparkles,
  Settings,
  Lock,
  ArrowLeft,
} from 'lucide-react';
import { User } from '../../types/vigil';

export type VigilTab =
  | 'dashboard'
  | 'workspace'
  | 'new_review'
  | 'reports'
  | 'evaluation'
  | 'github'
  | 'patches'
  | 'agents'
  | 'settings';

interface SidebarProps {
  activeTab: VigilTab;
  onSelectTab: (tab: VigilTab) => void;
  user: User;
  onBackToOverview?: () => void;
  onBackToSite?: () => void;
  pendingReviewsCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  user,
  onBackToOverview,
  onBackToSite,
  pendingReviewsCount,
}) => {
  const navSections = [
    {
      group: 'CODE REVIEW',
      items: [
        { id: 'workspace' as VigilTab, label: 'Review Workspace', icon: FileCode },
        { id: 'dashboard' as VigilTab, label: 'Review Dashboard', icon: LayoutDashboard },
        { id: 'new_review' as VigilTab, label: 'Submit Code', icon: PlusCircle },
      ],
    },
    {
      group: 'AUDIT & GOVERNANCE',
      items: [
        { id: 'reports' as VigilTab, label: 'Audit Reports', icon: FileText },
        { id: 'evaluation' as VigilTab, label: 'Benchmarking', icon: Target },
      ],
    },
    {
      group: 'PIPELINE & CI/CD',
      items: [
        { id: 'github' as VigilTab, label: 'GitHub CI/CD', icon: Github },
        { id: 'patches' as VigilTab, label: 'Sandbox Patches', icon: GitPullRequest },
        { id: 'agents' as VigilTab, label: 'Agent Pipeline', icon: Sparkles },
      ],
    },
    {
      group: 'SETTINGS',
      items: [
        { id: 'settings' as VigilTab, label: 'Policies & Retention', icon: Settings },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-black border-r border-white/10 flex flex-col justify-between shrink-0 select-none h-screen text-white/80">
      {/* Brand Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <svg
              className="w-5 h-5 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
            >
              <polygon points="12 2 2 7 12 12 22 7 12 2" fill="white" fillOpacity="0.2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-white tracking-wider font-mono">VIGIL</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  SECURITY
                </span>
              </div>
              <p className="text-[10.5px] text-white/40">Autonomous Code Review Console</p>
            </div>
          </div>
        </div>

        {/* Return to Overview Button */}
        {onBackToOverview && (
          <button
            onClick={onBackToOverview}
            className="mt-3 w-full py-1.5 px-2.5 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/10 text-white/80 hover:text-white text-[11px] font-mono flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Return to Overview</span>
          </button>
        )}

        {/* Permanent Zero Execution Policy Tag */}
        <div className="mt-2.5 px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/10 flex items-center gap-1.5 text-[10.5px] font-mono text-emerald-400">
          <Lock className="w-3 h-3 shrink-0" />
          <span className="truncate">Static + LLM Analysis Only</span>
        </div>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-5">
        {navSections.map((section) => (
          <div key={section.group} className="flex flex-col gap-1">
            <span className="text-[10px] font-mono font-bold text-white/40 px-2 tracking-wider">
              {section.group}
            </span>
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left cursor-pointer ${
                    isActive
                      ? 'bg-white text-black font-semibold shadow-sm'
                      : 'text-white/60 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-white/40'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Bottom Tenant Profile */}
      <div className="p-3 border-t border-white/10 bg-white/[0.02] flex flex-col gap-2.5">
        {onBackToSite && (
          <button
            onClick={onBackToSite}
            className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs font-medium transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Main Site</span>
          </button>
        )}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-xs font-mono font-bold text-white shrink-0">
            {user.avatar}
          </div>
          <div className="overflow-hidden flex-1">
            <div className="text-xs font-medium text-white truncate">{user.name}</div>
            <div className="text-[10.5px] text-white/40 truncate font-mono">
              {user.tenant.name}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
