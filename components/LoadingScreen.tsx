"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useLoading } from "@/contexts/LoadingContext";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const { setIsLoading } = useLoading();

  useEffect(() => {
    const finish = () => {
      setVisible(false);
      // setIsLoading после окончания fade-out (0.4s)
      setTimeout(() => setIsLoading(false), 400);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    return () => window.removeEventListener("load", finish);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } }}
          className="fixed inset-0 z-[9999] bg-dark flex flex-col items-center justify-center gap-8"
        >
          <Image
            src="/logo.png"
            alt="Владен"
            width={160}
            height={80}
            priority
            className="h-20 w-auto object-contain"
            style={{ filter: "drop-shadow(0 0 24px rgba(217,119,6,0.35))" }}
          />
          {/* Оранжевый спиннер */}
          <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-accent animate-spin" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
