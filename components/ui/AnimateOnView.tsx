"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface AnimateOnViewProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  duration?: number;
}

export default function AnimateOnView({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.55,
}: AnimateOnViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Положительный нижний margin — элемент «появляется» ещё до входа в кадр,
  // чтобы на мобиле контент не ждали, а он уже готов при доскролле.
  const isInView = useInView(ref, { once: true, margin: "0px 0px 120px 0px" });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 36 : 0,
      x: direction === "left" ? -40 : direction === "right" ? 40 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
