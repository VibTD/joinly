import { useMemo, useState } from 'react';
import { useApp } from '../context/useApp.js';
import EventCard from '../components/EventCard.jsx';
import HeaderActions from '../components/HeaderActions.jsx';

export default function Home() {
  const { events, profile, isJoined } = useApp();
  const [tab, setTab] = useState('mine');

  const visibleEvents = useMemo(
    () => events.filter((e) => (tab === 'mine' ? isJoined(e.id) : !isJoined(e.id))),
    [events, isJoined, tab]
  );

  return (
    <div className="app-main">
      <header className="greeting">
        <div className="greeting__text">
          <p className="greeting__hello">Willkommen zurück,</p>
          <h1 className="greeting__name">{profile.firstName} 👋</h1>
        </div>
        <HeaderActions />
      </header>

      <div className="toggle-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'mine'}
          className={`toggle-tab${tab === 'mine' ? ' toggle-tab--active' : ''}`}
          onClick={() => setTab('mine')}
        >
          Meine Events
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'discover'}
          className={`toggle-tab${tab === 'discover' ? ' toggle-tab--active' : ''}`}
          onClick={() => setTab('discover')}
        >
          Entdecken
        </button>
      </div>

      {visibleEvents.length === 0 ? (
        <div className="empty">
          <div className="empty__emoji">{tab === 'mine' ? '🗓️' : '✨'}</div>
          <p className="empty__title">
            {tab === 'mine' ? 'Noch keine Events' : 'Alles entdeckt'}
          </p>
          <p className="empty__text">
            {tab === 'mine'
              ? 'Tritt einem Event bei und es erscheint hier.'
              : 'Du bist bereits bei allen aktuellen Events dabei.'}
          </p>
        </div>
      ) : (
        visibleEvents.map((event) => <EventCard key={event.id} event={event} />)
      )}
    </div>
  );
}
