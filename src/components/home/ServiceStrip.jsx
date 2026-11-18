import Container from "../layout/Container.jsx";
import Icon from "../ui/Icon.jsx";
import { storePromises } from "../../config/site.js";

export default function ServiceStrip() {
  return (
    <section className="border-y border-line bg-card">
      <Container>
        <ul className="grid grid-cols-1 divide-y divide-line sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {storePromises.map(({ icon, title, text }) => (
            <li key={title} className="flex items-start gap-4 py-6 sm:px-6 sm:first:pl-0 lg:py-8">
              <Icon name={icon} className="mt-0.5 size-7 shrink-0 text-accent" strokeWidth={1.25} />
              <div>
                <p className="font-display text-lg font-bold">{title}</p>
                <p className="mt-1 text-sm text-muted">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
