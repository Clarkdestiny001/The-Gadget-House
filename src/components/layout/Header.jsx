import { useEffect, useState } from "react";
import { Heart, Menu, ShoppingBag, User, X } from "lucide-react";
import Container from "./Container.jsx";
import Logo from "./Logo.jsx";
import SearchBar from "./SearchBar.jsx";
import IconAction from "../ui/IconAction.jsx";
import { useCart } from "../../context/CartContext.jsx";
import { categories } from "../../data/categories.js";
import { primaryNav, site } from "../../config/site.js";
import { formatPrice } from "../../lib/format.js";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count } = useCart();

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <div className="bg-ink text-paper">
        <Container className="flex h-9 items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] sm:justify-between">
          <span>Free delivery over {formatPrice(site.freeShippingThreshold)}</span>
          <span className="hidden sm:inline">30-day returns / 2-year warranty</span>
        </Container>
      </div>

      <Container>
        <div className="flex h-16 items-center gap-2 lg:gap-8">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="-ml-2 grid size-11 place-items-center lg:hidden"
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <Menu className="size-6" aria-hidden="true" />
          </button>

          <Logo />

          <SearchBar className="hidden max-w-xl flex-1 lg:flex" />

          <nav className="ml-auto flex items-center" aria-label="Account and cart">
            <span className="hidden sm:block">
              <IconAction icon={User} label="Account" href="#account" showLabel />
            </span>
            <IconAction icon={Heart} label="Wishlist" count={0} href="#wishlist" showLabel />
            <IconAction icon={ShoppingBag} label="Cart" count={count} href="#cart" showLabel />
          </nav>
        </div>

        <SearchBar className="pb-3 lg:hidden" />
      </Container>

      <div className="hidden border-t border-line lg:block">
        <Container>
          <nav aria-label="Categories" className="flex h-11 items-center gap-7 text-sm font-medium">
            {categories.slice(0, 6).map((c) => (
              <a key={c.slug} href="#categories" className="transition-colors hover:text-signal-dark">
                {c.name}
              </a>
            ))}
            <span className="ml-auto flex items-center gap-7">
              {primaryNav.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-muted transition-colors hover:text-ink"
                >
                  {item.label}
                </a>
              ))}
            </span>
          </nav>
        </Container>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <button
            type="button"
            className="absolute inset-0 bg-ink/50"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[85%] max-w-sm flex-col bg-paper">
            <div className="flex h-16 items-center justify-between border-b border-line px-4">
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted">Menu</span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="-mr-2 grid size-11 place-items-center"
                aria-label="Close menu"
              >
                <X className="size-6" aria-hidden="true" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-4 py-4" aria-label="Mobile">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Shop</p>
              <ul className="mt-2 divide-y divide-line border-y border-line">
                {categories.map((c) => (
                  <li key={c.slug}>
                    <a
                      href="#categories"
                      onClick={() => setMenuOpen(false)}
                      className="flex h-12 items-center gap-3 font-display text-lg font-semibold"
                    >
                      <c.icon className="size-5 text-muted" aria-hidden="true" />
                      {c.name}
                    </a>
                  </li>
                ))}
              </ul>
              <ul className="mt-5 space-y-1">
                {primaryNav.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex h-11 items-center text-muted"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#account" onClick={() => setMenuOpen(false)} className="flex h-11 items-center text-muted">
                    Account
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
