import { useEffect } from "react";
import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";
import CartDrawer from "./components/cart/CartDrawer.jsx";
import WishlistDrawer from "./components/cart/WishlistDrawer.jsx";
import HomePage from "./pages/HomePage.jsx";
import ShopPage from "./pages/ShopPage.jsx";
import { useHashRoute } from "./lib/router.js";
import { useUI } from "./context/UIContext.jsx";

// "#/" is the home page and "#/shop" is the product listing.
// Any other hash falls back to home.
export default function App() {
  const route = useHashRoute();
  const { panel } = useUI();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route.raw]);

  return (
    <div className="flex min-h-dvh flex-col">
      <Header route={route} />
      <main className="flex-1">
        {route.path === "/shop" ? <ShopPage route={route} /> : <HomePage />}
      </main>
      <Footer />
      {panel === "cart" && <CartDrawer />}
      {panel === "wishlist" && <WishlistDrawer />}
    </div>
  );
}
