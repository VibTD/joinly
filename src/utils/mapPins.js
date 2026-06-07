import L from 'leaflet';
import { CATEGORY_EMOJI, CATEGORY_COLOR } from '../data/dummyData.js';

// Bunte Emoji-Pins statt der Standard-Leaflet-Marker (keine Bild-Assets nötig).
// Wird auf der Karten-Seite, dem Home-Kartenblock und im Orts-Picker verwendet.
export function categoryIcon(category) {
  const color = CATEGORY_COLOR[category] ?? '#717171';
  const emoji = CATEGORY_EMOJI[category] ?? '📍';
  return L.divIcon({
    className: 'map-pin',
    html: `<span class="map-pin__dot" style="background:${color}">${emoji}</span>`,
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -32],
  });
}

// Pin für den Orts-Picker beim Event-Erstellen — neutral, ohne Kategorie-Bezug.
export const locationPinIcon = L.divIcon({
  className: 'location-pin',
  html: '<span class="location-pin__dot">📍</span>',
  iconSize: [32, 32],
  iconAnchor: [16, 30],
});
