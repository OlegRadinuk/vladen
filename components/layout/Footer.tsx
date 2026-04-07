import Link from "next/link";
import Container from "@/components/ui/Container";

const navLinks = [
  { href: "/services", label: "Услуги" },
  { href: "/projects", label: "Проекты" },
  { href: "/about", label: "О компании" },
  { href: "/contacts", label: "Контакты" },
];

export default function Footer() {
  return (
    <footer className="text-text-dark" style={{ backgroundColor: "#16191D" }}>
      {/* Оранжевая акцентная полоска */}
      <div className="h-1 bg-accent" />

      <Container>
        {/* Основная сетка */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">

          {/* Бренд */}
          <div className="md:col-span-2 lg:col-span-1">
            <img
              src="/logo.png"
              alt="Владен"
              className="h-14 w-auto object-contain mb-5 brightness-0 invert"
            />
            <p className="text-sm text-text-muted leading-relaxed mb-5">
              Строительная компания в Крыму.<br />
              Ремонт квартир и домов, строительство под ключ с 2014 года.
            </p>
            {/* Рейтинг Яндекс */}
            <a
              href="https://yandex.com/maps/org/vladen/111586244168/reviews/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-text-muted hover:text-accent transition-colors"
            >
              <span className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </span>
              <span>4,8 на Яндекс Картах</span>
            </a>
          </div>

          {/* Навигация + Контакты */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {/* Навигация */}
            <div>
              <h3 className="font-oswald text-sm font-semibold uppercase tracking-widest text-accent mb-4">
                Навигация
              </h3>
              <ul className="space-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-muted hover:text-white transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-accent/50 group-hover:bg-accent transition-colors" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Контакты */}
            <div>
              <h3 className="font-oswald text-sm font-semibold uppercase tracking-widest text-accent mb-4">
                Контакты
              </h3>
              <ul className="space-y-3.5">
                <li>
                  <a href="tel:+79787174447" className="flex items-start gap-3 group">
                    <span className="w-7 h-7 rounded-md bg-accent/15 flex items-center justify-center flex-shrink-0 group-hover:bg-accent transition-colors duration-200">
                      <svg className="w-3.5 h-3.5 text-accent group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </span>
                    <span className="text-sm text-text-muted group-hover:text-white transition-colors leading-tight pt-0.5">
                      +7 (978) 717-44-47
                    </span>
                  </a>
                </li>
                <li>
                  <a href="mailto:vladen2026@mail.ru" className="flex items-start gap-3 group">
                    <span className="w-7 h-7 rounded-md bg-accent/15 flex items-center justify-center flex-shrink-0 group-hover:bg-accent transition-colors duration-200">
                      <svg className="w-3.5 h-3.5 text-accent group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <span className="text-sm text-text-muted group-hover:text-white transition-colors leading-tight pt-0.5">
                      vladen2026@mail.ru
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://yandex.com/maps/org/vladen/111586244168/?ll=80.925822%2C47.800786&z=3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 group"
                  >
                    <span className="w-7 h-7 rounded-md bg-accent/15 flex items-center justify-center flex-shrink-0 group-hover:bg-accent transition-colors duration-200">
                      <svg className="w-3.5 h-3.5 text-accent group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </span>
                    <span className="text-sm text-text-muted group-hover:text-white transition-colors leading-tight pt-0.5">
                      г. Симферополь,<br />ул. Киевская 41, офис 727
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Карта */}
          <div>
            <h3 className="font-oswald text-sm font-semibold uppercase tracking-widest text-accent mb-4">
              Мы на карте
            </h3>
            <div className="rounded-xl overflow-hidden border border-white/10">
              <iframe
                src="https://yandex.com/map-widget/v1/?um=constructor%3Aa6f2dd22cc7ab087c9c4f47a278ec84d2264af56ba9a453be4979a01b8c7e0d0&source=constructor"
                width="100%"
                height="220"
                frameBorder="0"
                allowFullScreen
                title="Офис Владен на карте"
                className="block w-full"
              />
            </div>
          </div>
        </div>

        {/* Нижняя полоса */}
        <div className="border-t border-white/10 py-5 flex flex-col gap-2 text-xs text-text-muted sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          <p>© {new Date().getFullYear()} Владен. Все права защищены.</p>
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
            <span>ООО «ВЛАДЕН» | ИНН: 2317074414</span>
            <Link href="/privacy" className="hover:text-accent transition-colors">
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
