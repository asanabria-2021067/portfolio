"use client";

import { usePreferences } from "./PreferencesProvider";

export default function Navbar() {
  const { theme, locale, toggleTheme, toggleLocale } = usePreferences();

  return (
    <header className="flex items-center gap-6 py-3.5 px-5.5 mb-7 border border-[var(--line)] rounded-full bg-white/[0.03] backdrop-blur-[16px] mt-4">
      <div className="flex items-center gap-[10px] text-[14px] font-semibold tracking-[-0.015em]">
        <span className="grad-text">Ángel Sanabria</span>
      </div>
      <div className="ml-auto flex items-center gap-3">
        <button
          type="button"
          onClick={toggleLocale}
          className="control-pill"
          aria-label={locale === "en" ? "Switch to Spanish" : "Cambiar a ingles"}
        >
          {locale.toUpperCase()}
        </button>
        <button
          type="button"
          onClick={toggleTheme}
          className="icon-pill"
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === "dark" ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.6 6.6 0 0 0 9.8 9.8Z" />
            </svg>
          )}
        </button>
        <span className="inline-flex items-center gap-2 text-[12px] text-fg-dim py-1.5 px-3 border border-[var(--line)] rounded-full bg-white/[0.03] font-mono whitespace-nowrap">
          <span className="pulse"></span>
          <span className="hidden xs:inline">
            {locale === "en" ? "Available for opportunities" : "Disponible para oportunidades"}
          </span>
          <span className="xs:hidden">{locale === "en" ? "Available" : "Disponible"}</span>
        </span>
      </div>
    </header>
  );
}
