"use client";

import Container from "@/components/ui/Container";
import LeadForm from "@/components/forms/LeadForm";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/company";

interface ContactsProps {
  heading?: string;
  subtitle?: string;
  source?: string;
  submitLabel?: string;
}

export default function Contacts({
  heading = "Обсудим ваш проект",
  subtitle = "Оставьте заявку — перезвоним в течение 30 минут. Консультация бесплатна. Выезд специалиста для оценки объёма работ — тоже.",
  source,
  submitLabel = "Отправить заявку",
}: ContactsProps = {}) {
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
              {heading}
            </h2>
            <p className="text-text-muted leading-relaxed mb-8">
              {subtitle}
            </p>

            <div className="space-y-4">
              <a
                href={PHONE_HREF}
                className="flex items-center gap-4 group"
                onClick={() => { if(typeof ym!=='undefined') ym(109280535,'reachGoal','phone_click'); }}
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
                    {PHONE_DISPLAY}
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

            <LeadForm
              source={source}
              submitLabel={submitLabel}
              withCalc
              errorTestId="contacts-error"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
