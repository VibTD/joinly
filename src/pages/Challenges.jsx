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
        <span className="challenge__event-badge">{event.name}</span>
        <h3 className="challenge__task">{challenge.task}</h3>
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
  return (
    <article className={`card challenge${completed ? ' challenge--done' : ''}`}>
      <div className="challenge__icon" aria-hidden="true">
        {challenge.icon}
      </div>
      <div className="challenge__body">
        <span className="challenge__event-badge">{challenge.eventName}</span>
        <h3 className="challenge__task">{challenge.task}</h3>
        <div className="challenge__from">
          <span className="avatar-xs" aria-hidden="true">
            {challenge.fromAvatar}
          </span>
          <span className="challenge__event">Von {challenge.from}</span>
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

      {completed && (
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

  // Veranstalter-Challenges aus allen Events, bei denen der User dabei ist —
  // aufgeteilt in offen (zuerst) und erledigt (eigener Abschnitt am Ende).
  const { openOrganizer, doneOrganizer } = useMemo(() => {
    const all = joinedEvents.flatMap((event) =>
      event.challenges.map((challenge) => ({ event, challenge }))
    );
    return {
      openOrganizer: all.filter(({ challenge }) => !isCompleted(challenge.id)),
      doneOrganizer: all.filter(({ challenge }) => isCompleted(challenge.id)),
    };
  }, [joinedEvents, isCompleted]);

  const { openFriends, doneFriends } = useMemo(
    () => ({
      openFriends: friendChallenges.filter((c) => c.status !== 'accepted'),
      doneFriends: friendChallenges.filter((c) => c.status === 'accepted'),
    }),
    [friendChallenges]
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
          (openOrganizer.length === 0 && doneOrganizer.length === 0 ? (
            <div className="empty">
              <div className="empty__emoji">🎯</div>
              <p className="empty__title">Keine Challenges</p>
              <p className="empty__text">
                Tritt einem Event bei, um Challenges der Veranstalter zu sehen.
              </p>
            </div>
          ) : (
            <>
              {openOrganizer.map(({ event, challenge }) => (
                <OrganizerChallenge
                  key={challenge.id}
                  event={event}
                  challenge={challenge}
                  completed={false}
                  onToggle={() => toggleChallenge(challenge.id)}
                />
              ))}

              {doneOrganizer.length > 0 && (
                <>
                  <div className="divider-label">Erledigt</div>
                  {doneOrganizer.map(({ event, challenge }) => (
                    <OrganizerChallenge
                      key={challenge.id}
                      event={event}
                      challenge={challenge}
                      completed
                      onToggle={() => toggleChallenge(challenge.id)}
                    />
                  ))}
                </>
              )}
            </>
          ))}

        {tab === 'friends' &&
          (openFriends.length === 0 && doneFriends.length === 0 ? (
            <div className="empty">
              <div className="empty__emoji">🤝</div>
              <p className="empty__title">Keine Einladungen</p>
              <p className="empty__text">
                Hier landen Challenges, die dir Freunde schicken.
              </p>
            </div>
          ) : (
            <>
              {openFriends.map((challenge) => (
                <FriendChallenge
                  key={challenge.id}
                  challenge={challenge}
                  onRespond={respondToFriendChallenge}
                  completed={false}
                />
              ))}

              {doneFriends.length > 0 && (
                <>
                  <div className="divider-label">Erledigt</div>
                  {doneFriends.map((challenge) => (
                    <FriendChallenge
                      key={challenge.id}
                      challenge={challenge}
                      onRespond={respondToFriendChallenge}
                      completed
                    />
                  ))}
                </>
              )}
            </>
          ))}
      </div>
    </div>
  );
}
