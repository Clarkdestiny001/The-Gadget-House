import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { getProduct } from "../data/products.js";
import { loadJSON, saveJSON } from "../lib/storage.js";

// Cart state: { [productId]: quantity }, saved in localStorage.
// No checkout or payment exists yet. Later stages can swap the reducer for an
// API without touching components that call useCart().

const STORAGE_KEY = "tgh-cart";
const MAX_QUANTITY = 99;

const CartContext = createContext(null);

function reducer(state, action) {
  const current = state[action.id] ?? 0;
  switch (action.type) {
    case "add":
      return current >= MAX_QUANTITY ? state : { ...state, [action.id]: current + 1 };
    case "decrement": {
      if (current <= 1) {
        const { [action.id]: _gone, ...rest } = state;
        return rest;
      }
      return { ...state, [action.id]: current - 1 };
    }
    case "remove": {
      const { [action.id]: _gone, ...rest } = state;
      return rest;
    }
    case "clear":
      return {};
    default:
      return state;
  }
}

// Drop anything in storage that is not a real product or a sane quantity.
function init() {
  const saved = loadJSON(STORAGE_KEY, {});
  const clean = {};
  for (const [id, qty] of Object.entries(saved ?? {})) {
    if (getProduct(id) && Number.isInteger(qty) && qty > 0) {
      clean[id] = Math.min(qty, MAX_QUANTITY);
    }
  }
  return clean;
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, undefined, init);

  useEffect(() => {
    saveJSON(STORAGE_KEY, items);
  }, [items]);

  const value = useMemo(() => {
    const lines = Object.entries(items).map(([id, quantity]) => {
      const product = getProduct(id);
      return { product, quantity, lineTotal: product.price * quantity };
    });
    return {
      lines,
      count: lines.reduce((sum, line) => sum + line.quantity, 0),
      subtotal: lines.reduce((sum, line) => sum + line.lineTotal, 0),
      maxQuantity: MAX_QUANTITY,
      quantityOf: (id) => items[id] ?? 0,
      add: (id) => dispatch({ type: "add", id }),
      decrement: (id) => dispatch({ type: "decrement", id }),
      remove: (id) => dispatch({ type: "remove", id }),
      clear: () => dispatch({ type: "clear" }),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
