import React from 'react';
import { useThematic } from '../context/ThematicContext';
import { getThematicText } from '../utils/fremenTranslator';

interface ThematicTextProps {
  children: string;
  className?: string;
  id?: string;
}

export function ThematicText({ children, className = '', id }: ThematicTextProps) {
  const { mode } = useThematic();
  const translated = getThematicText(children, mode);

  if (mode === 'fremen') {
    return (
      <span id={id} className={`inline-flex items-baseline gap-1.5 max-w-full align-middle ${className}`}>
        <span className="font-mono text-[0.65em] text-dune-spice/70 tracking-normal select-none pointer-events-none leading-none" aria-hidden="true">[</span>
        <span className="inline-block min-w-0 break-words">{translated}</span>
        <span className="font-mono text-[0.65em] text-dune-spice/70 tracking-normal select-none pointer-events-none leading-none" aria-hidden="true">]</span>
      </span>
    );
  }

  return (
    <span id={id} className={className}>
      {translated}
    </span>
  );
}
