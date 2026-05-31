"use client";

import { useEffect, useState } from "react";
import BentoCard from "./BentoCard";
import ProjectCard from "./ProjectCard";
import { usePreferences } from "./PreferencesProvider";

interface PortfolioProject {
  id: number;
  name: string;
  displayName: string;
  fullName: string;
  badgeEn?: string;
  badgeEs?: string;
  badgeColor?: "gold" | "violet" | "blue" | "green";
  description: string;
  descriptionEn: string;
  descriptionEs: string;
  categoryEn: string;
  categoryEs: string;
  bulletsEn: string[];
  bulletsEs: string[];
  roleEn?: string;
  roleEs?: string;
  repoUrl?: string;
  productionUrl?: string;
  private: boolean;
  language: string | null;
  topics: string[];
  stars: number;
  forks: number;
  pushedAt: string | null;
  updatedAt: string;
  commitCount: number;
}

interface GithubProjectsPayload {
  status: "ok" | "missing-token";
  username?: string;
  totalRepos: number;
  totalAfterFilter: number;
  excludedOwner: string;
  projects: PortfolioProject[];
  message?: string;
}

type LoadState =
  | { kind: "loading" }
  | { kind: "loaded"; payload: GithubProjectsPayload }
  | { kind: "error"; message: string };

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python: "#3776ab",
  Java: "#ed8b00",
  Go: "#00add8",
  "C#": "#68217a",
  PHP: "#777bb4",
  HTML: "#e34c26",
  CSS: "#663399",
  Vue: "#42b883",
  Shell: "#89e051",
};

function formatDate(value: string | null, locale: "en" | "es") {
  if (!value) return "No recent push";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "No recent push";

  return new Intl.DateTimeFormat(locale === "en" ? "en" : "es", {
    month: "short",
    year: "numeric",
  }).format(date);
}

function getLanguageColor(language: string | null) {
  return language ? LANGUAGE_COLORS[language] ?? "#6aa6ff" : "#6aa6ff";
}

function getTags(project: PortfolioProject) {
  const tags = [
    project.language,
    ...project.topics,
  ].filter(Boolean) as string[];

  return Array.from(new Set(tags)).slice(0, 5).map((label) => ({
    label,
    color: label === project.language ? getLanguageColor(project.language) : undefined,
  }));
}

function getCardSize(index: number): "small" | "medium" | "large" {
  return "medium";
}

function RepoArt({ project, index }: { project: PortfolioProject; index: number }) {
  const repoName = project.fullName.toLowerCase();

  if (repoName.includes("proyecto-ingenieria-software")) {
    return <img src="/assets/images/uvgenius.png" alt="UVGenius" className="w-full h-full object-cover" />;
  }
  if (repoName.includes("waterway-backend")) {
    return <img src="/assets/images/waterway.png" alt="WaterWay+" className="w-full h-full object-cover" />;
  }
  if (repoName.includes("proyecto2-db")) {
    return <img src="/assets/images/libromanga.png" alt="LibroManga" className="w-full h-full object-cover" />;
  }
  if (repoName.includes("frontend-quimica") || repoName.includes("chemiq-backend")) {
    return <img src="/assets/images/quimica.png" alt="ChemIQ Portal" className="w-full h-full object-cover" />;
  }
  if (repoName.includes("seasos-front") || repoName.includes("api-rest-python")) {
    return <img src="/assets/images/seasos.png" alt="SeaSOS" className="w-full h-full object-cover" />;
  }
  if (repoName.includes("smart-agriculture")) {
    return <img src="/assets/images/smart_agriculture.png" alt="Smart Agriculture" className="w-full h-full object-cover" />;
  }
  if (repoName.includes("tripwise")) {
    return <img src="/assets/images/tripwise.png" alt="TripWise" className="w-full h-full object-cover" />;
  }

  const color = getLanguageColor(project.language);
  const gradientId = `repo-art-${project.id}`;
  const shortName =
    project.displayName.length > 24 ? `${project.displayName.slice(0, 21)}...` : project.displayName;

  return (
    <svg viewBox="0 0 700 300" preserveAspectRatio="xMidYMid slice" className="block w-full h-full">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.42" />
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.22" />
        </linearGradient>
        <pattern id={`${gradientId}-grid`} width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M 28 0 L 0 0 0 28" fill="none" stroke="rgba(255,255,255,0.055)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="700" height="300" fill="#0b0d15" />
      <rect width="700" height="300" fill={`url(#${gradientId}-grid)`} />
      <circle cx={560 - index * 18} cy={80 + index * 14} r="120" fill={`url(#${gradientId})`} />
      <g transform="translate(54 42)">
        <rect width="592" height="216" rx="16" fill="rgba(7,8,13,0.72)" stroke="rgba(255,255,255,0.11)" />
        <circle cx="22" cy="22" r="5" fill="#ff5f56" />
        <circle cx="40" cy="22" r="5" fill="#ffbd2e" />
        <circle cx="58" cy="22" r="5" fill="#27c93f" />
        <line x1="0" y1="44" x2="592" y2="44" stroke="rgba(255,255,255,0.07)" />
        <text x="24" y="86" fill="rgba(255,255,255,0.46)" fontFamily="var(--font-mono)" fontSize="12">
          {project.categoryEn}
        </text>
        <text x="24" y="132" fill="white" fontFamily="var(--font-inter)" fontSize="34" fontWeight="700">
          {shortName}
        </text>
        <g transform="translate(24 162)">
          <rect width="128" height="28" rx="7" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.10)" />
          <circle cx="18" cy="14" r="5" fill={color} />
          <text x="32" y="18" fill="rgba(255,255,255,0.72)" fontFamily="var(--font-mono)" fontSize="10">
            {project.language ?? "Code"}
          </text>
        </g>
        <g transform="translate(168 162)">
          <rect width="144" height="28" rx="7" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.10)" />
          <text x="14" y="18" fill="rgba(255,255,255,0.72)" fontFamily="var(--font-mono)" fontSize="10">
            {project.commitCount} commits
          </text>
        </g>
      </g>
    </svg>
  );
}

function NoticeCard({ title, message }: { title: string; message: string }) {
  return (
    <BentoCard span={3}>
      <div className="flex flex-col gap-3">
        <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-fg-mute font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-accent shadow-[0_0_10px_var(--blue)]" />
          GitHub API
        </div>
        <h2 className="text-[24px] font-semibold tracking-[-0.02em]">{title}</h2>
        <p className="text-fg-dim text-[14px] leading-[1.6] max-w-[680px]">{message}</p>
      </div>
    </BentoCard>
  );
}

function LoadingGrid() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[18px]">
      {Array.from({ length: 6 }).map((_, index) => (
        <BentoCard key={index} span={1} className="min-h-[360px]">
          <div className="h-40 rounded-bento-sm border border-[var(--line)] bg-white/[0.035] mb-5 animate-pulse" />
          <div className="h-3 w-28 rounded bg-white/[0.08] mb-4 animate-pulse" />
          <div className="h-7 w-2/3 rounded bg-white/[0.08] mb-4 animate-pulse" />
          <div className="space-y-2">
            <div className="h-3 rounded bg-white/[0.06] animate-pulse" />
            <div className="h-3 w-5/6 rounded bg-white/[0.06] animate-pulse" />
          </div>
        </BentoCard>
      ))}
    </main>
  );
}

export default function GithubProjectsGrid() {
  const { locale } = usePreferences();
  const [state, setState] = useState<LoadState>({ kind: "loading" });

  useEffect(() => {
    const controller = new AbortController();

    async function loadProjects() {
      try {
        const response = await fetch("/api/github/projects?limit=12", {
          signal: controller.signal,
        });
        const payload = (await response.json()) as GithubProjectsPayload;

        if (!response.ok) {
          throw new Error(payload.message || "GitHub API request failed.");
        }

        setState({ kind: "loaded", payload });
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setState({
          kind: "error",
          message: error instanceof Error ? error.message : "GitHub API request failed.",
        });
      }
    }

    loadProjects();
    return () => controller.abort();
  }, []);

  if (state.kind === "loading") return <LoadingGrid />;

  if (state.kind === "error") {
    return (
      <NoticeCard
        title={locale === "en" ? "GitHub projects unavailable" : "Proyectos de GitHub no disponibles"}
        message={state.message}
      />
    );
  }

  if (state.payload.status === "missing-token") {
    return (
      <NoticeCard
        title={locale === "en" ? "GitHub token missing" : "Falta token de GitHub"}
        message={
          locale === "en"
            ? "Set GITHUB_TOKEN in .env.local and restart the dev server. The token stays on the server."
            : "Configura GITHUB_TOKEN en .env.local y reinicia el servidor. El token se queda en servidor."
        }
      />
    );
  }

  if (state.payload.projects.length === 0) {
    return (
      <NoticeCard
        title={locale === "en" ? "No projects to show" : "No hay proyectos para mostrar"}
        message={
          locale === "en"
            ? `No repositories passed the filters. Repositories owned by ${state.payload.excludedOwner} are excluded.`
            : `Ningun repositorio paso los filtros. Los repositorios de ${state.payload.excludedOwner} estan excluidos.`
        }
      />
    );
  }

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[18px]">
      {state.payload.projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          size={getCardSize(index)}
          badge={
            (locale === "en" ? project.badgeEn : project.badgeEs) === "none"
              ? undefined
              : (locale === "en" ? project.badgeEn : project.badgeEs) ??
                (project.private
                  ? locale === "en" ? "Private case study" : "Caso privado"
                  : index === 0
                    ? locale === "en" ? "Featured" : "Destacado"
                    : undefined)
          }
          badgeColor={project.badgeColor ?? (project.private ? "violet" : index === 0 ? "gold" : "blue")}
          meta={`${locale === "en" ? project.categoryEn : project.categoryEs} / ${project.language ?? "Stack"}`}
          title={project.displayName}
          desc={locale === "en" ? project.descriptionEn : project.descriptionEs}
          bullets={[
            ...(locale === "en" ? project.bulletsEn : project.bulletsEs),
            `${locale === "en" ? "Last push" : "Ultimo push"}: ${formatDate(project.pushedAt ?? project.updatedAt, locale)}`,
          ]}
          tags={getTags(project)}
          demoLink={project.productionUrl}
          repoLink={project.repoUrl}
          art={<RepoArt project={project} index={index} />}
        />
      ))}
    </main>
  );
}
