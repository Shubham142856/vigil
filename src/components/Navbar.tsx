import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onRequestDemo: () => void;
  onGetStarted: () => void;
  onLinkClick?: (item: string) => void;
  onOpenConsole?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onRequestDemo,
  onGetStarted,
  onLinkClick,
  onOpenConsole,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = ['About', 'Capabilities', 'Pipeline', 'Verification', 'Insights', 'Pricing'];

  return (
    <header className="relative z-30 w-full px-6 sm:px-10 pt-5 sm:pt-6 pointer-events-auto">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo matching VIGIL security brand */}
        <div className="flex items-center gap-2.5">
          <a
            href="#"
            className="flex items-center gap-2 text-white no-underline group select-none"
          >
            {/* Geometric stylized security chevron icon */}
            <svg
              className="w-6 h-6 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 2 7 12 12 22 7 12 2" fill="white" fillOpacity="0.15" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
            <span
              className="text-white text-[17px] font-bold tracking-[0.08em] uppercase"
              style={{ fontFamily: "'Inter', -apple-system, sans-serif" }}
            >
              VIGIL
            </span>
            <span className="hidden sm:inline-block text-[9.5px] font-mono px-1.5 py-0.5 rounded-full bg-white/10 text-emerald-400 border border-emerald-400/30">
              SECURITY
            </span>
          </a>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-[13.5px] text-white/80 font-normal select-none">
          {navLinks.map((item) => (
            <button
              key={item}
              onClick={() => onLinkClick && onLinkClick(item)}
              className="hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0 text-white/75 font-normal"
              style={{ fontFamily: "'Inter', -apple-system, sans-serif" }}
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Top-Right CTA: Console Launcher + Run Audit */}
        <div className="hidden md:flex items-center gap-3.5">
          {onOpenConsole && (
            <button
              onClick={onOpenConsole}
              className="text-white/80 hover:text-white text-[12px] font-mono tracking-wider transition-colors cursor-pointer bg-transparent p-0 select-none flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 hover:border-emerald-400/50 hover:bg-emerald-500/10"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Security Console</span>
            </button>
          )}
          <button
            onClick={onGetStarted}
            className="group px-4 sm:px-5 py-1.5 rounded-full border border-white/40 hover:border-white text-white text-[12px] font-semibold tracking-wider uppercase transition-all bg-black/40 hover:bg-white/10 backdrop-blur-sm cursor-pointer select-none"
          >
            RUN AUDIT <span className="opacity-70 group-hover:translate-x-0.5 inline-block transition-transform">&gt;&gt;</span>
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white/80 hover:text-white p-1"
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="md:hidden mt-3 p-4 bg-black/95 border border-white/20 rounded-xl flex flex-col gap-3 backdrop-blur-md shadow-2xl">
          {navLinks.map((item) => (
            <button
              key={item}
              onClick={() => {
                setMobileOpen(false);
                if (onLinkClick) onLinkClick(item);
              }}
              className="text-left text-[14px] text-white/80 hover:text-white py-1"
            >
              {item}
            </button>
          ))}
          <div className="pt-2 border-t border-white/15 flex flex-col gap-2">
            {onOpenConsole && (
              <button
                onClick={() => {
                  setMobileOpen(false);
                  onOpenConsole();
                }}
                className="text-left text-[14px] text-emerald-400 font-mono py-1 flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Security Console</span>
              </button>
            )}
            <button
              onClick={() => {
                setMobileOpen(false);
                onGetStarted();
              }}
              className="text-left text-[14px] text-white font-medium py-1"
            >
              Get Started &gt;&gt;
            </button>
            <button
              onClick={() => {
                setMobileOpen(false);
                onRequestDemo();
              }}
              className="text-left text-[14px] text-white/80 hover:text-white py-1"
            >
              Request a demo
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
