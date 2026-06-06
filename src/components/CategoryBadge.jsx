import { CATEGORY_EMOJI } from '../data/dummyData.js';

// Kategorie-Badge mit Emoji + Label.
// inline = ruhiger Hintergrund (für Listen), sonst floating über Bildern.
export default function CategoryBadge({ category, inline = false }) {
  const emoji = CATEGORY_EMOJI[category] ?? '📍';
  return (
    <span className={`badge${inline ? ' badge--inline' : ''}`}>
      <span aria-hidden="true">{emoji}</span>
      {category}
    </span>
  );
}
