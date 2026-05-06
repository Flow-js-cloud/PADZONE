import type { Metadata } from "next";
import { Orbitron, Rajdhani, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { SiteLayout } from "@/components/SiteLayout";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});

const shareTechMono = Share_Tech_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-share-tech",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://padzone.fr";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "PadZone — Tapis Gaming Premium | Anime & Jeux Vidéo",
    template: "%s | PadZone",
  },
  description:
    "Achetez les meilleurs tapis gaming : Dragon Ball Z, Naruto, One Piece, Valorant, League of Legends, RGB LED. Qualité premium, impression Ultra HD, livraison internationale 15-30 jours.",
  keywords: [
    "tapis gaming", "mouse pad", "tapis souris gamer", "tapis gaming anime",
    "dragon ball z gaming", "naruto mouse pad", "valorant tapis", "league of legends",
    "rgb mouse pad", "tapis XXL", "tapis full desk", "one piece gaming",
  ],
  authors: [{ name: "PadZone" }],
  creator: "PadZone",
  publisher: "PadZone",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: "PadZone",
    title: "PadZone — Tapis Gaming Premium | Anime & Jeux Vidéo",
    description: "Les meilleurs tapis gaming Anime & Jeux Vidéo. Dragon Ball, Naruto, Valorant, RGB LED. Livraison internationale.",
  },
  twitter: {
    card: "summary_large_image",
    title: "PadZone — Tapis Gaming Premium",
    description: "Les meilleurs tapis gaming Anime & Jeux Vidéo.",
    creator: "@padzone",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: { canonical: SITE_URL },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "PadZone",
      description: "Les meilleurs tapis gaming Anime & Jeux Vidéo",
      inLanguage: "fr-FR",
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/categories?q={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "PadZone",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
        width: 200,
        height: 60,
      },
      description: "Boutique en ligne spécialisée dans les tapis gaming premium Anime & Jeux Vidéo.",
      address: { "@type": "PostalAddress", addressCountry: "FR" },
      contactPoint: { "@type": "ContactPoint", contactType: "customer service", availableLanguage: "fr" },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${orbitron.variable} ${rajdhani.variable} ${shareTechMono.variable}`}
    >
      <head />
      <body className="noise bg-void font-rajdhani antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Providers>
          <SiteLayout>{children}</SiteLayout>
        </Providers>
      </body>
    </html>
  );
}
