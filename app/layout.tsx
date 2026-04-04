import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LoadingScreen from "@/components/LoadingScreen";

const oswald = Oswald({
  subsets: ["latin", "cyrillic"],
  variable: "--font-oswald",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Владен — Строительная компания в Крыму",
    template: "%s | Владен",
  },
  description:
    "Строительная компания Владен в Крыму. Строительство домов, ремонт, отделка. Качество, надёжность, опыт.",
  keywords: ["строительство", "Крым", "ремонт", "Владен", "дома", "отделка"],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "Владен",
    title: "Владен — Строительная компания в Крыму",
    description:
      "Строительная компания Владен в Крыму. Строительство домов, ремонт, отделка.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${oswald.variable} ${inter.variable}`}>
      <body className="antialiased">
        <LoadingScreen />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
