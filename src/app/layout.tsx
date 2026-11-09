import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { RequestProvider } from "@/components/forms/RequestProvider";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ToastProvider } from "@/components/ui/Toast";
import { site } from "@/data/site";
import { jakarta } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}, residences on Biscayne Bay`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: { siteName: site.name, locale: "en_US", type: "website" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#faf7f2",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body>
        <a
          href="#main"
          className="fixed top-2 left-2 z-50 -translate-y-20 bg-ink px-4 py-3 text-paper transition-transform focus:translate-y-0 print:hidden"
        >
          Skip to content
        </a>
        <ToastProvider>
          <RequestProvider>
            <Header />
            <main id="main">{children}</main>
            <Footer />
          </RequestProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
