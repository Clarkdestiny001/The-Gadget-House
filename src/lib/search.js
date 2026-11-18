import { categories } from "../data/categories.js";

const categoryNames = Object.fromEntries(categories.map((c) => [c.slug, c.name]));

function haystackFor(product) {
  return [
    product.name,
    product.brand,
    categoryNames[product.category],
    ...product.specs,
    ...(product.keywords ?? []),
  ]
    .join(" ")
    .toLowerCase();
}

// Every word typed must match somewhere (AND). A trailing "s"/"es" is
// tolerated, so "watches" finds "watch" and "laptops" finds "laptop".
function tokenMatches(haystack, token) {
  if (haystack.includes(token)) return true;
  if (token.endsWith("es") && haystack.includes(token.slice(0, -2))) return true;
  if (token.endsWith("s") && haystack.includes(token.slice(0, -1))) return true;
  return false;
}

export function matchesQuery(product, query) {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return true;
  const haystack = haystackFor(product);
  return tokens.every((token) => tokenMatches(haystack, token));
}

export function filterProducts(list, { q = "", category = "", deal = false } = {}) {
  return list.filter(
    (p) =>
      matchesQuery(p, q) &&
      (!category || p.category === category) &&
      (!deal || p.compareAt),
  );
}

export const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
];

export function sortProducts(list, sort) {
  const copy = [...list];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "rating":
      return copy.sort((a, b) => b.rating - a.rating);
    default:
      return copy;
  }
}
