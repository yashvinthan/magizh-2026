import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CalendarDays, Check, Clock3, MapPin, Phone, ShieldCheck, Users } from 'lucide-react';
import type { EventDetail } from '../data/events';
import { GENERAL_EVENT_RULES } from '../data/events';
import { RegistrationModal } from './RegistrationModal';
import { CustomCursor } from './CustomCursor';
import { DustParticles } from './DustParticles';

interface Props {
  event: EventDetail;
  onBack: () => void;
}

export function EventDetailPage({ event, onBack }: Props) {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const titleScale = event.title.length > 16 ? 'long' : event.title.length > 11 ? 'medium' : 'short';

  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${event.title} | MAGIZH '26`;
    return () => { document.title = previousTitle; };
  }, [event.title]);

  return (
    <div className="event-detail-page min-h-screen bg-dune-bg text-dune-sand selection:bg-dune-spice selection:text-black">
      <CustomCursor />
      <DustParticles />
      <RegistrationModal isOpen={isRegistrationOpen} onClose={() => setIsRegistrationOpen(false)} />

      <header className="event-detail-nav">
        <button onClick={onBack} className="event-detail-back">
          <ArrowLeft size={14} /> All events
        </button>
        <span className="event-detail-brand"><b>M</b> MGR YUVA / MAGIZH '26</span>
        <button onClick={() => setIsRegistrationOpen(true)} className="event-detail-register">Register</button>
      </header>

      <main>
        <section className="event-detail-hero" data-title-scale={titleScale}>
          <div className="event-detail-orbit" aria-hidden="true"><i /><i /><i /></div>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }} className="event-detail-hero-copy">
            <span className="event-detail-code">[ EVENT 0{event.id} // {event.category.toUpperCase()} ]</span>
            <h1>{event.title}</h1>
            <p>{event.description}</p>
            {event.theme && <div className="event-detail-theme">Theme <strong>{event.theme}</strong></div>}
          </motion.div>

          <div className="event-detail-facts">
            <div><CalendarDays /><span><small>Date</small><strong>{event.date}</strong></span></div>
            <div><Clock3 /><span><small>Event window</small><strong>{event.time}</strong></span></div>
            <div><MapPin /><span><small>Venue</small><strong>{event.venue}</strong></span></div>
            <div><Users /><span><small>Formation</small><strong>{event.teamSize}</strong></span></div>
          </div>
        </section>

        <section className="event-detail-content">
          <article className="event-rule-panel">
            <div className="event-detail-section-heading">
              <span>01</span>
              <div><small>Official rulebook</small><h2>Event Protocol</h2></div>
            </div>
            <ol className="event-rule-list">
              {event.rules.map((rule, index) => (
                <li key={rule}><span>{String(index + 1).padStart(2, '0')}</span><p>{rule}</p></li>
              ))}
            </ol>
          </article>

          <aside className="event-detail-aside">
            {event.judging && (
              <div className="event-detail-block">
                <div className="event-detail-section-heading compact">
                  <span>02</span>
                  <div><small>Evaluation matrix</small><h2>Judging Criteria</h2></div>
                </div>
                <ul className="event-criteria-list">
                  {event.judging.map((criterion) => <li key={criterion}><Check size={12} /> {criterion}</li>)}
                </ul>
              </div>
            )}

            <div className="event-detail-block event-contact-block">
              <div className="event-detail-section-heading compact">
                <span>03</span>
                <div><small>Student coordinator</small><h2>Contact Channel</h2></div>
              </div>
              <div className="event-contact-list">
                {event.coordinators.map((coordinator) => (
                  <a key={coordinator.phone} href={`tel:+91${coordinator.phone}`}>
                    <span>{coordinator.name}</span>
                    <small><Phone size={12} /> +91 {coordinator.phone.slice(0, 5)} {coordinator.phone.slice(5)}</small>
                  </a>
                ))}
              </div>
            </div>

            <div className="event-detail-block">
              <div className="event-detail-section-heading compact">
                <span>04</span>
                <div><small>Campus-wide</small><h2>General Protocol</h2></div>
              </div>
              <ul className="event-general-list">
                {GENERAL_EVENT_RULES.map((rule) => <li key={rule}><ShieldCheck size={13} /> <span>{rule}</span></li>)}
              </ul>
            </div>
          </aside>
        </section>

        <section className="event-detail-cta">
          <span>Ready to enter the trial?</span>
          <h2>Secure your place in {event.title}.</h2>
          <button onClick={() => setIsRegistrationOpen(true)}>Register for this event</button>
        </section>
      </main>
    </div>
  );
}
