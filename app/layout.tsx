import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, DM_Sans, JetBrains_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { BackToTop } from "@/components/BackToTop";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { MotionProvider } from "@/components/MotionProvider";
import { Navbar } from "@/components/Navbar";
import { ctaHref, nav, site, team } from "@/lib/content";
import { siteGraph } from "@/lib/seo";
import "./globals.css";
import { DoodleDefs } from "@/components/ui/Doodle";

// ─── Analytics ────────────────────────────────────────────────────────────────
// Google Analytics 4 turns on automatically when NEXT_PUBLIC_GA_ID is set
// (e.g. G-XXXXXXXXXX) in your environment variables. Nothing loads without it.
//
// Prefer Vercel Analytics? `npm i @vercel/analytics`, then uncomment:
// import { Analytics } from "@vercel/analytics/next";
// and the <Analytics /> tag in <body>.
// ──────────────────────────────────────────────────────────────────────────────
const gaId = process.env.NEXT_PUBLIC_GA_ID;

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  preload: false,
});

const title = `${site.name} | AI Agents, Web Development, Cloud & Marketing Studio`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: site.keywords,
  authors: team.map((m) => ({ name: m.name })),
  creator: site.name,
  publisher: site.name,
  category: "technology",
  alternates: { canonical: "/" },
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title,
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  verification: {
    ...(site.verification.google && { google: site.verification.google }),
    ...(site.verification.bing && { other: { "msvalidate.01": site.verification.bing } }),
  },
};

export const viewport: Viewport = {
  themeColor: "#FBF9F1",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-dvh overflow-x-hidden">
        <a
          href="#main"
          className="sr-only z-[100] rounded-lg bg-ink px-4 py-2 font-semibold text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <DoodleDefs />
        <MotionProvider>
          <Navbar items={nav} ctaHref={ctaHref} />
          {children}
          <Footer />
          <BackToTop />
        </MotionProvider>
        <JsonLd data={siteGraph()} />
        {/* <Analytics /> */}
      </body>
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
