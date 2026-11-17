// Wordmark: a small square "house" glyph plus a two-line name.
export default function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2.5" aria-label="The Gadget House, home">
      <span className="grid size-9 place-items-center bg-ink" aria-hidden="true">
        <svg viewBox="0 0 24 24" className="size-5" fill="none">
          <path d="M3 11 12 3l9 8v10H3z" stroke="#f5f2ea" strokeWidth="2" strokeLinejoin="round" />
          <rect x="9" y="13" width="6" height="8" fill="#ff4d1c" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">The</span>
        <span className="font-display text-lg font-extrabold tracking-tight sm:text-xl">
          Gadget House
        </span>
      </span>
    </a>
  );
}
