import React, { useEffect, useRef } from 'react';

interface CelestialCTASectionProps {
  onGetStarted?: () => void;
  onRequestDemo?: () => void;
}

export const CelestialCTASection: React.FC<CelestialCTASectionProps> = ({
  onGetStarted,
  onRequestDemo,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animFrameId: number;
    let W = 0;
    let H = 0;
    let dpr = 1;

    interface Streak {
      x: number; // 0 to 1 normalized
      y: number; // 0 to 1 normalized
      length: number; // in pixels
      speed: number; // upward speed
      width: number;
      baseAlpha: number;
      flickerPhase: number;
      flickerFreq: number;
      isLeader: boolean;
      driftX: number;
    }

    interface CelestialNode {
      x: number;
      y: number;
      speed: number;
      size: number;
      phase: number;
    }

    let streaks: Streak[] = [];
    let nodes: CelestialNode[] = [];

    const initArrays = (count: number, nodeCount: number) => {
      streaks = Array.from({ length: count }, () => {
        const rand = Math.random();
        let length: number;
        let width: number;
        let baseAlpha: number;
        let speed: number;
        let isLeader = false;

        // Realistic celestial line distribution matching image:
        // - 10% prominent long luminous streaks
        // - 30% medium streaks
        // - 60% fine ethereal streaks
        if (rand < 0.1) {
          isLeader = true;
          length = 60 + Math.random() * 80;
          width = 1.1 + Math.random() * 0.7;
          baseAlpha = 0.45 + Math.random() * 0.35;
          speed = 0.0018 + Math.random() * 0.0018;
        } else if (rand < 0.4) {
          length = 35 + Math.random() * 45;
          width = 0.7 + Math.random() * 0.4;
          baseAlpha = 0.2 + Math.random() * 0.22;
          speed = 0.0012 + Math.random() * 0.0014;
        } else {
          length = 15 + Math.random() * 30;
          width = 0.35 + Math.random() * 0.35;
          baseAlpha = 0.08 + Math.random() * 0.15;
          speed = 0.0007 + Math.random() * 0.001;
        }

        return {
          x: Math.random(),
          y: Math.random(),
          length,
          speed,
          width,
          baseAlpha,
          flickerPhase: Math.random() * Math.PI * 2,
          flickerFreq: 1.5 + Math.random() * 3,
          isLeader,
          driftX: (Math.random() - 0.5) * 0.00008,
        };
      });

      nodes = Array.from({ length: nodeCount }, () => ({
        x: Math.random(),
        y: Math.random(),
        speed: 0.0006 + Math.random() * 0.0012,
        size: 0.8 + Math.random() * 1.4,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const handleResize = () => {
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = W < 640 ? 180 : W < 1100 ? 300 : 420;
      const nodeCount = W < 640 ? 40 : 80;
      initArrays(count, nodeCount);
    };

    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(canvas);

    let t = 0;
    let lastTime = performance.now();
    const TARGET_INTERVAL = 1000 / 60;

    const render = (now: DOMHighResTimeStamp) => {
      animFrameId = requestAnimationFrame(render);
      const delta = now - lastTime;
      if (delta < TARGET_INTERVAL - 1.5) return;

      const normDelta = Math.min(delta / TARGET_INTERVAL, 2.5);
      lastTime = now - (delta % TARGET_INTERVAL);
      t += 0.004 * normDelta;

      // Solid deep space black
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, W, H);

      // --- LAYER 1: Subtle Twinkling Cosmic Star Nodes (Moving upward) ---
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.y -= n.speed * normDelta;
        if (n.y < 0) n.y = 1;

        const twinkle = 0.2 + 0.8 * Math.abs(Math.sin(t * 5 + n.phase));
        const alpha = 0.15 + 0.55 * twinkle;
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(n.x * W, n.y * H, n.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- LAYER 2: Vertical Celestial Space Streaks Moving Upward ---
      ctx.lineCap = 'round';

      for (let i = 0; i < streaks.length; i++) {
        const s = streaks[i];

        // Move upward continuously
        s.y -= s.speed * normDelta;
        s.x += s.driftX * normDelta;

        // Wrap around smoothly
        if (s.x < 0) s.x = 1;
        if (s.x > 1) s.x = 0;

        const px = s.x * W;
        const py = s.y * H;

        if (s.y < -s.length / H) {
          s.y = 1 + (Math.random() * s.length) / H;
          s.x = Math.random();
        }

        // Head is at (px, py), tail extends downwards behind the upward travel direction
        const tailY = py + s.length;

        // Linear gradient along streak: brightest at head (leading edge moving up), fading toward tail
        const grad = ctx.createLinearGradient(px, py, px, tailY);

        const flick = 0.82 + 0.18 * Math.sin(t * s.flickerFreq + s.flickerPhase);
        const peakAlpha = Math.min(1, s.baseAlpha * flick);

        grad.addColorStop(0, `rgba(255, 255, 255, ${peakAlpha.toFixed(3)})`);
        grad.addColorStop(0.35, `rgba(255, 255, 255, ${(peakAlpha * 0.7).toFixed(3)})`);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = s.width;

        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px, tailY);
        ctx.stroke();

        // Optional tiny sparkling head for leader streaks
        if (s.isLeader && flick > 0.88) {
          ctx.fillStyle = `rgba(255, 255, 255, ${(peakAlpha * 0.8).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(px, py, s.width * 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // --- LAYER 3: Soft Vignette Overlay to enhance centered contrast ---
      const radGrad = ctx.createRadialGradient(
        W / 2,
        H / 2,
        Math.min(W, H) * 0.15,
        W / 2,
        H / 2,
        Math.max(W, H) * 0.75
      );
      radGrad.addColorStop(0, 'rgba(0, 0, 0, 0.45)');
      radGrad.addColorStop(0.6, 'rgba(0, 0, 0, 0.15)');
      radGrad.addColorStop(1, 'rgba(0, 0, 0, 0.6)');
      ctx.fillStyle = radGrad;
      ctx.fillRect(0, 0, W, H);
    };

    animFrameId = requestAnimationFrame(render);

    const handleVisibilityChange = () => {
      if (document.hidden) cancelAnimationFrame(animFrameId);
      else {
        lastTime = performance.now();
        animFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animFrameId);
      resizeObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <section id="cta" className="relative z-20 w-full min-h-[640px] lg:min-h-[720px] bg-black text-white flex flex-col items-center justify-center overflow-hidden border-t border-white/10 px-4 sm:px-6 py-24 select-none">
      {/* Continuous Upward Celestial Streamlines Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Content Container (Centered exactly as in uploaded image) */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Top Multi-Model Agent Ecosystem Pill Badge */}
        <div className="mb-8 sm:mb-9 inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full border border-white/20 bg-black/70 backdrop-blur-md shadow-[0_0_24px_rgba(0,0,0,0.8)]">
          {/* Icon 1: Gemini 4-Point Multi-Color Star */}
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-rose-400 p-[1px] flex items-center justify-center">
            <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z"
                  fill="url(#gemini-grad)"
                />
                <defs>
                  <linearGradient id="gemini-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#38bdf8" />
                    <stop offset="0.5" stopColor="#a855f7" />
                    <stop offset="1" stopColor="#f43f5e" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Icon 2: OpenAI Spiral */}
          <div className="w-6 h-6 rounded-full bg-black border border-white/20 flex items-center justify-center text-white p-1">
            <svg className="w-3.5 h-3.5 fill-current text-white" viewBox="0 0 24 24">
              <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1683a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4947zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1683a.0757.0757 0 0 1-.071 0l-4.8303-2.7866A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.6667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1635a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
            </svg>
          </div>

          {/* Icon 3: Anthropic Claude Sunburst */}
          <div className="w-6 h-6 rounded-full bg-[#cc6b49]/20 border border-[#cc6b49]/50 flex items-center justify-center p-1 text-[#e87a55]">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0l1.2 5.8 4.6-3.8-1.5 5.7 5.7-1.5-3.8 4.6 5.8 1.2-5.8 1.2 3.8 4.6-5.7-1.5 1.5 5.7-4.6-3.8L12 24l-1.2-5.8-4.6 3.8 1.5-5.7-5.7 1.5 3.8-4.6L0 12l5.8-1.2-3.8-4.6 5.7 1.5-1.5-5.7 4.6 3.8z" />
            </svg>
          </div>

          {/* Icon 4: Perplexity / 3D Isometric Cube */}
          <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center p-1 text-white">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>

          {/* Icon 5: Circle with Plus */}
          <div className="w-6 h-6 rounded-full bg-white/5 border border-white/20 flex items-center justify-center text-white/70 text-[13px] font-mono hover:text-white transition-colors cursor-pointer">
            +
          </div>
        </div>

        {/* 2-Line Bold Headline matching screenshot */}
        <h2
          className="font-normal text-white tracking-[-0.035em] leading-[1.08] text-center"
          style={{
            fontSize: 'clamp(36px, 5.2vw, 68px)',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
          }}
        >
          <span className="block font-normal text-white">Stop babysitting code reviews.</span>
          <span className="block font-normal text-white/95 mt-1 sm:mt-2">
            Let Vigil prove the security.
          </span>
        </h2>

        {/* Subtitle matching screenshot */}
        <p
          className="mt-6 sm:mt-7 text-white/65 font-normal leading-[1.65] text-center max-w-xl"
          style={{
            fontSize: 'clamp(14.5px, 1.35vw, 17px)',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
          }}
        >
          Turn noisy vulnerability warnings into verified exploit proofs, automated regression testbeds, and mathematically sound pull request patches.
        </p>

        {/* Two Pill CTA Buttons matching screenshot */}
        <div className="mt-9 sm:mt-10 flex items-center justify-center gap-3.5 sm:gap-4 flex-wrap">
          <button
            onClick={onGetStarted}
            className="group px-7 py-2.5 rounded-full border border-white/40 hover:border-white text-white text-[12.5px] font-semibold tracking-wider uppercase transition-all bg-black/60 hover:bg-white/10 backdrop-blur-md cursor-pointer select-none shadow-[0_0_20px_rgba(255,255,255,0.06)]"
          >
            START VIGIL AUDIT <span className="opacity-70 group-hover:translate-x-0.5 inline-block transition-transform">&gt;&gt;</span>
          </button>

          <button
            onClick={onRequestDemo}
            className="px-7 py-2.5 rounded-full bg-white hover:bg-white/90 text-black text-[12.5px] font-bold tracking-wider uppercase transition-all cursor-pointer select-none shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.45)]"
          >
            REQUEST A DEMO
          </button>
        </div>
      </div>
    </section>
  );
};
