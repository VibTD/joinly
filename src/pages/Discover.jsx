import { useMemo, useState } from 'react';
import { useApp } from '../context/useApp.js';
import { FILTERS } from '../data/dummyData.js';
import ImagePlaceholder from '../components/ImagePlaceholder.jsx';
import CategoryBadge from '../components/CategoryBadge.jsx';
import HeaderActions from '../components/HeaderActions.jsx';
import { SearchIcon, UsersIcon } from '../components/Icons.jsx';

export default function Discover() {
  const { events } = useApp();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('Alle');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return events.filter((e) => {
      const matchesCategory = filter === 'Alle' || e.category === filter;
      const matchesQuery =
        !q ||
        e.name.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [events, query, filter]);

  return (
    <div className="app-main">
      <header className="page-top discover-top">
        <h1 className="headline">Entdecken</h1>
        <HeaderActions />
      </header>

      <div className="search">
        <span className="search__icon">
          <SearchIcon width={18} height={18} />
        </span>
        <input
          type="search"
          placeholder="Events oder Orte suchen"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Events suchen"
        />
      </div>

      <div className="chip-row">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            className={`chip${filter === f ? ' chip--active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {results.length === 0 ? (
        <div className="empty">
          <div className="empty__emoji">🔍</div>
          <p className="empty__title">Nichts gefunden</p>
          <p className="empty__text">Versuch einen anderen Suchbegriff oder Filter.</p>
        </div>
      ) : (
        <div className="grid">
          {results.map((event) => (
            <article key={event.id} className="grid-card">
              <div className="grid-card__media">
                <ImagePlaceholder
                  category={event.category}
                  height={130}
                  emojiSize={36}
                />
                <div className="grid-card__badge">
                  <CategoryBadge category={event.category} />
                </div>
              </div>
              <h3 className="grid-card__title">{event.name}</h3>
              <p className="grid-card__sub">{event.date}</p>
              <p className="grid-card__sub" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <UsersIcon width={13} height={13} />
                {event.participants.toLocaleString('de-DE')} dabei
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
