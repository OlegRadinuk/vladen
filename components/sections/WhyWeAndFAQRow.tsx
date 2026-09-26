import WhyWe from "@/components/sections/WhyWe";
import FAQ from "@/components/sections/FAQ";

// WhyWe = 5/12, FAQ = 7/12.
// Split point:
//   viewport ≤ 1280px: WhyWe = 41.67% of viewport
//   viewport > 1280px: (viewport-1280)/2 + 5*1280/12 = 50% - 107px
//   CSS max(41.67%, calc(50% - 107px)) covers both cases.
// [overflow-x:clip] on the section clips the orange stripe that extends via
// lg:right-[-100vw] so it reaches the screen right edge without horizontal scroll.
// (No sticky element in this section → overflow-x:clip is safe here.)

const GRADIENT =
  "linear-gradient(to right, #ECF0F1 max(41.67%, calc(50% - 107px)), #16191D max(41.67%, calc(50% - 107px)))";

export default function WhyWeAndFAQRow() {
  return (
    <section className="relative [overflow-x:clip]" style={{ background: GRADIENT }}>
      <div className="max-w-7xl mx-auto">
        <div className="lg:grid lg:grid-cols-12 lg:items-start">

          {/* === WHYWE — 5/12 left === */}
          <div
            id="why"
            className="relative bg-light lg:bg-transparent lg:col-span-5"
          >
            <WhyWe compact />
          </div>

          {/* === FAQ — 7/12 right === */}
          {/* Stripe extends via lg:right-[-100vw]; section [overflow-x:clip] clips it
              to the screen right edge without affecting any sibling elements. */}
          <div
            id="faq"
            className="relative bg-[#16191D] lg:bg-transparent lg:col-span-7"
          >
            {/* Оранжевая полоска: на мобайле — вся ширина FAQ; на lg+ — до правого края экрана */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-accent lg:right-[-100vw]" />
            <FAQ sidebar />
          </div>

        </div>
      </div>
    </section>
  );
}
