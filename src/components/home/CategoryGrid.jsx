import { ArrowUpRight } from "lucide-react";
import Container from "../layout/Container.jsx";
import SectionHeading from "../ui/SectionHeading.jsx";
import { categories } from "../../data/categories.js";

export default function CategoryGrid() {
  return (
    <section id="categories" className="scroll-mt-32 py-14 sm:py-20">
      <Container>
        <SectionHeading index="01" eyebrow="Departments" title="Shop by category" />

        <ul className="mt-6 grid grid-cols-2 gap-px border border-line bg-line sm:mt-8 lg:grid-cols-4">
          {categories.map((category) => (
            <li key={category.slug} className="bg-card">
              <a
                href={`#${category.slug}`}
                className="group flex h-full min-h-40 flex-col justify-between p-4 transition-colors hover:bg-ink hover:text-paper sm:min-h-48 sm:p-6"
              >
                <span className="flex items-start justify-between">
                  <category.icon className="size-8 sm:size-9" strokeWidth={1.5} aria-hidden="true" />
                  <ArrowUpRight
                    className="size-5 opacity-40 transition-opacity group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </span>
                <span>
                  <span className="block font-display text-lg font-bold sm:text-xl">
                    {category.name}
                  </span>
                  <span className="mt-1 block text-sm text-muted group-hover:text-paper/70">
                    {category.blurb}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
