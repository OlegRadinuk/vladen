"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLoading } from "@/contexts/LoadingContext";

const MIN_DURATION = 2000; // всегда показываем минимум 2 секунды

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const { setIsLoading } = useLoading();

  useEffect(() => {
    let raf: number;
    let current = 0;
    const startTime = Date.now();

    const animateTo = (target: number, speed: number, onDone?: () => void) => {
      cancelAnimationFrame(raf);
      const step = () => {
        current += (target - current) * speed;
        setProgress(Math.round(current));
        if (Math.abs(target - current) > 0.3) {
          raf = requestAnimationFrame(step);
        } else {
          current = target;
          setProgress(target);
          onDone?.();
        }
      };
      raf = requestAnimationFrame(step);
    };

    const finish = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, MIN_DURATION - elapsed);
      setTimeout(() => {
        animateTo(100, 0.08, () => {
          setTimeout(() => { setVisible(false); setIsLoading(false); }, 400);
        });
      }, remaining);
    };

    // Фаза 1 (0→50) быстро, фаза 2 (50→90) медленно — симулируем загрузку
    // Если window.load придёт раньше — finish() прервёт и добьёт до 100%
    animateTo(50, 0.05, () => {
      animateTo(90, 0.012);
    });

    const onLoad = () => finish();

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
          className="fixed inset-0 z-[9999] bg-dark flex flex-col items-center justify-center"
        >
          <div className="flex flex-col items-center gap-4 mb-10">
            <img
              src="/logo.png"
              alt="Владен"
              className="h-24 w-auto object-contain"
              style={{ filter: "drop-shadow(0 0 20px rgba(217,119,6,0.4))" }}
            />
            <div className="text-center">
              <div className="font-oswald text-3xl font-bold text-accent tracking-widest">
                ВЛАДЕН
              </div>
              <div className="text-text-muted text-xs tracking-widest uppercase mt-1">
                Строительная компания
              </div>
            </div>
          </div>

          <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-accent rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.15, ease: "linear" }}
            />
          </div>

          <div className="mt-3 font-oswald text-xs text-text-muted tracking-widest">
            {progress}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
