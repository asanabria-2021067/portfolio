"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { usePreferences } from "../PreferencesProvider";
import { useWorkbench } from "./WorkbenchProvider";
import { THEME_NAMES } from "./extensions";
import { BranchIcon, ErrorIcon, SyncIcon, WarningIcon } from "./icons";
import { LANGUAGE_LABEL, t } from "@/lib/workspace";


function Clock() {
  const { locale } = usePreferences();
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- start the clock on the client only
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  if (!now) return null;
  const time = now.toLocaleTimeString(locale === "en" ? "en-US" : "es-GT", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/Guatemala",
  });
  return (
    <span className="wb-status-item" title={t(locale, "Angel's local time (Guatemala)", "Hora local de Angel (Guatemala)")}>
      ◷ GT {time}
    </span>
  );
}

function ReadingTime({ pathname }: { pathname: string }) {
  const { locale } = usePreferences();
  const [words, setWords] = useState<number | null>(null);

  useEffect(() => {
    const count = () => {
      const root = document.querySelector<HTMLElement>("[data-editor-content]");
      const text = root?.innerText ?? "";
      setWords(text.split(/\s+/).filter((word) => /[\p{L}\p{N}]/u.test(word)).length);
    };
    // pages animate in and load data, so count a couple of times
    const timers = [400, 2500].map((delay) => window.setTimeout(count, delay));
    return () => timers.forEach(window.clearTimeout);
  }, [pathname, locale]);

  if (words === null) return null;
  const minutes = Math.max(1, Math.round(words / 220));
  return (
    <span className="wb-status-item" title={t(locale, `${words} words`, `${words} palabras`)}>
      📖 {t(locale, `${minutes} min read`, `${minutes} min de lectura`)}
    </span>
  );
}

export default function StatusBar() {
  const pathname = usePathname();
  const { locale, toggleLocale, theme } = usePreferences();
  const { showView, setTerminalOpen, terminalOpen, availableThemes, cycleTheme, isInstalled, setZen, activeTab } = useWorkbench();
  const file = activeTab;

  return (
    <footer className="wb-statusbar">
      <div className="wb-status-group">
        <button type="button" className="wb-status-item wb-status-remote" onClick={() => showView("scm")} title="Source Control">
          <BranchIcon size={13} /> main
        </button>
        <button type="button" className="wb-status-item" onClick={() => showView("scm")} title={t(locale, "Synchronized", "Sincronizado")}>
          <SyncIcon size={12} />
        </button>
        <button
          type="button"
          className="wb-status-item"
          onClick={() => setTerminalOpen(!terminalOpen)}
          title={t(locale, "No problems — toggle terminal", "Sin problemas — terminal")}
        >
          <ErrorIcon size={13} /> 0 <WarningIcon size={13} /> 0
        </button>
      </div>

      <div className="wb-status-group">
        {isInstalled("reading-time") && activeTab?.kind === "route" && <ReadingTime pathname={pathname} />}
        {isInstalled("local-clock") && <Clock />}
        <span className="wb-status-item wb-status-hire">
          <span className="pulse" />
          {t(locale, "Open to work", "Disponible")}
        </span>
        {file && <span className="wb-status-item wb-hide-sm">{LANGUAGE_LABEL[file.ext]}</span>}
        <span className="wb-status-item wb-hide-sm">UTF-8</span>
        {isInstalled("zen-mode") && (
          <button type="button" className="wb-status-item" onClick={() => setZen(true)} title={t(locale, "Zen Mode (Esc to exit)", "Modo Zen (Esc para salir)")}>
            ◎ Zen
          </button>
        )}
        {availableThemes.length > 1 && (
          <button type="button" className="wb-status-item" onClick={cycleTheme} title={t(locale, "Switch color theme", "Cambiar tema de color")}>
            {theme === "light" ? "☀" : theme === "aurora" ? "✦" : theme === "rose" ? "✿" : "☾"} {THEME_NAMES[theme]}
          </button>
        )}
        <button type="button" className="wb-status-item" onClick={toggleLocale} title={t(locale, "Cambiar a español", "Switch to English")}>
          {locale.toUpperCase()}
        </button>
      </div>
    </footer>
  );
}
