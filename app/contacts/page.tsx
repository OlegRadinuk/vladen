import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Contacts from "@/components/sections/Contacts";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Контакты строительной компании Владен. Телефон, email, адрес. Работаем по всему Крыму.",
  openGraph: {
    title: "Контакты — Владен",
    description: "Связаться с компанией Владен.",
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
            <p>г. Симферополь, ул. Киевская 41, офис 727</p>
            <p>ООО «ВЛАДЕН» | ИНН: 2317074414 | ОКВЭД: 41.20</p>
          </div>
        </Container>
      </div>
      <Contacts />
    </>
  );
}
