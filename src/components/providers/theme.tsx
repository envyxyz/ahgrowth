"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

export type ThemeChoice = "light" | "dark" | "system";

const STORAGE_KEY = "ah-theme";

/**
 * Inlined in <head> before paint so the correct palette is applied on the
 * very first frame — without this the page renders light, then snaps to dark.
 * Mirrors the three-state resolution in src/styles/tokens.css.
 */
export const themeInitScript = `(function(){try{var c=localStorage.getItem("${STORAGE_KEY}");if(c==="dark"||c==="light"){document.documentElement.setAttribute("data-theme",c)}}catch(e){}})();`;

interface ThemeContextValue {
  /** What the user picked, including "system". */
  choice: ThemeChoice;
  /** What's actually rendering right now. */
  resolved: "light" | "dark";
  setChoice: (next: ThemeChoice) => void;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function systemPrefersDark() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [choice, setChoiceState] = useState<ThemeChoice>("system");
  const [resolved, setResolved] = useState<"light" | "dark">("light");

  // Adopt whatever the pre-paint script already applied.
  useEffect(() => {
    let stored: ThemeChoice = "system";
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw === "dark" || raw === "light") stored = raw;
    } catch {
      /* storage blocked — fall back to system */
    }
    setChoiceState(stored);
    setResolved(stored === "system" ? (systemPrefersDark() ? "dark" : "light") : stored);
  }, []);

  // Track the OS preference while the user is on "system".
  useEffect(() => {
    if (choice !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => setResolved(mq.matches ? "dark" : "light");
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [choice]);

  const setChoice = useCallback((next: ThemeChoice) => {
    setChoiceState(next);
    const root = document.documentElement;

    // Opt into the palette cross-fade for the length of the flip only, so it
    // never overrides the transitions components declare for their own motion.
    root.setAttribute("data-theme-transition", "");
    window.setTimeout(() => root.removeAttribute("data-theme-transition"), 400);

    if (next === "system") {
      root.removeAttribute("data-theme");
      setResolved(systemPrefersDark() ? "dark" : "light");
    } else {
      root.setAttribute("data-theme", next);
      setResolved(next);
    }

    try {
      if (next === "system") localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage blocked — choice still applies for this session */
    }
  }, []);

  const toggle = useCallback(() => {
    setChoice(resolved === "dark" ? "light" : "dark");
  }, [resolved, setChoice]);

  return (
    <ThemeContext.Provider value={{ choice, resolved, setChoice, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
