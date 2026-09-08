"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion as designMotion } from "@/lib/design-tokens";

/**
 * `cursor-fill-button` component token: a filled circle expands from the
 * cursor's entry point on hover, inverting the label. Falls back to a plain
 * opacity change under reduced motion.
 */
export function CursorFillButton({
  label,
  onClick,
  href,
  type = "button",
  tone = "light",
  className = "",
}: {
  label: string;
  onClick?: () => void;
  /** `submit` for the form CTA; the fill behaviour is identical. */
  type?: "button" | "submit";
  /** When set, renders a real link so right-click and middle-click work. */
  href?: string;
  /** `inverse` when the button sits on a dark contrast section. */
  tone?: "light" | "inverse";
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [origin, setOrigin] = useState({ x: "50%", y: "50%" });
  const [active, setActive] = useState(false);

  const handleEnter = (e: React.MouseEvent<HTMLElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      setOrigin({ x: `${e.clientX - rect.left}px`, y: `${e.clientY - rect.top}px` });
    }
    setActive(true);
  };

  const isInverse = tone === "inverse";
  const restColor = isInverse ? "var(--color-on-inverse)" : "var(--color-ink)";
  const filledColor = isInverse ? "var(--color-inverse)" : "var(--color-surface)";

  const shared = {
    onMouseEnter: handleEnter,
    onMouseLeave: () => setActive(false),
    className: `type-button relative isolate inline-flex h-12 items-center justify-center overflow-hidden rounded-full px-xl motion-reduce:transition-opacity motion-reduce:hover:opacity-70 ${
      isInverse ? "bg-overlay-fill-inverse" : "bg-overlay-fill"
    } ${className}`,
  };

  const inner = (
    <>
      <span
        aria-hidden
        className="absolute rounded-full motion-reduce:hidden"
        style={{
          left: origin.x,
          top: origin.y,
          width: 12,
          height: 12,
          backgroundColor: restColor,
          transform: `translate(-50%, -50%) scale(${
            active ? designMotion.cursorFillButton.expandScale * 20 : 0
          })`,
          transitionProperty: "transform",
          transitionDuration: `${
            active
              ? designMotion.cursorFillButton.expandMs
              : designMotion.cursorFillButton.collapseMs
          }ms`,
          transitionTimingFunction: designMotion.cursorFillButton.ease,
        }}
      />
      <span
        className="relative z-10 transition-colors motion-reduce:transition-opacity"
        style={{
          color: active ? filledColor : restColor,
          transitionDuration: `${
            active
              ? designMotion.cursorFillButton.expandMs
              : designMotion.cursorFillButton.collapseMs
          }ms`,
          transitionTimingFunction: designMotion.cursorFillButton.ease,
        }}
      >
        {label}
      </span>
    </>
  );

  if (href) {
    return (
      <Link ref={ref as React.Ref<HTMLAnchorElement>} href={href} {...shared}>
        {inner}
      </Link>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      {...shared}
    >
      {inner}
    </button>
  );
}
