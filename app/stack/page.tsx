"use client";

import BentoCard from "@/components/BentoCard";
import Footer from "@/components/Footer";
import { usePreferences } from "@/components/PreferencesProvider";

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
      { label: "Supabase", color: "#3ecf8e" },
      { label: "AWS (CI/CD)", color: "#ff9900" },
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
    "CSS3": "css3",
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
    "Azure": "microsoftazure",
    "GitHub Actions": "githubactions",
    "VMware": "vmware/white",
    "Vercel": "vercel/white",
    "Supabase": "supabase",
    "AWS (CI/CD)": "amazonwebservices",
    "GHCR (CI/CD)": "github/white",
    "Firebase": "firebase",
    "Git": "git",
    "Postman": "postman",
    "Figma": "figma",
    "Notion": "notion/white",
    "Neovim": "neovim"
  };
  const slug = mapping[label] || label.toLowerCase().replace(/[^a-z0-9]/g, "");
  return `https://cdn.simpleicons.org/${slug}`;
}

interface TechTileProps {
  label: string;
  icon: string;
}

function TechTile({ label, icon }: TechTileProps) {
  return (
    <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-[var(--line)] bg-white/[0.015] hover:border-white/20 hover:bg-white/[0.05] hover:scale-[1.04] hover:shadow-[0_8px_20px_-8px_rgba(0,0,0,0.5)] transition-all duration-200 aspect-square gap-2 min-h-[85px] group">
      <img
        src={icon}
        alt={label}
        className="w-7 h-7 object-contain shrink-0 transition-all duration-200 brightness-[0.85] group-hover:brightness-100 group-hover:scale-[1.06]"
        loading="lazy"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
      <span className="text-[11px] text-fg-dim font-mono font-medium tracking-tight text-center max-w-full truncate px-0.5 group-hover:text-fg">
        {label}
      </span>
    </div>
  );
}

export default function StackPage() {
  const { locale } = usePreferences();

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

      {/* Categories Grid - Symmetrical 3x2 Grid */}
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, idx) => (
          <BentoCard key={idx} className="flex flex-col gap-4">
            <div className="text-[12px] font-semibold text-fg uppercase tracking-[0.12em] font-mono border-b border-white/5 pb-2">
              {locale === "en" ? cat.titleEn : cat.titleEs}
            </div>
            <div className="grid grid-cols-3 xs:grid-cols-4 gap-2.5 my-auto">
              {cat.items.map((item) => (
                <TechTile key={item.label} label={item.label} icon={getTechIcon(item.label)} />
              ))}
            </div>
          </BentoCard>
        ))}

        {/* Currently Learning Card */}
        <BentoCard className="flex flex-col gap-4 bg-[var(--grad-soft)] border border-[rgba(167,139,250,0.2)]">
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
          <ul className="list-none p-0 m-0 flex flex-col gap-3.5 mt-2">
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
