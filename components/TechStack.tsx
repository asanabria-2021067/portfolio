"use client";

import Link from "next/link";
import BentoCard from "./BentoCard";
import Chip from "./Chip";
import { usePreferences } from "./PreferencesProvider";

const highlights = [
  {
    categoryEn: "Languages",
    categoryEs: "Lenguajes",
    items: [
      { label: "TypeScript", color: "#3178c6" },
      { label: "Go", color: "#00add8" },
      { label: "Python", color: "#3776ab" },
    ],
  },
  {
    categoryEn: "Frameworks & Libraries",
    categoryEs: "Frameworks & Librerías",
    items: [
      { label: "Next.js", color: "#ffffff" },
      { label: "NestJS", color: "#e0234e" },
      { label: "React", color: "#61dafb" },
    ],
  },
  {
    categoryEn: "DevOps & Cloud",
    categoryEs: "DevOps & Cloud",
    items: [
      { label: "Docker", color: "#2496ed" },
      { label: "Kubernetes", color: "#326ce5" },
      { label: "AWS (CI/CD)", color: "#ff9900" },
    ],
  },
];

export default function TechStack() {
  const { locale } = usePreferences();

  return (
    <BentoCard>
      <div className="flex items-center justify-between mb-5 gap-[10px]">
        <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-fg-mute font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-accent shadow-[0_0_10px_var(--color-blue-accent)]" />
          {locale === "en" ? "Tech Highlights" : "Tecnologías Clave"}
        </div>
        <span className="text-fg-mute text-[12px] font-mono">Highlights</span>
      </div>
      
      <div className="flex flex-col gap-4">
        {highlights.map((cat) => (
          <div key={cat.categoryEn} className="flex flex-col gap-2">
            <div className="text-[10px] text-fg-mute uppercase tracking-[0.12em] font-mono">
              {locale === "en" ? cat.categoryEn : cat.categoryEs}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {cat.items.map((item) => (
                <Chip key={item.label} label={item.label} dotColor={item.color} />
              ))}
            </div>
          </div>
        ))}

        <div className="mt-4 pt-2 border-t border-[var(--line)]">
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
