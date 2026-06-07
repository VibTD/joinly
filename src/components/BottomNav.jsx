import {
  HomeIcon,
  SearchIcon,
  MapIcon,
  CalendarIcon,
  TrophyIcon,
  UserIcon,
} from './Icons.jsx';

const NAV_ITEMS = [
  { key: 'home', label: 'Home', Icon: HomeIcon },
  { key: 'discover', label: 'Entdecken', Icon: SearchIcon },
  { key: 'map', label: 'Karte', Icon: MapIcon },
  { key: 'events', label: 'Meine Events', Icon: CalendarIcon },
  { key: 'challenges', label: 'Challenges', Icon: TrophyIcon },
  { key: 'profile', label: 'Profil', Icon: UserIcon },
];

export default function BottomNav({ active, onNavigate, badges = {} }) {
  return (
    <nav className="bottom-nav" aria-label="Hauptnavigation">
      {NAV_ITEMS.map(({ key, label, Icon }) => {
        const isActive = active === key;
        const badge = badges[key];
        return (
          <button
            key={key}
            type="button"
            className={`nav-item${isActive ? ' nav-item--active' : ''}`}
            onClick={() => onNavigate(key)}
            aria-current={isActive ? 'page' : undefined}
          >
            <span className="nav-item__icon">
              <Icon />
              {badge > 0 && <span className="nav-item__badge">{badge}</span>}
            </span>
            <span className="nav-item__label">{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
