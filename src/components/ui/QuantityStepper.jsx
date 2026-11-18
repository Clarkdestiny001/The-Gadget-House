import Icon from "./Icon.jsx";
import { cn } from "../../lib/format.js";

// Minus / quantity / plus control used on product cards and in the cart.
export default function QuantityStepper({
  quantity,
  label,
  onDecrement,
  onIncrement,
  canDecrement = true,
  canIncrement = true,
  suffix = "",
  className,
}) {
  const button =
    "grid w-11 place-items-center transition-colors hover:bg-ink hover:text-white disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-ink";

  return (
    <div
      role="group"
      aria-label={`${label} quantity`}
      className={cn("inline-flex h-10 items-stretch border border-ink bg-card", className)}
    >
      <button
        type="button"
        onClick={onDecrement}
        disabled={!canDecrement}
        className={button}
        aria-label={`Decrease quantity of ${label}`}
      >
        <Icon name="minus" className="size-4" />
      </button>
      <span
        className="grid min-w-10 flex-1 place-items-center px-2 font-mono text-sm"
        aria-live="polite"
      >
        {quantity}
        {suffix}
      </span>
      <button
        type="button"
        onClick={onIncrement}
        disabled={!canIncrement}
        className={button}
        aria-label={`Increase quantity of ${label}`}
      >
        <Icon name="plus" className="size-4" />
      </button>
    </div>
  );
}
