import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

type EffectProps = { text: string; active: boolean; reduced: boolean };

const chars = (text: string) => text.split('').map((char) => char === ' ' ? '\u00A0' : char);

function PaperTitle({ text, active, reduced }: EffectProps) {
  return (
    <span className="event-type-paper">
      <i className="event-crop event-crop-tl" /><i className="event-crop event-crop-br" />
      <span className="event-letter-row">
        {chars(text).map((char, index) => (
          <motion.span key={index} animate={active && !reduced ? { rotateX: [0, -82, 0, 0], y: [0, -3, 0, 0] } : { rotateX: 0, y: 0 }} transition={{ duration: 1.8, delay: index * .025, ease: [0.22, 1, 0.36, 1], repeat: active && !reduced ? Infinity : 0, repeatDelay: .45 }}>{char}</motion.span>
        ))}
      </span>
      <motion.i className="event-rule" animate={{ scaleX: active ? 1 : .18, opacity: active ? 1 : .35 }} />
    </span>
  );
}

function PosterTitle({ text, active, reduced }: EffectProps) {
  return (
    <span className="event-type-poster">
      <i className="event-poster-crop event-poster-crop-tl" />
      <i className="event-poster-crop event-poster-crop-br" />
      <motion.i
        className="event-poster-grid"
        animate={active && !reduced ? { x: ['-110%', '110%'], opacity: [0, .45, 0] } : { x: '-110%', opacity: 0 }}
        transition={{ duration: 1.9, repeat: active && !reduced ? Infinity : 0, repeatDelay: .8, ease: 'easeInOut' }}
      />
      <motion.span
        className="event-poster-layer event-poster-cyan"
        animate={active && !reduced ? { x: [0, -3, -3, 0], opacity: [0, .62, .62, 0] } : { x: 0, opacity: 0 }}
        transition={{ duration: 1.55, repeat: active && !reduced ? Infinity : 0, repeatDelay: .45 }}
      >{text}</motion.span>
      <motion.span
        className="event-poster-layer event-poster-magenta"
        animate={active && !reduced ? { x: [0, 3, 3, 0], opacity: [0, .58, .58, 0] } : { x: 0, opacity: 0 }}
        transition={{ duration: 1.55, repeat: active && !reduced ? Infinity : 0, repeatDelay: .45 }}
      >{text}</motion.span>
      <span className="event-poster-base">{text}</span>
      <span className="event-swatch-row" aria-hidden="true"><i /><i /><i /></span>
    </span>
  );
}

function PitchTitle({ text, active, reduced }: EffectProps) {
  return (
    <span className="event-type-pitch">
      <svg viewBox="0 0 180 24" preserveAspectRatio="none" aria-hidden="true">
        <motion.path d="M2 21 L42 17 L76 18 L112 10 L146 12 L178 2" initial={false} animate={{ pathLength: active ? 1 : .18, opacity: active ? .85 : .2 }} transition={{ duration: reduced ? 0 : .65 }} />
      </svg>
      <span className="event-letter-row">
        {chars(text).map((char, index) => (
          <motion.span key={index} animate={active && !reduced ? { y: [0, index < text.length / 2 ? -2 : -7, 0, 0], color: ['#fff', '#d37335', '#fff', '#fff'] } : { y: 0, color: '#fff' }} transition={{ duration: 1.7, delay: index * .035, repeat: active && !reduced ? Infinity : 0, repeatDelay: .35 }}>{char}</motion.span>
        ))}
      </span>
      <motion.b animate={{ scale: active ? 1 : .65, opacity: active ? 1 : .4 }} aria-hidden="true">+</motion.b>
    </span>
  );
}

function AdaptuneTitle({ text, active, reduced }: EffectProps) {
  const levels = [5, 11, 7, 16, 9, 19, 12, 6];
  return (
    <span className="event-type-audio">
      <span className="event-equalizer" aria-hidden="true">{levels.map((level, index) => <motion.i key={index} animate={{ height: active && !reduced ? [4, level, 5, Math.max(4, level * .55), 4] : Math.max(3, level * .28) }} transition={{ duration: .75 + index * .035, delay: index * .025, repeat: active && !reduced ? Infinity : 0, ease: 'easeInOut' }} />)}</span>
      <span className="event-letter-row">{chars(text).map((char, index) => <motion.span key={index} animate={active && !reduced ? { y: [0, -(levels[index % levels.length] / 3), 0] } : { y: 0 }} transition={{ duration: .72, delay: index * .035, repeat: active && !reduced ? Infinity : 0, repeatDelay: .18 }}>{char}</motion.span>)}</span>
    </span>
  );
}

function SoloTitle({ text, active, reduced }: EffectProps) {
  return (
    <span className="event-type-solo">
      <AnimatePresence>{active && !reduced ? [1, 2].map((ring) => <motion.span key={ring} className="event-echo" initial={{ opacity: .42, scale: 1 }} animate={{ opacity: [0, .42, 0], scale: [1, 1, 1 + ring * .1] }} exit={{ opacity: 0 }} transition={{ duration: 1.35, delay: ring * .12, repeat: Infinity, repeatDelay: .25 }}>{text}</motion.span>) : null}</AnimatePresence>
      <motion.span animate={active && !reduced ? { letterSpacing: ['0em', '.045em', '0em'], textShadow: ['0 0 0 rgba(211,115,53,0)', '0 0 16px rgba(211,115,53,.8)', '0 0 0 rgba(211,115,53,0)'] } : { letterSpacing: '0em', textShadow: 'none' }} transition={{ duration: 1.35, repeat: active && !reduced ? Infinity : 0, repeatDelay: .25 }}>{text}</motion.span>
      <motion.i animate={{ scaleX: active ? 1 : .2 }} />
    </span>
  );
}

function DanceTitle({ text, active, reduced }: EffectProps) {
  return (
    <span className="event-type-dance">
      <span className="event-beats" aria-hidden="true">{[0, 1, 2, 3].map((beat) => <motion.i key={beat} animate={{ scale: active && !reduced ? [1, 1.8, 1, 1] : 1, opacity: active ? 1 : .35 }} transition={{ duration: .9, delay: beat * .11, repeat: active && !reduced ? Infinity : 0, repeatDelay: .1 }} />)}</span>
      <span className="event-letter-row">{chars(text).map((char, index) => <motion.span key={index} animate={active && !reduced ? { y: [0, index % 2 ? 5 : -7, 0, 0], rotate: [0, index % 2 ? -5 : 5, 0, 0] } : { y: 0, rotate: 0 }} transition={{ duration: 1.15, delay: (index % 4) * .06, repeat: active && !reduced ? Infinity : 0, repeatDelay: .18 }}>{char}</motion.span>)}</span>
    </span>
  );
}

function FaceTitle({ text, active, reduced }: EffectProps) {
  return (
    <span className="event-type-face">
      <motion.span className="event-face-cyan" animate={{ x: active && !reduced ? [0, -3, -1, -3, 0] : 0, opacity: active ? [0, .7, .35, .7, 0] : 0 }} transition={{ duration: 1.6, repeat: active && !reduced ? Infinity : 0, repeatDelay: .18 }}>{text}</motion.span>
      <motion.span className="event-face-magenta" animate={{ x: active && !reduced ? [0, 3, 1, 3, 0] : 0, opacity: active ? [0, .7, .35, .7, 0] : 0 }} transition={{ duration: 1.6, repeat: active && !reduced ? Infinity : 0, repeatDelay: .18 }}>{text}</motion.span>
      <span className="event-face-base">{text}</span>
      <motion.i animate={{ scaleX: active && !reduced ? [0, 1, 1, 0] : 0, opacity: active ? [0, .9, .65, 0] : 0 }} transition={{ duration: 1.6, repeat: active && !reduced ? Infinity : 0, repeatDelay: .18 }} />
    </span>
  );
}

const SCRAMBLE = ['A', 'D', 'Z', 'A', 'P', '#', '/', '+'];
function AdzapTitle({ text, active, reduced }: EffectProps) {
  const [display, setDisplay] = useState(text);
  useEffect(() => {
    if (!active || reduced) { setDisplay(text); return; }
    let frame = 0;
    let frameTimer = 0;
    const runScramble = () => {
      frame = 0;
      frameTimer = window.setInterval(() => {
        setDisplay(text.split('').map((char, index) => index <= frame ? char : SCRAMBLE[(index + frame) % SCRAMBLE.length]).join(''));
        frame += 1;
        if (frame >= text.length) {
          window.clearInterval(frameTimer);
          setDisplay(text);
        }
      }, 70);
    };
    runScramble();
    const cycleTimer = window.setInterval(runScramble, 2400);
    return () => {
      window.clearInterval(frameTimer);
      window.clearInterval(cycleTimer);
    };
  }, [active, reduced, text]);
  return <span className="event-type-adzap"><motion.i animate={{ y: active ? ['-120%', '220%'] : '-120%', opacity: active ? [.1, .8, 0] : 0 }} transition={{ duration: .8, repeat: active && !reduced ? Infinity : 0, repeatDelay: .2 }} /><motion.span animate={active && !reduced ? { x: [0, -2, 2, 0, 0], skewX: [0, -4, 3, 0, 0] } : { x: 0, skewX: 0 }} transition={{ duration: .72, repeat: active && !reduced ? Infinity : 0, repeatDelay: .28 }}>{display}</motion.span><b>LIVE</b></span>;
}

export function EventTitleEffect({ title, isHovered }: { title: string; isHovered: boolean }) {
  const reduced = false;
  const props = { text: title, active: !reduced, reduced };
  const effect = {
    'Paper Presentation': <PaperTitle {...props} />,
    'Poster Designing': <PosterTitle {...props} />,
    'Shark Tank': <PitchTitle {...props} />,
    'Adaptune': <AdaptuneTitle {...props} />,
    'Solo Singing': <SoloTitle {...props} />,
    'Group Dance': <DanceTitle {...props} />,
    'Face Painting': <FaceTitle {...props} />,
    'Adzap': <AdzapTitle {...props} />,
  }[title] ?? <span>{title}</span>;

  return (
    <span
      className="event-title-signature"
      data-event={title.toLowerCase().replaceAll(' ', '-')}
      data-emphasized={isHovered || undefined}
      aria-label={title}
    >
      <span aria-hidden="true">{effect}</span>
    </span>
  );
}
