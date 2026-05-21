"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

const SLIDES = [
  { id: "01", label: "Обложка" },
  { id: "02", label: "Обзор" },
  { id: "03", label: "Эконом" },
  { id: "04", label: "Комфорт" },
  { id: "05", label: "Премиум" },
  { id: "06", label: "Контакты" },
];

function Slide01() {
  return (
    <section
      style={{
        position: "absolute",
        inset: 0,
        width: 1920,
        height: 1080,
        overflow: "hidden",
        background: "#1A1A1A",
        color: "#F5F3EF",
        fontFamily: '"Manrope", system-ui, sans-serif',
        display: "grid",
        gridTemplateRows: "1fr auto",
        padding: "56px 96px 48px",
        boxSizing: "border-box",
      }}
    >
      {/* Hero */}
      <div style={{ alignSelf: "center", position: "relative", zIndex: 2 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 12, border: "1px solid rgba(245,243,239,.22)", borderRadius: 999, padding: "11px 22px", fontSize: 13, letterSpacing: ".2em", textTransform: "uppercase", fontWeight: 600, marginBottom: 44 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#F39C2D", display: "inline-block" }}></span>
          Ремонт и строительство в Крыму с 2014 года
        </div>
        <h1 style={{ margin: 0, fontWeight: 800, fontSize: 168, lineHeight: .92, letterSpacing: "-.035em" }}>
          Варианты ремонта<br /><span style={{ color: "#F39C2D" }}>под ключ в Крыму</span>
        </h1>
        <p style={{ marginTop: 36, maxWidth: 880, fontSize: 26, lineHeight: 1.45, color: "rgba(245,243,239,.8)", fontWeight: 400 }}>
          Три уровня отделки со стартовыми ценами от 17 000 ₽ за квадратный метр — от инвестиционной аренды до архитектурного премиума. Подобранные материалы, прозрачная смета, готовые сценарии заселения.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderTop: "1px solid rgba(245,243,239,.18)", paddingTop: 28, marginTop: 64 }}>
          {[
            { from: "от", num: "17 000", unit: "₽/м²", lab: "Эконом", sub: "Под аренду и инвестиции" },
            { from: "от", num: "27 000", unit: "₽/м²", lab: "Комфорт", sub: "Для собственного проживания" },
            { from: "от", num: "37 000", unit: "₽/м²", lab: "Премиум", sub: "Дизайнерский подход" },
          ].map((s, i) => (
            <div key={i} style={{ padding: "0 24px", borderLeft: i === 0 ? "none" : "1px solid rgba(245,243,239,.18)", paddingLeft: i === 0 ? 0 : undefined }}>
              <div style={{ fontWeight: 800, fontSize: 64, lineHeight: 1, color: "#F39C2D", letterSpacing: "-.02em", display: "flex", alignItems: "baseline", gap: 10 }}>
                <span style={{ fontSize: 18, fontWeight: 600, color: "rgba(245,243,239,.55)", alignSelf: "center" }}>{s.from}</span>
                {s.num}
                <small style={{ fontSize: 22, fontWeight: 600, color: "rgba(245,243,239,.6)", letterSpacing: 0 }}>{s.unit}</small>
              </div>
              <div style={{ marginTop: 16, fontSize: 13, letterSpacing: ".22em", textTransform: "uppercase", fontWeight: 700, color: "#F5F3EF" }}>{s.lab}</div>
              <div style={{ fontSize: 12, letterSpacing: ".18em", textTransform: "uppercase", fontWeight: 500, color: "rgba(245,243,239,.55)", marginTop: 6 }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div style={{ zIndex: 2, position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(245,243,239,.18)", paddingTop: 22 }}>
        <span style={{ fontSize: 13, letterSpacing: ".22em", textTransform: "uppercase", fontWeight: 600, opacity: .55 }}>Лукбук · Том I · 2026</span>
        <span style={{ fontSize: 13, letterSpacing: ".22em", textTransform: "uppercase", fontWeight: 600, opacity: .55 }}>Симферополь · Евпатория · Крым</span>
      </div>
    </section>
  );
}

function Slide02() {
  const ink = "#1A1A1A";
  const paper = "#F5F3EF";
  const line = "rgba(26,26,26,0.14)";
  return (
    <section style={{ position: "absolute", inset: 0, width: 1920, height: 1080, overflow: "hidden", background: paper, color: ink, fontFamily: '"Manrope", system-ui, sans-serif', display: "grid", gridTemplateRows: "1fr auto auto", gap: 32, padding: "56px 96px 56px", boxSizing: "border-box" }}>
      <RunningFoot left="Три уровня отделки" page="02 / 06" />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 60 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 720 }}>
          <h1 style={{ margin: 0, fontWeight: 800, fontSize: 96, lineHeight: .95, letterSpacing: "-.035em" }}>Три уровня,<br />один <span style={{ color: "#F39C2D" }}>стандарт.</span></h1>
        </div>
        <p style={{ textAlign: "right", maxWidth: 520, fontSize: 20, lineHeight: 1.55, color: "#2A2A2A", fontWeight: 400, margin: 0 }}>
          Каждый пакет — это готовый продукт: стартовая цена от квадратного метра, подобранные материалы и понятный сценарий. Без скрытых платежей.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, alignItems: "stretch" }}>
        {[
          { num: "01", name: "Эконом", price: "17 000", dark: false, items: ["Под аренду", "Быстрое заселение", "Ограниченный бюджет", "Инвестиционная недвижимость"], note: "Аккуратный современный ремонт без визуального перегруза — чисто, практично, готово к заселению." },
          { num: "02", name: "Комфорт", price: "27 000", dark: false, items: ["Для семьи", "Для жизни", "Баланс цены и дизайна", "Комфортное проживание"], note: "Ремонт «для себя» — современно, уютно. Скрытый свет, инсталляции, кварцвинил." },
          { num: "03", name: "Премиум", price: "37 000", dark: true, items: ["Статусный интерьер", "Дорогая недвижимость", "Максимальный визуал", "Дизайнерский подход"], note: "Архитектурный современный интерьер: теневые потолки, скрытый свет, крупный керамогранит." },
        ].map((t) => (
          <div key={t.num} style={{ border: `1px solid ${t.dark ? "#1A1A1A" : line}`, background: t.dark ? "#1A1A1A" : "#fff", color: t.dark ? "#F5F3EF" : ink, padding: "36px 32px", display: "flex", flexDirection: "column", gap: 0 }}>
            <div style={{ fontSize: 12, letterSpacing: ".22em", textTransform: "uppercase", fontWeight: 700, opacity: .5 }}>— {t.num} / Уровень</div>
            <div style={{ margin: "22px 0 8px", fontWeight: 800, fontSize: 56, lineHeight: 1, letterSpacing: "-.02em" }}>{t.name}</div>
            <div style={{ fontWeight: 800, fontSize: 38, lineHeight: 1, letterSpacing: "-.015em", color: "#F39C2D", display: "flex", alignItems: "baseline", gap: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: t.dark ? "rgba(245,243,239,.55)" : ink, opacity: t.dark ? 1 : .55, letterSpacing: ".04em" }}>от</span>
              {t.price}
              <small style={{ fontSize: 14, opacity: .6, fontWeight: 600, letterSpacing: ".04em", color: t.dark ? "rgba(245,243,239,.6)" : ink }}>₽ / м²</small>
            </div>
            <div style={{ height: 1, background: t.dark ? "rgba(245,243,239,.16)" : line, margin: "24px 0" }}></div>
            <div style={{ fontSize: 11, letterSpacing: ".24em", textTransform: "uppercase", fontWeight: 700, opacity: .55, marginBottom: 14 }}>Для кого</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10, fontSize: 17, fontWeight: 500 }}>
              {t.items.map(item => (
                <li key={item} style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                  <span style={{ flex: "none", width: 6, height: 6, background: "#F39C2D", display: "inline-block", transform: "translateY(-3px)" }}></span>
                  {item}
                </li>
              ))}
            </ul>
            <div style={{ marginTop: "auto", paddingTop: 24, fontSize: 14, lineHeight: 1.5, color: t.dark ? "rgba(245,243,239,.7)" : "#2A2A2A", fontWeight: 500 }}>{t.note}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderTop: `1px solid ${line}`, paddingTop: 22 }}>
        {[
          { v: <><span style={{ color: "#F39C2D" }}>17 000</span> / м²</>, l: "Стартовая цена", prefix: "от " },
          { v: <><span style={{ color: "#F39C2D" }}>30</span> дней</>, l: "Срок ремонта", prefix: "от " },
          { v: <><span style={{ color: "#F39C2D" }}>2</span> года</>, l: "Гарантия" },
          { v: <><span style={{ color: "#F39C2D" }}>2014</span></>, l: "Работаем в Крыму", prefix: "с " },
        ].map((row, i) => (
          <div key={i} style={{ padding: "0 28px", borderLeft: i === 0 ? "none" : `1px solid ${line}`, paddingLeft: i === 0 ? 0 : undefined }}>
            <div style={{ fontWeight: 800, fontSize: 30, letterSpacing: "-.015em", lineHeight: 1 }}>{row.prefix}{row.v}</div>
            <div style={{ fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", fontWeight: 700, opacity: .55, marginTop: 10 }}>{row.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TierSlide({ tier, pageNum }: { tier: { num: string; name: string; price: string; bg: string; dark: boolean; warm: boolean; metaColor?: string; headBorder: string; specRows: { cat: string; val: string }[]; styleTitle: string; styleText: string; chips: string[]; imgs: string[]; who: { solid: string; rest: string[] } }; pageNum: string }) {
  const bg = tier.bg;
  const textColor = tier.dark ? "#F5F3EF" : "#1A1A1A";
  const line = tier.dark ? "rgba(245,243,239,.16)" : "rgba(26,26,26,0.14)";
  const lineStrong = tier.dark ? "#F5F3EF" : "#1A1A1A";
  const renderBg = tier.dark ? "#1A1A1A" : tier.warm ? "#FBF8F1" : "#fff";
  const styleBg = tier.warm ? "#E2DAC8" : tier.dark ? "#1F1F1F" : "rgba(26,26,26,0.06)";
  const metaLabel = `Уровень ${tier.num} · ${tier.name === "Эконом" ? "Под аренду и инвестиции" : tier.name === "Комфорт" ? "Для собственного проживания" : "Архитектурный современный интерьер"}`;
  const roomLabels = ["Гостиная", "Кухня", "Санузел", "Спальня"];
  return (
    <section style={{ position: "absolute", inset: 0, width: 1920, height: 1080, overflow: "hidden", background: bg, color: textColor, fontFamily: '"Manrope", system-ui, sans-serif', display: "grid", gridTemplateRows: "auto auto auto", gap: 22, padding: "52px 96px 52px", boxSizing: "border-box" }}>
      <RunningFoot left={`${tier.name} · от ${tier.price} ₽/м²`} page={`${pageNum} / 06`} />

      {/* Head */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "end", paddingBottom: 22, borderBottom: `1px solid ${line}` }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 13, letterSpacing: ".24em", textTransform: "uppercase", fontWeight: 700, opacity: .55 }}>— Уровень <b style={{ color: "#F39C2D" }}>{tier.num}</b> · {metaLabel.split(" · ")[1]}</div>
          <h2 style={{ margin: 0, fontWeight: 800, fontSize: 104, lineHeight: .9, letterSpacing: "-.045em" }}>
            {tier.name} <span style={{ color: "#F39C2D", display: "inline-block", marginLeft: 28 }}>
              <span style={{ fontSize: 24, fontWeight: 600, letterSpacing: ".02em", color: tier.dark ? "rgba(245,243,239,.5)" : "rgba(26,26,26,.45)", marginRight: 5, verticalAlign: 10, textTransform: "lowercase" }}>от</span>
              {tier.price}
              <small style={{ fontSize: 22, fontWeight: 600, letterSpacing: ".02em", color: tier.dark ? "rgba(245,243,239,.5)" : "rgba(26,26,26,.55)", verticalAlign: 6, marginLeft: 6 }}>₽/м²</small>
            </span>
          </h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-end" }}>
          <div style={{ fontSize: 11, letterSpacing: ".24em", textTransform: "uppercase", fontWeight: 700, opacity: .55 }}>Для кого подходит</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "flex-end", maxWidth: 540 }}>
            <Chip solid>{tier.who.solid}</Chip>
            {tier.who.rest.map(w => <Chip key={w} dark={tier.dark}>{w}</Chip>)}
          </div>
        </div>
      </div>

      {/* Renders */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, alignItems: "stretch" }}>
        {tier.imgs.map((src, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", background: renderBg, border: `1px solid ${line}` }}>
            <div style={{ width: "100%", aspectRatio: "4/3", overflow: "hidden", background: "#BCB5A8", position: "relative" }}>
              <img src={src} alt={roomLabels[i]} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", borderTop: `1px solid ${line}` }}>
              <span style={{ fontSize: 14, letterSpacing: ".22em", textTransform: "uppercase", fontWeight: 700 }}>{roomLabels[i]}</span>
              <span style={{ fontSize: 11, letterSpacing: ".18em", opacity: .5, fontWeight: 600 }}>0{i + 1} / 04</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div style={{ display: "grid", gridTemplateColumns: "1.45fr 1fr", gap: 56, alignItems: "stretch", paddingTop: 14 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 17 }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", fontWeight: 700, fontSize: 11, letterSpacing: ".24em", textTransform: "uppercase", padding: "0 0 12px", opacity: .55, borderBottom: `1px solid ${lineStrong}` }}>Категория</th>
              <th style={{ textAlign: "left", fontWeight: 700, fontSize: 11, letterSpacing: ".24em", textTransform: "uppercase", padding: "0 0 12px", opacity: .55, borderBottom: `1px solid ${lineStrong}` }}>Что входит в стоимость</th>
            </tr>
          </thead>
          <tbody>
            {tier.specRows.map((row, i) => (
              <tr key={i}>
                <td style={{ padding: "10px 0", borderBottom: i < tier.specRows.length - 1 ? `1px solid ${line}` : "none", verticalAlign: "top", width: "32%", fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", fontWeight: 700, opacity: .6, paddingTop: 14 }}>{row.cat}</td>
                <td style={{ padding: "10px 0", borderBottom: i < tier.specRows.length - 1 ? `1px solid ${line}` : "none", fontWeight: 500, lineHeight: 1.35 }}>{row.val}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ border: `1px solid ${line}`, padding: "22px 24px", background: styleBg, display: "flex", flexDirection: "column", gap: 10, height: "100%", boxSizing: "border-box" }}>
          <div style={{ fontSize: 11, letterSpacing: ".24em", textTransform: "uppercase", fontWeight: 700, opacity: .55, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 18, height: 2, background: "#F39C2D", display: "inline-block" }}></span>
            Общий стиль
          </div>
          <div style={{ fontWeight: 800, fontSize: 24, lineHeight: 1.1, letterSpacing: "-.015em" }}>{tier.styleTitle}</div>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: tier.dark ? "rgba(245,243,239,.78)" : "#2A2A2A", fontWeight: 500 }}>{tier.styleText}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 6 }}>
            {tier.chips.map(chip => (
              <span key={chip} style={{ display: "inline-flex", alignItems: "center", gap: 6, border: `1px solid ${line}`, borderRadius: 999, padding: "6px 12px", fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", fontWeight: 600, color: tier.dark ? "rgba(245,243,239,.85)" : undefined }}>{chip}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Slide06() {
  const line = "rgba(245,243,239,.16)";
  return (
    <section style={{ position: "absolute", inset: 0, width: 1920, height: 1080, overflow: "hidden", background: "#161616", color: "#F5F3EF", fontFamily: '"Manrope", system-ui, sans-serif', display: "grid", gridTemplateRows: "auto 1fr auto", gap: 36, padding: "56px 96px 48px", boxSizing: "border-box" }}>


      <div>
        <div style={{ fontSize: 13, letterSpacing: ".24em", textTransform: "uppercase", fontWeight: 700, display: "flex", alignItems: "center", gap: 12, color: "#F5F3EF", marginBottom: 24 }}>
          <span style={{ width: 24, height: 2, background: "#F39C2D", display: "inline-block" }}></span>
          Поговорим о вашем объекте
        </div>
        <h2 style={{ margin: 0, fontWeight: 800, fontSize: 152, lineHeight: .92, letterSpacing: "-.045em" }}>Обсудим<br />ваш <span style={{ color: "#F39C2D" }}>ремонт.</span></h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr auto", borderTop: `1px solid ${line}`, paddingTop: 36 }}>
        <div style={{ paddingRight: 36 }}>
          <div style={{ fontSize: 12, letterSpacing: ".24em", textTransform: "uppercase", fontWeight: 700, opacity: .55, marginBottom: 16 }}>Телефон</div>
          <div style={{ fontWeight: 600, fontSize: 26, lineHeight: 1.35, letterSpacing: "-.005em" }}>
            <a href="tel:+79787174447" style={{ color: "inherit", textDecoration: "none" }}><span style={{ color: "#F39C2D" }}>+7</span> (978) 717‑44‑47</a>
          </div>
          <div style={{ fontSize: 12, letterSpacing: ".24em", textTransform: "uppercase", fontWeight: 700, opacity: .55, marginBottom: 16, marginTop: 32 }}>Email</div>
          <div style={{ fontWeight: 600, fontSize: 26, lineHeight: 1.35, letterSpacing: "-.005em" }}>
            <a href="mailto:vladen2026@mail.ru" style={{ color: "inherit", textDecoration: "none" }}>vladen2026@mail.ru</a>
          </div>
        </div>
        <div style={{ padding: "0 36px", borderLeft: `1px solid ${line}` }}>
          <div style={{ fontSize: 12, letterSpacing: ".24em", textTransform: "uppercase", fontWeight: 700, opacity: .55, marginBottom: 16 }}>Сегменты</div>
          <div style={{ fontWeight: 500, fontSize: 18, lineHeight: 1.7 }}>
            <span style={{ color: "#F39C2D" }}>01</span> Эконом — от 17 000 ₽/м²<br />
            <span style={{ color: "#F39C2D" }}>02</span> Комфорт — от 27 000 ₽/м²<br />
            <span style={{ color: "#F39C2D" }}>03</span> Премиум — от 37 000 ₽/м²
          </div>
        </div>
        <div style={{ padding: "0 36px", borderLeft: `1px solid ${line}` }}>
          <div style={{ fontSize: 12, letterSpacing: ".24em", textTransform: "uppercase", fontWeight: 700, opacity: .55, marginBottom: 16 }}>Что дальше</div>
          <div style={{ fontWeight: 500, fontSize: 18, lineHeight: 1.55 }}>
            1. Замер объекта<br />
            2. Подбор пакета<br />
            3. Прозрачная смета<br />
            4. Договор и старт работ
          </div>
        </div>
        <div style={{ paddingLeft: 36, borderLeft: `1px solid ${line}`, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <div style={{ fontSize: 12, letterSpacing: ".24em", textTransform: "uppercase", fontWeight: 700, opacity: .55, alignSelf: "stretch" }}>Сайт</div>
          <div style={{ width: 200, display: "flex", flexDirection: "column", gap: 10 }}>
            <img src="/buklet/qr-site.png" alt="QR на сайт" style={{ width: "100%", height: "auto", display: "block", borderRadius: 4, boxShadow: "0 18px 40px -20px rgba(0,0,0,.6)" }} />
            <div style={{ fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", fontWeight: 800, color: "#F39C2D", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
              <span>vladen‑crimea.ru</span>
              <small style={{ fontSize: 9, letterSpacing: ".16em", fontWeight: 600, color: "#F5F3EF", opacity: .7 }}>→ СКАН</small>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div style={{ fontSize: 12, letterSpacing: ".24em", textTransform: "uppercase", fontWeight: 700, opacity: .55, marginBottom: 14 }}>Офисы в Крыму</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, maxWidth: 900 }}>
          {[{ city: "Симферополь", addr: "ул. Киевская, 41 — офис 727" }, { city: "Евпатория", addr: "ул. Дзержинского, 16 — офис 7" }].map(o => (
            <div key={o.city} style={{ border: `1px solid ${line}`, padding: "22px 24px", background: "#1F1F1F" }}>
              <div style={{ fontSize: 12, letterSpacing: ".24em", textTransform: "uppercase", fontWeight: 700, color: "#F39C2D", marginBottom: 12 }}>{o.city}</div>
              <div style={{ fontSize: 18, lineHeight: 1.45, fontWeight: 500 }}>{o.addr}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${line}`, paddingTop: 22, fontSize: 13, letterSpacing: ".22em", textTransform: "uppercase", fontWeight: 600, opacity: .6 }}>
        <span>© ВЛАДЕН · Строительная компания · с 2014</span>
        <span>06 / 06</span>
      </div>
    </section>
  );
}

// Shared micro-components
function Badge() {
  return (
    <div style={{ position: "absolute", top: 0, right: 0, background: "#F39C2D", color: "#1A1A1A", padding: "16px 28px 16px 56px", display: "flex", alignItems: "baseline", gap: 12, fontWeight: 800, letterSpacing: ".18em", textTransform: "uppercase", zIndex: 3, clipPath: "polygon(40px 0, 100% 0, 100% 100%, 0 100%)", whiteSpace: "nowrap", fontFamily: '"Manrope", system-ui, sans-serif' }}>
      <span style={{ fontSize: 13 }}>Лукбук</span>
      <span style={{ fontSize: 18, letterSpacing: ".06em" }}>2026</span>
      <span style={{ fontSize: 11, opacity: .7, letterSpacing: ".22em" }}>Том I</span>
    </div>
  );
}

function RunningHead({ meta, metaColor }: { meta: string; metaColor?: string }) {
  return (
    <div style={{ position: "absolute", top: 48, left: 96, right: 96, display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 2 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <Image src="/logo.png" alt="Владен" width={44} height={44} style={{ height: 44, width: "auto" }} />
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
          <span style={{ fontWeight: 800, fontSize: 22, letterSpacing: ".18em" }}>ВЛАДЕН</span>
          <span style={{ fontWeight: 500, fontSize: 10, letterSpacing: ".32em", opacity: .55, marginTop: 5, textTransform: "uppercase" }}>Строительная компания</span>
        </div>
      </div>
      <div style={{ fontSize: 13, letterSpacing: ".22em", textTransform: "uppercase", fontWeight: 700, opacity: .65, marginRight: 230, color: metaColor }}>{meta}</div>
    </div>
  );
}

function RunningFoot({ left, page }: { left: string; page: string }) {
  return (
    <div style={{ position: "absolute", bottom: 36, left: 96, right: 96, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, letterSpacing: ".22em", textTransform: "uppercase", fontWeight: 600, opacity: .55 }}>
      <span>{left}</span>
      <span>{page}</span>
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 13, letterSpacing: ".24em", textTransform: "uppercase", fontWeight: 700, display: "flex", alignItems: "center", gap: 12 }}>
      <span style={{ width: 24, height: 2, background: "#F39C2D", display: "inline-block" }}></span>
      {children}
    </div>
  );
}

function Chip({ children, solid, dark }: { children: React.ReactNode; solid?: boolean; dark?: boolean }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      border: solid ? "none" : `1px solid ${dark ? "rgba(245,243,239,.16)" : "rgba(26,26,26,0.14)"}`,
      borderRadius: 999, padding: "6px 12px",
      fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", fontWeight: 600,
      background: solid ? "#1A1A1A" : "transparent",
      color: solid ? "#F5F3EF" : dark ? "rgba(245,243,239,.85)" : undefined,
    }}>
      {solid && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#F39C2D", flexShrink: 0 }}></span>}
      {children}
    </span>
  );
}

const TIER_SLIDES = [
  {
    num: "01", name: "Эконом", price: "17 000", bg: "#F5F3EF", dark: false, warm: false,
    headBorder: "rgba(26,26,26,0.14)",
    specRows: [
      { cat: "Пол", val: "Ламинат 32 класс" },
      { cat: "Стены", val: "Покраска / обои" },
      { cat: "Потолок", val: "Натяжной потолок" },
      { cat: "Освещение", val: "Накладные светильники" },
      { cat: "Санузел", val: "Базовая сантехника, обычный унитаз" },
      { cat: "Двери", val: "Стандартные межкомнатные" },
    ],
    styleTitle: "Чисто, современно, практично.",
    styleText: "Аккуратный современный ремонт без визуального перегруза. Подходит для аренды, перепродажи и быстрого запуска квартиры — без дизайнерских претензий, но с уважением к деталям.",
    chips: ["Минимум декора", "Светлая палитра", "Быстрый запуск"],
    imgs: ["/buklet/econ-living.png", "/buklet/econ-kitchen.png", "/buklet/econ-bath.png", "/buklet/econ-bedroom.png"],
    who: { solid: "Под аренду", rest: ["Быстрое заселение", "Ограниченный бюджет", "Инвестиционная недвижимость"] },
  },
  {
    num: "02", name: "Комфорт", price: "27 000", bg: "#EBE5D8", dark: false, warm: true,
    headBorder: "rgba(26,26,26,0.14)",
    specRows: [
      { cat: "Пол", val: "Кварцвинил" },
      { cat: "Стены", val: "Декоративная штукатурка / покраска" },
      { cat: "Потолок", val: "Натяжной со скрытой подсветкой" },
      { cat: "Освещение", val: "Встроенные светильники, локальный свет" },
      { cat: "Санузел", val: "Современная сантехника, скрытые подводки" },
      { cat: "Двери", val: "Скрытые или улучшенные двери" },
    ],
    styleTitle: "Современно, уютно, для себя.",
    styleText: "Ремонт «для себя». Интересные текстуры, скрытая подсветка, инсталляция в санузле, более качественная кухня. Уютный современный интерьер с акцентом на сценарии повседневной жизни.",
    chips: ["Скрытый свет", "Кварцвинил", "Декор. штукатурка"],
    imgs: ["/buklet/comf-living.png", "/buklet/comf-kitchen.png", "/buklet/comf-bath.png", "/buklet/comf-bedroom.png"],
    who: { solid: "Для семьи", rest: ["Для жизни", "Баланс цены и дизайна", "Комфортное проживание"] },
  },
  {
    num: "03", name: "Премиум", price: "37 000", bg: "#161616", dark: true, warm: false,
    headBorder: "rgba(245,243,239,.16)",
    specRows: [
      { cat: "Пол", val: "Крупноформатный керамогранит / инженерная доска" },
      { cat: "Стены", val: "Декоративные панели, камень, сложные текстуры" },
      { cat: "Потолок", val: "Теневой профиль" },
      { cat: "Освещение", val: "Архитектурный свет, много скрытой подсветки" },
      { cat: "Санузел", val: "Премиальная сантехника, инсталляции" },
      { cat: "Двери", val: "Скрытые двери premium" },
    ],
    styleTitle: "Архитектура, свет и деталь.",
    styleText: "Дорогие материалы, скрытый свет, продуманная архитектура. Премиум отличается не «цветом», а уровнем деталей: теневые потолки, крупный керамогранит, дизайнерская мебель и встроенные решения.",
    chips: ["Теневой профиль", "Архитектурный свет"],
    imgs: ["/buklet/prem-living.png", "/buklet/prem-kitchen.png", "/buklet/prem-bath.png", "/buklet/prem-bedroom.png"],
    who: { solid: "Статусный интерьер", rest: ["Дорогая недвижимость", "Максимальный визуал", "Дизайнерский подход"] },
  },
];

export default function BukletSlider({ nextSectionId = "project-case" }: { nextSectionId?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cellsRef = useRef<HTMLDivElement[]>([]);
  const [current, setCurrent] = useState(0);
  const [scale, setScale] = useState(1);
  const total = SLIDES.length;

  const rescale = useCallback(() => {
    if (!cellsRef.current[0]) return;
    const cell = cellsRef.current[0];
    const rect = cell.getBoundingClientRect();
    // Fill width exactly — no black bars on sides
    setScale(rect.width / 1920);
  }, []);

  useEffect(() => {
    rescale();
    const ro = new ResizeObserver(rescale);
    if (cellsRef.current[0]) ro.observe(cellsRef.current[0]);
    window.addEventListener("resize", rescale);
    if (document.fonts?.ready) document.fonts.ready.then(rescale);
    const t1 = setTimeout(rescale, 50);
    const t2 = setTimeout(rescale, 300);
    return () => { ro.disconnect(); window.removeEventListener("resize", rescale); clearTimeout(t1); clearTimeout(t2); };
  }, [rescale]);

  const goTo = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track || i < 0 || i >= total) return;
    const cell = cellsRef.current[i];
    if (cell) track.scrollTo({ left: cell.offsetLeft, behavior: "smooth" });
    setCurrent(i);
  }, [total]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let timer: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const idx = Math.round(track.scrollLeft / track.clientWidth);
        setCurrent(Math.max(0, Math.min(total - 1, idx)));
      }, 100);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => { track.removeEventListener("scroll", onScroll); clearTimeout(timer); };
  }, [total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;
      if (e.key === "ArrowRight") { e.preventDefault(); goTo(current + 1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); goTo(current - 1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, goTo]);

  const scrollToNext = () => {
    const el = document.getElementById(nextSectionId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const ArrowBtn = ({ dir, onClick, disabled }: { dir: "left" | "right"; onClick: () => void; disabled: boolean }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "left" ? "Назад" : "Вперёд"}
      className="buklet-arrow"
      style={{
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        [dir]: 16,
        zIndex: 10,
        width: 52, height: 52,
        borderRadius: "50%",
        border: "1px solid rgba(245,243,239,.25)",
        background: "rgba(22,22,22,.75)",
        backdropFilter: "blur(8px)",
        color: "#F5F3EF",
        cursor: disabled ? "default" : "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: disabled ? 0.25 : 1,
        transition: "all .15s",
      }}
    >
      <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        {dir === "left"
          ? <polyline points="15 18 9 12 15 6" />
          : <polyline points="9 18 15 12 9 6" />}
      </svg>
    </button>
  );

  const font = '"Manrope", system-ui, sans-serif';

  return (
    <section ref={sectionRef} style={{ background: "#1A1A1A", position: "relative" }}>
      <style>{`
        .buklet-track::-webkit-scrollbar { display: none; }
        .buklet-track { scrollbar-width: none; }
        .buklet-dot { transition: all .25s ease; border: none; padding: 0; cursor: pointer; }
        .buklet-dot:hover { background: rgba(245,243,239,.5) !important; }
        .buklet-arrow { transition: background .15s, opacity .15s; }
        .buklet-arrow:not(:disabled):hover { background: #F39C2D !important; border-color: #F39C2D !important; color: #1A1A1A !important; }
        @media (min-width: 641px) { .buklet-mobile { display: none !important; } }
        @media (max-width: 640px)  { .buklet-desktop { display: none !important; } }
      `}</style>

      {/* ── DESKTOP (641px+) ── */}
      <div className="buklet-desktop" style={{ height: "100dvh", display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>

        {/* Трек — только слайды, без стрелок */}
        <div ref={trackRef} className="buklet-track" style={{ flex: 1, overflowX: "auto", overflowY: "hidden", scrollSnapType: "x mandatory", scrollBehavior: "smooth", display: "flex", alignItems: "center", WebkitOverflowScrolling: "touch" as never, background: "#0a0a0a" }}>
          <div ref={el => { if (el) cellsRef.current[0] = el; }} style={{ flex: "0 0 100%", width: "100%", height: "100%", scrollSnapAlign: "center", scrollSnapStop: "always", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 1920, height: 1080, transform: `scale(${scale})`, transformOrigin: "center center", position: "relative", flex: "none" }}><Slide01 /></div>
          </div>
          <div ref={el => { if (el) cellsRef.current[1] = el; }} style={{ flex: "0 0 100%", width: "100%", height: "100%", scrollSnapAlign: "center", scrollSnapStop: "always", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 1920, height: 1080, transform: `scale(${scale})`, transformOrigin: "center center", position: "relative", flex: "none" }}><Slide02 /></div>
          </div>
          {TIER_SLIDES.map((tier, i) => (
            <div key={tier.num} ref={el => { if (el) cellsRef.current[2 + i] = el; }} style={{ flex: "0 0 100%", width: "100%", height: "100%", scrollSnapAlign: "center", scrollSnapStop: "always", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 1920, height: 1080, transform: `scale(${scale})`, transformOrigin: "center center", position: "relative", flex: "none" }}><TierSlide tier={tier} pageNum={String(3 + i).padStart(2, "0")} /></div>
            </div>
          ))}
          <div ref={el => { if (el) cellsRef.current[5] = el; }} style={{ flex: "0 0 100%", width: "100%", height: "100%", scrollSnapAlign: "center", scrollSnapStop: "always", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 1920, height: 1080, transform: `scale(${scale})`, transformOrigin: "center center", position: "relative", flex: "none" }}><Slide06 /></div>
          </div>
        </div>

        {/* Стрелки — вне трека, позиционируются относительно desktop-обёртки */}
        <ArrowBtn dir="left" onClick={() => goTo(current - 1)} disabled={current === 0} />
        <ArrowBtn dir="right" onClick={() => goTo(current + 1)} disabled={current === total - 1} />

        {/* Нижняя панель */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", zIndex: 20, pointerEvents: "none" }}>
          <div style={{ fontSize: 12, letterSpacing: ".22em", textTransform: "uppercase", fontWeight: 700, color: "#F5F3EF", fontFamily: font, background: "rgba(15,15,15,.85)", backdropFilter: "blur(8px)", padding: "5px 12px", borderRadius: 999, pointerEvents: "auto" }}>
            <b style={{ color: "#F39C2D" }}>{String(current + 1).padStart(2, "0")}</b>
            <span style={{ opacity: .45 }}> / {String(total).padStart(2, "0")}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, pointerEvents: "auto" }}>
            {SLIDES.map((_, i) => (
              <button key={i} className="buklet-dot" onClick={() => goTo(i)} aria-label={`Слайд ${i + 1}`} style={{ width: i === current ? 26 : 7, height: 7, borderRadius: 999, background: i === current ? "#F39C2D" : "rgba(245,243,239,.28)" }} />
            ))}
          </div>
          <button onClick={scrollToNext} style={{ background: "rgba(15,15,15,.85)", backdropFilter: "blur(8px)", border: "1px solid rgba(245,243,239,.18)", borderRadius: 999, color: "rgba(245,243,239,.65)", fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", fontWeight: 700, cursor: "pointer", padding: "5px 14px", display: "flex", alignItems: "center", gap: 5, fontFamily: font, pointerEvents: "auto", marginRight: 72 }}>
            Пропустить
            <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
          </button>
        </div>
      </div>

      {/* ── MOBILE (≤640px) ── */}
      <div className="buklet-mobile" style={{ padding: "64px 20px 80px", fontFamily: font, color: "#F5F3EF" }}>
        {/* Заголовок */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <span style={{ width: 22, height: 2, background: "#F39C2D", display: "inline-block", flex: "none" }}></span>
          <span style={{ fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", fontWeight: 700, opacity: .6 }}>Варианты ремонта</span>
        </div>
        <h2 style={{ margin: "0 0 12px", fontWeight: 800, fontSize: 34, lineHeight: 1.05, letterSpacing: "-.025em" }}>
          Три уровня<br /><span style={{ color: "#F39C2D" }}>под ключ</span>
        </h2>
        <p style={{ margin: "0 0 28px", fontSize: 15, lineHeight: 1.6, color: "rgba(245,243,239,.65)" }}>
          От инвестиционной аренды до архитектурного премиума — прозрачная смета, подобранные материалы.
        </p>

        {/* Карточки тиров */}
        {[
          { name: "Эконом", price: "17 000", sub: "Под аренду и инвестиции", items: ["Быстрое заселение", "Практичные материалы", "Инвестиционная недвижимость"], light: true },
          { name: "Комфорт", price: "27 000", sub: "Для собственного проживания", items: ["Скрытый свет, инсталляции", "Кварцвинил, современный дизайн", "Баланс цены и качества"], light: true },
          { name: "Премиум", price: "37 000", sub: "Архитектурный подход", items: ["Теневые потолки, крупная плитка", "Максимальный визуал", "Дизайнерский интерьер"], light: false },
        ].map((t) => (
          <div key={t.name} style={{ background: t.light ? "rgba(245,243,239,.06)" : "rgba(245,243,239,.03)", border: "1px solid rgba(245,243,239,.12)", borderRadius: 12, padding: "20px 18px", marginBottom: 12, display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: 24, letterSpacing: "-.02em", lineHeight: 1 }}>{t.name}</div>
                <div style={{ fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", fontWeight: 600, opacity: .5, marginTop: 4 }}>{t.sub}</div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontWeight: 800, fontSize: 20, color: "#F39C2D", letterSpacing: "-.01em", lineHeight: 1, whiteSpace: "nowrap" }}>{t.price}</div>
                <div style={{ fontSize: 10, opacity: .5, fontWeight: 600, letterSpacing: ".1em" }}>₽/м²</div>
              </div>
            </div>
            <div style={{ height: 1, background: "rgba(245,243,239,.1)" }}></div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 7 }}>
              {t.items.map(f => (
                <li key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 500, color: "rgba(245,243,239,.8)" }}>
                  <span style={{ width: 5, height: 5, background: "#F39C2D", flex: "none", borderRadius: 1, display: "inline-block" }}></span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Статистика */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
          {[["от 17 000 ₽", "Стартовая цена за м²"], ["от 30 дней", "Срок ремонта"], ["2 года", "Гарантия"], ["с 2014", "Работаем в Крыму"]].map(([v, l]) => (
            <div key={l} style={{ background: "rgba(245,243,239,.04)", border: "1px solid rgba(245,243,239,.08)", borderRadius: 10, padding: "14px 14px" }}>
              <div style={{ fontWeight: 800, fontSize: 18, color: "#F39C2D", letterSpacing: "-.01em", lineHeight: 1 }}>{v}</div>
              <div style={{ fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 600, opacity: .5, marginTop: 5 }}>{l}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button onClick={scrollToNext} style={{ width: "100%", background: "rgba(243,156,45,.1)", border: "1px solid rgba(243,156,45,.3)", borderRadius: 999, color: "#F39C2D", fontSize: 12, letterSpacing: ".18em", textTransform: "uppercase", fontWeight: 700, padding: "14px 24px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: font }}>
          Смотреть проекты
          <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
        </button>
      </div>
    </section>
  );
}
