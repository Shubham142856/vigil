import React from 'react';

interface FooterProps {
  onLinkClick?: (item: string) => void;
  onRequestDemo?: () => void;
  onGetStarted?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onLinkClick,
  onRequestDemo,
  onGetStarted,
}) => {
  return (
    <footer className="relative z-20 w-full bg-black text-white select-none border-t border-white/10">
      {/* Technical Top Border Accent with Hatching & Corner Crosshairs matching reference */}
      <div className="w-full h-4 relative overflow-hidden border-b border-white/10 flex items-center justify-between px-4 sm:px-6 md:px-10">
        {/* Subtle diagonal hatched pattern banner */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, rgba(255,255,255,0.4) 0, rgba(255,255,255,0.4) 1px, transparent 0, transparent 8px)',
          }}
        />

        {/* Technical Corner + markers */}
        <div className="relative z-10 text-white/30 text-[10px] font-mono select-none -translate-y-[1px]">
          +
        </div>
        <div className="relative z-10 text-white/30 text-[10px] font-mono select-none -translate-y-[1px]">
          +
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 pt-14 pb-12">
        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          {/* Left Column: Brand, Tagline, Social Links */}
          <div className="md:col-span-4 lg:col-span-4 flex flex-col justify-between">
            <div>
              {/* Logo */}
              <div className="flex items-center gap-2.5 text-white">
                <svg
                  className="w-5 h-5 text-white shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                >
                  <polygon points="12 2 2 7 12 12 22 7 12 2" fill="white" fillOpacity="0.2" />
                  <polyline points="2 17 12 22 22 17" />
                  <polyline points="2 12 12 17 22 12" />
                </svg>
                <span className="font-bold tracking-[0.18em] text-[15px] sm:text-[16px]">
                  VIGIL
                </span>
              </div>

              {/* Tagline */}
              <p className="mt-5 text-white/60 text-[13.5px] leading-relaxed max-w-sm font-normal">
                Autonomous code review with deterministic AST taint tracing and microVM patch verification. Eliminate false alarms and secure pull requests before production.
              </p>
            </div>

            {/* Social Links */}
            <div className="mt-8 flex items-center gap-6 text-[13px] text-white/60 font-medium">
              <a
                href="#twitter"
                onClick={(e) => {
                  e.preventDefault();
                  onRequestDemo?.();
                }}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Twitter
              </a>
              <a
                href="#github"
                onClick={(e) => {
                  e.preventDefault();
                  onRequestDemo?.();
                }}
                className="hover:text-white transition-colors cursor-pointer"
              >
                GitHub
              </a>
              <a
                href="#linkedin"
                onClick={(e) => {
                  e.preventDefault();
                  onRequestDemo?.();
                }}
                className="hover:text-white transition-colors cursor-pointer"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Right Columns Grid: Product, Developers, Company, Legal */}
          <div className="md:col-span-8 lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {/* Column 1: Product */}
            <div className="flex flex-col gap-3.5">
              <h4 className="text-[13px] font-semibold text-white tracking-tight">
                Product
              </h4>
              <ul className="flex flex-col gap-2.5 text-[13px] text-white/60">
                <li>
                  <a
                    href="#scheduling-patterns"
                    onClick={(e) => {
                      e.preventDefault();
                      onLinkClick?.('Capabilities');
                    }}
                    className="hover:text-white transition-colors"
                  >
                    AST Taint Tracing
                  </a>
                </li>
                <li>
                  <a
                    href="#how-scheduling-works"
                    onClick={(e) => {
                      e.preventDefault();
                      onLinkClick?.('About');
                    }}
                    className="hover:text-white transition-colors"
                  >
                    MicroVM Verification
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    onClick={(e) => {
                      e.preventDefault();
                      onLinkClick?.('Pricing');
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#connected-systems"
                    onClick={(e) => {
                      e.preventDefault();
                      onLinkClick?.('Pipeline');
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Stateful Review Pipeline
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Developers */}
            <div className="flex flex-col gap-3.5">
              <h4 className="text-[13px] font-semibold text-white tracking-tight">
                Developers
              </h4>
              <ul className="flex flex-col gap-2.5 text-[13px] text-white/60">
                <li>
                  <a
                    href="#docs"
                    onClick={(e) => {
                      e.preventDefault();
                      onRequestDemo?.();
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#sdk"
                    onClick={(e) => {
                      e.preventDefault();
                      onRequestDemo?.();
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Vigil Security SDK
                  </a>
                </li>
                <li>
                  <a
                    href="#api"
                    onClick={(e) => {
                      e.preventDefault();
                      onRequestDemo?.();
                    }}
                    className="hover:text-white transition-colors"
                  >
                    SARIF & CLI Reference
                  </a>
                </li>
                <li>
                  <a
                    href="#status"
                    onClick={(e) => {
                      e.preventDefault();
                      onRequestDemo?.();
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Status
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Company */}
            <div className="flex flex-col gap-3.5">
              <h4 className="text-[13px] font-semibold text-white tracking-tight">
                Company
              </h4>
              <ul className="flex flex-col gap-2.5 text-[13px] text-white/60">
                <li>
                  <a
                    href="#about"
                    onClick={(e) => {
                      e.preventDefault();
                      onLinkClick?.('About');
                    }}
                    className="hover:text-white transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#blog"
                    onClick={(e) => {
                      e.preventDefault();
                      onRequestDemo?.();
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <a
                    href="#careers"
                    onClick={(e) => {
                      e.preventDefault();
                      onRequestDemo?.();
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Careers
                  </a>
                  {/* Hiring Badge matching screenshot */}
                  <span className="px-2 py-0.5 rounded-full bg-white text-black text-[10px] font-bold tracking-tight">
                    Hiring
                  </span>
                </li>
                <li>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      onRequestDemo?.();
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Legal */}
            <div className="flex flex-col gap-3.5">
              <h4 className="text-[13px] font-semibold text-white tracking-tight">
                Legal
              </h4>
              <ul className="flex flex-col gap-2.5 text-[13px] text-white/60">
                <li>
                  <a
                    href="#privacy"
                    onClick={(e) => {
                      e.preventDefault();
                      onRequestDemo?.();
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#terms"
                    onClick={(e) => {
                      e.preventDefault();
                      onRequestDemo?.();
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Terms
                  </a>
                </li>
                <li>
                  <a
                    href="#security"
                    onClick={(e) => {
                      e.preventDefault();
                      onRequestDemo?.();
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12.5px] text-white/40 font-normal select-none">
          <div>
            <span>© 2026 Vigil Security Inc. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-2 text-white/60">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[12px] font-mono text-white/70">
              All AST verification engines operational (99.9%)
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
