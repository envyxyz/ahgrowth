import { Hero } from "@/components/sections/hero";
import { Positioning } from "@/components/sections/positioning";
import { Capabilities } from "@/components/sections/capabilities";
import { SelectedWork } from "@/components/sections/selected-work";
import { SocialProof } from "@/components/sections/social-proof";
import { CtaOutro } from "@/components/sections/cta-outro";
import { SiteFooter } from "@/components/sections/site-footer";

/**
 * Home (/). Section order locked in SITEMAP.md §2. 00 — Preloader and
 * 06 — Studio Culture are deferred: the preloader needs the WebGL hero it
 * warms up for (not built this phase), Studio Culture stays cut until real
 * photo/video assets exist (content.home.studioCulture is `null`).
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Positioning />
      <Capabilities />
      <SelectedWork />
      <SocialProof />
      <CtaOutro />
      <SiteFooter />
    </>
  );
}
