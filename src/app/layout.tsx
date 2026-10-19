import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Sora } from "next/font/google";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { site } from "@/content/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora", weight: ["400", "600", "700", "800"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: `${site.companyIntro} ${site.instituteIntro}`,
  openGraph: {
    title: `${site.name} | ${site.tagline}`,
    description: site.companyIntro,
    images: ["/brand/logo.png"],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a1218",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${sora.variable}`}>
      <body>
        <Providers>
          <a
            href="#main"
            className="sr-only z-[60] rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink-900 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </Providers>
      </body>
    </html>
  );
}
