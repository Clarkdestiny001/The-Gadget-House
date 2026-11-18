import Container from "../layout/Container.jsx";
import SectionHeading from "../ui/SectionHeading.jsx";
import Icon from "../ui/Icon.jsx";
import { categories } from "../../data/categories.js";
import { products } from "../../data/products.js";
import { plural } from "../../lib/format.js";
import { shopHref } from "../../lib/router.js";

export default function CategoryGrid() {
  return (
    <section id="categories" className="py-14 sm:py-20">
      <Container>
        <SectionHeading index="01" eyebrow="Departments" title="Shop by category" />

        <ul className="mt-6 grid grid-cols-2 gap-px border border-line bg-line sm:mt-8 lg:grid-cols-4">
          {categories.map((category) => {
            const total = products.filter((p) => p.category === category.slug).length;
            return (
              <li key={category.slug} className="bg-card">
                <a
                  href={shopHref({ category: category.slug })}
                  className="group flex h-full min-h-40 flex-col justify-between p-4 transition-colors hover:bg-ink hover:text-white sm:min-h-48 sm:p-6"
                >
                  <span className="flex items-start justify-between">
                    <Icon name={category.icon} className="size-9 sm:size-10" strokeWidth={1.25} />
                    <Icon
                      name="arrow-right"
                      className="size-5 opacity-40 transition-opacity group-hover:opacity-100"
                    />
                  </span>
                  <span>
                    <span className="block font-display text-lg font-bold sm:text-xl">
                      {category.name}
                    </span>
                    <span className="mt-1 block text-sm text-muted group-hover:text-white/70">
                      {category.blurb}
                    </span>
                    <span className="mt-2 block font-mono text-[11px] uppercase tracking-[0.1em] text-accent-dark group-hover:text-white">
                      {plural(total, "product", "products")}
                    </span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
