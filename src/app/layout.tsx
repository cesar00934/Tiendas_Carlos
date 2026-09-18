import type { Metadata, Viewport } from "next";
import { Manrope, Sora } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { siteConfig } from "@/config/site";
import "./globals.css";
import "./mobile-fixes.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const sora = Sora({ subsets: ["latin"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "Tiendas Carlos | La tienda del hogar", template: "%s | Tiendas Carlos" },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "Tiendas Carlos",
    "productos para el hogar",
    "artículos de cocina",
    "ollas",
    "sillas",
    "colchas",
    "Av. San Martín 744",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "shopping",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "/",
    siteName: siteConfig.name,
    title: "Tiendas Carlos | La tienda del hogar",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Tiendas Carlos | La tienda del hogar",
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "UFLBhOl4JWtE8ll9S5ZVKbbXgZjwm_YEfBeXgiGilz8" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f5b91f",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-PE">
      <body className={`${manrope.variable} ${sora.variable}`}>
        <a className="skipLink" href="#contenido">Saltar al contenido</a>
        <Header />
        <div id="contenido">{children}</div>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
