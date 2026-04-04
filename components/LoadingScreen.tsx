"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate progress
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 90) {
          clearInterval(interval);
          return 90;
        }
        return p + Math.random() * 15;
      });
    }, 150);

    // Hide on DOMContentLoaded (не ждём видео и тяжёлые ресурсы)
    const finish = () => {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => setVisible(false), 350);
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", finish, { once: true });
    } else {
      // DOM уже готов
      setTimeout(finish, 600);
    }

    return () => {
      clearInterval(interval);
      document.removeEventListener("DOMContentLoaded", finish);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-dark flex flex-col items-center justify-center"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-4 mb-10"
          >
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
          </motion.div>

          {/* Progress bar */}
          <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-accent rounded-full"
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
