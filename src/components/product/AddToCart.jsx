import Button from "../ui/Button.jsx";
import Icon from "../ui/Icon.jsx";
import QuantityStepper from "../ui/QuantityStepper.jsx";
import { useCart } from "../../context/CartContext.jsx";

// Shows "Add to cart" until the item is in the cart, then a quantity stepper.
export default function AddToCart({ product }) {
  const { quantityOf, add, decrement, maxQuantity } = useCart();
  const quantity = quantityOf(product.id);

  if (quantity === 0) {
    return (
      <Button
        size="sm"
        className="w-full"
        onClick={() => add(product.id)}
        aria-label={`Add ${product.name} to cart`}
      >
        <Icon name="bag" className="size-4" />
        Add to cart
      </Button>
    );
  }

  return (
    <QuantityStepper
      className="w-full"
      label={product.name}
      quantity={quantity}
      suffix=" in cart"
      onDecrement={() => decrement(product.id)}
      onIncrement={() => add(product.id)}
      canIncrement={quantity < maxQuantity}
    />
  );
}
