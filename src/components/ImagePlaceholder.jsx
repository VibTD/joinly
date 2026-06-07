import { CATEGORY_EMOJI } from '../data/dummyData.js';

// Bild-Box für Events: zeigt ein echtes Foto (sofern `image` gesetzt ist),
// sonst einen abgerundeten Platzhalter mit Kategorie-Emoji.
// variant: 'rounded' (alle Ecken) | 'top' (nur obere Ecken)
export default function ImagePlaceholder({
  category,
  emoji,
  image,
  height = 180,
  variant = 'rounded',
  emojiSize,
  style,
}) {
  if (image) {
    return (
      <div
        className={`placeholder placeholder--${variant} placeholder--photo`}
        style={{ height, ...style }}
      >
        <img className="placeholder__img" src={image} alt="" loading="lazy" />
      </div>
    );
  }

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
