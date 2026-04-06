"use client";

import { useState, useEffect } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => {
        // Lenis перехватывает window.scrollTo, используем событие которое он слушает
        window.dispatchEvent(new CustomEvent("lenis-scroll-to-top"));
        // Фолбэк если Lenis не активен
        document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
      }}
      aria-label="Наверх"
      className={`hidden md:flex fixed bottom-8 right-8 z-50 w-11 h-11 items-center justify-center rounded-full bg-accent text-white shadow-lg hover:bg-accent/80 transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}
