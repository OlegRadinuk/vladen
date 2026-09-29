import Link from "next/link";
import Container from "@/components/ui/Container";
import AnimateOnView from "@/components/ui/AnimateOnView";
import { typo } from "@/lib/evp-landings";

/**
 * Текстовые SEO-блоки посадочных страниц (цены, состав работ, сроки, материалы).
 * Каждый блок — карточка со своим H2. На 375px — одна колонка, на lg — до трёх.
 */

interface InfoRow {
  label: string;
  value: string;
  /** Пояснение под строкой (например, «что включено») */
  note?: string;
}

interface InfoBlock {
  heading: string;
  text?: string;
  rows?: InfoRow[];
  bullets?: string[];
  footnote?: string;
  link?: { label: string; href: string };
}

interface InfoBlocksProps {
  accentLabel?: string;
  blocks: InfoBlock[];
  bg?: "light" | "dark";
}

export default function InfoBlocks({ accentLabel, blocks, bg = "light" }: InfoBlocksProps) {
  const isDark = bg === "dark";
  const cols =
    blocks.length >= 3 ? "lg:grid-cols-3" : blocks.length === 2 ? "lg:grid-cols-2" : "max-w-3xl mx-auto";

  return (
    <section className={`py-20 md:py-28 ${isDark ? "bg-dark" : "bg-light"}`}>
      <Container>
        {accentLabel ? (
          <p className="text-accent font-oswald text-sm tracking-widest uppercase mb-6 text-center">
            {accentLabel}
          </p>
        ) : null}

        <div className={`grid grid-cols-1 ${cols} gap-6 sm:gap-10`}>
          {blocks.map((b, i) => (
            <AnimateOnView key={b.heading} delay={i * 0.07} className="h-full">
              <div
                className={`h-full p-6 sm:p-8 rounded-lg border ${
                  isDark ? "bg-white/5 border-white/10" : "bg-white border-transparent shadow-sm"
                }`}
              >
                <h2
                  className={`font-oswald text-2xl sm:text-3xl font-bold mb-4 text-balance ${
                    isDark ? "text-white" : "text-text-light"
                  }`}
                >
                  {b.heading}
                </h2>

                {b.text ? (
                  <p className={`leading-relaxed mb-4 ${isDark ? "text-text-dark" : "text-text-light/80"}`}>
                    {typo(b.text)}
                  </p>
                ) : null}

                {b.rows && b.rows.length > 0 ? (
                  <dl className="mb-4">
                    {b.rows.map((r, ri) => (
                      <div
                        key={r.label}
                        className={`py-3 ${
                          ri < b.rows!.length - 1
                            ? isDark
                              ? "border-b border-white/10"
                              : "border-b border-text-light/10"
                            : ""
                        }`}
                      >
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                          <dt className={`font-oswald text-lg ${isDark ? "text-text-dark" : "text-text-light"}`}>
                            {r.label}
                          </dt>
                          <dd className="font-oswald text-lg font-bold text-accent">{typo(r.value)}</dd>
                        </div>
                        {r.note ? (
                          <p className={`text-sm mt-1 ${isDark ? "text-text-muted" : "text-text-light/70"}`}>
                            {typo(r.note)}
                          </p>
                        ) : null}
                      </div>
                    ))}
                  </dl>
                ) : null}

                {b.bullets && b.bullets.length > 0 ? (
                  <ul className="space-y-2.5 mb-4">
                    {b.bullets.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-[9px] shrink-0" />
                        <span className={`leading-relaxed ${isDark ? "text-text-dark" : "text-text-light/80"}`}>
                          {typo(item)}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {b.footnote ? (
                  <p className={`text-sm leading-relaxed ${isDark ? "text-text-muted" : "text-text-light/70"}`}>
                    {typo(b.footnote)}
                  </p>
                ) : null}

                {b.link ? (
                  <Link
                    href={b.link.href}
                    className="inline-flex items-center gap-2 mt-4 text-accent font-oswald text-sm underline underline-offset-4 hover:text-accent/80 transition-colors"
                  >
                    {b.link.label}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ) : null}
              </div>
            </AnimateOnView>
          ))}
        </div>
      </Container>
    </section>
  );
}
