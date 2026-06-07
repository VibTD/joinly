import { useApp } from '../context/useApp.js';

// Zentrierter Bestätigungsdialog vor dem Austreten — verhindert versehentliches
// Verlassen über "Verlassen" / "Dabei entfernen" (Karte, Detailseite, Meine Events).
export default function LeaveEventDialog() {
  const { leaveEvent, cancelLeave, confirmLeave } = useApp();
  if (!leaveEvent) return null;

  return (
    <div className="confirm-backdrop" onClick={cancelLeave}>
      <div
        className="confirm-card"
        role="alertdialog"
        aria-modal="true"
        aria-label="Event verlassen bestätigen"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="confirm-card__text">
          Möchtest du wirklich aus <strong>{leaveEvent.name}</strong> austreten?
        </p>
        <div className="confirm-card__actions">
          <button type="button" className="btn btn--ghost" onClick={cancelLeave}>
            Abbrechen
          </button>
          <button type="button" className="btn btn--primary" onClick={confirmLeave}>
            Austreten
          </button>
        </div>
      </div>
    </div>
  );
}
