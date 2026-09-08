import { Geist, Geist_Mono } from "next/font/google";

/**
 * Geist carries every functional type role. Chosen to match the reference
 * set (Stodio / Seative / Lovera): a geometric grotesk with a tall x-height
 * and a full 100–900 variable range, so the oversized stat numbers and the
 * ghosted hero wordmark can sit at 700–800 in the same family as body copy.
 */
export const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

/**
 * Geist Mono is the micro-label face only: eyebrows, section indices, meta
 * rows, the clock readout. All three references use a technical mono for
 * exactly these ("BY THE NUMBERS", "/About", "Fact 01", "Selected clients").
 * Never used for body copy or headlines.
 */
export const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const fontVariables = `${geist.variable} ${geistMono.variable}`;
