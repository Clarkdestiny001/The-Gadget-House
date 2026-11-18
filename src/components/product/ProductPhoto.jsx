import { useState } from "react";
import Icon from "../ui/Icon.jsx";
import { categories } from "../../data/categories.js";
import { cn } from "../../lib/format.js";

// Shows the product photo from /public/products/<slug>.jpg.
// If the file is missing, a plain neutral tile with the category icon is shown
// instead of a broken image.
export default function ProductPhoto({ product, className }) {
  const [failed, setFailed] = useState(false);
  const alt = `${product.brand} ${product.name}`;

  if (!product.image || failed) {
    const icon = categories.find((c) => c.slug === product.category)?.icon ?? "bag";
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn("grid size-full place-items-center bg-wash text-muted/50", className)}
      >
        <Icon name={icon} className="size-1/3" strokeWidth={0.9} />
      </div>
    );
  }

  return (
    <img
      src={product.image}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={cn("size-full object-cover", className)}
    />
  );
}
