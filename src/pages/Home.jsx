import { useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useApp } from '../context/useApp.js';
import EventCard from '../components/EventCard.jsx';
import HeaderActions from '../components/HeaderActions.jsx';
import { categoryIcon } from '../utils/mapPins.js';

export default function Home() {
  const { events, profile, isJoined, setActivePage } = useApp();
  const [tab, setTab] = useState('mine');
  const [mapExpanded, setMapExpanded] = useState(false);

  const visibleEvents = useMemo(
    () => events.filter((e) => (tab === 'mine' ? isJoined(e.id) : !isJoined(e.id))),
    [events, isJoined, tab]
  );

  // Events mit Koordinaten, sortiert nach zeitlicher Nähe zu "jetzt" — die ersten
  // beiden sind die Pins, die der Kartenblock ohne "Mehr anzeigen" zeigt.
  const nearbyByTime = useMemo(() => {
    const now = Date.now();
    const distance = (event) =>
      event.dateTime ? Math.abs(new Date(event.dateTime).getTime() - now) : Infinity;
    return events
      .filter((e) => typeof e.lat === 'number' && typeof e.lng === 'number')
      .slice()
      .sort((a, b) => distance(a) - distance(b));
  }, [events]);

  const mapPins = mapExpanded ? nearbyByTime : nearbyByTime.slice(0, 2);

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

      {mapPins.length > 0 && (
        <section className="home-map">
          <h2 className="section-title">Auf der Karte</h2>
          <div
            className="home-map__frame"
            onClick={() => setActivePage('map')}
            role="button"
            tabIndex={0}
            aria-label="Zur vollständigen Kartenansicht wechseln"
          >
            <MapContainer
              key={mapPins.map((e) => e.id).join('-')}
              bounds={mapPins.map((e) => [e.lat, e.lng])}
              boundsOptions={{ padding: [28, 28], maxZoom: 13 }}
              style={{ height: 220, width: '100%' }}
              dragging={false}
              zoomControl={false}
              scrollWheelZoom={false}
              doubleClickZoom={false}
              touchZoom={false}
              attributionControl={false}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {mapPins.map((event) => (
                <Marker
                  key={event.id}
                  position={[event.lat, event.lng]}
                  icon={categoryIcon(event.category)}
                />
              ))}
            </MapContainer>
            <span className="home-map__hint">Zur Karte ›</span>
          </div>

          {nearbyByTime.length > 2 && (
            <button
              type="button"
              className="btn btn--ghost btn--sm btn--block"
              style={{ marginTop: 10 }}
              onClick={(e) => {
                e.stopPropagation();
                setMapExpanded((v) => !v);
              }}
            >
              {mapExpanded
                ? 'Weniger anzeigen'
                : `Mehr anzeigen (+${nearbyByTime.length - 2})`}
            </button>
          )}
        </section>
      )}
    </div>
  );
}
