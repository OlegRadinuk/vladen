import Services from "@/components/sections/Services";
import Calculator from "@/components/sections/Calculator";

// At lg+ (≥1024px) with max-w-7xl (1280px centered):
//   viewport ≤ 1280px: Services (7/12) = 58.33% of viewport → split at 58.33%
//   viewport > 1280px: split = (viewport-1280)/2 + 7*1280/12 = 50% + 107px
//   CSS min(58.33%, calc(50% + 107px)) covers both cases exactly.
// On mobile the child divs have their own bg (dark/light) that covers this gradient.

const GRADIENT =
  "linear-gradient(to right, #ECF0F1 min(58.33%, calc(50% + 107px)), #2A2F35 min(58.33%, calc(50% + 107px)))";

export default function ServicesCalculatorRow() {
  return (
    <section className="relative" style={{ background: GRADIENT }}>
      <div className="max-w-7xl mx-auto">
        {/* lg:items-start — колонки выравниваются по верху, не растягиваются */}
        <div className="lg:grid lg:grid-cols-12 lg:items-start">

          {/* === CALCULATOR — первый в DOM → мобайл сверху === */}
          <div
            id="calculator"
            className="relative bg-dark lg:bg-transparent lg:col-span-5 lg:col-start-8 lg:row-start-1"
          >
            <Calculator sidebar />
          </div>

          {/* === SERVICES — второй в DOM → мобайл снизу === */}
          <div
            id="services"
            className="relative bg-light lg:bg-transparent lg:col-span-7 lg:col-start-1 lg:row-start-1"
          >
            <Services compact />
          </div>

        </div>
      </div>
    </section>
  );
}
