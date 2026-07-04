import type { Metadata } from "next";
import { Anton, Archivo } from "next/font/google";
import "./globals.css";

const display = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

const sans = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Donhver Studios — Films & publicités cinématographiques",
  description:
    "Studio créatif indépendant. Marketing, UGC, publicités vidéo haut de gamme et récits cinématographiques. Nous dirigeons chaque projet comme un film.",
  keywords: [
    "studio créatif",
    "publicité vidéo",
    "UGC",
    "cinéma",
    "motion design",
    "direction artistique",
    "branding",
    "storytelling",
  ],
  authors: [{ name: "Donhver Studios" }],
  openGraph: {
    title: "Donhver Studios — Films & publicités",
    description:
      "Marketing, UGC, publicités vidéo haut de gamme et récits cinématographiques. Chaque projet dirigé comme un film.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans bg-ink text-paper">{children}</body>
    </html>
  );
}
