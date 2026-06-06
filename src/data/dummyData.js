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

export const user = {
  name: 'Lena',
  handle: '@lena.j',
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
    location: 'Rheingau, Rüdesheim',
    date: 'Sa, 14. Juni · 16:00',
    category: 'Weinwanderung',
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
    location: 'Stadtpark, Mainz',
    date: 'Fr, 20. Juni · 18:00',
    category: 'Festival',
    participants: 1320,
    challenges: [
      { id: 'e2c1', task: 'Entdecke einen neuen Act auf der kleinen Bühne', reward: '30 Punkte' },
      { id: 'e2c2', task: 'Teile deinen Lieblingssong des Abends', reward: 'Freigetränk' },
    ],
  },
  {
    id: 'e3',
    name: 'Sunrise Trail Run',
    location: 'Niederwald, Assmannshausen',
    date: 'So, 22. Juni · 06:30',
    category: 'Sport',
    participants: 86,
    challenges: [
      { id: 'e3c1', task: 'Lauf die 8 km unter 55 Minuten', reward: 'Badge "Early Bird"' },
      { id: 'e3c2', task: 'Bring eine:n Freund:in mit', reward: '40 Punkte' },
    ],
  },
  {
    id: 'e4',
    name: 'Rooftop Neon Night',
    location: 'Sky Lounge, Wiesbaden',
    date: 'Sa, 28. Juni · 22:00',
    category: 'Party',
    participants: 412,
    challenges: [
      { id: 'e4c1', task: 'Trage etwas Neonfarbenes', reward: 'Welcome-Shot' },
      { id: 'e4c2', task: 'Gewinne eine Runde am Tischkicker', reward: 'Freigetränk' },
    ],
  },
  {
    id: 'e5',
    name: 'Spätburgunder Genusstour',
    location: 'Ahrtal, Dernau',
    date: 'So, 6. Juli · 11:00',
    category: 'Weinwanderung',
    participants: 134,
    challenges: [
      { id: 'e5c1', task: 'Notiere deine 3 Lieblingsweine', reward: '25 Punkte' },
    ],
  },
  {
    id: 'e6',
    name: 'Beachvolleyball Cup',
    location: 'Rheinstrand, Mainz',
    date: 'Sa, 12. Juli · 14:00',
    category: 'Sport',
    participants: 64,
    challenges: [
      { id: 'e6c1', task: 'Spiele in 2 verschiedenen Teams', reward: 'Badge "Allrounder"' },
    ],
  },
  {
    id: 'e7',
    name: 'Indie Garden Festival',
    location: 'Schlossgarten, Darmstadt',
    date: 'Sa, 19. Juli · 15:00',
    category: 'Festival',
    participants: 760,
    challenges: [
      { id: 'e7c1', task: 'Sammle 3 Stempel an den Foodtrucks', reward: 'Gratis Dessert' },
    ],
  },
  {
    id: 'e8',
    name: 'Glow Boat Party',
    location: 'Rheinanleger, Bingen',
    date: 'Fr, 25. Juli · 21:00',
    category: 'Party',
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
    reward: 'Badge "Duell-Sieger"',
    icon: '🏅',
    status: 'pending',
  },
];
