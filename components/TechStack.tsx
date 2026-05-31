"use client";

import BentoCard from "./BentoCard";
import Chip from "./Chip";
import { usePreferences } from "./PreferencesProvider";

const stack = [
  {
    category: "Languages",
    items: [
      { label: "TypeScript", color: "#3178c6" },
      { label: "JavaScript", color: "#f7df1e" },
      { label: "Python", color: "#3776ab" },
      { label: "Go", color: "#00add8" },
      { label: "Java", color: "#ed8b00" },
      { label: "HTML5", color: "#e34f26" },
      { label: "CSS3", color: "#1572b6" },
    ],
  },
  {
    category: "Frameworks & Libraries",
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
    category: "Databases",
    items: [
      { label: "PostgreSQL", color: "#336791" },
      { label: "MongoDB", color: "#47a248" },
      { label: "MySQL", color: "#00758f" },
      { label: "Redis", color: "#dc382d" },
      { label: "Neo4j", color: "#008cc1" },
    ],
  },
  {
    category: "DevOps & Cloud",
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
    category: "Tools",
    items: [
      { label: "Git", color: "#f05032" },
      { label: "Postman", color: "#ff6c37" },
      { label: "Figma", color: "#f24e1e" },
      { label: "Notion", color: "#ffffff" },
      { label: "Neovim", color: "#57a143" },
    ],
  },
];

export default function TechStack() {
  const { locale } = usePreferences();

  return (
    <BentoCard>
      <div className="flex items-center justify-between mb-[18px] gap-[10px]">
        <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-fg-mute font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-accent shadow-[0_0_10px_var(--color-blue-accent)]" />
          {locale === "en" ? "Tech Stack" : "Stack Tecnico"}
        </div>
        <span className="text-fg-mute text-[12px] font-mono">36+</span>
      </div>
      <div className="flex flex-col gap-[14px]">
        {stack.map((cat) => (
          <div key={cat.category} className="flex flex-col gap-2">
            <div className="text-[10px] text-fg-mute uppercase tracking-[0.12em] font-mono">{cat.category}</div>
            <div className="flex flex-wrap gap-1.5">
              {cat.items.map((item) => (
                <Chip key={item.label} label={item.label} dotColor={item.color} />
              ))}
            </div>
          </div>
        ))}

        <div className="mt-4 p-[14px] rounded-[var(--radius-sm)] bg-[var(--grad-soft)] border border-[rgba(167,139,250,0.2)]">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="w-[22px] h-[22px] inline-flex items-center justify-center bg-[var(--grad)] rounded-[6px] text-white">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
            </span>
            <span className="text-[11px] font-semibold text-fg uppercase tracking-[0.12em] font-mono">
              {locale === "en" ? "Currently learning" : "Aprendiendo ahora"}
            </span>
          </div>
          <ul className="list-none p-0 m-0 flex flex-col gap-1.5">
            <li className="flex items-center gap-2 text-[12.5px] text-fg-dim before:content-[''] before:w-1 before:h-1 before:rounded-full before:bg-purple-accent before:shadow-[0_0_6px_var(--color-purple-accent)] before:shrink-0">Vue.js</li>
            <li className="flex items-center gap-2 text-[12.5px] text-fg-dim before:content-[''] before:w-1 before:h-1 before:rounded-full before:bg-purple-accent before:shadow-[0_0_6px_var(--color-purple-accent)] before:shrink-0">
              {locale === "en" ? "Advanced cloud-native architectures" : "Arquitecturas cloud-native avanzadas"}
            </li>
            <li className="flex items-center gap-2 text-[12.5px] text-fg-dim before:content-[''] before:w-1 before:h-1 before:rounded-full before:bg-purple-accent before:shadow-[0_0_6px_var(--color-purple-accent)] before:shrink-0">
              {locale === "en" ? "Scalable system design" : "Diseno de sistemas escalables"}
            </li>
          </ul>
        </div>
      </div>
    </BentoCard>
  );
}
