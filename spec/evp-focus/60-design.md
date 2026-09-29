# Дизайн-спека: 4 евпаторийские посадочные страницы

> Режим: Classic. Дата: 2026-09-29.
> Стек: Next.js 15 App Router + Tailwind CSS + TypeScript + Framer Motion.
> Базлайн: `~/.claude/skills/ui-kit/templates/baseline.md` + существующие токены проекта.
> Источники копи: `spec/evp-focus/50-copy.md` (все тексты — строго оттуда).
> Без эмодзи — только инлайн-SVG в стиле существующих компонентов.

---

## Дизайн-токены (существующие — не переопределять)

Сверено с `tailwind.config.ts` и `app/globals.css`.

| Токен | Значение | Tailwind |
|---|---|---|
| accent | `#D97706` | `text-accent`, `bg-accent`, `border-accent` |
| dark | `#2A2F35` | `bg-dark` |
| light | `#ECF0F1` | `bg-light` |
| text-dark | `#D1D5DB` | `text-text-dark` |
| text-light | `#2C3E50` | `text-text-light` |
| text-muted | `#7F8C8D` | `text-text-muted` |
| font-display | Oswald | `font-oswald` |
| font-body | Inter | `font-inter` |

**Сетка секций:** `py-20 md:py-28` (десктоп ~112px, мобайл ~80px).
**Контейнер:** компонент `Container` (существующий, max-w ≈ 1280px, px-6).
**Заголовки секций (обязательно три ступени):** `text-3xl sm:text-4xl md:text-5xl font-oswald font-bold`.
**Надпись над H2 (accent-лейбл):** `text-accent font-oswald text-sm tracking-widest uppercase mb-2`.
**Карточки:** `p-6 sm:p-8 rounded-lg border`.
**Gap в сетках:** `gap-6 sm:gap-10`.

---

## Доработки существующих компонентов

Минимальный список изменений, которые нужны до старта вёрстки страниц.

### 1. `Calculator` — добавить проп `defaultServiceId`

```tsx
// Сейчас:
export default function Calculator() {
  const [serviceId, setServiceId] = useState("house");

// Нужно:
interface CalculatorProps {
  defaultServiceId?: "house" | "repair" | "foundation" | "roof";
}
export default function Calculator({ defaultServiceId = "house" }: CalculatorProps) {
  const [serviceId, setServiceId] = useState(defaultServiceId);
```

Это единственное изменение. Остальная логика не трогается.

### 2. `ProjectCase` — добавить пропсы `filterSlugs` и `initialSlug`

```tsx
// Сейчас: cases — захардкоженный массив, всегда показывает все 5 кейсов.

interface ProjectCaseProps {
  filterSlugs?: string[];   // если передан — показывать только эти кейсы в этом порядке
  initialSlug?: string;     // начать с этого кейса (по умолчанию — первый в массиве/filterSlugs)
}
export default function ProjectCase({
  filterSlugs,
  initialSlug,
}: ProjectCaseProps = {})
```

Логика инициализации:
```ts
const visibleCases = filterSlugs
  ? filterSlugs.map(slug => cases.find(c => c.slug === slug)).filter(Boolean)
  : cases;

const startIdx = initialSlug
  ? visibleCases.findIndex(c => c.slug === initialSlug)
  : 0;
const [current, setCurrent] = useState(Math.max(0, startIdx));
```

`cases` остаётся в компоненте. Точечный импорт данных из `lib/projects.ts` не требуется — кейсы уже встроены.

### 3. `WhyWe` — добавить проп `subtitle`

```tsx
interface WhyWeProps {
  subtitle?: string; // если не передан — использовать текущую строку из YEARS_PHRASE/OBJECTS_DONE
}
export default function WhyWe({ subtitle }: WhyWeProps = {})
```

В JSX заменить хардкодированную строку:
```tsx
<p className="text-text-muted max-w-xl mx-auto">
  {subtitle ?? `${YEARS_PHRASE} работы в Крыму. Более ${OBJECTS_DONE} реализованных объектов. Репутация строится годами.`}
</p>
```

### 4. `FAQ` — добавить проп `items`

```tsx
interface FAQItem { q: string; a: string; }
interface FAQProps {
  items?: FAQItem[]; // если не передан — использовать дефолтный массив faqs
}
export default function FAQ({ items }: FAQProps = {})
```

В JSX: `const list = items ?? faqs;` → заменить все `faqs.map` на `list.map`.

### 5. `Contacts` — добавить пропсы `heading`, `subtitle`, `source`

```tsx
interface ContactsProps {
  heading?: string;   // заголовок H2 секции
  subtitle?: string;  // подзаголовок-параграф
  source?: string;    // значение скрытого поля source
}
export default function Contacts({
  heading = "Обсудим ваш проект",
  subtitle = "Оставьте заявку — перезвоним в течение 30 минут. Консультация бесплатна. Выезд специалиста для оценки объёма работ — тоже.",
  source,
}: ContactsProps = {})
```

В `handleSubmit` добавить `source` в тело запроса:
```ts
body: JSON.stringify({ name, phone, calc: calcData, source, consent_timestamp: new Date().toISOString() }),
```

---

## Новые компоненты (3 шт.)

### NC-1: `components/sections/FeatureCards.tsx`

Переиспользуется на двух страницах: как блок «Работаем удалённо» (`/evpatoriya/remont-kvartir`) и как блок «Почему ракушечник» (`/dom-iz-rakushechnika`).

**Интерфейс:**
```tsx
interface FeatureCard {
  icon: React.ReactNode; // инлайн-SVG, w-8 h-8
  title: string;
  desc: string;
}
interface FeatureCardsProps {
  accentLabel: string;   // маленькая надпись над H2
  heading: string;       // H2
  subtitle?: string;     // параграф под H2
  cards: FeatureCard[];  // 3–4 карточки
  bg?: "light" | "dark"; // default "dark"
}
```

**Разметка:**
```
section.py-20.md:py-28.bg-{bg}
  Container
    div.text-center.mb-14
      p.text-accent.font-oswald.text-sm.tracking-widest.uppercase.mb-2 — accentLabel
      h2.font-oswald.text-3xl.sm:text-4xl.md:text-5xl.font-bold.{text-color}.mb-4 — heading
      p.text-text-muted.max-w-xl.mx-auto — subtitle (если есть)
    div.grid.grid-cols-1.sm:grid-cols-2.lg:grid-cols-{3|4}.gap-6.sm:gap-10
      AnimateOnView (delay i*0.07) для каждой карточки
        div.group.p-6.sm:p-8.{bg-card}.rounded-lg.border.{border-card}.hover:border-accent/30.transition-all.duration-200
          div.text-accent.mb-4.group-hover:scale-110.transition-transform.inline-block — icon
          h3.font-oswald.text-xl.font-semibold.{text-card}.mb-2 — title
          p.text-text-muted.text-sm.leading-relaxed — desc
```

Цвета по `bg`:
- `dark`: секция `bg-dark`, карточки `bg-white/5 border-white/10`, заголовок `text-white`
- `light`: секция `bg-light`, карточки `bg-white border-transparent shadow-sm`, заголовок `text-text-light`

**Мобайл:** `grid-cols-1` на 375px → `sm:grid-cols-2` → `lg:grid-cols-3` (или 4, если 4 карточки).
**Иконки:** инлайн-SVG, `w-8 h-8`, `stroke="currentColor"`, `strokeWidth={1.5}`.

---

### NC-2: `components/sections/ServiceTileHub.tsx`

Только для `/evpatoriya` (хаб-страница).

**Интерфейс:**
```tsx
interface ServiceTile {
  icon: React.ReactNode;   // инлайн-SVG w-10 h-10
  title: string;
  desc: string;
  href: string;
  ctaLabel: string;
  ctaAction?: () => void;  // если есть — кнопка тригерит (напр., scroll к калькулятору), иначе Link
}
interface ServiceTileHubProps {
  heading: string;
  tiles: ServiceTile[];
  secondaryCTA?: { label: string; href: string }; // ссылка под плиткой
}
```

**Разметка:**
```
section.py-20.md:py-28.bg-light
  Container
    div.text-center.mb-12
      p.text-accent.font-oswald.text-sm.tracking-widest.uppercase.mb-2 — «Услуги»
      h2.font-oswald.text-3xl.sm:text-4xl.md:text-5xl.font-bold.text-text-light.mb-4 — heading
    div.grid.grid-cols-1.sm:grid-cols-3.gap-6.sm:gap-8
      div.group (для каждого тайла)
        div.p-6.sm:p-8.bg-white.rounded-xl.border.border-transparent
            .hover:border-accent/30.shadow-sm.hover:shadow-md
            .transition-all.duration-200.h-full.flex.flex-col
          div.text-accent.mb-5.group-hover:scale-110.transition-transform.inline-block — icon
          h3.font-oswald.text-xl.sm:text-2xl.font-semibold.text-text-light.mb-2 — title
          p.text-text-muted.text-sm.leading-relaxed.mb-6.flex-1 — desc
          — кнопка: если ctaAction передан — Button variant="primary", onClick=ctaAction
          — иначе: Link с className кнопки primary (border-2 border-accent text-accent hover:bg-accent hover:text-white, px-5 py-2.5 rounded font-oswald font-medium text-sm)
    — secondaryCTA (если есть):
    div.text-center.mt-10
      Link href={secondaryCTA.href}
        span.text-accent.font-oswald.text-sm.underline.underline-offset-4.hover:text-accent/80 — label
```

**Мобайл:** на 375px тайлы стекируются в 1 колонку, `grid-cols-1`. Высота тайла auto. Кнопка full-width на мобайл: добавить `w-full sm:w-auto` на кнопку тайла.
**Иконки для тайлов (SVG-идеи):**
- Ремонт квартир — иконка кисти/рулетки (paint-brush path из Heroicons)
- Ремонт домов — иконка дома (house path уже в проекте: компонент PlaceholderSlot)
- Строительство — иконка кирпичной стены или крана

---

### NC-3: `components/sections/BuildStages.tsx`

Только для `/evpatoriya/stroitelstvo-domov`. Пронумерованный список этапов строительства.

**Интерфейс:**
```tsx
interface Stage {
  num: string;    // "01", "02", ...
  title: string;
  desc: string;
}
interface BuildStagesProps {
  heading: string;
  stages: Stage[];
}
```

**Разметка:**
```
section.py-20.md:py-28.bg-dark
  Container
    div.text-center.mb-14
      p.text-accent.font-oswald.text-sm.tracking-widest.uppercase.mb-2 — «Этапы работ»
      h2.font-oswald.text-3xl.sm:text-4xl.md:text-5xl.font-bold.text-white.mb-4 — heading
    div.space-y-4
      AnimateOnView (delay i*0.07) для каждого этапа
        div.group.flex.gap-6.items-start
            .p-6.bg-white/5.rounded-lg.border.border-white/10
            .hover:border-accent/30.transition-colors
          — номер:
          span.font-oswald.text-4xl.sm:text-5xl.font-bold.text-accent.leading-none.shrink-0
              .w-12.sm:w-16.text-center — num
          div.flex-1.min-w-0
            h3.font-oswald.text-xl.sm:text-2xl.font-semibold.text-white.mb-2 — title
            p.text-text-muted.text-sm.leading-relaxed — desc
```

**Мобайл (375px):** `flex.gap-4`, номер `text-3xl w-10`. Карточки в потоке `space-y-3`. Текст не переполняется (`flex-1.min-w-0`).

---

## Страница 1: `/evpatoriya` — хаб

**Файл:** `app/evpatoriya/page.tsx`
**Breadcrumb:** Главная → Евпатория

### Hero (адаптированный от существующего Hero-компонента)

Проверь наличие общего `HeroSection` в `components/sections/`. Если он принимает пропсы — использовать его. Если нет — создать `HeroEvpatoriya` по паттерну ниже (аналог main page Hero, без видео).

**Разметка:**
```
section.relative.min-h-[600px].short:min-h-[520px].flex.items-center.bg-dark
  Container
    div.grid.grid-cols-1.lg:grid-cols-2.gap-8.lg:gap-16.items-center.py-24.sm:py-32
      — левая колонка:
      div
        — бейдж (мобайл — показывать всегда, десктоп — тоже):
        span.inline-block.mb-4.px-3.py-1.rounded-full.bg-accent/20.border.border-accent/40
            .text-accent.font-oswald.text-xs.tracking-widest.uppercase
          «Работаем в Евпатории и Сакском районе»
        h1.font-oswald.text-3xl.sm:text-4xl.md:text-5xl.font-bold.text-white.mb-4.text-balance
          «Ремонт и строительство в Евпатории»
        p.text-text-dark.text-base.sm:text-lg.leading-relaxed.mb-8
          «Работаем в Евпатории и Сакском районе. 12 лет опыта, 369+ сданных объектов. Цена фиксируется в договоре — без сюрпризов в процессе.»
        div.flex.flex-col.sm:flex-row.gap-4
          Button(variant="primary", size="lg", onClick→scroll #calculator)
            «Рассчитать стоимость»
          Link href="#projects"
            span.font-oswald.text-sm.text-accent.underline.underline-offset-4.hover:text-accent/80
              «Смотреть наши работы»
      — правая колонка (скрыта на мобайл):
      div.hidden.lg:block
        — изображение кейса dom-evpatoriya-165:
        div.relative.aspect-[4/3].rounded-xl.overflow-hidden
          Image src="/cases/1keys-fasad.jpg" fill objectFit="cover" priority
          alt="Фасад двухэтажного дома 165 м² в Евпатории — природный камень ракушка"
```

**Мобайл (375px):** только левая колонка, изображение скрыто (`hidden lg:block`). H1 `text-3xl`. Две кнопки стекируются вертикально `flex-col`. Бейдж над H1.

**Анимации:** Framer Motion `initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}` с stagger 0.1s на бейдж → H1 → subtitle → кнопки. `prefers-reduced-motion` → без анимации.

---

### Блок 2: Плитка услуг — `ServiceTileHub` (NC-2)

```tsx
<ServiceTileHub
  heading="Что мы делаем в Евпатории"
  tiles={[
    {
      icon: <svg>/* paint-brush SVG */</svg>,
      title: "Ремонт квартир",
      desc: "Чистовая отделка, электрика, сантехника. Эконом от 17 000 ₽/м².",
      href: "/evpatoriya/remont-kvartir",
      ctaLabel: "Рассчитать",
      ctaAction: () => document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      icon: <svg>/* home SVG */</svg>,
      title: "Ремонт домов",
      desc: "Полный цикл — от черновой до меблировки. Сроки в договоре.",
      href: "/services",
      ctaLabel: "Подробнее",
    },
    {
      icon: <svg>/* building SVG */</svg>,
      title: "Строительство домов",
      desc: "Индивидуальный проект, ракушечник и другие материалы. От 55 000 ₽/м².",
      href: "/evpatoriya/stroitelstvo-domov",
      ctaLabel: "Рассчитать",
      ctaAction: () => document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" }),
    },
  ]}
  secondaryCTA={{ label: "Смотреть все услуги →", href: "/services" }}
/>
```

---

### Блок 3: Кейс Евпатории — `ProjectCase`

```tsx
<ProjectCase
  filterSlugs={["dom-evpatoriya-165"]}
  initialSlug="dom-evpatoriya-165"
/>
```

Заголовок секции переопределять не нужно — стандартный «Реализованные проекты» подходит. Для точного соответствия копи добавить над компонентом отдельный H2 через `sectionOverrideHeading` — либо добавить опциональный проп `heading` в `ProjectCase`:

```tsx
// Дополнительный опциональный проп к существующим:
sectionHeading?: string;
sectionSubtitle?: string;
// Если передан — рендерится вместо дефолтного «Реализованные проекты»
```

Пропы для этой страницы:
```tsx
sectionHeading="Наш объект в Евпатории"
sectionSubtitle="Двухэтажный дом 165 м² из природного камня ракушка. Сдан в декабре 2025 года."
```

**CTA под кейсом** — «Смотреть проект» уже есть как «Подробнее о проекте» в компоненте. Дополнительный CTA «Рассчитать мой проект» добавить как ссылку-кнопку ghost: `scroll → #calculator`.

---

### Блок 4: Почему мы — `WhyWe`

```tsx
<WhyWe subtitle="Работаем в Евпатории и Сакском районе. 12 лет работы в Крыму. Более 369 реализованных объектов. Репутация строится годами." />
```

**После блока WhyWe** — CTA-якорь (не компонент, просто div):

```tsx
<div className="text-center mt-10 pb-4">
  <Button
    variant="primary"
    size="lg"
    onClick={() => document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" })}
  >
    Получить расчёт бесплатно
  </Button>
</div>
```

---

### Блок 5: Калькулятор — `Calculator`

```tsx
<Calculator defaultServiceId="repair" />
```

Якорь: `id="calculator"` — уже есть в компоненте.

---

### Блок 6: Отзывы — `Reviews`

```tsx
<Reviews />
```

Без изменений. Если есть проп `filterGeo` — не трогать, ждать TODO-8 от Олега.

---

### Блок 7: Контакты — `Contacts`

```tsx
<Contacts
  heading="Обсудим ваш проект в Евпатории"
  subtitle="Оставьте заявку — перезвоним в течение 30 минут. Выезд замерщика бесплатно."
  source="evpatoriya-hub"
/>
```

Кнопка формы — текст «Получить расчёт» (из copy.md; изменить дефолт через проп `submitLabel` или хардкодить в странице через обёртку).

---

### Блок 8: MobileCTABar

```tsx
<MobileCTABar />
```

Без изменений.

---

### Мета (для `generateMetadata`)

```ts
title: "Ремонт и строительство в Евпатории — Владен"
description: "Ремонт квартир, домов и строительство под ключ в Евпатории. Работаем в Евпатории и Сакском районе. ООО «ВЛАДЕН» — гарантия, договор. Звоните: +7 (978) 456-41-56"
alternates: { canonical: "https://vladen-crimea.ru/evpatoriya" }
```

---

---

## Страница 2: `/evpatoriya/remont-kvartir`

**Файл:** `app/evpatoriya/remont-kvartir/page.tsx`
**Breadcrumb:** Главная → Евпатория → Ремонт квартир

### Hero

Аналогичен героям других услуг. Без фото в правой колонке (нет специфического фото ремонта Евпатории) — вместо этого правая колонка содержит информационный блок с ценами (trust-signal).

```
section.relative.min-h-[580px].flex.items-center.bg-dark
  Container
    div.grid.grid-cols-1.lg:grid-cols-2.gap-8.lg:gap-16.items-center.py-24.sm:py-32
      — левая колонка:
      div
        span.badge — «Работаем в Евпатории и Сакском районе»
        h1.text-3xl.sm:text-4xl.md:text-5xl — «Ремонт квартир в Евпатории под ключ»
        p.text-text-dark.mb-2 — «от 17 000 ₽/м² — цена фиксируется в договоре. Сроки — тоже. За каждый день просрочки — неустойка.»
        p.text-text-muted.text-sm.mb-8 — «Принимаем квартиры в Евпатории под ремонт — эконом, стандарт и дизайнерский. Бесплатный выезд замерщика, детальная смета, официальный договор подряда с фиксированной ценой.»
        div.flex.flex-col.sm:flex-row.gap-4
          Button(variant="primary", size="lg", onClick→scroll #calculator)
            «Рассчитать стоимость ремонта»
          Link href="#projects"
            span.text-accent.text-sm.underline — «Посмотреть наши работы»
      — правая колонка (скрыта на мобайл):
      div.hidden.lg:block
        div.bg-white/5.border.border-white/10.rounded-xl.p-8
          p.text-accent.font-oswald.text-sm.tracking-widest.uppercase.mb-4 — «Стоимость ремонта»
          — таблица цен: 3 строки (Эконом / Стандарт / Премиум)
          div.space-y-3
            — каждая строка:
            div.flex.justify-between.items-center.py-3.border-b.border-white/10
              span.text-text-dark.font-oswald — «Эконом»
              span.text-accent.font-oswald.font-bold — «от 17 000 ₽/м²»
            — (Стандарт / от 27 000 ₽/м²)
            — (Премиум / от 37 000 ₽/м²)
          p.text-text-muted.text-xs.mt-4 — «Точная стоимость после бесплатного выезда замерщика»
```

**Мобайл:** только левая колонка. Таблица цен скрыта (`hidden lg:block`) — цены есть в калькуляторе.

---

### Блок 2: Калькулятор — `Calculator`

Ставится СРАЗУ после hero (до лукбука) — по conversion plan.

```tsx
<Calculator defaultServiceId="repair" />
```

---

### Блок 3: Лукбук — `BukletSlider`

```tsx
<BukletSlider />
```

Без изменений. Якорь `id="lookbook"` если не установлен — установить.

---

### Блок 4: «Работаем удалённо» — `FeatureCards` (NC-1)

```tsx
<FeatureCards
  accentLabel="Для удалённых заказчиков"
  heading="Ремонт квартиры в Евпатории, даже если вы не в Крыму"
  bg="dark"
  cards={[
    {
      icon: <svg>/* chat/phone SVG */</svg>,
      title: "Звонок или чат без визита",
      desc: "Принимаем заявки дистанционно. Позвоните +7 (978) 456-41-56 или напишите в чат-ассистента «Влад» на сайте.",
    },
    {
      icon: <svg>/* camera SVG */</svg>,
      title: "Авторский надзор с фотофиксацией",
      desc: "Для удалённых заказчиков подключаем авторский надзор — выезды на каждом ключевом этапе с фотоотчётом. [TODO-1]",
    },
    {
      icon: <svg>/* document SVG */</svg>,
      title: "Договор с фиксированной ценой",
      desc: "Смету и договор согласовываем до начала работ. Цена не меняется без вашего согласия. [TODO-2]",
    },
  ]}
/>
```

Иконки — `w-8 h-8`, монолинейные, как в WhyWe.tsx.

---

### Блок 5: Кейсы — `ProjectCase`

```tsx
<ProjectCase
  filterSlugs={["remont-doma-pod-klyuch-78", "kvartira-zhk-saga", "dom-evpatoriya-165"]}
  initialSlug="remont-doma-pod-klyuch-78"
  sectionHeading="Наши работы"
  sectionSubtitle="Реальные объекты в Крыму — ремонт под ключ."
/>
```

После кейсов — inline CTA (не компонент):
```tsx
<div className="text-center mt-8">
  <Button
    variant="ghost"
    onClick={() => document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" })}
  >
    Рассчитать мой проект
  </Button>
</div>
```

---

### Блок 6: Почему мы — `WhyWe`

```tsx
<WhyWe subtitle="Работаем в Евпатории и Сакском районе. 12 лет в Крыму. Официальный договор, гарантия 2 года на отделку." />
```

После — inline CTA «Получить расчёт бесплатно» (аналог /evpatoriya).

---

### Блок 7: FAQ — `FAQ`

```tsx
<FAQ items={[
  { q: "Сколько стоит ремонт квартиры в Евпатории под ключ?",
    a: "Эконом — от 17 000 ₽/м², стандарт — от 27 000 ₽/м², премиум — от 37 000 ₽/м²..." },
  { q: "Что входит в ремонт под ключ в Евпатории?",
    a: "Полный цикл: демонтаж, выравнивание стен и полов, замена электрики и сантехники..." },
  { q: "Сколько времени занимает ремонт квартиры?",
    a: "Однокомнатная 40 м² — 6–8 недель, двухкомнатная 65 м² — 8–12 недель..." },
  { q: "Работаете ли вы по официальному договору?",
    a: "Да. Заключаем договор подряда с фиксированной сметой..." },
  { q: "Как контролировать ремонт, если я живу не в Крыму?",
    a: "Принимаем заявки дистанционно. Позвоните +7 (978) 456-41-56 или напишите в чат..." },
  { q: "Нужно ли покупать материалы самому?",
    a: "Не обязательно. Возьмём закупку на себя — у нас договоры с поставщиками и скидки до 15%..." },
  { q: "Делаете ли бесплатный замер в Евпатории?",
    a: "Да. Выезд замерщика бесплатно и без обязательств..." },
]} />
```

Полные тексты ответов — из `spec/evp-focus/50-copy.md`, раздел «FAQ (7 вопросов)».

---

### Блок 8: Отзывы — `Reviews`

```tsx
<Reviews />
```

---

### Блок 9: Контакты — `Contacts`

```tsx
<Contacts
  heading="Обсудим ваш ремонт в Евпатории"
  subtitle="Оставьте заявку — перезвоним в течение 30 минут и договоримся о бесплатном выезде замерщика."
  source="evp-remont-kvartir"
/>
```

Кнопка отправки формы: «Записаться на замер».

---

### Блок 10: MobileCTABar

```tsx
<MobileCTABar />
```

---

### Мета

```ts
title: "Ремонт квартир в Евпатории под ключ — цены | Владен"
description: "Ремонт квартир в Евпатории под ключ: эконом от 17 000 ₽/м², стандарт от 27 000 ₽/м². Отделка, дизайн, сроки по договору. Бесплатный замер. ООО «ВЛАДЕН»."
alternates: { canonical: "https://vladen-crimea.ru/evpatoriya/remont-kvartir" }
```

---

---

## Страница 3: `/evpatoriya/stroitelstvo-domov`

**Файл:** `app/evpatoriya/stroitelstvo-domov/page.tsx`
**Breadcrumb:** Главная → Евпатория → Строительство домов

### Hero

Правая колонка — фото кейса `dom-evpatoriya-165` как главный trust-сигнал.

```
section.relative.min-h-[620px].flex.items-center.bg-dark
  Container
    div.grid.grid-cols-1.lg:grid-cols-2.gap-8.lg:gap-16.items-center.py-24.sm:py-32
      — левая колонка:
      div
        span.badge — «Работаем в Евпатории и Сакском районе»
        h1.text-3xl.sm:text-4xl.md:text-5xl — «Строительство домов в Евпатории под ключ»
        p.text-text-dark.mb-2 — «от 55 000 ₽/м² — дома из ракушечника и других материалов. Индивидуальный расчёт фундамента под ваш участок. Договор с фиксированной ценой.»
        p.text-text-muted.text-sm.mb-8 — «Строим дома в Евпатории и Сакском районе по индивидуальному проекту. Реализованный объект: двухэтажный дом 165 м², сдан в декабре 2025 года.»
        div.flex.flex-col.sm:flex-row.gap-4
          Button(variant="primary", size="lg", onClick→scroll #calculator)
            «Получить расчёт стоимости дома»
          Link href="#projects"
            span.text-accent.text-sm.underline — «Смотреть построенный дом в Евпатории»
      — правая колонка:
      div.hidden.lg:block
        div.relative.aspect-[4/3].rounded-xl.overflow-hidden
          Image src="/cases/1keys-fasad.jpg" fill priority
          alt="Двухэтажный дом 165 м² в Евпатории — фасад из природного камня ракушка, сдан 2025"
          div.absolute.bottom-0.inset-x-0.h-24.bg-gradient-to-t.from-dark/80.to-transparent
          div.absolute.bottom-4.left-4
            span.text-white.font-oswald.text-sm — «165 м² · Евпатория · 2025»
```

---

### Блок 2: Калькулятор — `Calculator`

```tsx
<Calculator defaultServiceId="house" />
```

---

### Блок 3: Кейсы — `ProjectCase`

```tsx
<ProjectCase
  filterSlugs={["dom-evpatoriya-165", "dom-mirnoe-81", "poselok-krymskaya-palitra", "dom-bahchisaray-112"]}
  initialSlug="dom-evpatoriya-165"
  sectionHeading="Построенные объекты в Евпатории и Крыму"
  sectionSubtitle="Каждый дом — индивидуальный проект. Реальные объекты, реальные сроки."
/>
```

После кейсов — inline CTA:
```tsx
<div className="text-center mt-8">
  <Button variant="ghost"
    onClick={() => document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" })}>
    Рассчитать мой проект
  </Button>
</div>
```

---

### Блок 4: Этапы строительства — `BuildStages` (NC-3)

```tsx
<BuildStages
  heading="Этапы строительства под ключ"
  stages={[
    { num: "01", title: "Проект и согласования",
      desc: "Архитектурный и конструктивный проект, получение разрешения на строительство." },
    { num: "02", title: "Фундамент",
      desc: "Ленточный, плитный или свайный под ваш участок и грунт. Индивидуальный расчёт." },
    { num: "03", title: "Стены и кровля",
      desc: "Кладка из ракушечника или другого материала, монтаж стропильной системы и кровли." },
    { num: "04", title: "Инженерные сети",
      desc: "Электрика, водоснабжение, канализация, отопление с нуля." },
    { num: "05", title: "Отделка и сдача",
      desc: "Предчистовая или полная чистовая в зависимости от договора." },
  ]}
/>
```

---

### Блок 5: Почему мы — `WhyWe`

```tsx
<WhyWe subtitle="Работаем в Евпатории и Сакском районе. 12 лет опыта. Реализованный объект: дом 165 м² в Евпатории, сдан 2025." />
```

После — CTA «Получить расчёт бесплатно».

---

### Блок 6: FAQ — `FAQ`

```tsx
<FAQ items={[
  { q: "Сколько стоит строительство дома в Евпатории под ключ?",
    a: "Предчистовая отделка — от 55 000 ₽/м², полная чистовая — от 80 000 ₽/м²..." },
  { q: "Из каких материалов вы строите дома в Евпатории?",
    a: "В основном — ракушечник. Также строим из газобетона, кирпича и монолитного бетона..." },
  { q: "Нужен ли проект для строительства дома?",
    a: "Да. Мы делаем полный пакет: архитектурный проект, конструктивные решения, инженерные сети..." },
  { q: "Какие сроки строительства?",
    a: "[TODO-4: добавить конкретные сроки.] Сроки зависят от площади и сложности проекта. Фиксируем в договоре..." },
  { q: "Строите ли вы в Сакском районе?",
    a: "Да, работаем в Евпатории и Сакском районе." },
  { q: "Какая гарантия на строительство?",
    a: "Гарантия на конструктивные работы (фундамент, стены, кровля) — 5 лет. На отделочные работы — 2 года..." },
]} />
```

---

### Блок 7: Отзывы — `Reviews`

```tsx
<Reviews />
```

---

### Блок 8: Контакты — `Contacts`

```tsx
<Contacts
  heading="Рассчитаем стоимость вашего дома в Евпатории"
  subtitle="Пришлём детальную смету после бесплатного выезда. Звоните +7 (978) 456-41-56 или оставьте заявку."
  source="evp-stroitelstvo"
/>
```

Кнопка: «Получить расчёт дома».

---

### Блок 9: MobileCTABar

```tsx
<MobileCTABar />
```

---

### Мета

```ts
title: "Строительство домов в Евпатории под ключ — Владен"
description: "Строительство домов под ключ в Евпатории: предчистовая от 55 000 ₽/м², дома из ракушечника, индивидуальный проект. Реализованный кейс 165 м² в Евпатории. Звоните: +7 (978) 456-41-56"
alternates: { canonical: "https://vladen-crimea.ru/evpatoriya/stroitelstvo-domov" }
```

---

---

## Страница 4: `/dom-iz-rakushechnika`

**Файл:** `app/dom-iz-rakushechnika/page.tsx`
**Breadcrumb:** Главная → Дом из ракушечника

### Hero

Правая колонка — фото фасада `dom-mirnoe-81` (ракушечник виден на фото, горизонтальный формат).

```
section.relative.min-h-[600px].flex.items-center.bg-dark
  Container
    div.grid.grid-cols-1.lg:grid-cols-2.gap-8.lg:gap-16.items-center.py-24.sm:py-32
      — левая колонка:
      div
        span.badge — «Строим по всему Крыму»
        h1.text-3xl.sm:text-4xl.md:text-5xl — «Дома из ракушечника в Крыму»
        p.text-text-dark.mb-2 — «Природный камень ракушка — местный материал, проверенный крымским климатом. Строим по всему Крыму от 55 000 ₽/м².»
        p.text-text-muted.text-sm.mb-8 — «Ракушечник — традиционный строительный материал Крыма. Три реализованных объекта — в Евпатории, Мирном и Бахчисарае.»
        div.flex.flex-col.sm:flex-row.gap-4
          Button(variant="primary", size="lg", onClick→scroll #calculator)
            «Рассчитать стоимость дома из ракушечника»
          Link href="#projects"
            span.text-accent.text-sm.underline — «Смотреть построенные дома»
      — правая колонка:
      div.hidden.lg:block
        div.relative.aspect-[4/3].rounded-xl.overflow-hidden
          Image src="/cases/keys2-gorizontalnaya.jpg" fill priority
          alt="Одноэтажный дом 81 м² из ракушечника в с. Мирное, сдан 2025"
```

---

### Блок 2: «Почему ракушечник» — `FeatureCards` (NC-1)

```tsx
<FeatureCards
  accentLabel="Материал"
  heading="Почему ракушечник"
  bg="light"
  cards={[
    {
      icon: <svg>/* map-pin / location SVG */</svg>,
      title: "Местный материал",
      desc: "Добывается в Крыму — дешевле привозных аналогов, не требует длинной логистики. Доступность снижает стоимость строительства по сравнению с привозным кирпичом.",
    },
    {
      icon: <svg>/* sun / thermometer SVG */</svg>,
      title: "Тёплые стены",
      desc: "Ракушечник хорошо сохраняет тепло и отдаёт его равномерно. [TODO-5: добавить коэффициент λ после подтверждения Олегом.]",
    },
    {
      icon: <svg>/* leaf / nature SVG */</svg>,
      title: "Экологичность",
      desc: "Природный камень без химических добавок. Не выделяет вредных веществ в течение всего срока службы.",
    },
    {
      icon: <svg>/* shield SVG */</svg>,
      title: "Долговечность",
      desc: "Постройки из ракушечника в Крыму стоят десятилетиями. Устойчив к солёному морскому воздуху и перепадам температур.",
    },
  ]}
/>
```

Для 4 карточек: `lg:grid-cols-4` — на десктопе в ряд, на `sm` — `grid-cols-2`, на 375px — `grid-cols-1`.

---

### Блок 3: Кейсы — `ProjectCase`

```tsx
<ProjectCase
  filterSlugs={["dom-evpatoriya-165", "dom-mirnoe-81", "dom-bahchisaray-112"]}
  initialSlug="dom-evpatoriya-165"
  sectionHeading="Наши реализованные объекты из ракушечника"
  sectionSubtitle="Три объекта в Евпатории, Мирном и Бахчисарае — природный камень ракушка."
/>
```

Примечание: у `dom-bahchisaray-112` нет `cover` (null) — компонент уже рендерит `PlaceholderSlot` для null-медиа. TODO-6 Олегу — запросить фото.

После кейсов — inline CTA «Рассчитать мой проект» (→ scroll #calculator).

---

### Блок 4: Калькулятор — `Calculator`

```tsx
<Calculator defaultServiceId="house" />
```

---

### Блок 5: Почему мы — `WhyWe`

```tsx
<WhyWe subtitle="Работаем в Евпатории, Симферополе и по всему Крыму. 12 лет опыта, 369+ объектов." />
```

После — CTA «Получить расчёт бесплатно».

---

### Блок 6: FAQ — `FAQ`

```tsx
<FAQ items={[
  { q: "Почему в Крыму строят дома из ракушечника?",
    a: "Ракушечник — местный крымский материал. Его не нужно везти издалека, что снижает стоимость строительства..." },
  { q: "В доме из ракушечника не будет холодно зимой?",
    a: "Нет. Ракушечник хорошо сохраняет тепло. [TODO-5: добавить технические характеристики.]" },
  { q: "Сколько стоит дом из ракушечника под ключ?",
    a: "Предчистовая отделка — от 55 000 ₽/м², полная чистовая — от 80 000 ₽/м²..." },
  { q: "В каких городах Крыма вы строите?",
    a: "Работаем по всему Крыму. Реализованные объекты из ракушечника — в Евпатории, с. Мирном и в Бахчисарае..." },
  { q: "Какие сроки строительства дома из ракушечника?",
    a: "[TODO-4.] Сроки зависят от площади, сложности проекта и типа отделки. Фиксируем в договоре..." },
  { q: "Есть ли у вас реализованные дома из ракушечника?",
    a: "Да. Три объекта: двухэтажный дом 165 м² в Евпатории (сдан декабрь 2025), одноэтажный дом 81 м² в с. Мирном (сдан 2025), дом 112 м² с мансардой в Бахчисарае (сдан 2024)..." },
]} />
```

---

### Блок 7: Отзывы — `Reviews`

```tsx
<Reviews />
```

---

### Блок 8: Контакты — `Contacts`

```tsx
<Contacts
  heading="Рассчитаем ваш дом из ракушечника"
  subtitle="Работаем по всему Крыму. Бесплатный выезд замерщика. Звоните +7 (978) 456-41-56."
  source="dom-iz-rakushechnika"
/>
```

Кнопка: «Получить расчёт дома».

---

### Блок 9: MobileCTABar

```tsx
<MobileCTABar />
```

---

### Мета

```ts
title: "Дом из ракушечника в Крыму под ключ — Владен"
description: "Строительство домов из ракушечника в Крыму: тёплые стены, экологичность, местный материал. Кейсы в Евпатории и Симферополе. Расчёт стоимости бесплатно. ООО «ВЛАДЕН». +7 (978) 456-41-56"
alternates: { canonical: "https://vladen-crimea.ru/dom-iz-rakushechnika" }
```

---

---

## Структура файлов (что создаёт frontend)

```
app/
  evpatoriya/
    page.tsx                          ← страница 1 (хаб)
    remont-kvartir/
      page.tsx                        ← страница 2
    stroitelstvo-domov/
      page.tsx                        ← страница 3
  dom-iz-rakushechnika/
    page.tsx                          ← страница 4

components/sections/
  FeatureCards.tsx                    ← NC-1 (новый)
  ServiceTileHub.tsx                  ← NC-2 (новый)
  BuildStages.tsx                     ← NC-3 (новый)

  Calculator.tsx                      ← добавить defaultServiceId
  ProjectCase.tsx                     ← добавить filterSlugs, initialSlug, sectionHeading, sectionSubtitle
  WhyWe.tsx                           ← добавить subtitle prop
  FAQ.tsx                             ← добавить items prop
  Contacts.tsx                        ← добавить heading, subtitle, source props
```

---

## Checklists и TODO для frontend

### Перед вёрсткой
- [ ] Убедиться, что `lib/contacts.ts` содержит `PHONE_DISPLAY = "+7 (978) 456-41-56"` и `PHONE_HREF = "tel:+79784564156"` (TODO-7)
- [ ] Проверить, что `BukletSlider` и `Reviews` и `Partners` экспортируются без ошибок — они импортируются на новые страницы

### Адаптив (проверить вручную)
- [ ] 375px: H1 не выходит за экран, кнопки занимают 100% ширины или `w-full`, бейдж читаемый
- [ ] 640px: сетки правильно переходят из 1 в 2 колонки
- [ ] 1280px: Hero двухколоночный, плитка услуг 3 в ряд

### Доступность
- [ ] Все `<Image>` с `alt` из copy.md (не пустые)
- [ ] Кнопки с `onClick` (не Link) — добавить `type="button"`
- [ ] FAQ-аккордеон: aria-expanded, aria-controls (уже есть в компоненте — проверить после передачи `items`)
- [ ] Цвет `text-text-muted` (#7F8C8D) на `bg-dark` (#2A2F35): контраст 4.6:1 — ОК. На `bg-light` (#ECF0F1): контраст 3.0:1 — граничный. Подписи на light-фоне держать ≥ 14px (small text ≥ 3:1 допустимо для крупного текста, но body-мутед должен быть крупнее или иметь более тёмный вариант)

### Что НЕ делать
- Не ставить WhatsApp-кнопки — его нет на сайте (из 00-brief.md). В copy.md некоторые упоминания WhatsApp — игнорировать в UI
- Не добавлять адрес офиса в Евпатории — нет подтверждения от Олега
- Не придумывать факты — только из copy.md и существующего кода
- Не добавлять эмодзи нигде в UI

---

*Файл создан designer-агентом 2026-09-29. Источники: spec/evp-focus/00-brief.md, 30-seo-plan.md, 40-conversion.md, 50-copy.md; components/sections/Calculator.tsx, ProjectCase.tsx, WhyWe.tsx, FAQ.tsx, Contacts.tsx; tailwind.config.ts, app/globals.css; baseline.md.*
