import { useEffect, useId, useState } from "react";
import Icon from "../ui/Icon.jsx";
import { cn } from "../../lib/format.js";
import { navigate } from "../../lib/router.js";

// Searching goes to the shop page with ?q=. Works with the button and Enter.
// An empty search shows all products.
export default function SearchBar({ route, className, onSearched }) {
  const inputId = useId();
  const currentQuery = route.path === "/shop" ? (route.params.get("q") ?? "") : "";
  const [value, setValue] = useState(currentQuery);

  // Keep the box in step with the URL (back button, category clicks).
  useEffect(() => {
    setValue(currentQuery);
  }, [currentQuery]);

  function handleSubmit(event) {
    event.preventDefault();
    const q = value.trim();
    navigate(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
    event.currentTarget.querySelector("input")?.blur();
    onSearched?.();
  }

  return (
    <form role="search" onSubmit={handleSubmit} className={cn("flex h-11 w-full", className)}>
      <label htmlFor={inputId} className="sr-only">
        Search products
      </label>
      <input
        id={inputId}
        type="search"
        name="q"
        enterKeyHint="search"
        autoComplete="off"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search phones, laptops, headphones"
        className="min-w-0 flex-1 border border-r-0 border-ink bg-card px-3 text-base placeholder:text-muted focus-visible:outline-offset-0"
      />
      <button
        type="submit"
        aria-label="Search"
        className="grid w-12 place-items-center bg-ink text-white transition-colors hover:bg-accent"
      >
        <Icon name="search" className="size-5" />
      </button>
    </form>
  );
}
