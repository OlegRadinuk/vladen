"use client";

import { useEffect, useId, useState, type Ref } from "react";
import Button from "@/components/ui/Button";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/company";
import { isValidRuPhone, normalizeRuPhoneInput } from "@/lib/phone";

/**
 * Общая форма заявки (имя + телефон + согласие на ПД) → POST /api/telegram.
 * Используется в секции Contacts и в модалке «Получить консультацию».
 * Формат тела запроса един для обоих мест: { name, phone, calc, source, consent_timestamp }.
 */

type CalcData = {
  service: string;
  area: number;
  material: string;
  total: number;
};

export type LeadFormStatus = "idle" | "loading" | "success" | "error";

export interface LeadFormProps {
  /** Сообщает статус наверх — модалка не даёт закрыть себя, пока идёт отправка */
  onStatusChange?: (status: LeadFormStatus) => void;
  source?: string;
  submitLabel?: string;
  /** Подхватывать расчёт калькулятора (событие vladen_calc_update) — как в секции Contacts */
  withCalc?: boolean;
  /** data-testid для блока ошибки */
  errorTestId?: string;
  /** ref на поле имени — модалка ставит туда фокус при открытии */
  nameInputRef?: Ref<HTMLInputElement>;
  /** Доп. контент под сообщением об успехе (например, кнопка «Закрыть» в модалке) */
  successAction?: React.ReactNode;
}

export default function LeadForm({
  source,
  submitLabel = "Отправить заявку",
  withCalc = false,
  errorTestId,
  nameInputRef,
  successAction,
  onStatusChange,
}: LeadFormProps) {
  const uid = useId();
  const nameId = `${uid}-name`;
  const phoneId = `${uid}-phone`;
  const phoneErrId = `${uid}-phone-err`;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [status, setStatus] = useState<LeadFormStatus>("idle");
  const [calcData, setCalcData] = useState<CalcData | null>(null);
  const [pdConsent, setPdConsent] = useState(false);

  useEffect(() => {
    onStatusChange?.(status);
  }, [status, onStatusChange]);

  useEffect(() => {
    if (!withCalc) return;
    const readCalc = () => {
      try {
        const raw = localStorage.getItem("vladen_calc");
        setCalcData(raw ? JSON.parse(raw) : null);
      } catch {}
    };
    // Слушаем обновления от калькулятора на этой же странице
    window.addEventListener("vladen_calc_update", readCalc);
    return () => window.removeEventListener("vladen_calc_update", readCalc);
  }, [withCalc]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(normalizeRuPhoneInput(e.target.value, phone));
    setPhoneError("");
  };

  const handlePhoneFocus = () => {
    if (phone === "") setPhone("+7 ");
  };

  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Не даём удалить "+7 " префикс
    if (
      (e.key === "Backspace" || e.key === "Delete") &&
      phone.replace(/\D/g, "").length <= 1
    ) {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!pdConsent) return;
    setPhoneError("");

    if (!isValidRuPhone(phone)) {
      setPhoneError("Введите корректный номер телефона");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, calc: calcData, source, consent_timestamp: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      if (typeof ym !== "undefined") ym(109280535, "reachGoal", "form_submit");
      setName("");
      setPhone("");
      setPdConsent(false);
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-8" role="status" aria-live="polite">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="font-oswald text-xl font-semibold text-text-light mb-2">
          Заявка отправлена!
        </p>
        <p className="text-text-muted">
          Перезвоним вам в течение 30 минут.
        </p>
        {successAction}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor={nameId} className="block text-text-muted text-sm mb-1.5">
          Ваше имя
        </label>
        <input
          ref={nameInputRef}
          id={nameId}
          type="text"
          name="name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Иван Иванов"
          required
          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-text-light focus:outline-none focus:border-accent transition-colors"
        />
      </div>

      <div>
        <label htmlFor={phoneId} className="block text-text-muted text-sm mb-1.5">
          Телефон
        </label>
        <input
          id={phoneId}
          type="tel"
          name="phone"
          autoComplete="tel"
          inputMode="tel"
          value={phone}
          onChange={handlePhoneChange}
          onFocus={handlePhoneFocus}
          onKeyDown={handlePhoneKeyDown}
          placeholder="+7 (978) 123-45-67"
          required
          aria-invalid={phoneError ? true : undefined}
          aria-describedby={phoneError ? phoneErrId : undefined}
          className={`w-full border rounded-lg px-4 py-3 text-text-light focus:outline-none transition-colors ${
            phoneError
              ? "border-red-400 focus:border-red-400"
              : "border-gray-200 focus:border-accent"
          }`}
        />
        <div aria-live="polite">
          {phoneError ? (
            <p id={phoneErrId} className="text-red-500 text-xs mt-1">{phoneError}</p>
          ) : null}
        </div>
      </div>

      {calcData && (
        <div className="relative bg-accent/8 border border-accent/25 rounded-lg px-4 py-3 text-sm">
          <button
            type="button"
            onClick={() => setCalcData(null)}
            className="absolute top-2 right-2 text-text-muted hover:text-text-light transition-colors"
            aria-label="Убрать расчёт"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <p className="text-text-muted text-xs mb-1 font-medium uppercase tracking-wide">Ваш расчёт из калькулятора</p>
          <div className="text-text-light space-y-0.5">
            <p>Вид работ: <span className="font-medium">{calcData.service}</span></p>
            <p>Площадь: <span className="font-medium">{calcData.area} м²</span></p>
            <p>Класс материалов: <span className="font-medium">{calcData.material}</span></p>
            <p>Ориентировочная стоимость: <span className="font-medium text-accent">от {new Intl.NumberFormat("ru-RU").format(calcData.total)} ₽</span></p>
          </div>
        </div>
      )}

      {status === "error" && (
        <p className="text-red-500 text-sm" role="alert" data-testid={errorTestId}>
          Ошибка отправки. Пожалуйста, позвоните нам напрямую:{" "}
          <a href={PHONE_HREF} className="underline font-semibold whitespace-nowrap">
            {PHONE_DISPLAY}
          </a>
        </p>
      )}

      <label className="flex items-start gap-2 text-xs text-text-muted cursor-pointer">
        <input
          type="checkbox"
          checked={pdConsent}
          onChange={(e) => setPdConsent(e.target.checked)}
          className="mt-0.5 flex-shrink-0 accent-accent"
        />
        <span>
          Согласен на обработку персональных данных в соответствии с{" "}
          <a
            href="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-accent transition-colors"
          >
            Политикой конфиденциальности
          </a>
        </span>
      </label>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={status === "loading" || !pdConsent}
      >
        {status === "loading" ? "Отправка..." : submitLabel}
      </Button>
    </form>
  );
}
