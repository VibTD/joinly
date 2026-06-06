# Joinly

Social-Media-App für lokale Events mit Challenges. Entdecke Events in deiner
Nähe, tritt bei, sammle Challenges von Veranstaltern und Freunden – und Punkte.

Gebaut mit **React 19 + Vite**. Alle Daten sind Dummy-Daten (kein Backend).

## Starten

```bash
npm install
npm run dev      # Dev-Server (HMR)
npm run build    # Production-Build nach dist/
npm run preview  # Build lokal ansehen
npm run lint     # ESLint
```

## Seiten (Bottom Navigation)

- **Home** – Begrüßung + Feed aktiver Events als Karten mit „Dabei sein“.
- **Entdecken** – Suche + Kategorie-Filter (Chips), Events als Grid.
- **Events** – Beigetretene Events mit aktiven Challenges & Fortschrittsleiste.
- **Challenges** – Tabs „Von Veranstaltern“ und „Von Freunden“ (Annehmen/Ablehnen).
- **Profil** – Avatar, Bio, Stats und letzte Events.

## Struktur

```
src/
  components/   BottomNav, EventCard, CategoryBadge, ProgressBar,
                ImagePlaceholder, Icons
  pages/        Home, Discover, MyEvents, Challenges, Profile
  context/      AppContext (State), useApp (Hook)
  data/         dummyData.js
  index.css     Globales Theme (Airbnb-inspiriert)
  App.jsx       App-Shell + Navigation
```

## Design

Coral `#FF385C` als Akzent, viel Weißraum, Inter-Font, Karten mit
`border-radius: 12px` und weichen Schatten – clean und photography-driven.
Kategorie-Bilder werden als abgerundete Platzhalter mit Emoji dargestellt
(🍷 Weinwanderung · 🎵 Festival · 🏃 Sport · 🎉 Party).
