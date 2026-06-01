"use client";

import BentoCard from "./BentoCard";
import Chip from "./Chip";
import { usePreferences } from "./PreferencesProvider";
import { clsx } from "clsx";

interface ProjectPreviewProps {
  title: string;
  desc: string;
  meta: string;
  tags: string[];
  badge?: string;
  badgeStyle?: React.CSSProperties;
  art: React.ReactNode;
  bullets?: string[];
  demoLink?: string;
  repoLink?: string;
  frontendRepoLink?: string;
  className?: string;
}

export default function ProjectPreview({
  title,
  desc,
  meta,
  tags,
  badge,
  badgeStyle,
  art,
  bullets,
  demoLink,
  repoLink,
  frontendRepoLink,
  className,
}: ProjectPreviewProps) {
  const { locale } = usePreferences();

  return (
    <BentoCard className={clsx("flex flex-col", className)}>
      <div className="relative rounded-bento-sm overflow-hidden border border-[var(--line)] aspect-video mb-4">
        {badge && (
          <span 
            className="absolute top-[10px] left-[10px] inline-flex items-center gap-[6px] font-mono text-[10px] font-semibold text-[#fbbf24] px-[10px] py-[5px] rounded-full backdrop-blur-[10px] bg-[rgba(7,8,13,0.85)] border border-[rgba(251,191,36,0.3)] z-10"
            style={badgeStyle}
          >
            {badge}
          </span>
        )}
        {art}
      </div>
      <div className="text-[11px] text-fg-mute mb-2 font-mono uppercase tracking-[0.1em]">{meta}</div>
      <h3 className="text-[19px] font-semibold tracking-[-0.02em] mb-2">{title}</h3>
      <p className="text-fg-dim text-[13px] leading-[1.55] mb-4 flex-1">{desc}</p>
      {bullets && (
        <ul className="list-none p-0 m-0 mb-4 flex flex-col gap-1">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-[6px] text-[12px] text-fg-dim leading-[1.45] before:content-[''] before:w-1 before:h-1 before:rounded-full before:bg-blue-accent before:mt-[7px] before:shrink-0">
              {b}
            </li>
          ))}
        </ul>
      )}
      <div className="flex flex-col gap-4 mt-auto pt-4 border-t border-[var(--line)]">
        <div className="flex flex-wrap gap-[6px]">
          {tags.map((t) => (
            <Chip key={t} label={t} />
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {demoLink && (
            <a 
              href={demoLink} 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-[8px] text-fg-dim text-[10px] font-mono py-[7px] px-3 bg-white/4 border border-[var(--line)] rounded-full transition-all duration-200 hover:text-white hover:bg-grad hover:border-transparent group"
            >
              {locale === "en" ? "Launch App" : "Abrir App"}
              <svg width="10" height="10" viewBox="0 0 16 16" className="transition-transform duration-250 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]">
                <path
                  d="M3 13 L13 3 M6 3 H13 V10"
                  stroke="currentColor"
                  strokeWidth="2"
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
              className="inline-flex items-center gap-[8px] text-fg-dim text-[10px] font-mono py-[7px] px-3 bg-white/4 border border-[var(--line)] rounded-full transition-all duration-200 hover:text-white hover:bg-white/10 hover:border-white/30 hover:scale-[1.03] active:scale-[0.97] group shadow-[0_0_0_0_rgba(255,255,255,0)] hover:shadow-[0_0_12px_rgba(255,255,255,0.05)]"
            >
              {locale === "en" ? "Frontend Code" : "Código Frontend"}
              <svg width="10" height="10" viewBox="0 0 16 16" className="opacity-70 group-hover:opacity-100">
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
              className="inline-flex items-center gap-[8px] text-fg-dim text-[10px] font-mono py-[7px] px-3 bg-white/4 border border-[var(--line)] rounded-full transition-all duration-200 hover:text-white hover:bg-white/10 hover:border-white/30 hover:scale-[1.03] active:scale-[0.97] group shadow-[0_0_0_0_rgba(255,255,255,0)] hover:shadow-[0_0_12px_rgba(255,255,255,0.05)]"
            >
              {frontendRepoLink 
                ? (locale === "en" ? "Backend Code" : "Código Backend")
                : (locale === "en" ? "Source Code" : "Codigo")
              }
              <svg width="10" height="10" viewBox="0 0 16 16" className="opacity-70 group-hover:opacity-100">
                <path
                  d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.1 0-.71-.24-1.17-.51-1.41 1.67-.18 3.43-.82 3.43-3.72 0-.82-.29-1.49-.77-2.02.08-.19.33-.96-.07-1.99 0 0-.63-.2-2.07.77A7.114 7.114 0 0 0 8 4.74c-.68 0-1.36.09-2 .27-1.44-.97-2.07-.77-2.07-.77-.4 1.03-.15 1.8-.07 1.99-.48.53-.78 1.2-.78 2.02 0 2.89 1.75 3.54 3.42 3.72-.21.19-.4.52-.47.99-.42.19-1.48.51-2.13-.61 0 0-.39-.71-.13-1.07 0 0-.46-.01-.32.28 0 0 .31.14.52.68 0 0 .28.85 1.63.58.01.62.01 1.11.01 1.27 0 .21-.16.47-.56.38A8.013 8.013 0 0 1 0 8c0-4.42 3.58-8 8-8z"
                  fill="currentColor"
                />
              </svg>
            </a>
          )}
        </div>
      </div>
    </BentoCard>
  );
}
