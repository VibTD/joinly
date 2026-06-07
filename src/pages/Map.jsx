import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useApp } from '../context/useApp.js';
import { CATEGORY_COLOR, GERMANY_CENTER } from '../data/dummyData.js';
import { categoryIcon } from '../utils/mapPins.js';

// Zentriert die Karte neu, sobald sich der Mittelpunkt ändert (z. B. nach Standortfreigabe).
function RecenterOnChange({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export default function MapPage() {
  const { events, openEventDetail } = useApp();
  const [center, setCenter] = useState([GERMANY_CENTER.lat, GERMANY_CENTER.lng]);
  const [zoom, setZoom] = useState(6);
  const [locating, setLocating] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocating(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCenter([pos.coords.latitude, pos.coords.longitude]);
        setZoom(11);
        setLocating(false);
      },
      () => {
        setCenter([GERMANY_CENTER.lat, GERMANY_CENTER.lng]);
        setZoom(6);
        setLocating(false);
      },
      { timeout: 8000 }
    );
  }, []);

  return (
    <div className="app-main app-main--map">
      <header className="page-top">
        <h1 className="headline">Karte</h1>
        <p className="subhead">
          {locating
            ? 'Wir suchen deinen Standort …'
            : 'Events in deiner Nähe — tippe auf einen Pin für Details.'}
        </p>
      </header>

      <div className="map-frame">
        <MapContainer center={center} zoom={zoom} scrollWheelZoom style={{ height: '100%', width: '100%' }}>
          <RecenterOnChange center={center} zoom={zoom} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {events
            .filter((e) => typeof e.lat === 'number' && typeof e.lng === 'number')
            .map((event) => (
              <Marker
                key={event.id}
                position={[event.lat, event.lng]}
                icon={categoryIcon(event.category)}
              >
                <Popup>
                  <div className="map-popup">
                    <p className="map-popup__title">{event.name}</p>
                    <p className="map-popup__date">{event.date}</p>
                    <button
                      type="button"
                      className="btn btn--sm btn--primary"
                      onClick={() => openEventDetail(event.id)}
                    >
                      Mehr
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>

      <div className="map-legend">
        {Object.entries(CATEGORY_COLOR).map(([category, color]) => (
          <span className="map-legend__item" key={category}>
            <span className="map-legend__dot" style={{ background: color }} />
            {category}
          </span>
        ))}
      </div>
    </div>
  );
}
