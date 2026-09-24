"use client";

import BentoCard from "@/components/BentoCard";
import Footer from "@/components/Footer";
import { usePreferences } from "@/components/PreferencesProvider";
import { clsx } from "clsx";

type Tech = { label: string; icon: string; mono?: boolean; color?: string };

// Icons come from the public Iconify API (logos / simple-icons / carbon sets)
const VMW = "#78b6f0";
const categories: { titleEn: string; titleEs: string; span: string; items: Tech[] }[] = [
  {
    titleEn: "VMware & Infrastructure",
    titleEs: "VMware e Infraestructura",
    span: "md:col-span-6",
    items: [
      { label: "VMware Cloud Foundation 9", icon: "mdi:cloud-cog", color: VMW },
      { label: "vSphere / vCenter", icon: "carbon:virtual-machine", color: VMW },
      { label: "VKS · Supervisor", icon: "logos:kubernetes" },
      { label: "NSX", icon: "carbon:network-overlay", color: VMW },
      { label: "Avi Load Balancer", icon: "carbon:load-balancer-vpc", color: VMW },
      { label: "VCF Automation", icon: "carbon:flow", color: VMW },
      { label: "VeloCloud SD-WAN", icon: "carbon:network-4", color: VMW },
      { label: "Tanzu", icon: "carbon:container-software", color: VMW },
      { label: "Linux / Ubuntu", icon: "logos:ubuntu" },
      { label: "Cisco Networking", icon: "simple-icons:cisco", color: "#1BA0D7" },
    ],
  },
  {
    titleEn: "Languages",
    titleEs: "Lenguajes",
    span: "md:col-span-3",
    items: [
      { label: "TypeScript", icon: "logos:typescript-icon" },
      { label: "JavaScript", icon: "logos:javascript" },
      { label: "Python", icon: "logos:python" },
      { label: "Go", icon: "logos:go" },
      { label: "Java", icon: "logos:java" },
      { label: "C++", icon: "logos:c-plusplus" },
      { label: "Swift", icon: "logos:swift" },
      { label: "PHP", icon: "logos:php" },
      { label: "SQL", icon: "vscode-icons:file-type-sql" },
      { label: "Bash", icon: "logos:bash-icon" },
      { label: "HTML5", icon: "logos:html-5" },
      { label: "CSS3", icon: "logos:css-3" },
      { label: "YAML", icon: "logos:yaml" },
    ],
  },
  {
    titleEn: "Frontend & Mobile",
    titleEs: "Frontend y Móvil",
    span: "md:col-span-3",
    items: [
      { label: "React", icon: "logos:react" },
      { label: "Next.js", icon: "logos:nextjs-icon", mono: true },
      { label: "Vue", icon: "logos:vue" },
      { label: "Vite", icon: "logos:vitejs" },
      { label: "Tailwind CSS", icon: "logos:tailwindcss-icon" },
      { label: "GSAP", icon: "logos:greensock-icon" },
      { label: "Framer Motion", icon: "logos:framer", mono: true },
      { label: "Leaflet", icon: "simple-icons:leaflet", color: "#199900" },
      { label: "SwiftUI", icon: "logos:swift" },
      { label: "Xcode", icon: "logos:xcode" },
    ],
  },
  {
    titleEn: "Backend & APIs",
    titleEs: "Backend y APIs",
    span: "md:col-span-4",
    items: [
      { label: "Node.js", icon: "logos:nodejs-icon" },
      { label: "NestJS", icon: "logos:nestjs" },
      { label: "Express", icon: "simple-icons:express", mono: true },
      { label: "Django", icon: "logos:django-icon" },
      { label: "Flask", icon: "logos:flask", mono: true },
      { label: "Laravel", icon: "logos:laravel" },
      { label: "Prisma", icon: "logos:prisma", mono: true },
      { label: "GraphQL", icon: "logos:graphql" },
      { label: "REST · OpenAPI", icon: "logos:swagger" },
      { label: "WebSockets", icon: "logos:socket-io", mono: true },
      { label: "OAuth · Entra ID", icon: "logos:microsoft-icon" },
      { label: "JWT", icon: "logos:jwt-icon" },
    ],
  },
  {
    titleEn: "Databases",
    titleEs: "Bases de Datos",
    span: "md:col-span-2",
    items: [
      { label: "PostgreSQL", icon: "logos:postgresql" },
      { label: "MySQL", icon: "logos:mysql-icon" },
      { label: "MongoDB", icon: "logos:mongodb-icon" },
      { label: "Redis", icon: "logos:redis" },
      { label: "Neo4j", icon: "simple-icons:neo4j", color: "#4581C3" },
      { label: "Supabase", icon: "logos:supabase-icon" },
      { label: "Firebase", icon: "logos:firebase" },
    ],
  },
  {
    titleEn: "DevOps & Cloud",
    titleEs: "DevOps y Cloud",
    span: "md:col-span-3",
    items: [
      { label: "Docker", icon: "logos:docker-icon" },
      { label: "Kubernetes", icon: "logos:kubernetes" },
      { label: "Helm", icon: "logos:helm" },
      { label: "Nginx", icon: "logos:nginx" },
      { label: "GitHub Actions", icon: "logos:github-actions" },
      { label: "GHCR", icon: "logos:github-icon", mono: true },
      { label: "Azure", icon: "logos:microsoft-azure" },
      { label: "AWS", icon: "logos:aws", mono: true },
      { label: "Vercel", icon: "logos:vercel-icon", mono: true },
      { label: "Netlify", icon: "logos:netlify-icon" },
      { label: "Cloudflare", icon: "logos:cloudflare-icon" },
    ],
  },
  {
    titleEn: "AI, IoT & Tools",
    titleEs: "IA, IoT y Herramientas",
    span: "md:col-span-3",
    items: [
      { label: "Claude / Claude Code", icon: "logos:claude-icon" },
      { label: "OpenAI API", icon: "logos:openai-icon", mono: true },
      { label: "ESP32", icon: "simple-icons:espressif", color: "#E7352C" },
      { label: "Arduino", icon: "logos:arduino" },
      { label: "MQTT", icon: "simple-icons:mqtt", color: "#a855f7" },
      { label: "Git", icon: "logos:git-icon" },
      { label: "Postman", icon: "logos:postman-icon" },
      { label: "Figma", icon: "logos:figma" },
      { label: "Notion", icon: "logos:notion-icon", mono: true },
      { label: "VS Code", icon: "logos:visual-studio-code" },
      { label: "Neovim", icon: "logos:neovim" },
    ],
  },
];

function techIcon(tech: Tech) {
  const [prefix, name] = tech.icon.split(":");
  const color = tech.color ? `?color=${encodeURIComponent(tech.color)}` : "";
  return `https://api.iconify.design/${prefix}/${name}.svg${color}`;
}

interface TechTileProps {
  tech: Tech;
}

function TechTile({ tech }: TechTileProps) {
  return (
    <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-[var(--line)] bg-white/[0.015] hover:border-white/20 hover:bg-white/[0.05] hover:scale-[1.04] hover:shadow-[0_8px_20px_-8px_rgba(0,0,0,0.5)] transition-all duration-200 gap-2 min-h-[90px] w-full group">
      <img
        src={techIcon(tech)}
        alt={tech.label}
        className={clsx(
          "w-7.5 h-7.5 object-contain shrink-0 transition-all duration-200 brightness-[0.95] group-hover:brightness-100 group-hover:scale-[1.06]",
          tech.mono && "tech-mono"
        )}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.style.visibility = "hidden";
        }}
      />
      <span className="text-[11px] sm:text-[11.5px] text-fg-dim font-mono font-medium tracking-tight text-center leading-snug max-w-full px-0.5 group-hover:text-fg break-words whitespace-normal">
        {tech.label}
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
            ? "Everything I work with: from VMware Cloud Foundation and VKS clusters to full-stack web apps, APIs, databases, mobile and IoT."
            : "Todo con lo que trabajo: desde VMware Cloud Foundation y clústeres VKS hasta aplicaciones web full stack, APIs, bases de datos, móvil e IoT."}
        </p>
      </header>

      {/* Categories Grid - Symmetrical 3-Row Sized Grid */}
      <main className="grid grid-cols-1 md:grid-cols-6 gap-6">
        {categories.map((cat) => (
          <BentoCard key={cat.titleEn} className={`col-span-1 ${cat.span} !p-[22px] sm:!p-[28px] flex flex-col gap-4`}>
            <div className="flex items-center justify-between text-[12px] font-semibold text-fg uppercase tracking-[0.12em] font-mono border-b border-white/5 pb-2">
              <span>{locale === "en" ? cat.titleEn : cat.titleEs}</span>
              <span className="text-fg-mute font-normal tracking-normal">{cat.items.length}</span>
            </div>
            <div className="grid gap-2.5 grid-cols-[repeat(auto-fill,minmax(96px,1fr))]">
              {cat.items.map((tech) => (
                <TechTile key={tech.label} tech={tech} />
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
