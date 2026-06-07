// Minimal line icons (stroke = currentColor) — Airbnb-style thin strokes.

const base = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export function HomeIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5" />
      <path d="M9.5 21v-6h5v6" />
    </svg>
  );
}

export function SearchIcon(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export function CalendarIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="5" width="17" height="16" rx="2.5" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" />
    </svg>
  );
}

export function TrophyIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M7 4h10v4a5 5 0 0 1-10 0V4Z" />
      <path d="M7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3" />
      <path d="M12 13v4M9 21h6M10 21l.5-4M14 21l-.5-4" />
    </svg>
  );
}

export function UserIcon(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="8.5" r="4" />
      <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
    </svg>
  );
}

export function PinIcon(props) {
  return (
    <svg {...base} width={16} height={16} {...props}>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function UsersIcon(props) {
  return (
    <svg {...base} width={16} height={16} {...props}>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <path d="M16 5.2a3.5 3.5 0 0 1 0 6.6M17.5 19a5.5 5.5 0 0 0-2-4.3" />
    </svg>
  );
}

export function CheckIcon(props) {
  return (
    <svg {...base} width={16} height={16} strokeWidth={2.5} {...props}>
      <path d="m4 12 5 5L20 6" />
    </svg>
  );
}

export function CloseIcon(props) {
  return (
    <svg {...base} width={16} height={16} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function GiftIcon(props) {
  return (
    <svg {...base} width={14} height={14} {...props}>
      <path d="M4 11h16v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8Z" />
      <path d="M3 7h18v4H3zM12 7v13" />
      <path d="M12 7S10.5 3 8.5 4 9 7 12 7ZM12 7s1.5-4 3.5-3-.5 3-3.5 3Z" />
    </svg>
  );
}

export function PlusIcon(props) {
  return (
    <svg {...base} strokeWidth={2.5} {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function GlobeIcon(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18" />
    </svg>
  );
}

export function MapIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M9 4 3.5 6v14L9 18l6 2 5.5-2V4L15 6l-6-2Z" />
      <path d="M9 4v14M15 6v14" />
    </svg>
  );
}

export function LockIcon(props) {
  return (
    <svg {...base} width={16} height={16} {...props}>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}
