import { useMemo, useState } from 'react';
import { useApp } from '../context/useApp.js';
import ImagePlaceholder from '../components/ImagePlaceholder.jsx';
import CategoryBadge from '../components/CategoryBadge.jsx';
import ProgressBar from '../components/ProgressBar.jsx';
import { CheckIcon } from '../components/Icons.jsx';

const todayStr = new Date().toISOString().slice(0, 10);
const isToday = (event) =>
  typeof event.dateTime === 'string' && event.dateTime.slice(0, 10) === todayStr;

// Eine Zeile in den kompakten Challenge-Listen (Veranstalter & Freunde) — Toggle
// links, Aufgabe + Meta-Zeile rechts, durchgestrichen sobald erledigt/angenommen.
function MiniChallengeRow({ done, onToggle, label, task, meta }) {
  return (
    <li className="mini-challenge">
      <button
        type="button"
        className={`checkbox-btn${done ? ' checkbox-btn--checked' : ''}`}
        onClick={onToggle}
        aria-pressed={done}
        aria-label={done ? `${label} als offen markieren` : `${label} als erledigt markieren`}
      >
        {done && <CheckIcon width={14} height={14} />}
      </button>
      <div className="mini-challenge__body">
        <p className={`mini-challenge__task${done ? ' mini-challenge__task--done' : ''}`}>
          {task}
        </p>
        {meta}
      </div>
    </li>
  );
}

export default function MyEvents() {
  const {
    joinedEvents,
    isCompleted,
    toggleChallenge,
    openEventDetail,
    requestLeave,
    friendChallenges,
    respondToFriendChallenge,
  } = useApp();
  const [filter, setFilter] = useState('all');

  const visibleEvents = useMemo(
    () => (filter === 'today' ? joinedEvents.filter(isToday) : joinedEvents),
    [joinedEvents, filter]
  );

  return (
    <div className="app-main">
      <header className="page-top">
        <h1 className="headline">Meine Events</h1>
        <p className="subhead">
          {joinedEvents.length} Event{joinedEvents.length === 1 ? '' : 's'}, bei
          dem du dabei bist.
        </p>
      </header>

      <div className="toggle-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={filter === 'today'}
          className={`toggle-tab${filter === 'today' ? ' toggle-tab--active' : ''}`}
          onClick={() => setFilter('today')}
        >
          Heute
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={filter === 'all'}
          className={`toggle-tab${filter === 'all' ? ' toggle-tab--active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Alle
        </button>
      </div>

      {visibleEvents.length === 0 ? (
        <div className="empty">
          <div className="empty__emoji">{filter === 'today' ? '☀️' : '🗓️'}</div>
          <p className="empty__title">
            {filter === 'today' ? 'Heute nichts geplant' : 'Noch keine Events'}
          </p>
          <p className="empty__text">
            {filter === 'today'
              ? 'Keins deiner Events findet heute statt — schau später wieder vorbei.'
              : 'Tippe bei einem Event auf „Dabei sein“ und es erscheint hier.'}
          </p>
        </div>
      ) : (
        visibleEvents.map((event) => {
          const total = event.challenges.length;
          const done = event.challenges.filter((c) => isCompleted(c.id)).length;
          const eventFriendChallenges = friendChallenges.filter(
            (c) => c.eventId === event.id
          );
          const acceptedFriend = eventFriendChallenges.filter(
            (c) => c.status === 'accepted'
          ).length;

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
                  image={event.image}
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

              {total > 0 && (
                <div className="challenge-mini">
                  <div className="challenge-mini__row">
                    <span className="challenge-mini__label">🎯 Veranstalter-Challenges</span>
                    <span className="challenge-mini__count">
                      {done} / {total} erledigt
                    </span>
                  </div>
                  <ProgressBar value={done} max={total} />

                  <ul className="mini-challenge-list">
                    {event.challenges.map((c) => {
                      const completed = isCompleted(c.id);
                      return (
                        <MiniChallengeRow
                          key={c.id}
                          done={completed}
                          onToggle={() => toggleChallenge(c.id)}
                          label="Challenge"
                          task={c.task}
                          meta={<span className="challenge__reward">🎁 {c.reward}</span>}
                        />
                      );
                    })}
                  </ul>
                </div>
              )}

              {eventFriendChallenges.length > 0 && (
                <div className="challenge-mini">
                  <div className="challenge-mini__row">
                    <span className="challenge-mini__label">🤝 Freundes-Challenges</span>
                    <span className="challenge-mini__count">
                      {acceptedFriend} / {eventFriendChallenges.length} angenommen
                    </span>
                  </div>

                  <ul className="mini-challenge-list">
                    {eventFriendChallenges.map((c) => {
                      const accepted = c.status === 'accepted';
                      return (
                        <MiniChallengeRow
                          key={c.id}
                          done={accepted}
                          onToggle={() =>
                            respondToFriendChallenge(c.id, accepted ? 'pending' : 'accepted')
                          }
                          label="Freundes-Challenge"
                          task={c.task}
                          meta={
                            <div className="challenge__from">
                              <span className="avatar-xs" aria-hidden="true">
                                {c.fromAvatar}
                              </span>
                              <span className="challenge__event">
                                Von {c.from} · 🎁 {c.reward}
                              </span>
                            </div>
                          }
                        />
                      );
                    })}
                  </ul>
                </div>
              )}

              <button
                type="button"
                className="btn btn--ghost btn--sm btn--block my-event__leave"
                onClick={() => requestLeave(event.id)}
              >
                Verlassen
              </button>
            </article>
          );
        })
      )}
    </div>
  );
}
