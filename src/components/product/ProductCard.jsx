import Icon from "../ui/Icon.jsx";
import ProductPhoto from "./ProductPhoto.jsx";
import AddToCart from "./AddToCart.jsx";
import { useWishlist } from "../../context/WishlistContext.jsx";
import { formatPrice } from "../../lib/format.js";

export default function ProductCard({ product }) {
  const { name, brand, price, compareAt, rating, reviews, badge, specs } = product;
  const { has, toggle } = useWishlist();
  const wished = has(product.id);

  return (
    <article className="flex h-full flex-col border border-line bg-card" data-testid="product-card">
      <div className="relative aspect-square overflow-hidden bg-wash">
        <ProductPhoto product={product} />
        {badge && (
          <span className="absolute left-0 top-3 bg-ink px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-white sm:text-[11px]">
            {badge}
          </span>
        )}
        <button
          type="button"
          onClick={() => toggle(product.id)}
          aria-pressed={wished}
          aria-label={wished ? `Remove ${name} from wishlist` : `Add ${name} to wishlist`}
          className={`absolute right-2 top-2 grid size-10 place-items-center bg-white transition-colors hover:text-accent-dark ${
            wished ? "text-accent" : "text-ink"
          }`}
        >
          <Icon name="heart" filled={wished} className="size-5" />
        </button>
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
          <Icon name="star" className="size-3.5 text-ink" strokeWidth={1} />
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
