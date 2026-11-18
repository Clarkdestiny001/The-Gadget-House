import { useEffect, useState } from "react";
import Container from "./Container.jsx";
import Logo from "./Logo.jsx";
import SearchBar from "./SearchBar.jsx";
import Icon from "../ui/Icon.jsx";
import IconAction from "../ui/IconAction.jsx";
import { useCart } from "../../context/CartContext.jsx";
import { useWishlist } from "../../context/WishlistContext.jsx";
import { useUI } from "../../context/UIContext.jsx";
import { categories } from "../../data/categories.js";
import { site } from "../../config/site.js";
import { formatPrice } from "../../lib/format.js";
import { shopHref } from "../../lib/router.js";

export default function Header({ route }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count: cartCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { panel, openPanel } = useUI();

  const onShop = route.path === "/shop";
  const activeCategory = onShop ? route.params.get("category") : null;
  const dealsActive = onShop && route.params.get("deal") === "1";

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-card">
      <div className="bg-ink text-white">
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
            <Icon name="menu" className="size-6" />
          </button>

          <Logo />

          <SearchBar route={route} className="hidden max-w-xl flex-1 lg:flex" />

          <div className="ml-auto flex items-center">
            <IconAction
              icon="heart"
              label="Wishlist"
              count={wishlistCount}
              expanded={panel === "wishlist"}
              onClick={() => openPanel("wishlist")}
            />
            <IconAction
              icon="bag"
              label="Cart"
              count={cartCount}
              expanded={panel === "cart"}
              onClick={() => openPanel("cart")}
            />
          </div>
        </div>

        <SearchBar route={route} className="pb-3 lg:hidden" />
      </Container>

      <div className="hidden border-t border-line lg:block">
        <Container>
          <nav aria-label="Categories" className="flex h-11 items-center gap-6 text-sm font-medium">
            <a
              href={shopHref()}
              aria-current={onShop && !activeCategory && !dealsActive ? "page" : undefined}
              className="hover:text-accent-dark aria-[current=page]:text-accent-dark"
            >
              All products
            </a>
            {categories.map((c) => (
              <a
                key={c.slug}
                href={shopHref({ category: c.slug })}
                aria-current={activeCategory === c.slug ? "page" : undefined}
                className="hover:text-accent-dark aria-[current=page]:text-accent-dark"
              >
                {c.name}
              </a>
            ))}
            <a
              href={shopHref({ deal: "1" })}
              aria-current={dealsActive ? "page" : undefined}
              className="ml-auto text-accent-dark hover:underline aria-[current=page]:underline"
            >
              Deals
            </a>
          </nav>
        </Container>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <button
            type="button"
            tabIndex={-1}
            className="absolute inset-0 bg-ink/55"
            aria-label="Close menu"
            onClick={closeMenu}
          />
          <div className="absolute inset-y-0 left-0 flex w-[85%] max-w-sm flex-col bg-card">
            <div className="flex h-16 items-center justify-between border-b border-line px-4">
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted">Menu</span>
              <button
                type="button"
                onClick={closeMenu}
                className="-mr-2 grid size-11 place-items-center"
                aria-label="Close menu"
              >
                <Icon name="close" className="size-6" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-4 py-4" aria-label="Mobile">
              <ul className="divide-y divide-line border-y border-line">
                <li>
                  <a
                    href={shopHref()}
                    onClick={closeMenu}
                    className="flex h-12 items-center gap-3 font-display text-lg font-semibold"
                  >
                    <Icon name="search" className="size-5 text-muted" />
                    All products
                  </a>
                </li>
                {categories.map((c) => (
                  <li key={c.slug}>
                    <a
                      href={shopHref({ category: c.slug })}
                      onClick={closeMenu}
                      className="flex h-12 items-center gap-3 font-display text-lg font-semibold"
                    >
                      <Icon name={c.icon} className="size-5 text-muted" />
                      {c.name}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={shopHref({ deal: "1" })}
                    onClick={closeMenu}
                    className="flex h-12 items-center gap-3 font-display text-lg font-semibold text-accent-dark"
                  >
                    <Icon name="check" className="size-5" />
                    Deals
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
