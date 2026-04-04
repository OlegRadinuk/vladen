"use client";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import AnimateOnView from "@/components/ui/AnimateOnView";
import Link from "next/link";

function PlaceholderImage({ label }: { label: string }) {
  return (
    <div className="w-full h-full min-h-[220px] bg-gray-700/50 flex flex-col items-center justify-center gap-2">
      <svg
        className="w-14 h-14 text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M9 22V12h6v10"
        />
      </svg>
      <span className="text-gray-500 text-xs">{label}</span>
    </div>
  );
}

const stats = [
  { value: "280 м²", label: "Площадь дома" },
  { value: "8 мес", label: "Срок строительства" },
  { value: "2023", label: "Год сдачи" },
];

export default function ProjectCase() {
  return (
    <section id="projects" className="py-20 md:py-28 bg-dark">
      <Container>
        {/* Header */}
        <AnimateOnView className="text-center mb-14">
          <p className="text-accent font-oswald text-sm tracking-widest uppercase mb-2">
            Реализованный проект
          </p>
          <h2 className="font-oswald text-3xl md:text-5xl font-bold text-white mb-4">
            Кейс: Дом в Симферополе
          </h2>
          <p className="text-text-dark max-w-xl mx-auto">
            Двухэтажный дом из газобетона с полной отделкой и инженерными
            системами под ключ
          </p>
        </AnimateOnView>

        {/* Gallery + info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Images */}
          <AnimateOnView direction="left" className="grid grid-cols-2 gap-3">
            <div className="col-span-2 rounded-lg overflow-hidden h-56">
              <PlaceholderImage label="Фасад дома" />
            </div>
            <div className="rounded-lg overflow-hidden h-40">
              <PlaceholderImage label="Интерьер" />
            </div>
            <div className="rounded-lg overflow-hidden h-40">
              <PlaceholderImage label="Кухня" />
            </div>
          </AnimateOnView>

          {/* Info */}
          <AnimateOnView direction="right">
            <div className="grid grid-cols-3 gap-4 mb-8">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="text-center p-4 bg-white/5 rounded-lg border border-white/10"
                >
                  <div className="font-oswald text-2xl font-bold text-accent mb-1">
                    {s.value}
                  </div>
                  <div className="text-text-muted text-xs">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="space-y-4 mb-8">
              {[
                "Разработка индивидуального проекта под требования заказчика",
                "Закладка монолитного фундамента с геологическим исследованием",
                "Возведение стен из газобетонных блоков D500",
                "Монтаж металлочерепицы и системы водоотведения",
                "Полная черновая и чистовая отделка всех помещений",
                "Прокладка электрики, водоснабжения и отопления",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                  <span className="text-text-dark text-sm">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <Link href="/projects">
                <Button>Все проекты</Button>
              </Link>
              <Button
                variant="outline"
                onClick={() =>
                  document
                    .getElementById("contacts")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Хочу так же
              </Button>
            </div>
          </AnimateOnView>
        </div>
      </Container>
    </section>
  );
}
