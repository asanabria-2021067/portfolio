"use client";

import { useState } from "react";
import { usePreferences } from "../../PreferencesProvider";
import { useWorkbench } from "../WorkbenchProvider";
import ContributionGraph, { useContributions } from "../ContributionGraph";
import { Section } from "./ExplorerView";
import { BranchIcon, CheckIcon, ExternalIcon } from "../icons";
import { EMAIL, GITHUB_PROFILE, t } from "@/lib/workspace";

export default function SourceControlView() {
  const { locale } = usePreferences();
  const { openFile } = useWorkbench();
  const data = useContributions();
  const [message, setMessage] = useState("");

  const commit = () => {
    if (!message.trim()) return;
    const subject = encodeURIComponent(t(locale, "Hello from your portfolio", "Hola desde tu portafolio"));
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${encodeURIComponent(message.trim())}`;
  };

  // last ~4 months up to today (the calendar also contains the rest of the year)
  const today = new Date().toISOString().slice(0, 10);
  const recentWeeks = data?.weeks.filter((week) => week[0] && week[0].date <= today).slice(-17) ?? [];
  const fmt = (value: number) => value.toLocaleString(locale === "en" ? "en-US" : "es-GT");

  return (
    <div className="wb-scm">
      <Section title="portfolio">
        <div className="wb-scm-commit">
          <textarea
            className="wb-input wb-textarea"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={(event) => {
              if ((event.ctrlKey || event.metaKey) && event.key === "Enter") commit();
            }}
            placeholder={t(locale, "Message (Ctrl+Enter to send it to Angel)", "Mensaje (Ctrl+Enter para enviárselo a Angel)")}
            rows={3}
          />
          <button type="button" className="wb-primary-btn" onClick={commit} disabled={!message.trim()}>
            <CheckIcon size={14} />
            {t(locale, "Commit & Send", "Commit y enviar")}
          </button>
          <p className="wb-hint">
            <BranchIcon size={12} /> main · {t(locale, "opens your email client", "abre tu cliente de correo")}
          </p>
        </div>
      </Section>

      <Section title={t(locale, "Contributions", "Contribuciones")}>
        <div className="wb-scm-block">
          {!data && <div className="wb-skeleton" style={{ height: 150 }} />}
          {data && data.status !== "ok" && (
            <p className="wb-empty-note">
              {t(locale, "Live GitHub stats are not available right now.", "Las estadísticas de GitHub no están disponibles ahora.")}{" "}
              <a href={GITHUB_PROFILE} target="_blank" rel="noopener noreferrer" className="wb-link">
                {t(locale, "See the profile on GitHub", "Ver el perfil en GitHub")}
              </a>
            </p>
          )}
          {data && data.status === "ok" && (
            <>
              <div className="wb-scm-total">
                <strong>{fmt(data.total)}</strong>
                <span>{t(locale, `contributions in ${data.year}`, `contribuciones en ${data.year}`)}</span>
              </div>
              <ContributionGraph weeks={recentWeeks} locale={locale} cell={11} gap={3} showLabels={false} />
              <dl className="wb-stats">
                <div>
                  <dt>{t(locale, "Commits", "Commits")}</dt>
                  <dd>{fmt(data.commits)}</dd>
                </div>
                <div>
                  <dt>{t(locale, "Pull requests", "Pull requests")}</dt>
                  <dd>{fmt(data.pullRequests)}</dd>
                </div>
                <div>
                  <dt>{t(locale, "Current streak", "Racha actual")}</dt>
                  <dd>
                    {data.currentStreak} {t(locale, "days", "días")}
                  </dd>
                </div>
                <div>
                  <dt>{t(locale, "Longest streak", "Racha más larga")}</dt>
                  <dd>
                    {data.longestStreak} {t(locale, "days", "días")}
                  </dd>
                </div>
              </dl>
              <button type="button" className="wb-secondary-btn" onClick={() => openFile("/activity")}>
                {t(locale, "Open full contribution graph", "Abrir gráfica completa")}
              </button>
            </>
          )}
        </div>
      </Section>

      {data?.status === "ok" && data.repos.length > 0 && (
        <Section title={t(locale, "Most active public repos", "Repos públicos más activos")}>
          <ul className="wb-repo-list">
            {data.repos.map((repo) => (
              <li key={repo.name}>
                <a href={repo.url} target="_blank" rel="noopener noreferrer">
                  <span className="wb-repo-name">{repo.name.split("/")[1]}</span>
                  <span className="wb-count">{repo.commits}</span>
                  <ExternalIcon />
                </a>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </div>
  );
}
