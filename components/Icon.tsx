// Inline SVG icon set — small, no dependencies, scales with `currentColor`.
// Picked to match the `icone` slugs allowed in the CMS.

type IconName =
  | 'drop' | 'pipe' | 'flame' | 'toilet' | 'shower' | 'sink'
  | 'bolt' | 'clock' | 'shield' | 'award'
  | 'phone' | 'arrow-right' | 'check' | 'star' | 'map-pin' | 'mail'
  | 'menu' | 'close' | 'whatsapp';

type Props = { name?: IconName | string; className?: string; 'aria-hidden'?: boolean };

const paths: Record<string, React.ReactNode> = {
  drop: <path d="M12 2.5c4 5 7 9 7 12a7 7 0 11-14 0c0-3 3-7 7-12z" />,
  pipe: (
    <>
      <path d="M3 9h7a3 3 0 003-3V3" />
      <path d="M21 15h-7a3 3 0 00-3 3v3" />
      <rect x="3" y="11" width="6" height="6" rx="1" />
      <rect x="15" y="7" width="6" height="6" rx="1" />
    </>
  ),
  flame: (
    <path d="M12 2c1 4-3 5-3 9a3 3 0 006 0c0-2-1-3-1-4 3 2 5 5 5 9a7 7 0 11-14 0c0-5 4-9 7-14z" />
  ),
  toilet: (
    <>
      <path d="M6 3h12v6H6z" />
      <path d="M5 9h14l-1 7a4 4 0 01-4 4h-4a4 4 0 01-4-4l-1-7z" />
    </>
  ),
  shower: (
    <>
      <path d="M12 2v6" />
      <circle cx="12" cy="11" r="3" />
      <path d="M9 16l-1 5M12 16l-1 5M15 16l-1 5" />
    </>
  ),
  sink: (
    <>
      <path d="M3 13h18v3a4 4 0 01-4 4H7a4 4 0 01-4-4v-3z" />
      <path d="M12 3v10" />
      <circle cx="12" cy="6" r="1.5" />
    </>
  ),
  bolt: <path d="M13 2L4 14h7l-2 8 9-12h-7l2-8z" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l8 3v6c0 5-3 8-8 9-5-1-8-4-8-9V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="9" r="6" />
      <path d="M8 14l-2 7 6-3 6 3-2-7" />
    </>
  ),
  phone: (
    <path d="M5 4h3l2 5-3 2a12 12 0 006 6l2-3 5 2v3a2 2 0 01-2 2A18 18 0 013 6a2 2 0 012-2z" />
  ),
  'arrow-right': (
    <>
      <path d="M4 12h16" />
      <path d="M14 6l6 6-6 6" />
    </>
  ),
  check: <path d="M5 12l4 4 10-10" />,
  star: <path d="M12 2l3 7 7 .6-5.3 4.7L18 22l-6-3.5L6 22l1.3-7.7L2 9.6 9 9z" />,
  'map-pin': (
    <>
      <path d="M12 22s7-7 7-12a7 7 0 10-14 0c0 5 7 12 7 12z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  whatsapp: (
    <>
      <path d="M3 21l1.7-4.6A8 8 0 1112 20a8 8 0 01-4.4-1.3L3 21z" />
      <path d="M9 9c0 4 2 6 6 6l1.5-1.5-2-1-1 .8c-1-.4-1.9-1.3-2.3-2.3l.8-1-1-2L9 9z" />
    </>
  ),
};

export function Icon({ name = 'drop', className = 'h-5 w-5', ...rest }: Props) {
  const d = paths[name as string] ?? paths.drop;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...rest}
    >
      {d}
    </svg>
  );
}
