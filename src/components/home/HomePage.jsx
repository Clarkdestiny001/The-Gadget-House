import Hero from "../components/home/Hero.jsx";
import CategoryGrid from "../components/home/CategoryGrid.jsx";
import FeaturedProducts from "../components/home/FeaturedProducts.jsx";
import ServiceStrip from "../components/home/ServiceStrip.jsx";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <FeaturedProducts />
      <ServiceStrip />
    </>
  );
}
