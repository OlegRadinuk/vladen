"use client";

import { useEffect, useCallback, useState } from "react";
import Image from "next/image";

export interface LightboxImage {
  src: string;
  alt: string;
}

interface LightboxProps {
  images: LightboxImage[];
  open: boolean;
  startIndex?: number;
  onClose: () => void;
}

export default function Lightbox({
  images,
  open,
  startIndex = 0,
  onClose,
}: LightboxProps) {
  const [index, setIndex] = useState(startIndex);

  const prev = useCallback(
    () => setIndex((i) => (i - 1 + images.length) % images.length),
    [images.length]
  );
  const next = useCallback(
    () => setIndex((i) => (i + 1) % images.length),
    [images.length]
  );

  // Sync to startIndex when (re)opened
  useEffect(() => {
    if (open) setIndex(startIndex);
  }, [open, startIndex]);

  // Body scroll lock + keyboard controls
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose, prev, next]);

  if (!open) return null;

  const current = images[index];

  return (
    <div
      className="fixed inset-0 z-[100] bg-dark/95 backdrop-blur-sm flex flex-col animate-[fadeIn_0.2s_ease]"
      role="dialog"
      aria-modal="true"
      aria-label="Просмотр фотографий"
      onClick={onClose}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 sm:px-8 py-4 shrink-0">
        <span className="font-oswald text-white/70 text-sm tracking-widest uppercase">
          {String(index + 1).padStart(2, "0")}
          <span className="text-white/25"> / </span>
          {String(images.length).padStart(2, "0")}
        </span>
        <button
          onClick={onClose}
          className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:border-accent hover:text-accent transition-colors"
          aria-label="Закрыть"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Main image */}
      <div
        className="relative flex-1 min-h-0 flex items-center justify-center px-4 sm:px-16"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Prev */}
        <button
          onClick={prev}
          className="absolute left-2 sm:left-4 z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-dark/60 border border-white/20 flex items-center justify-center text-white/70 hover:border-accent hover:text-accent transition-colors"
          aria-label="Предыдущее фото"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="relative w-full h-full">
          <Image
            key={current.src}
            src={current.src}
            alt={current.alt}
            fill
            unoptimized
            className="object-contain animate-[fadeIn_0.25s_ease]"
            sizes="100vw"
            priority
          />
        </div>

        {/* Next */}
        <button
          onClick={next}
          className="absolute right-2 sm:right-4 z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-dark/60 border border-white/20 flex items-center justify-center text-white/70 hover:border-accent hover:text-accent transition-colors"
          aria-label="Следующее фото"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Thumbnails */}
      <div
        className="shrink-0 px-4 sm:px-8 py-4 overflow-x-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex gap-2.5 justify-start sm:justify-center min-w-min mx-auto">
          {images.map((img, i) => (
            <button
              key={img.src}
              onClick={() => setIndex(i)}
              className={`relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-md overflow-hidden border-2 transition-all ${
                i === index
                  ? "border-accent opacity-100"
                  : "border-transparent opacity-50 hover:opacity-90"
              }`}
              aria-label={`Фото ${i + 1}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                unoptimized
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
