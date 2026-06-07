// ===========================================================================
// Geocoding über die öffentliche Nominatim-API (OpenStreetMap) — kein Key nötig.
// ===========================================================================

const NOMINATIM_BASE = 'https://nominatim.openstreetmap.org';

// Adresse -> Koordinaten ("Stadtpark, Mainz" -> { lat, lng, label }).
export async function geocodeAddress(query) {
  const q = query.trim();
  if (!q) return null;

  const url = `${NOMINATIM_BASE}/search?format=json&limit=1&q=${encodeURIComponent(q)}`;
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) return null;

  const results = await res.json();
  if (!results.length) return null;

  const [hit] = results;
  return { lat: Number(hit.lat), lng: Number(hit.lon), label: hit.display_name };
}

// Koordinaten -> Adresse (Klick/Drag auf der Karte -> Textfeld befüllen).
export async function reverseGeocode(lat, lng) {
  const url = `${NOMINATIM_BASE}/reverse?format=json&lat=${lat}&lon=${lng}`;
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) return null;

  const result = await res.json();
  return result?.display_name ?? null;
}
