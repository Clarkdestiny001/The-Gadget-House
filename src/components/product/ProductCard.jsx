import { Star } from "lucide-react";
import ProductImage from "./ProductImage.jsx";
import AddToCart from "./AddToCart.jsx";
import { formatPrice } from "../../lib/format.js";

export default function ProductCard({ product }) {
  const { name, brand, price, compareAt, rating, reviews, badge, specs, kind, tone, tint, image } = product;

  return (
    <article className="group flex h-full flex-col border border-line bg-card">
      <div className="relative aspect-square overflow-hidden" style={{ backgroundColor: tint }}>
        {image ? (
          <img src={image} alt={name} loading="lazy" className="size-full object-cover" />
        ) : (
          <ProductImage
            kind={kind}
            tone={tone}
            label={`${brand} ${name}`}
            className="p-5 transition-transform duration-300 group-hover:scale-[1.03] sm:p-8"
          />
        )}
        {badge && (
          <span className="absolute left-0 top-3 bg-ink px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-paper sm:text-[11px]">
            {badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted sm:text-[11px]">
          {brand}
        </p>
        <h3 className="mt-1 line-clamp-2 min-h-[2.5rem] font-display text-[15px] font-bold leading-tight sm:min-h-[2.75rem] sm:text-lg">
          {name}
        </h3>

        <p className="mt-2 hidden font-mono text-[11px] leading-snug text-muted sm:block">
          {specs.join(" / ")}
        </p>

        <div className="mt-2 flex items-center gap-1 text-xs text-muted">
          <Star className="size-3.5 fill-ink text-ink" aria-hidden="true" />
          <span className="font-medium text-ink">{rating.toFixed(1)}</span>
          <span>({reviews.toLocaleString()})</span>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-display text-xl font-extrabold">{formatPrice(price)}</span>
          {compareAt && (
            <span className="text-sm text-muted line-through">{formatPrice(compareAt)}</span>
          )}
        </div>

        <div className="mt-auto pt-3">
          <AddToCart product={product} />
        </div>
      </div>
    </article>
  );
}
