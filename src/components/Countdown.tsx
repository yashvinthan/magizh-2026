import React, { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const TARGET_DATE = new Date('2026-06-22T00:00:00+05:30'); // +05:30 for standard IST (Chennai)

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = TARGET_DATE.getTime() - new Date().getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds }
  ];

  return (
    <div className="grid grid-cols-4 gap-2 sm:flex sm:justify-center sm:gap-6 mt-16 mb-12 max-w-sm sm:max-w-none mx-auto w-full px-2">
      {timeUnits.map((unit, index) => (
        <div key={unit.label} className="flex flex-col items-center w-full sm:w-auto">
          <div className="relative w-full aspect-square sm:w-32 sm:h-32 flex flex-col items-center justify-center border border-dune-border bg-dune-bg transition-colors hover:border-dune-spice/50">
            <span className="text-xl sm:text-5xl font-sans text-white mb-1 sm:mb-2">
              {unit.value.toString().padStart(2, '0')}
            </span>
            <span className="text-[8px] sm:text-xs font-mono text-dune-sand-muted tracking-[0.1em] sm:tracking-[0.2em] uppercase text-center px-0.5">
              {unit.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
