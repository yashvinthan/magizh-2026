import React, { createContext, useContext, useState, useEffect } from 'react';
import { Sandswept } from '../components/Sandswept';

type TranslationMode = 'english' | 'fremen';

interface ThematicContextType {
  mode: TranslationMode;
  setMode: (mode: TranslationMode) => void;
  isSandsweptActive: boolean;
  triggerSandswept: (onObscured: () => void) => void;
}

const ThematicContext = createContext<ThematicContextType | undefined>(undefined);

export function ThematicProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<TranslationMode>('english');
  const [isSandsweptActive, setIsSandsweptActive] = useState(false);
  const [obscuredCallback, setObscuredCallback] = useState<(() => void) | null>(null);

  useEffect(() => {
    // Fresh loads will always default to English
    setModeState('english');
  }, []);

  const setMode = (newMode: TranslationMode) => {
    setModeState(newMode);
    localStorage.setItem('dune-translation-mode', newMode);
  };

  const triggerSandswept = (onObscured: () => void) => {
    if (isSandsweptActive) return;
    setIsSandsweptActive(true);
    setObscuredCallback(() => onObscured);
  };

  useEffect(() => {
    if (isSandsweptActive && obscuredCallback) {
      // Trigger the actual action when the overlay is fully covering the screen
      const timer = setTimeout(() => {
        obscuredCallback();
        setObscuredCallback(null);
      }, 550); // Peak of the sweep animation

      return () => clearTimeout(timer);
    }
  }, [isSandsweptActive, obscuredCallback]);

  const handleSandsweptComplete = () => {
    setIsSandsweptActive(false);
  };

  return (
    <ThematicContext.Provider value={{ mode, setMode, isSandsweptActive, triggerSandswept }}>
      {children}
      <Sandswept isActive={isSandsweptActive} onComplete={handleSandsweptComplete} />
    </ThematicContext.Provider>
  );
}

export function useThematic() {
  const context = useContext(ThematicContext);
  if (!context) {
    throw new Error('useThematic must be used within a ThematicProvider');
  }
  return context;
}
