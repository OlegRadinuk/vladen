"use client";

import { useState, useEffect } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

type CalcData = {
  service: string;
  area: number;
  material: string;
  total: number;
};

type Status = "idle" | "loading" | "success" | "error";

function validatePhone(phone: string) {
  const cleaned = phone.replace(/\D/g, "");
  return cleaned.length >= 11;
}

function formatPhone(value: string): string {
  // Оставляем только цифры
  let digits = value.replace(/\D/g, "");

  // Если начинается с 8 — меняем на 7
  if (digits.startsWith("8")) digits = "7" + digits.slice(1);
  // Если начинается с 9 (например, 978...) — добавляем 7
  if (digits.startsWith("9")) digits = "7" + digits;
  // Обрезаем до 11 цифр
  digits = digits.slice(0, 11);

  // Форматируем: +7 (978) 123-45-67
  let result = "+7";
  if (digits.length > 1) result += " (" + digits.slice(1, 4);
  if (digits.length >= 4) result += ") " + digits.slice(4, 7);
  if (digits.length >= 7) result += "-" + digits.slice(7, 9);
  if (digits.length >= 9) result += "-" + digits.slice(9, 11);

  return result;
}

export default function Contacts() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+7 ");
  const [phoneError, setPhoneError] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [calcData, setCalcData] = useState<CalcData | null>(null);

  useEffect(() => {
    const readCalc = () => {
      try {
        const raw = localStorage.getItem("vladen_calc");
        setCalcData(raw ? JSON.parse(raw) : null);
      } catch {}
    };
    // Слушаем обновления от калькулятора на этой же странице
    window.addEventListener("vladen_calc_update", readCalc);
    return () => window.removeEventListener("vladen_calc_update", readCalc);
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
    setPhoneError("");
  };

  const handlePhoneFocus = () => {
    if (phone === "+7 " || phone === "+7") setPhone("+7 ");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError("");

    if (!validatePhone(phone)) {
      setPhoneError("Введите корректный номер телефона");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, calc: calcData }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setName("");
      setPhone("+7 ");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contacts" className="py-20 md:py-28 bg-light">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left info */}
          <div>
            <p className="text-accent font-oswald text-sm tracking-widest uppercase mb-2">
              Свяжитесь с нами
            </p>
            <h2 className="font-oswald text-3xl sm:text-4xl md:text-5xl font-bold text-text-light mb-6">
              Обсудим ваш проект
            </h2>
            <p className="text-text-muted leading-relaxed mb-8">
              Оставьте заявку — перезвоним в течение 30 минут. Консультация
              бесплатна. Выезд специалиста для оценки объёма работ — тоже.
            </p>

            <div className="space-y-4">
              <a
                href="tel:+79787174447"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-200">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div className="text-text-muted text-xs">Телефон</div>
                  <div className="text-text-light font-medium group-hover:text-accent transition-colors">
                    +7 (978) 717-44-47
                  </div>
                </div>
              </a>

              <a
                href="mailto:vladen2026@mail.ru"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-200">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-text-muted text-xs">Email</div>
                  <div className="text-text-light font-medium group-hover:text-accent transition-colors">
                    vladen2026@mail.ru
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-text-muted text-xs">Офис</div>
                  <a
                    href="https://yandex.com/maps/org/vladen/111586244168/?ll=80.925822%2C47.800786&z=3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-light font-medium hover:text-accent transition-colors"
                  >
                    г. Симферополь, ул. Киевская 41, офис 727
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
            <h3 className="font-oswald text-2xl font-semibold text-text-light mb-6">
              Оставить заявку
            </h3>

            {status === "success" ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-oswald text-xl font-semibold text-text-light mb-2">
                  Заявка отправлена!
                </p>
                <p className="text-text-muted">
                  Перезвоним вам в течение 30 минут.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-text-muted text-sm mb-1.5">
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Иван Иванов"
                    required
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-text-light focus:outline-none focus:border-accent transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-text-muted text-sm mb-1.5">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    onFocus={handlePhoneFocus}
                    onKeyDown={handlePhoneKeyDown}
                    placeholder="+7 (978) 123-45-67"
                    required
                    className={`w-full border rounded-lg px-4 py-3 text-text-light focus:outline-none transition-colors ${
                      phoneError
                        ? "border-red-400 focus:border-red-400"
                        : "border-gray-200 focus:border-accent"
                    }`}
                  />
                  {phoneError && (
                    <p className="text-red-500 text-xs mt-1">{phoneError}</p>
                  )}
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
                  <p className="text-red-500 text-sm">
                    Ошибка отправки. Пожалуйста, позвоните нам напрямую.
                  </p>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Отправка..." : "Отправить заявку"}
                </Button>

                <p className="text-text-muted text-xs text-center">
                  Нажимая кнопку, вы соглашаетесь с обработкой персональных
                  данных
                </p>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
