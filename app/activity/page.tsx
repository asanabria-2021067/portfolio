"use client";

import { useState } from "react";
import { clsx } from "clsx";
import Footer from "@/components/Footer";
import { usePreferences } from "@/components/PreferencesProvider";
import ContributionGraph, { formatDay, useContributions } from "@/components/workbench/ContributionGraph";
import { GITHUB_PROFILE } from "@/lib/workspace";

export default function ActivityPage() {
  const { locale } = usePreferences();
  const [year, setYear] = useState<number | undefined>(undefined);
  const data = useContributions(year);
  const en = locale === "en";
  const fmt = (value: number) => value.toLocaleString(en ? "en-US" : "es-GT");

  const stats = data?.status === "ok"
    ? [
        { label: en ? "Commits" : "Commits", value: fmt(data.commits) },
        { label: en ? "Pull requests" : "Pull requests", value: fmt(data.pullRequests) },
        { label: en ? "Code reviews" : "Revisiones de código", value: fmt(data.reviews) },
        { label: en ? "Issues" : "Issues", value: fmt(data.issues) },
        { label: en ? "Longest streak" : "Racha más larga", value: `${data.longestStreak} ${en ? "days" : "días"}` },
        {
          label: en ? "Best day" : "Mejor día",
          value: data.bestDay ? `${data.bestDay.count}` : "—",
          detail: data.bestDay ? formatDay(data.bestDay.date, locale) : undefined,
        },
      ]
    : [];

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-[14px] py-1 px-2">
        <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-fg-mute font-mono">
          <span className="w-[6px] h-[6px] rounded-full bg-blue-accent shadow-[0_0_10px_var(--blue)]" />
          {en ? "Source Control · GitHub activity" : "Control de código · Actividad en GitHub"}
        </div>
        <h1 className="text-[clamp(38px,4.4vw,56px)] font-semibold tracking-[-0.035em] leading-none m-0">
          {en ? "Shipping " : "Programando "}
          <span className="grad-text">{en ? "every week." : "cada semana."}</span>
        </h1>
        <p className="text-fg-dim text-[15px] leading-[1.55] max-w-[620px] m-0">
          {en
            ? "Live contribution data from GitHub, including private work repositories (counted, never shown)."
            : "Datos de contribuciones en vivo desde GitHub, incluyendo repositorios privados de trabajo (se cuentan, no se muestran)."}
        </p>
      </header>

      <section className="activity-card">
        <div className="activity-head">
          <h2>
            {data?.status === "ok"
              ? en
                ? `${fmt(data.total)} contributions in ${data.year}`
                : `${fmt(data.total)} contribuciones en ${data.year}`
              : en
                ? "Contributions"
                : "Contribuciones"}
          </h2>
          {data?.status === "ok" && data.years.length > 1 && (
            <div className="activity-years" role="tablist">
              {data.years.slice(0, 6).map((option) => (
                <button
                  key={option}
                  type="button"
                  role="tab"
                  aria-selected={option === data.year}
                  className={clsx(option === data.year && "is-active")}
                  onClick={() => setYear(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        {!data && <div className="wb-skeleton" style={{ height: 140 }} />}
        {data && data.status !== "ok" && (
          <p className="text-fg-dim text-[14px]">
            {en ? "GitHub stats are not available right now. " : "Las estadísticas de GitHub no están disponibles ahora. "}
            <a className="wb-link" href={GITHUB_PROFILE} target="_blank" rel="noopener noreferrer">
              {en ? "See the profile on GitHub →" : "Ver el perfil en GitHub →"}
            </a>
          </p>
        )}
        {data?.status === "ok" && (
          <>
            <ContributionGraph weeks={data.weeks} locale={locale} cell={12} gap={3} />
            {data.privateCount > 0 && (
              <p className="activity-note">
                {en
                  ? `${fmt(data.privateCount)} of them are in private repositories.`
                  : `${fmt(data.privateCount)} de ellas están en repositorios privados.`}
              </p>
            )}
          </>
        )}
      </section>

      {stats.length > 0 && (
        <section className="activity-stats">
          {stats.map((stat) => (
            <div key={stat.label} className="activity-stat">
              <span className="activity-stat-label">{stat.label}</span>
              <strong>{stat.value}</strong>
              {stat.detail && <span className="activity-stat-detail">{stat.detail}</span>}
            </div>
          ))}
        </section>
      )}

      {data?.status === "ok" && data.repos.length > 0 && (
        <section className="activity-card">
          <h2 className="activity-subtitle">{en ? "Most active public repositories" : "Repositorios públicos más activos"}</h2>
          <ul className="activity-repos">
            {data.repos.map((repo) => {
              const max = data.repos[0].commits || 1;
              return (
                <li key={repo.name}>
                  <a href={repo.url} target="_blank" rel="noopener noreferrer">
                    <span className="activity-repo-name">{repo.name}</span>
                    <span className="activity-bar">
                      <span style={{ width: `${Math.max((repo.commits / max) * 100, 4)}%` }} />
                    </span>
                    <span className="activity-repo-count">
                      {repo.commits} {en ? "commits" : "commits"}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <Footer
        leftText="© 2026 — Angel Sanabria"
        midText={en ? "Data from the GitHub GraphQL API" : "Datos de la API GraphQL de GitHub"}
        rightText={en ? "Refreshed hourly" : "Se actualiza cada hora"}
      />
    </div>
  );
}
