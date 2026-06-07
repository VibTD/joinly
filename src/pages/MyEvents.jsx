import { useApp } from '../context/useApp.js';
import ImagePlaceholder from '../components/ImagePlaceholder.jsx';
import CategoryBadge from '../components/CategoryBadge.jsx';
import ProgressBar from '../components/ProgressBar.jsx';
import { CheckIcon } from '../components/Icons.jsx';

export default function MyEvents() {
  const { joinedEvents, isCompleted, toggleChallenge, openEventDetail } = useApp();

  return (
    <div className="app-main">
      <header className="page-top">
        <h1 className="headline">Meine Events</h1>
        <p className="subhead">
          {joinedEvents.length} Event{joinedEvents.length === 1 ? '' : 's'}, bei
          dem du dabei bist.
        </p>
      </header>

      {joinedEvents.length === 0 ? (
        <div className="empty">
          <div className="empty__emoji">🗓️</div>
          <p className="empty__title">Noch keine Events</p>
          <p className="empty__text">
            Tippe bei einem Event auf „Dabei sein“ und es erscheint hier.
          </p>
        </div>
      ) : (
        joinedEvents.map((event) => {
          const total = event.challenges.length;
          const done = event.challenges.filter((c) => isCompleted(c.id)).length;

          return (
            <article key={event.id} className="card my-event">
              <div
                className="my-event__head my-event__head--clickable"
                onClick={() => openEventDetail(event.id)}
                role="button"
                tabIndex={0}
              >
                <ImagePlaceholder
                  category={event.category}
                  height={56}
                  emojiSize={26}
                  style={{ width: 56 }}
                />
                <div className="my-event__info">
                  <h3 className="my-event__title">{event.name}</h3>
                  <p className="my-event__meta">{event.date}</p>
                  <div style={{ marginTop: 6 }}>
                    <CategoryBadge category={event.category} inline />
                  </div>
                </div>
              </div>

              <div className="challenge-mini">
                <div className="challenge-mini__row">
                  <span className="challenge-mini__label">Challenges</span>
                  <span className="challenge-mini__count">
                    {done} / {total} erledigt
                  </span>
                </div>
                <ProgressBar value={done} max={total} />

                <ul style={{ marginTop: 14, display: 'grid', gap: 10 }}>
                  {event.challenges.map((c) => {
                    const completed = isCompleted(c.id);
                    return (
                      <li
                        key={c.id}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 10,
                        }}
                      >
                        <button
                          type="button"
                          className={`checkbox-btn${
                            completed ? ' checkbox-btn--checked' : ''
                          }`}
                          onClick={() => toggleChallenge(c.id)}
                          aria-pressed={completed}
                          aria-label={
                            completed
                              ? 'Challenge als offen markieren'
                              : 'Challenge als erledigt markieren'
                          }
                        >
                          {completed && <CheckIcon width={14} height={14} />}
                        </button>
                        <div style={{ flex: 1 }}>
                          <p
                            style={{
                              fontSize: 'var(--fs-body)',
                              fontWeight: 500,
                              color: completed
                                ? 'var(--color-text-secondary)'
                                : 'var(--color-text)',
                              textDecoration: completed
                                ? 'line-through'
                                : 'none',
                            }}
                          >
                            {c.task}
                          </p>
                          <span className="challenge__reward">
                            🎁 {c.reward}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </article>
          );
        })
      )}
    </div>
  );
}
