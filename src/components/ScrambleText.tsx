import React, { useState, useEffect, useRef } from 'react';

interface ScrambleTextProps {
  text: string;
  className?: string;
  duration?: number;
  delay?: number;
}

const CHARS = '!<>-_\\/[]{}—=+*^?#________';

export function ScrambleText({ text, className = '', duration = 1500, delay = 0 }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const isHovered = useRef(false);

  const scramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);

    let iteration = 0;
    let maxIterations = duration / 30;

    const interval = setInterval(() => {
      setDisplayText((oldText) => {
        return text
          .split('')
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('');
      });

      iteration += text.length / maxIterations;

      if (iteration >= text.length) {
        clearInterval(interval);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, 30);
  };

  useEffect(() => {
    // Initial scramble on mount
    const timer = setTimeout(() => scramble(), delay);
    return () => clearTimeout(timer);
  }, [text, delay]);

  const handleMouseEnter = () => {
    isHovered.current = true;
    if (!isScrambling) {
       scramble();
    }
  };

  return (
    <span 
      className={className} 
      onMouseEnter={handleMouseEnter}
    >
      {displayText}
    </span>
  );
}
