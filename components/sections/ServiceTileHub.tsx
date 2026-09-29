import { ReactNode } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import AnimateOnView from "@/components/ui/AnimateOnView";
import { typo } from "@/lib/evp-landings";

interface ServiceTile {
  icon: ReactNode;   // инлайн-SVG w-10 h-10
  title: string;
  desc: string;
  href: string;
  ctaLabel: string;
}

interface ServiceTileHubProps {
  heading: string;
  tiles: ServiceTile[];
  secondaryCTA?: { label: string; href: string }; // ссылка под плиткой
}

export default function ServiceTileHub({
  heading,
  tiles,
  secondaryCTA,
}: ServiceTileHubProps) {
  return (
    <section className="py-20 md:py-28 bg-light">
      <Container>
        <AnimateOnView className="text-center mb-12">
          <p className="text-accent font-oswald text-sm tracking-widest uppercase mb-2">
            Услуги
          </p>
          <h2 className="font-oswald text-3xl sm:text-4xl md:text-5xl font-bold text-text-light mb-4">
            {heading}
          </h2>
        </AnimateOnView>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10">
          {tiles.map((tile, i) => (
            <AnimateOnView key={tile.title} delay={i * 0.07} className="h-full">
              <div className="group h-full">
                <div className="p-6 sm:p-8 bg-white rounded-xl border border-transparent hover:border-accent/30 shadow-sm hover:shadow-md transition-all duration-200 h-full flex flex-col">
                  <div className="text-accent mb-5 group-hover:scale-110 transition-transform inline-block">
                    {tile.icon}
                  </div>
                  <h3 className="font-oswald text-xl sm:text-2xl font-semibold text-text-light mb-2">
                    {tile.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed mb-6 flex-1">
                    {typo(tile.desc)}
                  </p>
                  <Link
                    href={tile.href}
                    className="w-full sm:w-auto inline-flex items-center justify-center border-2 border-accent text-accent hover:bg-accent hover:text-white px-5 py-2.5 rounded font-oswald font-medium text-sm transition-all duration-200"
                  >
                    {tile.ctaLabel}
                  </Link>
                </div>
              </div>
            </AnimateOnView>
          ))}
        </div>

        {secondaryCTA && (
          <div className="text-center mt-10">
            <Link href={secondaryCTA.href}>
              <span className="text-accent font-oswald text-sm underline underline-offset-4 hover:text-accent/80 transition-colors">
                {secondaryCTA.label}
              </span>
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}
