import { useApp } from '../context/useApp.js';
import { user } from '../data/dummyData.js';
import EventCard from '../components/EventCard.jsx';
import HeaderActions from '../components/HeaderActions.jsx';

export default function Home() {
  const { events } = useApp();

  return (
    <div className="app-main">
      <header className="greeting">
        <div className="greeting__text">
          <p className="greeting__hello">Willkommen zurück,</p>
          <h1 className="greeting__name">{user.name} 👋</h1>
        </div>
        <HeaderActions />
      </header>

      <p className="subhead" style={{ marginTop: 12 }}>
        Diese Events sind gerade aktiv in deiner Nähe.
      </p>

      <h2 className="section-title">Aktive Events</h2>

      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
