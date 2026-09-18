import React, { useState } from 'react';
import {
  User as UserIcon,
  Shield,
  Trash2,
  Lock,
  Building,
  KeyRound,
  CheckCircle2,
} from 'lucide-react';
import { User } from '../../types/vigil';

interface SettingsViewProps {
  user: User;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'policies' | 'data'>('profile');
  const [retentionDays, setRetentionDays] = useState(90);
  const [legalHoldEnabled, setLegalHoldEnabled] = useState(true);

  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col gap-6 text-white select-none">
      <div className="border-b border-white/10 pb-4">
        <h1 className="text-xl font-bold text-white tracking-tight">Organization & Governance Settings</h1>
        <p className="text-xs text-white/50 mt-1">
          Manage cryptographic tenant identity, policy configurations, and compliance retention.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-white/10 text-xs font-medium">
        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'profile'
              ? 'border-white text-white font-semibold'
              : 'border-transparent text-white/50 hover:text-white'
          }`}
        >
          <UserIcon className="w-3.5 h-3.5" />
          <span>Tenant & Profile</span>
        </button>
        <button
          onClick={() => setActiveTab('policies')}
          className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'policies'
              ? 'border-white text-white font-semibold'
              : 'border-transparent text-white/50 hover:text-white'
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          <span>Review Policies</span>
        </button>
        <button
          onClick={() => setActiveTab('data')}
          className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'data'
              ? 'border-white text-white font-semibold'
              : 'border-transparent text-white/50 hover:text-white'
          }`}
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Data Retention & Legal Hold</span>
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'profile' && (
        <div className="flex flex-col gap-5">
          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] flex flex-col gap-4">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <Building className="w-4 h-4 text-white/80" />
              <span>Cryptographic Tenant Claims</span>
            </h2>
            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3 bg-black rounded-xl border border-white/10">
                <span className="text-white/40 block">Organization Name</span>
                <span className="text-white font-semibold mt-1 block">{user.tenant.name}</span>
              </div>
              <div className="p-3 bg-black rounded-xl border border-white/10">
                <span className="text-white/40 block">Tenant UUID</span>
                <span className="text-white font-semibold mt-1 block truncate">{user.tenant.id}</span>
              </div>
              <div className="p-3 bg-black rounded-xl border border-white/10">
                <span className="text-white/40 block">Logged In User</span>
                <span className="text-white font-semibold mt-1 block">{user.name} ({user.email})</span>
              </div>
              <div className="p-3 bg-black rounded-xl border border-white/10">
                <span className="text-white/40 block">Assigned Role</span>
                <span className="text-emerald-400 font-semibold mt-1 block uppercase">{user.role}</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-white/80" />
              <span>JWT Authentication Scope</span>
            </h2>
            <p className="text-xs text-white/60 leading-relaxed">
              Every request to the Vigil engine verifies the tenant claim payload in the cryptographic JWT.
              Cross-tenant boundary isolation is verified through kernel-level zero-trust policies.
            </p>
          </div>
        </div>
      )}

      {activeTab === 'policies' && (
        <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-white">Default Security Rule Policies</h2>
          <div className="flex flex-col gap-3 text-xs">
            <div className="p-4 rounded-xl bg-black border border-white/10 flex items-center justify-between">
              <div>
                <span className="font-semibold text-white block">Strict OWASP Top 10 & CWE Top 25</span>
                <span className="text-white/50 text-[11px]">
                  Enforces AST taint checks for CWE-89, CWE-79, CWE-78, CWE-502.
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-[11px]">
                Enforced
              </span>
            </div>

            <div className="p-4 rounded-xl bg-black border border-white/10 flex items-center justify-between">
              <div>
                <span className="font-semibold text-white block">Automated Secret & Key Detection</span>
                <span className="text-white/50 text-[11px]">
                  Shannon entropy scanning for AWS, OpenAI, GitHub, and Stripe API keys.
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-[11px]">
                Enforced
              </span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'data' && (
        <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-white/80" />
            <span>Compliance Retention & Legal Hold Lock</span>
          </h2>
          <p className="text-xs text-white/60 leading-relaxed">
            Configure how long review artifacts and SARIF findings remain in the tenant data store before automated purging.
          </p>

          <div className="flex items-center gap-4 text-xs pt-2">
            <label className="text-white/70">Retention Period:</label>
            <select
              value={retentionDays}
              onChange={(e) => setRetentionDays(Number(e.target.value))}
              className="bg-black border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-white/40 font-mono"
            >
              <option value={30}>30 Days</option>
              <option value={60}>60 Days</option>
              <option value={90}>90 Days (SOC2 Default)</option>
              <option value={365}>365 Days (1 Year)</option>
            </select>
          </div>

          <div className="p-4 rounded-xl bg-black border border-white/10 flex items-center justify-between mt-2">
            <div>
              <span className="font-semibold text-white block">Tenant-wide Legal Hold Lock</span>
              <span className="text-white/50 text-[11px]">
                Prevents accidental or manual deletion of any review marked with compliance audit tags.
              </span>
            </div>
            <button
              onClick={() => setLegalHoldEnabled(!legalHoldEnabled)}
              className={`px-3 py-1 rounded-full text-xs font-mono font-medium transition-colors cursor-pointer ${
                legalHoldEnabled
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-white/5 text-white/40 border border-white/10'
              }`}
            >
              {legalHoldEnabled ? 'Hold Active' : 'Disabled'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
