import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Владен — Ремонт квартир и домов в Симферополе";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#1A1A1A",
          position: "relative",
        }}
      >
        {/* Accent top stripe */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "#D97706",
          }}
        />

        {/* Grid pattern overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(217,119,6,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(217,119,6,0.06) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: "-10%",
            left: "-5%",
            width: "50%",
            height: "80%",
            background:
              "radial-gradient(ellipse, rgba(217,119,6,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "60px 80px",
            height: "100%",
          }}
        >
          {/* Logo row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                background: "#D97706",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                fontWeight: 900,
                color: "white",
                fontFamily: "sans-serif",
              }}
            >
              В
            </div>
            <span
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: "white",
                fontFamily: "sans-serif",
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              ВЛАДЕН
            </span>
          </div>

          {/* Main text */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div
              style={{
                fontSize: 64,
                fontWeight: 900,
                color: "white",
                fontFamily: "sans-serif",
                lineHeight: 1.1,
                letterSpacing: -1,
              }}
            >
              Ремонт квартир и домов
            </div>
            <div
              style={{
                fontSize: 64,
                fontWeight: 900,
                color: "#D97706",
                fontFamily: "sans-serif",
                lineHeight: 1.1,
                letterSpacing: -1,
              }}
            >
              под ключ в Симферополе
            </div>
            <div
              style={{
                fontSize: 26,
                color: "#9CA3AF",
                fontFamily: "sans-serif",
                marginTop: 8,
              }}
            >
              Дизайнерский ремонт · Строительство · Проектирование
            </div>
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", gap: 60 }}>
            {[
              { num: "369+", label: "объектов сдано" },
              { num: "12", label: "лет на рынке" },
              { num: "98%", label: "клиентов довольны" },
            ].map((s) => (
              <div
                key={s.label}
                style={{ display: "flex", flexDirection: "column", gap: 4 }}
              >
                <span
                  style={{
                    fontSize: 44,
                    fontWeight: 900,
                    color: "#D97706",
                    fontFamily: "sans-serif",
                    lineHeight: 1,
                  }}
                >
                  {s.num}
                </span>
                <span
                  style={{
                    fontSize: 18,
                    color: "#9CA3AF",
                    fontFamily: "sans-serif",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
