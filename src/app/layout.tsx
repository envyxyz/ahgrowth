import type { Metadata } from "next";
import { content } from "@/content";
import { fontVariables } from "@/lib/fonts";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { ThemeProvider, themeInitScript } from "@/components/providers/theme";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: "AH Growth",
  description: "AH Growth — creative marketing agency.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
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
            Skip to content
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
