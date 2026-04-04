import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import AnimateOnView from "@/components/ui/AnimateOnView";
import Contacts from "@/components/sections/Contacts";

export const metadata: Metadata = {
  title: "О компании",
  description:
    "О строительной компании Владен. 18 лет опыта в Крыму. Наша команда, ценности и подход к работе.",
  openGraph: {
    title: "О компании — Владен",
    description: "18 лет строительного опыта в Крыму.",
  },
};

const team = [
  { name: "Владимир Денисов", role: "Основатель и директор", exp: "18 лет" },
  { name: "Алексей Кравцов", role: "Главный инженер", exp: "15 лет" },
  { name: "Сергей Петров", role: "Прораб", exp: "12 лет" },
  { name: "Марина Соколова", role: "Дизайнер интерьеров", exp: "10 лет" },
];

const milestones = [
  { year: "2005", event: "Основание компании в Симферополе" },
  { year: "2008", event: "Первый крупный коммерческий объект" },
  { year: "2012", event: "100-й реализованный проект" },
  { year: "2016", event: "Расширение в Ялту, Севастополь и Керчь" },
  { year: "2020", event: "Запуск отдела дизайна интерьеров" },
  { year: "2023", event: "200-й реализованный объект" },
];

function PlaceholderAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
  return (
    <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-3">
      <span className="font-oswald text-2xl font-bold text-accent">{initials}</span>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-dark pt-32 pb-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="font-oswald text-4xl md:text-6xl font-bold text-white mb-6">
              О компании
            </h1>
            <p className="text-text-dark text-lg leading-relaxed">
              Владен — строительная компания полного цикла. С 2005 года мы
              строим дома, делаем ремонт и облагораживаем территории по всему
              Крыму. Наш принцип прост: делать работу так, как делали бы для
              себя.
            </p>
          </div>
        </Container>
      </div>

      {/* Story */}
      <div className="bg-light py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Left: text */}
            <AnimateOnView direction="left">
              <p className="text-accent font-oswald text-sm tracking-widest uppercase mb-2">
                Наша история
              </p>
              <h2 className="font-oswald text-3xl md:text-4xl font-bold text-text-light mb-6">
                18 лет строим Крым
              </h2>
              <div className="space-y-4 text-text-muted leading-relaxed">
                <p>
                  Компания основана в 2005 году в Симферополе. Начинали с
                  небольшой команды — прораб, несколько монтажников и огромное
                  желание строить качественно.
                </p>
                <p>
                  Сегодня в штате 45 специалистов: инженеры, архитекторы,
                  прорабы, монтажники, отделочники. Работаем в Симферополе,
                  Ялте, Севастополе, Керчи, Евпатории и Бахчисарае.
                </p>
                <p>
                  За 18 лет реализовали более 200 объектов: от небольших дач до
                  коммерческих комплексов. Каждый проект — это новая
                  ответственность и возможность стать лучше.
                </p>
              </div>
            </AnimateOnView>

            {/* Right: timeline */}
            <AnimateOnView direction="right">
              <div className="space-y-4">
                {milestones.map((m, i) => (
                  <div key={m.year} className="flex gap-4 items-start">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0">
                        <span className="text-white font-oswald text-xs font-bold">
                          {m.year.slice(2)}
                        </span>
                      </div>
                      {i < milestones.length - 1 && (
                        <div className="w-0.5 h-full bg-accent/20 mt-1 flex-1 min-h-[1.5rem]" />
                      )}
                    </div>
                    <div className="pt-2 pb-4">
                      <span className="text-accent font-oswald font-semibold text-sm">
                        {m.year}
                      </span>
                      <p className="text-text-light text-sm mt-0.5">{m.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimateOnView>
          </div>

          {/* Team */}
          <div>
            <AnimateOnView className="text-center mb-10">
              <p className="text-accent font-oswald text-sm tracking-widest uppercase mb-2">
                Наша команда
              </p>
              <h2 className="font-oswald text-3xl md:text-4xl font-bold text-text-light">
                Люди, которым доверяют
              </h2>
            </AnimateOnView>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {team.map((member, i) => (
                <AnimateOnView key={member.name} delay={i * 0.1}>
                  <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <PlaceholderAvatar name={member.name} />
                    <h3 className="font-oswald font-semibold text-text-light">
                      {member.name}
                    </h3>
                    <p className="text-text-muted text-sm mt-1">{member.role}</p>
                    <p className="text-accent text-xs mt-1">Опыт: {member.exp}</p>
                  </div>
                </AnimateOnView>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* Values */}
      <div className="bg-dark py-20">
        <Container>
          <AnimateOnView className="text-center mb-12">
            <h2 className="font-oswald text-3xl md:text-4xl font-bold text-white mb-4">
              Наши ценности
            </h2>
          </AnimateOnView>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                title: "Честность",
                desc: "Говорим правду о сроках и стоимости. Не обещаем невозможного.",
              },
              {
                title: "Качество",
                desc: "Не сдаём объект, пока сами не удовлетворены результатом.",
              },
              {
                title: "Ответственность",
                desc: "Берём ответственность за каждый элемент работы. Никаких отговорок.",
              },
            ].map((v, i) => (
              <AnimateOnView key={v.title} delay={i * 0.1}>
                <div className="p-6 border border-white/10 rounded-lg text-center hover:border-accent/40 transition-colors">
                  <h3 className="font-oswald text-xl font-semibold text-accent mb-3">
                    {v.title}
                  </h3>
                  <p className="text-text-dark text-sm leading-relaxed">{v.desc}</p>
                </div>
              </AnimateOnView>
            ))}
          </div>
        </Container>
      </div>

      <Contacts />
    </>
  );
}
