import { useApp } from '../context/useApp.js';
import { user } from '../data/dummyData.js';
import ImagePlaceholder from '../components/ImagePlaceholder.jsx';

export default function Profile() {
  const { joinedEvents, completedChallengeIds } = useApp();

  // Stats teils dynamisch (live mit dem App-State), teils aus den Dummy-Daten.
  const stats = [
    { value: joinedEvents.length || user.stats.events, label: 'Events dabei' },
    {
      value: completedChallengeIds.length,
      label: 'Challenges erledigt',
    },
    { value: user.stats.points.toLocaleString('de-DE'), label: 'Punkte' },
  ];

  const recent = joinedEvents.slice(0, 4);

  return (
    <div className="app-main">
      <header className="profile-head">
        <div className="profile-head__avatar" aria-hidden="true">
          {user.avatar}
        </div>
        <h1 className="profile-head__name">{user.name}</h1>
        <p className="profile-head__handle">{user.handle}</p>
        <p className="profile-head__bio">{user.bio}</p>

        <button
          type="button"
          className="btn btn--secondary btn--sm"
          style={{ marginTop: 16 }}
        >
          Profil bearbeiten
        </button>
      </header>

      <div className="stats">
        {stats.map((s) => (
          <div className="stat" key={s.label}>
            <div className="stat__value">{s.value}</div>
            <div className="stat__label">{s.label}</div>
          </div>
        ))}
      </div>

      <h2 className="section-title">Letzte Events</h2>

      {recent.length === 0 ? (
        <div className="empty" style={{ padding: '32px 24px' }}>
          <div className="empty__emoji">✨</div>
          <p className="empty__title">Noch nichts dabei</p>
          <p className="empty__text">Deine besuchten Events erscheinen hier.</p>
        </div>
      ) : (
        <div>
          {recent.map((event) => (
            <div className="recent-row" key={event.id}>
              <ImagePlaceholder
                category={event.category}
                height={48}
                emojiSize={22}
                style={{ width: 48 }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p className="recent-row__title">{event.name}</p>
                <p className="recent-row__sub">
                  {event.category} · {event.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
