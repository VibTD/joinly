import { useState } from 'react';
import { useApp } from '../context/useApp.js';
import { CloseIcon } from './Icons.jsx';

export default function EditProfileModal({ onClose }) {
  const { profile, updateProfile } = useApp();
  const [form, setForm] = useState({
    firstName: profile.firstName,
    lastName: profile.lastName,
    username: profile.username,
    bio: profile.bio,
  });
  const [closing, setClosing] = useState(false);

  const set = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));

  const close = () => {
    setClosing(true);
    setTimeout(onClose, 280);
  };

  const handleSave = () => {
    updateProfile({
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      username: form.username.trim(),
      bio: form.bio.trim(),
    });
    close();
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
        aria-label="Profil bearbeiten"
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
          <span className="create-header__title">Profil bearbeiten</span>
        </header>

        <div className="create-body">
          <div className="field-row">
            <div className="field">
              <label className="field__label" htmlFor="pf-first">
                Vorname
              </label>
              <input
                id="pf-first"
                className="input"
                value={form.firstName}
                onChange={(e) => set('firstName', e.target.value)}
              />
            </div>
            <div className="field">
              <label className="field__label" htmlFor="pf-last">
                Nachname
              </label>
              <input
                id="pf-last"
                className="input"
                value={form.lastName}
                onChange={(e) => set('lastName', e.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <label className="field__label" htmlFor="pf-username">
              Benutzername
            </label>
            <input
              id="pf-username"
              className="input"
              placeholder="z. B. lena.j"
              value={form.username}
              onChange={(e) => set('username', e.target.value)}
            />
          </div>

          <div className="field">
            <label className="field__label" htmlFor="pf-bio">
              Bio
            </label>
            <textarea
              id="pf-bio"
              className="textarea"
              rows={3}
              placeholder="Erzähl etwas über dich"
              value={form.bio}
              onChange={(e) => set('bio', e.target.value)}
            />
          </div>
        </div>

        <footer className="create-footer">
          <button
            type="button"
            className="btn btn--primary btn--block"
            onClick={handleSave}
          >
            Speichern
          </button>
        </footer>
      </div>
    </>
  );
}
