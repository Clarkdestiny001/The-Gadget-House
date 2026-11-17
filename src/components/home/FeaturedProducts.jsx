import Container from "../layout/Container.jsx";
import SectionHeading from "../ui/SectionHeading.jsx";
import ProductCard from "../product/ProductCard.jsx";
import { featuredProducts } from "../../data/products.js";

export default function FeaturedProducts() {
  return (
    <section id="featured" className="scroll-mt-32 border-t border-line bg-paper pb-16 pt-14 sm:pb-24 sm:pt-20">
      <Container>
        <SectionHeading
          index="02"
          eyebrow="This week"
          title="Featured products"
          linkLabel="View all products"
        />

        <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-5 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
