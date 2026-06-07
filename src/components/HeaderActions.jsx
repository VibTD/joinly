import { useApp } from '../context/useApp.js';
import { PlusIcon } from './Icons.jsx';

// Oben rechts auf Home & Discover: runder "+"-Button + klickbarer Avatar.
export default function HeaderActions() {
  const { openCreate, setActivePage, profile } = useApp();
  return (
    <div className="header-actions">
      <button
        type="button"
        className="fab-btn"
        onClick={openCreate}
        aria-label="Event erstellen"
      >
        <PlusIcon width={22} height={22} />
      </button>
      <button
        type="button"
        className="header-avatar"
        onClick={() => setActivePage('profile')}
        aria-label="Zum Profil"
      >
        <span aria-hidden="true">{profile.avatar}</span>
      </button>
    </div>
  );
}
