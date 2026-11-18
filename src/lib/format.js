import { site } from "../config/site.js";

const formatter = new Intl.NumberFormat(site.locale, {
  style: "currency",
  currency: site.currency,
  maximumFractionDigits: 0,
});

export function formatPrice(amount) {
  return formatter.format(amount);
}

export function plural(count, one, many) {
  return `${count} ${count === 1 ? one : many}`;
}

// Tiny class-name joiner so components can accept an optional className.
export function cn(...parts) {
  return parts.filter(Boolean).join(" ");
}
