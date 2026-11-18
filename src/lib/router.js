import { useEffect, useMemo, useState } from "react";

// Tiny hash router: "#/" is home, "#/shop?category=audio&q=buds" is the shop.
// Hash routing needs no server rewrites, so it works on any static host.
// When real routes arrive (product pages, checkout), swap this for React Router.

function readHash() {
  return window.location.hash.replace(/^#/, "") || "/";
}

export function useHashRoute() {
  const [raw, setRaw] = useState(readHash);

  useEffect(() => {
    const onChange = () => setRaw(readHash());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return useMemo(() => {
    const [path, query = ""] = raw.split("?");
    return { raw, path: path || "/", params: new URLSearchParams(query) };
  }, [raw]);
}

export function navigate(to) {
  window.location.hash = to;
}

// Builds "#/shop?..." and skips empty values.
export function shopHref(params = {}) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value) query.set(key, value);
  }
  const qs = query.toString();
  return `#/shop${qs ? `?${qs}` : ""}`;
}
