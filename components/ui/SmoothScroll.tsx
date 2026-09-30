"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    const scrollToTop = () => lenis.scrollTo(0, { duration: 1.2 });
    window.addEventListener("lenis-scroll-to-top", scrollToTop);

    // Блокировка скролла фона (модалки): lenis.stop()/start() через события,
    // чтобы не тащить инстанс Lenis в контекст.
    const stop = () => lenis.stop();
    const start = () => lenis.start();
    window.addEventListener("lenis-stop", stop);
    window.addEventListener("lenis-start", start);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("lenis-scroll-to-top", scrollToTop);
      window.removeEventListener("lenis-stop", stop);
      window.removeEventListener("lenis-start", start);
      lenis.destroy();
    };
  }, []);

  return null;
}
