import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";
import Hero from "./components/home/Hero.jsx";
import CategoryGrid from "./components/home/CategoryGrid.jsx";
import FeaturedProducts from "./components/home/FeaturedProducts.jsx";
import ServiceStrip from "./components/home/ServiceStrip.jsx";

// Stage 1 is a single home page. When routing arrives (product details,
// cart, checkout), this file becomes the router and the sections below
// move into a HomePage component.
export default function App() {
  return (
    <div id="top" className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <CategoryGrid />
        <FeaturedProducts />
        <ServiceStrip />
      </main>
      <Footer />
    </div>
  );
}
