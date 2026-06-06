// Schmale Fortschrittsleiste. value/max -> Breite in %.
export default function ProgressBar({ value, max }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div
      className="progress"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      <div className="progress__fill" style={{ width: `${pct}%` }} />
    </div>
  );
}
