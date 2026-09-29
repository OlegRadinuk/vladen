import Link from "next/link";
import Container from "@/components/ui/Container";
import { typo } from "@/lib/evp-landings";

/**
 * Перелинковка между посадочными страницами (Евпатория + дом из ракушечника).
 * Передаём ссылки на соседние страницы; текущую страницу не передаём.
 */

interface RelatedLink {
  href: string;
  title: string;
  desc: string;
}

interface RelatedLinksProps {
  heading?: string;
  links: RelatedLink[];
}

export default function RelatedLinks({ heading = "Смотрите также", links }: RelatedLinksProps) {
  return (
    <section className="py-16 md:py-20 bg-dark border-t border-white/10">
      <Container>
        <h2 className="font-oswald text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 sm:mb-10 text-center">
          {heading}
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="group flex h-full items-start justify-between gap-4 p-6 sm:p-8 rounded-lg border border-white/10 bg-white/5 hover:border-accent/40 transition-colors"
              >
                <span className="min-w-0">
                  <span className="block font-oswald text-xl font-semibold text-white group-hover:text-accent transition-colors mb-1">
                    {l.title}
                  </span>
                  <span className="block text-text-muted text-sm leading-relaxed">{typo(l.desc)}</span>
                </span>
                <svg
                  className="w-5 h-5 mt-1 shrink-0 text-accent group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
