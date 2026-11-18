import Drawer from "../ui/Drawer.jsx";
import Button from "../ui/Button.jsx";
import Icon from "../ui/Icon.jsx";
import ProductPhoto from "../product/ProductPhoto.jsx";
import AddToCart from "../product/AddToCart.jsx";
import { useWishlist } from "../../context/WishlistContext.jsx";
import { useUI } from "../../context/UIContext.jsx";
import { formatPrice, plural } from "../../lib/format.js";
import { shopHref } from "../../lib/router.js";

export default function WishlistDrawer() {
  const { products, count, remove, clear } = useWishlist();
  const { closePanel } = useUI();

  const footer =
    products.length > 0 ? (
      <div className="flex gap-3">
        <Button href={shopHref()} variant="outline" className="flex-1" onClick={closePanel}>
          Continue shopping
        </Button>
        <button
          type="button"
          onClick={clear}
          className="px-3 text-sm font-medium text-muted underline underline-offset-4 hover:text-ink"
        >
          Clear wishlist
        </button>
      </div>
    ) : null;

  return (
    <Drawer
      title="Your wishlist"
      subtitle={plural(count, "item", "items")}
      onClose={closePanel}
      footer={footer}
    >
      {products.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center py-16 text-center">
          <Icon name="heart" className="size-12 text-muted" strokeWidth={1} />
          <p className="mt-4 font-display text-xl font-bold">Nothing saved yet</p>
          <p className="mt-1 max-w-xs text-sm text-muted">
            Tap the heart on any product to keep it here for later.
          </p>
          <Button href={shopHref()} className="mt-6" onClick={closePanel}>
            Shop all products
          </Button>
        </div>
      ) : (
        <ul className="divide-y divide-line" data-testid="wishlist-lines">
          {products.map((product) => (
            <li key={product.id} className="flex gap-3 py-4" data-testid="wishlist-line">
              <div className="size-20 shrink-0 overflow-hidden bg-wash sm:size-24">
                <ProductPhoto product={product} />
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  {product.brand}
                </p>
                <p className="line-clamp-2 font-display text-[15px] font-bold leading-tight">
                  {product.name}
                </p>
                <p className="mt-0.5 font-display text-lg font-extrabold">
                  {formatPrice(product.price)}
                </p>
                <div className="mt-auto pt-2">
                  <AddToCart product={product} />
                </div>
              </div>
              <button
                type="button"
                onClick={() => remove(product.id)}
                aria-label={`Remove ${product.name} from wishlist`}
                className="-mr-2 grid size-10 shrink-0 place-items-center text-muted hover:text-ink"
              >
                <Icon name="trash" className="size-5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </Drawer>
  );
}
