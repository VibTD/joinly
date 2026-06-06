import { CATEGORY_EMOJI } from '../data/dummyData.js';

// Abgerundeter Platzhalter mit Kategorie-Emoji in der Mitte.
// variant: 'rounded' (alle Ecken) | 'top' (nur obere Ecken)
export default function ImagePlaceholder({
  category,
  emoji,
  height = 180,
  variant = 'rounded',
  emojiSize,
  style,
}) {
  const symbol = emoji ?? CATEGORY_EMOJI[category] ?? '📍';
  return (
    <div
      className={`placeholder placeholder--${variant}`}
      style={{ height, ...style }}
      aria-hidden="true"
    >
      <span
        className="placeholder__emoji"
        style={emojiSize ? { fontSize: emojiSize } : undefined}
      >
        {symbol}
      </span>
    </div>
  );
}
