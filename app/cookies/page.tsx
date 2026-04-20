import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import CookiesResetButton from "@/components/ui/CookiesResetButton";

export const metadata: Metadata = {
  title: "Политика использования cookie — Владен",
  description: "Информация об использовании файлов cookie на сайте ООО «ВЛАДЕН»",
  robots: { index: false },
  alternates: { canonical: "https://vladen-crimea.ru/cookies" },
};

export default function CookiesPage() {
  return (
    <>
      <div className="bg-dark pt-32 pb-16">
        <Container>
          <div className="max-w-3xl">
            <h1 className="font-oswald text-4xl md:text-5xl font-bold text-white mb-3">
              Политика использования cookie
            </h1>
            <p className="text-text-muted text-sm">
              Редакция от 20 апреля 2026 г.
            </p>
          </div>
        </Container>
      </div>

      <div className="bg-light py-16">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-8 md:p-12 space-y-10">

              <div>
                <h2 className="font-oswald text-xl font-semibold text-text-light mb-4">
                  Что такое cookie
                </h2>
                <p className="text-text-muted text-sm leading-relaxed">
                  Cookie — это небольшие текстовые файлы, которые сохраняются в вашем браузере при
                  посещении сайта. Они помогают сайту запоминать ваши действия и предпочтения,
                  улучшают работу сервиса и позволяют анализировать посещаемость.
                </p>
              </div>

              <div>
                <h2 className="font-oswald text-xl font-semibold text-text-light mb-4">
                  Категории cookie на нашем сайте
                </h2>
                <div className="space-y-6">
                  <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                    <h3 className="font-oswald font-semibold text-text-light text-base mb-2">
                      Необходимые cookie
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed">
                      Без этих файлов сайт не сможет корректно работать. Они обеспечивают
                      навигацию по страницам, работу форм и другие базовые функции. Эти cookie
                      не требуют вашего согласия и не могут быть отключены.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                    <h3 className="font-oswald font-semibold text-text-light text-base mb-2">
                      Аналитические cookie
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed">
                      Позволяют нам понять, как посетители используют сайт: какие страницы
                      посещают, сколько времени проводят, с каких устройств заходят. Вся
                      информация собирается в обезличенном виде и используется исключительно
                      для улучшения сайта.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                    <h3 className="font-oswald font-semibold text-text-light text-base mb-2">
                      Маркетинговые cookie
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed">
                      Используются для показа рекламных объявлений, соответствующих вашим
                      интересам, и для отслеживания эффективности рекламных кампаний. Эти
                      cookie могут передаваться рекламным партнёрам.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-oswald text-xl font-semibold text-text-light mb-4">
                  Как управлять настройками cookie
                </h2>
                <p className="text-text-muted text-sm leading-relaxed mb-4">
                  Вы можете изменить свои предпочтения в любое время. Нажмите кнопку ниже,
                  чтобы сбросить текущие настройки — баннер выбора cookie появится снова
                  при следующей загрузке страницы.
                </p>
                <CookiesResetButton />
                <p className="text-text-muted text-xs mt-4 leading-relaxed">
                  Также вы можете отключить cookie непосредственно в настройках вашего браузера.
                  Обратите внимание: отключение необходимых cookie может повлиять на работу сайта.
                </p>
              </div>

              <div className="border-t border-gray-100 pt-8">
                <p className="text-text-muted text-sm leading-relaxed">
                  Подробнее об обработке персональных данных читайте в нашей{" "}
                  <a
                    href="/privacy"
                    className="text-accent underline hover:text-accent/80 transition-colors"
                  >
                    Политике конфиденциальности
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
