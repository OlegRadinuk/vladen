"use client";

import Image from "next/image";
import AnimateOnView from "@/components/ui/AnimateOnView";

type Member = { name: string; role: string; photo: string | null };

// Руководство — по центру, крупно (учредитель + гендир)
const leaders: Member[] = [
  { name: "Биленчук Александр Михайлович", role: "Учредитель, собственник", photo: "/team/founder.webp" },
  { name: "Биленчук Юлия Владимировна", role: "Генеральный директор", photo: "/team/gd.webp" },
];

// Остальная команда — слайдер на мобиле / сетка на десктопе
const team: Member[] = [
  { name: "Дымов Григорий Григорьевич", role: "Заместитель по строительству", photo: "/team/deputy.webp" },
  { name: "Полончук Владимир Леонидович", role: "Главный инженер", photo: "/team/engineer.webp" },
  { name: "Комочкина Татьяна Александровна", role: "Архитектор", photo: null },
  { name: "Дуквен Ольга Александровна", role: "Дизайнер", photo: "/team/designer.webp" },
  { name: "Супиченко Зинаида Николаевна", role: "Главный бухгалтер", photo: "/team/accountant.webp" },
  { name: "Шелпакова Татьяна Валерьевна", role: "Сметчик", photo: "/team/estimator.webp" },
  { name: "Гриценко Виталий Борисович", role: "Прораб", photo: "/team/foreman.webp" },
];

function Initials({ name }: { name: string }) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2);
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent/15 to-accent/5">
      <span className="font-oswald text-4xl font-bold text-accent/80">{initials}</span>
    </div>
  );
}

function PersonCard({ member, featured = false, sizes }: { member: Member; featured?: boolean; sizes: string }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow border ${
        featured ? "border-accent/40 ring-1 ring-accent/20" : "border-black/5"
      }`}
    >
      <div className="relative aspect-[4/3]">
        {member.photo ? (
          <Image src={member.photo} alt={member.name} fill className="object-cover object-center" sizes={sizes} />
        ) : (
          <Initials name={member.name} />
        )}
      </div>
      <div className="p-4 text-center">
        <h3 className="font-oswald font-semibold text-text-light text-sm leading-snug">{member.name}</h3>
        <p className="text-text-muted text-xs mt-1">{member.role}</p>
      </div>
    </div>
  );
}

function VladCard() {
  const openVlad = () => {
    if (typeof ym !== "undefined") ym(109280535, "reachGoal", "team_vlad");
    window.dispatchEvent(new CustomEvent("vlad:open", { detail: { intent: "chat" } }));
  };
  return (
    <div className="overflow-hidden rounded-2xl bg-dark border border-accent/40 flex flex-col shadow-sm">
      <div className="relative aspect-[4/3] flex items-center justify-center bg-gradient-to-br from-[#1f1a13] to-dark">
        {/* Бейдж «онлайн» */}
        <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/15 px-2.5 py-1 text-[10px] font-inter font-semibold text-white uppercase tracking-wide">
          <span className="relative flex w-2 h-2">
            <span className="absolute inset-0 rounded-full bg-green-400 animate-ping" />
            <span className="absolute inset-[1px] rounded-full bg-green-400" />
          </span>
          Онлайн
        </span>
        {/* Аватар со свечением */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent to-amber-700 flex items-center justify-center shadow-[0_0_44px_rgba(217,119,6,0.55)]">
          <span className="font-oswald font-bold text-white text-3xl leading-none">В</span>
        </div>
      </div>
      <div className="p-4 text-center flex flex-col">
        <h3 className="font-oswald font-semibold text-white text-sm">Влад</h3>
        <p className="text-accent text-xs mt-1">ИИ-ассистент · 24/7</p>
        <button
          onClick={openVlad}
          className="mt-3 w-full rounded-lg bg-accent text-white font-oswald font-semibold text-sm py-2.5 hover:bg-amber-600 transition-colors"
        >
          Спросить
        </button>
      </div>
    </div>
  );
}

export default function TeamSection() {
  return (
    <div>
      <AnimateOnView className="text-center mb-10">
        <p className="text-accent font-oswald text-sm tracking-widest uppercase mb-2">Наша команда</p>
        <h2 className="font-oswald text-3xl md:text-4xl font-bold text-text-light">Люди, которым доверяют</h2>
      </AnimateOnView>

      {/* Руководство — по центру, крупнее */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto mb-6">
        {leaders.map((m) => (
          <AnimateOnView key={m.name}>
            <PersonCard member={m} featured sizes="(max-width: 640px) 100vw, 320px" />
          </AnimateOnView>
        ))}
      </div>

      {/* Команда — слайдер на мобиле, сетка на десктопе */}
      <div className="-mx-4 px-4 md:mx-0 md:px-0">
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 md:grid md:grid-cols-4 md:overflow-visible md:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {team.map((m) => (
            <div key={m.name} className="snap-center shrink-0 w-[70%] sm:w-[45%] md:w-auto">
              <PersonCard member={m} sizes="(max-width: 768px) 70vw, 220px" />
            </div>
          ))}
          {/* ИИ-Влад — отдельная карточка (честно: не человек, а ассистент) */}
          <div className="snap-center shrink-0 w-[70%] sm:w-[45%] md:w-auto">
            <VladCard />
          </div>
        </div>
        {/* Подсказка про свайп — только мобайл */}
        <p className="md:hidden text-center text-text-muted text-xs mt-3">← листайте команду →</p>
      </div>
    </div>
  );
}
