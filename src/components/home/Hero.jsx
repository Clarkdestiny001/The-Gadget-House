import { ArrowRight, Check } from "lucide-react";
import Container from "../layout/Container.jsx";
import Button from "../ui/Button.jsx";
import ProductImage from "../product/ProductImage.jsx";
import { featuredProducts } from "../../data/products.js";
import { formatPrice } from "../../lib/format.js";
import { site } from "../../config/site.js";

const promises = [
  `Free delivery over ${formatPrice(site.freeShippingThreshold)}`,
  "30-day returns",
  "2-year warranty",
];

// Four picks shown in the hero "device wall". Order matters for the layout.
const wall = ["p-kestrel-x5", "p-auralis-anc", "p-slate-14", "p-tempo-watch"]
  .map((id) => featuredProducts.find((p) => p.id === id))
  .filter(Boolean);

export default function Hero() {
  return (
    <section className="border-b border-line">
      <Container className="grid gap-10 py-10 sm:py-14 lg:grid-cols-12 lg:gap-12 lg:py-20">
        <div className="flex flex-col justify-center lg:col-span-6">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
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
            <Button href="#featured" variant="primary" className="sm:min-w-44">
              Shop featured
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
            <Button href="#categories" variant="outline" className="sm:min-w-44">
              Browse categories
            </Button>
          </div>

          <ul className="mt-8 flex flex-col gap-2 text-sm sm:flex-row sm:flex-wrap sm:gap-x-6">
            {promises.map((text) => (
              <li key={text} className="flex items-center gap-2">
                <Check className="size-4 text-signal-dark" strokeWidth={2.5} aria-hidden="true" />
                {text}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-6" aria-label="Featured devices">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {wall.map((product, i) => (
              <a
                key={product.id}
                href="#featured"
                className={`group relative flex aspect-[4/5] flex-col justify-between overflow-hidden border border-line p-3 sm:p-4 ${
                  i % 2 === 1 ? "mt-6 sm:mt-10" : ""
                }`}
                style={{ backgroundColor: product.tint }}
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/70 sm:text-[11px]">
                  {String(i + 1).padStart(2, "0")} / {product.brand}
                </span>
                <ProductImage
                  kind={product.kind}
                  tone={product.tone}
                  label={`${product.brand} ${product.name}`}
                  className="absolute inset-x-0 top-1/2 -translate-y-[55%] p-6 transition-transform duration-300 group-hover:scale-[1.04] sm:p-10"
                />
                <span className="relative z-10 flex items-end justify-between gap-2">
                  <span className="line-clamp-2 max-w-[70%] font-display text-sm font-bold leading-tight sm:text-base">
                    {product.name}
                  </span>
                  <span className="bg-ink px-1.5 py-1 font-mono text-xs text-paper">
                    {formatPrice(product.price)}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
