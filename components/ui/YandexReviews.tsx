export default function YandexReviews() {
  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-gray-200 shadow-sm">
      {/* Сводный рейтинг — чтобы сразу видно было оценку, а не пустой призыв виджета */}
      <div className="flex items-center justify-center gap-3 py-4 bg-white border-b border-gray-100">
        <span className="font-oswald text-4xl font-bold text-text-light leading-none">4,8</span>
        <div className="flex flex-col">
          <span className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </span>
          <span className="text-xs text-text-muted mt-1">на Яндекс Картах</span>
        </div>
      </div>
      <iframe
        src="https://yandex.ru/maps-reviews-widget/111586244168?comments"
        className="w-full"
        style={{ height: "600px", border: "none" }}
        title="Отзывы о Владен на Яндекс Картах"
      />
      <a
        href="https://yandex.com/maps/org/vladen/111586244168/"
        target="_blank"
        rel="noopener noreferrer"
        className="block text-center text-xs text-text-muted py-2 hover:text-accent transition-colors"
      >
        Владен на Яндекс Картах
      </a>
    </div>
  );
}
