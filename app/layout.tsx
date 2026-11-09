import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.faccio-tutto.it"),
  title: {
    default: "Faccio Tutto | Impianti e servizi per la casa",
    template: "%s | Faccio Tutto",
  },
  description:
    "Informazioni e supporto per impianti fotovoltaici, climatizzazione, infissi, progettazione e interventi per la casa.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    siteName: "Faccio Tutto",
    locale: "it_IT",
    type: "website",
    images: [
      {
        url: "/images/impianto-fotovoltaico.png",
        alt: "Impianto fotovoltaico",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}