import type { Metadata } from "next";
import { content } from "@/content";
import { LegalPage } from "@/components/sections/legal-page";

export const metadata: Metadata = {
  title: content.legal.privacy.title,
  description: content.legal.privacy.intro,
};

export default function PrivacyPage() {
  return <LegalPage document={content.legal.privacy} />;
}
