import { useState } from 'react';
import { useApp } from '../context/useApp.js';
import { CATEGORIES } from '../data/dummyData.js';
import { CloseIcon, CheckIcon, GlobeIcon, LockIcon } from './Icons.jsx';

const EMPTY = {
  name: '',
  description: '',
  location: '',
  date: '',
  time: '',
  category: 'Weinwanderung',
  maxParticipants: '',
  visibility: 'public',
  invitedFriendIds: [],
};

export default function CreateEventModal() {
  const { addEvent, closeCreate, friends } = useApp();
  const [form, setForm] = useState(EMPTY);
  const [touched, setTouched] = useState({});
  const [closing, setClosing] = useState(false);
  const [success, setSuccess] = useState(false);

  const set = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));
  const markTouched = (key) =>
    setTouched((prev) => ({ ...prev, [key]: true }));

  const errors = {
    name: !form.name.trim(),
    location: !form.location.trim(),
    date: !form.date,
  };
  const isValid = !errors.name && !errors.location && !errors.date;

  const close = () => {
    setClosing(true);
    setTimeout(() => closeCreate(), 280);
  };

  const toggleFriend = (id) =>
    setForm((prev) => ({
      ...prev,
      invitedFriendIds: prev.invitedFriendIds.includes(id)
        ? prev.invitedFriendIds.filter((f) => f !== id)
        : [...prev.invitedFriendIds, id],
    }));

  const handleSubmit = () => {
    if (!isValid) {
      setTouched({ name: true, location: true, date: true });
      return;
    }
    addEvent(form);
    setSuccess(true);
    setTimeout(close, 1100);
  };

  return (
    <>
      <div
        className={`create-backdrop${closing ? ' create-backdrop--closing' : ''}`}
        onClick={close}
        aria-hidden="true"
      />
      <div
        className={`create-sheet${closing ? ' create-sheet--closing' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Event erstellen"
      >
        <header className="create-header">
          <button
            type="button"
            className="create-header__close"
            onClick={close}
            aria-label="Schließen"
          >
            <CloseIcon width={18} height={18} />
          </button>
          <span className="create-header__title">Event erstellen</span>
        </header>

        <div className="create-body">
          {/* Event-Name */}
          <div className="field">
            <label className="field__label" htmlFor="ev-name">
              Event-Name <span className="field__req">*</span>
            </label>
            <input
              id="ev-name"
              className={`input${touched.name && errors.name ? ' input--error' : ''}`}
              placeholder="z. B. Riesling Sunset Wanderung"
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              onBlur={() => markTouched('name')}
            />
            {touched.name && errors.name && (
              <span className="field__error">Bitte gib einen Namen ein.</span>
            )}
          </div>

          {/* Beschreibung */}
          <div className="field">
            <label className="field__label" htmlFor="ev-desc">
              Beschreibung
            </label>
            <textarea
              id="ev-desc"
              className="textarea"
              rows={3}
              placeholder="Worum geht's bei deinem Event?"
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
            />
          </div>

          {/* Ort */}
          <div className="field">
            <label className="field__label" htmlFor="ev-loc">
              Ort <span className="field__req">*</span>
            </label>
            <input
              id="ev-loc"
              className={`input${
                touched.location && errors.location ? ' input--error' : ''
              }`}
              placeholder="z. B. Stadtpark, Mainz"
              value={form.location}
              onChange={(e) => set('location', e.target.value)}
              onBlur={() => markTouched('location')}
            />
            {touched.location && errors.location && (
              <span className="field__error">Bitte gib einen Ort ein.</span>
            )}
          </div>

          {/* Datum + Uhrzeit */}
          <div className="field-row">
            <div className="field">
              <label className="field__label" htmlFor="ev-date">
                Datum <span className="field__req">*</span>
              </label>
              <input
                id="ev-date"
                type="date"
                className={`input${
                  touched.date && errors.date ? ' input--error' : ''
                }`}
                value={form.date}
                onChange={(e) => set('date', e.target.value)}
                onBlur={() => markTouched('date')}
              />
              {touched.date && errors.date && (
                <span className="field__error">Bitte wähle ein Datum.</span>
              )}
            </div>
            <div className="field">
              <label className="field__label" htmlFor="ev-time">
                Uhrzeit
              </label>
              <input
                id="ev-time"
                type="time"
                className="input"
                value={form.time}
                onChange={(e) => set('time', e.target.value)}
              />
            </div>
          </div>

          {/* Kategorie */}
          <div className="field">
            <label className="field__label">Kategorie</label>
            <div className="field-chips">
              {CATEGORIES.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  className={`chip${
                    form.category === c.key ? ' chip--active' : ''
                  }`}
                  onClick={() => set('category', c.key)}
                >
                  <span aria-hidden="true">{c.emoji}</span> {c.key}
                </button>
              ))}
            </div>
          </div>

          {/* Max. Teilnehmerzahl */}
          <div className="field">
            <label className="field__label" htmlFor="ev-max">
              Maximale Teilnehmerzahl
            </label>
            <input
              id="ev-max"
              type="number"
              min="1"
              className="input"
              placeholder="z. B. 50"
              value={form.maxParticipants}
              onChange={(e) => set('maxParticipants', e.target.value)}
            />
          </div>

          {/* Sichtbarkeit */}
          <div className="field">
            <label className="field__label">Sichtbarkeit</label>
            <div className="toggle-row">
              <button
                type="button"
                className={`toggle${
                  form.visibility === 'public' ? ' toggle--active' : ''
                }`}
                onClick={() => set('visibility', 'public')}
              >
                <GlobeIcon width={24} height={24} />
                <span className="toggle__title">Öffentlich</span>
                <span className="toggle__desc">
                  Jeder kann das Event sehen und joinen
                </span>
              </button>
              <button
                type="button"
                className={`toggle${
                  form.visibility === 'private' ? ' toggle--active' : ''
                }`}
                onClick={() => set('visibility', 'private')}
              >
                <LockIcon width={24} height={24} />
                <span className="toggle__title">Privat</span>
                <span className="toggle__desc">
                  Nur eingeladene Freunde sehen es
                </span>
              </button>
            </div>
          </div>

          {/* Freunde einladen */}
          <div className="field">
            <label className="field__label">Freunde einladen</label>
            {form.visibility === 'private' && (
              <p className="friend-hint">
                Nur eingeladene Freunde können teilnehmen.
              </p>
            )}
            <div className="friend-list">
              {friends.map((fr) => {
                const selected = form.invitedFriendIds.includes(fr.id);
                return (
                  <button
                    key={fr.id}
                    type="button"
                    className={`friend${selected ? ' friend--selected' : ''}`}
                    onClick={() => toggleFriend(fr.id)}
                    aria-pressed={selected}
                  >
                    <span className="friend__avatar">
                      <span aria-hidden="true">{fr.avatar}</span>
                      {selected && (
                        <span className="friend__check">
                          <CheckIcon width={12} height={12} />
                        </span>
                      )}
                    </span>
                    <span className="friend__name">{fr.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <footer className="create-footer">
          <button
            type="button"
            className="btn btn--primary btn--block"
            disabled={!isValid}
            onClick={handleSubmit}
          >
            Event erstellen
          </button>
        </footer>

        {success && (
          <div className="create-success">
            <div className="create-success__circle">
              <CheckIcon width={44} height={44} strokeWidth={3} />
            </div>
            <p className="create-success__text">Event erstellt!</p>
          </div>
        )}
      </div>
    </>
  );
}
