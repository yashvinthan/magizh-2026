import { useEffect, useRef, useState } from 'react';
import { Expand, Gamepad2, Keyboard, LoaderCircle, Minimize2, Monitor, Play, RotateCcw, X } from 'lucide-react';

type PlayerMessage = {
  source?: string;
  type?: 'loading' | 'running' | 'error' | 'exit';
  message?: string;
};

export function DuneGame() {
  const shellRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSectionVisible, setIsSectionVisible] = useState(true);
  const [isDiscoveryDismissed, setIsDiscoveryDismissed] = useState(false);
  const [status, setStatus] = useState<'loading' | 'running' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const [session, setSession] = useState(0);

  useEffect(() => {
    document.body.classList.toggle('dune-original-active', isOpen);
    return () => document.body.classList.remove('dune-original-active');
  }, [isOpen]);

  useEffect(() => {
    const section = shellRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsSectionVisible(entry.isIntersecting),
      { threshold: 0.12 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || isFullscreen) return;
    const frame = requestAnimationFrame(() => {
      shellRef.current?.scrollIntoView({ block: 'start' });
      window.scrollBy({ top: -86 });
    });
    return () => cancelAnimationFrame(frame);
  }, [isOpen, isFullscreen, session]);

  useEffect(() => {
    const receivePlayerMessage = (event: MessageEvent<PlayerMessage>) => {
      if (event.origin !== window.location.origin || event.data?.source !== 'dune-player') return;
      if (event.data.type === 'loading') setStatus('loading');
      if (event.data.type === 'running') setStatus('running');
      if (event.data.type === 'error') {
        setStatus('error');
        setErrorMessage(event.data.message || 'The DOS player could not start.');
      }
      if (event.data.type === 'exit') {
        setIsFullscreen(false);
        setIsOpen(false);
        setStatus('loading');
      }
    };

    window.addEventListener('message', receivePlayerMessage);
    return () => window.removeEventListener('message', receivePlayerMessage);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsFullscreen(false);
        setIsOpen(false);
        setStatus('loading');
      }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isOpen]);

  const bootGame = () => {
    setStatus('loading');
    setErrorMessage('');
    setIsOpen(true);
  };

  const closeGame = () => {
    setIsFullscreen(false);
    setIsOpen(false);
    setStatus('loading');
  };

  const restartGame = () => {
    setStatus('loading');
    setErrorMessage('');
    setSession((value) => value + 1);
  };

  const dismissDiscovery = () => {
    setIsDiscoveryDismissed(true);
  };

  if (!isOpen) {
    return (
      <>
        <section ref={shellRef} className="dune-original-launcher" aria-label="Play the original Dune DOS game">
          <div className="dune-original-copy">
            <span>C:\\MAGIZH\\ARCHIVE&gt; DUNE.BAT</span>
            <h2>DUNE</h2>
            <h3>THE ORIGINAL DOS GAME</h3>
            <p>The complete 1992 adventure and strategy game, running directly inside the MAGIZH website.</p>
            <button onClick={bootGame}><Play size={15} fill="currentColor" /> BOOT DUNE</button>
          </div>
          <div className="dune-original-specs" aria-hidden="true">
            <Monitor />
            <span>VGA 256 COLOR</span>
            <span>DOS EMULATION</span>
            <span>FULL GAME ARCHIVE</span>
          </div>
        </section>

        {!isSectionVisible && !isDiscoveryDismissed && (
          <aside className="dune-discovery-launcher" aria-label="Dune DOS game available">
            <button className="dune-discovery-close" onClick={dismissDiscovery} aria-label="Dismiss game shortcut">
              <X />
            </button>
            <button className="dune-discovery-action" onClick={bootGame}>
              <span className="dune-discovery-icon"><Gamepad2 /></span>
              <span>
                <small>Hidden transmission // DOS archive</small>
                <b>PLAY DUNE</b>
                <em>Full 1992 game inside the website</em>
              </span>
              <Play className="dune-discovery-play" fill="currentColor" />
            </button>
          </aside>
        )}
      </>
    );
  }

  return (
    <section ref={shellRef} className={`dune-emulator-shell ${isFullscreen ? 'dune-emulator-fullscreen' : ''}`} aria-label="Dune DOS game player">
      <header className="dune-emulator-header">
        <div><Gamepad2 /><span>DUNE.EXE</span><small>CRYO INTERACTIVE // 1992</small></div>
        <nav aria-label="Game player controls">
          <button onClick={restartGame} title="Restart game"><RotateCcw /></button>
          <button onClick={() => setIsFullscreen((value) => !value)} title="Toggle fullscreen">{isFullscreen ? <Minimize2 /> : <Expand />}</button>
          <button onClick={closeGame} title="Close game"><X /></button>
        </nav>
      </header>

      <div className="dune-emulator-stage">
        <iframe
          key={session}
          className="dune-emulator-frame"
          src={`dune-player.html?session=${session}`}
          title="Original Dune DOS game"
          allow="autoplay; fullscreen; gamepad"
        />
        {status === 'loading' && (
          <div className="dune-emulator-loading"><LoaderCircle /><b>LOADING ARRAKIS</b><span>Validating and mounting the DOS archive...</span></div>
        )}
        {status === 'error' && (
          <div className="dune-emulator-loading dune-emulator-error"><b>BOOT FAILURE</b><span>{errorMessage}</span><button onClick={restartGame}>RETRY</button></div>
        )}
      </div>

      <footer className="dune-emulator-help">
        <span><Keyboard /> MOVE THE MOUSE INTO THE GAME AND CLICK TO PLAY</span>
        <span>KEYBOARD AND MOUSE STAY INSIDE THE GAME FRAME</span>
      </footer>
    </section>
  );
}
