"use client";

import { useEffect, useRef, useState } from "react";

const DIGIT_H = 44; // высота одной цифры в px — должна совпадать с line-height

function OdometerDigit({ digit, delay }: { digit: number; delay: number }) {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          setTimeout(() => setActive(true), delay);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className="overflow-hidden"
      style={{ height: DIGIT_H, lineHeight: `${DIGIT_H}px` }}
    >
      <div
        className="flex flex-col"
        style={{
          transform: active ? `translateY(-${digit * DIGIT_H}px)` : "translateY(0)",
          transition: active
            ? `transform ${0.6 + delay * 0.0008}ms cubic-bezier(0.23, 1, 0.32, 1)`
            : "none",
        }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
          <div key={d} style={{ height: DIGIT_H, lineHeight: `${DIGIT_H}px` }}>
            {d}
          </div>
        ))}
      </div>
    </div>
  );
}

interface OdometerProps {
  value: number;
  suffix?: string;
  className?: string;
}

export default function Odometer({ value, suffix = "", className = "" }: OdometerProps) {
  const digits = String(value).split("").map(Number);

  return (
    <span className={`inline-flex items-end ${className}`}>
      {digits.map((digit, i) => (
        <OdometerDigit
          key={i}
          digit={digit}
          delay={i * 80} // каждая следующая цифра с небольшим сдвигом
        />
      ))}
      {suffix && <span className="ml-0.5">{suffix}</span>}
    </span>
  );
}
