import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { GERMANY_CENTER } from '../data/dummyData.js';
import { locationPinIcon } from '../utils/mapPins.js';

// Reagiert auf Karten-Klicks (Pin setzen) und zentriert weich auf neue Koordinaten
// (z. B. nachdem die Adresse im Textfeld per Geocoding aufgelöst wurde).
function MapInteractions({ coords, onPick }) {
  const map = useMap();

  useMapEvents({
    click(e) {
      onPick(e.latlng.lat, e.latlng.lng);
    },
  });

  useEffect(() => {
    if (!coords) return;
    map.flyTo([coords.lat, coords.lng], Math.max(map.getZoom(), 13), { duration: 0.6 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coords?.lat, coords?.lng]);

  return null;
}

// Eingebettete Mini-Karte fürs Event-erstellen-Formular: Tippen setzt einen
// verschiebbaren Pin, dessen Koordinaten per Reverse-Geocoding den Adresstext liefern.
export default function LocationPicker({ coords, onPick }) {
  const start = coords ?? GERMANY_CENTER;

  return (
    <div className="location-picker">
      <MapContainer
        center={[start.lat, start.lng]}
        zoom={coords ? 13 : 6}
        scrollWheelZoom={false}
        style={{ height: 200, width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapInteractions coords={coords} onPick={onPick} />
        {coords && (
          <Marker
            position={[coords.lat, coords.lng]}
            icon={locationPinIcon}
            draggable
            eventHandlers={{
              dragend: (e) => {
                const { lat, lng } = e.target.getLatLng();
                onPick(lat, lng);
              },
            }}
          />
        )}
      </MapContainer>
      <p className="location-picker__hint">
        📍 Tippe auf die Karte oder ziehe den Pin — die Adresse wird automatisch ins Feld oben übernommen.
      </p>
    </div>
  );
}
