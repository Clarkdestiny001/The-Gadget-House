import Icon from "./Icon.jsx";

// Numbered section header, e.g. "02 / Featured". Optional link on the right.
export default function SectionHeading({ index, eyebrow, title, linkLabel, linkHref }) {
  return (
    <div className="flex items-end justify-between gap-4 border-b border-ink pb-4">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
          {index} / {eyebrow}
        </p>
        <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          {title}
        </h2>
      </div>
      {linkLabel && linkHref && (
        <a
          href={linkHref}
          className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold hover:text-accent-dark sm:inline-flex"
        >
          {linkLabel}
          <Icon name="arrow-right" className="size-4" />
        </a>
      )}
    </div>
  );
}
