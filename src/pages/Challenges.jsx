import { useMemo, useState } from 'react';
import { useApp } from '../context/useApp.js';
import { CheckIcon, CloseIcon } from '../components/Icons.jsx';

function OrganizerChallenge({ event, challenge, completed, onToggle }) {
  return (
    <article className={`card challenge${completed ? ' challenge--done' : ''}`}>
      <div className="challenge__icon" aria-hidden="true">
        🎯
      </div>
      <div className="challenge__body">
        <h3 className="challenge__task">{challenge.task}</h3>
        <p className="challenge__event">{event.name}</p>
        <span className="challenge__reward">🎁 {challenge.reward}</span>
      </div>
      {completed ? (
        <span className="challenge__check" aria-label="Erledigt">
          <CheckIcon width={14} height={14} />
        </span>
      ) : (
        <button
          type="button"
          className="btn btn--sm btn--secondary"
          onClick={onToggle}
          style={{ alignSelf: 'center' }}
        >
          Erledigt
        </button>
      )}
    </article>
  );
}

function FriendChallenge({ challenge, onRespond, completed }) {
  const done = challenge.status === 'accepted';

  return (
    <article className={`card challenge${completed ? ' challenge--done' : ''}`}>
      <div className="challenge__icon" aria-hidden="true">
        {challenge.icon}
      </div>
      <div className="challenge__body">
        <h3 className="challenge__task">{challenge.task}</h3>
        <div className="challenge__from">
          <span className="avatar-xs" aria-hidden="true">
            {challenge.fromAvatar}
          </span>
          <span className="challenge__event">
            Von {challenge.from} · {challenge.eventName}
          </span>
        </div>
        <span className="challenge__reward">🎁 {challenge.reward}</span>

        {challenge.status === 'pending' && (
          <div className="challenge__actions">
            <button
              type="button"
              className="btn btn--sm btn--primary"
              onClick={() => onRespond(challenge.id, 'accepted')}
            >
              Annehmen
            </button>
            <button
              type="button"
              className="btn btn--sm btn--secondary"
              onClick={() => onRespond(challenge.id, 'declined')}
            >
              Ablehnen
            </button>
          </div>
        )}

        {challenge.status === 'declined' && (
          <p className="challenge__event" style={{ marginTop: 10 }}>
            <CloseIcon width={12} height={12} /> Abgelehnt
          </p>
        )}
      </div>

      {done && (
        <span className="challenge__check" aria-label="Angenommen">
          <CheckIcon width={14} height={14} />
        </span>
      )}
    </article>
  );
}

export default function Challenges() {
  const {
    joinedEvents,
    isCompleted,
    toggleChallenge,
    friendChallenges,
    respondToFriendChallenge,
  } = useApp();
  const [tab, setTab] = useState('organizer');

  // Veranstalter-Challenges aus allen Events, bei denen der User dabei ist.
  const organizerChallenges = useMemo(
    () =>
      joinedEvents.flatMap((event) =>
        event.challenges.map((challenge) => ({ event, challenge }))
      ),
    [joinedEvents]
  );

  const pendingFriendCount = friendChallenges.filter(
    (c) => c.status === 'pending'
  ).length;

  return (
    <div className="app-main">
      <header className="page-top">
        <h1 className="headline">Challenges</h1>
      </header>

      <div className="tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'organizer'}
          className={`tab${tab === 'organizer' ? ' tab--active' : ''}`}
          onClick={() => setTab('organizer')}
        >
          Von Veranstaltern
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'friends'}
          className={`tab${tab === 'friends' ? ' tab--active' : ''}`}
          onClick={() => setTab('friends')}
        >
          Von Freunden
          {pendingFriendCount > 0 && (
            <span className="tab__badge">{pendingFriendCount}</span>
          )}
        </button>
      </div>

      <div style={{ marginTop: 16 }}>
        {tab === 'organizer' &&
          (organizerChallenges.length === 0 ? (
            <div className="empty">
              <div className="empty__emoji">🎯</div>
              <p className="empty__title">Keine Challenges</p>
              <p className="empty__text">
                Tritt einem Event bei, um Challenges der Veranstalter zu sehen.
              </p>
            </div>
          ) : (
            organizerChallenges.map(({ event, challenge }) => (
              <OrganizerChallenge
                key={challenge.id}
                event={event}
                challenge={challenge}
                completed={isCompleted(challenge.id)}
                onToggle={() => toggleChallenge(challenge.id)}
              />
            ))
          ))}

        {tab === 'friends' &&
          (friendChallenges.length === 0 ? (
            <div className="empty">
              <div className="empty__emoji">🤝</div>
              <p className="empty__title">Keine Einladungen</p>
              <p className="empty__text">
                Hier landen Challenges, die dir Freunde schicken.
              </p>
            </div>
          ) : (
            friendChallenges.map((challenge) => (
              <FriendChallenge
                key={challenge.id}
                challenge={challenge}
                onRespond={respondToFriendChallenge}
                completed={challenge.status === 'accepted'}
              />
            ))
          ))}
      </div>
    </div>
  );
}
