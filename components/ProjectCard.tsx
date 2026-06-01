"use client";

import { clsx } from "clsx";
import BentoCard from "./BentoCard";
import Chip from "./Chip";
import { usePreferences } from "./PreferencesProvider";

interface ProjectCardProps {
  size: "large" | "medium" | "small";
  badge?: string;
  badgeColor?: "gold" | "violet" | "blue" | "green";
  meta: string;
  title: string;
  desc: string;
  bullets?: string[];
  tags: { label: string; color?: string }[];
  art: React.ReactNode;
  demoLink?: string;
  repoLink?: string;
  frontendRepoLink?: string;
}

export default function ProjectCard({
  size,
  badge,
  badgeColor = "blue",
  meta,
  title,
  desc,
  bullets,
  tags,
  art,
  demoLink,
  repoLink,
  frontendRepoLink,
}: ProjectCardProps) {
  const { locale } = usePreferences();

  return (
    <BentoCard
      className={clsx(
        "flex flex-col h-full",
        size === "large" && "md:col-span-2 md:row-span-2",
        size === "medium" && "md:col-span-1 md:row-span-1",
        size === "small" && "md:col-span-1 md:row-span-1"
      )}
      span={size === "large" ? 2 : 1}
    >
      <div className={clsx(
        "relative rounded-bento-sm overflow-hidden border border-[var(--line)] mb-4",
        size === "large" ? "aspect-[16/7]" : size === "small" ? "aspect-[16/8.5]" : "aspect-[16/8]"
      )}>
        {badge && (
          <span className={clsx(
            "absolute top-[10px] left-[10px] inline-flex items-center gap-[6px] font-mono text-[10px] font-semibold p-[5px_10px] rounded-full backdrop-blur-[10px] z-10 border",
            badgeColor === "gold" && "text-[#fbbf24] bg-[rgba(7,8,13,0.85)] border-[rgba(251,191,36,0.30)]",
            badgeColor === "violet" && "text-[#a78bfa] bg-[rgba(7,8,13,0.85)] border-[rgba(167,139,250,0.30)]",
            badgeColor === "blue" && "text-[#6aa6ff] bg-[rgba(7,8,13,0.85)] border-[rgba(106,166,255,0.30)]",
            badgeColor === "green" && "text-[#4ade80] bg-[rgba(7,8,13,0.85)] border-[rgba(74,222,128,0.30)]"
          )}>
            {badge}
          </span>
        )}
        {art}
      </div>
      
      <div className="flex flex-col flex-1">
        <div className="text-[11px] text-fg-mute mb-2 font-mono uppercase tracking-[0.1em]">{meta}</div>
        <h2 className={clsx(
          "font-semibold tracking-[-0.02em] leading-[1.2] mb-2",
          size === "large" ? "text-[28px] leading-[1.15]" : "text-[20px]"
        )}>{title}</h2>
        <p className={clsx(
          "text-fg-dim text-[13.5px] leading-[1.55] mb-[14px]",
          size === "large" && "text-[15px] max-w-[600px]"
        )}>{desc}</p>
        
        {bullets && (
          <ul className={clsx(
            "list-none p-0 m-0 mb-[18px] flex flex-col gap-[6px]",
            size === "large" && "md:grid md:grid-cols-2 md:gap-x-[22px] md:gap-y-[6px]"
          )}>
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-[12.5px] text-fg-dim leading-[1.45] before:content-[''] before:w-[5px] before:h-[5px] before:rounded-[1.5px] before:bg-grad before:mt-[7px] before:shrink-0">
                {b}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-4 border-t border-[var(--line)] flex flex-col gap-5">
          <div className="flex flex-wrap gap-[6px]">
            {tags.map((tag) => (
              <Chip key={tag.label} label={tag.label} dotColor={tag.color} />
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {demoLink && (
              <a 
                href={demoLink} 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-[8px] text-fg-dim text-[11px] font-mono py-[9px] px-4 bg-white/4 border border-[var(--line)] rounded-full transition-all duration-200 hover:text-white hover:bg-grad hover:border-transparent group"
              >
                {locale === "en" ? "Launch App" : "Abrir App"}
                <svg width="12" height="12" viewBox="0 0 16 16" className="transition-transform duration-250 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]">
                  <path
                    d="M3 13 L13 3 M6 3 H13 V10"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            )}
            {frontendRepoLink && (
              <a 
                href={frontendRepoLink} 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-[8px] text-fg-dim text-[11px] font-mono py-[9px] px-4 bg-white/4 border border-[var(--line)] rounded-full transition-all duration-200 hover:text-white hover:bg-white/10 hover:border-white/30 hover:scale-[1.03] active:scale-[0.97] group shadow-[0_0_0_0_rgba(255,255,255,0)] hover:shadow-[0_0_12px_rgba(255,255,255,0.05)]"
              >
                {locale === "en" ? "Frontend Code" : "Código Frontend"}
                <svg width="12" height="12" viewBox="0 0 16 16" className="opacity-70 group-hover:opacity-100">
                  <path
                    d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.1 0-.71-.24-1.17-.51-1.41 1.67-.18 3.43-.82 3.43-3.72 0-.82-.29-1.49-.77-2.02.08-.19.33-.96-.07-1.99 0 0-.63-.2-2.07.77A7.114 7.114 0 0 0 8 4.74c-.68 0-1.36.09-2 .27-1.44-.97-2.07-.77-2.07-.77-.4 1.03-.15 1.8-.07 1.99-.48.53-.78 1.2-.78 2.02 0 2.89 1.75 3.54 3.42 3.72-.21.19-.4.52-.47.99-.42.19-1.48.51-2.13-.61 0 0-.39-.71-.13-1.07 0 0-.46-.01-.32.28 0 0 .31.14.52.68 0 0 .28.85 1.63.58.01.62.01 1.11.01 1.27 0 .21-.16.47-.56.38A8.013 8.013 0 0 1 0 8c0-4.42 3.58-8 8-8z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            )}
            {repoLink && (
              <a 
                href={repoLink} 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-[8px] text-fg-dim text-[11px] font-mono py-[9px] px-4 bg-white/4 border border-[var(--line)] rounded-full transition-all duration-200 hover:text-white hover:bg-white/10 hover:border-white/30 hover:scale-[1.03] active:scale-[0.97] group shadow-[0_0_0_0_rgba(255,255,255,0)] hover:shadow-[0_0_12px_rgba(255,255,255,0.05)]"
              >
                {frontendRepoLink 
                  ? (locale === "en" ? "Backend Code" : "Código Backend")
                  : (locale === "en" ? "Source Code" : "Codigo")
                }
                <svg width="12" height="12" viewBox="0 0 16 16" className="opacity-70 group-hover:opacity-100">
                  <path
                    d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.1 0-.71-.24-1.17-.51-1.41 1.67-.18 3.43-.82 3.43-3.72 0-.82-.29-1.49-.77-2.02.08-.19.33-.96-.07-1.99 0 0-.63-.2-2.07.77A7.114 7.114 0 0 0 8 4.74c-.68 0-1.36.09-2 .27-1.44-.97-2.07-.77-2.07-.77-.4 1.03-.15 1.8-.07 1.99-.48.53-.78 1.2-.78 2.02 0 2.89 1.75 3.54 3.42 3.72-.21.19-.4.52-.47.99-.42.19-1.48.51-2.13-.61 0 0-.39-.71-.13-1.07 0 0-.46-.01-.32.28 0 0 .31.14.52.68 0 0 .28.85 1.63.58.01.62.01 1.11.01 1.27 0 .21-.16.47-.56.38A8.013 8.013 0 0 1 0 8c0-4.42 3.58-8 8-8z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </BentoCard>
  );
}
