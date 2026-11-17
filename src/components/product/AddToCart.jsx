import { Minus, Plus, ShoppingBag } from "lucide-react";
import Button from "../ui/Button.jsx";
import { useCart } from "../../context/CartContext.jsx";

// Shows "Add to cart" until the item is in the cart, then a quantity stepper.
export default function AddToCart({ product }) {
  const { quantityOf, add, remove } = useCart();
  const qty = quantityOf(product.id);

  if (qty === 0) {
    return (
      <Button
        size="sm"
        className="w-full"
        onClick={() => add(product.id)}
        aria-label={`Add ${product.name} to cart`}
      >
        <ShoppingBag className="size-4" aria-hidden="true" />
        Add to cart
      </Button>
    );
  }

  return (
    <div
      className="flex h-10 w-full items-stretch border border-ink bg-card"
      role="group"
      aria-label={`${product.name} quantity`}
    >
      <button
        type="button"
        onClick={() => remove(product.id)}
        className="grid w-11 place-items-center transition-colors hover:bg-ink hover:text-paper"
        aria-label="Decrease quantity"
      >
        <Minus className="size-4" aria-hidden="true" />
      </button>
      <span className="grid flex-1 place-items-center font-mono text-sm" aria-live="polite">
        {qty} in cart
      </span>
      <button
        type="button"
        onClick={() => add(product.id)}
        className="grid w-11 place-items-center transition-colors hover:bg-ink hover:text-paper"
        aria-label="Increase quantity"
      >
        <Plus className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}
