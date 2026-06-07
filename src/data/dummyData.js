// ===========================================================================
// Joinly — Dummy data (kein Backend)
// ===========================================================================

export const CATEGORIES = [
  { key: 'Weinwanderung', emoji: '🍷' },
  { key: 'Festival', emoji: '🎵' },
  { key: 'Sport', emoji: '🏃' },
  { key: 'Party', emoji: '🎉' },
];

// Map: Kategorie -> Emoji (für Bild-Platzhalter)
export const CATEGORY_EMOJI = CATEGORIES.reduce((acc, c) => {
  acc[c.key] = c.emoji;
  return acc;
}, {});

export const FILTERS = ['Alle', ...CATEGORIES.map((c) => c.key)];

// Map: Kategorie -> Farbe (für Karten-Pins)
export const CATEGORY_COLOR = {
  Weinwanderung: '#9b2247',
  Festival: '#6c5ce7',
  Sport: '#1f9d55',
  Party: '#f5a623',
};

// Mittelpunkt Deutschlands — Standardansicht der Karte ohne Standortfreigabe.
export const GERMANY_CENTER = { lat: 51.1657, lng: 10.4515 };

export const user = {
  firstName: 'Lena',
  lastName: 'Berger',
  username: 'lena.j',
  bio: 'Immer auf der Suche nach dem nächsten Abenteuer 🌿 Wein, Musik & gute Leute.',
  avatar: '🧗‍♀️',
  stats: {
    events: 12,
    challenges: 27,
    points: 1840,
  },
};

// --- Events ----------------------------------------------------------------

export const events = [
  {
    id: 'e1',
    name: 'Riesling Sunset Wanderung',
    description:
      'Gemütliche Wanderung durch die Weinberge des Rheingaus mit Verkostung an drei Stationen und Blick auf den Sonnenuntergang über dem Rhein.',
    image: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=400&h=200&fit=crop',
    location: 'Rheingau, Rüdesheim',
    date: 'So, 7. Juni · 16:00',
    dateTime: '2026-06-07T16:00',
    category: 'Weinwanderung',
    lat: 49.9786,
    lng: 7.9257,
    participants: 248,
    challenges: [
      { id: 'e1c1', task: 'Mach ein Foto mit 3 neuen Leuten', reward: 'Freigetränk' },
      { id: 'e1c2', task: 'Probiere 5 verschiedene Weine', reward: '50 Punkte' },
      { id: 'e1c3', task: 'Erreiche den Aussichtspunkt vor Sonnenuntergang', reward: 'Badge "Gipfelstürmer"' },
    ],
  },
  {
    id: 'e2',
    name: 'Sommerklang Open Air',
    description:
      'Drei Bühnen, zehn Bands und Foodtrucks im Grünen — das große Sommer-Festival mitten im Mainzer Stadtpark.',
    image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=400&h=200&fit=crop',
    location: 'Stadtpark, Mainz',
    date: 'Fr, 20. Juni · 18:00',
    dateTime: '2026-06-20T18:00',
    category: 'Festival',
    lat: 50.0700,
    lng: 8.2450,
    participants: 1320,
    challenges: [
      { id: 'e2c1', task: 'Entdecke einen neuen Act auf der kleinen Bühne', reward: '30 Punkte' },
      { id: 'e2c2', task: 'Teile deinen Lieblingssong des Abends', reward: 'Freigetränk' },
    ],
  },
  {
    id: 'e3',
    name: 'Sunrise Trail Run',
    description:
      'Acht Kilometer durch den Niederwald, vorbei am Niederwalddenkmal, mit Start kurz vor Sonnenaufgang und gemeinsamem Frühstück im Ziel.',
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400&h=200&fit=crop',
    location: 'Niederwald, Assmannshausen',
    date: 'So, 7. Juni · 06:30',
    dateTime: '2026-06-07T06:30',
    category: 'Sport',
    lat: 49.9870,
    lng: 7.8480,
    participants: 86,
    challenges: [
      { id: 'e3c1', task: 'Lauf die 8 km unter 55 Minuten', reward: 'Badge "Early Bird"' },
      { id: 'e3c2', task: 'Bring eine:n Freund:in mit', reward: '40 Punkte' },
    ],
  },
  {
    id: 'e4',
    name: 'Rooftop Neon Night',
    description:
      'Neonfarben, Skyline-Blick und DJ-Sets bis spät in die Nacht — die Sky Lounge verwandelt sich in Wiesbadens hellste Dachterrasse.',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=200&fit=crop',
    location: 'Sky Lounge, Wiesbaden',
    date: 'Sa, 28. Juni · 22:00',
    dateTime: '2026-06-28T22:00',
    category: 'Party',
    lat: 50.0826,
    lng: 8.2400,
    participants: 412,
    challenges: [
      { id: 'e4c1', task: 'Trage etwas Neonfarbenes', reward: 'Welcome-Shot' },
      { id: 'e4c2', task: 'Gewinne eine Runde am Tischkicker', reward: 'Freigetränk' },
    ],
  },
  {
    id: 'e5',
    name: 'Spätburgunder Genusstour',
    description:
      'Kleine Tour durch die Steillagen des Ahrtals mit Verkostung bei drei Winzer:innen und einem gemütlichen Ausklang im Weingarten.',
    image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400&h=200&fit=crop',
    location: 'Ahrtal, Dernau',
    date: 'So, 6. Juli · 11:00',
    dateTime: '2026-07-06T11:00',
    category: 'Weinwanderung',
    lat: 50.5340,
    lng: 6.9690,
    participants: 134,
    challenges: [
      { id: 'e5c1', task: 'Notiere deine 3 Lieblingsweine', reward: '25 Punkte' },
    ],
  },
  {
    id: 'e6',
    name: 'Beachvolleyball Cup',
    description:
      'Spontane Teams, lockeres Turnier und Cocktails am Sandplatz direkt am Rheinufer — Anmeldung vor Ort möglich.',
    image: 'https://images.unsplash.com/photo-1483721310020-03333e577078?w=400&h=200&fit=crop',
    location: 'Rheinstrand, Mainz',
    date: 'Sa, 12. Juli · 14:00',
    dateTime: '2026-07-12T14:00',
    category: 'Sport',
    lat: 49.9870,
    lng: 8.2380,
    participants: 64,
    challenges: [
      { id: 'e6c1', task: 'Spiele in 2 verschiedenen Teams', reward: 'Badge "Allrounder"' },
    ],
  },
  {
    id: 'e7',
    name: 'Indie Garden Festival',
    description:
      'Indie- und Singer-Songwriter-Acts auf zwei kleinen Bühnen mitten im Schlossgarten, dazu Foodtrucks und Picknick-Wiese.',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=200&fit=crop',
    location: 'Schlossgarten, Darmstadt',
    date: 'Sa, 19. Juli · 15:00',
    dateTime: '2026-07-19T15:00',
    category: 'Festival',
    lat: 49.8728,
    lng: 8.6512,
    participants: 760,
    challenges: [
      { id: 'e7c1', task: 'Sammle 3 Stempel an den Foodtrucks', reward: 'Gratis Dessert' },
    ],
  },
  {
    id: 'e8',
    name: 'Glow Boat Party',
    description:
      'UV-Licht, Glow-Sticks und Live-DJ auf einem Ausflugsschiff, das bei Sonnenuntergang vom Rheinanleger Bingen ablegt.',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400&h=200&fit=crop',
    location: 'Rheinanleger, Bingen',
    date: 'Fr, 25. Juli · 21:00',
    dateTime: '2026-07-25T21:00',
    category: 'Party',
    lat: 49.9686,
    lng: 7.8954,
    participants: 298,
    challenges: [
      { id: 'e8c1', task: 'Mach ein Gruppenfoto an Deck', reward: 'Freigetränk' },
    ],
  },
];

export const eventsById = events.reduce((acc, e) => {
  acc[e.id] = e;
  return acc;
}, {});

// IDs der Events, denen der User schon beigetreten ist
export const initialJoinedEventIds = ['e1', 'e2', 'e3'];

// Bereits erledigte Challenges (organizer + bei beigetretenen Events)
export const initialCompletedChallengeIds = ['e1c2', 'e2c1', 'ff2'];

// --- Freunde (einladbar beim Event erstellen) ------------------------------

export const friends = [
  { id: 'fr1', name: 'Robert', avatar: '🧑' },
  { id: 'fr2', name: 'Philipp', avatar: '👨' },
  { id: 'fr3', name: 'Jonas', avatar: '🧔' },
  { id: 'fr4', name: 'Henrik', avatar: '👱‍♂️' },
  { id: 'fr5', name: 'Lisa', avatar: '👩' },
];

// --- Freundes-Challenges ---------------------------------------------------

export const friendChallenges = [
  {
    id: 'ff1',
    from: 'Max',
    fromAvatar: '🧑‍🦱',
    task: 'Trau dich auf die Tanzfläche bei der Rooftop Neon Night',
    eventName: 'Rooftop Neon Night',
    eventId: 'e4',
    reward: 'Stolz & 20 Punkte',
    icon: '🕺',
    status: 'pending',
  },
  {
    id: 'ff2',
    from: 'Sophie',
    fromAvatar: '👩‍🦰',
    task: 'Probier den Riesling vom Weingut am Hang',
    eventName: 'Riesling Sunset Wanderung',
    eventId: 'e1',
    reward: '15 Punkte',
    icon: '🍷',
    status: 'accepted',
  },
  {
    id: 'ff3',
    from: 'Jonas',
    fromAvatar: '🧔',
    task: 'Lauf den Sunrise Trail mit mir um die Wette',
    eventName: 'Sunrise Trail Run',
    eventId: 'e3',
    reward: 'Badge "Duell-Sieger"',
    icon: '🏅',
    status: 'pending',
  },
];
