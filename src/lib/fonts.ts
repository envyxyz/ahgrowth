import { Bricolage_Grotesque, Boldonse } from "next/font/google";

/**
 * Bricolage Grotesque carries every functional type role (display through
 * caption) per assets/design/design-ahgrowth.md. Variable font, so one
 * loader covers the full weight range used across --weight-* tokens.
 */
export const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

/**
 * Boldonse is the signature-only face for the oversized outlined word
 * (`.type-display-outline`). Never used for functional text.
 */
export const boldonse = Boldonse({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-boldonse",
  display: "swap",
});

export const fontVariables = `${bricolageGrotesque.variable} ${boldonse.variable}`;
