import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { getProduct } from "../data/products.js";
import { loadJSON, saveJSON } from "../lib/storage.js";

// Wishlist state: an ordered list of product ids, saved in localStorage.

const STORAGE_KEY = "tgh-wishlist";

const WishlistContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case "toggle":
      return state.includes(action.id)
        ? state.filter((id) => id !== action.id)
        : [...state, action.id];
    case "remove":
      return state.filter((id) => id !== action.id);
    case "clear":
      return [];
    default:
      return state;
  }
}

function init() {
  const saved = loadJSON(STORAGE_KEY, []);
  if (!Array.isArray(saved)) return [];
  return [...new Set(saved)].filter((id) => getProduct(id));
}

export function WishlistProvider({ children }) {
  const [ids, dispatch] = useReducer(reducer, undefined, init);

  useEffect(() => {
    saveJSON(STORAGE_KEY, ids);
  }, [ids]);

  const value = useMemo(
    () => ({
      products: ids.map(getProduct),
      count: ids.length,
      has: (id) => ids.includes(id),
      toggle: (id) => dispatch({ type: "toggle", id }),
      remove: (id) => dispatch({ type: "remove", id }),
      clear: () => dispatch({ type: "clear" }),
    }),
    [ids],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside <WishlistProvider>");
  return ctx;
}
