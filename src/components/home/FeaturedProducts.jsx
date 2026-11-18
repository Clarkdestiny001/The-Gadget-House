import Container from "../layout/Container.jsx";
import SectionHeading from "../ui/SectionHeading.jsx";
import Button from "../ui/Button.jsx";
import Icon from "../ui/Icon.jsx";
import ProductCard from "../product/ProductCard.jsx";
import { featuredProducts } from "../../data/products.js";
import { shopHref } from "../../lib/router.js";

export default function FeaturedProducts() {
  return (
    <section id="featured" className="border-t border-line pb-16 pt-14 sm:pb-24 sm:pt-20">
      <Container>
        <SectionHeading
          index="02"
          eyebrow="This week"
          title="Featured products"
          linkLabel="View all products"
          linkHref={shopHref()}
        />

        <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-5 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 flex justify-center sm:hidden">
          <Button href={shopHref()} variant="outline" className="w-full">
            View all products
            <Icon name="arrow-right" className="size-4" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
