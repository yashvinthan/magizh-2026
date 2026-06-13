import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SandsweptProps {
  isActive: boolean;
  onComplete: () => void;
}

export function Sandswept({ isActive, onComplete }: SandsweptProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Auto-complete the transition after 1.8 seconds to subside the storm
  useEffect(() => {
    if (!isActive) return;
    const timer = setTimeout(() => {
      onComplete();
    }, 1800);
    return () => clearTimeout(timer);
  }, [isActive, onComplete]);

  useEffect(() => {
    if (!isActive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    
    // Set up responsive dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Generate sand blast particles
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      color: string;
      alpha: number;
    }> = [];

    // Dense sand particle array (400 items)
    for (let i = 0; i < 400; i++) {
      particles.push({
        x: Math.random() * (canvas.width + 400),
        y: Math.random() * canvas.height - 100,
        size: 0.8 + Math.random() * 3.5,
        vx: -18 - Math.random() * 25, // flying fast to the left
        vy: 4 + Math.random() * 10,   // flying slightly downwards
        color: Math.random() > 0.45 ? '211, 115, 53' : '235, 209, 151',
        alpha: 0.15 + Math.random() * 0.85
      });
    }

    const draw = () => {
      // Clear with trailing alpha to create sleek sand dust streaks
      ctx.fillStyle = 'rgba(5, 5, 5, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Apply slight wave turbulence for natural organic wind flow
        p.y += Math.sin(p.x * 0.015) * 1.2;

        // Draw particle
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Recycle particles once they exit the screen boundaries
        if (p.x < -50 || p.y > canvas.height + 50) {
          p.x = canvas.width + Math.random() * 300;
          p.y = Math.random() * canvas.height - 100;
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isActive]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[999] pointer-events-auto overflow-hidden bg-transparent"
        >
          {/* Backdrop Blur Layer - momentarily obscures everything behind */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(32px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute inset-0 bg-dune-bg/30 backdrop-blur-3xl saturate-[1.6] pointer-events-auto"
            style={{
              backdropFilter: "blur(32px) saturate(160%) brightness(55%)",
              WebkitBackdropFilter: "blur(32px) saturate(160%) brightness(55%)"
            }}
          />

          {/* Golden/Amber Sand Dust Storm Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.75, 0.9, 0.75, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-tr from-dune-spice/20 via-dune-sand/25 to-[#050505]/75 mix-blend-color-burn pointer-events-none"
          />

          {/* Sweeping sand storm gusts */}
          <motion.div
            initial={{ x: "100%", skewX: -15 }}
            animate={{ x: "-100%", skewX: -15 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="absolute inset-y-0 w-[80%] bg-gradient-to-r from-transparent via-dune-spice/60 to-transparent pointer-events-none filter blur-xl"
          />
          <motion.div
            initial={{ x: "120%", skewX: -20 }}
            animate={{ x: "-120%", skewX: -20 }}
            transition={{ duration: 1.6, ease: "easeInOut", delay: 0.1 }}
            className="absolute inset-y-0 w-[100%] bg-gradient-to-r from-transparent via-dune-sand/40 to-transparent pointer-events-none filter blur-[40px]"
          />

          {/* Interactive Particle Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full mix-blend-screen opacity-90 pointer-events-none"
          />

          {/* Central Sandstorm Warning HUD */}
          <div className="absolute inset-0 flex flex-col items-center justify-center select-none pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: [0, 1, 1, 0], scale: [0.9, 1, 1, 0.95] }}
              transition={{ duration: 1.6, times: [0, 0.15, 0.82, 1], ease: "easeInOut" }}
              className="flex flex-col items-center gap-4 bg-black/85 px-10 py-8 border border-dune-spice/40 rounded-sm backdrop-blur-md text-center max-w-sm shadow-2xl relative"
            >
              <div className="absolute -inset-[1px] bg-gradient-to-r from-dune-spice/20 via-transparent to-dune-spice/20 animate-pulse pointer-events-none -z-10" />
              
              {/* Spinning/pulsing radar/compass */}
              <div className="relative w-14 h-14 flex items-center justify-center">
                <span className="absolute inset-0 rounded-full border border-dune-spice/25 animate-ping" />
                <span className="absolute inset-2 rounded-full border border-dashed border-dune-spice/40 animate-spin [animation-duration:8s]" />
                <span className="absolute w-2 h-2 rounded-full bg-dune-spice animate-pulse" />
                <span className="font-mono text-[9px] text-dune-sand absolute -bottom-1">WARN</span>
              </div>

              <div className="space-y-1 mt-2">
                <h4 className="font-dune text-xs tracking-[0.25em] text-dune-spice">SANDSTORM BLIND</h4>
                <p className="font-mono text-[8px] text-dune-sand-muted tracking-widest uppercase">// INTRANSIT SECTOR DETECTING // DEV_MODE_OVR</p>
              </div>

              <div className="w-32 bg-dune-border/40 h-[2px] overflow-hidden relative">
                <motion.div 
                  initial={{ left: "-100%" }}
                  animate={{ left: "100%" }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                  className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-dune-spice to-transparent"
                />
              </div>

              <span className="font-mono text-[8px] text-dune-sand/60 tracking-widest uppercase">
                STILLSUIT PRESSURE EXTREME
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
