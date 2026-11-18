import { useEffect, useRef } from "react";
import Icon from "./Icon.jsx";

// Right-hand slide-over panel. Handles Escape, backdrop click, scroll lock,
// focus trapping and returning focus to the button that opened it.
export default function Drawer({ title, subtitle, onClose, children, footer }) {
  const panelRef = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    const opener = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    function onKeyDown(event) {
      if (event.key === "Escape") {
        closeRef.current();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      if (opener instanceof HTMLElement) opener.focus();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={title}>
      <button
        type="button"
        tabIndex={-1}
        aria-label={`Close ${title}`}
        onClick={onClose}
        className="absolute inset-0 bg-ink/55"
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-card outline-none"
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-4 sm:px-6">
          <div className="flex items-baseline gap-3">
            <h2 className="font-display text-xl font-extrabold tracking-tight">{title}</h2>
            {subtitle && <span className="font-mono text-xs text-muted">{subtitle}</span>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={`Close ${title}`}
            className="-mr-2 grid size-11 place-items-center hover:text-accent-dark"
          >
            <Icon name="close" className="size-6" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 sm:px-6">{children}</div>
        {footer && <div className="shrink-0 border-t border-line bg-paper px-4 py-4 sm:px-6">{footer}</div>}
      </div>
    </div>
  );
}
