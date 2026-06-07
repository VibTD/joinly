import { useState } from 'react';
import { useApp } from '../context/useApp.js';
import ImagePlaceholder from '../components/ImagePlaceholder.jsx';
import CategoryBadge from '../components/CategoryBadge.jsx';
import { CloseIcon, PinIcon, UsersIcon, CalendarIcon, GlobeIcon, LockIcon } from '../components/Icons.jsx';

const AVATAR_POOL = [
  '🧑', '👩', '🧔', '👱‍♂️', '👩‍🦰', '🧑‍🦱',
  '👨', '🧑‍🎤', '👩‍🎤', '🧑‍🚀', '👨‍🦰', '👩‍🦱',
];

// Erzeugt eine konsistente, "zufällige" Auswahl an Avataren je Event.
function participantAvatars(event, count = 6) {
  const offset = event.id
    .split('')
    .reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  return Array.from(
    { length: Math.min(count, AVATAR_POOL.length) },
    (_, i) => AVATAR_POOL[(offset + i) % AVATAR_POOL.length]
  );
}

export default function EventDetail() {
  const { selectedEvent, closeEventDetail, isJoined, toggleJoin } = useApp();
  const [closing, setClosing] = useState(false);

  if (!selectedEvent) return null;
  const event = selectedEvent;
  const joined = isJoined(event.id);
  const avatars = participantAvatars(event);

  const close = () => {
    setClosing(true);
    setTimeout(closeEventDetail, 280);
  };

  return (
    <div
      className={`detail-sheet${closing ? ' detail-sheet--closing' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={event.name}
    >
      <div className="detail-media">
        <ImagePlaceholder category={event.category} variant="rounded" height={240} emojiSize={72} />
        <button
          type="button"
          className="detail-close"
          onClick={close}
          aria-label="Schließen"
        >
          <CloseIcon width={18} height={18} />
        </button>
      </div>

      <div className="detail-body">
        <h1 className="detail-title">{event.name}</h1>

        <div className="detail-badges">
          <CategoryBadge category={event.category} inline />
          <span className="badge badge--inline">
            {event.isPrivate ? (
              <>
                <LockIcon width={13} height={13} /> Privat
              </>
            ) : (
              <>
                <GlobeIcon width={13} height={13} /> Öffentlich
              </>
            )}
          </span>
        </div>

        {event.description && <p className="detail-desc">{event.description}</p>}

        <ul className="detail-meta-list">
          <li>
            <CalendarIcon width={17} height={17} />
            <span>{event.date}</span>
          </li>
          <li>
            <PinIcon width={17} height={17} />
            <span>{event.location}</span>
          </li>
          <li>
            <UsersIcon width={17} height={17} />
            <span>{event.participants.toLocaleString('de-DE')} Teilnehmer</span>
          </li>
        </ul>

        <h2 className="section-title" style={{ marginTop: 28 }}>Teilnehmer</h2>
        <div className="detail-avatars">
          {avatars.map((a, i) => (
            <span className="avatar-xs detail-avatars__item" key={i} aria-hidden="true">
              {a}
            </span>
          ))}
        </div>

        {event.challenges.length > 0 && (
          <>
            <h2 className="section-title">Challenges</h2>
            <div style={{ display: 'grid', gap: 12 }}>
              {event.challenges.map((c) => (
                <article className="card challenge" key={c.id}>
                  <div className="challenge__icon" aria-hidden="true">🎯</div>
                  <div className="challenge__body">
                    <h3 className="challenge__task">{c.task}</h3>
                    <span className="challenge__reward">🎁 {c.reward}</span>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>

      <footer className="detail-footer">
        <button
          type="button"
          className={`btn btn--block ${joined ? 'btn--secondary' : 'btn--primary'}`}
          onClick={() => toggleJoin(event.id)}
        >
          {joined ? 'Verlassen' : 'Dabei sein'}
        </button>
      </footer>
    </div>
  );
}
