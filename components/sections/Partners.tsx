import Image from "next/image";
import Container from "@/components/ui/Container";

const partners = [
  { name: "УютСтрой", img: "/images/company-logo/uut-stroy.jpg" },
  { name: "Флагманпласт", img: "/images/company-logo/flagmanplast.jpg" },
  { name: "Laparet", img: "/images/company-logo/laparet.jpg" },
  { name: "Домострой", img: "/images/company-logo/domastroy.jpg" },
  { name: "Новая Площадь", img: "/images/company-logo/novaploshad.jpg" },
  { name: "Delux House", img: "/images/company-logo/deluxhouse.jpg" },
];

export default function Partners() {
  return (
    <section className="relative pt-14 pb-14 bg-white">
      <div
        className="absolute top-0 left-0 right-0 h-16 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, #ECF0F1, #ffffff)" }}
      />
      <Container className="relative z-10">
        <p className="text-center text-text-light font-oswald text-base tracking-widest uppercase mb-10">
          Наши партнёры
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-6 items-center">
          {partners.map((p) => (
            <div key={p.name} className="flex items-center justify-center group">
              {p.img ? (
                <Image
                  src={p.img}
                  alt={p.name}
                  width={160}
                  height={48}
                  className="max-h-10 w-auto object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-200"
                />
              ) : (
                <span className="font-oswald font-semibold text-base text-text-muted group-hover:text-text-light transition-colors duration-200">
                  {p.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
