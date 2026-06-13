import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldAlert, Monitor, Terminal } from 'lucide-react';
import { useThematic } from '../context/ThematicContext';

const PROPHECIES = [
  "A VOICE FROM THE OUTER WORLD SHALL SING THE SONGS OF ARRAKIS. THE MAGIZH '26 IS UNLEASHED.",
  "HE WHO CONTROLS THE COMPOSITION OF THE DUET, CONTROLS THE RESONANCE OF THE SIETCH.",
  "THE WATER OF SOULS SHALL FLOW WHERE STUDENTS ASSEMBLE. PAPER PRESENTATIONS SHALL FOLD THE FABRIC OF SPACE.",
  "THE SHARK TANK CALLS THE VENTUROUS. FEAR IS THE MIND-KILLER; ENTREPRENEURSHIP IS THE EMPIRE BUILDER.",
  "CHROME COLORED FACES RENDER THE TRUTH OF THE DUST. THE CHENNAI LANDS SHALL BE FILLED WITH SEVEN FORCES OF ART.",
  "IN THE DUNE SPACE OF DR. M.G.R. INSTITUTE, THE SPICE OF KNOWLEDGE SHALL FLOW FOR ALL CITIZENS.",
  "THE ORNITHOPTER GLIDES LOW. THE TRIALS AT THE SIETCH GATHERING SHALL COMMENCE UNDER THE THREE MOONS.",
  "ADZAP SPEAKS IN SHIFTING CIPHERS. GLITCHED TELEMETRY DETECTS INTENSE COGNITIVE SPICE ACCUMULATION.",
  "THE SOUNDWAVES OF ADAPTUNE SHAKE THE BEDROCK. THE GREAT MAHDI HAS FORESEEN THE CONVERGENCE OF 22 JUNE 2026.",
  "THE ANCIENT TELEMETRY SIGNATURE DETECTS THE MASTER ARCHITECT OF THIS SIETCH: YASHVINTHAN M."
];

export function ProphecyConsole() {
  const { mode } = useThematic();
  const [scrollCount, setScrollCount] = useState(0);
  const [hasReachedBottom, setHasReachedBottom] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const consoleEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mode === 'english') {
      setIsOpen(false);
      setScrollCount(0);
      setHasReachedBottom(false);
    }
  }, [mode]);

  useEffect(() => {
    if (mode !== 'fremen') return;

    const handleScroll = () => {
      if (isOpen) return;
      
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      
      // Check if near bottom
      const isBottom = scrollTop + clientHeight >= scrollHeight - 30;
      
      if (isBottom) {
        if (!hasReachedBottom) {
          const nextCount = scrollCount + 1;
          setScrollCount(nextCount);
          setHasReachedBottom(true);
          
          // Sound trigger reference or just UI visual log
          console.log(`[Priesthood Protocol] Bottom contact ${nextCount}/3`);
          
          if (nextCount >= 3) {
            setIsOpen(true);
            setScrollCount(0); // reset after opening
          }
        }
      } else {
        // Reset bottom trigger flag once the user scrolls a decent distance back up
        if (scrollTop + clientHeight < scrollHeight - 150) {
          setHasReachedBottom(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mode, scrollCount, hasReachedBottom, isOpen]);

  // Handle auto-printing terminal lines
  useEffect(() => {
    if (!isOpen) {
      setTerminalLines([]);
      return;
    }

    // Sound/alert or typing sequence
    setTerminalLines(["[BOOTING SEER CONSOLE V4.2]...", "INITIALIZING BENI GESSERIT ARCHIVES...", "STATUS: HYPER-RESONANCE DETECTED."]);

    const interval = setInterval(() => {
      setTerminalLines(prev => {
        if (prev.length > 25) {
          prev.shift();
        }
        const nextProphecy = PROPHECIES[Math.floor(Math.random() * PROPHECIES.length)];
        const timestamp = new Date().toLocaleTimeString();
        return [...prev, `[${timestamp}] SEER_LOG // ${nextProphecy}`];
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isOpen]);

  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalLines]);

  return (
    <AnimatePresence>
      {mode === 'fremen' && isOpen && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 50 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="prophecy-console fixed bottom-6 right-6 z-50 w-[90%] max-w-lg border border-dune-spice/60 bg-[#060606] p-6 shadow-[0_0_40px_rgba(211,115,53,0.25)] rounded font-mono text-xs text-dune-spice flex flex-col h-[380px]"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-dune-border pb-3 mb-4 select-none">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-dune-spice animate-pulse" />
              <Terminal size={14} className="text-dune-spice" />
              <h4 className="text-[10px] tracking-[0.25em] uppercase text-white">THE SIETCH PROPHECY TELEMETRY</h4>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-dune-sand-muted hover:text-white cursor-interactive p-1 border border-transparent hover:border-dune-border rounded transition-all"
            >
              <X size={14} />
            </button>
          </div>

          {/* Terminal log wrapper */}
          <div className="flex-1 overflow-y-auto space-y-2.5 pr-2 custom-scrollbar text-dune-sand">
            {terminalLines.map((line, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className={`${
                  line.startsWith('[BOOTING') || line.startsWith('STATUS')
                    ? 'text-dune-spice font-semibold' 
                    : line.includes('SEER_LOG') 
                    ? 'text-dune-sand' 
                    : 'text-dune-sand-muted'
                }`}
              >
                <span className="text-dune-spice/40 mr-1.5">&gt;</span>
                {line}
              </motion.div>
            ))}
            <div ref={consoleEndRef} />
          </div>

          {/* Footer warning */}
          <div className="border-t border-dune-border/60 pt-3 mt-4 flex items-center justify-between text-[9px] text-dune-sand-muted">
            <div className="flex items-center gap-1.5 max-w-[80%]">
              <ShieldAlert size={10} className="text-dune-spice" />
              <span>THE SPICE MUST FLOW: PROPHECIES GENERATED VIA SIETCH-COEFFICIENTS</span>
            </div>
            <span className="font-bold text-dune-spice uppercase">DECRYPTION ACTIVE</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
