"use client";

import { createContext, useContext, useEffect, useMemo, useSyncExternalStore } from "react";

type Theme = "dark" | "light";
export type Locale = "en" | "es";

interface PreferencesContextValue {
  theme: Theme;
  locale: Locale;
  setTheme: (theme: Theme) => void;
  setLocale: (locale: Locale) => void;
  toggleTheme: () => void;
  toggleLocale: () => void;
}

const PreferencesContext = createContext<PreferencesContextValue | null>(null);
const THEME_KEY = "portfolio-theme";
const LOCALE_KEY = "portfolio-locale";
const CHANGE_EVENT = "portfolio-preferences-change";

function normalizeTheme(value: string | null): Theme {
  return value === "light" || value === "dark" ? value : "dark";
}

function normalizeLocale(value: string | null): Locale {
  return value === "es" || value === "en" ? value : "en";
}

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function emitChange() {
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function getThemeSnapshot() {
  return normalizeTheme(window.localStorage.getItem(THEME_KEY));
}

function getLocaleSnapshot() {
  return normalizeLocale(window.localStorage.getItem(LOCALE_KEY));
}

function getServerThemeSnapshot(): Theme {
  return "dark";
}

function getServerLocaleSnapshot(): Locale {
  return "en";
}

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getThemeSnapshot, getServerThemeSnapshot);
  const locale = useSyncExternalStore(subscribe, getLocaleSnapshot, getServerLocaleSnapshot);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.lang = locale;
  }, [theme, locale]);

  const value = useMemo<PreferencesContextValue>(
    () => ({
      theme,
      locale,
      setTheme: (nextTheme) => {
        window.localStorage.setItem(THEME_KEY, nextTheme);
        emitChange();
      },
      setLocale: (nextLocale) => {
        window.localStorage.setItem(LOCALE_KEY, nextLocale);
        emitChange();
      },
      toggleTheme: () => {
        window.localStorage.setItem(THEME_KEY, theme === "dark" ? "light" : "dark");
        emitChange();
      },
      toggleLocale: () => {
        window.localStorage.setItem(LOCALE_KEY, locale === "en" ? "es" : "en");
        emitChange();
      },
    }),
    [theme, locale]
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences() {
  const value = useContext(PreferencesContext);
  if (!value) throw new Error("usePreferences must be used inside PreferencesProvider");
  return value;
}
