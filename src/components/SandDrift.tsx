import React from 'react';
import { motion, MotionValue, useTransform } from 'motion/react';

interface SandDriftProps {
  scrollYProgress: MotionValue<number>;
}

export function SandDrift({ scrollYProgress }: SandDriftProps) {
  // Translate elements at different parallax rates
  const yDune1 = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const yDune2 = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const yDune3 = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Parallax Dune Curve 1 */}
      <motion.div 
        style={{ y: yDune1 }}
        className="absolute left-[-10%] top-[25%] w-[120%] opacity-[0.06] select-none"
      >
        <svg viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0,160 C320,300 640,-40 960,220 C1120,300 1280,180 1440,120 L1440,320 L0,320 Z" fill="url(#sand-grad-1)"/>
          <defs>
            <linearGradient id="sand-grad-1" x1="720" y1="0" x2="720" y2="320" gradientUnits="userSpaceOnUse">
              <stop stopColor="#d37335" stopOpacity="0.8"/>
              <stop offset="1" stopColor="#030303" stopOpacity="0.2"/>
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Parallax Dune Curve 2 */}
      <motion.div 
        style={{ y: yDune2 }}
        className="absolute right-[-10%] top-[55%] w-[120%] opacity-[0.04] select-none"
      >
        <svg viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0,120 C480,240 720,20 1440,160 L1440,320 L0,320 Z" fill="url(#sand-grad-2)"/>
          <defs>
            <linearGradient id="sand-grad-2" x1="720" y1="0" x2="720" y2="320" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ebd197" stopOpacity="0.8"/>
              <stop offset="1" stopColor="#030303" stopOpacity="0.1"/>
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Parallax Dune Curve 3 */}
      <motion.div 
        style={{ y: yDune3 }}
        className="absolute left-[-5%] top-[80%] w-[110%] opacity-[0.05] select-none"
      >
        <svg viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0,260 C400,100 800,280 1440,160 L1440,320 L0,320 Z" fill="url(#sand-grad-3)"/>
          <defs>
            <linearGradient id="sand-grad-3" x1="720" y1="0" x2="720" y2="320" gradientUnits="userSpaceOnUse">
              <stop stopColor="#d37335" stopOpacity="0.9"/>
              <stop offset="1" stopColor="#030303" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Floating Wind-swept Sand Vector Lines */}
      <motion.div 
        style={{ y: yDune1, rotate: 10 }}
        className="absolute right-[5%] top-[15%] w-[300px] h-[300px] opacity-[0.07] border border-dashed border-dune-spice rounded-full pointer-events-none select-none blur-[1px]"
      />
      <motion.div 
        style={{ y: yDune3, rotate: -15 }}
        className="absolute left-[3%] top-[65%] w-[450px] h-[450px] opacity-[0.04] border border-double border-dune-spice rounded-full pointer-events-none select-none blur-[2px]"
      />
    </div>
  );
}
