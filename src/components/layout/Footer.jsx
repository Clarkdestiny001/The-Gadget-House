import Container from "./Container.jsx";
import Icon from "../ui/Icon.jsx";
import { categories } from "../../data/categories.js";
import { useCart } from "../../context/CartContext.jsx";
import { useWishlist } from "../../context/WishlistContext.jsx";
import { useUI } from "../../context/UIContext.jsx";
import { site } from "../../config/site.js";
import { formatPrice, plural } from "../../lib/format.js";
import { shopHref } from "../../lib/router.js";

const linkClass =
  "inline-flex min-h-9 items-center text-sm font-medium text-white/85 hover:text-white hover:underline underline-offset-4";

export default function Footer() {
  const { count: cartCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { openPanel } = useUI();

  return (
    <footer className="bg-ink text-white">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/60">The</p>
            <p className="font-display text-3xl font-extrabold tracking-tight">Gadget House</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              Phones, laptops, audio and everyday gear. Honest prices, real specs and support
              from people who know the kit.
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            <div>
              <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-white/60">Shop</h2>
              <ul className="mt-4 space-y-1">
                <li>
                  <a href={shopHref()} className={linkClass}>
                    All products
                  </a>
                </li>
                {categories.map((c) => (
                  <li key={c.slug}>
                    <a href={shopHref({ category: c.slug })} className={linkClass}>
                      {c.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-white/60">
                Your store
              </h2>
              <ul className="mt-4 space-y-1">
                <li>
                  <a href={shopHref({ deal: "1" })} className={linkClass}>
                    Deals
                  </a>
                </li>
                <li>
                  <button type="button" onClick={() => openPanel("cart")} className={linkClass}>
                    Cart ({plural(cartCount, "item", "items")})
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => openPanel("wishlist")} className={linkClass}>
                    Wishlist ({plural(wishlistCount, "item", "items")})
                  </button>
                </li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-white/60">
                Our promise
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-white/85">
                <li>Free delivery over {formatPrice(site.freeShippingThreshold)}</li>
                <li>30-day returns</li>
                <li>2-year warranty on everything</li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/20 pt-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex h-10 items-center gap-2 text-white/85 hover:text-white"
          >
            Back to top
            <Icon name="arrow-up" className="size-4" />
          </button>
        </div>
      </Container>
    </footer>
  );
}
