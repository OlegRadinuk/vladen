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
    <footer className="bg-dark text-text-dark">
      <Container>
        <div className="py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Brand + Nav + Contacts */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Brand */}
            <div className="sm:col-span-3 md:col-span-1">
              <img
                src="/logo.png"
                alt="Владен — Строительная компания"
                className="h-16 w-auto object-contain mb-3 brightness-0 invert"
              />
              <p className="text-sm text-text-muted leading-relaxed">
                Строительная компания в Крыму и Краснодарском крае. Полный цикл
                строительства: от подбора участка до сдачи ключей.
              </p>
            </div>

            {/* Nav */}
            <div>
              <h3 className="font-oswald text-lg font-semibold mb-4 text-white">
                Навигация
              </h3>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-muted hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contacts */}
            <div>
              <h3 className="font-oswald text-lg font-semibold mb-4 text-white">
                Контакты
              </h3>
              <ul className="space-y-2 text-sm text-text-muted">
                <li>
                  <a
                    href="tel:+79787174447"
                    className="hover:text-accent transition-colors"
                  >
                    +7 (978) 717-44-47
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:vladen2026@mail.ru"
                    className="hover:text-accent transition-colors"
                  >
                    vladen2026@mail.ru
                  </a>
                </li>
                <li>г. Симферополь, ул. Киевская 41, офис 727</li>
              </ul>
            </div>
          </div>

          {/* Right: Map */}
          <div>
            <h3 className="font-oswald text-lg font-semibold mb-4 text-white">
              Мы на карте
            </h3>
            <div className="rounded-xl overflow-hidden border border-white/10">
              <iframe
                src="https://yandex.com/map-widget/v1/?um=constructor%3Aa6f2dd22cc7ab087c9c4f47a278ec84d2264af56ba9a453be4979a01b8c7e0d0&source=constructor"
                width="100%"
                height="280"
                frameBorder="0"
                allowFullScreen
                title="Офис Владен на карте"
                className="block w-full"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-text-muted">
          <p>© {new Date().getFullYear()} Владен. Все права защищены.</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <p>ООО «ВЛАДЕН» | ИНН: 2317074414</p>
            <Link href="/privacy" className="hover:text-accent transition-colors">Политика конфиденциальности</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
