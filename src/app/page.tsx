import { Hero } from "@/components/sections/hero";
import { Positioning } from "@/components/sections/positioning";
import { Capabilities } from "@/components/sections/capabilities";
import { SocialProof } from "@/components/sections/social-proof";
import { CtaOutro } from "@/components/sections/cta-outro";
import { SiteFooter } from "@/components/sections/site-footer";

/**
 * Home (/). Section order locked in SITEMAP.md §2. Three sections are
 * deliberately deferred, each with its un-defer condition recorded there:
 * 00 Preloader (needs the WebGL hero it warms up), 04 Selected Work (needs
 * real case studies), 06 Studio Culture (needs real photo/video assets).
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Positioning />
      <Capabilities />
      <SocialProof />
      <CtaOutro />
      <SiteFooter />
    </>
  );
}
