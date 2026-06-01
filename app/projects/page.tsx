"use client";

import GithubProjectsGrid from "@/components/GithubProjectsGrid";
import Footer from "@/components/Footer";
import { usePreferences } from "@/components/PreferencesProvider";

export default function ProjectsPage() {
  const { locale } = usePreferences();

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-[14px] mb-7 py-1 px-2">
        <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-fg-mute font-mono">
          <span className="w-[6px] h-[6px] rounded-full bg-blue-accent shadow-[0_0_10px_var(--blue)]" />
          {locale === "en" ? "My Projects · Code Portfolio" : "Mis Proyectos · Portafolio de Código"}
        </div>
        <h1 className="text-[clamp(38px,4.4vw,56px)] font-semibold tracking-[-0.035em] leading-none m-0">
          {locale === "en" ? "My " : "Mis "}
          <span className="grad-text text-3d cursor-default">{locale === "en" ? "Projects." : "proyectos."}</span>
        </h1>
        <p className="text-fg-dim text-[15px] leading-[1.55] max-w-[600px] m-0">
          {locale === "en"
            ? "A curated list of my public and private repositories, showcasing full-stack applications, container deployments, and system integrations."
            : "Lista curada de mis repositorios públicos y privados, mostrando aplicaciones full-stack, despliegues en contenedores e integraciones de sistemas."}
        </p>
      </header>

      <GithubProjectsGrid />

      <Footer
        leftText="(c) 2026 - Angel Sanabria"
        midText={locale === "en" ? "GitHub-backed project index" : "Indice de proyectos conectado a GitHub"}
        rightText={locale === "en" ? "Production links appear when available" : "Produccion aparece si existe"}
      />
    </div>
  );
}
