import React from 'react';
import {
  Sparkles,
  GitFork,
  Clock,
  Coins,
  CheckCircle2,
} from 'lucide-react';
import { AgentRun } from '../../types/vigil';

interface AgentsViewProps {
  agents: AgentRun[];
}

export const AgentsView: React.FC<AgentsViewProps> = ({ agents }) => {
  const totalCost = agents.reduce((acc, a) => acc + a.cost, 0);
  const totalLatency = agents.reduce((acc, a) => acc + a.latencyMs, 0);

  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col gap-6 text-white select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-white/80" />
            <span>Agent Orchestration & Learning Loop</span>
          </h1>
          <p className="text-xs text-white/50 mt-1">
            Parallel multi-agent execution pipeline with explainable reasoning traces and token governance.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <Coins className="w-3.5 h-3.5" />
            <span>Pipeline Cost: ${totalCost.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-1.5 text-white/70">
            <Clock className="w-3.5 h-3.5" />
            <span>Total Latency: {totalLatency}ms</span>
          </div>
        </div>
      </div>

      {/* Orchestration Pipeline Stepper / Visual Graph */}
      <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-mono uppercase tracking-wider text-white/70 font-bold flex items-center gap-2">
            <GitFork className="w-4 h-4 text-white/80" />
            <span>Multi-Agent Execution Pipeline</span>
          </h2>
          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/15">
            Deterministic Concurrency
          </span>
        </div>

        {/* Pipeline Agents Sequence */}
        <div className="flex flex-col gap-3">
          {agents.map((agt, idx) => (
            <div
              key={agt.id}
              className="p-4 rounded-xl border border-white/10 bg-black/60 hover:border-white/25 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-white text-xs font-mono shrink-0 mt-0.5">
                  0{idx + 1}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-white">{agt.name}</h3>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-white/10 text-white/70">
                      {agt.type}
                    </span>
                  </div>
                  <p className="text-xs text-white/60 mt-1 leading-relaxed max-w-xl">
                    {agt.decisionExplanation}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-white/50 shrink-0 self-end md:self-center">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-white/40" />
                  <span>{agt.latencyMs}ms</span>
                </div>
                <div className="flex items-center gap-1">
                  <Coins className="w-3 h-3 text-white/40" />
                  <span>${agt.cost.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full text-[11px]">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Complete</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
