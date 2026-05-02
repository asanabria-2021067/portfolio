"use client";

import { clsx } from "clsx";
import BentoCard from "./BentoCard";
import Chip from "./Chip";

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
}: ProjectCardProps) {
  return (
    <BentoCard
      className={clsx(
        "flex flex-col",
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
            badgeColor === "gold" && "text-[#fbbf24] bg-[rgba(251,191,36,0.12)] border-[rgba(251,191,36,0.30)]",
            badgeColor === "violet" && "text-[#a78bfa] bg-[rgba(167,139,250,0.14)] border-[rgba(167,139,250,0.30)]",
            badgeColor === "blue" && "text-[#6aa6ff] bg-[rgba(106,166,255,0.14)] border-[rgba(106,166,255,0.30)]",
            badgeColor === "green" && "text-[#4ade80] bg-[rgba(74,222,128,0.14)] border-[rgba(74,222,128,0.30)]"
          )}>
            {badge}
          </span>
        )}
        {art}
      </div>
      <div className="text-[11px] text-fg-mute mb-2 font-mono uppercase tracking-[0.1em]">{meta}</div>
      <h2 className={clsx(
        "font-semibold tracking-[-0.02em] leading-[1.2] mb-2",
        size === "large" ? "text-[28px] leading-[1.15]" : "text-[20px]"
      )}>{title}</h2>
      <p className={clsx(
        "text-fg-dim text-[13.5px] leading-[1.55] mb-[14px] flex-1",
        size === "large" && "text-[15px] max-w-[600px]"
      )}>{desc}</p>
      
      {bullets && (
        <ul className={clsx(
          "list-none p-0 m-0 mb-[14px] flex flex-col gap-[5px]",
          size === "large" && "md:grid md:grid-cols-2 md:gap-x-[22px] md:gap-y-[6px]"
        )}>
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2 text-[12.5px] text-fg-dim leading-[1.45] before:content-[''] before:w-[5px] before:h-[5px] before:rounded-[1.5px] before:bg-grad before:mt-[7px] before:shrink-0">
              {b}
            </li>
          ))}
        </ul>
      )}

      <div className="flex items-center justify-between gap-[10px] mt-auto">
        <div className="flex flex-wrap gap-[6px]">
          {tags.map((tag) => (
            <Chip key={tag.label} label={tag.label} dotColor={tag.color} />
          ))}
        </div>
        <a href="#" className="inline-flex items-center gap-[6px] text-fg-dim text-[11px] font-mono py-[7px] px-3 bg-white/4 border border-[var(--line)] rounded-full transition-all duration-200 hover:text-white hover:bg-grad hover:border-transparent group">
          View project
          <svg width="11" height="11" viewBox="0 0 16 16" className="transition-transform duration-250 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]">
            <path
              d="M3 13 L13 3 M6 3 H13 V10"
              stroke="currentColor"
              strokeWidth="1.6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </BentoCard>
  );
}
