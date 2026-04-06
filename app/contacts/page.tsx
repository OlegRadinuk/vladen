import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Contacts from "@/components/sections/Contacts";

export const metadata: Metadata = {
  title: "Контакты — заказать ремонт квартиры в Симферополе",
  description:
    "Заказать ремонт квартиры или дома в Симферополе: +7 (978) 717-44-47. Офис: ул. Киевская 41, офис 727. Бесплатная консультация и выезд замерщика. ООО «ВЛАДЕН».",
  keywords: [
    "заказать ремонт квартиры Симферополь",
    "вызвать мастера по ремонту Симферополь",
    "ремонт квартиры Симферополь телефон",
    "замер ремонта Симферополь бесплатно",
    "контакты компании ремонт Крым",
    "Владен Симферополь адрес телефон",
  ],
  alternates: { canonical: "https://vladen-crimea.ru/contacts" },
  openGraph: {
    title: "Заказать ремонт квартиры в Симферополе | Владен",
    description:
      "Звоните: +7 (978) 717-44-47. Симферополь, ул. Киевская 41, оф. 727. Бесплатный замер и консультация.",
    url: "https://vladen-crimea.ru/contacts",
  },
};

export default function ContactsPage() {
  return (
    <>
      <div className="bg-dark pt-32 pb-20">
        <Container>
          <h1 className="font-oswald text-4xl md:text-6xl font-bold text-white mb-4">
            Контакты
          </h1>
          <p className="text-text-dark text-lg max-w-2xl">
            Свяжитесь с нами любым удобным способом. Работаем по Крыму и
            Краснодарскому краю.
          </p>
          <div className="mt-6 space-y-1 text-text-muted text-sm">
            <a
              href="https://yandex.com/maps/org/vladen/111586244168/?ll=80.925822%2C47.800786&z=3"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              г. Симферополь, ул. Киевская 41, офис 727
            </a>
            <p>ООО «ВЛАДЕН» | ИНН: 2317074414 | ОКВЭД: 41.20</p>
          </div>
        </Container>
      </div>
      <Contacts />
    </>
  );
}
