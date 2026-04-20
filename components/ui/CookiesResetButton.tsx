"use client";

const STORAGE_KEY = "vladen_cookie_consent_v1";

export default function CookiesResetButton() {
  function handleReset(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // localStorage may be unavailable
    }
    window.location.reload();
  }

  return (
    <button
      onClick={handleReset}
      className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white text-sm font-semibold rounded-lg hover:bg-accent/90 transition-colors"
    >
      Сбросить настройки cookie
    </button>
  );
}
