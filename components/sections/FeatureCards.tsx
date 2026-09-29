import { ReactNode } from "react";
import Container from "@/components/ui/Container";
import AnimateOnView from "@/components/ui/AnimateOnView";
import { typo } from "@/lib/evp-landings";

interface FeatureCard {
  icon: ReactNode; // инлайн-SVG, w-8 h-8
  title: string;
  desc: string;
}

interface FeatureCardsProps {
  accentLabel: string;   // маленькая надпись над H2
  heading: string;       // H2
  subtitle?: string;     // параграф под H2
  cards: FeatureCard[];  // 3–4 карточки
  bg?: "light" | "dark"; // default "dark"
}

export default function FeatureCards({
  accentLabel,
  heading,
  subtitle,
  cards,
  bg = "dark",
}: FeatureCardsProps) {
  const isDark = bg === "dark";
  const colsClass = cards.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";

  return (
    <section className={`py-20 md:py-28 ${isDark ? "bg-dark" : "bg-light"}`}>
      <Container>
        <AnimateOnView className="text-center mb-14">
          <p className="text-accent font-oswald text-sm tracking-widest uppercase mb-2">
            {accentLabel}
          </p>
          <h2
            className={`font-oswald text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${
              isDark ? "text-white" : "text-text-light"
            }`}
          >
            {heading}
          </h2>
          {subtitle && (
            <p className="text-text-muted max-w-xl mx-auto">{subtitle}</p>
          )}
        </AnimateOnView>

        <div
          className={`grid grid-cols-1 sm:grid-cols-2 ${colsClass} gap-6 sm:gap-10`}
        >
          {cards.map((card, i) => (
            <AnimateOnView key={card.title} delay={i * 0.07} className="h-full">
              <div
                className={`group p-6 sm:p-8 rounded-lg border hover:border-accent/30 transition-all duration-200 h-full ${
                  isDark
                    ? "bg-white/5 border-white/10"
                    : "bg-white border-transparent shadow-sm hover:shadow-md"
                }`}
              >
                <div className="text-accent mb-4 group-hover:scale-110 transition-transform inline-block">
                  {card.icon}
                </div>
                <h3
                  className={`font-oswald text-xl font-semibold mb-2 ${
                    isDark ? "text-white" : "text-text-light"
                  }`}
                >
                  {card.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {typo(card.desc)}
                </p>
              </div>
            </AnimateOnView>
          ))}
        </div>
      </Container>
    </section>
  );
}
