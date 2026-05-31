"use client";

import BentoCard from "./BentoCard";
import Chip from "./Chip";
import { usePreferences } from "./PreferencesProvider";

const repos = [
  {
    label: "WaterWay+ API",
    href: "https://github.com/asanabria-2021067/waterway-backend",
  },
  {
    label: "UVGenius (Monorepo)",
    href: "https://github.com/asanabria-2021067/proyecto-ingenieria-software",
  },
];

export default function FeaturedProject() {
  const { locale } = usePreferences();

  return (
    <BentoCard span={2} className="flex flex-col">
      <div className="flex items-center justify-between mb-[18px] gap-[10px]">
        <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-fg-mute font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-accent shadow-[0_0_10px_var(--color-blue-accent)]" />
          {locale === "en" ? "Featured Projects" : "Proyectos destacados"}
        </div>
        <span className="text-fg-mute text-[12px] font-mono">2024</span>
      </div>

      <div className="relative rounded-[var(--radius-sm)] overflow-hidden border border-[var(--line)] bg-[linear-gradient(135deg,#0e3a5f,#1a1147)] mb-[22px] aspect-[16/7]">
        <svg viewBox="0 0 700 300" preserveAspectRatio="xMidYMid slice" className="block w-full h-full">
          <defs>
            <linearGradient id="featured-water" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0e3a5f" />
              <stop offset="48%" stopColor="#1e6091" />
              <stop offset="100%" stopColor="#3b1f6b" />
            </linearGradient>
            <radialGradient id="featured-pulse" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="700" height="300" fill="url(#featured-water)" />
          <path d="M0 174 Q 120 138 240 172 T 520 170 T 700 156 L700 300 L0 300 Z" fill="rgba(106,166,255,0.22)" />
          <path d="M0 210 Q 120 188 250 214 T 510 206 T 700 192 L700 300 L0 300 Z" fill="rgba(255,255,255,0.08)" />
          <g transform="translate(66 44)">
            <rect width="250" height="152" rx="16" fill="rgba(7,8,13,0.66)" stroke="rgba(255,255,255,0.13)" />
            <text x="24" y="46" fill="rgba(255,255,255,0.58)" fontFamily="var(--font-mono)" fontSize="11">
              WATERWAY+
            </text>
            <path d="M122 58 Q 146 90 146 112 Q 146 138 122 138 Q 98 138 98 112 Q 98 90 122 58 Z" fill="white" opacity="0.93" />
            <rect x="24" y="126" width="92" height="7" rx="2" fill="rgba(255,255,255,0.3)" />
            <rect x="24" y="142" width="162" height="7" rx="2" fill="rgba(255,255,255,0.18)" />
          </g>
          <g transform="translate(386 74)">
            <rect width="248" height="148" rx="16" fill="rgba(7,8,13,0.66)" stroke="rgba(255,255,255,0.13)" />
            <text x="24" y="44" fill="rgba(255,255,255,0.58)" fontFamily="var(--font-mono)" fontSize="11">
              UVGENIUS
            </text>
            <circle cx="124" cy="86" r="52" fill="url(#featured-pulse)" />
            <g stroke="rgba(255,255,255,0.16)" fill="none">
              <circle cx="124" cy="86" r="28" />
              <circle cx="124" cy="86" r="52" />
              <line x1="72" y1="86" x2="176" y2="86" />
              <line x1="124" y1="34" x2="124" y2="138" />
            </g>
            <circle cx="124" cy="86" r="9" fill="#a78bfa" />
          </g>
        </svg>
      </div>

      <div className="flex items-center gap-2.5 text-[12px] text-fg-mute mb-2.5 font-mono flex-wrap">
        <span>{locale === "en" ? "WaterWay+ & UVGenius" : "WaterWay+ y UVGenius"}</span>
        <span className="opacity-40">/</span>
        <span>{locale === "en" ? "Environmental & Collab Portal" : "Tecnologia ambiental y colaboracion"}</span>
      </div>

      <h2 className="text-[26px] font-semibold tracking-[-0.02em] leading-[1.15] mb-3">
        <span className="grad-text">WaterWay+ & UVGenius</span>{" "}
        {locale === "en" ? "for community impact." : "para impacto comunitario."}
      </h2>
      <p className="text-fg-dim text-[14px] leading-[1.6] mb-3.5 text-pretty">
        {locale === "en"
          ? "Two major full-stack systems focusing on river protection and university collaboration: featuring public API development, Docker Compose orchestration, NestJS services, and community-focused product thinking."
          : "Dos sistemas full stack sobre proteccion de rios y colaboracion universitaria: desarrollo de APIs publicas, orquestacion con Docker Compose, servicios NestJS y producto enfocado en la comunidad."}
      </p>

      <ul className="list-none p-0 mb-[22px] grid grid-cols-1 md:grid-cols-2 gap-[8px_18px]">
        {(locale === "en"
          ? [
              "WaterWay+ backend API & Netlify deploy",
              "UVGenius monorepo with NestJS & Next.js",
              "Docker Compose multi-service architecture",
              "Hackathon-winning and SDG-oriented solutions",
            ]
          : [
              "API backend de WaterWay+ y despliegue Netlify",
              "Monorepo UVGenius con NestJS y Next.js",
              "Arquitectura multi-servicio con Docker Compose",
              "Soluciones de hackathon y orientadas a ODS",
            ]
        ).map((item) => (
          <li key={item} className="flex items-start gap-2 text-[13px] text-fg-dim leading-[1.45] before:content-[''] before:w-1.5 before:h-1.5 before:rounded-[2px] before:bg-[var(--grad)] before:mt-1.5 before:shrink-0">
            {item}
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-5 mt-auto">
        <div className="flex flex-wrap gap-1.5">
          <Chip label="React / Next.js" dotColor="#61dafb" />
          <Chip label="NestJS" dotColor="#e0234e" />
          <Chip label="Docker" dotColor="#2496ed" />
          <Chip label="API / REST" dotColor="#6aa6ff" />
        </div>

        <div className="flex items-center justify-end border-t border-[var(--line)] pt-5 gap-3 flex-wrap">
          {repos.map((repo) => (
            <a
              key={repo.href}
              href={repo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-[8px] text-fg-dim text-[11px] font-mono py-[9px] px-4 bg-white/4 border border-[var(--line)] rounded-full transition-all duration-200 hover:text-white hover:bg-white/10 hover:border-white/20 group"
            >
              {repo.label}
              <svg width="12" height="12" viewBox="0 0 16 16" className="opacity-70 group-hover:opacity-100">
                <path d="M3 13 L13 3 M6 3 H13 V10" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </BentoCard>
  );
}
