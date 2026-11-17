import { ArrowRight } from "lucide-react";

// Numbered section header, e.g. "02 / Featured". Optional link on the right.
export default function SectionHeading({ index, eyebrow, title, linkLabel, linkHref = "#" }) {
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
      {linkLabel && (
        <a
          href={linkHref}
          className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold hover:text-signal-dark sm:inline-flex"
        >
          {linkLabel}
          <ArrowRight className="size-4" aria-hidden="true" />
        </a>
      )}
    </div>
  );
}
