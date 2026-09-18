import React, { useEffect, useRef } from 'react';

interface FlowFieldProps {
  interactive?: boolean;
}

export const FlowField: React.FC<FlowFieldProps> = ({ interactive = true }) => {
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

    // Interactive mouse deflection
    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;

    interface Strand {
      angle0: number;
      dir: number; // +1 or -1 for counter-rotational weave
      speedMult: number;
      twistSpeed: number;
      wavePhase: number;
      waveFreq: number;
      waveAmp: number;
      baseWidth: number;
      baseAlpha: number;
      isLeaderRibbon: boolean;
      flickerFreq: number;
      flickerPhase: number;
    }

    interface SparkleNode {
      v: number;
      angle0: number;
      dir: number;
      speed: number;
      size: number;
      sparklePhase: number;
    }

    interface Star {
      x: number;
      y: number;
      r: number;
      phase: number;
      speed: number;
    }

    let strands: Strand[] = [];
    let nodes: SparkleNode[] = [];
    let stars: Star[] = [];
    let segCount = 84;
    let activeLimit = 650;

    // Mathematical Funnel & Ground Plane Accretion Geometry
    // Exactly matching reference:
    // 1. Broad sweeping ground accretion disk at the bottom (spanning screen width)
    // 2. Converging column into narrow waist below the CTA buttons (at ~68% height)
    // 3. Wide hyperbolic trumpet canopy blooming out toward top corners
    const getGeometry = (v: number, W: number, H: number, throatR: number) => {
      // v ranges from 0 (outer ground disk) to 1.0 (top canopy rim)
      // v = 0 to 0.32: ground accretion disk
      // v = 0.32 to 0.50: convergence to waist
      // v = 0.50: narrow waist (~68% from top of screen)
      // v = 0.50 to 1.0: trumpet expansion
      const yWaist = H * 0.68;
      const yGround = H * 0.98;
      const yTop = -H * 0.05;

      let y: number;
      let R: number;
      let horizMult: number;
      let vertMult: number;

      if (v < 0.32) {
        // Ground accretion disk
        const p = v / 0.32;
        y = yGround - p * (yGround - H * 0.82);
        const diskMaxR = W * 0.68;
        const baseR = throatR * 2.8;
        // Inward spiral contraction
        R = baseR + (diskMaxR - baseR) * Math.pow(1 - p, 1.45);
        horizMult = 1.75 - p * 0.25;
        vertMult = 0.23 + p * 0.03;
      } else if (v <= 0.50) {
        // Approach to waist
        const p = (v - 0.32) / 0.18;
        y = H * 0.82 - p * (H * 0.82 - yWaist);
        R = throatR + throatR * 1.8 * Math.pow(1 - p, 1.5);
        horizMult = 1.50 - p * 0.16;
        vertMult = 0.26 - p * 0.03;
      } else {
        // Upper canopy flare
        const p = (v - 0.50) / 0.50;
        y = yWaist - p * (yWaist - yTop);
        // Exponential-hyperbolic trumpet expansion toward top corners
        const canopyMaxR = W * 0.70;
        R = throatR + (canopyMaxR - throatR) * (0.16 * p + 0.44 * Math.pow(p, 1.85) + 0.40 * Math.pow(p, 2.9));
        horizMult = 1.34 + p * 0.28;
        vertMult = 0.23 + p * 0.08;
      }

      return { y, R, horizMult, vertMult };
    };

    const computeAdaptiveCounts = (width: number, height: number) => {
      const area = width * height;
      if (width < 640 || area < 450000) {
        return { strands: 320, segments: 64, nodes: 60, stars: 65, dprCap: 1.5 };
      } else if (width < 1100 || area < 900000) {
        return { strands: 480, segments: 74, nodes: 90, stars: 85, dprCap: 1.75 };
      } else {
        // Desktop high-fidelity density matching screenshot
        return { strands: 640, segments: 84, nodes: 120, stars: 110, dprCap: 2.0 };
      }
    };

    const initSimulationArrays = (strandCount: number, nodeCount: number, starCount: number) => {
      strands = Array.from({ length: strandCount }, (_, i) => {
        const rand = Math.random();
        let baseWidth: number;
        let baseAlpha: number;
        let isLeaderRibbon = false;

        // Realistic distribution matching reference:
        // - 12% Bright leader ribbon streams (sweeping toward top right / through waist)
        // - 28% Medium prominent flow lines
        // - 60% Fine delicate hairlines
        if (rand < 0.12) {
          isLeaderRibbon = true;
          baseWidth = 1.4 + Math.random() * 0.9;
          baseAlpha = 0.48 + Math.random() * 0.35;
        } else if (rand < 0.40) {
          baseWidth = 0.75 + Math.random() * 0.45;
          baseAlpha = 0.22 + Math.random() * 0.22;
        } else {
          baseWidth = 0.32 + Math.random() * 0.30;
          baseAlpha = 0.08 + Math.random() * 0.16;
        }

        return {
          angle0: (i / strandCount) * Math.PI * 2,
          dir: i % 2 === 0 ? 1 : -1, // Balanced clockwise / counter-clockwise weave
          speedMult: 0.88 + (i % 8) * 0.04,
          twistSpeed: 0.92 + (i % 6) * 0.04,
          wavePhase: Math.random() * Math.PI * 2,
          waveFreq: 14 + Math.random() * 12,
          waveAmp: 0.6 + Math.random() * 0.6,
          baseWidth,
          baseAlpha,
          isLeaderRibbon,
          flickerFreq: 2 + Math.random() * 4,
          flickerPhase: Math.random() * Math.PI * 2,
        };
      });

      nodes = Array.from({ length: nodeCount }, () => ({
        v: 0.02 + Math.random() * 0.96,
        angle0: Math.random() * Math.PI * 2,
        dir: Math.random() < 0.5 ? 1 : -1,
        speed: 0.0012 + Math.random() * 0.002,
        size: 0.8 + Math.random() * 1.5,
        sparklePhase: Math.random() * Math.PI * 2,
      }));

      stars = Array.from({ length: starCount }, () => ({
        x: Math.random(),
        y: Math.random(),
        r: Math.random() * 0.9 + 0.3,
        phase: Math.random() * Math.PI * 2,
        speed: 1.0 + Math.random() * 2.0,
      }));

      activeLimit = strandCount;
    };

    const handleResize = () => {
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      const config = computeAdaptiveCounts(W, H);

      dpr = Math.min(window.devicePixelRatio || 1, config.dprCap);
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      segCount = config.segments;
      initSimulationArrays(config.strands, config.nodes, config.stars);
    };

    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(canvas);

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      targetTiltX = (mouseX / W - 0.5) * 32;
      targetTiltY = (mouseY / H - 0.5) * 18;
    };

    const handleMouseLeave = () => {
      targetTiltX = 0;
      targetTiltY = 0;
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseleave', handleMouseLeave);
    }

    let t = 0;
    let lastTime = performance.now();
    const TARGET_INTERVAL = 1000 / 60;
    let slowFrames = 0;

    // Framing latitude rings at key anatomical heights
    // Ground accretion rings: 0.08, 0.18, 0.28
    // Column waist rings: 0.40, 0.50, 0.60
    // Canopy bloom rings: 0.72, 0.84, 0.95
    const frameLevels = [0.08, 0.18, 0.28, 0.40, 0.50, 0.60, 0.72, 0.84, 0.95];

    const render = (now: DOMHighResTimeStamp) => {
      animFrameId = requestAnimationFrame(render);
      const delta = now - lastTime;

      if (delta < TARGET_INTERVAL - 1.5) return;

      if (delta > 28) {
        slowFrames++;
        if (slowFrames > 8 && activeLimit > 250) {
          activeLimit = Math.max(250, Math.floor(activeLimit * 0.85));
          slowFrames = 0;
        }
      } else if (slowFrames > 0) {
        slowFrames--;
      }

      const normDelta = Math.min(delta / TARGET_INTERVAL, 2.5);
      lastTime = now - (delta % TARGET_INTERVAL);
      t += 0.0032 * normDelta;

      currentTiltX += (targetTiltX - currentTiltX) * 0.05;
      currentTiltY += (targetTiltY - currentTiltY) * 0.05;

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, W, H);

      const cx = W / 2 + currentTiltX;
      const minDim = Math.min(W, H);
      // Slender waist radius
      const throatR = minDim * 0.042;

      // --- LAYER 1: Subtle Distant Stars ---
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const a = 0.06 + 0.35 * Math.abs(Math.sin(t * 6 * s.speed + s.phase));
        ctx.fillStyle = `rgba(255,255,255,${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.r, 0, 6.283);
        ctx.fill();
      }

      // --- LAYER 2: Horizontal Wireframe Framing Rings ---
      const SEG_FRAME = 72;
      for (let f = 0; f < frameLevels.length; f++) {
        const vf = frameLevels[f];
        const geom = getGeometry(vf, W, H, throatR);
        const ringY = geom.y + currentTiltY;

        ctx.beginPath();
        for (let j = 0; j <= SEG_FRAME; j++) {
          const theta = (j / SEG_FRAME) * Math.PI * 2;
          const ringWave = Math.sin(theta * 6 + t * 3.5 + vf * 7) * (geom.R * 0.015);
          const rad = (geom.R + ringWave) * geom.horizMult;
          const fx = cx + Math.cos(theta) * rad;
          const fy = ringY + Math.sin(theta) * (geom.R + ringWave) * geom.vertMult;

          if (j === 0) ctx.moveTo(fx, fy);
          else ctx.lineTo(fx, fy);
        }

        const ringFlick = 0.85 + 0.15 * Math.sin(t * 4 + f * 1.5);
        const ringAlpha = (vf < 0.32 ? 0.12 : vf < 0.65 ? 0.20 : 0.28) * ringFlick;
        ctx.strokeStyle = `rgba(255,255,255,${ringAlpha.toFixed(3)})`;
        ctx.lineWidth = vf > 0.6 ? 0.8 : 0.55;
        ctx.stroke();
      }

      // --- LAYER 3: Main Continuous Streamlines (Ground Disk -> Column Waist -> Trumpet Canopy) ---
      ctx.lineCap = 'round';
      const count = Math.min(strands.length, activeLimit);

      for (let i = 0; i < count; i++) {
        const st = strands[i];
        ctx.beginPath();

        for (let k = 0; k <= segCount; k++) {
          const v = k / segCount;
          const geom = getGeometry(v, W, H, throatR);
          const py = geom.y + currentTiltY;

          // Streamline Twist Calculation:
          // In ground accretion disk: rapid logarithmic swirl into the base
          // In column: dense vertical twist (counter-rotational diamond lattice)
          // In canopy: continuous expansion sweeping outwards
          let dTheta: number;
          if (v < 0.32) {
            // Ground disk inward spiral
            const p = v / 0.32;
            dTheta =
              st.dir * (Math.pow(1 - p, 1.1) * 4.2 + p * 2.8 * st.twistSpeed);
          } else if (v <= 0.50) {
            // Approach to waist
            const p = (v - 0.32) / 0.18;
            dTheta = st.dir * (2.8 * st.twistSpeed + p * 2.2 * st.twistSpeed);
          } else {
            // Canopy bloom
            const p = (v - 0.50) / 0.50;
            dTheta = st.dir * (5.0 * st.twistSpeed + p * 3.8 * st.twistSpeed);
          }

          // Dynamic time revolution
          const currentAngle =
            st.angle0 + dTheta + st.dir * t * st.speedMult * 1.25;

          // Harmonic wave ripple
          const wave =
            Math.sin(v * st.waveFreq + st.wavePhase + t * 5.2) *
            (geom.R * 0.024 * st.waveAmp);
          const effR = geom.R + wave;

          // 3D Perspective Projection
          const px = cx + Math.cos(currentAngle) * effR * geom.horizMult;
          const pFinalY = py + Math.sin(currentAngle) * effR * geom.vertMult;

          if (k === 0) ctx.moveTo(px, pFinalY);
          else ctx.lineTo(px, pFinalY);
        }

        // Leader ribbon streams and hairlines styling
        const flicker =
          0.82 + 0.18 * Math.sin(t * st.flickerFreq + st.flickerPhase);
        let alpha = Math.min(0.95, st.baseAlpha * flicker);
        let lineWidth = st.baseWidth;

        // Subtle glow boost for leader ribbons
        if (st.isLeaderRibbon) {
          lineWidth *= 1.15;
          alpha = Math.min(0.95, alpha * 1.2);
        }

        ctx.strokeStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      }

      // --- LAYER 4: Sparkle Nodes Traveling along the Cyclone ---
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.v = (n.v + n.speed * normDelta) % 1;

        const geom = getGeometry(n.v, W, H, throatR);
        const nyBase = geom.y + currentTiltY;

        let dTheta: number;
        if (n.v < 0.32) {
          const p = n.v / 0.32;
          dTheta = n.dir * (Math.pow(1 - p, 1.1) * 4.2 + p * 2.8);
        } else if (n.v <= 0.50) {
          const p = (n.v - 0.32) / 0.18;
          dTheta = n.dir * (2.8 + p * 2.2);
        } else {
          const p = (n.v - 0.50) / 0.50;
          dTheta = n.dir * (5.0 + p * 3.8);
        }

        const angle = n.angle0 + dTheta + n.dir * t * 1.25;
        const nx = cx + Math.cos(angle) * geom.R * geom.horizMult;
        const ny = nyBase + Math.sin(angle) * geom.R * geom.vertMult;

        const sp = 0.35 + 0.65 * Math.abs(Math.sin(t * 10 + n.sparklePhase));
        ctx.fillStyle = `rgba(255,255,255,${(0.85 * sp).toFixed(3)})`;
        ctx.fillRect(nx - n.size / 2, ny - n.size / 2, n.size, n.size);
      }

      // --- LAYER 5: Center Core Shadow for High Contrast Depth ---
      const coreY = H * 0.68 + currentTiltY;
      const coreR = throatR * 1.7;
      const grad = ctx.createRadialGradient(cx, coreY, 0, cx, coreY, coreR);
      grad.addColorStop(0, 'rgba(0,0,0,0.95)');
      grad.addColorStop(0.65, 'rgba(0,0,0,0.6)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, coreY, coreR, 0, Math.PI * 2);
      ctx.fill();
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
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [interactive]);

  return (
    <canvas
      ref={canvasRef}
      id="v"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};
