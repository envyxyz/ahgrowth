import type { Metadata } from "next";
import { content } from "@/content";
import { fontVariables } from "@/lib/fonts";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { ThemeProvider, themeInitScript } from "@/components/providers/theme";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";

const { meta } = content;

export const metadata: Metadata = {
  metadataBase: new URL(meta.siteUrl),
  title: { default: meta.defaultTitle, template: meta.titleTemplate },
  description: meta.defaultDescription,
  applicationName: meta.siteName,
  openGraph: {
    type: "website",
    siteName: meta.siteName,
    title: meta.defaultTitle,
    description: meta.defaultDescription,
    url: meta.siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: meta.defaultTitle,
    description: meta.defaultDescription,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={meta.locale} className={fontVariables} suppressHydrationWarning>
      <head>
        {/* Applies the stored theme before first paint — no light/dark flash. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <ThemeProvider>
          <a
            href="#main"
            className="type-caption fixed left-md top-md z-[100] -translate-y-24 rounded-full bg-surface px-lg py-sm text-ink shadow-elevation-1 transition-transform ease-out-soft focus:translate-y-0"
          >
            {content.nav.skipToContent}
          </a>
          <SmoothScrollProvider>
            <SiteHeader />
            <main id="main">{children}</main>
          </SmoothScrollProvider>
          <ThemeToggle label={content.nav.themeToggleLabel} />
        </ThemeProvider>
      </body>
    </html>
  );
}
