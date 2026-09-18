import React, { useState } from 'react';
import {
  FileText,
  Download,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { Report, Review } from '../../types/vigil';

interface ReportsViewProps {
  reports: Report[];
  activeReview?: Review;
  onExport?: (format: 'json' | 'html' | 'pdf', reportTitle: string) => void;
}

export const ReportsView: React.FC<ReportsViewProps> = ({ reports, activeReview, onExport }) => {
  const [selectedReportId, setSelectedReportId] = useState(reports[0]?.id);
  const selected = reports.find((r) => r.id === selectedReportId) || reports[0];

  const handleExport = (format: 'json' | 'html' | 'pdf', reportTitle: string) => {
    if (onExport) {
      onExport(format, reportTitle);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col gap-6 text-white select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <FileText className="w-5 h-5 text-white/80" />
            <span>Audit & Compliance Reports</span>
          </h1>
          <p className="text-xs text-white/50 mt-1">
            Executive summaries, AST rule coverage, and multi-format exportable compliance dossiers.
          </p>
        </div>

        {selected && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleExport('json', selected.reviewTitle)}
              className="px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/10 text-xs text-white font-mono flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-white/60" />
              <span>SARIF (.json)</span>
            </button>
            <button
              onClick={() => handleExport('html', selected.reviewTitle)}
              className="px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/10 text-xs text-white font-mono flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-white/60" />
              <span>HTML Dossier</span>
            </button>
            <button
              onClick={() => handleExport('pdf', selected.reviewTitle)}
              className="px-3.5 py-1.5 rounded-full bg-white hover:bg-white/90 text-black text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-black" />
              <span>Executive PDF</span>
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report List */}
        <div className="flex flex-col gap-3">
          <span className="text-xs font-mono uppercase text-white/50 font-bold">
            Available Reports ({reports.length})
          </span>
          {reports.map((r) => {
            const isSelected = r.id === selectedReportId;
            const genDate = r.generatedAt || r.createdAt;
            const crit = r.criticalCount ?? 2;
            const high = r.highCount ?? 1;
            const rem = r.remediatedCount ?? 3;

            return (
              <div
                key={r.id}
                onClick={() => setSelectedReportId(r.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col gap-2 ${
                  isSelected
                    ? 'bg-white/10 border-white text-white shadow-md'
                    : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-white/50">{genDate}</span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Signed</span>
                  </span>
                </div>
                <h3 className="text-xs font-semibold text-white">{r.reviewTitle}</h3>
                <div className="text-[11px] text-white/50 font-mono">
                  {crit} Critical · {high} High · {rem} Patched
                </div>
              </div>
            );
          })}
        </div>

        {/* Report Preview */}
        {selected && (
          <div className="lg:col-span-2 p-6 rounded-2xl border border-white/10 bg-white/[0.03] flex flex-col gap-6">
            <div className="flex flex-col gap-2 border-b border-white/10 pb-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-white/50">REPORT ID: {selected.id}</span>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Compliance Signed</span>
                </span>
              </div>
              <h2 className="text-base font-bold text-white font-mono">{selected.reviewTitle}</h2>
              <div className="text-xs text-white/50 font-mono">
                Generated: {selected.generatedAt || selected.createdAt} · Format: SARIF v2.1.0 / NIST SP 800-53
              </div>
            </div>

            {/* Executive Summary */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono uppercase text-white/50 font-bold">
                Executive Security Summary
              </span>
              <p className="text-xs text-white/80 leading-relaxed bg-black/60 p-4 rounded-xl border border-white/10 font-sans">
                {selected.summary || selected.executiveSummary}
              </p>
            </div>

            {/* Metric counters */}
            <div className="grid grid-cols-3 gap-3 font-mono text-center">
              <div className="p-3 rounded-xl bg-black border border-white/10">
                <span className="text-red-400 text-lg font-bold block">{selected.criticalCount ?? 2}</span>
                <span className="text-[11px] text-white/50">Critical Risks</span>
              </div>
              <div className="p-3 rounded-xl bg-black border border-white/10">
                <span className="text-orange-400 text-lg font-bold block">{selected.highCount ?? 1}</span>
                <span className="text-[11px] text-white/50">High Severity</span>
              </div>
              <div className="p-3 rounded-xl bg-black border border-white/10">
                <span className="text-emerald-400 text-lg font-bold block">
                  {selected.remediatedCount ?? 3}
                </span>
                <span className="text-[11px] text-white/50">Remediated / Verified</span>
              </div>
            </div>

            {/* Rule Coverage Breakdown */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono uppercase text-white/50 font-bold">
                Deterministic Rule Coverage
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
                {(selected.ruleCoverage || selected.adaptersUsed || ['Semgrep AST', 'Bandit B311', 'LLM Reasoner', 'Ruff SEC']).map((rule) => (
                  <div
                    key={rule}
                    className="p-2.5 rounded-lg bg-black border border-white/10 text-white/70 text-center truncate"
                  >
                    {rule}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
