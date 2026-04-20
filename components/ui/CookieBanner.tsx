"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "vladen_cookie_consent_v1";
const CONSENT_VERSION = "1.0";

interface Consent {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  version: string;
  timestamp: string;
}

function saveConsent(consent: Consent): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  } catch {
    // localStorage may be unavailable in some environments
  }
}

function loadConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Consent;
  } catch {
    return null;
  }
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const stored = loadConsent();
    if (!stored) {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  function acceptAll(): void {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
      version: CONSENT_VERSION,
      timestamp: new Date().toISOString(),
    });
    setVisible(false);
  }

  function acceptNecessary(): void {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
      version: CONSENT_VERSION,
      timestamp: new Date().toISOString(),
    });
    setVisible(false);
  }

  function saveCustom(): void {
    saveConsent({
      necessary: true,
      analytics,
      marketing,
      version: CONSENT_VERSION,
      timestamp: new Date().toISOString(),
    });
    setVisible(false);
  }

  return (
    <div
      role="dialog"
      aria-label="Настройки cookie"
      aria-modal="false"
      className="fixed bottom-0 left-0 right-0 z-50 bg-dark border-t border-white/10 shadow-2xl"
    >
      <div className="max-w-5xl mx-auto px-4 py-4 md:py-5">
        {!showSettings ? (
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <p className="text-text-dark text-sm leading-relaxed flex-1">
              Мы используем cookie для корректной работы сайта и анализа посещаемости.
              Подробнее —{" "}
              <a
                href="/cookies"
                className="text-accent underline hover:text-accent/80 transition-colors"
              >
                Политика cookie
              </a>
              .
            </p>
            <div className="flex flex-wrap gap-2 shrink-0">
              <button
                onClick={() => setShowSettings(true)}
                className="px-4 py-2 text-xs font-semibold text-text-dark border border-white/20 rounded-lg hover:border-white/40 transition-colors"
              >
                Настроить
              </button>
              <button
                onClick={acceptNecessary}
                className="px-4 py-2 text-xs font-semibold text-text-dark border border-white/20 rounded-lg hover:border-white/40 transition-colors"
              >
                Только необходимые
              </button>
              <button
                onClick={acceptAll}
                className="px-4 py-2 text-xs font-semibold bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
              >
                Принять все
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-text-dark text-sm leading-relaxed">
              Выберите, какие cookie вы разрешаете использовать. Необходимые cookie всегда активны — они обеспечивают работу сайта.
            </p>
            <div className="space-y-3">
              {/* Necessary — always on, disabled */}
              <label className="flex items-center justify-between gap-4 p-3 rounded-lg bg-white/5">
                <div>
                  <span className="text-white text-sm font-semibold">Необходимые</span>
                  <p className="text-text-muted text-xs mt-0.5">
                    Обеспечивают базовую работу сайта. Обязательны и не могут быть отключены.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={true}
                  disabled
                  className="w-4 h-4 accent-accent opacity-60 cursor-not-allowed"
                  aria-label="Необходимые cookie — всегда включены"
                />
              </label>

              {/* Analytics */}
              <label className="flex items-center justify-between gap-4 p-3 rounded-lg bg-white/5 cursor-pointer hover:bg-white/10 transition-colors">
                <div>
                  <span className="text-white text-sm font-semibold">Аналитические</span>
                  <p className="text-text-muted text-xs mt-0.5">
                    Помогают понять, как пользователи взаимодействуют с сайтом (обезличенно).
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="w-4 h-4 accent-accent cursor-pointer"
                  aria-label="Аналитические cookie"
                />
              </label>

              {/* Marketing */}
              <label className="flex items-center justify-between gap-4 p-3 rounded-lg bg-white/5 cursor-pointer hover:bg-white/10 transition-colors">
                <div>
                  <span className="text-white text-sm font-semibold">Маркетинговые</span>
                  <p className="text-text-muted text-xs mt-0.5">
                    Используются для показа релевантной рекламы и отслеживания конверсий.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  className="w-4 h-4 accent-accent cursor-pointer"
                  aria-label="Маркетинговые cookie"
                />
              </label>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 text-xs font-semibold text-text-dark border border-white/20 rounded-lg hover:border-white/40 transition-colors"
              >
                Назад
              </button>
              <button
                onClick={saveCustom}
                className="px-4 py-2 text-xs font-semibold bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
              >
                Сохранить настройки
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
