import { cn } from "../../lib/format.js";

const variants = {
  primary: "bg-ink text-white hover:bg-accent",
  accent: "bg-accent text-white hover:bg-accent-dark",
  outline: "border border-ink text-ink hover:bg-ink hover:text-white",
};

const sizes = {
  sm: "h-10 px-3 text-sm",
  md: "h-12 px-5 text-sm sm:text-base",
};

// Renders an <a> when href is given, otherwise a <button>.
export default function Button({
  variant = "primary",
  size = "md",
  href,
  className,
  children,
  ...props
}) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 font-semibold transition-colors",
    variants[variant],
    sizes[size],
    className,
  );

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
