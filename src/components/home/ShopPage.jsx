import { useMemo } from "react";
import Container from "../components/layout/Container.jsx";
import ProductCard from "../components/product/ProductCard.jsx";
import Button from "../components/ui/Button.jsx";
import Icon from "../components/ui/Icon.jsx";
import { categories } from "../data/categories.js";
import { products } from "../data/products.js";
import { filterProducts, sortOptions, sortProducts } from "../lib/search.js";
import { navigate, shopHref } from "../lib/router.js";
import { plural } from "../lib/format.js";

// Product listing driven by the URL: #/shop?q=...&category=...&deal=1&sort=...
export default function ShopPage({ route }) {
  const q = (route.params.get("q") ?? "").trim();
  const requestedCategory = route.params.get("category") ?? "";
  const activeCategory = categories.find((c) => c.slug === requestedCategory);
  const category = activeCategory?.slug ?? "";
  const deal = route.params.get("deal") === "1";
  const sort = sortOptions.some((o) => o.value === route.params.get("sort"))
    ? route.params.get("sort")
    : "featured";

  const results = useMemo(
    () => sortProducts(filterProducts(products, { q, category, deal }), sort),
    [q, category, deal, sort],
  );

  // Per-category counts for the current search and deal filter.
  const counts = useMemo(() => {
    const matching = filterProducts(products, { q, deal });
    return Object.fromEntries(
      categories.map((c) => [c.slug, matching.filter((p) => p.category === c.slug).length]),
    );
  }, [q, deal]);
  const allCount = Object.values(counts).reduce((sum, n) => sum + n, 0);

  const link = (overrides) =>
    shopHref({ q, category, deal: deal ? "1" : "", sort: sort === "featured" ? "" : sort, ...overrides });

  const hasFilters = Boolean(q || category || deal);
  const heading = q
    ? `Results for “${q}”`
    : activeCategory
      ? activeCategory.name
      : deal
        ? "Deals"
        : "All products";

  const chip = (active) =>
    `inline-flex h-10 shrink-0 items-center gap-2 border px-3 text-sm font-medium transition-colors ${
      active
        ? "border-ink bg-ink text-white"
        : "border-line bg-card text-ink hover:border-ink"
    }`;

  return (
    <Container className="py-8 sm:py-12">
      <div className="border-b border-ink pb-4">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
          <a href="#/" className="hover:text-ink">
            Home
          </a>{" "}
          / Shop
        </p>
        <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          {heading}
        </h1>
        <p className="mt-1 text-sm text-muted" data-testid="result-count" aria-live="polite">
          {plural(results.length, "product", "products")}
          {activeCategory && q ? ` in ${activeCategory.name}` : ""}
          {deal && (q || activeCategory) ? ", deals only" : ""}
        </p>
      </div>

      <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <nav
          aria-label="Filter by category"
          className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0 lg:min-w-0 lg:flex-1"
        >
          <ul className="flex gap-2 sm:flex-wrap">
            <li>
              <a
                href={link({ category: "" })}
                aria-current={!category ? "true" : undefined}
                className={chip(!category)}
              >
                All
                <span className="font-mono text-xs opacity-70">{allCount}</span>
              </a>
            </li>
            {categories
              .filter((c) => counts[c.slug] > 0 || c.slug === category)
              .map((c) => (
                <li key={c.slug}>
                  <a
                    href={link({ category: c.slug })}
                    aria-current={category === c.slug ? "true" : undefined}
                    className={chip(category === c.slug)}
                  >
                    <Icon name={c.icon} className="size-4" />
                    {c.name}
                    <span className="font-mono text-xs opacity-70">{counts[c.slug]}</span>
                  </a>
                </li>
              ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3 lg:shrink-0">
          <a
            href={link({ deal: deal ? "" : "1" })}
            aria-pressed={deal}
            role="button"
            className={chip(deal)}
          >
            Deals only
          </a>
          <label className="flex items-center gap-2 text-sm">
            <span className="text-muted">Sort</span>
            <select
              value={sort}
              onChange={(e) =>
                navigate(link({ sort: e.target.value === "featured" ? "" : e.target.value }).slice(1))
              }
              className="h-10 border border-ink bg-card px-2 text-sm"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {results.length > 0 ? (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4" data-testid="results-grid">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-10 flex flex-col items-center border border-line bg-card px-6 py-16 text-center">
          <Icon name="search" className="size-12 text-muted" strokeWidth={1} />
          <p className="mt-4 font-display text-xl font-bold">No products found</p>
          <p className="mt-1 max-w-sm text-sm text-muted">
            {q
              ? `Nothing matches “${q}” with these filters. Try a shorter word like “phone” or “watch”.`
              : "Nothing matches these filters."}
          </p>
          {hasFilters && (
            <Button href={shopHref()} className="mt-6">
              Clear all filters
            </Button>
          )}
        </div>
      )}
    </Container>
  );
}
