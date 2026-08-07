"use client";

import { useEffect, useState } from "react";

/**
 * Мобильный залипающий бар с двумя CTA — как на лендинге ПроГаза.
 * Скрыт в герое (чтобы не дублировать hero-кнопки), выезжает снизу
 * при скролле после первого экрана. Primary — Влад (крутит воронку),
 * secondary — расчёт стоимости. При монтировании прячет плавающий FAB
 * чата, чтобы не было двух входов и перекрытия.
 */
export default function MobileCTABar() {
  const [visible, setVisible] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Показываем, когда ушли из героя (прокрутили ~60% первого экрана)
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Прячем бар, пока открыто окно чата — чтобы не перекрывать
  useEffect(() => {
    const onChat = (e: Event) => setChatOpen(!!(e as CustomEvent).detail?.open);
    window.addEventListener("vlad:chat", onChat as EventListener);
    return () => window.removeEventListener("vlad:chat", onChat as EventListener);
  }, []);

  const openVlad = () => {
    if (typeof ym !== "undefined") ym(109280535, "reachGoal", "sticky_assistant");
    window.dispatchEvent(new CustomEvent("vlad:open", { detail: { intent: "chat" } }));
  };

  const goCalc = () => {
    if (typeof ym !== "undefined") ym(109280535, "reachGoal", "sticky_calc");
    document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* На мобиле плавающий чат-пилюля и bubble прячутся — их роль берёт бар */}
      <style>{`@media (max-width: 767px){ #vlad-fab, #vlad-bubble { display: none !important; } }`}</style>

      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 z-40 bg-dark/95 backdrop-blur-md border-t border-white/10 shadow-[0_-6px_20px_rgba(0,0,0,0.28)] transition-[transform,opacity] duration-300 ease-out ${
          visible && !chatOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
        }`}
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="grid grid-cols-2 gap-2.5 px-3 pt-2.5 pb-2.5">
          {/* Secondary — рассчитать стоимость (призрак: прозрачный + обводка) */}
          <button
            onClick={goCalc}
            className="h-[52px] flex items-center justify-center gap-2 rounded-xl bg-transparent border border-white/25 text-white font-oswald font-semibold text-sm active:scale-[0.97] transition-transform"
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px] text-accent" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="2" width="16" height="20" rx="2" />
              <line x1="8" y1="6" x2="16" y2="6" />
              <line x1="8" y1="10" x2="10" y2="10" />
              <line x1="14" y1="10" x2="16" y2="10" />
              <line x1="8" y1="14" x2="10" y2="14" />
              <line x1="14" y1="14" x2="16" y2="14" />
            </svg>
            Рассчитать
          </button>

          {/* Primary — ИИ-ассистент (акцент цветом, ширина равная) */}
          <button
            onClick={openVlad}
            className="h-[52px] flex items-center justify-center gap-2 rounded-xl bg-accent text-white font-oswald font-semibold text-sm shadow-lg shadow-accent/30 active:scale-[0.97] transition-transform"
          >
            <span className="relative flex-shrink-0 w-2.5 h-2.5">
              <span className="absolute inset-0 rounded-full bg-green-400 animate-ping" />
              <span className="absolute inset-[1px] rounded-full bg-green-400" />
            </span>
            ИИ-ассистент
          </button>
        </div>
      </div>
    </>
  );
}
