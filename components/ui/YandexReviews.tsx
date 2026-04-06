export default function YandexReviews() {
  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-gray-200 shadow-sm">
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
