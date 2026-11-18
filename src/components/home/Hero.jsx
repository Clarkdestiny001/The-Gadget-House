import Container from "../layout/Container.jsx";
import Button from "../ui/Button.jsx";
import Icon from "../ui/Icon.jsx";
import ProductPhoto from "../product/ProductPhoto.jsx";
import { featuredProducts } from "../../data/products.js";
import { formatPrice } from "../../lib/format.js";
import { shopHref } from "../../lib/router.js";
import { site } from "../../config/site.js";

const promises = [
  `Free delivery over ${formatPrice(site.freeShippingThreshold)}`,
  "30-day returns",
  "2-year warranty",
];

// Four picks for the "this week" list. Each row opens its category.
const picks = ["p-kestrel-x5", "p-auralis-anc", "p-slate-14", "p-tempo-watch"]
  .map((id) => featuredProducts.find((p) => p.id === id))
  .filter(Boolean);

export default function Hero() {
  return (
    <section className="border-b border-line bg-card">
      <Container className="grid grid-cols-1 gap-10 py-10 sm:py-14 lg:grid-cols-12 lg:gap-14 lg:py-20">
        <div className="flex min-w-0 flex-col justify-center lg:col-span-7">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent-dark">
            Electronics, sorted
          </p>
          <h1 className="mt-4 font-display text-[2.75rem] font-extrabold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            Tech you will actually keep using.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
            The Gadget House stocks phones, laptops, audio and everyday gear we would
            happily use ourselves. Real specs, straight prices and support that picks up.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button href={shopHref()} variant="primary" className="sm:min-w-48">
              Shop all products
              <Icon name="arrow-right" className="size-4" />
            </Button>
            <Button href={shopHref({ deal: "1" })} variant="outline" className="sm:min-w-48">
              See today&apos;s deals
            </Button>
          </div>

          <ul className="mt-8 flex flex-col gap-2 text-sm sm:flex-row sm:flex-wrap sm:gap-x-6">
            {promises.map((text) => (
              <li key={text} className="flex items-center gap-2">
                <Icon name="check" className="size-4 text-accent-dark" strokeWidth={2.25} />
                {text}
              </li>
            ))}
          </ul>
        </div>

        <aside className="min-w-0 lg:col-span-5" aria-labelledby="picks-heading">
          <div className="border border-ink bg-paper">
            <div className="flex items-center justify-between border-b border-ink px-4 py-3">
              <h2 id="picks-heading" className="font-mono text-xs uppercase tracking-[0.14em]">
                This week&apos;s picks
              </h2>
              <a
                href={shopHref()}
                className="text-sm font-semibold text-accent-dark hover:underline"
              >
                View all
              </a>
            </div>
            <ul className="divide-y divide-line">
              {picks.map((product) => (
                <li key={product.id}>
                  <a
                    href={shopHref({ category: product.category })}
                    className="flex items-center gap-4 p-3 transition-colors hover:bg-card sm:p-4"
                  >
                    <span className="size-16 shrink-0 overflow-hidden bg-wash sm:size-20">
                      <ProductPhoto product={product} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                        {product.brand}
                      </span>
                      <span className="block truncate font-display text-base font-bold sm:text-lg">
                        {product.name}
                      </span>
                      <span className="block text-sm text-muted">{formatPrice(product.price)}</span>
                    </span>
                    <Icon name="arrow-right" className="size-5 shrink-0 text-muted" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </Container>
    </section>
  );
}
