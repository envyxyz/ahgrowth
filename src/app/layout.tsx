import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "AH Growth",
  description: "AH Growth — creative marketing agency.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`dark ${fontVariables}`}>
      <body>{children}</body>
    </html>
  );
}
