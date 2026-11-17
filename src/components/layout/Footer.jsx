import Container from "./Container.jsx";
import { footerColumns, legalLinks, site } from "../../config/site.js";

export default function Footer() {
  return (
    <footer className="bg-paper">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">The</p>
            <p className="font-display text-3xl font-extrabold tracking-tight">Gadget House</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Phones, laptops, audio and everyday gear. Honest prices, real specs and
              support from people who know the kit.
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8"
          >
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
                  {column.title}
                </h2>
                <ul className="mt-4 space-y-1">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="inline-flex min-h-9 items-center text-sm font-medium hover:text-signal-dark"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <ul className="flex gap-5">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="hover:text-ink">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
