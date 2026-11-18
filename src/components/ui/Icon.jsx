// Custom icon set, drawn on a 24px grid with square caps and mitred joins so
// the icons match the store's square-edged buttons and cards.
// Usage: <Icon name="bag" className="size-6" />

const glyphs = {
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5 21 21" />
    </>
  ),
  heart: <path d="M12 20.5 3.8 12.3a5 5 0 0 1 7.1-7.1l1.1 1.1 1.1-1.1a5 5 0 0 1 7.1 7.1z" />,
  bag: (
    <>
      <path d="M4.5 8h15l-1 12.5h-13z" />
      <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h10" />,
  close: <path d="M5 5l14 14M19 5 5 19" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  trash: <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v5M14 11v5" />,
  "arrow-right": <path d="M4 12h16M14 6l6 6-6 6" />,
  "arrow-up": <path d="M12 20V4M6 10l6-6 6 6" />,
  check: <path d="M4 12.5l5 5L20 7" />,
  star: <path d="m12 3 2.8 6 6.2.7-4.6 4.3 1.3 6.5L12 17.2 6.3 20.5l1.4-6.5L3 9.7 9.2 9z" />,
  truck: (
    <>
      <path d="M2.5 6h11.5v10H2.5zM14 10h4l3 3v3h-7" />
      <circle cx="7" cy="18" r="1.8" />
      <circle cx="17" cy="18" r="1.8" />
    </>
  ),
  return: <path d="M8 4 4 8l4 4M4 8h10a5 5 0 0 1 0 10H8" />,
  shield: (
    <>
      <path d="M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6z" />
      <path d="M8.5 12l2.5 2.5 5-5" />
    </>
  ),
  headset: (
    <>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <path d="M4 14h3.5v5H4zM16.5 14H20v5h-3.5z" />
      <path d="M20 19c0 1.6-1.6 2-4 2h-2" />
    </>
  ),
  phone: (
    <>
      <path d="M7 2.5h10v19H7z" />
      <path d="M10.5 18.5h3" />
    </>
  ),
  laptop: <path d="M5 6h14v10H5zM2 19h20" />,
  headphones: (
    <>
      <path d="M4 15v-3a8 8 0 0 1 16 0v3" />
      <path d="M4 14h4v6H4zM16 14h4v6h-4z" />
    </>
  ),
  watch: (
    <>
      <path d="M8.5 2.5h7L17 7H7zM8.5 21.5h7L17 17H7z" />
      <path d="M6.5 7h11v10h-11z" />
      <path d="M12 10v2.5l1.8 1.2" />
    </>
  ),
  camera: (
    <>
      <path d="M3 8h4l2-3h6l2 3h4v12H3z" />
      <circle cx="12" cy="13.5" r="3.5" />
    </>
  ),
  gamepad: (
    <>
      <path d="M7 8h10a4 4 0 0 1 4 4v3a2.5 2.5 0 0 1-4.5 1.5L15 14.5H9L7.5 16.5A2.5 2.5 0 0 1 3 15v-3a4 4 0 0 1 4-4z" />
      <path d="M8 10.5v3M6.5 12h3" />
      <path d="M16 11h.01M18 13h.01" />
    </>
  ),
  bulb: (
    <>
      <path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z" />
      <path d="M9.5 18.5h5M10.5 21h3" />
    </>
  ),
  keyboard: (
    <>
      <path d="M2.5 6.5h19v11h-19z" />
      <path d="M6 10h.01M9.5 10h.01M13 10h.01M16.5 10h.01M7 14h10" />
    </>
  ),
};

export default function Icon({ name, className = "size-5", filled = false, strokeWidth = 1.5 }) {
  const isSolid = filled || name === "star";
  return (
    <svg
      viewBox="0 0 24 24"
      fill={isSolid ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="square"
      strokeLinejoin="miter"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {glyphs[name]}
    </svg>
  );
}
