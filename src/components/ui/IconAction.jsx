import { cn } from "../../lib/format.js";

// Icon button used in the header (account, wishlist, cart).
export default function IconAction({ icon: Icon, label, count, showLabel = false, onClick, href }) {
  const content = (
    <>
      <span className="relative">
        <Icon className="size-6" strokeWidth={1.75} aria-hidden="true" />
        {typeof count === "number" && (
          <span
            className="absolute -right-2 -top-2 grid min-w-[1.125rem] place-items-center bg-signal px-1 font-mono text-[10px] font-medium leading-[1.125rem] text-ink"
            aria-hidden="true"
          >
            {count}
          </span>
        )}
      </span>
      {showLabel && <span className="hidden text-sm font-medium lg:inline">{label}</span>}
    </>
  );

  const classes = cn(
    "inline-flex h-11 items-center gap-2 px-2.5 text-ink transition-colors hover:text-signal-dark",
  );
  const aria = {
    "aria-label": typeof count === "number" ? `${label}, ${count} items` : label,
  };

  if (href) {
    return (
      <a href={href} className={classes} {...aria}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={classes} {...aria}>
      {content}
    </button>
  );
}
