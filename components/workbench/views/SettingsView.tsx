"use client";

import { clsx } from "clsx";
import { usePreferences, type Theme } from "../../PreferencesProvider";
import { useWorkbench } from "../WorkbenchProvider";
import { t } from "@/lib/workspace";

const THEME_NAMES: Record<Theme, string> = { dark: "Angel Dark", light: "Daylight", aurora: "Aurora" };

const SHORTCUTS: [string, string, string][] = [
  ["Ctrl+P", "Go to file", "Ir a archivo"],
  ["Ctrl+Shift+P", "Command palette", "Paleta de comandos"],
  ["Ctrl+B", "Toggle side bar", "Barra lateral"],
  ["Ctrl+`", "Toggle terminal", "Terminal"],
  ["Ctrl+Shift+E", "Explorer", "Explorador"],
  ["Ctrl+Shift+F", "Search", "Buscar"],
  ["Ctrl+Shift+G", "Source control", "Control de código"],
  ["Ctrl+Shift+X", "Extensions", "Extensiones"],
];

export default function SettingsView() {
  const { locale, setLocale, theme, setTheme } = usePreferences();
  const { availableThemes, zoom, setZoom, showView, resetWorkspace, isMobile } = useWorkbench();

  return (
    <div className="wb-settings">
      <div className="wb-setting">
        <label className="wb-setting-title">{t(locale, "Workbench: Color Theme", "Workbench: Tema de color")}</label>
        <p className="wb-setting-desc">
          {availableThemes.length > 1
            ? t(locale, "Themes come from installed extensions.", "Los temas vienen de las extensiones instaladas.")
            : t(locale, "Install a theme extension to unlock more themes.", "Instala una extensión de tema para desbloquear más.")}
        </p>
        <div className="wb-segmented">
          {availableThemes.map((option) => (
            <button key={option} type="button" className={clsx(theme === option && "is-active")} onClick={() => setTheme(option)}>
              {THEME_NAMES[option]}
            </button>
          ))}
        </div>
        {availableThemes.length === 1 && (
          <button type="button" className="wb-link wb-link-btn" onClick={() => showView("extensions")}>
            {t(locale, "Browse theme extensions →", "Ver extensiones de temas →")}
          </button>
        )}
      </div>

      <div className="wb-setting">
        <label className="wb-setting-title">{t(locale, "Locale: Display Language", "Idioma de la interfaz")}</label>
        <div className="wb-segmented">
          <button type="button" className={clsx(locale === "en" && "is-active")} onClick={() => setLocale("en")}>
            English
          </button>
          <button type="button" className={clsx(locale === "es" && "is-active")} onClick={() => setLocale("es")}>
            Español
          </button>
        </div>
      </div>

      <div className="wb-setting">
        <label className="wb-setting-title">{t(locale, "Editor: Zoom Level", "Editor: Nivel de zoom")}</label>
        <div className="wb-zoom">
          <button type="button" className="wb-secondary-btn wb-small" onClick={() => setZoom(zoom - 0.1)} aria-label="Zoom out">
            −
          </button>
          <span>{Math.round(zoom * 100)}%</span>
          <button type="button" className="wb-secondary-btn wb-small" onClick={() => setZoom(zoom + 0.1)} aria-label="Zoom in">
            +
          </button>
        </div>
      </div>

      {!isMobile && (
        <div className="wb-setting">
          <label className="wb-setting-title">{t(locale, "Keyboard Shortcuts", "Atajos de teclado")}</label>
          <dl className="wb-shortcuts">
            {SHORTCUTS.map(([keys, en, es]) => (
              <div key={keys}>
                <dt>{locale === "en" ? en : es}</dt>
                <dd>
                  <kbd>{keys}</kbd>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      <div className="wb-setting">
        <button type="button" className="wb-secondary-btn wb-small" onClick={resetWorkspace}>
          {t(locale, "Reset workspace", "Restablecer espacio de trabajo")}
        </button>
      </div>
    </div>
  );
}
