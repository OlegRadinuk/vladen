import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Ноутбуки с низким экраном: 1366×768 или 1920×1080 при 125–150% масштаба
      // дают ~660–730 CSS-пикселей высоты. Там первый экран нужно ужимать.
      // min-width обязателен — иначе правило поймает все телефоны и раздует
      // мобильную вёрстку, у которой свои размеры.
      screens: {
        short: { raw: "(min-width: 768px) and (max-height: 820px)" },
        // Невысокие телефоны (iPhone SE/8 — 375×667): свой, более мягкий ужим,
        // мобильные размеры шрифтов при этом не трогаем.
        "short-sm": { raw: "(max-width: 767px) and (max-height: 720px)" },
      },
      colors: {
        dark: "#2A2F35",
        light: "#ECF0F1",
        accent: "#D97706",
        "text-dark": "#D1D5DB",
        "text-light": "#2C3E50",
        "text-muted": "#7F8C8D",
      },
      fontFamily: {
        oswald: ["var(--font-oswald)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
