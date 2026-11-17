import { createContext, useContext, useMemo, useReducer } from "react";

// Stage 1 cart: in-memory quantities only. No persistence, no checkout.
// Later stages can swap the reducer for persisted state or an API
// without touching the components that call useCart().

const CartContext = createContext(null);

function reducer(state, action) {
  const current = state[action.id] ?? 0;
  switch (action.type) {
    case "add":
      return { ...state, [action.id]: current + 1 };
    case "remove": {
      if (current <= 1) {
        const {
          [action.id]: _removed, ...rest } = state;
        return rest;
      }
      return { ...state, [action.id]: current - 1 };
    }
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, {});
  
  const value = useMemo(
    () => ({
      items,
      count: Object.values(items).reduce((sum, qty) => sum + qty, 0),
      quantityOf: (id) => items[id] ?? 0,
      add: (id) => dispatch({ type: "add", id }),
      remove: (id) => dispatch({ type: "remove", id }),
    }),
    [items],
  );
  
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}