# Spec: Desktop Brick Layout — Владен, главная страница

**Дата:** 2026-09-26
**Ветка прода:** `lookbook-accordion`
**Проверочные ширины:** 1280px и 1440px
**Правило:** все изменения ТОЛЬКО через `lg:`-классы (≥1024px); мобайл/планшет (`<lg`) не трогать

---

## Дизайн-токены проекта

```
dark:       #2A2F35  (bg-dark)
light:      #ECF0F1  (bg-light)
accent:     #D97706  (text-accent / bg-accent)
text-dark:  #D1D5DB
text-light: #2C3E50
text-muted: #7F8C8D

Container:  max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  (max-width: 1280px = 80rem)
Header:     h-16 md:h-20  (64px mobile / 80px desktop)

short:      (min-width: 768px) and (max-height: 820px)  — ноутбуки с низким экраном
short-sm:   (max-width: 767px) and (max-height: 720px)  — низкие телефоны
```

---

## Concept: «Кирпичная связка»

Каждый двухколонный ряд — «ряд кирпичей». Шов (граница колонн) смещается между рядами:

| Ряд | Левая колонна | Шов | Правая колонна |
|-----|--------------|-----|----------------|
| Services / Calculator | 7/12 (58.33%) | — | 5/12 |
| ProjectCase | ~6/12 (50%) | — | ~6/12 |
| WhyWe / FAQ | 5/12 (41.67%) | — | 7/12 |

Шов смещается: 7 → 6 → 5 (слева направо, ряд за рядом) — это и есть визуальная «связка».

---

## Текущий порядок секций (page.tsx, ветка lookbook-accordion)

```
Hero → BukletSlider → Calculator → Services → ProjectCase → WhyWe → FAQ →
Contacts → Partners → Reviews
```

## Целевой порядок после рефакторинга

```
Hero → BukletSlider → ServicesCalculatorRow → ProjectCase → WhyWeAndFAQRow →
Contacts → Partners → Reviews
```

---

## Секция 1: Hero

### Файл
`components/sections/Hero.tsx`

### Описание проблемы (баг на проде)

Текущая структура:
```
<section className="... flex flex-col ...">
  <Container className="... flex-1 flex items-center ...">
    <motion.div className="w-full max-w-5xl">
      {/* badge, h1, subtitle, stats, CTA */}
    </motion.div>
  </Container>
  <motion.button> {/* scroll-cue */} </motion.button>
</section>
```

Section — `flex flex-col`, Container — `flex-1`, внутри него `flex items-center`. `motion.div` имеет `max-w-5xl` (64rem = 1024px) — при ширине viewport 1280px это сжимает контент и центрирует его горизонтально, хотя в flex-колонке нет явного `align-items: center` по горизонтали. Визуальный эффект: блок контента не занимает полную ширину Container и выглядит центрированным.

### Изменения на lg+ (только lg:-классы)

#### Container
Добавить `lg:w-full` — снимает возможное сжатие flex-ребёнка:
```
было:   className="relative z-10 flex-1 flex items-center py-16 sm:py-20 md:py-24 short:py-4 short-sm:py-6"
стало:  className="relative z-10 flex-1 flex items-center py-16 sm:py-20 md:py-24 short:py-4 short-sm:py-6 lg:w-full"
```

#### motion.div (блок контента)
```
было:   className="w-full max-w-5xl"
стало:  className="w-full max-w-5xl lg:max-w-[620px] lg:ml-auto lg:text-right"
```
- `lg:max-w-[620px]` — ширина правого блока (~50% Container при 1280px)
- `lg:ml-auto` — прижимает блок к правому краю Container
- `lg:text-right` — текст вправо на lg+

#### Badge-строка
Обернуть `inline-flex` бейдж во flex-контейнер с `lg:justify-end`:
```
<div className="hidden sm:block lg:flex lg:justify-end">
  <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 rounded-full px-4 py-1.5 mb-6 short:mb-3">
    ...
  </div>
</div>
```

#### Subtitle (p)
```
было:   className="text-text-dark text-lg md:text-xl short:text-base leading-relaxed mb-10 short:mb-5 short-sm:mb-5 max-w-2xl"
стало:  className="text-text-dark text-lg md:text-xl short:text-base leading-relaxed mb-10 short:mb-5 short-sm:mb-5 max-w-2xl lg:ml-auto"
```

#### Stats grid
```
было:   className="grid grid-cols-3 gap-3 sm:gap-8 mb-10 sm:mb-12 short:mb-6 short-sm:mb-6"
стало:  className="grid grid-cols-3 gap-3 sm:gap-8 mb-10 sm:mb-12 short:mb-6 short-sm:mb-6 lg:justify-items-end"
```
Числа и подписи наследуют `text-right` от `motion.div`.

#### CTA-кнопки
```
было:   className="flex flex-col sm:flex-row gap-4"
стало:  className="flex flex-col sm:flex-row gap-4 lg:flex-row-reverse lg:justify-end"
```
- `lg:flex-row-reverse` — primary-кнопка (первая в DOM «Рассчитать стоимость ремонта») оказывается **справа**
- `lg:justify-end` — весь ряд прижат к правому краю

Обе кнопки **равной ширины** на lg+: добавить `lg:flex-1` на каждый `<Button>`. Flex-контейнер кнопок нужно дать фиксированную ширину на lg — либо она следует из `lg:max-w-[620px]` родителя (оба `flex-1` = по 50% ширины блока).

Правый край оранжевой кнопки совпадает с правым краем кнопки «Получить консультацию» в Header: оба блока используют Container с одинаковым `lg:px-8`, правый край Content = правый край Container. Проверить на 1280px и 1440px.

#### Scroll-cue (нижний элемент «Лукбук в подарок»)
Не трогать. `mx-auto w-fit` центрирует по горизонтали независимо от layout Hero.

#### Anchor fix (попутно с Hero)
Кнопка «Смотреть наши работы» скроллит к `getElementById("projects")` — такого id на странице нет. Исправить:
```
было:   document.getElementById("projects")?.scrollIntoView(...)
стало:  document.getElementById("project-case")?.scrollIntoView(...)
```

#### short: совместимость
- На 1366×768 (ноутбук): `lg:` активен (≥1024) И `short:` активен (≥768 + ≤820 высота)
- H1 получает `lg:text-7xl` И `short:text-5xl`
- Tailwind генерирует `short:` media-queries после `lg:`, поэтому `short:text-5xl` перекрывает `lg:text-7xl` — правильное поведение
- Если порядок нарушен — проверить сгенерированный CSS в DevTools

---

## Секция 2: BukletSlider

**Не трогать.** Слайдер расположен слева, имеет собственный дизайн. Обёртка `<div id="buklet">` остаётся в page.tsx без изменений.

---

## Секция 3: ServicesCalculatorRow (новый компонент)

### Новый файл
`components/sections/ServicesCalculatorRow.tsx`

### Концепция

Полноэкранный ряд без Container-обёртки (чтобы фон доходил до краёв экрана). На lg+ — grid из 12 колонок, Services в левых 7, Calculator в правых 5. Двухтонный фон обеспечивается bg-light и bg-dark на самих div-колоннах (не на section).

На мобайле: Calculator выше (DOM-порядок), Services ниже — соответствует текущему порядку в page.tsx.

### Структура

```tsx
// Нет <Container> на уровне section
<section className="relative overflow-hidden">
  <div className="lg:grid lg:grid-cols-12">

    {/* === CALCULATOR — первый в DOM → на мобайле сверху === */}
    <div
      id="calculator"
      className="bg-dark lg:col-span-5 lg:col-start-8 lg:row-start-1"
    >
      <div className="lg:sticky lg:top-[80px]">
        <Calculator sidebar />
      </div>
    </div>

    {/* === SERVICES — второй в DOM → на мобайле снизу === */}
    <div
      id="services"
      className="bg-light lg:col-span-7 lg:col-start-1 lg:row-start-1"
    >
      <Services compact />
    </div>

  </div>
</section>
```

- `lg:col-start-1 lg:row-start-1` на Services → принудительно в левые 7 колонок первого ряда
- `lg:col-start-8 lg:row-start-1` на Calculator → правые 5 колонок того же ряда
- DOM-порядок (Calculator первым) обеспечивает мобайл-порядок
- bg-light / bg-dark на колонных div → фон тянется от края до края viewport на любой ширине
- `<div className="lg:sticky lg:top-[80px]">` — sticky-обёртка. Calculator прилипает при скролле вдоль длинного списка Services

### Паддинг внутри колонн

Services и Calculator в sidebar/compact-режиме убирают собственный `<Container>` и используют `px-4 sm:px-6 lg:px-8` + `py-20 lg:py-24` как локальный паддинг. Двойной паддинг у шва (8px+8px = 16px) — допустимо, визуально ощущается как gutterline.

---

## Services: модификация — compact prop

### Файл
`components/sections/Services.tsx`

### Сигнатура
```tsx
interface ServicesProps { compact?: boolean }
export default function Services({ compact }: ServicesProps)
```

### Убрать дублированный id
Текущий баг: `<section id="services">` в Services.tsx + `<div id="services">` в page.tsx. В новом layout id живёт на колонной-обёртке в ServicesCalculatorRow → **удалить `id="services"` из section Services.tsx**.

### Изменения при `compact={true}` (добавляются lg:-классы)

#### Section-элемент
```
было:   <section id="services" className="py-20 md:py-28 bg-light">
стало:  <section className="py-20 md:py-28 lg:py-24 bg-light lg:bg-transparent">
```
(bg-light убирается, фон обеспечен родительским div; py уменьшается на lg)

#### Container
```
было:   <Container>
стало:  <Container className="lg:px-8">  {/* гарантируем lg:px-8 от шва */}
```

#### Заголовок (AnimateOnView)
```
было:   className="text-center mb-14"
стало:  className="text-center mb-14 lg:text-left lg:mb-10"
```

#### Subtitle под заголовком
```
было:   className="text-text-muted max-w-xl mx-auto"
стало:  className="text-text-muted max-w-xl mx-auto lg:mx-0"
```

#### Grid карточек
```
было:   className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6"
стало:  className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-4"
```

#### Изображение в карточке
```
было:   className="w-full h-32 sm:h-52 object-cover group-hover:scale-105 transition-transform duration-500"
стало:  className="w-full h-32 sm:h-52 lg:h-36 object-cover group-hover:scale-105 transition-transform duration-500"
```

#### Описание карточки (добавить `lg:hidden`)
```
было:   className="text-text-muted text-sm leading-relaxed hidden sm:block"
стало:  className="text-text-muted text-sm leading-relaxed hidden sm:block lg:hidden"
```
(На lg+ в compact = нет описания, только фото + название)

#### Паддинг карточки
```
было:   className="p-3 sm:p-6"
стало:  className="p-3 sm:p-6 lg:p-4"
```

#### sizes на Image (обновить под 7/12-колонку)
```
было:   sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
стало:  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, (max-width: 1440px) 20vw, 18vw"
```
Расчёт: 7/12 × 1/3 ≈ 19.4% viewport.

#### Ссылки «Все услуги» и «Авторский надзор»
Без изменений. `justify-center` остаётся, на lg+ можно добавить `lg:justify-start`, но это опционально.

---

## Calculator: модификация — sidebar prop

### Файл
`components/sections/Calculator.tsx`

### Сигнатура
```tsx
interface CalculatorProps { sidebar?: boolean }
export default function Calculator({ sidebar }: CalculatorProps)
```

### Изменения при `sidebar={true}`

#### Section-элемент и id
```
было:   <section id="calculator" className="py-20 md:py-28 bg-dark">
стало:  <section className="py-20 md:py-28 lg:py-24 bg-dark lg:bg-transparent">
```
id переехал на div-колонку в ServicesCalculatorRow.

#### Container
Заменить `<Container>` на `<div className="px-4 sm:px-6 lg:px-8">`.

#### Заголовок секции (div.text-center)
```
было:   className="text-center mb-14"
стало:  className="text-center mb-14 lg:text-left lg:mb-10"
```

#### Subtitle в заголовке
```
было:   className="text-text-dark max-w-xl mx-auto"
стало:  className="text-text-dark max-w-xl mx-auto lg:mx-0"
```

#### Карточка-контейнер (max-w-3xl mx-auto)
```
было:   className="max-w-3xl mx-auto"
стало:  className="max-w-3xl mx-auto lg:max-w-none lg:mx-0"
```

#### Вид работ (serviceTypes grid)
```
было:   className="grid grid-cols-2 md:grid-cols-4 gap-3"
стало:  className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:grid-cols-2"
```
Цель: 2×2 в узкой 5/12-колонке.

Расчёт: 5/12 × 1280 = 533px, минус паддинги ~64px = ~469px, карточка ≈ (469-12)/2 ≈ 228px — достаточно для текста.

#### Результат-строка (flex md:flex-row)
```
было:   className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
стало:  className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 lg:flex-col lg:items-stretch"
```
Результат в sidebar — столбик (цифра, затем кнопка ниже).

#### Checkmark в кнопке
`✓ Расчёт сохранён` использует символ ✓ (U+2713). Заменить на инлайн-SVG:
```tsx
{saved ? (
  <span className="inline-flex items-center gap-1.5">
    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 flex-shrink-0"
         stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="2,8 6,12 14,4" />
    </svg>
    Расчёт сохранён
  </span>
) : "Заказать смету"}
```

---

## Секция 4: ProjectCase

**Не трогать.** Текущий layout (фото слева ~6/12, текст справа ~6/12) соответствует второму «ряду кирпичей» — шов на 50%. Якорь `<div id="project-case">` в page.tsx остаётся.

---

## Секция 5: WhyWeAndFAQRow (новый компонент)

### Новый файл
`components/sections/WhyWeAndFAQRow.tsx`

### Концепция

Полноэкранный ряд без Container-обёртки. WhyWe — 5/12 левая колонна (bg-light), FAQ — 7/12 правая колонна (bg #16191D). DOM-порядок WhyWe → FAQ совпадает с нужным мобайл-порядком (WhyWe сверху, FAQ снизу) — инверсия не нужна.

Оранжевая полоска h-1 bg-accent переезжает из FAQ.tsx на div-колонку FAQ в этом компоненте.

### Структура

```tsx
<section className="relative overflow-hidden">
  <div className="lg:grid lg:grid-cols-12">

    {/* === WHYWE — 5/12 left === */}
    <div
      id="why"
      className="bg-light lg:col-span-5"
    >
      <WhyWe compact />
    </div>

    {/* === FAQ — 7/12 right === */}
    <div
      id="faq"
      className="relative lg:col-span-7"
      style={{ backgroundColor: "#16191D" }}
    >
      {/* Оранжевая полоска — только над FAQ-колонкой */}
      <div className="absolute top-0 inset-x-0 h-1 bg-accent" />
      <FAQ sidebar />
    </div>

  </div>
</section>
```

---

## WhyWe: модификация — compact prop

### Файл
`components/sections/WhyWe.tsx`

### Сигнатура
```tsx
interface WhyWeProps { compact?: boolean }
export default function WhyWe({ compact }: WhyWeProps)
```

### Изменения при `compact={true}`

#### Section-элемент и id
```
было:   <section id="why" className="py-20 md:py-28 bg-light">
стало:  <section className="py-20 md:py-28 lg:py-24 bg-light lg:bg-transparent">
```
id переехал на div-колонку в WhyWeAndFAQRow.

#### Container
```
было:   <Container>
стало:  <Container className="lg:px-8">
```

#### Заголовок (AnimateOnView)
```
было:   className="text-center mb-14"
стало:  className="text-center mb-14 lg:text-left lg:mb-10"
```

#### Subtitle под заголовком
```
было:   className="text-text-muted max-w-xl mx-auto"
стало:  className="text-text-muted max-w-xl mx-auto lg:mx-0 lg:max-w-none"
```

#### Grid преимуществ — вертикальный список на lg+
```
было:   className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
стало:  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 lg:gap-3"
```
Цель: 1-колоночный список в 5/12-колонке.

#### Карточка — горизонтальная на lg (иконка слева, текст справа)
```
было:   className="group p-6 bg-white rounded-lg border border-transparent hover:border-accent/30 shadow-sm hover:shadow-md transition-all duration-200 h-full"
стало:  className="group p-6 bg-white rounded-lg border border-transparent hover:border-accent/30 shadow-sm hover:shadow-md transition-all duration-200 h-full lg:flex lg:gap-4 lg:items-start lg:p-4"
```

#### Иконка-обёртка в карточке
```
было:   className="text-accent mb-4 group-hover:scale-110 transition-transform duration-200 inline-block"
стало:  className="text-accent mb-4 group-hover:scale-110 transition-transform duration-200 inline-block lg:mb-0 lg:flex-shrink-0 lg:mt-0.5"
```

#### Заголовок h3 (CLAUDE.md: три ступени)
Текущий `text-xl` (1 ступень) — в узкой колонке добавлять `lg:text-base` если не вмещается; если вмещается — не трогать. Три ступени правило здесь не нарушается (h3 не является секционным H1/H2, правило касается секционных заголовков).

---

## FAQ: модификация — sidebar prop

### Файл
`components/sections/FAQ.tsx`

### Сигнатура
```tsx
interface FAQProps { sidebar?: boolean }
export default function FAQ({ sidebar }: FAQProps)
```

### Изменения при `sidebar={true}`

#### Section-элемент, id, оранжевая полоска
```
было:   <section id="faq" className="relative py-20" style={{ backgroundColor: "#16191D" }}>
          <div className="absolute top-0 inset-x-0 h-1 bg-accent" />
стало:  <section className="relative py-20 lg:py-24">
```
id, bg и оранжевая полоска — в обёртке WhyWeAndFAQRow.

#### Container
Заменить `<Container>` на `<div className="px-4 sm:px-6 lg:px-8">`.

#### Заголовок (AnimateOnView)
```
было:   className="text-center mb-12"
стало:  className="text-center mb-12 lg:text-left lg:mb-10"
```

#### Список вопросов
```
было:   className="max-w-3xl mx-auto space-y-3"
стало:  className="max-w-3xl mx-auto space-y-3 lg:max-w-none lg:mx-0"
```

---

## page.tsx: итоговые изменения

### Файл
`app/page.tsx`

### Импорты — убрать

```tsx
// Убрать:
import Services from "@/components/sections/Services";
import Calculator from "@/components/sections/Calculator";
import WhyWe from "@/components/sections/WhyWe";
import FAQ from "@/components/sections/FAQ";
```

### Импорты — добавить

```tsx
import ServicesCalculatorRow from "@/components/sections/ServicesCalculatorRow";
import WhyWeAndFAQRow from "@/components/sections/WhyWeAndFAQRow";
```

### JSX — было

```tsx
<Calculator />
<div id="services"><Services /></div>
...
<WhyWe />
<FAQ />
```

### JSX — стало

```tsx
<ServicesCalculatorRow />
...
<WhyWeAndFAQRow />
```

---

## Аудит якорей

| Якорь | Откуда скроллят | Было | Стало |
|-------|----------------|------|-------|
| `#buklet` | Hero scroll-cue | `<div id="buklet">` в page.tsx | без изменений |
| `#calculator` | Hero CTA primary; Header | `<section id="calculator">` | `<div id="calculator">` в ServicesCalculatorRow |
| `#services` | Header nav (Услуги) | `<div id="services">` в page.tsx + дубль в `<section>` | `<div id="services">` в ServicesCalculatorRow (дубль убрать) |
| `#project-case` | Hero CTA secondary (после фикса) | `<div id="project-case">` в page.tsx | без изменений |
| `#why` | — | `<section id="why">` | `<div id="why">` в WhyWeAndFAQRow |
| `#faq` | — | `<section id="faq">` | `<div id="faq">` в WhyWeAndFAQRow |
| `#contacts` | Header CTA, Calculator CTA | в Contacts.tsx | без изменений |

**Обязательный фикс Hero**: `getElementById("projects")` → `getElementById("project-case")`.

---

## Риски

### 1. Sticky + Lenis
`position: sticky` на grid-item может не работать с Lenis (особенно Lenis v1, где root scroll перехватывается). Симптом: Calculator не прилипает при скролле вдоль Services.

Решение: если sticky ломается, добавить `data-lenis-prevent` на `<div className="lg:sticky">`. Либо переконфигурировать Lenis: `new Lenis({ wrapper: document.documentElement })`.

### 2. Заголовки в узких колонках (пять ступеней ≠ три ступени)

CLAUDE.md: «Заголовки ВСЕГДА через три ступени: `text-3xl sm:text-4xl md:text-5xl` — пропускать sm нельзя».

При необходимости уменьшить заголовок в узкой колонке добавлять `lg:text-4xl` как четвёртую ступень (а не заменять):
- WhyWe H2 «Почему выбирают нас» в 5/12-колонке (~500px): Oswald Bold — проверить визуально. Если обрезается — добавить `lg:text-4xl`.
- Calculator H2 «Калькулятор цены» в 5/12: то же.
- Services H2 «Наши услуги» в 7/12 (~700px): вписывается без правок.
- FAQ H2 «FAQ» в 7/12: вписывается.

### 3. Двойной паддинг у шва

У шва между Services и Calculator: обе колонны имеют `lg:px-8` (32px) = суммарно 64px между блоками контента. Это гарантированный «воздух» у шва. Если нужно сократить — уменьшить до `lg:px-6` (24px) на одной или обеих сторонах.

### 4. short: конфликт с lg: в Hero

На 1280×768 активны оба: `lg:` (≥1024) и `short:` (≥768 + ≤820 высота). H1 получит `lg:text-7xl` + `short:text-5xl`. Tailwind генерирует `short:` query после обычных брейкпоинтов, поэтому `short:text-5xl` должен перекрывать `lg:text-7xl`. Проверить в DevTools на 1280×768.

### 5. Дублированный id="services"

Баг уже на проде: Services.tsx имеет `<section id="services">` И page.tsx имеет `<div id="services">`. После рефакторинга: id только в ServicesCalculatorRow, из Services.tsx удалить.

### 6. Calculator grid тарифов в 5/12

При `lg:grid-cols-2` для видов работ (4 кнопки → 2×2): ширина кнопки ≈ 228px при 1280px. Текст «Строительство дома» (Oswald, sm, `text-sm`) помещается. При 1440px: ≈ 268px — свободнее.

Для тарифов (2 или 3 кнопки): `grid-cols-2` при house, `grid-cols-3` при repair. В 5/12 три кнопки ≈ 147px — тесно. Добавить `lg:grid-cols-2` для тарифов тоже: `className={\`grid gap-3 \${isHouse ? "grid-cols-2" : "grid-cols-3"} lg:grid-cols-2\`}`. Три тарифа «Эконом / Стандарт / Премиум» уложатся в 2+1 (последняя одна в ряд занимает оба столбца или остаётся одинокой).

Альтернатива: сохранить 3 колонки для тарифов, уменьшить padding кнопки с `p-3` до `lg:p-2` + `lg:text-xs`.

### 7. AnimateOnView в compact-компонентах

AnimateOnView использует задержки через prop `delay`. В compact/sidebar режимах задержки не меняются — поведение сохраняется. Единственный риск: при 1-колоночном списке WhyWe на lg все 6 элементов имеют нарастающие задержки (i * 0.07 = до 0.42с) — терпимо.

### 8. Без BukletSlider изменений

BukletSlider не трогаем. Убедиться что `<div id="buklet">` в page.tsx остаётся.

---

## Итоговый список файлов

### Новые файлы
- `components/sections/ServicesCalculatorRow.tsx`
- `components/sections/WhyWeAndFAQRow.tsx`

### Изменённые файлы
- `app/page.tsx` — заменить импорты и JSX
- `components/sections/Hero.tsx` — lg: выравнивание вправо, фикс anchor #projects → #project-case
- `components/sections/Services.tsx` — добавить compact prop, убрать id="services"
- `components/sections/Calculator.tsx` — добавить sidebar prop, убрать id="calculator", заменить ✓ на SVG
- `components/sections/WhyWe.tsx` — добавить compact prop, убрать id="why"
- `components/sections/FAQ.tsx` — добавить sidebar prop, убрать id="faq", убрать оранжевую полоску

### Не трогать
- `components/sections/BukletSlider.tsx`
- `components/sections/ProjectCase.tsx`
- `components/sections/Contacts.tsx`
- `components/sections/Partners.tsx`
- `components/sections/Reviews.tsx`
- `components/layout/Header.tsx`
- `components/ui/Container.tsx`
- `components/ui/Button.tsx`
- `tailwind.config.ts`
