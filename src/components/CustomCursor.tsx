import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<{ x: number, y: number, life: number, maxLife: number, size: number, vx: number, vy: number }[]>([]);

  useEffect(() => {
    // Only enable custom cursor if the device has a fine pointer (mouse/trackpad/stylus)
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) {
      setIsVisible(false);
      return;
    }

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      if (Math.random() > 0.2) {
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          life: 30 + Math.random() * 20,
          maxLife: 50,
          size: 0.5 + Math.random() * 1.5,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 + 0.5 // gravity-like drift
        });
      }
    };
    const updateHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, input, [role="button"], .group, .cursor-interactive');
      setIsHovering(!!isInteractive);
    };
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', updateHoverState);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', updateHoverState);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= 1;
        p.x += p.vx;
        p.y += p.vy;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        const opacity = (p.life / p.maxLife) * 0.8;
        ctx.globalAlpha = opacity;
        ctx.fillStyle = '#D4AF37'; // matches Gold/Spice color
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <canvas 
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[999998]"
      />
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full border border-dune-spice pointer-events-none z-[999999] mix-blend-screen flex items-center justify-center shadow-[0_0_10px_rgba(212,175,55,0.4)]"
        animate={{
        x: position.x - 12,
        y: position.y - 12,
        scale: isHovering ? 1.8 : 1,
        backgroundColor: isHovering ? 'rgba(212, 175, 55, 0.2)' : 'transparent',
        borderColor: isHovering ? 'rgba(212, 175, 55, 1)' : 'rgba(212, 175, 55, 0.5)'
      }}
      transition={{ type: 'tween', ease: 'backOut', duration: 0.15 }}
    >
      <AnimatePresence>
        {isHovering && (
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="w-1.5 h-1.5 rounded-full bg-dune-spice"
          />
        )}
      </AnimatePresence>
    </motion.div>
    </>
  );
}
