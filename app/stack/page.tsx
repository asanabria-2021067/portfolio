"use client";

import BentoCard from "@/components/BentoCard";
import Footer from "@/components/Footer";
import { usePreferences } from "@/components/PreferencesProvider";
import { clsx } from "clsx";

const categories = [
  {
    titleEn: "Programming Languages",
    titleEs: "Lenguajes de Programación",
    items: [
      { label: "TypeScript", color: "#3178c6" },
      { label: "JavaScript", color: "#f7df1e" },
      { label: "Python", color: "#3776ab" },
      { label: "Go", color: "#00add8" },
      { label: "Java", color: "#openjdk" },
      { label: "HTML5", color: "#e34f26" },
      { label: "CSS3", color: "#1572b6" },
    ],
  },
  {
    titleEn: "Frameworks & Libraries",
    titleEs: "Frameworks y Librerías",
    items: [
      { label: "Next.js", color: "#ffffff" },
      { label: "React", color: "#61dafb" },
      { label: "NestJS", color: "#e0234e" },
      { label: "Django", color: "#0c4b33" },
      { label: "Node.js", color: "#68a063" },
      { label: "Express.js", color: "#828282" },
      { label: "Flask", color: "#828282" },
      { label: "Tailwind CSS", color: "#38bdf8" },
      { label: "Prisma", color: "#2d3748" },
    ],
  },
  {
    titleEn: "Databases",
    titleEs: "Bases de Datos",
    items: [
      { label: "PostgreSQL", color: "#336791" },
      { label: "MongoDB", color: "#47a248" },
      { label: "MySQL", color: "#00758f" },
      { label: "Redis", color: "#dc382d" },
      { label: "Neo4j", color: "#008cc1" },
    ],
  },
  {
    titleEn: "DevOps & Cloud",
    titleEs: "DevOps y Cloud",
    items: [
      { label: "Docker", color: "#2496ed" },
      { label: "Kubernetes", color: "#326ce5" },
      { label: "Azure", color: "#0089d6" },
      { label: "GitHub Actions", color: "#2088ff" },
      { label: "VMware", color: "#717074" },
      { label: "Vercel", color: "#ffffff" },
      { label: "AWS", color: "#ff9900" },
      { label: "GHCR (CI/CD)", color: "#2088ff" },
      { label: "Firebase", color: "#ffca28" },
    ],
  },
  {
    titleEn: "Developer Tools",
    titleEs: "Herramientas de Desarrollo",
    items: [
      { label: "Git", color: "#f05032" },
      { label: "Postman", color: "#ff6c37" },
      { label: "Figma", color: "#f24e1e" },
      { label: "Notion", color: "#ffffff" },
      { label: "Neovim", color: "#57a143" },
      { label: "Supabase", color: "#3ecf8e" },
      { label: "Cloudflare", color: "#f38020" },
      { label: "VS Code", color: "#007acc" },
    ],
  },
];

function getTechIcon(label: string): string {
  const mapping: { [key: string]: string } = {
    "TypeScript": "typescript",
    "JavaScript": "javascript",
    "Python": "python",
    "Go": "go",
    "Java": "openjdk",
    "HTML5": "html5",
    "CSS3": "/assets/images/css.png",
    "Next.js": "nextdotjs/white",
    "React": "react",
    "NestJS": "nestjs",
    "Django": "django",
    "Node.js": "nodedotjs",
    "Express.js": "express/white",
    "Flask": "flask/white",
    "Tailwind CSS": "tailwindcss",
    "Prisma": "prisma/white",
    "PostgreSQL": "postgresql",
    "MongoDB": "mongodb",
    "MySQL": "mysql",
    "Redis": "redis",
    "Neo4j": "neo4j",
    "Docker": "docker",
    "Kubernetes": "kubernetes",
    "Azure": "/assets/images/azure.png",
    "GitHub Actions": "githubactions",
    "VMware": "vmware/white",
    "Vercel": "vercel/white",
    "Supabase": "supabase",
    "AWS": "/assets/images/aws.png",
    "GHCR (CI/CD)": "github/white",
    "Firebase": "firebase",
    "Git": "git",
    "Postman": "postman",
    "Figma": "figma",
    "Notion": "notion/white",
    "Neovim": "neovim",
    "Cloudflare": "cloudflare",
    "VS Code": "/assets/images/vscode.png"
  };
  const slug = mapping[label] || label.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (slug.startsWith("/")) {
    return slug;
  }
  return `https://cdn.simpleicons.org/${slug}`;
}

interface TechTileProps {
  label: string;
  icon: string;
  className?: string;
}

function TechTile({ label, icon, className }: TechTileProps) {
  return (
    <div className={clsx(
      "flex flex-col items-center justify-center p-3 rounded-xl border border-[var(--line)] bg-white/[0.015] hover:border-white/20 hover:bg-white/[0.05] hover:scale-[1.04] hover:shadow-[0_8px_20px_-8px_rgba(0,0,0,0.5)] transition-all duration-200 gap-2 min-h-[90px] w-full group",
      className
    )}>
      <img
        src={icon}
        alt={label}
        className="w-7.5 h-7.5 object-contain shrink-0 transition-all duration-200 brightness-[0.85] group-hover:brightness-100 group-hover:scale-[1.06]"
        loading="lazy"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
      <span className="text-[11px] sm:text-[11.5px] text-fg-dim font-mono font-medium tracking-tight text-center leading-snug max-w-full px-0.5 group-hover:text-fg break-words whitespace-normal">
        {label}
      </span>
    </div>
  );
}

export default function StackPage() {
  const { locale } = usePreferences();

  // Grid spans: 
  // Programming Languages & Frameworks span 3 columns each (Total 6 in row 1).
  // Databases (spans 2), DevOps (spans 3), Tools (spans 1) (Total 6 in row 2).
  // Currently learning spans 6 columns (Total 6 in row 3).
  const spans = [
    "col-span-1 md:col-span-6", // Languages
    "col-span-1 md:col-span-4", // Frameworks
    "col-span-1 md:col-span-2", // Databases
    "col-span-1 md:col-span-3", // DevOps
    "col-span-1 md:col-span-3", // Tools
  ];

  const whyStackItems = locale === "en"
    ? [
        {
          label: "Next.js over Vite + React",
          detail:
            "Chose Next.js for its App Router, server-side Route Handlers (used as a GitHub API proxy with caching), and Vercel-native deployment. For a portfolio that fetches real data, SSR and route handlers matter.",
        },
        {
          label: "NestJS for back-end projects",
          detail:
            "When building UVGenius (a monorepo platform), NestJS gave me dependency injection, decorators, and a modular architecture that scaled across 34+ database entities without becoming a spaghetti Express app.",
        },
        {
          label: "PostgreSQL over MongoDB",
          detail:
            "Relational data with clear schemas (users, projects, associations) benefits from foreign keys, constraints, and transactions. Used MongoDB in earlier projects and found schema flexibility a liability at scale.",
        },
        {
          label: "Docker Compose for local and production parity",
          detail:
            "UVGenius runs 4 services (PostgreSQL, Redis, NestJS backend, reverse proxy) under a single docker-compose.yml. This means the app behaves the same on my machine and on a VPS.",
        },
        {
          label: "TypeScript strict mode throughout",
          detail:
            "Caught real bugs during development. Combined with Prisma's generated types, the entire UVGenius data layer is type-safe end to end.",
        },
      ]
    : [
        {
          label: "Next.js sobre Vite + React",
          detail:
            "Elegí Next.js por su App Router, los Route Handlers del lado del servidor (usados como proxy para la API de GitHub con caché) y el despliegue nativo en Vercel. Para un portafolio que obtiene datos reales, SSR y los manejadores de rutas son determinantes.",
        },
        {
          label: "NestJS para proyectos de back-end",
          detail:
            "Al construir UVGenius (plataforma monorepo), NestJS me dio inyección de dependencias, decoradores y una arquitectura modular que escaló a través de 34+ entidades de base de datos sin convertirse en un Express espagueti.",
        },
        {
          label: "PostgreSQL sobre MongoDB",
          detail:
            "Los datos relacionales con esquemas definidos (usuarios, proyectos, asociaciones) se benefician de claves foráneas, restricciones y transacciones. Usé MongoDB en proyectos anteriores y encontré que la flexibilidad de esquema se convierte en un pasivo a escala.",
        },
        {
          label: "Docker Compose para paridad local y producción",
          detail:
            "UVGenius corre 4 servicios (PostgreSQL, Redis, backend NestJS, proxy inverso) bajo un único docker-compose.yml. Esto significa que la app se comporta igual en mi máquina y en un VPS.",
        },
        {
          label: "TypeScript en modo estricto en todo el stack",
          detail:
            "Detectó errores reales durante el desarrollo. Combinado con los tipos generados por Prisma, toda la capa de datos de UVGenius es type-safe de extremo a extremo.",
        },
      ];

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-[14px] mb-4 py-1 px-2">
        <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-fg-mute font-mono">
          <span className="w-[6px] h-[6px] rounded-full bg-blue-accent shadow-[0_0_10px_var(--blue)]" />
          {locale === "en" ? "Tech Stack · Tools of the Trade" : "Stack Técnico · Mis Herramientas"}
        </div>
        <h1 className="text-[clamp(38px,4.4vw,56px)] font-semibold tracking-[-0.035em] leading-none m-0">
          {locale === "en" ? "My " : "Mi "}
          <span className="grad-text">{locale === "en" ? "Stack." : "stack."}</span>
        </h1>
        <p className="text-fg-dim text-[15px] leading-[1.55] max-w-[600px] m-0">
          {locale === "en"
            ? "A comprehensive overview of the programming languages, framework ecosystems, database systems, and DevOps/cloud tools that I use to design and build scalable products."
            : "Una vista detallada de los lenguajes de programación, frameworks, bases de datos y herramientas de DevOps y nube que utilizo para construir soluciones robustas."}
        </p>
      </header>

      {/* Why this stack reasoning card */}
      <BentoCard className="col-span-1 !p-[22px] sm:!p-[28px] flex flex-col gap-4">
        <div className="text-[12px] font-semibold text-fg uppercase tracking-[0.12em] font-mono border-b border-white/5 pb-2">
          {locale === "en" ? "Why this stack" : "Por qué este stack"}
        </div>
        <ol className="list-none p-0 m-0 flex flex-col gap-4">
          {whyStackItems.map((item, i) => (
            <li key={i} className="flex flex-col gap-[3px]">
              <span className="text-[12px] font-mono font-semibold text-fg tracking-tight">
                {item.label}
              </span>
              <span className="text-[13.5px] text-fg-dim leading-[1.55]">
                {item.detail}
              </span>
            </li>
          ))}
        </ol>
      </BentoCard>

      {/* Categories Grid - Symmetrical 3-Row Sized Grid */}
      <main className="grid grid-cols-1 md:grid-cols-6 gap-6">
        {categories.map((cat, idx) => (
          <BentoCard key={idx} className={`${spans[idx]} !p-[22px] sm:!p-[28px] flex flex-col gap-4`}>
            <div className="text-[12px] font-semibold text-fg uppercase tracking-[0.12em] font-mono border-b border-white/5 pb-2">
              {locale === "en" ? cat.titleEn : cat.titleEs}
            </div>
            <div className={clsx(
              "grid gap-2.5 my-auto",
              idx === 0 && "grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5", // Languages
              idx === 1 && "grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5", // Frameworks
              idx === 2 && "grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-2", // Databases
              idx === 3 && "grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-3", // DevOps
              idx === 4 && "grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-2"  // Tools
            )}>
              {cat.items.map((item, itemIdx) => (
                <TechTile
                  key={item.label}
                  label={item.label}
                  icon={getTechIcon(item.label)}
                  className={clsx(
                    idx === 2 && itemIdx === 4 && "col-span-2 md:col-span-2 lg:col-span-2" // Neo4j stretches in Databases grid
                  )}
                />
              ))}
            </div>
          </BentoCard>
        ))}

        {/* Currently Learning Card - Stretching full width */}
        <BentoCard className="col-span-1 md:col-span-6 !p-[22px] sm:!p-[28px] flex flex-col gap-4 bg-[var(--grad-soft)] border border-[rgba(167,139,250,0.2)]">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-[24px] h-[24px] inline-flex items-center justify-center bg-[var(--grad)] rounded-[6px] text-white">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
            </span>
            <span className="text-[12px] font-semibold text-fg uppercase tracking-[0.12em] font-mono">
              {locale === "en" ? "Currently learning & focusing" : "Aprendiendo y enfocándome ahora"}
            </span>
          </div>
          <ul className="list-none p-0 m-0 flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
            <li className="flex items-start gap-2.5 text-[13.5px] text-fg-dim before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-purple-accent before:shadow-[0_0_6px_var(--color-purple-accent)] before:mt-[7px] before:shrink-0">
              <span>Vue.js & ecosystem</span>
            </li>
            <li className="flex items-start gap-2.5 text-[13.5px] text-fg-dim before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-purple-accent before:shadow-[0_0_6px_var(--color-purple-accent)] before:mt-[7px] before:shrink-0">
              <span>{locale === "en" ? "Advanced cloud-native architectures" : "Arquitecturas cloud-native avanzadas"}</span>
            </li>
            <li className="flex items-start gap-2.5 text-[13.5px] text-fg-dim before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-purple-accent before:shadow-[0_0_6px_var(--color-purple-accent)] before:mt-[7px] before:shrink-0">
              <span>{locale === "en" ? "Scalable system design patterns" : "Patrones de diseño de sistemas escalables"}</span>
            </li>
            <li className="flex items-start gap-2.5 text-[13.5px] text-fg-dim before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-purple-accent before:shadow-[0_0_6px_var(--color-purple-accent)] before:mt-[7px] before:shrink-0">
              <span>{locale === "en" ? "Kubernetes operator development" : "Desarrollo de operadores de Kubernetes"}</span>
            </li>
          </ul>
        </BentoCard>
      </main>

      <Footer
        leftText="© 2026 — Angel Sanabria"
        midText={locale === "en" ? "Tech stack details page" : "Página detallada de tecnologías"}
        rightText={locale === "en" ? "Always evolving" : "En constante evolución"}
      />
    </div>
  );
}
