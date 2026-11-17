import { Truck, RotateCcw, ShieldCheck, Headset } from "lucide-react";
import Container from "../layout/Container.jsx";
import { formatPrice } from "../../lib/format.js";
import { site } from "../../config/site.js";

const services = [
  {
    icon: Truck,
    title: "Fast delivery",
    text: `Free on orders over ${formatPrice(site.freeShippingThreshold)}.`,
  },
  { icon: RotateCcw, title: "30-day returns", text: "Changed your mind? Send it back." },
  { icon: ShieldCheck, title: "2-year warranty", text: "On every product we sell." },
  { icon: Headset, title: "Real support", text: "Talk to people who know the kit." },
];

export default function ServiceStrip() {
  return (
    <section id="support" className="scroll-mt-32 border-y border-ink bg-ink text-paper">
      <Container>
        <ul className="grid grid-cols-1 divide-y divide-paper/20 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {services.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex items-start gap-4 py-6 sm:px-6 sm:first:pl-0 lg:py-8">
              <Icon className="mt-0.5 size-6 shrink-0 text-signal" strokeWidth={1.75} aria-hidden="true" />
              <div>
                <p className="font-display text-lg font-bold">{title}</p>
                <p className="mt-1 text-sm text-paper/70">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
