/**
 * CTA в конце статьи — ведёт на существующую контакт-форму сайта.
 * Не создаёт новую форму. Использует /contacts (якорь на форму).
 */
import Link from "next/link"
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/company"

interface Props {
  cta?: { text: string; url: string }
}

export default function ContactCTA({ cta }: Props) {
  const text = cta?.text || "Записаться на консультацию"
  // Если url из движка — относительный якорь, используем contacts, иначе берём url
  const href = !cta?.url || cta.url.startsWith("#") ? "/contacts" : cta.url

  return (
    <div className="mt-12 rounded-xl bg-dark p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 justify-between">
      <div>
        <p className="font-oswald font-bold text-white text-xl sm:text-2xl leading-tight">
          Хотите обсудить ваш проект?
        </p>
        <p className="mt-2 text-sm text-white/60 font-inter max-w-sm">
          Бесплатная консультация и выезд замерщика по Симферополю и Крыму.
          Ответим на звонок или сообщение.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 shrink-0">
        <Link
          href={href}
          className="inline-flex items-center justify-center px-6 py-3 bg-accent text-white font-oswald font-medium rounded hover:bg-amber-600 transition-all whitespace-nowrap"
        >
          {text}
        </Link>
        <a
          href={PHONE_HREF}
          className="inline-flex items-center justify-center px-6 py-3 border-2 border-white/30 text-white font-oswald font-medium rounded hover:border-accent hover:text-accent transition-all whitespace-nowrap"
        >
          {PHONE_DISPLAY}
        </a>
      </div>
    </div>
  )
}
