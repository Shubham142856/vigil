import React from 'react';
import { ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
  onRequestDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted, onRequestDemo }) => {
  return (
    <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-4xl mx-auto select-none pointer-events-auto mt-auto mb-auto pt-6 sm:pt-10">
      {/* Pill Badge */}
      <div className="mb-4 inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/20 bg-white/[0.05] backdrop-blur-md text-[11px] font-mono text-white/80">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        <span>VIGIL // AUTONOMOUS SECURITY & CODE REVIEW</span>
      </div>

      {/* 2-Line Headline */}
      <h1
        className="font-normal text-white tracking-[-0.03em] leading-[1.08] text-center"
        style={{
          fontSize: 'clamp(32px, 5.0vw, 62px)',
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
        }}
      >
        <span className="text-white block font-normal">The autonomous code review</span>
        <span className="text-white/90 block font-normal mt-1">system for security engineering</span>
      </h1>

      {/* 2-Line Subtitle */}
      <p
        className="mt-6 sm:mt-7 text-white/70 font-normal leading-[1.65] text-center"
        style={{
          fontSize: 'clamp(14px, 1.35vw, 17px)',
          maxWidth: '58ch',
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
        }}
      >
        Continuous AST reasoning, deterministic CWE remediation, and automated sandbox-verified patches.
        <br className="hidden sm:inline" />
        Keep every pull request secure before reaching production.
      </p>

      {/* Quick Benchmark Stats Pill */}
      <div className="mt-5 flex items-center justify-center gap-4 text-[11.5px] font-mono text-white/50 flex-wrap">
        <span>94.2% Precision</span>
        <span className="text-white/20">·</span>
        <span>Zero False-Positive AST Taint</span>
        <span className="text-white/20">·</span>
        <span>gVisor MicroVM Tested</span>
        <span className="text-white/20">·</span>
        <span>SARIF v2.1.0</span>
      </div>

      {/* Two CTA Buttons */}
      <div className="mt-8 sm:mt-9 flex items-center justify-center gap-3.5 sm:gap-4 flex-wrap">
        <button
          onClick={onGetStarted}
          className="group px-6 py-2.5 rounded-full border border-white/35 hover:border-white text-white text-[12.5px] font-semibold tracking-wider uppercase transition-all bg-black/50 hover:bg-white/10 backdrop-blur-sm cursor-pointer select-none"
        >
          RUN SECURITY AUDIT <span className="opacity-70 group-hover:translate-x-0.5 inline-block transition-transform">&gt;&gt;</span>
        </button>

        <button
          onClick={onRequestDemo}
          className="px-6 py-2.5 rounded-full bg-white hover:bg-white/90 text-black text-[12.5px] font-bold tracking-wider uppercase transition-all cursor-pointer select-none shadow-[0_0_24px_rgba(255,255,255,0.22)] hover:shadow-[0_0_30px_rgba(255,255,255,0.35)]"
        >
          REQUEST A DEMO
        </button>
      </div>
    </div>
  );
};

