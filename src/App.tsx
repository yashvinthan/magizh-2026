import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { ChevronDown, MapPin, Mail, Phone, Calendar, Clock, Music, Presentation, PenTool, Users, UsersRound, Speech, ExternalLink, Plus, Minus, Twitter, Facebook, Linkedin, Instagram, Link2, Share2, Menu, Megaphone, Languages, Radio } from 'lucide-react';
import { Countdown } from './components/Countdown';
import { RegistrationModal } from './components/RegistrationModal';
import { DustParticles } from './components/DustParticles';
import { CustomCursor } from './components/CustomCursor';
import { ArrakisMap } from './components/ArrakisMap';
import { LoadingScreen } from './components/LoadingScreen';
import { MagneticButton } from './components/MagneticButton';
import { ScrambleText } from './components/ScrambleText';
import { EventTitleEffect } from './components/EventTitleEffects';
import { SietchDashboard } from './components/SietchDashboard';
import { ProphecyConsole } from './components/ProphecyConsole';
import { SandDrift } from './components/SandDrift';
import { ThematicText } from './components/ThematicText';
import { ThematicGlitchText } from './components/ThematicGlitchText';
import { useThematic } from './context/ThematicContext';
import { DuneGame } from './components/DuneGame';
import { EventDetailPage } from './components/EventDetailPage';
import { getEventBySlug, openEventPage, readEventSlug } from './data/events';

const EVENTS = [
  {
    category: "Technical Events",
    items: [
      { id: 1, slug: 'paper-presentation', title: 'Paper Presentation', description: 'Present innovative ideas, research findings, and technical concepts.', icon: Presentation },
      { id: 2, slug: 'poster-designing', title: 'Poster Designing', description: 'Transform ideas into impactful visual presentations.', icon: PenTool },
      { id: 3, slug: 'shark-tank', title: 'Shark Tank', description: 'Pitch startup ideas and impress the judges.', icon: Users },
    ]
  },
  {
    category: "Non-Technical Individual",
    items: [
      { id: 4, slug: 'adaptune', title: 'Adaptune', description: 'Test your creativity and musical adaptation skills.', icon: Music },
      { id: 5, slug: 'solo-singing', title: 'Solo Singing', description: 'Showcase your voice and stage presence.', icon: Speech },
    ]
  },
  {
    category: "Non-Technical Group",
    items: [
      { id: 6, slug: 'group-dance', title: 'Group Dance', description: 'Compete with synchronized and energetic performances.', icon: UsersRound },
      { id: 7, slug: 'face-painting', title: 'Face Painting', description: 'Express creativity through artistic face painting.', icon: PenTool }, // reusing icon
      { id: 8, slug: 'adzap', title: 'Adzap', description: 'Showcase your humor and marketing skills in a fast-paced advertisement challenge.', icon: Megaphone },
    ]
  }
];

const TIMELINE = [
  { time: '08:30 AM', event: 'Registration', subtitle: 'Arrival' },
  { time: '09:30 AM', event: 'Inauguration', subtitle: 'Ceremony' },
  { time: '11:00 AM', event: 'First Event Slot', subtitle: 'Events begin // Paper Presentation opens' },
  { time: '01:00 PM', event: 'Lunch Break', subtitle: 'First slot concludes' },
  { time: '01:30 PM', event: 'Second Event Slot', subtitle: 'Afternoon events // Paper Presentation continues' },
  { time: '03:30 PM', event: 'Events Conclude', subtitle: 'All competition slots close' },
  { time: '04:30 PM', event: 'Valedictory', subtitle: 'Closing' },
  { time: '05:00 PM', event: 'Prize Distribution', subtitle: 'Finale' },
];

const VENUE_SCHEDULE = [
  { venue: 'Auditorium', morning: 'Group Dance', afternoon: '-' },
  { venue: 'Sun Java*', morning: 'Paper Presentation', afternoon: 'Paper Presentation', combined: true },
  { venue: 'Civil Smart*', morning: 'Solo Singing', afternoon: 'Adaptune' },
  { venue: 'Classroom', morning: 'Adzap', afternoon: 'Face Painting' },
  { venue: 'Lab (TBD)', morning: 'Poster Designing', afternoon: 'Shark Tank' },
];

const FAQS = [
  { question: "How do I register?", answer: "Enlistment occurs strictly through our secure online portal. An AI Studio or GitHub account is not required for the event itself, but you must complete the form and await confirmation." },
  { question: "Will certificates be provided?", answer: "Yes, all verified attendees and tournament victors will receive authorized digital certs from the MGR YUVA Chapter." },
  { question: "What are the logistics for the day?", answer: "Gates open at 08:30 AM. Accommodation is not provided, but sustenance (lunch) will be distributed during the Interval phase." },
  { question: "Can non-students participate?", answer: "The symposium is currently restricted to active university students. Bring your institutional ID as proof of allegiance." }
];

function FadeInSection({ children, id, className }: { children: React.ReactNode, id?: string, className?: string }) {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.section>
  );
}

const MESSAGES = [
  "// CHNL-01: REGISTRATION FOR SHARK TANK EXCEEDS 500 ENTRIES",
  "// CHNL-02: NEW KEYNOTE SPEAKER REVEALED...",
  "// CHNL-03: MGR YUVA DEPLOYING RESOURCES TO SECTOR 4",
  "// CHNL-04: DUST STORM PROTOCOL DEACTIVATED. WEATHER CLEAR FOR MAGIZH '26",
  "// CHNL-05: ADAPTUNE SLOTS FILLING FAST. ENLIST NOW."
];

function SpiceFeed() {
  return (
    <div className="w-full bg-dune-spice text-black py-2 overflow-hidden flex items-center border-y border-dune-border/50 relative z-30 pointer-events-none">
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
        className="whitespace-nowrap flex gap-16 font-mono text-[10px] tracking-widest uppercase font-semibold"
      >
        {[...MESSAGES, ...MESSAGES, ...MESSAGES].map((msg, i) => (
          <span key={i}>{msg}</span>
        ))}
      </motion.div>
    </div>
  );
}

export default function App() {
  const { mode, setMode, triggerSandswept } = useThematic();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const yHero = useTransform(scrollYProgress, [0, 0.2], [0, 100]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    triggerSandswept(() => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    });
  };

  const cycleTranslationMode = () => {
    if (mode === 'english') setMode('fremen');
    else setMode('english');
  };

  const [showCreatorEgg, setShowCreatorEgg] = useState(false);

  const [activeEventSlug, setActiveEventSlug] = useState<string | null>(() => readEventSlug());
  const [isLoading, setIsLoading] = useState(() => !readEventSlug());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredEventId, setHoveredEventId] = useState<number | null>(null);

  const [signalStatus, setSignalStatus] = useState<'idle' | 'transmitting' | 'relayed'>('idle');
  const [signalProgress, setSignalProgress] = useState(0);
  const [activeFrequency, setActiveFrequency] = useState('834.12 MHz');

  const transmitSignal = () => {
    if (signalStatus !== 'idle') return;
    setSignalStatus('transmitting');
    setSignalProgress(0);
    
    const freqs = ['834.12 MHz', '912.45 MHz', '405.88 MHz', '719.64 MHz', '521.10 MHz'];
    setActiveFrequency(freqs[Math.floor(Math.random() * freqs.length)]);

    let current = 0;
    const interval = setInterval(() => {
      current += 10;
      setSignalProgress(current);
      if (current >= 100) {
        clearInterval(interval);
        setSignalStatus('relayed');
        setTimeout(() => {
          setSignalStatus('idle');
          setSignalProgress(0);
        }, 5000);
      }
    }, 200);
  };

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  useEffect(() => {
    const handleHashChange = () => {
      const nextSlug = readEventSlug();
      setActiveEventSlug(nextSlug);
      if (!nextSlug && window.location.hash === '#events') {
        window.setTimeout(() => document.getElementById('events')?.scrollIntoView(), 0);
      } else {
        window.scrollTo(0, 0);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    let inputBuffer = '';
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.getAttribute('contenteditable') === 'true')) {
        return;
      }
      inputBuffer += e.key.toLowerCase();
      if (inputBuffer.length > 20) {
        inputBuffer = inputBuffer.slice(-20);
      }
      if (inputBuffer.includes('yash') || inputBuffer.includes('creator')) {
        setShowCreatorEgg(true);
        inputBuffer = '';
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    console.log(
      "%c✨ MAGIZH '26 ✨%c\n\nMade with 🧡 by %cYashvinthan M%c\n\n%c[Sietch Security Protocol Level 9 Active - Type 'yash' to unlock creator module]",
      "color: #ebd197; font-family: monospace; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px rgba(235,209,151,0.5);",
      "color: #a8a29e; font-family: monospace; font-size: 14px;",
      "color: #d37335; font-family: monospace; font-size: 16px; font-weight: bold; text-shadow: 0 0 8px rgba(211,115,53,0.6);",
      "color: #a8a29e; font-family: monospace; font-size: 14px;",
      "color: #78716c; font-style: italic; font-family: monospace;"
    );
  }, []);

  const activeEvent = getEventBySlug(activeEventSlug);
  if (activeEvent) {
    return (
      <>
        <EventDetailPage event={activeEvent} onBack={() => { window.location.hash = 'events'; }} />
        {/* Creator Easter Egg Modal */}
        <AnimatePresence>
          {showCreatorEgg && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] w-[90%] max-w-md bg-black/95 border border-dune-spice/80 p-8 rounded shadow-[0_0_50px_rgba(211,115,53,0.5)] backdrop-blur-md font-mono text-center"
            >
              <div className="w-12 h-12 rounded-full border border-dune-spice/60 flex items-center justify-center mx-auto mb-4 animate-pulse text-dune-spice text-xl">
                ⚡
              </div>
              <h3 className="text-white text-[10px] tracking-[0.25em] uppercase mb-2">CREATOR PROTOCOL DECRYPTED</h3>
              <p className="text-dune-spice text-xl font-bold tracking-wider my-4">
                MADE BY YASHVINTHAN M
              </p>
              <p className="text-dune-sand-muted text-[9px] uppercase tracking-widest mt-4">
                [ SIETCH DEPLOYMENT RE-ENFORCED // 100% RESIDENCE ]
              </p>
              <button
                onClick={() => setShowCreatorEgg(false)}
                className="mt-6 px-5 py-2 border border-dune-border hover:border-dune-spice text-white hover:text-dune-spice text-[9px] uppercase tracking-wider transition-colors duration-200 cursor-interactive"
              >
                Close Link
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <div className="relative min-h-screen bg-dune-bg text-dune-sand selection:bg-dune-spice selection:text-black overflow-hidden font-inter">
      {isLoading && <LoadingScreen onFinished={() => setIsLoading(false)} />}
      <CustomCursor />
      <SandDrift scrollYProgress={scrollYProgress} />
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-dune-spice origin-left z-[100]" style={{ scaleX }} />
      
      <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-45 bg-dune-bg/95 backdrop-blur-md border-b border-dune-border">
        <div className="mx-auto px-6 lg:px-12 py-5 flex justify-between items-center">
          <div className="flex shrink-0 items-center gap-3 whitespace-nowrap font-mono text-[10px] tracking-[0.2em] text-dune-sand-muted">
            <span className="border border-dune-spice text-dune-spice px-2 py-1">M</span>
            <span>MGR YUVA <span className="hidden sm:inline">/ CHAPTER</span></span>
          </div>
          <div className={`${mode === 'fremen' ? 'hidden xl:flex gap-4 text-[8px] tracking-[0.1em]' : 'hidden md:flex gap-8 text-[10px] tracking-[0.2em]'} items-center`}>
            <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="font-mono text-dune-sand-muted hover:text-white transition-colors uppercase"><ThematicGlitchText>About</ThematicGlitchText></a>
            <a href="#events" onClick={(e) => handleNavClick(e, 'events')} className="font-mono text-dune-sand-muted hover:text-white transition-colors uppercase"><ThematicGlitchText>Events</ThematicGlitchText></a>
            <a href="#timeline" onClick={(e) => handleNavClick(e, 'timeline')} className="font-mono text-dune-sand-muted hover:text-white transition-colors uppercase"><ThematicGlitchText>Timeline</ThematicGlitchText></a>
            <a href="#venue" onClick={(e) => handleNavClick(e, 'venue')} className="font-mono text-dune-sand-muted hover:text-white transition-colors uppercase"><ThematicGlitchText>Venue</ThematicGlitchText></a>
            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="font-mono text-dune-sand-muted hover:text-white transition-colors uppercase"><ThematicGlitchText>Contact</ThematicGlitchText></a>
          </div>
          
          <div className={`flex shrink-0 items-center ${mode === 'fremen' ? 'gap-2' : 'gap-4'}`}>
            <button 
              onClick={cycleTranslationMode}
              className="px-3 py-2 border border-dune-border/60 text-dune-sand-muted hover:text-dune-spice hover:border-dune-spice transition-colors font-mono text-[9px] tracking-[0.15em] uppercase cursor-interactive rounded bg-black/40 flex items-center gap-2 whitespace-nowrap"
              title="Toggle Sietch Translation Protocol"
            >
              <Languages size={12} className="text-dune-spice" />
              <span>TRANS: {mode.toUpperCase()}</span>
            </button>

            <button 
              onClick={() => setIsModalOpen(true)}
              className={`hidden sm:block py-2 border border-dune-border text-white hover:border-dune-spice hover:text-dune-spice transition-colors font-mono text-[10px] uppercase group cursor-interactive whitespace-nowrap ${mode === 'fremen' ? 'px-4 tracking-[0.08em]' : 'px-6 tracking-[0.2em]'}`}
            >
              <ThematicGlitchText>Register</ThematicGlitchText>
            </button>

            {/* Mobile Hamburger Trigger */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`${mode === 'fremen' ? 'xl:hidden' : 'md:hidden'} p-2 border border-dune-border/40 text-dune-sand-muted hover:text-dune-spice hover:border-dune-spice transition-all flex items-center justify-center cursor-interactive`}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                // Custom close icon styling
                <span className="font-mono text-[10px] tracking-widest text-dune-spice font-semibold px-1">CLOSE</span>
              ) : (
                <Menu size={16} className="text-dune-sand" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-x-0 top-[61px] sm:top-[65px] z-40 ${mode === 'fremen' ? 'xl:hidden' : 'md:hidden'} bg-dune-bg/95 backdrop-blur-xl border-b border-dune-border py-6 px-6 flex flex-col gap-6`}
          >
            <div className="flex flex-col">
              <span className="font-mono text-[8px] text-dune-spice tracking-[0.3em] uppercase mb-4">// NAVIGATION OVERLAY</span>
              
              <a 
                href="#about" 
                onClick={(e) => { setIsMobileMenuOpen(false); handleNavClick(e, 'about'); }}
                className="font-mono text-xs tracking-[0.2em] text-dune-sand-muted hover:text-white transition-colors uppercase py-3.5 border-b border-dune-border/30 flex justify-between"
              >
                <span>About</span> <span className="text-dune-spice/70">[001]</span>
              </a>
              <a 
                href="#events" 
                onClick={(e) => { setIsMobileMenuOpen(false); handleNavClick(e, 'events'); }}
                className="font-mono text-xs tracking-[0.2em] text-dune-sand-muted hover:text-white transition-colors uppercase py-3.5 border-b border-dune-border/30 flex justify-between"
              >
                <span>Featured Events</span> <span className="text-dune-spice/70">[002]</span>
              </a>
              <a 
                href="#timeline" 
                onClick={(e) => { setIsMobileMenuOpen(false); handleNavClick(e, 'timeline'); }}
                className="font-mono text-xs tracking-[0.2em] text-dune-sand-muted hover:text-white transition-colors uppercase py-3.5 border-b border-dune-border/30 flex justify-between"
              >
                <span>Timeline</span> <span className="text-dune-spice/70">[003]</span>
              </a>
              <a 
                href="#venue" 
                onClick={(e) => { setIsMobileMenuOpen(false); handleNavClick(e, 'venue'); }}
                className="font-mono text-xs tracking-[0.2em] text-dune-sand-muted hover:text-white transition-colors uppercase py-3.5 border-b border-dune-border/30 flex justify-between"
              >
                <span>Venue Schematic</span> <span className="text-dune-spice/70">[005]</span>
              </a>
              <a 
                href="#contact" 
                onClick={(e) => { setIsMobileMenuOpen(false); handleNavClick(e, 'contact'); }}
                className="font-mono text-xs tracking-[0.2em] text-dune-sand-muted hover:text-white transition-colors uppercase py-3.5 flex justify-between"
              >
                <span>Contact Channels</span> <span className="text-dune-spice/70">[007]</span>
              </a>
            </div>
            
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsModalOpen(true);
              }}
              className="w-full py-4 bg-dune-spice hover:bg-white text-black font-mono text-xs font-semibold tracking-[0.2em] uppercase transition-colors"
            >
              REGISTER SQUAD
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 w-full">
        {/* HERO SECTION */}
        <section className={`relative min-h-screen flex flex-col items-center justify-start pt-24 pb-28 md:pb-36 overflow-hidden bg-dune-bg ${mode === 'fremen' ? 'hero-fremen' : ''}`}>
          <div className="absolute inset-0 z-0 pointer-events-none opacity-50 bg-[url('https://i.pinimg.com/originals/2f/48/ef/2f48ef7d6542e1c80ff5f5c03d1a0f3d.jpg')] bg-cover bg-center"></div>
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-dune-bg/50 to-dune-bg"></div>
          <DustParticles />
          <div className="relative w-full px-4 sm:px-6 lg:px-12 z-10 flex items-center justify-between pointer-events-none mb-6 mt-4 gap-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.35 }}
              className="w-28 xs:w-36 sm:w-48 md:w-56 lg:w-64 flex-shrink-0"
            >
              <img
                src="/drmgr-university-logo.png"
                alt="Dr. M.G.R Educational and Research Institute University"
                className="h-auto w-full object-contain drop-shadow-[0_3px_12px_rgba(0,0,0,0.65)]"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="absolute left-1/2 top-4 -translate-x-1/2 hidden lg:block text-center"
            >
              <span className="block font-mono text-[7px] tracking-[0.34em] text-dune-spice uppercase mb-2">Presented by</span>
              <span className="block font-dune text-sm xl:text-base tracking-[0.18em] text-white uppercase whitespace-nowrap">YI / YUVA / MGR</span>
              <span className="block font-mono text-[7px] tracking-[0.26em] text-dune-sand-muted uppercase mt-2">Chapter // Chennai</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.45 }}
              className="flex items-center gap-2 xs:gap-3 sm:gap-5 md:gap-7 flex-shrink-0"
            >
              <img
                src="/young-indians-logo.png"
                alt="Young Indians - We Can, We Will"
                className="h-8 xs:h-11 sm:h-16 md:h-20 lg:h-24 w-auto object-contain drop-shadow-[0_0_1px_rgba(255,255,255,0.8)]"
              />
              <span className="h-6 xs:h-10 sm:h-14 w-px bg-dune-spice/35" aria-hidden="true" />
              <img
                src="/yuva-logo.webp"
                alt="YUVA"
                className="h-7 xs:h-10 sm:h-14 md:h-16 lg:h-20 w-auto object-contain drop-shadow-[0_0_1px_rgba(255,255,255,0.8)]"
              />
            </motion.div>
          </div>
          
          <div className="flex-1 flex flex-col justify-center items-center w-full z-10">
            <motion.div 
              style={{ opacity: opacityHero, y: yHero }}
              className={`text-center max-w-5xl mx-auto px-4 ${mode === 'fremen' ? 'hero-fremen-content' : ''}`}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <h2 className="font-mono text-dune-spice tracking-[0.3em] uppercase text-[10px] sm:text-xs mb-8">
                  [ A NATIONAL LEVEL SYMPOSIUM // 22 . 06 . 2026 ]
                </h2>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className={`font-dune text-3xl sm:text-5xl md:text-6xl lg:text-[5.5rem] xl:text-[6.5rem] tracking-[0.2em] text-white mb-8 ${mode === 'fremen' ? 'hero-fremen-title' : ''}`}
              >
                <ThematicText>MAGIZH</ThematicText> <span className="text-dune-spice">26</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="max-w-2xl mx-auto text-dune-sand-muted font-sans text-sm sm:text-base leading-relaxed mb-6"
              >
                <ThematicText>The spice must flow. So must ideas. MGR YUVA Chapter summons the brightest minds of the nation to converge on the dunes of innovation, creativity, and competition.</ThematicText>
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <Countdown />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
                className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8 w-full max-w-[320px] sm:max-w-none mx-auto px-4"
              >
                <MagneticButton 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full sm:w-auto px-8 py-3 bg-transparent border border-dune-spice text-dune-spice transition-all duration-500 font-mono text-[10px] font-semibold tracking-[0.2em] uppercase relative overflow-hidden group hover:border-white hover:text-white"
                >
                  <div className="absolute inset-0 w-0 bg-white/10 transition-all duration-500 ease-out group-hover:w-full"></div>
                  <span className="relative z-10 transition-transform duration-300 inline-block group-hover:scale-105">
                    <ThematicGlitchText>Register Now</ThematicGlitchText>
                  </span>
                </MagneticButton>
                <a 
                  href="#events"
                  className="w-full sm:w-auto px-8 py-3 bg-transparent border border-dune-border text-white hover:border-dune-spice hover:text-dune-spice transition-all duration-300 font-mono text-[10px] font-semibold tracking-[0.2em] uppercase group flex items-center justify-center gap-2"
                >
                  <ThematicGlitchText>Explore Events</ThematicGlitchText> <span className="transition-transform duration-300 ease-out group-hover:translate-y-1">↓</span>
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Hero Bottom Rails */}
          <div className="absolute bottom-0 w-full border-t border-dune-border hidden md:block">
            <div className="mx-auto px-12 py-4 flex justify-between text-[10px] font-mono tracking-[0.2em] text-dune-sand-muted uppercase">
              <span>// DR. M.G.R E&RI, CHENNAI</span>
              <span className="text-dune-spice">// 22 JUNE 2026 — SINGLE DAY SYMPOSIUM</span>
              <span>// MGR YUVA CHAPTER</span>
            </div>
          </div>
        </section>

        <SpiceFeed />

        {/* ABOUT SECTION */}
        <FadeInSection id="about" className="py-24 sm:py-32 border-b border-dune-border relative">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-[1fr_1.5fr] gap-16 items-start">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="space-y-6"
            >
              <h2 className="font-mono tracking-[0.3em] uppercase text-dune-spice text-[10px] mb-8">
                [ 001 // THE GATHERING ]
              </h2>
              <h3 className="font-dune text-xl sm:text-2xl text-white leading-[1.3] tracking-widest uppercase">
                <ThematicText>ABOUT</ThematicText> <br/><span className="text-dune-spice"><ThematicText>MAGIZH</ThematicText> '26</span>
              </h3>
              
              <div className="mt-12 aspect-square max-w-sm border border-dune-border p-1 bg-dune-surface">
                 <img 
                   src="image.png" 
                   alt="Symposium Gatherings" 
                   className="w-full h-full object-cover contrast-110"
                 />
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="lg:pt-[5rem]"
            >
              <div className="space-y-8 text-dune-sand-muted font-sans text-base leading-relaxed max-w-2xl border-b border-dune-border pb-12">
                <p>
                  <strong className="text-white font-medium">MAGIZH '26</strong> is a National Level Symposium organized by the MGR YUVA Chapter of Dr. M.G.R. Educational and Research Institute, Chennai. The symposium serves as a vibrant platform where students from various disciplines come together to showcase their technical expertise, creativity, innovation, and leadership skills.
                </p>
                <p>
                  The event aims to foster collaboration among aspiring professionals, encourage innovative thinking, and provide participants with opportunities to engage in meaningful learning experiences through technical and non-technical competitions. MAGIZH '26 is designed to inspire young minds to transform ideas into impactful solutions while building valuable connections with peers and industry enthusiasts.
                </p>
                <p>
                  Featuring a diverse range of events including Paper Presentation, Poster Designing, Shark Tank, Adaptune, Solo Singing, Adzap, Group Dance, and Face Painting, the symposium celebrates both intellectual excellence and artistic talent. Participants will have the opportunity to compete, learn, network, and gain recognition at a national level.
                </p>
                <p className="text-white">
                  Join us on <strong className="text-dune-spice font-medium">22 June 2026</strong> for a day filled with innovation, creativity, competition, and unforgettable experiences as we come together to make MAGIZH '26 a grand success.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-12 pt-4 border-t border-dune-border/50">
                <div>
                  <div className="text-3xl text-dune-spice font-serif mb-2">08</div>
                  <div className="text-[8px] sm:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.2em] font-mono text-dune-sand-muted">Flagship Events</div>
                </div>
                <div>
                  <div className="text-3xl text-dune-spice font-serif mb-2">01</div>
                  <div className="text-[8px] sm:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.2em] font-mono text-dune-sand-muted">Single Day</div>
                </div>
                <div>
                  <div className="text-3xl text-dune-spice font-serif mb-2">∞</div>
                  <div className="text-[8px] sm:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.2em] font-mono text-dune-sand-muted">Possibilities</div>
                </div>
              </div>
            </motion.div>
          </div>
        </FadeInSection>

        {/* EVENTS SECTION */}
        <FadeInSection id="events" className="py-24 sm:py-32 border-b border-dune-border relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 max-w-5xl">
               <div>
                 <h2 className="font-mono tracking-[0.3em] uppercase text-dune-spice text-[10px] mb-8">
                  [ 002 // THE TRIALS ]
                 </h2>
                 <h3 className="font-dune text-xl sm:text-2xl text-white leading-[1.3] tracking-widest uppercase">
                   <ThematicText>FEATURED</ThematicText> <br/><span className="text-dune-spice"><ThematicText>EVENTS</ThematicText></span>
                 </h3>
               </div>
               <p className="max-w-xs text-dune-sand-muted font-sans text-sm mt-8 md:mt-0 leading-relaxed md:pb-2">
                 Seven trials across three sands. Compete in technical brilliance, individual artistry, and collective spectacle. Choose your battleground.
               </p>
            </div>
            
            <div className="space-y-20">
              {EVENTS.map((categoryGroup, catIdx) => (
                <div key={categoryGroup.category}>
                  <h4 className="font-mono text-[10px] text-white tracking-[0.2em] border-b border-dune-border pb-4 mb-8 uppercase flex items-center gap-4">
                    <span className="text-dune-spice border-b-2 border-dune-spice pb-4 -mb-[17px]">0{catIdx + 1}</span> {categoryGroup.category}
                  </h4>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-dune-border p-[1px]">
                    {categoryGroup.items.map((event, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        key={event.title}
                        onMouseEnter={() => setHoveredEventId(event.id)}
                        onMouseLeave={() => setHoveredEventId(null)}
                        onFocus={() => setHoveredEventId(event.id)}
                        onBlur={() => setHoveredEventId(null)}
                        onClick={() => openEventPage(event.slug)}
                        onKeyDown={(keyEvent) => {
                          if (keyEvent.key === 'Enter' || keyEvent.key === ' ') {
                            keyEvent.preventDefault();
                            openEventPage(event.slug);
                          }
                        }}
                        tabIndex={0}
                        role="link"
                        aria-label={`View ${event.title} details and rules`}
                        className="group bg-[#0d0d0d] p-8 hover:bg-[#111111] transition-colors relative flex flex-col justify-between h-full min-h-[280px] overflow-hidden cursor-pointer focus:outline-none focus:ring-1 focus:ring-inset focus:ring-dune-spice"
                      >
                        <div className="relative z-10 h-full w-full flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start mb-12">
                              <div className="p-2 border border-dune-border text-dune-sand-muted group-hover:border-dune-spice/50 transition-colors duration-500">
                                <event.icon className="w-5 h-5 text-dune-spice/80 group-hover:text-dune-spice group-hover:scale-110 transition-all duration-500 ease-out" strokeWidth={1} />
                              </div>
                              <span className="font-mono text-[8px] text-dune-sand-muted tracking-widest relative flex overflow-hidden">
                                <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">0{catIdx + 1}.0{idx + 1}</span>
                                <span className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0 text-dune-spice select-none pointer-events-none" aria-hidden="true">0{catIdx + 1}.0{idx + 1}</span>
                              </span>
                            </div>
                            
                            <h5 className="font-serif text-2xl text-white mb-3 transition-colors duration-300 group-hover:text-dune-spice">
                              <EventTitleEffect title={event.title} isHovered={hoveredEventId === event.id} />
                            </h5>
                            <p className="font-sans text-sm text-dune-sand-muted/80 leading-relaxed">
                              {event.description}
                            </p>
                          </div>

                          <button 
                            onClick={(buttonEvent) => {
                              buttonEvent.stopPropagation();
                              openEventPage(event.slug);
                            }}
                            className="mt-12 text-[10px] font-mono tracking-[0.2em] text-dune-sand-muted group-hover:text-dune-spice transition-colors flex items-center gap-2 self-start"
                          >
                            <span className="transition-transform duration-300 ease-out group-hover:translate-x-2">→</span> 
                            <span className="glitch-text" data-text="VIEW BRIEF">VIEW BRIEF</span>
                          </button>
                        </div>
                      </motion.div>
                    ))}
                    {/* Empty block filler to maintain grid line perfection if required */}
                    {categoryGroup.items.length % 3 !== 0 && Array.from({ length: 3 - (categoryGroup.items.length % 3) }).map((_, i) => (
                      <div key={`empty-${i}`} className="bg-[#0d0d0d] hidden lg:block"></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>

        {/* TIMELINE SECTION */}
        <FadeInSection id="timeline" className="py-24 sm:py-32 border-b border-dune-border relative">
          <div className="max-w-3xl mx-auto px-6">
             <div className="mb-20 text-center">
               <h2 className="font-mono tracking-[0.3em] uppercase text-dune-spice text-[10px] mb-6">
                  [ 003 // THE ITINERARY ]
               </h2>
               <h3 className="font-dune text-xl sm:text-2xl text-white leading-[1.3] tracking-widest uppercase mb-6">
                 EVENT <span className="text-dune-spice">TIMELINE</span>
               </h3>
               <p className="text-dune-sand-muted font-sans text-sm max-w-md mx-auto leading-relaxed">
                 One day. Seven movements. Be precise — Arrakis does not forgive lateness.
               </p>
            </div>

            <div className="relative border-l border-dune-border/50 ml-4 sm:mx-auto sm:w-max">
              {TIMELINE.map((item, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  key={idx} 
                  className="relative pl-12 sm:pl-16 py-8 group"
                >
                  <div className="absolute top-1/2 left-0 w-2.5 h-2.5 border border-dune-spice bg-dune-bg -translate-y-1/2 -translate-x-[5px] transition-all duration-500 ease-out group-hover:scale-[1.5] group-hover:bg-dune-spice/20 shadow-[0_0_0_rgba(212,175,55,0)] group-hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]"></div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-16">
                    <span className="font-mono text-[10px] sm:text-xs text-dune-spice tracking-[0.2em] uppercase shrink-0 w-24 pt-1 sm:pt-0 transition-colors duration-300 group-hover:text-white">{item.time}</span>
                    <div className="flex flex-col gap-1">
                      <span className="font-serif text-lg sm:text-2xl text-white tracking-wide uppercase transition-transform duration-500 ease-out group-hover:translate-x-3">
                        <ThematicText>{item.event}</ThematicText>
                      </span>
                      <span className="font-mono text-[9px] text-dune-sand-muted tracking-[0.2em] uppercase transition-transform duration-500 ease-out group-hover:translate-x-3 delay-75">
                        // <ThematicText>{item.subtitle}</ThematicText>
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeInSection>

        {/* LAYOUT SECTION */}
        <FadeInSection id="layout" className="py-24 sm:py-32 relative bg-dune-bg border-b border-dune-border">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-16">
               <h2 className="font-mono tracking-[0.3em] uppercase text-dune-spice text-[10px] mb-6">[ 004 // TACTICAL SCHEMATIC ]</h2>
               <h3 className="font-dune text-xl sm:text-2xl text-white tracking-widest uppercase mb-6">
                 ARRAKIS <span className="text-dune-spice">MAP</span>
               </h3>
               <p className="text-dune-sand-muted font-sans text-sm max-w-xl leading-relaxed">
                 Interactive visualization of the operational grid. Monitor event locations across the facility.
               </p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <ArrakisMap />
              <SietchDashboard />
            </motion.div>
          </div>
        </FadeInSection>

        {/* VENUE SECTION */}
        <FadeInSection id="venue" className="py-24 sm:py-32 relative bg-dune-bg border-b border-dune-border">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col"
            >
               <h2 className="font-mono tracking-[0.3em] uppercase text-dune-spice text-[10px] mb-8">[ 005 // THE SIETCH ]</h2>
               <h3 className="font-dune text-xl sm:text-2xl text-white leading-[1.3] tracking-widest uppercase mb-12">
                 EVENT <br/><span className="text-dune-spice">VENUE</span>
               </h3>
               
               <div className="flex items-start gap-6 mb-12">
                 <div className="p-3 border border-dune-border shrink-0">
                   <MapPin className="w-5 h-5 text-dune-spice" strokeWidth={1} />
                 </div>
                 <div>
                   <h4 className="font-serif text-xl sm:text-2xl text-white mb-2 uppercase tracking-wide">Dr. M.G.R Educational and Research <br className="hidden sm:inline" />Institute</h4>
                   <p className="font-sans text-sm text-dune-sand-muted leading-relaxed mb-6">E.V.R. Periyar Salai (NH4 Highway), Maduravoyal, Chennai - 600095</p>
                   <p className="text-[10px] font-sans text-dune-sand-muted leading-relaxed max-w-sm">Venue for MAGIZH '26 National Level Symposium. Gates open at 08:00 AM sharp.</p>
                 </div>
               </div>
               
               <div className="flex flex-wrap gap-4 items-center">
                 <a 
                  href="https://www.google.com/maps/search/?api=1&query=13.069167%2C80.178056" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[10px] font-mono tracking-[0.2em] text-dune-spice hover:text-white transition-all duration-300 flex items-center gap-2 border border-dune-spice hover:border-white px-8 py-4 w-max uppercase group"
                 >
                   <span className="glitch-text" data-text="VIEW ON MAP">VIEW ON MAP</span> <ExternalLink className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                 </a>

                 <button
                  type="button"
                  onClick={transmitSignal}
                  disabled={signalStatus === 'transmitting'}
                  className="text-[10px] font-mono tracking-[0.2em] text-[#ebd197] hover:text-white hover:border-white transition-all duration-300 flex items-center gap-2 border border-[#ebd197]/40 px-8 py-4 w-max uppercase group relative overflow-hidden disabled:opacity-50 cursor-pointer"
                 >
                   <Radio className={`w-3.5 h-3.5 text-dune-spice ${signalStatus === 'transmitting' ? 'animate-spin' : ''}`} />
                   <span>{signalStatus === 'idle' ? 'SEND A SIGNAL' : signalStatus === 'transmitting' ? 'TRANSMITTING...' : 'SIGNAL RELAYED!'}</span>
                   {signalStatus === 'transmitting' && (
                     <motion.div 
                       className="absolute bottom-0 left-0 h-[2px] bg-dune-spice"
                       initial={{ width: '0%' }}
                       animate={{ width: '100%' }}
                       transition={{ duration: 2, ease: 'linear' }}
                     />
                   )}
                 </button>
               </div>

               <AnimatePresence>
                 {signalStatus !== 'idle' && (
                   <motion.div 
                     initial={{ opacity: 0, height: 0 }}
                     animate={{ opacity: 1, height: 'auto' }}
                     exit={{ opacity: 0, height: 0 }}
                     transition={{ duration: 0.3 }}
                     className="mt-6 p-4 bg-[#070707] border border-dune-border/40 font-mono text-xs text-dune-sand-muted overflow-hidden"
                   >
                     {signalStatus === 'transmitting' ? (
                       <div className="space-y-2">
                         <div className="flex justify-between items-center text-[10px] text-dune-spice">
                           <span>[ DISTRANS BEACON EMISSION ]</span>
                           <span>{signalProgress}%</span>
                         </div>
                         <div className="w-full bg-dune-border/20 h-1 overflow-hidden">
                           <div className="bg-dune-spice h-full transition-all duration-200" style={{ width: `${signalProgress}%` }} />
                         </div>
                         <div className="text-[9px] text-[#ebd197]/60 leading-relaxed">
                           &gt; BROADCASTING LOC_COORD: [13.069167&deg; N, 80.178056&deg; E] <br />
                           &gt; HOOKING FREQUENCY: {activeFrequency} ... <br />
                           &gt; CONVERTING RECRUIT SIGNALS TO CHANNELS ... <br />
                           <span className="animate-pulse text-dune-spice">&gt; UPLINK ACTIVE (HOLD STILLSUIT VALVE)</span>
                         </div>
                       </div>
                     ) : (
                       <div className="space-y-1.5 text-[10px]">
                         <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                           <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                           <span>// TRANSMISSION ACKNOWLEDGED BY TABR SIETCH</span>
                         </div>
                         <p className="text-[9px] text-dune-sand-muted leading-relaxed">
                           Your telemetry beacon at Dr. M.G.R Educational and Research Institute was successfully received and relayed. The Maker is apprised of your trajectory.
                         </p>
                       </div>
                     )}
                   </motion.div>
                 )}
               </AnimatePresence>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full h-[300px] sm:h-[400px] md:h-[500px] bg-dune-surface border border-dune-border relative overflow-hidden grayscale sepia-[.3] opacity-80 hover:grayscale-0 hover:sepia-0 hover:opacity-100 transition-all duration-700"
            >
              <iframe 
                src="https://www.google.com/maps?q=13.069167,80.178056&z=17&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              />
            </motion.div>

          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto px-6 mt-20 sm:mt-24"
          >
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-7">
              <div>
                <p className="font-mono text-[8px] text-dune-spice tracking-[0.28em] uppercase mb-3">[ Room Allocation // 22 June 2026 ]</p>
                <h3 className="font-dune text-lg sm:text-xl text-white tracking-widest uppercase">Venue / Time Slots</h3>
              </div>
              <p className="font-mono text-[8px] text-dune-sand-muted tracking-[0.16em] uppercase">Report before your scheduled event window</p>
            </div>

            <div className="overflow-x-auto border border-dune-border bg-[#080705]">
              <table className="w-full min-w-[680px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-dune-spice/40 bg-dune-surface/40">
                    <th className="w-1/3 px-6 py-5 font-mono text-[9px] tracking-[0.2em] text-dune-spice uppercase">Venue / Time Slot</th>
                    <th className="w-1/3 border-l border-dune-border px-6 py-5 font-mono text-[9px] tracking-[0.2em] text-dune-sand uppercase">11:00 AM - 1:00 PM</th>
                    <th className="w-1/3 border-l border-dune-border px-6 py-5 font-mono text-[9px] tracking-[0.2em] text-dune-sand uppercase">1:30 PM - 3:30 PM</th>
                  </tr>
                </thead>
                <tbody>
                  {VENUE_SCHEDULE.map((slot) => (
                    <tr key={slot.venue} className="border-b border-dune-border/70 last:border-b-0 hover:bg-dune-surface/25 transition-colors">
                      <th className="px-6 py-5 font-serif text-base text-white tracking-wide">{slot.venue}</th>
                      {slot.combined ? (
                        <td colSpan={2} className="border-l border-dune-border px-6 py-5 text-center font-sans text-sm text-dune-sand">
                          {slot.morning}
                          <span className="block mt-2 font-mono text-[7px] tracking-[0.18em] text-dune-spice uppercase">Combined session // 11:00 AM - 3:30 PM</span>
                        </td>
                      ) : (
                        <>
                          <td className="border-l border-dune-border px-6 py-5 font-sans text-sm text-dune-sand-muted">{slot.morning}</td>
                          <td className="border-l border-dune-border px-6 py-5 font-sans text-sm text-dune-sand-muted">{slot.afternoon}</td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </FadeInSection>

        {/* FAQ SECTION */}
        <FadeInSection id="faq" className="py-24 sm:py-32 relative bg-dune-bg border-b border-dune-border">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-mono tracking-[0.3em] uppercase text-dune-spice text-[10px] mb-6">
                [ 006 // THE INQUIRY ]
               </h2>
               <h3 className="font-dune text-xl sm:text-2xl text-white tracking-widest uppercase mb-6">
                 <ThematicText>FAQ</ThematicText>
               </h3>
            </div>
            
            <div className="space-y-4">
              {FAQS.map((faq, idx) => (
                <div key={idx} className="border border-dune-border bg-dune-surface hover:border-dune-spice/50 transition-colors">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left cursor-interactive group"
                  >
                    <span className="font-serif text-lg sm:text-xl text-white group-hover:text-dune-spice transition-colors">
                      <ThematicText>{faq.question}</ThematicText>
                    </span>
                    <ChevronDown className={`w-5 h-5 text-dune-spice transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 pt-0 font-sans text-sm text-dune-sand-muted leading-relaxed border-t border-dune-border m-6 mt-0 mb-0">
                          <ThematicText>{faq.answer}</ThematicText>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>

        {/* CONTACT SECTION */}
        <FadeInSection id="contact" className="py-24 sm:py-32 relative bg-dune-bg border-b border-dune-border">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            
            <motion.div
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="flex flex-col"
            >
               <h2 className="font-mono tracking-[0.3em] uppercase text-dune-spice text-[10px] mb-8">
                [ 007 // TRANSMISSION ]
               </h2>
               <h3 className="font-dune text-xl sm:text-2xl lg:text-[1.75rem] text-white leading-[1.3] tracking-widest uppercase mb-8">
                 SEND A <br/><span className="text-dune-spice">SIGNAL.</span>
               </h3>
               
               <p className="font-sans text-sm sm:text-base text-dune-sand-muted leading-relaxed max-w-md mb-12">
                 Questions, sponsorships, collaborations — reach the MGR YUVA Chapter directly. Or skip the small talk and enlist now.
               </p>

               <MagneticButton 
                onClick={() => setIsModalOpen(true)}
                className="text-[10px] font-mono tracking-[0.2em] text-dune-spice hover:text-white transition-colors flex items-center justify-center border border-dune-spice hover:border-white px-8 py-4 w-max uppercase group cursor-interactive"
               >
                 <ThematicGlitchText>REGISTER NOW</ThematicGlitchText>
               </MagneticButton>
            </motion.div>

            <motion.div
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="border border-dune-border/50 divide-y divide-dune-border/50 bg-dune-bg"
            >
               {/* Email Row */}
               <div className="p-8 flex items-center gap-6 group hover:bg-dune-surface/30 transition-colors cursor-pointer">
                  <div className="p-3 border border-dune-border transition-all duration-500 shrink-0 group-hover:scale-110 group-hover:border-dune-spice/50 group-hover:shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                    <Mail className="w-4 h-4 text-dune-spice" strokeWidth={1} />
                  </div>
                  <div className="min-w-0 transition-transform duration-500 ease-out group-hover:translate-x-2">
                    <p className="font-mono text-[8px] text-dune-sand-muted tracking-[0.3em] uppercase mb-1">Official Email</p>
                    <a href="mailto:mgryuva24@gmail.com" className="font-sans text-base sm:text-lg text-white group-hover:text-dune-spice transition-colors truncate block">mgryuva24@gmail.com</a>
                  </div>
               </div>

               {/* Registration Team Row */}
               <div className="p-8 flex items-start gap-6 group hover:bg-dune-surface/30 transition-colors">
                  <div className="p-3 border border-dune-border transition-all duration-500 shrink-0 group-hover:scale-110 group-hover:border-dune-spice/50 group-hover:shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                    <Phone className="w-4 h-4 text-dune-spice" strokeWidth={1} />
                  </div>
                  <div className="min-w-0 flex-1 transition-transform duration-500 ease-out group-hover:translate-x-2">
                    <p className="font-mono text-[8px] text-dune-sand-muted tracking-[0.3em] uppercase mb-4">Registration Coordinators</p>
                    {[
                      {
                        role: 'Staff Coordinators',
                        contacts: [
                          ['Dr. F. Fareeza', '9962098599'],
                          ['Mr. A. Kameshwaran', '9698535730'],
                        ],
                      },
                      {
                        role: 'Student Coordinators',
                        contacts: [
                          ['Mr. Jashran S', '8925705407'],
                          ['Ms. Debona George', '9342217624'],
                        ],
                      },
                    ].map((group) => (
                      <div key={group.role} className="mb-5 last:mb-0">
                        <p className="mb-3 font-mono text-[7px] uppercase tracking-[0.22em] text-dune-spice">{group.role}</p>
                        <div className="grid sm:grid-cols-2 gap-x-7 gap-y-3">
                          {group.contacts.map(([name, phone]) => (
                            <a key={phone} href={`tel:+91${phone}`} className="group/contact flex flex-col gap-1 border-l border-dune-border pl-3 hover:border-dune-spice transition-colors">
                              <span className="font-sans text-sm text-white group-hover/contact:text-dune-spice transition-colors">{name}</span>
                              <span className="font-mono text-[9px] tracking-[0.08em] text-dune-sand-muted">+91 {phone.slice(0, 5)} {phone.slice(5)}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
               </div>

               {/* Instagram Channels */}
               <div className="grid sm:grid-cols-2 border-b border-dune-border">
                 {[
                   { label: "MAGIZH '26", handle: '@mgr_magizh26', href: 'https://www.instagram.com/mgr_magizh26/' },
                   { label: 'YI YUVA MGR', handle: '@yi.yuva.mgr', href: 'https://www.instagram.com/yi.yuva.mgr/' },
                 ].map((account, index) => (
                   <a
                     key={account.handle}
                     href={account.href}
                     target="_blank"
                     rel="noreferrer"
                     className={`p-6 flex items-center gap-4 group hover:bg-dune-surface/30 transition-colors cursor-pointer ${index === 0 ? 'sm:border-r border-dune-border' : ''}`}
                   >
                     <div className="p-3 border border-dune-border transition-all duration-500 shrink-0 group-hover:scale-110 group-hover:border-dune-spice/50 group-hover:shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                       <Instagram className="w-4 h-4 text-dune-spice" strokeWidth={1} />
                     </div>
                     <div className="min-w-0 transition-transform duration-500 ease-out group-hover:translate-x-1">
                       <p className="font-mono text-[7px] text-dune-sand-muted tracking-[0.24em] uppercase mb-1">{account.label}</p>
                       <span className="font-sans text-sm sm:text-base text-white group-hover:text-dune-spice transition-colors break-all">{account.handle}</span>
                     </div>
                     <ExternalLink className="ml-auto w-3.5 h-3.5 shrink-0 text-dune-sand-muted group-hover:text-dune-spice transition-colors" strokeWidth={1} />
                   </a>
                 ))}
               </div>

               {/* Organizers Row */}
               <div className="p-8 hover:bg-dune-surface/30 transition-colors">
                  <p className="font-mono text-[8px] text-dune-sand-muted tracking-[0.3em] uppercase mb-4">Organizers</p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                    <div className="flex w-56 max-w-full shrink-0 items-center justify-center">
                      <img
                        src="/drmgr-university-logo.png"
                        alt="Dr. M.G.R Educational and Research Institute University"
                        className="h-auto w-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <h4 className="font-dune text-xs sm:text-sm text-white mb-2 uppercase tracking-widest">MGR YUVA CHAPTER</h4>
                      <p className="font-sans text-sm text-dune-sand-muted">Dr. M.G.R Educational and Research Institute</p>
                    </div>
                  </div>
               </div>
            </motion.div>

          </div>
        </FadeInSection>

      </main>

      {/* Footer */}
      <footer className="relative z-10 pt-12 pb-6 bg-dune-bg px-6 border-t border-dune-border">
        <div className="max-w-7xl mx-auto mb-8">
          <DuneGame />
        </div>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
          <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-dune-sand-muted uppercase">
            &copy; 2026 MGR YUVA CHAPTER
          </p>
          <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-dune-spice uppercase text-center">
            // MAGIZH '26 &mdash; THE SPICE MUST FLOW
          </p>
          <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-dune-sand-muted uppercase">
            CHENNAI &middot; INDIA
          </p>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col items-center gap-4 mb-8">
          <div className="flex items-center gap-2 text-dune-sand-muted">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-dune-spice flex items-center gap-2 mr-2">
              <Share2 size={14} /> TRANSMIT
            </span>
            <div className="h-px w-8 bg-dune-border mx-2 hidden sm:block"></div>
            <button 
              className="p-2.5 hover:text-dune-spice hover:bg-dune-spice/10 rounded-full transition-colors cursor-interactive group" 
              aria-label="Share on Twitter" 
              onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent("Join me at MAGIZH '26 - The Spice Must Flow!")}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
            >
              <Twitter size={18} className="group-hover:scale-110 transition-transform" />
            </button>
            <button 
              className="p-2.5 hover:text-dune-spice hover:bg-dune-spice/10 rounded-full transition-colors cursor-interactive group" 
              aria-label="Share on Facebook" 
              onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
            >
              <Facebook size={18} className="group-hover:scale-110 transition-transform" />
            </button>
            <button 
              className="p-2.5 hover:text-dune-spice hover:bg-dune-spice/10 rounded-full transition-colors cursor-interactive group" 
              aria-label="Share on LinkedIn" 
              onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
            >
              <Linkedin size={18} className="group-hover:scale-110 transition-transform" />
            </button>
            <a
              href="https://www.instagram.com/mgr_magizh26/"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 hover:text-dune-spice hover:bg-dune-spice/10 rounded-full transition-colors cursor-interactive group"
              aria-label="Follow MAGIZH '26 on Instagram"
            >
              <Instagram size={18} className="group-hover:scale-110 transition-transform" />
            </a>
            <button 
              className="p-2.5 hover:text-dune-spice hover:bg-dune-spice/10 rounded-full transition-colors cursor-interactive group" 
              aria-label="Copy Link" 
              onClick={() => { navigator.clipboard.writeText(window.location.href); alert('Signal frequency copied to clipboard!'); }}
            >
              <Link2 size={18} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto flex justify-center border-t border-dune-border pt-6">
          <button 
            onClick={() => {
              console.log("%c>>> SYSTEM OVERRIDE ACCEPTED", "color: #d37335; font-size: 20px; font-weight: bold;");
              console.log("%c>>> THE SPICE MUST FLOW.", "color: #ffffff; font-size: 16px; font-family: monospace;");
              console.log("%c>>> SIETCH ENGINE DEVELOPED BY: YASHVINTHAN M", "color: #d37335; font-size: 14px; font-family: monospace; font-weight: bold;");
              console.log("%c>>> MGR YUVA SYNDICATE ACKNOWLEDGES YOUR PRESENCE.", "color: #888888; font-size: 12px; font-family: monospace;");
              setShowCreatorEgg(true);
            }} 
            className="font-mono text-[9px] text-dune-sand-muted hover:text-dune-spice tracking-[0.2em] uppercase transition-colors group"
          >
            [ <span className="text-white group-hover:text-dune-spice transition-colors">BUILT BY MGR YUVA</span> ]
          </button>
        </div>
      </footer>

      <ProphecyConsole />

      {/* Creator Easter Egg Modal */}
      <AnimatePresence>
        {showCreatorEgg && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] w-[90%] max-w-md bg-black/95 border border-dune-spice/80 p-8 rounded shadow-[0_0_50px_rgba(211,115,53,0.5)] backdrop-blur-md font-mono text-center"
          >
            <div className="w-12 h-12 rounded-full border border-dune-spice/60 flex items-center justify-center mx-auto mb-4 animate-pulse text-dune-spice text-xl">
              ⚡
            </div>
            <h3 className="text-white text-[10px] tracking-[0.25em] uppercase mb-2">CREATOR PROTOCOL DECRYPTED</h3>
            <p className="text-dune-spice text-xl font-bold tracking-wider my-4">
              MADE BY YASHVINTHAN M
            </p>
            <p className="text-dune-sand-muted text-[9px] uppercase tracking-widest mt-4">
              [ SIETCH DEPLOYMENT RE-ENFORCED // 100% RESIDENCE ]
            </p>
            <button
              onClick={() => setShowCreatorEgg(false)}
              className="mt-6 px-5 py-2 border border-dune-border hover:border-dune-spice text-white hover:text-dune-spice text-[9px] uppercase tracking-wider transition-colors duration-200 cursor-interactive"
            >
              Close Link
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
