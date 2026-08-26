"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "@/components/ui/Lightbox";
import type { GalleryGroup } from "@/lib/projects";

interface ProjectGalleryProps {
  groups: GalleryGroup[];
  /** Заголовок секции — можно переопределить на странице надзора */
  heading?: string;
  subheading?: string;
  /**
   * cover — кадрируем под сетку (рендеры, фото объектов).
   * contain — показываем целиком (чертежи с пометками, где нельзя резать края).
   */
  fit?: "cover" | "contain";
}

export default function ProjectGallery({
  groups,
  heading = "Галерея объекта",
  subheading,
  fit = "cover",
}: ProjectGalleryProps) {
  const [active, setActive] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const group = groups[active] ?? groups[0];
  if (!group) return null;

  const total = groups.reduce((sum, g) => sum + g.images.length, 0);
  const showTabs = groups.length > 1;

  return (
    <section className="bg-dark py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-10">
          <h2 className="font-oswald text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            {heading}
          </h2>
          <p className="text-text-muted text-sm mt-2">
            {subheading ?? `${total} фото. Нажмите на кадр, чтобы открыть крупно.`}
          </p>
        </div>

        {showTabs && (
          <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-3 mb-6 sm:mb-8 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x">
            {groups.map((g, i) => (
              <button
                key={g.title}
                onClick={() => {
                  // индекс лайтбокса относится к текущей группе — сбрасываем при смене
                  setLightboxIndex(null);
                  setActive(i);
                }}
                className={`shrink-0 snap-start rounded-full border px-4 py-2 text-xs sm:text-sm font-oswald tracking-wide transition-colors ${
                  i === active
                    ? "border-accent bg-accent text-white"
                    : "border-white/20 text-text-dark hover:border-accent hover:text-accent"
                }`}
              >
                {g.title}
                <span className="ml-2 opacity-60">{g.images.length}</span>
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {group.images.map((img, i) => (
            <figure key={img.src} className="flex flex-col">
              <button
                onClick={() => setLightboxIndex(i)}
                className={`group relative w-full overflow-hidden rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-accent ${
                  fit === "contain" ? "aspect-[4/3]" : "aspect-[3/4]"
                }`}
                aria-label={`Открыть фото: ${img.alt}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className={`transition-transform duration-500 group-hover:scale-105 ${
                    fit === "contain" ? "object-contain p-1" : "object-cover"
                  }`}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <span className="absolute inset-0 bg-dark/0 group-hover:bg-dark/20 transition-colors" />
              </button>
              {img.caption && (
                <figcaption className="mt-2 text-text-muted text-[11px] sm:text-xs leading-snug">
                  {img.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>

      <Lightbox
        images={group.images}
        open={lightboxIndex !== null}
        startIndex={lightboxIndex ?? 0}
        onClose={() => setLightboxIndex(null)}
      />
    </section>
  );
}
