import Link from "next/link";
import { content } from "@/content";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { Statement } from "@/components/ui/statement";
import { buttonVariants } from "@/components/ui/button";
import { SiteFooter } from "@/components/sections/site-footer";

export const metadata = { title: content.notFound.eyebrow };

export default function NotFound() {
  const { notFound } = content;

  return (
    <>
      <Section tone="inverse" className="flex min-h-[70vh] items-center">
        <div className="flex flex-col items-start gap-xxl">
          <Eyebrow tone="inverse">{notFound.eyebrow}</Eyebrow>
          <Statement
            value={notFound.heading}
            as="h1"
            tone="inverse"
            className="max-w-[20ch]"
          />
          <Link href={notFound.cta.href} className={buttonVariants({ variant: "inverse" })}>
            {notFound.cta.label}
          </Link>
        </div>
      </Section>
      <SiteFooter />
    </>
  );
}
