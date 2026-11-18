import Icon from "./Icon.jsx";

// Header icon button (wishlist, cart). The badge only shows when count > 0.
export default function IconAction({ icon, label, count = 0, onClick, expanded }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={count > 0 ? `${label}, ${count} ${count === 1 ? "item" : "items"}` : label}
      aria-haspopup="dialog"
      aria-expanded={expanded}
      className="inline-flex h-11 items-center gap-2 px-2.5 text-ink transition-colors hover:text-accent-dark"
    >
      <span className="relative">
        <Icon name={icon} className="size-6" />
        {count > 0 && (
          <span
            data-testid={`${icon}-count`}
            className="absolute -right-2.5 -top-2 grid min-w-[1.125rem] place-items-center bg-accent px-1 font-mono text-[10px] font-medium leading-[1.125rem] text-white"
            aria-hidden="true"
          >
            {count}
          </span>
        )}
      </span>
      <span className="hidden text-sm font-medium lg:inline">{label}</span>
    </button>
  );
}
