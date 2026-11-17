import { useState } from "react";
import { Search } from "lucide-react";
import { cn } from "../../lib/format.js";

// UI only in Stage 1. onSearch will be wired to real search in a later stage.
export default function SearchBar({ className, onSearch }) {
  const [query, setQuery] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onSearch?.(query.trim());
  }

  return (
    <form role="search" onSubmit={handleSubmit} className={cn("flex h-11 w-full", className)}>
      <label htmlFor="site-search" className="sr-only">
        Search products
      </label>
      <input
        id="site-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search phones, laptops, headphones"
        className="min-w-0 flex-1 border border-r-0 border-ink bg-card px-3 text-base placeholder:text-muted focus-visible:outline-offset-0"
      />
      <button
        type="submit"
        aria-label="Search"
        className="grid w-12 place-items-center bg-ink text-paper transition-colors hover:bg-signal hover:text-ink"
      >
        <Search className="size-5" aria-hidden="true" />
      </button>
    </form>
  );
}
