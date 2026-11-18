import Drawer from "../ui/Drawer.jsx";
import Button from "../ui/Button.jsx";
import Icon from "../ui/Icon.jsx";
import QuantityStepper from "../ui/QuantityStepper.jsx";
import ProductPhoto from "../product/ProductPhoto.jsx";
import { useCart } from "../../context/CartContext.jsx";
import { useUI } from "../../context/UIContext.jsx";
import { formatPrice, plural } from "../../lib/format.js";
import { shopHref } from "../../lib/router.js";
import { site } from "../../config/site.js";

export default function CartDrawer() {
  const { lines, count, subtotal, add, decrement, remove, clear, maxQuantity } = useCart();
  const { closePanel } = useUI();

  const remaining = site.freeShippingThreshold - subtotal;
  const progress = Math.min(100, Math.round((subtotal / site.freeShippingThreshold) * 100));

  const footer =
    lines.length > 0 ? (
      <div>
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted">Subtotal</span>
          <span className="font-display text-2xl font-extrabold" data-testid="cart-subtotal">
            {formatPrice(subtotal)}
          </span>
        </div>
        <div className="mt-3 flex gap-3">
          <Button href={shopHref()} variant="outline" className="flex-1" onClick={closePanel}>
            Continue shopping
          </Button>
          <button
            type="button"
            onClick={clear}
            className="px-3 text-sm font-medium text-muted underline underline-offset-4 hover:text-ink"
          >
            Clear cart
          </button>
        </div>
      </div>
    ) : null;

  return (
    <Drawer
      title="Your cart"
      subtitle={plural(count, "item", "items")}
      onClose={closePanel}
      footer={footer}
    >
      {lines.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center py-16 text-center">
          <Icon name="bag" className="size-12 text-muted" strokeWidth={1} />
          <p className="mt-4 font-display text-xl font-bold">Your cart is empty</p>
          <p className="mt-1 text-sm text-muted">Add something and it will show up here.</p>
          <Button href={shopHref()} className="mt-6" onClick={closePanel}>
            Shop all products
          </Button>
        </div>
      ) : (
        <>
          <div className="mt-4 border border-line bg-paper p-3 text-sm">
            <p>
              {remaining > 0 ? (
                <>
                  Add <strong>{formatPrice(remaining)}</strong> more for free delivery.
                </>
              ) : (
                <strong>Your order qualifies for free delivery.</strong>
              )}
            </p>
            <div className="mt-2 h-1.5 bg-line" aria-hidden="true">
              <div className="h-full bg-accent" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <ul className="divide-y divide-line" data-testid="cart-lines">
            {lines.map(({ product, quantity, lineTotal }) => (
              <li key={product.id} className="flex gap-3 py-4" data-testid="cart-line">
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
                  <p className="mt-0.5 text-sm text-muted">{formatPrice(product.price)} each</p>
                  <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                    <QuantityStepper
                      label={product.name}
                      quantity={quantity}
                      onDecrement={() => decrement(product.id)}
                      onIncrement={() => add(product.id)}
                      canDecrement={quantity > 1}
                      canIncrement={quantity < maxQuantity}
                    />
                    <span className="font-display text-lg font-extrabold">
                      {formatPrice(lineTotal)}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => remove(product.id)}
                  aria-label={`Remove ${product.name} from cart`}
                  className="-mr-2 grid size-10 shrink-0 place-items-center text-muted hover:text-ink"
                >
                  <Icon name="trash" className="size-5" />
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </Drawer>
  );
}
