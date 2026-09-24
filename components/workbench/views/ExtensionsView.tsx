"use client";

import { useState } from "react";
import { clsx } from "clsx";
import { usePreferences } from "../../PreferencesProvider";
import { useWorkbench } from "../WorkbenchProvider";
import { EXTENSIONS, type ExtensionInfo } from "../extensions";
import { Section } from "./ExplorerView";
import { CheckIcon, CloseIcon } from "../icons";
import { t } from "@/lib/workspace";

function ExtensionCard({ ext }: { ext: ExtensionInfo }) {
  const { locale, theme, setTheme } = usePreferences();
  const { isInstalled, install, uninstall } = useWorkbench();
  const [expanded, setExpanded] = useState(false);
  const installed = isInstalled(ext.id);
  const themeActive = ext.theme && theme === ext.theme;

  return (
    <div className={clsx("wb-ext", expanded && "is-expanded")}>
      <button type="button" className="wb-ext-main" onClick={() => setExpanded(!expanded)} aria-expanded={expanded}>
        <span className="wb-ext-icon" style={{ color: ext.accent, borderColor: `${ext.accent}55`, background: `${ext.accent}14` }}>
          {ext.icon}
        </span>
        <span className="wb-ext-text">
          <span className="wb-ext-name">
            {ext.name}
            {installed && <CheckIcon size={12} className="wb-ext-check" />}
          </span>
          <span className="wb-ext-desc">{locale === "en" ? ext.descriptionEn : ext.descriptionEs}</span>
          <span className="wb-ext-publisher">angelsanabria</span>
        </span>
      </button>
      {expanded && (
        <p className="wb-ext-contributes">
          <strong>{t(locale, "Contributes: ", "Aporta: ")}</strong>
          {locale === "en" ? ext.contributesEn : ext.contributesEs}
        </p>
      )}
      <div className="wb-ext-actions">
        {installed && ext.theme && !themeActive && (
          <button type="button" className="wb-secondary-btn wb-small" onClick={() => setTheme(ext.theme!)}>
            {t(locale, "Set Color Theme", "Usar tema")}
          </button>
        )}
        {installed ? (
          <button type="button" className="wb-secondary-btn wb-small" onClick={() => uninstall(ext.id)}>
            {t(locale, "Uninstall", "Desinstalar")}
          </button>
        ) : (
          <button type="button" className="wb-primary-btn wb-small" onClick={() => install(ext.id)}>
            {t(locale, "Install", "Instalar")}
          </button>
        )}
      </div>
    </div>
  );
}

export default function ExtensionsView() {
  const { locale } = usePreferences();
  const { installed } = useWorkbench();
  const [query, setQuery] = useState("");

  const needle = query.trim().toLowerCase();
  const visible = EXTENSIONS.filter(
    (ext) =>
      !needle ||
      ext.name.toLowerCase().includes(needle) ||
      ext.descriptionEn.toLowerCase().includes(needle) ||
      ext.descriptionEs.toLowerCase().includes(needle)
  );
  const mine = visible.filter((ext) => installed.includes(ext.id));
  const rest = visible.filter((ext) => !installed.includes(ext.id));

  return (
    <div className="wb-extensions">
      <div className="wb-input-wrap wb-pad">
        <input
          className="wb-input"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t(locale, "Search Extensions in Marketplace", "Buscar extensiones")}
          aria-label={t(locale, "Search extensions", "Buscar extensiones")}
        />
        {query && (
          <div className="wb-input-actions">
            <button type="button" className="wb-input-btn" onClick={() => setQuery("")} aria-label="Clear">
              <CloseIcon size={12} />
            </button>
          </div>
        )}
      </div>

      <Section title={`${t(locale, "Installed", "Instaladas")} (${mine.length})`}>
        {mine.length === 0 ? (
          <p className="wb-empty-note">
            {t(locale, "Nothing installed yet. Each extension changes something in this workspace, try one!", "Aún no hay nada instalado. Cada extensión cambia algo del espacio de trabajo, ¡prueba una!")}
          </p>
        ) : (
          mine.map((ext) => <ExtensionCard key={ext.id} ext={ext} />)
        )}
      </Section>

      <Section title={t(locale, "Recommended", "Recomendadas")}>
        {rest.length === 0 ? (
          <p className="wb-empty-note">{t(locale, "You have them all 🎉", "Ya las tienes todas 🎉")}</p>
        ) : (
          rest.map((ext) => <ExtensionCard key={ext.id} ext={ext} />)
        )}
      </Section>
    </div>
  );
}
