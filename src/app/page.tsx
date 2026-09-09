import { Hero } from "@/components/sections/hero";
import { Positioning } from "@/components/sections/positioning";
import { Editorial } from "@/components/sections/editorial";
import { Capabilities } from "@/components/sections/capabilities";
import { SocialProof } from "@/components/sections/social-proof";
import { CtaOutro } from "@/components/sections/cta-outro";
import { SiteFooter } from "@/components/sections/site-footer";

/**
 * Home (/). Six layout families, deliberately no two alike: full-bleed
 * media hero, centred capsule statement, asymmetric media trio, pinned
 * horizontal scroll, bento, split CTA. See HOMEPAGE-REDESIGN.md.
 *
 * Three sections stay deferred, each with its un-defer condition recorded in
 * SITEMAP.md: 00 Preloader (needs the WebGL hero it warms up), Selected Work
 * (needs real case studies), Studio Culture (needs real photo/video assets).
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Positioning />
      <Editorial />
      <Capabilities />
      <SocialProof />
      <CtaOutro />
      <SiteFooter />
    </>
  );
}
