import { useApp } from '../context/useApp.js';
import ImagePlaceholder from './ImagePlaceholder.jsx';
import CategoryBadge from './CategoryBadge.jsx';
import { PinIcon, UsersIcon, LockIcon } from './Icons.jsx';

// Volle Event-Karte (Home-Feed): Bild, Badge, Name, Ort, Teilnehmer, Button.
export default function EventCard({ event }) {
  const { isJoined, toggleJoin } = useApp();
  const joined = isJoined(event.id);

  return (
    <article className="card">
      <div className="event-card__media">
        <ImagePlaceholder category={event.category} variant="top" height={180} />
        <div className="event-card__badge">
          <CategoryBadge category={event.category} />
        </div>
        {event.isPrivate && (
          <div className="event-card__lock" title="Privates Event">
            <LockIcon width={16} height={16} />
          </div>
        )}
      </div>

      <div className="event-card__body">
        <h3 className="event-card__title">{event.name}</h3>

        <div className="event-card__meta">
          <PinIcon />
          <span>{event.location}</span>
        </div>

        <div className="event-card__footer">
          <span className="event-card__meta" style={{ marginTop: 0 }}>
            <UsersIcon />
            <span>{event.participants.toLocaleString('de-DE')} dabei</span>
          </span>

          <button
            type="button"
            className={`btn btn--sm ${joined ? 'btn--joined' : 'btn--primary'}`}
            onClick={() => toggleJoin(event.id)}
          >
            {joined ? '✓ Dabei' : 'Dabei sein'}
          </button>
        </div>
      </div>
    </article>
  );
}
