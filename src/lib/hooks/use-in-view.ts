"use client";

import { useEffect, useRef, useState } from "react";

/**
 * One shared IntersectionObserver for the whole page, not one per element.
 * Same discipline as use-scroll-state.ts: N observers means N callbacks the
 * browser reconciles on every intersection change, and reveals are the most
 * numerous animated thing on the site.
 */
const callbacks = new WeakMap<Element, () => void>();
let observer: IntersectionObserver | null = null;

function getObserver() {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        callbacks.get(entry.target)?.();
        // Entrance reveals fire once. Unobserve immediately so the element
        // stops costing anything for the rest of the session.
        observer?.unobserve(entry.target);
        callbacks.delete(entry.target);
      }
    },
    { rootMargin: "0px 0px -12% 0px" }
  );
  return observer;
}

/**
 * Returns a ref to attach and whether it has entered the viewport yet.
 * Under `prefers-reduced-motion: reduce` it reports true on mount, so
 * consumers render their final state with no transition at all.
 */
export function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }

    const io = getObserver();
    callbacks.set(el, () => setInView(true));
    io.observe(el);

    return () => {
      io.unobserve(el);
      callbacks.delete(el);
    };
  }, []);

  return { ref, inView };
}
