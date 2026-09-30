"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import LeadForm, { type LeadFormStatus } from "@/components/forms/LeadForm";
import Button from "@/components/ui/Button";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/company";

interface ConsultModalProps {
  open: boolean;
  onClose: () => void;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Модалка «Получить консультацию» — открывается из шапки на любой странице.
 * Форма та же, что в секции Contacts (LeadForm), source = "consult-modal".
 * Мобайл: нижний лист на всю ширину; ≥640px — центрированная карточка.
 */
export default function ConsultModal({ open, onClose }: ConsultModalProps) {
  const reduce = useReducedMotion();

  return (
    <AnimatePresence>
      {open ? <ConsultDialog key="consult" onClose={onClose} reduce={!!reduce} /> : null}
    </AnimatePresence>
  );
}

interface ConsultDialogProps {
  onClose: () => void;
  reduce: boolean;
}

function ConsultDialog({ onClose, reduce }: ConsultDialogProps) {
  const titleId = useId();
  const descId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  // Пока заявка отправляется, модалку закрыть нельзя: иначе человек не увидит
  // ни «успех», ни ошибку с телефоном и не узнает, дошла ли заявка.
  const [busy, setBusy] = useState(false);
  const busyRef = useRef(false);
  const handleStatus = useCallback((status: LeadFormStatus) => {
    busyRef.current = status === "loading";
    setBusy(status === "loading");
  }, []);
  const requestClose = useCallback(() => {
    if (!busyRef.current) onClose();
  }, [onClose]);

  // Фокус в поле имени, блокировка скролла фона (Lenis + нативный), Esc, фокус-ловушка
  useEffect(() => {
    nameRef.current?.focus({ preventScroll: true });

    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    const prevPadding = html.style.paddingRight;
    const scrollbar = window.innerWidth - html.clientWidth;
    html.style.overflow = "hidden";
    if (scrollbar > 0) html.style.paddingRight = `${scrollbar}px`;
    window.dispatchEvent(new CustomEvent("lenis-stop"));

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        requestClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const nodes = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || !dialogRef.current.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !dialogRef.current.contains(active))) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      html.style.overflow = prevOverflow;
      html.style.paddingRight = prevPadding;
      window.dispatchEvent(new CustomEvent("lenis-start"));
    };
  }, [requestClose]);

  const dur = reduce ? 0 : 0.25;

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center sm:p-6">
      {/* Подложка — клик закрывает */}
      <motion.div
        data-testid="consult-backdrop"
        className="absolute inset-0 bg-dark/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: dur }}
        onClick={requestClose}
        aria-hidden="true"
      />

      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        aria-busy={busy}
        data-lenis-prevent
        className="relative w-full sm:max-w-lg max-h-[92dvh] overflow-y-auto overscroll-contain bg-light rounded-t-2xl sm:rounded-2xl shadow-2xl px-5 pt-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] sm:p-8"
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: dur, ease: "easeOut" }}
      >
        <button
          type="button"
          onClick={requestClose}
          disabled={busy}
          aria-label="Закрыть"
          className="absolute top-3 right-3 w-11 h-11 flex items-center justify-center rounded-full text-text-muted hover:text-text-light hover:bg-black/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <p className="text-accent font-oswald text-sm tracking-widest uppercase mb-2 pr-12">
          Бесплатная консультация
        </p>
        <h2 id={titleId} className="font-oswald text-2xl sm:text-3xl font-bold text-text-light mb-2 pr-12">
          Получить консультацию
        </h2>
        <p id={descId} className="text-text-muted text-sm sm:text-base leading-relaxed mb-5 sm:mb-6">
          Оставьте телефон — перезвоним в течение 30 минут и ответим на вопросы по ремонту или строительству.
        </p>

        <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-6">
          <LeadForm
            source="consult-modal"
            submitLabel="Получить консультацию"
            errorTestId="consult-error"
            nameInputRef={nameRef}
            onStatusChange={handleStatus}
            successAction={
              <Button type="button" variant="outline" size="md" className="mt-6" onClick={onClose} autoFocus>
                Закрыть
              </Button>
            }
          />
        </div>

        <p className="mt-4 text-center text-sm text-text-muted">
          Или позвоните:{" "}
          <a
            href={PHONE_HREF}
            className="font-semibold text-text-light hover:text-accent transition-colors whitespace-nowrap"
            onClick={() => {
              if (typeof ym !== "undefined") ym(109280535, "reachGoal", "phone_click");
            }}
          >
            {PHONE_DISPLAY}
          </a>
        </p>
      </motion.div>
    </div>
  );
}
