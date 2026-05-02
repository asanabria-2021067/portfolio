import BentoCard from "./BentoCard";
import Chip from "./Chip";

interface ProjectPreviewProps {
  title: string;
  desc: string;
  meta: string;
  tags: string[];
  badge?: string;
  badgeStyle?: React.CSSProperties;
  art: React.ReactNode;
  bullets?: string[];
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
}: ProjectPreviewProps) {
  return (
    <BentoCard className="flex flex-col">
      <div className="relative rounded-bento-sm overflow-hidden border border-[var(--line)] aspect-video mb-4">
        {badge && (
          <span 
            className="absolute top-[10px] left-[10px] inline-flex items-center gap-[6px] font-mono text-[10px] font-semibold text-[#fbbf24] px-[10px] py-[5px] rounded-full backdrop-blur-[10px] bg-[rgba(251,191,36,0.12)] border border-[rgba(251,191,36,0.3)] z-10"
            style={badgeStyle}
          >
            {badge}
          </span>
        )}
        {art}
      </div>
      <div className="text-[11px] color-fg-mute mb-2 font-mono uppercase tracking-[0.1em]">{meta}</div>
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
      <div className="flex items-center justify-between gap-[10px] mt-auto">
        <div className="flex flex-wrap gap-[6px]">
          {tags.map((t) => (
            <Chip key={t} label={t} />
          ))}
        </div>
        <a 
          href="#" 
          className="w-[34px] h-[34px] inline-flex items-center justify-center text-fg-dim bg-white/4 border border-[var(--line)] rounded-full transition-all duration-250 hover:text-white hover:bg-grad hover:border-transparent hover:-rotate-[25deg] shrink-0" 
          aria-label={`Open ${title}`}
        >
          <svg width="16" height="16" viewBox="0 0 16 16">
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
