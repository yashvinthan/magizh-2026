import { useThematic } from '../context/ThematicContext';
import { getThematicText } from '../utils/fremenTranslator';

interface ThematicGlitchTextProps {
  children: string;
  className?: string;
}

export function ThematicGlitchText({ children, className = '' }: ThematicGlitchTextProps) {
  const { mode } = useThematic();
  const translated = getThematicText(children, mode);
  const displayText = mode === 'fremen' ? `[ ${translated} ]` : translated;

  return (
    <span className={`glitch-text whitespace-nowrap ${className}`} data-text={displayText}>
      {displayText}
    </span>
  );
}
