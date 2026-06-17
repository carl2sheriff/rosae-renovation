import type { Metadata } from "next";
import { EB_Garamond, Inter } from "next/font/google";
import "./globals.css";

const ebGaramond = EB_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-eb-garamond",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rosae — Rénovation d'intérieurs, Paris",
  description:
    "Entreprise générale du bâtiment spécialisée dans la rénovation d'intérieurs à Paris et en Île-de-France. Appartements haussmanniens, maisons, bureaux.",
  openGraph: {
    title: "Rosae — Rénovation d'intérieurs, Paris",
    description:
      "Entreprise générale du bâtiment spécialisée dans la rénovation d'intérieurs à Paris et en Île-de-France.",
    locale: "fr_FR",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Rosae Rénovation",
  description:
    "Entreprise générale du bâtiment spécialisée dans la rénovation d'intérieurs à Paris et en Île-de-France.",
  url: process.env.NEXT_PUBLIC_SERVER_URL || "https://rosae-renovation.fr",
  email: "rosaerenovation@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Paris",
    addressCountry: "FR",
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Île-de-France",
  },
  priceRange: "€€€",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${ebGaramond.variable} ${inter.variable} h-full`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
