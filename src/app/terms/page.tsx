import type { Metadata } from "next";
import { content } from "@/content";
import { LegalPage } from "@/components/sections/legal-page";

export const metadata: Metadata = {
  title: content.legal.terms.title,
  description: content.legal.terms.intro,
};

export default function TermsPage() {
  return <LegalPage document={content.legal.terms} />;
}
