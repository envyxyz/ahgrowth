"use client";

import Link from "next/link";
import { content } from "@/content";
import { Copy } from "@/components/ui/placeholder-block";

/**
 * 08 — Footer. Continues the CTA Outro's dark block rather than starting a
 * new one, closing the page on a single uninterrupted contrast field. The
 * wordmark is ghosted into the surface (Seative / Lovera pattern), not set
 * as bright display type. Curtain reveal mechanic lands separately.
 */
export function SiteFooter() {
  const { footer } = content;

  return (
    <footer className="relative overflow-hidden bg-inverse px-inset pb-xxl pt-4xl text-on-inverse">
      <div className="mx-auto w-full max-w-container">
        <div className="grid gap-xxl sm:grid-cols-3">
          <div>
            <p className="type-eyebrow mb-md text-on-inverse-faint">Direct</p>
            <p className="type-body-sm text-on-inverse-secondary">
              <Copy value={footer.directEmail} />
            </p>
          </div>

          {footer.offices.length > 0 && (
            <div>
              <p className="type-eyebrow mb-md text-on-inverse-faint">Offices</p>
              {footer.offices.map((office) => (
                <p key={office.city} className="type-body-sm text-on-inverse-secondary">
                  {office.city}, {office.address}
                </p>
              ))}
            </div>
          )}

          <div>
            <p className="type-eyebrow mb-md text-on-inverse-faint">Legal</p>
            <ul className="flex flex-col gap-xs">
              {footer.legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="type-body-sm text-on-inverse-secondary transition-colors duration-micro ease-out-soft hover:text-on-inverse"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right padding clears the fixed theme toggle (48px control + its
            24px offset), which otherwise sits on top of the back-to-top. */}
        <div className="mt-6xl flex items-center justify-between border-t border-hairline-inverse pt-lg pr-[72px]">
          <p className="type-caption text-on-inverse-faint">{footer.copyright}</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="type-caption text-on-inverse-muted transition-colors duration-micro ease-out-soft hover:text-on-inverse"
          >
            {footer.backToTop}
          </button>
        </div>
      </div>

      <span
        aria-hidden
        className="type-ghost pointer-events-none absolute -bottom-[0.24em] left-0 select-none whitespace-nowrap text-ghost-inverse"
      >
        {footer.wordmark}
      </span>
    </footer>
  );
}
