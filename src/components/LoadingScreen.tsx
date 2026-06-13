import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  onFinished: () => void;
}

export function LoadingScreen({ onFinished }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const totalDuration = 3000; // 3 seconds for filling
    const stepTime = totalDuration / 100;
    
    let completeTimeoutId: ReturnType<typeof setTimeout>;
    let finishTimeoutId: ReturnType<typeof setTimeout>;

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 1;
      if (currentProgress >= 100) {
        setProgress(100);
        clearInterval(interval);
        
        completeTimeoutId = setTimeout(() => {
          setIsDone(true);
          finishTimeoutId = setTimeout(() => {
            onFinished();
          }, 800);
        }, 500);
      } else {
        setProgress(currentProgress);
      }
    }, stepTime);

    return () => {
      clearInterval(interval);
      clearTimeout(completeTimeoutId);
      clearTimeout(finishTimeoutId);
    };
  }, [onFinished]);

  // Pre-generate static offsets for spice particles to avoid re-render shifting
  const [particles] = useState(() => 
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      x: Math.random() * 80 + 10, // keep within bounds 10% - 90%
      delay: Math.random() * 1.5,
      duration: Math.random() * 1.5 + 1.5,
    }))
  );

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-dune-bg flex flex-col items-center justify-center select-none overflow-hidden"
        >
          {/* Subtle background storm lighting glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(211,115,53,0.06)_0%,transparent_70%)] pointer-events-none" />

          {/* Floating Spice Sparks (Sand Drafts) */}
          <div className="absolute inset-x-0 bottom-0 top-1/4 pointer-events-none overflow-hidden max-w-lg mx-auto">
            {particles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute bottom-0 rounded-full bg-dune-spice/40"
                style={{
                  width: p.size,
                  height: p.size,
                  left: `${p.x}%`,
                  filter: 'blur(0.5px)',
                }}
                initial={{ y: 50, opacity: 0, scale: 0.5 }}
                animate={{ 
                  y: -400, 
                  opacity: [0, 0.7, 0.7, 0], 
                  x: [0, (p.id % 2 === 0 ? 1 : -1) * (Math.random() * 40 + 20)],
                  scale: [0.5, 1.2, 0.5]
                }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>

          {/* Centered Logo Container */}
          <div className="relative flex flex-col items-center justify-center z-10 px-4 text-center max-w-xl mx-auto">
            {/* The Logo with Sand-Filling Effect */}
            <div className="relative mb-6">
              {/* Bottom Outline (Empty State) */}
              <h1 
                className="font-dune text-3xl sm:text-5xl md:text-6xl tracking-[0.2em] text-transparent select-none leading-none whitespace-nowrap opacity-20"
                style={{ WebkitTextStroke: '1px #d37335' }}
              >
                MAGIZH <span style={{ WebkitTextStroke: '1px #e8dcc7' }}>'26</span>
              </h1>

              {/* Top Filled (Rising Masked State using clip-path) */}
              <motion.h1 
                className="absolute inset-0 font-dune text-3xl sm:text-5xl md:text-6xl tracking-[0.2em] bg-gradient-to-b from-[#ebdcb9] via-[#e28b49] to-dune-spice bg-clip-text text-transparent select-none leading-none whitespace-nowrap"
                style={{ clipPath: `inset(${100 - progress}% 0% 0% 0%)` }}
              >
                MAGIZH <span className="bg-gradient-to-b from-white via-dune-sand to-[#ebdcb9] bg-clip-text text-transparent">'26</span>
              </motion.h1>

              {/* Glowing Sand Fill Level Sweep Line */}
              <div 
                className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-dune-spice to-transparent shadow-[0_0_8px_rgba(211,115,53,0.8)] pointer-events-none transition-all duration-75"
                style={{ 
                  top: `${100 - progress}%`, 
                  opacity: progress > 0 && progress < 100 ? 0.9 : 0 
                }}
              />
            </div>

            {/* Subtle progress indicator metrics */}
            <div className="flex flex-col items-center gap-2 mt-4">
              <div className="w-36 h-[1px] bg-dune-border/40 relative overflow-hidden">
                <div 
                  className="absolute top-0 bottom-0 left-0 bg-dune-spice transition-all duration-75"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex items-center gap-4 font-mono text-[9px] tracking-[0.25em] text-dune-sand-muted">
                <span>RESERVOIR SYNC</span>
                <span className="text-dune-spice w-8 text-right">{progress.toString().padStart(3, '0')}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
