"use client";

import Link from "next/link";
import BentoCard from "./BentoCard";
import { usePreferences } from "./PreferencesProvider";

const highlights = [
  {
    categoryEn: "Languages",
    categoryEs: "Lenguajes",
    items: [
      { label: "TypeScript" },
      { label: "Go" },
      { label: "Python" },
    ],
  },
  {
    categoryEn: "Frameworks & Libraries",
    categoryEs: "Frameworks & Librerías",
    items: [
      { label: "Next.js" },
      { label: "NestJS" },
      { label: "React" },
    ],
  },
  {
    categoryEn: "DevOps & Cloud",
    categoryEs: "DevOps & Cloud",
    items: [
      { label: "Docker" },
      { label: "Kubernetes" },
      { label: "AWS" },
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
}

function TechTile({ label, icon }: TechTileProps) {
  return (
    <div className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-[var(--line)] bg-white/[0.015] hover:border-white/20 hover:bg-white/[0.05] hover:scale-[1.04] hover:shadow-[0_8px_15px_-8px_rgba(0,0,0,0.5)] transition-all duration-200 gap-2 min-h-[85px] w-full group">
      <img
        src={icon}
        alt={label}
        className="w-6 h-6 object-contain shrink-0 transition-all duration-200 brightness-[0.85] group-hover:brightness-100 group-hover:scale-[1.06]"
        loading="lazy"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
      <span className="text-[11px] text-fg-dim font-mono font-medium tracking-tight text-center leading-snug max-w-full px-0.5 group-hover:text-fg break-words whitespace-normal">
        {label}
      </span>
    </div>
  );
}

export default function TechStack() {
  const { locale } = usePreferences();

  return (
    <BentoCard className="col-span-1 md:col-span-3 lg:col-span-5 !p-[22px] sm:!p-[28px] flex flex-col gap-4">
      <div className="flex items-center justify-between mb-2 gap-[10px]">
        <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-fg-mute font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-accent shadow-[0_0_10px_var(--color-blue-accent)]" />
          {locale === "en" ? "Tech Highlights" : "Tecnologías Clave"}
        </div>
        <span className="text-fg-mute text-[12px] font-mono">Highlights</span>
      </div>

      <div className="flex flex-col gap-4.5">
        {highlights.map((cat) => (
          <div key={cat.categoryEn} className="flex flex-col gap-2">
            <div className="text-[10px] text-fg-mute uppercase tracking-[0.12em] font-mono">
              {locale === "en" ? cat.categoryEn : cat.categoryEs}
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              {cat.items.map((item) => (
                <TechTile key={item.label} label={item.label} icon={getTechIcon(item.label)} />
              ))}
            </div>
          </div>
        ))}

        <div className="mt-2 pt-3 border-t border-[var(--line)]">
          <Link
            href="/stack"
            className="w-full inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl border border-[var(--line-2)] bg-white/[0.03] text-fg text-[12.5px] font-mono font-semibold transition-all duration-200 hover:text-white hover:bg-white/[0.08] hover:border-white/30 hover:scale-[1.01] active:scale-[0.99] group shadow-[0_0_12px_rgba(255,255,255,0)] hover:shadow-[0_0_15px_rgba(255,255,255,0.03)]"
          >
            {locale === "en" ? "View Full Stack" : "Ver Stack Completo"}
            <span className="transition-transform duration-250 group-hover:translate-x-1">➔</span>
          </Link>
        </div>
      </div>
    </BentoCard>
  );
}
