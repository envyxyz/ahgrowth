"use client";

import { useEffect, useState } from "react";

/**
 * Single rAF-throttled scroll reader shared by every scroll-gated header
 * effect. One listener, one shared boolean — never one observer per element
 * (see assets/design/inspirations/presets/buzz-interactive-animation-presets.md
 * "Unbatched cursor/scroll listeners").
 */
export function useScrollState(thresholdPx: number) {
  const [scrolledPastThreshold, setScrolledPastThreshold] = useState(false);

  useEffect(() => {
    let ticking = false;

    const read = () => {
      setScrolledPastThreshold(window.scrollY > thresholdPx);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(read);
        ticking = true;
      }
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [thresholdPx]);

  return scrolledPastThreshold;
}
