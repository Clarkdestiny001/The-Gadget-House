import { createContext, useCallback, useContext, useMemo, useState } from "react";

// Which slide-over panel is open: null, "cart" or "wishlist".
const UIContext = createContext(null);

export function UIProvider({ children }) {
  const [panel, setPanel] = useState(null);
  const openPanel = useCallback((name) => setPanel(name), []);
  const closePanel = useCallback(() => setPanel(null), []);

  const value = useMemo(() => ({ panel, openPanel, closePanel }), [panel, openPanel, closePanel]);
  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used inside <UIProvider>");
  return ctx;
}
