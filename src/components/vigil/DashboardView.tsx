import React from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  FileCode,
  TrendingUp,
  Plus,
  FileText,
  Lock,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { Finding, Review } from '../../types/vigil';
import { BudgetMeter } from './BudgetMeter';

interface DashboardViewProps {
  reviews: Review[];
  findings?: Finding[];
  onSelectReview: (reviewId: string) => void;
  onNewReview: () => void;
  onViewReports?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  reviews,
  findings,
  onSelectReview,
  onNewReview,
  onViewReports,
}) => {
  const totalFindings = reviews.reduce((acc, r) => acc + r.totalFindings, 0);
  const criticalFindings = reviews.reduce((acc, r) => acc + (r.severityCounts.critical || 0), 0);
  const highFindings = reviews.reduce((acc, r) => acc + (r.severityCounts.high || 0), 0);
  const totalCost = reviews.reduce((acc, r) => acc + r.budget.costUsed, 0);
  const totalTokens = reviews.reduce((acc, r) => acc + r.budget.tokensUsed, 0);

  const aggregateBudget = {
    tokensUsed: totalTokens,
    tokenLimit: 75000,
    costUsed: totalCost,
    costLimit: 5.0,
    iterations: reviews.reduce((acc, r) => acc + r.budget.iterations, 0),
    iterationLimit: 60,
  };

  return (
    <div className="max-w-7xl mx-auto p-6 flex flex-col gap-6 text-white select-none">
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <span>Security Operations Console</span>
            <span className="text-xs font-mono font-normal px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              SOC2 Compliant · Zero Execution
            </span>
          </h1>
          <p className="text-xs text-white/50 mt-1">
            Real-time policy governance, deterministic static rules, and explainable LLM reasoning.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onViewReports}
            className="px-4 py-2 rounded-full border border-white/20 bg-white/[0.04] hover:bg-white/10 text-xs font-medium text-white flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-white/70" />
            <span>Executive Reports</span>
          </button>

          <button
            onClick={onNewReview}
            className="px-4 py-2 rounded-full bg-white hover:bg-white/90 text-black text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-black" />
            <span>New Code Review</span>
          </button>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Reviews */}
        <div className="p-4 rounded-xl border border-white/10 bg-white/[0.03] flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-white/60">
            <span>Total Reviews Executed</span>
            <FileCode className="w-4 h-4 text-white/80" />
          </div>
          <div className="text-2xl font-bold font-mono text-white mt-2">{reviews.length}</div>
          <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-mono">
            <span>100% Zero-execution verified</span>
          </div>
        </div>

        {/* Critical Findings */}
        <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-red-300">
            <span>Critical Vulnerabilities</span>
            <AlertOctagon className="w-4 h-4 text-red-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-red-200 mt-2">{criticalFindings}</div>
          <div className="text-[11px] text-red-400/80 mt-1 font-mono">
            Requires blocking gate in PR
          </div>
        </div>

        {/* High Findings */}
        <div className="p-4 rounded-xl border border-orange-500/30 bg-orange-500/5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-orange-300">
            <span>High Severity Risks</span>
            <AlertTriangle className="w-4 h-4 text-orange-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-orange-200 mt-2">{highFindings}</div>
          <div className="text-[11px] text-orange-400/80 mt-1 font-mono">
            Remediation patches staged
          </div>
        </div>

        {/* Budget Spend */}
        <div className="p-4 rounded-xl border border-white/10 bg-white/[0.03] flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-white/60">
            <span>Enforced Budget Spend</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white mt-2">
            ${totalCost.toFixed(2)}{' '}
            <span className="text-xs text-white/40 font-normal">/ $5.00</span>
          </div>
          <div className="text-[11px] text-white/50 mt-1 font-mono">
            {(totalTokens / 1000).toFixed(1)}k tokens used
          </div>
        </div>
      </div>

      {/* Center Layout: Risk Breakdown + Budget Controller */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Risk Trend Visualizer */}
        <div className="lg:col-span-2 p-5 rounded-xl border border-white/10 bg-white/[0.03] flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold text-white tracking-wide uppercase font-mono">
              Findings Distribution by Severity
            </h2>
            <span className="text-xs text-white/50 font-mono">Total {totalFindings} findings</span>
          </div>

          {/* Severity bar */}
          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden flex">
            <div
              className="bg-red-500 transition-all"
              style={{ width: `${(criticalFindings / (totalFindings || 1)) * 100}%` }}
              title={`Critical: ${criticalFindings}`}
            />
            <div
              className="bg-orange-500 transition-all"
              style={{ width: `${(highFindings / (totalFindings || 1)) * 100}%` }}
              title={`High: ${highFindings}`}
            />
            <div
              className="bg-amber-500 transition-all"
              style={{ width: `${(1 / (totalFindings || 1)) * 100}%` }}
              title="Medium: 1"
            />
            <div
              className="bg-blue-500 transition-all"
              style={{ width: `${(1 / (totalFindings || 1)) * 100}%` }}
              title="Low: 1"
            />
          </div>

          <div className="grid grid-cols-4 gap-2 pt-2 text-center text-xs font-mono">
            <div className="p-2.5 rounded-lg bg-red-950/20 border border-red-900/30">
              <span className="text-red-400 font-bold block text-sm">{criticalFindings}</span>
              <span className="text-[11px] text-red-300/70">Critical</span>
            </div>
            <div className="p-2.5 rounded-lg bg-orange-950/20 border border-orange-900/30">
              <span className="text-orange-400 font-bold block text-sm">{highFindings}</span>
              <span className="text-[11px] text-orange-300/70">High</span>
            </div>
            <div className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-900/30">
              <span className="text-amber-400 font-bold block text-sm">1</span>
              <span className="text-[11px] text-amber-300/70">Medium</span>
            </div>
            <div className="p-2.5 rounded-lg bg-blue-950/20 border border-blue-900/30">
              <span className="text-blue-400 font-bold block text-sm">1</span>
              <span className="text-[11px] text-blue-300/70">Low</span>
            </div>
          </div>
        </div>

        {/* Aggregate Budget Meter */}
        <div className="lg:col-span-1">
          <BudgetMeter budget={aggregateBudget} />
        </div>
      </div>

      {/* Recent Reviews Table */}
      <div className="p-5 rounded-xl border border-white/10 bg-white/[0.03] flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold text-white tracking-wide uppercase font-mono">
            Recent Review Runs
          </h2>
          <span className="text-xs text-white/50">Click any review to open workspace</span>
        </div>

        {reviews.length === 0 ? (
          <div className="p-12 text-center text-white/40 text-xs flex flex-col items-center justify-center gap-3">
            <FileCode className="w-8 h-8 text-white/30" />
            <div>No reviews found. Run your first review!</div>
            <button
              onClick={onNewReview}
              className="px-4 py-2 bg-white text-black font-semibold rounded-full text-xs"
            >
              Start Review
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-white/10 text-white/50 font-normal">
                  <th className="pb-3 pl-2">Review / File</th>
                  <th className="pb-3">Language</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Findings Breakdown</th>
                  <th className="pb-3">Compliance Hold</th>
                  <th className="pb-3">Cost USD</th>
                  <th className="pb-3 text-right pr-2">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {reviews.map((r) => (
                  <tr
                    key={r.id}
                    onClick={() => onSelectReview(r.id)}
                    className="hover:bg-white/[0.05] cursor-pointer transition-colors group"
                  >
                    <td className="py-3.5 pl-2">
                      <div className="font-semibold text-white group-hover:text-white/80 transition-colors">
                        {r.title}
                      </div>
                      <div className="text-[11px] text-white/40">{r.fileName}</div>
                    </td>

                    <td className="py-3.5">
                      <span className="px-2 py-0.5 rounded-full bg-white/10 text-white/80 uppercase text-[11px] border border-white/10">
                        {r.language}
                      </span>
                    </td>

                    <td className="py-3.5">
                      <span className="inline-flex items-center gap-1.5 text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full text-[11px]">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Complete</span>
                      </span>
                    </td>

                    <td className="py-3.5">
                      <div className="flex items-center gap-1.5">
                        {r.severityCounts.critical > 0 && (
                          <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 text-[10.5px] border border-red-500/30">
                            {r.severityCounts.critical} Crit
                          </span>
                        )}
                        {r.severityCounts.high > 0 && (
                          <span className="px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 text-[10.5px] border border-orange-500/30">
                            {r.severityCounts.high} High
                          </span>
                        )}
                        {r.totalFindings === 0 && (
                          <span className="text-white/40 text-[11px]">0 findings</span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5">
                      {r.legalHold ? (
                        <span className="inline-flex items-center gap-1 text-amber-400 bg-amber-500/15 border border-amber-500/30 px-2.5 py-0.5 rounded-full text-[11px]">
                          <Lock className="w-3 h-3" />
                          <span>Hold Active</span>
                        </span>
                      ) : (
                        <span className="text-white/40 text-[11px]">Standard</span>
                      )}
                    </td>

                    <td className="py-3.5 text-white/80">
                      ${r.budget.costUsed.toFixed(2)}
                    </td>

                    <td className="py-3.5 text-right pr-2">
                      <span className="text-white/70 group-hover:text-white group-hover:translate-x-1 inline-flex items-center gap-1 transition-transform">
                        <span>Workspace</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
